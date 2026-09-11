import { getMotionZukanSPicks, type MotionZukanHumanCuration } from "./motionZukanHumanCuration";
import { motionPatterns } from "./visualMotionLibrary";

export type MotionZukanPublicFamily =
  | "TYPE"
  | "PHOTO"
  | "CAMERA"
  | "TRANSITION"
  | "EDITORIAL";

export interface MotionZukanPublicCard {
  id: string;
  family: MotionZukanPublicFamily;
  japaneseName: string;
  commonName: string;
  looksLike: string;
  searchWords: readonly string[];
  score: 4 | 5;
  difficulty: MotionZukanHumanCuration["difficulty"];
  bestFor: string;
  selectionCue: string;
  avoidWhen: string;
  whyForWeddingOpening: string;
  davinciHumanLabel: string;
  referenceUrls: readonly string[];
}

const familyByPatternId: Record<string, MotionZukanPublicFamily> = {
  "type-mask-reveal": "TYPE",
  "cut-match-shape": "TRANSITION",
  "photo-small-push": "PHOTO",
  "photo-directional-pan": "CAMERA",
};

/**
 * Public-safe subset for a future fixed-URL Motion Zukan.
 *
 * Deliberately excludes local media, StaRt audio/lyrics, personal photos, filesystem paths,
 * verification receipts and any local-only production state. This registry may be serialized
 * into a static page without exposing wedding-project private/local assets.
 */
export function getMotionZukanPublicSPicks(): MotionZukanPublicCard[] {
  return getMotionZukanSPicks().flatMap((curation) => {
    const pattern = motionPatterns.find((item) => item.id === curation.patternId);
    if (!pattern) return [];

    return [{
      id: pattern.id,
      family: familyByPatternId[pattern.id] ?? "EDITORIAL",
      japaneseName: pattern.japaneseName,
      commonName: pattern.commonName,
      looksLike: pattern.looksLike,
      searchWords: [...pattern.aliases, ...pattern.moodTags],
      score: curation.score,
      difficulty: curation.difficulty,
      bestFor: curation.bestFor,
      selectionCue: curation.selectionCue,
      avoidWhen: curation.avoidWhen,
      whyForWeddingOpening: curation.whyForWeddingOpening,
      davinciHumanLabel: curation.davinciHumanLabel,
      referenceUrls: curation.externalReferences.map((reference) => reference.url),
    }];
  });
}

export const MOTION_ZUKAN_PUBLIC_SAFETY_NOTE =
  "Public catalog contains discovery metadata and external reference URLs only; local-only media and wedding production state are excluded.";
