import {Composition} from 'remotion';
import {Start129Composition, start129DefaultProps} from './compositions/start129/Start129Composition';
import {START_129_DURATION_FRAMES, START_129_FPS} from './data/start129/sections';

const WIDTH = 1920;
const HEIGHT = 1080;

const variants: Array<{variant: 'A' | 'B' | 'C'}> = [{variant: 'A'}, {variant: 'B'}, {variant: 'C'}];

export const Start129Root = () => (
  <>
    {variants.map(({variant}) => (
      <Composition
        key={`${variant}-clean`}
        id={`Start129-${variant}-Clean`}
        component={Start129Composition}
        durationInFrames={START_129_DURATION_FRAMES}
        fps={START_129_FPS}
        width={WIDTH}
        height={HEIGHT}
        defaultProps={{...start129DefaultProps, variant, reviewMode: false}}
      />
    ))}
    {variants.map(({variant}) => (
      <Composition
        key={`${variant}-guide`}
        id={`Start129-${variant}-Guide`}
        component={Start129Composition}
        durationInFrames={START_129_DURATION_FRAMES}
        fps={START_129_FPS}
        width={WIDTH}
        height={HEIGHT}
        defaultProps={{...start129DefaultProps, variant, reviewMode: true}}
      />
    ))}
  </>
);
