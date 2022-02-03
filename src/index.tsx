import { createMemo, createEffect, createSignal, createRenderEffect, onMount, onCleanup } from "solid-js";
import type { Component, Accessor } from "solid-js";
import { render } from "solid-js/web";
import { gpuCanvas, GPUContextType } from "./solid-gpu";
import golWGSL from "./gol.wgsl?raw";
import vertWGSL from "./vert.wgsl?raw";
import displayWGSL from "./display.wgsl?raw";
import advectWGSL from "./advect.wgsl?raw";
import splatWGSL from "./splat.wgsl?raw";
import "./index.css";

const DOWNSAMPLE = 2;
type GPUProgram = (props: { width: Accessor<number>; height: Accessor<number> } & GPUContextType) => void;
const GPUProgram: GPUProgram = ({ width, height, context, presentationFormat, device }) => {
  const dwidth = () => width() >> DOWNSAMPLE;
  const dheight = () => height() >> DOWNSAMPLE;
  createRenderEffect(() => {
    context.configure({
      device,
      format: presentationFormat,
      size: [width(), height()],
      usage: GPUTextureUsage.COPY_SRC | GPUTextureUsage.RENDER_ATTACHMENT,
    });
  });

  let createTexture = (last?: GPUTexture) => {
    if (last) last.destroy();
    let newTex = device.createTexture({
      format: presentationFormat,
      dimension: "2d",
      mipLevelCount: 1,
      size: [dwidth(), dheight()],
      usage: GPUTextureUsage.TEXTURE_BINDING | GPUTextureUsage.COPY_DST | GPUTextureUsage.RENDER_ATTACHMENT,
    });

    return newTex;
  };
  let doubleFbo = () => {
    let tex = [createMemo<GPUTexture>(createTexture), createMemo<GPUTexture>(createTexture)];
    return tex;
  };

  const velocity = doubleFbo();
  const density = doubleFbo();
  const pressure = doubleFbo();
  const divergenceTex = createMemo<GPUTexture>(createTexture);

  const readTexture = doubleFbo();

  const uniforms = device.createBuffer({
    size: 4 * 4,
    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
    mappedAtCreation: false,
  });

  const displayUniforms = device.createBuffer({
    size: 2 * 4,
    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
    mappedAtCreation: false,
  });

  const splatUniforms = device.createBuffer({
    size: 8 * 4,
    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
    mappedAtCreation: false,
  });

  device.queue.writeBuffer(splatUniforms, 4 * 4, new Float32Array([0.0,1.0,0.0,1.0]));
  const mousemove = (e: MouseEvent) => {
    console.log("here")
    device.queue.writeBuffer(uniforms, 2 * 4, new Float32Array([e.clientX / width(), e.clientY / height()]));
    device.queue.writeBuffer(splatUniforms, 2 * 4, new Float32Array([e.clientX >> DOWNSAMPLE, e.clientY >> DOWNSAMPLE]));
  };
  window.addEventListener("mousemove", mousemove);
  onCleanup(() => window.removeEventListener("mousemove", mousemove));

  createRenderEffect(() => {
    device.queue.writeBuffer(uniforms, 0 * 4, new Float32Array([1 / dwidth(), 1 / dheight()]));
    device.queue.writeBuffer(splatUniforms, 0 * 4, new Float32Array([1 / dwidth(), 1 / dheight()]));
    device.queue.writeBuffer(displayUniforms, 0 * 4, new Float32Array([1 / width(), 1 / height()]));
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
      }
    ]
  });
  let sampler = device.createSampler({
    minFilter: "nearest",
    magFilter: "nearest",
  });
  const bg0 = device.createBindGroup({
    layout: layout0,
    entries: [{ binding: 0, resource: sampler }],
  });
  const bindingGroup = readTexture.map(x=>createMemo(() =>
    device.createBindGroup({
      layout: bglayout,
      entries: [
        { binding: 0, resource: x().createView() },
        { binding: 1, resource: { buffer: uniforms } },
      ],
    })
  ));

  const displayBindingGroup = readTexture.map(x=>createMemo(() =>
    device.createBindGroup({
      layout: bglayout,
      entries: [
        { binding: 0, resource: x().createView() },
        { binding: 1, resource: { buffer: displayUniforms } },
      ],
    })
  ));

  const splatBindingGroup = readTexture.map(x=>createMemo(() =>
    device.createBindGroup({
      layout: splatLayout,
      entries: [
        { binding: 0, resource: { buffer: splatUniforms } },
        { binding: 1, resource: x().createView() },
      ],
    })
  ));

  const triangleShader = device.createShaderModule({
    code: golWGSL,
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
      targets: [{format: presentationFormat}]
    },
    layout: device.createPipelineLayout({ bindGroupLayouts: [layout0, splatLayout] }),
    primitive: {
      topology: "triangle-strip",
      stripIndexFormat: "uint16",
    }
  });

  const pipeline = device.createRenderPipeline({
    vertex: {
      module: vertShader,
      entryPoint: "vert",
    },
    fragment: {
      module: triangleShader,
      entryPoint: "gol",
      targets: [{format: presentationFormat}],
    },
    layout: device.createPipelineLayout({ bindGroupLayouts: [layout0, bglayout] }),
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
      targets: [{format: presentationFormat}],
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

    {
    const passEncoder = commandEncoder.beginRenderPass({
      colorAttachments: [
        {
          view: (readTexture[1])().createView(),
          loadValue: { r: 0.0, g: 0.0, b: 0.0, a: 1.0 },
          storeOp: "store",
        },
      ],
    });
    passEncoder.setPipeline(pipeline);
    passEncoder.setBindGroup(0, bg0);
    passEncoder.setBindGroup(1, bindingGroup[0]());
    passEncoder.draw(4, 1, 0, 0);
    passEncoder.endPass();

    readTexture.reverse();
    bindingGroup.reverse();
    splatBindingGroup.reverse();
    displayBindingGroup.reverse();
  }

{
    const passEncoder = commandEncoder.beginRenderPass({
      colorAttachments: [
        {
          view: (readTexture[1])().createView(),
          loadValue: { r: 0.0, g: 0.0, b: 0.0, a: 1.0 },
          storeOp: "store",
        },
      ],
    });
    passEncoder.setPipeline(splatPipeline);
    passEncoder.setBindGroup(0, bg0);
    passEncoder.setBindGroup(1, splatBindingGroup[0]());
    passEncoder.draw(4, 1, 0, 0);
    passEncoder.endPass();

    readTexture.reverse();
    bindingGroup.reverse();
    splatBindingGroup.reverse();
    displayBindingGroup.reverse();
  }

  {
    const currentTexture = context.getCurrentTexture();
    const passEncoder = commandEncoder.beginRenderPass({
      colorAttachments: [
        {
          view: currentTexture.createView(),
          loadValue: { r: 0.0, g: 0.0, b: 0.0, a: 1.0 },
          storeOp: "store",
        },
      ],
    });
    passEncoder.setPipeline(displayPipeline);
    passEncoder.setBindGroup(0, bg0);
    passEncoder.setBindGroup(1, displayBindingGroup[0]());
    passEncoder.draw(4, 1, 0, 0);
    passEncoder.endPass();
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
