import {buildTypographyElement} from './lib/typography-element-kit.mts';

await buildTypographyElement({
  patternId: 'type-outline-fill',
  legacyPresetId: null,
  mode: 'outline',
  outputSlug: 'outline-fill',
  displayName: 'Wedding Outline Fill',
  payloadSlug: 'wedding/outline-fill',
  componentName: 'WeddingOutlineFillElement',
  layerName: 'WeddingOutlineFillLayer',
  componentIdentity: 'com.wedding.motion-zukan.outline-fill',
  timelineName: 'Outline Fill',
  defaultText: 'WELCOME',
  durationInFrames: 120,
});
