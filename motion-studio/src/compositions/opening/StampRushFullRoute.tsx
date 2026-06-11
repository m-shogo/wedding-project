import {z} from 'zod';
import {zColor} from '@remotion/zod-types';
import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {getLength, getPointAtLength, getTangentAtLength} from '@remotion/paths';
import {cities, routePath, routes} from '../../data/routes';
import {RouteLine} from '../../components/opening/RouteLine';
import {CityMarker} from '../../components/opening/CityMarker';
import {PaperPlane} from '../../components/common/PaperPlane';
import {PassportStampMark} from '../../components/opening/PassportStampMark';
import {PaperTexture} from '../../components/common/PaperTexture';
import {colors} from '../../data/theme';
import {serifFamily} from '../../data/fonts';

export const stampRushSchema = z.object({
  lineColor: zColor(),
  lineWidth: z.number().min(2).max(20),
  planeColor: zColor(),
  planeSize: z.number().min(10).max(80),
  stampColor: zColor(),
  stampSize: z.number().min(120).max(420),
  zoomTo: z.number().min(1).max(1.15),
  showHeader: z.boolean(),
  headerText: z.string(),
  showFinalText: z.boolean(),
  finalText: z.string(),
  stamps: z
    .array(
      z.object({
        text: z.string(),
        subText: z.string(),
        x: z.number(),
        y: z.number(),
        rotationDeg: z.number().min(-30).max(30),
      }),
    )
    .length(3),
});

export type StampRushProps = z.infer<typeof stampRushSchema>;

// 区間ごとのタイムテーブル(フレーム)。
// 各都市到着でいったん止まり、ハンコが押されてから次の区間へ進む。
// ハワイ(PROPOSAL)だけ少し長くタメる。
const START = 30;
const SEG_FRAMES = [120, 100, 130, 120];
const PAUSES = [22, 22, 36];

const segStarts = (() => {
  const starts: number[] = [];
  let t = START;
  for (let i = 0; i < SEG_FRAMES.length; i++) {
    starts.push(t);
    t += SEG_FRAMES[i] + (PAUSES[i] ?? 0);
  }
  return starts;
})();

const ARRIVAL_FRAME = segStarts[3] + SEG_FRAMES[3];

const segs = [
  routes.naritaToOkinawa,
  routes.okinawaToSeoul,
  routes.seoulToHawaii,
  routes.hawaiiToYokohama,
];
const paths = segs.map(routePath);
const lengths = paths.map(getLength);

// 全ルートを一筆で巡り、都市ごとにスタンプが押される章ダイジェスト。
// 沖縄・韓国を写真章にせず省略する場合の主役シーン。
export const StampRushFullRoute = ({
  lineColor,
  lineWidth,
  planeColor,
  planeSize,
  stampColor,
  stampSize,
  zoomTo,
  showHeader,
  headerText,
  showFinalText,
  finalText,
  stamps,
}: StampRushProps) => {
  const frame = useCurrentFrame();
  const {width, height, fps, durationInFrames} = useVideoConfig();

  const segProgress = segs.map((_, i) =>
    interpolate(frame, [segStarts[i], segStarts[i] + SEG_FRAMES[i]], [0, 1], {
      easing: Easing.inOut(Easing.cubic),
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }),
  );

  // 飛行機は現在進行中(または直近)の区間の上に置く
  let activeSeg = 0;
  for (let i = 0; i < segs.length; i++) {
    if (frame >= segStarts[i]) {
      activeSeg = i;
    }
  }
  const local = Math.min(Math.max(segProgress[activeSeg], 0.0001), 1);
  const planePoint = getPointAtLength(paths[activeSeg], lengths[activeSeg] * local);
  const planeTangent = getTangentAtLength(paths[activeSeg], lengths[activeSeg] * local);
  const planeAngle = (Math.atan2(planeTangent.y, planeTangent.x) * 180) / Math.PI;

  const zoom = interpolate(frame, [0, durationInFrames], [1, zoomTo]);
  const headerOpacity = interpolate(frame, [10, 40], [0, 0.8], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // 各都市マーカー: 到着が近づくとフェードイン
  const destCities = [cities.okinawa, cities.seoul, cities.hawaii, cities.yokohama];
  const destOpacity = destCities.map((_, i) =>
    interpolate(segProgress[i], [0.72, 0.92], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }),
  );

  // スタンプ: 各区間の到着フレームで押される(沖縄/ソウル/ハワイ)
  const stampTriggers = [0, 1, 2].map((i) => segStarts[i] + SEG_FRAMES[i]);

  // 横浜到着: リングがふわっと広がる
  const arrivalPulse = interpolate(frame, [ARRIVAL_FRAME, ARRIVAL_FRAME + 40], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const finalTextOpacity = interpolate(
    frame,
    [ARRIVAL_FRAME + 16, ARRIVAL_FRAME + 50],
    [0, 1],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
  );

  return (
    <AbsoluteFill style={{backgroundColor: colors.beige}}>
      <PaperTexture opacity={0.07} id="rush-grain" />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at center, rgba(28,42,68,0) 55%, rgba(28,42,68,0.14) 100%)',
        }}
      />
      <AbsoluteFill style={{transform: `scale(${zoom})`}}>
        <svg width={width} height={height} style={{position: 'absolute', inset: 0}}>
          {segs.map((seg, i) => (
            <RouteLine
              key={seg.id}
              d={paths[i]}
              progress={segProgress[i]}
              color={lineColor}
              strokeWidth={lineWidth}
              idSuffix={`rush-${seg.id}`}
            />
          ))}
          <CityMarker
            x={cities.narita.x}
            y={cities.narita.y}
            label={cities.narita.label}
            ringColor={colors.gold}
            dotColor={colors.navy}
            textColor={colors.navy}
            labelPosition="above"
          />
          {destCities.map((city, i) => (
            <CityMarker
              key={city.id}
              x={city.x}
              y={city.y}
              label={city.label}
              ringColor={colors.gold}
              dotColor={colors.navy}
              textColor={colors.navy}
              labelPosition={city.id === 'seoul' ? 'above' : 'below'}
              opacity={destOpacity[i]}
            />
          ))}
          {arrivalPulse > 0 ? (
            <circle
              cx={cities.yokohama.x}
              cy={cities.yokohama.y}
              r={16 + arrivalPulse * 30}
              fill="none"
              stroke={colors.gold}
              strokeWidth={3}
              opacity={(1 - arrivalPulse) * 0.9}
            />
          ) : null}
          <g transform={`translate(${planePoint.x}, ${planePoint.y})`}>
            <PaperPlane size={planeSize} color={planeColor} angleDeg={planeAngle} />
          </g>
        </svg>

        {stamps.map((stamp, i) => {
          const t = frame - stampTriggers[i];
          if (t < 0) {
            return null;
          }
          const press = spring({
            frame: t,
            fps,
            config: {damping: 15, stiffness: 200, mass: 0.7},
          });
          const scale = interpolate(press, [0, 1], [1.5, 1]);
          const opacity = interpolate(t, [0, 3], [0, 1], {extrapolateRight: 'clamp'});
          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: stamp.x - stampSize / 2,
                top: stamp.y - stampSize / 2,
                transform: `scale(${scale}) rotate(${stamp.rotationDeg}deg)`,
                opacity,
              }}
            >
              <PassportStampMark
                text={stamp.text}
                subText={stamp.subText}
                centerText="SS1024"
                size={stampSize}
                color={stampColor}
                inkRoughness={6}
                seed={`rush-${i}-${stamp.text}`}
                idSuffix={`rush-${i}`}
              />
            </div>
          );
        })}
      </AbsoluteFill>

      {showHeader ? (
        <div
          style={{
            position: 'absolute',
            top: 64,
            left: 0,
            right: 0,
            textAlign: 'center',
            fontFamily: serifFamily,
            fontSize: 30,
            letterSpacing: '0.4em',
            color: colors.navy,
            opacity: headerOpacity,
          }}
        >
          {headerText}
        </div>
      ) : null}
      {showFinalText ? (
        <div
          style={{
            position: 'absolute',
            bottom: 88,
            left: 0,
            right: 0,
            textAlign: 'center',
            fontFamily: serifFamily,
            fontSize: 38,
            letterSpacing: '0.3em',
            color: colors.navy,
            opacity: finalTextOpacity,
            paddingLeft: '0.3em',
          }}
        >
          {finalText}
        </div>
      ) : null}
    </AbsoluteFill>
  );
};
