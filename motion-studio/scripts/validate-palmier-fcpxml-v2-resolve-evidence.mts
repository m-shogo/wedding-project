import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';
import {resolveRuntimeCanaryEvidenceSchema} from '../src/data/resolveRuntimeCanary.schema.ts';
import {resolvePalmierFCPXMLV2RuntimeCanary as canary} from '../src/data/resolvePalmierFCPXMLV2Runtime.ts';

const evidenceArg = process.argv[2];
if (!evidenceArg || evidenceArg.startsWith('--')) {
  console.error('Usage: node --no-warnings scripts/validate-palmier-fcpxml-v2-resolve-evidence.mts <evidence.json>');
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
    if (evidence.canaryId !== canary.id) err(`expected canaryId=${canary.id}, got ${evidence.canaryId}`);

    const expectedInputIds = canary.inputs.map((input) => input.id).sort();
    const actualInputIds = evidence.inputInventory.map((input) => input.id).sort();
    if (JSON.stringify(expectedInputIds) !== JSON.stringify(actualInputIds)) {
      err(`inputInventory IDs differ from v2 runtime definition: expected=${expectedInputIds.join(',')} actual=${actualInputIds.join(',')}`);
    }

    const expectedStepIds = canary.steps.map((step) => step.id).sort();
    const actualStepIds = evidence.stepResults.map((step) => step.stepId).sort();
    if (JSON.stringify(expectedStepIds) !== JSON.stringify(actualStepIds)) {
      err(`stepResults IDs differ from v2 runtime definition: expected=${expectedStepIds.join(',')} actual=${actualStepIds.join(',')}`);
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
        err('promotionEligible requires every Palmier v2 runtime step to PASS');
      }
      for (const input of canary.inputs.filter((item) => item.required)) {
        const inventory = evidence.inputInventory.find((item) => item.id === input.id);
        if (!inventory || inventory.present !== true) {
          err(`promotionEligible requires required input present=true: ${input.id}`);
        }
      }
      if (!evidence.humanReview.completed) {
        err('promotionEligible requires completed humanReview for Palmier v2 visual/nested review');
      }
      const renderArtifacts = evidence.artifacts.filter((artifact) => artifact.kind === 'RENDER');
      if (renderArtifacts.length === 0) {
        err('promotionEligible requires a RENDER artifact for Palmier v2');
      }
      if (renderArtifacts.some((artifact) => !artifact.sha256)) {
        err('promotionEligible requires SHA-256 on every Palmier v2 RENDER artifact');
      }
    }
  }
} catch (error) {
  err(error instanceof Error ? error.message : String(error));
}

if (errors > 0) {
  console.error(`Palmier FCPXML v2 Resolve evidence validation FAILED (${errors})`);
  process.exit(1);
}

console.log('✅ Palmier FCPXML v2 Resolve evidence is schema-valid and obeys v2 step/render/human-review promotion semantics.');
