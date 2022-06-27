struct Uniforms {
    resolution: vec2<i32>,
};
@group(0) @binding(0) var<uniform> u : Uniforms;

@group(1) @binding(0) var divergence : texture_2d<f32>;
@group(1) @binding(1) var velocity : texture_2d<f32>;

@group(2) @binding(0) var pressure : texture_2d<f32>;




fn sampleP(coord: vec2<i32>, coordo: vec2<i32>,exists2:f32) -> f32 {
    var exists = existe(((coord) % u.resolution.xy+u.resolution.xy)% u.resolution.xy);
    var q = textureLoad(pressure, ((coord) % u.resolution.xy+u.resolution.xy)% u.resolution.xy, 0).x;
    if (exists !=exists2) {
        q = textureLoad(pressure, ((coordo) % u.resolution.xy+u.resolution.xy)% u.resolution.xy , 0).x;
    }
    return q;
}

fn gradient(uv: vec2<i32>) ->  vec2<f32> {
    var e=existe((vec2<i32>(uv)% u.resolution.xy+u.resolution.xy)% u.resolution.xy);
    var pL = sampleP(uv - vec2<i32>(1, 0), uv + vec2<i32>(0, 0),e);
    var pR = sampleP(uv + vec2<i32>(1, 0), uv - vec2<i32>(0, 0),e);
    var pB = sampleP(uv + vec2<i32>(0, 1), uv - vec2<i32>(0, 0),e);
    var pT = sampleP(uv - vec2<i32>(0, 1), uv + vec2<i32>(0, 0),e);
    var pC = sampleP(uv - vec2<i32>(0, 0), uv + vec2<i32>(0, 0),e);
    var v = textureLoad(velocity, (uv% u.resolution.xy+u.resolution.xy)% u.resolution.xy, 0).xy;
    var exists = 1.0;//existe(vec2<i32>(uv));
    return exists * (v - vec2<f32>(pR - pL, pB - pT));
}

@fragment
fn jacobi(@builtin(position) coords: vec4<f32>) -> @location(0) f32 {
    var coord = vec2<i32>(coords.xy);
    // left, right, bottom, and top pressure samples
    

    var C = textureLoad(pressure, coord, 0).x;

    // evaluate Jacobi iteration
    // sum.x += C * dd;
    // sum.y += dd;
    // if (sum.y < 1.0 || existe(coord)<1.0) {
    //     return 0.0;
    // }
    // if(existe(coord -  vec2<i32>(1, 0))<1.0){
    //     return 
    // }
    var dir = vec2<i32>(1, 0);
    var fl=vec2<f32>(0.0);
    var currentInflow=0.0;
    var wantInflow=0.0;
    // var curV=gradient(coord);
    var tot=0.0;
    fl.x=textureLoad(divergence, (coord% u.resolution.xy+u.resolution.xy)% u.resolution.xy, 0).x/2.0;
    for(var o=0;o<4;o+=1){

        var ff= textureLoad(pressure, ((coord + (dir )) % u.resolution.xy+u.resolution.xy)% u.resolution.xy,0 ).x;
      //  var ff2 =( textureLoad(velocity, ((coord + dir) % u.resolution.xy+u.resolution.xy)% u.resolution.xy, 0).xy + textureLoad(velocity, ((coord ) % u.resolution.xy+u.resolution.xy)% u.resolution.xy, 0).xy)/2.0;//(gradient( ((coord+dir) % u.resolution.xy+u.resolution.xy)% u.resolution.xy).xy+gradient( ((coord) % u.resolution.xy+u.resolution.xy)% u.resolution.xy).xy)/2.0;//sampleVelocity(coord + dir,coord);
        //var inflow=dot(ff2.xy,-vec2<f32>(dir));
        if(existe(coord + dir)!=existe(coord )){
           // ff2=-textureLoad(velocity, ((coord) % u.resolution.xy+u.resolution.xy)% u.resolution.xy, 0).xy;
            ff=textureLoad(pressure, ((coord) % u.resolution.xy+u.resolution.xy)% u.resolution.xy, 0).x;
            
            // inflow=dot(ff2.xy,-vec2<f32>(dir));
            // currentInflow+=0.0;//inflow;
            // wantInflow+=inflow;
            
        }else{
          //  currentInflow+=inflow;
           // wantInflow+=0.0;
           // tot+=1.0;
        }
        // if(existe(coord )<1.0 && o==0){
        //     ff2=textureLoad(velocity, coord + dir, 0).xy*0.0;
        //     ff=textureLoad(pressure, coord + dir, 0).x;
        // }
        //inflow=dot(ff2.xy,-vec2<f32>(dir))/2.0;
        var inflow=(ff-textureLoad(pressure, ((coord) % u.resolution.xy+u.resolution.xy)% u.resolution.xy, 0).x);
       
        fl.x+=inflow;
        // // fl.x+=ff;

        dir=vec2<i32>(-dir.y, dir.x);
    }
    return (C + ( (currentInflow - wantInflow)*0.0 + fl.x)/4.0)*0.99999;//(sum.x + bC/2.0) / sum.y;
}
