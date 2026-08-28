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
  blockerCodes: string[];
  blockerActions: DaVinciWeddingProductionRecoveryAction[];
  canonicalRecovery: string[];
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
  return {
    movieId: project.movieId,
    title: project.title,
    productionReady: project.productionReady,
    stage: project.nextGate.stage,
    artifactPath: project.nextGate.artifactPath,
    blockerCodes: [...project.nextGate.blockerCodes],
    blockerActions: project.nextGate.blockerActions.map(cloneAction),
    canonicalRecovery: [...project.nextGate.recovery],
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
      "DAVINCI_ACTUAL_COMMAND_EXPORTED != MAC_DAVINCI_ACTUAL_VERIFIED",
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
