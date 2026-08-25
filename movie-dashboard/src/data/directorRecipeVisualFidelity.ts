import {directorRecipeCatalog, type DirectorRecipe} from "./directorRecipeCatalog.ts";
import {startMotionPresets} from "./startMotionKit.ts";

export type DirectorVisualFidelity = "exact" | "representative" | "placeholder";

export interface MotionPresetVisualSupport {
  presetId: string;
  fidelity: DirectorVisualFidelity;
  reason: string;
  nextUpgrade: string | null;
}

export interface DirectorRecipeVisualAudit {
  recipeId: string;
  fidelity: DirectorVisualFidelity;
  limitingPresetIds: string[];
  reasons: string[];
}

const support = (
  presetId: string,
  fidelity: DirectorVisualFidelity,
  reason: string,
  nextUpgrade: string | null = null,
): MotionPresetVisualSupport => ({presetId, fidelity, reason, nextUpgrade});

/**
 * Visual truth audit of the current shared Remotion renderer.
 *
 * IMPORTANT:
 * - `exact` means the preview implements the named visual grammar closely enough to judge it.
 * - `representative` means a related shared-engine visual is rendered, but the named look is
 *   simplified/approximated. It must not be presented as a faithful implementation.
 * - `placeholder` means the renderer mainly proves pipeline/edit-point structure; the named visual
 *   needs real paired media or a dedicated visual before a human can judge it.
 *
 * This intentionally judges more strictly than "resolveDirectorRecipeById() does not throw".
 */
export const motionPresetVisualSupport: MotionPresetVisualSupport[] = [
  support("type-mask-slide", "exact", "Dedicated mask reveal behavior is represented by TypographyRevealEngine mask mode."),
  support("type-char-stagger", "exact", "Character/element stagger behavior is represented by TypographyRevealEngine stagger mode."),
  support("type-word-punch", "exact", "Single-hit punch behavior is represented by TypographyRevealEngine punch mode."),
  support("type-tracking-burst", "representative", "Currently falls back to generic mask behavior; true animated tracking expansion is not distinct.", "Add tracking/letter-spacing mode to TypographyRevealEngine."),
  support("type-outline-fill", "representative", "Currently maps to generic punch behavior; outline-to-fill treatment is not drawn.", "Add outline-fill typography mode."),
  support("type-baseline-hop", "representative", "Currently maps to generic stagger behavior; baseline hop motion is not distinct.", "Add baseline-hop typography mode."),
  support("type-vertical-wipe", "representative", "Currently maps to generic mask behavior rather than a dedicated vertical typographic wipe.", "Add vertical mask direction control."),
  support("type-type-on-rhythm", "representative", "Stagger demonstrates rhythm-entry intent, but words are not yet driven by real beat/marker data.", "Drive word reveals from marker/onset arrays."),
  support("type-triplet", "representative", "Generic stagger communicates grouped text, but does not yet prove three discrete hit events.", "Add explicit 3-hit typography timing variant."),
  support("type-counter-scroll", "representative", "Currently maps to generic mask; counter-scrolling against background motion is not implemented.", "Add counter-scroll mode with directional background relation."),
  support("type-frame-lock", "representative", "Generic mask does not reproduce the intended oversized/off-frame poster lock.", "Add off-frame crop/lock typography layout mode."),
  support("type-quiet-caption", "representative", "Generic mask is more active than the intended static/minimal-fade quiet caption.", "Add static/fade-only typography mode."),
  support("photo-static-hero", "exact", "CameraTransformEngine static mode faithfully demonstrates a locked Hero frame."),
  support("photo-small-push", "exact", "CameraTransformEngine restrained push represents the named small-push grammar."),
  support("photo-slow-pull", "exact", "CameraTransformEngine pull mode represents the named slow-pull grammar."),
  support("photo-directional-pan", "exact", "CameraTransformEngine pan mode demonstrates directional motion; final direction still depends on real composition."),
  support("photo-2p5d-parallax", "representative", "Current adapter intentionally approximates 2.5D parallax as a restrained push; no foreground/background depth separation exists.", "Add layered foreground/background parallax variant using synthetic demo layers first."),
  support("photo-freeze-cutout", "representative", "Current adapter treats the photo as static; a true cutout edge/background separation is not shown.", "Add non-AI mask/cutout demo using synthetic shapes or supplied alpha assets."),
  support("photo-contact-sheet-snap", "exact", "PhotoLayoutEngine contact-sheet mode provides the intended multi-photo layout grammar."),
  support("photo-split-panel", "exact", "PhotoLayoutEngine split-panel mode provides the intended 2-panel layout grammar."),
  support("cut-hard-accent", "placeholder", "NativeCutEngine visualizes an edit point, but does not yet show a real two-shot hard cut with matched source media.", "Add paired synthetic source shots to NativeCutEngine review mode."),
  support("cut-match-shape", "placeholder", "NativeCutEngine proves the cut slot only; shape correspondence between two shots is not demonstrated.", "Add paired geometry/source demo with an actual shape match."),
  support("wipe-directional-shape", "exact", "TransitionWipeEngine directional wipe represents the named shape-wipe grammar."),
  support("wipe-paper-edge", "representative", "A directional wipe is shown, but paper/ticket edge materiality is not distinct.", "Add paper-edge silhouette/texture variant."),
  support("wipe-route-line", "representative", "A wipe demonstrates direction, but the route line itself is not the reveal boundary.", "Add route-line path reveal variant."),
  support("flash-one-frame-soft", "representative", "Current transition implementation communicates a brief impact but is not a dedicated one-to-two-frame soft flash treatment.", "Add explicit short impact-frame opacity/luma variant."),
  support("whip-source-matched", "representative", "Directional wipe can illustrate motion direction, but a source-matched camera whip requires two moving clips.", "Add paired synthetic motion-source demo and direction validation."),
  support("color-field-release", "representative", "Opaque transition communicates release, but the intended calm color-field pause has no dedicated hold/settle treatment.", "Add color-field hold/release timing variant."),
  support("accent-speed-lines", "exact", "GraphicHitEngine has a distinct speed-lines variant."),
  support("accent-impact-frame", "exact", "GraphicHitEngine has a distinct impact variant for brief peak frames."),
  support("accent-halftone-burst", "representative", "Current adapter routes halftone burst to generic triplet graphics; no halftone field is drawn.", "Add halftone-dot burst variant."),
  support("accent-scribble-underline", "representative", "Current adapter routes scribble underline to generic triplet graphics; no hand-drawn underline path exists.", "Add animated scribble path variant."),
  support("accent-stamp-triplet", "representative", "Generic triplet proves three hits but does not yet distinguish stamp → line → route dot as three different graphic objects.", "Add dedicated stamp-line-route-dot triplet variant."),
  support("accent-panel-grid", "exact", "PhotoLayoutEngine panel-grid mode represents the intended 2–3 panel anime-OP grammar."),
  support("accent-cel-shadow-sweep", "representative", "Current adapter maps this to speed lines; a flat cel-shadow shape sweep is not distinct.", "Add cel-shadow polygon sweep variant."),
  support("accent-micro-rgb-split", "representative", "Current adapter maps this to generic impact; channel-edge separation is not rendered.", "Add 2–4 frame RGB channel offset variant."),
];

const fidelityRank: Record<DirectorVisualFidelity, number> = {exact: 0, representative: 1, placeholder: 2};
const supportByPresetId = new Map(motionPresetVisualSupport.map((item) => [item.presetId, item]));

export function getMotionPresetVisualSupport(presetId: string): MotionPresetVisualSupport {
  const item = supportByPresetId.get(presetId);
  if (!item) throw new Error(`Missing visual fidelity audit for Motion Kit preset: ${presetId}`);
  return item;
}

export function getDirectorRecipeVisualAudit(recipe: Pick<DirectorRecipe, "id" | "motionPresetIds">): DirectorRecipeVisualAudit {
  const supports = recipe.motionPresetIds.map(getMotionPresetVisualSupport);
  const worstRank = Math.max(...supports.map((item) => fidelityRank[item.fidelity]));
  const fidelity = (Object.entries(fidelityRank).find(([, rank]) => rank === worstRank)?.[0] ?? "placeholder") as DirectorVisualFidelity;
  const limiting = supports.filter((item) => item.fidelity === fidelity);
  return {recipeId: recipe.id, fidelity, limitingPresetIds: limiting.map((item) => item.presetId), reasons: limiting.map((item) => item.reason)};
}

export const directorRecipeVisualAudit: DirectorRecipeVisualAudit[] = directorRecipeCatalog.map(getDirectorRecipeVisualAudit);
export const directorVisualFidelityCounts: Record<DirectorVisualFidelity, number> = directorRecipeVisualAudit.reduce<Record<DirectorVisualFidelity, number>>(
  (counts, item) => {
    counts[item.fidelity] += 1;
    return counts;
  },
  {exact: 0, representative: 0, placeholder: 0},
);

export function validateMotionPresetVisualSupportCoverage(): string[] {
  const errors: string[] = [];
  const knownIds = new Set(startMotionPresets.map((preset) => preset.id));
  const auditedIds = new Set<string>();
  for (const item of motionPresetVisualSupport) {
    if (auditedIds.has(item.presetId)) errors.push(`duplicate visual audit presetId: ${item.presetId}`);
    auditedIds.add(item.presetId);
    if (!knownIds.has(item.presetId)) errors.push(`visual audit references unknown preset: ${item.presetId}`);
    if (item.fidelity !== "exact" && !item.nextUpgrade) errors.push(`non-exact preset must state nextUpgrade: ${item.presetId}`);
  }
  for (const preset of startMotionPresets) if (!auditedIds.has(preset.id)) errors.push(`Motion Kit preset has no visual audit: ${preset.id}`);
  return errors;
}
