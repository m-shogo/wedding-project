import {useCurrentFrame, useVideoConfig} from 'remotion';

type Props = {
  opacity: number;
  speed: number;
  idSuffix?: string;
};

type Blob = {
  baseX: number;
  y: number;
  rx: number;
  ry: number;
  speedFactor: number;
  alpha: number;
};

// ゆっくり左へ流れる薄い雲レイヤー。画面外でラップするのでループしても切れ目が出ない。
const blobs: Blob[] = [
  {baseX: 300, y: 180, rx: 420, ry: 110, speedFactor: 1.0, alpha: 0.55},
  {baseX: 1100, y: 420, rx: 520, ry: 130, speedFactor: 0.65, alpha: 0.4},
  {baseX: 1900, y: 240, rx: 380, ry: 95, speedFactor: 0.85, alpha: 0.5},
  {baseX: 700, y: 760, rx: 560, ry: 140, speedFactor: 0.55, alpha: 0.42},
  {baseX: 1600, y: 900, rx: 460, ry: 110, speedFactor: 0.75, alpha: 0.48},
  {baseX: 2300, y: 620, rx: 500, ry: 120, speedFactor: 0.95, alpha: 0.38},
];

export const CloudLayer = ({opacity, speed, idSuffix = 'a'}: Props) => {
  const frame = useCurrentFrame();
  const {width, height} = useVideoConfig();
  const blurId = `cloud-blur-${idSuffix}`;
  return (
    <svg width={width} height={height} style={{position: 'absolute', inset: 0}}>
      <filter id={blurId} x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation={55} />
      </filter>
      <g opacity={opacity}>
        {blobs.map((b, i) => {
          const cycle = width + b.rx * 2 + 200;
          const x =
            ((((b.baseX - frame * speed * b.speedFactor) % cycle) + cycle) % cycle) -
            b.rx -
            100;
          return (
            <g key={i} filter={`url(#${blurId})`}>
              <ellipse cx={x} cy={b.y} rx={b.rx} ry={b.ry} fill="#fff" opacity={b.alpha} />
              <ellipse
                cx={x + b.rx * 0.45}
                cy={b.y - b.ry * 0.5}
                rx={b.rx * 0.55}
                ry={b.ry * 0.7}
                fill="#fff"
                opacity={b.alpha * 0.8}
              />
            </g>
          );
        })}
      </g>
    </svg>
  );
};
