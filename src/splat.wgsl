struct Uniforms {
    resolution: vec2<i32>,
};
@group(0) @binding(0) var<uniform> u : Uniforms;

@group(1) @binding(0) var dye : texture_2d<f32>;
@group(1) @binding(1) var velocity : texture_2d<f32>;

struct Touch {
    color: vec4<f32>,
    point: vec2<f32>,
    velocity: vec2<f32>,
    oldPoint: vec2<f32>,
};

@group(2) @binding(0) var<uniform> touch : Touch;

let radius = 400.0;

struct Output {
    @location(0) dye: vec4<f32>,
    @location(1) velocity: vec4<f32>,
}

fn closestPoint(start: vec2<f32>, end: vec2<f32>, c: vec2<f32>) -> vec2<f32> {
    // Break ab appart into components a and b
    var a = start;
    var b = end;
    if (dot(b - a, b - a) < 0.000001) {
        return a;
    }

    // Project c onto ab, computing the 
    // paramaterized position d(t) = a + t * (b - a)
    var t = dot(c - a, b - a) / dot(b - a, b - a);

    // Clamp T to a 0-1 range. If t was < 0 or > 1
    // then the closest point was outside the line!
    if (t < 0.0) {
        t = 0.0;
    }
    if (t > 1.0) {
        t = 1.0;
    }

    // Compute the projected position from the clamped t
    var d = vec2<f32>(a + t * (b - a));

    // Return result
    return d;
}

@fragment
fn splat(@builtin(position) coords: vec4<f32>) -> Output {
    var coord = vec2<i32>(coords.xy);
    var p = coords.xy - closestPoint(touch.point, touch.oldPoint, coords.xy);
    var strength = exp(-dot(p, p) / radius);
    var dyeBase = textureLoad(dye, coord, 0).rgb;
    var velocityBase = textureLoad(velocity, coord, 0).xy;
    var out: Output;
    out.dye = vec4<f32>(dyeBase * (1.0 - strength) + strength * touch.color.rgb, 1.0);
    out.velocity = vec4<f32>(velocityBase + strength * touch.velocity, 0., 1.0);
    return out;
}
