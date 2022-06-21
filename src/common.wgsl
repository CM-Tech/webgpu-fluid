
fn existe(coord: vec2<i32>) -> f32 {
    var exists = 1.0;

    if (coord.x < 0 || coord.x > (u.resolution.x) - 1 || coord.y < 0 || coord.y > (u.resolution.y) - 1) {
        exists = 0.0;
    }
    var W = u.resolution.x;
    if (u.resolution.y < W) {
        W = u.resolution.y;
    }
    W=W;
    var jj=vec2<f32>(coord);
    if(jj.x<f32(W) / 2.0){
        jj.x=f32(W) / 2.0;
    }
    if(jj.y<f32(W) / 2.0){
        jj.y=f32(W) / 2.0;
    }
    if(jj.x>f32(u.resolution.x)-f32(W) / 2.0){
        jj.x=f32(u.resolution.x)-f32(W) / 2.0;
    }
    if(jj.y>f32(u.resolution.y)-f32(W) / 2.0){
        jj.y=f32(u.resolution.y)-f32(W) / 2.0;
    }
    if (distance(jj, vec2<f32>(coord)) > f32(W) / 2.0) {
        exists = 0.0;
    }
    // W = u.resolution.x;
    // if (u.resolution.y < W) {
    //     W = u.resolution.y;
    // }
    // if (distance(vec2<f32>(u.resolution/2)+vec2<f32>(f32(W) / 8.0,-f32(W) / 8.0), vec2<f32>(coord)) < f32(W) / 8.0) {
    //     exists = 0.0;
    // }
    // if (distance(vec2<f32>(u.resolution/2)+vec2<f32>(-f32(W) / 8.0,-f32(W) / 8.0), vec2<f32>(coord)) < f32(W) / 8.0) {
    //     exists = 0.0;
    // }
    // if (distance(vec2<f32>(u.resolution/2)+vec2<f32>(-f32(W) / 8.0,-f32(W) / 8.0), vec2<f32>(coord)) < f32(W) / 8.0*3.0 && distance(vec2<f32>(u.resolution/2)+vec2<f32>(f32(W) / 8.0,-f32(W) / 8.0), vec2<f32>(coord)) < f32(W) / 8.0*3.0) {
    //     if((vec2<f32>(u.resolution/2)+vec2<f32>(-f32(W) / 8.0,-f32(W) / 8.0)).y<vec2<f32>(coord).y){
    //     exists = 0.0;
    //     }
    // }
    return exists;
}
