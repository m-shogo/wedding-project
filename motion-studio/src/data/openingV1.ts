export type OpeningV1Scene = {
  id: string;
  title: string;
  durationSec: number;
  kind: 'travel-ui' | 'real-photo';
  owner: 'codex' | 'claude-code';
  replacementPolicy: string;
};

export const openingV1Scenes: OpeningV1Scene[] = [
  {
    id: 'v1-departure-title',
    title: 'Photo cold open',
    durationSec: 2,
    kind: 'real-photo',
    owner: 'codex',
    replacementPolicy:
      'hero-01実写真を2秒だけ先見せするcold open。中央の高級風タイトルカードへ戻さない。',
  },
  {
    id: 'v1-photos-okinawa',
    title: 'Okinawa memories',
    durationSec: 11,
    kind: 'real-photo',
    owner: 'claude-code',
    replacementPolicy: '実写真3枚。hard cut中心。人物をAI生成しない。',
  },
  {
    id: 'v1-photos-seoul',
    title: 'Seoul memories',
    durationSec: 11,
    kind: 'real-photo',
    owner: 'claude-code',
    replacementPolicy: '実写真3枚。hard cut中心。人物をAI生成しない。',
  },
  {
    id: 'v1-photos-hawaii',
    title: 'Hawaii memories',
    durationSec: 11,
    kind: 'real-photo',
    owner: 'claude-code',
    replacementPolicy: '実写真3枚。hard cut中心。人物をAI生成しない。',
  },
  {
    id: 'v1-photo-hero-a',
    title: 'Couple hero photo A',
    durationSec: 9,
    kind: 'real-photo',
    owner: 'claude-code',
    replacementPolicy: '2人の実写真1枚。native比率を守り、cropしすぎない。',
  },
  {
    id: 'v1-photo-hero-b',
    title: 'Couple hero photo B',
    durationSec: 9,
    kind: 'real-photo',
    owner: 'claude-code',
    replacementPolicy: '2人の実写真1枚。staticを第一候補にする。',
  },
  {
    id: 'v1-arrival-route',
    title: 'Arrival / Yokohama route',
    durationSec: 4,
    kind: 'travel-ui',
    owner: 'codex',
    replacementPolicy: 'Remotion native route graphic。HAWAII → YOKOHAMAだけを簡潔に描く。',
  },
  {
    id: 'v1-ending-title',
    title: 'Documentary end card',
    durationSec: 3,
    kind: 'travel-ui',
    owner: 'codex',
    replacementPolicy: 'YOKOHAMA / 2026.10.24だけ。中央セリフ体の高級風カードへ戻さない。',
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
