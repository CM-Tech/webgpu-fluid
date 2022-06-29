struct Uniforms {
    resolution: vec2<i32>,
    resolutionPressure: vec2<i32>,
    resolutionDisplay: vec2<i32>,
};
@group(0) @binding(0) var<uniform> u : Uniforms;

@group(1) @binding(0) var velocity : texture_2d<f32>;

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



fn jexiste(uv: vec2<f32>) -> f32 {
    return existe(vec2<i32>((floor(uv*vec2<f32>(u.resolutionPressure))+0.5)/vec2<f32>(u.resolutionPressure)*vec2<f32>(u.resolution)));
}

fn jjexiste(uvc: vec2<i32>) -> f32 {
    return jexiste((vec2<f32>(uvc)+0.5)/vec2<f32>(u.resolution));
}


@fragment
fn divergence(@builtin(position) coords: vec4<f32>) -> @location(0) f32 {
    var coord = vec2<f32>(coords.xy / vec2<f32>(u.resolutionPressure) * vec2<f32>(u.resolution));
    var cellVelocity = textureSampleSmooth(velocity, coord, u.resolution.xy).xy;
    var neighborOffset = vec2<i32>(1, 0);
    var value = 0.0;
    for (var o = 0; o < 4; o += 1) {
        var ov=vec2<f32>(coord + vec2<f32>(neighborOffset)*vec2<f32>(u.resolution.xy)/vec2<f32>(u.resolutionPressure.xy));
        var res=u.resolution;
        var inn = ov - 0.5;
    var tl = vec2<i32>(floor(inn));
    var br = vec2<i32>(floor(inn) + 1.0);
    var TL_S = vec2<i32>(tl.xy);
    var TR_S = vec2<i32>(vec2<i32>(br.x, tl.y));
    var BL_S = vec2<i32>(vec2<i32>(tl.x, br.y));
    var BR_S = vec2<i32>(br.xy);
        if ((jjexiste(TL_S) == jjexiste(vec2<i32>(coord))) && (jjexiste(TR_S) == jjexiste(vec2<i32>(coord))) && (jjexiste(BL_S) == jjexiste(vec2<i32>(coord))) && (jjexiste(BR_S) == jjexiste(vec2<i32>(coord)))) {
            var neighborVelocity = textureSampleSmooth(velocity, ov, u.resolution.xy).xy;
            value += dot((neighborVelocity + cellVelocity) / 2.0, -vec2<f32>(neighborOffset));
        } else {
            // value+=dot(-cellVelocity, -vec2<f32>(neighborOffset));
        }
        neighborOffset = vec2<i32>(-neighborOffset.y, neighborOffset.x);
    }
    return value;
}
