import {openingProductionStatus} from "./openingProductionStatus.generated";
import {profileProductionStatus} from "./profileProductionStatus.generated";

export type WeddingMovieId = "opening" | "profile";
export type WeddingNextActionKind = "COMMAND" | "HUMAN" | "INPUT_REQUIRED";

type GeneratedProductionStatus = {
  overallState: string;
  nextActions: readonly string[];
  readiness: {productionReady: boolean};
  stages: Record<string, {state: string; detail: string; recovery?: readonly string[]}>;
};

const commandPrefix = /^(pnpm\s|node\s--no-warnings\s|npm\s|yarn\s|cd\s)/;
const unresolvedInput = /(\/ABS(?:OLUTE)?\/PATH\/TO\/|<[^>]+>|\$\{?(?:SOURCE|INPUT|MEDIA|BGM|PATH)[A-Z0-9_]*\}?)/i;

export function classifyWeddingNextAction(text: string): WeddingNextActionKind {
  const value = text.trim();
  if (!commandPrefix.test(value)) return "HUMAN";
  return unresolvedInput.test(value) ? "INPUT_REQUIRED" : "COMMAND";
}

function normalizeStatus(movieId: WeddingMovieId, status: GeneratedProductionStatus) {
  const actions = status.nextActions.map((text, index) => ({index, text, kind: classifyWeddingNextAction(text)}));
  const firstBarrierIndex = actions.findIndex((action) => action.kind !== "COMMAND");
  const commandsBeforeBarrier = actions.filter(
    (action) => action.kind === "COMMAND" && (firstBarrierIndex < 0 || action.index < firstBarrierIndex),
  );
  const firstAction = actions[0] ?? null;
  const blockedStages = Object.entries(status.stages)
    .filter(([, stage]) => stage.state !== "PASS")
    .map(([stageId, stage]) => ({stageId, state: stage.state, detail: stage.detail, recovery: [...(stage.recovery ?? [])]}));

  return {
    movieId,
    overallState: status.overallState,
    productionReady: status.readiness.productionReady,
    actions,
    firstAction,
    nextAutomationSafeCommand: commandsBeforeBarrier[0]?.text ?? null,
    inputRequiredBeforeFurtherAutomation: firstAction?.kind === "INPUT_REQUIRED",
    humanRequiredBeforeFurtherAutomation: firstAction?.kind === "HUMAN",
    blockedStages,
    evidenceBoundary: {
      remotionStudioGuiActual: "NOT_RUN" as const,
      macDaVinciGuiActual: "NOT_RUN" as const,
      finalDeliveryApprovedByThisSurface: false,
    },
  };
}

export function getWeddingProductionNextGate() {
  const projects = [
    normalizeStatus("opening", openingProductionStatus as unknown as GeneratedProductionStatus),
    normalizeStatus("profile", profileProductionStatus as unknown as GeneratedProductionStatus),
  ];
  const automation = projects.find((project) => project.nextAutomationSafeCommand && !project.productionReady);
  const input = projects.find((project) => project.inputRequiredBeforeFurtherAutomation && !project.productionReady);
  const human = projects.find((project) => project.humanRequiredBeforeFurtherAutomation && !project.productionReady);

  const selectedNextTarget = automation
    ? {movieId: automation.movieId, kind: "COMMAND" as const, action: automation.nextAutomationSafeCommand}
    : input
      ? {movieId: input.movieId, kind: "INPUT_REQUIRED" as const, action: input.firstAction?.text ?? null}
      : human
        ? {movieId: human.movieId, kind: "HUMAN" as const, action: human.firstAction?.text ?? null}
        : null;

  return {
    schemaVersion: "wedding-production-next-gate-dashboard/v1" as const,
    authority: "DERIVED_FROM_GENERATED_MOTION_STUDIO_PRODUCTION_STATUS" as const,
    projects,
    selectedNextTarget,
    productionReady: projects.every((project) => project.productionReady),
    guardrails: [
      "DASHBOARD_NEXT_GATE != ACTION_EXECUTED",
      "INPUT_REQUIRED != AUTOMATION_SAFE_COMMAND",
      "HUMAN_ACTION_MUST_NOT_BE_AUTOMATED",
      "REMOTION_STUDIO_GUI_ACTUAL_REMAINS_NOT_RUN_WITHOUT_REAL_GUI_EVIDENCE",
      "MAC_DAVINCI_GUI_ACTUAL_REMAINS_NOT_RUN_WITHOUT_REAL_GUI_EVIDENCE",
      "FINAL_DELIVERY_APPROVAL_REMAINS_HUMAN_ONLY",
    ] as const,
  };
}
