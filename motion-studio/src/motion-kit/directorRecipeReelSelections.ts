// Director Recipe Catalog -> Phase C reel / category-reel / comparison-set selections.
//
// This file holds no rendering logic. It only decides WHICH recipe ids belong to which
// research-facing grouping, always by filtering/iterating the Phase A catalog
// (movie-dashboard/src/data/directorRecipeCatalog.ts) via the Phase B adapter re-exports.
// Adding a recipe to the catalog automatically flows into its category reel and (for the
// first two per category) the Highlight Reel — no per-recipe wiring required here.
import {directorRecipeCatalog, directorRecipeCategories, resolveDirectorRecipeById, type DirectorRecipeCategory} from './directorRecipeAdapter.ts';

/** Human-readable label per category, used for reel titles / README / DirectorRecipeRoot. */
export const categoryReelLabels: Record<DirectorRecipeCategory, string> = {
  CINEMATIC_CAMERA: 'Cinematic Reel',
  PHOTO_PRESENTATION: 'Photo Presentation Reel',
  TYPOGRAPHY: 'Typography Reel',
  ANIME_OP_GRAMMAR: 'Anime OP Reel',
  CUT_TRANSITION: 'Cut & Transition Reel',
  RHYTHM_MUSIC_HIT: 'Rhythm Reel',
  TRAVEL: 'Travel Reel',
  EDITORIAL_CM: 'Editorial / CM Reel',
  WEDDING_EMOTION: 'Wedding Reel',
  START_SPECIFIC: 'StaRt Reel',
};

/** Composition ids may only contain a-z, A-Z, 0-9, CJK and `-` (Remotion validation), so the
 * SNAKE_CASE category enum values need a kebab-case slug for Composition ids / render/check CLI. */
export function categorySlug(category: DirectorRecipeCategory): string {
  return category.toLowerCase().replace(/_/g, '-');
}

/** All recipe ids belonging to one category, in catalog order. */
export function recipeIdsForCategory(category: DirectorRecipeCategory): string[] {
  return directorRecipeCatalog.filter((recipe) => recipe.category === category).map((recipe) => recipe.id);
}

/**
 * Director Recipe Highlight Reel: the first 2 recipes of every category, in catalog/category
 * order (10 categories x 2 = 20 of 97). This keeps the "watch everything once" reel short
 * enough to actually sit through while still touching every category and every one of the 6
 * shared engines. Full category detail lives in the per-category reels below.
 */
export const highlightReelRecipeIds: string[] = directorRecipeCategories.flatMap((category) =>
  recipeIdsForCategory(category).slice(0, 2),
);

export interface PlacedRecipe {
  id: string;
  from: number;
  durationInFrames: number;
}

/** Lays recipes back-to-back on the timeline using each recipe's own resolved duration. Pure
 * math, deliberately kept out of the .tsx files so Node's plain ESM/TS loader (used by the
 * check-*.mts contract scripts) can import it without a JSX-capable loader. */
export function placeRecipesSequentially(recipeIds: string[]): PlacedRecipe[] {
  let cursor = 0;
  return recipeIds.map((id) => {
    const {durationInFrames} = resolveDirectorRecipeById(id);
    const placed: PlacedRecipe = {id, from: cursor, durationInFrames};
    cursor += durationInFrames;
    return placed;
  });
}

/** Total frames a sequential reel of these recipe ids would occupy. */
export function reelDurationInFrames(recipeIds: string[]): number {
  const placed = placeRecipesSequentially(recipeIds);
  return placed.reduce((max, p) => Math.max(max, p.from + p.durationInFrames), 0);
}

/**
 * Places recipes back-to-back like placeRecipesSequentially, but with an EXPLICIT duration per
 * clip instead of each recipe's own resolveDirectorRecipeById() duration. resolveDirectorRecipe's
 * clampDuration() caps every recipe at 180 frames (a reel-safety default for the 97-composition
 * catalogue browsing reels) — that cap is intentionally wrong for a comparison that needs to
 * honor a specific StaRt Extended section's actual reference length (e.g. chorus-1-a/1-b are
 * 300 frames / 10s each at 30fps per startExtendedRhythmMap.ts, not 180). Used by the Phase G
 * Claude/Codex A/B comparison composition (see startAbChorus1Timeline.ts). The recipe's own
 * shared-engine visual (DirectorRecipePreview) still renders unmodified inside each Sequence —
 * only the outer Sequence length changes, so playback simply holds on the recipe's settled state
 * for the remainder of the section instead of cutting away early.
 */
export function placeRecipesWithDurations(items: {id: string; durationInFrames: number}[]): PlacedRecipe[] {
  let cursor = 0;
  return items.map((item) => {
    const placed: PlacedRecipe = {id: item.id, from: cursor, durationInFrames: item.durationInFrames};
    cursor += item.durationInFrames;
    return placed;
  });
}

/** Longest single recipe duration among the given ids (comparison sets play simultaneously). */
export function comparisonDurationInFrames(recipeIds: string[]): number {
  return recipeIds.reduce((max, id) => Math.max(max, resolveDirectorRecipeById(id).durationInFrames), 0);
}

export interface ComparisonSet {
  id: string;
  label: string;
  description: string;
  recipeIds: string[];
}

/**
 * Comparison sets: the same editorial "moment" (a hero photo hold, a 3-hit accent) executed
 * through several different recipes, laid out side by side so the difference is visible in one
 * frame instead of remembered across separate clips. See docs research task brief Phase C item 3.
 */
export const comparisonSets: ComparisonSet[] = [
  {
    id: 'hero-photo-presentation',
    label: 'Hero Photo Presentation Comparison',
    description:
      '同じHero写真スロットに対する Static Full-Bleed / Restrained Push / Slow Pull / Negative Space / Anime Freeze / Editorial Crop の並び比較。',
    recipeIds: [
      'photo-full-bleed',
      'cam-restrained-push',
      'cam-slow-pull',
      'photo-negative-space',
      'photo-freeze-on-motion',
      'photo-editorial-crop',
    ],
  },
  {
    id: 'three-hit-accent',
    label: 'Three-Hit Accent Comparison',
    description:
      '同じ3-hitタイミングに対する Stamp-Line-Route-Dot Triplet / Typography Word Punch / Anime Impact Frame / Passport Stamp / Soft Impact Cut / Anime Micro RGB Split の並び比較。',
    recipeIds: [
      'rhythm-three-hit',
      'typo-word-punch',
      'anime-impact-frame',
      'travel-passport-stamp',
      'cut-soft-impact',
      'anime-micro-rgb',
    ],
  },
];
