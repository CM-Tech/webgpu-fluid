import common::{u, timestep, EPSILON, curlAmount};

@group(1) @binding(0) var velocity : texture_2d<f32>;

fn curl(coords: vec2<i32>) -> f32 {
    var L = textureLoad(velocity, clamp(coords - vec2<i32>(1, 0), vec2<i32>(0), u.simResolution - 1), 0).y;
    var R = textureLoad(velocity, clamp(coords + vec2<i32>(1, 0), vec2<i32>(0), u.simResolution - 1), 0).y;
    var B = textureLoad(velocity, clamp(coords - vec2<i32>(0, 1), vec2<i32>(0), u.simResolution - 1), 0).x;
    var T = textureLoad(velocity, clamp(coords + vec2<i32>(0, 1), vec2<i32>(0), u.simResolution - 1), 0).x;

    return 0.5 * ((R - L) - (T - B));
}

@fragment
fn vorticity(@builtin(position) coords: vec4<f32>) -> @location(0) vec2<f32> {
    var coord = vec2<i32>(coords.xy);

    var L = curl(clamp(coord - vec2<i32>(1, 0), vec2<i32>(0), u.simResolution - 1));
    var R = curl(clamp(coord + vec2<i32>(1, 0), vec2<i32>(0), u.simResolution - 1));
    var B = curl(clamp(coord - vec2<i32>(0, 1), vec2<i32>(0), u.simResolution - 1));
    var T = curl(clamp(coord + vec2<i32>(0, 1), vec2<i32>(0), u.simResolution - 1));

    var vC = curl(coord);

    var force = 0.5 * vec2<f32>(abs(T) - abs(B), abs(L) - abs(R));
    force *= curlAmount * vC / max(length(force), EPSILON);

    var vel = textureLoad(velocity, coord, 0).xy;
    return vel + timestep * force;
}
