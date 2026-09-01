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

export type StartWeddingIntroProfile = {
  role: 'GROOM' | 'BRIDE';
  name: string;
  jp: string;
  asset: string;
  color: string;
  facts: string[];
};

export type StartWeddingCoupleNames = {
  display: string;
  dateLabel: string;
};

export type JapaneseFriendsOpeningStartSyncProps = {
  audioPath?: string | null;
  lyricPhrases?: StartWeddingLyricPhrase[];
  groomProfile?: StartWeddingIntroProfile;
  brideProfile?: StartWeddingIntroProfile;
  coupleNames?: StartWeddingCoupleNames;
};

// Dummy placeholder profile data. Safe to render publicly; replace with real
// profile content via composition props once approved by the couple.
export const defaultGroomProfile: StartWeddingIntroProfile = {
  role: 'GROOM',
  name: 'HARUTO',
  jp: '佐藤 陽翔',
  asset: 'groom-friends',
  color: '#52d9ff',
  facts: ['1994.07.18 / TOKYO', 'COFFEE・CAMP・SURPRISE', '今日いちばん緊張しています'],
};

export const defaultBrideProfile: StartWeddingIntroProfile = {
  role: 'BRIDE',
  name: 'AOI',
  jp: '高橋 葵',
  asset: 'bride-friends',
  color: '#ff7eae',
  facts: ['1995.03.09 / YOKOHAMA', 'TRAVEL・MUSIC・SMILE', '今日いちばん楽しんでいます'],
};

export const defaultCoupleNames: StartWeddingCoupleNames = {
  display: 'HARUTO & AOI',
  dateLabel: '2026.10.24 · YOKOHAMA',
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
