import type { Accessor } from "solid-js";

interface Swappable {
  read: GPUTexture;
  write: GPUTexture;
  swap: () => void;
}

interface BindPair {
  read: () => GPUBindGroup;
}

export const runBenchmark = async (
  device: GPUDevice,
  jacobiPipeline: GPURenderPipeline,
  jacobiComputePipeline: GPUComputePipeline,
  floatLayout: GPUBindGroupLayout,
  computeLayout: GPUBindGroupLayout,
  divergenceTex: Accessor<GPUTexture>,
  pressure: Swappable,
  pressurePair: BindPair,
  dwidth: () => number,
  dheight: () => number,
  colorAttachment: (view: GPUTexture) => GPURenderPassColorAttachment,
): Promise<void> => {
  const canTimestamp = device.features.has("timestamp-query");
  const ITERATIONS = 50;
  const querySet = canTimestamp ? device.createQuerySet({ type: "timestamp", count: ITERATIONS * 2 }) : undefined;
  const resolveBuffer = canTimestamp
    ? device.createBuffer({ size: ITERATIONS * 2 * 8, usage: GPUBufferUsage.QUERY_RESOLVE | GPUBufferUsage.COPY_SRC })
    : undefined;
  const resultBuffer = canTimestamp
    ? device.createBuffer({ size: ITERATIONS * 2 * 8, usage: GPUBufferUsage.COPY_DST | GPUBufferUsage.MAP_READ })
    : undefined;

  if (!canTimestamp || !querySet || !resolveBuffer || !resultBuffer) {
    console.warn("Timestamp queries not supported or not initialized.");
    return;
  }
  console.log("Starting Benchmark...");

  const divergenceReadGroup = device.createBindGroup({
    layout: floatLayout,
    label: "divergence read bind group",
    entries: [{ binding: 0, resource: divergenceTex().createView() }],
  });
  const passes = 20; // Total batches to average

  const computeTimes: number[] = [];
  const fragmentTimes: number[] = [];

  for (let i = 0; i < passes; i++) {
    const commandEncoder = device.createCommandEncoder();
    for (let j = 0; j < ITERATIONS; j++) {
      const passEncoder = commandEncoder.beginComputePass({
        timestampWrites: {
          querySet,
          beginningOfPassWriteIndex: j * 2,
          endOfPassWriteIndex: j * 2 + 1,
        },
      });
      passEncoder.setPipeline(jacobiComputePipeline);
      passEncoder.setBindGroup(
        0,
        device.createBindGroup({
          layout: computeLayout,
          entries: [
            { binding: 0, resource: divergenceTex().createView() },
            { binding: 1, resource: pressure.read.createView() },
            { binding: 2, resource: pressure.write.createView() },
          ],
        }),
      );
      passEncoder.dispatchWorkgroups(Math.ceil(dwidth() / 8), Math.ceil(dheight() / 8));
      passEncoder.end();
      pressure.swap();
    }
    commandEncoder.resolveQuerySet(querySet, 0, ITERATIONS * 2, resolveBuffer, 0);
    commandEncoder.copyBufferToBuffer(resolveBuffer, 0, resultBuffer, 0, resultBuffer.size);
    device.queue.submit([commandEncoder.finish()]);

    await resultBuffer.mapAsync(GPUMapMode.READ);
    const times = new BigUint64Array(resultBuffer.getMappedRange());
    let batchTotal = 0;
    for (let j = 0; j < ITERATIONS; j++) {
      batchTotal += Number(times[j * 2 + 1] - times[j * 2]);
    }

    computeTimes.push(batchTotal / ITERATIONS);
    resultBuffer.unmap();
  }

  for (let i = 0; i < passes; i++) {
    const commandEncoder = device.createCommandEncoder();
    for (let j = 0; j < ITERATIONS; j++) {
      const passEncoder = commandEncoder.beginRenderPass({
        colorAttachments: [colorAttachment(pressure.write)],
        timestampWrites: {
          querySet,
          beginningOfPassWriteIndex: j * 2,
          endOfPassWriteIndex: j * 2 + 1,
        },
      });
      passEncoder.setPipeline(jacobiPipeline);
      passEncoder.setBindGroup(0, divergenceReadGroup);
      passEncoder.setBindGroup(1, pressurePair.read());
      passEncoder.draw(4, 1, 0, 0);
      passEncoder.end();
      pressure.swap();
    }
    commandEncoder.resolveQuerySet(querySet, 0, ITERATIONS * 2, resolveBuffer, 0);
    commandEncoder.copyBufferToBuffer(resolveBuffer, 0, resultBuffer, 0, resultBuffer.size);
    device.queue.submit([commandEncoder.finish()]);

    await resultBuffer.mapAsync(GPUMapMode.READ);
    const times = new BigUint64Array(resultBuffer.getMappedRange());
    let batchTotal = 0;
    for (let j = 0; j < ITERATIONS; j++) {
      batchTotal += Number(times[j * 2 + 1] - times[j * 2]);
    }

    fragmentTimes.push(batchTotal / ITERATIONS);
    resultBuffer.unmap();
  }

  computeTimes.sort((a, b) => a - b);
  fragmentTimes.sort((a, b) => a - b);

  const computeMedian = computeTimes[Math.floor(computeTimes.length / 2)];
  const fragmentMedian = fragmentTimes[Math.floor(fragmentTimes.length / 2)];

  console.log(`Fragment Median: ${(fragmentMedian / 1000).toFixed(2)} us`);
  console.log(`Compute Median: ${(computeMedian / 1000).toFixed(2)} us`);
  console.log(`Speedup: ${(fragmentMedian / computeMedian).toFixed(2)}x`);
};
