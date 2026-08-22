import {Audio, Sequence, staticFile, useVideoConfig} from 'remotion';
import {audioPublicPath} from '../../data/assets';
import {openingV1EnabledSoundCues} from '../../data/openingV1Sound';

export const OpeningV1AudioLayer = () => {
  const {fps} = useVideoConfig();

  return (
    <>
      {openingV1EnabledSoundCues.map((cue) => {
        const from = Math.round(cue.startSec * fps);
        const durationInFrames = Math.max(1, Math.round((cue.endSec - cue.startSec) * fps));
        const audioPath = audioPublicPath(cue.assetId);

        return (
          <Sequence key={cue.id} from={from} durationInFrames={durationInFrames} name={`audio:${cue.id}`}>
            <Audio src={staticFile(`audio/${audioPath}`)} volume={cue.volume} />
          </Sequence>
        );
      })}
    </>
  );
};
