// Velocity lives on a staggered (MAC) grid: texel (i, j) holds u on the face between cells
// i and i+1 and v on the face between cells j and j+1. The walls are the faces just outside
// the domain (implicitly zero) and the last column/row of faces, which are forced to zero.

@group(0) @binding(0) var velocity : texture_2d<f32>;
@group(0) @binding(1) var divergenceOut : texture_storage_2d<r32float, write>;
@group(0) @binding(2) var pressure : texture_storage_2d<r32float, write>;

@compute @workgroup_size(8, 8, 1)
fn divergence(@builtin(global_invocation_id) id: vec3<u32>) {
    let c = vec2<i32>(id.xy);
    let dims = vec2<i32>(textureDimensions(velocity));
    if (any(c >= dims)) { return; }

    let vel = textureLoad(velocity, c, 0).xy;
    let u = select(0.0, vel.x, c.x < dims.x - 1);
    let v = select(0.0, vel.y, c.y < dims.y - 1);
    let uL = select(0.0, textureLoad(velocity, c - vec2<i32>(1, 0), 0).x, c.x > 0);
    let vT = select(0.0, textureLoad(velocity, c - vec2<i32>(0, 1), 0).y, c.y > 0);
    textureStore(divergenceOut, c, vec4<f32>(u - uL + v - vT, 0.0, 0.0, 0.0));

    // The solve starts from zero: multigrid converges well from there, and the previous
    // pressure is a poor guess (it belongs to a different velocity, and with
    // advection-reflection to a different half step).
    textureStore(pressure, c, vec4<f32>(0.0));
}
