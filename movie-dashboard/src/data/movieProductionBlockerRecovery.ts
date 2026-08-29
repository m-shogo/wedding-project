export type MovieProductionProjectId = "opening" | "profile";

export type MovieProductionBlockerRecoveryAction = {
  id: string;
  label: string;
  kind: "ROUTE" | "COMMAND" | "HUMAN";
  purpose: string;
  route?: string;
  command?: string;
};

const openingPhotoRecovery: MovieProductionBlockerRecoveryAction = {
  id: "opening-photo-intake",
  label: "Opening写真11枠を投入",
  kind: "ROUTE",
  route: "/opening-photo-intake",
  purpose: "canonical photo slotを確認し、実写真とintake receiptをcurrentにする",
};

const openingBgmRecovery: MovieProductionBlockerRecoveryAction = {
  id: "opening-bgm-intake",
  label: "Opening BGM Intakeを進める",
  kind: "ROUTE",
  route: "/opening-bgm-intake",
  purpose: "BGM実ファイル・intake receipt・上映条件をcurrentにする",
};

const profileMediaRecovery: MovieProductionBlockerRecoveryAction = {
  id: "profile-media-intake",
  label: "Profile 17素材を投入",
  kind: "ROUTE",
  route: "/profile-media-intake",
  purpose: "5章17素材とmedia intake receiptをcurrentにする",
};

const profileBgmRecovery: MovieProductionBlockerRecoveryAction = {
  id: "profile-bgm-intake",
  label: "Profile BGM Intakeを進める",
  kind: "ROUTE",
  route: "/profile-bgm-intake",
  purpose: "BGM実ファイル・receipt・Human rights approvalをcurrent SHAへ固定する",
};

const profileStructureReviewRecovery: MovieProductionBlockerRecoveryAction = {
  id: "profile-structure-review",
  label: "Profile構成Human reviewを初期化・確認",
  kind: "COMMAND",
  command: "pnpm profile:structure-review:init",
  purpose: "5章structure previewのcurrent evidenceを初期化しHuman reviewへ進む",
};

const profileRealMediaReviewRecovery: MovieProductionBlockerRecoveryAction = {
  id: "profile-real-media-review",
  label: "Profile real-media Human QAを進める",
  kind: "ROUTE",
  route: "/movie-coach/compare",
  purpose: "current real-media preview/stillsのcrop・focus・color・contentを人間確認する",
};

const palmierRecovery: MovieProductionBlockerRecoveryAction = {
  id: "palmier-production-bundle",
  label: "Palmier Handoffを再確認",
  kind: "ROUTE",
  route: "/palmier-handoff",
  purpose: "current final render/reviewからproduction bundle・timeline handoffを再生成する",
};

const davinciRecovery: MovieProductionBlockerRecoveryAction = {
  id: "davinci-actual",
  label: "DaVinci Actual導線を確認",
  kind: "ROUTE",
  route: "/movie-coach/fusion",
  purpose: "Mac DaVinci Resolve Actualの未完了・stale evidenceを解消する。CIからActualへ昇格しない",
};

const finalHumanRecovery: MovieProductionBlockerRecoveryAction = {
  id: "final-human-review",
  label: "Human final reviewを進める",
  kind: "ROUTE",
  route: "/movie-coach/compare",
  purpose: "current final render / DaVinci exportに対するHuman review・approvalを行う",
};

function actionsForCode(projectId: MovieProductionProjectId, code: string): MovieProductionBlockerRecoveryAction[] {
  if (projectId === "opening") {
    if (code === "PHOTO_MISSING" || code.startsWith("PHOTO_") || code.startsWith("MEDIA_INTAKE:")) return [openingPhotoRecovery];
    if (code.startsWith("BGM_") || code.startsWith("BGM_INTAKE:")) return [openingBgmRecovery];
  }

  if (projectId === "profile") {
    if (code === "MEDIA_MISSING" || code.startsWith("MEDIA_INTAKE")) return [profileMediaRecovery];
    if (code.startsWith("BGM_RIGHTS:") || code.startsWith("PROFILE_BGM_")) return [profileBgmRecovery];
    if (code.startsWith("STRUCTURE_REVIEW:")) return [profileStructureReviewRecovery];
    if (code.startsWith("REAL_MEDIA_REVIEW:")) return [profileRealMediaReviewRecovery];
  }

  if (code.startsWith("BUNDLE_") || code.startsWith("ARTIFACT_STALE:productionBundle") || code.startsWith("ARTIFACT_MISSING:productionBundle")) return [palmierRecovery];
  if (code.includes("DAVINCI") || code.includes("DaVinci") || code.endsWith(":davinciFinishing")) return [davinciRecovery];
  if (code.includes("FINAL_DELIVERY") || code.endsWith(":finalDeliveryApproval") || code.endsWith(":finalRenderReview")) return [finalHumanRecovery];
  return [];
}

export function blockerRecoveryActionsFor(projectId: MovieProductionProjectId, blockerCodes: readonly string[]) {
  const byId = new Map<string, MovieProductionBlockerRecoveryAction>();
  for (const code of blockerCodes) {
    for (const action of actionsForCode(projectId, code)) byId.set(action.id, action);
  }
  return [...byId.values()];
}

export const movieProductionBlockerRecoveryGuardrails = [
  "RECOVERY_ACTION_VISIBLE != RECOVERY_EXECUTED",
  "RECOVERY_ACTION_ROUTE != HUMAN_QA_PASS",
  "DAVINCI_RECOVERY_ROUTE_VISIBLE != MAC_DAVINCI_ACTUAL",
] as const;
