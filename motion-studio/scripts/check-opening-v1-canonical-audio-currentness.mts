import {readFileSync} from 'node:fs';

const source = readFileSync(new URL('./opening-v1-canonical-audio-currentness.mts', import.meta.url), 'utf8');
const required = [
  "opening-v1-production-status.mts",
  "opening-v1-audio-handoff-binding.mts",
  "opening-v1-davinci-recovery-audio-binding.mts",
  "opening-v1-davinci-handoff-contract.mts",
  "OPENING_REPORTED_BUNDLE_CURRENT_BUT_AUDIO_BINDING_STALE",
  "OPENING_REPORTED_PALMIER_CURRENT_BUT_AUDIO_BINDING_STALE",
  "OPENING_REPORTED_DAVINCI_CURRENT_BUT_AUDIO_BINDING_STALE",
  "AUDIO_EVIDENCE_OR_PREVIEW_OR_BGM_SHA_CHANGED => EFFECTIVE_HANDOFF_CURRENT_FALSE",
  "macDaVinciActualVerified: false",
  "productionReady: false",
];

for (const needle of required) {
  if (!source.includes(needle)) {
    console.error(`Missing canonical audio currentness contract: ${needle}`);
    process.exit(1);
  }
}

if (!source.includes("audioStage === 'PASS' && audioHandoffCurrent")) {
  console.error('Effective production bundle currentness must be gated by current Human audio review and audio handoff binding.');
  process.exit(1);
}
if (!source.includes('davinciHandoffCurrent && recoveryAudioCurrent && effectiveBundleCurrent')) {
  console.error('Effective DaVinci currentness must require recovery audio binding and effective bundle currentness.');
  process.exit(1);
}
if (source.includes('macDaVinciActualVerified: true') || source.includes('productionReady: true')) {
  console.error('Canonical audio audit must never promote Mac/Studio Actual or productionReady.');
  process.exit(1);
}

console.log('Opening V1 canonical audio currentness contract: PASS');
