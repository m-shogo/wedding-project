import {Composition} from 'remotion';
import {ProfileV1DeparturePreview} from './compositions/profile/ProfileV1DeparturePreview';
import {video} from './data/theme';

export const ProfileV1Root = () => (
  <Composition
    id="ProfileV1DeparturePreview"
    component={ProfileV1DeparturePreview}
    durationInFrames={10 * video.fps}
    fps={video.fps}
    width={video.width}
    height={video.height}
  />
);
