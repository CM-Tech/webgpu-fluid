struct Uniforms {
    simResolution: vec2<i32>,
    dyeResolution: vec2<i32>,
};
@group(0) @binding(0) var<uniform> u : Uniforms;
@group(1) @binding(0) var divergence : texture_2d<f32>;
@group(2) @binding(0) var pressure : texture_2d<f32>;

@fragment
fn jacobi(@builtin(position) coords: vec4<f32>) -> @location(0) f32 {
    var coord = vec2<i32>(coords.xy);

    var L = textureLoad(pressure, clamp(coord - vec2<i32>(1, 0), vec2<i32>(0), u.simResolution - 1), 0).x;
    var R = textureLoad(pressure, clamp(coord + vec2<i32>(1, 0), vec2<i32>(0), u.simResolution - 1), 0).x;
    var B = textureLoad(pressure, clamp(coord + vec2<i32>(0, 1), vec2<i32>(0), u.simResolution - 1), 0).x;
    var T = textureLoad(pressure, clamp(coord - vec2<i32>(0, 1), vec2<i32>(0), u.simResolution - 1), 0).x;

    var bC = textureLoad(divergence, coord, 0).x;

    return (L + R + B + T - bC) / 4.0;
}
