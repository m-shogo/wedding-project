import {
  createResolvePalmierFCPXMLV2EvidenceTemplate,
  palmierV2RuntimeCapabilityRefs,
  resolvePalmierFCPXMLV2RuntimeCanary as canary,
} from '../src/data/resolvePalmierFCPXMLV2Runtime.ts';
import {resolveRuntimeCanaryEvidenceSchema, resolveRuntimeCanarySchema} from '../src/data/resolveRuntimeCanary.schema.ts';

let errors = 0;
const err = (message: string) => {
  errors += 1;
  console.error(`❌ ${message}`);
};
const ok = (message: string) => console.log(`✅ ${message}`);

const parsedCanary = resolveRuntimeCanarySchema.safeParse(canary);
if (!parsedCanary.success) {
  for (const issue of parsedCanary.error.issues) err(`canary schema: ${issue.path.join('.')} -> ${issue.message}`);
}

const expectedSteps = [
  'import-clean',
  'inventory-readback',
  'core-property-readback',
  'independent-text-scale-readback',
  'title-box-omission-readback',
  'nested-timeline-readback',
  'visual-checkpoint-render',
  'save-reopen',
];
const stepIds = canary.steps.map((step) => step.id);
if (JSON.stringify(stepIds) !== JSON.stringify(expectedSteps)) {
  err(`Palmier v2 runtime step order changed: ${stepIds.join(',')}`);
}

for (const capabilityId of [
  'title-independent-text-scale',
  'title-box-transform-scale-rotation',
  'nested-timeline-compound',
]) {
  if (!canary.capabilityIds.includes(capabilityId)) err(`v2 capability missing: ${capabilityId}`);
  const ref = palmierV2RuntimeCapabilityRefs.find((item) => item.id === capabilityId);
  if (!ref || ref.kind !== 'SOURCE_EVIDENCE' || !ref.sourceRef.endsWith('palmierFCPXMLCurrentEvidence.ts')) {
    err(`v2 source-evidence ref missing/incorrect: ${capabilityId}`);
  }
}

if (!canary.target.pages.includes('DELIVER')) err('Palmier v2 must include DELIVER for visual checkpoint render.');
if (!canary.promotion.requiresRender) err('Palmier v2 promotion must require render evidence.');
if (!canary.promotion.requiresSaveReopen) err('Palmier v2 promotion must require save/reopen.');
if (canary.promotion.minimumIndependentExecutions < 2) err('Palmier v2 promotion requires at least two independent executions.');
if (!canary.evidenceRequirements.some((item) => item.required && item.kind === 'RENDER')) {
  err('Palmier v2 must require RENDER evidence.');
}
if (!canary.evidenceRequirements.some((item) => item.required && item.kind === 'HUMAN_REVIEW')) {
  err('Palmier v2 must require HUMAN_REVIEW evidence.');
}

for (const guardrail of [
  'TEXT_STYLE_SCALE != TITLE_BOX_TRANSFORM_SCALE',
  'FCPXML_PARAM_EMITTED != RESOLVE_TITLE_PARITY',
  'FCPXML_NEST_STRUCTURE_TESTED != RESOLVE_COMPOUND_IMPORT_VERIFIED',
  'VISUAL_PARITY != PARAMETRIC_EDITABILITY',
  'ONE_PASS != REPRODUCED',
]) {
  if (!canary.guardrails.includes(guardrail)) err(`Palmier v2 guardrail missing: ${guardrail}`);
}

const evidence = createResolvePalmierFCPXMLV2EvidenceTemplate('DV21-PALMIER-FCPXML-01-CI-V2');
const parsedEvidence = resolveRuntimeCanaryEvidenceSchema.safeParse(evidence);
if (!parsedEvidence.success) {
  for (const issue of parsedEvidence.error.issues) err(`evidence schema: ${issue.path.join('.')} -> ${issue.message}`);
}
if (evidence.result !== 'NOT_RUN') err('Fresh Palmier v2 evidence must be NOT_RUN.');
if (evidence.promotionEligible) err('Fresh Palmier v2 evidence must fail closed.');
if (evidence.capturedAt !== null) err('Fresh Palmier v2 evidence capturedAt must be null.');
if (evidence.stepResults.some((step) => step.status !== 'NOT_RUN')) err('Fresh Palmier v2 step results must all be NOT_RUN.');
if (JSON.stringify(evidence.stepResults.map((step) => step.stepId)) !== JSON.stringify(expectedSteps)) {
  err('Palmier v2 evidence template does not carry the effective runtime steps.');
}

const inputIds = canary.inputs.map((input) => input.id).sort();
if (JSON.stringify(inputIds) !== JSON.stringify(['human-master-sidecar', 'palmier-real-fcpxml'])) {
  err(`Palmier v2 input IDs must remain generic-hydration compatible: ${inputIds.join(',')}`);
}

if (errors > 0) {
  console.error(`Palmier FCPXML v2 runtime plan FAILED (${errors})`);
  process.exit(1);
}

ok('Palmier v2 effective runtime definition preserves generic input hydration while requiring explicit text-scale/title-box/nested readback, render+human review, save/reopen, and two-run promotion.');
