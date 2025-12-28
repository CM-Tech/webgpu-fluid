const dwidth = 256,
  dheight = 256;

const ITERATIONS = 50,
  BATCHES = 20,
  WARMUP = 10;

const commonWGSL = `
fn get_jacobi(pressure: texture_2d<f32>, coord: vec2<i32>) -> f32 {
    let sim_res = vec2<i32>(textureDimensions(pressure));
    var total = 0.0;
    for (var i = -1; i <= 1; i++) {
        for (var j = -1; j <= 1; j++) {
            total += textureLoad(pressure, clamp(coord + vec2<i32>(i, j), vec2<i32>(0), sim_res - 1), 0).x;
        }
    }
    return total;
}
`;

const vertWGSL = `
@vertex
fn vert(@builtin(vertex_index) vid: u32) -> @builtin(position) vec4<f32> {
    let pos = array(
        vec2(-1.0, -1.0),
        vec2(3.0, -1.0),
        vec2(-1.0, 3.0)
    );
    return vec4<f32>(pos[vid], 0.0, 1.0);
}
`;

const fragWGSL = `
${commonWGSL}
@group(0) @binding(0) var pressure : texture_2d<f32>;
@fragment
fn jacobi(@builtin(position) coords: vec4<f32>) -> @location(0) f32 {
    return get_jacobi(pressure, vec2<i32>(coords.xy));
}
`;

const computeWGSL = `
${commonWGSL}
@group(0) @binding(0) var pressure : texture_2d<f32>;
@group(0) @binding(1) var new_pressure : texture_storage_2d<r32float, write>;

@compute @workgroup_size(8, 8, 1)
fn jacobiCompute(@builtin(global_invocation_id) global_id: vec3<u32>) {
    let texture_dims = vec2<i32>(textureDimensions(pressure));
    let coords = vec2<i32>(global_id.xy);

    if (coords.x >= texture_dims.x || coords.y >= texture_dims.y) {
        return;
    }

    let result = get_jacobi(pressure, coords);
    textureStore(new_pressure, coords, vec4<f32>(result, 0.0, 0.0, 1.0));
}
`;

const createTex = (
  device: GPUDevice,
  width: number,
  height: number,
  format: GPUTextureFormat,
  usage: GPUTextureUsageFlags,
) => device.createTexture({ format, size: [width, height], usage });

const median = (arr: number[]) => [...arr].sort((a, b) => a - b)[Math.floor(arr.length / 2)];

async function runBatch(
  compute: boolean,
  shared: {
    device: GPUDevice;
    querySet: GPUQuerySet;
    resolveBuffer: GPUBuffer;
    resultBuffer: GPUBuffer;
    pipelines: { compute: GPUComputePipeline; render: GPURenderPipeline };
    bindGroups: { compute: GPUBindGroup[]; render: GPUBindGroup[] };
    pressure: { textures: GPUTexture[]; parity: number };
    dims: { width: number; height: number };
  },
  times?: number[],
  wallTimes?: number[],
) {
  const { device, querySet, resolveBuffer, resultBuffer, pipelines, bindGroups, pressure, dims } = shared;
  const encoder = device.createCommandEncoder();
  for (let j = 0; j < ITERATIONS; j++) {
    const p = pressure.parity;
    if (compute) {
      const pass = encoder.beginComputePass({
        timestampWrites: { querySet, beginningOfPassWriteIndex: j * 2, endOfPassWriteIndex: j * 2 + 1 },
      });
      pass.setPipeline(pipelines.compute);
      pass.setBindGroup(0, bindGroups.compute[p]);
      pass.dispatchWorkgroups(Math.ceil(dims.width / 8), Math.ceil(dims.height / 8));
      pass.end();
    } else {
      const pass = encoder.beginRenderPass({
        colorAttachments: [
          {
            view: pressure.textures[1 - p].createView(),
            clearValue: [0, 0, 0, 1],
            loadOp: "clear",
            storeOp: "store",
          },
        ],
        timestampWrites: { querySet, beginningOfPassWriteIndex: j * 2, endOfPassWriteIndex: j * 2 + 1 },
      });
      pass.setPipeline(pipelines.render);
      pass.setBindGroup(0, bindGroups.render[p]);
      pass.draw(3, 1, 0, 0);
      pass.end();
    }
    pressure.parity = 1 - p;
  }
  device.queue.submit([encoder.finish()]);
  if (!times || !wallTimes) return;

  await device.queue.onSubmittedWorkDone();
  const resEncoder = device.createCommandEncoder();
  resEncoder.resolveQuerySet(querySet, 0, ITERATIONS * 2, resolveBuffer, 0);
  resEncoder.copyBufferToBuffer(resolveBuffer, 0, resultBuffer, 0, resultBuffer.size);
  device.queue.submit([resEncoder.finish()]);
  await resultBuffer.mapAsync(GPUMapMode.READ);
  const data = new BigUint64Array(resultBuffer.getMappedRange());
  let total = 0;
  for (let j = 0; j < ITERATIONS; j++) total += Number(data[j * 2 + 1] - data[j * 2]);
  times.push(total / ITERATIONS);
  wallTimes.push(Number(data[ITERATIONS * 2 - 1] - data[0]) / ITERATIONS);
  resultBuffer.unmap();
}

const GPUProgram = async () => {
  const adapter = await navigator.gpu.requestAdapter();
  const device = await adapter?.requestDevice({
    requiredFeatures: adapter.features.has("timestamp-query")
      ? ["timestamp-query", "float32-filterable"]
      : ["float32-filterable"],
  });
  if (!device) return;

  const shaders = {
    vert: device.createShaderModule({ code: vertWGSL }),
    frag: device.createShaderModule({ code: fragWGSL }),
    compute: device.createShaderModule({ code: computeWGSL }),
  };

  const floatLayout = device.createBindGroupLayout({
    entries: [{ binding: 0, visibility: GPUShaderStage.FRAGMENT, texture: { sampleType: "float" } }],
  });
  const computeLayout = device.createBindGroupLayout({
    entries: [
      { binding: 0, visibility: GPUShaderStage.COMPUTE, texture: { sampleType: "float" } },
      { binding: 1, visibility: GPUShaderStage.COMPUTE, storageTexture: { access: "write-only", format: "r32float" } },
    ],
  });

  const fragPipeline = device.createRenderPipeline({
    vertex: { module: shaders.vert, entryPoint: "vert" },
    primitive: { topology: "triangle-list" },
    fragment: { module: shaders.frag, entryPoint: "jacobi", targets: [{ format: "r32float" }] },
    layout: device.createPipelineLayout({ bindGroupLayouts: [floatLayout] }),
  });

  const computePipeline = device.createComputePipeline({
    layout: device.createPipelineLayout({ bindGroupLayouts: [computeLayout] }),
    compute: { module: shaders.compute, entryPoint: "jacobiCompute" },
  });

  const commonUsage = GPUTextureUsage.TEXTURE_BINDING | GPUTextureUsage.COPY_DST | GPUTextureUsage.RENDER_ATTACHMENT;
  const pressure = {
    textures: [
      createTex(device, dwidth, dheight, "r32float", commonUsage | GPUTextureUsage.STORAGE_BINDING),
      createTex(device, dwidth, dheight, "r32float", commonUsage | GPUTextureUsage.STORAGE_BINDING),
    ],
    parity: 0,
  };

  const fragBindGroups = pressure.textures.map((t) =>
    device.createBindGroup({
      layout: floatLayout,
      entries: [{ binding: 0, resource: t.createView() }],
    }),
  );

  const computeBindGroups = pressure.textures.map((t, i) =>
    device.createBindGroup({
      layout: computeLayout,
      entries: [
        { binding: 0, resource: t.createView() },
        { binding: 1, resource: pressure.textures[1 - i].createView() },
      ],
    }),
  );

  const querySet = device.createQuerySet({ type: "timestamp", count: ITERATIONS * 2 });
  const resolveBuffer = device.createBuffer({
    size: ITERATIONS * 16,
    usage: GPUBufferUsage.QUERY_RESOLVE | GPUBufferUsage.COPY_SRC,
  });
  const resultBuffer = device.createBuffer({
    size: ITERATIONS * 16,
    usage: GPUBufferUsage.COPY_DST | GPUBufferUsage.MAP_READ,
  });

  console.log("Starting Benchmark...");
  const shared = {
    device,
    querySet,
    resolveBuffer,
    resultBuffer,
    pipelines: { compute: computePipeline, render: fragPipeline },
    bindGroups: { compute: computeBindGroups, render: fragBindGroups },
    dims: { width: dwidth, height: dheight },
    pressure,
  };

  for (let i = 0; i < WARMUP; i++) {
    await runBatch(true, shared);
    await runBatch(false, shared);
  }

  const cTimes: number[] = [],
    cWall: number[] = [],
    qTimes: number[] = [],
    qWall: number[] = [];

  for (let i = 0; i < BATCHES; i++) {
    await runBatch(true, shared, cTimes, cWall);
    await runBatch(false, shared, qTimes, qWall);
  }

  const cTime = median(cTimes) / 1000;
  const cWallTime = median(cWall) / 1000;
  const qTime = median(qTimes) / 1000;
  const qWallTime = median(qWall) / 1000;

  console.log(`Compute:  ${cTime.toFixed(2)}us | Wall: ${cWallTime.toFixed(2)}us`);
  console.log(`Triangle: ${qTime.toFixed(2)}us | Wall: ${qWallTime.toFixed(2)}us`);
  console.log(`Speedup Iters:  ${(qTime / cTime).toFixed(2)}x`);
  console.log(`Speedup Wall:  ${(qWallTime / cWallTime).toFixed(2)}x`);
};

GPUProgram();
