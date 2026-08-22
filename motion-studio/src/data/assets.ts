// 素材レジストリ。写真・AI背景・動画・音源・書き出し済み素材をIDで一元管理する。
// テンプレートやopeningProjectのscenesからは、パス直書きではなくこのIDで参照する。
// 実ファイルの存在チェック: pnpm check:assets
//
// pathの解決ルール(check-assets.mtsと合わせる):
//   public/... , out/...  → motion-studio/ からの相対
//   ../...                → wedding-project/ リポジトリルートからの相対
//   ~ や / で始まる        → このMacのローカル絶対パス(externalのみ。チェック対象外)
//
// status(制作段階。下に行くほど本番に近い):
//   missing            まだ手元にない(入手待ち。checkは情報表示のみ)
//   idea               アイデアだけある(情報表示のみ)
//   prompt_ready       AI生成用プロンプトや素材準備ができている(情報表示のみ)
//   generated_preview  生成済みだが試作・プレビュー扱い。**本番使用不可**。
//                      無くても情報表示のみ(fresh cloneでcheckを落とさない)。
//                      regenerateCommand必須(無ければwarning)
//   candidate          採用候補。まだ本番確定ではない(ファイルが無ければwarning)
//   approved           採用決定。最終書き出し前(ファイルが無ければエラー)
//   final              本番使用OK(ファイルが無ければエラー)
//   external           repo外管理。存在チェック対象外
//
// 昇格ルール:
//   - candidate以上への昇格は人間(新郎新婦)の確認が必須。
//     AI(Claude/Codex)が勝手にapproved/finalへ変更してはならない。
//   - generated_previewをfinal扱いすることは禁止。
//   - 旧status `generated` は `generated_preview` に移行済み(2026-06-12)。

export type AssetType = 'photo' | 'video' | 'ai-video' | 'audio' | 'render';
export type AssetStatus =
  | 'missing'
  | 'idea'
  | 'prompt_ready'
  | 'generated_preview'
  | 'candidate'
  | 'approved'
  | 'final'
  | 'external';

export type Asset = {
  id: string;
  path: string;
  type: AssetType;
  aspect: '16:9' | '9:16' | '3:4' | '4:3' | '1:1' | 'audio';
  usage: string;
  status: AssetStatus;
  regenerateCommand?: string;
  recoveryNote?: string;
  note?: string;
};

export const assets: Record<string, Asset> = {
  // ---- 写真(実写真はGit外。public/photos/に置いてIDで参照) ----
  'photo-sample-01': {
    id: 'photo-sample-01',
    path: 'public/photos/opening/sample-01.jpg',
    type: 'photo',
    aspect: '3:4',
    usage: '写真カードの動作確認用プレースホルダー(合成グラデ画像)',
    status: 'generated_preview',
    regenerateCommand:
      "ffmpeg -f lavfi -i 'gradients=s=900x1200:c0=#2a4a6b:c1=#d9a05b:n=2' -frames:v 1 public/photos/opening/sample-01.jpg",
    note: '実写真ではなく、動作確認用の合成グラデ画像なので再生成可能',
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
    status: 'generated_preview',
    recoveryNote:
      'ComfyUI Wan2.2で生成済み。~/ComfyUI-Shared/output/video/ のop_16系を採点して採用ファイルを決める',
    note: '採点: docs/templates/ai-video-scorecard.csv。採用確定後にpathを具体ファイル名に更新しstatusをcandidateへ(人間確認必須)',
  },
  'ai-door-light-01': {
    id: 'ai-door-light-01',
    path: '~/ComfyUI-Shared/output/video/',
    type: 'ai-video',
    aspect: '16:9',
    usage: '扉の光のAI生成候補。Remotion版「扉-光」と比較',
    status: 'idea',
    note: 'ComfyUI未生成。aiPromptRegistry.tsのai-door-light-01-idea-01を参照。生成後にgenerated_previewへ昇格(人間確認必須)',
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
  'opening-bgm-main': {
    id: 'opening-bgm-main',
    path: 'public/audio/opening/bgm-main.mp3',
    type: 'audio',
    aspect: 'audio',
    usage: 'Opening V1本番BGM。Remotion preview/finalへ直接合成する場合の正本',
    status: 'missing',
    note: '権利確認後に候補以上へ昇格する。未確認音源はここへ置いても本番再生しない。',
  },
  'opening-air-ambience': {
    id: 'opening-air-ambience',
    path: 'public/audio/opening/air-ambience.mp3',
    type: 'audio',
    aspect: 'audio',
    usage: '雲海前後の機内/風 ambience。J-cut用',
    status: 'missing',
  },
  'opening-okinawa-sea': {
    id: 'opening-okinawa-sea',
    path: 'public/audio/opening/okinawa-sea.mp3',
    type: 'audio',
    aspect: 'audio',
    usage: '沖縄章へ先行する海/風 ambience。J-cut用',
    status: 'missing',
  },
  'opening-seoul-street': {
    id: 'opening-seoul-street',
    path: 'public/audio/opening/seoul-street.mp3',
    type: 'audio',
    aspect: 'audio',
    usage: 'Seoul章へ先行する街 ambience。J-cut用',
    status: 'missing',
  },
  'opening-hawaii-ocean': {
    id: 'opening-hawaii-ocean',
    path: 'public/audio/opening/hawaii-ocean.mp3',
    type: 'audio',
    aspect: 'audio',
    usage: 'Hawaii章へ先行する海/風 ambience。J-cut用',
    status: 'missing',
  },
  'opening-arrival-roomtone': {
    id: 'opening-arrival-roomtone',
    path: 'public/audio/opening/arrival-roomtone.mp3',
    type: 'audio',
    aspect: 'audio',
    usage: '横浜到着前へ先行する薄いroom tone。J-cut用',
    status: 'missing',
  },

  // ---- 書き出し済みRemotion素材(render presetの出力。CapCutが読む) ----
  'render-boarding': {
    id: 'render-boarding',
    path: 'out/opening/boarding_pass_intro.mp4',
    type: 'render',
    aspect: '16:9',
    usage: 'CapCut Track2: 搭乗券イントロ',
    status: 'generated_preview',
    regenerateCommand: 'pnpm render 搭乗券 final',
  },
  'render-stamp-rush': {
    id: 'render-stamp-rush',
    path: 'out/opening/stamp_rush_full_route.mp4',
    type: 'render',
    aspect: '16:9',
    usage: 'CapCut Track2: スタンプ連打ダイジェスト',
    status: 'generated_preview',
    regenerateCommand: 'pnpm render 押印連打-全路線 final',
  },
  'render-countdown': {
    id: 'render-countdown',
    path: 'out/opening/countdown_10sec.mp4',
    type: 'render',
    aspect: '16:9',
    usage: 'CapCut Track2: 入場前カウントダウン',
    status: 'generated_preview',
    regenerateCommand: 'pnpm render 入場前-秒読 final',
  },
  'render-stamp-okinawa': {
    id: 'render-stamp-okinawa',
    path: 'out/opening/stamp_okinawa.webm',
    type: 'render',
    aspect: '16:9',
    usage: 'CapCut Track4: 透過ハンコ(乗算ブレンド推奨)',
    status: 'generated_preview',
    regenerateCommand: 'pnpm render 押印-沖縄 final',
  },
  'render-cloud-overlay': {
    id: 'render-cloud-overlay',
    path: 'out/common/cloud_overlay.webm',
    type: 'render',
    aspect: '16:9',
    usage: 'CapCut Track3: 透過雲オーバーレイ(不透明度50-70%)',
    status: 'generated_preview',
    regenerateCommand: 'pnpm render 雲-透過 final',
  },
};

export const assetPath = (id: string): string => {
  const asset = assets[id];
  if (!asset) {
    throw new Error(`assets.tsに存在しない素材ID: ${id}`);
  }
  return asset.path;
};

export const photoPublicPath = (id: string): string => {
  const asset = assets[id];
  if (!asset) {
    throw new Error(`assets.tsに存在しない素材ID: ${id}`);
  }
  if (asset.type !== 'photo') {
    throw new Error(`photoPublicPathはphoto素材専用: ${id} はtype=${asset.type}`);
  }
  const prefix = 'public/photos/';
  if (!asset.path.startsWith(prefix)) {
    throw new Error(`写真素材のpathは${prefix}から始める: ${id} (${asset.path})`);
  }
  return asset.path.slice(prefix.length);
};

export const audioPublicPath = (id: string): string => {
  const asset = assets[id];
  if (!asset) {
    throw new Error(`assets.tsに存在しない素材ID: ${id}`);
  }
  if (asset.type !== 'audio') {
    throw new Error(`audioPublicPathはaudio素材専用: ${id} はtype=${asset.type}`);
  }
  const prefix = 'public/audio/';
  if (!asset.path.startsWith(prefix)) {
    throw new Error(`Remotion直再生する音源のpathは${prefix}から始める: ${id} (${asset.path})`);
  }
  return asset.path.slice(prefix.length);
};

export const isPlayableAudioAsset = (id: string): boolean => {
  const asset = assets[id];
  if (!asset || asset.type !== 'audio') {
    return false;
  }
  return ['candidate', 'approved', 'final'].includes(asset.status);
};
