import {
  attachTypeOnRhythmDaVinciActualReadback,
  type TypeOnRhythmActualState,
  type TypeOnRhythmDaVinciActualArtifactV1,
  type TypeOnRhythmDaVinciActualReadbackV1,
} from "./typeOnRhythmDaVinciActualArtifact";
import {
  assertDaVinciEvidenceIdentity,
  blankDaVinciVisualQa,
  capturedDaVinciBindingRoles,
  evidenceNullableBoolean,
  evidenceNullableFiniteNumber,
  evidenceNullableString,
  evidenceObject,
  evidenceString,
  evidenceStringArray,
  parseDaVinciLiveParameterBindings,
  parseDaVinciVisualQa,
  type DaVinciLiveParameterBindingV1,
  type DaVinciVisualQaV1,
} from "./davinciFollowerEvidenceContract";
import {evaluateTypographyDaVinciHumanPromotionGate} from "./typographyDaVinciPromotionPolicy";

export type TypeOnRhythmBindingRole = "TEXT_PLUS_TOOL" | "FOLLOWER_MODIFIER" | "FOLLOWER_UNIT" | "FOLLOWER_DELAY" | "FOLLOWER_ORDER" | "TRANSLATE_Y" | "OPACITY" | "EASING";
export type TypeOnRhythmLiveParameterBindingV1 = DaVinciLiveParameterBindingV1<TypeOnRhythmBindingRole>;

export interface TypeOnRhythmDaVinciEvidenceCaptureV1 {
  schemaVersion: "type-on-rhythm-davinci-evidence-capture/v1";
  authority: "EVIDENCE_ONLY";
  sceneId: string;
  sourceRevision: string;
  readback: TypeOnRhythmDaVinciActualReadbackV1;
  liveParameterBindings: TypeOnRhythmLiveParameterBindingV1[];
  visualQa: DaVinciVisualQaV1<TypeOnRhythmActualState>;
  rule: string;
}

export interface TypeOnRhythmDaVinciEvaluatedEvidenceV1 {
  schemaVersion: "type-on-rhythm-davinci-evaluated-evidence/v1";
  authority: "EVIDENCE_ONLY";
  sceneId: string;
  sourceRevision: string;
  evaluatedArtifact: ReturnType<typeof attachTypeOnRhythmDaVinciActualReadback>;
  liveParameterBindings: TypeOnRhythmLiveParameterBindingV1[];
  capturedBindingRoles: TypeOnRhythmBindingRole[];
  visualQa: TypeOnRhythmDaVinciEvidenceCaptureV1["visualQa"];
  checks: ReturnType<typeof attachTypeOnRhythmDaVinciActualReadback>["checks"];
  allMachineComparableChecksPass: boolean;
  promotionGate: ReturnType<typeof evaluateTypographyDaVinciHumanPromotionGate>;
  eligibleForHumanReview: boolean;
  automaticPromotionAllowed: false;
  productionReady: false;
  rule: string;
}

const allowedBindingRoles = ["TEXT_PLUS_TOOL", "FOLLOWER_MODIFIER", "FOLLOWER_UNIT", "FOLLOWER_DELAY", "FOLLOWER_ORDER", "TRANSLATE_Y", "OPACITY", "EASING"] as const satisfies readonly TypeOnRhythmBindingRole[];

const blankReadback = (artifact: TypeOnRhythmDaVinciActualArtifactV1): TypeOnRhythmDaVinciActualReadbackV1 => ({
  schemaVersion: "type-on-rhythm-davinci-readback/v1", sceneId: artifact.sceneId, sourceRevision: artifact.sourceRevision,
  capturedAt: "", resolveProduct: "", resolveVersion: "", transport: "", projectName: "", timelineName: "",
  textPlusToolFound: null, followerModifierFound: null, styledText: null, colorCss: null, followerUnit: null, followerOrder: null,
  perWordDelayFrames: null, wordDurationFrames: null, translateYFromPixels: null, translateYToPixels: null,
  opacityFrom: null, opacityTo: null, easingObserved: null, renderedPreviewPath: null, notes: [],
});

export function createTypeOnRhythmDaVinciEvidenceCaptureTemplate(artifact: TypeOnRhythmDaVinciActualArtifactV1): TypeOnRhythmDaVinciEvidenceCaptureV1 {
  return {
    schemaVersion: "type-on-rhythm-davinci-evidence-capture/v1", authority: "EVIDENCE_ONLY", sceneId: artifact.sceneId, sourceRevision: artifact.sourceRevision,
    readback: blankReadback(artifact), liveParameterBindings: [], visualQa: blankDaVinciVisualQa(),
    rule: "Fill only from a real Mac Resolve Actual. Record the live word-level Follower unit/input names and measured values. Do not infer bindings from documentation, do not convert NOT_RUN to PASS without evidence, and never overwrite Scene/HUMAN_SELECTED authority from this file.",
  };
}

function parseReadback(value: unknown): TypeOnRhythmDaVinciActualReadbackV1 {
  const input = evidenceObject(value, "readback");
  if (input.schemaVersion !== "type-on-rhythm-davinci-readback/v1") throw new Error("readback.schemaVersion mismatch");
  if (input.followerUnit !== null && input.followerUnit !== "WORDS") throw new Error("readback.followerUnit must be WORDS|null");
  if (input.followerOrder !== null && input.followerOrder !== "LEFT_TO_RIGHT") throw new Error("readback.followerOrder must be LEFT_TO_RIGHT|null");
  if (input.easingObserved !== null && input.easingObserved !== "EASE_OUT_CUBIC" && input.easingObserved !== "OTHER") throw new Error("readback.easingObserved must be EASE_OUT_CUBIC|OTHER|null");
  return {
    schemaVersion: "type-on-rhythm-davinci-readback/v1",
    sceneId: evidenceString(input.sceneId, "readback.sceneId"), sourceRevision: evidenceString(input.sourceRevision, "readback.sourceRevision"),
    capturedAt: evidenceString(input.capturedAt, "readback.capturedAt"), resolveProduct: evidenceString(input.resolveProduct, "readback.resolveProduct"), resolveVersion: evidenceString(input.resolveVersion, "readback.resolveVersion"),
    transport: evidenceString(input.transport, "readback.transport"), projectName: evidenceString(input.projectName, "readback.projectName"), timelineName: evidenceString(input.timelineName, "readback.timelineName"),
    textPlusToolFound: evidenceNullableBoolean(input.textPlusToolFound, "readback.textPlusToolFound"), followerModifierFound: evidenceNullableBoolean(input.followerModifierFound, "readback.followerModifierFound"),
    styledText: evidenceNullableString(input.styledText, "readback.styledText"), colorCss: evidenceNullableString(input.colorCss, "readback.colorCss"),
    followerUnit: input.followerUnit as "WORDS" | null, followerOrder: input.followerOrder as "LEFT_TO_RIGHT" | null,
    perWordDelayFrames: evidenceNullableFiniteNumber(input.perWordDelayFrames, "readback.perWordDelayFrames"), wordDurationFrames: evidenceNullableFiniteNumber(input.wordDurationFrames, "readback.wordDurationFrames"),
    translateYFromPixels: evidenceNullableFiniteNumber(input.translateYFromPixels, "readback.translateYFromPixels"), translateYToPixels: evidenceNullableFiniteNumber(input.translateYToPixels, "readback.translateYToPixels"),
    opacityFrom: evidenceNullableFiniteNumber(input.opacityFrom, "readback.opacityFrom"), opacityTo: evidenceNullableFiniteNumber(input.opacityTo, "readback.opacityTo"),
    easingObserved: input.easingObserved as "EASE_OUT_CUBIC" | "OTHER" | null,
    renderedPreviewPath: evidenceNullableString(input.renderedPreviewPath, "readback.renderedPreviewPath"), notes: evidenceStringArray(input.notes, "readback.notes"),
  };
}

export function parseTypeOnRhythmDaVinciEvidenceCapture(raw: string, artifact: TypeOnRhythmDaVinciActualArtifactV1): TypeOnRhythmDaVinciEvidenceCaptureV1 {
  const input = evidenceObject(JSON.parse(raw) as unknown, "capture");
  if (input.schemaVersion !== "type-on-rhythm-davinci-evidence-capture/v1") throw new Error("capture.schemaVersion mismatch");
  if (input.authority !== "EVIDENCE_ONLY") throw new Error("capture.authority must be EVIDENCE_ONLY");
  const sceneId = evidenceString(input.sceneId, "capture.sceneId");
  const sourceRevision = evidenceString(input.sourceRevision, "capture.sourceRevision");
  assertDaVinciEvidenceIdentity({sceneId, sourceRevision}, artifact, {sceneMismatchMessage: "Type-on-rhythm capture sceneId mismatch", staleRevisionMessage: "STALE_TYPE_ON_RHYTHM_EVIDENCE_CAPTURE"});
  const readback = parseReadback(input.readback);
  if (readback.sceneId !== sceneId || readback.sourceRevision !== sourceRevision) throw new Error("capture/readback identity mismatch");
  return {schemaVersion: "type-on-rhythm-davinci-evidence-capture/v1", authority: "EVIDENCE_ONLY", sceneId, sourceRevision, readback, liveParameterBindings: parseDaVinciLiveParameterBindings(input.liveParameterBindings, allowedBindingRoles), visualQa: parseDaVinciVisualQa(input.visualQa), rule: evidenceString(input.rule, "capture.rule")};
}

export function evaluateTypeOnRhythmDaVinciEvidenceCapture(artifact: TypeOnRhythmDaVinciActualArtifactV1, capture: TypeOnRhythmDaVinciEvidenceCaptureV1): TypeOnRhythmDaVinciEvaluatedEvidenceV1 {
  assertDaVinciEvidenceIdentity(capture, artifact, {sceneMismatchMessage: "Type-on-rhythm capture sceneId mismatch", staleRevisionMessage: "STALE_TYPE_ON_RHYTHM_EVIDENCE_CAPTURE"});
  const evaluatedArtifact = attachTypeOnRhythmDaVinciActualReadback(artifact, capture.readback);
  const checks = {...evaluatedArtifact.checks, visualQa1x: capture.visualQa.oneX, visualQaHalfSpeed: capture.visualQa.halfSpeed};
  const machineComparable = [checks.resolveIdentity, checks.textPlusCreated, checks.followerAttached, checks.wordUnitApplied, checks.sequentialDelayApplied, checks.translationApplied, checks.opacityApplied, checks.easingApplied, checks.sourceReadback, checks.renderCompleted];
  const capturedBindingRoles = capturedDaVinciBindingRoles(capture.liveParameterBindings, allowedBindingRoles);
  const promotionGate = evaluateTypographyDaVinciHumanPromotionGate({patternId: "type-type-on-rhythm", machineChecks: machineComparable, bindings: capture.liveParameterBindings, visualQa: capture.visualQa});
  return {
    schemaVersion: "type-on-rhythm-davinci-evaluated-evidence/v1", authority: "EVIDENCE_ONLY", sceneId: artifact.sceneId, sourceRevision: artifact.sourceRevision,
    evaluatedArtifact: {...evaluatedArtifact, checks}, liveParameterBindings: [...capture.liveParameterBindings], capturedBindingRoles,
    visualQa: {...capture.visualQa, notes: [...capture.visualQa.notes]}, checks,
    allMachineComparableChecksPass: machineComparable.every((item) => item === "PASS"),
    promotionGate, eligibleForHumanReview: promotionGate.eligibleForHumanReview, automaticPromotionAllowed: false, productionReady: false,
    rule: "Readback equality, word-unit confirmation, binding completeness, and visual QA are evidence only. FOLLOWER_UNIT=WORDS remains mandatory, and production routing remains a separate human-reviewed promotion after real Mac Resolve Actual.",
  };
}
