import {Composition} from 'remotion';
import {OpeningV1} from './compositions/opening/OpeningV1';
import {openingV1TotalSec} from './data/openingV1';
import {video} from './data/theme';

export const OpeningV1Root = () => (
  <Composition
    id="OpeningV1"
    component={OpeningV1}
    durationInFrames={openingV1TotalSec * video.fps}
    fps={video.fps}
    width={video.width}
    height={video.height}
  />
);
