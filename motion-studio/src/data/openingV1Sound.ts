export type OpeningV1SoundRole = 'bgm' | 'ambience';

export type OpeningV1SoundCue = {
  id: string;
  role: OpeningV1SoundRole;
  assetId: string;
  startSec: number;
  endSec: number;
  volume: number;
  note: string;
};

// 音源本体と採用段階はassets.tsで管理する。
// このファイルは「いつ、何の音を、どの音量で使うか」だけを持つ純粋データ。
// 再生可否(candidate / approved / final)はRemotion側で判定する。
// ambienceは次の画より少し先に入るJ-cut前提。
export const openingV1SoundCues: OpeningV1SoundCue[] = [
  {
    id: 'bgm-main',
    role: 'bgm',
    assetId: 'opening-bgm-main',
    startSec: 0,
    endSec: 60,
    volume: 0.78,
    note: '会場上映/SNS利用条件確認後に候補以上へ昇格したBGMだけ再生。',
  },
  {
    id: 'air-prelap',
    role: 'ambience',
    assetId: 'opening-air-ambience',
    startSec: 4.45,
    endSec: 9.25,
    volume: 0.12,
    note: '雲海カットの少し前から空調/機内/風の薄い環境音を入れる。',
  },
  {
    id: 'okinawa-sea-prelap',
    role: 'ambience',
    assetId: 'opening-okinawa-sea',
    startSec: 8.7,
    endSec: 18.35,
    volume: 0.14,
    note: '沖縄の画より約0.3秒先に海・風の音を入れる。',
  },
  {
    id: 'seoul-street-prelap',
    role: 'ambience',
    assetId: 'opening-seoul-street',
    startSec: 17.55,
    endSec: 27.25,
    volume: 0.1,
    note: '韓国の画より約0.45秒先に街の薄い環境音を入れる。',
  },
  {
    id: 'hawaii-ocean-prelap',
    role: 'ambience',
    assetId: 'opening-hawaii-ocean',
    startSec: 26.55,
    endSec: 36.35,
    volume: 0.13,
    note: 'Hawaiiの画より約0.45秒先に海/風の音を入れる。',
  },
  {
    id: 'arrival-roomtone-prelap',
    role: 'ambience',
    assetId: 'opening-arrival-roomtone',
    startSec: 51.7,
    endSec: 56.1,
    volume: 0.08,
    note: '横浜到着カット前に会場へ戻る空気を薄く作る。',
  },
];
