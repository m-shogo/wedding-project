import {z} from 'zod';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {colors} from '../../data/theme';
import {serifFamily} from '../../data/fonts';
import {PaperTexture} from '../../components/common/PaperTexture';

export const chapterTitleSchema = z.object({
  chapterLabel: z.string(),
  titleEn: z.string().min(1),
  titleJa: z.string(),
  background: z.enum(['beige', 'navy']),
});

export type ChapterTitleProps = z.infer<typeof chapterTitleSchema>;

// プロフィールムービーの章タイトル。金の罫線が伸びて題字が現れる。
export const ChapterTitle = ({
  chapterLabel,
  titleEn,
  titleJa,
  background,
}: ChapterTitleProps) => {
  const frame = useCurrentFrame();
  const bg = background === 'navy' ? colors.navyDeep : colors.beige;
  const mainColor = background === 'navy' ? colors.ivory : colors.navy;
  const accentColor = background === 'navy' ? colors.goldLight : '#8C7A4F';

  const lineWidth = interpolate(frame, [6, 40], [0, 180], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const labelOpacity = interpolate(frame, [14, 34], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const titleOpacity = interpolate(frame, [26, 52], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const jaOpacity = interpolate(frame, [40, 66], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{backgroundColor: bg}}>
      <PaperTexture opacity={0.05} id="chapter-grain" />
      <AbsoluteFill
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          gap: 26,
        }}
      >
        <div
          style={{
            fontFamily: serifFamily,
            fontSize: 28,
            letterSpacing: '0.5em',
            color: accentColor,
            opacity: labelOpacity,
            paddingLeft: '0.5em',
          }}
        >
          {chapterLabel}
        </div>
        <div
          style={{
            fontFamily: serifFamily,
            fontSize: 110,
            letterSpacing: '0.16em',
            color: mainColor,
            opacity: titleOpacity,
            paddingLeft: '0.16em',
          }}
        >
          {titleEn}
        </div>
        <div style={{width: lineWidth, borderTop: `1.5px solid ${colors.gold}`}} />
        {titleJa ? (
          <div
            style={{
              fontFamily: serifFamily,
              fontSize: 36,
              letterSpacing: '0.4em',
              color: accentColor,
              opacity: jaOpacity,
              paddingLeft: '0.4em',
            }}
          >
            {titleJa}
          </div>
        ) : null}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
