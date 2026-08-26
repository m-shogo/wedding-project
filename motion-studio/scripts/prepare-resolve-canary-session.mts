import {existsSync, mkdirSync, readFileSync, writeFileSync} from 'node:fs';
import {dirname, join, relative} from 'node:path';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {
  getResolveCanaryInputPreparation,
  resolveCanaryInputManifestSchema,
} from '../src/data/resolveCanaryInputFixtures.ts';
import {resolveCanarySessionSchema} from '../src/data/resolveCanarySession.schema.ts';
import {getResolveRuntimeCanary} from '../src/data/resolveRuntimeCanaryPack.ts';
import {resolveRuntimeCanaryEvidenceSchema} from '../src/data/resolveRuntimeCanary.schema.ts';

const motionRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const canaryId = args[0];

function usage() {
  console.log('Resolve Canary Session Preparation');
  console.log('');
  console.log('Usage:');
  console.log('  node --no-warnings scripts/prepare-resolve-canary-session.mts <CANARY_ID> --execution-id <ID> [--reuse-existing]');
  console.log('');
  console.log('Creates an ignored local session folder containing plan.md, evidence.json, RUN.md, and session.json.');
  console.log('This command does not launch DaVinci Resolve and does not claim runtime PASS.');
}

function valueFor(flag: string) {
  const index = args.indexOf(flag);
  if (index < 0) return undefined;
  const value = args[index + 1];
  if (!value || value.startsWith('--')) throw new Error(`${flag} requires a value.`);
  return value;
}

function run(command: string, commandArgs: string[]) {
  console.log(`▶ ${command} ${commandArgs.join(' ')}`);
  const result = spawnSync(command, commandArgs, {cwd: motionRoot, stdio: 'inherit'});
  if (result.status !== 0) {
    throw new Error(`Command failed (${result.status ?? 'unknown'}): ${command} ${commandArgs.join(' ')}`);
  }
}

function runCapture(command: string, commandArgs: string[]) {
  const result = spawnSync(command, commandArgs, {cwd: motionRoot, encoding: 'utf8'});
  if (result.status !== 0) {
    throw new Error(`Command failed (${result.status ?? 'unknown'}): ${command} ${commandArgs.join(' ')}\n${result.stderr || ''}`);
  }
  return result.stdout;
}

function toMotionRelative(path: string) {
  return relative(motionRoot, path).replaceAll('\\', '/');
}

try {
  if (!canaryId || canaryId.startsWith('--') || args.includes('--help')) {
    usage();
    process.exit(canaryId ? 0 : 1);
  }

  const executionId = valueFor('--execution-id');
  if (!executionId) throw new Error('--execution-id is required.');
  if (!/^[A-Za-z0-9._-]+$/.test(executionId)) {
    throw new Error('--execution-id may contain only letters, numbers, dot, underscore, and hyphen.');
  }

  const canary = getResolveRuntimeCanary(canaryId);
  if (!canary) throw new Error(`Unknown Resolve runtime canary: ${canaryId}`);
  const preparation = getResolveCanaryInputPreparation(canaryId);
  if (!preparation) {
    throw new Error(`No automated input preparation is registered for ${canaryId}. Compile the canary plan and prepare its inputs manually.`);
  }

  const reuseExisting = args.includes('--reuse-existing');
  if (reuseExisting && preparation.mode !== 'alpha') {
    throw new Error('--reuse-existing is only supported for the alpha preparation route.');
  }

  const sessionDir = join(motionRoot, 'out', 'canary-sessions', executionId);
  if (existsSync(sessionDir)) {
    throw new Error(`Session already exists and will not be overwritten: ${toMotionRelative(sessionDir)}`);
  }

  const prepArgs = ['--no-warnings', 'scripts/prepare-resolve-canary-inputs.mts', preparation.mode];
  if (reuseExisting) prepArgs.push('--reuse-existing');
  run(process.execPath, prepArgs);

  const manifestPath = join(motionRoot, preparation.manifestPath);
  if (!existsSync(manifestPath)) throw new Error(`Expected input manifest missing after preparation: ${preparation.manifestPath}`);
  const manifest = resolveCanaryInputManifestSchema.parse(JSON.parse(readFileSync(manifestPath, 'utf8')));
  if (manifest.canaryId !== canaryId) {
    throw new Error(`Prepared manifest canary mismatch: expected=${canaryId} actual=${manifest.canaryId}`);
  }

  mkdirSync(sessionDir, {recursive: true});
  const planPath = join(sessionDir, 'plan.md');
  const evidencePath = join(sessionDir, 'evidence.json');
  const runInstructionsPath = join(sessionDir, 'RUN.md');
  const sessionJsonPath = join(sessionDir, 'session.json');

  const plan = runCapture(process.execPath, ['--no-warnings', 'scripts/resolve-runtime-canary-plan.mts', canaryId]);
  writeFileSync(planPath, plan.endsWith('\n') ? plan : `${plan}\n`, 'utf8');

  run(process.execPath, [
    '--no-warnings',
    'scripts/hydrate-resolve-canary-evidence.mts',
    preparation.manifestPath,
    '--execution-id', executionId,
    '--output', evidencePath,
  ]);
  run(process.execPath, ['--no-warnings', 'scripts/validate-resolve-canary-evidence.mts', evidencePath]);

  const evidence = resolveRuntimeCanaryEvidenceSchema.parse(JSON.parse(readFileSync(evidencePath, 'utf8')));
  const blocked = manifest.status === 'BLOCKED_REAL_TOOL_EXPORT_REQUIRED';
  if (blocked && evidence.result !== 'BLOCKED') {
    throw new Error(`Blocked manifest must hydrate to BLOCKED evidence, got ${evidence.result}.`);
  }
  if (!blocked && evidence.result !== 'NOT_RUN') {
    throw new Error(`Prepared manifest must hydrate to NOT_RUN evidence before runtime, got ${evidence.result}.`);
  }

  const status = blocked ? 'BLOCKED_INPUT' : 'READY_FOR_RUNTIME';
  const nextAction = blocked
    ? manifest.nextAction
    : `Open Resolve manually, create/confirm a disposable project, capture exact live runtime identity, then execute ${canaryId} using plan.md and record only observed values in evidence.json.`;

  const runInstructions = `# Resolve Canary Session — ${canaryId}\n\nExecution ID: \`${executionId}\`  \nStatus: **${status}**  \nPrepared at: ${new Date().toISOString()}\n\n## Files\n\n- Canary plan: \`plan.md\`\n- Hydrated evidence: \`evidence.json\`\n- Session metadata: \`session.json\`\n- Input manifest: \`${preparation.manifestPath}\`\n\n## Next action\n\n${nextAction}\n\n## Runtime boundary\n\nThis session builder did **not** launch DaVinci Resolve.\n\nBefore any Resolve mutation:\n\n1. use a disposable project/timeline\n2. confirm the real wedding Opening/Profile project is not the target\n3. capture exact live product/version/edition/platform\n4. follow \`plan.md\` step by step\n5. edit \`evidence.json\` only with values actually observed\n6. keep unavailable values null / NOT_RUN / BLOCKED / FAIL\n7. re-run the semantic validator after material evidence edits\n\nValidator:\n\n\`\`\`bash\nnode --no-warnings scripts/validate-resolve-canary-evidence.mts ${toMotionRelative(evidencePath)}\n\`\`\`\n\n## Guardrails\n\n- SESSION_PREPARED != RESOLVE_EXECUTED\n- SESSION_READY != CANARY_PASS\n- MANIFEST_PREPARED != RUNTIME_EXECUTED\n- one execution ID must never overwrite prior evidence\n- do not promote canonical policy from one successful execution\n`;
  writeFileSync(runInstructionsPath, runInstructions, 'utf8');

  const session = resolveCanarySessionSchema.parse({
    schemaVersion: 'resolve-canary-session/v1',
    canaryId,
    executionId,
    createdAt: new Date().toISOString(),
    status,
    canaryStateAtPreparation: canary.state,
    inputManifestStatus: manifest.status,
    targetResolveMajor: 21,
    runtimeLaunchPerformed: false,
    networkInstallRequested: false,
    paths: {
      sessionDir: toMotionRelative(sessionDir),
      inputManifest: preparation.manifestPath,
      evidence: toMotionRelative(evidencePath),
      plan: toMotionRelative(planPath),
      runInstructions: toMotionRelative(runInstructionsPath),
    },
    nextAction,
    guardrails: Array.from(new Set([
      'SESSION_PREPARED != RESOLVE_EXECUTED',
      'SESSION_READY != CANARY_PASS',
      'MANIFEST_PREPARED != RUNTIME_EXECUTED',
      'EXECUTION_ID_MUST_NOT_OVERWRITE_PRIOR_EVIDENCE',
      ...manifest.guardrails,
    ])),
  });
  writeFileSync(sessionJsonPath, `${JSON.stringify(session, null, 2)}\n`, 'utf8');

  console.log(`\n✅ Resolve canary session prepared: ${toMotionRelative(sessionDir)}`);
  console.log(`   canary=${canaryId}`);
  console.log(`   executionId=${executionId}`);
  console.log(`   status=${status}`);
  console.log(`   evidenceResult=${evidence.result}`);
  console.log('   runtimeLaunchPerformed=NO');
  console.log(`   next=${nextAction}`);
} catch (error) {
  console.error(`❌ ${error instanceof Error ? error.message : error}`);
  process.exit(1);
}
