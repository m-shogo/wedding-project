import {AbsoluteFill, Audio, Img, interpolate, OffthreadVideo, Sequence, staticFile, useCurrentFrame} from 'remotion';
import {
  WeddingSceneTypographyCandidateV1,
  type WeddingSceneTypographyCandidateProps,
} from './VisualMotionTypographyConcepts';

export type WeddingProjectRealMediaFraming = {
  fit: 'COVER' | 'CONTAIN';
  focusX: number;
  focusY: number;
  scale: number;
  revision?: string;
};

export type WeddingProjectTypographyPreviewReelScene = {
  order: number;
  sceneId: string;
  startFrame: number;
  durationFrames: number;
  transitionInFrames?: number;
  transitionOutFrames?: number;
  media?: {
    kind: 'IMAGE' | 'VIDEO';
    src: string;
    sha256?: string;
    label?: string;
    framing?: WeddingProjectRealMediaFraming;
  };
  props: WeddingSceneTypographyCandidateProps;
};

export type WeddingProjectTypographyPreviewReelProps = {
  projectId: 'opening' | 'profile';
  scenes: WeddingProjectTypographyPreviewReelScene[];
  bgmSrc?: string | null;
};

function RealMediaLayer({scene}: {scene: WeddingProjectTypographyPreviewReelScene}) {
  if (!scene.media) return null;
  const src = staticFile(scene.media.src);
  const framing = scene.media.framing ?? {fit: 'COVER' as const, focusX: 50, focusY: 50, scale: 1};
  const mediaStyle = {
    width: '100%',
    height: '100%',
    objectFit: framing.fit === 'CONTAIN' ? 'contain' as const : 'cover' as const,
    objectPosition: `${framing.focusX}% ${framing.focusY}%`,
    transform: `scale(${framing.scale})`,
    transformOrigin: `${framing.focusX}% ${framing.focusY}%`,
  };
  return (
    <AbsoluteFill
      data-real-media-kind={scene.media.kind}
      data-real-media-sha256={scene.media.sha256 ?? ''}
      data-real-media-framing-revision={framing.revision ?? 'DEFAULT_CENTER_COVER'}
      data-real-media-fit={framing.fit}
      data-real-media-focus={`${framing.focusX},${framing.focusY}`}
      data-real-media-scale={framing.scale}
      style={{overflow: 'hidden'}}
    >
      {scene.media.kind === 'VIDEO'
        ? <OffthreadVideo src={src} muted style={mediaStyle} />
        : <Img src={src} style={mediaStyle} />}
      <AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(4,12,20,0.10) 0%, rgba(4,12,20,0.28) 62%, rgba(4,12,20,0.48) 100%)'}} />
    </AbsoluteFill>
  );
}

function TransitionedScene({scene}: {scene: WeddingProjectTypographyPreviewReelScene}) {
  const frame = useCurrentFrame();
  const transitionInFrames = Math.max(0, Math.min(scene.transitionInFrames ?? 0, scene.durationFrames - 1));
  const transitionOutFrames = Math.max(0, Math.min(scene.transitionOutFrames ?? 0, scene.durationFrames - 1));
  const opacityIn = transitionInFrames > 0
    ? interpolate(frame, [0, transitionInFrames], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})
    : 1;
  const outStart = Math.max(0, scene.durationFrames - transitionOutFrames - 1);
  const opacityOut = transitionOutFrames > 0
    ? interpolate(frame, [outStart, scene.durationFrames - 1], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})
    : 1;

  return (
    <AbsoluteFill style={{opacity: Math.min(opacityIn, opacityOut)}} data-transition-in-frames={transitionInFrames} data-transition-out-frames={transitionOutFrames}>
      <RealMediaLayer scene={scene} />
      <WeddingSceneTypographyCandidateV1 {...scene.props} transparentBackground={Boolean(scene.media)} />
    </AbsoluteFill>
  );
}

export function WeddingProjectTypographyPreviewReel({
  projectId,
  scenes,
  bgmSrc = null,
}: WeddingProjectTypographyPreviewReelProps) {
  return (
    <AbsoluteFill style={{backgroundColor: '#071523'}} data-project-preview-reel={projectId} data-real-media-preview={scenes.some((scene) => Boolean(scene.media)) ? 'BOUND' : 'TYPOGRAPHY_ONLY'}>
      {bgmSrc ? <Audio src={staticFile(bgmSrc)} /> : null}
      {scenes.map((scene) => (
        <Sequence
          key={`${scene.sceneId}@${scene.startFrame}`}
          from={scene.startFrame}
          durationInFrames={scene.durationFrames}
          name={`${scene.order}. ${scene.sceneId}`}
          premountFor={15}
        >
          <TransitionedScene scene={scene} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
}
