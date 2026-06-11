import {z} from 'zod';
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {PaperTexture} from '../../components/common/PaperTexture';
import {CinematicBars} from '../../components/common/CinematicBars';
import {colors} from '../../data/theme';
import {serifFamily} from '../../data/fonts';
import {concept} from '../../data/concept';

export const countdownSchema = z.object({
  countdownFrom: z.number().int().min(3).max(10),
  introText: z.string(),
  finalTop: z.string(),
  finalName: z.string(),
  numberSize: z.number().min(120).max(640),
  glowStrength: z.number().min(0).max(1),
  showIntro: z.boolean(),
  showCinematicBars: z.boolean(),
});

export type CountdownProps = z.infer<typeof countdownSchema>;

export const countdownDefaults: CountdownProps = {
  countdownFrom: 10,
  introText: 'Doors opening in...',
  finalTop: 'Please welcome',
  finalName: concept.couple,
  numberSize: 360,
  glowStrength: 0.5,
  showIntro: true,
  showCinematicBars: true,
};

const INTRO_FRAMES = 75;

// 入場前カウントダウン。数字は1秒(=fps)ちょうどで正確に切り替わる。
export const Countdown = ({
  countdownFrom,
  introText,
  finalTop,
  finalName,
  numberSize,
  glowStrength,
  showIntro,
  showCinematicBars,
}: CountdownProps) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const introFrames = showIntro ? INTRO_FRAMES : 0;
  const numbersFrames = countdownFrom * fps;
  const numFrame = frame - introFrames;
  const finalFrame = frame - introFrames - numbersFrames;

  const introOpacity = interpolate(
    frame,
    [0, 18, introFrames - 16, introFrames - 2],
    [0, 1, 1, 0],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
  );

  const inNumbers = numFrame >= 0 && numFrame < numbersFrames;
  const idx = Math.min(Math.floor(Math.max(numFrame, 0) / fps), countdownFrom - 1);
  const local = Math.max(numFrame, 0) - idx * fps;
  const currentNumber = countdownFrom - idx;
  const numberOpacity = interpolate(local, [0, 5, fps - 6, fps - 1], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const numberScale = interpolate(local, [0, fps], [1.06, 1.0]);

  const finalTopOpacity = interpolate(finalFrame, [8, 34], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const finalNameOpacity = interpolate(finalFrame, [28, 60], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const finalTracking = interpolate(finalFrame, [28, 120], [0.26, 0.34], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{backgroundColor: colors.navyDeep}}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(circle at 50% 46%, rgba(201,178,124,${
            0.16 * glowStrength
          }) 0%, rgba(201,178,124,0) 55%)`,
        }}
      />
      <PaperTexture opacity={0.04} id="countdown-grain" />

      {showIntro ? (
        <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center'}}>
          <span
            style={{
              fontFamily: serifFamily,
              fontStyle: 'italic',
              fontSize: 66,
              letterSpacing: '0.14em',
              color: colors.ivory,
              opacity: introOpacity,
            }}
          >
            {introText}
          </span>
        </AbsoluteFill>
      ) : null}

      {inNumbers ? (
        <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center'}}>
          <span
            style={{
              fontFamily: serifFamily,
              fontSize: numberSize,
              fontWeight: 500,
              color: colors.ivory,
              opacity: numberOpacity,
              transform: `scale(${numberScale})`,
              lineHeight: 1,
            }}
          >
            {currentNumber}
          </span>
        </AbsoluteFill>
      ) : null}

      {finalFrame >= 0 ? (
        <AbsoluteFill
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            gap: 44,
          }}
        >
          <span
            style={{
              fontFamily: serifFamily,
              fontStyle: 'italic',
              fontSize: 46,
              letterSpacing: '0.22em',
              color: colors.goldLight,
              opacity: finalTopOpacity,
            }}
          >
            {finalTop}
          </span>
          <span
            style={{
              fontFamily: serifFamily,
              fontSize: 112,
              fontWeight: 500,
              letterSpacing: `${finalTracking}em`,
              color: colors.ivory,
              opacity: finalNameOpacity,
              paddingLeft: `${finalTracking}em`,
            }}
          >
            {finalName}
          </span>
        </AbsoluteFill>
      ) : null}

      {showCinematicBars ? <CinematicBars /> : null}
    </AbsoluteFill>
  );
};
