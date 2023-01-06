import { createMemo, createSignal, createRenderEffect, onMount, onCleanup, createEffect } from "solid-js";
import type { Accessor } from "solid-js";
import { render } from "solid-js/web";
import vertWGSL from "./vert.wgsl?raw";
import displayWGSL from "./display.wgsl?raw";
import advectWGSL from "./advect.wgsl?raw";
import clearWGSL from "./clear.wgsl?raw";
import clear2WGSL from "./clear2.wgsl?raw";
import divergenceWGSL from "./divergence.wgsl?raw";
import jacobiWGSL from "./jacobi.wgsl?raw";
import gradientWGSL from "./gradient.wgsl?raw";
import vorticityWGSL from "./vorticity.wgsl?raw";
import commonWGSL from "./common.wgsl?raw";
import splatWGSL from "./splat.wgsl?raw";
import { createEventListener } from "@solid-primitives/event-listener";
import "./index.css";
import { createControls, LevaPanel, levaStore } from "solid-leva";
import { createStore, Store, StoreSetter } from "solid-js/store";

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
function HSVtoRGB(h: number, s: number, v: number) {
  let r = 0,
    g = 0,
    b = 0;
  const i = Math.floor(h * 6);
  const f = h * 6 - i;
  const p = v * (1 - s);
  const q = v * (1 - f * s);
  const t = v * (1 - (1 - f) * s);
  // prettier-ignore
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
    b: Math.round(b * 255),
  };
}
const DOWNSAMPLE = 0;
const PRESSURE_DOWNSAMPLE = 3;
type VelTouch = {
  identifier: number;
  time: number;
  x: number;
  y: number;
  previous: { time: number; x: number; y: number };
  uniform: GPUBuffer;
};
type Config = { pressureSolverIterations: number; color: { r: number; g: number; b: number }; paused: boolean };

let lastH = Math.random();
const GPUProgram = (props: {
  width: number;
  height: number;
  device: GPUDevice;
  context: GPUCanvasContext;
  config: Store<Config>;
  setConfig: StoreSetter<Config>;
}) => {
  createEffect(() => {
    if (!props.device || !props.context) return;
    const presentationFormat = navigator.gpu.getPreferredCanvasFormat();
    const vertShader = props.device.createShaderModule({
      code: "\n" + vertWGSL,
    });
    const displayShader = props.device.createShaderModule({
      code: commonWGSL + "\n" + displayWGSL,
    });
    const advectShader = props.device.createShaderModule({
      code: commonWGSL + "\n" + advectWGSL,
    });
    const clearShader = props.device.createShaderModule({
      code: "\n" + clearWGSL,
    });
    const clearShader2 = props.device.createShaderModule({
      code: "\n" + clear2WGSL,
    });
    const divergenceShader = props.device.createShaderModule({
      code: commonWGSL + "\n" + divergenceWGSL,
    });
    const jacobiShader = props.device.createShaderModule({
      code: commonWGSL + "\n" + jacobiWGSL,
    });
    const gradientShader = props.device.createShaderModule({
      code: commonWGSL + "\n" + gradientWGSL,
    });
    const vorticityShader = props.device.createShaderModule({
      code: commonWGSL + "\n" + vorticityWGSL,
    });
    const splatShader = props.device.createShaderModule({
      code: commonWGSL + "\n" + splatWGSL,
    });

    const mainLayout = props.device.createBindGroupLayout({
      entries: [
        {
          binding: 0,
          visibility: GPUShaderStage.FRAGMENT,
          buffer: { type: "uniform" },
        },
      ],
    });
    const displayMainLayout = props.device.createBindGroupLayout({
      entries: [
        {
          binding: 0,
          visibility: GPUShaderStage.FRAGMENT,
          buffer: { type: "uniform" },
        },
      ],
    });
    const displayLayout = props.device.createBindGroupLayout({
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
        {
          binding: 2,
          visibility: GPUShaderStage.FRAGMENT,
          texture: { viewDimension: "2d", sampleType: "unfilterable-float" },
        },
      ],
    });
    const dyeVelocityLayout = props.device.createBindGroupLayout({
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
    const dyeVelocityPressureLayout = props.device.createBindGroupLayout({
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
        {
          binding: 2,
          visibility: GPUShaderStage.FRAGMENT,
          texture: { viewDimension: "2d", sampleType: "unfilterable-float" },
        },
      ],
    });
    const floatLayout = props.device.createBindGroupLayout({
      entries: [
        {
          binding: 0,
          visibility: GPUShaderStage.FRAGMENT,
          texture: { viewDimension: "2d", sampleType: "unfilterable-float" },
        },
      ],
    });
    const gradientLayout = props.device.createBindGroupLayout({
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
    const splatTouchLayout = props.device.createBindGroupLayout({
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
    const splatPipeline = props.device.createRenderPipeline({
      ...defaultPipeline,
      fragment: {
        module: splatShader,
        entryPoint: "splat",
        targets: [{ format: "rgba32float" }, { format: "rg32float" }],
      },
      layout: props.device.createPipelineLayout({
        bindGroupLayouts: [mainLayout, dyeVelocityLayout, splatTouchLayout],
      }),
    });
    const advectPipeline = props.device.createRenderPipeline({
      ...defaultPipeline,
      fragment: {
        module: advectShader,
        entryPoint: "advect",
        targets: [{ format: "rgba32float" }, { format: "rg32float" }], //,{ format: "r32float" }],
      },
      layout: props.device.createPipelineLayout({ bindGroupLayouts: [mainLayout, dyeVelocityPressureLayout] }),
    });
    const divergencePipeline = props.device.createRenderPipeline({
      ...defaultPipeline,
      fragment: {
        module: divergenceShader,
        entryPoint: "divergence",
        targets: [{ format: "r32float" }],
      },
      layout: props.device.createPipelineLayout({ bindGroupLayouts: [mainLayout, floatLayout] }),
    });
    const jacobiPipeline = props.device.createRenderPipeline({
      ...defaultPipeline,
      fragment: {
        module: jacobiShader,
        entryPoint: "jacobi",
        targets: [{ format: "r32float" }],
      },
      layout: props.device.createPipelineLayout({ bindGroupLayouts: [mainLayout, floatLayout, floatLayout] }),
    });
    const gradientPipeline = props.device.createRenderPipeline({
      ...defaultPipeline,
      fragment: {
        module: gradientShader,
        entryPoint: "gradient",
        targets: [{ format: "rg32float" }],
      },
      layout: props.device.createPipelineLayout({ bindGroupLayouts: [mainLayout, gradientLayout] }),
    });
    const vorticityPipeline = props.device.createRenderPipeline({
      ...defaultPipeline,
      fragment: {
        module: vorticityShader,
        entryPoint: "vorticity",
        targets: [{ format: "rg32float" }],
      },
      layout: props.device.createPipelineLayout({ bindGroupLayouts: [mainLayout, floatLayout] }),
    });
    const displayPipeline = props.device.createRenderPipeline({
      ...defaultPipeline,
      fragment: {
        module: displayShader,
        entryPoint: "display",
        targets: [{ format: presentationFormat }],
      },
      layout: props.device.createPipelineLayout({ bindGroupLayouts: [mainLayout, displayLayout] }),
    });
    type Ops = {
      width: () => number;
      height: () => number;
    };
    const widthDisplay = () => props.width;
    const heightDisplay = () => props.height;
    const widthDye = () => props.width >> DOWNSAMPLE;
    const heightDye = () => props.height >> DOWNSAMPLE;
    const widthPressure = () => props.width >> PRESSURE_DOWNSAMPLE;
    const heightPressure = () => props.height >> PRESSURE_DOWNSAMPLE;
    createRenderEffect(() => {
      props.context.configure({
        device: props.device,
        alphaMode: "opaque",
        format: presentationFormat,
        usage: GPUTextureUsage.COPY_SRC | GPUTextureUsage.RENDER_ATTACHMENT,
      });
    });

    const createTexture = (format?: GPUTextureFormat, ops?: Ops) => (last?: GPUTexture) => {
      if (last) last.destroy();
      const newTex = props.device.createTexture({
        format: format ?? presentationFormat,
        dimension: "2d",
        mipLevelCount: 1,
        size: [(ops?.width ?? widthDye)(), (ops?.height ?? heightDye)()],
        usage: GPUTextureUsage.TEXTURE_BINDING | GPUTextureUsage.COPY_DST | GPUTextureUsage.RENDER_ATTACHMENT,
      });

      return newTex;
    };

    const doubleFbo = (format?: GPUTextureFormat, ops?: Ops) =>
      createSwappable(
        createMemo<GPUTexture>(createTexture(format, ops)),
        createMemo<GPUTexture>(createTexture(format, ops))
      );

    const dye = doubleFbo("rgba32float");
    const velocity = doubleFbo("rg32float");
    const pressure = doubleFbo("r32float", { width: widthPressure, height: heightPressure });
    const divergenceTex = createMemo<GPUTexture>(
      createTexture("r32float", { width: widthPressure, height: heightPressure })
    );

    const uniforms = props.device.createBuffer({
      size: 8 << 2,
      usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
      mappedAtCreation: false,
    });

    const makeUniformsPerTouch = () =>
      props.device.createBuffer({
        size: 12 << 2,
        usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
        mappedAtCreation: false,
      });

    const displayUniforms = props.device.createBuffer({
      size: 6 << 2,
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
      lastH = (lastH + (Math.sqrt(5) + 1) / 2) % 1;
      var mi = props.config.color;
      props.setConfig(
        "color",
        HSVtoRGB(
          Math.random(),
          (Math.random() > 1 / 4 ? 1 : 0.0) / 2 + Math.random() * 0.5,
          Math.random() > 1 / 6 ? 1 : 0.0
        )
      );
      var kkl = 1.0; //Math.random();//*1.5+1.0;
      props.device.queue.writeBuffer(
        m.uniform,
        0 << 2,
        new Float32Array([
          (mi.r / 255) * kkl,
          (mi.g / 255) * kkl,
          (mi.b / 255) * kkl,
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
      props.device.queue.writeBuffer(
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
    createEventListener(document.querySelector("canvas")!, "mousemove", (e: MouseEvent) => {
      const touch = { clientX: e.clientX, clientY: e.clientY, identifier: -1 };
      const m = touches.find((t) => t.identifier === touch.identifier)!; // TODO: YEET
      if (!m) return;
      moveTouch(touch);
    });

    createEventListener(document.querySelector("canvas")!, "mousedown", (e: MouseEvent) => {
      const touch = { clientX: e.clientX, clientY: e.clientY, identifier: -1 };
      destroyTouch(touch);
      if (e.button === 0) moveTouch(touch);
    });
    createEventListener(document.querySelector("canvas")!, "mouseup", (e: MouseEvent) => {
      const touch = { clientX: e.clientX, clientY: e.clientY, identifier: -1 };
      destroyTouch(touch);
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
    var shift = false;
    createEventListener(
      window,
      "keydown",
      (e: KeyboardEvent) => {
        if (e.key.includes("Shift")) {
          shift = true;
        }
      },
      { passive: false }
    );
    createEventListener(
      window,
      "keyup",
      (e: KeyboardEvent) => {
        if (e.key.includes("Shift")) {
          shift = false;
        }
      },
      { passive: false }
    );
    createEventListener(window, "touchend", ({ changedTouches }: TouchEvent) => {
      destroyTouch({ identifier: -1, clientX: 0, clientY: 0 });
      for (let i = 0; i < changedTouches.length; i++) destroyTouch(changedTouches[i]);
    });

    createRenderEffect(() => {
      props.device.queue.writeBuffer(
        uniforms,
        0 << 2,
        new Int32Array([widthDye(), heightDye(), widthPressure(), heightPressure(), widthDisplay(), heightDisplay()])
      );
      props.device.queue.writeBuffer(
        displayUniforms,
        0 << 2,
        new Int32Array([widthDye(), heightDye(), widthPressure(), heightPressure(), widthDisplay(), heightDisplay()])
      );
    });

    const mainBindGroup = props.device.createBindGroup({
      layout: mainLayout,
      entries: [{ binding: 0, resource: { buffer: uniforms } }],
    });

    const displayBindGroup = props.device.createBindGroup({
      layout: displayMainLayout,
      entries: [{ binding: 0, resource: { buffer: displayUniforms } }],
    });

    let animation: number;
    let lastDate = new Date();
    const frame = () => {
      let meDate = new Date();
      let dt = Math.min((+meDate - +lastDate) / 1000, 1 / 10);
      props.device.queue.writeBuffer(uniforms, 6 << 2, new Float32Array([dt]));
      lastDate = meDate;
      const commandEncoder = props.device.createCommandEncoder();
      var sPause = touches.length === 0 && shift;
      var pau = (touches.length === 0 && props.config.paused) || sPause;
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
          props.device.createBindGroup({
            layout: dyeVelocityLayout,
            entries: [
              { binding: 0, resource: dye.read.createView() },
              { binding: 1, resource: velocity.read.createView() },
            ],
          })
        );
        passEncoder.setBindGroup(
          2,
          props.device.createBindGroup({
            layout: splatTouchLayout,
            entries: [{ binding: 0, resource: { buffer: mouse.uniform } }],
          })
        );
        passEncoder.draw(4, 1, 0, 0);
        passEncoder.end();
        if (!shift) {
          dye.swap();
        }
        velocity.swap();
      }

      for (let igg = 0; igg < 1.0; igg += 1) {
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
            props.device.createBindGroup({
              layout: floatLayout,
              entries: [{ binding: 0, resource: velocity.read.createView() }],
            })
          );
          passEncoder.draw(4, 1, 0, 0);
          passEncoder.end();
        }

        const divergenceReadGroup = props.device.createBindGroup({
          layout: floatLayout,
          entries: [{ binding: 0, resource: divergenceTex().createView() }],
        });
        let ag = [pressure.write.createView(), pressure.read.createView()];
        let ag2 = ag.map((x) =>
          props.device.createBindGroup({
            layout: floatLayout,
            entries: [{ binding: 0, resource: x }],
          })
        );
        for (let i = 0; i < props.config.pressureSolverIterations; i++) {
          var sp = i % 2;
          const passEncoder = commandEncoder.beginRenderPass({
            colorAttachments: [
              {
                view: ag[sp],
                clearValue: { r: 0.0, g: 0.0, b: 0.0, a: 1.0 },
                storeOp: "store",
                loadOp: "clear",
              },
            ],
          });
          passEncoder.setPipeline(jacobiPipeline);
          passEncoder.setBindGroup(0, mainBindGroup);

          passEncoder.setBindGroup(1, divergenceReadGroup);
          passEncoder.setBindGroup(2, ag2[1 - sp]);
          passEncoder.draw(4, 1, 0, 0);
          passEncoder.end();

          pressure.swap();
        }

        if (!pau) {
          if (!pau) {
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
              props.device.createBindGroup({
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
          if (!pau) {
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
              props.device.createBindGroup({
                layout: dyeVelocityPressureLayout,
                entries: [
                  { binding: 0, resource: dye.read.createView() },
                  { binding: 1, resource: velocity.read.createView() },
                  { binding: 2, resource: pressure.read.createView() },
                ],
              })
            );
            passEncoder.draw(4, 1, 0, 0);
            passEncoder.end();

            dye.swap();
            velocity.swap();
            pressure.swap();
          }
        }
      }

      if (!pau) {
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
          props.device.createBindGroup({
            layout: floatLayout,
            entries: [{ binding: 0, resource: velocity.read.createView() }],
          })
        );
        passEncoder.draw(4, 1, 0, 0);
        passEncoder.end();

        velocity.swap();
      }

      {
        const currentTexture = props.context.getCurrentTexture();
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
          props.device.createBindGroup({
            layout: displayLayout,
            entries: [
              { binding: 0, resource: dye.read.createView() },
              { binding: 1, resource: pressure.read.createView() },
              { binding: 2, resource: velocity.read.createView() },
            ],
          })
        );

        passEncoder.draw(4, 1, 0, 0);
        passEncoder.end();
      }

      props.device.queue.submit([commandEncoder.finish()]);

      animation = requestAnimationFrame(frame);
    };

    onMount(frame);
    onCleanup(() => cancelAnimationFrame(animation));
  });
  return <div></div>;
};

const App = () => {
  const [width, setWidth] = createSignal(window.innerWidth);
  const [height, setHeight] = createSignal(window.innerHeight);
  const [context, setContext] = createSignal<GPUCanvasContext>();
  const [device, setDevice] = createSignal<GPUDevice>();

  const [config, setConfigf] = createStore({
    pressureSolverIterations: 100,
    color: { r: 1, g: 1, b: 1 },
    paused: false,
  });
  let did = false;
  const setConfig: typeof setConfigf = (...args: any[]) => {
    var v = setConfigf(...args);
    document.querySelector("#leva__root")?.remove();
    levaStore.disposePaths([args[0]]);
    try {
      levaStore.setValueAtPath(args[0], args[1], false);
    } catch (e) {
      console.log("E", e);
    }
    setControls(
      createControls({
        pressureSolverIterations: config.pressureSolverIterations,
        color: { ...config.color },
        paused: config.paused,
      })
    );
    return v;
  };
  const [controls, setControls] = createSignal(
    createControls({
      pressureSolverIterations: config.pressureSolverIterations,
      color: { ...config.color },
      paused: config.paused,
    })
  );

  createEventListener(window, "resize", () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  });

  (async () => {
    const adapter = await navigator.gpu?.requestAdapter();
    if (!adapter) throw new Error("No GPU support");
    return await adapter.requestDevice();
  })().then((x) => {
    console.log("D", x);
    setDevice(x);
  });

  createEffect(() => {
    createControls(() => ({ pressureSolverIterations: config.pressureSolverIterations }));
  });

  return (
    <div>
      <canvas ref={(c) => setContext(c.getContext("webgpu")!)} width={width()} height={height()}></canvas>
      <GPUProgram
        context={context()!}
        device={device()!}
        width={width()}
        height={height()}
        config={controls()}
        setConfig={setConfig}
      ></GPUProgram>
      <LevaPanel store={levaStore} />
    </div>
  );
};

render(() => <App />, document.getElementById("root")!);
