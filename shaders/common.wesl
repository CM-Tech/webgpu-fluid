struct Uniforms {
    simResolution: vec2<i32>,
    dyeResolution: vec2<i32>,
};
@group(0) @binding(0) var<uniform> u : Uniforms;
@group(0) @binding(1) var texSampler : sampler;

const EPSILON = 2.4414e-4; // 2^-12

const radius = 200.0;

const timestep = 0.017;
const dyeDissipation = 0.97;
const velocityDissipation = .98;
const color = vec4<f32>(1.0, 1.0, 1.0, 1.0);
const curlAmount = 12.0;
const pressureDissipation = 0.8;