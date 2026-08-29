import {existsSync, readFileSync, writeFileSync} from 'node:fs';
import {dirname, join, relative} from 'node:path';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {resolveCanarySessionSchema} from '../src/data/resolveCanarySession.schema.ts';
import {resolveRuntimeCanaryEvidenceSchema} from '../src/data/resolveRuntimeCanary.schema.ts';
import {
  createResolvePalmierFCPXMLV2EvidenceTemplate,
  resolvePalmierFCPXMLV2RuntimeCanary as canary,
} from '../src/data/resolvePalmierFCPXMLV2Runtime.ts';

const motionRoot = join(dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const canaryId = 'DV21-PALMIER-FCPXML-01';

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
  if (args.includes('--help')) {
    console.log('Usage: node --no-warnings scripts/prepare-palmier-fcpxml-v2-resolve-session.mts --execution-id <ID>');
    console.log('Requires an existing PREPARED Palmier scene-v2 manifest created from a real operator-attested export.');
    process.exit(0);
  }

  const executionId = valueFor('--execution-id');
  if (!executionId) throw new Error('--execution-id is required.');
  if (!/^[A-Za-z0-9._-]+$/.test(executionId)) {
    throw new Error('--execution-id may contain only letters, numbers, dot, underscore, and hyphen.');
  }

  const sessionDir = join(motionRoot, 'out', 'canary-sessions', executionId);
  if (existsSync(sessionDir)) {
    throw new Error(`Session already exists and will not be overwritten: ${toMotionRelative(sessionDir)}`);
  }

  // Reuse the proven generic attachment/hydration path first. It fails closed when the Palmier
  // manifest is still BLOCKED, so this wrapper cannot manufacture a READY session from scene spec alone.
  run(process.execPath, [
    '--no-warnings',
    'scripts/prepare-resolve-canary-session.mts',
    canaryId,
    '--execution-id', executionId,
    '--reuse-existing',
  ]);

  const sessionPath = join(sessionDir, 'session.json');
  const planPath = join(sessionDir, 'plan.md');
  const evidencePath = join(sessionDir, 'evidence.json');
  const runPath = join(sessionDir, 'RUN.md');

  const baseSession = resolveCanarySessionSchema.parse(JSON.parse(readFileSync(sessionPath, 'utf8')));
  if (baseSession.status !== 'READY_FOR_RUNTIME' || baseSession.inputManifestStatus !== 'PREPARED') {
    throw new Error(`Palmier v2 requires READY_FOR_RUNTIME + PREPARED after generic hydration; got ${baseSession.status}/${baseSession.inputManifestStatus}.`);
  }

  const hydratedBaseEvidence = resolveRuntimeCanaryEvidenceSchema.parse(JSON.parse(readFileSync(evidencePath, 'utf8')));
  if (hydratedBaseEvidence.result !== 'NOT_RUN') {
    throw new Error(`Pre-runtime hydrated evidence must remain NOT_RUN, got ${hydratedBaseEvidence.result}.`);
  }

  const effectiveEvidence = createResolvePalmierFCPXMLV2EvidenceTemplate(executionId);
  effectiveEvidence.inputInventory = hydratedBaseEvidence.inputInventory;
  effectiveEvidence.notes = Array.from(new Set([
    ...effectiveEvidence.notes,
    ...hydratedBaseEvidence.notes,
    'Input provenance was hydrated by the generic Palmier manifest route before replacing the runtime step set with the scene-v2 effective definition.',
  ]));
  writeFileSync(evidencePath, `${JSON.stringify(effectiveEvidence, null, 2)}\n`, 'utf8');

  const plan = runCapture(process.execPath, ['--no-warnings', 'scripts/resolve-palmier-fcpxml-v2-runtime-plan.mts']);
  writeFileSync(planPath, plan.endsWith('\n') ? plan : `${plan}\n`, 'utf8');

  run(process.execPath, [
    '--no-warnings',
    'scripts/validate-palmier-fcpxml-v2-resolve-evidence.mts',
    evidencePath,
  ]);

  const nextAction =
    'Open Resolve manually in a disposable project, capture exact live product/version/edition/platform, execute the Palmier scene-v2 effective plan.md including text-scale, title-box, nested, render and save/reopen steps, and record only observed values in evidence.json.';
  const guardrails = Array.from(new Set([
    ...baseSession.guardrails,
    ...canary.guardrails,
    'PALMIER_V2_EFFECTIVE_PLAN_REQUIRED',
    'BASE_SESSION_HYDRATION != V2_RUNTIME_EXECUTION',
    'SCENE_CONTRACT_PASS != RESOLVE_IMPORT_VERIFIED',
  ]));

  const session = resolveCanarySessionSchema.parse({
    ...baseSession,
    nextAction,
    guardrails,
  });
  writeFileSync(sessionPath, `${JSON.stringify(session, null, 2)}\n`, 'utf8');

  const runInstructions = `# Resolve Canary Session — ${canaryId} / Palmier Scene v2 Effective Runtime\n\nExecution ID: \`${executionId}\`  \nStatus: **${session.status}**  \nInput manifest: **${session.inputManifestStatus}**  \nRuntime launched: **NO**\n\n## Files\n\n- Effective v2 plan: \`plan.md\`\n- Hydrated v2 evidence: \`evidence.json\`\n- Session metadata: \`session.json\`\n- Input manifest: \`${session.paths.inputManifest}\`\n\n## Next action\n\n${nextAction}\n\n## Required runtime focus\n\n1. ordinary inventory/transform/crop/static volume vs audio automation\n2. \`PALMIER_CANARY_TEXT_SCALE\` independent width/height scale + animation\n3. \`PALMIER_CANARY_TITLE_BOX_TRANSFORM\` separate title-box omission/mapping\n4. \`PALMIER_CANARY_NEST_L1\` and \`PALMIER_CANARY_NEST_L2\` representation/timing/editability\n5. short neutral render checkpoint with SHA-256\n6. save/reopen readback\n\n## Evidence validator\n\n\`\`\`bash\nnode --no-warnings scripts/validate-palmier-fcpxml-v2-resolve-evidence.mts ${toMotionRelative(evidencePath)}\n\`\`\`\n\n## Guardrails\n\n${guardrails.map((item) => `- ${item}`).join('\n')}\n\nDo not promote canonical policy from one successful execution. The effective definition still requires two independent runs.\n`;
  writeFileSync(runPath, runInstructions, 'utf8');

  console.log(`\n✅ Palmier FCPXML scene-v2 Resolve session prepared: ${toMotionRelative(sessionDir)}`);
  console.log(`   executionId=${executionId}`);
  console.log(`   status=${session.status}`);
  console.log('   effectivePlan=PALMIER_SCENE_V2_RUNTIME_OVERLAY');
  console.log(`   steps=${effectiveEvidence.stepResults.length}`);
  console.log(`   requiresRender=${canary.promotion.requiresRender ? 'YES' : 'NO'}`);
  console.log('   runtimeLaunchPerformed=NO');
} catch (error) {
  console.error(`❌ ${error instanceof Error ? error.message : error}`);
  process.exit(1);
}
