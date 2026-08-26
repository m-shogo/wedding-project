import {
  createResolveOTIOInterchangeEvidenceTemplate,
  otioCurrentReleaseCoordinate,
  resolveOTIOCapabilityMatrix,
  resolveOTIOInterchangeCanary,
  resolveOTIOSecondaryVendorEffectProbe,
} from '../src/data/resolveOTIOInterchange.ts';

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

const canary = resolveOTIOInterchangeCanary;
assert(otioCurrentReleaseCoordinate.currentReleasedVersion === 'v0.18.1', 'OTIO stable release authority drifted. Re-research before changing fixtures.');
assert(otioCurrentReleaseCoordinate.fixtureClipSchema === 'Clip.2', 'OTIO fixture must stay on released Clip.2 authority.');
assert(otioCurrentReleaseCoordinate.fixtureMarkerSchema === 'Marker.2', 'OTIO fixture must stay on released Marker.2 authority.');
assert(otioCurrentReleaseCoordinate.devMainObservedMarkerSchema === 'Marker.3', 'Dev-main marker observation changed; re-check release/dev boundary.');

assert(canary.id === 'DV21-OTIO-INTERCHANGE-01', 'Unexpected OTIO canary ID.');
assert(canary.priority === 'P2', 'OTIO editorial interchange should remain P2 behind direct wedding P0/P1 runtime work.');
assert(canary.state === 'READY_TO_EXECUTE', 'OTIO canary should be input-generatable before runtime.');
assert(canary.inputs.map((input) => input.kind).join(',') === 'OTIO,OTIOZ', 'OTIO canary must compare plain OTIO and OTIOZ separately.');

const expectedSteps = [
  'plain-otio-import',
  'otioz-import',
  'editorial-core-readback',
  'human-late-edit-save-reopen',
  'resolve-otio-export-readback',
  'roundtrip-reimport',
];
assert(JSON.stringify(canary.steps.map((step) => step.id)) === JSON.stringify(expectedSteps), 'OTIO runtime step contract drifted.');
assert(canary.promotion.minimumIndependentExecutions === 2, 'OTIO promotion requires two independent executions.');
assert(canary.promotion.requiresSaveReopen, 'OTIO promotion must require save/reopen.');
assert(!canary.promotion.requiresRender, 'OTIO editorial canary must not use render as portability proof.');

const capabilityById = new Map(resolveOTIOCapabilityMatrix.map((item) => [item.id, item]));
assert(capabilityById.get('clip-track-order-timing')?.fidelity === 'STANDARD_EDITORIAL_CORE', 'Editorial core classification drifted.');
assert(capabilityById.get('plain-otio-media')?.fidelity === 'MEDIA_REFERENCE_ONLY', 'Plain OTIO media boundary drifted.');
assert(capabilityById.get('otioz-media-bundle')?.fidelity === 'MEDIA_BUNDLED_OTIOZ', 'OTIOZ media boundary drifted.');
assert(capabilityById.get('resolve-native-effects')?.fidelity === 'RESOLVE_VENDOR_METADATA', 'Resolve vendor metadata boundary drifted.');
assert(capabilityById.get('third-party-ofx')?.fidelity === 'NOT_PORTABILITY_PROOF', 'Third-party OFX guardrail drifted.');
assert(resolveOTIOSecondaryVendorEffectProbe.promotionRequired === false, 'Vendor-effect probe must stay secondary/non-promotion.');

const evidence = createResolveOTIOInterchangeEvidenceTemplate('DV21-OTIO-INTERCHANGE-01-CHECK');
assert(evidence.result === 'NOT_RUN', 'Fresh OTIO evidence must start NOT_RUN.');
assert(evidence.promotionEligible === false, 'Fresh OTIO evidence must not be promotion eligible.');
assert(evidence.stepResults.every((step) => step.status === 'NOT_RUN'), 'Fresh OTIO steps must all start NOT_RUN.');
assert(evidence.inputInventory.every((input) => input.present === null && input.sha256 === null), 'Unhydrated OTIO evidence inputs must start unknown/null.');

for (const guardrail of [
  'OTIO_IMPORT_SUCCESS != EFFECT_FIDELITY',
  'OTIO_FILE != MEDIA_PACKAGE',
  'OTIOZ_MEDIA_BUNDLED != DEPENDENCY_COMPLETE',
  'RESOLVE_OTIO_METADATA_PRESENT != CROSS_NLE_EFFECT_SEMANTICS',
  'OTIO_EFFECT_RECORD != OPENFX_EFFECT_ROUNDTRIP',
  'ONE_PASS != REPRODUCED',
]) {
  assert(canary.guardrails.includes(guardrail), `Required OTIO guardrail missing: ${guardrail}`);
}

console.log('✅ Resolve OTIO interchange contract is internally coherent and fail-closed before runtime.');
