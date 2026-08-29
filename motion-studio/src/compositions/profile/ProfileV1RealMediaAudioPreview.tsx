import {AbsoluteFill, Audio, staticFile} from 'remotion';
import {ProfileV1RealMediaPreview} from './ProfileV1RealMediaPreview';

/**
 * Human real-media review video with the canonical Profile BGM.
 * This composition is intentionally rendered only through the production input gate,
 * which requires 17 canonical media slots plus CURRENT BGM receipt + Human rights CLEARED.
 * Visual smoke/still routes continue using the silent ProfileV1RealMediaPreview composition.
 */
export const ProfileV1RealMediaAudioPreview = () => (
  <AbsoluteFill>
    <ProfileV1RealMediaPreview />
    <Audio src={staticFile('audio/profile/bgm-main.mp3')} volume={0.64} />
  </AbsoluteFill>
);
