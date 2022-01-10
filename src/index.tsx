import { createMemo, createEffect, createSignal, createRenderEffect, onMount, onCleanup } from "solid-js";
import type { Component, Accessor } from "solid-js";
import { render } from "solid-js/web";
import { gpuCanvas, GPUContextType } from "./solid-gpu";
import triangleWGSL from "./triangle.wgsl?raw";
import "./index.css";

type GPUProgram = (props: { width: Accessor<number>; height: Accessor<number> } & GPUContextType) => void;
const GPUProgram: GPUProgram = ({ width, height, context, presentationFormat, device }) => {
  createRenderEffect(() => {
    context.configure({
      device,
      format: presentationFormat,
      size: [width(), height()],
      usage: GPUTextureUsage.COPY_SRC | GPUTextureUsage.RENDER_ATTACHMENT,
    });
  });

  const readTexture = createMemo<GPUTexture>((last) => {
    if (last) last.destroy();
    let newTex = device.createTexture({
      format: presentationFormat,
      dimension: "2d",
      mipLevelCount: 1,
      size: [width(), height()],
      usage: GPUTextureUsage.TEXTURE_BINDING | GPUTextureUsage.COPY_DST,
    });

    const textureBytes = new Uint8Array(width() * height() * 4);
    for (let i = 1; i < textureBytes.length; i += 4) textureBytes[i] = Math.random() > 0.5 ? 255 : 0;

    device.queue.writeTexture(
      { texture: newTex },
      textureBytes,
      { bytesPerRow: width() * 4 },
      { width: width(), height: height() }
    );
    return newTex;
  });

  const uniforms = device.createBuffer({
    size: 4 * 4,
    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
    mappedAtCreation: false,
  });

  const mousemove = (e: MouseEvent) => {
    device.queue.writeBuffer(uniforms, 2 * 4, new Float32Array([e.clientX / width(), e.clientY / height()]));
  };
  window.addEventListener("mousemove", mousemove);
  onCleanup(() => window.removeEventListener("mousemove", mousemove));

  createEffect(() => {
    device.queue.writeBuffer(uniforms, 0 * 4, new Float32Array([1 / width(), 1 / height()]));
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

  const bindingGroup = createMemo(() =>
    device.createBindGroup({
      layout: bglayout,
      entries: [
        { binding: 0, resource: readTexture().createView() },
        { binding: 1, resource: device.createSampler() },
        { binding: 2, resource: { buffer: uniforms } },
      ],
    })
  );

  const shader = device.createShaderModule({
    code: triangleWGSL,
  });
  const pipeline = device.createRenderPipeline({
    vertex: {
      module: shader,
      entryPoint: "vert",
    },
    fragment: {
      module: shader,
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

  let animation: number;
  const frame = () => {
    const commandEncoder = device.createCommandEncoder();
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
    passEncoder.setPipeline(pipeline);
    passEncoder.setBindGroup(0, bindingGroup());
    passEncoder.draw(4, 1, 0, 0);
    passEncoder.endPass();

    commandEncoder.copyTextureToTexture(
      { texture: currentTexture },
      { texture: readTexture() },
      {
        width: width(),
        height: height(),
      }
    );
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
