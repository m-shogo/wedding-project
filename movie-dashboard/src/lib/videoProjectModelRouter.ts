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

export function videoModelRouteNote(route: NonNullable<ReturnType<typeof resolveProjectVideoModelRoute>>) {
  const evidenceRate = route.evidence ? Math.round(route.evidence.passRate * 100) : undefined;
  return route.learned
    ? `model-routing=project-observed / preset-default-model=${route.preset.draftModelId} / reviewed=${route.evidence?.reviewed ?? 0} / pass-rate=${evidenceRate ?? 0}%`
    : `model-routing=preset-default / reviewed=${route.evidence?.reviewed ?? 0}${evidenceRate === undefined ? "" : ` / pass-rate=${evidenceRate}%`}`;
}
