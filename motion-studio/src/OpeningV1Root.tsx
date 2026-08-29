import {AbsoluteFill, Composition} from 'remotion';
import {OpeningV1} from './compositions/opening/OpeningV1';
import {OpeningV1AudioLayer} from './compositions/opening/OpeningV1AudioLayer';
import {openingV1TotalSec} from './data/openingV1';
import {video} from './data/theme';
import {openingV1Authority} from './data/openingV1Authority';

const OpeningV1Composition = () => (
  <>
    <OpeningV1 />
    <OpeningV1AudioLayer />
    {openingV1Authority.mode === 'DUMMY_PRODUCTION_SIMULATION' && (
      <AbsoluteFill style={{pointerEvents: 'none'}}>
        <div style={{position: 'absolute', right: 24, top: 20, padding: '8px 12px', background: 'rgba(8,18,34,0.78)', border: '1px solid rgba(255,205,96,0.72)', color: '#ffd56a', fontFamily: 'Helvetica Neue, Arial, sans-serif', fontSize: 12, fontWeight: 700, letterSpacing: '0.14em'}}>
          DUMMY PRODUCTION SIMULATION
        </div>
      </AbsoluteFill>
    )}
  </>
);

export const OpeningV1Root = () => (
  <Composition
    id="OpeningV1"
    component={OpeningV1Composition}
    durationInFrames={openingV1TotalSec * video.fps}
    fps={video.fps}
    width={video.width}
    height={video.height}
  />
);
