import {createHash} from 'node:crypto';
import {existsSync, mkdirSync, readFileSync, writeFileSync} from 'node:fs';
import {dirname, join, relative} from 'node:path';
import {fileURLToPath} from 'node:url';

const studioRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const bgmPath = join(studioRoot, 'public/audio/profile/bgm-main.mp3');
const approvalPath = join(studioRoot, 'out/qa/profile-v1-bgm-rights-approval.json');
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

const shaFile = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');
const rel = (path: string) => relative(studioRoot, path).replaceAll('\\', '/');

function currentBgm() {
  if (!existsSync(bgmPath)) return null;
  return {path: rel(bgmPath), sha256: shaFile(bgmPath)};
}

function initializeApproval() {
  const current = currentBgm();
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
  mkdirSync(dirname(approvalPath), {recursive: true});
  writeFileSync(approvalPath, `${JSON.stringify(approval, null, 2)}\n`);
  console.log(`Profile V1 BGM rights approval initialized: ${rel(approvalPath)}`);
  console.log('decision=HOLD rightsCleared=false — a human must verify wedding-screening usage rights for this exact BGM SHA.');
}

function evaluate() {
  const current = currentBgm();
  const blockers: string[] = [];
  if (!current) blockers.push('PROFILE_BGM_FILE_MISSING');
  if (!existsSync(approvalPath)) {
    blockers.push('PROFILE_BGM_RIGHTS_APPROVAL_NOT_RUN');
    return {state: 'NOT_RUN' as const, current, approval: null, blockers, rightsCleared: false};
  }

  let approval: ProfileV1BgmRightsApproval;
  try {
    approval = JSON.parse(readFileSync(approvalPath, 'utf8')) as ProfileV1BgmRightsApproval;
  } catch {
    blockers.push('PROFILE_BGM_RIGHTS_APPROVAL_INVALID_JSON');
    return {state: 'BLOCKED' as const, current, approval: null, blockers, rightsCleared: false};
  }

  if (approval.schemaVersion !== 'profile-v1-bgm-rights-approval/v1') blockers.push('PROFILE_BGM_RIGHTS_APPROVAL_SCHEMA');
  if (approval.authority !== 'HUMAN_BGM_RIGHTS_APPROVAL') blockers.push('PROFILE_BGM_RIGHTS_APPROVAL_AUTHORITY');
  if (approval.usageScope !== 'WEDDING_SCREENING') blockers.push('PROFILE_BGM_RIGHTS_USAGE_SCOPE');
  if (current && (approval.bgm.path !== current.path || approval.bgm.sha256 !== current.sha256)) blockers.push('STALE_PROFILE_BGM_RIGHTS_APPROVAL_SHA');
  if (approval.decision !== 'APPROVE') blockers.push(`PROFILE_BGM_RIGHTS_DECISION_${approval.decision}`);
  if (!approval.approver?.trim()) blockers.push('PROFILE_BGM_RIGHTS_APPROVER_MISSING');
  if (!approval.decidedAt || Number.isNaN(Date.parse(approval.decidedAt))) blockers.push('PROFILE_BGM_RIGHTS_DECIDED_AT_INVALID');
  if (approval.rightsCleared !== (approval.decision === 'APPROVE')) blockers.push('PROFILE_BGM_RIGHTS_CLEARED_MUST_MATCH_DECISION');
  if (!approval.evidenceNote?.trim()) blockers.push('PROFILE_BGM_RIGHTS_EVIDENCE_NOTE_MISSING');

  const rightsCleared = blockers.length === 0;
  return {
    state: rightsCleared ? ('CLEARED' as const) : ('BLOCKED' as const),
    current,
    approval,
    blockers,
    rightsCleared,
  };
}

function printResult(json: boolean, strict: boolean) {
  const result = evaluate();
  if (json) {
    console.log(JSON.stringify({
      schemaVersion: 'profile-v1-bgm-rights-status/v1',
      authority: 'DERIVED_BGM_RIGHTS_STATUS',
      state: result.state,
      bgm: result.current,
      approvalPath: rel(approvalPath),
      approval: result.approval,
      blockers: result.blockers,
      rightsCleared: result.rightsCleared,
    }, null, 2));
  } else if (result.rightsCleared) {
    console.log('Profile V1 BGM rights: CLEARED for the current SHA-bound wedding-screening approval.');
  } else {
    console.log(`Profile V1 BGM rights: ${result.state} (${result.blockers.length})`);
    for (const blocker of result.blockers) console.log(`BLOCK / ${blocker}`);
    if (result.current && !existsSync(approvalPath)) console.log('NEXT / node --no-warnings scripts/profile-v1-bgm-rights-approval.mts --init');
  }
  if (strict && !result.rightsCleared) process.exit(1);
}

if (mode === 'init') initializeApproval();
else printResult(mode === 'json', mode === 'strict');
