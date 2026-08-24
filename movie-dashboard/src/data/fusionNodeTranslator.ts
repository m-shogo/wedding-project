export type FusionNodeId =
  | "media-in"
  | "transform"
  | "text-plus"
  | "background"
  | "mask"
  | "merge"
  | "blur"
  | "media-out";

export interface FusionNodeLesson {
  nodeId: FusionNodeId;
  nodeName: string;
  plainName: string;
  role: string;
  input: string;
  output: string;
  whenToUse: string;
  commonMistake: string;
}

export interface FusionRecipeStep {
  nodeId: FusionNodeId;
  note: string;
}

export interface FusionLearningRecipe {
  recipeId: string;
  title: string;
  goal: string;
  useFusion: boolean;
  editAlternative: string;
  steps: FusionRecipeStep[];
  why: string;
  weddingUse: string;
  avoid: string[];
}

export const fusionNodeLessons: FusionNodeLesson[] = [
  {
    nodeId: "media-in",
    nodeName: "MediaIn",
    plainName: "元映像",
    role: "TimelineからFusionへ入ってきた写真・動画の入口。",
    input: "Timeline clip",
    output: "画像信号",
    whenToUse: "既存clipをFusionで加工するときの出発点。",
    commonMistake: "MediaIn自体を『素材置き場』のように増やし、どの映像が正本か分からなくする。",
  },
  {
    nodeId: "transform",
    nodeName: "Transform",
    plainName: "大きさ・位置・回転",
    role: "画像信号のScale / Position / Rotationを変える。",
    input: "画像",
    output: "変形後の画像",
    whenToUse: "Node途中で位置や大きさを変える必要があるとき。",
    commonMistake: "Inspector Transformで十分な処理までFusionへ持ち込む。",
  },
  {
    nodeId: "text-plus",
    nodeName: "Text+",
    plainName: "文字",
    role: "Fusion内で文字レイヤーを生成する。",
    input: "文字設定",
    output: "透明背景つき文字画像",
    whenToUse: "MaskやMergeなどNode処理と文字を組み合わせる必要があるとき。",
    commonMistake: "普通の名前・日付・Captionまで全部Text+にして編集を複雑にする。",
  },
  {
    nodeId: "background",
    nodeName: "Background",
    plainName: "色・面",
    role: "単色や透明度を持つ面を生成する。",
    input: "Color / Alpha",
    output: "面画像",
    whenToUse: "帯・背景・Maskと組み合わせるベースが必要なとき。",
    commonMistake: "意味のない装飾面を増やして写真よりデザインを強くする。",
  },
  {
    nodeId: "mask",
    nodeName: "Rectangle / Ellipse Mask",
    plainName: "見せる範囲",
    role: "Nodeの効果が効く領域を限定する。",
    input: "形・位置",
    output: "白黒の範囲情報",
    whenToUse: "文字Reveal、部分Blur、写真の一部分だけを処理するとき。",
    commonMistake: "MaskをCropの代わりに使い、単純な構図調整を複雑化する。",
  },
  {
    nodeId: "merge",
    nodeName: "Merge",
    plainName: "重ねる",
    role: "BackgroundとForegroundを1枚へ合成する。",
    input: "BG + FG + optional Mask",
    output: "合成画像",
    whenToUse: "写真の上へText+やGraphicを重ねるなど、複数信号を合流させるとき。",
    commonMistake: "Foreground / Backgroundを逆につなぎ、なぜ見えないか分からなくなる。",
  },
  {
    nodeId: "blur",
    nodeName: "Blur",
    plainName: "ぼかす",
    role: "画像信号をぼかす。Maskで範囲を限定できる。",
    input: "画像 + optional Mask",
    output: "ぼかし後の画像",
    whenToUse: "背景の情報量を部分的に落とすなど、明確な視線誘導が必要なとき。",
    commonMistake: "雰囲気作りのために全体へBlur / Glowを足す。",
  },
  {
    nodeId: "media-out",
    nodeName: "MediaOut",
    plainName: "完成映像",
    role: "Fusionで処理した結果をTimelineへ返す出口。",
    input: "最終画像信号",
    output: "Timeline result",
    whenToUse: "Fusion Compositionの最終出口。",
    commonMistake: "途中NodeをMediaOutへつなぎ、後段の処理が画面に反映されない。",
  },
];

export const fusionLearningRecipes: FusionLearningRecipe[] = [
  {
    recipeId: "fusion-edit-first",
    title: "普通の写真 + Caption",
    goal: "実写真の上へ短いCaptionを置く。",
    useFusion: false,
    editAlternative: "V1=Photo / V2=Text。Edit pageのTrackとInspectorで十分。",
    steps: [
      { nodeId: "media-in", note: "Fusionへ入れずTimelineの写真をそのまま使う。" },
      { nodeId: "media-out", note: "Fusion Compositionを作らない判断が正解。" },
    ],
    why: "差し替え頻度が高い写真・CaptionはTimeline上で独立している方が速く、安全に直せる。",
    weddingUse: "Profileの生い立ち写真、OpeningのLocation title。",
    avoid: ["全部Fusion化", "名前変更のたびにNode Graphを開く", "Text+を使うこと自体を上達だと思う"],
  },
  {
    recipeId: "fusion-transform-flow",
    title: "Fusionの最小データフローを理解する",
    goal: "Nodeが左から右へ画像信号を渡す感覚を掴む。",
    useFusion: true,
    editAlternative: "実制作ではInspector Transformで済む場合が多い。ここではNode理解の練習として使う。",
    steps: [
      { nodeId: "media-in", note: "元写真が入る。" },
      { nodeId: "transform", note: "Scale / Positionを小さく変える。" },
      { nodeId: "media-out", note: "変形後の結果をTimelineへ返す。" },
    ],
    why: "Node名を暗記する前に『画像 → 処理 → 結果』という一方向の信号を理解すると、Graphを読めるようになる。",
    weddingUse: "Fusionを使う必要が出たときの基礎練習。",
    avoid: ["最初から10Node作る", "何も見えない時にNodeを追加する", "EditとFusionのTransformを同時に触って原因不明にする"],
  },
  {
    recipeId: "fusion-text-merge",
    title: "写真 + Text+をMergeする",
    goal: "Background / Foregroundの意味を理解して文字を合成する。",
    useFusion: true,
    editAlternative: "単純な文字置きならEdit pageのTextを優先。Mask連携などが必要ならFusion。",
    steps: [
      { nodeId: "media-in", note: "写真をMergeのBackgroundへ。" },
      { nodeId: "text-plus", note: "文字を生成してMergeのForegroundへ。" },
      { nodeId: "merge", note: "写真 + 文字を合流。" },
      { nodeId: "media-out", note: "合成結果をTimelineへ。" },
    ],
    why: "Mergeは『処理』ではなく『2本の画像信号を1本へ戻す場所』と理解すると配線を読みやすい。",
    weddingUse: "MaskやNode Animationを伴う特殊Titleが本当に必要な場合だけ。",
    avoid: ["全CaptionをFusionへ移す", "MergeのBG/FGを意味なく入れ替える", "写真より文字Animationを目立たせる"],
  },
  {
    recipeId: "fusion-masked-reveal",
    title: "Mask付きText Reveal",
    goal: "Maskは画像ではなく『効果範囲』だと理解する。",
    useFusion: true,
    editAlternative: "普通のFade / Cutで成立するならそちらを使う。RevealがStory上必要な時だけ採用。",
    steps: [
      { nodeId: "media-in", note: "写真をBackgroundとして保持。" },
      { nodeId: "text-plus", note: "表示したい文字を作る。" },
      { nodeId: "mask", note: "文字の見える範囲を限定し、必要なら位置をAnimation。" },
      { nodeId: "merge", note: "写真とMaskされた文字を合成。" },
      { nodeId: "media-out", note: "最終結果をTimelineへ。" },
    ],
    why: "Maskを『切り抜き画像』ではなくNodeへ渡す範囲情報として理解する練習になる。",
    weddingUse: "Arrival graphicなど、情報が現れること自体に意味がある短い演出候補。",
    avoid: ["章ごとにReveal", "派手なEase / Glow追加", "普通のHard Cutより弱いのにFusionだから採用"],
  },
];

export const fusionDecisionRules = [
  {
    label: "Editで十分",
    examples: "Cut / Trim / Caption / basic Transform / simple Fade",
    rule: "Timelineで意味が分かり、差し替えやすいならFusionへ行かない。",
  },
  {
    label: "Fusion候補",
    examples: "Mask連携 / 複数画像のNode合成 / 特殊なText+処理 / procedural animation",
    rule: "Nodeで処理する理由を1文で説明できる時だけ使う。",
  },
  {
    label: "Wedding判断",
    examples: "実写真・実動画が主役",
    rule: "Fusionで派手にするのではなく、写真・Story・情報を伝えるための補助として使う。",
  },
];
