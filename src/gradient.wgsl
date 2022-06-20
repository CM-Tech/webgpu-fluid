struct Uniforms {
    resolution: vec2<i32>,
};
@group(0) @binding(0) var<uniform> u : Uniforms;

@group(1) @binding(0) var pressure : texture_2d<f32>;
@group(1) @binding(1) var velocity : texture_2d<f32>;

@fragment
fn gradient(@builtin(position) coords: vec4<f32>) -> @location(0) vec2<f32> {
    var uv = vec2<i32>(coords.xy);
    var pL = textureLoad(pressure, uv - vec2<i32>(1, 0), 0).x;
    var pR = textureLoad(pressure, uv + vec2<i32>(1, 0), 0).x;
    var pB = textureLoad(pressure, uv - vec2<i32>(0, 1), 0).x;
    var pT = textureLoad(pressure, uv + vec2<i32>(0, 1), 0).x;
    var v = textureLoad(velocity, uv, 0).xy;
    return v - vec2<f32>(pR - pL, pT - pB);
}
