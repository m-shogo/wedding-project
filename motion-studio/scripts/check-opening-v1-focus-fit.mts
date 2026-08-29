import assert from 'node:assert/strict';
import {
  resolveOpeningV1PhotoPresentation,
  validateOpeningV1PhotoMetadata,
} from '../src/data/openingV1PhotoPresentation.ts';

const sceneWins = resolveOpeningV1PhotoPresentation({
  sceneFocus: {x: 50, y: 60},
  sceneFit: 'cover',
  assetFocus: {x: 20, y: 80},
  assetFit: 'contain',
});
assert.deepEqual(sceneWins, {
  focus: {x: 50, y: 60},
  fit: 'cover',
  focusSource: 'scene',
  fitSource: 'scene',
});

const assetFallback = resolveOpeningV1PhotoPresentation({
  assetFocus: {x: 20, y: 80},
  assetFit: 'contain',
});
assert.deepEqual(assetFallback, {
  focus: {x: 20, y: 80},
  fit: 'contain',
  focusSource: 'asset',
  fitSource: 'asset',
});

const neutralFallback = resolveOpeningV1PhotoPresentation({});
assert.deepEqual(neutralFallback, {
  focus: undefined,
  fit: 'cover',
  focusSource: 'default',
  fitSource: 'default',
});

const focusOnlySceneStillKeepsAssetFit = resolveOpeningV1PhotoPresentation({
  sceneFocus: {x: 35, y: 45},
  assetFocus: {x: 10, y: 90},
  assetFit: 'contain',
});
assert.deepEqual(focusOnlySceneStillKeepsAssetFit, {
  focus: {x: 35, y: 45},
  fit: 'contain',
  focusSource: 'scene',
  fitSource: 'asset',
});

assert.deepEqual(validateOpeningV1PhotoMetadata({
  'hero-01': {focus: {x: 25, y: 75}, fit: 'cover'},
}), []);
const invalidMetadata = validateOpeningV1PhotoMetadata({
  'hero-01': {focus: {x: -1, y: 101}, fit: 'cover'},
});
assert.equal(invalidMetadata.length, 1);
assert.match(invalidMetadata[0], /focus must stay within 0-100/);

console.log('Opening V1 focus/fit precedence: PASS');
console.log('scene > asset > default plus source authority and metadata validation verified');
