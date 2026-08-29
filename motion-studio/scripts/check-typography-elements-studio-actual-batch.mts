import {createHash} from 'node:crypto';
import {existsSync, readFileSync} from 'node:fs';
import {join, resolve} from 'node:path';

const motionStudioRoot = process.cwd();
const repoRoot = resolve(motionStudioRoot, '..');
const outputRoot = join(repoRoot, 'movie-dashboard', 'out', 'remotion-element-actual-batch');
const errors: string[] = [];
const fail = (message: string) => errors.push(message);
const sha256File = (path: string) => createHash('sha256').update(readFileSync(path)).digest('hex');
const expectedIds = [
  'type-mask-reveal',
  'type-char-stagger',
  'type-type-on-rhythm',
  'type-word-punch',
  'type-tracking-burst',
  'type-vertical-wipe',
  'type-outline-fill',
  'type-baseline-hop',
  'type-triplet',
];

for (const path of [
  'batch-manifest.json', 'index.html', 'main.ts', 'studio-sandbox/src/Root.tsx', 'studio-sandbox/src/index.ts',
  ...expectedIds.map((id) => `payloads/${id}.json`),
]) {
  if (!existsSync(join(outputRoot, path))) fail(`missing prepared Actual artifact: ${path}`);
}

if (errors.length === 0) {
  const manifest = JSON.parse(readFileSync(join(outputRoot, 'batch-manifest.json'), 'utf8')) as {
    schemaVersion?: string;
    purpose?: string;
    studioVersionTarget?: string;
    candidates?: Array<Record<string, unknown> & {
      patternId?: string;
      payloadPath?: string;
      payloadSha256?: string;
      builderPath?: string;
      builderSha256?: string;
      checkerPath?: string;
      checkerSha256?: string;
      kitSha256?: string;
      expectedControls?: string[];
    }>;
    guardrails?: string[];
  };
  if (manifest.schemaVersion !== 'remotion-element-studio-actual-batch/v1') fail('unexpected Actual batch schema');
  if (manifest.purpose !== 'BOUNDED_MAC_STUDIO_ACTUAL_BATCH') fail('unexpected batch purpose');
  if (manifest.studioVersionTarget !== '4.0.517') fail('Studio target must stay pinned to 4.0.517 for this Actual');
  if (manifest.candidates?.length !== expectedIds.length) fail(`batch must contain exactly ${expectedIds.length} Typography Element candidates`);

  const currentKitSha256 = sha256File(join(motionStudioRoot, 'scripts/lib/typography-element-kit.mts'));
  for (const patternId of expectedIds) {
    const candidate = manifest.candidates?.find((item) => item.patternId === patternId);
    if (!candidate) {
      fail(`missing batch candidate: ${patternId}`);
      continue;
    }
    for (const field of ['text', 'intensity', 'color', 'translate', 'scale', 'rotate', 'opacity']) {
      if (!candidate.expectedControls?.includes(field)) fail(`${patternId}: missing expected control ${field}`);
    }
    for (const state of [
      'requestTransport', 'confirmationDialog', 'elementFileWritten', 'timelineInsertion', 'controlMutation',
      'sourceReadback', 'undoRedo', 'reloadPersistence', 'studioRestartPersistence', 'exitVisual', 'postInstallRender',
    ]) {
      if (candidate[state] !== 'NOT_RUN') fail(`${patternId}: ${state} must remain NOT_RUN in generated prep evidence`);
    }

    if (!candidate.payloadPath || !candidate.payloadSha256) {
      fail(`${patternId}: missing payload SHA binding`);
    } else {
      const payloadPath = join(outputRoot, candidate.payloadPath);
      if (!existsSync(payloadPath)) fail(`${patternId}: payload path missing: ${candidate.payloadPath}`);
      else if (sha256File(payloadPath) !== candidate.payloadSha256) fail(`${patternId}: prepared payload SHA is STALE`);
    }
    if (!candidate.builderPath || !candidate.builderSha256) {
      fail(`${patternId}: missing builder SHA binding`);
    } else {
      const builderPath = join(motionStudioRoot, candidate.builderPath);
      if (!existsSync(builderPath)) fail(`${patternId}: builder source missing: ${candidate.builderPath}`);
      else if (sha256File(builderPath) !== candidate.builderSha256) fail(`${patternId}: builder source changed after batch prep`);
    }
    if (!candidate.checkerPath || !candidate.checkerSha256) {
      fail(`${patternId}: missing checker SHA binding`);
    } else {
      const checkerPath = join(motionStudioRoot, candidate.checkerPath);
      if (!existsSync(checkerPath)) fail(`${patternId}: checker source missing: ${candidate.checkerPath}`);
      else if (sha256File(checkerPath) !== candidate.checkerSha256) fail(`${patternId}: checker source changed after batch prep`);
    }
    if (candidate.kitSha256 !== currentKitSha256) fail(`${patternId}: shared typography element kit changed after batch prep`);
  }

  for (const guardrail of [
    'AWAITING_CONFIRMATION != INSTALL_CONFIRMED',
    'ELEMENT_FILE_WRITTEN != TIMELINE_INSERTION_VERIFIED',
    'CONTROL_VISIBLE != CONTROL_MUTATION_PERSISTED',
    'REQUEST_TRANSPORT_PASS != STUDIO_ACTUAL_PASS',
    'BATCH_PREPARED != BATCH_EXECUTED',
    'PAYLOAD_OR_BUILDER_OR_CHECKER_OR_KIT_SHA_CHANGED => BATCH_STALE',
  ]) {
    if (!manifest.guardrails?.includes(guardrail)) fail(`missing batch guardrail: ${guardrail}`);
  }

  const harness = readFileSync(join(outputRoot, 'main.ts'), 'utf8');
  for (const token of ['installInStudio', "@remotion/studio-protocol", 'awaiting-confirmation is transport only, not install PASS']) {
    if (!harness.includes(token)) fail(`Actual harness missing honesty token: ${token}`);
  }

  const sandbox = readFileSync(join(outputRoot, 'studio-sandbox/src/Root.tsx'), 'utf8');
  for (const token of ['TypographyElementActualSandbox', 'width={1280}', 'height={720}', 'fps={30}', 'durationInFrames={180}']) {
    if (!sandbox.includes(token)) fail(`Actual sandbox contract missing: ${token}`);
  }
}

if (errors.length > 0) {
  console.error(`Typography Element Studio Actual batch FAILED (${errors.length})`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`✅ Typography Element Studio Actual batch is SHA-bound, current, ${expectedIds.length}-candidate, and honestly NOT_RUN.`);
console.log(`candidateCount=${expectedIds.length}`);
console.log('batchCurrent=CURRENT_SHA_BOUND');
console.log('studioActual=NOT_RUN');
