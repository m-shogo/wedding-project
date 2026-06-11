import {z} from 'zod';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {PhotoCard} from '../../components/common/PhotoCard';
import {PaperTexture} from '../../components/common/PaperTexture';
import {colors} from '../../data/theme';
import {serifFamily} from '../../data/fonts';
import {memories} from '../../data/memories';

export const photoCardSchema = z.object({
  label: z.string(),
  title: z.string(),
  photos: z.array(z.string().nullable()).length(3),
  background: z.enum(['beige', 'navy', 'transparent']),
  maxRotationDeg: z.number().min(0).max(3),
  cardRadius: z.number().min(0).max(24),
  shadowStrength: z.number().min(0).max(2),
  staggerFrames: z.number().min(0).max(60),
  zoomTo: z.number().min(1).max(1.15),
});

export type PhotoCardSceneProps = z.infer<typeof photoCardSchema>;

export const photoCardOkinawaDefaults: PhotoCardSceneProps = {
  label: memories.okinawa.label,
  title: memories.okinawa.title,
  photos: [...memories.okinawa.photos],
  background: 'beige',
  maxRotationDeg: 3,
  cardRadius: 8,
  shadowStrength: 1,
  staggerFrames: 14,
  zoomTo: 1.05,
};

// 写真3枚が時間差で静かに立ち上がる高級カード演出。
export const PhotoCardScene = ({
  label,
  title,
  photos,
  background,
  maxRotationDeg,
  cardRadius,
  shadowStrength,
  staggerFrames,
  zoomTo,
}: PhotoCardSceneProps) => {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();

  const bg =
    background === 'beige'
      ? colors.beige
      : background === 'navy'
        ? colors.navyDeep
        : 'transparent';
  const textColor = background === 'navy' ? colors.ivory : colors.navy;
  const labelColor = background === 'navy' ? colors.goldLight : '#8C7A4F';

  const zoom = interpolate(frame, [0, durationInFrames], [1, zoomTo]);
  const rotations = [-1, 0.45, 1].map((r) => r * maxRotationDeg);
  const offsetsY = [24, -10, 16];

  const captionOpacity = interpolate(
    frame,
    [staggerFrames * 2 + 26, staggerFrames * 2 + 56],
    [0, 1],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
  );

  return (
    <AbsoluteFill style={{backgroundColor: bg}}>
      {background !== 'transparent' ? (
        <PaperTexture opacity={0.05} id="photo-grain" />
      ) : null}
      <AbsoluteFill
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          transform: `scale(${zoom})`,
        }}
      >
        <div style={{display: 'flex', gap: 64, alignItems: 'center'}}>
          {photos.map((photo, i) => {
            const enter = spring({
              frame: frame - i * staggerFrames,
              fps,
              config: {damping: 200, stiffness: 70},
            });
            const translateY = interpolate(enter, [0, 1], [80, 0]);
            const opacity = interpolate(enter, [0, 0.4], [0, 1], {
              extrapolateRight: 'clamp',
            });
            return (
              <div
                key={i}
                style={{
                  transform: `translateY(${translateY + offsetsY[i]}px)`,
                  opacity,
                }}
              >
                <PhotoCard
                  photo={photo}
                  width={460}
                  height={580}
                  rotationDeg={rotations[i]}
                  cardRadius={cardRadius}
                  shadowStrength={shadowStrength}
                />
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
      <div
        style={{
          position: 'absolute',
          bottom: 84,
          left: 0,
          right: 0,
          textAlign: 'center',
          opacity: captionOpacity,
        }}
      >
        <div
          style={{
            fontFamily: serifFamily,
            fontSize: 26,
            letterSpacing: '0.42em',
            color: labelColor,
            paddingLeft: '0.42em',
          }}
        >
          {label}
        </div>
        <div
          style={{
            fontFamily: serifFamily,
            fontSize: 58,
            letterSpacing: '0.18em',
            color: textColor,
            marginTop: 10,
            paddingLeft: '0.18em',
          }}
        >
          {title}
        </div>
      </div>
    </AbsoluteFill>
  );
};
