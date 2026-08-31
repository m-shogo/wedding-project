export type StartWeddingLyricPhrase = {
  phraseId: string;
  lineNumber: number;
  sectionId: string;
  text: string;
  startSec: number;
  endSec: number;
  emphasisWord: string | null;
  threeHitFrameSecs: number[] | null;
  rhythmType: string;
  semanticType: string;
  selectedAnimation: string;
  transitionIntent: string;
  holdSec: number;
  exitSec: number;
  confidence: string;
  humanReviewRequired: boolean;
};

export type JapaneseFriendsOpeningStartSyncProps = {
  audioPath?: string | null;
  lyricPhrases?: StartWeddingLyricPhrase[];
};

// Copyright-safe composition authority. Audio and lyric text remain in ignored
// local files and are injected as Remotion input props only while rendering.
export const startWeddingEditDurationInFrames = 4368;
export const startWeddingEditRange = {
  sourceStartSec: 0,
  sourceEndSec: 145.6,
  fadeOutStartSec: 145.1,
  fadeOutDurationSec: 0.5,
} as const;
