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
        bgm: {...openingProductionGate.bgm},
        ambience: openingProductionGate.ambience.map((item) => ({...item})),
        finalBlocked: openingProductionGate.finalBlocked,
      },
      production: {
        overallState: openingProductionStatus.overallState,
        stages: openingProductionStatus.stages,
        readiness: openingProductionStatus.readiness,
      },
    },
    guardrails: [
      "STATUS_EXPORTABLE != FINAL_RENDER_ELIGIBLE",
      "FINAL_RENDER_ELIGIBLE != PRODUCTION_READY",
      "DAVINCI_ACTUAL_VERIFIED != FINAL_DELIVERY_APPROVED",
      "CI_MUST_NOT_PROMOTE_MAC_GUI_ACTUAL",
    ],
  };
}

export function buildOpeningProductionStatusHandoffJson() {
  return JSON.stringify(buildOpeningProductionStatusHandoff(), null, 2);
}
