
struct Uniforms {
    resolution: vec2<i32>,
    resolutionPressure: vec2<i32>,
    resolutionDisplay: vec2<i32>,
};
@group(0) @binding(0) var<uniform> u : Uniforms;

@group(1) @binding(0) var dye : texture_2d<f32>;
@group(1) @binding(1) var pressure : texture_2d<f32>;
@group(1) @binding(2) var velocity : texture_2d<f32>;

fn clamp01(v: f32) -> f32 {
    return clamp(v, 0.0, 1.0);
}

fn clamp01v3(v: vec3<f32>) -> vec3<f32> {
    return clamp(v, vec3<f32>(0.0), vec3<f32>(1.0));
}

fn hue2rgb(hue: f32) -> vec3<f32> {
    var huee = hue;
    huee = fract(hue);
    return vec3<f32>(
        clamp01(abs(hue * 6.0 - 3.0) - 1.0),
        clamp01(2. - abs(hue * 6.0 - 2.0)),
        clamp01(2. - abs(hue * 6.0 - 4.0))
    );
}

// HSV (hue, saturation, value) to RGB.
// Sources: https://gist.github.com/yiwenl/745bfea7f04c456e0101, https://gist.github.com/sugi-cho/6a01cae436acddd72bdf
fn hsv2rgb(c: vec3<f32>) -> vec3<f32> {
    var K = vec4<f32>(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    return c.z * mix(K.xxx, clamp01v3(abs(fract(c.x + K.xyz) * 6.0 - K.w) - K.x), c.y);
}



// @fragment
// fn display(@builtin(position) coords: vec4<f32>) -> @location(0) vec4<f32> {
//     var ppD = textureLoad(dye, vec2<i32>(coords.xy * pow(0.5, f32(u.downsample))), 0).xyz;
//     var exists = existe(vec2<i32>(coords.xy * pow(0.5, f32(u.downsample))));
//     if (exists < 1.0) {
//         return vec4<f32>(0.0, 0.0, 0.0, 1.0);
//     }
//     var ppV = textureLoad(velocity, vec2<i32>(coords.xy * pow(0.5, f32(u.downsample))), 0).xy;
//     var pp = sampleP(vec2<i32>(coords.xy * pow(0.5, f32(u.downsample))), vec2<i32>(coords.xy * pow(0.5, f32(u.downsample))));
//     var ppL = sampleP(vec2<i32>(coords.xy * pow(0.5, f32(u.downsample))) - vec2<i32>(1, 0), vec2<i32>(coords.xy * pow(0.5, f32(u.downsample))) + vec2<i32>(0, 0));
//     var ppT = sampleP(vec2<i32>(coords.xy * pow(0.5, f32(u.downsample))) - vec2<i32>(0, 1), vec2<i32>(coords.xy * pow(0.5, f32(u.downsample))) + vec2<i32>(0, 0));
//     var D3C = vec3<f32>(-vec2<f32>(0, 0), pp);
//     var D3L = vec3<f32>(-vec2<f32>(1, 0), ppL);
//     var D3T = vec3<f32>(-vec2<f32>(0, 1), ppT);
//     var norm = normalize(cross(D3L - D3C, D3T - D3C));
//     var bri = ((dot(norm, normalize(vec3<f32>(-1.0, -1.0, 1.0)))) / 2.0 * 1.5 + 0.75);
//     return vec4<f32>((ppD + hsv2rgb(vec3<f32>(bri * atan2(ppV.y, ppV.x) / atan2(1.0, 0.0) / 4.0, 1.0, length(vec2<f32>(ppV.y, ppV.x) / 60.0))) * bri * 0.05), 1.0);
// }



const BUMP = 1.0;

fn D(uv: vec2<f32>, d: vec2<f32>, mip: i32) -> f32 {
    // return length(textureSampleSmooth(velocity, vec2<f32>((uv + (d+0.0)) * vec2<f32>(u.resolution.xy)), mip).xy);
    // return sin(dot(vec2<f32>((uv + (d+0.0)) * vec2<f32>(u.resolution.xy)), textureSampleSmooth(velocity, vec2<f32>((uv + (d+0.0)) * vec2<f32>(u.resolution.xy)), mip).xy)*0.001);
    var  vv = textureSampleSmooth(velocity, vec2<f32>((uv + (d + 0.0)) * vec2<f32>(u.resolution.xy)), u.resolution).xy;
    var pp = textureSampleSmooth(pressure, vec2<f32>((uv + (d + 0.0)) * vec2<f32>(u.resolutionPressure)), u.resolutionPressure).x;
    var nvv = gradient(uv);
    return -1.0 * 0.1 * (length(nvv - vv) );//*length(textureSampleSmooth(velocity, vec2<f32>((uv + (d+0.0)) * vec2<f32>(u.resolution.xy)), mip).xy);
}

fn diff(uv: vec2<f32>, mip: i32) -> vec3<f32> {
    var texel = 1.0 / vec2<f32>(u.resolution.xy);
    var t = f32(pow(2.0, f32(mip))) * vec4<f32>(texel, -texel.y, 0);

    var d = D(uv, t.ww, mip); var d_n = D(uv, t.wy, mip); var d_e = D(uv, t.xw, mip);
    var d_s = D(uv, t.wz, mip); var d_w = D(uv, -t.xw, mip); var d_nw = D(uv, -t.xz, mip);
    var d_sw = D(uv, -t.xy, mip); var d_ne = D(uv, t.xy, mip); var d_se = D(uv, t.xz, mip);
    var ddd = vec3<f32>(1.0, 1.0, 1.0);
    return normalize(cross(vec3<f32>(t.xw * vec2<f32>(u.resolution.xy), d_e - d) * ddd, vec3<f32>(t.wz * vec2<f32>(u.resolution.xy), d_s - d) * ddd)).xyz;
    // vec2<f32>(
    //     0.5 * (d_e - d_w) + 0.25 * (d_ne - d_nw + d_se - d_sw),
    //     0.5 * (d_n - d_s) + 0.25 * (d_ne + d_nw - d_se - d_sw)
    // );
}

fn contrast(col: vec4<f32>, x: f32) -> vec4<f32> {
    return x * (col - 0.5) + 0.5;
}


// fn smoothClamp(x:f32,  a:f32, b:f32)-> f32
// {
//     var t = clamp(x, a, b);
//     if(t != x){
//         return t;
//     }
//     return b + (a - b)/(1. + exp((b - a)*(2.*x - a - b)/((x - a)*(b - x))));
// }

// fn softClamp(x:f32,  a:f32, b:f32)-> f32
// {
//  	var mid = (a + b)*0.5;
//     return mid + smoothClamp((x - mid)*0.5, a - mid, b - mid);
// }


// Only used for rendering, but useful helpers
fn softmax(a: f32, b: f32, k: f32) -> f32 {
    return log(exp(k * a) + exp(k * b)) / k;
}

fn softmin(a: f32, b: f32, k: f32) -> f32 {
    return -log(exp(-k * a) + exp(-k * b)) / k;
}

fn softmax4(a: vec4<f32>, b: vec4<f32>, k: f32) -> vec4<f32> {
    return log(exp(k * a) + exp(k * b)) / k;
}

fn softmin4(a: vec4<f32>, b: vec4<f32>, k: f32) -> vec4<f32> {
    return -log(exp(-k * a) + exp(-k * b)) / k;
}

fn softclamp(a: f32, b: f32, x: f32, k: f32) -> f32 {
    return (softmin(b, softmax(a, x, k), k) + softmax(a, softmin(b, x, k), k)) / 2.0;
}

fn softclamp4(a: vec4<f32>, b: vec4<f32>, x: vec4<f32>, k: f32) -> vec4<f32> {
    return (softmin4(b, softmax4(a, x, k), k) + softmax4(a, softmin4(b, x, k), k)) / 2.0;
}

fn softclamp42(a: f32, b: f32, x: vec4<f32>, k: f32) -> vec4<f32> {
    return (softmin4(vec4<f32>(b), softmax4(vec4<f32>(a), x, k), k) + softmax4(vec4<f32>(a), softmin4(vec4<f32>(b), x, k), k)) / 2.0;
}


// GGX from Noby's Goo shader https://www.shadertoy.com/view/lllBDM

// MIT License: https://opensource.org/licenses/MIT
fn G1V(dnv: f32, k: f32) -> f32 {
    return 1.0 / (dnv * (1.0 - k) + k);
}

fn ggx(n: vec3<f32>, v: vec3<f32>, l: vec3<f32>, rough: f32, f0: f32) -> f32 {
    var alpha = rough * rough;
    var h = normalize(v + l);
    var dnl = clamp(dot(n, l), 0.0, 1.0);
    var dnv = clamp(dot(n, v), 0.0, 1.0);
    var dnh = clamp(dot(n, h), 0.0, 1.0);
    var dlh = clamp(dot(l, h), 0.0, 1.0);
    var f:f32;
    var d:f32;
    var vis : f32;
    var asqr = alpha * alpha;
    const pi:f32 = 3.14159;
    var den = dnh * dnh * (asqr - 1.0) + 1.0;
    d = asqr / (pi * den * den);
    dlh = pow(1.0 - dlh, 5.0);
    f = f0 + (1.0 - f0) * dlh;
    var k = alpha / 1.0;
    vis = G1V(dnl, k) * G1V(dnv, k);
    var  spec = dnl * d * f * vis;
    return spec;
}
// End Noby's GGX


// Modified from Shane's Bumped Sinusoidal Warp shadertoy here:
// https://www.shadertoy.com/view/4l2XWK
struct LL {
    ld: vec3<f32>,
    avd: vec3<f32>,
};
const iTime=0.0;
fn light(uv: vec2<f32>, BUMP: f32, SRC_DIST: f32, norm: vec3<f32>, iTime: f32, avd: vec3<f32>) -> LL {
    var sp = vec3<f32>(uv - 0.5, 0);
    var light = vec3<f32>(cos(iTime / 2.0) * 0.5, sin(iTime / 2.0) * 0.5, -SRC_DIST);
    var ld = light - sp;
    var lDist = max(length(ld), 0.001);
    ld /= lDist;
    var l:LL;
    l.ld = ld;
    l.avd = reflect(normalize(norm), vec3<f32>(0, 1, 0));
    return l;
}
// End Shane's bumpmapping section


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
fn sampleP(coord: vec2<f32>, coordo: vec2<f32>, exists2: f32) -> f32 {
    var q = textureSampleSmooth(pressure, vec2<f32>(coord)/ vec2<f32>(u.resolution.xy)*vec2<f32>(u.resolutionPressure), u.resolutionPressure).x;
     var ov=vec2<f32>(coord);
        var res=u.resolution;
        var inn = ov - 0.5;
    var tl = vec2<i32>(floor(inn));
    var br = vec2<i32>(floor(inn) + 1.0);
    var TL_S = vec2<i32>(tl.xy);
    var TR_S = vec2<i32>(vec2<i32>(br.x, tl.y));
    var BL_S = vec2<i32>(vec2<i32>(tl.x, br.y));
    var BR_S = vec2<i32>(br.xy);
    //     if (!((jjexiste(TL_S) == jjexiste(vec2<i32>(coordo))) && (jjexiste(TR_S) == jjexiste(vec2<i32>(coordo))) && (jjexiste(BL_S) == jjexiste(vec2<i32>(coordo))) && (jjexiste(BR_S) == jjexiste(vec2<i32>(coordo))))) {
      
    //     q = textureSampleSmooth(pressure, vec2<f32>(coordo)/ vec2<f32>(u.resolution.xy)*vec2<f32>(u.resolutionPressure), u.resolutionPressure).x;
    // }
    return q;
}


fn jexiste(uv: vec2<f32>) -> f32 {
    return existe(vec2<i32>((floor(uv*vec2<f32>(u.resolutionPressure))+0.5)/vec2<f32>(u.resolutionPressure)*vec2<f32>(u.resolution)));
}

fn jjexiste(uvc: vec2<i32>) -> f32 {
    return jexiste((vec2<f32>(uvc)+0.5)/vec2<f32>(u.resolution));
}


fn gradient(coords: vec2<f32>) -> vec2<f32> {
    var uv = vec2<f32>(coords.xy);
    var e:f32 = existe(vec2<i32>(uv));
    var  ra = vec2<f32>(u.resolution.xy)/vec2<f32>(u.resolutionPressure.xy);
    var pL = sampleP(vec2<f32>(vec2<f32>(coords.xy)) - vec2<f32>(1, 0)*ra, vec2<f32>(vec2<f32>(uv)) + vec2<f32>(0, 0),e);
    var pR = sampleP(vec2<f32>(vec2<f32>(coords.xy)) + vec2<f32>(1, 0)*ra, vec2<f32>(vec2<f32>(uv)) - vec2<f32>(0, 0),e);
    var pB = sampleP(vec2<f32>(vec2<f32>(coords.xy)) + vec2<f32>(0, 1)*ra, vec2<f32>(vec2<f32>(uv)) - vec2<f32>(0, 0),e);
    var pT = sampleP(vec2<f32>(vec2<f32>(coords.xy)) - vec2<f32>(0, 1)*ra, vec2<f32>(vec2<f32>(uv)) + vec2<f32>(0, 0),e);
    var pC = sampleP(vec2<f32>(vec2<f32>(coords.xy)) - vec2<f32>(0, 0)*ra, vec2<f32>(vec2<f32>(uv)) + vec2<f32>(0, 0),e);
    var v = textureLoad(velocity, vec2<i32>(uv), 0).xy;
    var exists = 1.0;//existe(vec2<i32>(uv));
    return exists * (v - vec2<f32>(pR - pL, pB - pT));
}


@fragment
fn display(@builtin(position) fragCoord: vec4<f32>) -> @location(0) vec4<f32> {
    var uv = fragCoord.xy / vec2<f32>(u.resolutionDisplay.xy);
    var coord = vec2<i32>(uv.xy * vec2<f32>(u.resolution.xy));
    var ppD = textureSampleSmooth(dye, vec2<f32>(uv.xy * vec2<f32>(u.resolution.xy)), u.resolution.xy).xyz;
    var ppV = textureSampleSmooth(velocity, vec2<f32>(fragCoord.xy / vec2<f32>(u.resolutionDisplay.xy) * vec2<f32>(u.resolution.xy)), u.resolution.xy).xy;
    var exists:f32 = existe(vec2<i32>(uv.xy * vec2<f32>(u.resolution.xy)));
    // if (exists < 1.0) {
    //     return vec4<f32>(0.0, 0.0, 0.0, 1.0);
    // }
    var dxy = vec3<f32>(0);
    var occ = 0.0;
    var mip = 0;
    var d = D(uv, vec2<f32>(0.0), mip);
    
    // blur the gradient to reduce appearance of artifacts,
    // and do cheap occlusion with mipmaps
    const  STEPS = 1;
    const  ODIST = 0.0001;
    for (mip = 1; mip <= STEPS; mip += 1) {
        if (mip == 1) {
            dxy += (1.0 / pow(2.0, f32(mip))) * diff(uv, mip - 1);
        }
    }
    var mip2 = 1;
    var wi = 0.0;
    var vis = 0.0;
    var spv = 0.0;
    const RA = 3;
    
    // occ=D(uv,vec2<f32>(0.0), 0);//vis/wi;
    // dxy=vec2<f32>(-1.0,0.0);
    
    // I think this looks nicer than using smoothstep
    // occ = pow(max(0.0,softclamp(0.2,0.8,100.0*occ + 0.5,1.0)),0.5);
    var avd:vec3<f32>;
    var ldq: LL = light(uv, BUMP, 0.5, normalize(dxy), iTime, avd);
    var ld = ldq.ld;
    avd = ldq.avd;

    for (mip = -RA; mip <= RA; mip += 1) {
        for (mip2 = -RA; mip2 <= RA; mip2 += 1) {
            var jm = vec2<f32>(f32(mip), f32(mip2));
            var lnnn = length(jm);
            if (lnnn > 0.0) {
                var kk = pow(2.0, lnnn);
                var www = 1.0 / kk;
                wi += www;
                var ang = atan2(max(D(uv, jm / vec2<f32>(u.resolution.xy), 0) - D(uv, vec2<f32>(0.0), 0), 0.0), lnnn);
                var val = pow(1.0 - ang / atan2(1.0, 0.0), 0.25);// not sure what power should be

                vis += www * val;
                var lang = atan2(max(ld.z, 0.0), length(ld.xy));
                var poang = max(lang, ang);

                val = max(0.0, -cos(lang - poang) * dot(normalize(ld.xy), normalize(vec3<f32>(jm, 1.0).xy)));
                spv += www * pow(val, 1.0);
        // occ += max(0.0,min(1.0,0.5+0.0001*(D(uv, vec2<f32>(0.0), 0) - D(uv,jm/vec2<f32>(u.resolution.xy), 0))/lnnn))/kk/2.0;
            }// occ += 1.0+min((D(uv, vec2<f32>(0.0), 0) - D(uv,vec2<f32>(0.0,-f32(mip)), 0))/kk/4.0,0.0);
        // occ += min((D(uv, vec2<f32>(0.0), 0) - D(uv,vec2<f32>(0.0,f32(mip)).yx, 0))/kk/4.0,0.0);
        // occ += min((D(uv, vec2<f32>(0.0), 0) - D(uv,vec2<f32>(0.0,-f32(mip)).yx, 0))/kk/4.0,0.0);
    	//softclamp(0.0 - ODIST, ODIST, d - D(uv,vec2<f32>(0.0), mip), 1.0) / (pow(1.5, f32(mip)));
        }
    }
    // dxy /= f32(STEPS);
    occ = 0.1 + occ / 3.0;// - 1.0/(8.0-occ*8.0);
    occ = vis / wi;
    spv = spv / wi;
   // spv=0.0;

    var spec = ggx(avd, vec3<f32>(0, 1, 0), ld, 0.2, 0.2) * pow(0.1 / 0.2, 2.0);
    const LOG_SPEC = 10.0;
    spec = (log(LOG_SPEC + 1.0) / LOG_SPEC) * log(1.0 + LOG_SPEC * spec);

    var diffuse = vec4<f32>(ppD, 1.0);// softclamp42(0.0,1.0,6.0*vec4(texture(iChannel0,uv).xy,0,0)+0.5,2.0);    
    diffuse += vec4<f32>(hsv2rgb(vec3<f32>(atan2(ppV.y, ppV.x) / atan2(1.0, 0.0) / 4.0, 1.0, 0.5 * min(1.0, length(vec2<f32>(ppV.y, ppV.x)) / 60.0))), 0.0) * 0.0;
    if (exists < 1.0) {
        // return vec4<f32>(vec3<f32>(0.0),1.0);
        // diffuse=vec4<f32>(vec3<f32>(0.25),1.0);
    } else {
        // diffuse=vec4<f32>(vec3<f32>(0.25),1.0);
    }
    // diffuse=vec4<f32>(vec3<f32>(-d/100.0),1.0);

    var fragColor = vec4<f32>(diffuse);//(diffuse*0.2/2.0 + 16.0*mix(vec4<f32>(spec),1.5*diffuse*spec,0.8))*10.0;
    var vv = textureSampleSmooth(velocity, vec2<f32>((uv + (d + 0.0)) * vec2<f32>(u.resolution.xy)), u.resolution).xy;
    var nvv = gradient(uv);
    var pp = textureSampleSmooth(pressure, vec2<f32>((uv + (d + 0.0)) * vec2<f32>(u.resolutionPressure.xy)), u.resolutionPressure).x;
    fragColor = (diffuse) * (spv * 0.0 + occ) + 100.0 * spec;//vec4<f32>((  nvv - vv).x*0.00000001,0.0*length(vv)*0.000000000001,0.0,0.0);//vec4<f32>(dxy/2.0+0.5,1.0);//occ * (diffuse*0.0+1.0) + spec*100.0;//vec4<f32>(ppD.xyz*0.0+1.0,1.0);//(softclamp42(0.0,1.0,contrast(fragColor,4.5),3.0));


    // fragColor = diffuse*(0.2+spec*10.0);

    // var dir = vec2<i32>(1, 0);
    // var fl=vec2<f32>(0.0);
    // for(var o=0;o<4;o+=1){

        
    //     var ff2 = textureLoad(velocity, coord+dir, 0).xy;//sampleVelocity(coord + dir,coord);
    //     if(existe(coord + dir)<1.0){
    //         ff2=-textureLoad(velocity, coord, 0).xy;
    //     }
      
    //     var inflow=dot(ff2.xy,-vec2<f32>(dir));
       
    //     fl.x+=inflow/2.0;
    //     dir=vec2<i32>(-dir.y, dir.x);
    // }
    // fragColor=vec4<f32>(abs(d/10.0));
    return fragColor;
    //fragColor = vec4(occ);
    //fragColor = vec4(spec);
    //fragColor = diffuse;
    //fragColor = vec4(diffuse+(occ-0.5));
}

// @fragment
// fn display(@builtin(position) coords: vec4<f32>) -> @location(0) vec4<f32> {
//     var ppD = textureLoad(dye, vec2<i32>(coords.xy * pow(0.5, f32(u.downsample))), 0).xyz;
//     var exists = existe(vec2<i32>(coords.xy * pow(0.5, f32(u.downsample))));
//     if (exists < 1.0) {
//         return vec4<f32>(0.0, 0.0, 0.0, 1.0);
//     }
//     var ppV = textureLoad(velocity, vec2<i32>(coords.xy * pow(0.5, f32(u.downsample))), 0).xy;
//     var pp = sampleP(vec2<i32>(coords.xy * pow(0.5, f32(u.downsample))), vec2<i32>(coords.xy * pow(0.5, f32(u.downsample))));
//     var ppL = sampleP(vec2<i32>(coords.xy * pow(0.5, f32(u.downsample))) - vec2<i32>(1, 0), vec2<i32>(coords.xy * pow(0.5, f32(u.downsample))) + vec2<i32>(0, 0));
//     var ppT = sampleP(vec2<i32>(coords.xy * pow(0.5, f32(u.downsample))) - vec2<i32>(0, 1), vec2<i32>(coords.xy * pow(0.5, f32(u.downsample))) + vec2<i32>(0, 0));
//     var D3C = vec3<f32>(-vec2<f32>(0, 0), pp);
//     var D3L = vec3<f32>(-vec2<f32>(1, 0), ppL);
//     var D3T = vec3<f32>(-vec2<f32>(0, 1), ppT);
//     var norm = normalize(cross(D3L - D3C, D3T - D3C));
//     var bri = ((dot(norm, normalize(vec3<f32>(-1.0, -1.0, 1.0)))) / 2.0 * 1.5 + 0.75);
//     return vec4<f32>((ppD + hsv2rgb(vec3<f32>(bri * atan2(ppV.y, ppV.x) / atan2(1.0, 0.0) / 4.0, 1.0, length(vec2<f32>(ppV.y, ppV.x) / 60.0))) * bri * 0.05), 1.0);
// }
