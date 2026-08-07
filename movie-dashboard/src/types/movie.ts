export type MovieType = "opening" | "profile" | "introduction" | "other";
export type MovieStatus = "planning" | "in_progress" | "review" | "done";

export interface MovieProject {
  movieId: string;
  title: string;
  type: MovieType;
  theme: string;
  targetDurationSec: number;
  status: MovieStatus;
  description: string;
}

export type SceneStatus = "not_started" | "collecting" | "generating" | "editing" | "review" | "done";

export type PersonCategory = "groom" | "bride" | "both" | "family" | "friend" | "other";
export type PeriodTag = "childhood" | "student" | "adult" | "meeting" | "present" | "other";
export type PhotoOrientation = "landscape" | "portrait" | "square";
export type PhotoUsage = "slide" | "passport_frame" | "stamp" | "bg_overlay" | "other";

export interface PhotoSlot {
  slotId: string;
  label: string;
  person: PersonCategory;
  period: PeriodTag;
  yearLabel: string;
  requiredCount: number;
  selectedAssetIds: string[];
  candidateAssetIds: string[];
  rejectedAssetIds: string[];
  comment: string;
  notes: string;
}

export interface Scene {
  sceneId: string;
  movieId: string;
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
  capcutMemo?: string;
  photoSlots?: PhotoSlot[];
  comment?: string;
  yearLabel?: string;
  person?: string;
  requiredAssetCount?: number;
}

export type AssetType = "generated_image" | "own_photo" | "own_video" | "ai_video" | "motion_studio_export" | "audio" | "reference" | "text" | "design_asset";
export type AssetStatus = "idea" | "needed" | "collecting" | "ready" | "selected" | "rejected" | "needs_replace" | "used";

export interface Asset {
  assetId: string;
  type: AssetType;
  title: string;
  path: string;
  relatedSceneIds: string[];
  relatedMovieIds: string[];
  status: AssetStatus;
  source: string;
  usage: string;
  notes: string;
  personTags?: PersonCategory[];
  periodTags?: PeriodTag[];
  orientation?: PhotoOrientation;
  photoUsage?: PhotoUsage;
  commentDraft?: string;
}

export type PromptTarget = "image" | "video" | "motion" | "caption" | "edit_instruction" | "bgm_note";

export const PROMPT_TOOLS = [
  "ChatGPT Image",
  "Seedance 2.0 Mini",
  "Seedance 2.0",
  "Seedance 2.5 (preview)",
  "Veo 3.1",
  "Runway Gen-4.5",
  "Kling",
  "Hailuo",
  "PixVerse",
  "Luma",
  "Midjourney",
  "Motion Studio",
  "CapCut",
] as const;

export type PromptStatus = "draft" | "testing" | "adopted" | "rejected";

export interface Prompt {
  promptId: string;
  title: string;
  target: PromptTarget;
  tool: string;
  prompt: string;
  negativePrompt: string;
  relatedSceneIds: string[];
  relatedMovieIds: string[];
  status: PromptStatus;
  resultAssetIds: string[];
  notes: string;
}

export type TaskCategory = "missing_asset" | "undecided" | "photo_selection" | "ai_generation" | "motion_studio" | "capcut" | "bgm" | "caption" | "review";
export type TaskPriority = "high" | "medium" | "low";
export type TaskStatus = "todo" | "in_progress" | "waiting" | "blocked" | "done" | "dropped";

export interface Task {
  taskId: string;
  movieId: string;
  title: string;
  category: TaskCategory;
  priority: TaskPriority;
  relatedSceneId: string;
  due: string;
  status: TaskStatus;
  notes: string;
}

export interface AllData {
  movies: MovieProject[];
  scenes: Scene[];
  assets: Asset[];
  prompts: Prompt[];
  tasks: Task[];
}
