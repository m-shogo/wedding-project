import type {
  AssetStatus,
  AssetType,
  MovieStatus,
  MovieType,
  PersonCategory,
  PeriodTag,
  PhotoOrientation,
  PhotoUsage,
  PromptStatus,
  PromptTarget,
  SceneStatus,
  TaskCategory,
  TaskPriority,
  TaskStatus,
} from "../types/movie";

export const sceneStatusLabel: Record<SceneStatus, string> = {
  not_started: "未着手",
  collecting: "素材収集中",
  generating: "生成中",
  editing: "編集中",
  review: "確認中",
  done: "完了",
};

export const sceneStatusColor: Record<SceneStatus, string> = {
  not_started: "bg-gray-100 text-gray-600",
  collecting: "bg-amber-100 text-amber-700",
  generating: "bg-blue-100 text-blue-700",
  editing: "bg-purple-100 text-purple-700",
  review: "bg-orange-100 text-orange-700",
  done: "bg-emerald-100 text-emerald-700",
};

export const assetTypeLabel: Record<AssetType, string> = {
  generated_image: "生成画像",
  own_photo: "自前写真",
  own_video: "自前動画",
  ai_video: "生成AI動画",
  motion_studio_export: "Motion Studio書き出し",
  audio: "音源",
  reference: "参考資料",
  text: "テキスト",
  design_asset: "デザイン素材",
};

export const assetTypeColor: Record<AssetType, string> = {
  generated_image: "bg-violet-100 text-violet-700",
  own_photo: "bg-sky-100 text-sky-700",
  own_video: "bg-cyan-100 text-cyan-700",
  ai_video: "bg-indigo-100 text-indigo-700",
  motion_studio_export: "bg-teal-100 text-teal-700",
  audio: "bg-pink-100 text-pink-700",
  reference: "bg-gray-100 text-gray-600",
  text: "bg-lime-100 text-lime-700",
  design_asset: "bg-fuchsia-100 text-fuchsia-700",
};

export const assetStatusLabel: Record<AssetStatus, string> = {
  idea: "アイデア",
  needed: "必要",
  collecting: "収集中",
  ready: "準備完了",
  selected: "選定済み",
  rejected: "不採用",
  needs_replace: "差し替え必要",
  used: "使用中",
};

export const assetStatusColor: Record<AssetStatus, string> = {
  idea: "bg-slate-100 text-slate-600",
  needed: "bg-gray-100 text-gray-600",
  collecting: "bg-amber-100 text-amber-700",
  ready: "bg-sky-100 text-sky-700",
  selected: "bg-indigo-100 text-indigo-700",
  rejected: "bg-red-100 text-red-700",
  needs_replace: "bg-orange-100 text-orange-700",
  used: "bg-emerald-100 text-emerald-700",
};

export const taskPriorityLabel: Record<TaskPriority, string> = {
  high: "高",
  medium: "中",
  low: "低",
};

export const taskPriorityColor: Record<TaskPriority, string> = {
  high: "bg-red-100 text-red-700",
  medium: "bg-amber-100 text-amber-700",
  low: "bg-gray-100 text-gray-600",
};

export const taskStatusLabel: Record<TaskStatus, string> = {
  todo: "未着手",
  in_progress: "進行中",
  waiting: "待機中",
  blocked: "ブロック中",
  done: "完了",
  dropped: "取り下げ",
};

export const taskStatusColor: Record<TaskStatus, string> = {
  todo: "bg-gray-100 text-gray-600",
  in_progress: "bg-blue-100 text-blue-700",
  waiting: "bg-yellow-100 text-yellow-700",
  blocked: "bg-red-100 text-red-700",
  done: "bg-emerald-100 text-emerald-700",
  dropped: "bg-slate-100 text-slate-500",
};

export const taskCategoryLabel: Record<TaskCategory, string> = {
  missing_asset: "素材不足",
  undecided: "未確定事項",
  photo_selection: "写真選定",
  ai_generation: "AI生成",
  motion_studio: "Motion Studio",
  capcut: "CapCut編集",
  bgm: "BGM",
  caption: "テロップ",
  review: "確認",
};

export const taskCategoryColor: Record<TaskCategory, string> = {
  missing_asset: "bg-red-100 text-red-700",
  undecided: "bg-yellow-100 text-yellow-700",
  photo_selection: "bg-sky-100 text-sky-700",
  ai_generation: "bg-indigo-100 text-indigo-700",
  motion_studio: "bg-teal-100 text-teal-700",
  capcut: "bg-purple-100 text-purple-700",
  bgm: "bg-pink-100 text-pink-700",
  caption: "bg-lime-100 text-lime-700",
  review: "bg-orange-100 text-orange-700",
};

export const promptStatusLabel: Record<PromptStatus, string> = {
  draft: "下書き",
  testing: "テスト中",
  adopted: "採用",
  rejected: "不採用",
};

export const promptStatusColor: Record<PromptStatus, string> = {
  draft: "bg-gray-100 text-gray-600",
  testing: "bg-blue-100 text-blue-700",
  adopted: "bg-emerald-100 text-emerald-700",
  rejected: "bg-red-100 text-red-700",
};

export const promptTargetLabel: Record<PromptTarget, string> = {
  image: "画像生成",
  video: "動画生成",
  motion: "モーション",
  caption: "テロップ",
  edit_instruction: "編集指示",
  bgm_note: "BGMメモ",
};

export const promptTargetColor: Record<PromptTarget, string> = {
  image: "bg-violet-100 text-violet-700",
  video: "bg-indigo-100 text-indigo-700",
  motion: "bg-teal-100 text-teal-700",
  caption: "bg-lime-100 text-lime-700",
  edit_instruction: "bg-purple-100 text-purple-700",
  bgm_note: "bg-pink-100 text-pink-700",
};

export const movieStatusLabel: Record<MovieStatus, string> = {
  planning: "企画中",
  in_progress: "制作中",
  review: "確認中",
  done: "完了",
};

export const movieStatusColor: Record<MovieStatus, string> = {
  planning: "bg-gray-100 text-gray-600",
  in_progress: "bg-blue-100 text-blue-700",
  review: "bg-orange-100 text-orange-700",
  done: "bg-emerald-100 text-emerald-700",
};

export const movieTypeLabel: Record<MovieType, string> = {
  opening: "オープニング",
  profile: "プロフィール",
  introduction: "紹介",
  other: "その他",
};

export const movieTypeColor: Record<MovieType, string> = {
  opening: "bg-indigo-100 text-indigo-700",
  profile: "bg-sky-100 text-sky-700",
  introduction: "bg-teal-100 text-teal-700",
  other: "bg-gray-100 text-gray-600",
};

export const personCategoryLabel: Record<PersonCategory, string> = {
  groom: "新郎",
  bride: "新婦",
  both: "ふたり",
  family: "家族",
  friend: "友人",
  other: "その他",
};

export const periodTagLabel: Record<PeriodTag, string> = {
  childhood: "幼少期",
  student: "学生時代",
  adult: "社会人",
  meeting: "出会い",
  present: "現在",
  other: "その他",
};

export const photoOrientationLabel: Record<PhotoOrientation, string> = {
  landscape: "横",
  portrait: "縦",
  square: "正方形",
};

export const photoUsageLabel: Record<PhotoUsage, string> = {
  slide: "スライド",
  passport_frame: "パスポート風",
  stamp: "スタンプ",
  bg_overlay: "背景オーバーレイ",
  other: "その他",
};
