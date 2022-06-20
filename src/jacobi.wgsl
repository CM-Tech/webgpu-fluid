@group(0) @binding(0) var samplerFront : sampler;

struct Uniforms {
  texelSize : vec2<f32>,
}

@group(1) @binding(0) var<uniform> u : Uniforms;
@group(1) @binding(1) var divergence : texture_2d<f32>;

@group(2) @binding(0) var pressure : texture_2d<f32>;

@fragment
fn jacobi(@builtin(position) coords: vec4<f32>) -> @location(0) vec4<f32> {
  // left, right, bottom, and top pressure samples
  var L = textureSample(pressure,samplerFront, coords.xy - vec2<f32>(u.texelSize.x, 0.0)).x;
  var R = textureSample(pressure,samplerFront, coords.xy + vec2<f32>(u.texelSize.x, 0.0)).x;
  var B = textureSample(pressure,samplerFront, coords.xy - vec2<f32>(0.0, u.texelSize.y)).x;
  var T = textureSample(pressure,samplerFront, coords.xy + vec2<f32>(0.0, u.texelSize.y)).x;

  // divergence sample, from center
  var bC = textureSample(divergence,samplerFront, coords.xy).x;

  // evaluate Jacobi iteration
  return vec4<f32>(0.25 * (L + R + B + T - bC), 0, 0, 1);
}
