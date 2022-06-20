struct Uniforms {
    resolution: vec2<i32>,
};
@group(0) @binding(0) var<uniform> u : Uniforms;

@group(1) @binding(0) var divergence : texture_2d<f32>;

@group(2) @binding(0) var pressure : texture_2d<f32>;

fn textureLoadFalloof(a: texture_2d<f32>, coord: vec2<i32>) -> vec2<f32> {
    var exists = 1.0;

    if (coord.x < 0 || coord.x > (u.resolution.x) - 1 || coord.y < 0 || coord.y > (u.resolution.y) - 1) {
        exists = 0.0;
    }
    var W = u.resolution.x;
    if (u.resolution.y < W) {
        W = u.resolution.y;
    }
    if (distance(vec2<f32>(u.resolution) / 2.0, vec2<f32>(coord)) > f32(W) / 2.0) {
        exists = 0.0;
    }

    var q = textureLoad(a, coord, 0).x;
    return vec2<f32>(q * exists, exists);
}

@fragment
fn jacobi(@builtin(position) coords: vec4<f32>) -> @location(0) f32 {
    var coord = vec2<i32>(coords.xy);
    // left, right, bottom, and top pressure samples
    var L = textureLoadFalloof(pressure, coord - vec2<i32>(1, 0));
    var R = textureLoadFalloof(pressure, coord + vec2<i32>(1, 0));
    var B = textureLoadFalloof(pressure, coord + vec2<i32>(0, 1));
    var T = textureLoadFalloof(pressure, coord - vec2<i32>(0, 1));

    // divergence sample, from center
    var bC = textureLoad(divergence, coord, 0).x;

    // evaluate Jacobi iteration
    var sum = L + R + B + T;
    if (sum.y < 1.0) {
        return 0.0;
    }
    return  (sum.x - bC) / sum.y;
}
