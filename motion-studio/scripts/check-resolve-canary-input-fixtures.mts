import {readFileSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {
  alphaCanaryFixture,
  audioRecoveryHumanMaster,
  palmierFcpxmlSyntheticSceneSpec,
  resolveCanaryInputManifestSchema,
  resolveCanaryInputPreparationCommands,
} from '../src/data/resolveCanaryInputFixtures.ts';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
let errors = 0;
const err = (message: string) => {
  errors += 1;
  console.error(`❌ ${message}`);
};
const ok = (message: string) => console.log(`✅ ${message}`);

const packageJson = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8')) as {
  scripts?: Record<string, string>;
};
const alphaRenderScript = packageJson.scripts?.['render:stamp-test:prores'] ?? '';
for (const token of [
  '透過確認-押印',
  alphaCanaryFixture.outputPath,
  '--codec=prores',
  '--prores-profile=4444',
  '--image-format=png',
  '--pixel-format=yuva444p10le',
]) {
  if (!alphaRenderScript.includes(token)) err(`alpha render command missing: ${token}`);
}
if (alphaCanaryFixture.canaryId !== 'DV21-REMOTION-ALPHA-01') {
  err('alpha fixture must stay linked to DV21-REMOTION-ALPHA-01');
}

const audio = audioRecoveryHumanMaster;
if (audio.source.copyrightedContent !== false) err('audio fixture must remain copyright-free synthetic content');
if (audio.source.sampleRateHz !== 48000) err('audio fixture must use 48kHz');
if (audio.source.channels !== 2) err('audio fixture must be stereo');
if (audio.source.durationSeconds <= 0) err('audio fixture duration must be positive');
if (audio.targetEnvelope.fadeInSeconds <= 0 || audio.targetEnvelope.fadeOutSeconds <= 0) {
  err('audio target must exercise both fade in and fade out');
}
const points = [...audio.targetEnvelope.volumePoints];
for (let index = 0; index < points.length; index += 1) {
  const point = points[index];
  if (point.timeSeconds < 0 || point.timeSeconds > audio.source.durationSeconds) {
    err(`audio volume point out of range: ${point.timeSeconds}s`);
  }
  if (index > 0 && point.timeSeconds <= points[index - 1].timeSeconds) {
    err('audio volume points must have strictly increasing times');
  }
}
if (!audio.guardrails.includes('MANUAL_RECOVERY != AUTOMATED_WRITE')) {
  err('audio Human Master must keep manual recovery separate from automated write');
}

const palmier = palmierFcpxmlSyntheticSceneSpec;
if (palmier.canaryId !== 'DV21-PALMIER-FCPXML-01') err('Palmier scene spec canary ID mismatch');
if (!palmier.exportRequirement.mustUseRealPalmier) err('Palmier scene spec must require real Palmier');
if (!palmier.exportRequirement.fakeOrRepoSynthesizedFcpxmlForbidden) err('fake/repo-generated Palmier FCPXML must stay forbidden');
if (palmier.exportRequirement.exportedFcpxmlPath !== null) err('scene spec must not contain a fabricated exported FCPXML path');
if (palmier.exportRequirement.exportedFcpxmlSha256 !== null) err('scene spec must not contain a fabricated FCPXML hash');
for (const requiredStatus of ['TRANSPORT_EXPECTED', 'KNOWN_OMISSION_EXPECTED']) {
  if (!Object.values(palmier.expectedTransport).some((value) => value.includes(requiredStatus))) {
    err(`Palmier expected transport inventory missing status: ${requiredStatus}`);
  }
}
if (!palmier.guardrails.includes('SCENE_SPEC != FCPXML_EXPORT')) {
  err('Palmier spec must remain explicitly distinct from a real export');
}

const expectedPreparations = {
  'DV21-REMOTION-ALPHA-01': 'alpha',
  'DV21-AUDIO-RECOVERY-01': 'audio',
  'DV21-PALMIER-FCPXML-01': 'palmier',
} as const;
for (const [canaryId, expectedMode] of Object.entries(expectedPreparations)) {
  const preparation = resolveCanaryInputPreparationCommands[canaryId];
  if (!preparation) {
    err(`structured preparation missing: ${canaryId}`);
    continue;
  }
  if (preparation.mode !== expectedMode) err(`${canaryId}: expected mode=${expectedMode}, got ${preparation.mode}`);
  const expectedManifest = `out/canary-inputs/manifests/${canaryId}.json`;
  if (preparation.manifestPath !== expectedManifest) {
    err(`${canaryId}: manifestPath must stay canonical: ${expectedManifest}`);
  }
  if (!preparation.command.endsWith(` ${preparation.mode}`)) {
    err(`${canaryId}: preparation command and structured mode diverged`);
  }
}

const sampleManifest = resolveCanaryInputManifestSchema.safeParse({
  schemaVersion: 'resolve-canary-input-manifest/v1',
  canaryId: 'SAMPLE',
  generatedAt: '2026-08-26T00:00:00.000Z',
  status: 'PREPARED',
  generator: {script: 'sample', mode: 'sample'},
  files: [
    {
      id: 'sample',
      role: 'schema smoke',
      path: 'out/sample.bin',
      sha256: 'a'.repeat(64),
      metadata: {},
    },
  ],
  nextAction: 'none',
  guardrails: ['INPUT_FILE != RUNTIME_EVIDENCE'],
});
if (!sampleManifest.success) {
  for (const issue of sampleManifest.error.issues) {
    err(`input manifest schema smoke: ${issue.path.join('.')} -> ${issue.message}`);
  }
}

if (errors > 0) {
  console.error(`Resolve canary input fixtures FAILED (${errors})`);
  process.exit(1);
}

ok('Resolve P0 canary input fixtures and structured session-preparation metadata are neutral, deterministic, source-truth-safe, and real Palmier FCPXML remains explicitly blocked until exported by Palmier.');
