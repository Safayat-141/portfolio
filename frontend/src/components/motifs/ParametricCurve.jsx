import { useMemo } from 'react';

/**
 * Renders a parametric curve x(t), y(t) as an SVG path.
 * Curves are auto-normalized to fit the given width/height,
 * so equations can be written in their natural mathematical scale
 * without worrying about pixel coordinates.
 */
function generatePoints(xFn, yFn, tMin, tMax, steps) {
  const points = [];
  for (let i = 0; i <= steps; i++) {
    const t = tMin + ((tMax - tMin) * i) / steps;
    points.push([xFn(t), yFn(t)]);
  }
  return points;
}

function normalizePoints(points, width, height, padding = 10) {
  const xs = points.map((p) => p[0]);
  const ys = points.map((p) => p[1]);
  const minX = Math.min(...xs), maxX = Math.max(...xs);
  const minY = Math.min(...ys), maxY = Math.max(...ys);
  const spanX = maxX - minX || 1;
  const spanY = maxY - minY || 1;
  const availW = width - padding * 2;
  const availH = height - padding * 2;
  const scale = Math.min(availW / spanX, availH / spanY);
  const offsetX = padding + (availW - spanX * scale) / 2;
  const offsetY = padding + (availH - spanY * scale) / 2;

  return points.map(([x, y]) => [
    offsetX + (x - minX) * scale,
    offsetY + (y - minY) * scale,
  ]);
}

function pointsToPath(points) {
  return points
    .map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(2)},${y.toFixed(2)}`)
    .join(' ');
}

export default function ParametricCurve({
  equation,
  width = 400,
  height = 400,
  steps = 500,
  stroke = 'currentColor',
  strokeWidth = 1,
  opacity = 0.2,
  animate = false,
  duration = 3,
  className = '',
}) {
  const { xFn, yFn, tMin, tMax } = equation;

  const pathD = useMemo(() => {
    const raw = generatePoints(xFn, yFn, tMin, tMax, steps);
    const normalized = normalizePoints(raw, width, height);
    return pointsToPath(normalized);
  }, [xFn, yFn, tMin, tMax, steps, width, height]);

  return (
    <svg
      className={`parametric-curve ${className}`}
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      aria-hidden="true"
      focusable="false"
    >
      <path
        d={pathD}
        fill="none"
        stroke={stroke}
        strokeWidth={strokeWidth}
        opacity={opacity}
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength={animate ? 1 : undefined}
        style={
          animate
            ? {
                strokeDasharray: 1,
                strokeDashoffset: 1,
                animation: `curve-draw ${duration}s ease-in-out forwards`,
              }
            : undefined
        }
      />
      {animate && (
        <style>{`
          @keyframes curve-draw {
            to { stroke-dashoffset: 0; }
          }
        `}</style>
      )}
    </svg>
  );
}
