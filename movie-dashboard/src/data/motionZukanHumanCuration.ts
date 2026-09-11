export type MotionZukanDifficulty = "かんたん" | "ふつう" | "少し難しい";
export type MotionZukanDavinciRoute = "EDIT" | "FUSION" | "TEXT_PLUS_FUSION" | "SOURCE_AWARE";

export interface MotionZukanExternalReference {
  title: string;
  url: string;
  sourceKind: "OFFICIAL" | "TUTORIAL" | "EXAMPLE";
  note: string;
}

export interface MotionZukanHumanCuration {
  patternId: string;
  sRank: boolean;
  score: 4 | 5;
  difficulty: MotionZukanDifficulty;
  bestFor: string;
  selectionCue: string;
  avoidWhen: string;
  whyForWeddingOpening: string;
  davinciRoute: MotionZukanDavinciRoute;
  davinciHumanLabel: string;
  externalReferences: readonly MotionZukanExternalReference[];
}

/**
 * Human-first curation for the 2026-10-24 wedding Opening.
 *
 * This is NOT a generic popularity ranking. `sRank` means ChatGPT/editorial pick for the
 * current StaRt Extended + documentary / travel film / editorial film direction.
 * Keep the S set intentionally small.
 *
 * External references are learning / visual references only. They are not production
 * authority and must not be presented as an Actual render of this repository.
 */
export const motionZukanHumanCuration: readonly MotionZukanHumanCuration[] = [
  {
    patternId: "type-mask-reveal",
    sRank: true,
    score: 5,
    difficulty: "ふつう",
    bestFor: "冒頭タイトル・名前・地名",
    selectionCue: "写真を主役にしたまま、文字だけ少し映像的に見せたい時。",
    avoidWhen: "長文を読ませたい場面や、文字を静かに置くだけで十分な場面。",
    whyForWeddingOpening: "実写真を主役のまま残しつつ、旅行映画っぽいタイトル感だけを足せる。StaRtの文字アクセントにも合わせやすい。",
    davinciRoute: "TEXT_PLUS_FUSION",
    davinciHumanLabel: "Text+ / Fusion向き。マスクを動かして文字や写真を見せる演出。",
    externalReferences: [
      {
        title: "Blackmagic Design — Fusion",
        url: "https://www.blackmagicdesign.com/jp/products/davinciresolve/fusion",
        sourceKind: "OFFICIAL",
        note: "Mask / Merge / Keyframe / Spline / custom templateの公式説明。",
      },
      {
        title: "EASY Text Reveal in DaVinci Resolve",
        url: "https://benonistudio.com/easy-text-reveal-in-davinci-resolve-color-page-or-fusion/",
        sourceKind: "TUTORIAL",
        note: "Polygon maskをキーフレームで動かすText Revealの実例。",
      },
    ],
  },
  {
    patternId: "cut-match-shape",
    sRank: true,
    score: 5,
    difficulty: "少し難しい",
    bestFor: "旅行先の切替・写真→動画・場所ジャンプ",
    selectionCue: "沖縄→韓国→ハワイのように、別の場所を“つながって見える旅”として見せたい時。",
    avoidWhen: "似た形・構図の素材が無い時。無理に合わせると素材選びが演出に負ける。",
    whyForWeddingOpening: "似た形や位置をつないで場面転換でき、旅の記録が一本につながって見える。テンプレ感を出さずに印象を残せる。",
    davinciRoute: "SOURCE_AWARE",
    davinciHumanLabel: "素材選びが主役。Editで位置・Scaleを合わせ、必要な時だけFusionで補助。",
    externalReferences: [
      {
        title: "Match shape cut video effect",
        url: "https://www.youtube.com/watch?v=vIJpyi7YB3o",
        sourceKind: "EXAMPLE",
        note: "同じ形を基準にショットをつなぐ見た目の参考。DaVinci固有手順ではない。",
      },
      {
        title: "Matchizo — Match Cuts for Fusion",
        url: "https://clipizo.com/matchizo",
        sourceKind: "TUTORIAL",
        note: "複数画像のmatch cutとcamera transformを扱うDaVinci/Fusion例。外部Fuseなので導入前に利用条件を確認する。",
      },
    ],
  },
  {
    patternId: "photo-small-push",
    sRank: true,
    score: 5,
    difficulty: "かんたん",
    bestFor: "思い出写真・人物写真・余韻",
    selectionCue: "写真そのものをちゃんと見せたいが、完全な静止画にはしたくない時。迷ったら最初に試す基本候補。",
    avoidWhen: "短いカットを高速で畳みかける場面や、すでに被写体の動きが強い動画。",
    whyForWeddingOpening: "写真そのものを見せたい今回のOpeningと最も相性がいい基本動作。派手さを足さず、静止画を自然に映像へできる。",
    davinciRoute: "EDIT",
    davinciHumanLabel: "Editで作りやすい。InspectorのZoom/PositionまたはDynamic Zoomで十分。",
    externalReferences: [
      {
        title: "DaVinci Resolve Quick Tip: Dynamic Zoom",
        url: "https://www.jasonyadlovski.com/blog/2026/2/24/davinci-resolve-20-quick-tip-instant-motion-with-dynamic-zoom-",
        sourceKind: "TUTORIAL",
        note: "Dynamic Zoomによるpush-in / pull-backの短い実例。",
      },
      {
        title: "Blackmagic Design — DaVinci Resolve Training",
        url: "https://www.blackmagicdesign.com/jp/products/davinciresolve/training",
        sourceKind: "OFFICIAL",
        note: "Edit / Fusionを含む公式トレーニング入口。",
      },
    ],
  },
  {
    patternId: "photo-directional-pan",
    sRank: true,
    score: 4,
    difficulty: "かんたん",
    bestFor: "横長写真・視線誘導・移動感",
    selectionCue: "横長写真の中を見せたい順番がある時や、次の場所へ進む感覚を少し足したい時。",
    avoidWhen: "顔のアップや主役が中央に固定されている写真。動かす理由が無い写真には使わない。",
    whyForWeddingOpening: "写真の中の視線や移動方向を利用でき、旅行テーマの『次へ進む感じ』を自然に出せる。使いすぎない前提で強い。",
    davinciRoute: "EDIT",
    davinciHumanLabel: "Editで作りやすい。Positionを少量だけ動かし、写真の主役を追う。",
    externalReferences: [
      {
        title: "Dynamic Zoom and Pan — DaVinci Resolve Tutorial",
        url: "https://sharingyourpassion.com/dynamic-zoom-and-pan-davinci-resolve-tutorial/",
        sourceKind: "TUTORIAL",
        note: "写真のDynamic ZoomとPanの見た目・操作例。",
      },
      {
        title: "Blackmagic Design — Fusion",
        url: "https://www.blackmagicdesign.com/jp/products/davinciresolve/fusion",
        sourceKind: "OFFICIAL",
        note: "より複雑な動きが必要な場合のKeyframe / Spline公式説明。",
      },
    ],
  },
] as const;

export function getMotionZukanHumanCuration(patternId: string) {
  return motionZukanHumanCuration.find((item) => item.patternId === patternId) ?? null;
}

export function getMotionZukanSPicks() {
  return motionZukanHumanCuration.filter((item) => item.sRank);
}
