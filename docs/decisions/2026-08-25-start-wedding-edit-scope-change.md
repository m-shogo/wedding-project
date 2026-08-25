# StaRt Wedding Edit: 129秒固定・14 section固定・32 slot固定の撤回

日付: 2026-08-25

## 撤回した旧仕様

以前のStart129実装は以下を固定値としていたが、今回のユーザー指示で明示的に無効化された。

- 129.000秒固定
- 0:00〜2:09の機械的な切り出し
- 3870frames固定
- 音源211.49秒すべての使用
- 歌詞44行すべての表示
- 曲の最後(outro)までの制作
- 14 section固定
- 32歌詞slot固定

## 新仕様

**「曲の先頭から、2番サビ後の間奏が音楽的に終わり、次の歌詞が始まる直前まで」**

秒数ではなく音楽構造がsource of truth。実測結果は
`motion-studio/local/start-wedding-edit.local.json` の `sourceEndSec` (145.6秒)。
`Math.ceil(sourceEndSec * fps)` でdurationInFramesを算出し、直接129秒/3870framesを書かない。

歌詞は「やっとこさ幕開けだ」(1行目)から2回目の「僕は探すんだ」(37行目)まで、
計30 phrase(空行を除く)を可変長で使用する。「I can, You can, We can, って」(39行目)以降は
`lyrics-source.local.txt`(全44行)に保持したまま、今回のedit範囲からは除外した。

## 終了地点の判定方法(重要な限界の明記)

**この環境には音声を人間のように聴取する手段が無い。** ユーザーへ確認の上、
ffmpeg解析(RMS energy 1s/0.1s粒度 + showspectrumpicによる視覚的スペクトログラム確認 +
自己相関によるテンポ概算)を代替手段として使用する承認を得て進めた
(Palmier Proの音声認識/ビート検出tool `mcp__Palmier_Pro__*` も試行したが、
このMac環境でのMCPサーバー再現クラッシュにより使用できなかった)。

判定根拠の詳細は `motion-studio/local/start-wedding-edit.local.json` の `reasonJa` に記録。
誤差は±1〜2秒程度あり得ることを明記している。

## 実装したもの

- `motion-studio/src/data/startWeddingEdit/` — 新schema(localEditRange.ts, localLyricsWeddingEdit.ts)、
  新section定義(sections.ts)、新storyboard(storyboard.ts、A/B/C合計約130 shot)、
  sync時生成のgenerated.ts(歌詞phrase・音源path・durationInFramesを焼き込み)
- `motion-studio/scripts/sync-start-wedding-edit-local.mts` — ローカル音源をsourceEndSecでtrim
  (fadeOut付き)し、歌詞・編集範囲データを検証してpublicへコピーする
- `motion-studio/src/motion-kit/startWeddingEdit/weddingLyricLine.tsx` — 実phraseの
  startSec/endSec/rhythmType/emphasisWord/threeHitFrameSecsを読み、CharacterBuild/
  ThreeHitBuild/QuestionPause/ImpactWordHold(独自)を使い分けてA/B/C別に描画
- `motion-studio/src/compositions/startWeddingEdit/` — Composition本体、冒頭Sタイトル
  (既存TitleSequenceA/B/Cをhold+fade-outで12.5秒introへ拡張)、間奏5-beat演出
  (montage→route→welcome→names→end lockup)
- Composition: `StartWeddingEdit-{A,B,C}-{Clean,Guide}` (6本、145.6秒)。
  `Start129-*` は旧実装としてLegacy扱い(削除はしない)。

## 未実装・既知の限界

- 16種類要求された歌詞animation familyのうち、今回のWedding Editで実際に使用したのは
  CharacterBuild / ThreeHitBuild / QuestionPause / ImpactWordHold(独自拡張)の4種。
  Baseline Travel / Type Mask / Foreground Reveal / Lyric-to-Transition / Chorus Burst /
  Ending Dissolve等は未使用(`lyricAnimationFamilies.tsx`にHeldNoteStretch/WhisperReveal/
  SplitConflict/RepetitionEcho等は実装済みだが、今回のstoryboardでは接続していない)。
- beat-map.local.json / phrase-map.local.json / accent-map.local.json / structure-map.local.json
  の個別ファイルは作成せず、`start-wedding-edit.local.json` + `lyrics-wedding-edit.local.json`へ
  統合した(音源の正確なbeat位置を検出する手段が無いため、行単位より細かいbeat-level
  markerは今回作成していない)。
- 各行のstartSec/endSecはsection区切り(ffmpeg解析)+行内文字数比例配分による推定。
  音節単位の実測ではない。
- movie-dashboardへの同期は今回行っていない(ユーザー指定の優先順位で最下位のため)。

## 関連

- `docs/decisions/2026-08-25-start-129-music-driven-blocker.md`(前段のAUDIO_REQUIRED記録)
- `docs/research/start-official-mv-visual-study.md`
- `motion-studio/local/start-wedding-edit.local.json`
- `motion-studio/local/lyrics-wedding-edit.local.json`
