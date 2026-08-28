import assert from 'node:assert/strict';
import {resolveOpeningV1PhotoPresentation} from '../src/data/openingV1PhotoPresentation.ts';

const sceneWins = resolveOpeningV1PhotoPresentation({
  sceneFocus: {x: 50, y: 60},
  sceneFit: 'cover',
  assetFocus: {x: 20, y: 80},
  assetFit: 'contain',
});
assert.deepEqual(sceneWins, {focus: {x: 50, y: 60}, fit: 'cover'});

const assetFallback = resolveOpeningV1PhotoPresentation({
  assetFocus: {x: 20, y: 80},
  assetFit: 'contain',
});
assert.deepEqual(assetFallback, {focus: {x: 20, y: 80}, fit: 'contain'});

const neutralFallback = resolveOpeningV1PhotoPresentation({});
assert.deepEqual(neutralFallback, {focus: undefined, fit: 'cover'});

const focusOnlySceneStillKeepsAssetFit = resolveOpeningV1PhotoPresentation({
  sceneFocus: {x: 35, y: 45},
  assetFocus: {x: 10, y: 90},
  assetFit: 'contain',
});
assert.deepEqual(focusOnlySceneStillKeepsAssetFit, {focus: {x: 35, y: 45}, fit: 'contain'});

console.log('Opening V1 focus/fit precedence: PASS');
console.log('scene > asset > default verified; neutral default remains cover/center');
