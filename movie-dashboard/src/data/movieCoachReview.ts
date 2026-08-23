export type MovieReviewCategory =
  | "timing"
  | "crop"
  | "motion"
  | "typography"
  | "color"
  | "audio"
  | "technical"
  | "story";

export type MovieReviewStatus = "open" | "resolved";
export type MovieReviewSource = "manual" | "qa" | "ai";

export interface MovieReviewFinding {
  findingId: string;
  outcomeId: string;
  timecode: string;
  category: MovieReviewCategory;
  note: string;
  source: MovieReviewSource;
  status: MovieReviewStatus;
  createdAt: string;
  resolvedAt: string | null;
}

export interface MovieReviewCategoryDefinition {
  category: MovieReviewCategory;
  label: string;
  question: string;
  skillIds: string[];
  profileSkillIds?: string[];
  defaultFix: string;
}

export interface OpeningQaEvidenceSource {
  sourceId: string;
  label: string;
  command: string;
  evidence: string;
  reviewCategories: MovieReviewCategory[];
  boundary: string;
}

export const movieReviewCategories: MovieReviewCategoryDefinition[] = [
  {
    category: "timing",
    label: "Timing / Rhythm",
    question: "cutが早い・遅い、写真を読む時間が足りない、BGMとズレていないか？",
    skillIds: ["concept-rhythm", "davinci-trim", "davinci-ripple", "davinci-marker"],
    profileSkillIds: ["concept-longform-pacing"],
    defaultFix: "Markerを候補点に戻し、写真を読む時間とBGMの両方を見てTrimする。",
  },
  {
    category: "crop",
    label: "Crop / Framing",
    question: "顔・手・背景文脈・文字余白が切れていないか？",
    skillIds: ["concept-framing", "davinci-transform"],
    profileSkillIds: ["concept-photo-sequencing"],
    defaultFix: "Position / Zoomを調整し、無理ならContainや余白ありlayoutへ戻す。",
  },
  {
    category: "motion",
    label: "Motion",
    question: "動きが写真より目立つ、全写真が同じ、停止が機械的ではないか？",
    skillIds: ["concept-stillness", "davinci-transform", "davinci-keyframe", "davinci-easing"],
    profileSkillIds: ["concept-longform-pacing"],
    defaultFix: "まずStaticと比較し、意味が増えるshotだけ小さなmotionを残す。",
  },
  {
    category: "typography",
    label: "Typography",
    question: "実時間で読めるか、写真より強くないか、情報階層があるか？",
    skillIds: ["concept-typography", "concept-framing", "davinci-text"],
    profileSkillIds: ["concept-caption-economy"],
    defaultFix: "文字を小さく詰めず、情報を削る・優先順位を付ける・写真の余白へ移す。",
  },
  {
    category: "color",
    label: "Color",
    question: "前後shotでWB・Exposure・Contrastが急に変わっていないか？",
    skillIds: ["concept-color-consistency", "davinci-color-balance"],
    defaultFix: "LUTを足す前にWhite Balance → Exposure → Contrast → Saturation差を整える。",
  },
  {
    category: "audio",
    label: "Audio",
    question: "音量差、急なfade、章切替の切れ目、BGMの山とのズレはないか？",
    skillIds: ["concept-audio-continuity", "davinci-audio-fade", "davinci-jl-cut"],
    profileSkillIds: ["concept-emotion-curve"],
    defaultFix: "映像と音の編集点を分けて比較し、必要ならJ/L-cutか短いfadeを使う。",
  },
  {
    category: "technical",
    label: "Technical / Deliver",
    question: "resolution・fps・duration・black frame・BGM gateなど上映前条件を満たすか？",
    skillIds: ["davinci-deliver"],
    defaultFix: "見た目の修正と分け、技術contractを満たすまでfinal扱いにしない。",
  },
  {
    category: "story",
    label: "Story / Meaning",
    question: "このshotが必要な理由、前後との関係、Wedding Movie全体での役割があるか？",
    skillIds: ["concept-rhythm", "concept-continuity", "concept-stillness"],
    profileSkillIds: [
      "concept-narrative-arc",
      "concept-longform-pacing",
      "concept-photo-sequencing",
      "concept-emotion-curve",
    ],
    defaultFix: "Effectを足す前にshotの役割を1文に戻し、役割が無ければ削除候補にする。",
  },
];

export const openingQaEvidenceSources: OpeningQaEvidenceSource[] = [
  {
    sourceId: "opening-photo-preflight",
    label: "Photo Presentation Preflight",
    command: "cd motion-studio && pnpm opening:preflight",
    evidence: "11 canonical photo slots / layout / fit / focus / motion / cover-crop attention",
    reviewCategories: ["crop", "motion", "story"],
    boundary: "写真実体が未配置でも構造は確認できる。最終crop判断は実写真で行う。",
  },
  {
    sourceId: "opening-photo-strict",
    label: "Final Photo Gate",
    command: "cd motion-studio && pnpm check:opening-photos:strict",
    evidence: "Opening V1 finalに必要な実写真11/11の存在gate",
    reviewCategories: ["technical", "story"],
    boundary: "写真が存在することを確認するgateで、写真の良し悪しそのものは判定しない。",
  },
  {
    sourceId: "opening-10-frame-visual",
    label: "10-frame Visual QA",
    command: "cd motion-studio && pnpm qa:opening-stills",
    evidence: "60秒Openingの代表10frameをrenderし、layout / crop / typography / scene continuityを目視する",
    reviewCategories: ["crop", "motion", "typography", "color", "story"],
    boundary: "静止frame QAなのでtiming・audioの最終判断は動画previewで別に行う。",
  },
  {
    sourceId: "opening-sound-gate",
    label: "BGM Clearance Gate",
    command: "cd motion-studio && pnpm check:opening-sound:strict",
    evidence: "final render前にBGM cue / asset status / public audio fileを要求",
    reviewCategories: ["audio", "technical"],
    boundary: "権利条件や曲のCreative fitを自動推測せず、確認済みassetだけをfinalへ通す。",
  },
  {
    sourceId: "opening-final-render-qa",
    label: "Final MP4 Technical QA",
    command: "cd motion-studio && pnpm check:opening-render",
    evidence: "video stream / 1920x1080 / 30fps / 60s / codec info / near-pure-black interval",
    reviewCategories: ["technical"],
    boundary: "MP4の技術成立を確認する。Creative approvalや会場固有納品仕様の代わりにはしない。",
  },
];
