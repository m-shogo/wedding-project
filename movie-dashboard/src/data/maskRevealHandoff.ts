import {
  buildMaskRevealPromptOutputs,
  type MaskRevealPromptInput,
} from "./visualMotionLibrary";

export interface MotionVerificationEvidenceTemplateV1 {
  schemaVersion: "motion-verification/v1";
  patternId: "type-mask-reveal";
  markerId: string;
  sampleAssetSetId: "sample-typography-welcome-v1";
  implementationId: "impl-type-mask-reveal-davinci-text-plus";
  status: "PENDING_LOCAL_DAVINCI";
  targetPreviewSourceType: "ACTUAL_DAVINCI_RENDER";
  candidatePreviewAssetPath: null;
  renderSha256: null;
  renderedAt: null;
  resolveVersion: null;
  renderSpec: {
    width: 1280;
    height: 720;
    fps: 30;
    durationSeconds: 4;
    muted: true;
  };
  checks: {
    openedInDavinci: false;
    implementationApplied: false;
    renderTested: false;
    visualQa1x: false;
    visualQaHalfSpeed: false;
    resolveVersionRecorded: false;
    sampleAssetSetMatched: false;
    conceptPreviewKeptSeparate: false;
  };
  productionReady: false;
  notes: string;
}

export interface MotionHandoffManifestV1 {
  schemaVersion: "motion-handoff/v1";
  patternId: "type-mask-reveal";
  project: {
    section: MaskRevealPromptInput["section"];
    markerId: string;
    text: string;
    mediaLabel: string;
    durationSeconds: number;
    intensity: MaskRevealPromptInput["intensity"];
  };
  timeline: {
    producer: "Palmier";
    expectedFormat: "NLE_XML";
    companionFileName: string;
    xmlGeneratedExternally: true;
    rule: string;
  };
  palmier: {
    capability: "PALMIER_TIMING_ONLY";
    responsibility: "ROUGH_TIMING_AND_PLACEMENT";
    instruction: string;
  };
  davinci: {
    implementationId: "impl-type-mask-reveal-davinci-text-plus";
    responsibility: "FINAL_MOTION_AND_RENDER";
    finishManifest: string;
    resolveVersion: null;
    requiredVerification: readonly [
      "opened-in-davinci",
      "implementation-applied",
      "render-tested",
      "visual-QA",
      "resolve-version-recorded",
    ];
  };
  preview: {
    currentStatus: "CONCEPT";
    canonicalTarget: "ACTUAL_DAVINCI_RENDER";
    productionReady: false;
  };
  verificationEvidence: MotionVerificationEvidenceTemplateV1;
}

export interface MaskRevealExecutionOutputs {
  nleXmlHandoff: string;
  verificationChecklist: string;
}

function markerIdFor(section: MaskRevealPromptInput["section"]) {
  return `VML_MASK_REVEAL_${section}`;
}

export function buildMaskRevealMotionHandoffManifest(input: MaskRevealPromptInput): MotionHandoffManifestV1 {
  const outputs = buildMaskRevealPromptOutputs(input);
  const text = input.text.trim().slice(0, 24) || "WELCOME";
  const mediaLabel = input.mediaLabel?.trim() || "選択したHero写真";
  const durationSeconds = Math.max(0.4, Math.min(3, input.durationSeconds));
  const markerId = markerIdFor(input.section);

  return {
    schemaVersion: "motion-handoff/v1",
    patternId: "type-mask-reveal",
    project: {
      section: input.section,
      markerId,
      text,
      mediaLabel,
      durationSeconds,
      intensity: input.intensity,
    },
    timeline: {
      producer: "Palmier",
      expectedFormat: "NLE_XML",
      companionFileName: "palmier-mask-reveal-timeline.xml",
      xmlGeneratedExternally: true,
      rule: "Palmierが実timelineから書き出したNLE XMLを正本にする。このアプリはXMLを捏造・再実装せず、同じmarkerIdを持つsidecar manifestだけを生成する。",
    },
    palmier: {
      capability: "PALMIER_TIMING_ONLY",
      responsibility: "ROUGH_TIMING_AND_PLACEMENT",
      instruction: outputs.palmierInstruction,
    },
    davinci: {
      implementationId: "impl-type-mask-reveal-davinci-text-plus",
      responsibility: "FINAL_MOTION_AND_RENDER",
      finishManifest: outputs.davinciFinishManifest,
      resolveVersion: null,
      requiredVerification: [
        "opened-in-davinci",
        "implementation-applied",
        "render-tested",
        "visual-QA",
        "resolve-version-recorded",
      ],
    },
    preview: {
      currentStatus: "CONCEPT",
      canonicalTarget: "ACTUAL_DAVINCI_RENDER",
      productionReady: false,
    },
    verificationEvidence: {
      schemaVersion: "motion-verification/v1",
      patternId: "type-mask-reveal",
      markerId,
      sampleAssetSetId: "sample-typography-welcome-v1",
      implementationId: "impl-type-mask-reveal-davinci-text-plus",
      status: "PENDING_LOCAL_DAVINCI",
      targetPreviewSourceType: "ACTUAL_DAVINCI_RENDER",
      candidatePreviewAssetPath: null,
      renderSha256: null,
      renderedAt: null,
      resolveVersion: null,
      renderSpec: {
        width: 1280,
        height: 720,
        fps: 30,
        durationSeconds: 4,
        muted: true,
      },
      checks: {
        openedInDavinci: false,
        implementationApplied: false,
        renderTested: false,
        visualQa1x: false,
        visualQaHalfSpeed: false,
        resolveVersionRecorded: false,
        sampleAssetSetMatched: false,
        conceptPreviewKeptSeparate: false,
      },
      productionReady: false,
      notes: "Actual DaVinci render後に実測値だけを記録する。未実行項目をtrueにしない。",
    },
  };
}

export function buildMaskRevealExecutionOutputs(input: MaskRevealPromptInput): MaskRevealExecutionOutputs {
  const manifest = buildMaskRevealMotionHandoffManifest(input);
  const markerId = manifest.project.markerId;

  return {
    nleXmlHandoff: [
      "Palmier → DaVinci NLE XML Handoff",
      `1. Palmierでrough timing/orderを確定し、対象title位置を ${markerId} として識別する。`,
      `2. 実timelineから ${manifest.timeline.companionFileName} をDaVinci互換NLE XMLとして書き出す。`,
      "3. DaVinci ResolveへXMLをimportし、media relink / clip order / title timingを確認する。",
      `4. ${markerId} の対象区間へ専用title trackでText+ Mask Revealを適用する。`,
      "5. Palmier側で代替effectを焼き込まない。最終motion authorityはDaVinciに置く。",
      "6. XMLとmask-reveal-motion-handoff.jsonを必ずセットで扱う。",
    ].join("\n"),
    verificationChecklist: [
      "Mask Reveal completion gate",
      `[ ] Palmier rough timingを作成し、${markerId} の対象区間を保持`,
      `[ ] ${manifest.timeline.companionFileName} をPalmier実timelineからexport`,
      "[ ] DaVinci ResolveへXMLをimportし、media relink / timingを確認",
      "[ ] Text+ + rectangular mask + keyframe easingで実装",
      "[ ] 1280x720 / 30fps / WELCOME共通sampleでActual renderを書き出す",
      "[ ] Concept Previewとは別assetとしてActual Previewを登録",
      "[ ] local Resolve versionを記録",
      "[ ] 通常速度と0.5xでVisual QA",
      "[ ] Motion Handoff Manifest JSONのverificationEvidenceを実測値で埋める",
      "[ ] false/nullの未確認項目が残る間はProduction Readyへ昇格しない",
      "[ ] 全gate通過後だけTESTED / PRODUCTION_READYへ昇格判断",
    ].join("\n"),
  };
}

export function buildMaskRevealMotionHandoffJson(input: MaskRevealPromptInput) {
  return JSON.stringify(buildMaskRevealMotionHandoffManifest(input), null, 2);
}
