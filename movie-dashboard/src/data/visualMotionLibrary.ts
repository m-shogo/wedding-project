export type MotionCategory =
  | "TYPOGRAPHY"
  | "PHOTO"
  | "CAMERA"
  | "LAYOUT"
  | "TRANSITION"
  | "RHYTHM"
  | "GRAPHIC"
  | "EDITORIAL"
  | "TRAVEL"
  | "EMOTIONAL";

export type PreviewSourceType =
  | "ACTUAL_DAVINCI_RENDER"
  | "ACTUAL_PALMIER_RENDER"
  | "REPO_GENERATED"
  | "OFFICIAL_EXTERNAL_REFERENCE"
  | "CONCEPT_ONLY"
  | "MISSING";

export type PreviewStatus = "MISSING" | "REFERENCE_ONLY" | "CONCEPT" | "ACTUAL" | "VERIFIED";
export type PreviewFreshness = "CURRENT" | "NEEDS_RECHECK" | "OUTDATED";
export type ImplementationStatus = "DISCOVERED" | "AVAILABLE" | "INSTALLED" | "TESTED" | "PRODUCTION_READY";
export type HumanDecision = "NONE" | "FAVORITE" | "MAYBE" | "REJECT";
export type UsageStatus = "NEVER" | "ROUGH" | "FINAL";
export type PalmierSupport = "PALMIER_NATIVE" | "PALMIER_APPROX" | "PALMIER_TIMING_ONLY" | "DAVINCI_REQUIRED" | "UNVERIFIED";
export type DavinciImplementationType =
  | "DAVINCI_BUILTIN"
  | "DAVINCI_EDIT"
  | "DAVINCI_TEXT_PLUS"
  | "DAVINCI_FUSION"
  | "DAVINCI_DRFX"
  | "DAVINCI_SETTING"
  | "REACTOR"
  | "EXTERNAL_TEMPLATE"
  | "MANUAL";

export type MotionIntensity = "S" | "M" | "L";

export interface TextSlot {
  kind: "TEXT";
  id: string;
  label: string;
  required: boolean;
  example: string;
  minChars: number;
  maxChars: number;
  maxLines: number;
  recommendedLanguage: "ANY" | "JA" | "EN";
  semanticRole: string;
}

export interface MediaSlot {
  kind: "MEDIA";
  id: string;
  label: string;
  required: boolean;
  mediaType: "IMAGE" | "VIDEO";
  minCount: number;
  maxCount: number;
  orientation: "LANDSCAPE" | "PORTRAIT" | "ANY";
  aspectPreference: string;
  subjectCount: string;
  textSafeArea: string;
  cropTolerance: "LOW" | "MEDIUM" | "HIGH";
  heroSuitability: "LOW" | "MEDIUM" | "HIGH";
}

export interface TimingSlot {
  kind: "TIMING";
  id: string;
  label: string;
  required: boolean;
  allowed: Array<"beat" | "downbeat" | "phrase-start" | "chorus-head" | "lyric-start" | "manual-marker" | "none">;
  defaultValue: "beat" | "downbeat" | "phrase-start" | "chorus-head" | "lyric-start" | "manual-marker" | "none";
}

export type MotionInputSlot = TextSlot | MediaSlot | TimingSlot;

export interface MotionPattern {
  id: string;
  japaneseName: string;
  commonName: string;
  shortDescription: string;
  howItLooks: string;
  goodFor: string[];
  avoidFor: string[];
  aliases: string[];
  categories: MotionCategory[];
  moodTags: string[];
  openingScore: 0 | 1 | 2 | 3;
  profileScore: 0 | 1 | 2 | 3;
  openingSections: string[];
  profileSections: string[];
  palmierSupport: PalmierSupport;
  implementationId: string;
  previewId: string;
  vocabularyIds: string[];
  recipeIds: string[];
  inputSlots: MotionInputSlot[];
  intensityNotes: Record<MotionIntensity, string>;
  sourcePatternIds: string[];
}

export interface MotionImplementation {
  id: string;
  patternId: string;
  type: DavinciImplementationType;
  status: ImplementationStatus;
  method: string;
  artifactType: "NONE" | "DRFX" | "SETTING";
  artifactPath: string | null;
  installed: boolean;
  tested: boolean;
  resolveVersion: string | null;
  studioRequired: boolean | null;
  searchedExistingPatterns: boolean;
  searchedDaVinciBuiltins: boolean;
  searchedExternalSources: boolean;
  whyExistingOptionsFail: string;
  whyNewPatternIsNeeded: string;
  verificationNote: string;
}

export interface MotionPreview {
  id: string;
  patternId: string;
  sourceType: PreviewSourceType;
  status: PreviewStatus;
  freshness: PreviewFreshness;
  videoPath: string | null;
  posterPath: string | null;
  generatedBy: string;
  generatedAt: string;
  implementationId: string | null;
  sampleAssetSetId: string;
  resolveVersion: string | null;
  verified: boolean;
  label: string;
}

export interface VocabularyEntry {
  id: string;
  term: string;
  japanese: string;
  summary: string;
}

export interface MotionPromptInput {
  patternId: string;
  text: string;
  mediaPath?: string;
  project: "OPENING" | "PROFILE";
  section: string;
  intensity: MotionIntensity;
  durationSec: number;
  marker?: string;
}

export interface MotionPromptOutputs {
  humanBrief: string;
  claudeCreativeInstruction: string;
  palmierInstruction: string;
  davinciFinishManifest: string;
  machineJson: string;
}

export const vocabularyRegistry: VocabularyEntry[] = [
  { id: "vocab-mask", term: "Mask", japanese: "マスク", summary: "見せる範囲を形で制限して、隠れていた要素を段階的に見せる仕組み。" },
  { id: "vocab-keyframe", term: "Keyframe", japanese: "キーフレーム", summary: "時間上の特定地点に値を記録し、その間を変化させる基準点。" },
  { id: "vocab-easing", term: "Easing", japanese: "イージング", summary: "動き始め・止まり方の加減速。一定速度より自然な立ち上がりと着地を作る。" },
  { id: "vocab-text-plus", term: "Text+", japanese: "Text+", summary: "DaVinci Resolve / Fusionで細かい文字アニメーションを組むためのテキストツール。" },
];

export const implementationRegistry: MotionImplementation[] = [
  {
    id: "davinci-textplus-mask-reveal-v1",
    patternId: "type-mask-reveal",
    type: "DAVINCI_TEXT_PLUS",
    status: "AVAILABLE",
    method: "Text+を使用し、文字またはText+出力をRectangle Maskでクリップ。下方向のオフセットから定位置へ短く移動し、Mask境界を越えてrevealする。Spline/Easingで減速して着地する。",
    artifactType: "NONE",
    artifactPath: null,
    installed: false,
    tested: false,
    resolveVersion: null,
    studioRequired: null,
    searchedExistingPatterns: true,
    searchedDaVinciBuiltins: true,
    searchedExternalSources: true,
    whyExistingOptionsFail: "既存RemotionのMaskReveal/Mask Slideは見た目の参考にはなるが、DaVinci上での再現・render verificationを証明しない。",
    whyNewPatternIsNeeded: "新しいエフェクトを発明するためではなく、既存のMask Reveal概念を日本語検索・入力slot・Palmier handoff・DaVinci実装・Preview provenanceへ一意に接続するため。",
    verificationNote: "DaVinciを開いてrender-tested / visual-QAが完了するまではPRODUCTION_READYへ昇格しない。",
  },
];

export const previewRegistry: MotionPreview[] = [
  {
    id: "preview-type-mask-reveal-concept-v1",
    patternId: "type-mask-reveal",
    sourceType: "REPO_GENERATED",
    status: "CONCEPT",
    freshness: "CURRENT",
    videoPath: "/motion-previews/type-mask-reveal-concept-v1.mp4",
    posterPath: "/motion-previews/type-mask-reveal-concept-v1.jpg",
    generatedBy: "repo deterministic preview",
    generatedAt: "2026-08-25",
    implementationId: "davinci-textplus-mask-reveal-v1",
    sampleAssetSetId: "typography-welcome-v1",
    resolveVersion: null,
    verified: false,
    label: "Concept Preview / 実装確認前",
  },
];

export const motionPatternRegistry: MotionPattern[] = [
  {
    id: "type-mask-reveal",
    japaneseName: "文字が下からシュッと現れる",
    commonName: "Mask Reveal",
    shortDescription: "文字を見えない領域から短く滑らせ、境界を越えた部分だけ見せる。",
    howItLooks: "最初は文字が隠れていて、下から上へ短く動きながら自然に現れ、最後は静かに止まる。",
    goodFor: ["Openingの短いタイトル", "Profileの章タイトル", "場所名・旅行ラベル", "写真を邪魔しない短い名前表示"],
    avoidFor: ["長文", "毎カットへの反復", "強いbounce/glowとの併用", "写真の顔を隠す大きな文字"],
    aliases: ["文字 下からシュッ", "下から出る", "文字が出てくる", "マスク", "タイトル すっと", "文字 reveal", "静かに文字", "映画っぽいタイトル", "CMっぽい文字"],
    categories: ["TYPOGRAPHY", "EDITORIAL", "EMOTIONAL"],
    moodTags: ["clean", "editorial", "cinematic", "quiet-impact"],
    openingScore: 3,
    profileScore: 3,
    openingSections: ["INTRO", "BUILD", "CHORUS", "ENDING"],
    profileSections: ["PROFILE_INTRO", "GROOM_INTRO", "BRIDE_INTRO", "COUPLE_STORY", "TRAVEL", "ENDING"],
    palmierSupport: "PALMIER_TIMING_ONLY",
    implementationId: "davinci-textplus-mask-reveal-v1",
    previewId: "preview-type-mask-reveal-concept-v1",
    vocabularyIds: ["vocab-mask", "vocab-keyframe", "vocab-easing", "vocab-text-plus"],
    recipeIds: ["wedding-intro-title", "profile-chapter-intro", "travel-location-reveal"],
    inputSlots: [
      {
        kind: "TEXT",
        id: "text-1",
        label: "TITLE",
        required: true,
        example: "WELCOME",
        minChars: 1,
        maxChars: 18,
        maxLines: 1,
        recommendedLanguage: "ANY",
        semanticRole: "short-title",
      },
      {
        kind: "MEDIA",
        id: "image-1",
        label: "Hero Photo (optional context)",
        required: false,
        mediaType: "IMAGE",
        minCount: 0,
        maxCount: 1,
        orientation: "LANDSCAPE",
        aspectPreference: "16:9 preferred",
        subjectCount: "1〜2人推奨",
        textSafeArea: "文字を置く余白が片側にあると良い",
        cropTolerance: "MEDIUM",
        heroSuitability: "HIGH",
      },
      {
        kind: "TIMING",
        id: "timing-1",
        label: "Reveal timing",
        required: true,
        allowed: ["downbeat", "phrase-start", "chorus-head", "manual-marker", "none"],
        defaultValue: "phrase-start",
      },
    ],
    intensityNotes: {
      S: "移動量を小さく、0.7〜0.9秒程度。Profileや静かな導入向け。",
      M: "標準。0.55〜0.8秒程度で短く明快に。",
      L: "移動量をやや大きく、0.4〜0.65秒程度。ただしbounce/glowは足さない。",
    },
    sourcePatternIds: ["type-mask-slide", "MaskRevealTitle"],
  },
];

export const maskRevealVerticalSliceGate = {
  searchable: true,
  movingPreviewAvailable: true,
  previewTruthful: true,
  japaneseExplanation: true,
  inputSlots: true,
  promptGenerator: true,
  palmierHandoff: true,
  nleXmlPathKnown: true,
  davinciManifest: true,
  davinciImplementationRegistered: true,
  actualDavinciRender: false,
  localResolveVersionRecorded: false,
  renderTested: false,
  visualQaPassed: false,
  productionReady: false,
} as const;

export function getMotionPattern(id: string) {
  return motionPatternRegistry.find((pattern) => pattern.id === id);
}

export function searchMotionPatterns(query: string) {
  const normalized = query.trim().toLocaleLowerCase("ja-JP");
  if (!normalized) return motionPatternRegistry;

  return motionPatternRegistry.filter((pattern) => {
    const haystack = [
      pattern.japaneseName,
      pattern.commonName,
      pattern.shortDescription,
      pattern.howItLooks,
      ...pattern.aliases,
      ...pattern.moodTags,
      ...pattern.goodFor,
    ].join(" ").toLocaleLowerCase("ja-JP");
    return normalized.split(/\s+/).every((token) => haystack.includes(token));
  });
}

export function buildMotionPromptOutputs(input: MotionPromptInput): MotionPromptOutputs {
  const pattern = getMotionPattern(input.patternId);
  if (!pattern) throw new Error(`Unknown motion pattern: ${input.patternId}`);
  const implementation = implementationRegistry.find((item) => item.id === pattern.implementationId);
  if (!implementation) throw new Error(`Missing implementation: ${pattern.implementationId}`);

  const mediaLine = input.mediaPath?.trim() ? `使用写真: ${input.mediaPath.trim()}` : "使用写真: 任意（写真なしでも可）";
  const markerLine = input.marker?.trim() ? `Marker: ${input.marker.trim()}` : "Marker: section先頭または手動marker";

  const humanBrief = [
    `${input.project === "OPENING" ? "Opening" : "Profile"} / ${input.section}。`,
    `Pattern: ${pattern.japaneseName} (${pattern.commonName})。`,
    `Text: 「${input.text}」`,
    mediaLine,
    `尺: 約${input.durationSec.toFixed(1)}秒。強さ: ${input.intensity}。`,
    "写真・ストーリーを主役にし、文字は短く見せる。",
    "禁止: bounce / glow / shake / every-beat transition / unnecessary particles。",
  ].join("\n");

  const claudeCreativeInstruction = [
    "Use exactly these registered motion patterns:",
    `- ${pattern.id}`,
    "Do not replace the registered motion with another visual effect unless you explicitly explain why the registered implementation cannot be used.",
    `Project: ${input.project}`,
    `Section: ${input.section}`,
    `Text: ${input.text}`,
    `Duration: ${input.durationSec.toFixed(1)} sec`,
    `Intensity: ${input.intensity}`,
    mediaLine,
    "Priority: Story > Photo > Emotion > Readability > Music > Typography > Motion > Effect.",
  ].join("\n");

  const palmierInstruction = [
    `Prepare ${input.project.toLowerCase()} section "${input.section}" for registered pattern ${pattern.id}.`,
    mediaLine,
    `Place title: ${input.text}`,
    `Reserve approximately ${input.durationSec.toFixed(1)} sec for the title treatment.`,
    markerLine,
    "Do not invent a replacement transition or typography effect.",
    "Palmier role for this pattern is timing/placement only.",
    "If exact Mask Reveal is not native, leave timing and placement ready for DaVinci finishing.",
    "Export NLE XML for DaVinci Resolve together with the Motion Handoff Manifest.",
  ].join("\n");

  const davinciFinishManifest = [
    markerLine,
    `Pattern: ${pattern.id}`,
    `Text: ${input.text}`,
    `Duration: ${input.durationSec.toFixed(1)} sec`,
    `Implementation: ${implementation.type}`,
    `Implementation ID: ${implementation.id}`,
    `Intensity: ${input.intensity}`,
    `Method: ${implementation.method}`,
    "Avoid: bounce, glow, shake, excessive motion blur.",
    "Verification required: opened-in-davinci → render-tested → visual-QA → Actual Preview registration.",
  ].join("\n");

  const machine = {
    schemaVersion: 1,
    patternId: pattern.id,
    project: input.project,
    section: input.section,
    inputs: {
      text: input.text,
      mediaPath: input.mediaPath || null,
      durationSec: input.durationSec,
      intensity: input.intensity,
      marker: input.marker || null,
    },
    palmier: {
      support: pattern.palmierSupport,
      nleXmlRequired: true,
      instruction: palmierInstruction,
    },
    davinci: {
      implementationId: implementation.id,
      implementationType: implementation.type,
      instruction: davinciFinishManifest,
      productionReady: implementation.status === "PRODUCTION_READY",
    },
    guardrails: [
      "no-unregistered-effect-substitution",
      "concept-preview-is-not-actual",
      "story-photo-first",
      "no-bounce",
      "no-glow",
      "no-shake",
    ],
  };

  return {
    humanBrief,
    claudeCreativeInstruction,
    palmierInstruction,
    davinciFinishManifest,
    machineJson: JSON.stringify(machine, null, 2),
  };
}
