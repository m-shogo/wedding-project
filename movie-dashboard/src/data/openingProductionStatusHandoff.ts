import {openingProductionGate} from "./openingProductionGate.generated";
import {openingProductionStatus} from "./openingProductionStatus.generated";

export const OPENING_PRODUCTION_STATUS_HANDOFF_SCHEMA = "wedding-opening-production-status-handoff/v1" as const;

export function buildOpeningProductionStatusHandoff() {
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
        })),
        bgm: {...openingProductionGate.bgm},
        ambience: openingProductionGate.ambience.map((item) => ({...item})),
        finalBlocked: openingProductionGate.finalBlocked,
      },
      production: {
        overallState: openingProductionStatus.overallState,
        stages: openingProductionStatus.stages,
        readiness: openingProductionStatus.readiness,
        palmierHandoff: openingProductionStatus.handoff.palmier,
        nextActions: [...openingProductionStatus.nextActions],
      },
    },
    guardrails: [
      "STATUS_EXPORTABLE != FINAL_RENDER_ELIGIBLE",
      "FINAL_RENDER_ELIGIBLE != PRODUCTION_READY",
      "DAVINCI_ACTUAL_VERIFIED != FINAL_DELIVERY_APPROVED",
      "CI_MUST_NOT_PROMOTE_MAC_GUI_ACTUAL",
      "MEDIA_REQUIREMENT_EXPORTED != MEDIA_RESOLVED",
      "HANDOFF_METADATA_EXPORTED != HANDOFF_ARTIFACTS_CURRENT",
      "NEXT_ACTION_EXPORTED != ACTION_COMPLETED",
    ],
  };
}

export function buildOpeningProductionStatusHandoffJson() {
  return JSON.stringify(buildOpeningProductionStatusHandoff(), null, 2);
}
