import assert from 'node:assert/strict';
import {buildWeddingDavinciProductionRecovery} from '../src/data/weddingDavinciProductionRecovery.ts';
import type {WeddingProjectMotionAssemblyInputV1} from '../src/data/weddingProjectMotionImport.ts';

const blockedInput: WeddingProjectMotionAssemblyInputV1 = {
  schemaVersion: 'motion-studio-project-motion-assembly-input/v1',
  authority: 'MOTION_STUDIO_PROJECT_MOTION_IMPORT_BRIDGE',
  projectId: 'opening',
  acceptedAssignmentCount: 1,
  sceneReferenceCount: 0,
  roughReferenceCount: 0,
  finalReferenceCount: 0,
  assemblyReferenceReady: false,
  blockerCodes: ['PROJECT_MOTION_SCENE_NOT_ASSIGNED:motion-mask-reveal'],
  blockerActions: [
    {
      id: 'opening-project-motion-1',
      kind: 'HUMAN',
      label: 'Resolve project Motion blocker',
      purpose: 'Assign the Human-selected Motion to an exact Opening Scene.',
    },
  ],
  productionReady: false,
  remotionStudioGuiActual: 'NOT_RUN',
  macDaVinciGuiActual: 'NOT_RUN',
  guardrails: ['PROJECT_MOTION_ASSEMBLY_REFERENCE_READY != PRODUCTION_READY'],
};

const blocked = buildWeddingDavinciProductionRecovery('opening', blockedInput);
assert.equal(blocked.stage, 'projectMotionAssembly');
assert.equal(blocked.bridge.state, 'PALMIER_NOT_CURRENT');
assert.equal(blocked.bridge.palmierCurrent, false);
assert.equal(blocked.bridge.davinciHandoffCurrent, false);
assert.equal(blocked.actual.state, 'NOT_RUN');
assert.deepEqual(blocked.blockerCodes, blockedInput.blockerCodes);
assert(blocked.blockerActions.every((action) => action.kind === 'HUMAN'));
assert(!blocked.blockerActions.some((action) => action.command?.includes('davinci-finishing')));
assert(blocked.canonicalRecovery.some((step) => step.includes('Do not initialize or perform Mac DaVinci Actual')));

const readyInput: WeddingProjectMotionAssemblyInputV1 = {
  ...blockedInput,
  sceneReferenceCount: 1,
  roughReferenceCount: 1,
  assemblyReferenceReady: true,
  blockerCodes: [],
  blockerActions: [],
};
const ready = buildWeddingDavinciProductionRecovery('opening', readyInput);
assert.equal(ready.stage, 'davinciFinishing');
assert.equal(ready.bridge.state, 'MAC_DAVINCI_ACTUAL_NOT_VERIFIED');
assert.equal(ready.bridge.palmierCurrent, true);
assert.equal(ready.bridge.davinciHandoffCurrent, true);
assert.equal(ready.actual.state, 'NOT_RUN');
assert(ready.blockerActions.some((action) => action.command === 'pnpm opening:davinci-finishing:init'));
assert.equal(ready.productionReady, false);

const mismatched: WeddingProjectMotionAssemblyInputV1 = {...readyInput, projectId: 'profile'};
assert.throws(
  () => buildWeddingDavinciProductionRecovery('opening', mismatched),
  /PROJECT_MOTION_RECOVERY_PROJECT_MISMATCH:profile:opening/,
);

const legacy = buildWeddingDavinciProductionRecovery('profile');
assert.equal(legacy.stage, 'davinciFinishing');
assert.equal(legacy.actual.state, 'NOT_RUN');

console.log('Wedding project Motion recovery gate contract: PASS');
