import {existsSync, mkdirSync, readFileSync, writeFileSync} from 'node:fs';
import {dirname, join, relative} from 'node:path';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {resolveCanarySessionSchema} from '../src/data/resolveCanarySession.schema.ts';
import {resolveRuntimeCanaryEvidenceSchema} from '../src/data/resolveRuntimeCanary.schema.ts';

const motionRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const reuseAlpha = args.includes('--reuse-alpha');

const canaries = [
  {
    canaryId: 'DV21-REMOTION-ALPHA-01',
    preparationMode: 'alpha',
    humanFocus: 'Verify source alpha, Resolve import alpha, working-path persistence, and alpha-capable export as separate stages.',
  },
  {
    canaryId: 'DV21-AUDIO-RECOVERY-01',
    preparationMode: 'audio',
    humanFocus: 'Rebuild exact Human Master fade/volume values with native UI, listen after reopen, and classify scripting write capability separately.',
  },
  {
    canaryId: 'DV21-LOTTIE-OGRAF-01',
    preparationMode: 'lottie',
    humanFocus: 'Verify native import/alpha/clip editing first, then record internal/source parametric editability separately.',
  },
  {
    canaryId: 'DV21-DRFX-FREE-01',
    preparationMode: 'drfx',
    humanFocus: 'Verify clean install and whether routine late edits are genuinely easy from the Inspector without opening an opaque Fusion graph.',
  },
] as const;

function usage() {
  console.log('Resolve 21 Local Actual Wave A Preparation');
  console.log('');
  console.log('Usage:');
  console.log('  node --no-warnings scripts/prepare-resolve-local-actual-wave-a.mts --execution-prefix <ID> [--reuse-alpha] [--dry-run]');
  console.log('');
  console.log('Prepares immutable local sessions for Alpha, Audio, Lottie and DRFX.');
  console.log('Palmier FCPXML is intentionally excluded because it requires a real Palmier export first.');
  console.log('--reuse-alpha reuses the existing neutral ProRes render only through the existing explicit alpha reuse path.');
  console.log('This command never launches DaVinci Resolve and never claims runtime PASS.');
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
  const batchPath = join(batchDir, `${executionPrefix}-wave-a.json`);
  const planned = canaries.map((entry) => {
    const executionId = `${entry.canaryId}-${executionPrefix}`;
    const sessionDir = join(motionRoot, 'out', 'canary-sessions', executionId);
    return {...entry, executionId, sessionDir};
  });

  if (!dryRun) {
    if (existsSync(batchPath)) {
      throw new Error(`Wave A summary already exists and will not be overwritten: ${toMotionRelative(batchPath)}`);
    }
    for (const item of planned) {
      if (existsSync(item.sessionDir)) {
        throw new Error(`Session already exists and will not be overwritten: ${toMotionRelative(item.sessionDir)}`);
      }
    }
  }

  for (const item of planned) {
    const commandArgs = [
      '--no-warnings',
      'scripts/prepare-resolve-canary-session.mts',
      item.canaryId,
      '--execution-id', item.executionId,
    ];
    if (item.canaryId === 'DV21-REMOTION-ALPHA-01' && reuseAlpha) {
      commandArgs.push('--reuse-existing');
    }
    run(commandArgs);
  }

  if (dryRun) {
    console.log('\nDRY RUN: no input artifacts, sessions, evidence, or Wave A summary were written.');
    console.log(`Alpha source policy: ${reuseAlpha ? 'EXPLICIT_REUSE_EXISTING' : 'FRESH_RENDER_OR_EXISTING_PREPARER_DEFAULT'}`);
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
    if (evidence.result !== 'NOT_RUN' || evidence.capturedAt !== null || evidence.promotionEligible !== false) {
      throw new Error(`${item.canaryId} evidence must remain NOT_RUN/non-promotable before Actual.`);
    }
    if (evidence.stepResults.some((step) => step.status !== 'NOT_RUN')) {
      throw new Error(`${item.canaryId} contains a pre-runtime step result that is not NOT_RUN.`);
    }

    return {
      canaryId: item.canaryId,
      executionId: item.executionId,
      preparationMode: item.preparationMode,
      humanFocus: item.humanFocus,
      sessionPath: toMotionRelative(sessionPath),
      runInstructionsPath: session.paths.runInstructions,
      planPath: session.paths.plan,
      evidencePath: session.paths.evidence,
      inputManifestPath: session.paths.inputManifest,
      sessionStatus: session.status,
      effectiveCanaryStateAtPreparation: session.canaryStateAtPreparation,
      evidenceResult: evidence.result,
      runtimeLaunchPerformed: session.runtimeLaunchPerformed,
      promotionEligible: evidence.promotionEligible,
    };
  });

  const summary = {
    schemaVersion: 'resolve-local-actual-wave-a/v1',
    executionPrefix,
    createdAt: new Date().toISOString(),
    targetResolveMajor: 21,
    runtimeLaunchPerformed: false,
    alphaPreparation: reuseAlpha ? 'EXPLICIT_REUSE_EXISTING' : 'PREPARER_DEFAULT',
    excludedCanaries: [
      {
        canaryId: 'DV21-PALMIER-FCPXML-01',
        reason: 'REAL_PALMIER_EXPORT_REQUIRED_BEFORE_SESSION_READY',
      },
      {
        canaryId: 'DV21-DRT-PORTABILITY-01',
        reason: 'P2_KEEP_OUT_OF_FIRST_HIGH_VALUE_WAVE',
      },
    ],
    sessions,
    executionOrder: canaries.map((entry) => entry.canaryId),
    guardrails: [
      'WAVE_PREPARED != RESOLVE_EXECUTED',
      'READY_FOR_RUNTIME != PASS',
      'ONE_SUCCESSFUL_EXECUTION != CANONICAL_PROMOTION',
      'ALPHA_SOURCE_RENDER != ALPHA_IMPORT != ALPHA_WORKING_PATH != ALPHA_EXPORT',
      'MANUAL_RECOVERY != AUTOMATED_WRITE',
      'NATIVE_IMPORT != INTERNAL_PARAMETRIC_EDITABILITY',
      'PARAMETRIC_EDITABLE != HUMAN_ADJUSTABLE',
      'REAL_PALMIER_EXPORT_REQUIRED',
      'REAL_WEDDING_PROJECT_MUTATION_FORBIDDEN',
      'FAILED_SESSION_MUST_NOT_BE_OVERWRITTEN',
    ],
    nextAction: 'Use the Resolve 21 Wave A local Actual agent prompt. Execute each immutable session in order in disposable Resolve projects and record only observed values.',
  };

  mkdirSync(batchDir, {recursive: true});
  writeFileSync(batchPath, `${JSON.stringify(summary, null, 2)}\n`, 'utf8');

  console.log(`\n✅ Resolve Local Actual Wave A prepared: ${toMotionRelative(batchPath)}`);
  for (const session of sessions) {
    console.log(`   ${session.canaryId}: ${session.sessionStatus} / ${session.evidenceResult}`);
    console.log(`      focus=${session.humanFocus}`);
    console.log(`      RUN=${session.runInstructionsPath}`);
    console.log(`      evidence=${session.evidencePath}`);
  }
  console.log('   runtimeLaunchPerformed=NO');
  console.log('   Palmier excluded until a real scene-v2 export is attached.');
  console.log('Next: execute Wave A in disposable Resolve projects only.');
} catch (error) {
  console.error(`❌ ${error instanceof Error ? error.message : error}`);
  process.exit(1);
}
