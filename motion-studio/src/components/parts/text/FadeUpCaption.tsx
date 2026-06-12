import {z} from 'zod';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {serifFamily} from '../../../data/fonts';
import {toneColor, toneAccent, toneShadow} from './tone';

// 写真下の短文・場面説明・さりげない字幕に差し込む再利用パーツ。
// フェードインしながら少しだけ下から上に動く。bottom時はセーフエリアを守る。
export const fadeUpCaptionSchema = z.object({
  text: z.string().min(1),
  subText: z.string().optional(),
  position: z.enum(['center', 'bottom']),
  startFrame: z.number().min(0),
  // fade=16×2=32フレーム消費。実用上の最小値はrise完了分を含め40
  durationFrames: z.number().min(40),
  tone: z.enum(['ivory', 'navy', 'gold']),
  size: z.enum(['sm', 'md', 'lg']),
});

export type FadeUpCaptionProps = z.infer<typeof fadeUpCaptionSchema>;

const sizeMap = {sm: 34, md: 52, lg: 74} as const;
// 会場スクリーン下端に文字が寄りすぎないためのセーフエリア(約9%)
const SAFE_BOTTOM = 100;

export const FadeUpCaption = ({
  text,
  subText,
  position,
  startFrame,
  durationFrames,
  tone,
  size,
}: FadeUpCaptionProps) => {
  const frame = useCurrentFrame();
  const local = frame - startFrame;
  const fade = 16;

  const opacity = interpolate(
    local,
    [0, fade, durationFrames - fade, durationFrames],
    [0, 1, 1, 0],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
  );
  const rise = interpolate(local, [0, fade + 8], [18, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const mainSize = sizeMap[size];
  const color = toneColor(tone);
  const accent = toneAccent(tone);
  const shadow = toneShadow(tone);

  return (
    <AbsoluteFill
      style={{
        justifyContent: position === 'bottom' ? 'flex-end' : 'center',
        alignItems: 'center',
        flexDirection: 'column',
        paddingBottom: position === 'bottom' ? SAFE_BOTTOM : 0,
      }}
    >
      <div
        style={{
          opacity,
          transform: `translateY(${rise}px)`,
          textAlign: 'center',
        }}
      >
        <div
          style={{
            fontFamily: serifFamily,
            fontSize: mainSize,
            letterSpacing: '0.1em',
            color,
            lineHeight: 1.5,
            textShadow: shadow,
            whiteSpace: 'pre-line',
          }}
        >
          {text}
        </div>
        {subText ? (
          <div
            style={{
              fontFamily: serifFamily,
              fontSize: mainSize * 0.42,
              letterSpacing: '0.3em',
              color: accent,
              marginTop: 14,
              paddingLeft: '0.3em',
              textShadow: shadow,
            }}
          >
            {subText}
          </div>
        ) : null}
      </div>
    </AbsoluteFill>
  );
};
