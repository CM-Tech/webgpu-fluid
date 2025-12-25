
@group(0) @binding(0) var velocity : texture_2d<f32>;

fn sampleVelocity(coord: vec2<i32>) -> vec2<f32> {
    var negate = vec2<f32>(1.0);
    let simRes = vec2<i32>(textureDimensions(velocity));
    let clamped = clamp(coord, vec2<i32>(0), simRes - 1);
    
    // Negate components that were clamped
    if (clamped.x != coord.x) {
        negate.x = -1.0;
    }
    if (clamped.y != coord.y) {
        negate.y = -1.0;
    }
    
    return textureLoad(velocity, clamped, 0).xy * negate;
}

@fragment
fn divergence(@builtin(position) coords: vec4<f32>) -> @location(0) f32 {
    let uv = vec2<i32>(coords.xy);
    let L = sampleVelocity(uv - vec2<i32>(1, 0)).x;
    let R = sampleVelocity(uv + vec2<i32>(1, 0)).x;
    let T = sampleVelocity(uv - vec2<i32>(0, 1)).y;
    let B = sampleVelocity(uv + vec2<i32>(0, 1)).y;

    return (R - L + B - T) * 0.5;
}
