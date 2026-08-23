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
    id: 'okinawa-sea-prelap',
    role: 'ambience',
    assetId: 'opening-okinawa-sea',
    startSec: 1.65,
    endSec: 13.35,
    volume: 0.14,
    note: '2.0秒の沖縄カットより約0.35秒先に海・風の音を入れる。',
  },
  {
    id: 'seoul-street-prelap',
    role: 'ambience',
    assetId: 'opening-seoul-street',
    startSec: 12.55,
    endSec: 24.3,
    volume: 0.1,
    note: '13.0秒のSeoulカットより約0.45秒先に街の薄い環境音を入れる。',
  },
  {
    id: 'hawaii-ocean-prelap',
    role: 'ambience',
    assetId: 'opening-hawaii-ocean',
    startSec: 23.55,
    endSec: 35.35,
    volume: 0.13,
    note: '24.0秒のHawaiiカットより約0.45秒先に海・風の音を入れる。',
  },
  {
    id: 'arrival-roomtone-prelap',
    role: 'ambience',
    assetId: 'opening-arrival-roomtone',
    startSec: 52.6,
    endSec: 57.35,
    volume: 0.08,
    note: '53.0秒の横浜到着カットより約0.4秒先に会場へ戻る空気を薄く作る。',
  },
];
