export type MotionPatternCategory =
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
export type UsageStage = "NEVER" | "ROUGH" | "FINAL";
export type PalmierCapability =
  | "PALMIER_NATIVE"
  | "PALMIER_APPROX"
  | "PALMIER_TIMING_ONLY"
  | "DAVINCI_REQUIRED"
  | "UNVERIFIED";

export type DavinciImplementationKind =
  | "DAVINCI_BUILTIN"
  | "DAVINCI_EDIT"
  | "DAVINCI_TEXT_PLUS"
  | "DAVINCI_FUSION"
  | "DAVINCI_DRFX"
  | "DAVINCI_SETTING"
  | "REACTOR"
  | "EXTERNAL_TEMPLATE"
  | "MANUAL";

export interface TextSlot {
  kind: "TEXT";
  id: string;
  label: string;
  required: boolean;
  minChars: number;
  maxChars: number;
  maxLines: number;
  recommendedLanguage: "JA" | "EN" | "BOTH";
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
  anchors: Array<"beat" | "downbeat" | "phrase-start" | "chorus-head" | "lyric-start" | "manual-marker" | "none">;
}

export type MotionInputSlot = TextSlot | MediaSlot | TimingSlot;

export interface ReuseEvidence {
  searchedExistingPatterns: boolean;
  searchedDaVinciBuiltins: boolean;
  searchedExternalSources: boolean;
  whyExistingOptionsFail: string;
  whyNewPatternIsNeeded: string;
}

export interface MotionPatternRecord {
  id: string;
  legacyPresetIds: string[];
  japaneseName: string;
  commonName: string;
  aliases: string[];
  categories: MotionPatternCategory[];
  moodTags: string[];
  naturalDescription: string;
  looksLike: string;
  goodFor: string[];
  avoidFor: string[];
  openingFit: "◎" | "○" | "△" | "×";
  profileFit: "◎" | "○" | "△" | "×";
  openingSections: string[];
  profileSections: string[];
  palmierCapability: PalmierCapability;
  inputSlots: MotionInputSlot[];
  relatedVocabularyIds: string[];
  implementationIds: string[];
  previewIds: string[];
  reuseEvidence: ReuseEvidence;
  humanDecision: HumanDecision;
  usageStage: UsageStage;
}

export interface MotionImplementationRecord {
  id: string;
  patternId: string;
  kind: DavinciImplementationKind;
  status: ImplementationStatus;
  method: string;
  artifactType: "NONE" | "DRFX" | "SETTING" | "TEMPLATE";
  artifactPath: string | null;
  installed: boolean;
  tested: boolean;
  resolveVersion: string | null;
  studioRequired: boolean | null;
  verified: boolean;
  notes: string;
}

export interface MotionPreviewRecord {
  id: string;
  patternId: string;
  sourceType: PreviewSourceType;
  status: PreviewStatus;
  freshness: PreviewFreshness;
  assetPath: string | null;
  posterPath: string | null;
  generatedBy: string;
  generatedAt: string | null;
  implementationId: string;
  sampleAssetSetId: string;
  resolveVersion: string | null;
  verified: boolean;
  notes: string;
}

export interface MaskRevealPromptInput {
  text: string;
  mediaLabel?: string;
  section: "OPENING_INTRO" | "OPENING_CHORUS" | "PROFILE_CHAPTER" | "PROFILE_COUPLE_STORY";
  intensity: "S" | "M" | "L";
  durationSeconds: number;
}

export interface MotionPromptOutputs {
  humanBrief: string;
  claudeCreativeInstruction: string;
  palmierInstruction: string;
  nleXmlHandoff: string;
  davinciFinishManifest: string;
  verificationChecklist: string;
  machineJson: string;
}

export const motionPatterns: MotionPatternRecord[] = [
  {
    id: "type-mask-reveal",
    legacyPresetIds: ["type-mask-slide"],
    japaneseName: "マスクから文字がスッと現れる",
    commonName: "Mask Reveal",
    aliases: [
      "文字 下からシュッ",
      "文字 スッと出る",
      "文字を隠して出す",
      "タイトル reveal",
      "マスク リビール",
      "文字 登場",
      "上から文字",
      "下から文字",
      "映画っぽい タイトル",
      "静かに文字を出す",
    ],
    categories: ["TYPOGRAPHY", "EDITORIAL"],
    moodTags: ["映画っぽい", "CMっぽい", "上品", "静か", "travel"],
    naturalDescription: "見えない境界の外から文字だけが滑り込み、必要な位置で止まる。派手な装飾ではなく、文字の出現方法そのものを整える演出。",
    looksLike: "文字が下・上・横の境界からスッと現れ、読みやすい位置で静かに止まる。",
    goodFor: ["Openingの名前・日付", "Profileの章タイトル", "旅行先ラベル", "短い英字タイトル"],
    avoidFor: ["長文全文", "写真の顔を覆う位置", "全カットへの連続使用", "bounceやglowを足して主役化する使い方"],
    openingFit: "◎",
    profileFit: "◎",
    openingSections: ["INTRO", "BUILD", "VERSE", "ENDING"],
    profileSections: ["PROFILE_INTRO", "GROOM_INTRO", "BRIDE_INTRO", "COUPLE_STORY", "TRAVEL", "ENDING"],
    palmierCapability: "PALMIER_TIMING_ONLY",
    inputSlots: [
      {
        kind: "TEXT",
        id: "TEXT_1",
        label: "表示する短い文字",
        required: true,
        minChars: 1,
        maxChars: 24,
        maxLines: 2,
        recommendedLanguage: "BOTH",
        semanticRole: "title-or-short-caption",
      },
      {
        kind: "MEDIA",
        id: "IMAGE_1",
        label: "背景のHero Photo",
        required: false,
        mediaType: "IMAGE",
        minCount: 0,
        maxCount: 1,
        orientation: "LANDSCAPE",
        aspectPreference: "16:9に耐えられる横構図",
        subjectCount: "人物1〜2人推奨。主役が明確な写真。",
        textSafeArea: "文字を置ける余白が左右または上下にある",
        cropTolerance: "MEDIUM",
        heroSuitability: "HIGH",
      },
      {
        kind: "TIMING",
        id: "TIMING_1",
        label: "出現タイミング",
        required: true,
        anchors: ["phrase-start", "downbeat", "chorus-head", "manual-marker"],
      },
    ],
    relatedVocabularyIds: ["mask", "keyframe", "easing", "text-plus"],
    implementationIds: ["impl-type-mask-reveal-davinci-text-plus"],
    previewIds: ["preview-type-mask-reveal-repo-concept"],
    reuseEvidence: {
      searchedExistingPatterns: true,
      searchedDaVinciBuiltins: true,
      searchedExternalSources: true,
      whyExistingOptionsFail: "既存type-mask-slide/Remotionは見た目の概念確認には使えるが、DaVinci実装・Palmier handoff・Preview provenanceまで一体で証明していない。",
      whyNewPatternIsNeeded: "新しい効果を発明するためではなく、既存Mask Revealを共通Pattern Registryへ正規化し、実装・Preview・入力・Promptを同じIDで追跡するため。",
    },
    humanDecision: "NONE",
    usageStage: "ROUGH",
  },
];

export const motionImplementations: MotionImplementationRecord[] = [
  {
    id: "impl-type-mask-reveal-davinci-text-plus",
    patternId: "type-mask-reveal",
    kind: "DAVINCI_TEXT_PLUS",
    status: "AVAILABLE",
    method: "DaVinci Resolve Text+をFusionで使用し、文字レイヤーを矩形Maskの境界からrevealする。MaskまたはText+側の位置/clip境界をkeyframeし、Easeで加減速を整える。",
    artifactType: "NONE",
    artifactPath: null,
    installed: false,
    tested: false,
    resolveVersion: null,
    studioRequired: null,
    verified: false,
    notes: "公式Fusion/Text+ capabilityをReuseする。ローカルResolveでopened/render-tested/visual-QAが終わるまでPRODUCTION_READYへ上げない。",
  },
];

export const motionPreviews: MotionPreviewRecord[] = [
  {
    id: "preview-type-mask-reveal-repo-concept",
    patternId: "type-mask-reveal",
    sourceType: "REPO_GENERATED",
    status: "CONCEPT",
    freshness: "CURRENT",
    assetPath: null,
    posterPath: null,
    generatedBy: "motion-studio renderable preset: type-mask-slide / typography-reveal / mode=mask",
    generatedAt: null,
    implementationId: "impl-type-mask-reveal-davinci-text-plus",
    sampleAssetSetId: "sample-typography-welcome-v1",
    resolveVersion: null,
    verified: false,
    notes: "既存Remotion実装はvisual prior art。DaVinci実renderではない。動画assetを登録する場合もConcept badgeを外さない。",
  },
];

export function searchMotionPatterns(query: string) {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return motionPatterns;
  return motionPatterns.filter((pattern) => {
    const haystack = [
      pattern.japaneseName,
      pattern.commonName,
      pattern.naturalDescription,
      pattern.looksLike,
      ...pattern.aliases,
      ...pattern.moodTags,
      ...pattern.goodFor,
    ].join(" ").toLowerCase();
    return haystack.includes(normalized);
  });
}

function clampMaskRevealInput(input: MaskRevealPromptInput): MaskRevealPromptInput {
  const text = input.text.trim().slice(0, 24) || "WELCOME";
  return {
    ...input,
    text,
    durationSeconds: Math.max(0.4, Math.min(3, input.durationSeconds)),
  };
}

export function buildMaskRevealPromptOutputs(rawInput: MaskRevealPromptInput): MotionPromptOutputs {
  const input = clampMaskRevealInput(rawInput);
  const media = input.mediaLabel?.trim() || "選択したHero写真";
  const markerName = "MOTION:type-mask-reveal";
  const manifest = {
    patternId: "type-mask-reveal",
    text: input.text,
    media: media,
    section: input.section,
    durationSeconds: input.durationSeconds,
    intensity: input.intensity,
    palmierCapability: "PALMIER_TIMING_ONLY",
    handoff: {
      markerName,
      exportFormat: "DAVINCI_COMPATIBLE_NLE_XML",
      titleTrackIntent: "DEDICATED_TITLE_TRACK",
    },
    davinciImplementationId: "impl-type-mask-reveal-davinci-text-plus",
    avoid: ["bounce", "glow", "excessive-motion-blur", "covering-subject-face", "effect-for-effect"],
  } as const;

  return {
    humanBrief: [
      `${input.section}で ${media} を使用。`,
      `「${input.text}」を ${input.durationSeconds.toFixed(1)}秒程度のMask Revealで表示する。`,
      `強さは${input.intensity}。写真と可読性を主役にし、文字は境界からスッと現れて静かに止める。`,
      "禁止: bounce / glow / 強すぎるmotion blur / 顔を覆う配置 / effect-for-effect。",
    ].join("\n"),
    claudeCreativeInstruction: [
      "Use exactly this registered motion pattern:",
      "- type-mask-reveal",
      `Text: ${input.text}`,
      `Media: ${media}`,
      `Section: ${input.section}`,
      `Duration target: ${input.durationSeconds.toFixed(1)} sec`,
      `Intensity: ${input.intensity}`,
      `Preserve marker: ${markerName}`,
      "Do not replace it with another visual effect without explicitly explaining why.",
      "Keep the real photo unchanged. Do not generate or transform bride/groom/family/friends/dog identity.",
      "Do not claim the DaVinci implementation is verified until a local Resolve render passes visual QA.",
    ].join("\n"),
    palmierInstruction: [
      `Use ${media} for ${input.section}.`,
      `Place title: ${input.text}`,
      `Reserve approximately ${input.durationSeconds.toFixed(1)} sec for the title reveal timing.`,
      `Preserve timeline marker: ${markerName}`,
      "Palmier responsibility is rough timing and placement only for this pattern.",
      "If exact Mask Reveal cannot be reproduced natively, do not invent a substitute effect.",
      "Export the rough timeline as DaVinci-compatible NLE XML and keep the marker/timing intent for finishing.",
    ].join("\n"),
    nleXmlHandoff: [
      "Palmier → DaVinci handoff",
      `1. Rough timing/orderを確定し、${markerName} を対象title位置に残す。`,
      "2. PalmierからDaVinci-compatible NLE XMLを書き出す。",
      "3. DaVinci ResolveへXMLを読み込み、media relinkとtimeline timingを確認する。",
      `4. ${markerName} の位置へ専用title trackでText+ Mask Revealを適用する。`,
      "5. Palmier側で代替effectを焼き込まない。最終motion authorityはDaVinci。",
    ].join("\n"),
    davinciFinishManifest: [
      `Pattern: ${manifest.patternId}`,
      `Text: ${manifest.text}`,
      `Media: ${manifest.media}`,
      `Section: ${manifest.section}`,
      `Duration: ${manifest.durationSeconds.toFixed(1)} sec`,
      `Marker: ${markerName}`,
      `Implementation: ${manifest.davinciImplementationId}`,
      `Intensity: ${manifest.intensity}`,
      "Method: Text+ + rectangular mask/keyframes + eased settle",
      "Track intent: dedicated title track; preserve underlying real photo/video",
      `Avoid: ${manifest.avoid.join(", ")}`,
      "Verification required: XML-imported → opened-in-davinci → render-tested → visual-QA → record local Resolve version",
    ].join("\n"),
    verificationChecklist: [
      "Mask Reveal completion gate",
      "[ ] Palmier rough timingを作成し、MOTION:type-mask-reveal markerを保持",
      "[ ] DaVinci-compatible NLE XMLを書き出し、Resolveへimport",
      "[ ] Text+ + rectangular mask + keyframe easingで実装",
      "[ ] 実renderを書き出し、Concept previewとは別assetとして保存",
      "[ ] Preview sourceTypeをACTUAL_DAVINCI_RENDERへ更新",
      "[ ] local Resolve versionを記録",
      "[ ] 顔被り・可読性・速度・過剰演出をVisual QA",
      "[ ] すべて通過後だけTESTED / PRODUCTION_READYを判断",
    ].join("\n"),
    machineJson: JSON.stringify(manifest, null, 2),
  };
}

export function getPatternImplementation(pattern: MotionPatternRecord) {
  return motionImplementations.find((item) => pattern.implementationIds.includes(item.id));
}

export function getPatternPreview(pattern: MotionPatternRecord) {
  return motionPreviews.find((item) => pattern.previewIds.includes(item.id));
}
