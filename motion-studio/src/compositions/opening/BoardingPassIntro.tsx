import {z} from 'zod';
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {BoardingPassCard} from '../../components/opening/BoardingPassCard';
import {CinematicBars} from '../../components/common/CinematicBars';
import {PaperTexture} from '../../components/common/PaperTexture';
import {colors} from '../../data/theme';
import {concept} from '../../data/concept';

export const boardingPassSchema = z.object({
  variant: z.enum(['ivory', 'navy']),
  title: z.string(),
  flightNumber: z.string(),
  date: z.string(),
  seat: z.string(),
  gate: z.string(),
  passenger: z.string(),
  departureCode: z.string(),
  departureName: z.string(),
  arrivalCode: z.string(),
  arrivalName: z.string(),
  zoomTo: z.number().min(1).max(1.2),
  showCinematicBars: z.boolean(),
});

export type BoardingPassIntroProps = z.infer<typeof boardingPassSchema>;

export const boardingPassDefaults: BoardingPassIntroProps = {
  variant: 'ivory',
  title: concept.title,
  flightNumber: concept.flightNumber,
  date: concept.date,
  seat: concept.seat,
  gate: concept.gate,
  passenger: concept.passenger,
  departureCode: concept.departureCode,
  departureName: concept.departureName,
  arrivalCode: concept.arrivalCode,
  arrivalName: concept.arrivalName,
  zoomTo: 1.045,
  showCinematicBars: true,
};

// 暗いネイビーの空気の中に搭乗券がゆっくり浮かび上がるイントロ。
export const BoardingPassIntro = ({
  variant,
  title,
  flightNumber,
  date,
  seat,
  gate,
  passenger,
  departureCode,
  departureName,
  arrivalCode,
  arrivalName,
  zoomTo,
  showCinematicBars,
}: BoardingPassIntroProps) => {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();

  const enter = spring({frame, fps, config: {damping: 200, stiffness: 60}});
  const translateY = interpolate(enter, [0, 1], [90, 0]);
  const opacity = interpolate(enter, [0, 0.5], [0, 1], {
    extrapolateRight: 'clamp',
  });
  const zoom = interpolate(frame, [0, durationInFrames], [1, zoomTo]);
  const sweepX = interpolate(frame, [0, durationInFrames], [-420, 720]);

  return (
    <AbsoluteFill style={{backgroundColor: colors.navyDeep}}>
      <div
        style={{
          position: 'absolute',
          width: 1600,
          height: 1600,
          top: -260,
          left: sweepX,
          background:
            'radial-gradient(circle, rgba(247,242,233,0.09) 0%, rgba(247,242,233,0) 60%)',
        }}
      />
      <PaperTexture opacity={0.04} id="boarding-grain" />
      <AbsoluteFill
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          transform: `scale(${zoom})`,
        }}
      >
        <div style={{transform: `translateY(${translateY}px)`, opacity}}>
          <BoardingPassCard
            variant={variant}
            title={title}
            flightNumber={flightNumber}
            date={date}
            seat={seat}
            gate={gate}
            passenger={passenger}
            departureCode={departureCode}
            departureName={departureName}
            arrivalCode={arrivalCode}
            arrivalName={arrivalName}
          />
        </div>
      </AbsoluteFill>
      {showCinematicBars ? <CinematicBars /> : null}
    </AbsoluteFill>
  );
};
