// 素材レジストリ。写真・AI背景・動画・音源・書き出し済み素材をIDで一元管理する。
// テンプレートやopeningProjectのscenesからは、パス直書きではなくこのIDで参照する。
// 実ファイルの存在チェック: pnpm check:assets
//
// pathの解決ルール(check-assets.mtsと合わせる):
//   public/... , out/...  → motion-studio/ からの相対
//   ../...                → wedding-project/ リポジトリルートからの相対
//   ~ や / で始まる        → このMacのローカル絶対パス(externalのみ。チェック対象外)
//
// status:
//   ready       実ファイルが存在するべき(無ければcheckがエラー)
//   placeholder 仮素材が存在するべき(無ければcheckがエラー)
//   missing     まだ手元にない(入手待ち。checkは情報表示のみ)
//   external    Git外・このrepo外で管理(checkはパス検証をスキップ)

export type AssetType = 'photo' | 'video' | 'ai-video' | 'audio' | 'render';
export type AssetStatus = 'ready' | 'placeholder' | 'missing' | 'external';

export type Asset = {
  id: string;
  path: string;
  type: AssetType;
  aspect: '16:9' | '9:16' | '3:4' | '4:3' | '1:1' | 'audio';
  usage: string;
  status: AssetStatus;
  note?: string;
};

export const assets: Record<string, Asset> = {
  // ---- 写真(実写真はGit外。public/photos/に置いてIDで参照) ----
  'photo-sample-01': {
    id: 'photo-sample-01',
    path: 'public/photos/opening/sample-01.jpg',
    type: 'photo',
    aspect: '3:4',
    usage: '写真カードの動作確認用プレースホルダー',
    status: 'placeholder',
  },
  'photo-hawaii-01': {
    id: 'photo-hawaii-01',
    path: 'public/photos/opening/hawaii-01.jpg',
    type: 'photo',
    aspect: '3:4',
    usage: '写真-Hawaii 1枚目(プロポーズ文脈)',
    status: 'missing',
    note: '実写真の選定待ち(docs/templates/photo-selection.csv)',
  },
  'photo-hawaii-02': {
    id: 'photo-hawaii-02',
    path: 'public/photos/opening/hawaii-02.jpg',
    type: 'photo',
    aspect: '3:4',
    usage: '写真-Hawaii 2枚目',
    status: 'missing',
  },
  'photo-hawaii-03': {
    id: 'photo-hawaii-03',
    path: 'public/photos/opening/hawaii-03.jpg',
    type: 'photo',
    aspect: '3:4',
    usage: '写真-Hawaii 3枚目',
    status: 'missing',
  },

  // ---- AI背景(ComfyUI生成。Remotionテンプレ版と比較して採用を決める) ----
  'ai-cloud-sea-01': {
    id: 'ai-cloud-sea-01',
    path: '~/ComfyUI-Shared/output/video/',
    type: 'ai-video',
    aspect: '16:9',
    usage: '雲海シーンのAI生成候補(op_16系)。Remotion版「雲海」と比較',
    status: 'external',
    note: '採点は docs/templates/ai-video-scorecard.csv',
  },
  'ai-door-light-01': {
    id: 'ai-door-light-01',
    path: '~/ComfyUI-Shared/output/video/',
    type: 'ai-video',
    aspect: '16:9',
    usage: '扉の光のAI生成候補。Remotion版「扉-光」と比較',
    status: 'external',
  },

  // ---- 音源(Git外。利用条件確認が先) ----
  'bgm-main': {
    id: 'bgm-main',
    path: '../07_music/',
    type: 'audio',
    aspect: 'audio',
    usage: 'オープニング本編BGM',
    status: 'missing',
    note: '候補集め: docs/templates/music-candidates.csv。会場上映の利用条件確認必須',
  },

  // ---- 書き出し済みRemotion素材(render presetの出力。CapCutが読む) ----
  'render-boarding': {
    id: 'render-boarding',
    path: 'out/opening/boarding_pass_intro.mp4',
    type: 'render',
    aspect: '16:9',
    usage: 'CapCut Track2: 搭乗券イントロ',
    status: 'ready',
  },
  'render-stamp-rush': {
    id: 'render-stamp-rush',
    path: 'out/opening/stamp_rush_full_route.mp4',
    type: 'render',
    aspect: '16:9',
    usage: 'CapCut Track2: スタンプ連打ダイジェスト',
    status: 'ready',
  },
  'render-countdown': {
    id: 'render-countdown',
    path: 'out/opening/countdown_10sec.mp4',
    type: 'render',
    aspect: '16:9',
    usage: 'CapCut Track2: 入場前カウントダウン',
    status: 'ready',
  },
  'render-stamp-okinawa': {
    id: 'render-stamp-okinawa',
    path: 'out/opening/stamp_okinawa.webm',
    type: 'render',
    aspect: '16:9',
    usage: 'CapCut Track4: 透過ハンコ(乗算ブレンド推奨)',
    status: 'ready',
  },
  'render-cloud-overlay': {
    id: 'render-cloud-overlay',
    path: 'out/common/cloud_overlay.webm',
    type: 'render',
    aspect: '16:9',
    usage: 'CapCut Track3: 透過雲オーバーレイ(不透明度50-70%)',
    status: 'ready',
  },
};

// IDからパスを引く。存在しないIDは早期にエラーにする。
export const assetPath = (id: string): string => {
  const asset = assets[id];
  if (!asset) {
    throw new Error(`assets.tsに存在しない素材ID: ${id}`);
  }
  return asset.path;
};
