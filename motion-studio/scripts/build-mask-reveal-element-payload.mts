import {buildTypographyElement} from './lib/typography-element-kit.mts';

await buildTypographyElement({
  patternId: 'type-mask-reveal',
  legacyPresetId: 'type-mask-slide',
  mode: 'mask',
  outputSlug: 'mask-reveal',
  displayName: 'Wedding Mask Reveal',
  payloadSlug: 'wedding/mask-reveal',
  componentName: 'WeddingMaskRevealElement',
  layerName: 'WeddingMaskRevealLayer',
  componentIdentity: 'com.wedding.motion-zukan.mask-reveal',
  timelineName: 'Mask Reveal',
  defaultText: 'WELCOME',
  durationInFrames: 120,
});
