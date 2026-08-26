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

function withinViewBox(point: RoutePoint): boolean {
  return point.x >= 0 && point.x <= ROUTE_LINE_VIEWBOX.width && point.y >= 0 && point.y <= ROUTE_LINE_VIEWBOX.height;
}

/** True if every control point (and therefore the full convex-hull-bounded curve) stays on-screen. */
export function routeStaysWithinViewBox(direction: TransitionWipeDirection): boolean {
  return routeControlPoints(direction).every(withinViewBox);
}
