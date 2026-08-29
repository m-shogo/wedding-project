import {buildTypographyElement} from './lib/typography-element-kit.mts';

await buildTypographyElement({
  patternId: 'type-word-punch',
  legacyPresetId: null,
  mode: 'punch',
  outputSlug: 'word-punch',
  displayName: 'Wedding Word Punch',
  payloadSlug: 'wedding/word-punch',
  componentName: 'WeddingWordPunchElement',
  layerName: 'WeddingWordPunchLayer',
  componentIdentity: 'com.wedding.motion-zukan.word-punch',
  timelineName: 'Word Punch',
  defaultText: 'WELCOME',
  durationInFrames: 120,
});
