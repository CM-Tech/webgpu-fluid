uniform sampler2D pressure;
uniform float dissipation;

fn clear() -> @location(0) vec4<f32> {
    return dissipation * texture2D(pressure, coords);
}