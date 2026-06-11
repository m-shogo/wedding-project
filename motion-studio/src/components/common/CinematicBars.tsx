import type {CSSProperties} from 'react';
import {interpolate, useCurrentFrame} from 'remotion';

type Props = {
  height?: number;
  fadeInFrames?: number;
};

export const CinematicBars = ({height = 90, fadeInFrames = 20}: Props) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, fadeInFrames], [0, 1], {
    extrapolateRight: 'clamp',
  });
  const bar: CSSProperties = {
    position: 'absolute',
    left: 0,
    right: 0,
    height,
    background: '#000',
    opacity,
  };
  return (
    <>
      <div style={{...bar, top: 0}} />
      <div style={{...bar, bottom: 0}} />
    </>
  );
};
