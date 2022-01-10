import { runWithOwner, getOwner } from "solid-js";

export type GPUContextType = {
  presentationFormat: GPUTextureFormat;
  device: GPUDevice;
  context: GPUCanvasContext;
};

export const gpuCanvas = (props: { width: number; height: number }, fn: (value: GPUContextType) => void) => {
  const c = (<canvas width={props.width} height={props.height}></canvas>) as HTMLCanvasElement;

  let owner = getOwner()!;
  (async () => {
    const context = c.getContext("webgpu")!;
    const adapter = await navigator.gpu?.requestAdapter();

    if (!adapter) throw new Error("No GPU support");

    let device = await adapter.requestDevice();
    let presentationFormat = context.getPreferredFormat(adapter);

    runWithOwner(owner, () =>
      fn({
        context,
        presentationFormat,
        device,
      })
    );
  })();

  return c;
};
