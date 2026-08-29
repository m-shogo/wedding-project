import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';
import {resolveOTIOInterchangeCanary} from '../src/data/resolveOTIOInterchange.ts';
import {resolveRuntimeCanaryEvidenceSchema} from '../src/data/resolveRuntimeCanary.schema.ts';

const evidenceArg = process.argv[2];
if (!evidenceArg || evidenceArg.startsWith('--')) {
  console.error('Usage: node --no-warnings scripts/validate-resolve-otio-evidence.mts <evidence.json>');
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
    const canary = resolveOTIOInterchangeCanary;

    if (evidence.canaryId !== canary.id) err(`wrong canaryId: expected=${canary.id} actual=${evidence.canaryId}`);

    const expectedInputIds = canary.inputs.map((input) => input.id).sort();
    const actualInputIds = evidence.inputInventory.map((input) => input.id).sort();
    if (JSON.stringify(expectedInputIds) !== JSON.stringify(actualInputIds)) {
      err(`inputInventory IDs differ from OTIO canary: expected=${expectedInputIds.join(',')} actual=${actualInputIds.join(',')}`);
    }

    const expectedStepIds = canary.steps.map((step) => step.id).sort();
    const actualStepIds = evidence.stepResults.map((step) => step.stepId).sort();
    if (JSON.stringify(expectedStepIds) !== JSON.stringify(actualStepIds)) {
      err(`stepResults IDs differ from OTIO canary: expected=${expectedStepIds.join(',')} actual=${actualStepIds.join(',')}`);
    }

    if ((evidence.result === 'PASS' || evidence.result === 'FAIL') && !evidence.capturedAt) {
      err(`${evidence.result} evidence requires capturedAt runtime timestamp`);
    }
    if ((evidence.result === 'NOT_RUN' || evidence.result === 'BLOCKED') && evidence.promotionEligible) {
      err(`${evidence.result} evidence cannot be promotionEligible`);
    }
    if (evidence.result === 'NOT_RUN' && evidence.stepResults.some((step) => step.status !== 'NOT_RUN')) {
      err('NOT_RUN evidence cannot contain executed step results');
    }
    if (evidence.result === 'BLOCKED' && evidence.stepResults.some((step) => step.status === 'PASS')) {
      err('BLOCKED evidence cannot contain PASS runtime steps');
    }

    for (const input of evidence.inputInventory) {
      if (input.present === true) {
        if (!input.pathOrRef) err(`present input requires pathOrRef: ${input.id}`);
        if (!input.sha256 || !/^[a-f0-9]{64}$/i.test(input.sha256)) err(`present input requires SHA-256: ${input.id}`);
      }
    }

    if (evidence.promotionEligible) {
      if (evidence.result !== 'PASS') err('promotionEligible requires result=PASS');
      if (!evidence.capturedAt) err('promotionEligible requires capturedAt');
      if (evidence.stepResults.some((step) => step.status !== 'PASS')) {
        err('promotionEligible requires every OTIO runtime step to PASS');
      }
      for (const input of canary.inputs.filter((item) => item.required)) {
        const inventory = evidence.inputInventory.find((item) => item.id === input.id);
        if (!inventory || inventory.present !== true) err(`promotionEligible requires required input present=true: ${input.id}`);
        if (!inventory?.sha256 || !/^[a-f0-9]{64}$/i.test(inventory.sha256)) {
          err(`promotionEligible requires required input SHA-256: ${input.id}`);
        }
      }
      if (!evidence.humanReview.completed) err('promotionEligible requires completed humanReview for OTIO human adjustability/save-reopen review');

      const exported = evidence.artifacts.filter((artifact) => artifact.kind === 'OTIO_EXPORT');
      if (!exported.length) err('promotionEligible requires an OTIO_EXPORT artifact produced by Resolve');
      for (const artifact of exported) {
        if (!artifact.sha256 || !/^[a-f0-9]{64}$/i.test(artifact.sha256)) {
          err(`promotionEligible requires SHA-256 for OTIO_EXPORT artifact: ${artifact.path}`);
        }
      }
    }

    if (evidence.artifacts.some((artifact) => artifact.kind === 'RENDER')) {
      err('DV21-OTIO-INTERCHANGE-01 does not require render evidence; do not use render output as editorial/effect portability proof');
    }
  }
} catch (error) {
  err(error instanceof Error ? error.message : String(error));
}

if (errors > 0) {
  console.error(`Resolve OTIO evidence validation FAILED (${errors})`);
  process.exit(1);
}

console.log('✅ Resolve OTIO evidence is schema-valid and obeys fail-closed runtime/promotion semantics.');
