import {existsSync, mkdirSync, readFileSync, writeFileSync} from 'node:fs';
import {dirname, join, relative} from 'node:path';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {resolveCanarySessionSchema} from '../src/data/resolveCanarySession.schema.ts';
import {resolveRuntimeCanaryEvidenceSchema} from '../src/data/resolveRuntimeCanary.schema.ts';

const motionRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');

const canaries = [
  'DV21-LOTTIE-OGRAF-01',
  'DV21-DRFX-FREE-01',
] as const;

function usage() {
  console.log('Resolve Local Actual Batch Preparation');
  console.log('');
  console.log('Usage:');
  console.log('  node --no-warnings scripts/prepare-resolve-local-actual-batch.mts --execution-prefix <ID> [--dry-run]');
  console.log('');
  console.log('Prepares immutable READY_FOR_RUNTIME sessions for the neutral Lottie and DRFX canaries.');
  console.log('This helper never launches DaVinci Resolve and never claims runtime PASS.');
}

function valueFor(flag: string) {
  const index = args.indexOf(flag);
  if (index < 0) return undefined;
  const value = args[index + 1];
  if (!value || value.startsWith('--')) throw new Error(`${flag} requires a value.`);
  return value;
}

function toMotionRelative(path: string) {
  return relative(motionRoot, path).replaceAll('\\', '/');
}

function run(commandArgs: string[]) {
  console.log(`▶ ${process.execPath} ${commandArgs.join(' ')}`);
  if (dryRun) return;
  const result = spawnSync(process.execPath, commandArgs, {cwd: motionRoot, stdio: 'inherit'});
  if (result.status !== 0) {
    throw new Error(`Command failed (${result.status ?? 'unknown'}): ${process.execPath} ${commandArgs.join(' ')}`);
  }
}

try {
  if (args.includes('--help')) {
    usage();
    process.exit(0);
  }

  const executionPrefix = valueFor('--execution-prefix');
  if (!executionPrefix) {
    usage();
    throw new Error('--execution-prefix is required.');
  }
  if (!/^[A-Za-z0-9._-]+$/.test(executionPrefix)) {
    throw new Error('--execution-prefix may contain only letters, numbers, dot, underscore, and hyphen.');
  }

  const batchDir = join(motionRoot, 'out', 'canary-batches');
  const batchPath = join(batchDir, `${executionPrefix}.json`);
  const planned = canaries.map((canaryId) => {
    const executionId = `${canaryId}-${executionPrefix}`;
    const sessionDir = join(motionRoot, 'out', 'canary-sessions', executionId);
    return {canaryId, executionId, sessionDir};
  });

  if (!dryRun) {
    if (existsSync(batchPath)) {
      throw new Error(`Batch summary already exists and will not be overwritten: ${toMotionRelative(batchPath)}`);
    }
    for (const item of planned) {
      if (existsSync(item.sessionDir)) {
        throw new Error(`Session already exists and will not be overwritten: ${toMotionRelative(item.sessionDir)}`);
      }
    }
  }

  for (const item of planned) {
    run([
      '--no-warnings',
      'scripts/prepare-resolve-canary-session.mts',
      item.canaryId,
      '--execution-id', item.executionId,
    ]);
  }

  if (dryRun) {
    console.log('\nDRY RUN: no input artifacts, sessions, evidence, or batch summary were written.');
    process.exit(0);
  }

  const sessions = planned.map((item) => {
    const sessionPath = join(item.sessionDir, 'session.json');
    const evidencePath = join(item.sessionDir, 'evidence.json');
    if (!existsSync(sessionPath) || !existsSync(evidencePath)) {
      throw new Error(`Prepared session is incomplete: ${toMotionRelative(item.sessionDir)}`);
    }

    const session = resolveCanarySessionSchema.parse(JSON.parse(readFileSync(sessionPath, 'utf8')));
    const evidence = resolveRuntimeCanaryEvidenceSchema.parse(JSON.parse(readFileSync(evidencePath, 'utf8')));

    if (session.canaryId !== item.canaryId || session.executionId !== item.executionId) {
      throw new Error(`Session identity mismatch: ${item.executionId}`);
    }
    if (session.status !== 'READY_FOR_RUNTIME') {
      throw new Error(`${item.canaryId} did not become READY_FOR_RUNTIME: ${session.status}`);
    }
    if (session.runtimeLaunchPerformed !== false) {
      throw new Error(`${item.canaryId} unexpectedly claims a runtime launch.`);
    }
    if (session.canaryStateAtPreparation !== 'PENDING_RUNTIME') {
      throw new Error(`${item.canaryId} effective state must be PENDING_RUNTIME before Actual, got ${session.canaryStateAtPreparation}.`);
    }
    if (evidence.result !== 'NOT_RUN' || evidence.capturedAt !== null || evidence.promotionEligible !== false) {
      throw new Error(`${item.canaryId} evidence must remain NOT_RUN/non-promotable before Actual.`);
    }
    if (evidence.stepResults.some((step) => step.status !== 'NOT_RUN')) {
      throw new Error(`${item.canaryId} contains a pre-runtime step result that is not NOT_RUN.`);
    }

    return {
      canaryId: item.canaryId,
      executionId: item.executionId,
      sessionPath: toMotionRelative(sessionPath),
      runInstructionsPath: session.paths.runInstructions,
      planPath: session.paths.plan,
      evidencePath: session.paths.evidence,
      catalogStateAtPreparation: session.catalogStateAtPreparation ?? session.canaryStateAtPreparation,
      effectiveCanaryStateAtPreparation: session.canaryStateAtPreparation,
      sessionStatus: session.status,
      evidenceResult: evidence.result,
      runtimeLaunchPerformed: session.runtimeLaunchPerformed,
      promotionEligible: evidence.promotionEligible,
    };
  });

  const summary = {
    schemaVersion: 'resolve-local-actual-batch/v1',
    executionPrefix,
    createdAt: new Date().toISOString(),
    runtimeLaunchPerformed: false,
    sessions,
    executionOrder: ['DV21-LOTTIE-OGRAF-01', 'DV21-DRFX-FREE-01'],
    guardrails: [
      'BATCH_PREPARED != RESOLVE_EXECUTED',
      'READY_FOR_RUNTIME != PASS',
      'ONE_SUCCESSFUL_EXECUTION != CANONICAL_PROMOTION',
      'REAL_WEDDING_PROJECT_MUTATION_FORBIDDEN',
      'FAILED_SESSION_MUST_NOT_BE_OVERWRITTEN',
    ],
    nextAction: 'Use the local Resolve Actual agent prompt and execute each session independently in a disposable Resolve project. Record only observed values in each evidence.json.',
  };

  mkdirSync(dirname(batchPath), {recursive: true});
  writeFileSync(batchPath, `${JSON.stringify(summary, null, 2)}\n`, 'utf8');

  console.log(`\n✅ Local Resolve Actual batch prepared: ${toMotionRelative(batchPath)}`);
  for (const session of sessions) {
    console.log(`   ${session.canaryId}: ${session.sessionStatus} / ${session.evidenceResult}`);
    console.log(`      RUN=${session.runInstructionsPath}`);
    console.log(`      evidence=${session.evidencePath}`);
  }
  console.log('   runtimeLaunchPerformed=NO');
  console.log('Next: execute the Lottie session first, then DRFX, in disposable Resolve projects only.');
} catch (error) {
  console.error(`❌ ${error instanceof Error ? error.message : error}`);
  process.exit(1);
}
