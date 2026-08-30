import {openingDavinciActualBindingAudit} from "./openingDavinciActualBindingAudit.generated";
import {profileDavinciActualBindingAudit} from "./profileDavinciActualBindingAudit.generated";
import {weddingProjectMotionProvenancePreflight} from "./weddingProjectMotionProvenancePreflight.generated";
import {buildOpeningProductionStatusHandoff} from "./openingProductionStatusHandoff";
import {buildProfileProductionStatusHandoff} from "./profileProductionStatusHandoff";

export const WEDDING_DAVINCI_DELIVERY_READINESS_SCHEMA = "wedding-davinci-delivery-readiness/v1" as const;

type ProjectReadinessState = "READY" | "BLOCKED" | "STALE" | "INVALID";
type WeddingReadinessState = ProjectReadinessState;
type ProjectMotionPreflight = {
  state: "CURRENT" | "NOT_APPLICABLE" | "INVALID";
  current: boolean;
  applicable: boolean;
  command: string;
  error: string | null;
};

const classifyProjectState = (
  auditState: string,
  finalApprovalCurrent: boolean,
  productionReady: boolean,
  projectMotion: ProjectMotionPreflight,
): ProjectReadinessState => {
  if (projectMotion.state === "INVALID") return "INVALID";
  if (auditState === "INVALID") return "INVALID";
  if (auditState === "STALE") return "STALE";
  if (auditState === "CURRENT_PASS" && finalApprovalCurrent && productionReady) return "READY";
  return "BLOCKED";
};

const projectMotionNextGate = (projectMotion: ProjectMotionPreflight) => projectMotion.state === "INVALID"
  ? {
      stage: "REVALIDATE_PROJECT_MOTION_PROVENANCE",
      command: projectMotion.command,
      blocker: projectMotion.error,
    }
  : null;

export function buildWeddingDavinciDeliveryReadiness() {
  const openingHandoff = buildOpeningProductionStatusHandoff();
  const profileHandoff = buildProfileProductionStatusHandoff();
  const openingProjectMotion: ProjectMotionPreflight = weddingProjectMotionProvenancePreflight.opening;
  const profileProjectMotion: ProjectMotionPreflight = weddingProjectMotionProvenancePreflight.profile;

  const openingState = classifyProjectState(
    openingDavinciActualBindingAudit.state,
    openingDavinciActualBindingAudit.finalApproval.current,
    openingDavinciActualBindingAudit.finalApproval.productionReady,
    openingProjectMotion,
  );
  const profileState = classifyProjectState(
    profileDavinciActualBindingAudit.state,
    profileDavinciActualBindingAudit.finalApproval.current,
    profileDavinciActualBindingAudit.finalApproval.productionReady,
    profileProjectMotion,
  );

  const overallState: WeddingReadinessState =
    openingState === "INVALID" || profileState === "INVALID"
      ? "INVALID"
      : openingState === "STALE" || profileState === "STALE"
        ? "STALE"
        : openingState === "READY" && profileState === "READY"
          ? "READY"
          : "BLOCKED";

  return {
    schemaVersion: WEDDING_DAVINCI_DELIVERY_READINESS_SCHEMA,
    authority: "MOTION_STUDIO_DERIVED_WEDDING_DAVINCI_READINESS" as const,
    state: overallState,
    strictDeliveryEligible: overallState === "READY",
    projectMotionSnapshot: {
      schemaVersion: weddingProjectMotionProvenancePreflight.schemaVersion,
      authority: weddingProjectMotionProvenancePreflight.authority,
    },
    opening: {
      state: openingState,
      projectMotion: openingProjectMotion,
      handoff: {
        schemaVersion: openingHandoff.schemaVersion,
        davinciContractVersion: openingHandoff.opening.production.davinciHandoff.contractVersion,
        current: openingHandoff.opening.production.davinciHandoff.current,
        finalRenderBoundRecoverySha256: openingDavinciActualBindingAudit.recovery.sha256,
        sourceRenderSha256: openingDavinciActualBindingAudit.recovery.sourceRenderSha256,
      },
      audit: {
        state: openingDavinciActualBindingAudit.state,
        current: openingDavinciActualBindingAudit.current,
        mismatches: [...openingDavinciActualBindingAudit.mismatches],
        recoverySha256: openingDavinciActualBindingAudit.recovery.sha256,
        actualEvidenceSha256: openingDavinciActualBindingAudit.actualEvidence.sha256,
        finalApprovalSha256: openingDavinciActualBindingAudit.finalApproval.sha256,
        finalApprovalCurrent: openingDavinciActualBindingAudit.finalApproval.current,
        finalApprovalDecision: openingDavinciActualBindingAudit.finalApproval.decision,
        productionReady: openingDavinciActualBindingAudit.finalApproval.productionReady,
      },
      nextGate: projectMotionNextGate(openingProjectMotion) ?? openingHandoff.opening.production.nextGate,
    },
    profile: {
      state: profileState,
      projectMotion: profileProjectMotion,
      handoff: {
        schemaVersion: profileHandoff.schemaVersion,
        davinciContractVersion: profileHandoff.profile.production.davinciHandoff.contractVersion,
        current: profileHandoff.profile.production.davinciHandoff.current,
        finalRenderBoundRecoverySha256: profileDavinciActualBindingAudit.recovery.sha256,
        sourceRenderSha256: profileDavinciActualBindingAudit.recovery.sourceRenderSha256,
      },
      audit: {
        state: profileDavinciActualBindingAudit.state,
        current: profileDavinciActualBindingAudit.current,
        mismatches: [...profileDavinciActualBindingAudit.mismatches],
        recoverySha256: profileDavinciActualBindingAudit.recovery.sha256,
        actualEvidenceSha256: profileDavinciActualBindingAudit.actualEvidence.sha256,
        finalApprovalSha256: profileDavinciActualBindingAudit.finalApproval.sha256,
        finalApprovalCurrent: profileDavinciActualBindingAudit.finalApproval.current,
        finalApprovalDecision: profileDavinciActualBindingAudit.finalApproval.decision,
        productionReady: profileDavinciActualBindingAudit.finalApproval.productionReady,
      },
      nextGate: projectMotionNextGate(profileProjectMotion) ?? profileHandoff.profile.production.nextGate,
    },
    guardrails: [
      "WEDDING_READY_REQUIRES_OPENING_AND_PROFILE_READY",
      "PROJECT_MOTION_INVALID => WEDDING_DELIVERY_INVALID",
      "PROJECT_MOTION_GENERATED_SNAPSHOT != LIVE_MAC_GUI_ACTUAL",
      "PROJECT_MOTION_NOT_APPLICABLE != VERIFIED",
      "RECOVERY_SHA_CHANGED => DELIVERY_READINESS_STALE",
      "DAVINCI_ACTUAL_SHA_CHANGED => FINAL_APPROVAL_STALE",
      "FINAL_APPROVAL_CURRENT_REQUIRES_CURRENT_RECOVERY_AND_ACTUAL_EVIDENCE",
      "NOT_RUN != VERIFIED",
      "CI_MUST_NOT_PROMOTE_MAC_GUI_ACTUAL",
    ],
  };
}

export function buildWeddingDavinciDeliveryReadinessJson() {
  return JSON.stringify(buildWeddingDavinciDeliveryReadiness(), null, 2);
}
