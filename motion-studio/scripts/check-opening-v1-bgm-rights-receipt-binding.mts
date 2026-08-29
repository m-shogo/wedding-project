import {existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {applyBgmIntakePlan, buildBgmIntakePlan, writeBgmIntakeReceipt} from './intake-production-bgm.mts';
import {evaluateOpeningV1BgmRights, initializeOpeningV1BgmRightsApproval} from './opening-v1-bgm-rights-approval.mts';

const root = mkdtempSync(join(tmpdir(), 'opening-bgm-rights-receipt-'));
const source = join(root, 'source.mp3');
const target = join(root, 'public/audio/opening/bgm-main.mp3');
const receiptPath = join(root, 'out/intake/opening-bgm-intake.json');
const approvalPath = join(root, 'out/qa/opening-v1-bgm-rights-approval.json');
const paths = {bgmPath: target, receiptPath, approvalPath};

try {
  writeFileSync(source, 'opening-bgm-rights-receipt-test');
  const plan = buildBgmIntakePlan({project: 'opening', sourcePath: source, targetPath: target});
  if (!plan.readyToApply) throw new Error(`Opening BGM intake plan should be ready: ${JSON.stringify(plan)}`);
  const receipt = applyBgmIntakePlan(plan, '2026-08-29T03:55:00.000Z');
  writeBgmIntakeReceipt(receipt, receiptPath);

  const initialized = initializeOpeningV1BgmRightsApproval(paths);
  if (!initialized.intakeReceipt.current) throw new Error('Opening BGM approval init must require current intake receipt');
  if (!existsSync(approvalPath)) throw new Error('Opening BGM approval init did not create artifact');

  const hold = evaluateOpeningV1BgmRights(paths);
  if (hold.rightsCleared || !hold.blockers.includes('OPENING_BGM_RIGHTS_DECISION_HOLD')) throw new Error(`Fresh receipt + HOLD must stay blocked: ${JSON.stringify(hold)}`);

  const approval = JSON.parse(readFileSync(approvalPath, 'utf8')) as Record<string, unknown>;
  approval.decision = 'APPROVE';
  approval.approver = 'Human Reviewer';
  approval.decidedAt = '2099-01-01T00:00:00.000Z';
  approval.evidenceNote = 'Wedding-screening rights verified for this exact canonical Opening BGM file.';
  approval.rightsCleared = true;
  writeFileSync(approvalPath, `${JSON.stringify(approval, null, 2)}\n`);

  const cleared = evaluateOpeningV1BgmRights(paths);
  if (!cleared.rightsCleared || cleared.state !== 'CLEARED' || !cleared.intakeReceipt.current) throw new Error(`Current receipt + exact SHA Human approval should clear: ${JSON.stringify(cleared)}`);

  writeFileSync(target, 'opening-bgm-mutated-after-human-approval');
  const stale = evaluateOpeningV1BgmRights(paths);
  if (stale.rightsCleared || !stale.blockers.includes('OPENING_BGM_INTAKE_RECEIPT_STALE')) throw new Error(`Mutated target must stale Opening BGM rights via receipt: ${JSON.stringify(stale)}`);
  if (!stale.blockers.includes('STALE_OPENING_BGM_RIGHTS_APPROVAL_SHA')) throw new Error(`Mutated target must stale Human SHA binding: ${JSON.stringify(stale)}`);

  rmSync(receiptPath, {force: true});
  const missingReceipt = evaluateOpeningV1BgmRights(paths);
  if (missingReceipt.rightsCleared || !missingReceipt.blockers.includes('OPENING_BGM_INTAKE_RECEIPT_STALE')) throw new Error(`Missing receipt must fail Opening BGM rights closed: ${JSON.stringify(missingReceipt)}`);

  let initFailedClosed = false;
  try {
    initializeOpeningV1BgmRightsApproval({...paths, approvalPath: join(root, 'out/qa/second-approval.json')});
  } catch (error) {
    initFailedClosed = error instanceof Error && error.message.includes('OPENING_BGM_INTAKE_RECEIPT_STALE');
  }
  if (!initFailedClosed) throw new Error('Opening Human rights approval init must refuse missing/stale intake receipt');

  console.log('Opening V1 BGM rights receipt binding OK: Human approval requires current canonical intake provenance, target mutation invalidates receipt + Human SHA binding, and no production readiness is fabricated.');
} finally {
  rmSync(root, {recursive: true, force: true});
}
