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
  const vertShader = device.createShaderModule({
    code: vertWGSL,
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
  const vorticityShader = device.createShaderModule({
    code: vorticityWGSL,
  });
  const splatShader = device.createShaderModule({
    code: splatWGSL,
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
  const dyeVelocityLayout = device.createBindGroupLayout({
    entries: [
      {
        binding: 0,
        visibility: GPUShaderStage.FRAGMENT,
        texture: { viewDimension: "2d", sampleType: "float" },
      },
      {
        binding: 1,
        visibility: GPUShaderStage.FRAGMENT,
        texture: { viewDimension: "2d", sampleType: "float" },
      },
      {
        binding: 2,
        visibility: GPUShaderStage.FRAGMENT,
        sampler: { type: "filtering" },
      },
    ],
  });
  const floatLayout = device.createBindGroupLayout({
    entries: [
      {
        binding: 0,
        visibility: GPUShaderStage.FRAGMENT,
        texture: { viewDimension: "2d", sampleType: "float" },
      },
    ],
  });
  const gradientLayout = device.createBindGroupLayout({
    entries: [
      {
        binding: 0,
        visibility: GPUShaderStage.FRAGMENT,
        texture: { viewDimension: "2d", sampleType: "float" },
      },
      {
        binding: 1,
        visibility: GPUShaderStage.FRAGMENT,
        texture: { viewDimension: "2d", sampleType: "float" },
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
  const splatDyePipeline = device.createRenderPipeline({
    ...defaultPipeline,
    fragment: {
      module: splatShader,
      entryPoint: "splat_dye",
      targets: [{ format: "rgba16float" }],
    },
    layout: device.createPipelineLayout({ bindGroupLayouts: [mainLayout, dyeVelocityLayout, splatTouchLayout] }),
  });
  const splatVelocityPipeline = device.createRenderPipeline({
    ...defaultPipeline,
    fragment: {
      module: splatShader,
      entryPoint: "splat_velocity",
      targets: [{ format: "rg16float" }],
    },
    layout: device.createPipelineLayout({ bindGroupLayouts: [mainLayout, dyeVelocityLayout, splatTouchLayout] }),
  });
  const advectDyePipeline = device.createRenderPipeline({
    ...defaultPipeline,
    fragment: {
      module: advectShader,
      entryPoint: "advect_dye",
      targets: [{ format: "rgba16float" }, { format: presentationFormat }],
    },
    layout: device.createPipelineLayout({ bindGroupLayouts: [mainLayout, dyeVelocityLayout] }),
  });
  const advectVelocityPipeline = device.createRenderPipeline({
    ...defaultPipeline,
    fragment: {
      module: advectShader,
      entryPoint: "advect_velocity",
      targets: [{ format: "rg16float" }],
    },
    layout: device.createPipelineLayout({ bindGroupLayouts: [mainLayout, dyeVelocityLayout] }),
  });
  const clearPipeline = device.createRenderPipeline({
    ...defaultPipeline,
    fragment: {
      module: clearShader,
      entryPoint: "clear",
      targets: [{ format: "r16float" }],
    },
    layout: device.createPipelineLayout({ bindGroupLayouts: [mainLayout, floatLayout] }),
  });
  const divergencePipeline = device.createRenderPipeline({
    ...defaultPipeline,
    fragment: {
      module: divergenceShader,
      entryPoint: "divergence",
      targets: [{ format: "r16float" }],
    },
    layout: device.createPipelineLayout({ bindGroupLayouts: [mainLayout, floatLayout] }),
  });
  const jacobiPipeline = device.createRenderPipeline({
    ...defaultPipeline,
    fragment: {
      module: jacobiShader,
      entryPoint: "jacobi",
      targets: [{ format: "r16float" }],
    },
    layout: device.createPipelineLayout({ bindGroupLayouts: [mainLayout, floatLayout, floatLayout] }),
  });
  const gradientPipeline = device.createRenderPipeline({
    ...defaultPipeline,
    fragment: {
      module: gradientShader,
      entryPoint: "gradient",
      targets: [{ format: "rg16float" }],
    },
    layout: device.createPipelineLayout({ bindGroupLayouts: [mainLayout, gradientLayout] }),
  });
  const vorticityPipeline = device.createRenderPipeline({
    ...defaultPipeline,
    fragment: {
      module: vorticityShader,
      entryPoint: "vorticity",
      targets: [{ format: "rg16float" }],
    },
    layout: device.createPipelineLayout({ bindGroupLayouts: [mainLayout, floatLayout] }),
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
      size: format == "rgba16float" ? [width(), height()] : [dwidth(), dheight()],
      usage: GPUTextureUsage.TEXTURE_BINDING | GPUTextureUsage.COPY_DST | GPUTextureUsage.RENDER_ATTACHMENT,
    });

    return newTex;
  };

  const doubleFbo = (format?: GPUTextureFormat) =>
    createSwappable(createMemo<GPUTexture>(createTexture(format)), createMemo<GPUTexture>(createTexture(format)));

  const dye = doubleFbo("rgba16float");
  const velocity = doubleFbo("rg16float");
  const pressure = doubleFbo("r16float");
  const divergenceTex = createMemo<GPUTexture>(createTexture("r16float"));

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

    device.queue.writeBuffer(
      m.uniform,
      0 << 2,
      new Float32Array([
        Math.random() * 2 + 0.5,
        Math.random() * 2 + 0.5,
        Math.random() * 2 + 0.5,
        1,
        m.x,
        m.y,
        0,
        0,
        m.x,
        m.y,
      ]),
    );

    touches.set(m.identifier, m);
  };
  const moveTouch = (touch: { clientX: number; clientY: number; identifier: number }) => {
    const m = touches.get(touch.identifier);
    if (!m) {
      createTouch(touch);
      return;
    }
    const prevX = m.x;
    const prevY = m.y;
    m.x = touch.clientX;
    m.y = touch.clientY;
    const delX = m.x - prevX;
    const delY = m.y - prevY;
    const len = Math.sqrt(delX * delX + delY * delY);
    const maxLen = 2000;
    const speed = 100;
    device.queue.writeBuffer(
      m.uniform,
      4 << 2,
      new Float32Array([
        m.x,
        m.y,
        len * speed > maxLen ? (delX / len) * maxLen : delX * speed,
        len * speed > maxLen ? (delY / len) * maxLen : delY * speed,
      ]),
    );
  };
  const destroyTouch = (touch: { clientX: number; clientY: number; identifier: number }) => {
    const m = touches.get(touch.identifier);
    if (!m) return;
    touches.delete(m.identifier);
    m.uniform.destroy();
  };

  createEventListener(window, "mousemove", (e: MouseEvent) => {
    const touch = { clientX: e.clientX, clientY: e.clientY, identifier: -1 };
    moveTouch(touch);
  });

  createEventListener(window, "mousedown", (e: MouseEvent) => {
    const touch = { clientX: e.clientX, clientY: e.clientY, identifier: -1 };
    moveTouch(touch);
    const m = touches.get(touch.identifier)!;
    device.queue.writeBuffer(
      m.uniform,
      0 << 2,
      new Float32Array([Math.random() * 2 + 0.5, Math.random() * 2 + 0.5, Math.random() * 2 + 0.5]),
    );
  });

  createEventListener(
    window,
    "wheel",
    (e) => {
      e.preventDefault();
    },
    { passive: false },
  );
  createEventListener(
    window,
    "touchstart",
    (e: TouchEvent) => {
      e.preventDefault();
      destroyTouch({ identifier: -1, clientX: 0, clientY: 0 });
      for (let i = 0; i < e.changedTouches.length; i++) createTouch(e.changedTouches[i]);
    },
    { passive: false },
  );
  createEventListener(
    window,
    "touchmove",
    (e: TouchEvent) => {
      e.preventDefault();
      destroyTouch({ identifier: -1, clientX: 0, clientY: 0 });
      for (let i = 0; i < e.changedTouches.length; i++) moveTouch(e.changedTouches[i]);
    },
    { passive: false },
  );
  createEventListener(window, "touchend", ({ changedTouches }: TouchEvent) => {
    destroyTouch({ identifier: -1, clientX: 0, clientY: 0 });
    for (let i = 0; i < changedTouches.length; i++) destroyTouch(changedTouches[i]);
  });

  createRenderEffect(() => {
    device.queue.writeBuffer(uniforms, 0 << 2, new Int32Array([dwidth(), dheight(), width(), height()]));
  });

  const mainBindGroup = device.createBindGroup({
    layout: mainLayout,
    entries: [{ binding: 0, resource: { buffer: uniforms } }],
  });
  const divergenceReadGroup = device.createBindGroup({
    layout: floatLayout,
    entries: [{ binding: 0, resource: divergenceTex().createView() }],
  });

  let animation: number;
  const frame = () => {
    const commandEncoder = device.createCommandEncoder();

    for (const mouse of touches.values()) {
      const bindDyeVelocity = device.createBindGroup({
        layout: dyeVelocityLayout,
        entries: [
          { binding: 0, resource: dye.read.createView() },
          { binding: 1, resource: velocity.read.createView() },
          { binding: 2, resource: sampler },
        ],
      });
      const bindTouch = device.createBindGroup({
        layout: splatTouchLayout,
        entries: [{ binding: 0, resource: { buffer: mouse.uniform } }],
      });

      // Dye splat pass (full resolution texture)
      {
        const passEncoder = commandEncoder.beginRenderPass({
          colorAttachments: [
            {
              view: dye.write.createView(),
              clearValue: { r: 0.0, g: 0.0, b: 0.0, a: 1.0 },
              storeOp: "store",
              loadOp: "clear",
            },
          ],
        });
        passEncoder.setPipeline(splatDyePipeline);
        passEncoder.setBindGroup(0, mainBindGroup);
        passEncoder.setBindGroup(1, bindDyeVelocity);
        passEncoder.setBindGroup(2, bindTouch);
        passEncoder.draw(4, 1, 0, 0);
        passEncoder.end();
        dye.swap();
      }

      // Velocity splat pass (downsampled texture)
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
        passEncoder.setPipeline(splatVelocityPipeline);
        passEncoder.setBindGroup(0, mainBindGroup);
        passEncoder.setBindGroup(1, bindDyeVelocity);
        passEncoder.setBindGroup(2, bindTouch);
        passEncoder.draw(4, 1, 0, 0);
        passEncoder.end();
        velocity.swap();
      }
    }

    {
      const bindDyeVelocity = device.createBindGroup({
        layout: dyeVelocityLayout,
        entries: [
          { binding: 0, resource: dye.read.createView() },
          { binding: 1, resource: velocity.read.createView() },
          { binding: 2, resource: sampler },
        ],
      });

      // Advect dye (full resolution)
      {
        const currentTexture = context.getCurrentTexture();
        const passEncoder = commandEncoder.beginRenderPass({
          colorAttachments: [
            {
              view: dye.write.createView(),
              clearValue: { r: 0.0, g: 0.0, b: 0.0, a: 1.0 },
              storeOp: "store",
              loadOp: "clear",
            },
            {
              view: currentTexture.createView(),
              loadOp: "clear",
              storeOp: "store",
              clearValue: { r: 0, g: 0, b: 0, a: 1 },
            },
          ],
        });
        passEncoder.setPipeline(advectDyePipeline);
        passEncoder.setBindGroup(0, mainBindGroup);
        passEncoder.setBindGroup(1, bindDyeVelocity);
        passEncoder.draw(4, 1, 0, 0);
        passEncoder.end();
        dye.swap();
      }

      // Advect velocity (downsampled)
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
        passEncoder.setPipeline(advectVelocityPipeline);
        passEncoder.setBindGroup(0, mainBindGroup);
        passEncoder.setBindGroup(1, bindDyeVelocity);
        passEncoder.draw(4, 1, 0, 0);
        passEncoder.end();
        velocity.swap();
      }
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
        }),
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
        }),
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
      passEncoder.setBindGroup(0, mainBindGroup);
      passEncoder.setBindGroup(1, divergenceReadGroup);
      passEncoder.setBindGroup(
        2,
        device.createBindGroup({
          layout: floatLayout,
          entries: [{ binding: 0, resource: pressure.read.createView() }],
        }),
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
        }),
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
        }),
      );
      passEncoder.draw(4, 1, 0, 0);
      passEncoder.end();

      velocity.swap();
    }

    device.queue.submit([commandEncoder.finish()]);

    for (const mouse of touches.values()) {
      device.queue.writeBuffer(mouse.uniform, 6 << 2, new Float32Array([0, 0, mouse.x, mouse.y]));
    }

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
