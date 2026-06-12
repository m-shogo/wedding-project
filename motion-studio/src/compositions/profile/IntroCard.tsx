import {z} from 'zod';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {colors} from '../../data/theme';
import {serifFamily} from '../../data/fonts';
import {PaperTexture} from '../../components/common/PaperTexture';
import {PhotoCard} from '../../components/common/PhotoCard';

export const introCardSchema = z.object({
  name: z.string().min(1),
  relation: z.string(),
  comment: z.string(),
  photo: z.string().nullable(),
  background: z.enum(['beige', 'navy']),
});

export type IntroCardProps = z.infer<typeof introCardSchema>;

// 家族・友人・犬の紹介札。写真+名前+関係+ひとこと。
export const IntroCard = ({
  name,
  relation,
  comment,
  photo,
  background,
}: IntroCardProps) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const bg = background === 'navy' ? colors.navyDeep : colors.beige;
  const mainColor = background === 'navy' ? colors.ivory : colors.navy;
  const accentColor = background === 'navy' ? colors.goldLight : '#8C7A4F';

  const photoEnter = spring({frame, fps, config: {damping: 200, stiffness: 80}});
  const photoY = interpolate(photoEnter, [0, 1], [60, 0]);
  const photoOpacity = interpolate(photoEnter, [0, 0.4], [0, 1], {
    extrapolateRight: 'clamp',
  });
  const relationOpacity = interpolate(frame, [16, 38], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const nameOpacity = interpolate(frame, [26, 50], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const commentOpacity = interpolate(frame, [44, 70], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const ruleWidth = interpolate(frame, [30, 58], [0, 150], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{backgroundColor: bg}}>
      <PaperTexture opacity={0.05} id="intro-grain" />
      <AbsoluteFill
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 110,
        }}
      >
        <div style={{transform: `translateY(${photoY}px)`, opacity: photoOpacity}}>
          <PhotoCard
            photo={photo}
            width={520}
            height={640}
            rotationDeg={-2}
            cardRadius={8}
            shadowStrength={1}
          />
        </div>
        <div style={{maxWidth: 760}}>
          <div
            style={{
              fontFamily: serifFamily,
              fontSize: 26,
              letterSpacing: '0.42em',
              color: accentColor,
              opacity: relationOpacity,
            }}
          >
            {relation}
          </div>
          <div
            style={{
              fontFamily: serifFamily,
              fontSize: 96,
              letterSpacing: '0.12em',
              color: mainColor,
              marginTop: 16,
              opacity: nameOpacity,
            }}
          >
            {name}
          </div>
          <div
            style={{
              width: ruleWidth,
              borderTop: `1.5px solid ${colors.gold}`,
              margin: '26px 0',
            }}
          />
          <div
            style={{
              fontFamily: serifFamily,
              fontSize: 34,
              lineHeight: 1.8,
              letterSpacing: '0.06em',
              color: mainColor,
              opacity: commentOpacity,
              whiteSpace: 'pre-line',
            }}
          >
            {comment}
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
