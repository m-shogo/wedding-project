import {z} from 'zod';
import {AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {colors} from '../../data/theme';
import {serifFamily} from '../../data/fonts';
import {PaperTexture} from '../../components/common/PaperTexture';
import {PhotoCard} from '../../components/common/PhotoCard';

export const singlePhotoSchema = z.object({
  photo: z.string().nullable(),
  caption: z.string(),
  subCaption: z.string(),
  zoomDirection: z.enum(['in', 'out']),
  background: z.enum(['beige', 'navy']),
  cardWidth: z.number().min(400).max(1700),
  cardHeight: z.number().min(400).max(980),
});

export type SinglePhotoProps = z.infer<typeof singlePhotoSchema>;

// 写真1枚をゆっくり見せる主役テンプレ。プロフィールの写真章の基本形。
// キーフレームは1枚につき1つの動き(ズームinかout)だけ。
export const SinglePhoto = ({
  photo,
  caption,
  subCaption,
  zoomDirection,
  background,
  cardWidth,
  cardHeight,
}: SinglePhotoProps) => {
  const frame = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const bg = background === 'navy' ? colors.navyDeep : colors.beige;
  const mainColor = background === 'navy' ? colors.ivory : colors.navy;
  const accentColor = background === 'navy' ? colors.goldLight : '#8C7A4F';

  const zoom =
    zoomDirection === 'in'
      ? interpolate(frame, [0, durationInFrames], [1, 1.06])
      : interpolate(frame, [0, durationInFrames], [1.06, 1]);
  const enter = interpolate(frame, [0, 18], [0, 1], {extrapolateRight: 'clamp'});
  const captionOpacity = interpolate(frame, [20, 46], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{backgroundColor: bg}}>
      <PaperTexture opacity={0.05} id="single-grain" />
      <AbsoluteFill
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          transform: `scale(${zoom})`,
          opacity: enter,
        }}
      >
        <PhotoCard
          photo={photo}
          width={cardWidth}
          height={cardHeight}
          rotationDeg={0}
          cardRadius={8}
          shadowStrength={1}
        />
      </AbsoluteFill>
      <div
        style={{
          position: 'absolute',
          bottom: 64,
          left: 0,
          right: 0,
          textAlign: 'center',
          opacity: captionOpacity,
        }}
      >
        <div
          style={{
            fontFamily: serifFamily,
            fontSize: 40,
            letterSpacing: '0.14em',
            color: mainColor,
          }}
        >
          {caption}
        </div>
        {subCaption ? (
          <div
            style={{
              fontFamily: serifFamily,
              fontSize: 24,
              letterSpacing: '0.32em',
              color: accentColor,
              marginTop: 8,
              paddingLeft: '0.32em',
            }}
          >
            {subCaption}
          </div>
        ) : null}
      </div>
    </AbsoluteFill>
  );
};
