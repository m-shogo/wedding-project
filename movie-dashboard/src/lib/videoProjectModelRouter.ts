import { VIDEO_MODELS } from "./videoPromptBuilder";
import { getVideoPromptPreset } from "./videoPromptPresets";
import {
  observedEvidenceForToolPreset,
  promotedObservedModelForPreset,
  type VideoModelEvidence,
} from "./videoModelEvidence";

export function resolveProjectVideoModelRoute(presetId: string, evidence: VideoModelEvidence[]) {
  const preset = getVideoPromptPreset(presetId);
  if (!preset) return undefined;

  const defaultModel = VIDEO_MODELS.find((item) => item.id === preset.draftModelId) ?? VIDEO_MODELS[0];
  const promoted = promotedObservedModelForPreset(evidence, preset.id);
  const learnedModel = promoted ? VIDEO_MODELS.find((item) => item.toolLabel === promoted.tool) : undefined;
  const defaultEvidence = observedEvidenceForToolPreset(evidence, defaultModel.toolLabel, preset.id);
  const model = learnedModel ?? defaultModel;

  return {
    preset,
    model,
    evidence: learnedModel ? promoted : defaultEvidence,
    defaultEvidence,
    learned: Boolean(learnedModel && learnedModel.id !== preset.draftModelId),
  };
}

function evidenceSnapshot(evidence: VideoModelEvidence | undefined) {
  if (!evidence) {
    return "evidence-signal=none / reviewed=0 / independent-roots=0";
  }
  const passRate = Math.round(evidence.passRate * 100);
  const confidenceLow = Math.round(evidence.confidenceLow * 100);
  const confidenceHigh = Math.round(evidence.confidenceHigh * 100);
  return `evidence-signal=${evidence.signal} / reviewed=${evidence.reviewed} / independent-roots=${evidence.independentRoots} / pass-rate=${passRate}% / confidence-low=${confidenceLow}% / confidence-high=${confidenceHigh}%`;
}

export function videoModelRouteNote(route: NonNullable<ReturnType<typeof resolveProjectVideoModelRoute>>) {
  const snapshot = evidenceSnapshot(route.evidence);
  return route.learned
    ? `model-routing=project-observed / selected-model=${route.model.id} / preset-default-model=${route.preset.draftModelId} / ${snapshot}`
    : `model-routing=preset-default / selected-model=${route.model.id} / preset-default-model=${route.preset.draftModelId} / ${snapshot}`;
}
