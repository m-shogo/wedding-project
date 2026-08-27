import {profileProductionGate} from "./profileProductionGate.generated";
import {profileProductionStatus} from "./profileProductionStatus.generated";
import {profileRealMediaReviewGate} from "./profileRealMediaReviewGate.generated";

export const PROFILE_PRODUCTION_STATUS_HANDOFF_SCHEMA = "wedding-profile-production-status-handoff/v1" as const;

/**
 * Motion Zukan / DashboardからProfile制作を外へ渡す際のcompact production-status envelope。
 * assembly manifestをproduction-readyへ意味変更せず、Motion Studioの後段statusを追加で運ぶ。
 */
export function buildProfileProductionStatusHandoff() {
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
      },
    },
    guardrails: [
      "ASSEMBLY_READY != PRODUCTION_READY",
      "HUMAN_REAL_MEDIA_QA_PASS != FINAL_RENDER_REVIEW_PASS",
      "PRODUCTION_BUNDLE_CURRENT != MAC_DAVINCI_ACTUAL_VERIFIED",
      "MAC_DAVINCI_ACTUAL_VERIFIED != FINAL_DELIVERY_APPROVED",
      "MEDIA_REQUIREMENT_EXPORTED != MEDIA_RESOLVED",
    ],
  };
}

export function buildProfileProductionStatusHandoffJson() {
  return JSON.stringify(buildProfileProductionStatusHandoff(), null, 2);
}
