import package::common::{timestep, dyeDissipation, velocityDissipation, background};

@group(0) @binding(0) var texSampler : sampler;
@group(1) @binding(0) var dye : texture_2d<f32>;
@group(1) @binding(1) var velocity : texture_2d<f32>;
@group(2) @binding(0) var source : texture_2d<f32>;

fn sampleMAC(field: texture_2d<f32>, uv: vec2<f32>) -> vec2<f32> {
    let halfTexel = 0.5 / vec2<f32>(textureDimensions(field));
    return vec2<f32>(
        textureSampleLevel(field, texSampler, uv - vec2<f32>(halfTexel.x, 0.0), 0.0).x,
        textureSampleLevel(field, texSampler, uv - vec2<f32>(0.0, halfTexel.y), 0.0).y,
    );
}

// Euler backtrace, corrected by half the error of stepping there and back.
fn traceBack(uv: vec2<f32>) -> vec2<f32> {
    let scale = timestep / vec2<f32>(textureDimensions(dye));
    let there = uv - scale * sampleMAC(velocity, uv);
    let back = there + scale * sampleMAC(velocity, there);
    let start = uv - 0.5 * (back - uv);
    return start - scale * sampleMAC(velocity, start);
}

// Catmull-Rom weights of the four samples
fn cubicWeights(t: f32) -> vec4<f32> {
    let t2 = t * t;
    let t3 = t2 * t;
    return vec4<f32>(
        -0.5 * t3 + t2 - 0.5 * t,
        1.5 * t3 - 2.5 * t2 + 1.0,
        -1.5 * t3 + 2.0 * t2 + 0.5 * t,
        0.5 * t3 - 0.5 * t2,
    );
}

// Clamped to the four nearest texels: the cubic can overshoot next to a sharp edge.
fn sampleCubic(field: texture_2d<f32>, index: vec2<f32>) -> vec4<f32> {
    let i0 = vec2<i32>(floor(index));
    let wx = cubicWeights(fract(index.x));
    let wy = cubicWeights(fract(index.y));
    let last = vec2<i32>(textureDimensions(field)) - 1;
    var sum = vec4<f32>(0.0);
    var lo = vec4<f32>(1e30);
    var hi = vec4<f32>(-1e30);
    for (var j = 0; j < 4; j++) {
        for (var i = 0; i < 4; i++) {
            let s = textureLoad(field, clamp(i0 + vec2<i32>(i - 1, j - 1), vec2<i32>(0), last), 0);
            sum += wx[i] * wy[j] * s;
            if ((i == 1 || i == 2) && (j == 1 || j == 2)) {
                lo = min(lo, s);
                hi = max(hi, s);
            }
        }
    }
    return clamp(sum, lo, hi);
}

struct DyeOutput {
    @location(0) dye: vec4<f32>,
    @location(1) screen: vec4<f32>,
};

@fragment
fn advectDye(@builtin(position) coords: vec4<f32>) -> DyeOutput {
    let res = vec2<f32>(textureDimensions(dye));
    let moved = sampleCubic(dye, traceBack(coords.xy / res) * res - 0.5);
    let faded = mix(background, moved, dyeDissipation);
    return DyeOutput(faded, faded);
}

// In texel indices u sits at (i + 1, j + 0.5) and v at (i + 0.5, j + 1).
@fragment
fn advectVelocity(@builtin(position) coords: vec4<f32>) -> @location(0) vec2<f32> {
    let res = vec2<f32>(textureDimensions(velocity));
    let uFace = (coords.xy + vec2<f32>(0.5, 0.0)) / res;
    let vFace = (coords.xy + vec2<f32>(0.0, 0.5)) / res;
    let u = sampleCubic(source, traceBack(uFace) * res - vec2<f32>(1.0, 0.5)).x;
    let v = sampleCubic(source, traceBack(vFace) * res - vec2<f32>(0.5, 1.0)).y;
    return vec2<f32>(u, v) * velocityDissipation;
}
