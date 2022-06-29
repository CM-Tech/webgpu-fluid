struct Uniforms {
    resolution: vec2<i32>,
    resolutionPressure: vec2<i32>,
    resolutionDisplay: vec2<i32>,
};
@group(0) @binding(0) var<uniform> u : Uniforms;

@group(1) @binding(0) var divergence : texture_2d<f32>;
// @group(1) @binding(1) var velocity : texture_2d<f32>;

@group(2) @binding(0) var pressure : texture_2d<f32>;




// fn sampleP(coord: vec2<i32>, coordo: vec2<i32>,exists2:f32) -> f32 {
//     var exists = existe(((coord) % u.resolution.xy+u.resolution.xy)% u.resolution.xy);
//     var q = textureLoad(pressure, ((coord) % u.resolution.xy+u.resolution.xy)% u.resolution.xy, 0).x;
//     if (exists !=exists2) {
//         q = textureLoad(pressure, ((coordo) % u.resolution.xy+u.resolution.xy)% u.resolution.xy , 0).x;
//     }
//     return q;
// }

// fn gradient(uv: vec2<i32>) ->  vec2<f32> {
//     var e=existe((vec2<i32>(uv)% u.resolution.xy+u.resolution.xy)% u.resolution.xy);
//     var pL = sampleP(uv - vec2<i32>(1, 0), uv + vec2<i32>(0, 0),e);
//     var pR = sampleP(uv + vec2<i32>(1, 0), uv - vec2<i32>(0, 0),e);
//     var pB = sampleP(uv + vec2<i32>(0, 1), uv - vec2<i32>(0, 0),e);
//     var pT = sampleP(uv - vec2<i32>(0, 1), uv + vec2<i32>(0, 0),e);
//     var pC = sampleP(uv - vec2<i32>(0, 0), uv + vec2<i32>(0, 0),e);
//     var v = textureLoad(velocity, (uv% u.resolution.xy+u.resolution.xy)% u.resolution.xy, 0).xy;
//     var exists = 1.0;//existe(vec2<i32>(uv));
//     return exists * (v - vec2<f32>(pR - pL, pB - pT));
// }
fn figgle(vv: vec2<i32>, resg: vec2<i32>) -> vec2<i32> {
    return (vv % vec2<i32>(resg.xy) + vec2<i32>(resg.xy)) % vec2<i32>(resg.xy);
}
fn textureSampleSmooth(ac: texture_2d<f32>, uv: vec2<f32>, res: vec2<i32>) -> vec4<f32> {
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
@fragment
fn jacobi(@builtin(position) coords: vec4<f32>) -> @location(0) f32 {
    var coord = vec2<i32>(coords.xy);
    var coord2 = vec2<i32>(coords.xy/vec2<f32>(u.resolutionPressure.xy)*vec2<f32>(u.resolution.xy));
    var UvV = coords.xy/vec2<f32>(u.resolutionPressure.xy);
    // left, right, bottom, and top pressure samples
    

    var C = textureSampleSmooth(pressure, coords.xy,  u.resolutionPressure).x;
    var tot=0.0;
    var vf=textureSampleSmooth(pressure, coords.xy, u.resolutionPressure).x;
    var e=existe(coord2);
    
    // var dir = vec2<i32>(1, 0);
    // for(var o=0;o<4;o+=1){
    //     if(existe(coord + dir)==e){
    //         tot+=textureLoad(pressure, ((coord + (dir )) % u.resolution.xy+u.resolution.xy)% u.resolution.xy,0 ).x - vf;
    //     }
    //     dir=vec2<i32>(-dir.y, dir.x);
    // }
    var dir = vec2<i32>(1, 0);
    
    for (var o = 0; o < 4; o += 1) {
        var coordi=UvV*vec2<f32>(u.resolution.xy);
        var ov=vec2<f32>(coordi + vec2<f32>(dir)*vec2<f32>(u.resolution.xy)/vec2<f32>(u.resolutionPressure.xy));
        var res=u.resolution;
        var inn = ov - 0.5;
    var tl = vec2<i32>(floor(inn));
    var br = vec2<i32>(floor(inn) + 1.0);
    var TL_S = vec2<i32>(tl.xy);
    var TR_S = vec2<i32>(vec2<i32>(br.x, tl.y));
    var BL_S = vec2<i32>(vec2<i32>(tl.x, br.y));
    var BR_S = vec2<i32>(br.xy);
        if ((existe(TL_S) == existe(vec2<i32>(coordi))) && (existe(TR_S) == existe(vec2<i32>(coordi))) && (existe(BL_S) == existe(vec2<i32>(coordi))) && (existe(BR_S) == existe(vec2<i32>(coordi)))) {
            tot+=textureSampleSmooth(pressure, ov/vec2<f32>(u.resolution.xy)*vec2<f32>(u.resolutionPressure.xy) ,u.resolutionPressure ).x - vf;
   }
        dir=vec2<i32>(-dir.y, dir.x);
    }
    
    return (C + tot * 0.25+textureLoad(divergence, coord, 0).x*0.25)*0.9999;
}
