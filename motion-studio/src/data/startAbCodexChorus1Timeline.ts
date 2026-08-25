// Phase G — Codex lane data for the Claude/Codex A/B comparison.
//
// Each section uses its first-ranked primary recipe from startSectionRecipeMap.ts. Those two
// section-specific recipes already combine the other primary intentions: the chorus lift recipe
// resolves to a locked/static Hero plus a single word accent, and the triple-hit recipe resolves
// to stamp/line/speed-line layers over one held Hero slot. No alternate or avoid recipe is used.
//
// The outer Sequence duration comes from startExtendedRhythmMap.ts instead of the adapter's
// 180-frame catalogue-browsing clamp. This is not an editorial deviation: the A/B brief requires
// the real 10-second / 300-frame duration of each section. DirectorRecipePreview and
// directorRecipeAdapter.ts still provide every visual layer through the six shared engines.

import {startAbComparisons} from '../../../movie-dashboard/src/data/startClaudeCodexAB.ts';
import {startSectionRecipeMap} from '../../../movie-dashboard/src/data/startSectionRecipeMap.ts';
import {startExtendedSections} from '../../../movie-dashboard/src/data/startExtendedRhythmMap.ts';

const fps = 30;

const comparison = startAbComparisons.find((candidate) => candidate.id === 'ab-chorus1-full');
if (!comparison) {
  throw new Error('startAbCodexChorus1Timeline: comparison "ab-chorus1-full" not found');
}

export interface StartAbCodexTimelineItem {
  sectionId: string;
  recipeId: string;
  durationInFrames: number;
}

export const startAbCodexChorus1TimelineItems: StartAbCodexTimelineItem[] = comparison.targetSectionIds.map((sectionId) => {
  const mapping = startSectionRecipeMap.find((entry) => entry.sectionId === sectionId);
  const section = startExtendedSections.find((entry) => entry.id === sectionId);
  if (!mapping) throw new Error(`startAbCodexChorus1Timeline: mapping missing for "${sectionId}"`);
  if (!section) throw new Error(`startAbCodexChorus1Timeline: rhythm section missing for "${sectionId}"`);

  const recipeId = mapping.primaryRecipeIds[0];
  if (!recipeId) throw new Error(`startAbCodexChorus1Timeline: primary recipe missing for "${sectionId}"`);

  return {
    sectionId,
    recipeId,
    durationInFrames: Math.round((section.referenceEndSec - section.referenceStartSec) * fps),
  };
});

export const startAbCodexChorus1TotalFrames = startAbCodexChorus1TimelineItems.reduce(
  (total, item) => total + item.durationInFrames,
  0,
);
