import {Composition} from 'remotion';
import {DirectorRecipePreview} from './compositions/common/DirectorRecipePreview';
import {directorRecipeCatalog} from './motion-kit/directorRecipeAdapter';
import {resolveDirectorRecipe} from './motion-kit/directorRecipeAdapter';

/**
 * One Composition per Director Recipe Catalog entry (97 as of Phase B), all backed by the
 * single data-driven DirectorRecipePreview component. This is intentional: the catalog stays
 * a data file (movie-dashboard/src/data/directorRecipeCatalog.ts) and this file never grows
 * one hand-written component per recipe.
 *
 * Composition id format: DirectorRecipe-<recipe.id>, e.g. DirectorRecipe-cam-locked-frame.
 * List all ids: pnpm exec remotion compositions src/index-director-recipes.ts
 * Render one: pnpm render:director-recipe <recipe-id>
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
    </>
  );
}
