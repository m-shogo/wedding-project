import {Composition} from 'remotion';
import {
  StartWeddingEditComposition,
  startWeddingEditDefaultProps,
} from './compositions/startWeddingEdit/StartWeddingEditComposition';
import {P017EchoComparison} from './compositions/startWeddingEdit/P017EchoComparison';
import {weddingEditDurationInFrames, weddingEditFps} from './data/startWeddingEdit/generated';

const WIDTH = 1920;
const HEIGHT = 1080;

const variants: Array<'A' | 'B' | 'C'> = ['A', 'B', 'C'];

export const StartWeddingEditRoot = () => (
  <>
    {variants.map((variant) => (
      <Composition
        key={`${variant}-clean`}
        id={`StartWeddingEdit-${variant}-Clean`}
        component={StartWeddingEditComposition}
        durationInFrames={weddingEditDurationInFrames}
        fps={weddingEditFps}
        width={WIDTH}
        height={HEIGHT}
        defaultProps={{...startWeddingEditDefaultProps, variant, reviewMode: false}}
      />
    ))}
    {variants.map((variant) => (
      <Composition
        key={`${variant}-guide`}
        id={`StartWeddingEdit-${variant}-Guide`}
        component={StartWeddingEditComposition}
        durationInFrames={weddingEditDurationInFrames}
        fps={weddingEditFps}
        width={WIDTH}
        height={HEIGHT}
        defaultProps={{...startWeddingEditDefaultProps, variant, reviewMode: true}}
      />
    ))}
    {/* TASK2(2026-08-27): P017のecho/caption card重なりについて、人間がA/B/C/Dから
        選べる比較用composition。本番のStartWeddingEdit-*-Cleanは変更しない。 */}
    <Composition
      id="P017EchoComparison"
      component={P017EchoComparison}
      durationInFrames={90}
      fps={weddingEditFps}
      width={WIDTH}
      height={HEIGHT}
    />
  </>
);
