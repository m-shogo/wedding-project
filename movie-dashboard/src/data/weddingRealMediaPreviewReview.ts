import { openingProductionStatus } from "./openingProductionStatus.generated";
import { profileProductionStatus } from "./profileProductionStatus.generated";
import { profileRealMediaReviewGate } from "./profileRealMediaReviewGate.generated";

export type WeddingPreviewProjectId = "opening" | "profile";

export type WeddingPreviewReviewProject = {
  projectId: WeddingPreviewProjectId;
  overallState: string;
  upstreamState: string;
  previewState: string;
  reviewState: string;
  previewPath: string;
  reviewEvidencePath: string;
  renderCommand: string;
  reviewInitCommand: string;
  reviewStrictCommand: string;
  humanReviewRequired: true;
  canRenderPreview: boolean;
  canStartHumanReview: boolean;
  reviewedCount: number;
  expectedCount: number;
  bgmReviewed: boolean;
  blockers: readonly string[];
};

const openingPreview = openingProductionStatus.stages.previewRender;
const openingReview = openingProductionStatus.stages.previewReview;
const profilePreview = profileProductionStatus.sourceRevalidation.realMediaPreview;

export function getWeddingRealMediaPreviewReview(): WeddingPreviewReviewProject[] {
  const openingMediaReady = openingProductionStatus.stages.media.state === "PASS";
  const openingCropReady = openingProductionStatus.stages.cropReview.state === "PASS";
  const openingPreviewReady = openingPreview.state === "PASS";

  const profileAssemblyReady = profileProductionStatus.readiness.assemblyReady === true;
  const profilePreviewReady = profilePreview.state === "PASS";

  return [
    {
      projectId: "opening",
      overallState: openingProductionStatus.overallState,
      upstreamState: openingProductionStatus.stages.cropReview.state,
      previewState: openingPreview.state,
      reviewState: openingReview.state,
      previewPath: openingPreview.path,
      reviewEvidencePath: openingReview.path,
      renderCommand: openingPreview.recovery[0] ?? "pnpm render:opening-v1:preview",
      reviewInitCommand: openingReview.recovery[0] ?? "pnpm opening:preview-review:init",
      reviewStrictCommand: openingReview.recovery[1] ?? "pnpm opening:preview-review:strict",
      humanReviewRequired: true,
      canRenderPreview: openingMediaReady && openingCropReady,
      canStartHumanReview: openingPreviewReady,
      reviewedCount: 0,
      expectedCount: 11,
      bgmReviewed: false,
      blockers: openingProductionStatus.sourceRevalidation.realMediaPreview.blockers,
    },
    {
      projectId: "profile",
      overallState: profileProductionStatus.overallState,
      upstreamState: profileProductionStatus.stages.assembly.state,
      previewState: profilePreview.state,
      reviewState: profileRealMediaReviewGate.state,
      previewPath: "out/preview/profile_v1_real_media_preview.mp4",
      reviewEvidencePath: profileRealMediaReviewGate.audit.evidencePath,
      renderCommand: profilePreview.recovery[0] ?? "pnpm render:profile-v1:real-media-preview",
      reviewInitCommand: profilePreview.recovery[1] ?? "pnpm profile:real-media-review:init",
      reviewStrictCommand: "pnpm profile:real-media-review:strict",
      humanReviewRequired: true,
      canRenderPreview: profileAssemblyReady,
      canStartHumanReview: profilePreviewReady,
      reviewedCount: profileRealMediaReviewGate.mediaReviewed,
      expectedCount: profileRealMediaReviewGate.mediaExpected,
      bgmReviewed: profileRealMediaReviewGate.bgmReviewed,
      blockers: profilePreview.blockers,
    },
  ];
}
