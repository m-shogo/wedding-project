import {openingAudioListeningStatus} from "./openingAudioListeningStatus.generated";
import {openingDavinciActualBindingAudit} from "./openingDavinciActualBindingAudit.generated";
import {openingProductionStatus} from "./openingProductionStatus.generated";

export const OPENING_AUTHORITATIVE_HANDOFF_OVERLAY_SCHEMA = "opening-authoritative-handoff-overlay/v1" as const;

export function buildOpeningAuthoritativeHandoffOverlay() {
  const audioCurrent =
    openingProductionStatus.stages.audioListeningReview.state === "PASS" &&
    openingAudioListeningStatus.state === "PASS" &&
    openingAudioListeningStatus.humanAudioQaComplete === true;

  const productionBundleCurrent =
    openingProductionStatus.readiness.productionBundleCurrent === true && audioCurrent;

  const palmierHandoffCurrent =
    openingProductionStatus.handoff.palmier.current === true && productionBundleCurrent;

  const davinciReportedCurrent = openingProductionStatus.handoff.davinci.current === true;
  const davinciHandoffCurrent = davinciReportedCurrent && productionBundleCurrent && audioCurrent;

  return {
    schemaVersion: OPENING_AUTHORITATIVE_HANDOFF_OVERLAY_SCHEMA,
    authority: "MOTION_STUDIO_OPENING_AUTHORITATIVE_HANDOFF_OVERLAY" as const,
    current: productionBundleCurrent && palmierHandoffCurrent && davinciHandoffCurrent,
    effective: {
      humanAudioListeningCurrent: audioCurrent,
      productionBundleCurrent,
      palmierHandoffCurrent,
      davinciHandoffCurrent,
      macDaVinciActualVerified: openingDavinciActualBindingAudit.current === true,
      productionReady: false,
    },
    reported: {
      productionBundleCurrent: openingProductionStatus.readiness.productionBundleCurrent === true,
      palmierHandoffCurrent: openingProductionStatus.handoff.palmier.current === true,
      davinciHandoffCurrent: davinciReportedCurrent,
    },
    blockerCodes: [
      ...(!audioCurrent ? ["OPENING_AUTHORITATIVE_AUDIO_CURRENTNESS_REQUIRED"] : []),
      ...(openingProductionStatus.readiness.productionBundleCurrent === true && !productionBundleCurrent
        ? ["OPENING_AUTHORITATIVE_BUNDLE_BLOCKED_BY_AUDIO_CURRENTNESS"]
        : []),
      ...(openingProductionStatus.handoff.palmier.current === true && !palmierHandoffCurrent
        ? ["OPENING_AUTHORITATIVE_PALMIER_BLOCKED_BY_AUDIO_CURRENTNESS"]
        : []),
      ...(davinciReportedCurrent && !davinciHandoffCurrent
        ? ["OPENING_AUTHORITATIVE_DAVINCI_BLOCKED_BY_AUDIO_CURRENTNESS"]
        : []),
    ],
    guardrails: [
      "REPORTED_BUNDLE_CURRENT != EFFECTIVE_BUNDLE_CURRENT_UNLESS_AUDIO_CURRENT",
      "REPORTED_PALMIER_CURRENT != EFFECTIVE_PALMIER_CURRENT_UNLESS_AUDIO_CURRENT",
      "REPORTED_DAVINCI_CURRENT != EFFECTIVE_DAVINCI_CURRENT_UNLESS_AUDIO_CURRENT",
      "PREVIEW_OR_BGM_SHA_CHANGED => HUMAN_AUDIO_LISTENING_REVIEW_STALE",
      "AUDIO_CURRENTNESS_STALE => DASHBOARD_HANDOFF_CURRENT_FALSE",
      "DASHBOARD_HANDOFF_CURRENT != MAC_DAVINCI_ACTUAL_VERIFIED",
      "CI_MUST_NOT_PROMOTE_MAC_GUI_ACTUAL",
    ] as const,
  };
}
