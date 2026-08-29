import {AbsoluteFill, Img, staticFile} from 'remotion';
import {CameraTransformEngine, type CameraTransformMode} from '../../motion-kit/engines';

const STOCK_PHOTO = staticFile('demo-assets/stock-photos/pexels-17630524-1280x720.jpg');

function PhotoMotionConcept({mode, label}: {mode: CameraTransformMode; label: string}) {
  return (
    <AbsoluteFill style={{backgroundColor: '#0d2035', overflow: 'hidden'}}>
      <CameraTransformEngine mode={mode} intensity="M">
        <Img src={STOCK_PHOTO} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
      </CameraTransformEngine>
      <div
        style={{
          position: 'absolute',
          left: 28,
          bottom: 24,
          padding: '8px 12px',
          background: 'rgba(5, 18, 31, 0.72)',
          color: '#fff',
          fontFamily: 'Arial, sans-serif',
          fontSize: 15,
          letterSpacing: '0.12em',
        }}
      >
        {label} · STOCK DEMO / NOT USER MEDIA
      </div>
    </AbsoluteFill>
  );
}

export function VisualMotionStaticHeroStockV1() {
  return <PhotoMotionConcept mode="static" label="STATIC HERO" />;
}

export function VisualMotionGentlePushStockV1() {
  return <PhotoMotionConcept mode="push" label="GENTLE PUSH" />;
}

export function VisualMotionDirectionalPanStockV1() {
  return <PhotoMotionConcept mode="pan" label="DIRECTIONAL PAN" />;
}

export function VisualMotionSlowPullStockV1() {
  return <PhotoMotionConcept mode="pull" label="SLOW PULL" />;
}

export function VisualMotionParallaxStockV1() {
  return <PhotoMotionConcept mode="parallax" label="2.5D PARALLAX" />;
}

export function VisualMotionFreezeCutoutStockV1() {
  return <PhotoMotionConcept mode="freeze" label="FREEZE CUTOUT" />;
}
