struct Uniforms {
    pixel: vec2<f32>,
};
@group(0) @binding(0) var<uniform> u : Uniforms;

@group(1) @binding(0) var velocity : texture_2d<f32>;
@group(1) @binding(1) var dye : texture_2d<f32>;
@group(1) @binding(2) var image : texture_2d<f32>;


fn textureSampleSmooth(a: texture_2d<f32>, uv: vec2<f32>) -> vec4<f32> {
    var inn = uv - 0.5;
    var tl = vec2<i32>(floor(inn));
    var br = vec2<i32>(floor(inn) + 1.0);
    return (textureLoad(a, tl.xy, 0) * (f32(br.x) - inn.x) + textureLoad(a, vec2<i32>(br.x, tl.y), 0) * (inn.x - f32(tl.x))) * (f32(br.y) - inn.y) + 
      (textureLoad(a,vec2<i32>(tl.x, br.y), 0) * (f32(br.x) - inn.x) + textureLoad(a, br.xy, 0) * (inn.x - f32(tl.x))) * (inn.y - f32(tl.y)
    );
}
fn display(@builtin(location) coords: vec4<f32>) -> @location(0) vec4<f32> {
    let uvv = vec2<i32>(coords.xy);
    var velOffset = 0.1 * textureLoad(velocity, uv, 0).xy;
    var offset: f32;
    var size: f32;
    if (u.pixel.x > 1.0 / 800.0) {
        offset = -12.0;
        size = 64.0;
    } else {
        offset = -24.0;
        size = 80.0;
    }
    var pos = vec2<f32>(offset) + vec2<f32>(coords.x, 1.0 - coords.y);
    var logo = textureSampleSmooth(image, pos + velOffset);
    return vec4<f32>(textureLoad(dye, uvv, 0).rgb * (1.0 - logo.a) + logo.rgb * logo.a, 1.0);
}
