export type OpeningV1Scene = {
  id: string;
  title: string;
  durationSec: number;
  kind: 'travel-ui' | 'real-photo' | 'motion-placeholder';
  owner: 'codex' | 'claude-code';
  replacementPolicy: string;
};

export const openingV1Scenes: OpeningV1Scene[] = [
  {
    id: 'v1-departure-title',
    title: 'Departure title',
    durationSec: 5,
    kind: 'travel-ui',
    owner: 'codex',
    replacementPolicy: 'Remotion native text/UI. AI動画へ文字を焼き込まない。',
  },
  {
    id: 'v1-cloud-transition',
    title: 'Air / cloud transition',
    durationSec: 4,
    kind: 'motion-placeholder',
    owner: 'codex',
    replacementPolicy:
      'V1はRemotion placeholder。実編集で必要性が確認できた時だけAI B-rollへ差し替える。',
  },
  {
    id: 'v1-photos-okinawa',
    title: 'Okinawa memories',
    durationSec: 9,
    kind: 'real-photo',
    owner: 'claude-code',
    replacementPolicy: '実写真3枚へ差し替え。人物をAI生成しない。',
  },
  {
    id: 'v1-photos-seoul',
    title: 'Seoul memories',
    durationSec: 9,
    kind: 'real-photo',
    owner: 'claude-code',
    replacementPolicy: '実写真3枚へ差し替え。人物をAI生成しない。',
  },
  {
    id: 'v1-photos-hawaii',
    title: 'Hawaii memories',
    durationSec: 9,
    kind: 'real-photo',
    owner: 'claude-code',
    replacementPolicy: '実写真3枚へ差し替え。人物をAI生成しない。',
  },
  {
    id: 'v1-photo-hero-a',
    title: 'Couple hero photo A',
    durationSec: 8,
    kind: 'real-photo',
    owner: 'claude-code',
    replacementPolicy: '2人の実写真1枚へ差し替え。',
  },
  {
    id: 'v1-photo-hero-b',
    title: 'Couple hero photo B',
    durationSec: 8,
    kind: 'real-photo',
    owner: 'claude-code',
    replacementPolicy: '2人の実写真1枚へ差し替え。',
  },
  {
    id: 'v1-arrival-route',
    title: 'Arrival / Yokohama route',
    durationSec: 3,
    kind: 'travel-ui',
    owner: 'codex',
    replacementPolicy: 'Remotion native route graphic。読める地名はRemotionで描画。',
  },
  {
    id: 'v1-ending-title',
    title: 'Wedding opening title',
    durationSec: 5,
    kind: 'travel-ui',
    owner: 'codex',
    replacementPolicy: 'Remotion native text。PalmierでBGM終端と同期する。',
  },
];

export const openingV1TotalSec = openingV1Scenes.reduce(
  (sum, scene) => sum + scene.durationSec,
  0,
);

export const openingV1RealPhotoSec = openingV1Scenes
  .filter((scene) => scene.kind === 'real-photo')
  .reduce((sum, scene) => sum + scene.durationSec, 0);

export const openingV1RealPhotoRatio = openingV1RealPhotoSec / openingV1TotalSec;

if (openingV1TotalSec !== 60) {
  throw new Error(`Opening V1 must stay exactly 60 seconds: ${openingV1TotalSec}s`);
}
