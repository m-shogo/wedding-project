export type RemotionElementReadiness =
  | "PREVIEW_ONLY"
  | "ELEMENT_CANDIDATE"
  | "STUDIO_ACTUAL_VERIFIED";

export type StudioActualState = "NOT_RUN" | "PASS" | "FAIL" | "BLOCKED";

export interface RemotionElementCandidateRecord {
  patternId: string;
  readiness: RemotionElementReadiness;
  canonicalEngine: "TypographyRevealEngine";
  canonicalMode: "mask" | "stagger" | "word-stagger" | "punch" | "tracking" | "vertical-wipe";
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
];

export const getRemotionElementCandidate = (patternId: string) =>
  remotionElementCandidates.find((candidate) => candidate.patternId === patternId) ?? null;
