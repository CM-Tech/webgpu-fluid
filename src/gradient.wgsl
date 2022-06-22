struct Uniforms {
    resolution: vec2<i32>,
};
@group(0) @binding(0) var<uniform> u : Uniforms;

@group(1) @binding(0) var pressure : texture_2d<f32>;
@group(1) @binding(1) var velocity : texture_2d<f32>;


fn sampleP(coord: vec2<i32>, coordo: vec2<i32>,exists2:f32) -> f32 {
    var exists = existe(((coord) % u.resolution.xy+u.resolution.xy)% u.resolution.xy);
    var q = textureLoad(pressure, ((coord) % u.resolution.xy+u.resolution.xy)% u.resolution.xy, 0).x;
    if (exists !=exists2) {
        q = textureLoad(pressure, ((coordo) % u.resolution.xy+u.resolution.xy)% u.resolution.xy , 0).x;
    }
    return q;
}

@fragment
fn gradient(@builtin(position) coords: vec4<f32>) -> @location(0) vec2<f32> {
    var uv = vec2<i32>(coords.xy);
    var e=existe(vec2<i32>(uv));
    var pL = sampleP(uv - vec2<i32>(1, 0), uv + vec2<i32>(0, 0),e);
    var pR = sampleP(uv + vec2<i32>(1, 0), uv - vec2<i32>(0, 0),e);
    var pB = sampleP(uv + vec2<i32>(0, 1), uv - vec2<i32>(0, 0),e);
    var pT = sampleP(uv - vec2<i32>(0, 1), uv + vec2<i32>(0, 0),e);
    var v = textureLoad(velocity, uv, 0).xy;
    var exists = 1.0;//existe(vec2<i32>(uv));
    return exists * (v - vec2<f32>(pR - pL, pB - pT));
}
