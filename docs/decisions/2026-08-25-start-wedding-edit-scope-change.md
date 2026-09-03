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

歌詞は1行目(P001)から2回目のサビ主要impact行(37行目、P030)まで、
計30 phrase(空行を除く)を可変長で使用する。39行目以降のブリッジ部分は
`lyrics-source.local.txt`(全44行)に保持したまま、今回のedit範囲からは除外した。
(歌詞本文はこのGit管理ドキュメントには掲載しない。既存方針対応、2026-08-27修正)

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

## 未実装・既知の限界(2026-08-25時点。2026-08-26追記を参照)

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

## 2026-08-26追記: Phase2〜9全面再構築

前回(08-25)の実装は「技術的には再生できるが、写真スライドショー+小さい字幕に見える」
という反証を受け、以下を全面的に作り直した。

### 音楽タイミングの再設計(旧: 未実装 → 新: 実装)

Palmier Pro `detect_beats`(on-device beat detection, bpm=187.5実測)が本セッション中に
接続復旧したため使用した。ffmpeg解析(RMS/spectrogram)による区間推定 + Palmier実測beatへの
スナップを組み合わせ、以下5ファイルを`motion-studio/local/`(gitignore済み)へ生成した。

- `structure-map.local.json` — section境界。各境界の実測beatとの誤差・confidenceを明記
- `phrase-map.local.json` — 30 phrase全件のvocalStartSec/vocalEndSec/importantWords/
  selectedAnimation/transitionIntent/confidence/humanReviewRequired
- `word-accent-map.local.json` — ユーザー指定23語の個別accentSec(実測beatスナップ)
- `beat-map.local.json` — Palmier実測のbeat/downbeat配列そのもの(一次データ)
- `transition-map.local.json` — 各phraseの次画面への繋ぎ方(意味主導)

**依然として人間の聴取による最終確認はしていない**(`verifiedByListening: false`は全件共通、
`humanReviewRequired: true`)。on-device beat detectionは人間の聴取より客観的だが、
歌詞の意味的アクセントとbeatが必ず一致するとは限らない。

### 冒頭「S→StaRt」全面再構築

`motion-studio/src/compositions/start129/TitleSequences.tsx`を全面書き換え。
「ようこそ」を完全に削除し、実測beat(1.14/1.74/2.34/2.98/3.60秒、Palmier実測値)へ
1文字ずつ("S","t","a","R","t")を同期させた。A案は光の線→水平線への変形、
B案はコマ枠を押し広げるframe break、C案は巨大Sマスク+baseline+grid再構成。
「ようこそ」は間奏Welcome区間(`InterludeOverlay.tsx`)にのみ残した。

### 歌詞animation family: 4種→12種

`selectedAnimation`をphrase-mapで明示的に事前設計し、`weddingLyricLine.tsx`の
`WeddingLyricBody`をtext正規表現による推測からswitch文による明示dispatchへ変更した。
実使用12種: character-build(20%) / word-hit / three-hit-build / held-note-stretch /
whisper-reveal / impact-word / split-conflict / question-pause / repetition-echo /
baseline-travel / type-mask / foreground-reveal。同一family 3連続なし。
新規実装: `weddingLyricFamiliesV2.tsx`(Baseline Travel / Foreground Reveal / Type Mask /
Chorus Burst effect)。

### 発見・修正したバグ

- C案`QuestionPause`が白文字固定で明背景上読みにくい問題 → `lyricAnimationFamilies.tsx`の
  `QuestionPause`へ`color`propを追加
- 3-hitのThreeHitBuildが3段階を積み重ねて同時表示するバグ(パッ/パッパッ/パッパッパッが
  縦に並ぶ)→ 置き換わり表示の`ThreeHitStagePop`へ書き換え
- 歌詞後半語がRemotionのネストSequence(既定でabsolute-fillラップされる)により画面左上へ
  表示崩れするバグ → nested Sequenceを廃し直接frame判定へ変更

### 新規QA

`scripts/check-start-wedding-edit-phrase-qa.mts`を新規作成。レンダー結果ではなくデータ契約を
検証: 30phrase coverage・重複/空白検出・family分布(12種以上・character-build 35%以下・
3連続なし)・冒頭StaRt完成/ようこそ不在(静的ソース検査)・bridge歌詞混入なし・
P015/P030のimpact行一致(2回出現)、を全て機械検証しPASS。

### 出力先変更

`motion-studio/out/start-wedding-edit-final-v2/`(フル解像度6本)、
`motion-studio/out/start-wedding-edit-review-v2/`(軽量レビュー版、A/B/C Clean、960×540)。

### 依然残る限界(正直な記載)

- 誰も音声付きで通し視聴による最終確認をしていない
- Lyric-to-Transition / Chorus Burst(独立family化) / Call-and-Response Layout /
  Ending Dissolveは実装が浅い、またはeffect層に留まり独立animation familyとしては未実装
- Type Maskは実shot連動ではなく固定の1枚の写真(HERO_CLOSE)を使用しており、
  そのphraseで実際に表示中の写真と同一とは限らない
- sourceEndSec=145.6sはPalmier実測beatとの整合を再確認したが、人間の聴取確認は未実施

## 関連

- `docs/decisions/2026-08-25-start-129-music-driven-blocker.md`(前段のAUDIO_REQUIRED記録)
- `docs/research/start-official-mv-visual-study.md`
- `motion-studio/local/start-wedding-edit.local.json`
- `motion-studio/local/lyrics-wedding-edit.local.json`
