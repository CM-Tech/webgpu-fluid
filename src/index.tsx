import { createMemo, createEffect, createSignal, createRenderEffect, onMount, onCleanup } from "solid-js";
import type { Component, Accessor } from "solid-js";
import { render } from "solid-js/web";
import { gpuCanvas, GPUContextType } from "./solid-gpu";
import triangleWGSL from "./triangle.wgsl?raw";
import vertWGSL from "./vert.wgsl?raw";
import displayWGSL from "./display.wgsl?raw";
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

    const textureBytes = new Uint8Array(dwidth() * dheight() * 4);
    for (let i = 1; i < textureBytes.length; i += 4) textureBytes[i] = Math.random() > 0.5 ? 255 : 0;

    device.queue.writeTexture(
      { texture: newTex },
      textureBytes,
      { bytesPerRow: dwidth() * 4 },
      { width: dwidth(), height: dheight() }
    );
    return newTex;
  };
  const readTexture1 = createMemo<GPUTexture>(createTexture);
  const readTexture2 = createMemo<GPUTexture>(createTexture);

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
  const mousemove = (e: MouseEvent) => {
    device.queue.writeBuffer(uniforms, 2 * 4, new Float32Array([e.clientX / width(), e.clientY / height()]));
  };
  window.addEventListener("mousemove", mousemove);
  onCleanup(() => window.removeEventListener("mousemove", mousemove));

  createRenderEffect(() => {
    device.queue.writeBuffer(uniforms, 0 * 4, new Float32Array([1 / dwidth(), 1 / dheight()]));
    device.queue.writeBuffer(displayUniforms, 0 * 4, new Float32Array([1 / width(), 1 / height()]));
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
        sampler: {},
      },
      {
        binding: 2,
        visibility: GPUShaderStage.FRAGMENT,
        buffer: { type: "uniform" },
      },
    ],
  });

  let sampler = device.createSampler({
    minFilter: "nearest",
    magFilter: "nearest",
  });
  const bindingGroup1 = createMemo(() =>
    device.createBindGroup({
      layout: bglayout,
      entries: [
        { binding: 0, resource: readTexture1().createView() },
        { binding: 1, resource: sampler },
        { binding: 2, resource: { buffer: uniforms } },
      ],
    })
  );

  const bindingGroup2 = createMemo(() =>
    device.createBindGroup({
      layout: bglayout,
      entries: [
        { binding: 0, resource: readTexture2().createView() },
        { binding: 1, resource: sampler },
        { binding: 2, resource: { buffer: uniforms } },
      ],
    })
  );

  const displayBindingGroup1 = createMemo(() =>
    device.createBindGroup({
      layout: bglayout,
      entries: [
        { binding: 0, resource: readTexture1().createView() },
        { binding: 1, resource: sampler },
        { binding: 2, resource: { buffer: displayUniforms } },
      ],
    })
  );

  const displayBindingGroup2 = createMemo(() =>
    device.createBindGroup({
      layout: bglayout,
      entries: [
        { binding: 0, resource: readTexture2().createView() },
        { binding: 1, resource: sampler },
        { binding: 2, resource: { buffer: displayUniforms } },
      ],
    })
  );

  const triangleShader = device.createShaderModule({
    code: triangleWGSL,
  });
  const vertShader = device.createShaderModule({
    code: vertWGSL,
  });
  const displayShader = device.createShaderModule({
    code: displayWGSL,
  });
  const pipeline = device.createRenderPipeline({
    vertex: {
      module: vertShader,
      entryPoint: "vert",
    },
    fragment: {
      module: triangleShader,
      entryPoint: "frag",
      targets: [
        {
          format: presentationFormat,
        },
      ],
    },
    layout: device.createPipelineLayout({ bindGroupLayouts: [bglayout] }),
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
      targets: [
        {
          format: presentationFormat,
        },
      ],
    },
    layout: device.createPipelineLayout({ bindGroupLayouts: [bglayout] }),
    primitive: {
      topology: "triangle-strip",
      stripIndexFormat: "uint16",
    },
  });

  let animation: number;
  let t = 0;
  const frame = () => {
    const commandEncoder = device.createCommandEncoder();

    const passEncoder = commandEncoder.beginRenderPass({
      colorAttachments: [
        {
          view: ((t & 1) == 0 ? readTexture2 : readTexture1)().createView(),
          loadValue: { r: 0.0, g: 0.0, b: 0.0, a: 1.0 },
          storeOp: "store",
        },
      ],
    });
    passEncoder.setPipeline(pipeline);
    passEncoder.setBindGroup(0, ((t & 1) == 0 ? bindingGroup1 : bindingGroup2)());
    passEncoder.draw(4, 1, 0, 0);
    passEncoder.endPass();

    const currentTexture = context.getCurrentTexture();
    const passEncoder2 = commandEncoder.beginRenderPass({
      colorAttachments: [
        {
          view: currentTexture.createView(),
          loadValue: { r: 0.0, g: 0.0, b: 0.0, a: 1.0 },
          storeOp: "store",
        },
      ],
    });
    passEncoder2.setPipeline(displayPipeline);
    passEncoder2.setBindGroup(0, ((t & 1) == 0 ? displayBindingGroup2 : displayBindingGroup1)());
    passEncoder2.draw(4, 1, 0, 0);
    passEncoder2.endPass();

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
