@group(0) @binding(0) var samplerFront : sampler;

struct Uniforms {
    pixel: vec2<f32>,
};

@group(1) @binding(0) var textureFront : texture_2d<f32>;
@group(1) @binding(1) var<uniform> u : Uniforms;

@fragment
fn display(@builtin(position) coord_in: vec4<f32>) -> @location(0) vec4<f32> {
    var uv = coord_in.xy * u.pixel;
    return textureSample(textureFront, samplerFront, uv);
}
