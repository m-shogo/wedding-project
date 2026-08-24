export type ReferenceTechniqueId =
  | "scale"
  | "position"
  | "crop"
  | "mask"
  | "blur"
  | "opacity"
  | "ease"
  | "timing"
  | "text"
  | "color"
  | "audio-lead";

export type ReferenceImplementation = "Edit" | "Fusion" | "Color" | "Fairlight" | "Either";

export interface ReferenceTechnique {
  techniqueId: ReferenceTechniqueId;
  label: string;
  observe: string;
  implementation: ReferenceImplementation;
  editPath: string;
  fusionPath: string | null;
  skillIds: string[];
  decisionRule: string;
  avoid: string;
}

export interface ReferenceBreakdownExample {
  exampleId: string;
  title: string;
  observation: string;
  techniqueIds: ReferenceTechniqueId[];
  estimatedFrames: string;
  recommendedImplementation: ReferenceImplementation;
  weddingUse: string;
  why: string;
}

export const referenceTechniques: ReferenceTechnique[] = [
  {
    techniqueId: "scale",
    label: "Scale / Zoom",
    observe: "画角が少しずつ寄る・引く。何%動いたかより、開始と終了で視線がどう変わるかを見る。",
    implementation: "Edit",
    editPath: "Edit → Inspector → Transform → Zoom + Keyframe",
    fusionPath: "Fusion → Transform → Size",
    skillIds: ["davinci-transform", "davinci-keyframe", "concept-stillness"],
    decisionRule: "写真1枚の小さなpushならEdit。複数node連携が必要な時だけFusion。",
    avoid: "見た目が映画っぽいからという理由だけで全写真へzoomを付ける。",
  },
  {
    techniqueId: "position",
    label: "Position / Pan",
    observe: "被写体が画面内を動くのか、カメラ視点だけが動くのかを分けて見る。",
    implementation: "Edit",
    editPath: "Edit → Inspector → Position + Keyframe",
    fusionPath: "Fusion → Transform → Center",
    skillIds: ["davinci-transform", "davinci-keyframe", "concept-framing"],
    decisionRule: "静止画の視線誘導ならEditを基準。Mask等と同期するならFusion候補。",
    avoid: "顔を中央へ持ってくるためだけに大きくpanして写真の文脈を失う。",
  },
  {
    techniqueId: "crop",
    label: "Crop / Reframe",
    observe: "16:9へ収める時に何が捨てられ、何が主役として残っているかを見る。",
    implementation: "Edit",
    editPath: "Edit → Inspector → Crop / Transform",
    fusionPath: null,
    skillIds: ["davinci-transform", "concept-framing"],
    decisionRule: "Cropは画面を埋める作業ではなく、写真の意味を守る判断。",
    avoid: "黒帯や余白を避けるため人物・場所の文脈を切る。",
  },
  {
    techniqueId: "mask",
    label: "Mask / Reveal",
    observe: "何かが現れる時、透明度で出ているのか、形で隠されているのかを見る。",
    implementation: "Fusion",
    editPath: "Editのsimple cropで代替できるか先に確認",
    fusionPath: "Fusion → Rectangle/Ellipse Mask → target node",
    skillIds: ["davinci-fusion-mask"],
    decisionRule: "固定cropで足りない時だけMask。文字reveal等で形とanimationが連動する場合にFusion。",
    avoid: "普通の写真+CaptionへMask animationを足して編集感を見せる。",
  },
  {
    techniqueId: "blur",
    label: "Blur",
    observe: "背景の情報を弱める目的か、transitionとしてぼかしているだけかを分ける。",
    implementation: "Either",
    editPath: "Edit / Effectsで短い補助処理。必要性を先に確認",
    fusionPath: "Fusion → Blur node / Mask連携",
    skillIds: ["davinci-fusion-node"],
    decisionRule: "情報整理なら局所的に。Transitionを豪華にする目的だけなら使わない。",
    avoid: "場面転換のたびBlur transitionを入れる。",
  },
  {
    techniqueId: "opacity",
    label: "Opacity / Dissolve",
    observe: "Aが消えながらBが見えるのか、Hard Cutなのかをframe単位で確認する。",
    implementation: "Edit",
    editPath: "Edit → Cross Dissolve / Opacity keyframe",
    fusionPath: "Fusion → Merge Blend",
    skillIds: ["concept-continuity", "davinci-keyframe"],
    decisionRule: "時間経過・余韻など理由がある時だけDissolve。通常はHard Cutと比較する。",
    avoid: "Cutが不安だから全接続をDissolveにする。",
  },
  {
    techniqueId: "ease",
    label: "Ease / Acceleration",
    observe: "動き始め・止まりが機械的か、少しずつ速度が変わるかを見る。",
    implementation: "Edit",
    editPath: "Edit → Keyframe / Curve / Ease",
    fusionPath: "Fusion → Spline",
    skillIds: ["davinci-keyframe", "davinci-easing"],
    decisionRule: "小さなmotionはまずEditのEase。複雑な複数parameter同期だけSpline。",
    avoid: "Easeを強くしすぎて動きの存在そのものを目立たせる。",
  },
  {
    techniqueId: "timing",
    label: "Timing / Frames",
    observe: "Effect名より、いつ始まり・何frame続き・どこで終わるかを最初に測る。",
    implementation: "Edit",
    editPath: "Edit → Timeline / Marker / frame step",
    fusionPath: "Fusionでも最終的な尺はTimeline文脈で確認",
    skillIds: ["concept-rhythm", "davinci-marker", "davinci-trim"],
    decisionRule: "技法を再現する前にdurationを測る。12frameの動きと2秒の動きは別物。",
    avoid: "Scale/Blur値だけ真似してtimingを見ない。",
  },
  {
    techniqueId: "text",
    label: "Text / Title",
    observe: "文字が何秒表示され、何を最初に読み、写真より強いか弱いかを見る。",
    implementation: "Edit",
    editPath: "Edit → Text / Text+。simple titleはTextから開始",
    fusionPath: "Fusion / Text+は特殊reveal・mask連携が必要な場合のみ",
    skillIds: ["concept-typography", "davinci-text"],
    decisionRule: "文字内容・階層が主。Animationがなくても成立するか先に確認。",
    avoid: "参考動画に動く文字があるからText+を使う。",
  },
  {
    techniqueId: "color",
    label: "Color / Tone",
    observe: "LUT名を当てるより、WB・Exposure・Contrast・Saturationの差を見る。",
    implementation: "Color",
    editPath: "Color → WB / Exposure / Contrast / Saturation / Shot Match",
    fusionPath: null,
    skillIds: ["concept-color-consistency", "davinci-color-balance"],
    decisionRule: "Look模倣より前後shotの自然さを優先。",
    avoid: "referenceの色をLUT一発で再現しようとする。",
  },
  {
    techniqueId: "audio-lead",
    label: "Audio Lead / J-L Cut",
    observe: "次の音が画より先に来るか、前の音が次cutへ残るかを耳で分ける。",
    implementation: "Fairlight",
    editPath: "Edit/Fairlight → unlink timing → J-cut / L-cut / Fade",
    fusionPath: null,
    skillIds: ["concept-audio-continuity", "davinci-jl-cut", "davinci-audio-fade"],
    decisionRule: "音を先行/残すことでStory理解が増える時だけ使う。",
    avoid: "高度な編集に見えるから全章へJ/L-cutを入れる。",
  },
];

export const referenceBreakdownExamples: ReferenceBreakdownExample[] = [
  {
    exampleId: "ref-small-photo-push",
    title: "写真へ静かに寄る",
    observation: "約1秒かけて小さく寄り、終点で自然に止まる。",
    techniqueIds: ["scale", "ease", "timing"],
    estimatedFrames: "24–36 frames程度から比較",
    recommendedImplementation: "Edit",
    weddingUse: "Opening Hero A/B。StaticとのA/B比較を必ず行う。",
    why: "小さなTransformだけなのでFusionへ移る理由がない。",
  },
  {
    exampleId: "ref-text-mask-reveal",
    title: "文字が横から現れる",
    observation: "文字自体が移動するより、固定した文字が矩形の境界から見えてくる。",
    techniqueIds: ["text", "mask", "timing", "ease"],
    estimatedFrames: "8–16 frames程度から比較",
    recommendedImplementation: "Fusion",
    weddingUse: "Location title等、本当に必要な1〜2箇所だけ。",
    why: "TextとMaskを連動させるためFusionのNode構造が分かりやすい。",
  },
  {
    exampleId: "ref-audio-led-chapter",
    title: "音が先に次の章を知らせる",
    observation: "画面転換より少し前に次のBGM/実音が入り、視覚転換を予告する。",
    techniqueIds: ["audio-lead", "timing"],
    estimatedFrames: "6–30 frames程度をA/B",
    recommendedImplementation: "Fairlight",
    weddingUse: "Profile 出会い / Chapter transition。",
    why: "Transition effectを足さなくても章の変化を感じさせられる。",
  },
];

export const referenceBreakdownPrinciples = [
  "最初に『何が変わっているか』だけ観察し、DaVinci機能名を後から当てる。",
  "Scale / Position / Mask / Blur / Ease / durationを別々に分解する。",
  "同じ見た目をEditで作れるなら、Fusionを使った方が上級とは考えない。",
  "再現する前にWedding Movieへ必要かを判断する。",
  "Referenceは答えではなく、編集判断を言語化する教材として使う。",
];
