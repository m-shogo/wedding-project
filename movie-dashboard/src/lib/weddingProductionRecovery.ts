import {
  buildDaVinciWeddingProductionRecoveryBundle,
  type DaVinciWeddingProductionRecoveryProject,
} from "./davinciWeddingProductionRecovery";
import type {WeddingProject} from "./weddingProductionActions";

export type WeddingProductionRecovery = {
  schemaVersion: string;
  authority: "MOTION_STUDIO_DAVINCI_PRODUCTION_RECOVERY";
  project: DaVinciWeddingProductionRecoveryProject;
  guardrails: readonly string[];
};

function movieIdForProject(project: WeddingProject): "opening" | "profile" {
  return project === "Opening" ? "opening" : "profile";
}

export function deriveWeddingProductionRecovery(project: WeddingProject): WeddingProductionRecovery {
  const movieId = movieIdForProject(project);
  const bundle = buildDaVinciWeddingProductionRecoveryBundle(movieId);
  const recoveryProject = bundle.projects.find((candidate) => candidate.movieId === movieId);

  if (!recoveryProject) {
    throw new Error(`Canonical DaVinci recovery project missing for ${project}`);
  }

  return {
    schemaVersion: bundle.schemaVersion,
    authority: bundle.authority,
    project: recoveryProject,
    guardrails: bundle.guardrails,
  };
}

export const weddingProductionRecoveries = {
  Opening: deriveWeddingProductionRecovery("Opening"),
  Profile: deriveWeddingProductionRecovery("Profile"),
} as const;
