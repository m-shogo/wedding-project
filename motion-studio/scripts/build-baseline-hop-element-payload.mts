import {buildTypographyElement} from './lib/typography-element-kit.mts';

await buildTypographyElement({
  patternId: 'type-baseline-hop',
  legacyPresetId: null,
  mode: 'hop',
  outputSlug: 'baseline-hop',
  displayName: 'Wedding Baseline Hop',
  payloadSlug: 'wedding/baseline-hop',
  componentName: 'WeddingBaselineHopElement',
  layerName: 'WeddingBaselineHopLayer',
  componentIdentity: 'com.wedding.motion-zukan.baseline-hop',
  timelineName: 'Baseline Hop',
  defaultText: 'LET’S GO',
  durationInFrames: 120,
});
