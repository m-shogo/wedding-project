import {
  buildPalmierWeddingProductionGate,
  type PalmierWeddingProductionGate,
  type PalmierWeddingProductionMovieId,
  type PalmierWeddingProductionProject,
} from "./palmierWeddingProductionGate";

export const DAVINCI_WEDDING_PRODUCTION_RECOVERY_SCHEMA = "wedding-davinci-production-recovery/v1" as const;

export type DaVinciWeddingProductionRecoveryAction =
  PalmierWeddingProductionProject["nextGate"]["blockerActions"][number];

export type DaVinciWeddingProductionRecoveryProject = {
  movieId: PalmierWeddingProductionMovieId;
  title: string;
  productionReady: boolean;
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

function projectRecovery(project: PalmierWeddingProductionProject): DaVinciWeddingProductionRecoveryProject {
  const recovery = project.bridge.recovery;
  const studio = project.remotionStudioToolingEvidence;
  return {
    movieId: project.movieId,
    title: project.title,
    productionReady: project.productionReady,
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
      "SHA_BOUND_RECOVERY_EXPORTED != MAC_DAVINCI_ACTUAL_VERIFIED",
      "DAVINCI_ACTUAL_COMMAND_EXPORTED != MAC_DAVINCI_ACTUAL_VERIFIED",
      "REMOTION_STUDIO_TOOLING_REFERENCE_EXPORTED != STUDIO_ACTUAL_VERIFIED",
      "REMOTION_STUDIO_TOOLING_NOT_ADOPTED => NON_BLOCKING_FOR_DAVINCI_RECOVERY",
      "MAC_DAVINCI_ACTUAL_REMAINS_NOT_RUN_UNTIL_GUI_EVIDENCE_IS_CURRENT",
    ],
  };
}

export function buildDaVinciWeddingProductionRecoveryBundle(selectedMovieId: string) {
  return buildDaVinciWeddingProductionRecoveryBundleFromGate(
    buildPalmierWeddingProductionGate(selectedMovieId),
  );
}

export function buildDaVinciWeddingProductionRecoveryJson(selectedMovieId: string) {
  return JSON.stringify(buildDaVinciWeddingProductionRecoveryBundle(selectedMovieId), null, 2);
}
