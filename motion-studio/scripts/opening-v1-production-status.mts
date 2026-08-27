import {createHash} from 'node:crypto';
import {spawnSync} from 'node:child_process';
import {existsSync, readFileSync} from 'node:fs';
import {dirname, join, relative} from 'node:path';
import {fileURLToPath} from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const previewPath = join(root, 'out/preview/opening_v1_preview.mp4');
const previewSourcePath = join(root, 'out/qa/opening-v1-preview-source-fingerprint.json');
const previewReviewPath = join(root, 'out/qa/opening-v1-preview-review.json');
const finalPath = join(root, 'out/opening/opening_v1.mp4');
const finalReviewPath = join(root, 'out/qa/opening-v1-final-render-review.json');
const bundlePath = join(root, 'out/handoff/opening-v1/opening-v1-production-bundle.json');
const timelinePath = join(root, 'out/handoff/opening-v1/opening-v1-palmier-timeline.csv');
const soundCuePath = join(root, 'out/handoff/opening-v1/opening-v1-palmier-sound-cues.csv');
const davinciPath = join(root, 'out/qa/opening-v1-davinci-finishing-evidence.json');
const approvalPath = join(root, 'out/qa/opening-v1-final-delivery-approval.json');
const jsonMode = process.argv.includes('--json');
const strict = process.argv.includes('--strict');

type State = 'PASS' | 'BLOCKED' | 'NOT_RUN' | 'MISSING' | 'STALE';
type Stage = {state: State; detail: string; path?: string; blockers?: string[]};
type AssemblyReport = {
  schemaVersion?: string;
  readiness?: {finalRenderEligible?: boolean; mixReady?: boolean; blockers?: string[]; mixWarnings?: string[]};
  nextActions?: string[];
};
type ProductionBundle = {
  schemaVersion?: string;
  authority?: string;
  finalRender?: {path?: string; sha256?: string};
  humanPreviewReview?: {evidencePath?: string; evidenceSha256?: string};
  humanFinalRenderReview?: {evidencePath?: string; evidenceSha256?: string; finalRenderSha256?: string; renderSourceFingerprintSha256?: string};
  palmier?: {handoffContractVersion?: string; timelineCsv?: string; timelineCsvSha256?: string; soundCueCsv?: string; soundCueCsvSha256?: string};
  davinci?: {expectedSha256?: string; productionReady?: boolean};
};

const rel = (path: string) => relative(root, path).replaceAll('\\', '/');
const sha = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');
const run = (script: string, args: string[] = []) => spawnSync(process.execPath, ['--no-warnings', script, ...args], {cwd: root, encoding: 'utf8'});
const lines = (value: string | null | undefined) => (value ?? '').split(/\r?\n/).map((line) => line.trim()).filter(Boolean);

function readAssembly(): {stage: Stage; report: AssemblyReport | null} {
  const result = run('scripts/opening-v1-assembly-preflight.mts', ['--json']);
  if (result.status !== 0) return {stage: {state: 'BLOCKED', detail: 'Opening V1 assembly preflight itself failed.', blockers: [...lines(result.stdout), ...lines(result.stderr)]}, report: null};
  try {
    const report = JSON.parse(result.stdout) as AssemblyReport;
    if (report.schemaVersion !== 'opening-v1-assembly-preflight/v1') return {stage: {state: 'BLOCKED', detail: `Unexpected assembly schema: ${report.schemaVersion ?? 'missing'}`}, report};
    const ready = report.readiness?.finalRenderEligible === true;
    return {
      stage: {
        state: ready ? 'PASS' : 'BLOCKED',
        detail: ready ? `Real media gate passed${report.readiness?.mixReady ? ' and optional ambience mix is ready' : '; optional ambience mix is not fully ready'}.` : 'Real photos and/or cleared BGM are still missing.',
        blockers: ready ? (report.readiness?.mixWarnings ?? []) : (report.readiness?.blockers ?? []),
      },
      report,
    };
  } catch {
    return {stage: {state: 'BLOCKED', detail: 'Assembly preflight returned invalid JSON.', blockers: lines(result.stdout)}, report: null};
  }
}

const assembly = readAssembly();
const mediaReady = assembly.stage.state === 'PASS';
const previewRender: Stage = !mediaReady
  ? {state: 'NOT_RUN', detail: 'Blocked upstream by real-media gate.', path: rel(previewPath)}
  : existsSync(previewPath)
    ? {state: 'PASS', detail: 'Preview MP4 exists for human review.', path: rel(previewPath)}
    : {state: 'MISSING', detail: 'Render the current real-media preview.', path: rel(previewPath)};

const previewSourceBinding: Stage = previewRender.state !== 'PASS'
  ? {state: 'NOT_RUN', detail: 'Blocked upstream until the preview MP4 exists.', path: rel(previewSourcePath)}
  : !existsSync(previewSourcePath)
    ? {state: 'MISSING', detail: 'Preview exists but has no render-source fingerprint binding yet.', path: rel(previewSourcePath)}
    : (() => {
        const result = run('scripts/opening-v1-preview-source-fingerprint.mts', ['--strict']);
        return result.status === 0
          ? {state: 'PASS', detail: 'Preview MP4 is SHA-bound to the current Opening render implementation.', path: rel(previewSourcePath)}
          : {state: 'STALE', detail: 'Preview render-source binding is stale. Re-render before trusting human review.', path: rel(previewSourcePath), blockers: [...lines(result.stdout), ...lines(result.stderr)]};
      })();

const previewReview: Stage = previewSourceBinding.state !== 'PASS'
  ? {state: 'NOT_RUN', detail: 'Blocked upstream until the preview render-source binding is current.', path: rel(previewReviewPath)}
  : !existsSync(previewReviewPath)
    ? {state: 'MISSING', detail: 'Human review evidence has not been initialized for this source-bound preview.', path: rel(previewReviewPath)}
    : (() => {
        const result = run('scripts/opening-v1-preview-review.mts', ['--strict']);
        return result.status === 0
          ? {state: 'PASS', detail: 'Human preview review is current and fully PASS.', path: rel(previewReviewPath)}
          : {state: 'BLOCKED', detail: 'Human preview review is incomplete, failed, or stale against current media/config.', path: rel(previewReviewPath), blockers: [...lines(result.stdout), ...lines(result.stderr)]};
      })();

const finalRender: Stage = previewReview.state !== 'PASS'
  ? {state: 'NOT_RUN', detail: 'Blocked upstream until current human preview review passes.', path: rel(finalPath)}
  : !existsSync(finalPath)
    ? {state: 'MISSING', detail: 'Approved preview can now be rendered as the final Motion Studio MP4.', path: rel(finalPath)}
    : (() => {
        const result = run('scripts/check-opening-render.mts', ['out/opening/opening_v1.mp4']);
        return result.status === 0
          ? {state: 'PASS', detail: 'Final render exists and passes the render QA contract.', path: rel(finalPath)}
          : {state: 'BLOCKED', detail: 'Final render exists but failed the render QA contract.', path: rel(finalPath), blockers: [...lines(result.stdout), ...lines(result.stderr)]};
      })();

const finalRenderReview: Stage = finalRender.state !== 'PASS'
  ? {state: 'NOT_RUN', detail: 'Blocked upstream until final render technical QA passes.', path: rel(finalReviewPath)}
  : !existsSync(finalReviewPath)
    ? {state: 'MISSING', detail: 'Initialize Human final-render review for the current final MP4.', path: rel(finalReviewPath)}
    : (() => {
        const result = run('scripts/opening-v1-final-render-review.mts', ['--strict']);
        return result.status === 0
          ? {state: 'PASS', detail: 'Human final-render review is current and fully PASS.', path: rel(finalReviewPath)}
          : {state: 'BLOCKED', detail: 'Human final-render review is incomplete, failed, or stale against current final MP4/render source.', path: rel(finalReviewPath), blockers: [...lines(result.stdout), ...lines(result.stderr)]};
      })();

let productionBundle: Stage;
if (finalRenderReview.state !== 'PASS') {
  productionBundle = {state: 'NOT_RUN', detail: 'Blocked until current Human final-render review passes.', path: rel(bundlePath)};
} else if (!existsSync(bundlePath)) {
  productionBundle = {state: 'MISSING', detail: 'Export the SHA-bound Palmier/DaVinci production bundle.', path: rel(bundlePath)};
} else {
  const errors: string[] = [];
  try {
    const bundle = JSON.parse(readFileSync(bundlePath, 'utf8')) as ProductionBundle;
    if (bundle.schemaVersion !== 'opening-v1-production-bundle/v1') errors.push('BUNDLE_SCHEMA_MISMATCH');
    if (bundle.authority !== 'FINAL_RENDER_BOUND_HANDOFF') errors.push('BUNDLE_AUTHORITY_MISMATCH');
    const finalSha = sha(finalPath);
    if (bundle.finalRender?.sha256 !== finalSha) errors.push('BUNDLE_FINAL_RENDER_SHA_STALE');
    if (bundle.davinci?.expectedSha256 !== finalSha) errors.push('BUNDLE_DAVINCI_EXPECTED_SHA_STALE');
    if (bundle.davinci?.productionReady !== false) errors.push('BUNDLE_MUST_FAIL_CLOSED');
    if (!existsSync(previewReviewPath)) errors.push('BUNDLE_PREVIEW_REVIEW_EVIDENCE_MISSING');
    else if (bundle.humanPreviewReview?.evidenceSha256 !== sha(previewReviewPath)) errors.push('BUNDLE_PREVIEW_REVIEW_SHA_STALE');
    if (!existsSync(finalReviewPath)) errors.push('BUNDLE_FINAL_REVIEW_EVIDENCE_MISSING');
    else {
      const finalReviewSha = sha(finalReviewPath);
      if (bundle.humanFinalRenderReview?.evidencePath !== rel(finalReviewPath)) errors.push('BUNDLE_FINAL_REVIEW_PATH_STALE');
      if (bundle.humanFinalRenderReview?.evidenceSha256 !== finalReviewSha) errors.push('BUNDLE_FINAL_REVIEW_SHA_STALE');
      if (bundle.humanFinalRenderReview?.finalRenderSha256 !== finalSha) errors.push('BUNDLE_FINAL_REVIEW_RENDER_SHA_STALE');
    }
    if (bundle.palmier?.handoffContractVersion !== 'opening-v1-palmier-handoff/v2') errors.push('BUNDLE_PALMIER_HANDOFF_CONTRACT_STALE');
    if (bundle.palmier?.timelineCsv !== rel(timelinePath)) errors.push('BUNDLE_PALMIER_TIMELINE_PATH_STALE');
    if (!existsSync(timelinePath)) errors.push('BUNDLE_PALMIER_TIMELINE_MISSING');
    else if (bundle.palmier?.timelineCsvSha256 !== sha(timelinePath)) errors.push('BUNDLE_PALMIER_TIMELINE_SHA_STALE');
    if (bundle.palmier?.soundCueCsv !== rel(soundCuePath)) errors.push('BUNDLE_PALMIER_SOUND_CUE_PATH_STALE');
    if (!existsSync(soundCuePath)) errors.push('BUNDLE_PALMIER_SOUND_CUE_MISSING');
    else if (bundle.palmier?.soundCueCsvSha256 !== sha(soundCuePath)) errors.push('BUNDLE_PALMIER_SOUND_CUE_SHA_STALE');
  } catch {
    errors.push('BUNDLE_INVALID_JSON');
  }
  productionBundle = errors.length === 0
    ? {state: 'PASS', detail: 'Production bundle is current against final render, Human preview/final reviews and versioned Palmier scene/sound handoff.', path: rel(bundlePath)}
    : {state: 'STALE', detail: 'Production bundle must be regenerated from current approved artifacts and current Palmier handoff contract.', path: rel(bundlePath), blockers: errors};
}

const davinciFinishing: Stage = productionBundle.state !== 'PASS'
  ? {state: 'NOT_RUN', detail: 'Blocked upstream until the production bundle is current.', path: rel(davinciPath)}
  : !existsSync(davinciPath)
    ? {state: 'MISSING', detail: 'Initialize bundle-bound DaVinci finishing evidence before the real Mac Resolve session.', path: rel(davinciPath)}
    : (() => {
        const result = run('scripts/opening-v1-davinci-finishing-evidence.mts', ['--strict']);
        return result.status === 0
          ? {state: 'PASS', detail: 'Current bundle has complete Mac DaVinci Actual finishing evidence.', path: rel(davinciPath)}
          : {state: 'BLOCKED', detail: 'DaVinci finishing evidence is incomplete, failed, or stale. Do not promote it from CI.', path: rel(davinciPath), blockers: [...lines(result.stdout), ...lines(result.stderr)]};
      })();

const finalDeliveryApproval: Stage = davinciFinishing.state !== 'PASS'
  ? {state: 'NOT_RUN', detail: 'Blocked upstream until current Mac DaVinci Actual is verified.', path: rel(approvalPath)}
  : !existsSync(approvalPath)
    ? {state: 'MISSING', detail: 'Initialize the human final delivery approval bound to the current DaVinci export.', path: rel(approvalPath)}
    : (() => {
        const result = run('scripts/opening-v1-final-delivery-approval.mts', ['--strict']);
        return result.status === 0
          ? {state: 'PASS', detail: 'Current DaVinci export has explicit SHA-bound human final delivery approval.', path: rel(approvalPath)}
          : {state: 'BLOCKED', detail: 'Final delivery approval is HOLD, incomplete, failed, or stale against current upstream evidence.', path: rel(approvalPath), blockers: [...lines(result.stdout), ...lines(result.stderr)]};
      })();

const previewReady = previewRender.state === 'PASS';
const previewSourceReady = previewSourceBinding.state === 'PASS';
const previewReviewReady = previewReview.state === 'PASS';
const finalReady = finalRender.state === 'PASS';
const finalReviewReady = finalRenderReview.state === 'PASS';
const bundleReady = productionBundle.state === 'PASS';
const davinciReady = davinciFinishing.state === 'PASS';
const approved = finalDeliveryApproval.state === 'PASS';

let overallState: string;
let nextActions: string[];
if (!mediaReady) {overallState = 'MEDIA_REQUIRED'; nextActions = assembly.report?.nextActions ?? ['実写真/BGMのblocking mediaを揃える', 'pnpm opening:production-status'];}
else if (!previewReady) {overallState = 'PREVIEW_RENDER_REQUIRED'; nextActions = ['pnpm render:opening-v1:preview', 'pnpm opening:production-status'];}
else if (!previewSourceReady) {overallState = 'PREVIEW_SOURCE_BINDING_REQUIRED_OR_STALE'; nextActions = ['pnpm opening:preview-review:init', 'pnpm opening:preview-review:strict'];}
else if (previewReview.state === 'MISSING') {overallState = 'PREVIEW_REVIEW_INIT_REQUIRED'; nextActions = ['pnpm opening:preview-review:init', '実preview/stillsを人間が確認してevidenceを記録', 'pnpm opening:preview-review:strict'];}
else if (!previewReviewReady) {overallState = 'HUMAN_PREVIEW_REVIEW_REQUIRED_OR_STALE'; nextActions = ['現在のsource-bound preview/media/configに対してHuman QAを完了または再初期化', 'pnpm opening:preview-review:strict'];}
else if (finalRender.state === 'MISSING') {overallState = 'FINAL_RENDER_REQUIRED'; nextActions = ['pnpm render:opening-v1', 'pnpm opening:production-status'];}
else if (!finalReady) {overallState = 'FINAL_RENDER_QA_FAILED'; nextActions = ['final render QA failureを修正', 'pnpm check:opening-render'];}
else if (finalRenderReview.state === 'MISSING') {overallState = 'FINAL_RENDER_REVIEW_INIT_REQUIRED'; nextActions = ['pnpm opening:final-render-review:init', 'final MP4を音声付きで人間確認', 'pnpm opening:final-render-review:strict'];}
else if (!finalReviewReady) {overallState = 'HUMAN_FINAL_RENDER_REVIEW_REQUIRED_OR_STALE'; nextActions = ['current final MP4 / render sourceに対するHuman final-render QAを完了または再初期化', 'pnpm opening:final-render-review:strict'];}
else if (productionBundle.state === 'MISSING') {overallState = 'PRODUCTION_BUNDLE_REQUIRED'; nextActions = ['pnpm export:opening-v1-production-bundle', 'pnpm opening:production-status'];}
else if (!bundleReady) {overallState = 'PRODUCTION_BUNDLE_STALE'; nextActions = ['現在のfinal render/Human preview+final review/Palmier scene+sound handoffからproduction bundleを再生成', 'pnpm export:opening-v1-production-bundle'];}
else if (davinciFinishing.state === 'MISSING') {overallState = 'DAVINCI_EVIDENCE_INIT_REQUIRED'; nextActions = ['pnpm opening:davinci-finishing:init', 'Mac DaVinci Resolveでbundle-bound Actualを実施', 'pnpm opening:davinci-finishing:strict'];}
else if (!davinciReady) {overallState = 'DAVINCI_ACTUAL_REQUIRED_OR_STALE'; nextActions = ['Mac DaVinci Resolve Actualの未完了/FAIL/stale項目を解消', 'pnpm opening:davinci-finishing:strict'];}
else if (finalDeliveryApproval.state === 'MISSING') {overallState = 'FINAL_DELIVERY_APPROVAL_INIT_REQUIRED'; nextActions = ['pnpm opening:final-delivery-approval:init', 'DaVinci final exportを人間が最終確認', 'pnpm opening:final-delivery-approval:strict'];}
else if (!approved) {overallState = 'FINAL_DELIVERY_APPROVAL_REQUIRED_OR_STALE'; nextActions = ['current SHA-bound final delivery approvalを完了または再初期化', 'pnpm opening:final-delivery-approval:strict'];}
else {overallState = 'PRODUCTION_READY'; nextActions = ['承認済みDaVinci export SHAを上映用正本として固定', '媒体コピー/会場再生テスト等の外部運用は別管理'];}

const report = {
  schemaVersion: 'opening-v1-production-status/v1' as const,
  authority: 'DERIVED_PRODUCTION_STATUS' as const,
  overallState,
  stages: {media: assembly.stage, previewRender, previewSourceBinding, previewReview, finalRender, finalRenderReview, productionBundle, davinciFinishing, finalDeliveryApproval},
  readiness: {
    finalRenderEligible: assembly.report?.readiness?.finalRenderEligible === true,
    mixReady: assembly.report?.readiness?.mixReady === true,
    previewSourceBound: previewSourceReady,
    humanPreviewApproved: previewReviewReady,
    finalRenderQaPass: finalReady,
    humanFinalRenderApproved: finalReviewReady,
    productionBundleCurrent: bundleReady,
    macDaVinciActualVerified: davinciReady,
    readyForFinalDeliveryApproval: davinciReady,
    finalDeliveryApproved: approved,
    productionReady: approved,
  },
  handoff: {
    palmier: {
      contractVersion: 'opening-v1-palmier-handoff/v2' as const,
      current: bundleReady,
      sourceAuthorities: ['src/data/openingV1.ts#openingV1Scenes', 'src/data/openingV1Sound.ts#openingV1SoundCues', 'out/qa/opening-v1-final-render-review.json'],
      artifacts: {
        sceneTimeline: {path: rel(timelinePath), shaBound: true, carries: ['scene_boundary', 'replacement_policy', 'final_render_sha256']},
        soundCues: {path: rel(soundCuePath), shaBound: true, carries: ['bgm', 'ambience_j_cut', 'start_end', 'volume', 'note', 'final_render_sha256']},
      },
    },
  },
  nextActions,
  guardrails: [
    'PREVIEW_SOURCE_FINGERPRINT_STALE => HUMAN_PREVIEW_REVIEW_NOT_TRUSTED',
    'HUMAN_PREVIEW_REVIEW_PASS != HUMAN_FINAL_RENDER_REVIEW_PASS',
    'FINAL_RENDER_OR_RENDER_SOURCE_CHANGED => HUMAN_FINAL_RENDER_REVIEW_STALE',
    'FINAL_RENDER_REVIEW_EVIDENCE_SHA_MISMATCH => PRODUCTION_BUNDLE_STALE',
    'DAVINCI_ACTUAL_VERIFIED != FINAL_DELIVERY_APPROVED',
    'APPROVAL_TEMPLATE != APPROVED',
    'MISSING_OR_STALE_UPSTREAM => DOWNSTREAM_NOT_TRUSTED',
    'HANDOFF_METADATA_EXPORTED != HANDOFF_ARTIFACTS_CURRENT',
    'PALMIER_HANDOFF_CONTRACT_VERSION_MISMATCH => PRODUCTION_BUNDLE_STALE',
    'PALMIER_TIMELINE_SHA_MISMATCH => PRODUCTION_BUNDLE_STALE',
    'PALMIER_SOUND_CUE_SHA_MISMATCH => PRODUCTION_BUNDLE_STALE',
    'CI_MUST_NOT_PROMOTE_MAC_GUI_ACTUAL',
    'CI_MUST_NOT_APPROVE_FINAL_DELIVERY',
  ],
};

if (jsonMode) console.log(JSON.stringify(report, null, 2));
else {
  console.log(`Opening V1 production status: ${overallState}`);
  for (const [name, stage] of Object.entries(report.stages)) {
    console.log(`${stage.state.padEnd(7)} / ${name} / ${stage.detail}`);
    for (const blocker of stage.blockers ?? []) console.log(`  BLOCK / ${blocker}`);
  }
  console.log(`Palmier handoff=${report.handoff.palmier.contractVersion} current=${report.handoff.palmier.current ? 'YES' : 'NO'} timeline=${report.handoff.palmier.artifacts.sceneTimeline.path} sound=${report.handoff.palmier.artifacts.soundCues.path}`);
  console.log(`previewSourceBound=${report.readiness.previewSourceBound ? 'YES' : 'NO'} humanFinalRenderApproved=${report.readiness.humanFinalRenderApproved ? 'YES' : 'NO'} readyForFinalDeliveryApproval=${report.readiness.readyForFinalDeliveryApproval ? 'YES' : 'NO'} finalDeliveryApproved=${approved ? 'YES' : 'NO'} productionReady=${approved ? 'YES' : 'NO'}`);
  console.log(`NEXT / ${nextActions.join(' → ')}`);
  console.log('JSON / pnpm opening:production-status -- --json');
}
if (strict && !approved) process.exit(1);
