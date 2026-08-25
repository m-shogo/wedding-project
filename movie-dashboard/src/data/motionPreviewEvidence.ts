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
  // 以下7件は2026-08-26にmotion-studioの既存StaRtMotionReelV1(8 preset連結・20秒)を
  // ローカルRemotion renderし、各presetの区間を目視・ffprobe/signalstatsで確認した記録。
  // GitHub Actions artifactではなくローカル一時ファイル(out/、Git外)のため
  // workflowRunId/artifactExpiresAtは存在しない。DaVinci Actual検証とは別扱いのまま。
  {
    id: "evidence-type-word-punch-concept-2026-08-26",
    previewId: "preview-type-word-punch-concept",
    patternId: "type-word-punch",
    classification: "CONCEPT",
    sourceType: "REPO_GENERATED",
    generatedAt: "2026-08-25T17:58:30Z",
    workflowRunId: null,
    artifactName: null,
    artifactDigest: "sha256:7897a3cc290e7dfcad260a296347512b4063fa7a7b3fa8a31b1a1f452bae36bc",
    artifactExpiresAt: null,
    persistentAssetPath: null,
    renderSpec: { codec: "h264", width: 960, height: 540, fps: 30, frames: 75, measuredDurationSeconds: 2.5 },
    automatedQa: { compositionContract: true, ffprobeVerified: true, renderedPixelOracle: true },
    humanVisualQa: {
      reviewedOn: "2026-08-26",
      result: "PASS",
      observations: [
        "StaRtMotionReelV1(motion-studio, out/motion-zukan-evidence/StaRtMotionReelV1.mp4)の全体frame112(区間内0.37秒)を目視。",
        "「START」の文字が太字serifでpunch表示されており、Mask Revealとは異なる出現方法であることを確認。",
        "signalstats YAVG=55.3(非ブランク)。文字・背景とも破綻なし。",
      ],
    },
    productionAuthority: false,
    notes: "実写真は未投入(DemoBackdropのplaceholder)。ローカルrender証拠であり永続artifactではない。",
  },
  {
    id: "evidence-photo-static-hero-concept-2026-08-26",
    previewId: "preview-photo-static-hero-concept",
    patternId: "photo-static-hero",
    classification: "CONCEPT",
    sourceType: "REPO_GENERATED",
    generatedAt: "2026-08-25T17:58:30Z",
    workflowRunId: null,
    artifactName: null,
    artifactDigest: "sha256:7897a3cc290e7dfcad260a296347512b4063fa7a7b3fa8a31b1a1f452bae36bc",
    artifactExpiresAt: null,
    persistentAssetPath: null,
    renderSpec: { codec: "h264", width: 960, height: 540, fps: 30, frames: 75, measuredDurationSeconds: 2.5 },
    automatedQa: { compositionContract: true, ffprobeVerified: true, renderedPixelOracle: true },
    humanVisualQa: {
      reviewedOn: "2026-08-26",
      result: "PASS",
      observations: [
        "全体frame187(区間内1.25秒)を目視。DemoBackdropが完全に静止しており、Static Heroの名の通りカメラ移動が入っていない。",
        "signalstats YAVG=54.4(非ブランク)。",
      ],
    },
    productionAuthority: false,
    notes: "実写真は未投入(DemoBackdropのplaceholder)。ローカルrender証拠であり永続artifactではない。",
  },
  {
    id: "evidence-photo-small-push-concept-2026-08-26",
    previewId: "preview-photo-small-push-concept",
    patternId: "photo-small-push",
    classification: "CONCEPT",
    sourceType: "REPO_GENERATED",
    generatedAt: "2026-08-25T17:58:30Z",
    workflowRunId: null,
    artifactName: null,
    artifactDigest: "sha256:7897a3cc290e7dfcad260a296347512b4063fa7a7b3fa8a31b1a1f452bae36bc",
    artifactExpiresAt: null,
    persistentAssetPath: null,
    renderSpec: { codec: "h264", width: 960, height: 540, fps: 30, frames: 75, measuredDurationSeconds: 2.5 },
    automatedQa: { compositionContract: true, ffprobeVerified: true, renderedPixelOracle: true },
    humanVisualQa: {
      reviewedOn: "2026-08-26",
      result: "PASS",
      observations: [
        "全体frame262(区間内1.25秒)を目視。photo-static-heroより枠がわずかに拡大しており、Small Push特有の控えめな寄りを確認。",
        "signalstats YAVG=54.5(非ブランク)。過度なズームではない。",
      ],
    },
    productionAuthority: false,
    notes: "実写真は未投入(DemoBackdropのplaceholder)。ローカルrender証拠であり永続artifactではない。",
  },
  {
    id: "evidence-wipe-route-line-concept-2026-08-26",
    previewId: "preview-wipe-route-line-concept",
    patternId: "wipe-route-line",
    classification: "CONCEPT",
    sourceType: "REPO_GENERATED",
    generatedAt: "2026-08-25T17:58:30Z",
    workflowRunId: null,
    artifactName: null,
    artifactDigest: "sha256:7897a3cc290e7dfcad260a296347512b4063fa7a7b3fa8a31b1a1f452bae36bc",
    artifactExpiresAt: null,
    persistentAssetPath: null,
    renderSpec: { codec: "h264", width: 960, height: 540, fps: 30, frames: 75, measuredDurationSeconds: 2.5 },
    automatedQa: { compositionContract: true, ffprobeVerified: true, renderedPixelOracle: true },
    humanVisualQa: {
      reviewedOn: "2026-08-26",
      result: "PASS",
      observations: [
        "全体frame337(区間内1.25秒)を目視。navyから暖色(黄系)へ切り替わる水平線状のwipe transitionの途中状態を確認。",
        "signalstats YAVG=193.9(wipe中の明るい色面のため一時的に高輝度。ブランク/破綻ではない)。",
        "この1frameだけではroute lineらしい線の軌跡までは判定できず、通し再生での確認が別途必要。",
      ],
    },
    productionAuthority: false,
    notes: "実写真は未投入(DemoBackdropのplaceholder)。ローカルrender証拠であり永続artifactではない。1frameのサンプルでは動きの全体像を保証しない。",
  },
  {
    id: "evidence-flash-one-frame-soft-concept-2026-08-26",
    previewId: "preview-flash-one-frame-soft-concept",
    patternId: "flash-one-frame-soft",
    classification: "CONCEPT",
    sourceType: "REPO_GENERATED",
    generatedAt: "2026-08-25T17:58:30Z",
    workflowRunId: null,
    artifactName: null,
    artifactDigest: "sha256:7897a3cc290e7dfcad260a296347512b4063fa7a7b3fa8a31b1a1f452bae36bc",
    artifactExpiresAt: null,
    persistentAssetPath: null,
    renderSpec: { codec: "h264", width: 960, height: 540, fps: 30, frames: 75, measuredDurationSeconds: 2.5 },
    automatedQa: { compositionContract: true, ffprobeVerified: true, renderedPixelOracle: true },
    humanVisualQa: {
      reviewedOn: "2026-08-26",
      result: "PASS",
      observations: [
        "全体frame412(区間内1.25秒)を目視。wipe-route-lineと同系統の暖色flashを確認。",
        "signalstats YAVG=193.9。淡いimpactというpurposeの記述と矛盾しない範囲。",
      ],
    },
    productionAuthority: false,
    notes: "実写真は未投入(DemoBackdropのplaceholder)。ローカルrender証拠であり永続artifactではない。",
  },
  {
    id: "evidence-accent-speed-lines-concept-2026-08-26",
    previewId: "preview-accent-speed-lines-concept",
    patternId: "accent-speed-lines",
    classification: "CONCEPT",
    sourceType: "REPO_GENERATED",
    generatedAt: "2026-08-25T17:58:30Z",
    workflowRunId: null,
    artifactName: null,
    artifactDigest: "sha256:7897a3cc290e7dfcad260a296347512b4063fa7a7b3fa8a31b1a1f452bae36bc",
    artifactExpiresAt: null,
    persistentAssetPath: null,
    renderSpec: { codec: "h264", width: 960, height: 540, fps: 30, frames: 75, measuredDurationSeconds: 2.5 },
    automatedQa: { compositionContract: true, ffprobeVerified: true, renderedPixelOracle: true },
    humanVisualQa: {
      reviewedOn: "2026-08-26",
      result: "PASS",
      observations: [
        "全体frame487(区間内1.25秒)を目視。DemoBackdrop周囲に複数の斜め線(speed lines)が表示されており、purposeの記述と一致。",
        "signalstats YAVG=55.5(非ブランク)。文字・ロゴ・人物は出ていない。",
      ],
    },
    productionAuthority: false,
    notes: "実写真は未投入(DemoBackdropのplaceholder)。ローカルrender証拠であり永続artifactではない。",
  },
  {
    id: "evidence-accent-stamp-triplet-concept-2026-08-26",
    previewId: "preview-accent-stamp-triplet-concept",
    patternId: "accent-stamp-triplet",
    classification: "CONCEPT",
    sourceType: "REPO_GENERATED",
    generatedAt: "2026-08-25T17:58:30Z",
    workflowRunId: null,
    artifactName: null,
    artifactDigest: "sha256:7897a3cc290e7dfcad260a296347512b4063fa7a7b3fa8a31b1a1f452bae36bc",
    artifactExpiresAt: null,
    persistentAssetPath: null,
    renderSpec: { codec: "h264", width: 960, height: 540, fps: 30, frames: 75, measuredDurationSeconds: 2.5 },
    automatedQa: { compositionContract: true, ffprobeVerified: true, renderedPixelOracle: true },
    humanVisualQa: {
      reviewedOn: "2026-08-26",
      result: "PASS",
      observations: [
        "全体frame562(区間内1.25秒)は3-hitの合間で写っていなかったため、区間内frame535/542/549を追加サンプルして再確認。",
        "画面左→中央→右へ移動する小さな円形スタンプが3回連続で現れることを確認(stamp triplet)。人物・文字・ロゴは映っていない。",
        "signalstats YAVGは54.4〜54.6でほぼ一定(スタンプ自体は小さく全体輝度への影響は小さい)。",
      ],
    },
    productionAuthority: false,
    notes: "実写真は未投入(DemoBackdropのplaceholder)。3-hitの合間を外した最初のサンプルではスタンプが写っていなかったため、区間内の複数frameを追加確認してPASSと判定した。",
  },
];

export function getLatestPreviewEvidence(previewId: string) {
  return motionPreviewEvidence.find((evidence) => evidence.previewId === previewId) ?? null;
}
