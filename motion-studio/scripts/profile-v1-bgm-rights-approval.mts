import {createHash} from 'node:crypto';
import {existsSync, mkdirSync, readFileSync, writeFileSync} from 'node:fs';
import {dirname, join, relative, resolve} from 'node:path';
import {fileURLToPath, pathToFileURL} from 'node:url';
import {defaultBgmReceiptPath, verifyBgmIntakeReceipt} from './verify-production-bgm-intake-receipt.mts';

const studioRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const defaultBgmPath = join(studioRoot, 'public/audio/profile/bgm-main.mp3');
const defaultApprovalPath = join(studioRoot, 'out/qa/profile-v1-bgm-rights-approval.json');
const mode = process.argv.includes('--init') ? 'init' : process.argv.includes('--json') ? 'json' : process.argv.includes('--strict') ? 'strict' : 'status';

type ApprovalDecision = 'HOLD' | 'APPROVE';

type ProfileV1BgmRightsApproval = {
  schemaVersion: 'profile-v1-bgm-rights-approval/v1';
  authority: 'HUMAN_BGM_RIGHTS_APPROVAL';
  boundAt: string;
  bgm: {path: string; sha256: string};
  usageScope: 'WEDDING_SCREENING';
  decision: ApprovalDecision;
  approver: string | null;
  decidedAt: string | null;
  evidenceNote: string;
  rightsCleared: boolean;
};

type ProfileV1BgmRightsPaths = {
  bgmPath?: string;
  approvalPath?: string;
  receiptPath?: string;
};

const shaFile = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');
const rel = (path: string) => relative(studioRoot, path).replaceAll('\\', '/');

function currentBgm(path = defaultBgmPath) {
  if (!existsSync(path)) return null;
  return {path: rel(path), sha256: shaFile(path)};
}

const resolvePaths = (paths: ProfileV1BgmRightsPaths = {}) => ({
  bgmPath: resolve(paths.bgmPath ?? defaultBgmPath),
  approvalPath: resolve(paths.approvalPath ?? defaultApprovalPath),
  receiptPath: resolve(paths.receiptPath ?? defaultBgmReceiptPath('profile')),
});

export function initializeProfileV1BgmRightsApproval(paths: ProfileV1BgmRightsPaths = {}) {
  const resolved = resolvePaths(paths);
  const receipt = verifyBgmIntakeReceipt({project: 'profile', receiptPath: resolved.receiptPath, targetPath: resolved.bgmPath});
  if (!receipt.current) {
    throw new Error(`PROFILE_BGM_INTAKE_RECEIPT_STALE: ${receipt.blockers.join(' | ')}`);
  }

  const current = currentBgm(resolved.bgmPath);
  if (!current) throw new Error('PROFILE_BGM_FILE_MISSING');
  const approval: ProfileV1BgmRightsApproval = {
    schemaVersion: 'profile-v1-bgm-rights-approval/v1',
    authority: 'HUMAN_BGM_RIGHTS_APPROVAL',
    boundAt: new Date().toISOString(),
    bgm: current,
    usageScope: 'WEDDING_SCREENING',
    decision: 'HOLD',
    approver: null,
    decidedAt: null,
    evidenceNote: '',
    rightsCleared: false,
  };
  mkdirSync(dirname(resolved.approvalPath), {recursive: true});
  writeFileSync(resolved.approvalPath, `${JSON.stringify(approval, null, 2)}\n`);
  return {approval, approvalPath: resolved.approvalPath, intakeReceipt: receipt};
}

export function evaluateProfileV1BgmRights(paths: ProfileV1BgmRightsPaths = {}) {
  const resolved = resolvePaths(paths);
  const current = currentBgm(resolved.bgmPath);
  const receipt = verifyBgmIntakeReceipt({project: 'profile', receiptPath: resolved.receiptPath, targetPath: resolved.bgmPath});
  const blockers: string[] = [];
  if (!current) blockers.push('PROFILE_BGM_FILE_MISSING');
  if (!receipt.current) {
    blockers.push('PROFILE_BGM_INTAKE_RECEIPT_STALE');
    blockers.push(...receipt.blockers.map((blocker) => `PROFILE_BGM_INTAKE_${blocker}`));
  }
  if (!existsSync(resolved.approvalPath)) {
    blockers.push('PROFILE_BGM_RIGHTS_APPROVAL_NOT_RUN');
    return {state: 'NOT_RUN' as const, current, approval: null, intakeReceipt: receipt, blockers, rightsCleared: false};
  }

  let approval: ProfileV1BgmRightsApproval;
  try {
    approval = JSON.parse(readFileSync(resolved.approvalPath, 'utf8')) as ProfileV1BgmRightsApproval;
  } catch {
    blockers.push('PROFILE_BGM_RIGHTS_APPROVAL_INVALID_JSON');
    return {state: 'BLOCKED' as const, current, approval: null, intakeReceipt: receipt, blockers, rightsCleared: false};
  }

  if (approval.schemaVersion !== 'profile-v1-bgm-rights-approval/v1') blockers.push('PROFILE_BGM_RIGHTS_APPROVAL_SCHEMA');
  if (approval.authority !== 'HUMAN_BGM_RIGHTS_APPROVAL') blockers.push('PROFILE_BGM_RIGHTS_APPROVAL_AUTHORITY');
  if (approval.usageScope !== 'WEDDING_SCREENING') blockers.push('PROFILE_BGM_RIGHTS_USAGE_SCOPE');
  if (!approval.boundAt || Number.isNaN(Date.parse(approval.boundAt))) blockers.push('PROFILE_BGM_RIGHTS_BOUND_AT_INVALID');
  if (current && (approval.bgm.path !== current.path || approval.bgm.sha256 !== current.sha256)) blockers.push('STALE_PROFILE_BGM_RIGHTS_APPROVAL_SHA');
  if (approval.decision !== 'APPROVE') blockers.push(`PROFILE_BGM_RIGHTS_DECISION_${approval.decision}`);
  if (!approval.approver?.trim()) blockers.push('PROFILE_BGM_RIGHTS_APPROVER_MISSING');
  if (!approval.decidedAt || Number.isNaN(Date.parse(approval.decidedAt))) blockers.push('PROFILE_BGM_RIGHTS_DECIDED_AT_INVALID');
  if (approval.boundAt && approval.decidedAt && !Number.isNaN(Date.parse(approval.boundAt)) && !Number.isNaN(Date.parse(approval.decidedAt)) && Date.parse(approval.decidedAt) < Date.parse(approval.boundAt)) {
    blockers.push('PROFILE_BGM_RIGHTS_DECISION_PREDATES_BINDING');
  }
  if (approval.rightsCleared !== (approval.decision === 'APPROVE')) blockers.push('PROFILE_BGM_RIGHTS_CLEARED_MUST_MATCH_DECISION');
  if (!approval.evidenceNote?.trim()) blockers.push('PROFILE_BGM_RIGHTS_EVIDENCE_NOTE_MISSING');

  const rightsCleared = blockers.length === 0;
  return {
    state: rightsCleared ? ('CLEARED' as const) : ('BLOCKED' as const),
    current,
    approval,
    intakeReceipt: receipt,
    blockers,
    rightsCleared,
  };
}

function printResult(json: boolean, strict: boolean) {
  const result = evaluateProfileV1BgmRights();
  if (json) {
    console.log(JSON.stringify({
      schemaVersion: 'profile-v1-bgm-rights-status/v1',
      authority: 'DERIVED_BGM_RIGHTS_STATUS',
      state: result.state,
      bgm: result.current,
      intakeReceipt: {
        current: result.intakeReceipt.current,
        receiptPath: rel(result.intakeReceipt.receiptPath),
        targetPath: rel(result.intakeReceipt.targetPath),
        blockers: result.intakeReceipt.blockers,
      },
      approvalPath: rel(defaultApprovalPath),
      approval: result.approval,
      blockers: result.blockers,
      rightsCleared: result.rightsCleared,
    }, null, 2));
  } else if (result.rightsCleared) {
    console.log('Profile V1 BGM rights: CLEARED for the current SHA-bound intake receipt + wedding-screening approval.');
  } else {
    console.log(`Profile V1 BGM rights: ${result.state} (${result.blockers.length})`);
    for (const blocker of result.blockers) console.log(`BLOCK / ${blocker}`);
    if (!result.intakeReceipt.current) console.log('NEXT / rerun canonical BGM intake DRY RUN → --apply --receipt before Human rights approval.');
    else if (result.current && !existsSync(defaultApprovalPath)) console.log('NEXT / node --no-warnings scripts/profile-v1-bgm-rights-approval.mts --init');
  }
  if (strict && !result.rightsCleared) process.exit(1);
}

function main() {
  if (mode === 'init') {
    const result = initializeProfileV1BgmRightsApproval();
    console.log(`Profile V1 BGM rights approval initialized: ${rel(result.approvalPath)}`);
    console.log('decision=HOLD rightsCleared=false — a human must verify wedding-screening usage rights for this exact intake-verified BGM SHA.');
  } else {
    printResult(mode === 'json', mode === 'strict');
  }
}

const isMain = Boolean(process.argv[1]) && import.meta.url === pathToFileURL(resolve(process.argv[1])).href;
if (isMain) main();
