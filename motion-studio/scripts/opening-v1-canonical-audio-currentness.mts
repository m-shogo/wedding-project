import {spawnSync} from 'node:child_process';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

type State = 'CURRENT' | 'BLOCKED';
type JsonReport = Record<string, any>;

const runJson = (script: string) => {
  const result = spawnSync(process.execPath, ['--no-warnings', script, '--json'], {
    cwd: root,
    encoding: 'utf8',
  });
  if (result.status !== 0 && !result.stdout.trim()) {
    return {ok: false, report: null as JsonReport | null, error: `${script}:PROCESS_FAILED:${result.status ?? 'null'}`};
  }
  try {
    return {ok: true, report: JSON.parse(result.stdout) as JsonReport, error: null as string | null};
  } catch {
    return {ok: false, report: null as JsonReport | null, error: `${script}:INVALID_JSON`};
  }
};

const blockers: string[] = [];
const productionStatus = runJson('scripts/opening-v1-production-status.mts');
const audioHandoff = runJson('scripts/opening-v1-audio-handoff-binding.mts');
const recoveryAudio = runJson('scripts/opening-v1-davinci-recovery-audio-binding.mts');
const davinciHandoff = runJson('scripts/opening-v1-davinci-handoff-contract.mts');

for (const item of [productionStatus, audioHandoff, recoveryAudio, davinciHandoff]) {
  if (!item.ok && item.error) blockers.push(item.error);
}

const audioStage = productionStatus.report?.stages?.audioListeningReview?.state ?? null;
const reportedBundleCurrent = productionStatus.report?.readiness?.productionBundleCurrent === true;
const reportedPalmierCurrent = productionStatus.report?.handoff?.palmier?.current === true;
const audioHandoffCurrent = audioHandoff.report?.current === true;
const recoveryAudioCurrent = recoveryAudio.report?.current === true;
const davinciHandoffCurrent = davinciHandoff.report?.current === true;

if (audioStage !== 'PASS') blockers.push('OPENING_CANONICAL_AUDIO_REVIEW_NOT_CURRENT');
if (!audioHandoffCurrent) blockers.push('OPENING_CANONICAL_AUDIO_HANDOFF_NOT_CURRENT');
if (!recoveryAudioCurrent) blockers.push('OPENING_CANONICAL_DAVINCI_RECOVERY_AUDIO_NOT_CURRENT');
if (!davinciHandoffCurrent) blockers.push('OPENING_CANONICAL_DAVINCI_HANDOFF_NOT_CURRENT');

const effectiveBundleCurrent = reportedBundleCurrent && audioStage === 'PASS' && audioHandoffCurrent;
const effectivePalmierCurrent = reportedPalmierCurrent && effectiveBundleCurrent && audioHandoffCurrent;
const effectiveDaVinciCurrent = davinciHandoffCurrent && recoveryAudioCurrent && effectiveBundleCurrent;

if (reportedBundleCurrent && !effectiveBundleCurrent) blockers.push('OPENING_REPORTED_BUNDLE_CURRENT_BUT_AUDIO_BINDING_STALE');
if (reportedPalmierCurrent && !effectivePalmierCurrent) blockers.push('OPENING_REPORTED_PALMIER_CURRENT_BUT_AUDIO_BINDING_STALE');
if (davinciHandoffCurrent && !effectiveDaVinciCurrent) blockers.push('OPENING_REPORTED_DAVINCI_CURRENT_BUT_AUDIO_BINDING_STALE');

const uniqueBlockers = [...new Set(blockers)];
const state: State = uniqueBlockers.length === 0 ? 'CURRENT' : 'BLOCKED';

const report = {
  schemaVersion: 'opening-v1-canonical-audio-currentness/v1',
  authority: 'DERIVED_OPENING_CANONICAL_AUDIO_CURRENTNESS',
  state,
  current: state === 'CURRENT',
  upstream: {
    humanAudioListeningReview: {state: audioStage},
    productionStatus: {
      reportedBundleCurrent,
      reportedPalmierCurrent,
    },
    audioHandoffBinding: {current: audioHandoffCurrent},
    davinciRecoveryAudioBinding: {current: recoveryAudioCurrent},
    davinciHandoffContract: {current: davinciHandoffCurrent},
  },
  effective: {
    productionBundleCurrent: effectiveBundleCurrent,
    palmierHandoffCurrent: effectivePalmierCurrent,
    davinciHandoffCurrent: effectiveDaVinciCurrent,
    macDaVinciActualVerified: false,
    productionReady: false,
  },
  blockers: uniqueBlockers,
  guardrails: [
    'REPORTED_BUNDLE_CURRENT != EFFECTIVE_BUNDLE_CURRENT_UNLESS_AUDIO_BINDING_CURRENT',
    'REPORTED_PALMIER_CURRENT != EFFECTIVE_PALMIER_CURRENT_UNLESS_AUDIO_BINDING_CURRENT',
    'DAVINCI_HANDOFF_CURRENT != EFFECTIVE_DAVINCI_CURRENT_UNLESS_RECOVERY_AUDIO_BINDING_CURRENT',
    'AUDIO_EVIDENCE_OR_PREVIEW_OR_BGM_SHA_CHANGED => EFFECTIVE_HANDOFF_CURRENT_FALSE',
    'CANONICAL_AUDIO_CURRENTNESS_CURRENT != MAC_DAVINCI_ACTUAL_VERIFIED',
    'CI_MUST_NOT_PROMOTE_MAC_GUI_ACTUAL',
  ],
};

if (process.argv.includes('--json')) console.log(JSON.stringify(report, null, 2));
else {
  console.log(`Opening canonical audio currentness: ${report.state}`);
  for (const blocker of uniqueBlockers) console.log(`BLOCK / ${blocker}`);
}

if (process.argv.includes('--strict') && !report.current) process.exit(1);
