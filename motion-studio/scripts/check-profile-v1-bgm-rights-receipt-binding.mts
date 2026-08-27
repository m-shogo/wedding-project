import {existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {applyBgmIntakePlan, buildBgmIntakePlan, writeBgmIntakeReceipt} from './intake-production-bgm.mts';
import {evaluateProfileV1BgmRights, initializeProfileV1BgmRightsApproval} from './profile-v1-bgm-rights-approval.mts';

const root = mkdtempSync(join(tmpdir(), 'profile-bgm-rights-receipt-'));
const source = join(root, 'source.mp3');
const target = join(root, 'public/audio/profile/bgm-main.mp3');
const receiptPath = join(root, 'out/intake/profile-bgm-intake.json');
const approvalPath = join(root, 'out/qa/profile-v1-bgm-rights-approval.json');

const paths = {bgmPath: target, receiptPath, approvalPath};

try {
  writeFileSync(source, 'profile-bgm-rights-receipt-test');
  const plan = buildBgmIntakePlan({project: 'profile', sourcePath: source, targetPath: target});
  if (!plan.readyToApply) throw new Error(`Profile BGM intake plan should be ready: ${JSON.stringify(plan)}`);
  const receipt = applyBgmIntakePlan(plan, '2026-08-28T03:40:00.000Z');
  writeBgmIntakeReceipt(receipt, receiptPath);

  const initialized = initializeProfileV1BgmRightsApproval(paths);
  if (!initialized.intakeReceipt.current) throw new Error('Profile BGM approval init must require current intake receipt');
  if (!existsSync(approvalPath)) throw new Error('Profile BGM approval init did not create artifact');

  const hold = evaluateProfileV1BgmRights(paths);
  if (hold.rightsCleared || !hold.blockers.includes('PROFILE_BGM_RIGHTS_DECISION_HOLD')) {
    throw new Error(`Fresh receipt + HOLD approval must stay blocked: ${JSON.stringify(hold)}`);
  }

  const approval = JSON.parse(readFileSync(approvalPath, 'utf8')) as Record<string, unknown>;
  approval.decision = 'APPROVE';
  approval.approver = 'Human Reviewer';
  approval.decidedAt = '2099-01-01T00:00:00.000Z';
  approval.evidenceNote = 'Wedding-screening rights verified for this exact canonical BGM file.';
  approval.rightsCleared = true;
  writeFileSync(approvalPath, `${JSON.stringify(approval, null, 2)}\n`);

  const cleared = evaluateProfileV1BgmRights(paths);
  if (!cleared.rightsCleared || cleared.state !== 'CLEARED' || !cleared.intakeReceipt.current) {
    throw new Error(`Current receipt + exact SHA Human approval should clear: ${JSON.stringify(cleared)}`);
  }

  writeFileSync(target, 'profile-bgm-mutated-after-human-approval');
  const stale = evaluateProfileV1BgmRights(paths);
  if (stale.rightsCleared || !stale.blockers.includes('PROFILE_BGM_INTAKE_RECEIPT_STALE')) {
    throw new Error(`Mutated target must stale Profile BGM rights via receipt: ${JSON.stringify(stale)}`);
  }
  if (!stale.blockers.includes('STALE_PROFILE_BGM_RIGHTS_APPROVAL_SHA')) {
    throw new Error(`Mutated target must also stale Human SHA binding: ${JSON.stringify(stale)}`);
  }

  rmSync(receiptPath, {force: true});
  const missingReceipt = evaluateProfileV1BgmRights(paths);
  if (missingReceipt.rightsCleared || !missingReceipt.blockers.includes('PROFILE_BGM_INTAKE_RECEIPT_STALE')) {
    throw new Error(`Missing receipt must fail Profile BGM rights closed: ${JSON.stringify(missingReceipt)}`);
  }

  let initFailedClosed = false;
  try {
    initializeProfileV1BgmRightsApproval({...paths, approvalPath: join(root, 'out/qa/second-approval.json')});
  } catch (error) {
    initFailedClosed = error instanceof Error && error.message.includes('PROFILE_BGM_INTAKE_RECEIPT_STALE');
  }
  if (!initFailedClosed) throw new Error('Human rights approval init must refuse missing/stale intake receipt');

  console.log('Profile V1 BGM rights receipt binding OK: Human approval init and strict evaluation require current canonical intake provenance, target mutation invalidates both receipt and Human SHA binding, and no downstream readiness is fabricated.');
} finally {
  rmSync(root, {recursive: true, force: true});
}
