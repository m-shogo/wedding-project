import type {TypographyProductionPatternId} from "./typographySceneProductionRouting";

export type TypographyMotionEnergy = "CALM" | "BALANCED" | "ENERGETIC";

export interface TypographyProductionRouteGuide {
  patternId: TypographyProductionPatternId;
  labelJa: string;
  motionSignatureJa: string;
  bestForJa: string;
  avoidWhenJa: string;
  energy: TypographyMotionEnergy;
  rhythm: "CONTINUOUS" | "STAGGERED" | "HIT_BASED";
}

export const typographyProductionRouteGuides: Record<TypographyProductionPatternId, TypographyProductionRouteGuide> = {
  "type-mask-reveal": {
    patternId: "type-mask-reveal",
    labelJa: "マスク・リビール",
    motionSignatureJa: "文字を面で隠し、滑らかに露出させる。写真やタイトルを邪魔しにくい。",
    bestForJa: "章タイトル / 場所名 / 落ち着いた導入",
    avoidWhenJa: "一語を強く打ち出したい瞬間",
    energy: "CALM",
    rhythm: "CONTINUOUS",
  },
  "type-char-stagger": {
    patternId: "type-char-stagger",
    labelJa: "文字ずらし",
    motionSignatureJa: "文字単位で少しずつ時間差をつけて出す。軽快だが読みやすさを保ちやすい。",
    bestForJa: "名前 / 短い見出し / テンポのある紹介",
    avoidWhenJa: "長文や一瞬しか表示しない字幕",
    energy: "BALANCED",
    rhythm: "STAGGERED",
  },
  "type-type-on-rhythm": {
    patternId: "type-type-on-rhythm",
    labelJa: "語ごとリズム表示",
    motionSignatureJa: "単語単位でリズムに合わせて現れる。歌やBGMの拍に同期させやすい。",
    bestForJa: "短いコピー / 歌詞ではないメッセージ / ビート同期",
    avoidWhenJa: "一定速度で静かに読ませたい文章",
    energy: "BALANCED",
    rhythm: "STAGGERED",
  },
  "type-word-punch": {
    patternId: "type-word-punch",
    labelJa: "ワード・パンチ",
    motionSignatureJa: "一語を瞬間的に拡大・着地させ、視線を強制的に集める。",
    bestForJa: "重要語 / 年号 / COUNTDOWN / 一発の強調",
    avoidWhenJa: "連続使用や上品で静かな場面",
    energy: "ENERGETIC",
    rhythm: "HIT_BASED",
  },
  "type-tracking-burst": {
    patternId: "type-tracking-burst",
    labelJa: "字間バースト",
    motionSignatureJa: "広い字間から締まり、空気感を作ってから文字を定着させる。",
    bestForJa: "英字タイトル / 都市名 / 映画的な章見出し",
    avoidWhenJa: "日本語長文や狭いレイアウト",
    energy: "CALM",
    rhythm: "CONTINUOUS",
  },
  "type-vertical-wipe": {
    patternId: "type-vertical-wipe",
    labelJa: "縦ワイプ",
    motionSignatureJa: "上下方向のマスクで文字を切り替える。画面転換と組み合わせやすい。",
    bestForJa: "場面転換 / 行先表示 / 写真切替の見出し",
    avoidWhenJa: "柔らかな感情表現を主役にしたい場面",
    energy: "BALANCED",
    rhythm: "CONTINUOUS",
  },
  "type-outline-fill": {
    patternId: "type-outline-fill",
    labelJa: "輪郭→塗り",
    motionSignatureJa: "輪郭線から塗り文字へ変化し、タイトルを上品に完成させる。",
    bestForJa: "映画風タイトル / セクション開始 / 大きな英字",
    avoidWhenJa: "小さい本文や高速カット",
    energy: "CALM",
    rhythm: "CONTINUOUS",
  },
  "type-baseline-hop": {
    patternId: "type-baseline-hop",
    labelJa: "ベースライン・ホップ",
    motionSignatureJa: "文字が軽く跳ねて着地する。可愛さと親しみを少量足せる。",
    bestForJa: "楽しいプロフィール / 小見出し / 軽いツッコミ",
    avoidWhenJa: "厳粛な挨拶や感動の余韻",
    energy: "BALANCED",
    rhythm: "HIT_BASED",
  },
  "type-triplet": {
    patternId: "type-triplet",
    labelJa: "3ヒット・パルス",
    motionSignatureJa: "3回の明確なパルスで視線を集める。音の3連打や決めカットに向く。",
    bestForJa: "3カウント / 決め台詞 / テンポの強い転換",
    avoidWhenJa: "長い文章や静かな写真を見せたい場面",
    energy: "ENERGETIC",
    rhythm: "HIT_BASED",
  },
};

export const getTypographyProductionRouteGuide = (patternId: TypographyProductionPatternId) =>
  typographyProductionRouteGuides[patternId];
