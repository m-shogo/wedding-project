import {typographyProductionRoutes, type TypographyProductionPatternId} from "./typographySceneProductionRouting";
import {getTypographyDaVinciRequiredBindingRoles} from "./typographyDaVinciPromotionPolicy";
import {getTypographyDaVinciActualWorkflow} from "./typographyDaVinciActualWorkflowRegistry";

export type TypographyDaVinciActualNextAction =
  | "CAPTURE_EXISTING_LIVE_READBACK"
  | "RUN_MAC_ACTUAL_CAPTURE"
  | "RUN_MAC_ACTUAL_VERIFICATION"
  | "HUMAN_PROMOTION_REVIEW";

export interface TypographyDaVinciActualRunItem {
  patternId: TypographyProductionPatternId;
  canonicalMode: string;
  implementationId: string;
  priority: number;
  nextAction: TypographyDaVinciActualNextAction;
  requiredBindingRoles: string[];
  translatorFile: string | null;
  actualArtifactFile: string;
  evidenceCaptureFile: string;
  verificationCommand: string;
  evidenceAuthority: "EVIDENCE_ONLY";
  machineParityRequired: true;
  visualQaRequired: readonly ["1X", "HALF_SPEED"];
  reviewedAtRequired: true;
  macActualState: "NOT_RUN" | "PASS";
  automaticPromotionAllowed: false;
  productionReady: false;
  rule: string;
}

const priorityOrder: TypographyProductionPatternId[] = [
  "type-mask-reveal",
  "type-char-stagger",
  "type-type-on-rhythm",
  "type-word-punch",
  "type-tracking-burst",
  "type-vertical-wipe",
  "type-outline-fill",
  "type-baseline-hop",
  "type-triplet",
];

export const typographyDaVinciSharedActualSteps = [
  "Open an isolated Mac Resolve sandbox; do not touch wedding production timelines.",
  "Open the exact translator / Actual artifact / evidence capture files listed in this manifest instead of re-discovering the workflow.",
  "Apply the routed implementationId and record the exact live tool/input identities.",
  "Capture raw Resolve readback before normalizing units or coordinates.",
  "Compare the readback against the canonical TypographyRevealEngine translator output.",
  "Prove every required binding role; one visible effect is not sufficient evidence.",
  "Review the rendered motion at 1x speed.",
  "Review the rendered motion at half speed to expose timing/easing defects.",
  "Record reviewedAt from the real human review session.",
  "Run the listed verificationCommand after saving evidence.",
  "Keep automaticPromotionAllowed=false and productionReady=false until a separate human promotion review.",
] as const;

export const typographyDaVinciActualRunPlan: TypographyDaVinciActualRunItem[] = typographyProductionRoutes.map((route) => {
  if (!route.davinciImplementationId) {
    throw new Error(`Typography route ${route.patternId} has no DaVinci implementation id`);
  }

  const requiredBindingRoles =
    route.patternId === "type-mask-reveal" ? [] : getTypographyDaVinciRequiredBindingRoles(route.patternId);
  const workflow = route.patternId === "type-mask-reveal" ? null : getTypographyDaVinciActualWorkflow(route.patternId);
  const nextAction: TypographyDaVinciActualNextAction = route.actualVerified
    ? "HUMAN_PROMOTION_REVIEW"
    : route.liveImplementationAvailable
      ? "CAPTURE_EXISTING_LIVE_READBACK"
      : route.actualEvidenceWorkflowAvailable
        ? "RUN_MAC_ACTUAL_CAPTURE"
        : "RUN_MAC_ACTUAL_VERIFICATION";

  return {
    patternId: route.patternId,
    canonicalMode: route.canonicalMode,
    implementationId: route.davinciImplementationId,
    priority: priorityOrder.indexOf(route.patternId) + 1,
    nextAction,
    requiredBindingRoles,
    translatorFile: workflow?.translatorFile ?? null,
    actualArtifactFile: workflow?.actualArtifactFile ?? "src/data/maskRevealSceneProductionBundle.ts",
    evidenceCaptureFile: workflow?.evidenceCaptureFile ?? "src/data/maskRevealDaVinciAppliedEvidence.ts",
    verificationCommand: workflow?.verificationCommand ?? "pnpm check:mask-reveal-davinci-applied-evidence",
    evidenceAuthority: "EVIDENCE_ONLY",
    machineParityRequired: true,
    visualQaRequired: ["1X", "HALF_SPEED"],
    reviewedAtRequired: true,
    macActualState: route.actualVerified ? "PASS" : "NOT_RUN",
    automaticPromotionAllowed: false,
    productionReady: false,
    rule:
      route.patternId === "type-mask-reveal"
        ? "既存live実装は存在するが、Mac Resolve applied-value/readback/render evidenceを実測するまでActual PASSへ昇格しない。"
        : "translatorとbounded evidence workflowの存在はActual成功ではない。manifest記載の正本ファイルを使い、Mac Resolveでraw readback、全required bindings、canonical parity、1x/half-speed QAを実証する。",
  };
});

export interface TypographyDaVinciActualRunManifestV1 {
  schemaVersion: "typography-davinci-actual-run-manifest/v1";
  authority: "PLAN_ONLY_NOT_ACTUAL_EVIDENCE";
  generatedAt: string;
  target: "MAC_DAVINCI_RESOLVE_ACTUAL";
  sharedSteps: readonly string[];
  items: TypographyDaVinciActualRunItem[];
  guardrails: readonly string[];
}

export function buildTypographyDaVinciActualRunManifest(
  generatedAt = new Date().toISOString(),
): TypographyDaVinciActualRunManifestV1 {
  return {
    schemaVersion: "typography-davinci-actual-run-manifest/v1",
    authority: "PLAN_ONLY_NOT_ACTUAL_EVIDENCE",
    generatedAt,
    target: "MAC_DAVINCI_RESOLVE_ACTUAL",
    sharedSteps: typographyDaVinciSharedActualSteps,
    items: typographyDaVinciActualRunPlan.map((item) => ({...item, requiredBindingRoles: [...item.requiredBindingRoles]})),
    guardrails: [
      "MANIFEST_GENERATED != MAC_ACTUAL_RUN",
      "WORKFLOW_FILE_LISTED != WORKFLOW_EXECUTED",
      "TRANSLATOR_READY != LIVE_BINDING_VERIFIED",
      "VISIBLE_EFFECT != REQUIRED_BINDINGS_PROVEN",
      "MACHINE_GATE_ELIGIBLE != HUMAN_PROMOTED",
      "ACTUAL_PASS != PRODUCTION_READY",
    ],
  };
}

export function buildTypographyDaVinciActualRunManifestJson(generatedAt?: string) {
  return JSON.stringify(buildTypographyDaVinciActualRunManifest(generatedAt), null, 2);
}

export const getTypographyDaVinciActualRunItem = (patternId: TypographyProductionPatternId) =>
  typographyDaVinciActualRunPlan.find((item) => item.patternId === patternId) ?? null;
