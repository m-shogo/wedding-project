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
];

export function getMotionSampleAssetSet(id: string) {
  return motionSampleAssetSets.find((sample) => sample.id === id);
}
