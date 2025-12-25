@group(0) @binding(0) var pressure : texture_2d<f32>;
@group(0) @binding(1) var velocity : texture_2d<f32>;

@fragment
fn gradient(@builtin(position) coords: vec4<f32>) -> @location(0) vec2<f32> {
    let uv = vec2<i32>(coords.xy);
    let simRes = vec2<i32>(textureDimensions(pressure));
    let pL = textureLoad(pressure, clamp(uv - vec2<i32>(1, 0), vec2<i32>(0), simRes - 1), 0).x;
    let pR = textureLoad(pressure, clamp(uv + vec2<i32>(1, 0), vec2<i32>(0), simRes - 1), 0).x;
    let pB = textureLoad(pressure, clamp(uv - vec2<i32>(0, 1), vec2<i32>(0), simRes - 1), 0).x;
    let pT = textureLoad(pressure, clamp(uv + vec2<i32>(0, 1), vec2<i32>(0), simRes - 1), 0).x;
    let v = textureLoad(velocity, uv, 0).xy;
    return v - vec2<f32>(pR - pL, pT - pB);
}
