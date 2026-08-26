import {execFileSync} from 'node:child_process';
import {mkdirSync, readFileSync, rmSync, writeFileSync} from 'node:fs';
import {join, resolve} from 'node:path';

const motionStudioRoot = process.cwd();
const repoRoot = resolve(motionStudioRoot, '..');
const outputRoot = join(repoRoot, 'movie-dashboard', 'out', 'remotion-element-actual-batch');
const payloadDir = join(outputRoot, 'payloads');
const sandboxDir = join(outputRoot, 'studio-sandbox');

const sharedControls = ['text', 'intensity', 'color', 'translate', 'scale', 'rotate', 'opacity'] as const;
const candidates = [
  ['type-mask-reveal', 'wedding/mask-reveal', 'mask-reveal'],
  ['type-char-stagger', 'wedding/char-stagger', 'char-stagger'],
  ['type-type-on-rhythm', 'wedding/type-on-rhythm', 'type-on-rhythm'],
  ['type-word-punch', 'wedding/word-punch', 'word-punch'],
  ['type-tracking-burst', 'wedding/tracking-burst', 'tracking-burst'],
  ['type-vertical-wipe', 'wedding/vertical-wipe', 'vertical-wipe'],
].map(([patternId, slug, sourceDir]) => ({
  patternId,
  slug,
  builder: `scripts/build-${sourceDir}-element-payload.mts`,
  checker: `scripts/check-${sourceDir}-element-payload.mts`,
  sourceDir,
  payloadFile: `${sourceDir}.element-payload.json`,
  expectedControls: [...sharedControls],
}));

const runNode = (script: string) => {
  execFileSync(process.execPath, ['--no-warnings', script], {cwd: motionStudioRoot, stdio: 'inherit'});
};

rmSync(outputRoot, {recursive: true, force: true});
mkdirSync(payloadDir, {recursive: true});
mkdirSync(join(sandboxDir, 'src'), {recursive: true});

for (const candidate of candidates) {
  runNode(candidate.builder);
  runNode(candidate.checker);
  const payloadPath = join(motionStudioRoot, 'out', 'research', 'remotion-elements', candidate.sourceDir, candidate.payloadFile);
  const payload = JSON.parse(readFileSync(payloadPath, 'utf8')) as {type?: string; version?: number; element?: {slug?: string}};
  if (payload.type !== 'remotion-element' || payload.version !== 1) throw new Error(`${candidate.patternId}: unexpected payload envelope`);
  if (payload.element?.slug !== candidate.slug) throw new Error(`${candidate.patternId}: payload slug mismatch`);
  writeFileSync(join(payloadDir, `${candidate.patternId}.json`), `${JSON.stringify(payload, null, 2)}\n`);
}

const manifest = {
  generatedAt: new Date().toISOString(),
  purpose: 'BOUNDED_MAC_STUDIO_ACTUAL_BATCH',
  studioVersionTarget: '4.0.517',
  candidates: candidates.map((candidate) => ({
    patternId: candidate.patternId,
    slug: candidate.slug,
    payloadPath: `payloads/${candidate.patternId}.json`,
    expectedControls: candidate.expectedControls,
    requestTransport: 'NOT_RUN',
    confirmationDialog: 'NOT_RUN',
    elementFileWritten: 'NOT_RUN',
    timelineInsertion: 'NOT_RUN',
    controlMutation: 'NOT_RUN',
    sourceReadback: 'NOT_RUN',
    undoRedo: 'NOT_RUN',
    reloadPersistence: 'NOT_RUN',
    studioRestartPersistence: 'NOT_RUN',
    exitVisual: 'NOT_RUN',
    postInstallRender: 'NOT_RUN',
  })),
  guardrails: [
    'AWAITING_CONFIRMATION != INSTALL_CONFIRMED',
    'ELEMENT_FILE_WRITTEN != TIMELINE_INSERTION_VERIFIED',
    'CONTROL_VISIBLE != CONTROL_MUTATION_PERSISTED',
    'REQUEST_TRANSPORT_PASS != STUDIO_ACTUAL_PASS',
    'BATCH_PREPARED != BATCH_EXECUTED',
  ],
};
writeFileSync(join(outputRoot, 'batch-manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`);

writeFileSync(join(sandboxDir, 'src', 'Root.tsx'), `import {AbsoluteFill, Composition} from 'remotion';\n\nconst TypographyElementActualSandbox = () => (\n  <AbsoluteFill style={{backgroundColor: '#20242b'}} />\n);\n\nexport const Root = () => (\n  <Composition id="TypographyElementActualSandbox" component={TypographyElementActualSandbox} width={1280} height={720} fps={30} durationInFrames={180} />\n);\n`);
writeFileSync(join(sandboxDir, 'src', 'index.ts'), `import {registerRoot} from 'remotion';\nimport {Root} from './Root';\nregisterRoot(Root);\n`);
writeFileSync(join(outputRoot, 'index.html'), `<!doctype html>\n<html lang="ja">\n<head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width,initial-scale=1" /><title>Typography Element Actual Batch</title></head>\n<body>\n<h1>Typography Element Actual Batch</h1>\n<p>Each request only proves transport until Studio confirmation and the remaining Actual checks pass.</p>\n<div id="actions"></div><pre id="result"></pre><script type="module" src="/main.ts"></script>\n</body></html>\n`);
writeFileSync(join(outputRoot, 'main.ts'), `import {installInStudio, type StudioElementPayload} from '@remotion/studio-protocol';\nimport batch from './batch-manifest.json';\nconst actions = document.querySelector<HTMLDivElement>('#actions');\nconst result = document.querySelector<HTMLPreElement>('#result');\nif (!actions || !result) throw new Error('Actual harness DOM missing');\nfor (const candidate of batch.candidates) {\n const button = document.createElement('button');\n button.textContent = 'Request ' + candidate.patternId;\n button.style.display = 'block'; button.style.margin = '12px 0';\n button.addEventListener('click', async () => {\n  result.textContent = 'loading payload...';\n  const payload = await fetch('./' + candidate.payloadPath).then((response) => {if (!response.ok) throw new Error('payload fetch failed: ' + response.status); return response.json();});\n  result.textContent = 'sending request...';\n  const response = await installInStudio({payload: payload as StudioElementPayload});\n  result.textContent = candidate.patternId + '\\n' + JSON.stringify(response, null, 2) + '\\n\\nIMPORTANT: awaiting-confirmation is transport only, not install PASS.';\n });\n actions.appendChild(button);\n}\n`);

console.log('✅ Typography Element Studio Actual batch prepared.');
console.log(`output=${outputRoot}`);
console.log(`candidateCount=${candidates.length}`);
console.log('studioActual=NOT_RUN');
