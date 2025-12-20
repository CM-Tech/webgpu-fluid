import common::u;

@group(1) @binding(0) var pressure : texture_2d<f32>;
@group(1) @binding(1) var velocity : texture_2d<f32>;

@fragment
fn gradient(@builtin(position) coords: vec4<f32>) -> @location(0) vec2<f32> {
    var uv = vec2<i32>(coords.xy);
    var pL = textureLoad(pressure, clamp(uv - vec2<i32>(1, 0), vec2<i32>(0), u.simResolution - 1), 0).x;
    var pR = textureLoad(pressure, clamp(uv + vec2<i32>(1, 0), vec2<i32>(0), u.simResolution - 1), 0).x;
    var pB = textureLoad(pressure, clamp(uv - vec2<i32>(0, 1), vec2<i32>(0), u.simResolution - 1), 0).x;
    var pT = textureLoad(pressure, clamp(uv + vec2<i32>(0, 1), vec2<i32>(0), u.simResolution - 1), 0).x;
    var v = textureLoad(velocity, uv, 0).xy;
    return v - vec2<f32>(pR - pL, pT - pB);
}
