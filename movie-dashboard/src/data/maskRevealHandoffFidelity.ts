import { getHandoffProperty, type HandoffPropertyRecord } from "./palmierDavinciHandoffFidelity";

/**
 * Which entries of the canonical palmierDavinciHandoffFidelity registry are
 * actually relevant to type-mask-reveal's Palmier → DaVinci flow.
 *
 * Mask Reveal's own implementation (impl-type-mask-reveal-davinci-text-plus)
 * already declares Palmier as PALMIER_TIMING_ONLY / rough placement, and the
 * actual reveal motion as DAVINCI_REQUIRED, built directly in Fusion from
 * Human Master values. This list makes that split explicit in fidelity terms
 * instead of leaving it as prose only.
 */
export const maskRevealActiveHandoffPropertyIds = [
  "clip-placement-trim-speed",
  "position-scale-rotation-flip",
  "text-properties",
  "crop-keyframes",
] as const;

export interface MaskRevealHandoffFidelityReport {
  patternId: "type-mask-reveal";
  properties: HandoffPropertyRecord[];
  transportedCount: number;
  rebuildCount: number;
  allRuntimeVerified: boolean;
}

export function buildMaskRevealHandoffFidelityReport(): MaskRevealHandoffFidelityReport {
  const properties = maskRevealActiveHandoffPropertyIds
    .map((id) => getHandoffProperty(id))
    .filter((property): property is HandoffPropertyRecord => Boolean(property));

  const transportedCount = properties.filter((property) => property.transportClass === "EXACT" || property.transportClass === "APPROX").length;
  const rebuildCount = properties.length - transportedCount;
  const allRuntimeVerified = properties.every((property) => property.evidenceState === "RUNTIME_VERIFIED");

  return {
    patternId: "type-mask-reveal",
    properties,
    transportedCount,
    rebuildCount,
    allRuntimeVerified,
  };
}
