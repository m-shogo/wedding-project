import {AbsoluteFill, Sequence, useCurrentFrame} from 'remotion';
import {DirectorRecipePreview} from './DirectorRecipePreview';
import {START_EXTENDED_ROUGH_FPS, startExtendedOpeningRoughAuthority, startExtendedOpeningRoughItems} from '../../data/startExtendedOpeningRough';

function RoughSection({item, index}: {item: (typeof startExtendedOpeningRoughItems)[number]; index: number}) {
  const frame = useCurrentFrame();
  const localSec = frame / START_EXTENDED_ROUGH_FPS;
  return (
    <AbsoluteFill>
      <DirectorRecipePreview recipeId={item.recipeId} />
      <AbsoluteFill style={{pointerEvents: 'none', fontFamily: 'Arial, sans-serif'}}>
        <div style={{position: 'absolute', inset: 30, border: '2px solid rgba(255,255,255,0.32)'}} />
        <div style={{position: 'absolute', left: 60, top: 50, display: 'flex', gap: 10}}>
          {[startExtendedOpeningRoughAuthority.audio, startExtendedOpeningRoughAuthority.media, 'NOT FINAL'].map((label) => (
            <span key={label} style={{background: '#f4c34f', color: '#13263a', padding: '8px 12px', fontWeight: 800, fontSize: 16, letterSpacing: '0.08em'}}>{label}</span>
          ))}
        </div>
        <div style={{position: 'absolute', left: 60, bottom: 48, right: 60, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', color: '#fff'}}>
          <div>
            <div style={{fontSize: 17, letterSpacing: '0.16em', opacity: 0.72}}>START EXTENDED ROUGH · SECTION {String(index + 1).padStart(2, '0')} / 14</div>
            <div style={{marginTop: 8, fontSize: 34, fontWeight: 800}}>{item.sectionLabel}</div>
            <div style={{marginTop: 6, fontSize: 18, opacity: 0.78}}>{item.familyLabel} · {item.recipeId} · {item.mediaRole}</div>
          </div>
          <div style={{fontFamily: 'monospace', fontSize: 24, textAlign: 'right'}}>
            <div>{(item.referenceStartSec + localSec).toFixed(1)}s / {item.referenceEndSec}s REF</div>
            <div style={{marginTop: 4, fontSize: 14, opacity: 0.68}}>timing and media require human confirmation</div>
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
}

export function StartExtendedOpeningRough() {
  let from = 0;
  return (
    <AbsoluteFill style={{backgroundColor: '#0d2035'}}>
      {startExtendedOpeningRoughItems.map((item, index) => {
        const sequence = <Sequence key={item.sectionId} from={from} durationInFrames={item.durationInFrames} premountFor={30}><RoughSection item={item} index={index} /></Sequence>;
        from += item.durationInFrames;
        return sequence;
      })}
    </AbsoluteFill>
  );
}
