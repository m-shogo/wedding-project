// Pure resolver for TransitionWipeEngine props, shared by:
// - StartMotionReel.tsx (モーション図鑑本体, driven by RenderableMotionPreset.direction/wipeVariant)
// - directorRecipeAdapter.ts (Director Recipe Catalog, driven by presetId lookup tables)
//
// Both call sites previously overloaded a single generic `mode` string to mean either
// "direction" or "variant" depending on which preset it was, which silently dropped several
// dedicated variants (route-line, flash) back to the generic rectangular wipe. This module gives
// direction and variant separate, typed fields and one resolution function so that mistake can't
// recur silently, and so a regression check can assert on the resolved output instead of on
// source-text string matching.
import type {TransitionWipeDirection, TransitionWipeVariant} from './engines';

export interface TransitionWipePresetInput {
  direction?: TransitionWipeDirection;
  wipeVariant?: TransitionWipeVariant;
}

export interface ResolvedTransitionWipeProps {
  direction: TransitionWipeDirection;
  variant: TransitionWipeVariant;
}

export const DEFAULT_TRANSITION_WIPE_DIRECTION: TransitionWipeDirection = 'right';
export const DEFAULT_TRANSITION_WIPE_VARIANT: TransitionWipeVariant = 'wipe';

export const TRANSITION_WIPE_PRESET_CONFIG = {
  'wipe-route-line': {direction: 'right', wipeVariant: 'route-line'},
  'flash-one-frame-soft': {wipeVariant: 'flash'},
  'wipe-directional-shape': {direction: 'right', wipeVariant: 'shape'},
  // Preserve the Director Recipe's already-rendered paper sweep direction and make the Motion
  // Reel use the same canonical configuration instead of maintaining a second mapping.
  'wipe-paper-edge': {direction: 'left', wipeVariant: 'paper'},
  'color-field-release': {wipeVariant: 'release'},
  // This remains a representative concept until two source-matched moving clips exist.
  'whip-source-matched': {direction: 'right', wipeVariant: 'wipe'},
} as const satisfies Record<string, TransitionWipePresetInput>;

export type TransitionWipePresetId = keyof typeof TRANSITION_WIPE_PRESET_CONFIG;

export function isTransitionWipePresetId(presetId: string): presetId is TransitionWipePresetId {
  return presetId in TRANSITION_WIPE_PRESET_CONFIG;
}

export function transitionWipePresetInput(presetId: TransitionWipePresetId): TransitionWipePresetInput {
  return {...TRANSITION_WIPE_PRESET_CONFIG[presetId]};
}

/**
 * Resolves the concrete TransitionWipeEngine props for a preset. `direction`/`wipeVariant` are
 * independent optional fields (not one overloaded string), so a preset that only cares about
 * variant (e.g. flash, which is direction-independent) does not need to fake a direction, and a
 * preset that only cares about direction does not need to fake a variant.
 */
export function resolveTransitionWipeProps(input: TransitionWipePresetInput): ResolvedTransitionWipeProps {
  return {
    direction: input.direction ?? DEFAULT_TRANSITION_WIPE_DIRECTION,
    variant: input.wipeVariant ?? DEFAULT_TRANSITION_WIPE_VARIANT,
  };
}

/** Resolve one catalog preset without a silent generic fallback for newly-added preset ids. */
export function resolveTransitionWipePresetProps(presetId: string): ResolvedTransitionWipeProps {
  if (!isTransitionWipePresetId(presetId)) {
    throw new Error(`Unknown transition-wipe preset id: ${presetId}`);
  }
  return resolveTransitionWipeProps(transitionWipePresetInput(presetId));
}
