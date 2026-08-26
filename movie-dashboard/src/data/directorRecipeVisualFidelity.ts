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
 */
export const motionPresetVisualSupport: MotionPresetVisualSupport[] = [
  support("type-mask-slide", "exact", "Dedicated mask reveal behavior is represented by TypographyRevealEngine mask mode."),
  support("type-char-stagger", "exact", "Character/element stagger behavior is represented by TypographyRevealEngine stagger mode."),
  support("type-word-punch", "exact", "Single-hit punch behavior is represented by TypographyRevealEngine punch mode."),
  support("type-tracking-burst", "exact", "2026-08-26: the adapter now routes to TypographyRevealEngine's dedicated `tracking` mode (letterSpacing burst-to-settle), verified by local Remotion render."),
  support("type-outline-fill", "exact", "2026-08-26: the adapter now routes to TypographyRevealEngine's dedicated `outline` mode (stroke-to-fill), verified by local Remotion render."),
  support("type-baseline-hop", "exact", "2026-08-26: the adapter now routes to TypographyRevealEngine's dedicated `hop` mode (Easing.bounce landing), verified by local Remotion render."),
  support("type-vertical-wipe", "exact", "2026-08-26: the adapter now routes to TypographyRevealEngine's dedicated `vertical-wipe` mode (clip-path inset reveal), verified by local Remotion render."),
  support("type-type-on-rhythm", "representative", "2026-08-26: the adapter now routes to TypographyRevealEngine's dedicated `word-stagger` mode (word-unit reveal, not char-unit), verified by local Remotion render. Still representative because words are demo-timed, not yet driven by real beat/marker data.", "Drive word reveals from marker/onset arrays."),
  support("type-triplet", "exact", "2026-08-26: the adapter now routes to TypographyRevealEngine's dedicated `triplet` mode (3-hit scale punch). The effect was subtle enough that a pixel bounding-box measurement was needed to confirm it beyond casual playback; see motionPreviewEvidence.ts."),
  support("type-counter-scroll", "representative", "2026-08-26: the adapter now routes to TypographyRevealEngine's dedicated `counter-scroll` mode (continuous marquee), verified by local Remotion render. Still representative because the background itself stays static in this preview; the intended background/text relative-speed contrast is not demonstrated.", "Combine with a moving background layer to show the actual counter-direction speed difference."),
  support("type-frame-lock", "exact", "2026-08-26: the adapter now routes to TypographyRevealEngine's dedicated `lock` mode (oversized off-frame translateX), verified by local Remotion render."),
  support("type-quiet-caption", "exact", "2026-08-26: TypographyRevealEngine gained a dedicated `quiet` mode (opacity-only fade, no translate/scale) and the adapter now routes to it, verified by local Remotion render."),
  support("photo-static-hero", "exact", "CameraTransformEngine static mode faithfully demonstrates a locked Hero frame."),
  support("photo-small-push", "exact", "CameraTransformEngine restrained push represents the named small-push grammar."),
  support("photo-slow-pull", "exact", "CameraTransformEngine pull mode represents the named slow-pull grammar."),
  support("photo-directional-pan", "exact", "CameraTransformEngine pan mode demonstrates directional motion; final direction still depends on real composition."),
  support("photo-2p5d-parallax", "exact", "A rendered-pixel oracle verifies that synthetic foreground/background layers move at distinct speeds. A real wedding photo will still require a source-specific non-generative mask."),
  support("photo-freeze-cutout", "representative", "2026-08-26: the adapter now routes to CameraTransformEngine's dedicated `freeze` mode (locked frame + notched graphic cutout border + FREEZE label). Still representative because it is a graphic-overlay cutout, not a true photo edge/background separation.", "Add non-AI mask/cutout demo using synthetic shapes or supplied alpha assets."),
  support("photo-contact-sheet-snap", "exact", "PhotoLayoutEngine contact-sheet mode provides the intended multi-photo layout grammar."),
  support("photo-split-panel", "exact", "PhotoLayoutEngine split-panel mode provides the intended 2-panel layout grammar."),
  support("cut-hard-accent", "placeholder", "NativeCutEngine visualizes an edit point, but does not yet show a real two-shot hard cut with matched source media.", "Add paired synthetic source shots to NativeCutEngine review mode."),
  support("cut-match-shape", "placeholder", "NativeCutEngine proves the cut slot only; shape correspondence between two shots is not demonstrated.", "Add paired geometry/source demo with an actual shape match."),
  support("wipe-directional-shape", "exact", "TransitionWipeEngine's dedicated `shape` variant (clip-path chevron) represents the named shape-wipe grammar. 2026-08-26 caveat: investigation of wipe-paper-edge (same clip-path+translate sweep technique) found the chevron silhouette is mostly visible in its settled state after the sweep, not as a point sweeping across the screen mid-motion; the visual is still clearly distinct from a rectangular color wipe, but the motion description was corrected in motionPreviewEvidence.ts."),
  support("wipe-paper-edge", "exact", "2026-08-26: TransitionWipeEngine gained a dedicated `paper` variant (jagged torn-edge clip-path) and the adapter now routes to it, verified by local Remotion render (the jagged silhouette is visible once the sweep settles, not during the sweep itself — see motionPreviewEvidence.ts)."),
  support("wipe-route-line", "representative", "2026-08-26: TransitionWipeEngine gained a dedicated `route-line` variant (an SVG path grows via strokeDashoffset, with a leading dot) and the adapter now routes to it, manually verified by local Remotion render. Kept at representative (not exact) because this preset is a required non-exact sentinel in check-director-recipe-visual-fidelity.mts pending the same independent rendered-pixel oracle used for the Phase J3 exact-promotion batch — manual eyeball confirmation alone does not satisfy that gate.", "Add an independent rendered-pixel oracle assertion (distinct line/dot pixels) before promoting to exact, following the photo-2p5d-parallax / accent-halftone-burst precedent."),
  support("flash-one-frame-soft", "exact", "2026-08-26: TransitionWipeEngine gained a dedicated `flash` variant (a 1-3 frame full-screen opacity pulse, independent of direction) and the adapter now routes to it, verified by local Remotion render."),
  support("whip-source-matched", "representative", "Directional wipe can illustrate motion direction, but a source-matched camera whip requires two moving clips. This preset stays out of Remotion's renderable scope (engine: davinci-edit) — the intended real implementation is a DaVinci-side whip between two matched-direction clips, not a Remotion demo.", "Add paired synthetic motion-source demo and direction validation, or verify directly in DaVinci once real matched footage exists."),
  support("color-field-release", "exact", "2026-08-26: the adapter now correctly routes to TransitionWipeEngine's dedicated `release` variant (fade-in/hold/fade-out color field) — previously the adapter never passed a `variant` prop at all, so this always silently fell back to the generic directional wipe despite the `release` variant already existing in the engine. Verified by local Remotion render after the wiring fix."),
  support("accent-speed-lines", "exact", "GraphicHitEngine has a distinct speed-lines variant."),
  support("accent-impact-frame", "exact", "GraphicHitEngine has a distinct impact variant for brief peak frames."),
  support("accent-halftone-burst", "exact", "A rendered-pixel oracle verifies a dedicated expanding field of separate halftone dots, distinct from generic triplet hits."),
  support("accent-scribble-underline", "exact", "A rendered-pixel oracle verifies a continuous animated underline across the frame rather than generic triplet circles."),
  support("accent-stamp-triplet", "exact", "A rendered-pixel oracle verifies three sequential horizontal zones — stamp → line → route dot — while the Hero frame remains unchanged."),
  support("accent-panel-grid", "exact", "PhotoLayoutEngine panel-grid mode represents the intended 2–3 panel anime-OP grammar."),
  support("accent-cel-shadow-sweep", "representative", "2026-08-26: GraphicHitEngine gained a dedicated `cel-shadow` variant (a diagonal clip-path shadow shape sweeps + brief overall darken) and the adapter now routes to it. The first implementation used a shadow color close to the navy backdrop and was nearly invisible; manually verified visible after switching to pure black + higher opacity. Kept at representative (not exact) because this preset is a required non-exact sentinel in check-director-recipe-visual-fidelity.mts pending the same independent rendered-pixel oracle used for the Phase J3 exact-promotion batch.", "Add an independent rendered-pixel oracle assertion (a darker diagonal region distinct from the base backdrop) before promoting to exact."),
  support("accent-micro-rgb-split", "representative", "2026-08-26: GraphicHitEngine gained a dedicated `rgb-split` variant and the adapter now routes to it, manually verified by local Remotion render. It is a brief full-screen red/green screen-blend overlay, not an edge-only chromatic aberration on subject silhouettes — the named grammar (\"2〜4frameだけRGB edgeをずらす\") is approximated at the whole-frame level. Also kept at representative because this preset is a required non-exact sentinel in check-director-recipe-visual-fidelity.mts pending an independent rendered-pixel oracle.", "Add an independent rendered-pixel oracle assertion, and consider restricting the color offset to detected subject/text edges instead of the full frame once real footage exists."),
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
