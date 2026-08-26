import type {TypographyDaVinciActualCandidatePatternId} from "./typographyDaVinciPromotionPolicy";

export interface TypographyDaVinciActualWorkflowRecord {
  patternId: TypographyDaVinciActualCandidatePatternId;
  translatorFile: string;
  actualArtifactFile: string;
  evidenceCaptureFile: string;
  verificationCommand: string;
  evidenceAuthority: "EVIDENCE_ONLY";
  macActualRequired: true;
}

export const typographyDaVinciActualWorkflowRegistry: TypographyDaVinciActualWorkflowRecord[] = [
  {
    patternId: "type-char-stagger",
    translatorFile: "src/data/charStaggerDaVinciTranslator.ts",
    actualArtifactFile: "src/data/charStaggerDaVinciActualArtifact.ts",
    evidenceCaptureFile: "src/data/charStaggerDaVinciEvidenceCapture.ts",
    verificationCommand: "pnpm check:char-stagger-davinci-evidence-capture",
    evidenceAuthority: "EVIDENCE_ONLY",
    macActualRequired: true,
  },
  {
    patternId: "type-type-on-rhythm",
    translatorFile: "src/data/typeOnRhythmDaVinciTranslator.ts",
    actualArtifactFile: "src/data/typeOnRhythmDaVinciActualArtifact.ts",
    evidenceCaptureFile: "src/data/typeOnRhythmDaVinciEvidenceCapture.ts",
    verificationCommand: "pnpm check:type-on-rhythm-davinci-evidence",
    evidenceAuthority: "EVIDENCE_ONLY",
    macActualRequired: true,
  },
  {
    patternId: "type-word-punch",
    translatorFile: "src/data/wordPunchDaVinciTranslator.ts",
    actualArtifactFile: "src/data/wordPunchDaVinciActualArtifact.ts",
    evidenceCaptureFile: "src/data/wordPunchDaVinciEvidenceCapture.ts",
    verificationCommand: "pnpm check:word-punch-davinci-evidence",
    evidenceAuthority: "EVIDENCE_ONLY",
    macActualRequired: true,
  },
  {
    patternId: "type-tracking-burst",
    translatorFile: "src/data/trackingBurstDaVinciTranslator.ts",
    actualArtifactFile: "src/data/trackingBurstDaVinciActualArtifact.ts",
    evidenceCaptureFile: "src/data/trackingBurstDaVinciEvidenceCapture.ts",
    verificationCommand: "pnpm check:tracking-burst-davinci",
    evidenceAuthority: "EVIDENCE_ONLY",
    macActualRequired: true,
  },
  {
    patternId: "type-vertical-wipe",
    translatorFile: "src/data/verticalWipeDaVinciTranslator.ts",
    actualArtifactFile: "src/data/verticalWipeDaVinciActualArtifact.ts",
    evidenceCaptureFile: "src/data/verticalWipeDaVinciEvidenceCapture.ts",
    verificationCommand: "pnpm check:vertical-wipe-davinci",
    evidenceAuthority: "EVIDENCE_ONLY",
    macActualRequired: true,
  },
  {
    patternId: "type-outline-fill",
    translatorFile: "src/data/outlineFillDaVinciTranslator.ts",
    actualArtifactFile: "src/data/outlineFillDaVinciActualArtifact.ts",
    evidenceCaptureFile: "src/data/outlineFillDaVinciEvidenceCapture.ts",
    verificationCommand: "pnpm check:outline-fill-davinci",
    evidenceAuthority: "EVIDENCE_ONLY",
    macActualRequired: true,
  },
  {
    patternId: "type-baseline-hop",
    translatorFile: "src/data/baselineHopDaVinciTranslator.ts",
    actualArtifactFile: "src/data/baselineHopDaVinciActualArtifact.ts",
    evidenceCaptureFile: "src/data/baselineHopDaVinciEvidenceCapture.ts",
    verificationCommand: "node scripts/verify-baseline-hop-davinci-contracts.mjs",
    evidenceAuthority: "EVIDENCE_ONLY",
    macActualRequired: true,
  },
  {
    patternId: "type-triplet",
    translatorFile: "src/data/tripletDaVinciTranslator.ts",
    actualArtifactFile: "src/data/tripletDaVinciActualArtifact.ts",
    evidenceCaptureFile: "src/data/tripletDaVinciEvidenceCapture.ts",
    verificationCommand: "node scripts/verify-triplet-davinci-contracts.mjs",
    evidenceAuthority: "EVIDENCE_ONLY",
    macActualRequired: true,
  },
];

export function getTypographyDaVinciActualWorkflow(patternId: TypographyDaVinciActualCandidatePatternId) {
  const workflow = typographyDaVinciActualWorkflowRegistry.find((item) => item.patternId === patternId);
  if (!workflow) throw new Error(`Missing Typography DaVinci Actual workflow registry entry: ${patternId}`);
  return workflow;
}
