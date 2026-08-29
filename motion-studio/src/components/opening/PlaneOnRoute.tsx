import {getLength, getPointAtLength, getTangentAtLength} from '@remotion/paths';
import {PaperPlane} from '../common/PaperPlane';

type Props = {
  d: string;
  progress: number;
  color: string;
  size: number;
};

// 航路パスに沿って進行方向を向きながら移動する紙飛行機。
export const PlaneOnRoute = ({d, progress, color, size}: Props) => {
  const length = getLength(d);
  const clamped = Math.min(Math.max(progress, 0.0001), 1);
  const point = getPointAtLength(d, length * clamped);
  const tangent = getTangentAtLength(d, length * clamped);

  // Remotion 5 tightens path sampling to return null outside the path length.
  // 4.x still returns the endpoint for the same case, but current 4.x types already
  // expose the future-safe nullable contract. Invalid geometry should hide only the
  // moving plane instead of producing a broken SVG transform or NaN rotation.
  if (point === null || tangent === null) {
    return null;
  }

  const angle = (Math.atan2(tangent.y, tangent.x) * 180) / Math.PI;
  return (
    <g transform={`translate(${point.x}, ${point.y})`}>
      <PaperPlane size={size} color={color} angleDeg={angle} />
    </g>
  );
};
