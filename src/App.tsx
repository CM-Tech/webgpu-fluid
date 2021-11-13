import { Component, onMount } from "solid-js";
import redFragWGSL from "./triangle.wgsl?raw";

const App: Component = () => {
  let c!: HTMLCanvasElement;
  onMount(async () => {
    c.width = 320; // things need to be a multiple of 256;
    const context = c.getContext("webgpu")!;

    const adapter = await navigator.gpu?.requestAdapter();
    if (!adapter) return;

    const device = await adapter.requestDevice();

    const presentationFormat = context.getPreferredFormat(adapter);
    const size = [c.clientWidth, c.clientHeight];
    context.configure({
      device,
      format: presentationFormat,
      size,
    });

    let texture = device.createTexture({
      size,
      format: "rgba8unorm",
      dimension: "2d",
      mipLevelCount: 1,
      usage: GPUTextureUsage.RENDER_ATTACHMENT | GPUTextureUsage.COPY_DST | GPUTextureUsage.COPY_SRC,
    });

    let texture2 = device.createTexture({
      size,
      format: "rgba8unorm",
      dimension: "2d",
      mipLevelCount: 1,
      usage: GPUTextureUsage.TEXTURE_BINDING | GPUTextureUsage.COPY_DST,
    });

    const shader = device.createShaderModule({
      code: redFragWGSL,
    });

    const bglayout = device.createBindGroupLayout({
      entries: [
        {
          binding: 0,
          visibility: GPUShaderStage.FRAGMENT,
          texture: {
            viewDimension: "2d",
          },
        },
        {
          binding: 1,
          visibility: GPUShaderStage.FRAGMENT,
          sampler: {},
        },
      ],
    });
    const sampler = device.createSampler();
    const texture1View = texture.createView();
    const texture2View = texture2.createView();

    const bg = device.createBindGroup({
      layout: bglayout,
      entries: [
        { binding: 0, resource: texture2View },
        { binding: 1, resource: sampler },
      ],
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
            format: "rgba8unorm",
          },
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

    var buffer = device.createBuffer({
      size: size[0] * size[1] * 4,
      usage: GPUBufferUsage.COPY_SRC,
      mappedAtCreation: true,
    });
    new Float32Array(buffer.getMappedRange()).set(Array.from({ length: size[0] * size[1] }, (_, i) => Math.random()));
    buffer.unmap();

    const initialEncoder = device.createCommandEncoder();
    initialEncoder.copyBufferToTexture(
      { buffer, bytesPerRow: size[0] * 4 },
      { texture },
      { width: size[0], height: size[1] }
    );
    device.queue.submit([initialEncoder.finish()]);

    function frame() {
      const commandEncoder = device.createCommandEncoder();

      commandEncoder.copyTextureToTexture(
        { texture: texture },
        { texture: texture2 },
        {
          width: size[0],
          height: size[1],
        }
      );
      const passEncoder = commandEncoder.beginRenderPass({
        colorAttachments: [
          {
            view: texture1View,
            loadValue: { r: 0.0, g: 0.0, b: 0.0, a: 1.0 },
            storeOp: "store",
          },
          {
            view: context.getCurrentTexture().createView(),
            loadValue: { r: 0.0, g: 0.0, b: 0.0, a: 1.0 },
            storeOp: "store",
          },
        ],
      });
      passEncoder.setPipeline(pipeline);
      passEncoder.setBindGroup(0, bg);
      passEncoder.draw(4, 1, 0, 0);
      passEncoder.endPass();

      device.queue.submit([commandEncoder.finish()]);

      requestAnimationFrame(frame);
    }

    requestAnimationFrame(frame);
  });

  return (
    <>
      <canvas ref={c}></canvas>
    </>
  );
};

export default App;
