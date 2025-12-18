struct Uniforms {
    simResolution: vec2<i32>,
    dyeResolution: vec2<i32>,
};
@group(0) @binding(0) var<uniform> u : Uniforms;

@group(1) @binding(0) var dye : texture_2d<f32>;
@group(1) @binding(1) var velocity : texture_2d<f32>;

struct Touch {
    color: vec4<f32>,
    point: vec2<f32>,
    velocity: vec2<f32>,
    oldPoint: vec2<f32>,
};

@group(2) @binding(0) var<uniform> touch : Touch;

const radius = 400.0;

fn closestPoint(start: vec2<f32>, end: vec2<f32>, c: vec2<f32>) -> vec2<f32> {
    var a = start;
    var b = end;
    if (dot(b - a, b - a) < 0.000001) {
        return a;
    }
    var t = dot(c - a, b - a) / dot(b - a, b - a);
    t = clamp(t, 0.0, 1.0);
    return a + t * (b - a);
}

@fragment
fn splat_dye(@builtin(position) coords: vec4<f32>) -> @location(0) vec4<f32> {
    var coord = vec2<i32>(coords.xy);
    var p = coords.xy - closestPoint(touch.point, touch.oldPoint, coords.xy);
    var strength = exp(-dot(p, p) / radius);
    var dyeBase = textureLoad(dye, coord, 0).rgb;
    return vec4<f32>(dyeBase * (1.0 - strength) + strength * touch.color.rgb, 1.0);
}

@fragment
fn splat_velocity(@builtin(position) coords: vec4<f32>) -> @location(0) vec2<f32> {
    var coord = vec2<i32>(coords.xy);
    var upsample = vec2<f32>(u.dyeResolution) / vec2<f32>(u.simResolution);
    var coordF = vec2<f32>(coord) * upsample;
    var p = coordF - closestPoint(touch.point, touch.oldPoint, coordF);
    var strength = exp(-dot(p, p) / radius);
    var velocityBase = textureLoad(velocity, coord, 0).xy;
    return velocityBase + strength * touch.velocity;
}
