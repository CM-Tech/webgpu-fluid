import package::common::{timestep, EPSILON, curlAmount};

@group(0) @binding(0) var velocity : texture_2d<f32>;

fn curl(coords: vec2<i32>) -> f32 {
    let simRes = vec2<i32>(textureDimensions(velocity));
    let L = textureLoad(velocity, clamp(coords - vec2<i32>(1, 0), vec2<i32>(0), simRes - 1), 0).y;
    let R = textureLoad(velocity, clamp(coords + vec2<i32>(1, 0), vec2<i32>(0), simRes - 1), 0).y;
    let B = textureLoad(velocity, clamp(coords - vec2<i32>(0, 1), vec2<i32>(0), simRes - 1), 0).x;
    let T = textureLoad(velocity, clamp(coords + vec2<i32>(0, 1), vec2<i32>(0), simRes - 1), 0).x;

    return 0.5 * ((R - L) - (T - B));
}

@fragment
fn vorticity(@builtin(position) coords: vec4<f32>) -> @location(0) vec2<f32> {
    let coord = vec2<i32>(coords.xy);
    let simRes = vec2<i32>(textureDimensions(velocity));

    let L = curl(clamp(coord - vec2<i32>(1, 0), vec2<i32>(0), simRes - 1));
    let R = curl(clamp(coord + vec2<i32>(1, 0), vec2<i32>(0), simRes - 1));
    let B = curl(clamp(coord - vec2<i32>(0, 1), vec2<i32>(0), simRes - 1));
    let T = curl(clamp(coord + vec2<i32>(0, 1), vec2<i32>(0), simRes - 1));

    let vC = curl(coord);

    var force = 0.5 * vec2<f32>(abs(T) - abs(B), abs(L) - abs(R));
    force *= curlAmount * vC / max(length(force), EPSILON);

    let vel = textureLoad(velocity, coord, 0).xy;
    return vel + timestep * force;
}
