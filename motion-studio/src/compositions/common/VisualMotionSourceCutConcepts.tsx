import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';

const CUT_FRAME = 45;

function ConceptBadge({label}: {label: string}) {
  return (
    <div style={{position: 'absolute', left: 28, bottom: 24, padding: '8px 12px', background: 'rgba(4,12,22,0.82)', border: '1px solid rgba(240,211,122,0.55)', color: '#f0d37a', fontFamily: 'Arial, sans-serif', fontSize: 14, letterSpacing: '0.11em'}}>
      {label} · REPRESENTATIVE CONCEPT / NOT ACTUAL
    </div>
  );
}

export function VisualMotionHardAccentConceptV1() {
  const frame = useCurrentFrame();
  const after = frame >= CUT_FRAME;
  return (
    <AbsoluteFill style={{background: after ? '#e9bd45' : '#071523', color: after ? '#071523' : '#f8f3e7', alignItems: 'center', justifyContent: 'center', fontFamily: 'Arial, sans-serif'}}>
      <div style={{fontSize: 116, fontWeight: 900, letterSpacing: '-0.05em'}}>{after ? 'GO' : 'READY'}</div>
      <div style={{position: 'absolute', top: 32, right: 32, fontSize: 13, letterSpacing: '0.18em'}}>{after ? 'SHOT B' : 'SHOT A'}</div>
      <ConceptBadge label="HARD CUT ON BEAT" />
    </AbsoluteFill>
  );
}

export function VisualMotionMatchShapeConceptV1() {
  const frame = useCurrentFrame();
  const after = frame >= CUT_FRAME;
  return (
    <AbsoluteFill style={{background: after ? '#eadfca' : '#173b4f', overflow: 'hidden'}}>
      <div style={{position: 'absolute', left: 460, top: 180, width: 360, height: 360, borderRadius: '50%', background: after ? '#d75b46' : '#f0d37a', boxShadow: after ? '0 0 0 54px rgba(215,91,70,0.18)' : '0 0 0 22px rgba(240,211,122,0.18)'}} />
      <div style={{position: 'absolute', top: 36, left: 36, color: after ? '#173b4f' : '#f8f3e7', fontFamily: 'Arial, sans-serif', fontSize: 15, letterSpacing: '0.18em'}}>{after ? 'SHOT B · SUN' : 'SHOT A · RING'}</div>
      <ConceptBadge label="MATCH SHAPE CUT" />
    </AbsoluteFill>
  );
}

export function VisualMotionWhipSourceMatchedConceptV1() {
  const frame = useCurrentFrame();
  const after = frame >= CUT_FRAME;
  const localFrame = after ? frame - CUT_FRAME : frame;
  const x = interpolate(localFrame, [0, after ? 28 : CUT_FRAME - 1], [-180, 180], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const stripes = Array.from({length: 9}, (_, index) => index);
  return (
    <AbsoluteFill style={{background: after ? '#4f2135' : '#123c53', overflow: 'hidden'}}>
      <div style={{position: 'absolute', inset: -220, transform: `translateX(${x}px) rotate(-8deg)`, filter: 'blur(13px)'}}>
        {stripes.map((index) => (
          <div key={index} style={{position: 'absolute', left: index * 220, top: -80, width: 90, height: 1100, background: index % 2 ? '#f0d37a' : after ? '#e66b59' : '#69b9c8', opacity: 0.72}} />
        ))}
      </div>
      <div style={{position: 'absolute', top: 36, right: 36, color: '#fff8e8', fontFamily: 'Arial, sans-serif', fontSize: 15, letterSpacing: '0.18em'}}>{after ? 'SHOT B · →' : 'SHOT A · →'}</div>
      <ConceptBadge label="SOURCE-MATCHED WHIP" />
    </AbsoluteFill>
  );
}
