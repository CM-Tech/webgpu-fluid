struct Uniforms {
    resolution: vec2<i32>,
};
@group(0) @binding(0) var<uniform> u : Uniforms;

@group(1) @binding(0) var dye : texture_2d<f32>;

@fragment
fn display(@builtin(position) coords: vec4<f32>) -> @location(0) vec4<f32> {
    return textureLoad(dye, vec2<i32>(coords.xy), 0);
}
