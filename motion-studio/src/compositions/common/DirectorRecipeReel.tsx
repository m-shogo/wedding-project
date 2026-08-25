import {AbsoluteFill, Sequence} from 'remotion';
import {DirectorRecipePreview} from './DirectorRecipePreview';
import type {DirectorRecipeCategory} from '../../motion-kit/directorRecipeAdapter';
import {placeRecipesSequentially, placeRecipesWithDurations, recipeIdsForCategory} from '../../motion-kit/directorRecipeReelSelections';

/**
 * Shared reel body: reuses the single data-driven DirectorRecipePreview component per clip
 * (same as the 97 individual Compositions) so a reel is not a second implementation of any
 * recipe's visual — it is those same Compositions played back-to-back. Timing math (which
 * frame each clip starts on) lives in directorRecipeReelSelections.ts so it can be imported by
 * plain Node contract-check scripts without a JSX-capable loader.
 */
export function DirectorRecipeReelBody({recipeIds}: {recipeIds: string[]}) {
  const placed = placeRecipesSequentially(recipeIds);
  return (
    <AbsoluteFill style={{backgroundColor: '#0d2035'}}>
      {placed.map((clip) => (
        <Sequence key={clip.id} from={clip.from} durationInFrames={clip.durationInFrames}>
          <DirectorRecipePreview recipeId={clip.id} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
}

export function DirectorRecipeHighlightReel({recipeIds}: {recipeIds: string[]}) {
  return <DirectorRecipeReelBody recipeIds={recipeIds} />;
}

export function DirectorRecipeCategoryReel({category}: {category: DirectorRecipeCategory}) {
  return <DirectorRecipeReelBody recipeIds={recipeIdsForCategory(category)} />;
}

/**
 * Like DirectorRecipeReelBody, but each clip's Sequence length is given explicitly instead of
 * derived from the recipe's own resolveDirectorRecipeById() duration. Used when a comparison
 * needs to honor a real section length (e.g. a StaRt Extended Rhythm Map section's 300-frame /
 * 10s reference duration) rather than the 97-composition catalogue's 180-frame reel-safety cap.
 * See placeRecipesWithDurations() in directorRecipeReelSelections.ts and
 * src/data/startAbChorus1Timeline.ts (Phase G Claude/Codex A/B comparison).
 */
export function DirectorRecipeCustomReel({items}: {items: {id: string; durationInFrames: number}[]}) {
  const placed = placeRecipesWithDurations(items);
  return (
    <AbsoluteFill style={{backgroundColor: '#0d2035'}}>
      {placed.map((clip) => (
        <Sequence key={clip.id} from={clip.from} durationInFrames={clip.durationInFrames}>
          <DirectorRecipePreview recipeId={clip.id} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
}
