import type { Asset, Prompt } from "../types/movie";
import {
  buildVideoModelEvidence,
  observedEvidenceForToolPreset,
} from "./videoModelEvidence";
import {
  presetId,
  promptDuration,
  promptMode,
  promptRatio,
  selectedResultAssetId,
} from "./videoExecutionRouter";
import { parseVideoResultReproMetadata } from "./videoResultMetadata";

function lastNoteValue(notes: string, key: string) {
  const matches = Array.from(notes.matchAll(new RegExp(`${key}=([^\\s/]+)`, "g")));
  const latest = matches.length > 0 ? matches[matches.length - 1] : undefined;
  return latest?.[1] ?? "";
}

function latestPassedReview(notes: string) {
  const lines = notes.split("\n").filter((line) => line.startsWith("video-review=passed"));
  return lines.length > 0 ? lines[lines.length - 1] : "";
}

function reviewTimestamp(notes: string) {
  const line = latestPassedReview(notes);
  return line.match(/reviewedAt=([^\s/]+)/)?.[1] ?? "";
}

export interface VideoDecisionRecord {
  promptId: string;
  title: string;
  scene: string;
  model: string;
  preset: string;
  mode: string;
  durationSec?: number;
  ratio: string;
  modelRouting: string;
  selectedResult?: {
    assetId: string;
    title: string;
    path: string;
    status: string;
    generationId: string;
    seed: string;
    actualDurationSec?: number;
    resolution: string;
    fps?: number;
  };
  alternatives: Array<{
    assetId: string;
    title: string;
    path: string;
    status: string;
  }>;
  reviewedAt: string;
  qaEvidence?: {
    reviewed: number;
    adopted: number;
    rejected: number;
    independentRoots: number;
    passRate: number;
    confidenceLow: number;
    confidenceHigh: number;
    signal: string;
  };
  rationale: string[];
  warnings: string[];
}

export function buildVideoDecisionRecords(params: {
  prompts: Prompt[];
  allPrompts: Prompt[];
  assets: Asset[];
  sceneName: (prompt: Prompt) => string;
}) {
  const { prompts, allPrompts, assets, sceneName } = params;
  const evidence = buildVideoModelEvidence(allPrompts);

  const records: VideoDecisionRecord[] = prompts
    .filter((prompt) => prompt.target === "video" && prompt.status === "adopted")
    .map((prompt) => {
      const resultAssets = assets.filter((asset) => prompt.resultAssetIds.includes(asset.assetId));
      const explicitSelectedId = selectedResultAssetId(prompt);
      const selectedId = explicitSelectedId || (resultAssets.length === 1 ? resultAssets[0]?.assetId ?? "" : "");
      const selected = resultAssets.find((asset) => asset.assetId === selectedId);
      const selectedMedia = selected ? parseVideoResultReproMetadata(selected.notes) : undefined;
      const preset = presetId(prompt);
      const modelEvidence = preset ? observedEvidenceForToolPreset(evidence, prompt.tool, preset) : undefined;
      const reviewedAt = reviewTimestamp(prompt.notes);
      const modelRouting = lastNoteValue(prompt.notes, "model-routing") || "legacy/unknown";
      const warnings: string[] = [];
      if (!selected) warnings.push("採用正本Assetが確定していません。");
      else if (!selected.path.trim()) warnings.push("採用正本Assetの保存パスがありません。");
      if (!reviewedAt) warnings.push("QA PASSのreviewedAt記録がありません。");

      const mediaSummary = selectedMedia && (selectedMedia.actualDurationSec || selectedMedia.resolution || selectedMedia.fps)
        ? `actual media: ${selectedMedia.actualDurationSec ?? "?"}s / ${selectedMedia.resolution || "?"} / ${selectedMedia.fps ?? "?"}fps.`
        : "actual media specsは未記録。";
      const reproSummary = selectedMedia && (selectedMedia.generationId || selectedMedia.seed)
        ? `repro metadata: generationId=${selectedMedia.generationId || "—"}, seed=${selectedMedia.seed || "—"}.`
        : "provider generation ID / seedは未記録。";

      const rationale = [
        selected ? `QA PASSで「${selected.title}」を採用正本として確定。` : "採用正本は未確定。",
        preset ? `shot preset: ${preset}.` : "preset記録なし。",
        `model: ${prompt.tool} / routing: ${modelRouting}.`,
        modelEvidence
          ? `project QA: ${modelEvidence.reviewed}本、独立系統${modelEvidence.independentRoots}、採用率${Math.round(modelEvidence.passRate * 100)}%、95%区間${Math.round(modelEvidence.confidenceLow * 100)}–${Math.round(modelEvidence.confidenceHigh * 100)}%、signal=${modelEvidence.signal}.`
          : "このmodel + presetのproject QA evidenceはまだありません。",
        mediaSummary,
        reproSummary,
        resultAssets.length > 1 ? `代替variant ${Math.max(0, resultAssets.length - 1)}本は比較候補として保持し、編集へ自動差し替えしない。` : "代替variantなし。",
      ];

      return {
        promptId: prompt.promptId,
        title: prompt.title,
        scene: sceneName(prompt),
        model: prompt.tool,
        preset,
        mode: promptMode(prompt),
        durationSec: promptDuration(prompt),
        ratio: promptRatio(prompt),
        modelRouting,
        selectedResult: selected ? {
          assetId: selected.assetId,
          title: selected.title,
          path: selected.path,
          status: selected.status,
          generationId: selectedMedia?.generationId ?? "",
          seed: selectedMedia?.seed ?? "",
          actualDurationSec: selectedMedia?.actualDurationSec,
          resolution: selectedMedia?.resolution ?? "",
          fps: selectedMedia?.fps,
        } : undefined,
        alternatives: resultAssets
          .filter((asset) => asset.assetId !== selected?.assetId)
          .map((asset) => ({
            assetId: asset.assetId,
            title: asset.title,
            path: asset.path,
            status: asset.status,
          })),
        reviewedAt,
        qaEvidence: modelEvidence ? {
          reviewed: modelEvidence.reviewed,
          adopted: modelEvidence.adopted,
          rejected: modelEvidence.rejected,
          independentRoots: modelEvidence.independentRoots,
          passRate: modelEvidence.passRate,
          confidenceLow: modelEvidence.confidenceLow,
          confidenceHigh: modelEvidence.confidenceHigh,
          signal: modelEvidence.signal,
        } : undefined,
        rationale,
        warnings,
      };
    });

  const markdown = [
    "# AI Video Decision Records",
    "",
    `Generated: ${new Date().toISOString()}`,
    `Adopted records: ${records.length}`,
    "",
    "These records describe why one generated result is authoritative for editing. They do not authorize paid generation or replacement of real people/family/friends/dogs with AI.",
    ...records.flatMap((record) => [
      "",
      `## ${record.title}`,
      `- promptId: ${record.promptId}`,
      `- scene: ${record.scene}`,
      `- model: ${record.model}`,
      `- preset: ${record.preset || "—"}`,
      `- mode: ${record.mode}`,
      `- intended duration: ${record.durationSec ?? "unknown"}s`,
      `- intended ratio: ${record.ratio}`,
      `- model routing: ${record.modelRouting}`,
      `- reviewed at: ${record.reviewedAt || "unknown"}`,
      record.selectedResult
        ? `- selected result: ${record.selectedResult.title} / ${record.selectedResult.assetId} / ${record.selectedResult.path || "path missing"}`
        : "- selected result: MISSING",
      record.selectedResult ? `- actual media: ${record.selectedResult.actualDurationSec ?? "unknown"}s / ${record.selectedResult.resolution || "unknown"} / ${record.selectedResult.fps ?? "unknown"}fps` : "",
      record.selectedResult ? `- provider generation ID: ${record.selectedResult.generationId || "—"}` : "",
      record.selectedResult ? `- seed: ${record.selectedResult.seed || "—"}` : "",
      record.alternatives.length > 0
        ? `- alternatives retained: ${record.alternatives.map((asset) => `${asset.title} (${asset.assetId})`).join(" / ")}`
        : "- alternatives retained: none",
      "",
      "### Decision basis",
      ...record.rationale.map((item) => `- ${item}`),
      ...(record.warnings.length > 0 ? ["", "### Warnings", ...record.warnings.map((item) => `- ${item}`)] : []),
    ].filter(Boolean)),
    "",
  ].join("\n");

  return { records, markdown };
}
