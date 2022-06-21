struct Uniforms {
    resolution: vec2<i32>,
};
@group(0) @binding(0) var<uniform> u : Uniforms;

@group(1) @binding(0) var dye : texture_2d<f32>;
@group(1) @binding(1) var velocity : texture_2d<f32>;

let timestep = 0.016666;
let dyeDissipation = 0.7;
let velocityDissipation = 0.5;//0.75;
let color = vec4<f32>(0.0, 0.0, 0.0, 1.0);

struct Output {
    @location(0) dye: vec4<f32>,
    @location(1) velocity: vec2<f32>,
}


fn textureLoadFalloof(a: texture_2d<f32>, coord: vec2<i32>) -> vec4<f32> {
    
    var exists = existe(coord);
    var q = textureLoad(a, coord, 0);
    return q * exists;
}

fn textureSampleSmooth(a: texture_2d<f32>, uvv: vec2<f32>) -> vec4<f32> {
    var uv=uvv;
    
    var exists = existe(vec2<i32>(uv));
    if(exists<1.0) {
        return vec4<f32>(0.0);
        // uv=normalize(vec2<f32>(uv)-vec2<f32>(u.resolution)/2.0)*(f32(W)/2.0 - 1.0)+vec2<f32>(u.resolution)/2.0;
    }
    var inn = uv - 0.5;
    var tl = vec2<i32>(floor(inn));
    var br = vec2<i32>(floor(inn) + 1.0);
    return (textureLoadFalloof(a, tl.xy) * (f32(br.x) - inn.x) + textureLoadFalloof(a, vec2<i32>(br.x, tl.y)) * (inn.x - f32(tl.x))) * (f32(br.y) - inn.y) + (textureLoadFalloof(a, vec2<i32>(tl.x, br.y)) * (f32(br.x) - inn.x) + textureLoadFalloof(a, br.xy) * (inn.x - f32(tl.x))) * (inn.y - f32(tl.y));
}

@fragment
fn advect(@builtin(position) coords: vec4<f32>) -> Output {
    var coord = vec2<i32>(coords.xy - 0.5);
    var pos = coords.xy - timestep * textureLoad(velocity, vec2<i32>(coord), 0).xy;
     var posD = coords.xy -timestep * textureLoad(velocity, vec2<i32>(coord), 0).xy;
    var startDye = textureSampleSmooth(dye, posD);
    var startVelocity = textureSampleSmooth(velocity, pos).xy;
    var out: Output;
    out.dye = ((color - startDye) * (1.0 - pow(dyeDissipation, timestep)) + startDye);
    out.velocity = startVelocity * pow(velocityDissipation, timestep);
    var exists = existe(coord);
    if(exists<1.0) {
       out.dye=vec4<f32>(1.0);
       out.velocity=vec2<f32>(0.0);
    }
    return out;
}
