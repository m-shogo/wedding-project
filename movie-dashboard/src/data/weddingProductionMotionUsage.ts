import {
  getPatternImplementation,
  getPatternPreview,
  motionPatterns,
  type HumanDecision,
  type MotionPatternRecord,
  type UsageStage,
} from "./visualMotionLibrary";

export type WeddingMovieProject = "OPENING" | "PROFILE";
export type ProductionMotionUsageScope = "WEDDING_SHARED" | "PROJECT_UNASSIGNED";

export interface WeddingProductionMotionUsageRecord {
  patternId: string;
  japaneseName: string;
  commonName: string;
  usageStage: Exclude<UsageStage, "NEVER">;
  humanDecision: HumanDecision;
  usageScope: ProductionMotionUsageScope;
  openingFit: MotionPatternRecord["openingFit"];
  profileFit: MotionPatternRecord["profileFit"];
  openingSections: string[];
  profileSections: string[];
  implementationStatus: string;
  previewStatus: string;
  previewSourceType: string;
  verifiedImplementation: boolean;
  verifiedPreview: boolean;
}

export interface WeddingProductionMotionUsageSummary {
  used: WeddingProductionMotionUsageRecord[];
  rough: WeddingProductionMotionUsageRecord[];
  final: WeddingProductionMotionUsageRecord[];
  openingCompatible: WeddingProductionMotionUsageRecord[];
  profileCompatible: WeddingProductionMotionUsageRecord[];
  projectAssignmentAuthority: "NOT_RECORDED_IN_USAGE_STAGE";
}

function supportsProject(pattern: MotionPatternRecord, project: WeddingMovieProject) {
  const fit = project === "OPENING" ? pattern.openingFit : pattern.profileFit;
  return fit !== "×";
}

function toUsageRecord(pattern: MotionPatternRecord): WeddingProductionMotionUsageRecord | null {
  if (pattern.usageStage === "NEVER") return null;
  const implementation = getPatternImplementation(pattern);
  const preview = getPatternPreview(pattern);

  return {
    patternId: pattern.id,
    japaneseName: pattern.japaneseName,
    commonName: pattern.commonName,
    usageStage: pattern.usageStage,
    humanDecision: pattern.humanDecision,
    usageScope: "PROJECT_UNASSIGNED",
    openingFit: pattern.openingFit,
    profileFit: pattern.profileFit,
    openingSections: pattern.openingSections,
    profileSections: pattern.profileSections,
    implementationStatus: implementation?.status ?? "MISSING",
    previewStatus: preview?.status ?? "MISSING",
    previewSourceType: preview?.sourceType ?? "MISSING",
    verifiedImplementation: implementation?.verified ?? false,
    verifiedPreview: preview?.verified ?? false,
  };
}

export function getWeddingProductionMotionUsage(): WeddingProductionMotionUsageSummary {
  const used = motionPatterns
    .map(toUsageRecord)
    .filter((record): record is WeddingProductionMotionUsageRecord => record !== null);

  return {
    used,
    rough: used.filter((record) => record.usageStage === "ROUGH"),
    final: used.filter((record) => record.usageStage === "FINAL"),
    openingCompatible: used.filter((record) => {
      const pattern = motionPatterns.find((item) => item.id === record.patternId);
      return pattern ? supportsProject(pattern, "OPENING") : false;
    }),
    profileCompatible: used.filter((record) => {
      const pattern = motionPatterns.find((item) => item.id === record.patternId);
      return pattern ? supportsProject(pattern, "PROFILE") : false;
    }),
    projectAssignmentAuthority: "NOT_RECORDED_IN_USAGE_STAGE",
  };
}
