import {Composition} from 'remotion';
import {ProfileV1} from './compositions/profile/ProfileV1';
import {ProfileV1DeparturePreview} from './compositions/profile/ProfileV1DeparturePreview';
import {ProfileV1FullStructurePreview} from './compositions/profile/ProfileV1FullStructurePreview';
import {ProfileV1RealMediaPreview} from './compositions/profile/ProfileV1RealMediaPreview';
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
    <Composition
      id="ProfileV1RealMediaPreview"
      component={ProfileV1RealMediaPreview}
      durationInFrames={30 * video.fps}
      fps={video.fps}
      width={video.width}
      height={video.height}
    />
    <Composition
      id="ProfileV1"
      component={ProfileV1}
      durationInFrames={30 * video.fps}
      fps={video.fps}
      width={video.width}
      height={video.height}
    />
  </>
);
