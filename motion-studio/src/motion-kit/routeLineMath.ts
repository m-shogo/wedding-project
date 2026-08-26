// Pure geometry for the transition-wipe 'route-line' variant (wipe-route-line preset).
//
// This is a plain .ts (non-JSX) module on purpose: engines.tsx imports it to draw the SVG path
// and leading dot, and Node-executed check scripts (which cannot import .tsx files directly)
// import it too, so the same curve math backs both the visual and the regression check.
import type {TransitionWipeDirection} from './engines';

export interface RoutePoint {
  x: number;
  y: number;
}

export type RouteControlPoints = [RoutePoint, RoutePoint, RoutePoint, RoutePoint];

export interface RouteArcLengthSample {
  t: number;
  length: number;
}

export interface RouteArcLengthLut {
  samples: RouteArcLengthSample[];
  totalLength: number;
}

// A single canonical viewBox in screen-like coordinates (matches a 16:9 1920x1080 frame at 1/1
// scale) so horizontal and vertical curves share one coordinate space and neither can wander
// outside the visible frame regardless of direction.
export const ROUTE_LINE_VIEWBOX = {width: 1920, height: 1080};

const MARGIN_X = 260;
const MARGIN_Y = 200;

// Parametric position (0..1) of each of the 4 cubic-bezier control points along the primary
// travel axis, and their perpendicular offset (0..1) across the frame. This produces one gentle
// S-shaped "route" wander that every direction reuses by re-mapping which screen axis is primary
// and whether traversal is reversed.
const AXIS_POSITION: [number, number, number, number] = [0, 0.35, 0.65, 1];
const PERPENDICULAR_OFFSET: [number, number, number, number] = [0.78, 0.22, 0.86, 0.28];

function isHorizontal(direction: TransitionWipeDirection): boolean {
  return direction === 'left' || direction === 'right';
}

// 'right' and 'down' draw p0->p3 in the axis's natural increasing order; 'left' and 'up' draw
// from the far/high end back toward the origin, so the line (and the dot riding it) visibly
// travels toward the named direction instead of just mirroring the shape in place.
function isReversed(direction: TransitionWipeDirection): boolean {
  return direction === 'left' || direction === 'up';
}

/** The 4 cubic-bezier control points for a route-line in the given direction, in viewBox units. */
export function routeControlPoints(direction: TransitionWipeDirection): RouteControlPoints {
  const horizontal = isHorizontal(direction);
  const reversed = isReversed(direction);
  const usableW = ROUTE_LINE_VIEWBOX.width - MARGIN_X * 2;
  const usableH = ROUTE_LINE_VIEWBOX.height - MARGIN_Y * 2;

  const points = AXIS_POSITION.map((axisT, index) => {
    const t = reversed ? 1 - axisT : axisT;
    const perpendicular = PERPENDICULAR_OFFSET[index];
    if (horizontal) {
      return {x: MARGIN_X + t * usableW, y: MARGIN_Y + perpendicular * usableH};
    }
    return {x: MARGIN_X + perpendicular * usableW, y: MARGIN_Y + t * usableH};
  });

  return points as RouteControlPoints;
}

/** SVG path `d` attribute for the route-line cubic bezier, ready to pair with strokeDashoffset. */
export function routePathD([p0, p1, p2, p3]: RouteControlPoints): string {
  return `M ${p0.x} ${p0.y} C ${p1.x} ${p1.y}, ${p2.x} ${p2.y}, ${p3.x} ${p3.y}`;
}

/** Point on a cubic bezier at parameter t (0..1), using the same t driving strokeDashoffset. */
export function cubicBezierPoint([p0, p1, p2, p3]: RouteControlPoints, t: number): RoutePoint {
  const clamped = Math.min(1, Math.max(0, t));
  const mt = 1 - clamped;
  const x = mt * mt * mt * p0.x + 3 * mt * mt * clamped * p1.x + 3 * mt * clamped * clamped * p2.x + clamped * clamped * clamped * p3.x;
  const y = mt * mt * mt * p0.y + 3 * mt * mt * clamped * p1.y + 3 * mt * clamped * clamped * p2.y + clamped * clamped * clamped * p3.y;
  return {x, y};
}

function pointDistance(a: RoutePoint, b: RoutePoint): number {
  return Math.hypot(b.x - a.x, b.y - a.y);
}

/**
 * Deterministic polyline approximation of a cubic Bezier's arc length.
 *
 * SVG strokeDashoffset advances by arc-length fraction, not by the Bezier parameter `t`.
 * Keeping this lookup pure lets Remotion and Node checks use the same conversion without
 * relying on browser-only getTotalLength()/getPointAtLength() calls.
 */
export function buildCubicBezierArcLengthLut(
  points: RouteControlPoints,
  segmentCount = 512,
): RouteArcLengthLut {
  if (!Number.isInteger(segmentCount) || segmentCount < 2) {
    throw new Error(`route-line arc-length segmentCount must be an integer >= 2, received ${segmentCount}`);
  }

  const samples: RouteArcLengthSample[] = [{t: 0, length: 0}];
  let totalLength = 0;
  let previous = cubicBezierPoint(points, 0);

  for (let index = 1; index <= segmentCount; index += 1) {
    const t = index / segmentCount;
    const current = cubicBezierPoint(points, t);
    totalLength += pointDistance(previous, current);
    samples.push({t, length: totalLength});
    previous = current;
  }

  return {samples, totalLength};
}

/** Convert normalized arc progress (the value used by strokeDashoffset) back to Bezier `t`. */
export function cubicBezierParameterAtArcProgress(
  lut: RouteArcLengthLut,
  arcProgress: number,
): number {
  const progress = Math.min(1, Math.max(0, arcProgress));
  if (progress === 0 || lut.totalLength === 0) return 0;
  if (progress === 1) return 1;

  const targetLength = lut.totalLength * progress;
  let low = 0;
  let high = lut.samples.length - 1;

  while (low + 1 < high) {
    const middle = Math.floor((low + high) / 2);
    if (lut.samples[middle].length < targetLength) low = middle;
    else high = middle;
  }

  const before = lut.samples[low];
  const after = lut.samples[high];
  const span = after.length - before.length;
  if (span === 0) return before.t;
  const localProgress = (targetLength - before.length) / span;
  return before.t + (after.t - before.t) * localProgress;
}

/** Point at a normalized arc-length fraction, matching SVG pathLength/strokeDashoffset semantics. */
export function cubicBezierPointAtArcProgress(
  points: RouteControlPoints,
  arcProgress: number,
  lut = buildCubicBezierArcLengthLut(points),
): RoutePoint {
  return cubicBezierPoint(points, cubicBezierParameterAtArcProgress(lut, arcProgress));
}

function withinViewBox(point: RoutePoint): boolean {
  return point.x >= 0 && point.x <= ROUTE_LINE_VIEWBOX.width && point.y >= 0 && point.y <= ROUTE_LINE_VIEWBOX.height;
}

/** True if every control point (and therefore the full convex-hull-bounded curve) stays on-screen. */
export function routeStaysWithinViewBox(direction: TransitionWipeDirection): boolean {
  return routeControlPoints(direction).every(withinViewBox);
}
