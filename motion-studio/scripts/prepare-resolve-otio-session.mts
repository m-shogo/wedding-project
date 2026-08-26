import {existsSync, mkdirSync, readFileSync, writeFileSync} from 'node:fs';
import {dirname, join, relative} from 'node:path';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {resolveCanaryInputManifestSchema} from '../src/data/resolveCanaryInputFixtures.ts';
import {resolveCanarySessionSchema} from '../src/data/resolveCanarySession.schema.ts';
import {
  createResolveOTIOInterchangeEvidenceTemplate,
  resolveOTIOInterchangeCanary,
} from '../src/data/resolveOTIOInterchange.ts';
import {resolveRuntimeCanaryEvidenceSchema} from '../src/data/resolveRuntimeCanary.schema.ts';

const motionRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const canary = resolveOTIOInterchangeCanary;
const canaryId = canary.id;
const manifestRel = `out/canary-inputs/manifests/${canaryId}.json`;
const manifestPath = join(motionRoot, manifestRel);

function usage() {
  console.log('Resolve OTIO Session Preparation');
  console.log('');
  console.log('Usage:');
  console.log('  node --no-warnings scripts/prepare-resolve-otio-session.mts --execution-id <ID> [--reuse-existing]');
  console.log('');
  console.log('Prepares/validates the neutral OTIO + OTIOZ fixture and creates an ignored immutable runtime Session.');
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
  if (result.status !== 0) throw new Error(`Command failed (${result.status ?? 'unknown'}): ${command} ${commandArgs.join(' ')}`);
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
  if (args.includes('--help')) {
    usage();
    process.exit(0);
  }

  const executionId = valueFor('--execution-id');
  if (!executionId) throw new Error('--execution-id is required.');
  if (!/^[A-Za-z0-9._-]+$/.test(executionId)) {
    throw new Error('--execution-id may contain only letters, numbers, dot, underscore, and hyphen.');
  }

  const sessionDir = join(motionRoot, 'out', 'canary-sessions', executionId);
  if (existsSync(sessionDir)) throw new Error(`Session already exists and will not be overwritten: ${toMotionRelative(sessionDir)}`);

  const reuseExisting = args.includes('--reuse-existing');
  if (reuseExisting) {
    if (!existsSync(manifestPath)) throw new Error(`No existing OTIO manifest to reuse: ${manifestRel}`);
    run(process.execPath, ['--no-warnings', 'scripts/validate-resolve-otio-fixture.mts', manifestRel]);
    console.log(`↺ reusing validated OTIO fixture manifest: ${manifestRel}`);
  } else {
    run(process.execPath, ['--no-warnings', 'scripts/prepare-resolve-otio-fixture.mts']);
    run(process.execPath, ['--no-warnings', 'scripts/validate-resolve-otio-fixture.mts', manifestRel]);
  }

  const manifest = resolveCanaryInputManifestSchema.parse(JSON.parse(readFileSync(manifestPath, 'utf8')));
  if (manifest.canaryId !== canaryId) throw new Error(`Prepared manifest canary mismatch: expected=${canaryId} actual=${manifest.canaryId}`);
  if (manifest.status !== 'PREPARED') throw new Error(`OTIO runtime Session requires PREPARED manifest, got ${manifest.status}.`);

  const evidence = createResolveOTIOInterchangeEvidenceTemplate(executionId);
  for (const input of evidence.inputInventory) {
    const file = manifest.files.find((item) => item.id === input.id);
    if (!file) throw new Error(`Prepared OTIO manifest is missing canary input: ${input.id}`);
    input.present = true;
    input.pathOrRef = file.path;
    input.sha256 = file.sha256;
  }
  const hydratedEvidence = resolveRuntimeCanaryEvidenceSchema.parse(evidence);

  mkdirSync(sessionDir, {recursive: true});
  const planPath = join(sessionDir, 'plan.md');
  const evidencePath = join(sessionDir, 'evidence.json');
  const runInstructionsPath = join(sessionDir, 'RUN.md');
  const sessionJsonPath = join(sessionDir, 'session.json');

  const plan = runCapture(process.execPath, ['--no-warnings', 'scripts/resolve-otio-runtime-plan.mts']);
  writeFileSync(planPath, plan.endsWith('\n') ? plan : `${plan}\n`, 'utf8');
  writeFileSync(evidencePath, `${JSON.stringify(hydratedEvidence, null, 2)}\n`, 'utf8');
  run(process.execPath, ['--no-warnings', 'scripts/validate-resolve-otio-evidence.mts', toMotionRelative(evidencePath)]);

  if (hydratedEvidence.result !== 'NOT_RUN' || hydratedEvidence.promotionEligible) {
    throw new Error('Fresh OTIO Session evidence must remain NOT_RUN and promotionEligible=false.');
  }

  const nextAction = `Run the read-only Resolve identity/API-documentation probes, then open Resolve in disposable contexts and execute ${canaryId} from plan.md. Compare plain OTIO, OTIOZ, Resolve-exported OTIO and clean reimport separately.`;
  const sessionGuardrails = Array.from(new Set([
    'SESSION_PREPARED != RESOLVE_EXECUTED',
    'SESSION_READY != CANARY_PASS',
    'FIXTURE_VALID != RESOLVE_IMPORTED',
    'README_SURFACE_PRESENT != RUNTIME_CALL_VERIFIED',
    'SCRIPTABLE_OTIO_IMPORT != EDITORIAL_MAPPING_VERIFIED',
    'EXPORT_OTIO_CALL_SUCCESS != CLEAN_REIMPORT_FIDELITY',
    'OTIO_IMPORT_SUCCESS != EFFECT_FIDELITY',
    'RESOLVE_OTIO_METADATA_PRESENT != CROSS_NLE_EFFECT_SEMANTICS',
    'EXECUTION_ID_MUST_NOT_OVERWRITE_PRIOR_EVIDENCE',
    ...canary.guardrails,
    ...manifest.guardrails,
  ]));

  const runInstructions = `# Resolve OTIO Canary Session — ${canaryId}\n\nExecution ID: \`${executionId}\`  \nStatus: **READY_FOR_RUNTIME**  \nCanary state at preparation: \`${canary.state}\`  \nPrepared at: ${new Date().toISOString()}\n\n## Files\n\n- Runtime plan: \`plan.md\`\n- Hydrated evidence: \`evidence.json\`\n- Session metadata: \`session.json\`\n- Input manifest: \`${manifestRel}\`\n\n## Next action\n\n${nextAction}\n\n## Read-only local preflight\n\nFrom repo root, before Resolve mutation:\n\n\`\`\`bash\nbash scripts/davinci/resolve21-runtime-readonly-probe.sh\nbash scripts/davinci/resolve21-otio-api-readonly-probe.sh\n\`\`\`\n\nThe OTIO API probe reads only installed Resolve scripting documentation. It does not launch Resolve or call the API. If the exact local documentation reports OTIO import/export surfaces, a supported scripting route may be tested only in disposable contexts. If unavailable, use the documented Resolve UI route.\n\n\`README_SURFACE_PRESENT != RUNTIME_CALL_VERIFIED\`\n\n## Runtime order\n\n1. Capture exact live Resolve product/version/edition/platform and record which supported UI/API OTIO route is actually available.\n2. Import plain \`.otio\` in a clean disposable context and record external-media behavior.\n3. Import \`.otioz\` separately and record bundled-media behavior.\n4. Read back clip/track/source-range/gap/transition/marker mapping.\n5. Make one bounded native editorial edit and save/reopen.\n6. Export that disposable timeline as Resolve OTIO and record it as an \`OTIO_EXPORT\` artifact with SHA-256.\n7. Inspect standard OTIO objects separately from any \`Resolve_OTIO\` metadata.\n8. Clean-reimport the exported OTIO and read back the bounded edit.\n9. Run the OTIO evidence validator after material edits.\n\n## Supported scripting boundary\n\nIf the installed/local Resolve documentation and live supported API expose an OTIO import/export route, record the exact object/method/arguments/return value before using it. Do not infer timeline fidelity from a successful call. UI fallback remains valid when the scripting surface is unavailable.\n\n- \`README_SURFACE_PRESENT != RUNTIME_CALL_VERIFIED\`\n- \`SCRIPTABLE_OTIO_IMPORT != EDITORIAL_MAPPING_VERIFIED\`\n- \`EXPORT_OTIO_CALL_SUCCESS != CLEAN_REIMPORT_FIDELITY\`\n\n## Validator\n\n\`\`\`bash\nnode --no-warnings scripts/validate-resolve-otio-evidence.mts ${toMotionRelative(evidencePath)}\n\`\`\`\n\n## Guardrails\n\n${sessionGuardrails.map((guardrail) => `- ${guardrail}`).join('\n')}\n\nOne successful execution is not reproduced/canonical trust.\n`;
  writeFileSync(runInstructionsPath, runInstructions, 'utf8');

  const session = resolveCanarySessionSchema.parse({
    schemaVersion: 'resolve-canary-session/v1',
    canaryId,
    executionId,
    createdAt: new Date().toISOString(),
    status: 'READY_FOR_RUNTIME',
    catalogStateAtPreparation: canary.state,
    canaryStateAtPreparation: canary.state,
    inputManifestStatus: manifest.status,
    targetResolveMajor: 21,
    runtimeLaunchPerformed: false,
    networkInstallRequested: false,
    paths: {
      sessionDir: toMotionRelative(sessionDir),
      inputManifest: manifestRel,
      evidence: toMotionRelative(evidencePath),
      plan: toMotionRelative(planPath),
      runInstructions: toMotionRelative(runInstructionsPath),
    },
    nextAction,
    guardrails: sessionGuardrails,
  });
  writeFileSync(sessionJsonPath, `${JSON.stringify(session, null, 2)}\n`, 'utf8');

  console.log(`\n✅ Resolve OTIO Session prepared: ${toMotionRelative(sessionDir)}`);
  console.log(`   canary=${canaryId}`);
  console.log(`   executionId=${executionId}`);
  console.log('   status=READY_FOR_RUNTIME');
  console.log(`   evidenceResult=${hydratedEvidence.result}`);
  console.log('   promotionEligible=NO');
  console.log('   runtimeLaunchPerformed=NO');
} catch (error) {
  console.error(`❌ ${error instanceof Error ? error.message : error}`);
  process.exit(1);
}
