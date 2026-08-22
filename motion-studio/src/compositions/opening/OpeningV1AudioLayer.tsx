import {Audio, Sequence, staticFile, useVideoConfig} from 'remotion';
import {openingV1EnabledSoundCues} from '../../data/openingV1Sound';

export const OpeningV1AudioLayer = () => {
  const {fps} = useVideoConfig();

  return (
    <>
      {openingV1EnabledSoundCues.map((cue) => {
        const from = Math.round(cue.startSec * fps);
        const durationInFrames = Math.max(1, Math.round((cue.endSec - cue.startSec) * fps));

        return (
          <Sequence key={cue.id} from={from} durationInFrames={durationInFrames} name={`audio:${cue.id}`}>
            <Audio src={staticFile(`audio/opening/${cue.file}`)} volume={cue.volume} />
          </Sequence>
        );
      })}
    </>
  );
};
