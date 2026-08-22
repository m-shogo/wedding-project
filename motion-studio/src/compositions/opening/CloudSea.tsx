import {z} from 'zod';
import {
  AbsoluteFill,
  interpolate,
  random,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

export const cloudSeaSchema = z.object({
  timeOfDay: z.enum(['morning', 'day', 'sunset']),
  speed: z.number().min(0.2).max(8),
  cloudOpacity: z.number().min(0.2).max(1),
  zoomTo: z.number().min(1).max(1.15),
  // 雲のぼかし半径(px)。大きいほど霞、小さいほど雲の塊が見える。
  // 42だと ry=70〜140 のellipseに対して強すぎて、雲海ではなく霞に見えた。
  // Studioのスライダーで調整して Save defaults できる。
  softness: z.number().min(4).max(60),
});

export type CloudSeaProps = z.infer<typeof cloudSeaSchema>;

const skies = {
  morning: {
    gradient: 'linear-gradient(180deg, #5C7CA6 0%, #AFC3D6 45%, #E8D5AE 78%, #F2E4C2 100%)',
    sun: 'rgba(242, 222, 168, 0.55)',
    cloudTint: '#FBF7EE',
    shadowTint: '#C9CFD9',
  },
  day: {
    gradient: 'linear-gradient(180deg, #4F7CB0 0%, #9FC0DC 55%, #DCE8F1 100%)',
    sun: 'rgba(255, 255, 255, 0.35)',
    cloudTint: '#FFFFFF',
    shadowTint: '#C4D2DE',
  },
  sunset: {
    gradient: 'linear-gradient(180deg, #1F2C4A 0%, #6A5878 48%, #C9805C 80%, #E8A468 100%)',
    sun: 'rgba(238, 178, 110, 0.6)',
    cloudTint: '#EFD9C2',
    shadowTint: '#5E5A74',
  },
} as const;

type Puff = {x: number; y: number; rx: number; ry: number; layer: number; alpha: number};

// 雲海の塊を決定的乱数で生成(レンダリングごとに変わらない)
const makePuffs = (): Puff[] => {
  const puffs: Puff[] = [];
  for (let layer = 0; layer < 3; layer++) {
    const count = 7 + layer * 2;
    for (let i = 0; i < count; i++) {
      const key = `puff-${layer}-${i}`;
      puffs.push({
        x: random(`${key}-x`) * 2400 - 200,
        y: 660 + layer * 130 + random(`${key}-y`) * 70,
        rx: 260 + random(`${key}-rx`) * 260 + layer * 60,
        ry: 70 + random(`${key}-ry`) * 50 + layer * 22,
        layer,
        alpha: 0.5 + random(`${key}-a`) * 0.4,
      });
    }
  }
  return puffs;
};

const puffs = makePuffs();

// 上空から見た雲海。上半分にテロップ余白がある。
export const CloudSea = ({timeOfDay, speed, cloudOpacity, zoomTo, softness}: CloudSeaProps) => {
  const frame = useCurrentFrame();
  const {width, height, durationInFrames} = useVideoConfig();
  const sky = skies[timeOfDay];
  const zoom = interpolate(frame, [0, durationInFrames], [1, zoomTo]);

  return (
    <AbsoluteFill style={{background: sky.gradient}}>
      <div
        style={{
          position: 'absolute',
          left: width * 0.5 - 600,
          top: height * 0.34,
          width: 1200,
          height: 700,
          background: `radial-gradient(ellipse at center, ${sky.sun} 0%, rgba(0,0,0,0) 60%)`,
        }}
      />
      <AbsoluteFill style={{transform: `scale(${zoom})`}}>
        <svg width={width} height={height} style={{position: 'absolute', inset: 0}}>
          <filter id="sea-blur" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation={softness} />
          </filter>
          <g opacity={cloudOpacity}>
            {puffs.map((p, i) => {
              const layerSpeed = speed * (0.5 + p.layer * 0.45);
              const cycle = width + p.rx * 2 + 300;
              const x =
                ((((p.x - frame * layerSpeed) % cycle) + cycle) % cycle) - p.rx - 150;
              const fill = p.layer === 0 ? sky.shadowTint : sky.cloudTint;
              return (
                <ellipse
                  key={i}
                  cx={x}
                  cy={p.y}
                  rx={p.rx}
                  ry={p.ry}
                  fill={fill}
                  opacity={p.alpha}
                  filter="url(#sea-blur)"
                />
              );
            })}
          </g>
          <rect
            y={height - 160}
            width={width}
            height={160}
            fill={sky.cloudTint}
            opacity={cloudOpacity * 0.55}
            filter="url(#sea-blur)"
          />
        </svg>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
