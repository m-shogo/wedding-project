import {buildTypographyElement} from './lib/typography-element-kit.mts';

await buildTypographyElement({
  patternId: 'type-triplet',
  legacyPresetId: null,
  mode: 'triplet',
  outputSlug: 'triplet',
  displayName: 'Wedding Typography Triplet',
  payloadSlug: 'wedding/typography-triplet',
  componentName: 'WeddingTypographyTripletElement',
  layerName: 'WeddingTypographyTripletLayer',
  componentIdentity: 'com.wedding.motion-zukan.triplet',
  timelineName: 'Typography Triplet',
  defaultText: 'WELCOME',
  durationInFrames: 120,
});
