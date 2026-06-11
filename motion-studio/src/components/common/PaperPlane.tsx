type Props = {
  size?: number;
  color: string;
  angleDeg?: number;
};

// 進行方向が右向き(+x)の紙飛行機グリフ。<svg>または<g>の中で使う。
export const PaperPlane = ({size = 24, color, angleDeg = 0}: Props) => {
  const s = size;
  const d = `M ${s} 0 L ${-s * 0.75} ${s * 0.55} L ${-s * 0.35} 0 L ${-s * 0.75} ${-s * 0.55} Z`;
  return (
    <g transform={`rotate(${angleDeg})`}>
      <path d={d} fill={color} />
    </g>
  );
};
