struct Uniforms {
    resolution: vec2<i32>,
};
@group(0) @binding(0) var<uniform> u : Uniforms;

@group(1) @binding(0) var velocity : texture_2d<f32>;

fn sampleVelocity(coord: vec2<i32>) -> vec3<f32> {
    var exists = 1.0;

    if (coord.x < 0 || coord.x > (u.resolution.x) - 1 || coord.y < 0 || coord.y > (u.resolution.y) - 1) {
        exists = 0.0;
    }
    var W= u.resolution.x;
    if(u.resolution.y < W){
        W=u.resolution.y;
    }
    if(distance(vec2<f32>(u.resolution)/2.0,vec2<f32>(coord)) > f32(W)/2.0) {
        exists = 0.0;
    }
    var q = textureLoad(velocity, coord, 0).xy;
    return vec3<f32>(q * exists, exists);
}

@fragment
fn divergence(@builtin(position) coords: vec4<f32>) -> @location(0) f32 {
    var uv = vec2<i32>(coords.xy);
    var L = sampleVelocity(uv - vec2<i32>(1, 0)).xz;
    var R = sampleVelocity(uv + vec2<i32>(1, 0)).xz;
    R.x = -R.x;
    var T = sampleVelocity(uv - vec2<i32>(0, 1)).yz;
    var B = sampleVelocity(uv + vec2<i32>(0, 1)).yz;
    B.x = -B.x;

    var Q = L + T + R + B;
    if (Q.y < 1.0) {
        return 0.0; 
    }
    return -Q.x / Q.y;
}
