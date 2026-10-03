// Multigrid restriction: coarse RHS = sum of the 2x2 fine residuals r = b - A x (see
// multigrid.wesl for the scaling). Also zeroes the coarse correction as its initial guess.

@group(0) @binding(0) var fineX : texture_2d<f32>;
@group(0) @binding(1) var fineRhs : texture_2d<f32>;
@group(0) @binding(2) var coarseRhs : texture_storage_2d<r32float, write>;
@group(0) @binding(3) var coarseX : texture_storage_2d<r32float, write>;

fn residual(c: vec2<i32>, dims: vec2<i32>) -> f32 {
    if (c.x >= dims.x || c.y >= dims.y) { return 0.0; }
    let xc = textureLoad(fineX, c, 0).x;
    var ax = 0.0;
    if (c.x > 0) { ax += textureLoad(fineX, c - vec2<i32>(1, 0), 0).x - xc; }
    if (c.x < dims.x - 1) { ax += textureLoad(fineX, c + vec2<i32>(1, 0), 0).x - xc; }
    if (c.y > 0) { ax += textureLoad(fineX, c - vec2<i32>(0, 1), 0).x - xc; }
    if (c.y < dims.y - 1) { ax += textureLoad(fineX, c + vec2<i32>(0, 1), 0).x - xc; }
    return textureLoad(fineRhs, c, 0).x - ax;
}

@compute @workgroup_size(8, 8, 1)
fn restrictResidual(@builtin(global_invocation_id) id: vec3<u32>) {
    let cc = vec2<i32>(id.xy);
    if (any(cc >= vec2<i32>(textureDimensions(coarseRhs)))) { return; }
    let dims = vec2<i32>(textureDimensions(fineX));
    let f = 2 * cc;
    let r = residual(f, dims) + residual(f + vec2<i32>(1, 0), dims)
          + residual(f + vec2<i32>(0, 1), dims) + residual(f + vec2<i32>(1, 1), dims);
    textureStore(coarseRhs, cc, vec4<f32>(r, 0.0, 0.0, 0.0));
    textureStore(coarseX, cc, vec4<f32>(0.0));
}
