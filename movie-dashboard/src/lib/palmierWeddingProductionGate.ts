import {buildOpeningProductionStatusHandoff} from "../data/openingProductionStatusHandoff";
import {buildProfileProductionStatusHandoff} from "../data/profileProductionStatusHandoff";

export type PalmierWeddingProductionMovieId = "opening" | "profile";

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
};

export type PalmierWeddingProductionProject = {
  movieId: PalmierWeddingProductionMovieId;
  title: string;
  overallState: string;
  productionReady: boolean;
  nextGate: ReturnType<typeof buildOpeningProductionStatusHandoff>["opening"]["production"]["nextGate"];
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

function buildBridge(
  palmier: {current: boolean; contractVersion: string},
  davinci: {
    current: boolean;
    contractVersion: string;
    actualEvidence: {path: string; commands: {init: string; status: string; strict: string}};
  },
  readiness: NormalizedDeliveryReadiness,
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
  };
}

function openingProject(): PalmierWeddingProductionProject {
  const handoff = buildOpeningProductionStatusHandoff();
  const production = handoff.opening.production;
  const deliveryReadiness: NormalizedDeliveryReadiness = {
    macDaVinciActualVerified: production.readiness.macDaVinciActualVerified,
    finalDeliveryApproved: production.readiness.finalDeliveryApproved,
  };
  return {
    movieId: "opening",
    title: "Opening Movie",
    overallState: production.overallState,
    productionReady: production.nextGate.state === "PRODUCTION_READY",
    nextGate: production.nextGate,
    bridge: buildBridge(production.palmierHandoff, production.davinciHandoff, deliveryReadiness),
  };
}

function profileProject(): PalmierWeddingProductionProject {
  const handoff = buildProfileProductionStatusHandoff();
  const production = handoff.profile.production;
  const deliveryReadiness: NormalizedDeliveryReadiness = {
    macDaVinciActualVerified: String(production.readiness.macDaVinciActual) === "ACTUAL_VERIFIED",
    finalDeliveryApproved: production.readiness.finalDeliveryApproved,
  };
  return {
    movieId: "profile",
    title: "Profile Movie",
    overallState: production.overallState,
    productionReady: production.nextGate.state === "PRODUCTION_READY",
    nextGate: production.nextGate,
    bridge: buildBridge(production.palmierHandoff, production.davinciHandoff, deliveryReadiness),
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
      "PALMIER_CURRENT != DAVINCI_HANDOFF_CURRENT",
      "DAVINCI_HANDOFF_CURRENT != MAC_DAVINCI_ACTUAL_VERIFIED",
      "DAVINCI_ACTUAL_COMMAND_EXPORTED != MAC_DAVINCI_ACTUAL_VERIFIED",
      "MAC_DAVINCI_ACTUAL_VERIFIED != FINAL_DELIVERY_APPROVED",
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
      `palmier-davinci-bridge: ${project.bridge.state}`,
      `palmier-current: ${project.bridge.palmierCurrent ? "yes" : "no"} (${project.bridge.palmierContractVersion})`,
      `davinci-handoff-current: ${project.bridge.davinciHandoffCurrent ? "yes" : "no"} (${project.bridge.davinciContractVersion})`,
      `mac-davinci-actual-verified: ${project.bridge.macDaVinciActualVerified ? "yes" : "no"}`,
      `final-delivery-approved: ${project.bridge.finalDeliveryApproved ? "yes" : "no"}`,
      `davinci-actual-evidence: ${project.bridge.actualEvidencePath}`,
      `davinci-actual-init: ${project.bridge.actualCommands.init}`,
      `davinci-actual-status: ${project.bridge.actualCommands.status}`,
      `davinci-actual-strict: ${project.bridge.actualCommands.strict}`,
      "davinci-actual-note: exported commands are instructions only; Resolve GUI Actual remains NOT_RUN until current evidence is produced and strict verification passes",
      "recovery:",
      ...(project.nextGate.recovery.length > 0 ? project.nextGate.recovery.map((item) => `- ${item}`) : ["- none"]),
    );
  }

  lines.push("", "Guardrails:", ...gate.guardrails.map((item) => `- ${item}`), "");
  return lines.join("\n");
}
