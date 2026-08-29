export type MotionSampleAssetSetStatus = "READY" | "LOCAL_MEDIA_REQUIRED" | "MISSING";

export interface MotionSampleAssetSet {
  id: string;
  category: "TYPOGRAPHY" | "HERO_PHOTO" | "MULTI_PHOTO" | "PROFILE" | "SOURCE_VIDEO";
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
    kind: "PROCEDURAL_NEUTRAL_BACKGROUND" | "LOCAL_ONLY_MEDIA" | "LICENSED_STOCK_DEMO";
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
 * Private photos and paid assets stay out of Git. Licensed stock demos may be stored with source, license and hash metadata.
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
    usedByPreviewIds: ["preview-type-mask-reveal-davinci-actual", "preview-type-mask-reveal-repo-concept"],
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
      kind: "LICENSED_STOCK_DEMO",
      assetPath: "/demo-assets/stock-photos/pexels-17630524-1280x720.jpg",
      description: "Pexelsのライセンス済みストック1枚で演出を比較する。本人素材ではないため、最終納品前には実写真へ差し替える。",
    },
    comparisonRules: [
      "同じ1枚のHero写真で比較する",
      "1280x720 / 30fps / 4秒 / mutedで比較する",
      "写真差ではなくMotionの差だけを見る",
    ],
    usedByPatternIds: [],
    usedByPreviewIds: [],
    status: "READY",
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
      kind: "LICENSED_STOCK_DEMO",
      assetPath: "/demo-assets/stock-photos/pexels-18858568-1280x720.jpg",
      description: "カタログ登録済みPexelsストック2〜3枚で比較する。本人・家族素材ではなく、最終納品用の素材承認を意味しない。",
    },
    comparisonRules: [
      "同じ2〜3枚の写真セットで比較する",
      "1280x720 / 30fps / 4秒 / mutedで比較する",
      "写真の組み合わせではなくレイアウト演出の差だけを見る",
    ],
    usedByPatternIds: [],
    usedByPreviewIds: [],
    status: "READY",
  },
  {
    id: "sample-match-shape-source-v1",
    category: "SOURCE_VIDEO",
    japaneseName: "太陽Shape Match実動画セット",
    purpose: "実動画2本の主形状をnative cutで連続して見せられるか検証する。",
    canonicalText: [],
    renderSpec: { width: 1280, height: 720, fps: 30, durationSeconds: 3, muted: true, loopTarget: true },
    visualBase: {
      kind: "LICENSED_STOCK_DEMO",
      assetPath: "/motion-previews/cut-match-shape/source-actual-v1.mp4",
      description: "Pexels 31288104 / 4057958の太陽中心を合わせたsource-media Actual。本人素材ではない。",
    },
    comparisonRules: ["太陽中心差を20px以内にする", "crossfadeを使わずnative cutだけで接続する", "2本のsource hashと出所を記録する"],
    usedByPatternIds: ["cut-match-shape"],
    usedByPreviewIds: ["preview-cut-match-shape-source-actual"],
    status: "READY",
  },
  {
    id: "sample-whip-source-v1",
    category: "SOURCE_VIDEO",
    japaneseName: "同方向列車窓Whip実動画セット",
    purpose: "異なる実動画2本のcamera motionがcutをまたいで同方向へ続くか検証する。",
    canonicalText: [],
    renderSpec: { width: 1280, height: 720, fps: 30, durationSeconds: 0.8, muted: true, loopTarget: true },
    visualBase: {
      kind: "LICENSED_STOCK_DEMO",
      assetPath: "/motion-previews/whip-source-matched/source-actual-v1.mp4",
      description: "Pexels 19188177 / 6556837の列車窓camera motionを接続したsource-media Actual。本人素材ではない。",
    },
    comparisonRules: ["前後shotの水平shift符号を一致させる", "方向反転・crossfadeを使わない", "2本のsource hashと出所を記録する"],
    usedByPatternIds: ["whip-source-matched"],
    usedByPreviewIds: ["preview-whip-source-matched-source-actual"],
    status: "READY",
  },
];

export function getMotionSampleAssetSet(id: string) {
  return motionSampleAssetSets.find((sample) => sample.id === id);
}
