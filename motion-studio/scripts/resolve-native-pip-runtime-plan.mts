import {
  createResolveNativePIPEvidenceTemplate,
  nativePIPHumanMaster,
  resolveNativePIPCanary,
  resolveNativePIPControlGroups,
  resolveNativePIPOfficialCoordinate,
} from '../src/data/resolveNativePIP.ts';

const args = process.argv.slice(2);
const evidenceTemplate = args.includes('--evidence-template');
const executionIndex = args.indexOf('--execution-id');
const executionId = executionIndex >= 0 ? args[executionIndex + 1] : undefined;

if (evidenceTemplate) {
  console.log(JSON.stringify(createResolveNativePIPEvidenceTemplate(executionId), null, 2));
  process.exit(0);
}

const canary = resolveNativePIPCanary;
console.log(`# Resolve Native PiP Runtime Plan — ${canary.id}`);
console.log('');
console.log(`Title: ${canary.title}`);
console.log(`Priority: ${canary.priority}`);
console.log(`Catalog state: ${canary.state}`);
console.log(`Product baseline: ${resolveNativePIPOfficialCoordinate.productBaseline}`);
console.log(`Current planning patch: ${resolveNativePIPOfficialCoordinate.targetPatch}`);
console.log(`Runtime edition availability: ${resolveNativePIPOfficialCoordinate.runtimeEditionAvailability}`);
console.log('');
console.log('## Purpose');
console.log('');
console.log(canary.purpose);
console.log('');
console.log('## Prepare + validate neutral input');
console.log('');
console.log('```bash');
console.log('node --no-warnings scripts/prepare-resolve-native-pip-fixture.mts');
console.log('node --no-warnings scripts/validate-resolve-native-pip-fixture.mts');
console.log('```');
console.log('');
console.log('## Official documented control groups to inventory at runtime');
console.log('');
for (const group of resolveNativePIPControlGroups) {
  console.log(`- ${group.group}: ${group.controls.join(', ')}`);
  console.log(`  - ${group.purpose}`);
}
console.log('');
console.log('## Human Master target intent');
console.log('');
console.log(`- Known documented numeric target: Rounding=${nativePIPHumanMaster.targetIntent.rounding.target}`);
console.log('- Other numeric values: choose obvious bounded values in the exact runtime and record the actual values; do not invent cross-version units.');
console.log(`- Animation required for core PASS: ${nativePIPHumanMaster.animationProbe.requiredForCorePass ? 'YES' : 'NO'}`);
console.log('');
console.log('## Inputs');
console.log('');
for (const input of canary.inputs) {
  console.log(`- ${input.id} [${input.kind}] required=${input.required ? 'YES' : 'NO'}`);
  console.log(`  - ${input.sourceRef}`);
}
console.log('');
console.log('## Preflight');
console.log('');
for (const preflight of canary.preflight) console.log(`- ${preflight}`);
console.log('');
console.log('## Runtime steps');
console.log('');
canary.steps.forEach((step, index) => {
  console.log(`### ${index + 1}. ${step.id} — ${step.page} / ${step.mutation}`);
  console.log('');
  console.log(step.action);
  console.log('');
  console.log(`Expected: ${step.expected}`);
  console.log('');
  console.log(`Capture: ${step.capture.join('; ')}`);
  if (step.abortIf.length) console.log(`Abort if: ${step.abortIf.join('; ')}`);
  console.log('');
});
console.log('## Evidence requirements');
console.log('');
for (const evidence of canary.evidenceRequirements) {
  console.log(`- ${evidence.id} [${evidence.kind}] required=${evidence.required ? 'YES' : 'NO'} — ${evidence.description}`);
}
console.log('');
console.log('## Pass boundary');
console.log('');
for (const criterion of canary.passCriteria) console.log(`- ${criterion}`);
console.log('');
console.log('## Fail boundary');
console.log('');
for (const criterion of canary.failCriteria) console.log(`- ${criterion}`);
console.log('');
console.log('## Promotion');
console.log('');
console.log(`Minimum independent executions: ${canary.promotion.minimumIndependentExecutions}`);
console.log(`Save/reopen required: ${canary.promotion.requiresSaveReopen ? 'YES' : 'NO'}`);
console.log(`Render required: ${canary.promotion.requiresRender ? 'YES' : 'NO'}`);
console.log('Promotion for one execution additionally requires exact input hashes, exact tested Resolve edition, completed human review and a hashed RENDER artifact.');
console.log('');
console.log('## Guardrails');
console.log('');
for (const guardrail of canary.guardrails) console.log(`- ${guardrail}`);
console.log('');
console.log('```text');
console.log('EFFECT_LISTED_IN_DOCS != EFFECT_AVAILABLE_IN_TESTED_EDITION');
console.log('PARAMETRIC_EDITABLE != HUMAN_ADJUSTABLE');
console.log('STATIC_HUMAN_ADJUSTABILITY != ANIMATION_CAPABILITY');
console.log('OPAQUE_SOURCE_USE_ALPHA_CONTROL != ALPHA_PRESERVATION_PROOF');
console.log('ONE_PASS != REPRODUCED');
console.log('```');
