import {z} from 'zod';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {serifFamily} from '../../../data/fonts';
import {toneColor, toneAccent, toneShadow} from './tone';

// 章タイトル・場所名・MEMORY 01 などの見出し。
// マスク(clip-path)で横方向に静かに表示する。subtitleは少し遅れて出る。派手にしない。
export const maskRevealTitleSchema = z.object({
  title: z.string().min(1),
  subtitle: z.string().optional(),
  startFrame: z.number().min(0),
  durationFrames: z.number().min(1),
  align: z.enum(['center', 'left']),
  tone: z.enum(['ivory', 'navy', 'gold']),
});

export type MaskRevealTitleProps = z.infer<typeof maskRevealTitleSchema>;

export const MaskRevealTitle = ({
  title,
  subtitle,
  startFrame,
  durationFrames,
  align,
  tone,
}: MaskRevealTitleProps) => {
  const frame = useCurrentFrame();
  const local = frame - startFrame;
  const fade = 18;

  // 横マスクの開き(左→右に静かに)
  const reveal = interpolate(local, [0, 30], [100, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const groupOpacity = interpolate(
    local,
    [0, fade, durationFrames - fade, durationFrames],
    [0, 1, 1, 0],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
  );
  // subtitleは遅れて表示
  const subReveal = interpolate(local, [18, 44], [100, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const subOpacity = interpolate(local, [18, 40], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const color = toneColor(tone);
  const accent = toneAccent(tone);
  const shadow = toneShadow(tone);
  const isLeft = align === 'left';

  return (
    <AbsoluteFill
      style={{
        justifyContent: 'center',
        alignItems: isLeft ? 'flex-start' : 'center',
        flexDirection: 'column',
        paddingLeft: isLeft ? 160 : 0,
        opacity: groupOpacity,
      }}
    >
      <div
        style={{
          fontFamily: serifFamily,
          fontSize: 96,
          letterSpacing: '0.14em',
          color,
          lineHeight: 1.3,
          textShadow: shadow,
          textAlign: isLeft ? 'left' : 'center',
          clipPath: `inset(0 ${reveal}% 0 0)`,
          whiteSpace: 'pre-line',
        }}
      >
        {title}
      </div>
      {subtitle ? (
        <div
          style={{
            fontFamily: serifFamily,
            fontSize: 34,
            letterSpacing: '0.34em',
            color: accent,
            marginTop: 18,
            paddingLeft: '0.34em',
            textShadow: shadow,
            textAlign: isLeft ? 'left' : 'center',
            opacity: subOpacity,
            clipPath: `inset(0 ${subReveal}% 0 0)`,
          }}
        >
          {subtitle}
        </div>
      ) : null}
    </AbsoluteFill>
  );
};
