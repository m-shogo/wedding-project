import {profileGeneratedAccents} from "./profileGeneratedAccents.generated";
import {profileProductionGate} from "./profileProductionGate.generated";
import {profileProductionStatus} from "./profileProductionStatus.generated";
import {profileRealMediaReviewGate} from "./profileRealMediaReviewGate.generated";
import type {MovieProductionBlockerRecoveryAction} from "./movieProductionBlockerRecovery";
import {buildWeddingMovieProductionCriticalPath} from "./weddingMovieProductionCriticalPath";

export const PROFILE_PRODUCTION_STATUS_HANDOFF_SCHEMA = "wedding-profile-production-status-handoff/v1" as const;

const buildNextGate = (project: ReturnType<typeof buildWeddingMovieProductionCriticalPath>["projects"]["profile"]) => {
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

/**
 * Motion Zukan / DashboardからProfile制作を外へ渡す際のcompact production-status envelope。
 * assembly manifestをproduction-readyへ意味変更せず、Motion Studioの後段statusとPalmier/DaVinci handoff contractを追加で運ぶ。
 */
export function buildProfileProductionStatusHandoff() {
  const criticalPath = buildWeddingMovieProductionCriticalPath();
  const profileCriticalPath = criticalPath.projects.profile;
  return {
    schemaVersion: PROFILE_PRODUCTION_STATUS_HANDOFF_SCHEMA,
    authority: "MOTION_STUDIO_DERIVED_PROFILE_STATUS_HANDOFF" as const,
    profile: {
      chapters: profileProductionGate.chapters.map((chapter) => ({
        chapterId: chapter.chapterId,
        order: chapter.order,
        title: chapter.title,
        role: chapter.role,
        editIntent: [...chapter.editIntent],
        requiredCount: chapter.requiredCount,
        readyCount: chapter.readyCount,
        ready: chapter.ready,
      })),
      media: {
        expected: profileProductionGate.expectedMediaCount,
        resolved: profileProductionGate.resolvedMediaCount,
        missing: profileProductionGate.mediaMissingCount,
        slots: profileProductionGate.mediaSlots.map((slot) => ({
          id: slot.id,
          chapterId: slot.chapterId,
          label: slot.label,
          kind: slot.kind,
          canonicalStem: slot.canonicalStem,
          file: slot.file,
          ready: slot.ready,
          intakeDirectory: "motion-studio/public/profile/",
        })),
      },
      generatedAccents: {
        count: profileGeneratedAccents.count,
        authority: profileGeneratedAccents.authority,
        accents: profileGeneratedAccents.accents.map((accent) => ({
          slotId: accent.slotId,
          chapterId: accent.chapterId,
          label: accent.label,
          implementation: accent.implementation,
          canonicalReuse: accent.canonicalReuse,
          source: accent.source,
          realMediaRequired: accent.realMediaRequired,
        })),
        evidence: profileGeneratedAccents.productionEvidence,
      },
      bgm: {...profileProductionGate.bgm},
      structureReview: {...profileProductionGate.structureReview},
      realMediaHumanQa: {
        state: profileRealMediaReviewGate.state,
        humanReviewComplete: profileRealMediaReviewGate.humanReviewComplete,
        mediaExpected: profileRealMediaReviewGate.mediaExpected,
        mediaReviewed: profileRealMediaReviewGate.mediaReviewed,
        blockers: [...profileRealMediaReviewGate.blockers],
      },
      production: {
        overallState: profileProductionStatus.overallState,
        stages: profileProductionStatus.stages,
        readiness: profileProductionStatus.readiness,
        sourceRevalidation: profileProductionStatus.sourceRevalidation,
        palmierHandoff: profileProductionStatus.handoff.palmier,
        davinciHandoff: profileProductionStatus.handoff.davinci,
        nextGate: buildNextGate(profileCriticalPath),
        nextActions: [...profileProductionStatus.nextActions],
      },
      criticalPath: criticalPath.projects.profile,
    },
    crossProjectCriticalPath: {
      productionReady: criticalPath.productionReady,
      opening: criticalPath.projects.opening,
      profile: criticalPath.projects.profile,
      guardrails: [...criticalPath.guardrails],
    },
    guardrails: [
      "ASSEMBLY_READY != PRODUCTION_READY",
      "HUMAN_REAL_MEDIA_QA_PASS != FINAL_RENDER_REVIEW_PASS",
      "PRODUCTION_BUNDLE_CURRENT != MAC_DAVINCI_ACTUAL_VERIFIED",
      "DAVINCI_HANDOFF_CURRENT != MAC_DAVINCI_ACTUAL_VERIFIED",
      "MAC_DAVINCI_ACTUAL_VERIFIED != FINAL_DELIVERY_APPROVED",
      "MEDIA_REQUIREMENT_EXPORTED != MEDIA_RESOLVED",
      "HANDOFF_METADATA_EXPORTED != HANDOFF_ARTIFACTS_CURRENT",
      "NEXT_ACTION_EXPORTED != ACTION_COMPLETED",
      "NEXT_GATE_EXPORTED != NEXT_GATE_COMPLETED",
      "ACTION_TARGET_EXPORTED != ACTION_COMPLETED",
      "BLOCKER_ACTION_EXPORTED != RECOVERY_EXECUTED",
      "STABLE_BLOCKER_CODE != RAW_BLOCKER_DETAIL",
      "GENERATED_ACCENT_IMPLEMENTED != HUMAN_REAL_MEDIA_QA_PASS",
      "OPTIONAL_GENERATED_ROLE != REQUIRED_REAL_MEDIA_SLOT",
      "SOURCE_CHANGED => RE_RENDER_REQUIRED",
      "RE_RENDER_REQUIRED => RE_REVIEW_REQUIRED",
      "OLD_HUMAN_REVIEW != CURRENT_RENDER_IMPLEMENTATION",
      "CRITICAL_PATH_EXPORTED != RECOVERY_EXECUTED",
    ],
  };
}

export function buildProfileProductionStatusHandoffJson() {
  return JSON.stringify(buildProfileProductionStatusHandoff(), null, 2);
}
