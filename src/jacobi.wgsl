struct Uniforms {
    resolution: vec2<i32>,
};
@group(0) @binding(0) var<uniform> u : Uniforms;

@group(1) @binding(0) var divergence : texture_2d<f32>;
@group(1) @binding(1) var velocity : texture_2d<f32>;

@group(2) @binding(0) var pressure : texture_2d<f32>;

fn textureLoadFalloof(a: texture_2d<f32>, coord: vec2<i32>, coordo: vec2<i32>) -> vec2<f32> {
    var exists = existe(coord);
    var q = textureLoad(a, coord, 0).x;
    var q2 = textureLoad(a, coordo, 0).x;
    return vec2<f32>(q * exists + (1.0 - exists )*q2, exists + (1.0 - exists ));
}
fn sampleVelocity(coord: vec2<i32>,coordo: vec2<i32>) -> vec3<f32> {
   
    var exists = existe(coord);
    var q = textureLoad(velocity, coord, 0).xy;
//     if(exists<1.0){
// q=-textureLoad(velocity, coordo, 0).xy;
//     }
    // exists = 1.0;
    return vec3<f32>(q*exists , exists);
}
fn inflow(coords: vec2<f32>) -> f32 {
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
    return Q.x;
}


@fragment
fn jacobi(@builtin(position) coords: vec4<f32>) -> @location(0) f32 {
    var coord = vec2<i32>(coords.xy);
    // left, right, bottom, and top pressure samples
    var L = textureLoadFalloof(pressure, coord - vec2<i32>(1, 0),coord );
    var R = textureLoadFalloof(pressure, coord + vec2<i32>(1, 0),coord );
    var B = textureLoadFalloof(pressure, coord + vec2<i32>(0, 1),coord );
    var T = textureLoadFalloof(pressure, coord - vec2<i32>(0, 1),coord );

    var bC = inflow(coords.xy);
    var C = textureLoad(pressure, coord, 0).x;

    // evaluate Jacobi iteration
    var sum = L + R + B + T;
    var dd = 4.0 - sum.y;
    // sum.x += C * dd;
    // sum.y += dd;
    // if (sum.y < 1.0 || existe(coord)<1.0) {
    //     return 0.0;
    // }
    // if(existe(coord -  vec2<i32>(1, 0))<1.0){
    //     return 
    // }
    var dir = vec2<i32>(1, 0);
    var fl=vec2<f32>(0.0);
    for(var o=0;o<4;o+=1){

        var ff= textureLoad(pressure, coord +dir,0 ).x;
        var ff2 = textureLoad(velocity, coord+dir, 0).xy;//sampleVelocity(coord + dir,coord);
        if(existe(coord + dir)!=existe(coord )){
            ff2=-textureLoad(velocity, coord, 0).xy;
            ff=textureLoad(pressure, coord, 0).x;
        }
        // if(existe(coord )<1.0 && o==0){
        //     ff2=textureLoad(velocity, coord + dir, 0).xy*0.0;
        //     ff=textureLoad(pressure, coord + dir, 0).x;
        // }
        var inflow=dot(ff2.xy,-vec2<f32>(dir));
        inflow+=(ff-textureLoad(pressure, coord, 0).x)*2.0;
       
        fl.x+=inflow/2.0;
        // fl.x+=ff;

        dir=vec2<i32>(-dir.y, dir.x);
    }
    return C+( fl.x)/ 4.0;//(sum.x + bC/2.0) / sum.y;
}
