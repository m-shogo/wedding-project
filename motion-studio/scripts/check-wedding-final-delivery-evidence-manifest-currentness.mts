import {createHash} from 'node:crypto';
import {mkdirSync, rmSync, writeFileSync} from 'node:fs';
import {join} from 'node:path';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';

const root = join(fileURLToPath(new URL('..', import.meta.url)));
const manifestPath = join(root, 'out/handoff/wedding/wedding-final-delivery-evidence-manifest-currentness-fixture.json');
mkdirSync(join(root, 'out/handoff/wedding'), {recursive: true});
const shaJson = (value: unknown) => createHash('sha256').update(JSON.stringify(value)).digest('hex');

const project = (movieId: string) => {
  const evidence = {
    movieId,
    recoverySha256: `${movieId}-recovery-aaaaaaaaaaaaaaaa`, sourceRenderSha256: `${movieId}-render-bbbbbbbbbbbbbbbb`,
    davinciActualEvidenceSha256: `${movieId}-actual-cccccccccccccccc`, transitionActualEvidenceSha256: `${movieId}-transition-dddddddddddd`,
    transitionProofSha256: `${movieId}-proof-eeeeeeeeeeeeeeee`, davinciActualCompletionReceiptSha256: `${movieId}-completion-ffffffffffff`,
    finalApprovalSha256: `${movieId}-approval-11111111111111`, finalApprovalCompletionBindingSha256: `${movieId}-binding-222222222222222`,
    transitionGateState: 'CURRENT', actualCompletionGateState: 'CURRENT', finalApprovalCompletionGateState: 'CURRENT',
  };
  return {...evidence, evidenceChainSha256: shaJson(evidence)};
};

// Currentness verifier is primarily integration-tested against the canonical live generator.
// This self-test covers fail-closed transport states without fabricating GUI Actual evidence.
const missing = spawnSync(process.execPath, ['--no-warnings', 'scripts/wedding-final-delivery-evidence-manifest-currentness.mts', '--manifest=out/handoff/wedding/definitely-missing-manifest.json', '--json'], {cwd: root, encoding: 'utf8'});
if (missing.status !== 0) throw new Error('Non-strict missing manifest audit must report NOT_RUN');
const missingReport = JSON.parse(missing.stdout);
if (missingReport.state !== 'NOT_RUN' || missingReport.current !== false || !missingReport.mismatches.includes('FINAL_DELIVERY_EVIDENCE_MANIFEST_MISSING')) throw new Error('Missing manifest must stay NOT_RUN');
const missingStrict = spawnSync(process.execPath, ['--no-warnings', 'scripts/wedding-final-delivery-evidence-manifest-currentness.mts', '--manifest=out/handoff/wedding/definitely-missing-manifest.json', '--strict-current'], {cwd: root, encoding: 'utf8'});
if (missingStrict.status === 0) throw new Error('Strict currentness must fail without a manifest');

const carriedCore = {
  schemaVersion: 'wedding-final-delivery-evidence-manifest/v1', authority: 'DERIVED_FINAL_DELIVERY_EVIDENCE_MANIFEST',
  readinessSource: 'synthetic-currentness-contract', readinessSha256: 'synthetic-readiness-sha', opening: project('opening'), profile: project('profile'),
  evidenceBoundary: {macRemotionStudioGuiActual: 'NOT_PROMOTED_BY_MANIFEST', palmierGuiActual: 'NOT_PROMOTED_BY_MANIFEST', macDavinciResolveGuiActual: 'NOT_PROMOTED_BY_MANIFEST', humanFinalApproval: 'NOT_PROMOTED_BY_MANIFEST'},
  guardrails: ['SYNTHETIC_CONTRACT_ONLY'],
};
const carried = {...carriedCore, manifestSha256: shaJson(carriedCore)};
writeFileSync(manifestPath, `${JSON.stringify(carried, null, 2)}\n`);

// On a fresh clone live readiness is deliberately not READY, so a transported READY-looking manifest must be STALE, never promoted.
const stale = spawnSync(process.execPath, ['--no-warnings', 'scripts/wedding-final-delivery-evidence-manifest-currentness.mts', '--manifest=out/handoff/wedding/wedding-final-delivery-evidence-manifest-currentness-fixture.json', '--json'], {cwd: root, encoding: 'utf8'});
if (stale.status !== 0) throw new Error(stale.stderr || stale.stdout || 'Non-strict currentness audit must report stale');
const staleReport = JSON.parse(stale.stdout);
if (staleReport.state !== 'STALE' || staleReport.current !== false || !staleReport.mismatches.includes('LIVE_FINAL_DELIVERY_CHAIN_NO_LONGER_READY')) throw new Error(`Synthetic transported READY manifest must fail against fresh-clone live chain: ${stale.stdout}`);
if (staleReport.evidenceBoundary.macDavinciResolveGuiActual !== 'NOT_PROMOTED_BY_CURRENTNESS_AUDIT') throw new Error('Currentness audit promoted GUI Actual');
const staleStrict = spawnSync(process.execPath, ['--no-warnings', 'scripts/wedding-final-delivery-evidence-manifest-currentness.mts', '--manifest=out/handoff/wedding/wedding-final-delivery-evidence-manifest-currentness-fixture.json', '--strict-current'], {cwd: root, encoding: 'utf8'});
if (staleStrict.status === 0) throw new Error('Strict currentness must fail when live final delivery chain is not READY');

rmSync(manifestPath, {force: true});
console.log('Wedding final delivery evidence manifest currentness contract OK: missing=NOT_RUN; transported READY-looking evidence becomes STALE against non-ready live chain; strict fail-close; GUI Actual not promoted');
