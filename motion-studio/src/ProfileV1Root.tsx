import {Composition} from 'remotion';
import {ProfileV1DeparturePreview} from './compositions/profile/ProfileV1DeparturePreview';
import {ProfileV1FullStructurePreview} from './compositions/profile/ProfileV1FullStructurePreview';
import {video} from './data/theme';

export const ProfileV1Root = () => (
  <>
    <Composition
      id="ProfileV1DeparturePreview"
      component={ProfileV1DeparturePreview}
      durationInFrames={10 * video.fps}
      fps={video.fps}
      width={video.width}
      height={video.height}
    />
    <Composition
      id="ProfileV1FullStructurePreview"
      component={ProfileV1FullStructurePreview}
      durationInFrames={30 * video.fps}
      fps={video.fps}
      width={video.width}
      height={video.height}
    />
  </>
);
