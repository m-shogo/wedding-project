// テンプレート(Composition)のメタデータ単一情報源。
//
// 重要: Root.tsxはここから自動生成しない。
// 理由: Remotion Studioの「Save defaults」はRoot.tsx内のオブジェクトリテラルにしか
// 調整値を書き戻せないため、自動生成にするとStudioでの調整保存が壊れる。
// 代わりに、ここ(registry)とRoot.tsxの不整合を pnpm check:motion が検出する。
//
// テンプレートを追加するときは必ず3点セットで行う:
//   1. Root.tsx に <Composition> を追加(defaultPropsはリテラルで)
//   2. この registry にエントリを追加
//   3. pnpm check:motion で整合を確認
//
// remotionやReactには依存しない純粋データ(checkスクリプトがNodeで直接importする)。

export type RenderKind = 'opaque' | 'alpha' | 'preview-only';

export type TemplateEntry = {
  // Composition ID。Root.tsxと完全一致させる(漢字+英数字+ハイフンのみ)
  id: string;
  // Studioサイドバーのフォルダ名。Root.tsxの<Folder>と一致させる
  folder: string;
  // Root.tsxのdurationInFramesと一致させる
  durationInFrames: number;
  // opaque=MP4 / alpha=透過WebM(VP9) / preview-only=書き出し対象外
  kind: RenderKind;
  // 最終書き出しの出力パス(out/からの相対、拡張子なし)。preview-onlyは省略可
  output?: string;
  description: string;
};

export const templates: TemplateEntry[] = [
  // 00-動作確認
  {id: '透過確認-押印', folder: '00-動作確認', durationInFrames: 60, kind: 'alpha', output: 'common/stamp_test_vp9', description: 'CapCut透過テスト用ハンコ'},
  {id: '透過確認-紙背景', folder: '00-動作確認', durationInFrames: 60, kind: 'opaque', output: 'common/stamp_test_preview', description: '透過テストの紙背景付き比較用'},

  // 10-開幕素材
  {id: '搭乗券', folder: '10-開幕素材', durationInFrames: 240, kind: 'opaque', output: 'opening/boarding_pass_intro', description: 'BOARDING PASSイントロ(ivory/navy)'},
  {id: '地図-成田-沖縄', folder: '10-開幕素材', durationInFrames: 240, kind: 'opaque', output: 'opening/map_narita_to_okinawa', description: 'フライトマップ第1区間'},
  {id: '地図-沖縄-韓国', folder: '10-開幕素材', durationInFrames: 240, kind: 'opaque', output: 'opening/map_okinawa_to_seoul', description: 'フライトマップ第2区間'},
  {id: '地図-韓国-Hawaii', folder: '10-開幕素材', durationInFrames: 240, kind: 'opaque', output: 'opening/map_seoul_to_hawaii', description: 'フライトマップ第3区間'},
  {id: '地図-Hawaii-横浜', folder: '10-開幕素材', durationInFrames: 240, kind: 'opaque', output: 'opening/map_hawaii_to_yokohama', description: 'フライトマップ最終区間'},
  {id: '押印-沖縄', folder: '10-開幕素材', durationInFrames: 60, kind: 'alpha', output: 'opening/stamp_okinawa', description: 'OKINAWA / MEMORY 01(透過)'},
  {id: '押印-韓国', folder: '10-開幕素材', durationInFrames: 60, kind: 'alpha', output: 'opening/stamp_seoul', description: 'SEOUL / MEMORY 02(透過)'},
  {id: '押印-Hawaii-求婚', folder: '10-開幕素材', durationInFrames: 60, kind: 'alpha', output: 'opening/stamp_hawaii_proposal', description: 'HAWAII / PROPOSAL(透過)'},
  {id: '押印-横浜', folder: '10-開幕素材', durationInFrames: 60, kind: 'alpha', output: 'opening/stamp_yokohama', description: 'YOKOHAMA / FINAL DESTINATION(透過)'},
  {id: '押印連打-全路線', folder: '10-開幕素材', durationInFrames: 660, kind: 'opaque', output: 'opening/stamp_rush_full_route', description: '全ルート一筆+スタンプ連打'},
  {id: '雲-透過', folder: '10-開幕素材', durationInFrames: 540, kind: 'alpha', output: 'common/cloud_overlay', description: '雲オーバーレイ(透過・ループ可)'},
  {id: '雲海', folder: '10-開幕素材', durationInFrames: 300, kind: 'opaque', output: 'opening/cloud_sea', description: '上空の雲海(朝/昼/夕)'},
  {id: '飛行機窓', folder: '10-開幕素材', durationInFrames: 300, kind: 'opaque', output: 'opening/airplane_window', description: '機内視点の窓と流れる雲'},
  {id: '扉-光', folder: '10-開幕素材', durationInFrames: 360, kind: 'opaque', output: 'opening/door_light', description: '扉が開いて光が差す余韻'},
  {id: '入場前-秒読', folder: '10-開幕素材', durationInFrames: 480, kind: 'opaque', output: 'opening/countdown_10sec', description: 'Doors opening→10〜1→Please welcome'},
  {id: '題字-汎用', folder: '10-開幕素材', durationInFrames: 240, kind: 'alpha', output: 'opening/title_generic', description: '汎用テロップ(透過。1-B/5-Bコピー用)'},
  {id: '写真-沖縄', folder: '10-開幕素材', durationInFrames: 300, kind: 'opaque', output: 'opening/photo_card_okinawa', description: '写真カード3枚 MEMORY 01'},
  {id: '写真-韓国', folder: '10-開幕素材', durationInFrames: 300, kind: 'opaque', output: 'opening/photo_card_seoul', description: '写真カード3枚 MEMORY 02'},
  {id: '写真-Hawaii', folder: '10-開幕素材', durationInFrames: 300, kind: 'opaque', output: 'opening/photo_card_hawaii', description: '写真カード3枚 MEMORY 03'},

  // 20-Profile素材
  {id: '章題', folder: '20-Profile素材', durationInFrames: 180, kind: 'opaque', output: 'profile/chapter_title', description: 'プロフィール章タイトル'},
  {id: '年表', folder: '20-Profile素材', durationInFrames: 360, kind: 'opaque', output: 'profile/timeline', description: '歩みの年表(点線が伸びる)'},
  {id: '写真一枚', folder: '20-Profile素材', durationInFrames: 240, kind: 'opaque', output: 'profile/single_photo', description: '写真1枚をゆっくり見せる主役テンプレ'},
  {id: '紹介札', folder: '20-Profile素材', durationInFrames: 240, kind: 'opaque', output: 'profile/intro_card', description: '家族・友人・犬の紹介カード'},

  // 30-部品確認
  {id: '文字部品-確認', folder: '30-部品確認', durationInFrames: 300, kind: 'preview-only', description: 'parts/textの3パーツ確認用(本番素材ではない)'},

  // 90-全体確認
  {id: '開幕-全体確認', folder: '90-全体確認', durationInFrames: 2460, kind: 'preview-only', output: 'opening/opening_full_preview', description: '通しテンポ確認用(openingProject連動)'},

  // 99-説明書
  {id: '取扱説明', folder: '99-説明書', durationInFrames: 150, kind: 'preview-only', description: 'Studio内マニュアル'},
];

export const templateById = (id: string): TemplateEntry | undefined =>
  templates.find((t) => t.id === id);
