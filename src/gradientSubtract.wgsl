@group(0) @binding(0) var samplerFront : sampler;

struct Uniforms {
  texelSize : vec2<f32>,
}

@group(1) @binding(0) var<uniform> u : Uniforms;
@group(1) @binding(1) var pressure : texture_2d<f32>;
@group(1) @binding(2) var velocity : texture_2d<f32>;

fn gradientSubtract(@builtin(position) coords: vec4<f32>) -> @location(0) vec4<f32> {
  var pL = textureSample(pressure, samplerFront, coords.xy - vec2<f32>(u.texelSize.x, 0.0)).x;
  var pR = textureSample(pressure, samplerFront, coords.xy + vec2<f32>(u.texelSize.x, 0.0)).x;
  var pB = textureSample(pressure, samplerFront, coords.xy - vec2<f32>(0.0, u.texelSize.y)).x;
  var pT = textureSample(pressure, samplerFront, coords.xy + vec2<f32>(0.0, u.texelSize.y)).x;
  var v = textureSample(velocity, samplerFront, coords.xy).xy;
  return vec4<f32>(v - vec2(pR - pL, pT - pB), 0.0, 1.0);
}
