import type { Asset, Prompt, Scene } from "../types/movie";
import { presetId, selectedResultAssets } from "./videoExecutionRouter";
import { parseVideoResultReproMetadata } from "./videoResultMetadata";

export type ContinuitySeverity = "warning" | "info";

export interface VideoContinuityIssue {
  id: string;
  severity: ContinuitySeverity;
  movieId: string;
  sceneIds: string[];
  title: string;
  detail: string;
  action: string;
}

export const CONTINUITY_REVIEW_CHECKLIST = [
  "カット前後の露出・色温度・黒レベルが急にAI素材だけ浮いていないか",
  "カメラの移動方向・速度・停止感が前後ショットと衝突していないか",
  "シャープネス・粒状感・被写界深度がAIカットだけ過剰に滑らかでないか",
  "水平線・主要直線・字幕余白がカット点の前後で不自然にジャンプしていないか",
  "AI→実写 / 実写→AIは派手な生成トランジションで隠さず、hard cutや短いmotivated transitionを優先したか",
  "音・BGM・環境音のカット点が映像の人工感を強調していないか",
  "AIクリップの冒頭/末尾にmorphing・露出ポンプ・不自然なsettleが残っていないか",
];

function sceneAssets(scene: Scene, assets: Asset[]) {
  return scene.assets
    .map((assetId) => assets.find((asset) => asset.assetId === assetId))
    .filter((asset): asset is Asset => Boolean(asset));
}

function adoptedVideoPrompts(scene: Scene, prompts: Prompt[]) {
  return prompts.filter((prompt) => prompt.target === "video" && prompt.status === "adopted" && prompt.relatedSceneIds.includes(scene.sceneId));
}

function selectedAiAssets(scene: Scene, prompts: Prompt[], assets: Asset[]) {
  return adoptedVideoPrompts(scene, prompts).flatMap((prompt) => {
    const results = assets.filter((asset) => prompt.resultAssetIds.includes(asset.assetId));
    return selectedResultAssets(prompt, results).map((asset) => ({ prompt, asset }));
  });
}

function hasRealMedia(scene: Scene, assets: Asset[]) {
  return sceneAssets(scene, assets).some((asset) => asset.type === "own_photo" || asset.type === "own_video");
}

function mediaFps(asset: Asset | undefined) {
  return asset ? parseVideoResultReproMetadata(asset.notes).fps : undefined;
}

function mediaDuration(asset: Asset | undefined) {
  return asset ? parseVideoResultReproMetadata(asset.notes).actualDurationSec : undefined;
}

export function buildVideoContinuityReport(scenes: Scene[], prompts: Prompt[], assets: Asset[]) {
  const issues: VideoContinuityIssue[] = [];
  const relevantTransitions: Array<{ movieId: string; from: Scene; to: Scene }> = [];
  const movieIds = Array.from(new Set(scenes.map((scene) => scene.movieId)));

  for (const movieId of movieIds) {
    const ordered = scenes.filter((scene) => scene.movieId === movieId);

    for (const scene of ordered) {
      const adopted = adoptedVideoPrompts(scene, prompts);
      const selected = selectedAiAssets(scene, prompts, assets);
      if (adopted.length > 1) {
        issues.push({
          id: `${scene.sceneId}:multiple-adopted-ai`,
          severity: "warning",
          movieId,
          sceneIds: [scene.sceneId],
          title: `${scene.title}: 採用AI Promptが複数`,
          detail: `${adopted.length}件のadopted video Promptが同じsceneへ紐付いています。編集上の役割が重複している可能性があります。`,
          action: "CapCut/Palmier上で同時使用する意図か確認し、不要ならPrompt/sceneの役割を整理する。",
        });
      }

      for (const item of selected) {
        const actual = mediaDuration(item.asset);
        if (actual !== undefined && actual + 0.25 < scene.durationSec) {
          issues.push({
            id: `${scene.sceneId}:${item.asset.assetId}:duration-short`,
            severity: "warning",
            movieId,
            sceneIds: [scene.sceneId],
            title: `${scene.title}: 採用動画がscene尺より短い`,
            detail: `scene ${scene.durationSec}s に対して採用正本は ${actual}s。ループ・静止延長・余計なslow-downで埋めるとAIっぽさが出やすいです。`,
            action: "scene尺を短くする、別素材で前後を補う、または必要尺だけ再生成する。安易な速度変更で埋めない。",
          });
        }
      }
    }

    for (let index = 0; index < ordered.length - 1; index += 1) {
      const from = ordered[index];
      const to = ordered[index + 1];
      const fromAi = selectedAiAssets(from, prompts, assets);
      const toAi = selectedAiAssets(to, prompts, assets);
      if (fromAi.length === 0 && toAi.length === 0) continue;
      relevantTransitions.push({ movieId, from, to });

      const fromReal = hasRealMedia(from, assets);
      const toReal = hasRealMedia(to, assets);
      if ((fromAi.length > 0 && toReal) || (toAi.length > 0 && fromReal)) {
        issues.push({
          id: `${from.sceneId}->${to.sceneId}:real-ai-boundary`,
          severity: "warning",
          movieId,
          sceneIds: [from.sceneId, to.sceneId],
          title: `${from.title} → ${to.title}: 実写↔AI境界`,
          detail: "実素材と生成素材が隣接します。単体で綺麗でも、質感・露出・動きの差でAIカットだけ浮きやすい境界です。",
          action: "100%表示で前後を連続再生し、色/粒状感/シャープネス/カメラ速度を合わせる。派手なAI transitionで隠さない。",
        });
      }

      if (fromAi.length > 0 && toAi.length > 0) {
        const fromPrompt = fromAi[0]?.prompt;
        const toPrompt = toAi[0]?.prompt;
        if (fromPrompt && toPrompt && (fromPrompt.tool !== toPrompt.tool || presetId(fromPrompt) !== presetId(toPrompt))) {
          issues.push({
            id: `${from.sceneId}->${to.sceneId}:ai-style-shift`,
            severity: "info",
            movieId,
            sceneIds: [from.sceneId, to.sceneId],
            title: `${from.title} → ${to.title}: AI生成条件が切り替わる`,
            detail: `${fromPrompt.tool}/${presetId(fromPrompt) || "no-preset"} → ${toPrompt.tool}/${presetId(toPrompt) || "no-preset"}。モデルやpreset差による質感ジャンプを確認してください。`,
            action: "grade・grain・motion cadenceを編集側で揃え、必要なら片方だけ別モデルへ寄せる。",
          });
        }

        const fromFps = mediaFps(fromAi[0]?.asset);
        const toFps = mediaFps(toAi[0]?.asset);
        if (fromFps && toFps && fromFps !== toFps) {
          issues.push({
            id: `${from.sceneId}->${to.sceneId}:fps-mismatch`,
            severity: "warning",
            movieId,
            sceneIds: [from.sceneId, to.sceneId],
            title: `${from.title} → ${to.title}: FPS不一致`,
            detail: `${fromFps}fps → ${toFps}fps。自動補間で不自然な中間フレームが増える可能性があります。`,
            action: "CapCut/Palmierのtimeline fpsへ意図的にconformし、frame interpolationを無自覚に有効化しない。",
          });
        }
      }
    }
  }

  const markdown = [
    "# AI Video Continuity Gate",
    "",
    `Generated: ${new Date().toISOString()}`,
    `AI-related transitions: ${relevantTransitions.length}`,
    `Warnings: ${issues.filter((issue) => issue.severity === "warning").length}`,
    `Info: ${issues.filter((issue) => issue.severity === "info").length}`,
    "",
    "## Transition issues",
    ...(issues.length > 0 ? issues.flatMap((issue) => [
      `### ${issue.severity === "warning" ? "⚠️" : "ℹ️"} ${issue.title}`,
      `- scenes: ${issue.sceneIds.join(" -> ")}`,
      `- detail: ${issue.detail}`,
      `- action: ${issue.action}`,
      "",
    ]) : ["- No automatically detectable AI continuity issues.", ""]),
    "## Human continuity checklist",
    ...CONTINUITY_REVIEW_CHECKLIST.map((item) => `- [ ] ${item}`),
    "",
  ].join("\n");

  return {
    issues,
    transitionCount: relevantTransitions.length,
    warningCount: issues.filter((issue) => issue.severity === "warning").length,
    infoCount: issues.filter((issue) => issue.severity === "info").length,
    markdown,
  };
}
