import {profileRealMediaReviewGate} from "./profileRealMediaReviewGate.generated";

export type ProfileRealMediaQaState = "NOT_RUN" | "PASS" | "FAIL";

export interface ProfileRealMediaQaAuditV1 {
  evidencePath: string;
  evidenceExists: boolean;
  evidenceSha256: string | null;
  parseState: "MISSING" | "INVALID_JSON" | "PARSED";
  boundAt: string | null;
  preview: {path: string | null; sha256: string | null} | null;
  previewSourceFingerprintSha256: string | null;
  previewSources: Array<{path: string | null; sha256: string | null}>;
  runtimeManifestSha256: string | null;
  productionPlanSha256: string | null;
  previewComponentSha256: string | null;
  canonicalPlanFingerprint: string | null;
  media: Array<{
    slot: string | null;
    chapterId: string | null;
    label: string | null;
    file: string | null;
    sha256: string | null;
    qa: {
      crop: ProfileRealMediaQaState;
      focus: ProfileRealMediaQaState;
      color: ProfileRealMediaQaState;
      emotionalFit: ProfileRealMediaQaState;
      contentAccuracy: ProfileRealMediaQaState;
    };
  }>;
  chapters: Array<{
    chapterId: string | null;
    title: string | null;
    visualFlow: ProfileRealMediaQaState;
    readability: ProfileRealMediaQaState;
    mediaRoleFit: ProfileRealMediaQaState;
  }>;
  review: {
    overall: ProfileRealMediaQaState;
    reviewedAt: string | null;
  };
}

export interface ProfileRealMediaQaAuditSurfaceV1 {
  state: "NOT_RUN" | "BLOCKED" | "PASS";
  humanReviewComplete: boolean;
  mediaExpected: number;
  mediaReviewed: number;
  blockers: readonly string[];
  macDaVinciActual: "NOT_RUN";
  productionReady: false;
  audit: ProfileRealMediaQaAuditV1;
}

/**
 * The generated gate is deliberately literal/readonly for CI drift detection. This adapter
 * exposes a stable runtime type even when today's generated evidence arrays are empty.
 */
export function getProfileRealMediaQaAuditSurface(): ProfileRealMediaQaAuditSurfaceV1 {
  return {
    state: profileRealMediaReviewGate.state,
    humanReviewComplete: profileRealMediaReviewGate.humanReviewComplete,
    mediaExpected: profileRealMediaReviewGate.mediaExpected,
    mediaReviewed: profileRealMediaReviewGate.mediaReviewed,
    blockers: profileRealMediaReviewGate.blockers,
    macDaVinciActual: profileRealMediaReviewGate.macDaVinciActual,
    productionReady: profileRealMediaReviewGate.productionReady,
    audit: profileRealMediaReviewGate.audit as unknown as ProfileRealMediaQaAuditV1,
  };
}
