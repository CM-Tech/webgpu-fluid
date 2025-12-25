const EPSILON = 2.4414e-4; // 2^-12

const radius = 200.0;

const timestep = 0.017;
const dyeDissipation = 0.97;
const velocityDissipation = .98;
const color = vec4<f32>(1.0, 1.0, 1.0, 1.0);
const curlAmount = 12.0;
const pressureDissipation = 0.8;