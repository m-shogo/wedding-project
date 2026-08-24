export type ComparisonDimensionId =
  | "timing"
  | "crop"
  | "motion"
  | "typography"
  | "color"
  | "audio"
  | "story";

export interface ComparisonDimension {
  dimensionId: ComparisonDimensionId;
  label: string;
  question: string;
  decisionRule: string;
  skillIds: string[];
}

export interface ComparisonProtocol {
  protocolId: string;
  title: string;
  outcomeId: string;
  dimensionId: ComparisonDimensionId;
  versionA: string;
  versionB: string;
  compare: string[];
  preferWhen: string;
  avoid: string;
}

export const comparisonDimensions: ComparisonDimension[] = [
  {
    dimensionId: "timing",
    label: "Timing / Rhythm",
    question: "どちらが写真を読めて、BGMとStoryの両方に自然か？",
    decisionRule: "Beat一致より、内容を受け取れる時間を優先する。",
    skillIds: ["concept-rhythm", "davinci-trim", "davinci-marker"],
  },
  {
    dimensionId: "crop",
    label: "Crop / Framing",
    question: "どちらが人物・場所・関係性を失わず、最初に見てほしい場所へ視線が行くか？",
    decisionRule: "画面を埋めるより、写真の意味を残す。",
    skillIds: ["concept-framing", "davinci-transform"],
  },
  {
    dimensionId: "motion",
    label: "Motion",
    question: "動きが写真を強くしているか。それともmotion自体が先に見えるか？",
    decisionRule: "Staticで成立するならStaticを基準にする。",
    skillIds: ["concept-stillness", "davinci-keyframe", "davinci-easing"],
  },
  {
    dimensionId: "typography",
    label: "Typography / Caption",
    question: "止めずに読めて、写真と文字のどちらを先に見るか明確か？",
    decisionRule: "読めない時は小さくするより、情報を削る。",
    skillIds: ["concept-typography", "concept-caption-economy", "davinci-text"],
  },
  {
    dimensionId: "color",
    label: "Color",
    question: "単体で派手かではなく、前後shotへ切り替えた時に自然なのはどちらか？",
    decisionRule: "場所の個性は残し、違和感になるWB/Exposure/Contrast差だけ減らす。",
    skillIds: ["concept-color-consistency", "davinci-color-balance"],
  },
  {
    dimensionId: "audio",
    label: "Audio",
    question: "映像の切れ目を意識させず、Storyの転換や余韻を自然に支えるのはどちらか？",
    decisionRule: "技法を使うより、音処理自体が意識されない方を優先する。",
    skillIds: ["concept-audio-continuity", "davinci-audio-fade", "davinci-jl-cut"],
  },
  {
    dimensionId: "story",
    label: "Story / Meaning",
    question: "どちらが『このshot/章がなぜ必要か』を明確にし、重複を減らせるか？",
    decisionRule: "Effectの量ではなく、前後関係と役割で決める。",
    skillIds: ["concept-continuity", "concept-narrative-arc", "concept-longform-pacing", "concept-photo-sequencing"],
  },
];

export const comparisonProtocols: ComparisonProtocol[] = [
  {
    protocolId: "compare-hero-static-push",
    title: "Hero A: Static vs Small Push",
    outcomeId: "opening-v1-hero-a",
    dimensionId: "motion",
    versionA: "Static",
    versionB: "Zoom 1.00 → 1.03〜1.05 + easing",
    compare: ["写真そのものの強さ", "motionが先に見えないか", "9秒の間が持つか"],
    preferWhen: "Pushで視線や感情が明確に強くなる時だけB。差が小さければA。",
    avoid: "静止画だからという理由だけでBを選ぶ。",
  },
  {
    protocolId: "compare-seoul-cut",
    title: "Seoul: Hard Cut vs Dissolve",
    outcomeId: "opening-v1-seoul",
    dimensionId: "timing",
    versionA: "Hard Cut",
    versionB: "Cross Dissolve",
    compare: ["11秒のテンポ", "写真同士のつながり", "Transitionが目立たないか"],
    preferWhen: "時間経過や余韻を重ねる明確な理由が無ければA。",
    avoid: "Cutが粗く見える不安をDissolveで隠す。",
  },
  {
    protocolId: "compare-cold-open-copy",
    title: "Cold Open: 情報全部 vs 必要情報だけ",
    outcomeId: "opening-v1-cold-open",
    dimensionId: "typography",
    versionA: "名前 + 日付/場所 + 装飾コピー",
    versionB: "主情報 + 補足1行",
    compare: ["2秒で読めるか", "Hero写真を邪魔しないか", "読む順番が自然か"],
    preferWhen: "2秒で止めずに読め、Hero写真が主役のままならB。",
    avoid: "情報を残すためfont sizeだけ下げる。",
  },
  {
    protocolId: "compare-hawaii-color",
    title: "Hawaii: Original vs Basic Balance",
    outcomeId: "opening-v1-hawaii",
    dimensionId: "color",
    versionA: "Original",
    versionB: "WB → Exposure → Contrast →必要ならSaturation",
    compare: ["3写真の切替違和感", "肌の自然さ", "旅行先の空気感が残るか"],
    preferWhen: "Bで差が減り、補正自体は目立たない時。Originalが自然ならAを残す。",
    avoid: "Hawaii感のため彩度を上げてBを派手にする。",
  },
  {
    protocolId: "compare-profile-meeting-audio",
    title: "Profile出会い: 同時Cut vs Audio-led",
    outcomeId: "profile-meeting-turn",
    dimensionId: "audio",
    versionA: "画と音を同時Hard Cut",
    versionB: "次フレーズを少し先行 / 必要ならJ-cut",
    compare: ["ここからふたりと感じる瞬間", "Transitionなしで成立するか", "音処理が目立たないか"],
    preferWhen: "BでStory転換が自然に先に感じられる時。意味が増えなければA。",
    avoid: "J-cutを使ったこと自体を上達扱いする。",
  },
  {
    protocolId: "compare-profile-caption",
    title: "Profile Caption: 説明文 vs 写真にない情報",
    outcomeId: "profile-groom-arc",
    dimensionId: "typography",
    versionA: "写真に写っていることまで説明する長文",
    versionB: "写真だけでは分からない情報だけ短く追加",
    compare: ["実時間で読めるか", "写真を見る時間が残るか", "人柄やStoryが増えるか"],
    preferWhen: "Bで情報量は減ってもStory理解が落ちず、写真を見られる時間が増える時。",
    avoid: "文章を残したまま小さい文字にする。",
  },
];

export const comparisonPrinciples = [
  "同じshot・同じ時間・同じBGMで1要素だけ変える。",
  "A/Bを同時に改善し続けず、何を比較しているか固定する。",
  "派手・滑らか・Cinematicという形容詞だけで勝者を決めない。",
  "採用理由を1文で残し、Reviewで問題が出たら再比較する。",
  "Tieも正しい判断。差が分からないなら単純な方を残す。",
];
