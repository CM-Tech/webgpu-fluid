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
const velocityDissipation = 1.0;//0.75;
const color = vec4<f32>(0.0, 0.0, 0.0, 1.0);

struct Output {
    @location(0) value: vec4<f32>,
    @location(1) screen: vec4<f32>,
};

@fragment
fn advect_dye(@builtin(position) coords: vec4<f32>) -> Output {
    var coord = coords.xy - 0.5;
    var vel = textureSample(velocity, texSampler, coord / vec2<f32>(u.dyeResolution)).xy;
    var pos = (coords.xy - timestep * vel) / vec2<f32>(u.dyeResolution);
    var startDye = textureSample(dye, texSampler, pos);
    var col = ((color - startDye) * (1.0 - pow(dyeDissipation, timestep)) + startDye);
    return Output(col, col);
}

@fragment
fn advect_velocity(@builtin(position) coords: vec4<f32>) -> @location(0) vec2<f32> {
    var coord = coords.xy - 0.5;
    var vel = textureSample(velocity, texSampler, coord / vec2<f32>(u.simResolution)).xy;
    var pos = coords.xy / vec2<f32>(u.simResolution) - timestep * vel / vec2<f32>(u.dyeResolution);
    var startVelocity = textureSample(velocity, texSampler, pos).xy;
    return startVelocity * pow(velocityDissipation, timestep);
}
