import type { AssetStatus, AssetType, PromptStatus, SceneStatus, TaskPriority, TaskStatus } from "../types/movie";

export const sceneStatusLabel: Record<SceneStatus, string> = {
  not_started: "未着手",
  collecting: "素材収集中",
  generating: "生成中",
  editing: "編集中",
  review: "レビュー",
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
  ai_video: "AI動画",
  motion_studio_export: "Motion Studio",
  audio: "音源",
  reference: "参考",
};

export const assetTypeColor: Record<AssetType, string> = {
  generated_image: "bg-violet-100 text-violet-700",
  own_photo: "bg-sky-100 text-sky-700",
  own_video: "bg-cyan-100 text-cyan-700",
  ai_video: "bg-indigo-100 text-indigo-700",
  motion_studio_export: "bg-teal-100 text-teal-700",
  audio: "bg-pink-100 text-pink-700",
  reference: "bg-gray-100 text-gray-600",
};

export const assetStatusLabel: Record<AssetStatus, string> = {
  pending: "未着手",
  collected: "収集済み",
  generating: "生成中",
  generated: "生成済み",
  adopted: "採用",
  rejected: "不採用",
  needs_review: "要確認",
};

export const assetStatusColor: Record<AssetStatus, string> = {
  pending: "bg-gray-100 text-gray-600",
  collected: "bg-sky-100 text-sky-700",
  generating: "bg-blue-100 text-blue-700",
  generated: "bg-indigo-100 text-indigo-700",
  adopted: "bg-emerald-100 text-emerald-700",
  needs_review: "bg-orange-100 text-orange-700",
  rejected: "bg-red-100 text-red-700",
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
  todo: "TODO",
  in_progress: "進行中",
  done: "完了",
  blocked: "ブロック中",
};

export const taskStatusColor: Record<TaskStatus, string> = {
  todo: "bg-gray-100 text-gray-600",
  in_progress: "bg-blue-100 text-blue-700",
  done: "bg-emerald-100 text-emerald-700",
  blocked: "bg-red-100 text-red-700",
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
