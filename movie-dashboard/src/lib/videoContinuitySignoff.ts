import type { Asset, Prompt, Scene } from "../types/movie";
import type { VideoContinuityIssue } from "./videoContinuity";
import { presetId, selectedResultAssetId } from "./videoExecutionRouter";
import { parseVideoResultReproMetadata } from "./videoResultMetadata";

export interface VideoContinuitySignoff {
  fingerprint: string;
  reviewedAt: string;
  warningCount: number;
  transitionCount: number;
  sceneId: string;
}

function stableHash(input: string) {
  let hash = 0x811c9dc5;
  for (let index = 0; index < input.length; index += 1) {
    hash ^= input.charCodeAt(index);
    hash = Math.imul(hash, 0x01000193);
  }
  return (hash >>> 0).toString(16).padStart(8, "0");
}

function resultSignature(prompt: Prompt, assets: Asset[]) {
  const resultAssets = assets.filter((asset) => prompt.resultAssetIds.includes(asset.assetId));
  const selectedId = selectedResultAssetId(prompt) || (resultAssets.length === 1 ? resultAssets[0]?.assetId ?? "" : "");
  const selected = resultAssets.find((asset) => asset.assetId === selectedId);
  const media = selected ? parseVideoResultReproMetadata(selected.notes) : undefined;
  return {
    promptId: prompt.promptId,
    tool: prompt.tool,
    preset: presetId(prompt),
    sceneIds: [...prompt.relatedSceneIds].sort(),
    selectedAssetId: selectedId,
    selectedPath: selected?.path ?? "",
    actualDurationSec: media?.actualDurationSec ?? null,
    resolution: media?.resolution ?? "",
    fps: media?.fps ?? null,
  };
}

export function buildVideoContinuityFingerprint(
  scenes: Scene[],
  prompts: Prompt[],
  assets: Asset[],
  issues: VideoContinuityIssue[],
) {
  const movieIds = new Set(scenes.map((scene) => scene.movieId));
  const payload = {
    version: 1,
    scenes: scenes.map((scene) => ({
      sceneId: scene.sceneId,
      movieId: scene.movieId,
      durationSec: scene.durationSec,
      realAssetIds: scene.assets
        .map((assetId) => assets.find((asset) => asset.assetId === assetId))
        .filter((asset): asset is Asset => Boolean(asset))
        .filter((asset) => asset.type === "own_photo" || asset.type === "own_video")
        .map((asset) => asset.assetId)
        .sort(),
    })),
    adoptedVideo: prompts
      .filter((prompt) => prompt.target === "video" && prompt.status === "adopted" && prompt.relatedMovieIds.some((movieId) => movieIds.has(movieId)))
      .map((prompt) => resultSignature(prompt, assets))
      .sort((a, b) => a.promptId.localeCompare(b.promptId)),
    issues: issues
      .map((issue) => ({ id: issue.id, severity: issue.severity, detail: issue.detail, action: issue.action }))
      .sort((a, b) => a.id.localeCompare(b.id)),
  };
  return `v1-${stableHash(JSON.stringify(payload))}`;
}

export function buildVideoContinuitySignoffLine(params: {
  fingerprint: string;
  reviewedAt: string;
  warningCount: number;
  transitionCount: number;
}) {
  return `video-continuity=passed / reviewedAt=${params.reviewedAt} / fingerprint=${params.fingerprint} / warnings=${params.warningCount} / transitions=${params.transitionCount}`;
}

export function appendVideoContinuitySignoff(notes: string, line: string) {
  const trimmed = notes.trim();
  return trimmed ? `${trimmed}\n${line}` : line;
}

export function latestVideoContinuitySignoff(scenes: Scene[]): VideoContinuitySignoff | undefined {
  const candidates: VideoContinuitySignoff[] = [];
  for (const scene of scenes) {
    for (const line of scene.notes.split("\n")) {
      if (!line.startsWith("video-continuity=passed")) continue;
      const reviewedAt = line.match(/reviewedAt=([^\s/]+)/)?.[1] ?? "";
      const fingerprint = line.match(/fingerprint=([^\s/]+)/)?.[1] ?? "";
      const warningCount = Number(line.match(/warnings=(\d+)/)?.[1] ?? 0);
      const transitionCount = Number(line.match(/transitions=(\d+)/)?.[1] ?? 0);
      if (!reviewedAt || !fingerprint) continue;
      candidates.push({ fingerprint, reviewedAt, warningCount, transitionCount, sceneId: scene.sceneId });
    }
  }
  return candidates.sort((a, b) => b.reviewedAt.localeCompare(a.reviewedAt))[0];
}
