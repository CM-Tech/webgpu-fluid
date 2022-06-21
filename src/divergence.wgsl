struct Uniforms {
    resolution: vec2<i32>,
};
@group(0) @binding(0) var<uniform> u : Uniforms;

@group(1) @binding(0) var velocity : texture_2d<f32>;

fn sampleVelocity(coord: vec2<i32>, coordo: vec2<i32>) -> vec2<f32> {
    var exists = existe(coord) * 2.0 - 1.0;
    var q = textureLoad(velocity, coord, 0).xy;
    return q;
}

@fragment
fn divergence(@builtin(position) coords: vec4<f32>) -> @location(0) f32 {
    var uv = vec2<i32>(coords.xy);
    var L = sampleVelocity(uv - vec2<i32>(1, 0), uv).x;
    var R = sampleVelocity(uv + vec2<i32>(1, 0), uv).x;
    var T = sampleVelocity(uv - vec2<i32>(0, 1), uv).y;
    var B = sampleVelocity(uv + vec2<i32>(0, 1), uv).y;
    return (R - L + B - T) * 0.5;
}
