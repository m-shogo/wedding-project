import {createHash} from 'node:crypto';
import {existsSync, mkdirSync, readFileSync, writeFileSync} from 'node:fs';
import {dirname, join, relative, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {spawnSync} from 'node:child_process';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outputPath = join(root, 'out/handoff/wedding/wedding-final-delivery-evidence-manifest.json');
const rel = (path: string) => relative(root, path).replaceAll('\\', '/');
const shaJson = (value: unknown) => createHash('sha256').update(JSON.stringify(value)).digest('hex');

const argValue = (name: string) => {
  const prefix = `--${name}=`;
  const value = process.argv.find((arg) => arg.startsWith(prefix));
  return value ? value.slice(prefix.length) : null;
};

type Gate = {current?: boolean; state?: string};
type Project = {
  ready?: boolean;
  handoffIdentitySha256?: string | null;
  sourceRenderSha256?: string | null;
  transitionGate?: Gate;
  transitionActualEvidenceSha256?: string | null;
  transitionProofSha256?: string | null;
  completionGate?: Gate;
  davinciActualCompletionReceiptSha256?: string | null;
  davinciActualEvidenceSha256?: string | null;
  finalApprovalSha256?: string | null;
  finalApprovalCurrent?: boolean;
  approvalCompletionGate?: Gate;
  finalApprovalCompletionBindingSha256?: string | null;
  nextGate?: string;
};
type Readiness = {
  schemaVersion?: string;
  authority?: string;
  ready?: boolean;
  state?: string;
  opening?: Project;
  profile?: Project;
};

const readinessArg = argValue('readiness');
let readiness: Readiness;
let readinessSource: string;
if (readinessArg) {
  const path = resolve(root, readinessArg);
  if (!existsSync(path)) throw new Error(`READINESS_FILE_MISSING: ${rel(path)}`);
  readiness = JSON.parse(readFileSync(path, 'utf8')) as Readiness;
  readinessSource = rel(path);
} else {
  const result = spawnSync(process.execPath, ['--no-warnings', join(root, 'scripts/wedding-davinci-delivery-readiness.mts'), '--json'], {cwd: root, encoding: 'utf8'});
  if (result.status !== 0) throw new Error(result.stderr || result.stdout || 'WEDDING_DAVINCI_READINESS_FAILED');
  readiness = JSON.parse(result.stdout) as Readiness;
  readinessSource = 'scripts/wedding-davinci-delivery-readiness.mts --json';
}

if (readiness.schemaVersion !== 'wedding-davinci-delivery-readiness/v1') throw new Error('READINESS_SCHEMA_INVALID');
if (readiness.authority !== 'DERIVED_WEDDING_DAVINCI_DELIVERY_READINESS') throw new Error('READINESS_AUTHORITY_INVALID');
if (readiness.ready !== true || readiness.state !== 'READY') throw new Error('FINAL_DELIVERY_NOT_READY');

const normalizeProject = (movieId: 'opening' | 'profile', project: Project | undefined) => {
  if (!project) throw new Error(`${movieId.toUpperCase()}_READINESS_MISSING`);
  if (project.ready !== true || project.nextGate !== 'READY') throw new Error(`${movieId.toUpperCase()}_NOT_READY`);
  if (!project.transitionGate?.current || project.transitionGate.state !== 'CURRENT') throw new Error(`${movieId.toUpperCase()}_TRANSITION_GATE_NOT_CURRENT`);
  if (!project.completionGate?.current || project.completionGate.state !== 'CURRENT') throw new Error(`${movieId.toUpperCase()}_ACTUAL_COMPLETION_GATE_NOT_CURRENT`);
  if (!project.finalApprovalCurrent) throw new Error(`${movieId.toUpperCase()}_FINAL_APPROVAL_NOT_CURRENT`);
  if (!project.approvalCompletionGate?.current || project.approvalCompletionGate.state !== 'CURRENT') throw new Error(`${movieId.toUpperCase()}_FINAL_APPROVAL_COMPLETION_GATE_NOT_CURRENT`);

  const required = {
    recoverySha256: project.handoffIdentitySha256,
    sourceRenderSha256: project.sourceRenderSha256,
    davinciActualEvidenceSha256: project.davinciActualEvidenceSha256,
    transitionActualEvidenceSha256: project.transitionActualEvidenceSha256,
    transitionProofSha256: project.transitionProofSha256,
    davinciActualCompletionReceiptSha256: project.davinciActualCompletionReceiptSha256,
    finalApprovalSha256: project.finalApprovalSha256,
    finalApprovalCompletionBindingSha256: project.finalApprovalCompletionBindingSha256,
  } as const;
  for (const [key, value] of Object.entries(required)) {
    if (typeof value !== 'string' || value.length < 8) throw new Error(`${movieId.toUpperCase()}_${key.toUpperCase()}_MISSING`);
  }

  const evidence = {
    movieId,
    ...required,
    transitionGateState: project.transitionGate.state,
    actualCompletionGateState: project.completionGate.state,
    finalApprovalCompletionGateState: project.approvalCompletionGate.state,
  } as const;
  return {...evidence, evidenceChainSha256: shaJson(evidence)};
};

const opening = normalizeProject('opening', readiness.opening);
const profile = normalizeProject('profile', readiness.profile);
const manifestCore = {
  schemaVersion: 'wedding-final-delivery-evidence-manifest/v1',
  authority: 'DERIVED_FINAL_DELIVERY_EVIDENCE_MANIFEST',
  readinessSource,
  readinessSha256: shaJson(readiness),
  opening,
  profile,
  evidenceBoundary: {
    macRemotionStudioGuiActual: 'NOT_PROMOTED_BY_MANIFEST',
    palmierGuiActual: 'NOT_PROMOTED_BY_MANIFEST',
    macDavinciResolveGuiActual: 'NOT_PROMOTED_BY_MANIFEST',
    humanFinalApproval: 'NOT_PROMOTED_BY_MANIFEST',
  },
  guardrails: [
    'OPENING_AND_PROFILE_MUST_BOTH_BE_READY',
    'TRANSITION_ACTUAL_GATE_CURRENT_REQUIRED',
    'DAVINCI_ACTUAL_COMPLETION_RECEIPT_CURRENT_REQUIRED',
    'HUMAN_FINAL_APPROVAL_CURRENT_REQUIRED',
    'FINAL_APPROVAL_COMPLETION_BINDING_CURRENT_REQUIRED',
    'ANY_BOUND_SHA_DRIFT => REBUILD_MANIFEST',
    'MANIFEST_DERIVED_ONLY != GUI_ACTUAL',
  ],
} as const;
const manifest = {...manifestCore, manifestSha256: shaJson(manifestCore)};

if (process.argv.includes('--write')) {
  mkdirSync(dirname(outputPath), {recursive: true});
  writeFileSync(outputPath, `${JSON.stringify(manifest, null, 2)}\n`);
}
if (process.argv.includes('--json') || process.argv.includes('--write')) console.log(JSON.stringify(manifest, null, 2));
else console.log(`Wedding final delivery evidence manifest: READY / sha=${manifest.manifestSha256}`);
