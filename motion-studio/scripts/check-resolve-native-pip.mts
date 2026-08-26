import {
  nativePIPHumanMaster,
  resolveNativePIPCanary,
  resolveNativePIPControlGroups,
  resolveNativePIPOfficialCoordinate,
} from '../src/data/resolveNativePIP.ts';

let errors = 0;
const err = (message: string) => {
  errors += 1;
  console.error(`❌ ${message}`);
};

const canary = resolveNativePIPCanary;
if (canary.id !== 'DV21-NATIVE-PIP-01') err(`unexpected canary id: ${canary.id}`);
if (canary.priority !== 'P1') err(`native PiP should remain P1, got ${canary.priority}`);
if (canary.state !== 'READY_TO_EXECUTE') err(`native PiP input is generatable; expected READY_TO_EXECUTE, got ${canary.state}`);
if (resolveNativePIPOfficialCoordinate.targetPatch !== '21.0.3') err('planning patch drifted from current Resolve 21 authority');
if (resolveNativePIPOfficialCoordinate.runtimeEditionAvailability !== 'VERIFY_EXACT_RUNTIME') err('edition availability must remain runtime-observed');
if (nativePIPHumanMaster.targetIntent.rounding.target !== 0.35) err('neutral rounding target drifted');
if (nativePIPHumanMaster.animationProbe.requiredForCorePass !== false) err('animation must remain separate from static human-adjustability core pass');

const groups = new Map(resolveNativePIPControlGroups.map((group) => [group.group, group.controls]));
for (const [group, controls] of [
  ['CONTENT', ['Zoom', 'Pan', 'Tilt']],
  ['POSITION', ['Position X', 'Position Y', 'Width', 'Height']],
  ['STYLE_CORE', ['Rounding', 'Rotation', 'Opacity', 'Border', 'Fill', 'Drop Shadow', 'Use Alpha']],
] as const) {
  const actual = groups.get(group) ?? [];
  for (const control of controls) if (!actual.includes(control)) err(`${group} missing documented control: ${control}`);
}

const requiredSteps = [
  'effect-availability',
  'apply-control-inventory',
  'style-photo-card',
  'human-late-edit',
  'animation-affordance-probe',
  'save-reopen-render',
];
for (const id of requiredSteps) if (!canary.steps.some((step) => step.id === id)) err(`missing runtime step: ${id}`);

if (!canary.promotion.requiresSaveReopen) err('native PiP promotion must require save/reopen');
if (!canary.promotion.requiresRender) err('native PiP promotion must require render');
if (canary.promotion.minimumIndependentExecutions !== 2) err('native PiP promotion must require two independent executions');

for (const guardrail of [
  'NATIVE_INSPECTOR_CAPABILITY > CUSTOM_GRAPH_WHEN_VISUAL_INTENT_EQUIVALENT',
  'EFFECT_LISTED_IN_DOCS != EFFECT_AVAILABLE_IN_TESTED_EDITION',
  'PARAMETRIC_EDITABLE != HUMAN_ADJUSTABLE',
  'STATIC_HUMAN_ADJUSTABILITY != ANIMATION_CAPABILITY',
  'OPAQUE_SOURCE_USE_ALPHA_CONTROL != ALPHA_PRESERVATION_PROOF',
  'ONE_PASS != REPRODUCED',
]) {
  if (!canary.guardrails.includes(guardrail)) err(`missing guardrail: ${guardrail}`);
}

if (errors > 0) {
  console.error(`Resolve native PiP contract FAILED (${errors})`);
  process.exit(1);
}

console.log('✅ Resolve native PiP contract matches Inspector-first human-adjustability and fail-closed promotion policy.');
