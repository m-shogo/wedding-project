import {
  createResolveRuntimeCanaryEvidenceTemplate,
  getResolveRuntimeCanary,
  resolve21RuntimeCanaryPack,
} from '../src/data/resolveRuntimeCanaryPack.ts';
import {getResolveRuntimeCanaryCapabilityRefs} from '../src/data/resolveRuntimeCanaryCapabilityRefs.ts';
import {getResolveCanaryInputPreparation} from '../src/data/resolveCanaryInputFixtures.ts';

const args = process.argv.slice(2);
const wantsJson = args.includes('--json');
const wantsEvidenceTemplate = args.includes('--evidence-template');
const wantsList = args.length === 0 || args.includes('--list');
const canaryId = args.find((arg) => !arg.startsWith('--'));

function printList() {
  console.log('Resolve 21 Runtime Canary Pack');
  console.log('');
  for (const canary of resolve21RuntimeCanaryPack.canaries) {
    const prep = getResolveCanaryInputPreparation(canary.id);
    console.log(`${canary.id}\t${canary.priority}\t${canary.state}\t${prep ? 'INPUT_PREP_AVAILABLE' : 'INPUT_PREP_MANUAL'}\t${canary.title}`);
  }
  console.log('');
  console.log('Usage:');
  console.log('  node --no-warnings scripts/resolve-runtime-canary-plan.mts --list');
  console.log('  node --no-warnings scripts/resolve-runtime-canary-plan.mts <CANARY_ID>');
  console.log('  node --no-warnings scripts/resolve-runtime-canary-plan.mts <CANARY_ID> --json');
  console.log('  node --no-warnings scripts/resolve-runtime-canary-plan.mts <CANARY_ID> --evidence-template');
}

if (wantsList) {
  printList();
  process.exit(0);
}

if (!canaryId) {
  console.error('Canary ID is required. Use --list to inspect available canaries.');
  process.exit(1);
}

const canary = getResolveRuntimeCanary(canaryId);
if (!canary) {
  console.error(`Unknown canary: ${canaryId}`);
  printList();
  process.exit(1);
}
const capabilityRefs = getResolveRuntimeCanaryCapabilityRefs(canary.id);
const inputPreparation = getResolveCanaryInputPreparation(canary.id);

if (wantsEvidenceTemplate) {
  console.log(JSON.stringify(createResolveRuntimeCanaryEvidenceTemplate(canary.id), null, 2));
  process.exit(0);
}

if (wantsJson) {
  console.log(JSON.stringify({...canary, capabilityRefs, inputPreparation: inputPreparation ?? null}, null, 2));
  process.exit(0);
}

console.log(`# ${canary.id} — ${canary.title}`);
console.log('');
console.log(`Priority: ${canary.priority}`);
console.log(`Current state: ${canary.state}`);
console.log(`Purpose: ${canary.purpose}`);
console.log(`Resolve target: 21.x / editions=${canary.target.editions.join(',')} / platforms=${canary.target.platforms.join(',')}`);
console.log(`Pages: ${canary.target.pages.join(' -> ')}`);
console.log('Capability references:');
for (const ref of capabilityRefs) {
  console.log(`- ${ref.kind}:${ref.id} -> ${ref.sourceRef}`);
}
console.log('');
console.log('## Input preparation');
if (inputPreparation) {
  console.log(`- Command: ${inputPreparation.command}`);
  console.log(`- Result: ${inputPreparation.result}`);
} else {
  console.log('- No automated neutral fixture preparation is registered. Follow the canary input definitions manually.');
}
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
  if (input.preparationCommand) console.log(`  legacy prepare hint: ${input.preparationCommand}`);
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
for (const criterion of canary.passCriteria) console.log(`- ${criterion}`);
console.log('');
console.log('## Fail criteria');
for (const criterion of canary.failCriteria) console.log(`- ${criterion}`);
console.log('');
console.log('## Promotion');
console.log(`- ${canary.promotion.from} -> ${canary.promotion.to}`);
console.log(`- Minimum independent executions: ${canary.promotion.minimumIndependentExecutions}`);
console.log(`- Save/reopen required: ${canary.promotion.requiresSaveReopen ? 'YES' : 'NO'}`);
console.log(`- Render required: ${canary.promotion.requiresRender ? 'YES' : 'NO'}`);
console.log('');
console.log('## Guardrails');
for (const guardrail of canary.guardrails) console.log(`- ${guardrail}`);
console.log('');
console.log('Evidence skeleton:');
console.log(`  node --no-warnings scripts/resolve-runtime-canary-plan.mts ${canary.id} --evidence-template`);
