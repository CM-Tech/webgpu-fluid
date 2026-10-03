import package::common::sorOmega;

@group(0) @binding(0) var divergence : texture_2d<f32>;
@group(0) @binding(1) var pressure : texture_storage_2d<r32float, read_write>;

const TILE: i32 = 16;
// HALO of 2 lets one full red-black iteration complete without stale cells: the red
// half-sweep updates ring 1 (one cell beyond the tile), so the black half-sweep at the
// tile edge sees updated red neighbors instead of frozen halo copies.
const HALO: i32 = 2;
const SH: i32 = 20;        // TILE + 2 * HALO
const SH_CELLS: u32 = 400u; // SH * SH
const RED_SPAN: i32 = 18;   // TILE + 2 * (HALO - 1): region relaxed by the red pass
const RED_CELLS: u32 = 324u; // RED_SPAN * RED_SPAN
const TILE_THREADS: u32 = 256u;

var<workgroup> sh_p: array<f32, 400>;
var<workgroup> sh_d: array<f32, 400>;

fn relax(center: i32) {
    let L = sh_p[center - 1];
    let R = sh_p[center + 1];
    let T = sh_p[center - SH];
    let B = sh_p[center + SH];
    let bC = sh_d[center];
    let result = (L + R + B + T - bC) * 0.25;
    sh_p[center] = mix(sh_p[center], result, sorOmega);
}

@compute @workgroup_size(16, 16, 1)
fn solve(
    @builtin(local_invocation_id) lid: vec3<u32>,
    @builtin(workgroup_id) wid: vec3<u32>,
) {
    let dims = vec2<i32>(textureDimensions(pressure));
    let tile_origin = vec2<i32>(wid.xy) * TILE - HALO;
    let tid = lid.y * 16u + lid.x;

    // Cooperative load: 256 threads load 400 cells (with halo) over two passes.
    var idx = tid;
    loop {
        if (idx >= SH_CELLS) { break; }
        let lx = i32(idx) % SH;
        let ly = i32(idx) / SH;
        let gp = tile_origin + vec2<i32>(lx, ly);
        let cp = clamp(gp, vec2<i32>(0), dims - vec2<i32>(1));
        sh_p[idx] = textureLoad(pressure, cp).x;
        sh_d[idx] = textureLoad(divergence, cp, 0).x;
        idx = idx + TILE_THREADS;
    }
    workgroupBarrier();

    // Red half-sweep over the expanded region (ring 1 + interior). Red cells are never
    // adjacent to red cells, so any thread-to-cell mapping is race-free.
    var i = tid;
    loop {
        if (i >= RED_CELLS) { break; }
        let ex = i32(i) % RED_SPAN + 1;
        let ey = i32(i) / RED_SPAN + 1;
        // Cells outside the domain stay as clamped copies (Neumann mirror values).
        let egp = tile_origin + vec2<i32>(ex, ey);
        let inside = egp.x >= 0 && egp.x < dims.x && egp.y >= 0 && egp.y < dims.y;
        if (((ex + ey) & 1) == 0 && inside) { relax(ey * SH + ex); }
        i = i + TILE_THREADS;
    }
    workgroupBarrier();

    // Black half-sweep over the tile interior, now seeing updated red neighbors.
    let lx = i32(lid.x) + HALO;
    let ly = i32(lid.y) + HALO;
    let center = ly * SH + lx;
    if (((lx + ly) & 1) == 1) { relax(center); }
    workgroupBarrier();

    let gp = tile_origin + vec2<i32>(lx, ly);
    if (gp.x >= 0 && gp.x < dims.x && gp.y >= 0 && gp.y < dims.y) {
        textureStore(pressure, gp, vec4<f32>(sh_p[center], 0.0, 0.0, 1.0));
    }
}
