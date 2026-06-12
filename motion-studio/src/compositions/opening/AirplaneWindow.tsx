import {z} from 'zod';
import {
  AbsoluteFill,
  interpolate,
  random,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {colors} from '../../data/theme';

export const airplaneWindowSchema = z.object({
  timeOfDay: z.enum(['morning', 'day', 'sunset']),
  driftSpeed: z.number().min(0.2).max(8),
  cloudOpacity: z.number().min(0).max(1),
  zoomTo: z.number().min(1).max(1.15),
  showReflection: z.boolean(),
});

export type AirplaneWindowProps = z.infer<typeof airplaneWindowSchema>;

const skies = {
  morning: 'linear-gradient(180deg, #5C7CA6 0%, #AFC3D6 50%, #E8D5AE 100%)',
  day: 'linear-gradient(180deg, #4F7CB0 0%, #9FC0DC 60%, #DCE8F1 100%)',
  sunset: 'linear-gradient(180deg, #1F2C4A 0%, #6A5878 50%, #E8A468 100%)',
} as const;

const sunGlow = {
  morning: 'rgba(242, 222, 168, 0.5)',
  day: 'rgba(255, 255, 255, 0.3)',
  sunset: 'rgba(238, 178, 110, 0.55)',
} as const;

type Puff = {x: number; y: number; rx: number; ry: number; depth: number; alpha: number};

const makePuffs = (): Puff[] => {
  const puffs: Puff[] = [];
  for (let i = 0; i < 14; i++) {
    const key = `win-puff-${i}`;
    const depth = random(`${key}-d`);
    puffs.push({
      x: random(`${key}-x`) * 2200,
      y: 560 + random(`${key}-y`) * 420,
      rx: 130 + random(`${key}-rx`) * 220 + depth * 120,
      ry: 36 + random(`${key}-ry`) * 40 + depth * 26,
      depth,
      alpha: 0.45 + random(`${key}-a`) * 0.4,
    });
  }
  return puffs;
};

const puffs = makePuffs();

// 機内から見た飛行機窓。窓の外を雲がゆっくり流れる。
export const AirplaneWindow = ({
  timeOfDay,
  driftSpeed,
  cloudOpacity,
  zoomTo,
  showReflection,
}: AirplaneWindowProps) => {
  const frame = useCurrentFrame();
  const {width, height, durationInFrames} = useVideoConfig();
  const zoom = interpolate(frame, [0, durationInFrames], [1, zoomTo]);

  const winW = 760;
  const winH = 980;
  const trim = 30;

  return (
    <AbsoluteFill style={{backgroundColor: '#131A29', justifyContent: 'center', alignItems: 'center'}}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at 50% 45%, rgba(247,242,233,0.05) 0%, rgba(0,0,0,0.35) 100%)',
        }}
      />
      <div style={{transform: `scale(${zoom})`}}>
        <div
          style={{
            width: winW + trim * 2,
            height: winH + trim * 2,
            borderRadius: (winW + trim * 2) * 0.42,
            background: '#212B40',
            padding: trim,
            boxShadow: 'inset 0 4px 18px rgba(0,0,0,0.55), 0 30px 90px rgba(0,0,0,0.5)',
          }}
        >
          <div
            style={{
              width: winW,
              height: winH,
              borderRadius: winW * 0.42,
              overflow: 'hidden',
              position: 'relative',
              background: skies[timeOfDay],
              boxShadow: 'inset 0 0 60px rgba(10, 16, 30, 0.4)',
            }}
          >
            <div
              style={{
                position: 'absolute',
                left: winW / 2 - 420,
                top: winH * 0.3,
                width: 840,
                height: 620,
                background: `radial-gradient(ellipse at center, ${sunGlow[timeOfDay]} 0%, rgba(0,0,0,0) 62%)`,
              }}
            />
            <svg
              width={winW}
              height={winH}
              viewBox={`0 0 ${winW} ${winH}`}
              style={{position: 'absolute', inset: 0}}
            >
              <filter id="win-blur" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation={26} />
              </filter>
              <g opacity={cloudOpacity}>
                {puffs.map((p, i) => {
                  const layerSpeed = driftSpeed * (0.6 + p.depth);
                  const cycle = winW + p.rx * 2 + 240;
                  const x =
                    ((((p.x - frame * layerSpeed) % cycle) + cycle) % cycle) -
                    p.rx -
                    120;
                  return (
                    <ellipse
                      key={i}
                      cx={x}
                      cy={p.y}
                      rx={p.rx}
                      ry={p.ry}
                      fill="#FBF7EE"
                      opacity={p.alpha}
                      filter="url(#win-blur)"
                    />
                  );
                })}
              </g>
            </svg>
            {showReflection ? (
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'linear-gradient(118deg, rgba(255,255,255,0) 30%, rgba(255,255,255,0.09) 44%, rgba(255,255,255,0) 58%)',
                }}
              />
            ) : null}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: winW * 0.42,
                border: `2px solid ${colors.ivory}22`,
              }}
            />
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
