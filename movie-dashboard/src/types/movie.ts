export type SceneStatus =
  | "not_started"
  | "collecting"
  | "generating"
  | "editing"
  | "review"
  | "done";

export type AssetType =
  | "generated_image"
  | "own_photo"
  | "own_video"
  | "ai_video"
  | "motion_studio_export"
  | "audio"
  | "reference";

export type AssetStatus =
  | "pending"
  | "collected"
  | "generating"
  | "generated"
  | "adopted"
  | "rejected"
  | "needs_review";

export type TaskPriority = "high" | "medium" | "low";

export type TaskStatus = "todo" | "in_progress" | "done" | "blocked";

export type PromptStatus =
  | "draft"
  | "testing"
  | "adopted"
  | "rejected";

export interface Scene {
  sceneId: string;
  title: string;
  durationSec: number;
  purpose: string;
  visual: string;
  caption: string;
  bgmCue: string;
  assets: string[];
  promptIds: string[];
  status: SceneStatus;
  notes: string;
}

export interface Asset {
  assetId: string;
  type: AssetType;
  title: string;
  path: string;
  relatedSceneIds: string[];
  status: AssetStatus;
  source: string;
  usage: string;
  notes: string;
}

export interface Prompt {
  promptId: string;
  title: string;
  target: string;
  tool: string;
  prompt: string;
  negativePrompt: string;
  relatedSceneIds: string[];
  status: PromptStatus;
  resultAssetIds: string[];
  notes: string;
}

export interface Task {
  taskId: string;
  title: string;
  category: string;
  priority: TaskPriority;
  relatedSceneId: string;
  due: string;
  status: TaskStatus;
  notes: string;
}
