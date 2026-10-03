import {
  createMemo,
  createSignal,
  createRenderEffect,
  onMount,
  onCleanup,
  createResource,
  createEffect,
} from "solid-js";
import type { Accessor } from "solid-js";
import { render } from "solid-js/web";
import vertWGSL from "../shaders/vert.wesl?static";
import advectWGSL from "../shaders/advect.wesl?static";
import divergenceWGSL from "../shaders/divergence.wesl?static";
import multigridWGSL from "../shaders/multigrid.wesl?static";
import restrictWGSL from "../shaders/restrict.wesl?static";
import prolongWGSL from "../shaders/prolong.wesl?static";
import gradientWGSL from "../shaders/gradient.wesl?static";
import pressureWGSL from "../shaders/pressure.wesl?static";
import splatWGSL from "../shaders/splat.wesl?static";
import { makeEventListener } from "@solid-primitives/event-listener";
import "./index.css";

const mapObject =
  <U, F extends (key: string, value: U) => any>(fn: F) =>
  <T extends Record<string, U>>(obj: T) =>
    Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, fn(k, v as U)])) as { [K in keyof T]: ReturnType<F> };

const DOWNSAMPLE = 1;
// Pressure solve: multigrid V-cycles per projection, each with this many red-black
// Gauss-Seidel sweeps before restriction and after prolongation on every level.
const V_CYCLES = 1;
const PRE_SWEEPS = 2;
const POST_SWEEPS = 2;
type VelTouch = {
  identifier: number;
  x: number;
  y: number;
  uniform: GPUBuffer;
};
type GPUProgram = (props: {
  width: Accessor<number>;
  height: Accessor<number>;
  device: GPUDevice;
  context: GPUCanvasContext;
}) => void;

const GPUProgram: GPUProgram = ({ width, height, context, device }) => {
  const presentationFormat = navigator.gpu.getPreferredCanvasFormat();
  const shaders = {
    vert: device.createShaderModule({ code: vertWGSL }),
    advect: device.createShaderModule({ code: advectWGSL }),
    divergence: device.createShaderModule({ code: divergenceWGSL }),
    gradient: device.createShaderModule({ code: gradientWGSL }),
    pressure: device.createShaderModule({ code: pressureWGSL }),
    splat: device.createShaderModule({ code: splatWGSL }),
    multigrid: device.createShaderModule({ code: multigridWGSL }),
    restrict: device.createShaderModule({ code: restrictWGSL }),
    prolong: device.createShaderModule({ code: prolongWGSL }),
  };

  const layouts = mapObject((name, entries: ("buffer" | "texture" | "sampler")[]) =>
    device.createBindGroupLayout({
      entries: entries.map<GPUBindGroupLayoutEntry>((type, i) => {
        if (type === "buffer")
          return {
            binding: i,
            visibility: GPUShaderStage.FRAGMENT,
            buffer: { type: "uniform" },
          };
        if (type === "texture")
          return {
            binding: i,
            visibility: GPUShaderStage.FRAGMENT,
            texture: { viewDimension: "2d", sampleType: "float" },
          };
        if (type === "sampler")
          return {
            binding: i,
            visibility: GPUShaderStage.FRAGMENT,
            sampler: { type: "filtering" },
          };
        throw new Error("Unknown type");
      }),
      label: name + " layout",
    }),
  )({
    main: ["sampler"],
    dyeVelocity: ["texture", "texture"],
    float: ["texture"],
    gradient: ["texture", "texture"],
    splatTouch: ["buffer"],
  });

  const pipeline = (
    module: GPUShaderModule,
    targets: GPUColorTargetState[],
    layouts: GPUBindGroupLayout[],
    options: { entryPoint?: string; constants?: Record<string, number> } = {},
  ) => ({ module, targets, layouts, ...options });

  const fmt = (str: string) => ({ format: (str + "float") as GPUTextureFormat });

  const pipelines = mapObject((name, spec: ReturnType<typeof pipeline>) =>
    device.createRenderPipeline({
      label: name + " pipeline",
      vertex: {
        module: shaders.vert,
        entryPoint: "vert",
      },
      primitive: {
        topology: "triangle-strip",
        stripIndexFormat: "uint16",
      },
      fragment: {
        module: spec.module,
        entryPoint: spec.entryPoint ?? name,
        targets: spec.targets,
        constants: spec.constants,
      },
      layout: device.createPipelineLayout({ bindGroupLayouts: spec.layouts, label: name + " pipeline layout" }),
    }),
  )({
    splatDye: pipeline(shaders.splat, [fmt("rgba16")], [layouts.dyeVelocity, layouts.splatTouch]),
    splatVelocity: pipeline(shaders.splat, [fmt("rg16")], [layouts.dyeVelocity, layouts.splatTouch]),
    advectDyePredict: pipeline(shaders.advect, [fmt("rgba16")], [layouts.main, layouts.dyeVelocity]),
    macCormackDye: pipeline(
      shaders.advect,
      [fmt("rgba16"), { format: presentationFormat }],
      [layouts.main, layouts.dyeVelocity, layouts.float],
    ),
    advectVelocity: pipeline(shaders.advect, [fmt("rg16")], [layouts.main, layouts.dyeVelocity, layouts.float]),
    gradient: pipeline(shaders.gradient, [fmt("rg16")], [layouts.gradient]),
    reflect: pipeline(shaders.gradient, [fmt("rg16")], [layouts.gradient], {
      entryPoint: "gradient",
      constants: { gradScale: 2 },
    }),
    displayPressure: pipeline(shaders.pressure, [{ format: presentationFormat }], [layouts.main, layouts.float]),
  });

  // Compute bindings: "texture" is a textureLoad-only input, "rw"/"w" are r32float storage.
  const computeLayouts = mapObject((name, entries: ("texture" | "rw" | "w")[]) =>
    device.createBindGroupLayout({
      label: name + " layout",
      entries: entries.map<GPUBindGroupLayoutEntry>((type, binding) =>
        type === "texture"
          ? { binding, visibility: GPUShaderStage.COMPUTE, texture: { sampleType: "unfilterable-float" } }
          : {
              binding,
              visibility: GPUShaderStage.COMPUTE,
              storageTexture: { access: type === "rw" ? "read-write" : "write-only", format: "r32float" },
            },
      ),
    }),
  )({
    divergence: ["texture", "w", "w"],
    smooth: ["texture", "rw"],
    restrict: ["texture", "texture", "w", "w"],
    prolong: ["texture", "rw"],
  });

  const computePipeline = (module: GPUShaderModule, entryPoint: string, layout: GPUBindGroupLayout) =>
    device.createComputePipeline({
      label: entryPoint + " pipeline",
      layout: device.createPipelineLayout({ bindGroupLayouts: [layout] }),
      compute: { module, entryPoint },
    });

  const computePipelines = {
    divergence: computePipeline(shaders.divergence, "divergence", computeLayouts.divergence),
    smoothRed: computePipeline(shaders.multigrid, "smoothRed", computeLayouts.smooth),
    smoothBlack: computePipeline(shaders.multigrid, "smoothBlack", computeLayouts.smooth),
    coarseSolve: computePipeline(shaders.multigrid, "coarseSolve", computeLayouts.smooth),
    restrict: computePipeline(shaders.restrict, "restrictResidual", computeLayouts.restrict),
    prolong: computePipeline(shaders.prolong, "prolong", computeLayouts.prolong),
  };

  const dwidth = () => width() >> DOWNSAMPLE;
  const dheight = () => height() >> DOWNSAMPLE;
  createRenderEffect(() => {
    context.configure({
      device,
      alphaMode: "opaque",
      format: presentationFormat,
      usage: GPUTextureUsage.COPY_SRC | GPUTextureUsage.RENDER_ATTACHMENT,
    });
  });

  const createTexture = (
    format?: GPUTextureFormat,
    usage = GPUTextureUsage.TEXTURE_BINDING |
      GPUTextureUsage.COPY_DST |
      GPUTextureUsage.COPY_SRC |
      GPUTextureUsage.RENDER_ATTACHMENT,
  ) =>
    createMemo((last?: GPUTexture) => {
      if (last) last.destroy();
      const newTex = device.createTexture({
        format: format ?? presentationFormat,
        dimension: "2d",
        mipLevelCount: 1,
        size: format == "rgba16float" ? [width(), height()] : [dwidth(), dheight()],
        usage,
      });

      return newTex;
    });

  class Swappable {
    arr: [Accessor<GPUTexture>, Accessor<GPUTexture>];
    parity = 0;
    constructor(format?: GPUTextureFormat, usage?: number) {
      this.arr = [createTexture(format, usage), createTexture(format, usage)];
    }
    get read() {
      return this.arr[this.parity]();
    }
    get write() {
      return this.arr[1 - this.parity]();
    }
    swap() {
      this.parity = 1 - this.parity;
    }
  }

  const dye = new Swappable("rgba16float");
  const velocity = new Swappable("rg16float");
  const solverUsage = GPUTextureUsage.TEXTURE_BINDING | GPUTextureUsage.COPY_SRC | GPUTextureUsage.STORAGE_BINDING;
  const pressure = createTexture("r32float", solverUsage);
  const divergenceTex = createTexture("r32float", solverUsage);
  // Advection-reflection keeps the projected half-step velocity here while the reflected
  // field is advected by it; MacCormack keeps the predicted dye here.
  const velocityTilde = createTexture("rg16float");
  const dyePredicted = createTexture("rgba16float");

  // Multigrid hierarchy: level 0 solves pressure against the divergence; each coarser level
  // (half the size, rounded up) solves for a correction against the restricted residual,
  // down to a grid that fits in one 16x16 workgroup.
  type Level = { x: GPUTexture; rhs: GPUTexture };
  const coarseLevels = createMemo((last?: Level[]) => {
    last?.forEach((l) => (l.x.destroy(), l.rhs.destroy()));
    const out: Level[] = [];
    let [w, h] = [dwidth(), dheight()];
    while (w > 16 || h > 16) {
      [w, h] = [Math.ceil(w / 2), Math.ceil(h / 2)];
      const tex = () => device.createTexture({ format: "r32float", size: [w, h], usage: solverUsage });
      out.push({ x: tex(), rhs: tex() });
    }
    return out;
  });

  const uniforms = device.createBuffer({
    size: 4 << 2,
    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
    mappedAtCreation: false,
  });

  const makeUniformsPerTouch = () =>
    device.createBuffer({
      size: 12 << 2,
      usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
      mappedAtCreation: false,
    });

  const sampler = device.createSampler({
    addressModeU: "clamp-to-edge",
    addressModeV: "clamp-to-edge",
    magFilter: "linear",
    minFilter: "linear",
  });

  const randomColor = (t: number) => [
    Math.sin(t + 0) * 0.4 + 0.4,
    Math.sin(t + 2) * 0.4 + 0.4,
    Math.sin(t + 4) * 0.4 + 0.4,
  ];

  const touches: Map<number, VelTouch> = new Map();
  const createTouch = (touch: { clientX: number; clientY: number; identifier: number }) => {
    const m = {
      identifier: touch.identifier,
      time: Date.now(),
      x: touch.clientX,
      y: touch.clientY,
      velocity: { x: 0, y: 0 },
      uniform: makeUniformsPerTouch(),
    };

    device.queue.writeBuffer(
      m.uniform,
      0 << 2,
      new Float32Array([...randomColor(Math.random() * Math.PI * 2), 1, m.x, m.y, 0, 0, m.x, m.y]),
    );

    touches.set(m.identifier, m);
  };
  const clampVelocity = (delta: number, len: number, maxLen: number, speed: number) =>
    len * speed > maxLen ? (delta / len) * maxLen : delta * speed;

  const moveTouch = (touch: { clientX: number; clientY: number; identifier: number }) => {
    const m = touches.get(touch.identifier);
    if (!m) {
      createTouch(touch);
      return;
    }
    const [prevX, prevY] = [m.x, m.y];
    [m.x, m.y] = [touch.clientX, touch.clientY];
    const [delX, delY] = [m.x - prevX, m.y - prevY];
    const len = Math.sqrt(delX * delX + delY * delY);
    const [maxLen, speed] = [2000, 16];
    device.queue.writeBuffer(
      m.uniform,
      4 << 2,
      new Float32Array([m.x, m.y, clampVelocity(delX, len, maxLen, speed), clampVelocity(delY, len, maxLen, speed)]),
    );
  };
  const destroyTouch = (touch: { clientX: number; clientY: number; identifier: number }) => {
    const m = touches.get(touch.identifier);
    if (!m) return;
    touches.delete(m.identifier);
    m.uniform.destroy();
  };

  makeEventListener(window, "mousemove", (e: MouseEvent) => {
    moveTouch({ clientX: e.clientX, clientY: e.clientY, identifier: -1 });
  });

  makeEventListener(window, "wheel", (e) => e.preventDefault(), { passive: false });
  const touchEvents = {
    touchstart: createTouch,
    touchmove: moveTouch,
    touchend: destroyTouch,
  } as const;
  for (const [type, handler] of Object.entries(touchEvents)) {
    makeEventListener(
      window,
      type as keyof typeof touchEvents,
      (e) => {
        e.preventDefault();
        destroyTouch({ identifier: -1, clientX: 0, clientY: 0 });
        Array.from(e.changedTouches).forEach(handler);
      },
      { passive: false },
    );
  }

  createRenderEffect(() => {
    device.queue.writeBuffer(uniforms, 0 << 2, new Int32Array([dwidth(), dheight(), width(), height()]));
  });

  const entries = (resources: GPUBindingResource[]) =>
    resources.map<GPUBindGroupEntry>((resource, i) => ({
      binding: i,
      resource,
    }));

  // Bind groups over a mix of swappable and fixed textures, one per combination of the
  // swappables' parities, so each swappable can be swapped independently.
  class BindPair {
    arr: Accessor<GPUBindGroup[]>;
    private swappables: Swappable[];
    constructor(layout: GPUBindGroupLayout, resources: (Swappable | Accessor<GPUTexture>)[], label: string) {
      this.swappables = [...new Set(resources.filter((r): r is Swappable => r instanceof Swappable))];
      this.arr = createMemo(() =>
        Array.from({ length: 1 << this.swappables.length }, (_, mask) => {
          const getTex = (r: Swappable | Accessor<GPUTexture>) =>
            r instanceof Swappable ? r.arr[(mask >> this.swappables.indexOf(r)) & 1]() : r();
          return device.createBindGroup({
            layout,
            entries: entries(resources.map((r) => getTex(r).createView())),
            label: `${label} [${mask}]`,
          });
        }),
      );
    }
    read() {
      return this.arr()[this.swappables.reduce((mask, r, i) => mask | (r.parity << i), 0)];
    }
  }

  const mainBindGroup = device.createBindGroup({
    layout: layouts.main,
    label: "main bind group",
    entries: entries([sampler]),
  });

  const dyeVelocityPair = new BindPair(layouts.dyeVelocity, [dye, velocity], "dye velocity");
  const velocityPair = new BindPair(layouts.float, [velocity], "velocity");
  const gradientPair = new BindPair(layouts.gradient, [pressure, velocity], "gradient");
  const divergencePair = new BindPair(computeLayouts.divergence, [velocity, divergenceTex, pressure], "divergence");

  const bindTextures = (layout: GPUBindGroupLayout, textures: GPUTexture[]) =>
    device.createBindGroup({ layout, entries: entries(textures.map((t) => t.createView())) });

  const solver = createMemo(() => {
    const levels = [{ x: pressure(), rhs: divergenceTex() }, ...coarseLevels()];
    const coarser = levels.slice(1);
    return {
      levels,
      smooth: levels.map((l) => bindTextures(computeLayouts.smooth, [l.rhs, l.x])),
      restrict: coarser.map((c, i) => bindTextures(computeLayouts.restrict, [levels[i].x, levels[i].rhs, c.rhs, c.x])),
      prolong: coarser.map((c, i) => bindTextures(computeLayouts.prolong, [c.x, levels[i].x])),
    };
  });

  const pressureDisplayBindGroup = createMemo(() => bindTextures(layouts.float, [pressure()]));
  const dyeVelocityTildePair = new BindPair(layouts.dyeVelocity, [dye, velocityTilde], "dye velocityTilde");
  const dyePredictedBindGroup = createMemo(() => bindTextures(layouts.float, [dyePredicted()]));

  const colorAttachment = (view: GPUTexture): GPURenderPassColorAttachment => ({
    view: view.createView(),
    clearValue: { r: 0.0, g: 0.0, b: 0.0, a: 1.0 },
    storeOp: "store",
    loadOp: "clear",
  });

  device.queue.writeTexture(
    { texture: dye.read },
    new Float16Array(width() * height() * 4).fill(1),
    { bytesPerRow: width() * 2 * 4 },
    { width: width(), height: height() },
  );

  // Debug hooks for headless testing (?drive): expose textures for readback.
  if (location.search.includes("drive")) {
    (window as any).__fluid = {
      device,
      velocity: () => velocity.read,
      dye: () => dye.read,
      pressure: () => pressure(),
      divergence: () => divergenceTex(),
      dims: () => [dwidth(), dheight()],
    };
  }

  const groups = (n: number) => Math.ceil(n / 8);
  const relax = (pass: GPUComputePassEncoder, bindGroup: GPUBindGroup, tex: GPUTexture, sweeps: number) => {
    pass.setBindGroup(0, bindGroup);
    for (let s = 0; s < sweeps; s++) {
      for (const pipeline of [computePipelines.smoothRed, computePipelines.smoothBlack]) {
        pass.setPipeline(pipeline);
        pass.dispatchWorkgroups(groups(Math.ceil(tex.width / 2)), groups(tex.height));
      }
    }
  };

  // One multigrid V-cycle, starting from the (zeroed) pressure.
  const vCycle = (pass: GPUComputePassEncoder) => {
    const { levels, smooth, restrict, prolong } = solver();
    const coarsest = levels.length - 1;
    for (let l = 0; l < coarsest; l++) {
      relax(pass, smooth[l], levels[l].x, PRE_SWEEPS);
      pass.setPipeline(computePipelines.restrict);
      pass.setBindGroup(0, restrict[l]);
      pass.dispatchWorkgroups(groups(levels[l + 1].x.width), groups(levels[l + 1].x.height));
    }
    pass.setPipeline(computePipelines.coarseSolve);
    pass.setBindGroup(0, smooth[coarsest]);
    pass.dispatchWorkgroups(1);
    for (let l = coarsest - 1; l >= 0; l--) {
      pass.setPipeline(computePipelines.prolong);
      pass.setBindGroup(0, prolong[l]);
      pass.dispatchWorkgroups(groups(levels[l].x.width), groups(levels[l].x.height));
      relax(pass, smooth[l], levels[l].x, POST_SWEEPS);
    }
  };

  let animation: number;
  let t = 0;
  const frame = () => {
    const commandEncoder = device.createCommandEncoder();

    const renderPass = (textures: GPUTexture[], pipeline: GPURenderPipeline, bindGroups: GPUBindGroup[]) => {
      const passEncoder = commandEncoder.beginRenderPass({
        colorAttachments: textures.map(colorAttachment),
        label: pipeline.label,
      });
      passEncoder.setPipeline(pipeline);
      bindGroups.forEach((bg, i) => passEncoder.setBindGroup(i, bg));
      passEncoder.draw(3, 1, 0, 0);
      passEncoder.end();
    };

    for (const mouse of touches.values()) {
      const bindTouch = device.createBindGroup({
        layout: layouts.splatTouch,
        entries: [{ binding: 0, resource: { buffer: mouse.uniform } }],
      });
      const dvPair = dyeVelocityPair.read();
      renderPass([dye.write], pipelines.splatDye, [dvPair, bindTouch]);
      renderPass([velocity.write], pipelines.splatVelocity, [dvPair, bindTouch]);
      dye.swap();
      velocity.swap();
    }

    const currentTexture = context.getCurrentTexture();

    // Advects dye and velocity (the field bound as velocityPair) half a step through the
    // velocity bound in `advecting` alongside the dye. Dye uses MacCormack: a
    // semi-Lagrangian prediction, then a limited correction pass.
    const advect = (advecting: GPUBindGroup) => {
      renderPass([dyePredicted()], pipelines.advectDyePredict, [mainBindGroup, advecting]);
      renderPass([dye.write, currentTexture], pipelines.macCormackDye, [
        mainBindGroup,
        advecting,
        dyePredictedBindGroup(),
      ]);
      renderPass([velocity.write], pipelines.advectVelocity, [mainBindGroup, advecting, velocityPair.read()]);
      dye.swap();
      velocity.swap();
    };

    const solvePressure = () => {
      const pass = commandEncoder.beginComputePass({ label: "pressure solve" });
      pass.setPipeline(computePipelines.divergence);
      pass.setBindGroup(0, divergencePair.read());
      pass.dispatchWorkgroups(Math.ceil(dwidth() / 8), Math.ceil(dheight() / 8));
      for (let c = 0; c < V_CYCLES; c++) vCycle(pass);
      pass.end();
    };

    // Advection-reflection (Zehnder et al. 2018): advect half a step, then reflect the
    // velocity across the divergence-free subspace instead of projecting onto it, so the
    // energy a projection would remove is kept. The reflected field is advected by the
    // projected one for the second half step, and only the result is projected.
    advect(dyeVelocityPair.read());
    solvePressure();
    renderPass([velocityTilde()], pipelines.gradient, [gradientPair.read()]);
    renderPass([velocity.write], pipelines.reflect, [gradientPair.read()]);
    velocity.swap();
    advect(dyeVelocityTildePair.read());
    solvePressure();
    renderPass([velocity.write], pipelines.gradient, [gradientPair.read()]);
    velocity.swap();

    // Render pressure texture to the screen (red = positive, blue = negative) with ?pressure
    if (location.search.includes("pressure")) {
      renderPass([currentTexture], pipelines.displayPressure, [mainBindGroup, pressureDisplayBindGroup()]);
    }

    device.queue.submit([commandEncoder.finish()]);

    for (const mouse of touches.values()) {
      device.queue.writeBuffer(mouse.uniform, 6 << 2, new Float32Array([0, 0, mouse.x, mouse.y]));
    }
    const m = touches.get(-1);
    if (m) device.queue.writeBuffer(m.uniform, 0 << 2, new Float32Array(randomColor(t)));

    t += 0.1;
    animation = requestAnimationFrame(frame);
  };

  onMount(frame);
  onCleanup(() => cancelAnimationFrame(animation));
};

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
    let device = gpu();
    if (!device) return;
    const context = c.getContext("webgpu")!;
    GPUProgram({
      context,
      device,
      width,
      height,
    });
  });

  return <canvas ref={c} width={width()} height={height()}></canvas>;
};

render(App, document.getElementById("root")!);
