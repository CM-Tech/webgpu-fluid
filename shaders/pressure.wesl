// Debug view (?pressure)

@group(0) @binding(0) var texSampler: sampler;
@group(1) @binding(0) var pressureTex: texture_2d<f32>;

const MAX_PRESSURE: f32 = 8000.0;

@fragment
fn displayPressure(@builtin(position) coords: vec4<f32>) -> @location(0) vec4<f32> {
    let uv = coords.xy / vec2<f32>(textureDimensions(pressureTex)) / 2.0;
    let p = textureSample(pressureTex, texSampler, uv).x;
    let fade = 1.0 - clamp(sqrt(abs(p) / MAX_PRESSURE), 0.0, 1.0);
    let color = select(vec3<f32>(fade, fade, 1.0), vec3<f32>(1.0, fade, fade), p >= 0.0);
    return vec4<f32>(color, 1.0);
}
