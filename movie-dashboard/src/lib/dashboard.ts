import type { Asset, Scene, Task } from "../types/movie";

export function computeStats(scenes: Scene[], assets: Asset[], tasks: Task[]) {
  const totalScenes = scenes.length;
  const doneScenes = scenes.filter((s) => s.status === "done").length;
  const inProgressScenes = scenes.filter(
    (s) => s.status !== "not_started" && s.status !== "done",
  ).length;

  const missingAssets = assets.filter(
    (a) => a.status === "pending" || a.status === "needs_review",
  ).length;
  const needsReviewAssets = assets.filter(
    (a) => a.status === "needs_review",
  ).length;
  const aiVideoPlanned = assets.filter(
    (a) => a.type === "ai_video" && a.status !== "adopted" && a.status !== "rejected",
  ).length;
  const capcutReady = assets.filter((a) => a.status === "adopted").length;

  const urgentTasks = tasks.filter(
    (t) => t.priority === "high" && t.status !== "done",
  );

  const totalDurationSec = scenes.reduce((sum, s) => sum + s.durationSec, 0);

  return {
    totalScenes,
    doneScenes,
    inProgressScenes,
    missingAssets,
    needsReviewAssets,
    aiVideoPlanned,
    capcutReady,
    urgentTasks,
    totalDurationSec,
  };
}
