import {openingProductionStatus} from "./openingProductionStatus.generated";
import {profileProductionStatus} from "./profileProductionStatus.generated";
import type {SceneProjectId} from "./visualSceneComposer";

export type ProductionActionKind = "COMMAND" | "INPUT_REQUIRED" | "HUMAN" | "NONE";

type GeneratedProductionStatus = {
  overallState: string;
  nextActions: readonly string[];
  readiness: {productionReady: boolean; [key: string]: unknown};
};

const COMMAND_PREFIX = /^(pnpm\s|node\s--no-warnings\s|npm\s|yarn\s)/;
const UNRESOLVED_INPUT = /(\/ABS\/PATH\/TO\/|<[^>]+>|\$\{?(?:SOURCE|INPUT|MEDIA|BGM|PATH)[A-Z0-9_]*\}?)/i;

export function classifyDashboardProductionAction(action: string): Exclude<ProductionActionKind, "NONE"> {
  if (!COMMAND_PREFIX.test(action.trim())) return "HUMAN";
  return UNRESOLVED_INPUT.test(action) ? "INPUT_REQUIRED" : "COMMAND";
}

function statusFor(projectId: SceneProjectId): GeneratedProductionStatus {
  return (projectId === "opening" ? openingProductionStatus : profileProductionStatus) as GeneratedProductionStatus;
}

export function getWeddingProductionNextAction(projectId: SceneProjectId) {
  const status = statusFor(projectId);
  const actions = status.nextActions.map((text, index) => ({index, text, kind: classifyDashboardProductionAction(text)}));
  const firstAction = actions[0] ?? null;
  const barrierIndex = actions.findIndex((action) => action.kind !== "COMMAND");
  const safeCommandsBeforeBarrier = actions.filter(
    (action) => action.kind === "COMMAND" && (barrierIndex < 0 || action.index < barrierIndex),
  );

  return {
    projectId,
    overallState: status.overallState,
    productionReady: status.readiness.productionReady === true,
    firstAction,
    actions,
    nextAutomationSafeCommand: safeCommandsBeforeBarrier[0]?.text ?? null,
    requiredInputTemplate: firstAction?.kind === "INPUT_REQUIRED" ? firstAction.text : null,
    humanRequired: firstAction?.kind === "HUMAN",
    evidenceBoundary: {
      macRemotionStudioGuiActual: "NOT_RUN" as const,
      macDaVinciGuiActual: "NOT_RUN" as const,
      actionExecutedByThisSurface: false,
      productionReadyPromotedByThisSurface: false,
    },
  };
}
