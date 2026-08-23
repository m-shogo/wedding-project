export type SkillKind = "concept" | "davinci";

export type LearningState =
  | "not_started"
  | "learned"
  | "practiced"
  | "used_in_wedding"
  | "comfortable"
  | "automated";

export type AutomationPolicy =
  | "never"
  | "after_practice"
  | "after_wedding_use"
  | "safe_anytime";

export interface LearningSkill {
  skillId: string;
  kind: SkillKind;
  category: string;
  label: string;
  summary: string;
  whyItMatters: string;
  davinciPage?: "Media" | "Cut" | "Edit" | "Fusion" | "Color" | "Fairlight" | "Deliver";
  features?: string[];
  prerequisiteIds: string[];
  automationPolicy: AutomationPolicy;
}

export interface BookChapterManifest {
  chapterId: string;
  title: string;
  pageStart: number | null;
  pageEnd: number | null;
  skillIds: string[];
}

export interface BookManifest {
  title: string;
  edition: string;
  davinciVersion: string;
  sourceType: "owned_book" | "official_training" | "other";
  chapters: BookChapterManifest[];
}

export interface LearningEvidence {
  evidenceId: string;
  skillId: string;
  state: Exclude<LearningState, "not_started">;
  outcomeId: string | null;
  createdAt: string;
  note: string;
}

export interface OutcomeChecklistItem {
  itemId: string;
  label: string;
}

export interface ProductionOutcome {
  outcomeId: string;
  movieId: "opening" | "profile";
  title: string;
  shortLabel: string;
  durationSec: number | null;
  productionRef: string;
  authorityLabel: string;
  priority: number;
  practiceMinutes: number;
  conceptSkillIds: string[];
  davinciSkillIds: string[];
  recipeIds: string[];
  prerequisiteOutcomeIds?: string[];
  checklist: OutcomeChecklistItem[];
  whyToday: string;
}

export interface CoachProgressState {
  evidence: LearningEvidence[];
  outcomeChecklist: Record<string, string[]>;
  book: BookManifest;
}
