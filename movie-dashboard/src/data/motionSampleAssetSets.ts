export type MotionSampleAssetSetStatus = "READY" | "LOCAL_MEDIA_REQUIRED" | "MISSING";

export interface MotionSampleAssetSet {
  id: string;
  category: "TYPOGRAPHY" | "HERO_PHOTO" | "MULTI_PHOTO" | "PROFILE";
  japaneseName: string;
  purpose: string;
  canonicalText: string[];
  renderSpec: {
    width: number;
    height: number;
    fps: number;
    durationSeconds: number;
    muted: true;
    loopTarget: true;
  };
  visualBase: {
    kind: "PROCEDURAL_NEUTRAL_BACKGROUND" | "LOCAL_ONLY_MEDIA";
    assetPath: string | null;
    description: string;
  };
  comparisonRules: string[];
  usedByPatternIds: string[];
  usedByPreviewIds: string[];
  status: MotionSampleAssetSetStatus;
}

/**
 * Shared samples exist so motion differences can be judged without photo/content differences.
 * Keep copyrighted music, private photos and paid assets out of Git.
 */
export const motionSampleAssetSets: MotionSampleAssetSet[] = [
  {
    id: "sample-typography-welcome-v1",
    category: "TYPOGRAPHY",
    japaneseName: "WELCOME 共通タイポグラフィ比較セット",
    purpose: "Mask RevealなどTypography Patternを、同じ文字・同じ画面条件で比較するための最小sample。",
    canonicalText: ["WELCOME"],
    renderSpec: {
      width: 1280,
      height: 720,
      fps: 30,
      durationSeconds: 4,
      muted: true,
      loopTarget: true,
    },
    visualBase: {
      kind: "PROCEDURAL_NEUTRAL_BACKGROUND",
      assetPath: null,
      description: "DaVinci内で作れるニュートラルな16:9背景。写真差ではなく文字の動きだけを比較する。",
    },
    comparisonRules: [
      "表示文字はWELCOMEで固定する",
      "1280x720 / 30fps / 4秒 / mutedで比較する",
      "背景はニュートラルにし、glow・particles・装飾で演出差を隠さない",
      "Pattern比較では文字サイズ・基本配置を可能な限り揃える",
      "Actual DaVinci Previewは同じsampleAssetSetIdを記録する",
    ],
    usedByPatternIds: ["type-mask-reveal"],
    usedByPreviewIds: ["preview-type-mask-reveal-repo-concept"],
    status: "READY",
  },
  {
    id: "sample-generic-typography-v1",
    category: "TYPOGRAPHY",
    japaneseName: "汎用タイポグラフィ比較セット(モーション図鑑v1)",
    purpose: "モーション図鑑v1でカタログ化したTypography系Motion Kit presetを、実render前でも同じ条件で説明するための共通sample。",
    canonicalText: ["SAMPLE"],
    renderSpec: {
      width: 1280,
      height: 720,
      fps: 30,
      durationSeconds: 4,
      muted: true,
      loopTarget: true,
    },
    visualBase: {
      kind: "PROCEDURAL_NEUTRAL_BACKGROUND",
      assetPath: null,
      description: "sample-typography-welcome-v1と同条件のニュートラル背景。既存sampleの内容は変更せず、図鑑v1追加分だけこの新sampleを参照する。",
    },
    comparisonRules: [
      "表示文字はSAMPLEで固定する",
      "1280x720 / 30fps / 4秒 / mutedで比較する",
      "実Renderを行うまではCONCEPT表記を外さない",
    ],
    usedByPatternIds: [],
    usedByPreviewIds: [],
    status: "LOCAL_MEDIA_REQUIRED",
  },
  {
    id: "sample-generic-hero-photo-v1",
    category: "HERO_PHOTO",
    japaneseName: "汎用Hero写真比較セット(モーション図鑑v1)",
    purpose: "モーション図鑑v1のPhoto/Transition/Graphic系Motion Kit presetを、単一の実写真差し替え条件で比較するための共通sample。",
    canonicalText: [],
    renderSpec: {
      width: 1280,
      height: 720,
      fps: 30,
      durationSeconds: 4,
      muted: true,
      loopTarget: true,
    },
    visualBase: {
      kind: "LOCAL_ONLY_MEDIA",
      assetPath: null,
      description: "実写真1枚(Git外)を差し替えて比較する。実写真が無い間はCONCEPT/未Renderのまま扱う。",
    },
    comparisonRules: [
      "同じ1枚のHero写真で比較する",
      "1280x720 / 30fps / 4秒 / mutedで比較する",
      "写真差ではなくMotionの差だけを見る",
    ],
    usedByPatternIds: [],
    usedByPreviewIds: [],
    status: "LOCAL_MEDIA_REQUIRED",
  },
  {
    id: "sample-generic-multi-photo-v1",
    category: "MULTI_PHOTO",
    japaneseName: "汎用複数写真比較セット(モーション図鑑v1)",
    purpose: "Contact Sheet / Split Panel / Panel Gridなど複数写真を同時に扱うMotion Kit presetを比較するための共通sample。",
    canonicalText: [],
    renderSpec: {
      width: 1280,
      height: 720,
      fps: 30,
      durationSeconds: 4,
      muted: true,
      loopTarget: true,
    },
    visualBase: {
      kind: "LOCAL_ONLY_MEDIA",
      assetPath: null,
      description: "実写真2〜3枚(Git外)を差し替えて比較する。実写真が無い間はCONCEPT/未Renderのまま扱う。",
    },
    comparisonRules: [
      "同じ2〜3枚の写真セットで比較する",
      "1280x720 / 30fps / 4秒 / mutedで比較する",
      "写真の組み合わせではなくレイアウト演出の差だけを見る",
    ],
    usedByPatternIds: [],
    usedByPreviewIds: [],
    status: "LOCAL_MEDIA_REQUIRED",
  },
];

export function getMotionSampleAssetSet(id: string) {
  return motionSampleAssetSets.find((sample) => sample.id === id);
}
