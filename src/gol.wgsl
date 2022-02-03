@binding(0) @group(0) var samplerFront : sampler;

struct Uniforms {
  pixel : vec2<f32>;
};

@binding(0) @group(1) var textureFront : texture_2d<f32>;
@binding(1) @group(1) var<uniform> u : Uniforms;

@stage(fragment)
fn gol(@builtin(position) coord_in: vec4<f32>) -> @location(0) vec4<f32> {
  var uv = coord_in.xy * u.pixel;
  
  var sum = 0.0;
  sum = sum + textureSample(textureFront, samplerFront, uv + u.pixel * vec2<f32>(-1., -1.)).g;
  sum = sum + textureSample(textureFront, samplerFront, uv + u.pixel * vec2<f32>(-1., 0.)).g;
  sum = sum + textureSample(textureFront, samplerFront, uv + u.pixel * vec2<f32>(-1., 1.)).g;
  sum = sum + textureSample(textureFront, samplerFront, uv + u.pixel * vec2<f32>(1., -1.)).g;
  sum = sum + textureSample(textureFront, samplerFront, uv + u.pixel * vec2<f32>(1., 0.)).g;
  sum = sum + textureSample(textureFront, samplerFront, uv + u.pixel * vec2<f32>(1., 1.)).g;
  sum = sum + textureSample(textureFront, samplerFront, uv + u.pixel * vec2<f32>(0., -1.)).g;
  sum = sum + textureSample(textureFront, samplerFront, uv + u.pixel * vec2<f32>(0., 1.)).g;

  var live = vec4<f32>(0., 1., 0., 1.);
  var dead = vec4<f32>(0., 0., 0., 1.);
  var blue = vec4<f32>(0., 0., 1., 1.);

  var output: vec4<f32>;
  var me = textureSample(textureFront, samplerFront, uv).rgb;
  
  if (me.g <= .1) {
    if ((sum >= 2.9) && (sum <= 3.1)) {
      output = live;
    } else if (me.b > .01) {
      output = vec4<f32>(0., 0., me.b - .006, 1.);
    } else {
      output = dead;
    }
  } else {
    if ((sum >= 1.9) && (sum <= 3.1)) {
      output = live;
    } else {
      output = blue;
    }
  }

  return output;
}
