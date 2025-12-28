import type { Accessor } from "solid-js";

interface Swappable {
  read: GPUTexture;
  write: GPUTexture;
  swap: () => void;
}

interface BindPair {
  read: () => GPUBindGroup;
}

const HIST_CHARS = ['▁', '▂', '▃', '▄', '▅', '▆', '▇', '█'];

const drawHistogram = (data: number[], min: number, max: number, binsCount = 35): string => {
  if (data.length === 0) return "";
  const range = max - min || 1; // Avoid division by zero
  const bins = new Array(binsCount).fill(0);

  for (const v of data) {
    const t = (v - min) / range;
    const idx = Math.min(Math.floor(t * binsCount), binsCount - 1);
    bins[idx]++;
  }

  const maxFreq = Math.max(...bins);
  return "[" + bins.map(freq => {
    if (freq === 0) return " "; // Use underscore or space for zero
    const intensity = Math.min(Math.floor((freq / maxFreq) * (HIST_CHARS.length - 1)), HIST_CHARS.length - 1);
    return HIST_CHARS[intensity];
  }).join("") + "]";
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
  const BATCHES = 20;

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

  const computeTimes: number[] = [];
  const triangleTimes: number[] = [];
  const quadTimes: number[] = [];

  // Helper to run a batch
  const runBatch = async (
    targetArray: number[],
    encodeFn: (encoder: GPUCommandEncoder, querySet: GPUQuerySet, j: number) => void
  ) => {
    // 1. Record Commands
    {
      const commandEncoder = device.createCommandEncoder();
      for (let j = 0; j < ITERATIONS; j++) {
        encodeFn(commandEncoder, querySet, j);
        pressure.swap();
      }
      device.queue.submit([commandEncoder.finish()]);
      await device.queue.onSubmittedWorkDone();
    }

    // 2. Resolve Query Set
    const commandEncoder = device.createCommandEncoder();
    commandEncoder.resolveQuerySet(querySet, 0, ITERATIONS * 2, resolveBuffer, 0);
    commandEncoder.copyBufferToBuffer(resolveBuffer, 0, resultBuffer, 0, resultBuffer.size);
    device.queue.submit([commandEncoder.finish()]);
    await device.queue.onSubmittedWorkDone();

    // 3. Read Results
    await resultBuffer.mapAsync(GPUMapMode.READ);
    const times = new BigUint64Array(resultBuffer.getMappedRange());
    let batchTotal = 0;
    for (let j = 0; j < ITERATIONS; j++) {
      batchTotal += Number(times[j * 2 + 1] - times[j * 2]);
    }
    // Report average time per pass in this batch
    targetArray.push(batchTotal / ITERATIONS);
    resultBuffer.unmap();
  };

  for (let i = 0; i < BATCHES; i++) {
    // 1. Compute
    await runBatch(computeTimes, (commandEncoder, qs, j) => {
      const passEncoder = commandEncoder.beginComputePass({
        timestampWrites: { querySet: qs, beginningOfPassWriteIndex: j * 2, endOfPassWriteIndex: j * 2 + 1 },
      });
      passEncoder.setPipeline(jacobiComputePipeline);
      passEncoder.setBindGroup(0, device.createBindGroup({
        layout: computeLayout,
        entries: [
          { binding: 0, resource: divergenceTex().createView() },
          { binding: 1, resource: pressure.read.createView() },
          { binding: 2, resource: pressure.write.createView() },
        ],
      }));
      passEncoder.dispatchWorkgroups(Math.ceil(dwidth() / 8), Math.ceil(dheight() / 8));
      passEncoder.end();
    });

    // 2. Fragment (Triangle)
    await runBatch(triangleTimes, (commandEncoder, qs, j) => {
      const passEncoder = commandEncoder.beginRenderPass({
        colorAttachments: [colorAttachment(pressure.write)],
        timestampWrites: { querySet: qs, beginningOfPassWriteIndex: j * 2, endOfPassWriteIndex: j * 2 + 1 },
      });
      passEncoder.setPipeline(jacobiPipeline);
      passEncoder.setBindGroup(0, divergenceReadGroup);
      passEncoder.setBindGroup(1, pressurePair.read());
      passEncoder.draw(3, 1, 0, 0);
      passEncoder.end();
    });

    // 3. Fragment (Quad)
    await runBatch(quadTimes, (commandEncoder, qs, j) => {
      const passEncoder = commandEncoder.beginRenderPass({
        colorAttachments: [colorAttachment(pressure.write)],
        timestampWrites: { querySet: qs, beginningOfPassWriteIndex: j * 2, endOfPassWriteIndex: j * 2 + 1 },
      });
      passEncoder.setPipeline(jacobiPipeline);
      passEncoder.setBindGroup(0, divergenceReadGroup);
      passEncoder.setBindGroup(1, pressurePair.read());
      passEncoder.draw(4, 1, 3, 0);
      passEncoder.end();
    });
  }

  const allTimes = [...computeTimes, ...triangleTimes, ...quadTimes];
  const globalMin = Math.min(...allTimes);
  const globalMax = Math.max(...allTimes);

  computeTimes.sort((a, b) => a - b);
  triangleTimes.sort((a, b) => a - b);
  quadTimes.sort((a, b) => a - b);

  const computeMedian = computeTimes[Math.floor(computeTimes.length / 2)];
  const triangleMedian = triangleTimes[Math.floor(triangleTimes.length / 2)];
  const quadMedian = quadTimes[Math.floor(quadTimes.length / 2)];

  console.log(`Compute Median:  ${(computeMedian / 1000).toFixed(2)} us ${drawHistogram(computeTimes, globalMin, globalMax)}`);
  console.log(`Triangle Median: ${(triangleMedian / 1000).toFixed(2)} us ${drawHistogram(triangleTimes, globalMin, globalMax)}`);
  console.log(`Quad Median:     ${(quadMedian / 1000).toFixed(2)} us ${drawHistogram(quadTimes, globalMin, globalMax)}`);
  console.log(`Triangle vs Quad: ${(triangleMedian / quadMedian).toFixed(2)}x (Lower is better for Triangle)`);
  console.log(`Speedup (Quad -> Compute): ${(quadMedian / computeMedian).toFixed(2)}x`);
  console.log(`Speedup (Triangle -> Compute): ${(triangleMedian / computeMedian).toFixed(2)}x`);
};
