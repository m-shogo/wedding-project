import {
  buildPalmierWeddingProductionGate,
  type PalmierEffectiveRecoveryAction,
  type PalmierWeddingProductionGate,
  type PalmierWeddingProductionMovieId,
  type PalmierWeddingProductionProject,
} from "./palmierWeddingProductionGate";

export const DAVINCI_WEDDING_PRODUCTION_RECOVERY_SCHEMA = "wedding-davinci-production-recovery/v2" as const;

export type DaVinciWeddingProductionRecoveryAction =
  PalmierWeddingProductionProject["nextGate"]["blockerActions"][number];
export type DaVinciRemotionStudioDependencyRecoveryAction =
  PalmierWeddingProductionProject["remotionStudioToolingDependency"]["recoveryActions"][number];

export type DaVinciWeddingProductionRecoveryProject = {
  movieId: PalmierWeddingProductionMovieId;
  title: string;
  productionReady: boolean;
  effectiveProductionState: PalmierWeddingProductionProject["effectiveProductionState"];
  blockingAuthorities: string[];
  effectiveNextGate: PalmierWeddingProductionProject["effectiveNextGate"];
  stage: string | null;
  artifactPath: string | null;
  recoveryAuthority: PalmierWeddingProductionProject["bridge"]["recovery"]["authority"];
  sourceRenderSha256: string | null;
  blockerCodes: string[];
  blockerActions: DaVinciWeddingProductionRecoveryAction[];
  canonicalRecovery: string[];
  recoveryGuardrails: string[];
  bridge: {
    state: PalmierWeddingProductionProject["bridge"]["state"];
    palmierCurrent: boolean;
    davinciHandoffCurrent: boolean;
    macDaVinciActualVerified: boolean;
    finalDeliveryApproved: boolean;
    palmierContractVersion: string;
    davinciContractVersion: string;
  };
  actual: {
    evidencePath: string;
    commands: {
      init: string;
      status: string;
      strict: string;
    };
  };
  remotionStudioTooling: {
    authority: PalmierWeddingProductionProject["remotionStudioToolingEvidence"]["authority"];
    summaryPath: string;
    summarySchemaVersion: string;
    summaryAuthority: string;
    evidencePath: string;
    statusCommand: string;
    strictCommand: string;
    candidateCount: number;
    checkAxesPerCandidate: number;
    currentRepoState: PalmierWeddingProductionProject["remotionStudioToolingEvidence"]["currentRepoState"];
    humanReviewed: boolean;
    productionDependencyPromoted: boolean;
    guardrails: string[];
  };
  remotionStudioDependency: {
    authority: PalmierWeddingProductionProject["remotionStudioToolingDependency"]["authority"];
    adopted: boolean;
    adoptedCandidateIds: string[];
    adoptedCandidateCount: number;
    state: PalmierWeddingProductionProject["remotionStudioToolingDependency"]["state"];
    blocking: boolean;
    studioActualVerified: boolean;
    humanReviewed: boolean;
    dependencyPromoted: boolean;
    recoveryActions: DaVinciRemotionStudioDependencyRecoveryAction[];
    recovery: string[];
    guardrails: string[];
  };
};

export type DaVinciWeddingProductionRecoveryBundle = {
  schemaVersion: typeof DAVINCI_WEDDING_PRODUCTION_RECOVERY_SCHEMA;
  authority: "MOTION_STUDIO_DAVINCI_PRODUCTION_RECOVERY";
  selectedMovieId: string;
  productionReady: boolean;
  projects: DaVinciWeddingProductionRecoveryProject[];
  guardrails: readonly string[];
};

function cloneAction(action: DaVinciWeddingProductionRecoveryAction): DaVinciWeddingProductionRecoveryAction {
  return {...action};
}

function cloneEffectiveAction(action: PalmierEffectiveRecoveryAction): PalmierEffectiveRecoveryAction {
  return {...action};
}

function cloneDependencyAction(
  action: DaVinciRemotionStudioDependencyRecoveryAction,
): DaVinciRemotionStudioDependencyRecoveryAction {
  return {...action};
}

function projectRecovery(project: PalmierWeddingProductionProject): DaVinciWeddingProductionRecoveryProject {
  const recovery = project.bridge.recovery;
  const studio = project.remotionStudioToolingEvidence;
  const dependency = project.remotionStudioToolingDependency;
  const effectiveNextGate = project.effectiveNextGate;
  return {
    movieId: project.movieId,
    title: project.title,
    productionReady: project.productionReady,
    effectiveProductionState: project.effectiveProductionState,
    blockingAuthorities: [...project.blockingAuthorities],
    effectiveNextGate: {
      authority: effectiveNextGate.authority,
      state: effectiveNextGate.state,
      stage: effectiveNextGate.stage,
      artifactPath: effectiveNextGate.artifactPath,
      blockerCodes: [...effectiveNextGate.blockerCodes],
      blockerActions: effectiveNextGate.blockerActions.map(cloneEffectiveAction),
      recovery: [...effectiveNextGate.recovery],
      adoptedCandidateIds: [...effectiveNextGate.adoptedCandidateIds],
    },
    stage: project.nextGate.stage,
    artifactPath: project.nextGate.artifactPath,
    recoveryAuthority: recovery.authority,
    sourceRenderSha256: recovery.sourceRenderSha256,
    blockerCodes: [...recovery.blockerCodes],
    blockerActions: recovery.blockerActions.map(cloneAction),
    canonicalRecovery: [...recovery.canonicalRecovery],
    recoveryGuardrails: [...recovery.guardrails],
    bridge: {
      state: project.bridge.state,
      palmierCurrent: project.bridge.palmierCurrent,
      davinciHandoffCurrent: project.bridge.davinciHandoffCurrent,
      macDaVinciActualVerified: project.bridge.macDaVinciActualVerified,
      finalDeliveryApproved: project.bridge.finalDeliveryApproved,
      palmierContractVersion: project.bridge.palmierContractVersion,
      davinciContractVersion: project.bridge.davinciContractVersion,
    },
    actual: {
      evidencePath: project.bridge.actualEvidencePath,
      commands: {...project.bridge.actualCommands},
    },
    remotionStudioTooling: {
      authority: studio.authority,
      summaryPath: studio.summaryPath,
      summarySchemaVersion: studio.summarySchemaVersion,
      summaryAuthority: studio.summaryAuthority,
      evidencePath: studio.evidencePath,
      statusCommand: studio.statusCommand,
      strictCommand: studio.strictCommand,
      candidateCount: studio.candidateCount,
      checkAxesPerCandidate: studio.checkAxesPerCandidate,
      currentRepoState: studio.currentRepoState,
      humanReviewed: studio.humanReviewed,
      productionDependencyPromoted: studio.productionDependencyPromoted,
      guardrails: [...studio.guardrails],
    },
    remotionStudioDependency: {
      authority: dependency.authority,
      adopted: dependency.adopted,
      adoptedCandidateIds: [...dependency.adoptedCandidateIds],
      adoptedCandidateCount: dependency.adoptedCandidateCount,
      state: dependency.state,
      blocking: dependency.blocking,
      studioActualVerified: dependency.studioActualVerified,
      humanReviewed: dependency.humanReviewed,
      dependencyPromoted: dependency.dependencyPromoted,
      recoveryActions: dependency.recoveryActions.map(cloneDependencyAction),
      recovery: [...dependency.recovery],
      guardrails: [...dependency.guardrails],
    },
  };
}

export function buildDaVinciWeddingProductionRecoveryBundleFromGate(
  gate: PalmierWeddingProductionGate,
): DaVinciWeddingProductionRecoveryBundle {
  return {
    schemaVersion: DAVINCI_WEDDING_PRODUCTION_RECOVERY_SCHEMA,
    authority: "MOTION_STUDIO_DAVINCI_PRODUCTION_RECOVERY",
    selectedMovieId: gate.selectedMovieId,
    productionReady: gate.productionReady,
    projects: gate.projects.map(projectRecovery),
    guardrails: [
      ...gate.guardrails,
      "DAVINCI_RECOVERY_EXPORTED != RECOVERY_EXECUTED",
      "DAVINCI_RECOVERY_ACTION_EXPORTED != DAVINCI_TIMELINE_MUTATED",
      "EFFECTIVE_NEXT_GATE_EXPORTED != EFFECTIVE_GATE_COMPLETED",
      "EFFECTIVE_NEXT_GATE_PREFERS_WEDDING_BLOCKER_BEFORE_REMOTION_DEPENDENCY",
      "SHA_BOUND_RECOVERY_EXPORTED != MAC_DAVINCI_ACTUAL_VERIFIED",
      "DAVINCI_ACTUAL_COMMAND_EXPORTED != MAC_DAVINCI_ACTUAL_VERIFIED",
      "REMOTION_STUDIO_TOOLING_REFERENCE_EXPORTED != STUDIO_ACTUAL_VERIFIED",
      "REMOTION_STUDIO_DEPENDENCY_EXPORTED != DEPENDENCY_RECOVERY_EXECUTED",
      "REMOTION_STUDIO_TOOLING_NOT_ADOPTED => NON_BLOCKING_FOR_DAVINCI_RECOVERY",
      "ADOPTED_REMOTION_STUDIO_DEPENDENCY_BLOCKS_DAVINCI_PRODUCTION_UNTIL_READY",
      "MAC_DAVINCI_ACTUAL_REMAINS_NOT_RUN_UNTIL_GUI_EVIDENCE_IS_CURRENT",
    ],
  };
}

export function buildDaVinciWeddingProductionRecoveryBundle(selectedMovieId: string) {
  return buildDaVinciWeddingProductionRecoveryBundleFromGate(
    buildPalmierWeddingProductionGate(selectedMovieId),
  );
}

function markdownRecoveryAction(action: DaVinciWeddingProductionRecoveryAction | PalmierEffectiveRecoveryAction) {
  const target = action.kind === "ROUTE" && action.route
    ? `route=${action.route}`
    : action.kind === "COMMAND" && action.command
      ? `command=${action.command}`
      : "human-action-required";
  return `- [${action.kind}] ${action.label} | ${target} | ${action.purpose}`;
}

function markdownDependencyAction(action: DaVinciRemotionStudioDependencyRecoveryAction) {
  const target = action.kind === "COMMAND" && action.command
    ? `command=${action.command}`
    : "human-action-required";
  return `- [${action.kind}] ${action.label} | ${target} | ${action.purpose}`;
}

export function buildDaVinciWeddingProductionRecoveryMarkdown(selectedMovieId: string) {
  const bundle = buildDaVinciWeddingProductionRecoveryBundle(selectedMovieId);
  const lines = [
    "# DaVinci Wedding Production Recovery",
    "",
    `schema: ${bundle.schemaVersion}`,
    `authority: ${bundle.authority}`,
    `production-ready: ${bundle.productionReady ? "yes" : "no"}`,
  ];

  for (const project of bundle.projects) {
    const studio = project.remotionStudioTooling;
    const dependency = project.remotionStudioDependency;
    const effectiveNextGate = project.effectiveNextGate;
    lines.push(
      "",
      `## ${project.title}`,
      `production-ready: ${project.productionReady ? "yes" : "no"}`,
      `effective-production-state: ${project.effectiveProductionState}`,
      `blocking-authorities: ${project.blockingAuthorities.length > 0 ? project.blockingAuthorities.join(", ") : "none"}`,
      "",
      "### Effective next gate",
      `effective-next-authority: ${effectiveNextGate.authority ?? "none"}`,
      `effective-next-state: ${effectiveNextGate.state}`,
      `effective-next-stage: ${effectiveNextGate.stage ?? "PRODUCTION_READY"}`,
      `effective-next-artifact: ${effectiveNextGate.artifactPath ?? "—"}`,
      `effective-next-blocker-codes: ${effectiveNextGate.blockerCodes.length > 0 ? effectiveNextGate.blockerCodes.join(", ") : "none"}`,
      `effective-next-adopted-candidates: ${effectiveNextGate.adoptedCandidateIds.length > 0 ? effectiveNextGate.adoptedCandidateIds.join(", ") : "none"}`,
      "effective-next-recovery-actions:",
      ...(effectiveNextGate.blockerActions.length > 0 ? effectiveNextGate.blockerActions.map(markdownRecoveryAction) : ["- none"]),
      "effective-next-recovery:",
      ...(effectiveNextGate.recovery.length > 0 ? effectiveNextGate.recovery.map((item) => `- ${item}`) : ["- none"]),
      "",
      "### Canonical Wedding recovery",
      `stage: ${project.stage ?? "PRODUCTION_READY"}`,
      `artifact: ${project.artifactPath ?? "—"}`,
      `recovery-authority: ${project.recoveryAuthority}`,
      `source-render-sha256: ${project.sourceRenderSha256 ?? "not-sha-bound-yet"}`,
      `blocker-codes: ${project.blockerCodes.length > 0 ? project.blockerCodes.join(", ") : "none"}`,
      "recovery-actions:",
      ...(project.blockerActions.length > 0 ? project.blockerActions.map(markdownRecoveryAction) : ["- none"]),
      "canonical-recovery:",
      ...(project.canonicalRecovery.length > 0 ? project.canonicalRecovery.map((item) => `- ${item}`) : ["- none"]),
      "",
      "### Palmier → DaVinci bridge",
      `bridge-state: ${project.bridge.state}`,
      `palmier-current: ${project.bridge.palmierCurrent ? "yes" : "no"} (${project.bridge.palmierContractVersion})`,
      `davinci-handoff-current: ${project.bridge.davinciHandoffCurrent ? "yes" : "no"} (${project.bridge.davinciContractVersion})`,
      `mac-davinci-actual-verified: ${project.bridge.macDaVinciActualVerified ? "yes" : "no"}`,
      `final-delivery-approved: ${project.bridge.finalDeliveryApproved ? "yes" : "no"}`,
      `davinci-actual-evidence: ${project.actual.evidencePath}`,
      `davinci-actual-init: ${project.actual.commands.init}`,
      `davinci-actual-status: ${project.actual.commands.status}`,
      `davinci-actual-strict: ${project.actual.commands.strict}`,
      "davinci-actual-note: command export or evidence init is not Mac DaVinci Actual verification; Resolve GUI evidence must be current before strict can pass",
      "",
      "### Remotion Studio tooling reference",
      `tooling-authority: ${studio.authority}`,
      `tooling-state: ${studio.currentRepoState}`,
      `tooling-summary: ${studio.summaryPath}`,
      `tooling-summary-schema: ${studio.summarySchemaVersion}`,
      `tooling-summary-authority: ${studio.summaryAuthority}`,
      `tooling-evidence: ${studio.evidencePath}`,
      `tooling-candidates: ${studio.candidateCount}`,
      `tooling-check-axes-per-candidate: ${studio.checkAxesPerCandidate}`,
      `tooling-human-reviewed: ${studio.humanReviewed ? "yes" : "no"}`,
      `tooling-production-dependency-promoted: ${studio.productionDependencyPromoted ? "yes" : "no"}`,
      `tooling-status: ${studio.statusCommand}`,
      `tooling-strict: ${studio.strictCommand}`,
      "tooling-note: reference export is not Studio Actual verification and remains non-blocking unless this Wedding project explicitly adopts an Element dependency",
      "",
      "### Remotion Studio project dependency",
      `dependency-authority: ${dependency.authority}`,
      `dependency-adopted: ${dependency.adopted ? "yes" : "no"}`,
      `dependency-adopted-count: ${dependency.adoptedCandidateCount}`,
      `dependency-adopted-candidates: ${dependency.adoptedCandidateIds.length > 0 ? dependency.adoptedCandidateIds.join(", ") : "none"}`,
      `dependency-state: ${dependency.state}`,
      `dependency-blocking: ${dependency.blocking ? "yes" : "no"}`,
      `dependency-studio-actual-verified: ${dependency.studioActualVerified ? "yes" : "no"}`,
      `dependency-human-reviewed: ${dependency.humanReviewed ? "yes" : "no"}`,
      `dependency-promoted: ${dependency.dependencyPromoted ? "yes" : "no"}`,
      "dependency-recovery-actions:",
      ...(dependency.recoveryActions.length > 0 ? dependency.recoveryActions.map(markdownDependencyAction) : ["- none"]),
      "dependency-note: candidate existence alone is non-blocking; explicit Wedding adoption fails closed until Studio Actual, Human review, and promotion are complete",
    );
  }

  lines.push("", "## Guardrails", ...bundle.guardrails.map((guardrail) => `- ${guardrail}`), "");
  return lines.join("\n");
}

export function buildDaVinciWeddingProductionRecoveryJson(selectedMovieId: string) {
  return JSON.stringify(buildDaVinciWeddingProductionRecoveryBundle(selectedMovieId), null, 2);
}
