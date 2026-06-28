import type { AllData } from "../types/movie";

export interface ValidationIssue {
  type: "error" | "warning";
  entity: string;
  entityId: string;
  message: string;
}

export function validateData(data: AllData): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const movieIds = new Set(data.movies.map((m) => m.movieId));
  const sceneIds = new Set(data.scenes.map((s) => s.sceneId));
  const assetIds = new Set(data.assets.map((a) => a.assetId));
  const promptIds = new Set(data.prompts.map((p) => p.promptId));

  for (const s of data.scenes) {
    if (s.movieId && !movieIds.has(s.movieId))
      issues.push({
        type: "error",
        entity: "scene",
        entityId: s.sceneId,
        message: `存在しないmovieId "${s.movieId}" を参照`,
      });
    if (!s.movieId)
      issues.push({
        type: "warning",
        entity: "scene",
        entityId: s.sceneId,
        message: "movieIdが未設定",
      });
    for (const aid of s.assets) {
      if (!assetIds.has(aid))
        issues.push({
          type: "error",
          entity: "scene",
          entityId: s.sceneId,
          message: `存在しないasset "${aid}" を参照`,
        });
    }
    for (const pid of s.promptIds) {
      if (!promptIds.has(pid))
        issues.push({
          type: "error",
          entity: "scene",
          entityId: s.sceneId,
          message: `存在しないprompt "${pid}" を参照`,
        });
    }
  }

  for (const a of data.assets) {
    for (const sid of a.relatedSceneIds) {
      if (!sceneIds.has(sid))
        issues.push({
          type: "error",
          entity: "asset",
          entityId: a.assetId,
          message: `存在しないscene "${sid}" を参照`,
        });
    }
  }

  for (const p of data.prompts) {
    for (const sid of p.relatedSceneIds) {
      if (!sceneIds.has(sid))
        issues.push({
          type: "error",
          entity: "prompt",
          entityId: p.promptId,
          message: `存在しないscene "${sid}" を参照`,
        });
    }
    for (const aid of p.resultAssetIds) {
      if (!assetIds.has(aid))
        issues.push({
          type: "error",
          entity: "prompt",
          entityId: p.promptId,
          message: `存在しないresult asset "${aid}" を参照`,
        });
    }
  }

  for (const t of data.tasks) {
    if (t.relatedSceneId && !sceneIds.has(t.relatedSceneId))
      issues.push({
        type: "error",
        entity: "task",
        entityId: t.taskId,
        message: `存在しないscene "${t.relatedSceneId}" を参照`,
      });
    if (t.movieId && !movieIds.has(t.movieId))
      issues.push({
        type: "error",
        entity: "task",
        entityId: t.taskId,
        message: `存在しないmovie "${t.movieId}" を参照`,
      });
  }

  const usedAssetIds = new Set(data.scenes.flatMap((s) => s.assets));
  for (const a of data.assets) {
    if (!usedAssetIds.has(a.assetId) && a.relatedSceneIds.length === 0)
      issues.push({
        type: "warning",
        entity: "asset",
        entityId: a.assetId,
        message: "未使用（どのシーンにも紐付いていない）",
      });
  }

  const usedPromptIds = new Set(data.scenes.flatMap((s) => s.promptIds));
  for (const p of data.prompts) {
    if (!usedPromptIds.has(p.promptId) && p.relatedSceneIds.length === 0)
      issues.push({
        type: "warning",
        entity: "prompt",
        entityId: p.promptId,
        message: "未使用（どのシーンにも紐付いていない）",
      });
  }

  return issues;
}
