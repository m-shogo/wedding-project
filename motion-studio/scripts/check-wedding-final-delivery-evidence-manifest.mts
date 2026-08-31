import {mkdirSync, rmSync, writeFileSync} from 'node:fs';
import {join} from 'node:path';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';

const root = join(fileURLToPath(new URL('..', import.meta.url)));
const fixture = join(root, 'out/qa/wedding-final-delivery-evidence-manifest-fixture.json');
mkdirSync(join(root, 'out/qa'), {recursive: true});

const project = (movieId: string) => ({
  ready: true,
  handoffIdentitySha256: `${movieId}-recovery-aaaaaaaaaaaaaaaa`,
  sourceRenderSha256: `${movieId}-render-bbbbbbbbbbbbbbbb`,
  transitionGate: {current: true, state: 'CURRENT'},
  transitionActualEvidenceSha256: `${movieId}-transition-cccccccccccc`,
  transitionProofSha256: `${movieId}-proof-dddddddddddddddd`,
  completionGate: {current: true, state: 'CURRENT'},
  davinciActualCompletionReceiptSha256: `${movieId}-completion-eeeeeeeeeeee`,
  davinciActualEvidenceSha256: `${movieId}-actual-ffffffffffffffff`,
  finalApprovalSha256: `${movieId}-approval-11111111111111`,
  finalApprovalCurrent: true,
  approvalCompletionGate: {current: true, state: 'CURRENT'},
  finalApprovalCompletionBindingSha256: `${movieId}-binding-222222222222222`,
  nextGate: 'READY',
});
const base = {
  schemaVersion: 'wedding-davinci-delivery-readiness/v1',
  authority: 'DERIVED_WEDDING_DAVINCI_DELIVERY_READINESS',
  ready: true,
  state: 'READY',
  opening: project('opening'),
  profile: project('profile'),
};

const run = (candidate: unknown) => {
  writeFileSync(fixture, `${JSON.stringify(candidate, null, 2)}\n`);
  return spawnSync(process.execPath, ['--no-warnings', 'scripts/wedding-final-delivery-evidence-manifest.mts', '--readiness=out/qa/wedding-final-delivery-evidence-manifest-fixture.json', '--json'], {cwd: root, encoding: 'utf8'});
};

const ok = run(base);
if (ok.status !== 0) throw new Error(ok.stderr || ok.stdout || 'READY fixture must produce manifest');
const manifest = JSON.parse(ok.stdout);
if (manifest.schemaVersion !== 'wedding-final-delivery-evidence-manifest/v1') throw new Error('manifest schema mismatch');
if (!manifest.manifestSha256 || !manifest.opening.evidenceChainSha256 || !manifest.profile.evidenceChainSha256) throw new Error('manifest SHA chain missing');
if (manifest.evidenceBoundary.macDavinciResolveGuiActual !== 'NOT_PROMOTED_BY_MANIFEST') throw new Error('GUI Actual boundary promoted unexpectedly');

const expectBlocked = (label: string, mutate: (candidate: any) => void, code: string) => {
  const candidate = JSON.parse(JSON.stringify(base));
  mutate(candidate);
  const result = run(candidate);
  if (result.status === 0) throw new Error(`${label}: manifest must fail closed`);
  if (!`${result.stderr}${result.stdout}`.includes(code)) throw new Error(`${label}: expected ${code}, got ${result.stderr || result.stdout}`);
};

expectBlocked('overall readiness', (x) => { x.ready = false; x.state = 'BLOCKED'; }, 'FINAL_DELIVERY_NOT_READY');
expectBlocked('transition gate', (x) => { x.opening.transitionGate = {current: false, state: 'BLOCKED'}; }, 'OPENING_TRANSITION_GATE_NOT_CURRENT');
expectBlocked('completion receipt', (x) => { x.profile.davinciActualCompletionReceiptSha256 = null; }, 'PROFILE_DAVINCIACTUALCOMPLETIONRECEIPTSHA256_MISSING');
expectBlocked('final binding gate', (x) => { x.opening.approvalCompletionGate = {current: false, state: 'BLOCKED'}; }, 'OPENING_FINAL_APPROVAL_COMPLETION_GATE_NOT_CURRENT');
expectBlocked('final binding SHA', (x) => { x.profile.finalApprovalCompletionBindingSha256 = null; }, 'PROFILE_FINALAPPROVALCOMPLETIONBINDINGSHA256_MISSING');

rmSync(fixture, {force: true});
console.log('Wedding final delivery evidence manifest contract OK: READY chain emits deterministic manifest; incomplete transition/completion/approval binding chains fail closed; GUI Actual not promoted');
