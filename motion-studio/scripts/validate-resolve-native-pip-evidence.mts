import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';
import {resolveNativePIPCanary} from '../src/data/resolveNativePIP.ts';
import {resolveRuntimeCanaryEvidenceSchema} from '../src/data/resolveRuntimeCanary.schema.ts';

const evidenceArg = process.argv[2];
if (!evidenceArg || evidenceArg.startsWith('--')) {
  console.error('Usage: node --no-warnings scripts/validate-resolve-native-pip-evidence.mts <evidence.json>');
  process.exit(1);
}

let errors = 0;
const err = (message: string) => {
  errors += 1;
  console.error(`❌ ${message}`);
};

try {
  const evidencePath = resolve(process.cwd(), evidenceArg);
  const parsed = resolveRuntimeCanaryEvidenceSchema.safeParse(JSON.parse(readFileSync(evidencePath, 'utf8')));
  if (!parsed.success) {
    for (const issue of parsed.error.issues) err(`schema: ${issue.path.join('.')} -> ${issue.message}`);
  } else {
    const evidence = parsed.data;
    const canary = resolveNativePIPCanary;

    if (evidence.canaryId !== canary.id) err(`canaryId mismatch: expected=${canary.id} actual=${evidence.canaryId}`);

    const expectedInputs = canary.inputs.map((item) => item.id).sort();
    const actualInputs = evidence.inputInventory.map((item) => item.id).sort();
    if (JSON.stringify(expectedInputs) !== JSON.stringify(actualInputs)) {
      err(`inputInventory IDs differ: expected=${expectedInputs.join(',')} actual=${actualInputs.join(',')}`);
    }

    const expectedSteps = canary.steps.map((item) => item.id).sort();
    const actualSteps = evidence.stepResults.map((item) => item.stepId).sort();
    if (JSON.stringify(expectedSteps) !== JSON.stringify(actualSteps)) {
      err(`stepResults IDs differ: expected=${expectedSteps.join(',')} actual=${actualSteps.join(',')}`);
    }

    if ((evidence.result === 'PASS' || evidence.result === 'FAIL') && !evidence.capturedAt) {
      err(`${evidence.result} evidence requires capturedAt runtime timestamp`);
    }
    if ((evidence.result === 'NOT_RUN' || evidence.result === 'BLOCKED') && evidence.promotionEligible) {
      err(`${evidence.result} evidence cannot be promotionEligible`);
    }
    if (evidence.result === 'NOT_RUN' && evidence.stepResults.some((step) => step.status !== 'NOT_RUN')) {
      err('NOT_RUN evidence cannot contain executed steps');
    }

    if (evidence.promotionEligible) {
      if (evidence.result !== 'PASS') err('promotionEligible requires result=PASS');
      if (!evidence.capturedAt) err('promotionEligible requires capturedAt');
      if (!evidence.resolve.product || !evidence.resolve.version) err('promotionEligible requires exact live Resolve product/version');
      if (evidence.resolve.edition === 'UNKNOWN') err('promotionEligible requires exact tested Resolve edition');
      if (evidence.resolve.platform === 'UNKNOWN') err('promotionEligible requires exact tested platform');
      if (evidence.stepResults.some((step) => step.status !== 'PASS')) {
        err('promotionEligible requires every native PiP runtime step to PASS');
      }
      for (const input of canary.inputs.filter((item) => item.required)) {
        const inventory = evidence.inputInventory.find((item) => item.id === input.id);
        if (!inventory || inventory.present !== true) err(`promotionEligible requires required input present=true: ${input.id}`);
        if (!inventory?.sha256 || !/^[a-f0-9]{64}$/.test(inventory.sha256)) {
          err(`promotionEligible requires SHA-256 for required input: ${input.id}`);
        }
      }
      if (!evidence.humanReview.completed || evidence.humanReview.notes.length === 0) {
        err('promotionEligible requires completed humanReview with notes');
      }
      const renders = evidence.artifacts.filter((artifact) => artifact.kind === 'RENDER');
      if (renders.length === 0) err('promotionEligible requires a RENDER artifact');
      if (renders.some((artifact) => !artifact.sha256 || !/^[a-f0-9]{64}$/.test(artifact.sha256))) {
        err('promotionEligible requires SHA-256 for every RENDER artifact');
      }
    }
  }
} catch (error) {
  err(error instanceof Error ? error.message : String(error));
}

if (errors > 0) {
  console.error(`Resolve native PiP evidence validation FAILED (${errors})`);
  process.exit(1);
}

console.log('✅ Resolve native PiP evidence is schema-valid and obeys fail-closed runtime/promotion semantics.');
