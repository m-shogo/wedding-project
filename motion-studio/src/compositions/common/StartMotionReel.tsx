import {AbsoluteFill, Sequence} from 'remotion';
import {
  CameraTransformEngine,
  GraphicHitEngine,
  NativeCutEngine,
  PhotoLayoutEngine,
  TransitionWipeEngine,
  TypographyRevealEngine,
} from '../../motion-kit/engines';
import {renderableMotionPresets, type RenderableMotionPreset} from '../../motion-kit/renderablePresets';

const CLIP_FRAMES = 75;

function DemoBackdrop({label}: {label: string}) {
  return (
    <AbsoluteFill style={{background: 'linear-gradient(135deg, #0d2035 0%, #173d5b 58%, #315d78 100%)', color: '#fff'}}>
      <div style={{position: 'absolute', left: 110, top: 100, fontSize: 24, letterSpacing: '0.18em', opacity: 0.7}}>START MOTION KIT / RENDERABLE V1</div>
      <div style={{position: 'absolute', left: 110, bottom: 105, fontSize: 32, fontWeight: 700}}>{label}</div>
      <div style={{position: 'absolute', right: 110, bottom: 105, fontSize: 22, opacity: 0.65}}>REAL PHOTO / VIDEO SLOT</div>
      <div style={{position: 'absolute', left: '50%', top: '50%', width: 900, height: 520, transform: 'translate(-50%, -50%)', border: '2px solid rgba(255,255,255,0.38)', background: 'rgba(255,255,255,0.06)'}} />
    </AbsoluteFill>
  );
}

function RenderPreset({preset}: {preset: RenderableMotionPreset}) {
  if (preset.engine === 'typography-reveal') {
    return (
      <AbsoluteFill>
        <DemoBackdrop label={preset.label} />
        <TypographyRevealEngine
          text={preset.demoText ?? 'WELCOME'}
          intensity={preset.intensity}
          mode={
            preset.mode === 'punch'
              ? 'punch'
              : preset.mode === 'stagger'
                ? 'stagger'
                : preset.mode === 'hop'
                  ? 'hop'
                  : preset.mode === 'lock'
                    ? 'lock'
                    : 'mask'
          }
        />
      </AbsoluteFill>
    );
  }

  if (preset.engine === 'camera-transform') {
    return (
      <AbsoluteFill style={{overflow: 'hidden'}}>
        <CameraTransformEngine
          intensity={preset.intensity}
          mode={preset.mode === 'static' ? 'static' : preset.mode === 'pull' ? 'pull' : preset.mode === 'pan' ? 'pan' : 'push'}
        >
          <DemoBackdrop label={preset.label} />
        </CameraTransformEngine>
      </AbsoluteFill>
    );
  }

  if (preset.engine === 'transition-wipe') {
    return (
      <AbsoluteFill>
        <DemoBackdrop label={preset.label} />
        <TransitionWipeEngine
          intensity={preset.intensity}
          direction={preset.mode === 'left' ? 'left' : preset.mode === 'up' ? 'up' : preset.mode === 'down' ? 'down' : 'right'}
        />
      </AbsoluteFill>
    );
  }

  if (preset.engine === 'native-cut') {
    return <NativeCutEngine label={preset.label} intensity={preset.intensity} variant={preset.mode === 'j-cut' ? 'j-cut' : preset.mode === 'l-cut' ? 'l-cut' : 'hard'} />;
  }

  if (preset.engine === 'photo-layout') {
    return (
      <AbsoluteFill>
        <PhotoLayoutEngine
          intensity={preset.intensity}
          variant={preset.mode === 'split-panel' ? 'split-panel' : preset.mode === 'panel-grid' ? 'panel-grid' : 'contact-sheet'}
        />
        <div style={{position: 'absolute', left: 24, bottom: 24, fontSize: 22, fontWeight: 700, color: '#fff'}}>{preset.label}</div>
      </AbsoluteFill>
    );
  }

  return (
    <AbsoluteFill>
      <DemoBackdrop label={preset.label} />
      <GraphicHitEngine
        intensity={preset.intensity}
        variant={
          preset.mode === 'speed-lines'
            ? 'speed-lines'
            : preset.mode === 'impact'
              ? 'impact'
              : preset.mode === 'halftone'
                ? 'halftone'
                : preset.mode === 'scribble'
                  ? 'scribble'
                  : preset.mode === 'stamp-line-dot'
                    ? 'stamp-line-dot'
                    : 'triplet'
        }
      />
    </AbsoluteFill>
  );
}

export function StartMotionReel() {
  return (
    <AbsoluteFill style={{backgroundColor: '#0d2035'}}>
      {renderableMotionPresets.map((preset, index) => (
        <Sequence key={preset.presetId} from={index * CLIP_FRAMES} durationInFrames={CLIP_FRAMES}>
          <RenderPreset preset={preset} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
}

export function StartMotionOverlayPreview() {
  return (
    <AbsoluteFill>
      <GraphicHitEngine variant="triplet" intensity="M" transparent />
    </AbsoluteFill>
  );
}

export const startMotionReelDurationFrames = renderableMotionPresets.length * CLIP_FRAMES;
