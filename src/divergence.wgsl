struct Uniforms {
    pixel: vec2<f32>,
};
@group(0) @binding(0) var samplerFront : sampler;
@group(0) @binding(1) var<uniform> u : Uniforms;

@group(1) @binding(0) var velocity : texture_2d<f32>;

fn sampleVelocity(uv: vec2<f32>) -> vec2<f32> {
    var mult = vec2<f32>(1.0, 1.0);
    if (uv.x < 0.0 || uv.x > 1.0) {
        mult.x = -1.0;
    }
    if (uv.y < 0.0 || uv.y > 1.0) {
        mult.y = -1.0;
    }
    return mult * textureSample(velocity, samplerFront, uv).xy;
}

@fragment
fn divergence(@builtin(position) coords: vec4<f32>) -> @location(0) f32 {
    var uv = coords.xy * u.pixel;
    var L = sampleVelocity(uv - vec2<f32>(u.pixel.x, 0.0)).x;
    var R = sampleVelocity(uv + vec2<f32>(u.pixel.x, 0.0)).x;
    var T = sampleVelocity(uv + vec2<f32>(0.0, u.pixel.y)).y;
    var B = sampleVelocity(uv - vec2<f32>(0.0, u.pixel.y)).y;
    var div = 0.5 * (R - L + T - B);
    return div;
}
