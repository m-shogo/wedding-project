import {z} from 'zod';
import {zColor} from '@remotion/zod-types';
import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {routePath, routes} from '../../data/routes';
import {RouteLine} from '../../components/opening/RouteLine';
import {PlaneOnRoute} from '../../components/opening/PlaneOnRoute';
import {CityMarker} from '../../components/opening/CityMarker';
import {PaperTexture} from '../../components/common/PaperTexture';
import {colors} from '../../data/theme';
import {serifFamily} from '../../data/fonts';

export const flightMapSchema = z.object({
  routeId: z.enum([
    'naritaToOkinawa',
    'okinawaToSeoul',
    'seoulToHawaii',
    'hawaiiToYokohama',
  ]),
  lineColor: zColor(),
  lineWidth: z.number().min(2).max(20),
  planeColor: zColor(),
  planeSize: z.number().min(10).max(80),
  zoomTo: z.number().min(1).max(1.2),
  travelStartFrame: z.number().min(0),
  travelEndHoldFrames: z.number().min(0),
  showHeader: z.boolean(),
  headerText: z.string(),
});

export type FlightMapRouteProps = z.infer<typeof flightMapSchema>;

export const flightMapNaritaOkinawaDefaults: FlightMapRouteProps = {
  routeId: 'naritaToOkinawa',
  lineColor: colors.roseGold,
  lineWidth: 6,
  planeColor: colors.navy,
  planeSize: 30,
  zoomTo: 1.06,
  travelStartFrame: 30,
  travelEndHoldFrames: 50,
  showHeader: true,
  headerText: 'MEMORY FLIGHT 1024',
};

// 抽象的なベージュ地図の上を、紙飛行機が航路を描きながら進む。
export const FlightMapRoute = ({
  routeId,
  lineColor,
  lineWidth,
  planeColor,
  planeSize,
  zoomTo,
  travelStartFrame,
  travelEndHoldFrames,
  showHeader,
  headerText,
}: FlightMapRouteProps) => {
  const frame = useCurrentFrame();
  const {width, height, durationInFrames} = useVideoConfig();
  const seg = routes[routeId];
  const d = routePath(seg);

  const progress = interpolate(
    frame,
    [travelStartFrame, durationInFrames - travelEndHoldFrames],
    [0, 1],
    {
      easing: Easing.inOut(Easing.cubic),
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    },
  );
  const zoom = interpolate(frame, [0, durationInFrames], [1, zoomTo]);
  const arrivalOpacity = interpolate(progress, [0.78, 0.95], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const headerOpacity = interpolate(frame, [10, 40], [0, 0.8], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{backgroundColor: colors.beige}}>
      <PaperTexture opacity={0.07} id="map-grain" />
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
          <RouteLine
            d={d}
            progress={progress}
            color={lineColor}
            strokeWidth={lineWidth}
            idSuffix={routeId}
          />
          <CityMarker
            x={seg.from.x}
            y={seg.from.y}
            label={seg.from.label}
            ringColor={colors.gold}
            dotColor={colors.navy}
            textColor={colors.navy}
            labelPosition="below"
          />
          <CityMarker
            x={seg.to.x}
            y={seg.to.y}
            label={seg.to.label}
            ringColor={colors.gold}
            dotColor={colors.navy}
            textColor={colors.navy}
            labelPosition="below"
            opacity={arrivalOpacity}
          />
          <PlaneOnRoute d={d} progress={progress} color={planeColor} size={planeSize} />
        </svg>
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
    </AbsoluteFill>
  );
};
