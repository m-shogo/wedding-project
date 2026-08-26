import {buildTypographyElement} from './lib/typography-element-kit.mts';

await buildTypographyElement({
  patternId: 'type-tracking-burst',
  legacyPresetId: null,
  mode: 'tracking',
  outputSlug: 'tracking-burst',
  displayName: 'Wedding Tracking Burst',
  payloadSlug: 'wedding/tracking-burst',
  componentName: 'WeddingTrackingBurstElement',
  layerName: 'WeddingTrackingBurstLayer',
  componentIdentity: 'com.wedding.motion-zukan.tracking-burst',
  timelineName: 'Tracking Burst',
  defaultText: 'SHOGO & SHIORI',
  durationInFrames: 120,
});
