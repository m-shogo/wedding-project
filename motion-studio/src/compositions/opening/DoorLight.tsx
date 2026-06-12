import {z} from 'zod';
import {zColor} from '@remotion/zod-types';
import {
  AbsoluteFill,
  Easing,
  interpolate,
  random,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

export const doorLightSchema = z.object({
  lightColor: zColor(),
  openStartFrame: z.number().min(0),
  maxOpenWidth: z.number().min(60).max(700),
  glowStrength: z.number().min(0).max(1),
  particleCount: z.number().int().min(0).max(80),
});

export type DoorLightProps = z.infer<typeof doorLightSchema>;

// 扉が開いて光が差し込む余韻シーン。5-B(入場直前)用。
export const DoorLight = ({
  lightColor,
  openStartFrame,
  maxOpenWidth,
  glowStrength,
  particleCount,
}: DoorLightProps) => {
  const frame = useCurrentFrame();
  const {width, height, durationInFrames} = useVideoConfig();

  const open = interpolate(
    frame,
    [openStartFrame, durationInFrames - 30],
    [0, 1],
    {
      easing: Easing.inOut(Easing.cubic),
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    },
  );
  const slit = interpolate(open, [0, 1], [10, maxOpenWidth]);
  const ambient = interpolate(open, [0, 1], [0.04, 0.34]) * (0.4 + glowStrength);

  return (
    <AbsoluteFill style={{backgroundColor: '#0B1220'}}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(ellipse at 50% 52%, ${lightColor}${Math.round(
            ambient * 255,
          )
            .toString(16)
            .padStart(2, '0')} 0%, rgba(0,0,0,0) 58%)`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: width / 2 - slit * 1.9,
          top: 0,
          width: slit * 3.8,
          height,
          background: `linear-gradient(90deg, rgba(0,0,0,0) 0%, ${lightColor}55 50%, rgba(0,0,0,0) 100%)`,
          filter: 'blur(34px)',
          opacity: 0.5 + glowStrength * 0.5,
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: width / 2 - slit / 2,
          top: 0,
          width: slit,
          height,
          background: `linear-gradient(90deg, rgba(0,0,0,0) 0%, ${lightColor} 38%, #FFFFFF 50%, ${lightColor} 62%, rgba(0,0,0,0) 100%)`,
          filter: 'blur(6px)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          left: width / 2 - slit * 2.6,
          bottom: -120,
          width: slit * 5.2,
          height: 320,
          background: `radial-gradient(ellipse at center, ${lightColor}66 0%, rgba(0,0,0,0) 65%)`,
          filter: 'blur(20px)',
        }}
      />
      <svg width={width} height={height} style={{position: 'absolute', inset: 0}}>
        {Array.from({length: particleCount}, (_, i) => {
          const key = `dust-${i}`;
          const spread = 0.5 + open * 1.6;
          const px =
            width / 2 + (random(`${key}-x`) - 0.5) * maxOpenWidth * 2.4 * spread;
          const speed = 0.25 + random(`${key}-s`) * 0.55;
          const py =
            ((height + 80 - ((frame * speed + random(`${key}-y`) * height) % (height + 160))) %
              (height + 160)) -
            80;
          const twinkle =
            0.25 + 0.6 * Math.abs(Math.sin((frame / 30 + random(`${key}-t`) * 6) * 1.4));
          const r = 1.2 + random(`${key}-r`) * 2.6;
          return (
            <circle
              key={i}
              cx={px}
              cy={py}
              r={r}
              fill={lightColor}
              opacity={twinkle * open * 0.85}
            />
          );
        })}
      </svg>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at center, rgba(0,0,0,0) 55%, rgba(4,8,16,0.55) 100%)',
        }}
      />
    </AbsoluteFill>
  );
};
