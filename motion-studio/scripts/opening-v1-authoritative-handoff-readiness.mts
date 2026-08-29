import {spawnSync} from 'node:child_process';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

type JsonReport = Record<string, any>;
type Surface = {ok: boolean; report: JsonReport | null; error: string | null};

const runJson = (script: string): Surface => {
  const result = spawnSync(process.execPath, ['--no-warnings', script, '--json'], {
    cwd: root,
    encoding: 'utf8',
  });
  if (!result.stdout.trim()) {
    return {ok: false, report: null, error: `${script}:NO_JSON_OUTPUT:${result.status ?? 'null'}`};
  }
  try {
    return {ok: true, report: JSON.parse(result.stdout) as JsonReport, error: null};
  } catch {
    return {ok: false, report: null, error: `${script}:INVALID_JSON`};
  }
};

const production = runJson('scripts/opening-v1-production-status.mts');
const audio = runJson('scripts/opening-v1-canonical-audio-currentness.mts');
const davinci = runJson('scripts/opening-v1-davinci-handoff-contract.mts');

const blockers: string[] = [];
for (const surface of [production, audio, davinci]) {
  if (!surface.ok && surface.error) blockers.push(surface.error);
}

const reportedBundleCurrent = production.report?.readiness?.productionBundleCurrent === true;
const reportedPalmierCurrent = production.report?.handoff?.palmier?.current === true;
const audioBundleCurrent = audio.report?.effective?.productionBundleCurrent === true;
const audioPalmierCurrent = audio.report?.effective?.palmierHandoffCurrent === true;
const audioDaVinciCurrent = audio.report?.effective?.davinciHandoffCurrent === true;
const davinciContractCurrent = davinci.report?.current === true;

const effectiveBundleCurrent = reportedBundleCurrent && audioBundleCurrent;
const effectivePalmierCurrent = reportedPalmierCurrent && effectiveBundleCurrent && audioPalmierCurrent;
const effectiveDaVinciCurrent = davinciContractCurrent && effectiveBundleCurrent && audioDaVinciCurrent;

if (reportedBundleCurrent && !audioBundleCurrent) blockers.push('OPENING_AUTHORITATIVE_BUNDLE_BLOCKED_BY_AUDIO_CURRENTNESS');
if (reportedPalmierCurrent && !audioPalmierCurrent) blockers.push('OPENING_AUTHORITATIVE_PALMIER_BLOCKED_BY_AUDIO_CURRENTNESS');
if (davinciContractCurrent && !audioDaVinciCurrent) blockers.push('OPENING_AUTHORITATIVE_DAVINCI_BLOCKED_BY_AUDIO_CURRENTNESS');
if (effectiveDaVinciCurrent && !effectivePalmierCurrent) blockers.push('OPENING_AUTHORITATIVE_DAVINCI_REQUIRES_CURRENT_PALMIER');

const uniqueBlockers = [...new Set(blockers)];
const current = effectiveBundleCurrent && effectivePalmierCurrent && effectiveDaVinciCurrent && uniqueBlockers.length === 0;

const report = {
  schemaVersion: 'opening-v1-authoritative-handoff-readiness/v1',
  authority: 'OPENING_AUTHORITATIVE_HANDOFF_READINESS',
  current,
  upstream: {
    productionStatus: {
      overallState: production.report?.overallState ?? null,
      productionBundleCurrent: reportedBundleCurrent,
      palmierCurrent: reportedPalmierCurrent,
    },
    canonicalAudioCurrentness: {
      current: audio.report?.current === true,
      productionBundleCurrent: audioBundleCurrent,
      palmierCurrent: audioPalmierCurrent,
      davinciCurrent: audioDaVinciCurrent,
    },
    davinciHandoffContract: {
      current: davinciContractCurrent,
    },
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
    'PRODUCTION_STATUS_BUNDLE_CURRENT != AUTHORITATIVE_BUNDLE_CURRENT_UNLESS_AUDIO_CURRENT',
    'PRODUCTION_STATUS_PALMIER_CURRENT != AUTHORITATIVE_PALMIER_CURRENT_UNLESS_AUDIO_CURRENT',
    'DAVINCI_HANDOFF_CONTRACT_CURRENT != AUTHORITATIVE_DAVINCI_CURRENT_UNLESS_AUDIO_AND_RECOVERY_CURRENT',
    'AUTHORITATIVE_DAVINCI_CURRENT => AUTHORITATIVE_PALMIER_CURRENT',
    'AUDIO_EVIDENCE_OR_PREVIEW_OR_BGM_SHA_CHANGED => AUTHORITATIVE_HANDOFF_CURRENT_FALSE',
    'AUTHORITATIVE_HANDOFF_CURRENT != MAC_DAVINCI_ACTUAL_VERIFIED',
    'CI_MUST_NOT_PROMOTE_MAC_GUI_ACTUAL',
  ],
};

if (process.argv.includes('--json')) console.log(JSON.stringify(report, null, 2));
else {
  console.log(`Opening authoritative handoff readiness: ${report.current ? 'CURRENT' : 'BLOCKED'}`);
  for (const blocker of uniqueBlockers) console.log(`BLOCK / ${blocker}`);
}

if (process.argv.includes('--strict') && !report.current) process.exit(1);
