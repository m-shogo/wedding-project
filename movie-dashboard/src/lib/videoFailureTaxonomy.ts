import type { Prompt } from "../types/movie";

export type VideoFailureCategoryId =
  | "geometry"
  | "spawn"
  | "text-logo"
  | "camera"
  | "motion-physics"
  | "lighting"
  | "ai-look"
  | "composition"
  | "caption"
  | "unknown";

export interface VideoFailureCategory {
  id: VideoFailureCategoryId;
  label: string;
  icon: string;
  correction: string;
  nextAction: string;
}

export const VIDEO_FAILURE_CATEGORIES: VideoFailureCategory[] = [
  {
    id: "geometry",
    label: "形状・直線の崩れ",
    icon: "📐",
    correction: "Maintain stable straight lines, rigid object geometry, fixed perspective and consistent structural proportions throughout the shot.",
    nextAction: "カメラをlocked/subtleへ弱め、元画像の歪み・曖昧な境界を先に直す。再発時はモデル変更を優先。",
  },
  {
    id: "spawn",
    label: "人物・物体の勝手な出現",
    icon: "👤",
    correction: "Maintain the exact supplied subject count and scene inventory throughout the continuous shot.",
    nextAction: "T2VよりI2Vを優先。背景の人影に見える形を静止画側で除去し、参照役割を絞る。",
  },
  {
    id: "text-logo",
    label: "文字・ロゴ・看板",
    icon: "🔤",
    correction: "Maintain clean texture-only surfaces and clear caption-safe negative space throughout the shot.",
    nextAction: "生成映像へ文字を任せず、看板・ディスプレイを静止画段階で無地化。文字はPalmier/CapCutで後載せ。",
  },
  {
    id: "camera",
    label: "カメラ暴走・余計な動き",
    icon: "🎥",
    correction: "Use one continuous camera path with physically smooth acceleration, constant intent and a gentle settle at the end.",
    nextAction: "カメラ指示を1つへ削る。まずlockedで被写体運動だけ確認し、その後slow push等を1要素だけ追加。",
  },
  {
    id: "motion-physics",
    label: "動作・物理の不自然さ",
    icon: "🧭",
    correction: "Use one physically motivated primary motion with realistic inertia, consistent speed changes and natural settling.",
    nextAction: "主動作を1つへ減らし、3〜5秒へ短縮。複数イベントは別ショットへ分割。",
  },
  {
    id: "lighting",
    label: "光・露出・反射の破綻",
    icon: "💡",
    correction: "Maintain one coherent light source direction, continuous exposure response and physically consistent reflections across the shot.",
    nextAction: "光源を1系統へ整理。フレア・発光演出ではなく、元画像の照明状態を固定する。",
  },
  {
    id: "ai-look",
    label: "AIっぽい質感・演出",
    icon: "🫧",
    correction: "Use restrained observational film texture, natural material response, small real-camera imperfections and understated motion.",
    nextAction: "polishedを避けdocumentary/natural-filmへ。粒子・強いフレア・過剰なドラマ演出を使わず実写前後で比較。",
  },
  {
    id: "composition",
    label: "構図・参照のドリフト",
    icon: "🖼️",
    correction: "Preserve the supplied composition, horizon, subject placement, framing and reference identity throughout the shot.",
    nextAction: "T2VからI2Vへ戻す。参照画像を1枚の強い構図正本にし、複数参照は役割を分ける。",
  },
  {
    id: "caption",
    label: "テロップ余白の消失",
    icon: "💬",
    correction: "Maintain the designated uncluttered caption-safe negative space from the first frame through the final frame.",
    nextAction: "字幕領域に物体が侵入しない静止画を作り直す。文字自体は編集工程で載せる。",
  },
  {
    id: "unknown",
    label: "その他・未分類",
    icon: "🧪",
    correction: "Keep the shot simple and preserve the intended composition, single primary action, camera behavior and natural temporal continuity.",
    nextAction: "失敗箇所を秒数つきで書き直し、静止画 / 参照 / 動作 / カメラ / モデルのどれを変えるか1つだけ決める。",
  },
];

const keywordRules: Array<{ id: VideoFailureCategoryId; keywords: string[] }> = [
  { id: "geometry", keywords: ["歪", "ゆが", "曲が", "直線", "窓枠", "翼", "建物", "形状", "geometry", "warp", "morph", "line"] },
  { id: "spawn", keywords: ["人物", "人影", "人が", "顔", "増え", "出現", "勝手に", "duplicate", "person", "people", "spawn", "extra object"] },
  { id: "text-logo", keywords: ["文字", "ロゴ", "看板", "字幕", "数字", "読め", "text", "logo", "sign", "watermark"] },
  { id: "camera", keywords: ["カメラ", "ズーム", "パン", "回転", "揺れ", "視点", "camera", "zoom", "pan", "orbit", "shake"] },
  { id: "motion-physics", keywords: ["動き", "速度", "慣性", "物理", "急", "飛ぶ", "波", "motion", "physics", "inertia", "speed"] },
  { id: "lighting", keywords: ["光", "影", "露出", "反射", "明る", "暗", "フリッカー", "lighting", "exposure", "reflection", "flicker"] },
  { id: "ai-look", keywords: ["aiっぽ", "AIっぽ", "不自然", "ツルツル", "フレア", "粒子", "cg", "cgi", "plastic", "glossy", "flare", "particle"] },
  { id: "composition", keywords: ["構図", "位置", "水平線", "参照", "別物", "変わる", "composition", "framing", "identity", "reference", "drift"] },
  { id: "caption", keywords: ["テロップ", "余白", "字幕領域", "caption", "negative space"] },
];

export function classifyVideoFailure(reason: string): VideoFailureCategory {
  const normalized = reason.toLowerCase();
  const match = keywordRules.find((rule) => rule.keywords.some((keyword) => normalized.includes(keyword.toLowerCase())));
  return VIDEO_FAILURE_CATEGORIES.find((category) => category.id === (match?.id ?? "unknown")) ?? VIDEO_FAILURE_CATEGORIES[VIDEO_FAILURE_CATEGORIES.length - 1];
}

export function latestRejectedReason(notes: string) {
  const lines = notes.split("\n").filter((line) => line.startsWith("video-review=rejected"));
  const latest = lines.at(-1) ?? "";
  const marker = "reason=";
  const index = latest.indexOf(marker);
  return index >= 0 ? latest.slice(index + marker.length).trim() : "";
}

export function retryAttempt(prompt: Prompt) {
  const matches = Array.from(prompt.notes.matchAll(/retry-attempt=(\d+)/g));
  return Number(matches.at(-1)?.[1] ?? 0);
}

export function failureLearningKey(prompt: Prompt, categoryId: VideoFailureCategoryId) {
  const preset = prompt.notes.match(/preset=([^\s/]+)/)?.[1] ?? "no-preset";
  return `${prompt.tool || "unknown-model"}::${preset}::${categoryId}`;
}
