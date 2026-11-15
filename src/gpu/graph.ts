import { createMemo, createReaction } from "solid-js";
import type { Bindings, Command, GPU, Op, Resource, Shader, Target } from "./core";

export class Tex {
  texture?: GPUTexture;
  constructor(
    readonly format: GPUTextureFormat,
    readonly size: number[],
  ) {}
}
type In = Tex | Resource;
type TargetIn = Tex | Target;
type GraphCommand = <O extends TargetIn | TargetIn[] | number[]>(bindings: Record<string, In>, out: O) => O;
type Node = { command: Command; bindings: Record<string, In>; out: TargetIn | TargetIn[] | number[] };
type State = { current: GPUTexture; handle: Tex; next: Tex; value: Tex };
type Program = { ops: Op[]; finals: [State, GPUTexture][] };

export function createGraph(gpu: GPU, { cache = true } = {}) {
  let recording: Node[] | undefined;
  let stale = false;
  let serial = 0;
  const states: State[] = [];
  const programs = new Map<string, Program>();
  const all = new Set<GPUTexture>();
  const pool = new Map<string, GPUTexture[]>();
  const wanted = new Set<string>();
  const track = createReaction(() => (programs.clear(), wanted.clear(), (stale = true)));

  const create = (format: GPUTextureFormat, size: number[]) => {
    const texture = gpu.texture(format, size);
    texture.label = String(serial++);
    all.add(texture);
    return texture;
  };
  const destroy = (texture: GPUTexture) => (all.delete(texture), texture.destroy());
  const keyOf = (format: string, [w, h]: number[]) => `${format} ${w}x${h}`;
  const acquire = (t: Tex) => {
    const key = keyOf(t.format, t.size);
    wanted.add(key);
    // Oldest free texture first, so the state arrangements settle into a short cycle.
    const free = pool.get(key);
    if (!free?.length) return create(t.format, t.size);
    const oldest = free.reduce((a, b) => (+a.label < +b.label ? a : b));
    free.splice(free.indexOf(oldest), 1);
    return oldest;
  };
  const release = (t: GPUTexture) => {
    const key = keyOf(t.format, [t.width, t.height]);
    if (!pool.has(key)) pool.set(key, []);
    pool.get(key)!.push(t);
  };

  const compile = (fn: () => void): Program => {
    if (stale) {
      // Cached programs moved state between textures without telling the pool.
      pool.clear();
      for (const t of all) if (!states.some((s) => s.current === t)) release(t);
      stale = false;
    }
    for (const s of states) {
      s.handle = s.next = new Tex(s.current.format, [s.current.width, s.current.height]);
      s.handle.texture = s.current;
    }
    recording = [];
    fn();
    const nodes = recording;
    recording = undefined;

    const texes = (n: Node) =>
      new Set([...Object.values(n.bindings), ...[n.out].flat()].filter((t) => t instanceof Tex));
    const lastUse = new Map<Tex, number>();
    nodes.forEach((n, i) => texes(n).forEach((t) => lastUse.set(t, i)));
    const held = new Set(states.flatMap((s) => [s.handle, s.next]));
    const real = <T>(t: T) => (t instanceof Tex ? (t.texture ??= acquire(t)) : t) as Exclude<T, Tex> | GPUTexture;
    const ops = nodes.map((n, i) => {
      const bindings = Object.fromEntries(Object.entries(n.bindings).map(([k, v]) => [k, real(v)])) as Bindings;
      const op = n.command.prepare(bindings, Array.isArray(n.out) ? (n.out.map(real) as Target[]) : real(n.out));
      for (const t of texes(n)) if (lastUse.get(t) === i && !held.has(t)) release(t.texture!);
      return op;
    });
    const finals = states.map((s): [State, GPUTexture] => {
      if (s.next !== s.handle) release(s.current);
      return [s, real(s.next)];
    });
    for (const [key, list] of pool) if (!wanted.has(key)) (list.forEach(destroy), pool.delete(key));
    return { ops, finals };
  };

  return {
    shader(shader: Shader, constants?: Record<string, number>): Record<string, GraphCommand> {
      return Object.fromEntries(
        Object.entries(gpu.shader(shader, constants)).map(([name, command]) => [
          name,
          (bindings: Record<string, In>, out: any) => (recording!.push({ command, bindings, out }), out),
        ]),
      );
    },
    tex: (format: GPUTextureFormat, size: number[]) => new Tex(format, size),
    state(format: GPUTextureFormat, size: () => number[], clear = [0, 0, 0, 0]) {
      const s = {} as State;
      const fresh = createMemo(() => {
        if (s.current) destroy(s.current);
        gpu.clear((s.current = create(format, size())), clear);
        return s.current;
      });
      Object.defineProperties(s, {
        value: { get: () => (fresh(), s.handle), set: (t: Tex) => (s.next = t) },
      });
      states.push(s);
      return s as { value: Tex; readonly current: GPUTexture };
    },
    frame(fn: () => void) {
      const key = states.map((s) => s.current.label).join();
      let program = programs.get(key);
      if (!program) {
        track(() => (program = compile(fn)));
        if (cache) programs.set(key, program!);
      }
      gpu.frame(() => program!.ops.forEach((op) => op()));
      for (const [s, texture] of program!.finals) s.current = texture;
    },
  };
}
