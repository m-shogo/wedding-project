import {z} from 'zod';
import {AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {colors} from '../../data/theme';
import {serifFamily} from '../../data/fonts';
import {CinematicBars} from '../../components/common/CinematicBars';
import {PaperTexture} from '../../components/common/PaperTexture';

export const genericTitleSchema = z.object({
  // 改行は \n で入れる
  mainText: z.string().min(1),
  subText: z.string(),
  background: z.enum(['transparent', 'navy', 'beige']),
  mainSize: z.number().min(30).max(160),
  italic: z.boolean(),
  fadeInFrames: z.number().min(0).max(120),
  fadeOutFrames: z.number().min(0).max(120),
  showCinematicBars: z.boolean(),
});

export type GenericTitleProps = z.infer<typeof genericTitleSchema>;

// 汎用テロップ/題字。1-B「Ladies and gentlemen...」や5-B「Cabin crew...」用。
// background=transparentで書き出せば、どの映像にも重ねられる透過素材になる。
export const GenericTitle = ({
  mainText,
  subText,
  background,
  mainSize,
  italic,
  fadeInFrames,
  fadeOutFrames,
  showCinematicBars,
}: GenericTitleProps) => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();

  const opacity = interpolate(
    frame,
    [0, fadeInFrames, durationInFrames - fadeOutFrames, durationInFrames - 1],
    [0, 1, 1, 0],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
  );
  const rise = interpolate(frame, [0, fadeInFrames + 10], [16, 0], {
    extrapolateRight: 'clamp',
  });

  const bg =
    background === 'navy'
      ? colors.navyDeep
      : background === 'beige'
        ? colors.beige
        : 'transparent';
  const mainColor = background === 'beige' ? colors.navy : colors.ivory;
  const subColor = background === 'beige' ? '#8C7A4F' : colors.goldLight;
  // 透過で映像に重ねる前提のときだけ、読みやすさのため影を少し付ける
  const shadow =
    background === 'transparent' ? '0 2px 14px rgba(0,0,0,0.45)' : 'none';

  return (
    <AbsoluteFill style={{backgroundColor: bg}}>
      {background !== 'transparent' ? (
        <PaperTexture opacity={0.04} id="title-grain" />
      ) : null}
      <AbsoluteFill
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          gap: 34,
          opacity,
          transform: `translateY(${rise}px)`,
        }}
      >
        <div
          style={{
            fontFamily: serifFamily,
            fontStyle: italic ? 'italic' : 'normal',
            fontSize: mainSize,
            letterSpacing: '0.14em',
            color: mainColor,
            textAlign: 'center',
            lineHeight: 1.6,
            textShadow: shadow,
            whiteSpace: 'pre-line',
          }}
        >
          {mainText}
        </div>
        {subText ? (
          <div
            style={{
              fontFamily: serifFamily,
              fontSize: mainSize * 0.42,
              letterSpacing: '0.3em',
              color: subColor,
              textShadow: shadow,
              paddingLeft: '0.3em',
            }}
          >
            {subText}
          </div>
        ) : null}
      </AbsoluteFill>
      {showCinematicBars ? <CinematicBars /> : null}
    </AbsoluteFill>
  );
};
