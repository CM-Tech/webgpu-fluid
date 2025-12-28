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
import { runBenchmark } from "./benchmark";
import vertWGSL from "../shaders/vert.wesl?static";
import advectWGSL from "../shaders/advect.wesl?static";
import clearWGSL from "../shaders/clear.wesl?static";
import divergenceWGSL from "../shaders/divergence.wesl?static";
import jacobiWGSL from "../shaders/jacobi.wesl?static";
import jacobiComputeWGSL from "../shaders/jacobi_compute.wesl?static";
import gradientWGSL from "../shaders/gradient.wesl?static";
import vorticityWGSL from "../shaders/vorticity.wesl?static";
import splatWGSL from "../shaders/splat.wesl?static";
import { makeEventListener } from "@solid-primitives/event-listener";
import "./index.css";

const mapObject =
  <U, F extends (key: string, value: U) => any>(fn: F) =>
    <T extends Record<string, U>>(obj: T) =>
      Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, fn(k, v as U)])) as { [K in keyof T]: ReturnType<F> };

const DOWNSAMPLE = 0;
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
    clear: device.createShaderModule({ code: clearWGSL }),
    divergence: device.createShaderModule({ code: divergenceWGSL }),
    jacobi: device.createShaderModule({ code: jacobiWGSL }),
    jacobiCompute: device.createShaderModule({ code: jacobiComputeWGSL }),
    gradient: device.createShaderModule({ code: gradientWGSL }),
    vorticity: device.createShaderModule({ code: vorticityWGSL }),
    splat: device.createShaderModule({ code: splatWGSL }),
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

  const pipeline = (module: GPUShaderModule, targets: GPUColorTargetState[], layouts: GPUBindGroupLayout[]) => ({
    module,
    targets,
    layouts,
  });

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
        entryPoint: name,
        targets: spec.targets,
      },
      layout: device.createPipelineLayout({ bindGroupLayouts: spec.layouts, label: name + " pipeline layout" }),
    }),
  )({
    splatDye: pipeline(shaders.splat, [fmt("rgba16")], [layouts.dyeVelocity, layouts.splatTouch]),
    splatVelocity: pipeline(shaders.splat, [fmt("rg16")], [layouts.dyeVelocity, layouts.splatTouch]),
    advectDye: pipeline(
      shaders.advect,
      [fmt("rgba16"), { format: presentationFormat }],
      [layouts.main, layouts.dyeVelocity],
    ),
    advectVelocity: pipeline(shaders.advect, [fmt("rg16")], [layouts.main, layouts.dyeVelocity]),
    clear: pipeline(shaders.clear, [fmt("r32")], [layouts.float]),
    divergence: pipeline(shaders.divergence, [fmt("r16")], [layouts.float]),
    jacobi: pipeline(shaders.jacobi, [fmt("r32")], [layouts.float, layouts.float]),
    gradient: pipeline(shaders.gradient, [fmt("rg16")], [layouts.gradient]),
    vorticity: pipeline(shaders.vorticity, [fmt("rg16")], [layouts.float]),
  });

  const computeLayout = device.createBindGroupLayout({
    entries: [
      { binding: 0, visibility: GPUShaderStage.COMPUTE, texture: { sampleType: "float" } },
      { binding: 1, visibility: GPUShaderStage.COMPUTE, texture: { sampleType: "float" } },
      { binding: 2, visibility: GPUShaderStage.COMPUTE, storageTexture: { access: "write-only", format: "r32float" } },
    ],
  });

  const jacobiComputePipeline = device.createComputePipeline({
    layout: device.createPipelineLayout({ bindGroupLayouts: [computeLayout] }),
    compute: { module: shaders.jacobiCompute, entryPoint: "jacobiCompute" },
  });

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
    usage = GPUTextureUsage.TEXTURE_BINDING | GPUTextureUsage.COPY_DST | GPUTextureUsage.RENDER_ATTACHMENT,
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
  const pressure = new Swappable(
    "r32float",
    GPUTextureUsage.TEXTURE_BINDING |
    GPUTextureUsage.COPY_DST |
    GPUTextureUsage.RENDER_ATTACHMENT |
    GPUTextureUsage.STORAGE_BINDING,
  );
  const divergenceTex = createTexture("r16float");

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
    Math.sin(t + 0) * 0.8 + 0.8,
    Math.sin(t + 2) * 0.8 + 0.8,
    Math.sin(t + 4) * 0.8 + 0.8,
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

  class BindPair {
    arr: Accessor<GPUBindGroup[]>;
    constructor(
      layout: GPUBindGroupLayout,
      private resources: Swappable[],
      private label: string,
    ) {
      this.arr = createMemo(() => [
        device.createBindGroup({
          layout,
          entries: entries(resources.map((x) => x.arr[0]().createView())),
          label: `${label} [0]`,
        }),
        device.createBindGroup({
          layout,
          entries: entries(resources.map((x) => x.arr[1]().createView())),
          label: `${label} [1]`,
        }),
      ]);
    }
    read() {
      const parity = this.resources[0].parity;
      if (this.resources.some((r) => r.parity !== parity)) {
        console.error(`Inconsistent parity in BindPair read: ${this.label}`);
      }
      return this.arr()[parity];
    }
  }

  const mainBindGroup = device.createBindGroup({
    layout: layouts.main,
    label: "main bind group",
    entries: entries([sampler]),
  });

  const dyeVelocityPair = new BindPair(layouts.dyeVelocity, [dye, velocity], "dye velocity");
  const pressurePair = new BindPair(layouts.float, [pressure], "pressure");
  const velocityPair = new BindPair(layouts.float, [velocity], "velocity");
  const gradientPair = new BindPair(layouts.gradient, [pressure, velocity], "gradient");

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
    const dvPair = dyeVelocityPair.read();
    renderPass([dye.write, currentTexture], pipelines.advectDye, [mainBindGroup, dvPair]);
    renderPass([velocity.write], pipelines.advectVelocity, [mainBindGroup, dvPair]);
    dye.swap();
    velocity.swap();

    renderPass([divergenceTex()], pipelines.divergence, [velocityPair.read()]);
    renderPass([pressure.write], pipelines.clear, [pressurePair.read()]);
    pressure.swap();
    const iters = 24 + (velocity.parity ^ pressure.parity);
    for (let i = 0; i < iters; i++) {
      const passEncoder = commandEncoder.beginComputePass();
      passEncoder.setPipeline(jacobiComputePipeline);
      passEncoder.setBindGroup(
        0,
        device.createBindGroup({
          layout: computeLayout,
          entries: [
            { binding: 0, resource: divergenceTex().createView() },
            { binding: 1, resource: pressure.read.createView() },
            { binding: 2, resource: pressure.write.createView() },
          ],
        }),
      );
      passEncoder.dispatchWorkgroups(Math.ceil(dwidth() / 8), Math.ceil(dheight() / 8));
      passEncoder.end();
      pressure.swap();
    }
    renderPass([velocity.write], pipelines.gradient, [gradientPair.read()]);
    velocity.swap();
    renderPass([velocity.write], pipelines.vorticity, [velocityPair.read()]);
    velocity.swap();

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

  makeEventListener(window, "keydown", async (e) => {
    if (e.key === "b") {
      cancelAnimationFrame(animation);
      setTimeout(async () => {
        await runBenchmark(
          device,
          pipelines.jacobi,
          jacobiComputePipeline,
          layouts.float,
          computeLayout,
          divergenceTex,
          pressure,
          pressurePair,
          dwidth,
          dheight,
          colorAttachment,
        );
        animation = requestAnimationFrame(frame);
      }, 30);
    }
  });
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
    const canTimestamp = adapter.features.has("timestamp-query");
    return await adapter.requestDevice({
      requiredFeatures: canTimestamp ? ["timestamp-query", "float32-filterable"] : ["float32-filterable"],
    });
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
