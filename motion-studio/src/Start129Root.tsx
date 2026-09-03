import {Composition} from 'remotion';
import {Start129Composition, start129DefaultProps} from './compositions/start129/Start129Composition';
import {START_129_DURATION_FRAMES, START_129_FPS} from './data/start129/sections';
import {TitleSequenceA, TitleSequenceB, TitleSequenceC} from './compositions/start129/TitleSequences';

const WIDTH = 1920;
const HEIGHT = 1080;

const variants: Array<{variant: 'A' | 'B' | 'C'}> = [{variant: 'A'}, {variant: 'B'}, {variant: 'C'}];

// PROTOTYPE-* : 音源未投入のためtiming未確定。still検証専用で、
// 129秒本編Compositionとは独立させている(docs/decisions/2026-08-25-
// start-129-music-driven-blocker.md参照)。
const titleSequences = [
  {id: 'PROTOTYPE-TitleBuild-A', Comp: TitleSequenceA},
  {id: 'PROTOTYPE-TitleBuild-B', Comp: TitleSequenceB},
  {id: 'PROTOTYPE-TitleBuild-C', Comp: TitleSequenceC},
];

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
    {titleSequences.map(({id, Comp}) => (
      <Composition key={id} id={id} component={Comp} durationInFrames={48} fps={START_129_FPS} width={WIDTH} height={HEIGHT} />
    ))}
  </>
);
