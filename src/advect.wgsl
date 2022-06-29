struct Uniforms {
    resolution: vec2<i32>,
    resolutionPressure: vec2<i32>,
    resolutionDisplay: vec2<i32>,
    timestep: f32,
};
@group(0) @binding(0) var<uniform> u : Uniforms;

@group(1) @binding(0) var dye : texture_2d<f32>;
@group(1) @binding(1) var velocity : texture_2d<f32>;
@group(1) @binding(2) var pressure : texture_2d<f32>;


let dyeDissipation = 1.0;
let velocityDissipation = 1.0;//0.75;
let color = vec4<f32>(vec3<f32>(0.0), 1.0);

struct Output {
    @location(0) dye: vec4<f32>,
    @location(1) velocity: vec2<f32>,
    // @location(2) pressure: f32,
}

fn figgle(vv: vec2<i32>, resg: vec2<i32>) -> vec2<i32> {
    return (vv % vec2<i32>(resg.xy) + vec2<i32>(resg.xy)) % vec2<i32>(resg.xy);
}

fn textureNLoad(ac: texture_2d<f32>, ack:vec2<i32>, bc:vec2<i32>) -> vec4<f32> {
    
    var existsTL :f32 = existe(vec2<i32>(ack));
    var exists2 :f32 = existe(vec2<i32>(bc));
    if(exists2==existsTL){
        return textureLoad(ac, ack, 0);
    }
     return textureLoad(ac, bc, 0)*0.0;
}
fn textureSampleSmooth(ac: texture_2d<f32>, uv: vec2<f32>, res: vec2<i32>, bc:vec2<i32>) -> vec4<f32> {
    var inn = uv - 0.5;
    var tl = vec2<i32>(floor(inn));
    var br = vec2<i32>(floor(inn) + 1.0);
    var TL_S = figgle(tl.xy, res);
    var TR_S = figgle(vec2<i32>(br.x, tl.y), res);
    var BL_S = figgle(vec2<i32>(tl.x, br.y), res);
    var BR_S = figgle(br.xy, res);
    
    
    return (textureLoad(ac, TL_S, 0) * (f32(br.x) - inn.x)+ textureLoad(ac, TR_S, 0) * (inn.x - f32(tl.x))) * (f32(br.y) - inn.y) + (textureLoad(ac, BL_S, 0) * (f32(br.x) - inn.x) + textureLoad(ac, BR_S, 0) * (inn.x - f32(tl.x))) * (inn.y - f32(tl.y)
     );
}

fn jexiste(uv: vec2<f32>) -> f32 {
    return existe(vec2<i32>((floor(uv*vec2<f32>(u.resolutionPressure))+0.5)/vec2<f32>(u.resolutionPressure)*vec2<f32>(u.resolution)));
}

fn jjexiste(uvc: vec2<i32>) -> f32 {
    return jexiste((vec2<f32>(uvc)+0.5)/vec2<f32>(u.resolution));
}

@fragment
fn advect(@builtin(position) coords: vec4<f32>) -> Output {
    let timestep = u.timestep/1.0;
    var coord = vec2<i32>(coords.xy - 0.5);
    var pos = coords.xy - timestep * textureLoad(velocity, vec2<i32>(coord), 0).xy;
    var exists :f32 = existe(coord);
    var startDye = textureSampleSmooth(dye, pos,u.resolution,coord);
    var startVelocity = textureSampleSmooth(velocity, pos,u.resolution,coord).xy;
    var out: Output;
    out.dye = ((color - startDye) * (1.0 - pow(dyeDissipation, timestep)) + startDye);
    out.velocity = startVelocity * pow(velocityDissipation, timestep);
   var ov=vec2<f32>(pos);
        var res=u.resolution;
        var inn = ov - 0.5;
    var tl = vec2<i32>(floor(inn));
    var br = vec2<i32>(floor(inn) + 1.0);
    var TL_S = vec2<i32>(tl.xy);
    var TR_S = vec2<i32>(vec2<i32>(br.x, tl.y));
    var BL_S = vec2<i32>(vec2<i32>(tl.x, br.y));
    var BR_S = vec2<i32>(br.xy);
        if (!((jjexiste(TL_S) == jjexiste(vec2<i32>(coord))) && (jjexiste(TR_S) == jjexiste(vec2<i32>(coord))) && (jjexiste(BL_S) == jjexiste(vec2<i32>(coord))) && (jjexiste(BR_S) == jjexiste(vec2<i32>(coord))))) {
      
        out.dye=textureSampleSmooth(dye, coords.xy,u.resolution,coord)*0.0;
        out.velocity=textureSampleSmooth(velocity, coords.xy,u.resolution,coord).xy*0.0;
    }
    // out.pressure= startPressure;
    // var exists = existe(coord);
    // out.velocity *= exists;
    // if (exists < 1.0) {
    //     out.dye = vec4<f32>(1.0);
    // }
    return out;
}


// struct Uniforms {
//     resolution: vec2<i32>,
//     timestep: f32,
// };
// @group(0) @binding(0) var<uniform> u : Uniforms;

// @group(1) @binding(0) var dye : texture_2d<f32>;
// @group(1) @binding(1) var velocity : texture_2d<f32>;

// let dyeDissipation = 1.0;
// let velocityDissipation = 1.0;//0.75;
// let color = vec4<f32>(vec3<f32>(0.0), 1.0);

// struct Output {
//     @location(0) dye: vec4<f32>,
//     @location(1) velocity: vec2<f32>,
// }

// fn textureLoadFalloof(a: texture_2d<f32>, coord: vec2<i32>, e:f32) -> vec4<f32> {
//     var exists = existe(((coord) % u.resolution.xy+u.resolution.xy)% u.resolution.xy);
//     var q = textureLoad(a, ((coord) % u.resolution.xy+u.resolution.xy)% u.resolution.xy, 0);
//     if(exists == e) {
//         return q;
//     }
//     return q * 0.0;
// }

// fn textureSampleSmooth(a: texture_2d<f32>, uvv: vec2<f32>, e:f32) -> vec4<f32> {
//     var uv = uvv;
//     // var exists = existe(vec2<i32>(uv));
//     var inn = uv - 0.5;
//     var tl = vec2<i32>(floor(inn));
//     var br = vec2<i32>(floor(inn) + 1.0);
//     return  (
//         (textureLoadFalloof(a, tl.xy,e) * (f32(br.x) - inn.x) + textureLoadFalloof(a, vec2<i32>(br.x, tl.y),e) * (inn.x - f32(tl.x))) * (f32(br.y) - inn.y) + // newline
//         (textureLoadFalloof(a, vec2<i32>(tl.x, br.y),e) * (f32(br.x) - inn.x) + textureLoadFalloof(a, br.xy,e) * (inn.x - f32(tl.x))) * (inn.y - f32(tl.y))
//     );
// }


fn sampleVelocity(coord: vec2<i32>,coordo: vec2<i32>) -> vec3<f32> {
   
    var exists = existe((coord % u.resolution.xy+u.resolution.xy)% u.resolution.xy);
    var q = textureLoad(velocity, (coord % u.resolution.xy+u.resolution.xy)% u.resolution.xy, 0).xy;
//     if(exists<1.0){
// q=-textureLoad(velocity, coordo, 0).xy;
//     }
    // exists = 1.0;
    return vec3<f32>(q*exists , exists);
}

// @fragment
// fn advect(@builtin(position) coords: vec4<f32>) -> Output {
//     let timestep = u.timestep/100.0;
//     var coord = vec2<i32>(coords.xy - 0.5);
//     var pos = coords.xy - timestep * textureLoad(velocity, vec2<i32>(coord), 0).xy;
//     var posD = coords.xy - timestep * textureLoad(velocity, vec2<i32>(coord), 0).xy;
//     var exists = existe(coord);
//     var startDye = textureSampleSmooth(dye, posD,exists);
//     var startVelocity = textureSampleSmooth(velocity, pos,exists).xy;

//     var mDye = textureLoad(dye, (coord),0);
//     var mVelocity = textureLoad(velocity, (coord),0).xy;
//     var out: Output;
//     out.dye = mDye;//((color - startDye) * (1.0 - pow(dyeDissipation, u.timestep)) + startDye);
//     out.velocity = mVelocity;//startVelocity * pow(velocityDissipation, u.timestep);

//     // var coord = vec2<i32>(coords.xy);
//     // left, right, bottom, and top pressure samples
    


//     // evaluate Jacobi iteration
//     // sum.x += C * dd;
//     // sum.y += dd;
//     // if (sum.y < 1.0 || existe(coord)<1.0) {
//     //     return 0.0;
//     // }
//     // if(existe(coord -  vec2<i32>(1, 0))<1.0){
//     //     return 
//     // }
//     var dir = vec2<i32>(1, 0);
//     var fl=vec2<f32>(0.0);
//     var flowO=0.0;
//     for(var o=0;o<4;o+=1){

//         var ff2 = (textureLoad(velocity, ((coord+dir) % u.resolution.xy+u.resolution.xy)% u.resolution.xy, 0).xy+textureLoad(velocity, ((coord) % u.resolution.xy+u.resolution.xy)% u.resolution.xy, 0).xy)/2.0;//sampleVelocity(coord + dir,coord);
//         var oDye = textureLoad(dye, (((coord+dir) % u.resolution.xy+u.resolution.xy)% u.resolution.xy) ,0).xyzw;
//         var oVelocity = textureLoad(velocity,( ((coord+dir) % u.resolution.xy+u.resolution.xy)% u.resolution.xy),0).xy;
        
//         if(existe(coord + dir)!=existe(coord )){
//             ff2=-textureLoad(velocity, ((coord) % u.resolution.xy+u.resolution.xy)% u.resolution.xy, 0).xy*0.0;
           
//         }
//         // if(existe(coord )<1.0 && o==0){
//         //     ff2=textureLoad(velocity, coord + dir, 0).xy*0.0;
//         //     ff=textureLoad(pressure, coord + dir, 0).x;
//         // }
//         var inflow=dot(ff2.xy * timestep,-vec2<f32>(dir));
//          inflow=max(-1.0,min(inflow,1.0));
//         // inflow+=(ff-textureLoad(pressure, ((coord) % u.resolution.xy+u.resolution.xy)% u.resolution.xy, 0).x);
//        flowO+=inflow;
//         out.dye+=max(inflow,0.0)*oDye-max(-inflow,0.0)*mDye;
//         out.velocity+=max(inflow,0.0)*oVelocity-max(-inflow,0.0)*mVelocity;
//         // fl.x+=ff;

//         dir=vec2<i32>(-dir.y, dir.x);
//     }
//      out.dye+=-max(flowO,0.0)*mDye;
//         out.velocity+=-max(flowO,0.0)*mVelocity;
//     // out.velocity.x=max(-10.0,min(out.velocity.x,10.0));
//     // out.velocity.y=max(-10.0,min(out.velocity.y,10.0));
//     // var exists = existe(coord);
//     // out.velocity *= exists;
//     // if (exists < 1.0) {
//     //     out.dye = vec4<f32>(1.0);
//     // }
//     return out;
// }
