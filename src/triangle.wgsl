[[binding(0), group(0)]] var textureFront : texture_2d<f32>;
[[binding(1), group(0)]] var samplerFront : sampler;

struct FragOut {
  [[location(0)]] color1 : vec4<f32>;
  [[location(1)]] color2 : vec4<f32>;
};

[[stage(fragment)]]
fn frag([[builtin(position)]] coord_in: vec4<f32>) -> FragOut {
  var pixel = vec2<f32>(1.0 / 320.0, 1.0 / 150.0);
  var uv = coord_in.xy * pixel;
  
  var sum = 0.0;
  sum = sum + textureSample(textureFront, samplerFront, uv + pixel * vec2<f32>(-1., -1.)).g;
  sum = sum + textureSample(textureFront, samplerFront, uv + pixel * vec2<f32>(-1., 0.)).g;
  sum = sum + textureSample(textureFront, samplerFront, uv + pixel * vec2<f32>(-1., 1.)).g;
  sum = sum + textureSample(textureFront, samplerFront, uv + pixel * vec2<f32>(1., -1.)).g;
  sum = sum + textureSample(textureFront, samplerFront, uv + pixel * vec2<f32>(1., 0.)).g;
  sum = sum + textureSample(textureFront, samplerFront, uv + pixel * vec2<f32>(1., 1.)).g;
  sum = sum + textureSample(textureFront, samplerFront, uv + pixel * vec2<f32>(0., -1.)).g;
  sum = sum + textureSample(textureFront, samplerFront, uv + pixel * vec2<f32>(0., 1.)).g;

  var live = vec4<f32>(0., 1., 0., 1.);
  var dead = vec4<f32>(0., 0., 0., 1.);
  var blue = vec4<f32>(0., 0., 1., 1.);

  var output: FragOut;
  var me = textureSample(textureFront, samplerFront, uv).rgb;
  if (me.g <= .1) {
    if ((sum >= 2.9) && (sum <= 3.1)) {
      output.color1 = live;
    } elseif (me.b > .01) {
      output.color1 = vec4<f32>(0., 0., me.b - .006, 1.);
    } else {
      output.color1 = dead;
    }
  } else {
    if ((sum >= 1.9) && (sum <= 3.1)) {
      output.color1 = live;
    } else {
      output.color1 = blue;
    }
  }


  output.color2 = output.color1;
  return output;
}

[[stage(vertex)]]
fn vert([[builtin(vertex_index)]] VertexIndex : u32)
     -> [[builtin(position)]] vec4<f32> {
  var pos = array<vec2<f32>, 4>(
    vec2<f32>(-1.0, -1.0),
    vec2<f32>(-1.0, 1.0),
    vec2<f32>(1.0, -1.0),
    vec2<f32>(1.0, 1.0),
  );

  return vec4<f32>(pos[VertexIndex], 0.0, 1.0);
}
