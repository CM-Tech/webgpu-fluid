const EPSILON = 2.4414e-4; // 2^-12

const radius = pow(50.0, 2.0);

// Each frame is one advection-reflection step made of two half steps.
const HALF_STEPS = 2;
const timestep = 0.017 / HALF_STEPS;
const dyeDissipation = pow(0.97, 1.0 / HALF_STEPS);
const velocityDissipation = pow(0.98, 1.0 / HALF_STEPS);
const color = vec4<f32>(1.0, 1.0, 1.0, 1.0);
// Multigrid pressure solve: red-black Gauss-Seidel smoothing on every level (a slight
// over-relaxation smooths high frequencies faster), then SOR on the tiny coarsest grid.
const smoothOmega = 1.15;
const coarseOmega = 1.6;
const COARSE_ITERS = 32;
