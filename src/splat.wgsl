@binding(0) @group(0) var samplerFront : sampler;

struct Uniforms {
  pixel : vec2<f32>,
}

@binding(0) @group(1) var<uniform> u : Uniforms;

@binding(1) @group(1) var density : texture_2d<f32>;
@binding(2) @group(1) var velocity : texture_2d<f32>;

struct Touch {
  color : vec4<f32>,
  point : vec2<f32>,
  velocity: vec2<f32>,
};

@binding(0) @group(2) var<uniform> t : Touch;

let radius = 1000.0;

struct Output {
  @location(0) density : vec4<f32>,
  @location(1) velocity : vec4<f32>,
}

@stage(fragment)
fn splat(@builtin(position) coords: vec4<f32>) -> Output {
    var uv = coords.xy * u.pixel;
    var p = coords.xy - t.point;
    var strength = exp(-dot(p, p) / radius);
    var densityBase = textureSample(density, samplerFront, uv).rgb;
    var velocityBase = textureSample(velocity, samplerFront, uv).xy;
    var out: Output;
    out.density = vec4<f32>(densityBase * (1.0 - strength) + strength * t.color.rgb, 1.0);
    out.velocity = vec4<f32>(velocityBase * (1.0 - strength) + strength * t.velocity, 0., 1.0);
    return out;
}
