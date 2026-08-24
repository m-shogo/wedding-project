// Director Recipe Catalog -> shared Remotion engine adapter (Phase B).
//
// The Director Recipe Catalog (movie-dashboard/src/data/directorRecipeCatalog.ts, Phase A)
// records 97 editorial "recipes" as data only. It intentionally does NOT implement any
// renderer. This file is the adapter layer: it maps each recipe's `motionPresetIds`
// (references into the existing 36-entry Motion Kit, movie-dashboard/src/data/startMotionKit.ts)
// onto the small set of shared Remotion engines in ./engines.tsx.
//
// Design constraint: we do not create one hand-written component per recipe. Every recipe
// resolves, deterministically, to an ordered list of "layers" that reuse one of six shared
// engines (the original 4 + 2 added in Phase B: native-cut, photo-layout). A recipe with
// multiple motionPresetIds becomes multiple stacked layers (base + overlays).
import type {DirectorRecipe, DirectorRecipeCategory} from '../../../movie-dashboard/src/data/directorRecipeCatalog.ts';
import {directorRecipeCatalog, directorRecipeCategories} from '../../../movie-dashboard/src/data/directorRecipeCatalog.ts';
import type {StartMotionPreset} from '../../../movie-dashboard/src/data/startMotionKit.ts';
import {startMotionPresets} from '../../../movie-dashboard/src/data/startMotionKit.ts';
import type {MotionIntensity} from './engines';

export {directorRecipeCatalog, directorRecipeCategories};
export type {DirectorRecipe, DirectorRecipeCategory};

export type RecipeRenderEngine =
  | 'typography-reveal'
  | 'camera-transform'
  | 'transition-wipe'
  | 'graphic-hit'
  | 'native-cut'
  | 'photo-layout';

export interface RecipeLayer {
  engine: RecipeRenderEngine;
  presetId: string;
  intensity: MotionIntensity;
  props: Record<string, unknown>;
}

export interface ResolvedRecipe {
  recipe: DirectorRecipe;
  layers: RecipeLayer[];
  durationInFrames: number;
}

const presetById = new Map<string, StartMotionPreset>(startMotionPresets.map((preset) => [preset.id, preset]));

export function lookupMotionPreset(presetId: string): StartMotionPreset {
  const preset = presetById.get(presetId);
  if (!preset) {
    throw new Error(`directorRecipeAdapter: unknown motion preset id "${presetId}" (Motion Kit has ${startMotionPresets.length} presets)`);
  }
  return preset;
}

function pickIntensity(recipe: DirectorRecipe): MotionIntensity {
  // Recipes list allowed intensities (usually all of S/M/L). Preview at the middle of the
  // declared range so the demo is representative without being the loudest variant.
  if (recipe.intensity.includes('M')) return 'M';
  return recipe.intensity[0] ?? 'M';
}

function demoText(recipe: DirectorRecipe): string {
  return recipe.label.length > 26 ? `${recipe.label.slice(0, 24)}…` : recipe.label;
}

/** Camera-transform mode keyed off the preset id (not free text), so it stays deterministic. */
function cameraModeFor(presetId: string): 'static' | 'push' | 'pull' | 'pan' {
  if (presetId === 'photo-slow-pull') return 'pull';
  if (presetId === 'photo-directional-pan') return 'pan';
  if (presetId === 'photo-static-hero' || presetId === 'photo-freeze-cutout') return 'static';
  // photo-small-push, photo-2p5d-parallax (approximated as a restrained push; true parallax
  // needs per-layer depth separation which is out of scope for a data-driven preview).
  return 'push';
}

function typographyModeFor(preset: StartMotionPreset): 'mask' | 'punch' | 'stagger' {
  if (preset.beatBehavior === 'single-hit') return 'punch';
  if (preset.beatBehavior === 'stagger' || preset.beatBehavior === 'triplet') return 'stagger';
  return 'mask';
}

function wipeDirectionFor(presetId: string): 'left' | 'right' | 'up' | 'down' {
  if (presetId === 'wipe-paper-edge') return 'left';
  if (presetId === 'flash-one-frame-soft') return 'up';
  if (presetId === 'color-field-release') return 'down';
  return 'right';
}

function graphicVariantFor(presetId: string): 'triplet' | 'speed-lines' | 'impact' {
  if (presetId === 'accent-speed-lines' || presetId === 'accent-cel-shadow-sweep') return 'speed-lines';
  if (presetId === 'accent-impact-frame' || presetId === 'accent-micro-rgb-split') return 'impact';
  // accent-stamp-triplet, accent-scribble-underline, accent-halftone-burst: closest existing
  // variant is the triplet hit; a dedicated halftone/scribble look is future scope (Phase C).
  return 'triplet';
}

function nativeCutVariantFor(recipe: DirectorRecipe): 'hard' | 'j-cut' | 'l-cut' {
  if (recipe.id === 'cut-j-cut' || recipe.editGrammar.includes('J-cut') || recipe.editGrammar.includes('Jカット')) return 'j-cut';
  if (recipe.id === 'cut-l-cut' || recipe.editGrammar.includes('L-cut') || recipe.editGrammar.includes('Lカット')) return 'l-cut';
  return 'hard';
}

function resolveLayer(recipe: DirectorRecipe, presetId: string, intensity: MotionIntensity): RecipeLayer {
  const preset = lookupMotionPreset(presetId);

  if (preset.sharedEngine === 'typography-reveal') {
    return {
      engine: 'typography-reveal',
      presetId,
      intensity,
      props: {text: demoText(recipe), mode: typographyModeFor(preset), transparent: true},
    };
  }

  if (preset.sharedEngine === 'camera-transform') {
    if (presetId === 'photo-contact-sheet-snap') {
      return {engine: 'photo-layout', presetId, intensity, props: {variant: 'contact-sheet', count: 4}};
    }
    if (presetId === 'photo-split-panel') {
      return {engine: 'photo-layout', presetId, intensity, props: {variant: 'split-panel', count: 2}};
    }
    return {engine: 'camera-transform', presetId, intensity, props: {mode: cameraModeFor(presetId)}};
  }

  if (preset.sharedEngine === 'transition-wipe') {
    return {
      engine: 'transition-wipe',
      presetId,
      intensity,
      props: {direction: wipeDirectionFor(presetId), transparent: presetId !== 'color-field-release'},
    };
  }

  if (preset.sharedEngine === 'graphic-hit') {
    if (presetId === 'accent-panel-grid') {
      return {engine: 'photo-layout', presetId, intensity, props: {variant: 'panel-grid', count: 3}};
    }
    return {engine: 'graphic-hit', presetId, intensity, props: {variant: graphicVariantFor(presetId), transparent: true}};
  }

  // sharedEngine === 'native-cut': no dedicated visual preset exists upstream. Render the
  // edit-point placeholder so every recipe still resolves to something on screen.
  return {
    engine: 'native-cut',
    presetId,
    intensity,
    props: {label: recipe.label, variant: nativeCutVariantFor(recipe)},
  };
}

function clampDuration([min, max]: [number, number]): number {
  const target = max || min || 60;
  return Math.max(24, Math.min(180, target));
}

export function resolveDirectorRecipe(recipe: DirectorRecipe): ResolvedRecipe {
  if (recipe.motionPresetIds.length === 0) {
    throw new Error(`directorRecipeAdapter: recipe "${recipe.id}" has no motionPresetIds`);
  }
  const intensity = pickIntensity(recipe);
  const layers = recipe.motionPresetIds.map((presetId) => resolveLayer(recipe, presetId, intensity));
  return {recipe, layers, durationInFrames: clampDuration(recipe.durationFrames)};
}

export function resolveDirectorRecipeById(recipeId: string): ResolvedRecipe {
  const recipe = directorRecipeCatalog.find((entry) => entry.id === recipeId);
  if (!recipe) {
    throw new Error(`directorRecipeAdapter: unknown recipe id "${recipeId}"`);
  }
  return resolveDirectorRecipe(recipe);
}

/** Used by contract tests / the registry: every recipe must resolve without throwing. */
export function resolveAllDirectorRecipes(): ResolvedRecipe[] {
  return directorRecipeCatalog.map((recipe) => resolveDirectorRecipe(recipe));
}
