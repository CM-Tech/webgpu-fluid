uniform float timestep;
uniform float dissipation;
uniform vec4 color;
uniform vec2 texelSize;      // 1 / grid scale 
uniform sampler2D velocity;  // input velocity
uniform sampler2D x;         // quantity to advect

struct Pixel {
  pixel : vec2<f32>;
};

@binding(0) @group(0) var samplerFront : sampler;
@binding(1) @group(0) var<uniform> u : Uniforms;

uniform sampler2D pressure;
uniform float dissipation;

fn clear() -> @location(0) vec4<f32> {
    return dissipation * texture2D(pressure, coords);
}

uniform vec2 texelSize;
uniform sampler2D dye;
uniform sampler2D velocity;
uniform sampler2D image;

fn display() -> @location(0) vec4<f32> {
    var velOffset = 0.1 * texture2D(velocity, coords).xy * texelSize;
    var offset = texelSize.x > 1.0 / 800.0 ? -12.0 : -24.0;
    var size = texelSize.x > 1.0 / 800.0 ? 64.0 : 80.0;
    var pos = (vec2<f32>(offset) + vec2<f32>(coords.x, 1.0 - coords.y) / texelSize) / size;
    var logo = texture2D(image, pos + velOffset);
    return vec4<f32>(texture2D(dye, coords).rgb * (1.0 - logo.a) + logo.rgb * logo.a, 1.0);
}

uniform vec2 texelSize;
uniform sampler2D velocity; // vector field

fn sampleVelocity(uv: vec2<f32>) -> vec2<f32> {
  var mult = vec2<f32>(1.0, 1.0);
  if (uv.x < 0.0 || uv.x > 1.0) mult.x = -1.0;
  if (uv.y < 0.0 || uv.y > 1.0) mult.y = -1.0;
  return mult * texture2D(velocity, clamp(uv, 0.0, 1.0)).xy;
}

fn divergence() -> @location(0) vec4<f32> {
  var L = sampleVelocity(coords - vec2<f32>(texelSize.x, 0.0)).x;
  var R = sampleVelocity(coords + vec2<f32>(texelSize.x, 0.0)).x;
  var T = sampleVelocity(coords + vec2<f32>(0.0, texelSize.y)).y;
  var B = sampleVelocity(coords - vec2<f32>(0.0, texelSize.y)).y;
  var div = 0.5 * (R - L + T - B);
  return vec4<f32>(div, 0.0, 0.0, 1.0);
}


uniform vec2 texelSize;
uniform sampler2D pressure;
uniform sampler2D velocity;

fn gradientSubtract() -> @location(0) vec4<f32> {
  var pL = texture2D(pressure, coords - vec2(texelSize.x, 0.0)).x;
  var pR = texture2D(pressure, coords + vec2(texelSize.x, 0.0)).x;
  var pB = texture2D(pressure, coords - vec2(0.0, texelSize.y)).x;
  var pT = texture2D(pressure, coords + vec2(0.0, texelSize.y)).x;
  var v = texture2D(velocity, coords).xy;
  return vec4<f32>(v - vec2(pR - pL, pT - pB), 0.0, 1.0);
}

uniform vec2 texelSize;
uniform sampler2D pressure;
uniform sampler2D divergence;

fn jacobi() -> @location(0) vec4<f32> {
  // left, right, bottom, and top pressure samples
  var L = texture2D(pressure, coords - vec2<f32>(texelSize.x, 0.0)).x;
  var R = texture2D(pressure, coords + vec2<f32>(texelSize.x, 0.0)).x;
  var B = texture2D(pressure, coords - vec2<f32>(0.0, texelSize.y)).x;
  var T = texture2D(pressure, coords + vec2<f32>(0.0, texelSize.y)).x;

  // divergence sample, from center
  var bC = texture2D(divergence, coords).x;

  // evaluate Jacobi iteration
  return vec4<f32>(0.25 * (L + R + B + T - bC), 0, 0, 1);
}

uniform sampler2D vorticity;
uniform sampler2D velocity;
uniform vec2 texelSize;
uniform float timestep;
uniform float curl;

const EPSILON: float = 2.4414e-4; // 2^-12

fn vortForce() -> @location(0) vec4<f32> {
  var L = texture2D(vorticity, coords - vec2(texelSize.x, 0.0)).y;
  var R = texture2D(vorticity, coords + vec2(texelSize.x, 0.0)).y;
  var B = texture2D(vorticity, coords - vec2(0.0, texelSize.y)).x;
  var T = texture2D(vorticity, coords + vec2(0.0, texelSize.y)).x;

  var vC = texture2D(vorticity, coords).r;

  var force = 0.5 * vec2(abs(T) - abs(B), abs(L) - abs(R));
  force *= curl * vC / max(length(force), EPSILON);

  var vel = texture2D(velocity, coords).xy;
  return vec4(vel + timestep * force, 0.0, 1.0);
}

uniform sampler2D velocity;
uniform vec2 texelSize;

fn vorticity() -> @location(0) vec4<f32> {
  var L = texture2D(velocity, coords - vec2<f32>(texelSize.x, 0.0)).y;
  var R = texture2D(velocity, coords + vec2<f32>(texelSize.x, 0.0)).y;
  var B = texture2D(velocity, coords - vec2<f32>(0.0, texelSize.y)).x;
  var T = texture2D(velocity, coords + vec2<f32>(0.0, texelSize.y)).x;

  return vec4(0.5 * ((R - L) - (T - B)), 0.0, 0.0, 1.0);
}
