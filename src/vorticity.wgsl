@binding(0) @group(0) var samplerFront : sampler;

struct Uniforms {
  texelSize : vec2<f32>,
  timestep: f32, // 0.0166666 usually
  curl: f32
}

@binding(0) @group(1) var<uniform> u : Uniforms;
@binding(1) @group(1) var vorticity : texture_2d<f32>;
@binding(1) @group(2) var velocity : texture_2d<f32>;

let EPSILON = 2.4414e-4; // 2^-12


fn vortForce(@builtin(position) coords: vec4<f32>) -> vec4<f32> {
  var L = textureSample(vorticity, samplerFront, coords.xy - vec2<f32>(u.texelSize.x, 0.0)).y;
  var R = textureSample(vorticity, samplerFront, coords.xy + vec2<f32>(u.texelSize.x, 0.0)).y;
  var B = textureSample(vorticity, samplerFront, coords.xy - vec2<f32>(0.0, u.texelSize.y)).x;
  var T = textureSample(vorticity, samplerFront, coords.xy + vec2<f32>(0.0, u.texelSize.y)).x;

  var vC = textureSample(vorticity, samplerFront, coords.xy).r;

  var force = 0.5 * vec2<f32>(abs(T) - abs(B), abs(L) - abs(R));
  force *= u.curl * vC / max( length(force), EPSILON);

  var vel = textureSample(velocity,samplerFront, coords.xy).xy;
  return vec4(vel + u.timestep * force, 0.0, 1.0);
}

fn vorticity(@builtin(position) coords: vec4<f32>) -> @location(0) vec4<f32>  {
  var L = textureSample(velocity,samplerFront, coords.xy - vec2<f32>(u.texelSize.x, 0.0)).y;
  var R = textureSample(velocity,samplerFront, coords.xy + vec2<f32>(u.texelSize.x, 0.0)).y;
  var B = textureSample(velocity,samplerFront, coords.xy - vec2<f32>(0.0, u.texelSize.y)).x;
  var T = textureSample(velocity,samplerFront, coords.xy + vec2<f32>(0.0, u.texelSize.y)).x;

  return vec4(0.5 * ((R - L) - (T - B)), 0.0, 0.0, 1.0);
}