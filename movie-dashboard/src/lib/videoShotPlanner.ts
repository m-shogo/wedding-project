import type { Scene } from "../types/movie";
import { VIDEO_PROMPT_PRESETS, type VideoPromptPreset } from "./videoPromptPresets";

export type ShotPlanKind = "preset" | "real-media" | "unclassified";

export interface VideoShotSuggestion {
  sceneId: string;
  kind: ShotPlanKind;
  presetId?: string;
  confidence: "high" | "medium" | "low";
  score: number;
  matchedTerms: string[];
  reason: string;
}

const PRESET_KEYWORDS: Record<string, Array<[string, number]>> = {
  "cloud-sea": [
    ["雲海", 5], ["雲", 3], ["cloud", 3], ["上空", 3], ["空", 1], ["sky", 1],
  ],
  "airplane-window": [
    ["飛行機窓", 5], ["窓から", 3], ["翼", 4], ["airplane", 3], ["plane", 2], ["機内", 3],
  ],
  "airport-gate-empty": [
    ["搭乗ゲート", 5], ["搭乗", 4], ["ゲート", 3], ["boarding", 4], ["gate", 3], ["出発口", 3],
  ],
  "airport-lobby-empty": [
    ["空港ロビー", 5], ["空港", 3], ["airport", 3], ["terminal", 3], ["ロビー", 3], ["ターミナル", 3],
  ],
  "runway-lights": [
    ["滑走路", 5], ["runway", 5], ["離陸", 4], ["着陸", 4], ["taxiway", 3], ["誘導灯", 4],
  ],
  "hawaii-sea": [
    ["ハワイ", 5], ["hawaii", 5], ["海", 3], ["ビーチ", 3], ["beach", 3], ["ocean", 3], ["波", 2], ["shore", 2],
  ],
  "city-night": [
    ["夜景", 5], ["みなとみらい", 5], ["横浜夜", 5], ["night", 3], ["skyline", 3], ["city lights", 4], ["街灯", 2],
  ],
  "door-light": [
    ["扉", 5], ["door", 4], ["チャペル", 4], ["chapel", 4], ["入口", 2], ["transition", 2], ["章切", 3],
  ],
};

const REAL_MEDIA_TERMS = [
  "新郎", "新婦", "ふたり", "二人", "2人", "家族", "友人", "友達", "ゲスト", "人物", "顔",
  "幼少", "学生", "プロフィール", "写真", "photo", "portrait", "family", "friend", "groom", "bride",
  "犬", "dog", "ペット", "pet",
];

function normalize(scene: Scene) {
  return [scene.title, scene.purpose, scene.visual, scene.notes, scene.caption, scene.person ?? ""]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

function realMediaReason(scene: Scene, text: string) {
  if ((scene.photoSlots?.length ?? 0) > 0) return "写真スロットがあるため、実写真を主役にする。";
  if (scene.person && scene.person.trim()) return `人物指定（${scene.person}）があるため、実写真・実動画を優先する。`;
  const term = REAL_MEDIA_TERMS.find((value) => text.includes(value.toLowerCase()));
  return term ? `人物/実素材ワード「${term}」を検出。AIで人物を置換しない。` : "実素材を優先するscene。";
}

export function suggestVideoPreset(scene: Scene): VideoShotSuggestion {
  const text = normalize(scene);
  const hasRealMediaSignal = (scene.photoSlots?.length ?? 0) > 0
    || Boolean(scene.person?.trim())
    || REAL_MEDIA_TERMS.some((term) => text.includes(term.toLowerCase()));

  if (hasRealMediaSignal) {
    return {
      sceneId: scene.sceneId,
      kind: "real-media",
      confidence: "high",
      score: 100,
      matchedTerms: [],
      reason: realMediaReason(scene, text),
    };
  }

  const scored = VIDEO_PROMPT_PRESETS.map((preset) => {
    const matches = (PRESET_KEYWORDS[preset.id] ?? []).filter(([term]) => text.includes(term.toLowerCase()));
    const score = matches.reduce((sum, [, weight]) => sum + weight, 0);
    return { preset, score, matchedTerms: matches.map(([term]) => term) };
  }).sort((a, b) => b.score - a.score);

  const best = scored[0];
  if (!best || best.score === 0) {
    return {
      sceneId: scene.sceneId,
      kind: "unclassified",
      confidence: "low",
      score: 0,
      matchedTerms: [],
      reason: "8プリセットへ安全に自動分類できる根拠が足りません。必要なら手動で選びます。",
    };
  }

  const second = scored[1]?.score ?? 0;
  const margin = best.score - second;
  const confidence = best.score >= 5 && margin >= 2 ? "high" : best.score >= 3 ? "medium" : "low";
  return {
    sceneId: scene.sceneId,
    kind: "preset",
    presetId: best.preset.id,
    confidence,
    score: best.score,
    matchedTerms: best.matchedTerms,
    reason: `「${best.matchedTerms.join(" / ")}」から ${best.preset.label} を提案。`,
  };
}

export function getSuggestedPreset(suggestion: VideoShotSuggestion): VideoPromptPreset | undefined {
  return suggestion.presetId ? VIDEO_PROMPT_PRESETS.find((preset) => preset.id === suggestion.presetId) : undefined;
}
