import {buildOpeningProductionStatusHandoff} from "../data/openingProductionStatusHandoff";
import {buildProfileProductionStatusHandoff} from "../data/profileProductionStatusHandoff";
import {buildRemotionStudioToolingProductionDependency} from "../data/remotionStudioToolingProductionDependency";

export type PalmierWeddingProductionMovieId = "opening" | "profile";

type OpeningProduction = ReturnType<typeof buildOpeningProductionStatusHandoff>["opening"]["production"];
type ProductionNextGate = OpeningProduction["nextGate"];
type ProductionRecoveryAction = ProductionNextGate["blockerActions"][number];
type RemotionStudioToolingEvidence = OpeningProduction["remotionStudioToolingEvidence"];
type RemotionStudioToolingProductionDependency = ReturnType<typeof buildRemotionStudioToolingProductionDependency>;

export type PalmierDavinciRecoverySnapshot = {
  authority: "SHA_BOUND_FINAL_RENDER" | "CRITICAL_PATH_PRE_BUNDLE";
  sourceRenderSha256: string | null;
  blockerCodes: string[];
  blockerActions: ProductionRecoveryAction[];
  canonicalRecovery: string[];
  guardrails: string[];
};

export type PalmierDavinciProductionBridge = {
  state: "PALMIER_NOT_CURRENT" | "DAVINCI_HANDOFF_NOT_CURRENT" | "MAC_DAVINCI_ACTUAL_NOT_VERIFIED" | "FINAL_DELIVERY_APPROVAL_REQUIRED" | "READY";
  palmierCurrent: boolean;
  davinciHandoffCurrent: boolean;
  macDaVinciActualVerified: boolean;
  finalDeliveryApproved: boolean;
  palmierContractVersion: string;
  davinciContractVersion: string;
  actualEvidencePath: string;
  actualCommands: {
    init: string;
    status: string;
    strict: string;
  };
  recovery: PalmierDavinciRecoverySnapshot;
};

export type PalmierWeddingProductionProject = {
  movieId: PalmierWeddingProductionMovieId;
  title: string;
  overallState: string;
  productionReady: boolean;
  nextGate: ProductionNextGate;
  remotionStudioToolingEvidence: RemotionStudioToolingEvidence;
  remotionStudioToolingDependency: RemotionStudioToolingProductionDependency;
  bridge: PalmierDavinciProductionBridge;
};

export type PalmierWeddingProductionGate = {
  authority: "MOTION_STUDIO_WEDDING_PRODUCTION_GATE";
  selectedMovieId: string;
  productionReady: boolean;
  projects: PalmierWeddingProductionProject[];
  guardrails: readonly string[];
};

type NormalizedDeliveryReadiness = {
  macDaVinciActualVerified: boolean;
  finalDeliveryApproved: boolean;
};

type DavinciRecoveryCarrier = {
  productionRecovery?: {
    sourceRenderSha256?: unknown;
    blockerCodes?: unknown;
    blockerActions?: unknown;
    canonicalRecovery?: unknown;
    guardrails?: unknown;
  };
};

function cloneRecoveryAction(action: ProductionRecoveryAction): ProductionRecoveryAction {
  return {...action};
}

function normalizeRecoverySnapshot(davinci: DavinciRecoveryCarrier, nextGate: ProductionNextGate): PalmierDavinciRecoverySnapshot {
  const recovery = davinci.productionRecovery;
  const sourceRenderSha256 = typeof recovery?.sourceRenderSha256 === "string" && recovery.sourceRenderSha256.length > 0
    ? recovery.sourceRenderSha256
    : null;
  const blockerCodes = Array.isArray(recovery?.blockerCodes) && recovery.blockerCodes.every((item) => typeof item === "string")
    ? recovery.blockerCodes as string[]
    : null;
  const blockerActions = Array.isArray(recovery?.blockerActions)
    ? recovery.blockerActions as ProductionRecoveryAction[]
    : null;
  const canonicalRecovery = Array.isArray(recovery?.canonicalRecovery) && recovery.canonicalRecovery.every((item) => typeof item === "string")
    ? recovery.canonicalRecovery as string[]
    : null;
  const guardrails = Array.isArray(recovery?.guardrails) && recovery.guardrails.every((item) => typeof item === "string")
    ? recovery.guardrails as string[]
    : [];

  if (sourceRenderSha256 && blockerCodes && blockerActions && canonicalRecovery) {
    return {
      authority: "SHA_BOUND_FINAL_RENDER",
      sourceRenderSha256,
      blockerCodes: [...blockerCodes],
      blockerActions: blockerActions.map(cloneRecoveryAction),
      canonicalRecovery: [...canonicalRecovery],
      guardrails: [...guardrails],
    };
  }

  return {
    authority: "CRITICAL_PATH_PRE_BUNDLE",
    sourceRenderSha256: null,
    blockerCodes: [...nextGate.blockerCodes],
    blockerActions: nextGate.blockerActions.map(cloneRecoveryAction),
    canonicalRecovery: [...nextGate.recovery],
    guardrails: [
      "PRE_BUNDLE_RECOVERY_IS_NOT_FINAL_RENDER_SHA_BOUND",
      "CRITICAL_PATH_RECOVERY != DAVINCI_ACTUAL_EVIDENCE",
    ],
  };
}

function buildBridge(
  palmier: {current: boolean; contractVersion: string},
  davinci: {
    current: boolean;
    contractVersion: string;
    actualEvidence: {path: string; commands: {init: string; status: string; strict: string}};
  } & DavinciRecoveryCarrier,
  readiness: NormalizedDeliveryReadiness,
  nextGate: ProductionNextGate,
): PalmierDavinciProductionBridge {
  const state = !palmier.current
    ? "PALMIER_NOT_CURRENT"
    : !davinci.current
      ? "DAVINCI_HANDOFF_NOT_CURRENT"
      : !readiness.macDaVinciActualVerified
        ? "MAC_DAVINCI_ACTUAL_NOT_VERIFIED"
        : !readiness.finalDeliveryApproved
          ? "FINAL_DELIVERY_APPROVAL_REQUIRED"
          : "READY";

  return {
    state,
    palmierCurrent: palmier.current,
    davinciHandoffCurrent: davinci.current,
    macDaVinciActualVerified: readiness.macDaVinciActualVerified,
    finalDeliveryApproved: readiness.finalDeliveryApproved,
    palmierContractVersion: palmier.contractVersion,
    davinciContractVersion: davinci.contractVersion,
    actualEvidencePath: davinci.actualEvidence.path,
    actualCommands: {...davinci.actualEvidence.commands},
    recovery: normalizeRecoverySnapshot(davinci, nextGate),
  };
}

function openingProject(): PalmierWeddingProductionProject {
  const handoff = buildOpeningProductionStatusHandoff();
  const production = handoff.opening.production;
  const toolingDependency = buildRemotionStudioToolingProductionDependency("opening");
  const deliveryReadiness: NormalizedDeliveryReadiness = {
    macDaVinciActualVerified: production.readiness.macDaVinciActualVerified,
    finalDeliveryApproved: production.readiness.finalDeliveryApproved,
  };
  return {
    movieId: "opening",
    title: "Opening Movie",
    overallState: production.overallState,
    productionReady: production.nextGate.state === "PRODUCTION_READY" && !toolingDependency.blocking,
    nextGate: production.nextGate,
    remotionStudioToolingEvidence: production.remotionStudioToolingEvidence,
    remotionStudioToolingDependency: toolingDependency,
    bridge: buildBridge(production.palmierHandoff, production.davinciHandoff, deliveryReadiness, production.nextGate),
  };
}

function profileProject(): PalmierWeddingProductionProject {
  const handoff = buildProfileProductionStatusHandoff();
  const production = handoff.profile.production;
  const toolingDependency = buildRemotionStudioToolingProductionDependency("profile");
  const deliveryReadiness: NormalizedDeliveryReadiness = {
    macDaVinciActualVerified: String(production.readiness.macDaVinciActual) === "ACTUAL_VERIFIED",
    finalDeliveryApproved: production.readiness.finalDeliveryApproved,
  };
  return {
    movieId: "profile",
    title: "Profile Movie",
    overallState: production.overallState,
    productionReady: production.nextGate.state === "PRODUCTION_READY" && !toolingDependency.blocking,
    nextGate: production.nextGate,
    remotionStudioToolingEvidence: production.remotionStudioToolingEvidence,
    remotionStudioToolingDependency: toolingDependency,
    bridge: buildBridge(production.palmierHandoff, production.davinciHandoff, deliveryReadiness, production.nextGate),
  };
}

export function buildPalmierWeddingProductionGate(selectedMovieId: string): PalmierWeddingProductionGate {
  const projects = selectedMovieId === "opening"
    ? [openingProject()]
    : selectedMovieId === "profile"
      ? [profileProject()]
      : [openingProject(), profileProject()];

  return {
    authority: "MOTION_STUDIO_WEDDING_PRODUCTION_GATE",
    selectedMovieId,
    productionReady: projects.length > 0 && projects.every((project) => project.productionReady),
    projects,
    guardrails: [
      "AI_EDIT_FIX_READY != WEDDING_PRODUCTION_READY",
      "PALMIER_HANDOFF_EXPORTED != PRODUCTION_GATE_COMPLETED",
      "PRODUCTION_NEXT_GATE_EXPORTED != RECOVERY_EXECUTED",
      "BLOCKER_ACTION_EXPORTED != RECOVERY_EXECUTED",
      "PALMIER_CURRENT != DAVINCI_HANDOFF_CURRENT",
      "DAVINCI_HANDOFF_CURRENT != MAC_DAVINCI_ACTUAL_VERIFIED",
      "DAVINCI_ACTUAL_COMMAND_EXPORTED != MAC_DAVINCI_ACTUAL_VERIFIED",
      "SHA_BOUND_RECOVERY_EXPORTED != RECOVERY_EXECUTED",
      "MAC_DAVINCI_ACTUAL_VERIFIED != FINAL_DELIVERY_APPROVED",
      "REMOTION_STUDIO_TOOLING_EVIDENCE_EXPORTED != STUDIO_ACTUAL_VERIFIED",
      "ELEMENT_CANDIDATE_EXISTS != WEDDING_PROJECT_ADOPTED",
      "ELEMENT_ADOPTED_AND_STUDIO_ACTUAL_NOT_VERIFIED => WEDDING_PRODUCTION_BLOCKED",
      "UNADOPTED_ELEMENT_TOOLING_STATE_IS_NON_BLOCKING",
      "HUMAN_QA_NOT_RUN != HUMAN_QA_PASS",
      "MAC_DAVINCI_ACTUAL_NOT_RUN != MAC_DAVINCI_ACTUAL_VERIFIED",
    ],
  };
}

function markdownRecoveryAction(action: ProductionRecoveryAction) {
  const target = action.kind === "ROUTE" && action.route
    ? `route=${action.route}`
    : action.kind === "COMMAND" && action.command
      ? `command=${action.command}`
      : "human-action-required";
  return `- [${action.kind}] ${action.label} | ${target} | ${action.purpose}`;
}

export function buildPalmierWeddingProductionMarkdown(gate: PalmierWeddingProductionGate) {
  const lines = [
    "# Wedding Production Authority",
    "",
    `authority: ${gate.authority}`,
    `production-ready: ${gate.productionReady ? "yes" : "no"}`,
  ];

  for (const project of gate.projects) {
    const studio = project.remotionStudioToolingEvidence;
    const dependency = project.remotionStudioToolingDependency;
    lines.push(
      "",
      `## ${project.title}`,
      `overall-state: ${project.overallState}`,
      `production-ready: ${project.productionReady ? "yes" : "no"}`,
      `next-stage: ${project.nextGate.stage ?? "PRODUCTION_READY"}`,
      `artifact: ${project.nextGate.artifactPath ?? "—"}`,
      `blocker-codes: ${project.nextGate.blockerCodes.length > 0 ? project.nextGate.blockerCodes.join(", ") : "none"}`,
      "recovery-actions:",
      ...(project.nextGate.blockerActions.length > 0 ? project.nextGate.blockerActions.map(markdownRecoveryAction) : ["- none"]),
      `remotion-studio-tooling-state: ${studio.currentRepoState}`,
      `remotion-studio-summary: ${studio.summaryPath}`,
      `remotion-studio-summary-schema: ${studio.summarySchemaVersion}`,
      `remotion-studio-summary-authority: ${studio.summaryAuthority}`,
      `remotion-studio-status: ${studio.statusCommand}`,
      `remotion-studio-strict: ${studio.strictCommand}`,
      `remotion-studio-human-reviewed: ${studio.humanReviewed ? "yes" : "no"}`,
      `remotion-studio-production-dependency-promoted: ${studio.productionDependencyPromoted ? "yes" : "no"}`,
      `remotion-studio-project-adopted: ${dependency.adopted ? "yes" : "no"}`,
      `remotion-studio-project-dependency-state: ${dependency.state}`,
      `remotion-studio-project-dependency-blocking: ${dependency.blocking ? "yes" : "no"}`,
      `remotion-studio-project-adopted-candidates: ${dependency.adoptedCandidateIds.length > 0 ? dependency.adoptedCandidateIds.join(", ") : "none"}`,
      "remotion-studio-note: tooling evidence is non-blocking unless a project explicitly adopts an Element dependency; an adopted dependency fails closed until current Studio Actual + Human review + promotion are complete",
      `palmier-davinci-bridge: ${project.bridge.state}`,
      `palmier-current: ${project.bridge.palmierCurrent ? "yes" : "no"} (${project.bridge.palmierContractVersion})`,
      `davinci-handoff-current: ${project.bridge.davinciHandoffCurrent ? "yes" : "no"} (${project.bridge.davinciContractVersion})`,
      `davinci-recovery-authority: ${project.bridge.recovery.authority}`,
      `davinci-recovery-source-sha256: ${project.bridge.recovery.sourceRenderSha256 ?? "not-sha-bound-yet"}`,
      `mac-davinci-actual-verified: ${project.bridge.macDaVinciActualVerified ? "yes" : "no"}`,
      `final-delivery-approved: ${project.bridge.finalDeliveryApproved ? "yes" : "no"}`,
      `davinci-actual-evidence: ${project.bridge.actualEvidencePath}`,
      `davinci-actual-init: ${project.bridge.actualCommands.init}`,
      `davinci-actual-status: ${project.bridge.actualCommands.status}`,
      `davinci-actual-strict: ${project.bridge.actualCommands.strict}`,
      "davinci-actual-note: exported commands are instructions only; Resolve GUI Actual remains NOT_RUN until current evidence is produced and strict verification passes",
      "recovery:",
      ...(project.nextGate.recovery.length > 0 ? project.nextGate.recovery.map((item) => `- ${item}`) : ["- none"]),
      ...(dependency.recovery.length > 0 ? ["remotion-studio-dependency-recovery:", ...dependency.recovery.map((item) => `- ${item}`)] : []),
    );
  }

  lines.push("", "Guardrails:", ...gate.guardrails.map((item) => `- ${item}`), "");
  return lines.join("\n");
}
