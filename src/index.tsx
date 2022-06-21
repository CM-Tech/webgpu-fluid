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
import displayWGSL from "./display.wgsl?raw";
import advectWGSL from "./advect.wgsl?raw";
import clearWGSL from "./clear.wgsl?raw";
import divergenceWGSL from "./divergence.wgsl?raw";
import jacobiWGSL from "./jacobi.wgsl?raw";
import gradientWGSL from "./gradient.wgsl?raw";
import vorticityWGSL from "./vorticity.wgsl?raw";
import commonWGSL from "./common.wgsl?raw";
import splatWGSL from "./splat.wgsl?raw";
import { createEventListener } from "@solid-primitives/event-listener";
import "./index.css";

const createSwappable = <T,>(a: Accessor<T>, b: Accessor<T>) => {
  return {
    get read() {
      return a();
    },
    get write() {
      return b();
    },
    swap() {
      [a, b] = [b, a];
    },
  };
};
function HSVtoRGB(h:number, s:number, v:number) {
  var r, g, b, i, f, p, q, t;
  if (arguments.length === 1) {
      s = h.s, v = h.v, h = h.h;
  }
  i = Math.floor(h * 6);
  f = h * 6 - i;
  p = v * (1 - s);
  q = v * (1 - f * s);
  t = v * (1 - (1 - f) * s);
  switch (i % 6) {
      case 0: r = v, g = t, b = p; break;
      case 1: r = q, g = v, b = p; break;
      case 2: r = p, g = v, b = t; break;
      case 3: r = p, g = q, b = v; break;
      case 4: r = t, g = p, b = v; break;
      case 5: r = v, g = p, b = q; break;
  }
  return {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255)
  };
}
const DOWNSAMPLE = 0;
type VelTouch = {
  identifier: number;
  time: number;
  x: number;
  y: number;
  previous: { time: number; x: number; y: number };
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
  const vertShader = device.createShaderModule({
    code: "\n"+vertWGSL,
  });
  const displayShader = device.createShaderModule({
    code:commonWGSL+"\n"+ displayWGSL,
  });
  const advectShader = device.createShaderModule({
    code: commonWGSL+"\n"+advectWGSL,
  });
  const clearShader = device.createShaderModule({
    code: "\n"+clearWGSL,
  });
  const divergenceShader = device.createShaderModule({
    code: commonWGSL+"\n"+divergenceWGSL,
  });
  const jacobiShader = device.createShaderModule({
    code: commonWGSL+"\n"+jacobiWGSL,
  });
  const gradientShader = device.createShaderModule({
    code:commonWGSL+"\n"+ gradientWGSL,
  });
  const vorticityShader = device.createShaderModule({
    code: commonWGSL+"\n"+vorticityWGSL,
  });
  const splatShader = device.createShaderModule({
    code: commonWGSL+"\n"+splatWGSL,
  });

  const mainLayout = device.createBindGroupLayout({
    entries: [
      {
        binding: 0,
        visibility: GPUShaderStage.FRAGMENT,
        buffer: { type: "uniform" },
      },
    ],
  });
  const displayMainLayout = device.createBindGroupLayout({
    entries: [
      {
        binding: 0,
        visibility: GPUShaderStage.FRAGMENT,
        buffer: { type: "uniform" },
      },
    ],
  });
  const displayLayout = device.createBindGroupLayout({
    entries: [
      {
        binding: 0,
        visibility: GPUShaderStage.FRAGMENT,
        texture: { viewDimension: "2d", sampleType: "unfilterable-float" },
      },
      {
        binding: 1,
        visibility: GPUShaderStage.FRAGMENT,
        texture: { viewDimension: "2d", sampleType: "unfilterable-float" },
      },{
        binding: 2,
        visibility: GPUShaderStage.FRAGMENT,
        texture: { viewDimension: "2d", sampleType: "unfilterable-float" },
      },
    ],
  });
  const dyeVelocityLayout = device.createBindGroupLayout({
    entries: [
      {
        binding: 0,
        visibility: GPUShaderStage.FRAGMENT,
        texture: { viewDimension: "2d", sampleType: "unfilterable-float" },
      },
      {
        binding: 1,
        visibility: GPUShaderStage.FRAGMENT,
        texture: { viewDimension: "2d", sampleType: "unfilterable-float" },
      },
    ],
  });
  const floatLayout = device.createBindGroupLayout({
    entries: [
      {
        binding: 0,
        visibility: GPUShaderStage.FRAGMENT,
        texture: { viewDimension: "2d", sampleType: "unfilterable-float" },
      },
    ],
  });
  const gradientLayout = device.createBindGroupLayout({
    entries: [
      {
        binding: 0,
        visibility: GPUShaderStage.FRAGMENT,
        texture: { viewDimension: "2d", sampleType: "unfilterable-float" },
      },
      {
        binding: 1,
        visibility: GPUShaderStage.FRAGMENT,
        texture: { viewDimension: "2d", sampleType: "unfilterable-float" },
      },
    ],
  });
  const splatTouchLayout = device.createBindGroupLayout({
    entries: [
      {
        binding: 0,
        visibility: GPUShaderStage.FRAGMENT,
        buffer: { type: "uniform" },
      },
    ],
  });

  const defaultPipeline = {
    vertex: {
      module: vertShader,
      entryPoint: "vert",
    },
    primitive: {
      topology: "triangle-strip",
      stripIndexFormat: "uint16",
    },
  } as const;
  const splatPipeline = device.createRenderPipeline({
    ...defaultPipeline,
    fragment: {
      module: splatShader,
      entryPoint: "splat",
      targets: [{ format: "rgba32float" }, { format: "rg32float" }],
    },
    layout: device.createPipelineLayout({ bindGroupLayouts: [mainLayout, dyeVelocityLayout, splatTouchLayout] }),
  });
  const advectPipeline = device.createRenderPipeline({
    ...defaultPipeline,
    fragment: {
      module: advectShader,
      entryPoint: "advect",
      targets: [{ format: "rgba32float" }, { format: "rg32float" }],
    },
    layout: device.createPipelineLayout({ bindGroupLayouts: [mainLayout, dyeVelocityLayout] }),
  });
  const clearPipeline = device.createRenderPipeline({
    ...defaultPipeline,
    fragment: {
      module: clearShader,
      entryPoint: "clear",
      targets: [{ format: "r32float" }],
    },
    layout: device.createPipelineLayout({ bindGroupLayouts: [mainLayout, floatLayout] }),
  });
  const divergencePipeline = device.createRenderPipeline({
    ...defaultPipeline,
    fragment: {
      module: divergenceShader,
      entryPoint: "divergence",
      targets: [{ format: "r32float" }],
    },
    layout: device.createPipelineLayout({ bindGroupLayouts: [mainLayout, floatLayout] }),
  });
  const jacobiPipeline = device.createRenderPipeline({
    ...defaultPipeline,
    fragment: {
      module: jacobiShader,
      entryPoint: "jacobi",
      targets: [{ format: "r32float" }],
    },
    layout: device.createPipelineLayout({ bindGroupLayouts: [mainLayout, floatLayout, floatLayout] }),
  });
  const gradientPipeline = device.createRenderPipeline({
    ...defaultPipeline,
    fragment: {
      module: gradientShader,
      entryPoint: "gradient",
      targets: [{ format: "rg32float" }],
    },
    layout: device.createPipelineLayout({ bindGroupLayouts: [mainLayout, gradientLayout] }),
  });
  const vorticityPipeline = device.createRenderPipeline({
    ...defaultPipeline,
    fragment: {
      module: vorticityShader,
      entryPoint: "vorticity",
      targets: [{ format: "rg32float" }],
    },
    layout: device.createPipelineLayout({ bindGroupLayouts: [mainLayout, floatLayout] }),
  });
  const displayPipeline = device.createRenderPipeline({
    ...defaultPipeline,
    fragment: {
      module: displayShader,
      entryPoint: "display",
      targets: [{ format: presentationFormat }],
    },
    layout: device.createPipelineLayout({ bindGroupLayouts: [mainLayout, displayLayout] }),
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

  const createTexture = (format?: GPUTextureFormat) => (last?: GPUTexture) => {
    if (last) last.destroy();
    const newTex = device.createTexture({
      format: format ?? presentationFormat,
      dimension: "2d",
      mipLevelCount: 1,
      size: [dwidth(), dheight()],
      usage: GPUTextureUsage.TEXTURE_BINDING | GPUTextureUsage.COPY_DST | GPUTextureUsage.RENDER_ATTACHMENT,
    });

    return newTex;
  };

  const doubleFbo = (format?: GPUTextureFormat) =>
    createSwappable(createMemo<GPUTexture>(createTexture(format)), createMemo<GPUTexture>(createTexture(format)));

  const dye = doubleFbo("rgba32float");
  const velocity = doubleFbo("rg32float");
  const pressure = doubleFbo("r32float");
  const divergenceTex = createMemo<GPUTexture>(createTexture("r32float"));

  const uniforms = device.createBuffer({
    size: 2 << 2,
    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
    mappedAtCreation: false,
  });

  const makeUniformsPerTouch = () =>
    device.createBuffer({
      size: 10 << 2,
      usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
      mappedAtCreation: false,
    });

  const displayUniforms = device.createBuffer({
    size: 3 << 2,
    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
    mappedAtCreation: false,
  });

  const touches: VelTouch[] = [];
  const createTouch = (touch: { clientX: number; clientY: number; identifier: number }) => {
    const m = {
      identifier: touch.identifier,
      x: touch.clientX >> DOWNSAMPLE,
      y: touch.clientY >> DOWNSAMPLE,
      time: Date.now(),
      previous: { time: Date.now(), x: touch.clientX >> DOWNSAMPLE, y: touch.clientY >> DOWNSAMPLE },
      uniform: makeUniformsPerTouch(),
    };
    var mi=HSVtoRGB(Math.random(),1,Math.random());
    device.queue.writeBuffer(
      m.uniform,
      0 << 2,
      new Float32Array([
        mi.r/255 * 2 + 0.5,
        mi.g/255 * 2 + 0.5,
        mi.b/255 * 2 + 0.5,
        1,
        m.x,
        m.y,
        0,
        0,
        m.previous.x,
        m.previous.y,
      ])
    );

    touches.push(m);
  };
  const moveTouch = (touch: { clientX: number; clientY: number; identifier: number }) => {
    const m = touches.find((t) => t.identifier === touch.identifier)!; // TODO: YEET
    if (!m) {
      createTouch(touch);
      return;
    }
    m.previous.time = m.time;
    m.previous.x = m.x;
    m.previous.y = m.y;
    m.time = Date.now();
    m.x = touch.clientX >> DOWNSAMPLE;
    m.y = touch.clientY >> DOWNSAMPLE;
    device.queue.writeBuffer(
      m.uniform,
      4 << 2,
      new Float32Array([
        m.x,
        m.y,
        ((m.x - m.previous.x) / (m.time - m.previous.time + 1)) * 1000,
        ((m.y - m.previous.y) / (m.time - m.previous.time + 1)) * 1000,
        m.previous.x,
        m.previous.y,
      ])
    );
  };
  const destroyTouch = (touch: { clientX: number; clientY: number; identifier: number }) => {
    const m = touches.find((t) => t.identifier === touch.identifier)!; // TODO: YEET
    if (!m) return;
    touches.splice(touches.indexOf(m), 1);
    m.uniform.destroy();
  };

  let clearMouseTimeout: number;
  createEventListener(window, "mousemove", (e: MouseEvent) => {
    const touch = { clientX: e.clientX, clientY: e.clientY, identifier: -1 };
    moveTouch(touch);
    clearTimeout(clearMouseTimeout);
    clearMouseTimeout = window.setTimeout(() => moveTouch(touch), 100);
  });

  createEventListener(window, "mousedown", (e: MouseEvent) => {
    const touch = { clientX: e.clientX, clientY: e.clientY, identifier: -1 };
    destroyTouch(touch);
    moveTouch(touch);
  });

  createEventListener(
    window,
    "wheel",
    (e) => {
      e.preventDefault();
    },
    { passive: false }
  );
  createEventListener(
    window,
    "touchstart",
    (e: TouchEvent) => {
      e.preventDefault();
      destroyTouch({ identifier: -1, clientX: 0, clientY: 0 });
      for (let i = 0; i < e.changedTouches.length; i++) createTouch(e.changedTouches[i]);
    },
    { passive: false }
  );
  createEventListener(
    window,
    "touchmove",
    (e: TouchEvent) => {
      e.preventDefault();
      destroyTouch({ identifier: -1, clientX: 0, clientY: 0 });
      for (let i = 0; i < e.changedTouches.length; i++) moveTouch(e.changedTouches[i]);
    },
    { passive: false }
  );
  createEventListener(window, "touchend", ({ changedTouches }: TouchEvent) => {
    destroyTouch({ identifier: -1, clientX: 0, clientY: 0 });
    for (let i = 0; i < changedTouches.length; i++) destroyTouch(changedTouches[i]);
  });

  createRenderEffect(() => {
    device.queue.writeBuffer(uniforms, 0 << 2, new Int32Array([dwidth(), dheight()]));
    device.queue.writeBuffer(displayUniforms, 0 << 2, new Int32Array([dwidth(), dheight(),DOWNSAMPLE]));
  });

  const mainBindGroup = device.createBindGroup({
    layout: mainLayout,
    entries: [
      { binding: 0, resource: { buffer: uniforms } },
    ],
  });
  const displayBindGroup = device.createBindGroup({
    layout: displayMainLayout,
    entries: [
      { binding: 0, resource: { buffer: displayUniforms } },
    ],
  });
  const divergenceReadGroup = device.createBindGroup({
    layout: floatLayout,
    entries: [{ binding: 0, resource: divergenceTex().createView() }],
  });

  let animation: number;
  const frame = () => {
    const commandEncoder = device.createCommandEncoder();

    for (const mouse of touches) {
      const passEncoder = commandEncoder.beginRenderPass({
        colorAttachments: [
          {
            view: dye.write.createView(),
            clearValue: { r: 0.0, g: 0.0, b: 0.0, a: 1.0 },
            storeOp: "store",
            loadOp: "clear",
          },
          {
            view: velocity.write.createView(),
            clearValue: { r: 0.0, g: 0.0, b: 0.0, a: 1.0 },
            storeOp: "store",
            loadOp: "clear",
          },
        ],
      });
      passEncoder.setPipeline(splatPipeline);
      passEncoder.setBindGroup(0, mainBindGroup);
      passEncoder.setBindGroup(
        1,
        device.createBindGroup({
          layout: dyeVelocityLayout,
          entries: [
            { binding: 0, resource: dye.read.createView() },
            { binding: 1, resource: velocity.read.createView() },
          ],
        })
      );
      passEncoder.setBindGroup(
        2,
        device.createBindGroup({
          layout: splatTouchLayout,
          entries: [{ binding: 0, resource: { buffer: mouse.uniform } }],
        })
      );
      passEncoder.draw(4, 1, 0, 0);
      passEncoder.end();

      dye.swap();
      velocity.swap();
    }

    {
      const passEncoder = commandEncoder.beginRenderPass({
        colorAttachments: [
          {
            view: dye.write.createView(),
            clearValue: { r: 0.0, g: 0.0, b: 0.0, a: 1.0 },
            storeOp: "store",
            loadOp: "clear",
          },
          {
            view: velocity.write.createView(),
            clearValue: { r: 0.0, g: 0.0, b: 0.0, a: 1.0 },
            storeOp: "store",
            loadOp: "clear",
          },
        ],
      });
      passEncoder.setPipeline(advectPipeline);
      passEncoder.setBindGroup(0, mainBindGroup);
      passEncoder.setBindGroup(
        1,
        device.createBindGroup({
          layout: dyeVelocityLayout,
          entries: [
            { binding: 0, resource: dye.read.createView() },
            { binding: 1, resource: velocity.read.createView() },
          ],
        })
      );
      passEncoder.draw(4, 1, 0, 0);
      passEncoder.end();

      dye.swap();
      velocity.swap();
    }

    {
      const passEncoder = commandEncoder.beginRenderPass({
        colorAttachments: [
          {
            view: pressure.write.createView(),
            clearValue: { r: 0.0, g: 0.0, b: 0.0, a: 1.0 },
            storeOp: "store",
            loadOp: "clear",
          },
        ],
      });
      passEncoder.setPipeline(clearPipeline);
      passEncoder.setBindGroup(0, mainBindGroup);
      passEncoder.setBindGroup(
        1,
        device.createBindGroup({
          layout: floatLayout,
          entries: [{ binding: 0, resource: pressure.read.createView() }],
        })
      );
      passEncoder.draw(4, 1, 0, 0);
      passEncoder.end();

      pressure.swap();
    }

    {
      const passEncoder = commandEncoder.beginRenderPass({
        colorAttachments: [
          {
            view: divergenceTex().createView(),
            clearValue: { r: 0.0, g: 0.0, b: 0.0, a: 1.0 },
            storeOp: "store",
            loadOp: "clear",
          },
        ],
      });
      passEncoder.setPipeline(divergencePipeline);
      passEncoder.setBindGroup(0, mainBindGroup);
      passEncoder.setBindGroup(
        1,
        device.createBindGroup({
          layout: floatLayout,
          entries: [{ binding: 0, resource: velocity.read.createView() }],
        })
      );
      passEncoder.draw(4, 1, 0, 0);
      passEncoder.end();
    }

    for (let i = 0; i <25; i++) {
      const passEncoder = commandEncoder.beginRenderPass({
        colorAttachments: [
          {
            view: pressure.write.createView(),
            clearValue: { r: 0.0, g: 0.0, b: 0.0, a: 1.0 },
            storeOp: "store",
            loadOp: "clear",
          },
        ],
      });
      passEncoder.setPipeline(jacobiPipeline);
      passEncoder.setBindGroup(0, mainBindGroup);
      passEncoder.setBindGroup(1, divergenceReadGroup);
      passEncoder.setBindGroup(
        2,
        device.createBindGroup({
          layout: floatLayout,
          entries: [{ binding: 0, resource: pressure.read.createView() }],
        })
      );
      passEncoder.draw(4, 1, 0, 0);
      passEncoder.end();

      pressure.swap();
    }

    {
      const passEncoder = commandEncoder.beginRenderPass({
        colorAttachments: [
          {
            view: velocity.write.createView(),
            clearValue: { r: 0.0, g: 0.0, b: 0.0, a: 1.0 },
            storeOp: "store",
            loadOp: "clear",
          },
        ],
      });
      passEncoder.setPipeline(gradientPipeline);
      passEncoder.setBindGroup(0, mainBindGroup);
      passEncoder.setBindGroup(
        1,
        device.createBindGroup({
          layout: gradientLayout,
          entries: [
            { binding: 0, resource: pressure.read.createView() },
            { binding: 1, resource: velocity.read.createView() },
          ],
        })
      );
      passEncoder.draw(4, 1, 0, 0);
      passEncoder.end();

      velocity.swap();
    }

    {
      const passEncoder = commandEncoder.beginRenderPass({
        colorAttachments: [
          {
            view: velocity.write.createView(),
            clearValue: { r: 0.0, g: 0.0, b: 0.0, a: 1.0 },
            storeOp: "store",
            loadOp: "clear",
          },
        ],
      });
      passEncoder.setPipeline(vorticityPipeline);
      passEncoder.setBindGroup(0, mainBindGroup);
      passEncoder.setBindGroup(
        1,
        device.createBindGroup({
          layout: floatLayout,
          entries: [{ binding: 0, resource: velocity.read.createView() }],
        })
      );
      passEncoder.draw(4, 1, 0, 0);
      passEncoder.end();

      velocity.swap();
    }

    {
      const currentTexture = context.getCurrentTexture();
      const passEncoder = commandEncoder.beginRenderPass({
        colorAttachments: [
          {
            view: currentTexture.createView(),
            clearValue: { r: 0.0, g: 0.0, b: 0.0, a: 1.0 },
            storeOp: "store",
            loadOp: "clear",
          },
        ],
      });
      passEncoder.setPipeline(displayPipeline);
      passEncoder.setBindGroup(0, displayBindGroup);
      passEncoder.setBindGroup(
        1,
        device.createBindGroup({
          layout: displayLayout,
          entries: [{ binding: 0, resource: dye.read.createView() },{ binding: 1, resource:pressure.read.createView() },{ binding: 2, resource:velocity.read.createView() }],
        })
      );
      
      passEncoder.draw(4, 1, 0, 0);
      passEncoder.end();
    }

    device.queue.submit([commandEncoder.finish()]);

    animation = requestAnimationFrame(frame);
  };

  onMount(frame);
  onCleanup(() => cancelAnimationFrame(animation));
};

const App = () => {
  const [width, setWidth] = createSignal(window.innerWidth);
  const [height, setHeight] = createSignal(window.innerHeight);
  createEventListener(window, "resize", () => {
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
