import {readFileSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {resolveHandoffSidecarSchema} from '../src/data/resolveHandoff.schema.ts';
import {resolve21AlphaHandoffPolicy} from '../src/data/resolveHandoffPolicy.ts';

const motionRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const repoRoot = join(motionRoot, '..');
let errors = 0;

function err(message: string) {
  errors += 1;
  console.error(`❌ ${message}`);
}

function ok(message: string) {
  console.log(`✅ ${message}`);
}

const policy = resolve21AlphaHandoffPolicy;

if (policy.resolve.major !== 21) err(`Resolve major must stay 21, got ${policy.resolve.major}`);
if (policy.resolve.targetPatch !== '21.0.3') {
  err(`Current planning target must be 21.0.3, got ${policy.resolve.targetPatch ?? 'unset'}`);
}
if (policy.resolve.testedPatch !== null) {
  err(`Pending policy must not claim a tested patch before Actual, got ${policy.resolve.testedPatch}`);
}
if (!policy.capabilities.every((capability) => capability.runtime === 'PENDING_RUNTIME')) {
  err('Current alpha handoff policy contains a capability promoted beyond PENDING_RUNTIME without Actual evidence.');
}
if (!policy.notes.some((note) => note.includes('testedPatch intentionally remains null'))) {
  err('Policy notes must explain why testedPatch remains null before Actual.');
}

const currentParse = resolveHandoffSidecarSchema.safeParse(policy);
if (!currentParse.success) {
  for (const issue of currentParse.error.issues) {
    err(`Current pending sidecar failed schema parse: ${issue.path.join('.')} -> ${issue.message}`);
  }
}

const legacyWithRealTestedPatch = structuredClone(policy) as Record<string, any>;
delete legacyWithRealTestedPatch.resolve.targetPatch;
legacyWithRealTestedPatch.resolve.testedPatch = '21.0.3';
const legacyParse = resolveHandoffSidecarSchema.safeParse(legacyWithRealTestedPatch);
if (!legacyParse.success) {
  for (const issue of legacyParse.error.issues) {
    err(`Legacy testedPatch-only sidecar lost backward compatibility: ${issue.path.join('.')} -> ${issue.message}`);
  }
}

const invalidPendingClaim = structuredClone(policy) as Record<string, any>;
invalidPendingClaim.resolve.testedPatch = '21.0.4';
const invalidShapeStillParses = resolveHandoffSidecarSchema.safeParse(invalidPendingClaim);
if (!invalidShapeStillParses.success) {
  err('Schema should remain version-shape focused; policy checker, not schema regex, owns pending-vs-tested semantics.');
}
if (invalidPendingClaim.capabilities.every((capability: {runtime: string}) => capability.runtime === 'PENDING_RUNTIME') && invalidPendingClaim.resolve.testedPatch !== null) {
  ok('Semantic checker explicitly distinguishes a parseable patch string from a legitimate tested runtime claim.');
}

const authoritativeFiles = [
  'docs/decisions/2026-08-26-tool-learning-routing-update-run04.md',
  'docs/decisions/2026-08-26-palmier-davinci-handoff-fidelity-v1.md',
  'docs/research/2026-08-26-movie-tool-learning-run-05-resolve21-official-manual-crosscheck.md',
  'docs/research/2026-08-26-movie-tool-learning-run-30-palmier-export-freshness-and-pr341-salvage.md',
  'docs/research/2026-08-26-movie-tool-learning-run-33-resolve-2103-version-truth-correction.md',
];

for (const relativePath of authoritativeFiles) {
  const text = readFileSync(join(repoRoot, relativePath), 'utf8');
  if (!text.includes('21.0.3')) err(`${relativePath}: corrected 21.0.3 authority is missing`);
  if (!text.includes('TARGET_PATCH != TESTED_PATCH')) err(`${relativePath}: target/tested patch guardrail is missing`);
}

const correction = readFileSync(
  join(repoRoot, 'docs/research/2026-08-26-movie-tool-learning-run-33-resolve-2103-version-truth-correction.md'),
  'utf8',
);
for (const required of [
  'DaVinci Resolve 21.0.3 Update',
  'Date: 2026-07-22',
  'testedPatch = null until Actual runtime capture',
  'DOCUMENTED_CURRENT_RELEASE != LOCAL_RUNTIME_IDENTITY',
  '21.0.4 release claim is withdrawn',
]) {
  if (!correction.includes(required)) err(`Run 33 correction missing required statement: ${required}`);
}

const policySource = readFileSync(join(motionRoot, 'src/data/resolveHandoffPolicy.ts'), 'utf8');
if (policySource.includes("testedPatch: '21.0.4'")) err('Current policy source still hard-codes 21.0.4 as testedPatch.');
if (!policySource.includes("targetPatch: '21.0.3'")) err('Current policy source must explicitly target 21.0.3.');
if (!policySource.includes('testedPatch: null')) err('Current pending policy source must keep testedPatch null.');

if (errors > 0) {
  console.error(`Resolve version truth FAILED (${errors})`);
  process.exit(1);
}

ok('Resolve version truth is separated: major=21, targetPatch=21.0.3, testedPatch=null until Actual; legacy tested evidence remains schema-compatible.');
