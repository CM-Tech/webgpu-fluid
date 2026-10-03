import package::common::{timestep, dyeDissipation, velocityDissipation, color};

@group(0) @binding(0) var texSampler : sampler;
@group(1) @binding(0) var dye : texture_2d<f32>;
// The advecting velocity, in dye pixels per second.
@group(1) @binding(1) var velocity : texture_2d<f32>;
// advectVelocity: the velocity field being advected (in the second half of an
// advection-reflection step this is the reflected field, not the advecting one).
// macCormackDye: the semi-Lagrangian dye prediction.
@group(2) @binding(0) var source : texture_2d<f32>;

struct Output {
    @location(0) value: vec4<f32>,
    @location(1) screen: vec4<f32>,
};

// Vector at a normalised position on a staggered grid: u samples are offset half a cell in
// +x and v samples half a cell in +y from the cell centres.
fn sampleMAC(field: texture_2d<f32>, uv: vec2<f32>) -> vec2<f32> {
    let halfTexel = 0.5 / vec2<f32>(textureDimensions(field));
    return vec2<f32>(
        textureSampleLevel(field, texSampler, uv - vec2<f32>(halfTexel.x, 0.0), 0.0).x,
        textureSampleLevel(field, texSampler, uv - vec2<f32>(0.0, halfTexel.y), 0.0).y,
    );
}

// Traces one timestep along the flow: backwards for direction 1, forwards for -1.
fn trace(uv: vec2<f32>, direction: f32) -> vec2<f32> {
    let scale = direction * timestep / vec2<f32>(textureDimensions(dye));

    // 1. Initial back-trace (semi-Lagrangian)
    let p_old = uv - scale * sampleMAC(velocity, uv);

    // 2. Forward-trace from p_old to estimate the round-trip error
    let p_new_estimate = p_old + scale * sampleMAC(velocity, p_old);

    // 3. Error compensation
    let p_corrected = uv - 0.5 * (p_new_estimate - uv);

    // 4. Final back-trace from corrected position
    return p_corrected - scale * sampleMAC(velocity, p_corrected);
}

// MacCormack (Selle et al. 2008), pass 1: plain semi-Lagrangian prediction.
@fragment
fn advectDyePredict(@builtin(position) coords: vec4<f32>) -> @location(0) vec4<f32> {
    let uv = coords.xy / vec2<f32>(textureDimensions(dye));
    return textureSampleLevel(dye, texSampler, trace(uv, 1.0), 0.0);
}

// MacCormack pass 2: advect the prediction forward again and correct by half the round-trip
// error, which cancels most of the interpolation blur. The result is clamped to the texels
// the prediction interpolated, so it can never overshoot.
@fragment
fn macCormackDye(@builtin(position) coords: vec4<f32>) -> Output {
    let res = vec2<f32>(textureDimensions(dye));
    let uv = coords.xy / res;
    let c = vec2<i32>(coords.xy);
    let roundTrip = textureSampleLevel(source, texSampler, trace(uv, -1.0), 0.0);
    let corrected = textureLoad(source, c, 0) + 0.5 * (textureLoad(dye, c, 0) - roundTrip);

    let p = trace(uv, 1.0) * res - 0.5;
    let i0 = vec2<i32>(floor(p));
    let maxI = vec2<i32>(res) - 1;
    let a = textureLoad(dye, clamp(i0, vec2<i32>(0), maxI), 0);
    let b = textureLoad(dye, clamp(i0 + vec2<i32>(1, 0), vec2<i32>(0), maxI), 0);
    let d = textureLoad(dye, clamp(i0 + vec2<i32>(0, 1), vec2<i32>(0), maxI), 0);
    let e = textureLoad(dye, clamp(i0 + vec2<i32>(1, 1), vec2<i32>(0), maxI), 0);
    let limited = clamp(corrected, min(min(a, b), min(d, e)), max(max(a, b), max(d, e)));

    let col = mix(color, limited, dyeDissipation);
    return Output(col, col);
}

@fragment
fn advectVelocity(@builtin(position) coords: vec4<f32>) -> @location(0) vec2<f32> {
    let res = vec2<f32>(textureDimensions(velocity));
    let halfTexel = 0.5 / res;
    // Trace each component from its own face.
    let uFace = (coords.xy + vec2<f32>(0.5, 0.0)) / res;
    let vFace = (coords.xy + vec2<f32>(0.0, 0.5)) / res;
    let u = textureSampleLevel(source, texSampler, trace(uFace, 1.0) - vec2<f32>(halfTexel.x, 0.0), 0.0).x;
    let v = textureSampleLevel(source, texSampler, trace(vFace, 1.0) - vec2<f32>(0.0, halfTexel.y), 0.0).y;
    return vec2<f32>(u, v) * velocityDissipation;
}
