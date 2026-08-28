import {openingDavinciActualBindingAudit} from "./openingDavinciActualBindingAudit.generated";
import {openingProductionGate} from "./openingProductionGate.generated";
import {openingProductionStatus} from "./openingProductionStatus.generated";
import type {MovieProductionBlockerRecoveryAction} from "./movieProductionBlockerRecovery";
import {buildRemotionStudioActualToolingEvidence} from "./remotionStudioActualToolingEvidence";
import {buildWeddingMovieProductionCriticalPath} from "./weddingMovieProductionCriticalPath";

export const OPENING_PRODUCTION_STATUS_HANDOFF_SCHEMA = "wedding-opening-production-status-handoff/v1" as const;

const buildNextGate = (project: ReturnType<typeof buildWeddingMovieProductionCriticalPath>["projects"]["opening"]) => {
  const current = project.currentCriticalStage;
  return current
    ? {
        state: "BLOCKED" as const,
        stage: current.name,
        artifactPath: current.path ?? null,
        blockerCodes: [...current.blockerCodes],
        blockerActions: current.blockerActions.map((action) => ({...action})),
        recovery: [...current.recovery],
        actionTargets: current.actionTargets.map((target) => ({...target})),
      }
    : {
        state: "PRODUCTION_READY" as const,
        stage: null,
        artifactPath: null,
        blockerCodes: [] as string[],
        blockerActions: [] as MovieProductionBlockerRecoveryAction[],
        recovery: [] as string[],
        actionTargets: [] as Array<{label: string; route: string; purpose: string}>,
      };
};

export function buildOpeningProductionStatusHandoff() {
  const criticalPath = buildWeddingMovieProductionCriticalPath();
  const openingCriticalPath = criticalPath.projects.opening;
  return {
    schemaVersion: OPENING_PRODUCTION_STATUS_HANDOFF_SCHEMA,
    authority: "MOTION_STUDIO_DERIVED_OPENING_STATUS_HANDOFF" as const,
    opening: {
      media: {
        expectedPhotoCount: openingProductionGate.expectedPhotoCount,
        resolvedPhotoCount: openingProductionGate.resolvedPhotoCount,
        photoMissingCount: openingProductionGate.photoMissingCount,
        photoSlots: openingProductionGate.photoSlots.map((slot) => ({
          key: slot.key,
          resolved: slot.resolved,
          path: slot.path,
          preferredFileStem: slot.key,
          intakeDirectory: "motion-studio/public/photos/opening/",
          cropQaRequired: slot.cropQaRequired,
          effectivePresentation: slot.effectivePresentation,
        })),
        cropReview: {
          precedence: openingProductionGate.photos.cropQa.precedence,
          state: openingProductionGate.photos.cropQa.humanCropQaState,
          reviewedCount: openingProductionGate.photos.cropQa.humanCropQaReviewedCount,
          requiredCount: openingProductionGate.photos.cropQa.humanCropQaRequiredCount,
          blockerCodes: [...openingProductionGate.photos.cropQa.humanCropQaBlockerCodes],
          evidencePath: openingProductionGate.photos.cropQa.evidencePath,
          macStudioActualState: openingProductionGate.photos.cropQa.macStudioActualState,
          macDaVinciActualState: openingProductionGate.photos.cropQa.macDaVinciActualState,
          productionReady: openingProductionGate.photos.cropQa.productionReady,
        },
        bgm: {...openingProductionGate.bgm},
        ambience: openingProductionGate.ambience.map((item) => ({...item})),
        finalBlocked: openingProductionGate.finalBlocked,
      },
      production: {
        overallState: openingProductionStatus.overallState,
        stages: openingProductionStatus.stages,
        readiness: openingProductionStatus.readiness,
        sourceRevalidation: openingProductionStatus.sourceRevalidation,
        palmierHandoff: openingProductionStatus.handoff.palmier,
        davinciHandoff: openingProductionStatus.handoff.davinci,
        davinciActualBindingAudit: openingDavinciActualBindingAudit,
        remotionStudioToolingEvidence: buildRemotionStudioActualToolingEvidence(),
        nextGate: buildNextGate(openingCriticalPath),
        nextActions: [...openingProductionStatus.nextActions],
      },
      criticalPath: criticalPath.projects.opening,
    },
    crossProjectCriticalPath: {
      productionReady: criticalPath.productionReady,
      opening: criticalPath.projects.opening,
      profile: criticalPath.projects.profile,
      guardrails: [...criticalPath.guardrails],
    },
    guardrails: [
      "STATUS_EXPORTABLE != FINAL_RENDER_ELIGIBLE",
      "FINAL_RENDER_ELIGIBLE != PRODUCTION_READY",
      "PHOTO_SHA_OR_EFFECTIVE_FOCUS_OR_FIT_CHANGED => HUMAN_CROP_REVIEW_STALE",
      "HUMAN_CROP_REVIEW_PASS != HUMAN_PREVIEW_REVIEW_PASS",
      "PREVIEW_SOURCE_FINGERPRINT_STALE => HUMAN_PREVIEW_REVIEW_NOT_TRUSTED",
      "SOURCE_CHANGED => RE_RENDER_REQUIRED",
      "RE_RENDER_REQUIRED => RE_REVIEW_REQUIRED",
      "OLD_HUMAN_REVIEW != CURRENT_RENDER_IMPLEMENTATION",
      "PREVIEW_REVIEW_PASS != FINAL_RENDER_REVIEW_PASS",
      "FINAL_RENDER_OR_SOURCE_CHANGED => FINAL_RENDER_RE_REVIEW_REQUIRED",
      "HUMAN_FINAL_RENDER_REVIEW_PASS != DAVINCI_ACTUAL_VERIFIED",
      "DAVINCI_HANDOFF_CURRENT != MAC_DAVINCI_ACTUAL_VERIFIED",
      "DAVINCI_RECOVERY_OR_ACTUAL_CHANGED => FINAL_APPROVAL_STALE",
      "DAVINCI_ACTUAL_VERIFIED != FINAL_DELIVERY_APPROVED",
      "CI_MUST_NOT_PROMOTE_MAC_GUI_ACTUAL",
      "MEDIA_REQUIREMENT_EXPORTED != MEDIA_RESOLVED",
      "HANDOFF_METADATA_EXPORTED != HANDOFF_ARTIFACTS_CURRENT",
      "NEXT_ACTION_EXPORTED != ACTION_COMPLETED",
      "NEXT_GATE_EXPORTED != NEXT_GATE_COMPLETED",
      "ACTION_TARGET_EXPORTED != ACTION_COMPLETED",
      "BLOCKER_ACTION_EXPORTED != RECOVERY_EXECUTED",
      "STABLE_BLOCKER_CODE != RAW_BLOCKER_DETAIL",
      "REMOTION_STUDIO_TOOLING_EVIDENCE_EXPORTED != STUDIO_ACTUAL_VERIFIED",
      "REMOTION_STUDIO_TOOLING_EVIDENCE != WEDDING_PRODUCTION_GATE",
      "CRITICAL_PATH_EXPORTED != RECOVERY_EXECUTED",
    ],
  };
}

export function buildOpeningProductionStatusHandoffJson() {
  return JSON.stringify(buildOpeningProductionStatusHandoff(), null, 2);
}
