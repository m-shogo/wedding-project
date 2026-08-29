import {buildTypographyElement} from './lib/typography-element-kit.mts';

await buildTypographyElement({
  patternId: 'type-char-stagger',
  legacyPresetId: null,
  mode: 'stagger',
  outputSlug: 'char-stagger',
  displayName: 'Wedding Character Stagger',
  payloadSlug: 'wedding/char-stagger',
  componentName: 'WeddingCharStaggerElement',
  layerName: 'WeddingCharStaggerLayer',
  componentIdentity: 'com.wedding.motion-zukan.char-stagger',
  timelineName: 'Character Stagger',
  defaultText: 'OUR STORY',
  durationInFrames: 120,
});
