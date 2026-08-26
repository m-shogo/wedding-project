import {buildTypographyElement} from './lib/typography-element-kit.mts';

await buildTypographyElement({
  patternId: 'type-vertical-wipe',
  legacyPresetId: null,
  mode: 'vertical-wipe',
  outputSlug: 'vertical-wipe',
  displayName: 'Wedding Vertical Wipe',
  payloadSlug: 'wedding/vertical-wipe',
  componentName: 'WeddingVerticalWipeElement',
  layerName: 'WeddingVerticalWipeLayer',
  componentIdentity: 'com.wedding.motion-zukan.vertical-wipe',
  timelineName: 'Vertical Wipe',
  defaultText: '2026.10.24',
  durationInFrames: 120,
});
