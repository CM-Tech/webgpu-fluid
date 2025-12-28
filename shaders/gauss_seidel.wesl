import package::common::sorOmega;

@group(0) @binding(0) var divergence : texture_2d<f32>;
@group(0) @binding(1) var pressure : texture_2d<f32>;
@group(0) @binding(2) var new_pressure : texture_storage_2d<r32float, write>;

fn solve(global_id: vec3<u32>, parity: i32) {
    let texture_dims = vec2<i32>(textureDimensions(divergence));
    let coords = vec2<i32>(global_id.xy);

    if (coords.x >= texture_dims.x || coords.y >= texture_dims.y) {
        return;
    }

    let oldVal = textureLoad(pressure, coords, 0).x;

    if (((coords.x + coords.y) & 1) != parity) {
        textureStore(new_pressure, coords, vec4<f32>(oldVal, 0.0, 0.0, 1.0));
        return;
    }

    // Clamp coordinates for neighbors
    let L = textureLoad(pressure, clamp(coords - vec2<i32>(1, 0), vec2<i32>(0), texture_dims - 1), 0).x;
    let R = textureLoad(pressure, clamp(coords + vec2<i32>(1, 0), vec2<i32>(0), texture_dims - 1), 0).x;
    let B = textureLoad(pressure, clamp(coords + vec2<i32>(0, 1), vec2<i32>(0), texture_dims - 1), 0).x;
    let T = textureLoad(pressure, clamp(coords - vec2<i32>(0, 1), vec2<i32>(0), texture_dims - 1), 0).x;

    let bC = textureLoad(divergence, coords, 0).x;

    let result = (L + R + B + T - bC) / 4.0;
    let sorResult = mix(oldVal, result, sorOmega);

    textureStore(new_pressure, coords, vec4<f32>(sorResult, 0.0, 0.0, 1.0));
}

@compute @workgroup_size(8, 8, 1)
fn main_red(@builtin(global_invocation_id) global_id: vec3<u32>) {
    solve(global_id, 0);
}

@compute @workgroup_size(8, 8, 1)
fn main_black(@builtin(global_invocation_id) global_id: vec3<u32>) {
    solve(global_id, 1);
}
