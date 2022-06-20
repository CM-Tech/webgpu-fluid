import { createMemo, createSignal, createRenderEffect, onMount, onCleanup } from "solid-js";
import type { Accessor } from "solid-js";
import { render } from "solid-js/web";
import { gpuCanvas, GPUContextType } from "./solid-gpu";
import vertWGSL from "./vert.wgsl?raw";
import displayWGSL from "./display.wgsl?raw";
import advectWGSL from "./advect.wgsl?raw";
import clearWGSL from "./clear.wgsl?raw";
import divergenceWGSL from "./divergence.wgsl?raw";
import jacobiWGSL from "./jacobi.wgsl?raw";
import gradientWGSL from "./gradient.wgsl?raw";
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

const DOWNSAMPLE = 1;
type VelTouch = {
  identifier: number;
  time: number;
  x: number;
  y: number;
  previous: { time: number; x: number; y: number };
  uniform: GPUBuffer;
};
type GPUProgram = (props: { width: Accessor<number>; height: Accessor<number> } & GPUContextType) => void;
const GPUProgram: GPUProgram = ({ width, height, context, presentationFormat, device }) => {
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

  const dye = doubleFbo();
  const velocity = doubleFbo("rg32float");
  const pressure = doubleFbo("r32float");
  const divergenceTex = createMemo<GPUTexture>(createTexture("r32float"));

  const uniforms = device.createBuffer({
    size: 4 << 2,
    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
    mappedAtCreation: false,
  });

  const makeUniformsPerTouch = () =>
    device.createBuffer({
      size: 8 << 2,
      usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
      mappedAtCreation: false,
    });

  const advectUniforms = device.createBuffer({
    size: 8 << 2,
    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
    mappedAtCreation: false,
  });

  const divergenceUniforms = device.createBuffer({
    size: 2 << 2,
    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
    mappedAtCreation: false,
  });

  const displayUniforms = device.createBuffer({
    size: 2 << 2,
    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
    mappedAtCreation: false,
  });

  const splatUniforms = device.createBuffer({
    size: 8 << 2,
    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
    mappedAtCreation: false,
  });

  device.queue.writeBuffer(splatUniforms, 4 << 2, new Float32Array([0.0, 1.0, 0.0, 1.0]));
  device.queue.writeBuffer(advectUniforms, 6 << 2, new Float32Array([0.97, 0.98]));

  const touches: VelTouch[] = [];
  const createTouch = (touch: { clientX: number; clientY: number; identifier: number }) => {
    const m = {
      identifier: touch.identifier,
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now(),
      previous: { time: Date.now(), x: touch.clientX, y: touch.clientY },
      uniform: makeUniformsPerTouch(),
    };

    device.queue.writeBuffer(
      m.uniform,
      0 << 2,
      new Float32Array([Math.random(), Math.random(), Math.random(), 1, m.x >> DOWNSAMPLE, m.y >> DOWNSAMPLE, 0, 0])
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
    m.x = touch.clientX;
    m.y = touch.clientY;
    device.queue.writeBuffer(
      m.uniform,
      4 << 2,
      new Float32Array([
        m.x >> DOWNSAMPLE,
        m.y >> DOWNSAMPLE,
        (((m.x - m.previous.x) / (m.time - m.previous.time + 1)) * 1000) >> DOWNSAMPLE,
        (((m.y - m.previous.y) / (m.time - m.previous.time + 1)) * 1000) >> DOWNSAMPLE,
      ])
    );
  };
  const destroyTouch = (touch: { clientX: number; clientY: number; identifier: number }) => {
    const m = touches.find((t) => t.identifier === touch.identifier)!; // TODO: YEET
    if (!m) return;
    touches.splice(touches.indexOf(m), 1);
    m.uniform.destroy();
  };

  createEventListener(window, "mousemove", (e: MouseEvent) => {
    const changedTouches = [{ clientX: e.clientX, clientY: e.clientY, identifier: -1 }];
    for (let i = 0; i < changedTouches.length; i++) moveTouch(changedTouches[i]);
  });

  createEventListener(window, "mousedown", (e: MouseEvent) => {
    const changedTouches = [{ clientX: e.clientX, clientY: e.clientY, identifier: -1 }];
    for (let i = 0; i < changedTouches.length; i++) {
      destroyTouch(changedTouches[i]);
      moveTouch(changedTouches[i]);
    }
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
    device.queue.writeBuffer(uniforms, 0 << 2, new Float32Array([1 / dwidth(), 1 / dheight()]));
    device.queue.writeBuffer(splatUniforms, 0 << 2, new Float32Array([1 / dwidth(), 1 / dheight()]));
    device.queue.writeBuffer(displayUniforms, 0 << 2, new Float32Array([1 / width(), 1 / height()]));
    device.queue.writeBuffer(divergenceUniforms, 0 << 2, new Float32Array([1 / dwidth(), 1 / dheight()]));
    device.queue.writeBuffer(advectUniforms, 4 << 2, new Float32Array([1 / dwidth(), 1 / dheight()]));
  });

  const layout0 = device.createBindGroupLayout({
    entries: [
      {
        binding: 0,
        visibility: GPUShaderStage.FRAGMENT,
        sampler: {
          type: "non-filtering",
        },
      },
    ],
  });
  const bglayout = device.createBindGroupLayout({
    entries: [
      {
        binding: 0,
        visibility: GPUShaderStage.FRAGMENT,
        texture: { viewDimension: "2d" },
      },
      {
        binding: 1,
        visibility: GPUShaderStage.FRAGMENT,
        buffer: { type: "uniform" },
      },
    ],
  });
  const advectLayout = device.createBindGroupLayout({
    entries: [
      {
        binding: 0,
        visibility: GPUShaderStage.FRAGMENT,
        buffer: { type: "uniform" },
      },
      {
        binding: 1,
        visibility: GPUShaderStage.FRAGMENT,
        texture: { viewDimension: "2d", sampleType: "unfilterable-float" },
      },
      {
        binding: 2,
        visibility: GPUShaderStage.FRAGMENT,
        texture: { viewDimension: "2d" },
      },
    ],
  });
  const clearLayout = device.createBindGroupLayout({
    entries: [
      {
        binding: 0,
        visibility: GPUShaderStage.FRAGMENT,
        buffer: { type: "uniform" },
      },
      {
        binding: 1,
        visibility: GPUShaderStage.FRAGMENT,
        texture: { viewDimension: "2d", sampleType: "unfilterable-float" },
      },
    ],
  });
  const divergenceLayout = device.createBindGroupLayout({
    entries: [
      {
        binding: 0,
        visibility: GPUShaderStage.FRAGMENT,
        buffer: { type: "uniform" },
      },
      {
        binding: 1,
        visibility: GPUShaderStage.FRAGMENT,
        texture: { viewDimension: "2d", sampleType: "unfilterable-float" },
      },
    ],
  });
  const jacobiLayout0 = device.createBindGroupLayout({
    entries: [
      {
        binding: 0,
        visibility: GPUShaderStage.FRAGMENT,
        buffer: { type: "uniform" },
      },
      {
        binding: 1,
        visibility: GPUShaderStage.FRAGMENT,
        texture: { viewDimension: "2d", sampleType: "unfilterable-float" },
      },
    ],
  });
  const jacobiLayout1 = device.createBindGroupLayout({
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
        buffer: { type: "uniform" },
      },
      {
        binding: 1,
        visibility: GPUShaderStage.FRAGMENT,
        texture: { viewDimension: "2d", sampleType: "unfilterable-float" },
      },
      {
        binding: 2,
        visibility: GPUShaderStage.FRAGMENT,
        texture: { viewDimension: "2d", sampleType: "unfilterable-float" },
      },
    ],
  });
  const splatLayout = device.createBindGroupLayout({
    entries: [
      {
        binding: 0,
        visibility: GPUShaderStage.FRAGMENT,
        buffer: { type: "uniform" },
      },
      {
        binding: 1,
        visibility: GPUShaderStage.FRAGMENT,
        texture: { viewDimension: "2d" },
      },
      {
        binding: 2,
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

  const sampler = device.createSampler({
    minFilter: "nearest",
    magFilter: "nearest",
  });
  const bg0 = device.createBindGroup({
    layout: layout0,
    entries: [{ binding: 0, resource: sampler }],
  });

  const vertShader = device.createShaderModule({
    code: vertWGSL,
  });
  const displayShader = device.createShaderModule({
    code: displayWGSL,
  });
  const advectShader = device.createShaderModule({
    code: advectWGSL,
  });
  const clearShader = device.createShaderModule({
    code: clearWGSL,
  });
  const divergenceShader = device.createShaderModule({
    code: divergenceWGSL,
  });
  const jacobiShader = device.createShaderModule({
    code: jacobiWGSL,
  });
  const gradientShader = device.createShaderModule({
    code: gradientWGSL,
  });
  const splatShader = device.createShaderModule({
    code: splatWGSL,
  });

  const splatPipeline = device.createRenderPipeline({
    vertex: {
      module: vertShader,
      entryPoint: "vert",
    },
    fragment: {
      module: splatShader,
      entryPoint: "splat",
      targets: [{ format: presentationFormat }, { format: "rg32float" }],
    },
    layout: device.createPipelineLayout({ bindGroupLayouts: [layout0, splatLayout, splatTouchLayout] }),
    primitive: {
      topology: "triangle-strip",
      stripIndexFormat: "uint16",
    },
  });

  const advectPipeline = device.createRenderPipeline({
    vertex: {
      module: vertShader,
      entryPoint: "vert",
    },
    fragment: {
      module: advectShader,
      entryPoint: "advect",
      targets: [{ format: presentationFormat }, { format: "rg32float" }],
    },
    layout: device.createPipelineLayout({ bindGroupLayouts: [layout0, advectLayout] }),
    primitive: {
      topology: "triangle-strip",
      stripIndexFormat: "uint16",
    },
  });

  const clearPipeline = device.createRenderPipeline({
    vertex: {
      module: vertShader,
      entryPoint: "vert",
    },
    fragment: {
      module: clearShader,
      entryPoint: "clear",
      targets: [{ format: "r32float" }],
    },
    layout: device.createPipelineLayout({ bindGroupLayouts: [layout0, clearLayout] }),
    primitive: {
      topology: "triangle-strip",
      stripIndexFormat: "uint16",
    },
  });

  const divergencePipeline = device.createRenderPipeline({
    vertex: {
      module: vertShader,
      entryPoint: "vert",
    },
    fragment: {
      module: divergenceShader,
      entryPoint: "divergence",
      targets: [{ format: "r32float" }],
    },
    layout: device.createPipelineLayout({ bindGroupLayouts: [layout0, divergenceLayout] }),
    primitive: {
      topology: "triangle-strip",
      stripIndexFormat: "uint16",
    },
  });

  const jacobiPipeline = device.createRenderPipeline({
    vertex: {
      module: vertShader,
      entryPoint: "vert",
    },
    fragment: {
      module: jacobiShader,
      entryPoint: "jacobi",
      targets: [{ format: "r32float" }],
    },
    layout: device.createPipelineLayout({ bindGroupLayouts: [layout0, jacobiLayout0, jacobiLayout1] }),
    primitive: {
      topology: "triangle-strip",
      stripIndexFormat: "uint16",
    },
  });

  const gradientPipeline = device.createRenderPipeline({
    vertex: {
      module: vertShader,
      entryPoint: "vert",
    },
    fragment: {
      module: gradientShader,
      entryPoint: "gradient",
      targets: [{ format: "rg32float" }],
    },
    layout: device.createPipelineLayout({ bindGroupLayouts: [layout0, gradientLayout] }),
    primitive: {
      topology: "triangle-strip",
      stripIndexFormat: "uint16",
    },
  });

  const displayPipeline = device.createRenderPipeline({
    vertex: {
      module: vertShader,
      entryPoint: "vert",
    },
    fragment: {
      module: displayShader,
      entryPoint: "display",
      targets: [{ format: presentationFormat }],
    },
    layout: device.createPipelineLayout({ bindGroupLayouts: [layout0, bglayout] }),
    primitive: {
      topology: "triangle-strip",
      stripIndexFormat: "uint16",
    },
  });

  let animation: number;
  const frame = () => {
    const commandEncoder = device.createCommandEncoder();

    for (const mouse of touches) {
      const splatThing = device.createBindGroup({
        layout: splatLayout,
        entries: [
          { binding: 0, resource: { buffer: splatUniforms } },
          { binding: 1, resource: dye.read.createView() },
          { binding: 2, resource: velocity.read.createView() },
        ],
      });
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
      passEncoder.setBindGroup(0, bg0);
      passEncoder.setBindGroup(1, splatThing);
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
      passEncoder.setBindGroup(0, bg0);
      passEncoder.setBindGroup(
        1,
        device.createBindGroup({
          layout: advectLayout,
          entries: [
            { binding: 0, resource: { buffer: advectUniforms } },
            { binding: 1, resource: velocity.read.createView() },
            { binding: 2, resource: dye.read.createView() },
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
      passEncoder.setBindGroup(0, bg0);
      passEncoder.setBindGroup(
        1,
        device.createBindGroup({
          layout: clearLayout,
          entries: [
            { binding: 0, resource: { buffer: divergenceUniforms } },
            { binding: 1, resource: pressure.read.createView() },
          ],
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
      passEncoder.setBindGroup(0, bg0);
      passEncoder.setBindGroup(
        1,
        device.createBindGroup({
          layout: divergenceLayout,
          entries: [
            { binding: 0, resource: { buffer: divergenceUniforms } },
            { binding: 1, resource: velocity.read.createView() },
          ],
        })
      );
      passEncoder.draw(4, 1, 0, 0);
      passEncoder.end();
    }

    for (let i = 0; i < 25; i++) {
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
      passEncoder.setBindGroup(0, bg0);
      passEncoder.setBindGroup(
        1,
        device.createBindGroup({
          layout: jacobiLayout0,
          entries: [
            { binding: 0, resource: { buffer: divergenceUniforms } },
            { binding: 1, resource: divergenceTex().createView() },
          ],
        })
      );
      passEncoder.setBindGroup(
        2,
        device.createBindGroup({
          layout: jacobiLayout1,
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
      passEncoder.setBindGroup(0, bg0);
      passEncoder.setBindGroup(
        1,
        device.createBindGroup({
          layout: gradientLayout,
          entries: [
            { binding: 0, resource: { buffer: divergenceUniforms } },
            { binding: 1, resource: pressure.read.createView() },
            { binding: 2, resource: velocity.read.createView() },
          ],
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
      passEncoder.setBindGroup(0, bg0);
      passEncoder.setBindGroup(
        1,
        device.createBindGroup({
          layout: bglayout,
          entries: [
            { binding: 0, resource: dye.read.createView() },
            { binding: 1, resource: { buffer: displayUniforms } },
          ],
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
  const resize = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };
  window.addEventListener("resize", resize);
  onCleanup(() => window.removeEventListener("resize", resize));

  return gpuCanvas(
    {
      get width() {
        return width();
      },
      get height() {
        return height();
      },
    },
    (props) => GPUProgram({ ...props, width, height })
  );
};

render(App, document.getElementById("root")!);
