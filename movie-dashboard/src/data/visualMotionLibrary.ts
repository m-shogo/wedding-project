import { startMotionPresets, type StartMotionPreset } from "./startMotionKit";

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
  | "MANUAL"
  // motion-studio(Remotion)のMotion Kit presetとして既に実装済みのもの。
  // DaVinci固有の実装ではないため、DaVinci系の値と混同しない。
  | "REMOTION_MOTION_KIT"
  | "DAVINCI_EDIT_NATIVE"
  | "PALMIER_NATIVE_EDIT"
  | "MIXED_REMOTION_DAVINCI";

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
  davinciFinishManifest: string;
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

// --- モーション図鑑 v1: 既存36 Motion Kit preset(motion-studio実装済み)のカタログ化 ---
//
// ここでは新しい効果を発明しない。startMotionKit.ts の36 presetのうち、
// type-mask-slide は既に上の type-mask-reveal がより完全な形(実装/Preview/Prompt付き)で
// カバーしているため除外し、残り35件をブラウズ・検索可能なMotionPatternRecordへ正規化する。
// 各値はpreset自身が持つ purpose / avoidWhen / useCases / engine から機械的に導出し、
// 未検証のACTUAL/PRODUCTION_READYを一切主張しない(すべてCONCEPT/DISCOVERED相当のまま)。

const KIT_JAPANESE_NAME: Record<string, string> = {
  "type-char-stagger": "文字が順番にズレて現れる",
  "type-word-punch": "一語だけ強調して出す",
  "type-tracking-burst": "字間が開いて着地する",
  "type-outline-fill": "輪郭線から塗りへ変わる",
  "type-baseline-hop": "文字が軽く跳ねる",
  "type-vertical-wipe": "縦方向に文字が現れる",
  "type-type-on-rhythm": "リズムに合わせて一語ずつ出す",
  "type-triplet": "3拍で文字が出る",
  "type-counter-scroll": "背景と逆向きに文字が流れる",
  "type-frame-lock": "大きな文字が画面端で止まる",
  "type-quiet-caption": "静かに読ませるキャプション",
  "photo-static-hero": "写真を動かさず見せる",
  "photo-small-push": "ごくわずかに寄る",
  "photo-slow-pull": "ゆっくり引いて着地する",
  "photo-directional-pan": "視線の方向へパンする",
  "photo-2p5d-parallax": "奥行きのある擬似視差",
  "photo-freeze-cutout": "写真を切り抜いて止める",
  "photo-contact-sheet-snap": "複数写真を束で見せる",
  "photo-split-panel": "画面を分割して並べる",
  "cut-hard-accent": "何も足さないハードカット",
  "cut-match-shape": "形をつないでカットする",
  "wipe-directional-shape": "図形が画面を横切って切り替わる",
  "wipe-paper-edge": "紙の端で場面が変わる",
  "wipe-route-line": "経路線で次のカットへつなぐ",
  "flash-one-frame-soft": "一瞬だけ光って切り替わる",
  "whip-source-matched": "動きの方向が合う素材同士のwhip",
  "color-field-release": "色面に一度落として呼吸する",
  "accent-speed-lines": "スピード線で加速感を足す",
  "accent-impact-frame": "一瞬だけ画面が弾ける",
  "accent-halftone-burst": "ハーフトーンが一瞬広がる",
  "accent-scribble-underline": "手描き線で一語を囲む",
  "accent-stamp-triplet": "スタンプが3回押される",
  "accent-panel-grid": "コマ割りが一瞬組み替わる",
  "accent-cel-shadow-sweep": "セル画風の影が横切る",
  "accent-micro-rgb-split": "ごく短いRGBのズレ",
};

const KIT_USE_CASE_JA: Record<string, string> = {
  lyric: "歌詞・キャプション",
  caption: "テロップ",
  photo: "写真",
  video: "動画",
  hero: "Hero写真",
  travel: "旅行シーン",
  "3-hit": "3連アクセント",
  chorus: "サビ",
  chapter: "章切り替え",
  rhythm: "リズム強調",
  montage: "モンタージュ",
  "anime-op": "アニメOP的演出(限定利用)",
  release: "緩急の緩",
  "location-title": "地名タイトル",
  ending: "エンディング",
  "wedding-greeting": "結婚式の挨拶文",
  "moving-broll": "動きのあるB-roll",
  peak: "サビ後半など最高潮部分",
};

// Style Bibleは「映画予告編風・冒険アニメOP風をデフォルトにしない」を明示しているため、
// ANIME_ACCENT系は既定でOpening/Profileの適合度を下げ、素材に合う場合だけの限定利用として扱う。
// 個別に旅行モチーフ(スタンプ等)と結びつくものだけ例外的にOpening適合をやや上げる。
const FIT_OVERRIDE: Partial<Record<string, { openingFit: MotionPatternRecord["openingFit"]; profileFit: MotionPatternRecord["profileFit"] }>> = {
  "photo-2p5d-parallax": { openingFit: "○", profileFit: "△" },
  "photo-freeze-cutout": { openingFit: "○", profileFit: "△" },
  "whip-source-matched": { openingFit: "○", profileFit: "△" },
  "color-field-release": { openingFit: "○", profileFit: "○" },
  "type-frame-lock": { openingFit: "◎", profileFit: "○" },
  "accent-stamp-triplet": { openingFit: "○", profileFit: "△" },
};

function defaultFitForFamily(family: StartMotionPreset["category"]): { openingFit: MotionPatternRecord["openingFit"]; profileFit: MotionPatternRecord["profileFit"] } {
  switch (family) {
    case "TYPO":
      return { openingFit: "◎", profileFit: "◎" };
    case "PHOTO":
      return { openingFit: "◎", profileFit: "◎" };
    case "TRANSITION":
      return { openingFit: "◎", profileFit: "○" };
    case "ANIME_ACCENT":
      return { openingFit: "△", profileFit: "×" };
  }
}

function categoriesForPreset(preset: StartMotionPreset): MotionPatternCategory[] {
  const categories = new Set<MotionPatternCategory>();
  switch (preset.sharedEngine) {
    case "typography-reveal":
      categories.add("TYPOGRAPHY");
      break;
    case "camera-transform":
      categories.add("CAMERA");
      break;
    case "transition-wipe":
      categories.add("TRANSITION");
      break;
    case "graphic-hit":
      categories.add("GRAPHIC");
      break;
    case "native-cut":
      categories.add("TRANSITION");
      categories.add("RHYTHM");
      break;
  }
  if (preset.source.includes("photo") || preset.source.includes("video")) categories.add("PHOTO");
  if (preset.useCases.includes("travel")) categories.add("TRAVEL");
  if (["single-hit", "triplet", "stagger"].includes(preset.beatBehavior)) categories.add("RHYTHM");
  if (preset.useCases.includes("wedding-greeting") || preset.useCases.includes("hero")) categories.add("EMOTIONAL");
  if (preset.category !== "ANIME_ACCENT") categories.add("EDITORIAL");
  return Array.from(categories);
}

function inputSlotsForPreset(preset: StartMotionPreset): MotionInputSlot[] {
  const slots: MotionInputSlot[] = [];
  if (preset.source.includes("lyric") || preset.source.includes("caption")) {
    slots.push({
      kind: "TEXT",
      id: "TEXT_1",
      label: "表示する短い文字",
      required: true,
      minChars: 1,
      maxChars: 24,
      maxLines: 2,
      recommendedLanguage: "BOTH",
      semanticRole: "title-or-short-caption",
    });
  }
  if (preset.source.includes("photo") || preset.source.includes("video")) {
    slots.push({
      kind: "MEDIA",
      id: "MEDIA_1",
      label: preset.source.includes("video") ? "背景の実写真/実動画" : "背景の実写真",
      required: true,
      mediaType: preset.source.includes("video") && !preset.source.includes("photo") ? "VIDEO" : "IMAGE",
      minCount: preset.category === "PHOTO" && (preset.id === "photo-contact-sheet-snap" || preset.id === "photo-split-panel") ? 2 : 1,
      maxCount: preset.id === "photo-contact-sheet-snap" ? 6 : preset.id === "photo-split-panel" || preset.id === "accent-panel-grid" ? 3 : 1,
      orientation: "ANY",
      aspectPreference: "既存素材の比率を尊重する(無理な16:9化はしない)",
      subjectCount: "素材による",
      textSafeArea: "文字と重ねる場合のみ余白を確認する",
      cropTolerance: "MEDIUM",
      heroSuitability: preset.useCases.includes("hero") ? "HIGH" : "MEDIUM",
    });
  }
  slots.push({
    kind: "TIMING",
    id: "TIMING_1",
    label: "出現/切り替えタイミング",
    required: true,
    anchors:
      preset.beatBehavior === "hold"
        ? ["manual-marker", "none"]
        : ["downbeat", "phrase-start", "chorus-head", "manual-marker"],
  });
  return slots;
}

function implementationKindForEngine(engine: StartMotionPreset["engine"]): DavinciImplementationKind {
  switch (engine) {
    case "remotion":
      return "REMOTION_MOTION_KIT";
    case "davinci-edit":
      return "DAVINCI_EDIT_NATIVE";
    case "palmier-native":
      return "PALMIER_NATIVE_EDIT";
    case "mixed":
      return "MIXED_REMOTION_DAVINCI";
  }
}

function palmierCapabilityForEngine(engine: StartMotionPreset["engine"]): PalmierCapability {
  switch (engine) {
    case "remotion":
      return "PALMIER_TIMING_ONLY";
    case "palmier-native":
      return "PALMIER_NATIVE";
    case "davinci-edit":
    case "mixed":
      return "DAVINCI_REQUIRED";
  }
}

function sectionsForPreset(preset: StartMotionPreset) {
  const opening = new Set<string>();
  const profile = new Set<string>(["COUPLE_STORY"]);
  if (preset.energy.includes("quiet")) {
    opening.add("INTRO");
    opening.add("ENDING");
    profile.add("PROFILE_INTRO");
  }
  if (preset.energy.includes("build")) {
    opening.add("BUILD");
    opening.add("VERSE");
    profile.add("GROOM_INTRO");
    profile.add("BRIDE_INTRO");
  }
  if (preset.energy.includes("hit") || preset.energy.includes("peak")) {
    opening.add("CHORUS");
  }
  if (preset.energy.includes("release")) {
    opening.add("INTERLUDE");
    opening.add("ENDING");
    profile.add("ENDING");
  }
  if (preset.useCases.includes("travel")) profile.add("TRAVEL");
  return { openingSections: Array.from(opening), profileSections: Array.from(profile) };
}

function sampleAssetSetIdForPreset(preset: StartMotionPreset): string {
  if (preset.category === "TYPO") return "sample-generic-typography-v1";
  if (preset.id === "photo-contact-sheet-snap" || preset.id === "photo-split-panel" || preset.id === "accent-panel-grid") {
    return "sample-generic-multi-photo-v1";
  }
  return "sample-generic-hero-photo-v1";
}

function kitPresetToPattern(preset: StartMotionPreset): MotionPatternRecord {
  const fit = FIT_OVERRIDE[preset.id] ?? defaultFitForFamily(preset.category);
  const { openingSections, profileSections } = sectionsForPreset(preset);
  return {
    id: preset.id,
    legacyPresetIds: [],
    japaneseName: KIT_JAPANESE_NAME[preset.id] ?? preset.label,
    commonName: preset.label,
    aliases: [preset.label, ...preset.useCases.map((useCase) => KIT_USE_CASE_JA[useCase] ?? useCase)],
    categories: categoriesForPreset(preset),
    moodTags: preset.useCases.map((useCase) => KIT_USE_CASE_JA[useCase] ?? useCase),
    naturalDescription: preset.purpose,
    looksLike: `${preset.label}(${preset.beatBehavior} / ${preset.durationFrames[0]}〜${preset.durationFrames[1]}frame @30fps)。${preset.purpose}`,
    goodFor: preset.useCases.map((useCase) => KIT_USE_CASE_JA[useCase] ?? useCase),
    avoidFor: [preset.avoidWhen],
    openingFit: fit.openingFit,
    profileFit: fit.profileFit,
    openingSections,
    profileSections,
    palmierCapability: palmierCapabilityForEngine(preset.engine),
    inputSlots: inputSlotsForPreset(preset),
    relatedVocabularyIds: preset.skillIds,
    implementationIds: [`impl-${preset.id}`],
    previewIds: [`preview-${preset.id}-concept`],
    reuseEvidence: {
      searchedExistingPatterns: true,
      searchedDaVinciBuiltins: true,
      searchedExternalSources: true,
      whyExistingOptionsFail: "既存のDirector Recipe研究(Phase A〜I)を踏まえてmotion-studioのMotion Kit presetとして実装済みのため、新規に効果を発明する必要がない。",
      whyNewPatternIsNeeded: "既存実装をモーション図鑑としてブラウズ・検索・再利用できる形に正規化するためのカタログ化であり、演出自体の新規追加ではない。",
    },
    humanDecision: "NONE",
    usageStage: "NEVER",
  };
}

function kitPresetToImplementation(preset: StartMotionPreset): MotionImplementationRecord {
  const kind = implementationKindForEngine(preset.engine);
  const isRemotion = preset.engine === "remotion";
  return {
    id: `impl-${preset.id}`,
    patternId: preset.id,
    kind,
    status: preset.engine === "mixed" ? "DISCOVERED" : "AVAILABLE",
    method: isRemotion
      ? `motion-studio Motion Kit preset "${preset.id}"(共有engine: ${preset.sharedEngine})として実装済み。${preset.purpose}`
      : `${preset.engine}上の標準的な技法(共有engine: ${preset.sharedEngine})。${preset.purpose}`,
    artifactType: "NONE",
    artifactPath: null,
    installed: isRemotion,
    tested: false,
    resolveVersion: null,
    studioRequired: isRemotion ? false : true,
    verified: false,
    notes: "この図鑑カタログ化ではローカルRender/DaVinci実機検証を行っていない。TESTED/PRODUCTION_READYへは実機確認後にのみ昇格する。",
  };
}

function kitPresetToPreview(preset: StartMotionPreset): MotionPreviewRecord {
  const isRemotion = preset.engine === "remotion";
  return {
    id: `preview-${preset.id}-concept`,
    patternId: preset.id,
    sourceType: isRemotion ? "REPO_GENERATED" : "CONCEPT_ONLY",
    status: "CONCEPT",
    freshness: "NEEDS_RECHECK",
    assetPath: null,
    posterPath: null,
    generatedBy: isRemotion
      ? `motion-studio Motion Kit preset: ${preset.id} (${preset.sharedEngine} engine)。この図鑑追加ではまだ動画を書き出していない。`
      : `${preset.engine}上の技法説明のみ。まだ動画assetは存在しない。`,
    generatedAt: null,
    implementationId: `impl-${preset.id}`,
    sampleAssetSetId: sampleAssetSetIdForPreset(preset),
    resolveVersion: null,
    verified: false,
    notes: "Reuse Before Buildに基づき既存実装をカタログ化した段階。Actual Renderで見た目を確認するまでCONCEPT扱いを維持する。",
  };
}

const kitPatternsExcludingMaskSlide = startMotionPresets.filter((preset) => preset.id !== "type-mask-slide");

motionPatterns.push(...kitPatternsExcludingMaskSlide.map(kitPresetToPattern));
motionImplementations.push(...kitPatternsExcludingMaskSlide.map(kitPresetToImplementation));
motionPreviews.push(...kitPatternsExcludingMaskSlide.map(kitPresetToPreview));

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
  const manifest = {
    patternId: "type-mask-reveal",
    text: input.text,
    media: media,
    section: input.section,
    durationSeconds: input.durationSeconds,
    intensity: input.intensity,
    palmierCapability: "PALMIER_TIMING_ONLY",
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
      "Do not replace it with another visual effect without explicitly explaining why.",
      "Keep the real photo unchanged. Do not generate or transform bride/groom/family/friends/dog identity.",
      "Do not claim the DaVinci implementation is verified until a local Resolve render passes visual QA.",
    ].join("\n"),
    palmierInstruction: [
      `Use ${media} for ${input.section}.`,
      `Place title: ${input.text}`,
      `Reserve approximately ${input.durationSeconds.toFixed(1)} sec for the title reveal timing.`,
      "Palmier responsibility is rough timing and placement only for this pattern.",
      "If exact Mask Reveal cannot be reproduced natively, do not invent a substitute effect.",
      "Leave timing/placement ready for DaVinci finishing and preserve the marker in the handoff.",
    ].join("\n"),
    davinciFinishManifest: [
      `Pattern: ${manifest.patternId}`,
      `Text: ${manifest.text}`,
      `Media: ${manifest.media}`,
      `Section: ${manifest.section}`,
      `Duration: ${manifest.durationSeconds.toFixed(1)} sec`,
      `Implementation: ${manifest.davinciImplementationId}`,
      `Intensity: ${manifest.intensity}`,
      "Method: Text+ + rectangular mask/keyframes + eased settle",
      `Avoid: ${manifest.avoid.join(", ")}`,
      "Verification required: opened-in-davinci → render-tested → visual-QA → record local Resolve version",
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
