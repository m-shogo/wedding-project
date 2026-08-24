import {Composition} from 'remotion';
import {DirectorRecipePreview} from './compositions/common/DirectorRecipePreview';
import {DirectorRecipeCategoryReel, DirectorRecipeHighlightReel} from './compositions/common/DirectorRecipeReel';
import {DirectorRecipeComparisonGrid} from './compositions/common/DirectorRecipeComparison';
import {directorRecipeCatalog, directorRecipeCategories} from './motion-kit/directorRecipeAdapter';
import {resolveDirectorRecipe} from './motion-kit/directorRecipeAdapter';
import {
  highlightReelRecipeIds,
  recipeIdsForCategory,
  comparisonSets,
  reelDurationInFrames,
  comparisonDurationInFrames,
  categorySlug,
} from './motion-kit/directorRecipeReelSelections';

/**
 * One Composition per Director Recipe Catalog entry (97 as of Phase B), all backed by the
 * single data-driven DirectorRecipePreview component. This is intentional: the catalog stays
 * a data file (movie-dashboard/src/data/directorRecipeCatalog.ts) and this file never grows
 * one hand-written component per recipe.
 *
 * Phase C adds three more data-driven groupings on top of the same 97 Compositions, still
 * without any per-recipe hand-written component: a Highlight Reel (20 of 97, 2 per category),
 * one Category Reel per catalog category (10, all 97 recipes covered across them), and
 * comparison-set grids (movie-kit/directorRecipeReelSelections.ts). See motion-studio/README.md
 * "Director Recipe Renderer" for the full command list.
 *
 * Composition id format: DirectorRecipe-<recipe.id>, e.g. DirectorRecipe-cam-locked-frame.
 * List all ids: pnpm exec remotion compositions src/index-director-recipes.ts
 * Render one: pnpm render:director-recipe <recipe-id>
 * Render a reel/category-reel/comparison: pnpm render:director-recipe-collection <composition-id>
 */
export function DirectorRecipeRoot() {
  return (
    <>
      {directorRecipeCatalog.map((recipe) => {
        const {durationInFrames} = resolveDirectorRecipe(recipe);
        return (
          <Composition
            key={recipe.id}
            id={`DirectorRecipe-${recipe.id}`}
            component={DirectorRecipePreview}
            width={1920}
            height={1080}
            fps={30}
            durationInFrames={durationInFrames}
            defaultProps={{recipeId: recipe.id}}
          />
        );
      })}

      <Composition
        id="DirectorRecipeReel-Highlight"
        component={DirectorRecipeHighlightReel}
        width={1920}
        height={1080}
        fps={30}
        durationInFrames={reelDurationInFrames(highlightReelRecipeIds)}
        defaultProps={{recipeIds: highlightReelRecipeIds}}
      />

      {directorRecipeCategories.map((category) => (
        <Composition
          key={category}
          id={`DirectorRecipeReel-${categorySlug(category)}`}
          component={DirectorRecipeCategoryReel}
          width={1920}
          height={1080}
          fps={30}
          durationInFrames={reelDurationInFrames(recipeIdsForCategory(category))}
          defaultProps={{category}}
        />
      ))}

      {comparisonSets.map((set) => (
        <Composition
          key={set.id}
          id={`DirectorRecipeComparison-${set.id}`}
          component={DirectorRecipeComparisonGrid}
          width={1920}
          height={1080}
          fps={30}
          durationInFrames={comparisonDurationInFrames(set.recipeIds)}
          defaultProps={{recipeIds: set.recipeIds}}
        />
      ))}
    </>
  );
}
