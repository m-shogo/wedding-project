import React from 'react';
import {AbsoluteFill, Audio, staticFile} from 'remotion';
import {start129LocalAudioPath} from '../../data/start129/localAudioManifest.generated';
import {useLocalLyrics} from './useLocalLyrics';
import {StartShowcaseA} from './StartShowcaseA';
import {StartShowcaseB} from './StartShowcaseB';
import {StartShowcaseC} from './StartShowcaseC';

export type Start129Variant = 'A' | 'B' | 'C';

export type Start129CompositionProps = {
  variant: Start129Variant;
  reviewMode: boolean;
};

export const start129DefaultProps: Start129CompositionProps = {
  variant: 'A',
  reviewMode: false,
};

export const Start129Composition: React.FC<Start129CompositionProps> = ({variant, reviewMode}) => {
  const lyricSlots = useLocalLyrics();

  return (
    <AbsoluteFill>
      {start129LocalAudioPath ? <Audio src={staticFile(start129LocalAudioPath)} /> : null}
      {variant === 'A' ? <StartShowcaseA reviewMode={reviewMode} lyricSlots={lyricSlots} /> : null}
      {variant === 'B' ? <StartShowcaseB reviewMode={reviewMode} lyricSlots={lyricSlots} /> : null}
      {variant === 'C' ? <StartShowcaseC reviewMode={reviewMode} lyricSlots={lyricSlots} /> : null}
    </AbsoluteFill>
  );
};
