const HALF_STEPS = 2;
const timestep = 0.017 / HALF_STEPS;

// Fraction kept per frame.
const dyeDissipation = pow(0.97, 1.0 / HALF_STEPS);
const velocityDissipation = pow(0.98, 1.0 / HALF_STEPS);
const background = vec4<f32>(1.0, 1.0, 1.0, 1.0);

const smoothOmega = 1.15;
const coarseOmega = 1.6;
const COARSE_ITERS = 32;
