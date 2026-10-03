@group(0) @binding(0) var pressure : texture_2d<f32>;
@group(0) @binding(1) var velocity : texture_2d<f32>;

// 1 projects onto the divergence-free subspace; 2 reflects across it (advection-reflection).
override gradScale: f32 = 1.0;

// Subtract the pressure gradient on the staggered faces. This is the exact adjoint of the
// divergence stencil, so a converged solve leaves a discretely divergence-free field.
@fragment
fn gradient(@builtin(position) coords: vec4<f32>) -> @location(0) vec2<f32> {
    let c = vec2<i32>(coords.xy);
    let dims = vec2<i32>(textureDimensions(pressure));
    let p = textureLoad(pressure, c, 0).x;
    let pR = textureLoad(pressure, min(c + vec2<i32>(1, 0), dims - 1), 0).x;
    let pD = textureLoad(pressure, min(c + vec2<i32>(0, 1), dims - 1), 0).x;
    let v = textureLoad(velocity, c, 0).xy - gradScale * vec2<f32>(pR - p, pD - p);
    // The last column of u faces and last row of v faces are the right/bottom walls.
    return select(vec2<f32>(0.0), v, c < dims - 1);
}

