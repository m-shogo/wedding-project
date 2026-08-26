import {AbsoluteFill} from 'remotion';
import {
  CameraTransformEngine,
  GraphicHitEngine,
  NativeCutEngine,
  PhotoLayoutEngine,
  TransitionWipeEngine,
  TypographyRevealEngine,
  type CameraTransformMode,
  type GraphicHitVariant,
  type TransitionWipeVariant,
  type TypographyRevealMode,
} from '../../motion-kit/engines';
import {resolveDirectorRecipeById, type RecipeLayer} from '../../motion-kit/directorRecipeAdapter';

function DemoBackdrop({label, sub}: {label: string; sub: string}) {
  return (
    <AbsoluteFill style={{background: 'linear-gradient(135deg, #0d2035 0%, #173d5b 58%, #315d78 100%)', color: '#fff'}}>
      <div style={{position: 'absolute', left: 90, top: 80, fontSize: 20, letterSpacing: '0.16em', opacity: 0.7}}>DIRECTOR RECIPE CATALOG / VISUAL REVIEW</div>
      <div style={{position: 'absolute', left: 90, bottom: 150, fontSize: 30, fontWeight: 700, maxWidth: 1000}}>{label}</div>
      <div style={{position: 'absolute', left: 90, bottom: 105, fontSize: 18, opacity: 0.65}}>{sub}</div>
      <div style={{position: 'absolute', right: 90, bottom: 105, fontSize: 18, opacity: 0.6}}>REAL PHOTO / VIDEO SLOT (placeholder)</div>
    </AbsoluteFill>
  );
}

function RenderLayer({layer}: {layer: RecipeLayer}) {
  const {engine, intensity, props} = layer;

  if (engine === 'typography-reveal') {
    return <TypographyRevealEngine text={props.text as string} intensity={intensity} mode={props.mode as TypographyRevealMode} transparent={props.transparent as boolean} />;
  }
  if (engine === 'camera-transform') {
    return (
      <CameraTransformEngine intensity={intensity} mode={props.mode as CameraTransformMode}>
        <DemoBackdrop label="TRAVEL MEMORY" sub="synthetic depth / replace with real photo after review" />
      </CameraTransformEngine>
    );
  }
  if (engine === 'photo-layout') {
    return <PhotoLayoutEngine variant={props.variant as 'contact-sheet' | 'split-panel' | 'panel-grid'} count={props.count as number} intensity={intensity} transparent />;
  }
  if (engine === 'transition-wipe') {
    return (
      <TransitionWipeEngine
        direction={props.direction as 'left' | 'right' | 'up' | 'down'}
        variant={props.variant as TransitionWipeVariant}
        intensity={intensity}
        transparent={props.transparent as boolean}
      />
    );
  }
  if (engine === 'graphic-hit') {
    return <GraphicHitEngine variant={props.variant as GraphicHitVariant} intensity={intensity} transparent={props.transparent as boolean} />;
  }
  return <NativeCutEngine label={props.label as string} variant={props.variant as 'hard' | 'j-cut' | 'l-cut'} intensity={intensity} transparent />;
}

/** One data-driven preview component backs all Director Recipe compositions. */
export function DirectorRecipePreview({recipeId}: {recipeId: string}) {
  const {recipe, layers} = resolveDirectorRecipeById(recipeId);
  const hasBaseVisual = layers.some((layer) => layer.engine === 'camera-transform' || layer.engine === 'photo-layout' || layer.engine === 'native-cut');

  return (
    <AbsoluteFill style={{backgroundColor: '#0d2035'}}>
      {!hasBaseVisual && <DemoBackdrop label={recipe.label} sub={`${recipe.category} / ${recipe.subCategory}`} />}
      {layers.map((layer, index) => (
        <AbsoluteFill key={`${layer.engine}-${layer.presetId}-${index}`}>
          <RenderLayer layer={layer} />
        </AbsoluteFill>
      ))}
      <AbsoluteFill style={{pointerEvents: 'none'}}>
        <div style={{position: 'absolute', left: 90, top: 116, fontSize: 15, letterSpacing: '0.08em', color: '#fff', opacity: 0.55}}>
          {recipe.id} · {recipe.category} · {recipe.motionPresetIds.join(' + ')}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
}
