// Phase G — Claude Code lane data for the Claude/Codex A/B comparison
// (movie-dashboard/src/data/startClaudeCodexAB.ts, comparison id "ab-chorus1-full").
//
// This derives the CLAUDE candidate's timeline from the single sources of truth — it does not
// hardcode a second copy of the section/recipe mapping:
//   movie-dashboard/src/data/startClaudeCodexAB.ts        target section ids + 20s window
//   movie-dashboard/src/data/startSectionRecipeMap.ts      section -> primaryRecipeIds[0]
//   movie-dashboard/src/data/startExtendedRhythmMap.ts     section -> reference duration (seconds)
//
// Editorial choice made here (documented per the handoff brief's "state deviations with
// reasoning" instruction): each section uses ONLY its first-ranked primary recipe
// (start-chorus-hero-lift for chorus-1-a, start-triple-hit for chorus-1-b), placed back-to-back
// for the section's own reference duration (300 frames / 10s each at 30fps) via
// placeRecipesWithDurations() — NOT each recipe's own resolveDirectorRecipeById() duration
// (which clamps to 180 frames as a reel-safety default for the 97-composition browsing
// catalogue, see directorRecipeAdapter.ts clampDuration()). The section's real reference length
// is the more faithful target here: the brief asks for the actual 00:38-00:58 (20s) slice, and
// both primary recipes are visually a "hold the Hero" grammar (static/locked-frame lift, then a
// 3-hit accent over a maintained Hero), so extending their Sequence past the clamp does not
// invent new motion — it holds the settled state for the remaining runtime, which matches
// "Hero写真の提示(chorus-1-a)からHero維持のまま3-hit(chorus-1-b)へ" verbatim.
//
// Rendered through the 6 shared engines only, via the existing DirectorRecipePreview /
// DirectorRecipeCustomReel pipeline — no new one-off visual component for this comparison.

import {startAbComparisons} from '../../../movie-dashboard/src/data/startClaudeCodexAB.ts';
import {startSectionRecipeMap} from '../../../movie-dashboard/src/data/startSectionRecipeMap.ts';
import {startExtendedSections} from '../../../movie-dashboard/src/data/startExtendedRhythmMap.ts';

const fps = 30;

const comparison = startAbComparisons.find((c) => c.id === 'ab-chorus1-full');
if (!comparison) {
  throw new Error('startAbChorus1Timeline: comparison "ab-chorus1-full" not found in startClaudeCodexAB.ts');
}

export interface StartAbTimelineItem {
  sectionId: string;
  recipeId: string;
  durationInFrames: number;
}

export const startAbChorus1TimelineItems: StartAbTimelineItem[] = comparison.targetSectionIds.map((sectionId) => {
  const mapping = startSectionRecipeMap.find((m) => m.sectionId === sectionId);
  const section = startExtendedSections.find((s) => s.id === sectionId);
  if (!mapping) throw new Error(`startAbChorus1Timeline: no startSectionRecipeMap entry for section "${sectionId}"`);
  if (!section) throw new Error(`startAbChorus1Timeline: no startExtendedSections entry for section "${sectionId}"`);
  const recipeId = mapping.primaryRecipeIds[0];
  if (!recipeId) throw new Error(`startAbChorus1Timeline: section "${sectionId}" has no primaryRecipeIds[0]`);
  const durationInFrames = Math.round((section.referenceEndSec - section.referenceStartSec) * fps);
  return {sectionId, recipeId, durationInFrames};
});

export const startAbChorus1TotalFrames = startAbChorus1TimelineItems.reduce((sum, item) => sum + item.durationInFrames, 0);
