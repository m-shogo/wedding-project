import {
  createResolveOTIOInterchangeEvidenceTemplate,
  otioCurrentReleaseCoordinate,
  resolveOTIOCapabilityMatrix,
  resolveOTIOInterchangeCanary,
  resolveOTIOOfficialCoordinate,
  resolveOTIOSecondaryVendorEffectProbe,
} from '../src/data/resolveOTIOInterchange.ts';

const args = process.argv.slice(2);
const evidenceTemplate = args.includes('--evidence-template');
const executionFlag = args.indexOf('--execution-id');
const executionId = executionFlag >= 0 ? args[executionFlag + 1] : undefined;

if (evidenceTemplate) {
  console.log(JSON.stringify(createResolveOTIOInterchangeEvidenceTemplate(executionId), null, 2));
  process.exit(0);
}

const canary = resolveOTIOInterchangeCanary;
console.log(`# Resolve OTIO Runtime Plan — ${canary.id}`);
console.log('');
console.log(`Title: ${canary.title}`);
console.log(`Priority: ${canary.priority}`);
console.log(`Catalog state: ${canary.state}`);
console.log(`Resolve major: ${canary.target.resolveMajor}`);
console.log(`Current planning patch: ${resolveOTIOOfficialCoordinate.currentPlanningPatch}`);
console.log(`OTIO released authority: ${otioCurrentReleaseCoordinate.currentReleasedVersion}`);
console.log(`Fixture schema authority: ${otioCurrentReleaseCoordinate.fixtureSchemaAuthority}`);
console.log(`Fixture clip schema: ${otioCurrentReleaseCoordinate.fixtureClipSchema}`);
console.log(`Fixture marker schema: ${otioCurrentReleaseCoordinate.fixtureMarkerSchema}`);
console.log('');
console.log('## Purpose');
console.log('');
console.log(canary.purpose);
console.log('');
console.log('## Prepare + validate neutral input');
console.log('');
console.log('```bash');
console.log('node --no-warnings scripts/prepare-resolve-otio-fixture.mts');
console.log('node --no-warnings scripts/validate-resolve-otio-fixture.mts');
console.log('```');
console.log('');
console.log('The standards-only input must contain no `Resolve_OTIO` metadata. Resolve-specific metadata is observed only after Resolve exports its own OTIO.');
console.log('');
console.log('## Inputs');
console.log('');
for (const input of canary.inputs) {
  console.log(`- ${input.id} [${input.kind}] required=${input.required ? 'YES' : 'NO'}`);
  console.log(`  - ${input.sourceRef}`);
  if (input.notes) console.log(`  - boundary: ${input.notes}`);
}
console.log('');
console.log('## Capability boundaries');
console.log('');
for (const capability of resolveOTIOCapabilityMatrix) {
  console.log(`- ${capability.id}: ${capability.fidelity}`);
  console.log(`  - ${capability.expected}`);
  console.log(`  - guardrail: ${capability.guardrail}`);
}
console.log('');
console.log('## Preflight');
console.log('');
for (const item of canary.preflight) console.log(`- ${item}`);
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
console.log('## Secondary vendor-effect probe');
console.log('');
console.log(resolveOTIOSecondaryVendorEffectProbe.purpose);
console.log('');
console.log('This probe is optional and does not decide the standard editorial-core canary result.');
console.log('');
console.log('## Promotion');
console.log('');
console.log(`Minimum independent executions: ${canary.promotion.minimumIndependentExecutions}`);
console.log(`Save/reopen required: ${canary.promotion.requiresSaveReopen ? 'YES' : 'NO'}`);
console.log(`Render required: ${canary.promotion.requiresRender ? 'YES' : 'NO'}`);
console.log('Promotion also requires a hashed Resolve-exported OTIO artifact and completed human review for this OTIO canary.');
console.log('');
console.log('## Guardrails');
console.log('');
for (const guardrail of canary.guardrails) console.log(`- ${guardrail}`);
console.log('');
console.log('```text');
console.log('FIXTURE_VALID != RESOLVE_IMPORTED');
console.log('OTIO_IMPORT_SUCCESS != EFFECT_FIDELITY');
console.log('RESOLVE_OTIO_METADATA_PRESENT != CROSS_NLE_EFFECT_SEMANTICS');
console.log('ONE_PASS != REPRODUCED');
console.log('```');
