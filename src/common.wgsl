
fn existe(coord: vec2<i32>) -> f32 {
    if (coord.x < 0 || coord.x > (u.resolution.x) - 1 || coord.y < 0 || coord.y > (u.resolution.y) - 1) {
        return 0.0;
    }

    var W = min(f32(u.resolution.x), f32(u.resolution.y));
    W = 0.0;//W;
    var jj = vec2<f32>(coord);
    if (jj.x < f32(W) / 2.0) {
        jj.x = f32(W) / 2.0;
    }
    if (jj.y < f32(W) / 2.0) {
        jj.y = f32(W) / 2.0;
    }
    if (jj.x > f32(u.resolution.x) - f32(W) / 2.0) {
        jj.x = f32(u.resolution.x) - f32(W) / 2.0;
    }
    if (jj.y > f32(u.resolution.y) - f32(W) / 2.0) {
        jj.y = f32(u.resolution.y) - f32(W) / 2.0;
    }

    if (distance(jj, vec2<f32>(coord)) > f32(W) / 2.0) {
        return 0.0;
    }
    return 1.0;
}
