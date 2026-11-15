@group(0) @binding(0) var dye : texture_2d<f32>;
@group(0) @binding(1) var velocity : texture_2d<f32>;

// Layout shared with src/touches.ts.
struct Touch {
    color: vec4<f32>,
    point: vec2<f32>,
    velocity: vec2<f32>,
    oldPoint: vec2<f32>,
};

@group(1) @binding(0) var<uniform> touch : Touch;

const RADIUS = 50.0;
const EPSILON = 2.4414e-4; // 2^-12

fn falloff(offset: vec2<f32>) -> f32 {
    let x = dot(offset, offset) / (RADIUS * RADIUS);
    return exp(-pow(x, 3.0));
}

// Falloff from the nearest point of the segment the touch moved along this frame.
fn strength(position: vec2<f32>) -> f32 {
    let a = touch.point;
    let ab = touch.oldPoint - a;
    let t = clamp(dot(position - a, ab) / max(dot(ab, ab), EPSILON), 0.0, 1.0);
    return falloff(position - (a + t * ab));
}

@fragment
fn splatDye(@builtin(position) coords: vec4<f32>) -> @location(0) vec4<f32> {
    let base = textureLoad(dye, vec2<i32>(coords.xy), 0).rgb;
    return vec4<f32>(mix(base, touch.color.rgb, strength(coords.xy)), 1.0);
}

@fragment
fn splatVelocity(@builtin(position) coords: vec4<f32>) -> @location(0) vec2<f32> {
    let base = textureLoad(velocity, vec2<i32>(coords.xy), 0).xy;
    let dyePerCell = vec2<f32>(textureDimensions(dye)) / vec2<f32>(textureDimensions(velocity));
    // Staggered grid: u sits on the +x face of the cell, v on the +y face.
    let su = strength((coords.xy + vec2<f32>(0.5, 0.0)) * dyePerCell);
    let sv = strength((coords.xy + vec2<f32>(0.0, 0.5)) * dyePerCell);
    return base + vec2<f32>(su, sv) * touch.velocity;
}
