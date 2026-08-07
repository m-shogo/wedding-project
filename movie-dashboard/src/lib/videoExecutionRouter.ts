import type { Asset, Prompt } from "../types/movie";

export type ExecutionDestination = "external-generation" | "palmier" | "review" | "edit" | "blocked";

export interface VideoExecutionRoute {
  destination: ExecutionDestination;
  label: string;
  reason: string;
  action: string;
  paidGenerationAllowed: boolean;
}

function noteValue(notes: string, key: string) {
  const match = notes.match(new RegExp(`${key}=([^\\s/]+)`));
  return match?.[1] ?? "";
}

export function promptMode(prompt: Prompt) {
  return noteValue(prompt.notes, "mode") || "unknown";
}

export function promptDuration(prompt: Prompt) {
  const match = prompt.notes.match(/duration=(\d+(?:\.\d+)?)s/);
  return match?.[1] ? Number(match[1]) : undefined;
}

export function promptRatio(prompt: Prompt) {
  return noteValue(prompt.notes, "ratio") || "unknown";
}

export function negativePolicy(prompt: Prompt) {
  return noteValue(prompt.notes, "negative-policy") || "unknown";
}

export function finishCandidate(prompt: Prompt) {
  return noteValue(prompt.notes, "finish-candidate") || "";
}

export function presetId(prompt: Prompt) {
  return noteValue(prompt.notes, "preset") || "";
}

export function routeVideoPrompt(prompt: Prompt, resultAssets: Asset[]): VideoExecutionRoute {
  const mode = promptMode(prompt);

  if (prompt.status === "rejected") {
    return {
      destination: "blocked",
      label: "失敗学習 / retry判断",
      reason: "不採用済み。追加生成より先に失敗理由とretry回数を確認する。",
      action: "AI動画 失敗学習を開き、同条件再発ならPrompt以外の入力条件を変更する。",
      paidGenerationAllowed: false,
    };
  }

  if (prompt.status === "adopted") {
    return {
      destination: "edit",
      label: "Palmier / CapCut実尺",
      reason: "QA採用済み。生成工程ではなく編集・接続確認の段階。",
      action: "採用AssetをPalmierまたはCapCutへ置き、前後ショット・テロップ・BGMと実尺確認する。",
      paidGenerationAllowed: false,
    };
  }

  if (prompt.status === "testing" && resultAssets.length > 0) {
    return {
      destination: "review",
      label: "結果レビュー",
      reason: "生成結果が登録済み。新規生成より目視QAを優先する。",
      action: "AI動画 結果レビューで共通QA + プリセット固有QAを実施する。",
      paidGenerationAllowed: false,
    };
  }

  if (mode === "first-last") {
    return {
      destination: "palmier",
      label: "Palmier first / last frame",
      reason: "first-last intentはPalmier timeline上のfirst / last frame制御と相性が良い。",
      action: "first frame / last frame / referenceの役割を確認し、Palmier timelineでshot placeholderを準備する。生成creditsの実行は明示操作まで保留。",
      paidGenerationAllowed: false,
    };
  }

  if (prompt.status === "testing" && resultAssets.length === 0) {
    return {
      destination: "external-generation",
      label: "生成結果待ち",
      reason: "PromptはtestingだがresultAssetが未登録。",
      action: "外部生成結果があるなら動画生成キューから結果を登録。未生成なら現在のmodel/toolで1本だけ実行する。",
      paidGenerationAllowed: false,
    };
  }

  return {
    destination: "external-generation",
    label: "低コスト試作",
    reason: "draftのため、まず1本だけ生成してshot intentの成立を確認する段階。",
    action: "動画生成キューからPrompt packetをコピーし、低コスト試作を1本だけ実行する。",
    paidGenerationAllowed: false,
  };
}

export function buildPalmierAgentHandoff(params: {
  movieTitle: string;
  prompts: Prompt[];
  assets: Asset[];
  sceneName: (prompt: Prompt) => string;
}) {
  const { movieTitle, prompts, assets, sceneName } = params;
  const rows = prompts.map((prompt) => {
    const resultAssets = assets.filter((asset) => prompt.resultAssetIds.includes(asset.assetId));
    const route = routeVideoPrompt(prompt, resultAssets);
    return {
      promptId: prompt.promptId,
      title: prompt.title,
      scene: sceneName(prompt),
      status: prompt.status,
      model: prompt.tool,
      mode: promptMode(prompt),
      durationSec: promptDuration(prompt),
      ratio: promptRatio(prompt),
      preset: presetId(prompt),
      finishCandidate: finishCandidate(prompt),
      negativePolicy: negativePolicy(prompt),
      route,
      prompt: prompt.prompt,
      qaAvoid: prompt.negativePrompt,
      resultAssets: resultAssets.map((asset) => ({ title: asset.title, path: asset.path, status: asset.status })),
    };
  });

  const markdown = [
    `# Palmier Agent Handoff — ${movieTitle}`,
    "",
    "## Safety boundary",
    "- Read the current Palmier project, media library and timeline first.",
    "- Do not spend generation credits or trigger paid generation without explicit user instruction.",
    "- Preserve existing user edits; prefer non-destructive placeholders and clip swaps.",
    "- People, family, friends and dogs must remain real photo/video material; do not replace them with AI generations.",
    "- Important text, captions and logos belong in the editor/compositor, not baked into generated footage.",
    "",
    "## Execution order",
    "1. Place adopted result assets on the matching scene timeline positions where paths are available.",
    "2. For testing prompts with result assets, create/keep review placeholders rather than generating more.",
    "3. For first-last prompts, prepare first-frame / last-frame / reference slots in Palmier and keep generation paused.",
    "4. For draft prompts, create a named placeholder containing the prompt metadata; do not generate until explicitly requested.",
    "5. Return any missing path, missing reference, timing conflict or failed assumption to movie-dashboard instead of guessing.",
    "",
    "## Shot packets",
    ...rows.flatMap((row) => [
      "",
      `### ${row.title}`,
      `- promptId: ${row.promptId}`,
      `- scene: ${row.scene}`,
      `- status: ${row.status}`,
      `- current model: ${row.model}`,
      `- mode: ${row.mode}`,
      `- duration: ${row.durationSec ?? "unknown"}s`,
      `- ratio: ${row.ratio}`,
      `- preset: ${row.preset || "—"}`,
      `- finish candidate: ${row.finishCandidate || "—"}`,
      `- route: ${row.route.label}`,
      `- next action: ${row.route.action}`,
      row.resultAssets.length > 0 ? `- result assets: ${row.resultAssets.map((asset) => `${asset.title} (${asset.path || "path missing"})`).join(" / ")}` : "- result assets: none",
      "",
      "Prompt:",
      "```text",
      row.prompt,
      "```",
      "",
      row.negativePolicy === "qa-only" ? "QA-only avoid list — do not send as model input:" : "Optional separate negative field / QA:",
      "```text",
      row.qaAvoid,
      "```",
    ]),
    "",
    "## Return to dashboard",
    "After editing, report per promptId: placed / missing / timing-changed / reference-needed / generated-result-path / review-needed. Do not silently change Prompt adoption status.",
  ].join("\n");

  return { rows, markdown };
}
