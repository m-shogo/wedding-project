import {Composition} from 'remotion';
import {DirectorRecipePreview} from './compositions/common/DirectorRecipePreview';
import {DirectorRecipeCategoryReel, DirectorRecipeCustomReel, DirectorRecipeHighlightReel} from './compositions/common/DirectorRecipeReel';
import {DirectorRecipeComparisonGrid} from './compositions/common/DirectorRecipeComparison';
import {DirectorVisualUpgradeReview, directorVisualUpgradeReviewFrames} from './compositions/common/DirectorVisualUpgradeReview';
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
import {startAbChorus1TimelineItems, startAbChorus1TotalFrames} from './data/startAbChorus1Timeline';
import {startAbCodexChorus1TimelineItems, startAbCodexChorus1TotalFrames} from './data/startAbCodexChorus1Timeline';
import {StartExtendedOpeningRough} from './compositions/common/StartExtendedOpeningRough';
import {startExtendedOpeningRoughTotalFrames} from './data/startExtendedOpeningRough';

/**
 * One Composition per Director Recipe Catalog entry, all backed by the same data-driven preview.
 * Group reels, comparison sets and review reels also reuse the same small shared-engine system.
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

      <Composition
        id="StartDirectorVisualUpgradesV1"
        component={DirectorVisualUpgradeReview}
        width={1920}
        height={1080}
        fps={30}
        durationInFrames={directorVisualUpgradeReviewFrames}
      />

      <Composition
        id="StartAbClaudeChorus1"
        component={DirectorRecipeCustomReel}
        width={1920}
        height={1080}
        fps={30}
        durationInFrames={startAbChorus1TotalFrames}
        defaultProps={{items: startAbChorus1TimelineItems.map((item) => ({id: item.recipeId, durationInFrames: item.durationInFrames}))}}
      />

      <Composition
        id="StartAbCodexChorus1"
        component={DirectorRecipeCustomReel}
        width={1920}
        height={1080}
        fps={30}
        durationInFrames={startAbCodexChorus1TotalFrames}
        defaultProps={{items: startAbCodexChorus1TimelineItems.map((item) => ({id: item.recipeId, durationInFrames: item.durationInFrames}))}}
      />

      <Composition
        id="StartExtendedOpeningRoughV1"
        component={StartExtendedOpeningRough}
        width={1920}
        height={1080}
        fps={30}
        durationInFrames={startExtendedOpeningRoughTotalFrames}
      />
    </>
  );
}
