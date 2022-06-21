struct Uniforms {
    resolution: vec2<i32>,
};
@group(0) @binding(0) var<uniform> u : Uniforms;

@group(1) @binding(0) var velocity : texture_2d<f32>;

fn sampleVelocity(coord: vec2<i32>,coordo: vec2<i32>) -> vec3<f32> {
   
    var exists = existe(coord);
    var q = textureLoad(velocity, coord, 0).xy;
    if(exists<1.0){
q=-textureLoad(velocity, coordo, 0).xy;
    }
    return vec3<f32>(q , 1.0);
}

@fragment
fn divergence(@builtin(position) coords: vec4<f32>) -> @location(0) f32 {
    var uv = vec2<i32>(coords.xy);
    var C = sampleVelocity(uv - vec2<i32>(0, 0),uv).xz;
    var L = sampleVelocity(uv - vec2<i32>(1, 0),uv).xz;
    var R = sampleVelocity(uv + vec2<i32>(1, 0),uv).xz;
    R.x = -R.x;
    var T = sampleVelocity(uv - vec2<i32>(0, 1),uv).yz;
    var B = sampleVelocity(uv + vec2<i32>(0, 1),uv).yz;
    B.x = -B.x;

    var Q = L + T + R + B;
    var dd=4.0-Q.y;
    if(C.y >0.0){
        // Q.y+=C.y*dd;
    }
    if (Q.y < 1.0) {
        return 0.0; 
    }
    return -Q.x;
}
