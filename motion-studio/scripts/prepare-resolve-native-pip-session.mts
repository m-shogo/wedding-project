import {existsSync, mkdirSync, readFileSync, writeFileSync} from 'node:fs';
import {dirname, join, relative} from 'node:path';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {resolveCanaryInputManifestSchema} from '../src/data/resolveCanaryInputFixtures.ts';
import {resolveCanarySessionSchema} from '../src/data/resolveCanarySession.schema.ts';
import {createResolveNativePIPEvidenceTemplate, resolveNativePIPCanary} from '../src/data/resolveNativePIP.ts';
import {resolveRuntimeCanaryEvidenceSchema} from '../src/data/resolveRuntimeCanary.schema.ts';

const motionRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const canary = resolveNativePIPCanary;
const canaryId = canary.id;
const manifestRel = `out/canary-inputs/manifests/${canaryId}.json`;
const manifestPath = join(motionRoot, manifestRel);

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
  if (result.status !== 0) throw new Error(`Command failed: ${command} ${commandArgs.join(' ')}\n${result.stderr || ''}`);
  return result.stdout;
}

function toMotionRelative(path: string) {
  return relative(motionRoot, path).replaceAll('\\', '/');
}

try {
  const executionId = valueFor('--execution-id');
  if (!executionId) throw new Error('--execution-id is required.');
  if (!/^[A-Za-z0-9._-]+$/.test(executionId)) throw new Error('--execution-id contains unsupported characters.');

  const sessionDir = join(motionRoot, 'out', 'canary-sessions', executionId);
  if (existsSync(sessionDir)) throw new Error(`Session already exists and will not be overwritten: ${toMotionRelative(sessionDir)}`);

  const reuseExisting = args.includes('--reuse-existing');
  if (reuseExisting) {
    if (!existsSync(manifestPath)) throw new Error(`No native PiP manifest to reuse: ${manifestRel}`);
    run(process.execPath, ['--no-warnings', 'scripts/validate-resolve-native-pip-fixture.mts', manifestRel]);
    console.log(`↺ reusing validated native PiP fixture: ${manifestRel}`);
  } else {
    run(process.execPath, ['--no-warnings', 'scripts/prepare-resolve-native-pip-fixture.mts']);
    run(process.execPath, ['--no-warnings', 'scripts/validate-resolve-native-pip-fixture.mts', manifestRel]);
  }

  const manifest = resolveCanaryInputManifestSchema.parse(JSON.parse(readFileSync(manifestPath, 'utf8')));
  if (manifest.canaryId !== canaryId || manifest.status !== 'PREPARED') {
    throw new Error(`Native PiP Session requires PREPARED ${canaryId} manifest.`);
  }

  const evidence = createResolveNativePIPEvidenceTemplate(executionId);
  for (const input of evidence.inputInventory) {
    const file = manifest.files.find((item) => item.id === input.id);
    if (!file) throw new Error(`Prepared manifest missing required canary input: ${input.id}`);
    input.present = true;
    input.pathOrRef = file.path;
    input.sha256 = file.sha256;
  }
  const hydratedEvidence = resolveRuntimeCanaryEvidenceSchema.parse(evidence);
  if (hydratedEvidence.result !== 'NOT_RUN' || hydratedEvidence.promotionEligible) {
    throw new Error('Fresh native PiP evidence must remain NOT_RUN and promotionEligible=false.');
  }

  mkdirSync(sessionDir, {recursive: true});
  const planPath = join(sessionDir, 'plan.md');
  const evidencePath = join(sessionDir, 'evidence.json');
  const runPath = join(sessionDir, 'RUN.md');
  const sessionPath = join(sessionDir, 'session.json');

  const plan = runCapture(process.execPath, ['--no-warnings', 'scripts/resolve-native-pip-runtime-plan.mts']);
  writeFileSync(planPath, plan.endsWith('\n') ? plan : `${plan}\n`, 'utf8');
  writeFileSync(evidencePath, `${JSON.stringify(hydratedEvidence, null, 2)}\n`, 'utf8');
  run(process.execPath, ['--no-warnings', 'scripts/validate-resolve-native-pip-evidence.mts', toMotionRelative(evidencePath)]);

  const guardrails = Array.from(new Set([
    'SESSION_PREPARED != RESOLVE_EXECUTED',
    'SESSION_READY != CANARY_PASS',
    'FIXTURE_VALID != EFFECT_AVAILABLE',
    ...canary.guardrails,
    ...manifest.guardrails,
  ]));
  const nextAction = 'Open the exact Resolve 21 runtime in a disposable project, verify Picture in Picture availability for that edition, perform only the bounded Inspector edits in plan.md, save/reopen, render, and record observed values in evidence.json.';

  const runInstructions = `# Resolve Native PiP Session — ${canaryId}\n\nExecution ID: \`${executionId}\`  \nStatus: **READY_FOR_RUNTIME**  \nCatalog state: \`${canary.state}\`  \nPrepared at: ${new Date().toISOString()}\n\n## Files\n\n- plan: \`plan.md\`\n- evidence: \`evidence.json\`\n- session: \`session.json\`\n- input manifest: \`${manifestRel}\`\n\n## Runtime boundary\n\nThis preparation did not launch DaVinci Resolve.\n\n1. Capture exact live product/version/edition/platform.\n2. Use a disposable timeline only.\n3. Put background on V1 and top source on V2.\n4. Verify Picture in Picture availability before applying it.\n5. Inventory controls before editing.\n6. Build the neutral card without opening Fusion.\n7. Perform bounded late edits to rounding, border, and position/size.\n8. Classify keyframe/animation support separately.\n9. Save/reopen, render a short sample, hash it, and add it as artifact kind \`RENDER\`.\n10. Validate evidence after material edits.\n\n## Required readback keys for promotion\n\n- \`effect-availability.readback.available = true\`\n- \`style-photo-card.readback.fusionOpened = false\`\n- \`human-late-edit.readback.fusionOpened = false\`\n- \`save-reopen-render.readback.postReopenPersisted = true\`\n- \`save-reopen-render.readback.renderVisualMatch = true\`\n\nValidator:\n\n\`\`\`bash\nnode --no-warnings scripts/validate-resolve-native-pip-evidence.mts ${toMotionRelative(evidencePath)}\n\`\`\`\n\n## Guardrails\n\n${guardrails.map((item) => `- ${item}`).join('\n')}\n\nOne successful execution is not reproduced truth.\n`;
  writeFileSync(runPath, runInstructions, 'utf8');

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
      runInstructions: toMotionRelative(runPath),
    },
    nextAction,
    guardrails,
  });
  writeFileSync(sessionPath, `${JSON.stringify(session, null, 2)}\n`, 'utf8');

  console.log(`✅ Resolve native PiP Session prepared: ${toMotionRelative(sessionDir)}`);
  console.log(`   executionId=${executionId}`);
  console.log('   status=READY_FOR_RUNTIME');
  console.log(`   catalogState=${canary.state}`);
  console.log('   evidenceResult=NOT_RUN');
  console.log('   runtimeLaunchPerformed=NO');
} catch (error) {
  console.error(`❌ ${error instanceof Error ? error.message : error}`);
  process.exit(1);
}
