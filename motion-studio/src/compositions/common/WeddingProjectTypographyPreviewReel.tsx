import {AbsoluteFill, Audio, Img, interpolate, OffthreadVideo, Sequence, staticFile, useCurrentFrame} from 'remotion';
import {
  WeddingSceneTypographyCandidateV1,
  type WeddingSceneTypographyCandidateProps,
} from './VisualMotionTypographyConcepts';

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
  const style = {width: '100%', height: '100%', objectFit: 'cover' as const};
  return (
    <AbsoluteFill data-real-media-kind={scene.media.kind} data-real-media-sha256={scene.media.sha256 ?? ''}>
      {scene.media.kind === 'VIDEO'
        ? <OffthreadVideo src={src} muted style={style} />
        : <Img src={src} style={style} />}
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
