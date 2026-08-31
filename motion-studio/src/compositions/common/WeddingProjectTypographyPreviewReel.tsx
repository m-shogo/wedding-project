import {AbsoluteFill, interpolate, Sequence, useCurrentFrame} from 'remotion';
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
  props: WeddingSceneTypographyCandidateProps;
};

export type WeddingProjectTypographyPreviewReelProps = {
  projectId: 'opening' | 'profile';
  scenes: WeddingProjectTypographyPreviewReelScene[];
};

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
      <WeddingSceneTypographyCandidateV1 {...scene.props} />
    </AbsoluteFill>
  );
}

export function WeddingProjectTypographyPreviewReel({
  projectId,
  scenes,
}: WeddingProjectTypographyPreviewReelProps) {
  return (
    <AbsoluteFill style={{backgroundColor: '#071523'}} data-project-preview-reel={projectId}>
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
