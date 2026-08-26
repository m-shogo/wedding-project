import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';
import {getResolveRuntimeCanary} from '../src/data/resolveRuntimeCanaryPack.ts';
import {resolveRuntimeCanaryEvidenceSchema} from '../src/data/resolveRuntimeCanary.schema.ts';

const evidenceArg = process.argv[2];
if (!evidenceArg || evidenceArg.startsWith('--')) {
  console.error('Usage: node --no-warnings scripts/validate-resolve-canary-evidence.mts <evidence.json>');
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
    const canary = getResolveRuntimeCanary(evidence.canaryId);
    if (!canary) {
      err(`unknown canaryId: ${evidence.canaryId}`);
    } else {
      const expectedInputIds = canary.inputs.map((input) => input.id).sort();
      const actualInputIds = evidence.inputInventory.map((input) => input.id).sort();
      if (JSON.stringify(expectedInputIds) !== JSON.stringify(actualInputIds)) {
        err(`inputInventory IDs differ from canary definition: expected=${expectedInputIds.join(',')} actual=${actualInputIds.join(',')}`);
      }

      const expectedStepIds = canary.steps.map((step) => step.id).sort();
      const actualStepIds = evidence.stepResults.map((step) => step.stepId).sort();
      if (JSON.stringify(expectedStepIds) !== JSON.stringify(actualStepIds)) {
        err(`stepResults IDs differ from canary definition: expected=${expectedStepIds.join(',')} actual=${actualStepIds.join(',')}`);
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

      if (evidence.promotionEligible) {
        if (evidence.result !== 'PASS') err('promotionEligible requires result=PASS');
        if (!evidence.capturedAt) err('promotionEligible requires capturedAt');
        if (evidence.stepResults.some((step) => step.status !== 'PASS')) {
          err('promotionEligible requires every canary step to PASS');
        }
        for (const input of canary.inputs.filter((item) => item.required)) {
          const inventory = evidence.inputInventory.find((item) => item.id === input.id);
          if (!inventory || inventory.present !== true) {
            err(`promotionEligible requires required input present=true: ${input.id}`);
          }
        }
        const requiresHumanReview = canary.evidenceRequirements.some((item) => item.required && item.kind === 'HUMAN_REVIEW');
        if (requiresHumanReview && !evidence.humanReview.completed) {
          err('promotionEligible requires completed humanReview for this canary');
        }
        if (canary.promotion.requiresRender && !evidence.artifacts.some((artifact) => artifact.kind === 'RENDER')) {
          err('promotionEligible requires a RENDER artifact for this canary');
        }
      }
    }
  }
} catch (error) {
  err(error instanceof Error ? error.message : String(error));
}

if (errors > 0) {
  console.error(`Resolve canary evidence validation FAILED (${errors})`);
  process.exit(1);
}

console.log('✅ Resolve canary evidence is schema-valid and obeys fail-closed runtime/promotion semantics.');
