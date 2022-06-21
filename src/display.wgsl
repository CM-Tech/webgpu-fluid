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

@fragment
fn display(@builtin(position) coords: vec4<f32>) -> @location(0) vec4<f32> {
    var ppD = textureLoad(dye, vec2<i32>(coords.xy * pow(0.5, f32(u.downsample))), 0).xyz;
    var exists = existe(vec2<i32>(coords.xy * pow(0.5, f32(u.downsample))));
    if (exists < 1.0) {
        return vec4<f32>(1.0, 1.0, 1.0, 1.0);
    }
    var ppV = textureLoad(velocity, vec2<i32>(coords.xy * pow(0.5, f32(u.downsample))), 0).xy;
    var pp = sampleP(vec2<i32>(coords.xy * pow(0.5, f32(u.downsample))), vec2<i32>(coords.xy * pow(0.5, f32(u.downsample))));
    var ppL = sampleP(vec2<i32>(coords.xy * pow(0.5, f32(u.downsample))) - vec2<i32>(1, 0), vec2<i32>(coords.xy * pow(0.5, f32(u.downsample))) + vec2<i32>(0, 0));
    var ppT = sampleP(vec2<i32>(coords.xy * pow(0.5, f32(u.downsample))) - vec2<i32>(0, 1), vec2<i32>(coords.xy * pow(0.5, f32(u.downsample))) + vec2<i32>(0, 0));
    var D3C = vec3<f32>(-vec2<f32>(0, 0), pp);
    var D3L = vec3<f32>(-vec2<f32>(1, 0), ppL);
    var D3T = vec3<f32>(-vec2<f32>(0, 1), ppT);
    var norm = normalize(cross(D3L - D3C, D3T - D3C));
    var bri = ((dot(norm, normalize(vec3<f32>(-1.0, -1.0, 1.0)))) / 2.0 * 1.5 + 0.75);
    return vec4<f32>((ppD + hsv2rgb(vec3<f32>(bri * atan2(ppV.y, ppV.x) / atan2(1.0, 0.0) / 4.0, 1.0, length(vec2<f32>(ppV.y, ppV.x) / 60.0))) * bri * 0.05), 1.0);
}
