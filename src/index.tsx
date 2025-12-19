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
import vertWGSL from "./vert.wgsl?raw";
import advectWGSL from "./advect.wgsl?raw";
import clearWGSL from "./clear.wgsl?raw";
import divergenceWGSL from "./divergence.wgsl?raw";
import jacobiWGSL from "./jacobi.wgsl?raw";
import gradientWGSL from "./gradient.wgsl?raw";
import vorticityWGSL from "./vorticity.wgsl?raw";
import splatWGSL from "./splat.wgsl?raw";
import { makeEventListener } from "@solid-primitives/event-listener";
import "./index.css";

const mapObject =
  <U, F extends (key: string, value: U) => any>(fn: F) =>
  <T extends Record<string, U>>(obj: T) =>
    Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, fn(k, v as U)])) as { [K in keyof T]: ReturnType<F> };

const DOWNSAMPLE = 2;
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
    main: ["buffer"],
    dyeVelocity: ["texture", "texture", "sampler"],
    float: ["texture"],
    gradient: ["texture", "texture"],
    splatTouch: ["buffer"],
  });

  const pipeline = (module: GPUShaderModule, targets: GPUColorTargetState[], layout: GPUBindGroupLayout[]) => ({
    module,
    targets,
    layouts: [layouts.main, ...layout],
  });

  const texFormat = (n: number) => ({ format: ("rgba".slice(0, n) + "16float") as GPUTextureFormat });

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
    splatDye: pipeline(shaders.splat, [texFormat(4)], [layouts.dyeVelocity, layouts.splatTouch]),
    splatVelocity: pipeline(shaders.splat, [texFormat(2)], [layouts.dyeVelocity, layouts.splatTouch]),
    advectDye: pipeline(shaders.advect, [texFormat(4), { format: presentationFormat }], [layouts.dyeVelocity]),
    advectVelocity: pipeline(shaders.advect, [texFormat(2)], [layouts.dyeVelocity]),
    clear: pipeline(shaders.clear, [texFormat(1)], [layouts.float]),
    divergence: pipeline(shaders.divergence, [texFormat(1)], [layouts.float]),
    jacobi: pipeline(shaders.jacobi, [texFormat(1)], [layouts.float, layouts.float]),
    gradient: pipeline(shaders.gradient, [texFormat(2)], [layouts.gradient]),
    vorticity: pipeline(shaders.vorticity, [texFormat(2)], [layouts.float]),
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

  const createTexture = (format?: GPUTextureFormat) =>
    createMemo((last?: GPUTexture) => {
      if (last) last.destroy();
      const newTex = device.createTexture({
        format: format ?? presentationFormat,
        dimension: "2d",
        mipLevelCount: 1,
        size: format == "rgba16float" ? [width(), height()] : [dwidth(), dheight()],
        usage: GPUTextureUsage.TEXTURE_BINDING | GPUTextureUsage.COPY_DST | GPUTextureUsage.RENDER_ATTACHMENT,
      });

      return newTex;
    });

  class Swappable {
    a: Accessor<GPUTexture>;
    b: Accessor<GPUTexture>;
    constructor(format?: GPUTextureFormat) {
      this.a = createTexture(format);
      this.b = createTexture(format);
    }
    get read() {
      return this.a();
    }
    get write() {
      return this.b();
    }
    swap() {
      [this.a, this.b] = [this.b, this.a];
    }
  }

  const dye = new Swappable("rgba16float");
  const velocity = new Swappable("rg16float");
  const pressure = new Swappable("r16float");
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

  const randomColor = () => [Math.random() * 2 + 0.5, Math.random() * 2 + 0.5, Math.random() * 2 + 0.5];

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

    device.queue.writeBuffer(m.uniform, 0 << 2, new Float32Array([...randomColor(), 1, m.x, m.y, 0, 0, m.x, m.y]));

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

  const mainBindGroup = device.createBindGroup({
    layout: layouts.main,
    label: "main bind group",
    entries: entries([{ buffer: uniforms }]),
  });
  const divergenceReadGroup = device.createBindGroup({
    layout: layouts.float,
    label: "divergence read bind group",
    entries: entries([divergenceTex().createView()]),
  });
  const dyeVelocityBindGroup = () =>
    device.createBindGroup({
      layout: layouts.dyeVelocity,
      label: "dye velocity bind group",
      entries: entries([dye.read.createView(), velocity.read.createView(), sampler]),
    });
  const floatBindGroup = (texture: GPUTexture) =>
    device.createBindGroup({
      layout: layouts.float,
      entries: entries([texture.createView()]),
    });
  const gradientBindGroup = (p: GPUTexture, v: GPUTexture) =>
    device.createBindGroup({
      layout: layouts.gradient,
      label: "gradient bind group",
      entries: entries([p.createView(), v.createView()]),
    });

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
      [mainBindGroup, ...bindGroups].forEach((bg, i) => passEncoder.setBindGroup(i, bg));
      passEncoder.draw(4, 1, 0, 0);
      passEncoder.end();
    };

    const renderAndSwap = (fbo: Swappable, pipeline: GPURenderPipeline, bindGroups: GPUBindGroup[]) => {
      renderPass([fbo.write], pipeline, bindGroups);
      fbo.swap();
    };

    for (const mouse of touches.values()) {
      const bindDyeVelocity = dyeVelocityBindGroup();
      const bindTouch = device.createBindGroup({
        layout: layouts.splatTouch,
        entries: [{ binding: 0, resource: { buffer: mouse.uniform } }],
      });
      renderAndSwap(dye, pipelines.splatDye, [bindDyeVelocity, bindTouch]);
      renderAndSwap(velocity, pipelines.splatVelocity, [bindDyeVelocity, bindTouch]);
    }
    const bindDyeVelocity = dyeVelocityBindGroup();
    const currentTexture = context.getCurrentTexture();
    renderPass([dye.write, currentTexture], pipelines.advectDye, [bindDyeVelocity]);
    dye.swap();
    renderAndSwap(velocity, pipelines.advectVelocity, [bindDyeVelocity]);
    renderAndSwap(pressure, pipelines.clear, [floatBindGroup(pressure.read)]);
    renderPass([divergenceTex()], pipelines.divergence, [floatBindGroup(velocity.read)]);
    for (let i = 0; i < 25; i++) {
      renderAndSwap(pressure, pipelines.jacobi, [divergenceReadGroup, floatBindGroup(pressure.read)]);
    }
    renderAndSwap(velocity, pipelines.gradient, [gradientBindGroup(pressure.read, velocity.read)]);
    renderAndSwap(velocity, pipelines.vorticity, [floatBindGroup(velocity.read)]);

    device.queue.submit([commandEncoder.finish()]);

    for (const mouse of touches.values()) {
      device.queue.writeBuffer(mouse.uniform, 6 << 2, new Float32Array([0, 0, mouse.x, mouse.y]));
    }
    const m = touches.get(-1);
    if (m) {
      const red = Math.sin(t + 0) * 0.8 + 0.8;
      const green = Math.sin(t + 2) * 0.8 + 0.8;
      const blue = Math.sin(t + 4) * 0.8 + 0.8;
      device.queue.writeBuffer(m.uniform, 0 << 2, new Float32Array([red, green, blue]));
    }

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
    return await adapter.requestDevice();
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
