import {buildTypographyElement} from './lib/typography-element-kit.mts';

await buildTypographyElement({
  patternId: 'type-type-on-rhythm',
  legacyPresetId: null,
  mode: 'word-stagger',
  outputSlug: 'type-on-rhythm',
  displayName: 'Wedding Type On Rhythm',
  payloadSlug: 'wedding/type-on-rhythm',
  componentName: 'WeddingTypeOnRhythmElement',
  layerName: 'WeddingTypeOnRhythmLayer',
  componentIdentity: 'com.wedding.motion-zukan.type-on-rhythm',
  timelineName: 'Type On Rhythm',
  defaultText: 'OUR JOURNEY',
  durationInFrames: 120,
});
