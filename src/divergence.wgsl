struct Uniforms {
    resolution: vec2<i32>,
};
@group(0) @binding(0) var<uniform> u : Uniforms;

@group(1) @binding(0) var velocity : texture_2d<f32>;

@fragment
fn divergence(@builtin(position) coords: vec4<f32>) -> @location(0) f32 {
    var coord = vec2<i32>(coords.xy);
    var cellVelocity = textureLoad(velocity, ((coord ) % u.resolution.xy+u.resolution.xy)% u.resolution.xy, 0).xy;
    var neighborOffset = vec2<i32>(1, 0);
    var value = 0.0;
    for(var o = 0; o < 4; o += 1){
        if(existe(coord + neighborOffset) == existe(coord )){
            var neighborVelocity = textureLoad(velocity, ((coord + neighborOffset) % u.resolution.xy + u.resolution.xy) % u.resolution.xy, 0).xy;
            value+=dot(neighborVelocity, -vec2<f32>(neighborOffset));
        } else {
            value+=dot(-cellVelocity, -vec2<f32>(neighborOffset));
        }
        neighborOffset = vec2<i32>(-neighborOffset.y, neighborOffset.x);
    }
    return value;
}
