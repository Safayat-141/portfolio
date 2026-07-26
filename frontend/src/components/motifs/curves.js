// Library of parametric equations used as textural accents across the site.
// Placeholders below — swap in equations from your own projects when ready.
// ParametricCurve normalizes and scales automatically, so any real-valued
// x(t), y(t) pair over a finite t-range works without adjustment.

export const curves = {
  lissajous: {
    xFn: (t) => Math.sin(3 * t),
    yFn: (t) => Math.sin(4 * t + Math.PI / 2),
    tMin: 0,
    tMax: 2 * Math.PI,
  },
  rose: {
    xFn: (t) => Math.cos(4 * t) * Math.cos(t),
    yFn: (t) => Math.cos(4 * t) * Math.sin(t),
    tMin: 0,
    tMax: Math.PI,
  },
  hypotrochoid: {
    xFn: (t) => 5 * Math.cos(t) - 3 * Math.cos((5 / 3) * t),
    yFn: (t) => 5 * Math.sin(t) - 3 * Math.sin((5 / 3) * t),
    tMin: 0,
    tMax: 6 * Math.PI,
  },
  spiral: {
    xFn: (t) => t * Math.cos(t),
    yFn: (t) => t * Math.sin(t),
    tMin: 0,
    tMax: 6 * Math.PI,
  },
};
