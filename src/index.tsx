import { createMemo, createSignal, createRenderEffect, onMount, onCleanup } from "solid-js";
import type { Accessor } from "solid-js";
import { render } from "solid-js/web";
import { gpuCanvas, GPUContextType } from "./solid-gpu";
import vertWGSL from "./vert.wgsl?raw";
import displayWGSL from "./display.wgsl?raw";
import advectWGSL from "./advect.wgsl?raw";
import splatWGSL from "./splat.wgsl?raw";
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

const DOWNSAMPLE = 2;
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

  let createTexture = (format?: GPUTextureFormat) => (last?: GPUTexture) => {
    if (last) last.destroy();
    let newTex = device.createTexture({
      format: format ?? presentationFormat,
      dimension: "2d",
      mipLevelCount: 1,
      size: [dwidth(), dheight()],
      usage: GPUTextureUsage.TEXTURE_BINDING | GPUTextureUsage.COPY_DST | GPUTextureUsage.RENDER_ATTACHMENT,
    });

    return newTex;
  };
  let doubleFbo = (format?: GPUTextureFormat) => createSwappable(createMemo<GPUTexture>(createTexture(format)), createMemo<GPUTexture>(createTexture(format)));

  const density = doubleFbo();
  const velocity = doubleFbo(); //"rgba32float");
  const pressure = doubleFbo();
  const divergenceTex = createMemo<GPUTexture>(createTexture());

  console.log(presentationFormat)
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
    size: 7 << 2,
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
  device.queue.writeBuffer(advectUniforms, 6 << 2, new Float32Array([0.9]));

  let touches: VelTouch[] = [];
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
    m.previous.time= m.time;
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

  const mousemove = (e: MouseEvent) => {
    const changedTouches = [{ clientX: e.clientX, clientY: e.clientY, identifier: -1 }];
    for (let i = 0; i < changedTouches.length; i++) moveTouch(changedTouches[i]);
  };
  window.addEventListener("mousemove", mousemove);
  onCleanup(() => window.removeEventListener("mousemove", mousemove));

  const mousedown = (e: MouseEvent) => {
    const changedTouches = [{ clientX: e.clientX, clientY: e.clientY, identifier: -1 }];
    for (let i = 0; i < changedTouches.length; i++) {
      destroyTouch(changedTouches[i]);
      moveTouch(changedTouches[i]);
    }
  };
  window.addEventListener("mousedown", mousedown);
  onCleanup(() => window.removeEventListener("mousedown", mousedown));

  const ontouchstart = ({ changedTouches }: TouchEvent) => {
    for (let i = 0; i < changedTouches.length; i++) createTouch(changedTouches[i]);
  };
  window.addEventListener("touchstart", ontouchstart);
  onCleanup(() => window.removeEventListener("touchstart", ontouchstart));

  const touchmove = ({ changedTouches }: TouchEvent) => {
    for (let i = 0; i < changedTouches.length; i++) moveTouch(changedTouches[i]);
  };
  window.addEventListener("touchmove", touchmove);
  onCleanup(() => window.removeEventListener("touchmove", touchmove));

  const touchend = ({ changedTouches }: TouchEvent) => {
    for (let i = 0; i < changedTouches.length; i++) destroyTouch(changedTouches[i]);
  };
  window.addEventListener("touchend", touchend);
  onCleanup(() => window.removeEventListener("touchend", touchend));

  createRenderEffect(() => {
    device.queue.writeBuffer(uniforms, 0 << 2, new Float32Array([1 / dwidth(), 1 / dheight()]));
    device.queue.writeBuffer(splatUniforms, 0 << 2, new Float32Array([1 / dwidth(), 1 / dheight()]));
    device.queue.writeBuffer(displayUniforms, 0 << 2, new Float32Array([1 / width(), 1 / height()]));
    device.queue.writeBuffer(advectUniforms, 4 << 2, new Float32Array([1 / dwidth(), 1 / dheight()]));
  });

  const layout0 = device.createBindGroupLayout({
    entries: [
      {
        binding: 0,
        visibility: GPUShaderStage.FRAGMENT,
        sampler: {},
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
  const advectG1layout = device.createBindGroupLayout({
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
        texture: { viewDimension: "2d" },
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
        texture: { viewDimension: "2d"}, //, sampleType: "float" },
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

  let sampler = device.createSampler({
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
      targets: [{ format: presentationFormat }, { format: presentationFormat }], //"rgba32float" }],
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
      targets: [{ format: presentationFormat }],
    },
    layout: device.createPipelineLayout({ bindGroupLayouts: [layout0, advectG1layout] }),
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
  let t = 0;
  const frame = () => {
    const commandEncoder = device.createCommandEncoder();

    for (let mouse of touches) {
      const splatThing = device.createBindGroup({
        layout: splatLayout,
        entries: [
          { binding: 0, resource: { buffer: splatUniforms } },
          { binding: 1, resource: density.read.createView() },
          { binding: 2, resource: velocity.read.createView() },
        ],
      });
      const passEncoder = commandEncoder.beginRenderPass({
        colorAttachments: [
          {
            view: density.write.createView(),
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

      density.swap();
      velocity.swap();
    }

    {
      const passEncoder = commandEncoder.beginRenderPass({
        colorAttachments: [
          {
            view: density.write.createView(),
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
          layout: advectG1layout,
          entries: [
            { binding: 0, resource: { buffer: advectUniforms } },
            { binding: 1, resource: velocity.read.createView() },
            { binding: 2, resource: density.read.createView() },
          ],
        })
      );
      passEncoder.draw(4, 1, 0, 0);
      passEncoder.end();

      density.swap();
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
            { binding: 0, resource: density.read.createView() },
            { binding: 1, resource: { buffer: displayUniforms } },
          ],
        })
      );
      passEncoder.draw(4, 1, 0, 0);
      passEncoder.end();
    }

    device.queue.submit([commandEncoder.finish()]);

    t++;
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
