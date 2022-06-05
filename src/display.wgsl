@binding(0) @group(0) var samplerFront : sampler;

struct Uniforms {
  pixel : vec2<f32>,
};

@binding(0) @group(1) var textureFront : texture_2d<f32>;
@binding(1) @group(1) var<uniform> u : Uniforms;

@stage(fragment)
fn display(@builtin(position) coord_in: vec4<f32>) -> @location(0) vec4<f32> {
  var uv = coord_in.xy * u.pixel;
  return textureSample(textureFront, samplerFront, uv);
}
