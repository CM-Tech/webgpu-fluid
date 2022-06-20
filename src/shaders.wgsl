@group(0) @binding(0) var samplerFront : sampler;

struct Uniforms {
    pixel: vec2<f32>,
};

@group(1) @binding(0) var velocity : texture_2d<f32>;
@group(1) @binding(1) var dye : texture_2d<f32>;
@group(1) @binding(2) var image : texture_2d<f32>;
@group(1) @binding(3) var<uniform> u : Uniforms;

fn display(@builtin(location) coords: vec4<f32>) -> @location(0) vec4<f32> {
    let uv = coords.xy * u.pixel;
    var velOffset = 0.1 * textureSample(velocity, samplerFront, uv).xy / u.pixel;
    var offset: f32;
    var size: f32;
    if (u.pixel.x > 1.0 / 800.0) {
        offset = -12.0;
        size = 64.0;
    } else {
        offset = -24.0;
        size = 80.0;
    }
    var pos = (vec2<f32>(offset) + vec2<f32>(coords.x, 1.0 - coords.y) / u.pixel) / size;
    var logo = textureSample(image, samplerFront, pos + velOffset);
    return vec4<f32>(textureSample(dye, samplerFront, uv).rgb * (1.0 - logo.a) + logo.rgb * logo.a, 1.0);
}
