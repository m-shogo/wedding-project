// プレビューstill(サムネイル)の生成対象定義。
// export-preview-stills.mts(生成)と export-home.mts(表示)が共有する。
// 画像はGit管理しない(exports/**/*.png は.gitignore済み)。

export type PreviewStill = {
  // Composition ID(Root.tsx / sceneRegistry.tsと一致)
  compositionId: string;
  // exports/previews/ 内のファイル名
  file: string;
  // 見やすい代表フレーム
  frame: number;
  // 何を確認するための画像か
  purpose: string;
  // 対応するopeningProjectのシーンID(あれば。シーン別カードに表示する)
  sceneId?: string;
};

export const previewStills: PreviewStill[] = [
  {
    compositionId: '文字部品-確認',
    file: 'text-parts-preview.png',
    frame: 90,
    purpose: 'TextPart 3種の見た目確認(frame90=FadeUpCaption)',
  },
  {
    compositionId: '写真-Hawaii',
    file: 'photo-hawaii.png',
    frame: 120,
    purpose: 'Hawaii写真カードの確認',
    sceneId: 'opening-photo-hawaii',
  },
  {
    compositionId: '搭乗券',
    file: 'boarding.png',
    frame: 120,
    purpose: 'BOARDING PASSイントロの確認',
    sceneId: 'opening-boarding',
  },
  {
    compositionId: '雲海',
    file: 'cloud-sea.png',
    frame: 150,
    purpose: 'Remotion版雲海(AI版op_16系との比較用)',
    sceneId: 'opening-cloud-sea',
  },
  {
    compositionId: '扉-光',
    file: 'door-light.png',
    frame: 180,
    purpose: '入場直前の余韻・光の強さ確認',
    sceneId: 'opening-door-light',
  },
  {
    compositionId: '入場前-秒読',
    file: 'countdown.png',
    frame: 240,
    purpose: 'カウントダウンの数字・読みやすさ確認',
    sceneId: 'opening-countdown',
  },
  // --- ここから下は「一覧から選ぶ」ためのカタログ用 ---
  // 本番テンプレを目で選べるようにする。frameは動きが決まった後の代表位置。
  // 動作確認(透過確認-*)と説明書(取扱説明)は制作用ではないので入れない。

  // 地図(各240frame)。航路が伸び切った後を見せる
  {compositionId: '地図-成田-沖縄', file: 'map-okinawa.png', frame: 170, purpose: 'フライトマップ第1区間の航路と地名'},
  {compositionId: '地図-沖縄-韓国', file: 'map-seoul.png', frame: 170, purpose: 'フライトマップ第2区間'},
  {compositionId: '地図-韓国-Hawaii', file: 'map-hawaii.png', frame: 170, purpose: 'フライトマップ第3区間'},
  {compositionId: '地図-Hawaii-横浜', file: 'map-yokohama.png', frame: 170, purpose: 'フライトマップ最終区間(到着)'},

  // 押印(各60frame・透過)。ハンコが着地した後
  {compositionId: '押印-沖縄', file: 'stamp-okinawa.png', frame: 45, purpose: 'OKINAWA / MEMORY 01(透過)'},
  {compositionId: '押印-韓国', file: 'stamp-seoul.png', frame: 45, purpose: 'SEOUL / MEMORY 02(透過)'},
  {compositionId: '押印-Hawaii-求婚', file: 'stamp-hawaii.png', frame: 45, purpose: 'HAWAII / PROPOSAL(透過)'},
  {compositionId: '押印-横浜', file: 'stamp-yokohama.png', frame: 45, purpose: 'YOKOHAMA / FINAL DESTINATION(透過)'},
  {compositionId: '押印連打-全路線', file: 'stamp-rush.png', frame: 420, purpose: '全ルート一筆+スタンプ連打(尺圧縮案の主役)'},

  // 背景・つなぎ
  {compositionId: '雲-透過', file: 'cloud-overlay.png', frame: 270, purpose: '雲オーバーレイ(透過。重ねて使う)'},
  {compositionId: '飛行機窓', file: 'airplane-window.png', frame: 150, purpose: '機内視点の窓と流れる雲'},
  {compositionId: '題字-汎用', file: 'title-generic.png', frame: 120, purpose: '汎用テロップ(透過。文字を差し替えて使う)'},

  // 写真カード(各300frame)。Hawaii版は上に既出
  {compositionId: '写真-沖縄', file: 'photo-okinawa.png', frame: 120, purpose: '写真カード3枚 MEMORY 01'},
  {compositionId: '写真-韓国', file: 'photo-seoul.png', frame: 120, purpose: '写真カード3枚 MEMORY 02'},

  // Profile素材。「名前をつけたセクションテンプレ」として選ぶ対象
  {compositionId: '章題', file: 'chapter-title.png', frame: 90, purpose: '章タイトル(CHAPTER 1 / Departure / 出発)'},
  {compositionId: '年表', file: 'timeline.png', frame: 240, purpose: '歩みの年表(航路と同じ点線が伸びる)'},
  {compositionId: '写真一枚', file: 'single-photo.png', frame: 120, purpose: '写真1枚をゆっくり見せる主役テンプレ'},
  {compositionId: '紹介札', file: 'intro-card.png', frame: 120, purpose: '家族・友人・犬の紹介カード(名前/関係/ひとこと/写真を差し替え)'},

  // 開幕-全体確認(2460frame)は1枚だと代表性が弱いので序盤/中盤/終盤の3枚で見る
  {
    compositionId: '開幕-全体確認',
    file: 'opening-full-early.png',
    frame: 180,
    purpose: '通し序盤の雰囲気(搭乗券イントロあたり)',
  },
  {
    compositionId: '開幕-全体確認',
    file: 'opening-full-mid.png',
    frame: 900,
    purpose: '通し中盤の雰囲気(スタンプ連打あたり)',
  },
  {
    compositionId: '開幕-全体確認',
    file: 'opening-full-late.png',
    frame: 1800,
    purpose: '通し終盤の雰囲気(扉の光〜カウントダウンあたり)',
  },
];

// 人間がコピペ実行する想定の表示用コマンド。日本語IDなのでクォートする
// (export-preview-stills.mtsの実行はspawnSyncの引数配列なのでクォート不要)
export const stillCommand = (p: PreviewStill): string =>
  `pnpm exec remotion still "${p.compositionId}" exports/previews/${p.file} --frame=${p.frame}`;
