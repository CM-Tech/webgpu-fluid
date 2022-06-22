struct Uniforms {
    resolution: vec2<i32>,
    downsample: i32,
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


fn sampleP(coord: vec2<i32>, coordo: vec2<i32>) -> f32 {
    var exists = existe(coord);
    var q = textureLoad(pressure, coord, 0).x;
    if (exists < 1.0) {
        q = textureLoad(pressure, coordo, 0).x;
    }
    return q;
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



let BUMP = 3200.0;


fn textureSampleSmooth(a: texture_2d<f32>, uv: vec2<f32>,mip:i32) -> vec4<f32> {
    var inn = uv;
    var tl = vec2<i32>(floor(inn));
    var br = vec2<i32>(floor(inn) + 1.0);
    return (textureLoad(a, tl.xy, mip) * (f32(br.x) - inn.x) + textureLoad(a, vec2<i32>(br.x, tl.y), mip) * (inn.x - f32(tl.x))) * (f32(br.y) - inn.y) + 
      (textureLoad(a,vec2<i32>(tl.x, br.y), mip) * (f32(br.x) - inn.x) + textureLoad(a, br.xy, mip) * (inn.x - f32(tl.x))) * (inn.y - f32(tl.y)
    );
}
fn D(uv:vec2<f32>,d:vec2<f32>,mip:i32) -> f32 {
    return textureSampleSmooth(pressure, vec2<f32>((uv + (d+0.0)) * vec2<f32>(u.resolution.xy)), mip).x*10.0;
}

fn diff( uv:vec2<f32>,  mip: i32) -> vec2<f32> {
    var texel = 1.0/vec2<f32>(u.resolution.xy);
    var t = f32(pow(2.0,f32(mip)))*vec4<f32>(texel, -texel.y, 0);

    var d =    D(uv, t.ww,mip); var d_n =  D(uv, t.wy,mip); var d_e =  D(uv, t.xw,mip);
    var d_s =  D(uv, t.wz,mip); var d_w =  D(uv,-t.xw,mip); var d_nw = D(uv,-t.xz,mip);
    var d_sw = D(uv,-t.xy,mip); var d_ne = D(uv, t.xy,mip); var d_se = D( uv,t.xz,mip);
    
    return vec2<f32>(
        0.5 * (d_e - d_w) + 0.25 * (d_ne - d_nw + d_se - d_sw),
        0.5 * (d_n - d_s) + 0.25 * (d_ne + d_nw - d_se - d_sw)
    );
}

fn contrast(col:vec4<f32>,  x: f32) -> vec4<f32> {
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
fn softmax(a:f32,  b:f32, k:f32)-> f32 {
	return log(exp(k*a)+exp(k*b))/k;    
}

fn softmin(a:f32,  b:f32, k:f32)-> f32  {
	return -log(exp(-k*a)+exp(-k*b))/k;    
}

fn softmax4(a:vec4<f32>,  b:vec4<f32>, k:f32)-> vec4<f32>  {
	return log(exp(k*a)+exp(k*b))/k;    
}

fn softmin4(a:vec4<f32>,  b:vec4<f32>, k:f32)-> vec4<f32> {
	return -log(exp(-k*a)+exp(-k*b))/k;    
}

fn softclamp(a:f32,  b:f32, x:f32, k:f32) ->f32 {
	return (softmin(b,softmax(a,x,k),k) + softmax(a,softmin(b,x,k),k)) / 2.0;    
}

fn softclamp4(a:vec4<f32>,  b:vec4<f32>, x:vec4<f32>, k:f32) ->vec4<f32> {
	return (softmin4(b,softmax4(a,x,k),k) + softmax4(a,softmin4(b,x,k),k)) / 2.0;    
}

fn softclamp42(a: f32, b: f32,x:vec4<f32>, k:f32) ->vec4<f32>{
	return (softmin4(vec4(b),softmax4(vec4(a),x,k),k) + softmax4(vec4(a),softmin4(vec4(b),x,k),k)) / 2.0;    
}


// GGX from Noby's Goo shader https://www.shadertoy.com/view/lllBDM

// MIT License: https://opensource.org/licenses/MIT
fn  G1V(dnv:f32, k:f32) -> f32{
    return 1.0/(dnv*(1.0-k)+k);
}

fn ggx(n: vec3<f32>, v: vec3<f32>, l: vec3<f32>, rough:f32, f0:f32) -> f32{
    var alpha = rough*rough;
    var h = normalize(v+l);
    var dnl = clamp(dot(n,l), 0.0, 1.0);
    var dnv = clamp(dot(n,v), 0.0, 1.0);
    var dnh = clamp(dot(n,h), 0.0, 1.0);
    var dlh = clamp(dot(l,h), 0.0, 1.0);
    var f:f32;
    var d:f32;
    var vis : f32;
    var asqr = alpha*alpha;
    let pi:f32 = 3.14159;
    var den = dnh*dnh*(asqr - 1.0)+1.0;
    d = asqr/(pi * den * den);
    dlh = pow(1.0 - dlh, 5.0);
    f = f0 + (1.0 - f0)*dlh;
    var k = alpha/1.0;
    vis = G1V(dnl, k)*G1V(dnv, k);
    var  spec = dnl * d * f * vis;
    return spec;
}
// End Noby's GGX


// Modified from Shane's Bumped Sinusoidal Warp shadertoy here:
// https://www.shadertoy.com/view/4l2XWK
struct LL {
    ld: vec3<f32>,
    avd:vec3<f32>,
};
let iTime=0.0;
fn light(uv:vec2<f32>, BUMP:f32, SRC_DIST:f32, dxy:vec2<f32>, iTime:f32,  avd:vec3<f32>) -> LL  {
    var sp = vec3<f32>(uv - 0.5, 0);
    var light = vec3<f32>(cos(iTime/2.0)*0.5, sin(iTime/2.0)*0.5, -SRC_DIST);
    var ld = light - sp;
    var lDist = max(length(ld), 0.001);
    ld /= lDist;
    var l:LL;
    l.ld=ld;
    l.avd = reflect(normalize(vec3<f32>(BUMP*dxy, -1.0)), vec3<f32>(0,1,0));
    return l;
}
// End Shane's bumpmapping section


@fragment
fn display(@builtin(position) fragCoord: vec4<f32>) -> @location(0) vec4<f32> {
    var uv = fragCoord.xy / vec2<f32>(u.resolution.xy) * pow(0.5, f32(u.downsample));
    var coord = vec2<i32>(uv.xy * vec2<f32>(u.resolution.xy));
 var ppD = textureSampleSmooth(dye, vec2<f32>(uv.xy * vec2<f32>(u.resolution.xy)), 0).xyz;
    var ppV = textureSampleSmooth(velocity, vec2<f32>(fragCoord.xy * pow(0.5, f32(u.downsample))), 0).xy;
    var exists = existe(vec2<i32>(uv.xy * vec2<f32>(u.resolution.xy)));
    // if (exists < 1.0) {
    //     return vec4<f32>(0.0, 0.0, 0.0, 1.0);
    // }
    var dxy = vec2<f32>(0);
    var occ=0.0;
    var mip = 0;
    var d   = D(uv, vec2<f32>(0.0), mip);
    
    // blur the gradient to reduce appearance of artifacts,
    // and do cheap occlusion with mipmaps
    let  STEPS= 10;
    let  ODIST= 2.0;
    for(mip = 1; mip <= STEPS; mip += 1) {	 
        if(mip==1){
        dxy += (1.0/pow(2.0,f32(mip))) * diff(uv, mip - 1);
        }	
    	occ += softclamp(0.0 - ODIST, ODIST, d - D(uv,vec2<f32>(0.0), mip), 1.0) / (pow(1.5, f32(mip)));
    }
    // dxy /= f32(STEPS);
    
    // I think this looks nicer than using smoothstep
    occ = pow(max(0.0,softclamp(0.2,0.8,100.0*occ + 0.5,1.0)),0.5);
    var avd:vec3<f32>;
    var ldq: LL = light(uv, BUMP, 0.5, dxy, iTime, avd);
    var ld=ldq.ld;
    avd=ldq.avd;
    
    var spec = ggx(avd, vec3(0,1,0), ld, 0.1, 0.1);
    let LOG_SPEC =1000.0;
    spec = (log(LOG_SPEC+1.0)/LOG_SPEC)*log(1.0 + LOG_SPEC * spec);    
    
    var diffuse =vec4<f32>(ppD,1.0);// softclamp42(0.0,1.0,6.0*vec4(texture(iChannel0,uv).xy,0,0)+0.5,2.0);    
    diffuse+=vec4<f32>(hsv2rgb(vec3<f32>( atan2(ppV.y, ppV.x) / atan2(1.0, 0.0) / 4.0, 1.0, 0.5*min(1.0,length(vec2<f32>(ppV.y, ppV.x) )/ 60.0))),0.0)*0.3;
    // diffuse=vec4<f32>(vec3<f32>(-d/100.0),1.0);
    
    var fragColor = (diffuse + 16.0*mix(vec4<f32>(spec),1.5*diffuse*spec,0.3));
    fragColor = mix(1.0,occ,0.7) * (softclamp42(0.0,1.0,contrast(fragColor,4.5),3.0));

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
