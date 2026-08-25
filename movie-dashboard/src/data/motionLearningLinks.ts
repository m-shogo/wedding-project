import { fusionLearningRecipes } from "./fusionNodeTranslator";

export interface MotionLearningLink {
  patternId: string;
  fusionRecipeIds: string[];
  learningTopics: string[];
  whyNow: string;
}

/**
 * Just-in-time learning adapter.
 *
 * Motion Pattern definitions stay focused on discovery/production intent while
 * existing DaVinci/Fusion learning recipes remain the learning authority.
 * Do not duplicate tutorials here.
 */
export const motionLearningLinks: MotionLearningLink[] = [
  {
    patternId: "type-mask-reveal",
    fusionRecipeIds: ["fusion-masked-reveal"],
    learningTopics: ["Mask", "Text+", "Keyframe", "Easing", "Merge"],
    whyNow: "Mask Revealを実際に使う時だけ、既存のFusion学習レシピへ案内する。Patternを選ぶ前に用語暗記を要求しない。",
  },
];

export function getMotionLearningBundle(patternId: string) {
  const link = motionLearningLinks.find((candidate) => candidate.patternId === patternId);
  if (!link) return null;

  const fusionRecipes = link.fusionRecipeIds
    .map((recipeId) => fusionLearningRecipes.find((recipe) => recipe.recipeId === recipeId))
    .filter((recipe): recipe is NonNullable<typeof recipe> => Boolean(recipe));

  return {
    ...link,
    fusionRecipes,
  };
}
