import type {OpeningProject} from './openingProject.schema';

// Remotion素材の合計尺(秒)。scenesから導出する(手で持たない)
export const remotionBaseSec = (p: OpeningProject): number =>
  p.scenes.reduce((sum, s) => sum + s.durationSec, 0);

// オープニングムービーの単一情報源。
// 新郎新婦・日付・会場・トーン・解像度・シーン構成をここで一元管理する。
// テンプレートに表示する文言は coupleDisplay / dateDisplay / venueDisplay を使う。
//
// シーン構成は「A案(尺圧縮): 沖縄・韓国はスタンプ連打で省略、Hawaiiのみフル演出」。
// B案(全区間フル)に切り替える場合はscenesを差し替える。
// 検証: pnpm check:motion

export const openingProject: OpeningProject = {
  groom: 'Shogo',
  bride: 'Shiori',
  coupleDisplay: 'SHOGO & SHIORI',
  date: '2026-10-24',
  dateDisplay: 'OCT 24 2026',
  venue: '横浜(会場名確定待ち)',
  venueDisplay: 'YOKOHAMA',
  tone: '上品・高級・映画的・旅行。派手な動きとAI感を出さない',
  fps: 30,
  width: 1920,
  height: 1080,
  capcutTargetSec: 105,
  scenes: [
    {
      id: 'opening-boarding',
      title: '搭乗券イントロ',
      template: '搭乗券',
      durationSec: 8,
      assets: [],
      status: 'draft',
      notes: 'BGMの入りに合わせて暗転から。variant=ivory採用かは審査待ち',
    },
    {
      id: 'opening-cloud-sea',
      title: '離陸・雲海',
      template: '雲海',
      durationSec: 6,
      assets: ['ai-cloud-sea-01'],
      status: 'draft',
      notes: 'Remotion版とAI生成版(op_16系)を見比べて良い方を採用',
    },
    {
      id: 'opening-stamp-rush',
      title: '思い出ダイジェスト(スタンプ連打)',
      template: '押印連打-全路線',
      durationSec: 22,
      assets: [],
      status: 'draft',
      notes: 'BGM第1の山に沖縄スタンプの「ポン」を合わせる',
      bgmNote: '第1の山=沖縄スタンプ着弾(素材開始+約0.3秒)に合わせる',
      seNote: 'スタンプ音を3回(沖縄/ソウル/ハワイ)。控えめに',
    },
    {
      id: 'opening-photo-hawaii',
      title: 'Hawaiiの思い出(写真解禁)',
      template: '写真-Hawaii',
      durationSec: 10,
      assets: ['photo-hawaii-01', 'photo-hawaii-02', 'photo-hawaii-03'],
      status: 'todo',
      notes: '実写真3枚待ち。PROPOSAL文脈なので動きは控えめのまま',
    },
    {
      id: 'opening-map-final',
      title: '最終区間 Hawaii→横浜',
      template: '地図-Hawaii-横浜',
      durationSec: 8,
      assets: [],
      status: 'draft',
    },
    {
      id: 'opening-door-light',
      title: '扉の光・余韻',
      template: '扉-光',
      durationSec: 12,
      assets: ['ai-door-light-01'],
      status: 'draft',
      notes: 'Remotion版とAI生成版を比較。テロップ「Cabin crew...」はCapCutで乗せる',
      caption: 'Cabin crew, prepare for arrival.',
    },
    {
      id: 'opening-countdown',
      title: '入場前カウントダウン',
      template: '入場前-秒読',
      durationSec: 16,
      assets: ['bgm-main'],
      status: 'draft',
      notes: '数字の頭をBGMのビートに合わせる。直後に入場曲',
      bgmNote: '数字は1秒ちょうど刻み。ビート頭に合わせ、終わりはフェードアウト→無音',
    },
  ],
};
