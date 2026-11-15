export type Resource = GPUTexture | GPUBuffer | GPUSampler;
export type Bindings = Record<string, Resource>;
export type Target = GPUTexture | (() => GPUTexture);
export type Out = Target | Target[] | number[];
export type Op = () => void;
export interface Command {
  (bindings: Bindings, out: Out): void;
  prepare(bindings: Bindings, out: Out): Op;
}
export type GPU = ReturnType<typeof createGPU>;

const FULLSCREEN = /* wgsl */ `
@vertex fn vert(@builtin(vertex_index) i: u32) -> @builtin(position) vec4f {
  return vec4f(vec2f(vec2u(i & 1, i >> 1)) * 4 - 1, 0, 1);
}`;

const STORAGE_FORMATS = /^(r32|rgba(8|16|32))(float|uint|sint|unorm|snorm)$/;

type Var = {
  name: string;
  group: number;
  binding: number;
  layout: Omit<GPUBindGroupLayoutEntry, "binding" | "visibility">;
};
export type Shader = {
  code: string;
  entries: Record<string, { stage: "fragment" | "compute" | "vertex"; bindings: Var[]; workgroupSize?: number[] }>;
};
type Layout = { layout: GPUBindGroupLayout; vars: Var[]; cache: WeakMap<Resource, any> };

export function createGPU(device: GPUDevice) {
  let encoder: GPUCommandEncoder | undefined;
  let computePass: GPUComputePassEncoder | undefined;
  const endCompute = () => (computePass?.end(), (computePass = undefined));
  const enc = () => encoder ?? fail("commands must run inside gpu.frame()");
  const fail = (msg: string): never => {
    throw new Error(msg);
  };

  const views = new WeakMap<GPUTexture, GPUTextureView>();
  const view = (t: GPUTexture) => views.get(t) ?? (views.set(t, t.createView()), views.get(t)!);
  const resolve = (t: Target) => (typeof t === "function" ? t() : t);
  const vertex = { module: device.createShaderModule({ code: FULLSCREEN }) };

  const layouts = new Map<string, Omit<Layout, "vars">>();
  const layoutFor = (vars: Var[], visibility: number): Layout => {
    const entries = vars.map((v) => ({ binding: v.binding, visibility, ...v.layout }));
    const key = JSON.stringify(entries);
    if (!layouts.has(key))
      layouts.set(key, { layout: device.createBindGroupLayout({ entries }), cache: new WeakMap() });
    return { ...layouts.get(key)!, vars };
  };

  // Bind groups are cached in a trie of WeakMaps keyed by the bound resources.
  const bind = ({ layout, vars, cache }: Layout, bindings: Bindings): GPUBindGroup => {
    let node: any = cache;
    const resources = vars.map((v) => bindings[v.name] ?? fail(`missing binding "${v.name}"`));
    for (const r of resources) node = node.get(r) ?? (node.set(r, new WeakMap()), node.get(r));
    return (node.group ??= device.createBindGroup({
      layout,
      entries: resources.map((r, i) => ({
        binding: vars[i].binding,
        resource: r instanceof GPUTexture ? view(r) : r instanceof GPUBuffer ? { buffer: r } : r,
      })),
    }));
  };

  const shader = ({ code, entries }: Shader, constants?: Record<string, number>): Record<string, Command> => {
    const module = device.createShaderModule({ code });
    const commands: Record<string, Command> = {};
    for (const [entryPoint, { stage: kind, bindings: vars, workgroupSize = [] }] of Object.entries(entries)) {
      if (kind === "vertex") continue;
      const compute = kind === "compute";
      const groups: Var[][] = [];
      for (const v of vars) (groups[v.group] ??= []).push(v);
      const visibility = compute ? GPUShaderStage.COMPUTE : GPUShaderStage.FRAGMENT;
      const groupLayouts = Array.from(groups, (g = []) => layoutFor(g, visibility));
      const layout = device.createPipelineLayout({ bindGroupLayouts: groupLayouts.map((g) => g.layout) });
      const stage = { module, entryPoint, constants };
      const pipelines = new Map<string, GPURenderPipeline | GPUComputePipeline>();
      const pipeline = (formats: GPUTextureFormat[]) => {
        const key = formats.join();
        if (!pipelines.has(key))
          pipelines.set(
            key,
            compute
              ? device.createComputePipeline({ label: entryPoint, layout, compute: stage })
              : device.createRenderPipeline({
                  label: entryPoint,
                  layout,
                  vertex,
                  fragment: { ...stage, targets: formats.map((format) => ({ format })) },
                }),
          );
        return pipelines.get(key)!;
      };
      const prepare = (bindings: Bindings, out: Out): Op => {
        const bindGroups = groupLayouts.map((g) => bind(g, bindings));
        if (compute) {
          const p = pipeline([]) as GPUComputePipeline;
          const counts = (out as number[]).map((n, i) => Math.ceil(n / (workgroupSize[i] ?? 1)));
          return () => {
            const pass = (computePass ??= enc().beginComputePass());
            pass.setPipeline(p);
            bindGroups.forEach((g, i) => pass.setBindGroup(i, g));
            pass.dispatchWorkgroups(counts[0], counts[1], counts[2]);
          };
        }
        const targets = [out].flat() as Target[];
        const p = pipeline(targets.map((t) => resolve(t).format)) as GPURenderPipeline;
        const attach = () =>
          targets.map(
            (t): GPURenderPassColorAttachment => ({ view: view(resolve(t)), loadOp: "clear", storeOp: "store" }),
          );
        const fixed = targets.some((t) => typeof t === "function") ? undefined : attach();
        return () => {
          endCompute();
          const pass = enc().beginRenderPass({ label: entryPoint, colorAttachments: fixed ?? attach() });
          pass.setPipeline(p);
          bindGroups.forEach((g, i) => pass.setBindGroup(i, g));
          pass.draw(3);
          pass.end();
        };
      };
      commands[entryPoint] = Object.assign((bindings: Bindings, out: Out) => prepare(bindings, out)(), { prepare });
    }
    return commands;
  };

  return {
    device,
    shader,
    frame(fn: () => void) {
      encoder = device.createCommandEncoder();
      fn();
      endCompute();
      device.queue.submit([encoder.finish()]);
      encoder = undefined;
    },
    texture(format: GPUTextureFormat, size: number[], usage?: number) {
      usage ??=
        GPUTextureUsage.TEXTURE_BINDING |
        GPUTextureUsage.RENDER_ATTACHMENT |
        GPUTextureUsage.COPY_SRC |
        GPUTextureUsage.COPY_DST |
        (STORAGE_FORMATS.test(format) ? GPUTextureUsage.STORAGE_BINDING : 0);
      return device.createTexture({ format, size, usage });
    },
    /** Submits immediately: for setup, not for use inside a frame. */
    clear(texture: GPUTexture, clearValue: number[]) {
      const e = device.createCommandEncoder();
      e.beginRenderPass({
        colorAttachments: [{ view: view(texture), clearValue, loadOp: "clear", storeOp: "store" }],
      }).end();
      device.queue.submit([e.finish()]);
    },
    copy(from: GPUTexture, to: GPUTexture) {
      endCompute();
      enc().copyTextureToTexture({ texture: from }, { texture: to }, [from.width, from.height]);
    },
  };
}
