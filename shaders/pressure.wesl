@group(0) @binding(0) var texSampler: sampler;
@group(1) @binding(0) var pressureTex: texture_2d<f32>;

// Maximum expected absolute pressure value used to normalize the log scale.
// Increase this value if the visible pressure range saturates.
// Assumed to be >= 1.0 per your note.
const MAX_PRESSURE: f32 = 100.0;

@fragment
fn displayPressure(@builtin(position) coords: vec4<f32>) -> @location(0) vec4<f32> {
    let res = vec2<f32>(textureDimensions(pressureTex));
    let uv = (coords.xy) / res / 2.0;
    let p = textureSample(pressureTex, texSampler, uv).x;
    // Visualize pressure: positive -> red shades, negative -> blue shades.
    // Use a log scale for magnitude, normalize by the known maximum pressure,
    // then clamp to [0,1] for stability.
    let mag = clamp(log(abs(p) + 1.0) / log(MAX_PRESSURE + 1.0), 0.0, 1.0);
    var color: vec3<f32>;
    if p >= 0.0 {
        // Strong positive pressure -> red; low -> white
        color = vec3<f32>(1.0, 1.0 - mag, 1.0 - mag);
    } else {
        // Strong negative pressure -> blue; low -> white
        color = vec3<f32>(1.0 - mag, 1.0 - mag, 1.0);
    }
    return vec4<f32>(color, 1.0);
}
