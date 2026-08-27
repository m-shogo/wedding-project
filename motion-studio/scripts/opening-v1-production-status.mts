import {createHash} from 'node:crypto';
import {spawnSync} from 'node:child_process';
import {existsSync, readFileSync} from 'node:fs';
import {dirname, join, relative} from 'node:path';
import {fileURLToPath} from 'node:url';

const studioRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const previewPath = join(studioRoot, 'out/preview/opening_v1_preview.mp4');
const previewReviewPath = join(studioRoot, 'out/qa/opening-v1-preview-review.json');
const finalRenderPath = join(studioRoot, 'out/opening/opening_v1.mp4');
const bundlePath = join(studioRoot, 'out/handoff/opening-v1/opening-v1-production-bundle.json');
const timelineCsvPath = join(studioRoot, 'out/handoff/opening-v1/opening-v1-palmier-timeline.csv');
const soundCueCsvPath = join(studioRoot, 'out/handoff/opening-v1/opening-v1-palmier-sound-cues.csv');
const davinciEvidencePath = join(studioRoot, 'out/qa/opening-v1-davinci-finishing-evidence.json');
const finalApprovalPath = join(studioRoot, 'out/qa/opening-v1-final-delivery-approval.json');
const jsonMode = process.argv.includes('--json');
const strict = process.argv.includes('--strict');

type StageState = 'PASS' | 'BLOCKED' | 'NOT_RUN' | 'MISSING' | 'STALE';
type OverallState =
  | 'MEDIA_REQUIRED'
  | 'PREVIEW_RENDER_REQUIRED'
  | 'PREVIEW_REVIEW_INIT_REQUIRED'
  | 'HUMAN_PREVIEW_REVIEW_REQUIRED_OR_STALE'
  | 'FINAL_RENDER_REQUIRED'
  | 'FINAL_RENDER_QA_FAILED'
  | 'PRODUCTION_BUNDLE_REQUIRED'
  | 'PRODUCTION_BUNDLE_STALE'
  | 'DAVINCI_EVIDENCE_INIT_REQUIRED'
  | 'DAVINCI_ACTUAL_REQUIRED_OR_STALE'
  | 'FINAL_DELIVERY_APPROVAL_INIT_REQUIRED'
  | 'FINAL_DELIVERY_APPROVAL_REQUIRED_OR_STALE'
  | 'PRODUCTION_READY';

type Stage = {
  state: StageState;
  detail: string;
  path?: string;
  blockers?: string[];
};

type AssemblyReport = {
  schemaVersion?: string;
  readiness?: {
    finalRenderEligible?: boolean;
    mixReady?: boolean;
    blockers?: string[];
    mixWarnings?: string[];
    renderQaState?: string;
    macDaVinciActualState?: string;
  };
  nextActions?: string[];
};

type ProductionBundle = {
  schemaVersion?: string;
  authority?: string;
  finalRender?: {path?: string; sha256?: string};
  humanPreviewReview?: {evidencePath?: string; evidenceSha256?: string};
  palmier?: {
    handoffContractVersion?: string;
    timelineCsv?: string;
    timelineCsvSha256?: string;
    soundCueCsv?: string;
    soundCueCsvSha256?: string;
  };
  davinci?: {expectedSha256?: string; productionReady?: boolean};
};

const rel = (path: string) => relative(studioRoot, path).replaceAll('\\', '/');
const shaFile = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');
const runNode = (script: string, args: string[] = []) => spawnSync(
  process.execPath,
  ['--no-warnings', script, ...args],
  {cwd: studioRoot, encoding: 'utf-8'},
);
const outputLines = (value: string | null | undefined) => (value ?? '')
  .split(/\r?\n/)
  .map((line) => line.trim())
  .filter(Boolean);

function readAssembly(): {stage: Stage; report: AssemblyReport | null} {
  const result = runNode('scripts/opening-v1-assembly-preflight.mts', ['--json']);
  if (result.status !== 0) {
    return {
      stage: {
        state: 'BLOCKED',
        detail: 'Opening V1 assembly preflight itself failed.',
        blockers: [...outputLines(result.stdout), ...outputLines(result.stderr)],
      },
      report: null,
    };
  }
  try {
    const report = JSON.parse(result.stdout) as AssemblyReport;
    if (report.schemaVersion !== 'opening-v1-assembly-preflight/v1') {
      return {
        stage: {state: 'BLOCKED', detail: `Unexpected assembly schema: ${report.schemaVersion ?? 'missing'}`},
        report,
      };
    }
    const ready = report.readiness?.finalRenderEligible === true;
    return {
      stage: {
        state: ready ? 'PASS' : 'BLOCKED',
        detail: ready
          ? `Real media gate passed${report.readiness?.mixReady ? ' and optional ambience mix is ready' : '; optional ambience mix is not fully ready'}.`
          : 'Real photos and/or cleared BGM are still missing.',
        blockers: ready ? (report.readiness?.mixWarnings ?? []) : (report.readiness?.blockers ?? []),
      },
      report,
    };
  } catch {
    return {
      stage: {
        state: 'BLOCKED',
        detail: 'Assembly preflight returned invalid JSON.',
        blockers: outputLines(result.stdout),
      },
      report: null,
    };
  }
}

function previewRenderStage(mediaReady: boolean): Stage {
  if (!mediaReady) {
    return {state: 'NOT_RUN', detail: 'Blocked upstream by real-media gate.', path: rel(previewPath)};
  }
  return existsSync(previewPath)
    ? {state: 'PASS', detail: 'Preview MP4 exists for human review.', path: rel(previewPath)}
    : {state: 'MISSING', detail: 'Render the current real-media preview.', path: rel(previewPath)};
}

function previewReviewStage(previewReady: boolean): Stage {
  if (!previewReady) {
    return {state: 'NOT_RUN', detail: 'Blocked upstream until the preview MP4 exists.', path: rel(previewReviewPath)};
  }
  if (!existsSync(previewReviewPath)) {
    return {
      state: 'MISSING',
      detail: 'Human review evidence has not been initialized for this preview.',
      path: rel(previewReviewPath),
    };
  }
  const result = runNode('scripts/opening-v1-preview-review.mts', ['--strict']);
  if (result.status === 0) {
    return {state: 'PASS', detail: 'Human preview review is current and fully PASS.', path: rel(previewReviewPath)};
  }
  return {
    state: 'BLOCKED',
    detail: 'Human preview review is incomplete, failed, or stale against current media/config.',
    path: rel(previewReviewPath),
    blockers: [...outputLines(result.stdout), ...outputLines(result.stderr)],
  };
}

function finalRenderStage(previewReviewReady: boolean): Stage {
  if (!previewReviewReady) {
    return {state: 'NOT_RUN', detail: 'Blocked upstream until current human preview review passes.', path: rel(finalRenderPath)};
  }
  if (!existsSync(finalRenderPath)) {
    return {state: 'MISSING', detail: 'Approved preview can now be rendered as the final Motion Studio MP4.', path: rel(finalRenderPath)};
  }
  const result = runNode('scripts/check-opening-render.mts', ['out/opening/opening_v1.mp4']);
  if (result.status === 0) {
    return {state: 'PASS', detail: 'Final render exists and passes the render QA contract.', path: rel(finalRenderPath)};
  }
  return {
    state: 'BLOCKED',
    detail: 'Final render exists but failed the render QA contract.',
    path: rel(finalRenderPath),
    blockers: [...outputLines(result.stdout), ...outputLines(result.stderr)],
  };
}

function bundleStage(finalRenderReady: boolean): Stage {
  if (!finalRenderReady) {
    return {state: 'NOT_RUN', detail: 'Blocked upstream until final render QA passes.', path: rel(bundlePath)};
  }
  if (!existsSync(bundlePath)) {
    return {state: 'MISSING', detail: 'Export the SHA-bound Palmier/DaVinci production bundle.', path: rel(bundlePath)};
  }

  const errors: string[] = [];
  let bundle: ProductionBundle;
  try {
    bundle = JSON.parse(readFileSync(bundlePath, 'utf8')) as ProductionBundle;
  } catch {
    return {state: 'STALE', detail: 'Production bundle is not valid JSON.', path: rel(bundlePath)};
  }
  if (bundle.schemaVersion !== 'opening-v1-production-bundle/v1') errors.push('BUNDLE_SCHEMA_MISMATCH');
  if (bundle.authority !== 'FINAL_RENDER_BOUND_HANDOFF') errors.push('BUNDLE_AUTHORITY_MISMATCH');
  const finalSha = shaFile(finalRenderPath);
  if (bundle.finalRender?.sha256 !== finalSha) errors.push('BUNDLE_FINAL_RENDER_SHA_STALE');
  if (bundle.davinci?.expectedSha256 !== finalSha) errors.push('BUNDLE_DAVINCI_EXPECTED_SHA_STALE');
  if (bundle.davinci?.productionReady !== false) errors.push('BUNDLE_MUST_FAIL_CLOSED');
  if (!existsSync(previewReviewPath)) errors.push('BUNDLE_PREVIEW_REVIEW_EVIDENCE_MISSING');
  else if (bundle.humanPreviewReview?.evidenceSha256 !== shaFile(previewReviewPath)) errors.push('BUNDLE_PREVIEW_REVIEW_SHA_STALE');
  if (bundle.palmier?.handoffContractVersion !== 'opening-v1-palmier-handoff/v2') errors.push('BUNDLE_PALMIER_HANDOFF_CONTRACT_STALE');
  if (bundle.palmier?.timelineCsv !== rel(timelineCsvPath)) errors.push('BUNDLE_PALMIER_TIMELINE_PATH_STALE');
  if (!existsSync(timelineCsvPath)) errors.push('BUNDLE_PALMIER_TIMELINE_MISSING');
  else if (bundle.palmier?.timelineCsvSha256 !== shaFile(timelineCsvPath)) errors.push('BUNDLE_PALMIER_TIMELINE_SHA_STALE');
  if (bundle.palmier?.soundCueCsv !== rel(soundCueCsvPath)) errors.push('BUNDLE_PALMIER_SOUND_CUE_PATH_STALE');
  if (!existsSync(soundCueCsvPath)) errors.push('BUNDLE_PALMIER_SOUND_CUE_MISSING');
  else if (bundle.palmier?.soundCueCsvSha256 !== shaFile(soundCueCsvPath)) errors.push('BUNDLE_PALMIER_SOUND_CUE_SHA_STALE');

  return errors.length === 0
    ? {state: 'PASS', detail: 'Production bundle is current against final render, human preview evidence and versioned Palmier scene/sound handoff.', path: rel(bundlePath)}
    : {state: 'STALE', detail: 'Production bundle must be regenerated from current approved artifacts and current Palmier handoff contract.', path: rel(bundlePath), blockers: errors};
}

function davinciStage(bundleReady: boolean): Stage {
  if (!bundleReady) {
    return {state: 'NOT_RUN', detail: 'Blocked upstream until the production bundle is current.', path: rel(davinciEvidencePath)};
  }
  if (!existsSync(davinciEvidencePath)) {
    return {
      state: 'MISSING',
      detail: 'Initialize bundle-bound DaVinci finishing evidence before the real Mac Resolve session.',
      path: rel(davinciEvidencePath),
    };
  }
  const result = runNode('scripts/opening-v1-davinci-finishing-evidence.mts', ['--strict']);
  if (result.status === 0) {
    return {
      state: 'PASS',
      detail: 'Current bundle has complete Mac DaVinci Actual finishing evidence.',
      path: rel(davinciEvidencePath),
    };
  }
  return {
    state: 'BLOCKED',
    detail: 'DaVinci finishing evidence is incomplete, failed, or stale. Do not promote it from CI.',
    path: rel(davinciEvidencePath),
    blockers: [...outputLines(result.stdout), ...outputLines(result.stderr)],
  };
}

function finalApprovalStage(davinciReady: boolean): Stage {
  if (!davinciReady) {
    return {state: 'NOT_RUN', detail: 'Blocked upstream until current Mac DaVinci Actual is verified.', path: rel(finalApprovalPath)};
  }
  if (!existsSync(finalApprovalPath)) {
    return {
      state: 'MISSING',
      detail: 'Initialize the human final delivery approval bound to the current DaVinci export.',
      path: rel(finalApprovalPath),
    };
  }
  const result = runNode('scripts/opening-v1-final-delivery-approval.mts', ['--strict']);
  if (result.status === 0) {
    return {
      state: 'PASS',
      detail: 'Current DaVinci export has explicit SHA-bound human final delivery approval.',
      path: rel(finalApprovalPath),
    };
  }
  return {
    state: 'BLOCKED',
    detail: 'Final delivery approval is HOLD, incomplete, failed, or stale against current upstream evidence.',
    path: rel(finalApprovalPath),
    blockers: [...outputLines(result.stdout), ...outputLines(result.stderr)],
  };
}

const assembly = readAssembly();
const mediaReady = assembly.stage.state === 'PASS';
const previewRender = previewRenderStage(mediaReady);
const previewReady = previewRender.state === 'PASS';
const previewReview = previewReviewStage(previewReady);
const previewReviewReady = previewReview.state === 'PASS';
const finalRender = finalRenderStage(previewReviewReady);
const finalRenderReady = finalRender.state === 'PASS';
const productionBundle = bundleStage(finalRenderReady);
const bundleReady = productionBundle.state === 'PASS';
const davinciFinishing = davinciStage(bundleReady);
const davinciReady = davinciFinishing.state === 'PASS';
const finalDeliveryApproval = finalApprovalStage(davinciReady);
const finalDeliveryApproved = finalDeliveryApproval.state === 'PASS';

let overallState: OverallState;
let nextActions: string[];
if (!mediaReady) {
  overallState = 'MEDIA_REQUIRED';
  nextActions = assembly.report?.nextActions ?? ['実写真/BGMのblocking mediaを揃える', 'pnpm opening:production-status'];
} else if (!previewReady) {
  overallState = 'PREVIEW_RENDER_REQUIRED';
  nextActions = ['pnpm render:opening-v1:preview', 'pnpm opening:production-status'];
} else if (previewReview.state === 'MISSING') {
  overallState = 'PREVIEW_REVIEW_INIT_REQUIRED';
  nextActions = ['pnpm opening:preview-review:init', '実preview/stillsを人間が確認してevidenceを記録', 'pnpm opening:preview-review:strict'];
} else if (!previewReviewReady) {
  overallState = 'HUMAN_PREVIEW_REVIEW_REQUIRED_OR_STALE';
  nextActions = ['現在のpreview/media/configに対してhuman QAを完了または再初期化', 'pnpm opening:preview-review:strict'];
} else if (finalRender.state === 'MISSING') {
  overallState = 'FINAL_RENDER_REQUIRED';
  nextActions = ['pnpm render:opening-v1', 'pnpm opening:production-status'];
} else if (!finalRenderReady) {
  overallState = 'FINAL_RENDER_QA_FAILED';
  nextActions = ['final render QA failureを修正', 'pnpm check:opening-render'];
} else if (productionBundle.state === 'MISSING') {
  overallState = 'PRODUCTION_BUNDLE_REQUIRED';
  nextActions = ['pnpm export:opening-v1-production-bundle', 'pnpm opening:production-status'];
} else if (!bundleReady) {
  overallState = 'PRODUCTION_BUNDLE_STALE';
  nextActions = ['現在のfinal render/human review/Palmier scene+sound handoffからproduction bundleを再生成', 'pnpm export:opening-v1-production-bundle'];
} else if (davinciFinishing.state === 'MISSING') {
  overallState = 'DAVINCI_EVIDENCE_INIT_REQUIRED';
  nextActions = ['pnpm opening:davinci-finishing:init', 'Mac DaVinci Resolveでbundle-bound Actualを実施', 'pnpm opening:davinci-finishing:strict'];
} else if (!davinciReady) {
  overallState = 'DAVINCI_ACTUAL_REQUIRED_OR_STALE';
  nextActions = ['Mac DaVinci Resolve Actualの未完了/FAIL/stale項目を解消', 'pnpm opening:davinci-finishing:strict'];
} else if (finalDeliveryApproval.state === 'MISSING') {
  overallState = 'FINAL_DELIVERY_APPROVAL_INIT_REQUIRED';
  nextActions = ['pnpm opening:final-delivery-approval:init', 'DaVinci final exportを人間が最終確認', 'approval artifactを明示APPROVEする'];
} else if (!finalDeliveryApproved) {
  overallState = 'FINAL_DELIVERY_APPROVAL_REQUIRED_OR_STALE';
  nextActions = ['current SHA-bound final delivery approvalを完了または再初期化', 'pnpm opening:final-delivery-approval:strict'];
} else {
  overallState = 'PRODUCTION_READY';
  nextActions = ['承認済みDaVinci export SHAを上映用正本として固定', '媒体コピー/会場再生テスト等の外部運用は別管理'];
}

const report = {
  schemaVersion: 'opening-v1-production-status/v1' as const,
  authority: 'DERIVED_PRODUCTION_STATUS' as const,
  overallState,
  stages: {
    media: assembly.stage,
    previewRender,
    previewReview,
    finalRender,
    productionBundle,
    davinciFinishing,
    finalDeliveryApproval,
  },
  readiness: {
    finalRenderEligible: assembly.report?.readiness?.finalRenderEligible === true,
    mixReady: assembly.report?.readiness?.mixReady === true,
    humanPreviewApproved: previewReviewReady,
    finalRenderQaPass: finalRenderReady,
    productionBundleCurrent: bundleReady,
    macDaVinciActualVerified: davinciReady,
    readyForFinalDeliveryApproval: davinciReady,
    finalDeliveryApproved,
    productionReady: finalDeliveryApproved,
  },
  nextActions,
  guardrails: [
    'DAVINCI_ACTUAL_VERIFIED != FINAL_DELIVERY_APPROVED',
    'APPROVAL_TEMPLATE != APPROVED',
    'MISSING_OR_STALE_UPSTREAM => DOWNSTREAM_NOT_TRUSTED',
    'PALMIER_HANDOFF_CONTRACT_VERSION_MISMATCH => PRODUCTION_BUNDLE_STALE',
    'PALMIER_TIMELINE_SHA_MISMATCH => PRODUCTION_BUNDLE_STALE',
    'PALMIER_SOUND_CUE_SHA_MISMATCH => PRODUCTION_BUNDLE_STALE',
    'CI_MUST_NOT_PROMOTE_MAC_GUI_ACTUAL',
    'CI_MUST_NOT_APPROVE_FINAL_DELIVERY',
  ],
};

if (jsonMode) {
  console.log(JSON.stringify(report, null, 2));
} else {
  console.log(`Opening V1 production status: ${overallState}`);
  for (const [name, stage] of Object.entries(report.stages)) {
    console.log(`${stage.state.padEnd(7)} / ${name} / ${stage.detail}`);
    for (const blocker of stage.blockers ?? []) console.log(`  BLOCK / ${blocker}`);
  }
  console.log(`readyForFinalDeliveryApproval=${report.readiness.readyForFinalDeliveryApproval ? 'YES' : 'NO'} finalDeliveryApproved=${finalDeliveryApproved ? 'YES' : 'NO'} productionReady=${finalDeliveryApproved ? 'YES' : 'NO'}`);
  console.log(`NEXT / ${nextActions.join(' → ')}`);
  console.log('JSON / pnpm opening:production-status -- --json');
}

if (strict && !finalDeliveryApproved) process.exit(1);
