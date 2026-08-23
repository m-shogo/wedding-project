import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import type {ReactNode} from 'react';
import {colors, fonts} from '../../data/theme';

const sansFamily = fonts.sans;

const SceneBase = ({children, dark = false}: {children: ReactNode; dark?: boolean}) => (
  <AbsoluteFill
    style={{
      backgroundColor: dark ? colors.navyDeep : colors.ivory,
      color: dark ? colors.ivory : colors.navy,
      overflow: 'hidden',
    }}
  >
    {children}
  </AbsoluteFill>
);

export const ArrivalRoute = ({durationFrames}: {durationFrames: number}) => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [4, Math.max(5, durationFrames - 6)], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <SceneBase>
      <AbsoluteFill style={{justifyContent: 'center', alignItems: 'center'}}>
        <div style={{width: 1180, position: 'relative', height: 150}}>
          <div
            style={{
              position: 'absolute',
              top: 74,
              left: 70,
              width: 1040,
              height: 1,
              backgroundColor: colors.beigeDark,
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: 72,
              left: 70,
              width: 1040 * progress,
              height: 4,
              backgroundColor: colors.roseGold,
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: 18,
              fontFamily: sansFamily,
              fontSize: 22,
              fontWeight: 600,
              letterSpacing: '0.1em',
            }}
          >
            HAWAII
          </div>
          <div
            style={{
              position: 'absolute',
              right: 0,
              top: 18,
              fontFamily: sansFamily,
              fontSize: 22,
              fontWeight: 600,
              letterSpacing: '0.1em',
            }}
          >
            YOKOHAMA
          </div>
        </div>
      </AbsoluteFill>
    </SceneBase>
  );
};

export const DocumentaryEndCard = ({durationFrames}: {durationFrames: number}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(
    frame,
    [0, 8, Math.max(9, durationFrames - 8), durationFrames],
    [0, 1, 1, 0],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'},
  );

  return (
    <SceneBase dark>
      <div
        style={{
          position: 'absolute',
          left: 72,
          bottom: 66,
          opacity,
          fontFamily: sansFamily,
        }}
      >
        <div
          style={{
            fontSize: 17,
            fontWeight: 650,
            letterSpacing: '0.16em',
            color: colors.goldLight,
          }}
        >
          YOKOHAMA
        </div>
        <div
          style={{
            marginTop: 10,
            fontSize: 34,
            fontWeight: 650,
            letterSpacing: '0.015em',
            color: colors.ivory,
          }}
        >
          2026.10.24
        </div>
      </div>
    </SceneBase>
  );
};
