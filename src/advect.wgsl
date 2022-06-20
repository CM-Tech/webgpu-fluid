struct Uniforms {
    pixel: vec2<f32>,
};
@group(0) @binding(0) var samplerFront : sampler;
@group(0) @binding(1) var<uniform> u : Uniforms;

@group(1) @binding(0) var velocity : texture_2d<f32>;
@group(1) @binding(1) var dye : texture_2d<f32>;

let timestep = 0.016666;
let dyeDissipation = 0.97;
let velocityDissipation = 0.98;
let color = vec4<f32>(0.0, 0.0, 0.0, 1.0);

struct Output {
    @location(0) dye: vec4<f32>,
    @location(1) velocity: vec4<f32>,
}


@fragment
fn advect(@builtin(position) coords: vec4<f32>) -> Output {
    var uv = coords.xy * u.pixel;
    var pos = uv.xy - timestep * u.pixel * textureSample(velocity, samplerFront, uv.xy).xy;
    var startDye = textureSample(dye, samplerFront, pos);
    var startVelocity = textureSample(velocity, samplerFront, pos);
    var out: Output;
    out.dye = ((color - startDye) * (1.0 - dyeDissipation) + startDye);
    out.velocity = startVelocity * velocityDissipation;
    return out;
}
