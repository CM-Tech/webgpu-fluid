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

fn strength(dist: vec2<f32>) -> f32 {
    return exp(-dot(dist, dist) / radius);
}

fn distClosestPoint(c: vec2<f32>) -> f32 {
    var a = touch.point;
    var b = touch.oldPoint;
    if (dot(b - a, b - a) < 0.000001) {
        return strength(c - a);
    }
    var t = dot(c - a, b - a) / dot(b - a, b - a);
    t = clamp(t, 0.0, 1.0);
    return strength(c - (a + t * (b - a)));
}

@fragment
fn splatDye(@builtin(position) coords: vec4<f32>) -> @location(0) vec4<f32> {
    var dyeBase = textureLoad(dye, vec2<i32>(coords.xy), 0).rgb;
    var p = distClosestPoint(coords.xy);
    var color = mix(dyeBase, touch.color.rgb, p);
    return vec4<f32>(color, 1.0);
}

@fragment
fn splatVelocity(@builtin(position) coords: vec4<f32>) -> @location(0) vec2<f32> {
    var velocityBase = textureLoad(velocity, vec2<i32>(coords.xy), 0).xy;
    var upsample = vec2<f32>(u.dyeResolution) / vec2<f32>(u.simResolution);
    var p = distClosestPoint(coords.xy * upsample);
    return velocityBase + p * touch.velocity;
}
