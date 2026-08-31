import {AbsoluteFill, Sequence} from 'remotion';
import {
  WeddingSceneTypographyCandidateV1,
  type WeddingSceneTypographyCandidateProps,
} from './VisualMotionTypographyConcepts';

export type WeddingProjectTypographyPreviewReelScene = {
  order: number;
  sceneId: string;
  startFrame: number;
  durationFrames: number;
  props: WeddingSceneTypographyCandidateProps;
};

export type WeddingProjectTypographyPreviewReelProps = {
  projectId: 'opening' | 'profile';
  scenes: WeddingProjectTypographyPreviewReelScene[];
};

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
          <WeddingSceneTypographyCandidateV1 {...scene.props} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
}
