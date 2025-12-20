import common::{u, pressureDissipation};

@group(1) @binding(0) var pressure : texture_2d<f32>;

@fragment
fn clear(@builtin(position) coords: vec4<f32>) -> @location(0) f32 {
    return pressureDissipation * textureLoad(pressure, vec2<i32>(coords.xy), 0).x;
}
