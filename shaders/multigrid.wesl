import package::common::{smoothOmega, coarseOmega, COARSE_ITERS};

// Geometric multigrid for the pressure Poisson equation  A x = b  with pure Neumann walls.
// A is the compact 5-point Laplacian with unit spacing; neighbours outside the domain are
// omitted (zero normal gradient), so A is exactly div(grad(.)) on the staggered velocity grid.
// Coarse levels use the same unit-spacing stencil, so the coarse RHS is the *sum* (not the
// average) of the 2x2 fine residuals, which accounts for the 4x larger h^2.

@group(0) @binding(0) var rhs : texture_2d<f32>;
@group(0) @binding(1) var x : texture_storage_2d<r32float, read_write>;

struct Stencil {
    sum: f32,
    n: f32,
};

fn neighbours(c: vec2<i32>, dims: vec2<i32>) -> Stencil {
    var s = Stencil(0.0, 0.0);
    if (c.x > 0) { s.sum += textureLoad(x, c - vec2<i32>(1, 0)).x; s.n += 1.0; }
    if (c.x < dims.x - 1) { s.sum += textureLoad(x, c + vec2<i32>(1, 0)).x; s.n += 1.0; }
    if (c.y > 0) { s.sum += textureLoad(x, c - vec2<i32>(0, 1)).x; s.n += 1.0; }
    if (c.y < dims.y - 1) { s.sum += textureLoad(x, c + vec2<i32>(0, 1)).x; s.n += 1.0; }
    return s;
}

// Red-black Gauss-Seidel half sweep. Each thread owns one cell of the active colour, so
// the grid is dispatched at half width; in-place updates are race-free because a cell of
// one colour only reads cells of the other.
fn relaxColor(tid: vec2<u32>, parity: i32) {
    let dims = vec2<i32>(textureDimensions(x));
    let y = i32(tid.y);
    let c = vec2<i32>(2 * i32(tid.x) + ((y + parity) & 1), y);
    if (c.x >= dims.x || y >= dims.y) { return; }
    let s = neighbours(c, dims);
    let old = textureLoad(x, c).x;
    let gs = (s.sum - textureLoad(rhs, c, 0).x) / s.n;
    textureStore(x, c, vec4<f32>(mix(old, gs, smoothOmega), 0.0, 0.0, 0.0));
}

@compute @workgroup_size(8, 8, 1)
fn smoothRed(@builtin(global_invocation_id) id: vec3<u32>) { relaxColor(id.xy, 0); }

@compute @workgroup_size(8, 8, 1)
fn smoothBlack(@builtin(global_invocation_id) id: vec3<u32>) { relaxColor(id.xy, 1); }

// Coarsest level (at most 16x16): solved by a single workgroup in shared memory.
const CMAX: i32 = 16;
var<workgroup> sh_x: array<f32, 256>;

@compute @workgroup_size(16, 16, 1)
fn coarseSolve(@builtin(local_invocation_id) lid: vec3<u32>) {
    let dims = vec2<i32>(textureDimensions(x));
    let c = vec2<i32>(lid.xy);
    let inside = c.x < dims.x && c.y < dims.y;
    let i = c.y * CMAX + c.x;
    var b = 0.0;
    var n = 0.0;
    if (inside) {
        b = textureLoad(rhs, c, 0).x;
        n = f32(c.x > 0) + f32(c.x < dims.x - 1) + f32(c.y > 0) + f32(c.y < dims.y - 1);
    }
    sh_x[i] = 0.0;
    workgroupBarrier();
    for (var it = 0; it < 2 * COARSE_ITERS; it++) {
        if (inside && ((c.x + c.y + it) & 1) == 0) {
            // Out-of-domain neighbours are 0 in shared memory and excluded from n.
            var sum = 0.0;
            if (c.x > 0) { sum += sh_x[i - 1]; }
            if (c.x < dims.x - 1) { sum += sh_x[i + 1]; }
            if (c.y > 0) { sum += sh_x[i - CMAX]; }
            if (c.y < dims.y - 1) { sum += sh_x[i + CMAX]; }
            sh_x[i] = mix(sh_x[i], (sum - b) / n, coarseOmega);
        }
        workgroupBarrier();
    }
    if (inside) { textureStore(x, c, vec4<f32>(sh_x[i], 0.0, 0.0, 0.0)); }
}
