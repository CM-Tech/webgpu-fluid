import { createEffect, createResource, createSignal, onCleanup, onMount } from "solid-js";
import { render } from "solid-js/web";
import { makeEventListener } from "@solid-primitives/event-listener";
import advectShader from "../shaders/advect.wesl?reflect";
import divergenceShader from "../shaders/divergence.wesl?reflect";
import multigridShader from "../shaders/multigrid.wesl?reflect";
import restrictShader from "../shaders/restrict.wesl?reflect";
import prolongShader from "../shaders/prolong.wesl?reflect";
import gradientShader from "../shaders/gradient.wesl?reflect";
import splatShader from "../shaders/splat.wesl?reflect";
import { createGPU } from "./gpu/core";
import { createGraph, type Tex } from "./gpu/graph";
import { createTouches } from "./touches";
import "./index.css";

const DOWNSAMPLE = 1;
const V_CYCLES = 1;
const PRE_SWEEPS = 2;
const POST_SWEEPS = 2;

function createFluid(device: GPUDevice, context: GPUCanvasContext, width: () => number, height: () => number) {
  const g = createGraph(createGPU(device));
  const { splatDye, splatVelocity } = g.shader(splatShader);
  const { advectDye, advectVelocity } = g.shader(advectShader);
  const { divergence } = g.shader(divergenceShader);
  const { smoothRed, smoothBlack, coarseSolve } = g.shader(multigridShader);
  const { restrictResidual } = g.shader(restrictShader);
  const { prolong } = g.shader(prolongShader);
  const { gradient } = g.shader(gradientShader);
  const { gradient: reflect } = g.shader(gradientShader, { gradScale: 2 });

  const texSampler = device.createSampler({ magFilter: "linear", minFilter: "linear" });
  const touches = createTouches(device);

  context.configure({
    device,
    alphaMode: "opaque",
    format: navigator.gpu.getPreferredCanvasFormat(),
    usage: GPUTextureUsage.COPY_SRC | GPUTextureUsage.RENDER_ATTACHMENT,
  });

  const fullSize = () => [width(), height()];
  const simSize = () => [width() >> DOWNSAMPLE, height() >> DOWNSAMPLE];
  const dye = g.state("rgba16float", fullSize, [1, 1, 1, 1]);
  const velocity = g.state("rg32float", simSize);
  const dyeTex = () => g.tex("rgba16float", fullSize());
  const velocityTex = () => g.tex("rg32float", simSize());
  const screen = () => context.getCurrentTexture();

  type Level = { x: Tex; rhs: Tex };
  const relax = (l: Level, sweeps: number) => {
    for (let s = 0; s < sweeps; s++) {
      smoothRed(l, [Math.ceil(l.x.size[0] / 2), l.x.size[1]]);
      smoothBlack(l, [Math.ceil(l.x.size[0] / 2), l.x.size[1]]);
    }
  };
  const solvePressure = (velocity: Tex) => {
    const levels: Level[] = [];
    for (let [w, h] = simSize(); ; [w, h] = [Math.ceil(w / 2), Math.ceil(h / 2)]) {
      levels.push({ x: g.tex("r32float", [w, h]), rhs: g.tex("r32float", [w, h]) });
      if (w <= 16 && h <= 16) break;
    }
    const coarsest = levels.length - 1;
    divergence({ velocity, divergenceOut: levels[0].rhs, pressure: levels[0].x }, levels[0].x.size);
    for (let cycle = 0; cycle < V_CYCLES; cycle++) {
      for (let l = 0; l < coarsest; l++) {
        relax(levels[l], PRE_SWEEPS);
        const [fine, coarse] = [levels[l], levels[l + 1]];
        restrictResidual({ fineX: fine.x, fineRhs: fine.rhs, coarseRhs: coarse.rhs, coarseX: coarse.x }, coarse.x.size);
      }
      coarseSolve(levels[coarsest], [1, 1]);
      for (let l = coarsest - 1; l >= 0; l--) {
        prolong({ coarseX: levels[l + 1].x, fineX: levels[l].x }, levels[l].x.size);
        relax(levels[l], POST_SWEEPS);
      }
    }
    return levels[0].x;
  };

  const advect = (dye: Tex, velocity: Tex, by: Tex) => {
    const fields = { texSampler, dye, velocity: by };
    const [advected] = advectDye(fields, [dyeTex(), screen]);
    return [advected as Tex, advectVelocity({ ...fields, source: velocity }, velocityTex())];
  };

  const step = () => {
    let [d, v] = [dye.value, velocity.value];
    for (const touch of touches.list()) {
      const fields = { dye: d, velocity: v, touch: touch.uniform };
      [d, v] = [splatDye(fields, dyeTex()), splatVelocity(fields, velocityTex())];
    }

    // Advection-reflection (Zehnder et al. 2018)
    [d, v] = advect(d, v, v);
    const pressure = solvePressure(v);
    const projected = gradient({ pressure, velocity: v }, velocityTex());
    const reflected = reflect({ pressure, velocity: v }, velocityTex());
    [d, v] = advect(d, reflected, projected);
    v = gradient({ pressure: solvePressure(v), velocity: v }, velocityTex());

    [dye.value, velocity.value] = [d, v];
  };

  let animation: number;
  const frame = () => {
    g.frame(step);
    touches.endFrame();
    animation = requestAnimationFrame(frame);
  };
  onMount(frame);
  onCleanup(() => cancelAnimationFrame(animation));
}

const App = () => {
  const [width, setWidth] = createSignal(window.innerWidth);
  const [height, setHeight] = createSignal(window.innerHeight);
  makeEventListener(window, "resize", () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  });

  let c!: HTMLCanvasElement;

  const [gpu] = createResource(async () => {
    const adapter = await navigator.gpu?.requestAdapter();
    if (!adapter) throw new Error("No GPU support");
    return await adapter.requestDevice({ requiredFeatures: ["float32-filterable"] });
  });

  createEffect(() => {
    const device = gpu();
    if (device) createFluid(device, c.getContext("webgpu")!, width, height);
  });

  return <canvas ref={c} width={width()} height={height()}></canvas>;
};

render(App, document.getElementById("root")!);
