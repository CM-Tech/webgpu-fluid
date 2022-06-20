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


uniform sampler2D vorticity;
uniform sampler2D velocity;
uniform vec2 texelSize;
uniform float timestep;
uniform float curl;

const EPSILON: f32 = 2.4414e-4; // 2^-12

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
