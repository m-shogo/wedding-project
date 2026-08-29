import {readFileSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const source = readFileSync(join(root, 'scripts/opening-v1-authoritative-handoff-readiness.mts'), 'utf8');

const required = [
  "const effectiveBundleCurrent = reportedBundleCurrent && audioBundleCurrent;",
  "const effectivePalmierCurrent = reportedPalmierCurrent && effectiveBundleCurrent && audioPalmierCurrent;",
  "const effectiveDaVinciCurrent = davinciContractCurrent && effectiveBundleCurrent && audioDaVinciCurrent;",
  "OPENING_AUTHORITATIVE_BUNDLE_BLOCKED_BY_AUDIO_CURRENTNESS",
  "OPENING_AUTHORITATIVE_PALMIER_BLOCKED_BY_AUDIO_CURRENTNESS",
  "OPENING_AUTHORITATIVE_DAVINCI_BLOCKED_BY_AUDIO_CURRENTNESS",
  "AUDIO_EVIDENCE_OR_PREVIEW_OR_BGM_SHA_CHANGED => AUTHORITATIVE_HANDOFF_CURRENT_FALSE",
  "AUTHORITATIVE_HANDOFF_CURRENT != MAC_DAVINCI_ACTUAL_VERIFIED",
  "macDaVinciActualVerified: false",
  "productionReady: false",
];

const missing = required.filter((needle) => !source.includes(needle));
if (missing.length > 0) {
  for (const needle of missing) console.error(`MISSING_CONTRACT / ${needle}`);
  process.exit(1);
}

if (source.includes('macDaVinciActualVerified: true')) {
  console.error('CI_MUST_NOT_PROMOTE_MAC_GUI_ACTUAL');
  process.exit(1);
}
if (source.includes('productionReady: true')) {
  console.error('AUTHORITATIVE_READINESS_MUST_FAIL_CLOSED');
  process.exit(1);
}

console.log('Opening authoritative handoff contract: PASS');
