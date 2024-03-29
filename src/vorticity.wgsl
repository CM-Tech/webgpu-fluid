struct Uniforms {
    resolution: vec2<i32>,
    resolutionPressure: vec2<i32>,
    resolutionDisplay: vec2<i32>,
    timestep: f32
};
@group(0) @binding(0) var<uniform> u : Uniforms;

@group(1) @binding(0) var velocity : texture_2d<f32>;

const EPSILON = 2.4414e-4; // 2^-12
const curlAmount = 1.0;

fn curl(coords: vec2<i32>) -> f32 {
    var L = textureLoad(velocity, coords - vec2<i32>(1, 0), 0).y;
    var R = textureLoad(velocity, coords + vec2<i32>(1, 0), 0).y;
    var B = textureLoad(velocity, coords - vec2<i32>(0, 1), 0).x;
    var T = textureLoad(velocity, coords + vec2<i32>(0, 1), 0).x;

    return 0.5 * ((R - L) - (T - B));
}

@fragment
fn vorticity(@builtin(position) coords: vec4<f32>) -> @location(0) vec2<f32> {
    var coord = vec2<i32>(coords.xy);

    var L = curl(coord - vec2<i32>(1, 0));
    var R = curl(coord + vec2<i32>(1, 0));
    var B = curl(coord - vec2<i32>(0, 1));
    var T = curl(coord + vec2<i32>(0, 1));

    var vC = curl(coord);

    var force = 0.5 * vec2<f32>(abs(T) - abs(B), abs(L) - abs(R));
    force *= curlAmount * vC / max(length(force), EPSILON);

    var vel = textureLoad(velocity, coord, 0).xy;
    return vel + u.timestep * force;
}
