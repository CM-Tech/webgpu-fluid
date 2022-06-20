@group(0) @binding(0) var samplerFront : sampler;

struct Uniforms {
  texelSize : vec2<f32>,
}

@group(1) @binding(0) var<uniform> u : Uniforms;
@group(1) @binding(1) var pressure : texture_2d<f32>;
@group(1) @binding(2) var velocity : texture_2d<f32>;

@fragment
fn gradient(@builtin(position) coords: vec4<f32>) -> @location(0) vec2<f32> {
  var uv = coords.xy * u.texelSize;
  var pL = textureSample(pressure, samplerFront, uv - vec2<f32>(u.texelSize.x, 0.0)).x;
  var pR = textureSample(pressure, samplerFront, uv + vec2<f32>(u.texelSize.x, 0.0)).x;
  var pB = textureSample(pressure, samplerFront, uv - vec2<f32>(0.0, u.texelSize.y)).x;
  var pT = textureSample(pressure, samplerFront, uv + vec2<f32>(0.0, u.texelSize.y)).x;
  var v = textureSample(velocity, samplerFront, uv).xy;
  return v - vec2<f32>(pR - pL, pT - pB);
}
