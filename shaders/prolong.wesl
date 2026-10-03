// Multigrid prolongation: add the bilinearly interpolated coarse correction to the fine grid.

@group(0) @binding(0) var coarseX : texture_2d<f32>;
@group(0) @binding(1) var fineX : texture_storage_2d<r32float, read_write>;

fn coarse(i: vec2<i32>) -> f32 {
    return textureLoad(coarseX, clamp(i, vec2<i32>(0), vec2<i32>(textureDimensions(coarseX)) - 1), 0).x;
}

@compute @workgroup_size(8, 8, 1)
fn prolong(@builtin(global_invocation_id) id: vec3<u32>) {
    let f = vec2<i32>(id.xy);
    if (any(f >= vec2<i32>(textureDimensions(fineX)))) { return; }
    // Fine cell centre in coarse index space (coarse centres at integers).
    let q = (vec2<f32>(f) + 0.5) * 0.5 - 0.5;
    let i0 = vec2<i32>(floor(q));
    let t = q - floor(q);
    let a = coarse(i0);
    let b = coarse(i0 + vec2<i32>(1, 0));
    let c = coarse(i0 + vec2<i32>(0, 1));
    let d = coarse(i0 + vec2<i32>(1, 1));
    let e = mix(mix(a, b, t.x), mix(c, d, t.x), t.y);
    textureStore(fineX, f, vec4<f32>(textureLoad(fineX, f).x + e, 0.0, 0.0, 0.0));
}
