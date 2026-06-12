import {z} from 'zod';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {colors} from '../../../data/theme';
import {serifFamily} from '../../../data/fonts';
import {toneColor, toneAccent, toneShadow} from './tone';

// 人物・家族・犬・新郎新婦の名前札。下部1/3に表示する。
// 細い線や小さな装飾はOK。会場スクリーンで読めるサイズ優先。バウンド・回転・グリッチ禁止。
export const elegantLowerThirdSchema = z.object({
  name: z.string().min(1),
  role: z.string(),
  comment: z.string().optional(),
  position: z.enum(['left', 'right', 'center']),
  startFrame: z.number().min(0),
  durationFrames: z.number().min(1),
  tone: z.enum(['ivory', 'navy', 'gold']),
});

export type ElegantLowerThirdProps = z.infer<typeof elegantLowerThirdSchema>;

const SAFE_X = 160;
const SAFE_BOTTOM = 120;

export const ElegantLowerThird = ({
  name,
  role,
  comment,
  position,
  startFrame,
  durationFrames,
  tone,
}: ElegantLowerThirdProps) => {
  const frame = useCurrentFrame();
  const local = frame - startFrame;
  const fade = 16;

  const groupOpacity = interpolate(
    local,
    [0, fade, durationFrames - fade, durationFrames],
    [0, 1, 1, 0],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
  );
  // 静かに横へ寄る(派手にしない)
  const slide = interpolate(local, [0, fade + 8], [position === 'right' ? 20 : -20, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const ruleWidth = interpolate(local, [12, 40], [0, 150], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const nameOpacity = interpolate(local, [14, 36], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const commentOpacity = interpolate(local, [30, 54], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const color = toneColor(tone);
  const accent = toneAccent(tone);
  const shadow = toneShadow(tone);

  const alignItems =
    position === 'left' ? 'flex-start' : position === 'right' ? 'flex-end' : 'center';
  const textAlign = position === 'center' ? 'center' : position;
  const padX = position === 'center' ? 0 : SAFE_X;

  return (
    <AbsoluteFill
      style={{
        justifyContent: 'flex-end',
        alignItems,
        paddingBottom: SAFE_BOTTOM,
        paddingLeft: padX,
        paddingRight: padX,
      }}
    >
      <div
        style={{
          opacity: groupOpacity,
          transform: `translateX(${slide}px)`,
          textAlign,
          maxWidth: 900,
        }}
      >
        <div
          style={{
            fontFamily: serifFamily,
            fontSize: 26,
            letterSpacing: '0.42em',
            color: accent,
            paddingLeft: '0.42em',
            textShadow: shadow,
          }}
        >
          {role}
        </div>
        <div
          style={{
            fontFamily: serifFamily,
            fontSize: 88,
            letterSpacing: '0.12em',
            color,
            marginTop: 10,
            opacity: nameOpacity,
            textShadow: shadow,
          }}
        >
          {name}
        </div>
        <div
          style={{
            width: ruleWidth,
            borderTop: `1.5px solid ${colors.gold}`,
            margin:
              position === 'center'
                ? '20px auto'
                : position === 'right'
                  ? '20px 0 20px auto'
                  : '20px 0',
          }}
        />
        {comment ? (
          <div
            style={{
              fontFamily: serifFamily,
              fontSize: 32,
              lineHeight: 1.7,
              letterSpacing: '0.06em',
              color,
              opacity: commentOpacity,
              whiteSpace: 'pre-line',
              textShadow: shadow,
            }}
          >
            {comment}
          </div>
        ) : null}
      </div>
    </AbsoluteFill>
  );
};
