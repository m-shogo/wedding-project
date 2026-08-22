export type OpeningV1SoundRole = 'bgm' | 'ambience';

export type OpeningV1SoundCue = {
  id: string;
  role: OpeningV1SoundRole;
  file: string | null;
  startSec: number;
  endSec: number;
  volume: number;
  note: string;
};

// 音ファイルは motion-studio/public/audio/opening/ に置く。
// file=null のcueはrenderされない。素材が決まったらファイル名だけ入れる。
// ambienceは「画が変わってから鳴る」のではなく、次の画より少し先に入るJ-cut前提。
export const openingV1SoundCues: OpeningV1SoundCue[] = [
  {
    id: 'bgm-main',
    role: 'bgm',
    file: null,
    startSec: 0,
    endSec: 60,
    volume: 0.78,
    note: '会場上映/SNS利用条件確認後に本番BGMを設定。',
  },
  {
    id: 'air-prelap',
    role: 'ambience',
    file: null,
    startSec: 4.45,
    endSec: 9.25,
    volume: 0.12,
    note: '雲海カットの少し前から空調/機内/風の薄い環境音を入れる。',
  },
  {
    id: 'okinawa-sea-prelap',
    role: 'ambience',
    file: null,
    startSec: 8.7,
    endSec: 18.35,
    volume: 0.14,
    note: '沖縄の画より約0.3秒先に海・風の音を入れる。',
  },
  {
    id: 'seoul-street-prelap',
    role: 'ambience',
    file: null,
    startSec: 17.55,
    endSec: 27.25,
    volume: 0.1,
    note: '韓国の画より約0.45秒先に街の薄い環境音を入れる。',
  },
  {
    id: 'hawaii-ocean-prelap',
    role: 'ambience',
    file: null,
    startSec: 26.55,
    endSec: 36.35,
    volume: 0.13,
    note: 'Hawaiiの画より約0.45秒先に海/風の音を入れる。',
  },
  {
    id: 'arrival-roomtone-prelap',
    role: 'ambience',
    file: null,
    startSec: 51.7,
    endSec: 56.1,
    volume: 0.08,
    note: '横浜到着カット前に会場へ戻る空気を薄く作る。',
  },
];

export const openingV1EnabledSoundCues = openingV1SoundCues.filter(
  (cue): cue is OpeningV1SoundCue & {file: string} => cue.file !== null,
);
