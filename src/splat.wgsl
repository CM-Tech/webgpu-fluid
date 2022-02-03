@binding(0) @group(0) var samplerFront : sampler;

struct Uniforms {
  pixel : vec2<f32>;
  point : vec2<f32>;
  color : vec3<f32>;
};

@binding(0) @group(1) var<uniform> u : Uniforms;
@binding(1) @group(1) var x : texture_2d<f32>;

let radius = 1000.0;

@stage(fragment)
fn splat(@builtin(position) coords: vec4<f32>) -> @location(0) vec4<f32> {
    var p = coords.xy - u.point;
    var strength = exp(-dot(p, p) / radius);
    var base = textureSample(x, samplerFront, coords.xy * u.pixel).xyz;
    return vec4<f32>(base * (1.0 - strength) + strength * u.color, 1.0);
}
