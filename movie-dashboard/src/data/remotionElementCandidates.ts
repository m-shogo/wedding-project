export type RemotionElementReadiness =
  | "PREVIEW_ONLY"
  | "ELEMENT_CANDIDATE"
  | "STUDIO_ACTUAL_VERIFIED";

export type StudioActualState = "NOT_RUN" | "PASS" | "FAIL" | "BLOCKED";

export interface RemotionElementCandidateRecord {
  patternId: string;
  readiness: RemotionElementReadiness;
  canonicalEngine: "TypographyRevealEngine";
  canonicalMode: "mask" | "stagger" | "word-stagger" | "punch" | "tracking" | "vertical-wipe" | "outline" | "hop" | "triplet";
  payloadSlug: string;
  builderScript: string;
  checkerScript: string;
  editableFields: string[];
  standaloneRenderCi: boolean;
  studioInstallActual: StudioActualState;
  studioControlReadbackActual: StudioActualState;
  productionDependencyPromoted: boolean;
  notes: string;
}

const editableFields = ["text", "intensity", "color", "translate", "scale", "rotate", "opacity"];

/** Motion Zukan → Remotion Element の正本。ELEMENT_CANDIDATEはGUI Actual済みを意味しない。 */
export const remotionElementCandidates: RemotionElementCandidateRecord[] = [
  {
    patternId: "type-mask-reveal", readiness: "ELEMENT_CANDIDATE", canonicalEngine: "TypographyRevealEngine", canonicalMode: "mask",
    payloadSlug: "wedding/mask-reveal", builderScript: "motion-studio/scripts/build-mask-reveal-element-payload.mts", checkerScript: "motion-studio/scripts/check-mask-reveal-element-payload.mts",
    editableFields, standaloneRenderCi: true, studioInstallActual: "NOT_RUN", studioControlReadbackActual: "NOT_RUN", productionDependencyPromoted: false,
    notes: "Run42-46。canonical source derived。Mac Studio Actualは未実行。",
  },
  {
    patternId: "type-char-stagger", readiness: "ELEMENT_CANDIDATE", canonicalEngine: "TypographyRevealEngine", canonicalMode: "stagger",
    payloadSlug: "wedding/char-stagger", builderScript: "motion-studio/scripts/build-char-stagger-element-payload.mts", checkerScript: "motion-studio/scripts/check-char-stagger-element-payload.mts",
    editableFields, standaloneRenderCi: true, studioInstallActual: "NOT_RUN", studioControlReadbackActual: "NOT_RUN", productionDependencyPromoted: false,
    notes: "Run46。文字単位staggerをcanonical engineからElement化。",
  },
  {
    patternId: "type-type-on-rhythm", readiness: "ELEMENT_CANDIDATE", canonicalEngine: "TypographyRevealEngine", canonicalMode: "word-stagger",
    payloadSlug: "wedding/type-on-rhythm", builderScript: "motion-studio/scripts/build-type-on-rhythm-element-payload.mts", checkerScript: "motion-studio/scripts/check-type-on-rhythm-element-payload.mts",
    editableFields, standaloneRenderCi: true, studioInstallActual: "NOT_RUN", studioControlReadbackActual: "NOT_RUN", productionDependencyPromoted: false,
    notes: "Run46。語単位word-staggerをcanonical engineからElement化。",
  },
  {
    patternId: "type-word-punch", readiness: "ELEMENT_CANDIDATE", canonicalEngine: "TypographyRevealEngine", canonicalMode: "punch",
    payloadSlug: "wedding/word-punch", builderScript: "motion-studio/scripts/build-word-punch-element-payload.mts", checkerScript: "motion-studio/scripts/check-word-punch-element-payload.mts",
    editableFields, standaloneRenderCi: true, studioInstallActual: "NOT_RUN", studioControlReadbackActual: "NOT_RUN", productionDependencyPromoted: false,
    notes: "Run48。強調語をpunchするcanonical modeをElement化。Mac Studio Actualは未実行。",
  },
  {
    patternId: "type-tracking-burst", readiness: "ELEMENT_CANDIDATE", canonicalEngine: "TypographyRevealEngine", canonicalMode: "tracking",
    payloadSlug: "wedding/tracking-burst", builderScript: "motion-studio/scripts/build-tracking-burst-element-payload.mts", checkerScript: "motion-studio/scripts/check-tracking-burst-element-payload.mts",
    editableFields, standaloneRenderCi: true, studioInstallActual: "NOT_RUN", studioControlReadbackActual: "NOT_RUN", productionDependencyPromoted: false,
    notes: "Run48。字間burstのcanonical modeをElement化。Mac Studio Actualは未実行。",
  },
  {
    patternId: "type-vertical-wipe", readiness: "ELEMENT_CANDIDATE", canonicalEngine: "TypographyRevealEngine", canonicalMode: "vertical-wipe",
    payloadSlug: "wedding/vertical-wipe", builderScript: "motion-studio/scripts/build-vertical-wipe-element-payload.mts", checkerScript: "motion-studio/scripts/check-vertical-wipe-element-payload.mts",
    editableFields, standaloneRenderCi: true, studioInstallActual: "NOT_RUN", studioControlReadbackActual: "NOT_RUN", productionDependencyPromoted: false,
    notes: "Run48。縦方向clip revealのcanonical modeをElement化。Mac Studio Actualは未実行。",
  },
  {
    patternId: "type-outline-fill", readiness: "ELEMENT_CANDIDATE", canonicalEngine: "TypographyRevealEngine", canonicalMode: "outline",
    payloadSlug: "wedding/outline-fill", builderScript: "motion-studio/scripts/build-outline-fill-element-payload.mts", checkerScript: "motion-studio/scripts/check-outline-fill-element-payload.mts",
    editableFields, standaloneRenderCi: true, studioInstallActual: "NOT_RUN", studioControlReadbackActual: "NOT_RUN", productionDependencyPromoted: false,
    notes: "Run49。輪郭線から塗りへ変わるcanonical outline modeをElement化。Mac Studio Actualは未実行。",
  },
  {
    patternId: "type-baseline-hop", readiness: "ELEMENT_CANDIDATE", canonicalEngine: "TypographyRevealEngine", canonicalMode: "hop",
    payloadSlug: "wedding/baseline-hop", builderScript: "motion-studio/scripts/build-baseline-hop-element-payload.mts", checkerScript: "motion-studio/scripts/check-baseline-hop-element-payload.mts",
    editableFields, standaloneRenderCi: true, studioInstallActual: "NOT_RUN", studioControlReadbackActual: "NOT_RUN", productionDependencyPromoted: false,
    notes: "Run49。軽いbounce着地のcanonical hop modeをElement化。Mac Studio Actualは未実行。",
  },
  {
    patternId: "type-triplet", readiness: "ELEMENT_CANDIDATE", canonicalEngine: "TypographyRevealEngine", canonicalMode: "triplet",
    payloadSlug: "wedding/typography-triplet", builderScript: "motion-studio/scripts/build-triplet-element-payload.mts", checkerScript: "motion-studio/scripts/check-triplet-element-payload.mts",
    editableFields, standaloneRenderCi: true, studioInstallActual: "NOT_RUN", studioControlReadbackActual: "NOT_RUN", productionDependencyPromoted: false,
    notes: "Run49。3-hit pulseのcanonical triplet modeをElement化。Mac Studio Actualは未実行。",
  },
];

/**
 * 9 Typography ElementsをMac Studio GUIでまとめてActual検証するための機械可読handoff。
 * CIでbatch artifactを準備・検査できても、Studio confirmation / install / control readbackはActualではない限りNOT_RUNのまま。
 */
export const remotionElementStudioActualBatch = {
  schemaVersion: "remotion-element-studio-actual-batch/v1",
  authority: "MOTION_ZUKAN_REMOTION_STUDIO_ACTUAL_BATCH_HANDOFF",
  studioVersionTarget: "4.0.517",
  artifactRoot: "movie-dashboard/out/remotion-element-actual-batch",
  prepareCommand: "cd motion-studio && node --no-warnings scripts/prepare-typography-elements-studio-actual-batch.mts",
  checkCommand: "cd motion-studio && node --no-warnings scripts/check-typography-elements-studio-actual-batch.mts",
  evidence: {
    path: "movie-dashboard/out/remotion-element-actual-batch/studio-actual-evidence.json",
    summaryPath: "movie-dashboard/out/remotion-element-actual-batch/studio-actual-summary.json",
    summarySchemaVersion: "remotion-element-studio-actual-summary/v1",
    summaryAuthority: "MAC_REMOTION_STUDIO_ACTUAL_STATUS_SUMMARY",
    initCommand: "cd motion-studio && node --no-warnings scripts/typography-elements-studio-actual-evidence.mts --init",
    statusCommand: "cd motion-studio && node --no-warnings scripts/typography-elements-studio-actual-evidence.mts",
    strictCommand: "cd motion-studio && node --no-warnings scripts/typography-elements-studio-actual-evidence.mts --strict",
    checkAxesPerCandidate: 11,
    candidateCount: 9,
    currentRepoState: "NOT_RUN" as StudioActualState,
    humanReviewed: false,
  },
  candidateIds: remotionElementCandidates.map((candidate) => candidate.patternId),
  actual: {
    requestTransport: "NOT_RUN" as StudioActualState,
    confirmationDialog: "NOT_RUN" as StudioActualState,
    studioInstall: "NOT_RUN" as StudioActualState,
    controlReadback: "NOT_RUN" as StudioActualState,
    timelineInsertion: "NOT_RUN" as StudioActualState,
    postInstallRender: "NOT_RUN" as StudioActualState,
  },
  productionDependencyPromoted: false,
  guardrails: [
    "BATCH_PREPARED != BATCH_EXECUTED",
    "AWAITING_CONFIRMATION != INSTALL_CONFIRMED",
    "ELEMENT_FILE_WRITTEN != TIMELINE_INSERTION_VERIFIED",
    "CONTROL_VISIBLE != CONTROL_MUTATION_PERSISTED",
    "REQUEST_TRANSPORT_PASS != STUDIO_ACTUAL_PASS",
    "SUMMARY_EXPORTED != STUDIO_ACTUAL_VERIFIED",
    "STUDIO_ACTUAL_BATCH_HANDOFF_EXPORTED != STUDIO_ACTUAL_VERIFIED",
    "STUDIO_ACTUAL_VERIFIED != PRODUCTION_DEPENDENCY_PROMOTED",
  ],
} as const;

export const getRemotionElementCandidate = (patternId: string) =>
  remotionElementCandidates.find((candidate) => candidate.patternId === patternId) ?? null;
