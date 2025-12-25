@group(0) @binding(0) var divergence : texture_2d<f32>;
@group(1) @binding(0) var pressure : texture_2d<f32>;

@fragment
fn jacobi(@builtin(position) coords: vec4<f32>) -> @location(0) f32 {
    let simRes = vec2<i32>(textureDimensions(pressure));
    let coord = vec2<i32>(coords.xy);

    let L = textureLoad(pressure, clamp(coord - vec2<i32>(1, 0), vec2<i32>(0), simRes - 1), 0).x;
    let R = textureLoad(pressure, clamp(coord + vec2<i32>(1, 0), vec2<i32>(0), simRes - 1), 0).x;
    let B = textureLoad(pressure, clamp(coord + vec2<i32>(0, 1), vec2<i32>(0), simRes - 1), 0).x;
    let T = textureLoad(pressure, clamp(coord - vec2<i32>(0, 1), vec2<i32>(0), simRes - 1), 0).x;

    let bC = textureLoad(divergence, coord, 0).x;

    return (L + R + B + T - bC) / 4.0;
}
