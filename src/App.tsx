import { Component, onMount } from "solid-js";
import triangleWGSL from "./triangle.wgsl?raw";

export const App: Component = () => {
  let c!: HTMLCanvasElement;
  onMount(async () => {
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
      usage: GPUTextureUsage.COPY_SRC | GPUTextureUsage.RENDER_ATTACHMENT,
    });

    const readTexture = device.createTexture({
      size,
      format: presentationFormat,
      dimension: "2d",
      mipLevelCount: 1,
      usage: GPUTextureUsage.TEXTURE_BINDING | GPUTextureUsage.COPY_DST,
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
        {
          binding: 2,
          visibility: GPUShaderStage.FRAGMENT,
          buffer: {
            type: "uniform",
          },
        },
        {
          binding: 3,
          visibility: GPUShaderStage.FRAGMENT,
          buffer: {
            type: "uniform",
          },
        },
      ],
    });

    const resolution = device.createBuffer({
      size: 2 * 4,
      usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
      mappedAtCreation: true,
    });
    const resolutionView = new Float32Array(resolution.getMappedRange());
    resolutionView.set([1 / c.width, 1 / c.height]);
    resolution.unmap();

    const mouse = device.createBuffer({
      size: 2 * 4,
      usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
    });

    window.addEventListener("mousemove", (e) => {
      const rect = c.getBoundingClientRect();
      device.queue.writeBuffer(
        mouse,
        0,
        new Float32Array([(e.clientX - rect.left) / c.width, (e.clientY - rect.top) / c.height])
      );
    });

    const bindingGroup = device.createBindGroup({
      layout: bglayout,
      entries: [
        { binding: 0, resource: readTexture.createView() },
        { binding: 1, resource: device.createSampler() },
        { binding: 2, resource: { buffer: resolution } },
        { binding: 3, resource: { buffer: mouse } },
      ],
    });

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

    const buffer = device.createBuffer({
      size: size[0] * size[1] * 4,
      usage: GPUBufferUsage.COPY_SRC,
      mappedAtCreation: true,
    });
    const bufferView = new Float32Array(buffer.getMappedRange());
    bufferView.set(Array.from({ length: size[0] * size[1] }, Math.random));
    buffer.unmap();

    const initialEncoder = device.createCommandEncoder();
    initialEncoder.copyBufferToTexture(
      { buffer, bytesPerRow: size[0] * 4 },
      { texture: readTexture },
      { width: size[0], height: size[1] }
    );
    device.queue.submit([initialEncoder.finish()]);

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
      passEncoder.setBindGroup(0, bindingGroup);
      passEncoder.draw(4, 1, 0, 0);
      passEncoder.endPass();

      commandEncoder.copyTextureToTexture(
        { texture: currentTexture },
        { texture: readTexture },
        {
          width: size[0],
          height: size[1],
        }
      );
      device.queue.submit([commandEncoder.finish()]);

      requestAnimationFrame(frame);
    };

    frame();
  });

  return <canvas ref={c} width={512} height={512}></canvas>;
};
