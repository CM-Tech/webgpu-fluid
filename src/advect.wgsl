@binding(0) @group(0) var samplerFront : sampler;

struct Uniforms {
    color: vec4<f32>,
    texelSize: vec2<f32>,
    dyeDissipation: f32,
    velocityDissipation: f32,
};

struct Output {
    @location(0) dye: vec4<f32>,
    @location(1) velocity: vec4<f32>,
}

@binding(0) @group(1) var<uniform> u : Uniforms;
@binding(1) @group(1) var velocity : texture_2d<f32>;
@binding(2) @group(1) var dye : texture_2d<f32>;

let timestep = 0.016666;

@fragment
fn advect(@builtin(position) coords: vec4<f32>) -> Output {
    var uv = coords.xy * u.texelSize;
    var pos = uv.xy - timestep * u.texelSize * textureSample(velocity, samplerFront, uv.xy).xy;
    var startDye = textureSample(dye, samplerFront, pos);
    var startVelocity = textureSample(velocity, samplerFront, pos);
    var out: Output;
    out.dye = ((u.color - startDye) * (1.0 - u.dyeDissipation) + startDye);
    out.velocity = startVelocity * u.velocityDissipation;
    return out;
}
