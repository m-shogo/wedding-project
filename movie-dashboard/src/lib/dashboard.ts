import type { Asset, MovieProject, Prompt, Scene, Task } from "../types/movie";

export function computeStats(
  movie: MovieProject | undefined,
  scenes: Scene[],
  assets: Asset[],
  prompts: Prompt[],
  tasks: Task[],
) {
  const totalScenes = scenes.length;
  const doneScenes = scenes.filter((s) => s.status === "done").length;
  const inProgressScenes = scenes.filter(
    (s) => s.status !== "not_started" && s.status !== "done",
  ).length;
  const totalDurationSec = scenes.reduce((sum, s) => sum + s.durationSec, 0);
  const targetDurationSec = movie?.targetDurationSec ?? 0;

  const missingAssets = assets.filter((a) => a.status === "needed" || a.status === "idea").length;
  const unlinkedAssets = assets.filter((a) => a.relatedSceneIds.length === 0).length;
  const unlinkedPrompts = prompts.filter((p) => p.relatedSceneIds.length === 0).length;
  const aiVideoPlanned = assets.filter(
    (a) => a.type === "ai_video" && a.status !== "used" && a.status !== "rejected",
  ).length;
  const capcutReady = scenes.filter((s) => {
    const sceneAssets = assets.filter((a) => s.assets.includes(a.assetId));
    return (
      sceneAssets.length > 0 &&
      sceneAssets.every(
        (a) => a.status === "used" || a.status === "selected" || a.status === "ready",
      )
    );
  }).length;

  const urgentTasks = tasks.filter(
    (t) => t.priority === "high" && t.status !== "done" && t.status !== "dropped",
  );
  const blockedScenes = scenes.filter((s) => {
    const sceneTasks = tasks.filter((t) => t.relatedSceneId === s.sceneId);
    return sceneTasks.some((t) => t.status === "blocked");
  });

  const progressPercent = totalScenes > 0 ? Math.round((doneScenes / totalScenes) * 100) : 0;

  // Photo slot stats
  let photoRequired = 0;
  let photoSelected = 0;
  let photoSlotsTotal = 0;
  let photoSlotsWithComment = 0;
  for (const s of scenes) {
    if (!s.photoSlots) continue;
    for (const slot of s.photoSlots) {
      photoSlotsTotal++;
      photoRequired += slot.requiredCount;
      photoSelected += Math.min(slot.selectedAssetIds.length, slot.requiredCount);
      if (slot.comment) photoSlotsWithComment++;
    }
  }
  const photoMissing = photoRequired - photoSelected;
  const photoCommentRate = photoSlotsTotal > 0 ? Math.round((photoSlotsWithComment / photoSlotsTotal) * 100) : 0;

  return {
    totalScenes,
    doneScenes,
    inProgressScenes,
    totalDurationSec,
    targetDurationSec,
    missingAssets,
    unlinkedAssets,
    unlinkedPrompts,
    aiVideoPlanned,
    capcutReady,
    urgentTasks,
    blockedScenes,
    progressPercent,
    photoRequired,
    photoSelected,
    photoMissing,
    photoSlotsTotal,
    photoCommentRate,
  };
}
