import {z} from 'zod';
import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {colors} from '../../data/theme';
import {serifFamily} from '../../data/fonts';
import {PaperTexture} from '../../components/common/PaperTexture';
import {RouteLine} from '../../components/opening/RouteLine';

export const timelineSchema = z.object({
  title: z.string(),
  events: z
    .array(
      z.object({
        year: z.string().min(1),
        label: z.string().min(1),
      }),
    )
    .min(2)
    .max(8),
  background: z.enum(['beige', 'navy']),
  travelStartFrame: z.number().min(0),
});

export type TimelineProps = z.infer<typeof timelineSchema>;

// 年表。航路と同じ点線が左から右へ伸び、通過した年から順に現れる。
// 新郎・新婦それぞれの歩み(Chapter 2)用。
export const TimelineScene = ({
  title,
  events,
  background,
  travelStartFrame,
}: TimelineProps) => {
  const frame = useCurrentFrame();
  const {width, height, durationInFrames} = useVideoConfig();
  const bg = background === 'navy' ? colors.navyDeep : colors.beige;
  const mainColor = background === 'navy' ? colors.ivory : colors.navy;
  const accentColor = background === 'navy' ? colors.goldLight : '#8C7A4F';

  const left = 260;
  const right = width - 260;
  const lineY = height * 0.56;
  const d = `M ${left} ${lineY} L ${right} ${lineY}`;

  const progress = interpolate(
    frame,
    [travelStartFrame, durationInFrames - 60],
    [0, 1],
    {
      easing: Easing.inOut(Easing.cubic),
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    },
  );
  const titleOpacity = interpolate(frame, [8, 34], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{backgroundColor: bg}}>
      <PaperTexture opacity={0.05} id="timeline-grain" />
      <div
        style={{
          position: 'absolute',
          top: 110,
          left: 0,
          right: 0,
          textAlign: 'center',
          fontFamily: serifFamily,
          fontSize: 44,
          letterSpacing: '0.34em',
          color: mainColor,
          opacity: titleOpacity,
          paddingLeft: '0.34em',
        }}
      >
        {title}
      </div>
      <svg width={width} height={height} style={{position: 'absolute', inset: 0}}>
        <RouteLine
          d={d}
          progress={progress}
          color={colors.roseGold}
          strokeWidth={5}
          idSuffix="timeline"
        />
        {events.map((ev, i) => {
          const t = events.length === 1 ? 0 : i / (events.length - 1);
          const x = left + (right - left) * t;
          const appear = interpolate(progress, [t - 0.02, t + 0.08], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });
          return (
            <g key={i} opacity={appear}>
              <circle cx={x} cy={lineY} r={13} fill="none" stroke={colors.gold} strokeWidth={2.5} />
              <circle cx={x} cy={lineY} r={5.5} fill={mainColor} />
              <text
                x={x}
                y={lineY - 44}
                textAnchor="middle"
                fontFamily={serifFamily}
                fontSize={34}
                letterSpacing="0.14em"
                fill={mainColor}
              >
                {ev.year}
              </text>
              <text
                x={x}
                y={lineY + 64}
                textAnchor="middle"
                fontFamily={serifFamily}
                fontSize={26}
                letterSpacing="0.1em"
                fill={accentColor}
              >
                {ev.label}
              </text>
            </g>
          );
        })}
      </svg>
    </AbsoluteFill>
  );
};
