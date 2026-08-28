import {buildOpeningProductionStatusHandoff} from "../data/openingProductionStatusHandoff";
import {buildProfileProductionStatusHandoff} from "../data/profileProductionStatusHandoff";

export type PalmierWeddingProductionMovieId = "opening" | "profile";

export type PalmierWeddingProductionProject = {
  movieId: PalmierWeddingProductionMovieId;
  title: string;
  overallState: string;
  productionReady: boolean;
  nextGate: ReturnType<typeof buildOpeningProductionStatusHandoff>["opening"]["production"]["nextGate"];
  palmierHandoff: unknown;
  davinciHandoff: unknown;
};

export type PalmierWeddingProductionGate = {
  authority: "MOTION_STUDIO_WEDDING_PRODUCTION_GATE";
  selectedMovieId: string;
  productionReady: boolean;
  projects: PalmierWeddingProductionProject[];
  guardrails: readonly string[];
};

function openingProject(): PalmierWeddingProductionProject {
  const handoff = buildOpeningProductionStatusHandoff();
  const production = handoff.opening.production;
  return {
    movieId: "opening",
    title: "Opening Movie",
    overallState: production.overallState,
    productionReady: production.nextGate.state === "PRODUCTION_READY",
    nextGate: production.nextGate,
    palmierHandoff: production.palmierHandoff,
    davinciHandoff: production.davinciHandoff,
  };
}

function profileProject(): PalmierWeddingProductionProject {
  const handoff = buildProfileProductionStatusHandoff();
  const production = handoff.profile.production;
  return {
    movieId: "profile",
    title: "Profile Movie",
    overallState: production.overallState,
    productionReady: production.nextGate.state === "PRODUCTION_READY",
    nextGate: production.nextGate,
    palmierHandoff: production.palmierHandoff,
    davinciHandoff: production.davinciHandoff,
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
      "HUMAN_QA_NOT_RUN != HUMAN_QA_PASS",
      "MAC_DAVINCI_ACTUAL_NOT_RUN != MAC_DAVINCI_ACTUAL_VERIFIED",
    ],
  };
}

export function buildPalmierWeddingProductionMarkdown(gate: PalmierWeddingProductionGate) {
  const lines = [
    "# Wedding Production Authority",
    "",
    `authority: ${gate.authority}`,
    `production-ready: ${gate.productionReady ? "yes" : "no"}`,
  ];

  for (const project of gate.projects) {
    lines.push(
      "",
      `## ${project.title}`,
      `overall-state: ${project.overallState}`,
      `production-ready: ${project.productionReady ? "yes" : "no"}`,
      `next-stage: ${project.nextGate.stage ?? "PRODUCTION_READY"}`,
      `artifact: ${project.nextGate.artifactPath ?? "—"}`,
      `blocker-codes: ${project.nextGate.blockerCodes.length > 0 ? project.nextGate.blockerCodes.join(", ") : "none"}`,
      "recovery:",
      ...(project.nextGate.recovery.length > 0 ? project.nextGate.recovery.map((item) => `- ${item}`) : ["- none"]),
    );
  }

  lines.push("", "Guardrails:", ...gate.guardrails.map((item) => `- ${item}`), "");
  return lines.join("\n");
}
