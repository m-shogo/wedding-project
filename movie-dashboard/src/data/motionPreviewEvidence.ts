export interface MotionPreviewEvidenceRecord {
  id: string;
  previewId: string;
  patternId: string;
  classification: "CONCEPT" | "ACTUAL";
  sourceType: "REPO_GENERATED" | "ACTUAL_DAVINCI_RENDER" | "ACTUAL_PALMIER_RENDER";
  generatedAt: string;
  workflowRunId: number | null;
  artifactName: string | null;
  artifactDigest: string | null;
  artifactExpiresAt: string | null;
  persistentAssetPath: string | null;
  renderSpec: {
    codec: string;
    width: number;
    height: number;
    fps: number;
    frames: number;
    measuredDurationSeconds: number;
  };
  automatedQa: {
    compositionContract: boolean;
    ffprobeVerified: boolean;
    renderedPixelOracle: boolean;
  };
  humanVisualQa: {
    reviewedOn: string;
    result: "PASS" | "FAIL" | "PENDING";
    observations: string[];
  };
  productionAuthority: boolean;
  notes: string;
}

/**
 * Evidence about rendered previews is kept separate from implementation truth.
 * A verified repository-generated Concept render is still not DaVinci Actual evidence.
 */
export const motionPreviewEvidence: MotionPreviewEvidenceRecord[] = [
  {
    id: "evidence-type-mask-reveal-concept-2026-08-25",
    previewId: "preview-type-mask-reveal-repo-concept",
    patternId: "type-mask-reveal",
    classification: "CONCEPT",
    sourceType: "REPO_GENERATED",
    generatedAt: "2026-08-25T12:28:02Z",
    workflowRunId: 32847587754,
    artifactName: "visual-motion-mask-reveal-concept-v1",
    artifactDigest: "sha256:7c2c1f8777311d9fe5e30b05dd6e57da5d8f1b8eb2971521fa277b1bb1f35b6e",
    artifactExpiresAt: "2026-09-01T12:28:01Z",
    persistentAssetPath: null,
    renderSpec: {
      codec: "h264",
      width: 1280,
      height: 720,
      fps: 30,
      frames: 120,
      measuredDurationSeconds: 4.053333,
    },
    automatedQa: {
      compositionContract: true,
      ffprobeVerified: true,
      renderedPixelOracle: true,
    },
    humanVisualQa: {
      reviewedOn: "2026-08-25",
      result: "PASS",
      observations: [
        "0.033秒付近でWELCOMEがMask境界から部分的に現れており、単純FadeではなくRevealの途中状態を目視確認。",
        "0.10秒付近で文字がほぼ出現し、0.70秒では完全にsettleしている。",
        "暗いニュートラル背景 + 白文字のみで、glow / particles / shake等のデモ用過剰演出はない。",
        "共通WELCOME sampleとしてPattern差を比較できるニュートラルさを維持している。",
      ],
    },
    productionAuthority: false,
    notes: "GitHub Actions artifactは期限付き証拠。persistentAssetPathがないためVisual Motion Libraryの本番動画assetにはまだ使わない。DaVinci Actual / local Resolve verificationとは完全に別扱い。",
  },
];

export function getLatestPreviewEvidence(previewId: string) {
  return motionPreviewEvidence.find((evidence) => evidence.previewId === previewId) ?? null;
}
