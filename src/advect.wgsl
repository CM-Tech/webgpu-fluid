struct Uniforms {
    simResolution: vec2<i32>,
    dyeResolution: vec2<i32>,
};
@group(0) @binding(0) var<uniform> u : Uniforms;

@group(1) @binding(0) var dye : texture_2d<f32>;
@group(1) @binding(1) var velocity : texture_2d<f32>;
@group(1) @binding(2) var texSampler : sampler;

const timestep = 0.016666;
const dyeDissipation = 0.5;
const velocityDissipation = .9;//0.75;
const color = vec4<f32>(1.0, 1.0, 1.0, 1.0);

struct Output {
    @location(0) value: vec4<f32>,
    @location(1) screen: vec4<f32>,
};

fn getBfeccUv(coords: vec2<f32>) -> vec2<f32> {
    let res = vec2<f32>(u.dyeResolution);

    // 1. Initial back-trace (Semi-Lagrangian step)
    let v_start = textureSample(velocity, texSampler, coords).xy;
    let p_old = coords - (timestep * v_start) / res;

    // 2. Forward-trace from the back-traced position to find the error
    // We sample the velocity at the "origin" point to see where we'd end up
    let v_back = textureSample(velocity, texSampler, p_old).xy;
    let p_new_estimate = p_old + (timestep * v_back) / res;

    // 3. Calculate error and apply compensation
    // The error is the difference between our original 'coords' and where we ended up
    let error = p_new_estimate - coords;
    let p_corrected = coords - (error * 0.5);

    // 4. Final back-trace using the corrected position
    let v_final = textureSample(velocity, texSampler, p_corrected).xy;
    let p_final = p_corrected - (timestep * v_final) / res;
    
    return p_final;
}

@fragment
fn advectDye(@builtin(position) coords: vec4<f32>) -> Output {
    let res = vec2<f32>(u.dyeResolution);
    let uv = getBfeccUv((coords.xy) / res);
    let startDye = textureSample(dye, texSampler, uv);
    let dissipation = 1.0 - pow(dyeDissipation, timestep);
    let col = mix(startDye, color, dissipation);
    return Output(col, col);
}

@fragment
fn advectVelocity(@builtin(position) coords: vec4<f32>) -> @location(0) vec2<f32> {
    let res = vec2<f32>(u.simResolution);
    let uv = getBfeccUv((coords.xy) / res);
    let startVelocity = textureSample(velocity, texSampler, uv).xy;
    return startVelocity * pow(velocityDissipation, timestep);
}
