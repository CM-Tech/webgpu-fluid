@binding(0) @group(0) var samplerFront : sampler;

struct Uniforms {
  color : vec4<f32>,
  texelSize : vec2<f32>,
  dissipation: f32,
};
@binding(0) @group(1) var<uniform> u : Uniforms;
@binding(1) @group(1) var velocity : texture_2d<f32>;
@binding(2) @group(1) var x : texture_2d<f32>;

let timestep = 20.0;//0.0166666666666666666666666;

@stage(fragment)
fn advect(@builtin(position) coords: vec4<f32>) -> @location(0) vec4<f32> {
  var uv = coords.xy * u.texelSize;
  var pos = uv.xy - timestep * u.texelSize * textureSample(velocity, samplerFront, uv.xy).xy;
  var start = textureSample(x, samplerFront, pos);
  return (u.color - start) * (1.0 - u.dissipation) + start;
}
