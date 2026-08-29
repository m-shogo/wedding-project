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
  const openingMediaReady = String(openingProductionStatus.stages.media.state) === "PASS";
  const openingCropReady = String(openingProductionStatus.stages.cropReview.state) === "PASS";
  const openingPreviewReady = String(openingPreview.state) === "PASS";

  const profileAssemblyReady = Boolean(profileProductionStatus.readiness.assemblyReady);
  const profilePreviewReady = String(profilePreview.state) === "PASS";

  return [
    {
      projectId: "opening",
      overallState: String(openingProductionStatus.overallState),
      upstreamState: String(openingProductionStatus.stages.cropReview.state),
      previewState: String(openingPreview.state),
      reviewState: String(openingReview.state),
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
      overallState: String(profileProductionStatus.overallState),
      upstreamState: String(profileProductionStatus.stages.assembly.state),
      previewState: String(profilePreview.state),
      reviewState: String(profileRealMediaReviewGate.state),
      previewPath: "out/preview/profile_v1_real_media_preview.mp4",
      reviewEvidencePath: profileRealMediaReviewGate.audit.evidencePath,
      renderCommand: profilePreview.recovery[0] ?? "pnpm render:profile-v1:real-media-preview",
      reviewInitCommand: profilePreview.recovery[1] ?? "pnpm profile:real-media-review:init",
      reviewStrictCommand: "pnpm profile:real-media-review:strict",
      humanReviewRequired: true,
      canRenderPreview: profileAssemblyReady,
      canStartHumanReview: profilePreviewReady,
      reviewedCount: Number(profileRealMediaReviewGate.mediaReviewed),
      expectedCount: Number(profileRealMediaReviewGate.mediaExpected),
      bgmReviewed: Boolean(profileRealMediaReviewGate.bgmReviewed),
      blockers: profilePreview.blockers,
    },
  ];
}
