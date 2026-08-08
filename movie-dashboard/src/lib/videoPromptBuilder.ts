export type VideoModelId =
  | "seedance-2.0-mini"
  | "seedance-2.0"
  | "seedance-2.5-preview"
  | "runway-gen-4.5"
  | "veo-3.1"
  | "kling";

export type VideoGenerationMode = "i2v" | "t2v" | "first-last";
export type RealismProfile = "natural-film" | "documentary" | "polished";
export type MotionPace = "locked" | "subtle" | "slow" | "medium";
export type NegativePromptPolicy = "qa-only" | "optional-separate-field";

export interface VideoModelProfile {
  id: VideoModelId;
  label: string;
  toolLabel: string;
  availability: "recommended" | "available" | "preview";
  bestFor: string;
  promptStrategy: string;
  durationHint: string;
  negativePromptPolicy: NegativePromptPolicy;
  promptBudgetHint: string;
  guidanceCheckedAt: string;
  guidanceBasis: string;
}

export interface VideoPromptIntent {
  title: string;
  mode: VideoGenerationMode;
  subject: string;
  environment: string;
  action: string;
  camera: string;
  pace: MotionPace;
  lighting: string;
  mood: string;
  durationSec: number;
  aspectRatio: string;
  realism: RealismProfile;
  captionSpace: boolean;
  loop: boolean;
  referenceNotes: string;
}

export interface CompiledVideoPrompt {
  prompt: string;
  negativePrompt: string;
  modelNotes: string[];
  qaChecklist: string[];
  warnings: string[];
}

const GUIDANCE_CHECKED_AT = "2026-08-07";

export const VIDEO_MODELS: VideoModelProfile[] = [
  {
    id: "seedance-2.0-mini",
    label: "Seedance 2.0 Mini",
    toolLabel: "Seedance 2.0 Mini",
    availability: "recommended",
    bestFor: "低コストの反復、短尺B-roll、I2Vの量産試作",
    promptStrategy: "構図は参照画像に任せ、動き・カメラ・時間変化を短く構造化して指定する。",
    durationHint: "まず4〜6秒で比較し、採用候補だけ高品質モデルへ。",
    negativePromptPolicy: "optional-separate-field",
    promptBudgetHint: "長い演出作文より、主動作 / カメラ / 時間変化 / 参照役割を短く分ける。",
    guidanceCheckedAt: GUIDANCE_CHECKED_AT,
    guidanceBasis: "現行プロジェクト実測 + 2026-07 Seedanceコミュニティ運用知見。公式仕様は生成前にUIで再確認。",
  },
  {
    id: "seedance-2.0",
    label: "Seedance 2.0",
    toolLabel: "Seedance 2.0",
    availability: "recommended",
    bestFor: "参照画像・参照動画を使う高品質I2V、複数要素の制御",
    promptStrategy: "参照素材の役割を分け、1ショット1主動作で時間順に書く。",
    durationHint: "結婚式素材では5〜8秒を基本にし、長い展開はショット分割する。",
    negativePromptPolicy: "optional-separate-field",
    promptBudgetHint: "Subject / Scene / Motion / Cameraを必要な分だけ。参照が強いI2Vほど本文を短くする。",
    guidanceCheckedAt: GUIDANCE_CHECKED_AT,
    guidanceBasis: "現行プロジェクト実測 + 2026-07 Seedanceコミュニティ運用知見。公式仕様は生成前にUIで再確認。",
  },
  {
    id: "seedance-2.5-preview",
    label: "Seedance 2.5 (preview tracking)",
    toolLabel: "Seedance 2.5 (preview)",
    availability: "preview",
    bestFor: "長尺・多参照・局所修正。提供状況を確認できた時だけ使う。",
    promptStrategy: "スクリプト、画像、動画、音声などの参照を役割別に整理し、タイムライン意図を明示する。",
    durationHint: "最新仕様は変動中。Dreamina / CapCut側の現行UIを生成前に確認する。",
    negativePromptPolicy: "optional-separate-field",
    promptBudgetHint: "多参照でも役割を増やしすぎず、1参照=1役割を優先する。",
    guidanceCheckedAt: GUIDANCE_CHECKED_AT,
    guidanceBasis: "preview追跡。提供状況・モデル名・尺・料金は固定値として扱わない。",
  },
  {
    id: "runway-gen-4.5",
    label: "Runway Gen-4.5",
    toolLabel: "Runway Gen-4.5",
    availability: "recommended",
    bestFor: "自然なI2V、精密なカメラ演出、最終候補の磨き込み",
    promptStrategy: "I2Vでは画像内容を再説明せず、動き・カメラ・時間変化を直接的な肯定文で書く。",
    durationHint: "公式仕様は2〜10秒。複数動作を詰め込まず、5秒前後から始める。",
    negativePromptPolicy: "qa-only",
    promptBudgetHint: "最初は必要最小限。1要素ずつ追加して、どの指示で壊れたか追跡できる長さに保つ。",
    guidanceCheckedAt: GUIDANCE_CHECKED_AT,
    guidanceBasis: "Runway公式 Gen-4.5 / I2V / Prompting Guide。negative phrasingはモデル入力に使わない。",
  },
  {
    id: "veo-3.1",
    label: "Veo 3.1",
    toolLabel: "Veo 3.1",
    availability: "recommended",
    bestFor: "実写寄りの物理表現、first/last frame、参照画像を使った仕上げ",
    promptStrategy: "主動作、カメラ、物理的な時間変化を明示し、first/last frameがある場合は遷移を優先する。",
    durationHint: "first/last frameや参照画像を活かす。音は必要な時だけ使う。",
    negativePromptPolicy: "optional-separate-field",
    promptBudgetHint: "ショットの見た目より、時間方向の変化と保持したい条件を優先する。",
    guidanceCheckedAt: GUIDANCE_CHECKED_AT,
    guidanceBasis: "プロジェクト運用値。利用面/APIにより入力項目が異なるため生成前に現行UIを確認。",
  },
  {
    id: "kling",
    label: "Kling",
    toolLabel: "Kling",
    availability: "available",
    bestFor: "短尺I2Vの比較候補。モデル更新が速いためUI上の最新モデル名を確認する。",
    promptStrategy: "単一主動作・単一カメラ意図で比較生成し、破綻率を実測して採否を決める。",
    durationHint: "同一ショットをSeedance / Runwayと比較する時に使う。",
    negativePromptPolicy: "optional-separate-field",
    promptBudgetHint: "比較条件を揃えるため、他モデルと同じ主動作・尺・カメラから始める。",
    guidanceCheckedAt: GUIDANCE_CHECKED_AT,
    guidanceBasis: "比較運用用。モデル更新が速いため固定仕様を正本化しない。",
  },
];

const forbidden = [
  "readable text",
  "logos",
  "watermarks",
  "signage",
  "people",
  "animals",
  "morphing",
  "warped geometry",
  "duplicate objects",
  "random subtitles",
  "unmotivated camera movement",
];

function realismSentence(profile: RealismProfile) {
  switch (profile) {
    case "documentary":
      return "Natural observational footage, restrained framing, slight real-camera imperfection, realistic exposure response and understated documentary texture.";
    case "polished":
      return "Clean commercial-film finish with realistic optics, physically plausible motion, restrained grading and natural material response.";
    default:
      return "Natural film footage with realistic inertia, subtle optical breathing, restrained contrast and small real-world imperfections.";
  }
}

function sentenceInstruction(value: string) {
  const trimmed = value.trim();
  if (!trimmed) return "";
  return /[.!?]$/.test(trimmed) ? trimmed : `${trimmed}.`;
}

function prefixedInstruction(prefix: string, value: string) {
  const sentence = sentenceInstruction(value);
  return sentence ? `${prefix}: ${sentence}` : "";
}

function cameraInstruction(camera: string) {
  const value = camera.trim();
  if (!value) return "";
  const known: Record<string, string> = {
    "locked camera": "Camera remains locked off.",
    "slow push-in": "Camera performs one slow, steady push-in.",
    "slow lateral truck": "Camera performs one slow, steady lateral truck.",
    "gentle pan": "Camera performs one gentle pan.",
    "subtle handheld observation": "Camera uses restrained observational handheld movement.",
    "slow pull-back": "Camera performs one slow, steady pull-back.",
  };
  const mapped = known[value.toLowerCase()];
  if (mapped) return mapped;
  if (/[.!?]$/.test(value)) return value;
  if (/^(?:the\s+)?camera\b/i.test(value)) return `${value}.`;
  return `Camera movement: ${value}.`;
}

function paceSentence(pace: MotionPace) {
  switch (pace) {
    case "locked":
      return "Framing remains fixed while motivated environmental motion carries the shot.";
    case "subtle":
      return "Camera movement is barely perceptible and physically smooth.";
    case "medium":
      return "Camera moves at a controlled moderate pace with natural acceleration and deceleration.";
    default:
      return "Camera moves slowly with gentle acceleration and a soft stop.";
  }
}

function continuityLines(intent: VideoPromptIntent) {
  return [
    intent.captionSpace ? "Maintain clean, uncluttered caption-safe negative space throughout the shot." : "",
    intent.loop ? "End in a visually compatible state for a soft editorial loop with a continuous-feeling transition back to the opening frame." : "",
  ].filter(Boolean);
}

function commonMotion(intent: VideoPromptIntent) {
  const lines = [
    sentenceInstruction(intent.action),
    cameraInstruction(intent.camera),
    paceSentence(intent.pace),
    realismSentence(intent.realism),
  ].filter(Boolean);

  if (intent.lighting.trim()) lines.push(`Lighting remains ${intent.lighting.trim()} with natural exposure changes.`);
  if (intent.mood.trim()) lines.push(`Mood: ${intent.mood.trim()}.`);
  lines.push(...continuityLines(intent));
  return lines;
}

function runwayI2VMotion(intent: VideoPromptIntent) {
  return [
    sentenceInstruction(intent.action),
    cameraInstruction(intent.camera),
    paceSentence(intent.pace),
    ...continuityLines(intent),
  ].filter(Boolean);
}

function t2vScene(intent: VideoPromptIntent) {
  const scene = [intent.subject.trim(), intent.environment.trim()].filter(Boolean).join(" in ");
  return scene ? sentenceInstruction(scene) : "";
}

function qaAvoidText(profile: VideoModelProfile) {
  const base = `Avoid: ${forbidden.join(", ")}.`;
  if (profile.negativePromptPolicy === "qa-only") {
    return `QA ONLY — DO NOT SEND THIS AS ${profile.label} MODEL INPUT. ${base}`;
  }
  return forbidden.join(", ");
}

function containsNegativePhrasing(value: string) {
  return /\b(no|not|without|avoid|never|don't|do not|doesn't|doens't)\b/i.test(value);
}

export function compileVideoPrompt(modelId: VideoModelId, intent: VideoPromptIntent): CompiledVideoPrompt {
  const profile = VIDEO_MODELS.find((model) => model.id === modelId) ?? VIDEO_MODELS[0];
  const motion = modelId === "runway-gen-4.5" && intent.mode === "i2v"
    ? runwayI2VMotion(intent)
    : commonMotion(intent);
  const referenceNote = intent.referenceNotes.trim();
  let lines: string[] = [];

  if (intent.mode === "t2v") lines.push(t2vScene(intent));

  switch (modelId) {
    case "runway-gen-4.5":
      lines = [
        ...lines,
        ...motion,
        prefixedInstruction("Continuity", referenceNote),
        "Maintain one continuous shot with one primary visual event and the specified camera path.",
        "Preserve stable scene geometry and the supplied framing throughout the shot.",
      ];
      break;
    case "veo-3.1":
      lines = [
        ...lines,
        intent.mode === "first-last" ? "Transition naturally from the supplied first frame to the supplied last frame while preserving scene identity." : "",
        ...motion,
        prefixedInstruction("Use the supplied reference for this role", referenceNote),
        "Maintain real-world physics, stable geometry and consistent lighting throughout the shot.",
      ];
      break;
    case "seedance-2.0":
    case "seedance-2.0-mini":
      lines = [
        ...lines,
        ...motion,
        prefixedInstruction("Reference role", referenceNote),
        `Timeline: 0-${Math.max(1, Math.round(intent.durationSec * 0.2))}s establish; middle section performs the single main motion; final moment settles naturally.`,
        "Keep a continuous single shot containing only the specified subject, main action, camera move and transition.",
      ];
      break;
    case "seedance-2.5-preview":
      lines = [
        ...lines,
        ...motion,
        prefixedInstruction("Multimodal reference roles", referenceNote),
        "Keep the timeline structurally simple: establish, one motivated motion beat, settle.",
        "Prefer isolated local correction for a localized defect when that control is available.",
      ];
      break;
    default:
      lines = [
        ...lines,
        ...motion,
        prefixedInstruction("Reference intent", referenceNote),
        "Use one continuous shot, one primary action and one camera idea with stable scene geometry.",
      ];
  }

  const prompt = lines.filter(Boolean).join(" ").replace(/\s+/g, " ").trim();
  const negativePrompt = qaAvoidText(profile);
  const warnings = getPromptWarnings(modelId, intent);

  return {
    prompt,
    negativePrompt,
    modelNotes: [
      profile.bestFor,
      profile.promptStrategy,
      profile.durationHint,
      `prompt-budget=${profile.promptBudgetHint}`,
      `negative-policy=${profile.negativePromptPolicy}`,
      modelId === "runway-gen-4.5" && intent.mode === "i2v" ? "runway-i2v-input=motion-first" : "",
      `guidance-checked=${profile.guidanceCheckedAt} / basis=${profile.guidanceBasis}`,
    ].filter(Boolean),
    warnings,
    qaChecklist: [
      "人物・動物・読める文字・ロゴ・看板が0か",
      "主動作が1つで、勝手なカットや追加アクションがないか",
      "背景の直線・窓枠・翼・建物などの形状が途中で変形していないか",
      "カメラの加速・減速と被写体の慣性が自然か",
      "光源・影・反射・露出が時間方向に連続しているか",
      "字幕用の余白が最後まで維持されているか",
      "AIショーリール風の過剰な光・粒子・完璧すぎる動きになっていないか",
      "3回以上の比較生成で同じ破綻が再発する場合、モデルではなく静止画/ショット設計を直したか",
      "採用前に実尺でCapCutまたはPalmierへ置き、前後ショットとつないでも違和感がないか",
    ],
  };
}

export function getPromptWarnings(modelId: VideoModelId, intent: VideoPromptIntent): string[] {
  const warnings: string[] = [];
  if (!intent.action.trim()) warnings.push("主動作が未入力です。I2Vでは特に『何がどう動くか』を必ず指定してください。");
  if (intent.mode === "t2v" && (!intent.subject.trim() || !intent.environment.trim())) {
    warnings.push("T2Vは被写体と環境の両方がある方が構図ドリフトを抑えやすいです。");
  }
  if (intent.mode !== "t2v" && intent.subject.trim().length > 120) {
    warnings.push("I2Vでは画像内容の長い再説明を避け、動き・カメラ中心にしてください。");
  }
  if (modelId === "runway-gen-4.5" && intent.durationSec > 10) warnings.push("Runway Gen-4.5の現行公式仕様は2〜10秒です。10秒以下にしてください。");
  if (modelId === "runway-gen-4.5" && intent.mode === "first-last") warnings.push("Runway Gen-4.5の直接生成は現行ガイド上T2V/I2V中心です。first/last frameはPalmierのタイムライン生成または対応Keyframe機能へ回してください。");
  if (modelId === "runway-gen-4.5" && [intent.action, intent.camera, intent.referenceNotes].some(containsNegativePhrasing)) {
    warnings.push("Runwayは否定文より肯定文で『起きること』を書く方針です。no / avoid / without等を、維持したい状態の表現へ直してください。");
  }
  if ((modelId === "seedance-2.0" || modelId === "seedance-2.0-mini") && intent.durationSec > 15) warnings.push("このプロジェクトではSeedance 2.0系を短尺運用し、15秒超はショット分割してください。");
  if (modelId === "seedance-2.5-preview") warnings.push("Seedance 2.5は提供状況・仕様が変動中です。Dreamina / CapCutの現行UIで利用可否を確認してから生成してください。");
  if (intent.camera.split(/[,.、]/).filter(Boolean).length >= 3) warnings.push("カメラ指示が多すぎます。1ショット1カメラ意図へ削ると安定しやすいです。");
  if (intent.action.split(/[,.、]/).filter(Boolean).length >= 4) warnings.push("動作を詰め込みすぎています。ショットを分割してください。");
  if (intent.realism === "polished") warnings.push("polishedはAIっぽい過剰演出に寄りやすいため、実写素材の前後で必ず比較してください。");
  return warnings;
}
