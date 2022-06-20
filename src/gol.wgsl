@binding(0) @group(0) var samplerFront : sampler;

struct Uniforms {
  pixel: vec2<f32>,
};

@binding(0) @group(1) var textureFront : texture_2d<f32>;
@binding(1) @group(1) var<uniform> u : Uniforms;

@fragment
fn gol(@builtin(position) coord_in: vec4<f32>) -> @location(0) vec4<f32> {
    var uv = coord_in.xy * u.pixel;
    

    var sum = 0.0;
    for (var i = -1.0; i <= 1.0; i += 1.0) {
        for (var j = -1.0; j <= 1.0; j += 1.0) {
            if (i == 0.0 && j == 0.0) {
        continue;
            }
            sum = sum + textureSample(textureFront, samplerFront, uv + u.pixel * vec2<f32>(i, j)).g;
        }
    }
    var live = vec4<f32>(0., 1., 0., 1.);
    // var dead = vec4<f32>(0., 0., 0., 1.);
    // var blue = vec4<f32>(0., 0., 1., 1.);

    var output = vec4<f32>(0., 0., 0., 0.);
    var me = textureSample(textureFront, samplerFront, uv).rgb;
    var bor = uv.y;
    // if (me.g <= 1.0) {
        //if ((sum >= bo - 0.5) && (sum <= bo + 0.5)) {
    var bo = 3.0;//uv.x * 6.0 + 2.0;
    var outputk = vec4<f32>(0., 0., 0., 1.);
    var v = max(0.5 - min(abs(sum + me.g - bo), abs(sum - bo)), 0.0) * 2.0*2.0;
    output = v * vec4<f32>((live.rgb),1.0) + (1.0 - v) * outputk;
        //} else if (me.b > .01) {
        //    output = vec4<f32>(0., 0., me.b - 0.006, 1.);
        //} else {
           // output = dead;
        //}
    // } else {
    //     if ((sum >= 1.9) && (sum <= 3.1)) {
    //         output = live;
    //     } else {
    //         output = blue;
    //     }
    // }

    return output;
}
