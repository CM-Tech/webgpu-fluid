struct Uniforms {
    pixel: vec2<f32>,
};
@group(0) @binding(0) var samplerFront : sampler;
@group(0) @binding(1) var<uniform> u : Uniforms;

@group(1) @binding(0) var dye : texture_2d<f32>;

@fragment
fn display(@builtin(position) coords: vec4<f32>) -> @location(0) vec4<f32> {
    return textureSample(dye, samplerFront, coords.xy * u.pixel);
}
