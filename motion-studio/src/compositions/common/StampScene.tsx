import {z} from 'zod';
import {zColor} from '@remotion/zod-types';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {PassportStampMark} from '../../components/opening/PassportStampMark';
import {PaperTexture} from '../../components/common/PaperTexture';
import {colors} from '../../data/theme';

export const stampSchema = z.object({
  text: z.string(),
  subText: z.string(),
  centerText: z.string(),
  size: z.number().min(200).max(1000),
  rotationDeg: z.number().min(-30).max(30),
  color: zColor(),
  inkRoughness: z.number().min(0).max(24),
  pressDelayFrames: z.number().min(0).max(120),
  seed: z.string(),
  background: z.enum(['transparent', 'paper']),
});

export type StampSceneProps = z.infer<typeof stampSchema>;

export const stampTestDefaults: StampSceneProps = {
  text: 'OKINAWA',
  subText: 'MEMORY FLIGHT',
  centerText: 'SS1024',
  size: 620,
  rotationDeg: -8,
  color: colors.roseGold,
  inkRoughness: 7,
  pressDelayFrames: 8,
  seed: 'stamp-test-01',
  background: 'transparent',
};

export const stampOkinawaDefaults: StampSceneProps = {
  ...stampTestDefaults,
  subText: 'MEMORY 01',
  seed: 'stamp-okinawa-01',
};

// ハンコが「ポンと押される」シーン。背景transparentで透過素材として書き出す。
export const StampScene = ({
  text,
  subText,
  centerText,
  size,
  rotationDeg,
  color,
  inkRoughness,
  pressDelayFrames,
  seed,
  background,
}: StampSceneProps) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = frame - pressDelayFrames;
  const press = spring({
    frame: t,
    fps,
    config: {damping: 16, stiffness: 190, mass: 0.8},
  });
  const scale = interpolate(press, [0, 1], [1.55, 1]);
  const settleRotation = interpolate(press, [0, 1], [-2.2, 0]);
  const opacity =
    t < 0
      ? 0
      : interpolate(t, [0, 3], [0, 1], {
          extrapolateRight: 'clamp',
        });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: background === 'paper' ? colors.beige : 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {background === 'paper' ? <PaperTexture opacity={0.06} id="stamp-paper" /> : null}
      <div
        style={{
          transform: `scale(${scale}) rotate(${rotationDeg + settleRotation}deg)`,
          opacity,
        }}
      >
        <PassportStampMark
          text={text}
          subText={subText}
          centerText={centerText}
          size={size}
          color={color}
          inkRoughness={inkRoughness}
          seed={seed}
          idSuffix="scene"
        />
      </div>
    </AbsoluteFill>
  );
};
