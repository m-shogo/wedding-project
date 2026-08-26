import {
  createResolvePalmierFCPXMLV2EvidenceTemplate,
  palmierV2RuntimeCapabilityRefs,
  resolvePalmierFCPXMLV2RuntimeCanary as canary,
} from '../src/data/resolvePalmierFCPXMLV2Runtime.ts';
import {getResolveCanaryInputPreparation} from '../src/data/resolveCanaryInputFixtures.ts';

const args = process.argv.slice(2);
const wantsJson = args.includes('--json');
const wantsEvidenceTemplate = args.includes('--evidence-template');
const preparation = getResolveCanaryInputPreparation(canary.id);

if (wantsEvidenceTemplate) {
  console.log(JSON.stringify(createResolvePalmierFCPXMLV2EvidenceTemplate(), null, 2));
  process.exit(0);
}

if (wantsJson) {
  console.log(JSON.stringify({canary, capabilityRefs: palmierV2RuntimeCapabilityRefs, inputPreparation: preparation ?? null}, null, 2));
  process.exit(0);
}

console.log(`# ${canary.id} — ${canary.title}`);
console.log('');
console.log('Effective definition: PALMIER_SCENE_V2_RUNTIME_OVERLAY');
console.log(`Priority: ${canary.priority}`);
console.log(`Catalog state: ${canary.state}`);
console.log(`Purpose: ${canary.purpose}`);
console.log(`Resolve target: 21.x / editions=${canary.target.editions.join(',')} / platforms=${canary.target.platforms.join(',')}`);
console.log(`Pages: ${canary.target.pages.join(' -> ')}`);
console.log('');
console.log('## Capability/source references');
for (const ref of palmierV2RuntimeCapabilityRefs) {
  console.log(`- ${ref.kind}:${ref.id} -> ${ref.sourceRef}`);
}
console.log('');
console.log('## Input preparation / Palmier v2 attachment');
if (preparation) {
  console.log(`- Scene spec: ${preparation.command}`);
  console.log(`- Manifest: ${preparation.manifestPath}`);
}
console.log('- Positive input must be a fresh real Palmier scene-v2 export from the exact terminal job path.');
console.log('- Scene v2 export agent: docs/prompts/2026-08-26-palmier-resolve-fcpxml-export-agent-v3.md');
console.log('- Validate/inspect: node --no-warnings scripts/attach-palmier-canary-v2-export.mts --fcpxml <EXACT_COMPLETED_JOB_PATH> --inspect-only');
console.log('- Freshness: node --no-warnings scripts/attach-palmier-canary-v2-export.mts --fcpxml <EXACT_COMPLETED_JOB_PATH> --export-started-at <ISO8601> --check-freshness-only');
console.log('- Attach: node --no-warnings scripts/attach-palmier-canary-v2-export.mts --fcpxml <EXACT_COMPLETED_JOB_PATH> --export-started-at <ISO8601> --attest-real-palmier-export');
console.log('- Session: node --no-warnings scripts/prepare-palmier-fcpxml-v2-resolve-session.mts --execution-id <EXECUTION_ID>');
console.log('');
console.log('## Safety scope');
console.log(`- Disposable project required: ${canary.isolation.disposableProjectRequired ? 'YES' : 'NO'}`);
console.log(`- Real wedding project mutation forbidden: ${canary.isolation.realWeddingProjectMutationForbidden ? 'YES' : 'NO'}`);
console.log(`- Private media commit forbidden: ${canary.isolation.privateMediaCommitForbidden ? 'YES' : 'NO'}`);
console.log(`- Network install allowed: ${canary.isolation.networkInstallAllowed ? 'YES' : 'NO'}`);
console.log('');
console.log('## Inputs');
for (const input of canary.inputs) {
  console.log(`- [${input.required ? 'required' : 'optional'}] ${input.id} (${input.kind}): ${input.sourceRef}`);
  if (input.notes) console.log(`  note: ${input.notes}`);
}
console.log('');
console.log('## Preflight');
for (const item of canary.preflight) console.log(`- ${item}`);
console.log('');
console.log('## Execution');
for (let index = 0; index < canary.steps.length; index += 1) {
  const step = canary.steps[index];
  console.log(`${index + 1}. ${step.id} [${step.page}/${step.mutation}]`);
  console.log(`   Action: ${step.action}`);
  console.log(`   Expected: ${step.expected}`);
  console.log(`   Capture: ${step.capture.join('; ')}`);
  if (step.abortIf.length) console.log(`   Abort if: ${step.abortIf.join('; ')}`);
}
console.log('');
console.log('## Required evidence');
for (const evidence of canary.evidenceRequirements) {
  console.log(`- [${evidence.required ? 'required' : 'optional'}] ${evidence.id} (${evidence.kind}): ${evidence.description}`);
}
console.log('');
console.log('## Pass criteria');
for (const item of canary.passCriteria) console.log(`- ${item}`);
console.log('');
console.log('## Fail criteria');
for (const item of canary.failCriteria) console.log(`- ${item}`);
console.log('');
console.log('## Promotion');
console.log(`- ${canary.promotion.from} -> ${canary.promotion.to}`);
console.log(`- Minimum independent executions: ${canary.promotion.minimumIndependentExecutions}`);
console.log(`- Save/reopen required: ${canary.promotion.requiresSaveReopen ? 'YES' : 'NO'}`);
console.log(`- Render required: ${canary.promotion.requiresRender ? 'YES' : 'NO'}`);
console.log('');
console.log('## Guardrails');
for (const item of canary.guardrails) console.log(`- ${item}`);
console.log('- SCENE_CONTRACT_PASS != RESOLVE_IMPORT_VERIFIED');
console.log('- REAL_PALMIER_PROVENANCE != RESOLVE_RUNTIME_EVIDENCE');
console.log('');
console.log('Evidence template:');
console.log('  node --no-warnings scripts/resolve-palmier-fcpxml-v2-runtime-plan.mts --evidence-template');
