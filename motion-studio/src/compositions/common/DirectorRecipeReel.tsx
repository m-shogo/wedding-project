import {AbsoluteFill, Sequence} from 'remotion';
import {DirectorRecipePreview} from './DirectorRecipePreview';
import type {DirectorRecipeCategory} from '../../motion-kit/directorRecipeAdapter';
import {placeRecipesSequentially, recipeIdsForCategory} from '../../motion-kit/directorRecipeReelSelections';

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
