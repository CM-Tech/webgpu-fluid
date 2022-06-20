struct Uniforms {
    pixel: vec2<f32>,
};
@group(0) @binding(0) var samplerFront : sampler;
@group(0) @binding(1) var<uniform> u : Uniforms;

@group(1) @binding(0) var velocity : texture_2d<f32>;

let EPSILON = 2.4414e-4; // 2^-12
let timestep = 0.0016666;
let curlAmount = 12.0;

fn curl(coords: vec2<f32>) -> f32 {
    var L = textureSample(velocity, samplerFront, coords - vec2<f32>(u.pixel.x, 0.0)).y;
    var R = textureSample(velocity, samplerFront, coords + vec2<f32>(u.pixel.x, 0.0)).y;
    var B = textureSample(velocity, samplerFront, coords - vec2<f32>(0.0, u.pixel.y)).x;
    var T = textureSample(velocity, samplerFront, coords + vec2<f32>(0.0, u.pixel.y)).x;

    return 0.5 * ((R - L) - (T - B));
}

@fragment
fn vorticity(@builtin(position) coords: vec4<f32>) ->  @location(0) vec2<f32> {
    var uv = coords.xy * u.pixel;
    var L = curl(uv - vec2<f32>(u.pixel.x, 0.0));
    var R = curl(uv + vec2<f32>(u.pixel.x, 0.0));
    var B = curl(uv - vec2<f32>(0.0, u.pixel.y));
    var T = curl(uv + vec2<f32>(0.0, u.pixel.y));

    var vC = curl(uv);

    var force = 0.5 * vec2<f32>(abs(T) - abs(B), abs(L) - abs(R));
    force *= curlAmount * vC / max(length(force), EPSILON);

    var vel = textureSample(velocity, samplerFront, uv).xy;
    return vel + timestep * force;
}
