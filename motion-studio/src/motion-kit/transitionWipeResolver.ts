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
