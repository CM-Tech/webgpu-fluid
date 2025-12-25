import package::common::{EPSILON, radius};

@group(0) @binding(0) var dye : texture_2d<f32>;
@group(0) @binding(1) var velocity : texture_2d<f32>;

struct Touch {
    color: vec4<f32>,
    point: vec2<f32>,
    velocity: vec2<f32>,
    oldPoint: vec2<f32>,
};

@group(1) @binding(0) var<uniform> touch : Touch;

fn strength(dist: vec2<f32>) -> f32 {
    return exp(-dot(dist, dist) / radius);
}

fn distClosestPoint(c: vec2<f32>) -> f32 {
    let a = touch.point;
    let b = touch.oldPoint;
    if (dot(b - a, b - a) < EPSILON) {
        return strength(c - a);
    }
    let t = dot(c - a, b - a) / dot(b - a, b - a);
    return strength(c - (a + clamp(t, 0.0, 1.0) * (b - a)));
}

@fragment
fn splatDye(@builtin(position) coords: vec4<f32>) -> @location(0) vec4<f32> {
    let dyeBase = textureLoad(dye, vec2<i32>(coords.xy), 0).rgb;
    let p = distClosestPoint(coords.xy);
    let color = mix(dyeBase, touch.color.rgb, p);
    return vec4<f32>(color, 1.0);
}

@fragment
fn splatVelocity(@builtin(position) coords: vec4<f32>) -> @location(0) vec2<f32> {
    let velocityBase = textureLoad(velocity, vec2<i32>(coords.xy), 0).xy;
    let upsample = vec2<f32>(textureDimensions(dye)) / vec2<f32>(textureDimensions(velocity));
    let p = distClosestPoint(coords.xy * upsample);
    return velocityBase + p * touch.velocity;
}
