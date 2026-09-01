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
  | "ACTUAL_SOURCE_MEDIA_RENDER"
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
  artifactType: "NONE" | "DRFX" | "SETTING" | "TEMPLATE" | "FCPXML";
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
    previewIds: ["preview-type-mask-reveal-davinci-actual", "preview-type-mask-reveal-repo-concept"],
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
    status: "PRODUCTION_READY",
    method: "DaVinci Resolve Text+をFusionで使用し、文字レイヤーを矩形Maskの境界からrevealする。MaskまたはText+側の位置/clip境界をkeyframeし、Easeで加減速を整える。",
    artifactType: "NONE",
    artifactPath: null,
    installed: true,
    tested: true,
    resolveVersion: "21.0.4.5",
    studioRequired: false,
    verified: true,
    notes: "Palmier marker付きFCPXMLをscratch Resolveへimportしてmarker/title/120framesを照合後、DaVinci Resolve Free 21.0.4.5のFusion Compositionで1280x720・30fps・120framesを実Render。目視QAと独立ffmpeg pixel oracleの両方を通過済み。",
  },
];

export const motionPreviews: MotionPreviewRecord[] = [
  {
    id: "preview-type-mask-reveal-davinci-actual",
    patternId: "type-mask-reveal",
    sourceType: "ACTUAL_DAVINCI_RENDER",
    status: "VERIFIED",
    freshness: "CURRENT",
    assetPath: "/motion-previews/type-mask-reveal/davinci-actual-v1.mp4",
    posterPath: "/motion-previews/type-mask-reveal/davinci-actual-v1-poster.png",
    generatedBy: "Palmier FCPXML → DaVinci Resolve Free 21.0.4.5 / internal Utility script / native Fusion Composition",
    generatedAt: "2026-08-27T03:01:32Z",
    implementationId: "impl-type-mask-reveal-davinci-text-plus",
    sampleAssetSetId: "sample-typography-welcome-v1",
    resolveVersion: "21.0.4.5",
    verified: true,
    notes: "実DaVinci MP4は実装証拠。Human Master Scene値の正本ではない。Palmier marker付きscratch handoff、Resolve readback、目視QA、独立ffmpeg pixel oracleを完走済み。",
  },
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

// 日本語ファースト検索(docs/CLAUDE.md「日本語ファースト」節)のための自然語エイリアス。
// 正式名称(English label)より、擬音・用途で検索できることを優先する。
const KIT_JAPANESE_ALIASES: Record<string, string[]> = {
  "type-char-stagger": ["文字 順番に出る", "文字 バラバラ", "一文字ずつ"],
  "type-word-punch": ["一語 強調", "単語 パッと", "キーワード 強調"],
  "type-tracking-burst": ["字間 広がる", "文字 呼吸", "着地する文字"],
  "type-outline-fill": ["線から塗り", "輪郭線 文字", "アウトライン 文字"],
  "type-baseline-hop": ["文字 跳ねる", "ジャンプする文字", "軽快な文字"],
  "type-vertical-wipe": ["縦 文字 出る", "縦方向 出現", "縦書き reveal"],
  "type-type-on-rhythm": ["リズムで文字が出る", "音に合わせて文字", "拍で文字"],
  "type-triplet": ["3拍子 文字", "3回 文字", "トリプレット 文字"],
  "type-counter-scroll": ["背景と逆方向 文字", "文字 流れる", "スクロール 文字"],
  "type-frame-lock": ["大きい文字 はみ出す", "ポスター風文字", "画面端 文字"],
  "type-quiet-caption": ["静かな字幕", "動かない字幕", "読む時間を守る"],
  "photo-static-hero": ["写真 動かさない", "静止 Hero写真", "止め写真"],
  "photo-small-push": ["わずかにズーム", "小さく寄る", "控えめなズーム"],
  "photo-slow-pull": ["ゆっくり引く", "スローズームアウト", "引いて着地"],
  "photo-directional-pan": ["視線方向にパン", "写真 パン", "移動方向 カメラ"],
  "photo-2p5d-parallax": ["写真 奥行き", "視差効果", "パララックス写真"],
  "photo-freeze-cutout": ["写真 切り抜き 止める", "フリーズカットアウト", "人物切り抜き静止"],
  "photo-contact-sheet-snap": ["複数写真 まとめて", "コンタクトシート", "写真の束"],
  "photo-split-panel": ["画面分割", "写真 並べる", "スプリットパネル"],
  "cut-hard-accent": ["何もつけないカット", "ハードカット", "素早い切り替え"],
  "cut-match-shape": ["形をつなぐカット", "マッチカット", "似た形でつなぐ"],
  "wipe-directional-shape": ["図形で画面を切り替え", "シェイプワイプ", "図形が横切る"],
  "wipe-paper-edge": ["紙の端で切り替え", "ペーパーワイプ", "紙めくり風"],
  "wipe-route-line": ["route線でつなぐ", "地図の線 切り替え", "経路線トランジション"],
  "flash-one-frame-soft": ["一瞬光る切り替え", "ソフトフラッシュ", "淡いインパクト"],
  "whip-source-matched": ["動きが合うwhipカット", "動画同士のwhipパン", "カメラの勢いでつなぐ"],
  "color-field-release": ["色面に落とす", "カラーフィールド", "一度色だけにする"],
  "accent-speed-lines": ["スピード線", "集中線", "加速感の線"],
  "accent-impact-frame": ["一瞬弾ける", "インパクトフレーム", "画面が光る瞬間"],
  "accent-halftone-burst": ["ハーフトーン", "ドット柄が広がる", "漫画風テクスチャ"],
  "accent-scribble-underline": ["手描き線 強調", "落書き風アンダーライン", "手書き囲み"],
  "accent-stamp-triplet": ["スタンプ 3回", "パスポートスタンプ演出", "旅行スタンプ"],
  "accent-panel-grid": ["コマ割り", "漫画風グリッド", "パネル組み替え"],
  "accent-cel-shadow-sweep": ["セル画風の影", "アニメ風シャドウ", "影が横切る"],
  "accent-micro-rgb-split": ["RGBずれ", "色収差風エフェクト", "グリッチ風ズレ"],
};

// 監査・旧promptで使われた名前は新Patternを複製せずcanonical IDへ吸収する。
const KIT_LEGACY_PATTERN_IDS: Record<string, string[]> = {
  "photo-static-hero": ["photo-hero-still"],
  "photo-small-push": ["camera-gentle-push"],
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
  if (preset.id === "cut-match-shape") return "sample-match-shape-source-v1";
  if (preset.id === "whip-source-matched") return "sample-whip-source-v1";
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
    legacyPresetIds: KIT_LEGACY_PATTERN_IDS[preset.id] ?? [],
    japaneseName: KIT_JAPANESE_NAME[preset.id] ?? preset.label,
    commonName: preset.label,
    aliases: [...(KIT_JAPANESE_ALIASES[preset.id] ?? []), preset.label],
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
    previewIds: preset.id === "cut-hard-accent"
      ? ["preview-cut-hard-accent-palmier-actual", "preview-cut-hard-accent-concept"]
      : preset.id === "type-quiet-caption"
        ? ["preview-type-quiet-caption-davinci-actual", "preview-type-quiet-caption-concept"]
        : preset.id === "cut-match-shape"
          ? ["preview-cut-match-shape-source-actual", "preview-cut-match-shape-concept"]
          : preset.id === "whip-source-matched"
            ? ["preview-whip-source-matched-source-actual", "preview-whip-source-matched-concept"]
            : preset.id === "photo-static-hero"
              ? ["preview-photo-static-hero-davinci-actual", "preview-photo-static-hero-concept"]
              : preset.id === "type-word-punch"
                ? ["preview-type-word-punch-davinci-actual", "preview-type-word-punch-concept"]
        : [`preview-${preset.id}-concept`],
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

const STOCK_PHOTO_PREVIEW_BASES: Record<string, string> = {
  "photo-static-hero": "/motion-previews/photo-static-hero/repo-stock-v1",
  "photo-small-push": "/motion-previews/photo-small-push/repo-stock-v1",
  "photo-directional-pan": "/motion-previews/photo-directional-pan/repo-stock-v1",
  "photo-slow-pull": "/motion-previews/photo-slow-pull/repo-stock-v1",
  "photo-2p5d-parallax": "/motion-previews/photo-2p5d-parallax/repo-stock-v1",
  "photo-freeze-cutout": "/motion-previews/photo-freeze-cutout/repo-stock-v1",
  "photo-contact-sheet-snap": "/motion-previews/photo-contact-sheet-snap/repo-stock-v1",
  "photo-split-panel": "/motion-previews/photo-split-panel/repo-stock-v1",
  "accent-panel-grid": "/motion-previews/accent-panel-grid/repo-stock-v1",
};
const VERIFIED_TYPOGRAPHY_PREVIEW_BASES: Record<string, string> = {
  "type-word-punch": "/motion-previews/type-word-punch/repo-v1",
  "type-char-stagger": "/motion-previews/type-char-stagger/repo-v1",
  "type-tracking-burst": "/motion-previews/type-tracking-burst/repo-v1",
  "type-quiet-caption": "/motion-previews/type-quiet-caption/repo-v1",
  "type-baseline-hop": "/motion-previews/type-baseline-hop/repo-v1",
  "type-outline-fill": "/motion-previews/type-outline-fill/repo-v1",
  "type-vertical-wipe": "/motion-previews/type-vertical-wipe/repo-v1",
  "type-type-on-rhythm": "/motion-previews/type-type-on-rhythm/repo-v1",
  "type-frame-lock": "/motion-previews/type-frame-lock/repo-v1",
  "type-triplet": "/motion-previews/type-triplet/repo-v1",
  "type-counter-scroll": "/motion-previews/type-counter-scroll/repo-v1",
};
const VERIFIED_TRANSITION_PREVIEW_BASES: Record<string, string> = {
  "wipe-route-line": "/motion-previews/wipe-route-line/repo-v1",
  "flash-one-frame-soft": "/motion-previews/flash-one-frame-soft/repo-v1",
  "wipe-directional-shape": "/motion-previews/wipe-directional-shape/repo-v1",
  "wipe-paper-edge": "/motion-previews/wipe-paper-edge/repo-v1",
  "color-field-release": "/motion-previews/color-field-release/repo-v1",
};
const VERIFIED_GRAPHIC_PREVIEW_BASES: Record<string, string> = {
  "accent-speed-lines": "/motion-previews/accent-speed-lines/repo-v1",
  "accent-stamp-triplet": "/motion-previews/accent-stamp-triplet/repo-v1",
  "accent-halftone-burst": "/motion-previews/accent-halftone-burst/repo-v1",
  "accent-scribble-underline": "/motion-previews/accent-scribble-underline/repo-v1",
  "accent-impact-frame": "/motion-previews/accent-impact-frame/repo-v1",
  "accent-cel-shadow-sweep": "/motion-previews/accent-cel-shadow-sweep/repo-v1",
  "accent-micro-rgb-split": "/motion-previews/accent-micro-rgb-split/repo-v1",
};
const VERIFIED_REPRESENTATIVE_CUT_PREVIEW_BASES: Record<string, string> = {
  "cut-hard-accent": "/motion-previews/cut-hard-accent/repo-representative-v1",
  "cut-match-shape": "/motion-previews/cut-match-shape/repo-representative-v1",
  "whip-source-matched": "/motion-previews/whip-source-matched/repo-representative-v1",
};
const VERIFIED_REPO_PREVIEW_BASES = {...STOCK_PHOTO_PREVIEW_BASES, ...VERIFIED_TYPOGRAPHY_PREVIEW_BASES, ...VERIFIED_TRANSITION_PREVIEW_BASES, ...VERIFIED_GRAPHIC_PREVIEW_BASES, ...VERIFIED_REPRESENTATIVE_CUT_PREVIEW_BASES};
const TESTED_REMOTION_IMPLEMENTATIONS = new Set([
  ...Object.keys(STOCK_PHOTO_PREVIEW_BASES),
  "type-word-punch",
  "type-char-stagger",
  "type-tracking-burst",
  "type-baseline-hop",
  "type-outline-fill",
  "type-vertical-wipe",
  "type-type-on-rhythm",
  "type-frame-lock",
  "type-triplet",
  "type-counter-scroll",
  ...Object.keys(VERIFIED_TRANSITION_PREVIEW_BASES),
  ...Object.keys(VERIFIED_GRAPHIC_PREVIEW_BASES),
]);

function kitPresetToImplementation(preset: StartMotionPreset): MotionImplementationRecord {
  const kind = implementationKindForEngine(preset.engine);
  const isRemotion = preset.engine === "remotion";
  if (preset.id === "cut-hard-accent") {
    return {
      id: "impl-cut-hard-accent",
      patternId: "cut-hard-accent",
      kind: "PALMIER_NATIVE_EDIT",
      status: "PRODUCTION_READY",
      method: `Palmier Pro native timelineのハードカット。${preset.purpose}`,
      artifactType: "FCPXML",
      artifactPath: "/motion-previews/cut-hard-accent/palmier-actual-v1.fcpxml",
      installed: true,
      tested: true,
      resolveVersion: null,
      studioRequired: false,
      verified: true,
      notes: "Palmier Pro 0.7.6の実timelineで2本の動画をframe 63に直結し、素材音声をmute。115.4 BPMのUpbeat BGMをsource 0.02sから配置して第2 downbeat 2.12sをtimeline frame 63へ合わせた。1280x720 / 30fps / 120framesのH.264とFCPXMLを書き出し、ffprobe・FCPXML構造・cut前後pixel差分・目視QAを通過。デモstock素材のため本人素材での最終採用判断は別ゲート。",
    };
  }
  if (preset.id === "type-quiet-caption") {
    return {
      id: "impl-type-quiet-caption",
      patternId: "type-quiet-caption",
      kind: "DAVINCI_TEXT_PLUS",
      status: "PRODUCTION_READY",
      method: "DaVinci Resolve Text+を写真へMergeし、Blendだけをframe 0→11で0→1へ線形fade。位置・scale・trackingは静止保持する。",
      artifactType: "NONE",
      artifactPath: null,
      installed: true,
      tested: true,
      resolveVersion: "21.0.4.5",
      studioRequired: false,
      verified: true,
      notes: "専用Resolve projectで1280x720 / 24fps / 95framesを構築。Text+単体ではなくFusion Merge後のEXR 118framesをResolve Saverで実Renderし、その先頭95framesをH.264へ収録。ffprobe・SHA-256・frame 0/5/11/50/94 pixel oracle・通常速度目視QAを通過。位置/scale motionはなくBlendだけが0→1へ変化する。",
    };
  }
  if (preset.id === "photo-static-hero") {
    return {
      id: "impl-photo-static-hero",
      patternId: "photo-static-hero",
      kind: "DAVINCI_EDIT_NATIVE",
      status: "PRODUCTION_READY",
      method: "DaVinci Resolve Edit page native timeline。写真/動画クリップをそのままappendし、pan・zoom・keyframeを一切追加しない。",
      artifactType: "NONE",
      artifactPath: null,
      installed: true,
      tested: true,
      resolveVersion: "21.0.4.5",
      studioRequired: false,
      verified: true,
      notes: "専用Resolve project (MotionZukan_HeroStill_Actual_20260901_Claude) で1280x720 / 30fps timelineへrepo-stock-v1.mp4を120frame(4.0秒)appendしただけの状態でDeliverから実Render。Fusion/Text+/keyframeは未使用。ffprobeでh264 1280x720 30fps 4.032秒を確認済み。デモstock素材のため本人写真での最終採用判断は別ゲート。",
    };
  }
  if (preset.id === "cut-match-shape" || preset.id === "whip-source-matched") {
    const isMatchShape = preset.id === "cut-match-shape";
    return {
      id: `impl-${preset.id}`,
      patternId: preset.id,
      kind,
      status: "TESTED",
      method: isMatchShape
        ? "Pexels実動画2本の太陽中心が最も近づくフレームをnative cutで直結する。"
        : "Pexels実動画2本から、背景が同じ左方向へ流れる列車窓camera motion区間をnative cutで直結する。",
      artifactType: "NONE",
      artifactPath: null,
      installed: true,
      tested: true,
      resolveVersion: null,
      studioRequired: false,
      verified: true,
      notes: isMatchShape
        ? "1280x720 / 30fps / 90framesのsource-media Actual renderでframe 44→45を検証。太陽中心は(646,284)→(643,300)、cut差分49.91、同一shot内差分2.10/2.80で、crossfadeなしのshape matchを確認した。"
        : "1280x720 / 30fps / 24framesのsource-media Actual renderで、cut前後の水平shiftを-164px / -112pxと測定。両shotとも背景が左へ流れ、frame 11→12は補間なしで切り替わる。アプリ固有操作ではなく素材適合性のTESTED証拠。",
    };
  }
  if (preset.id === "type-word-punch") {
    return {
      id: "impl-type-word-punch",
      patternId: "type-word-punch",
      kind: "DAVINCI_TEXT_PLUS",
      status: "PRODUCTION_READY",
      method: "DaVinci Resolve Text+をFusion Mergeへ合成し、Blendだけを0→1→0で高速に往復させる単発パンチ。位置・scaleは固定。",
      artifactType: "NONE",
      artifactPath: null,
      installed: true,
      tested: true,
      resolveVersion: "21.0.4.5",
      studioRequired: false,
      verified: true,
      notes: "専用Resolve projectで1280x720 / 24fps timelineへFusion Saver(EXR)を直接render。Blend 0(frame0)→1(frame2)→1(frame8)→0(frame11)の単発パンチをffmpegでH.264化。frame0/2/11で無地/GO!表示/無地を目視確認済み。Deliverページのタイムラインrenderはこのproject構成でFusion効果を反映しない既知の不具合があったため、Fusion内蔵Saverでの直接renderに切り替えた。",
    };
  }
  const implementationTested = TESTED_REMOTION_IMPLEMENTATIONS.has(preset.id);
  return {
    id: `impl-${preset.id}`,
    patternId: preset.id,
    kind,
    status: implementationTested ? "TESTED" : preset.engine === "mixed" ? "DISCOVERED" : "AVAILABLE",
    method: isRemotion
      ? `motion-studio Motion Kit preset "${preset.id}"(共有engine: ${preset.sharedEngine})として実装済み。${preset.purpose}`
      : `${preset.engine}上の標準的な技法(共有engine: ${preset.sharedEngine})。${preset.purpose}`,
    artifactType: "NONE",
    artifactPath: null,
    installed: isRemotion,
    tested: implementationTested,
    resolveVersion: null,
    studioRequired: isRemotion ? false : true,
    verified: implementationTested,
    notes: implementationTested
      ? "1280x720 / 30fps / 120framesの永続Remotion renderを作成し、ffprobe・SHA-256・独立pixel oracleを通過。DaVinci実機検証および本人素材が必要な演出のcrop確認は別ゲート。"
      : "この図鑑カタログ化ではローカルRender/DaVinci実機検証を行っていない。TESTED/PRODUCTION_READYへは実機確認後にのみ昇格する。",
  };
}

// 2026-08-26に既存のStaRtMotionReelV1(motion-studio, renderableMotionPresetsの8件)を
// 実際にローカルRemotion renderし、対応するmotionPreviewEvidence.tsへ目視QA記録を追加した。
// この7件だけ、renderが実在すること(generatedAt/freshness)を反映する。
// evidence自体はmotionPreviewEvidence.tsが正本で、ここでは日付を重複させない。
const LOCAL_RENDER_VERIFIED_2026_08_26 = new Set([
  "type-word-punch",
  "photo-static-hero",
  "photo-small-push",
  "wipe-route-line",
  "flash-one-frame-soft",
  "accent-speed-lines",
  "accent-stamp-triplet",
  "type-char-stagger",
  "photo-directional-pan",
  "photo-2p5d-parallax",
  "photo-contact-sheet-snap",
  "photo-split-panel",
  "accent-panel-grid",
  "accent-halftone-burst",
  "accent-scribble-underline",
  "cut-hard-accent",
  "type-tracking-burst",
  "photo-slow-pull",
  "wipe-directional-shape",
  "accent-impact-frame",
  "type-baseline-hop",
  "type-frame-lock",
  "type-outline-fill",
  "color-field-release",
  "type-triplet",
  "type-vertical-wipe",
  "wipe-paper-edge",
  "type-type-on-rhythm",
  "type-counter-scroll",
  "photo-freeze-cutout",
  "accent-cel-shadow-sweep",
  "accent-micro-rgb-split",
]);

function kitPresetToPreview(preset: StartMotionPreset): MotionPreviewRecord {
  const isRemotion = preset.engine === "remotion";
  const locallyRendered = LOCAL_RENDER_VERIFIED_2026_08_26.has(preset.id);
  const repoPreviewVerified = preset.id in VERIFIED_REPO_PREVIEW_BASES;
  const repoPreviewBase = VERIFIED_REPO_PREVIEW_BASES[preset.id] ?? "";
  return {
    id: `preview-${preset.id}-concept`,
    patternId: preset.id,
    sourceType: repoPreviewVerified ? "REPO_GENERATED" : isRemotion ? "REPO_GENERATED" : "CONCEPT_ONLY",
    status: repoPreviewVerified ? "VERIFIED" : "CONCEPT",
    freshness: locallyRendered ? "CURRENT" : "NEEDS_RECHECK",
    assetPath: repoPreviewVerified ? `${repoPreviewBase}.mp4` : null,
    posterPath: repoPreviewVerified ? `${repoPreviewBase}-poster.png` : null,
    generatedBy: repoPreviewVerified
      ? `motion-studio ${preset.id} dedicated composition。永続Remotion render。`
      : locallyRendered
      ? `motion-studio renderable preset: ${preset.id} / StaRtMotionReelV1 (${preset.sharedEngine} engine)。2026-08-26にローカルRemotion renderで目視確認済み(evidenceはmotionPreviewEvidence.ts参照)。`
      : isRemotion
        ? `motion-studio Motion Kit preset: ${preset.id} (${preset.sharedEngine} engine)。この図鑑追加ではまだ動画を書き出していない。`
        : `${preset.engine}上の技法説明のみ。まだ動画assetは存在しない。`,
    generatedAt: repoPreviewVerified ? "2026-08-27T05:25:12Z" : locallyRendered ? "2026-08-26T01:36:19Z" : null,
    implementationId: `impl-${preset.id}`,
    sampleAssetSetId: sampleAssetSetIdForPreset(preset),
    resolveVersion: null,
    verified: repoPreviewVerified,
    notes: repoPreviewVerified
      ? preset.id === "type-quiet-caption"
        ? "quiet modeの永続Remotion代表previewとpixel oracleは検証済み。ただしcanonical実装はDaVinci EditのためImplementationは未検証のまま。"
        : preset.id in VERIFIED_REPRESENTATIVE_CUT_PREVIEW_BASES
          ? "永続Remotion代表previewと独立pixel oracleは検証済み。ただし実素材・Palmier timelineのActual確認ではないためImplementationは未検証のまま。"
        : "永続Remotion renderと独立pixel oracleで検証済み。本人写真・最終crop・DaVinci ActualのProduction Authorityではない。"
      : locallyRendered
      ? "ローカルRemotion renderで見た目を確認済みだが、実写真は未投入(DemoBackdrop placeholder)かつDaVinci Actualではないため、verified/statusはCONCEPTのまま据え置く。"
      : "Reuse Before Buildに基づき既存実装をカタログ化した段階。Actual Renderで見た目を確認するまでCONCEPT扱いを維持する。",
  };
}

const kitPatternsExcludingMaskSlide = startMotionPresets.filter((preset) => preset.id !== "type-mask-slide");

motionPatterns.push(...kitPatternsExcludingMaskSlide.map(kitPresetToPattern));
motionImplementations.push(...kitPatternsExcludingMaskSlide.map(kitPresetToImplementation));
motionPreviews.push({
  id: "preview-cut-hard-accent-palmier-actual",
  patternId: "cut-hard-accent",
  sourceType: "ACTUAL_PALMIER_RENDER",
  status: "VERIFIED",
  freshness: "CURRENT",
  assetPath: "/motion-previews/cut-hard-accent/palmier-actual-v1.mp4",
  posterPath: "/motion-previews/cut-hard-accent/palmier-actual-v1-poster.png",
  generatedBy: "Palmier Pro 0.7.6 native timeline / local MCP / H.264 export",
  generatedAt: "2026-08-28T11:12:00+09:00",
  implementationId: "impl-cut-hard-accent",
  sampleAssetSetId: "sample-generic-hero-photo-v1",
  resolveVersion: null,
  verified: true,
  notes: "実Palmier timelineのframe 63 native hard cut。115.4 BPMのUpbeat BGM第2 downbeatへ合わせ、素材音声はmute。デモstock素材でのImplementation Evidenceであり、本人素材の採用判断とは分離する。",
});
motionPreviews.push({
  id: "preview-type-quiet-caption-davinci-actual",
  patternId: "type-quiet-caption",
  sourceType: "ACTUAL_DAVINCI_RENDER",
  status: "VERIFIED",
  freshness: "CURRENT",
  assetPath: "/motion-previews/type-quiet-caption/davinci-actual-v1.mp4",
  posterPath: "/motion-previews/type-quiet-caption/davinci-actual-v1-poster.png",
  generatedBy: "DaVinci Resolve Free 21.0.4.5 / native Fusion Text+ + Merge / Saver EXR render",
  generatedAt: "2026-08-28T12:58:00+09:00",
  implementationId: "impl-type-quiet-caption",
  sampleAssetSetId: "sample-generic-typography-v1",
  resolveVersion: "21.0.4.5",
  verified: true,
  notes: "静止Text+を下寄せ(x=0.50 / Fusion bottom-origin y=0.22)し、Merge Blendだけをframe 0→11でfade。Resolve Fusion Saver出力を独立pixel oracleで開始非表示・途中opacity・着地・静止holdまで検証済み。",
});
motionPreviews.push({
  id: "preview-cut-match-shape-source-actual",
  patternId: "cut-match-shape",
  sourceType: "ACTUAL_SOURCE_MEDIA_RENDER",
  status: "VERIFIED",
  freshness: "CURRENT",
  assetPath: "/motion-previews/cut-match-shape/source-actual-v1.mp4",
  posterPath: "/motion-previews/cut-match-shape/source-actual-v1-poster.png",
  generatedBy: "ffmpeg deterministic source-media validation render / Pexels 31288104 + 4057958",
  generatedAt: "2026-08-28T23:40:00+09:00",
  implementationId: "impl-cut-match-shape",
  sampleAssetSetId: "sample-match-shape-source-v1",
  resolveVersion: null,
  verified: true,
  notes: "別々のPexels夕景動画をframe 45でnative cut。太陽中心の差を16.3px以内に保ち、前後shotの画は明確に異なる。本人素材の採用承認やProduction Authorityではない。",
});
motionPreviews.push({
  id: "preview-whip-source-matched-source-actual",
  patternId: "whip-source-matched",
  sourceType: "ACTUAL_SOURCE_MEDIA_RENDER",
  status: "VERIFIED",
  freshness: "CURRENT",
  assetPath: "/motion-previews/whip-source-matched/source-actual-v1.mp4",
  posterPath: "/motion-previews/whip-source-matched/source-actual-v1-poster.png",
  generatedBy: "ffmpeg deterministic source-media validation render / Pexels 19188177 + 6556837",
  generatedAt: "2026-08-28T23:40:00+09:00",
  implementationId: "impl-whip-source-matched",
  sampleAssetSetId: "sample-whip-source-v1",
  resolveVersion: null,
  verified: true,
  notes: "異なる列車窓動画の実camera motion区間をframe 12でnative cut。前後とも背景が左へ流れることをpixel shiftで確認した。本人素材の採用承認やProduction Authorityではない。",
});
motionPreviews.push({
  id: "preview-photo-static-hero-davinci-actual",
  patternId: "photo-static-hero",
  sourceType: "ACTUAL_DAVINCI_RENDER",
  status: "VERIFIED",
  freshness: "CURRENT",
  assetPath: "/motion-previews/photo-static-hero/davinci-actual-v1.mp4",
  posterPath: "/motion-previews/photo-static-hero/davinci-actual-v1-poster.png",
  generatedBy: "DaVinci Resolve Free 21.0.4.5 / native Edit page timeline (no Fusion/keyframes) / Deliver page render",
  generatedAt: "2026-09-01T15:30:00+09:00",
  implementationId: "impl-photo-static-hero",
  sampleAssetSetId: "sample-generic-hero-photo-v1",
  resolveVersion: "21.0.4.5",
  verified: true,
  notes: "repo-stock-v1.mp4を1280x720 / 30fps timelineへ120frame(4.0秒)appendしただけの静止Hero。pan/zoom/keyframeは一切追加していない。ffprobeでh264 1280x720 30/1 4.032秒を確認済み。デモstock素材のため本人写真での最終採用判断は別ゲート。",
});
motionPreviews.push({
  id: "preview-type-word-punch-davinci-actual",
  patternId: "type-word-punch",
  sourceType: "ACTUAL_DAVINCI_RENDER",
  status: "VERIFIED",
  freshness: "CURRENT",
  assetPath: "/motion-previews/type-word-punch/davinci-actual-v1.mp4",
  posterPath: "/motion-previews/type-word-punch/davinci-actual-v1-poster.png",
  generatedBy: "DaVinci Resolve Free 21.0.4.5 / native Fusion Text+ + Merge / Saver EXR render",
  generatedAt: "2026-09-01T15:50:00+09:00",
  implementationId: "impl-type-word-punch",
  sampleAssetSetId: "sample-generic-typography-v1",
  resolveVersion: "21.0.4.5",
  verified: true,
  notes: "GO!をBlend 0→1(frame2)→1(frame8)→0(frame11)で単発パンチ表示。位置・サイズは固定でBlendのみ動く。Resolve Fusion Saverの直接EXR出力をffmpegでH.264化し、frame0/2/11の目視で無地→パンチ→無地の切り替わりを確認済み。",
});
motionPreviews.push(...kitPatternsExcludingMaskSlide.map(kitPresetToPreview));

export function searchMotionPatterns(query: string) {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return motionPatterns;
  return motionPatterns.filter((pattern) => {
    const haystack = [
      pattern.id,
      ...pattern.legacyPresetIds,
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

export function resolveMotionPatternId(id: string): string | null {
  const normalized = id.trim().toLowerCase();
  const pattern = motionPatterns.find((candidate) =>
    candidate.id.toLowerCase() === normalized
    || candidate.legacyPresetIds.some((legacyId) => legacyId.toLowerCase() === normalized));
  return pattern?.id ?? null;
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
