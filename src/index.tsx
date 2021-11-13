import { Component, onMount } from "solid-js";
import { render } from "solid-js/web";
import triangleWGSL from "./triangle.wgsl?raw";

import "./index.css";

const App: Component = () => {
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
      ],
    });

    const uniforms = device.createBuffer({
      size: 4 * 4,
      usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
      mappedAtCreation: true,
    });
    const uniformView = new Float32Array(uniforms.getMappedRange());
    uniformView.set([1 / c.width, 1 / c.height, 0, 0]);
    uniforms.unmap();

    window.addEventListener("mousemove", (e) => {
      const rect = c.getBoundingClientRect();
      device.queue.writeBuffer(
        uniforms,
        2 * 4,
        new Float32Array([(e.clientX - rect.left) / c.width, (e.clientY - rect.top) / c.height])
      );
    });

    const bindingGroup = device.createBindGroup({
      layout: bglayout,
      entries: [
        { binding: 0, resource: readTexture.createView() },
        { binding: 1, resource: device.createSampler() },
        { binding: 2, resource: { buffer: uniforms } },
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

render(() => <App />, document.getElementById("root")!);
