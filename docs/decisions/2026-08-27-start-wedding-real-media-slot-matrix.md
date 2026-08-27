# StaRt Wedding Edit — Real Media Slot Matrix(B案、機械生成)

Status: GENERATED(再生成: `node --no-warnings scripts/generate-start-wedding-real-media-slot-matrix.mts`)
Scope: `motion-studio/src/data/startWeddingEdit/storyboard.ts` の variant='B'

歌詞本文は含まない(sectionId / role / phraseIdのみで参照)。TimingMasterとは独立
(このmatrixを変更してもphrase/cue timingは一切変わらない)。

## role別サマリ

| role | 使用回数 | 合計必要秒数 | kind | aspect | 用途 |
|---|---:|---:|---|---|---|
| HERO_WIDE | 9 | 42.4s | photo | 16:9 | 二人の代替。余白のある横長Hero(後ろ姿・遠景中心) |
| HERO_CLOSE | 6 | 20.9s | photo | 4:5 | 表情・手元の寄り(本人と誤認させない) |
| SEOUL_STREET | 4 | 14.5s | photo | 16:9 | 都市の移動・夜景・横方向の流れ |
| HAWAII_WARM | 6 | 13.1s | photo | 16:9 | 夕景・海辺・暖色の逆光 |
| NEGATIVE_SPACE | 4 | 11.0s | photo | 16:9 | 歌詞・日付を置ける安全な余白 |
| ARRIVAL_YOKOHAMA | 2 | 8.0s | photo | 16:9 | 港・街・会場到着を連想させるwide |
| DEPARTURE | 2 | 4.8s | photo | 16:9 | 空港・駅・スーツケース・歩き出す足元 |
| OKINAWA_WIDE | 2 | 4.8s | photo | 16:9 | 海・水平線・風。match cut可能な水平線 |
| BROLL_TEXTURE | 2 | 4.4s | video | 16:9 | 水面・紙・光と影の短い接続素材 |
| BROLL_WALK | 2 | 3.8s | video | 16:9 | 3〜5秒の歩行・移動の接続素材 |
| END_BREATH | 1 | 3.6s | photo | 16:9 | 3秒静止でも成立する最終写真 |
| DETAIL_HAND | 1 | 1.8s | photo | 4:5 | 手・切符・地図・カメラ等のdetail |

## 全shot一覧(B案、intro除く)

| section | shot# | role | kind | 必要秒数 | aspect | 用途 | 移動方向 | 現状placeholder | real asset |
|---|---:|---|---|---:|---|---|---|---|---|
| 1番a(verse-1a) | 0 | DEPARTURE | photo | 2.4s | 16:9 | 空港・駅・スーツケース・歩き出す足元 | - | demo/start-129/DEPARTURE/pexels-16789404.jpg | missing |
| 1番a(verse-1a) | 1 | DEPARTURE | photo | 2.4s | 16:9 | 空港・駅・スーツケース・歩き出す足元 | - | demo/start-129/DEPARTURE/pexels-30463004.jpg | missing |
| 1番a(verse-1a) | 2 | OKINAWA_WIDE | photo | 2.3s | 16:9 | 海・水平線・風。match cut可能な水平線 | - | demo/start-129/OKINAWA_WIDE/pexels-20593187.jpg | missing |
| 1番a(verse-1a) | 3 | HERO_WIDE | photo | 2.4s | 16:9 | 二人の代替。余白のある横長Hero(後ろ姿・遠景中心) | - | demo/start-129/HERO_WIDE/pexels-10952023.jpg | missing |
| 1番b(verse-1b) | 0 | BROLL_TEXTURE | video | 1.9s | 16:9 | 水面・紙・光と影の短い接続素材 | - | demo/start-129/BROLL_TEXTURE/pexels-20592385.mp4 | missing |
| 1番b(verse-1b) | 1 | SEOUL_STREET | photo | 2.0s | 16:9 | 都市の移動・夜景・横方向の流れ | - | demo/start-129/SEOUL_STREET/pexels-18778162.jpg | missing |
| 1番b(verse-1b) | 2 | BROLL_WALK | video | 2.0s | 16:9 | 3〜5秒の歩行・移動の接続素材 | 歩行方向は問わないが安定した動き | demo/start-129/BROLL_WALK/pexels-34418451.mp4 | missing |
| 1番b(verse-1b) | 3 | HERO_CLOSE | photo | 1.9s | 4:5 | 表情・手元の寄り(本人と誤認させない) | - | demo/start-129/HERO_CLOSE/pexels-34362518.jpg | missing |
| 1番プリコーラス(prechorus-1) | 0 | NEGATIVE_SPACE | photo | 1.5s | 16:9 | 歌詞・日付を置ける安全な余白 | - | demo/start-129/NEGATIVE_SPACE/pexels-2885868.jpg | missing |
| 1番プリコーラス(prechorus-1) | 1 | HERO_WIDE | photo | 1.5s | 16:9 | 二人の代替。余白のある横長Hero(後ろ姿・遠景中心) | - | demo/start-129/HERO_WIDE/pexels-15716670.jpg | missing |
| 1番サビ(chorus-1) | 0 | HAWAII_WARM | photo | 2.2s | 16:9 | 夕景・海辺・暖色の逆光 | - | demo/start-129/HAWAII_WARM/pexels-35092177.jpg | missing |
| 1番サビ(chorus-1) | 1 | HAWAII_WARM | photo | 2.2s | 16:9 | 夕景・海辺・暖色の逆光 | - | demo/start-129/HAWAII_WARM/pexels-35651858.jpg | missing |
| 1番サビ(chorus-1) | 2 | HERO_WIDE | photo | 2.6s | 16:9 | 二人の代替。余白のある横長Hero(後ろ姿・遠景中心) | - | demo/start-129/HERO_WIDE/pexels-16761172.jpg | missing |
| 1番サビ(chorus-1) | 3 | SEOUL_STREET | photo | 5.0s | 16:9 | 都市の移動・夜景・横方向の流れ | - | demo/start-129/SEOUL_STREET/pexels-29188034.jpg | missing |
| 1番サビ(chorus-1) | 4 | HERO_CLOSE | photo | 6.0s | 4:5 | 表情・手元の寄り(本人と誤認させない) | - | demo/start-129/HERO_CLOSE/pexels-8526149.jpg | missing |
| 1番サビ(chorus-1) | 5 | HERO_WIDE | photo | 12.0s | 16:9 | 二人の代替。余白のある横長Hero(後ろ姿・遠景中心) | - | demo/start-129/HERO_WIDE/pexels-29399233.jpg | missing |
| 2番a(verse-2a) | 0 | NEGATIVE_SPACE | photo | 2.5s | 16:9 | 歌詞・日付を置ける安全な余白 | - | demo/start-129/NEGATIVE_SPACE/pexels-30392326.jpg | missing |
| 2番a(verse-2a) | 1 | BROLL_TEXTURE | video | 2.5s | 16:9 | 水面・紙・光と影の短い接続素材 | - | demo/start-129/BROLL_TEXTURE/pexels-34435555.mp4 | missing |
| 2番a(verse-2a) | 2 | SEOUL_STREET | photo | 2.5s | 16:9 | 都市の移動・夜景・横方向の流れ | - | demo/start-129/SEOUL_STREET/pexels-29188036.jpg | missing |
| 2番a(verse-2a) | 3 | HERO_CLOSE | photo | 2.5s | 4:5 | 表情・手元の寄り(本人と誤認させない) | - | demo/start-129/HERO_CLOSE/pexels-8972261.jpg | missing |
| 2番b(verse-2b) | 0 | DETAIL_HAND | photo | 1.8s | 4:5 | 手・切符・地図・カメラ等のdetail | - | demo/start-129/DETAIL_HAND/pexels-33350398.jpg | missing |
| 2番b(verse-2b) | 1 | BROLL_WALK | video | 1.8s | 16:9 | 3〜5秒の歩行・移動の接続素材 | 歩行方向は問わないが安定した動き | demo/start-129/BROLL_WALK/pexels-3978362.mp4 | missing |
| 2番b(verse-2b) | 2 | HAWAII_WARM | photo | 1.8s | 16:9 | 夕景・海辺・暖色の逆光 | - | demo/start-129/HAWAII_WARM/pexels-4061283.jpg | missing |
| 2番b(verse-2b) | 3 | HERO_WIDE | photo | 1.8s | 16:9 | 二人の代替。余白のある横長Hero(後ろ姿・遠景中心) | - | demo/start-129/HERO_WIDE/pexels-30527870.jpg | missing |
| 2番プリコーラス(prechorus-2) | 0 | NEGATIVE_SPACE | photo | 1.0s | 16:9 | 歌詞・日付を置ける安全な余白 | - | demo/start-129/NEGATIVE_SPACE/pexels-37602530.jpg | missing |
| 2番プリコーラス(prechorus-2) | 1 | HERO_CLOSE | photo | 1.0s | 4:5 | 表情・手元の寄り(本人と誤認させない) | - | demo/start-129/HERO_CLOSE/pexels-10638717.jpg | missing |
| 2番サビ(chorus-2) | 0 | HAWAII_WARM | photo | 2.2s | 16:9 | 夕景・海辺・暖色の逆光 | - | demo/start-129/HAWAII_WARM/pexels-4612307.jpg | missing |
| 2番サビ(chorus-2) | 1 | HAWAII_WARM | photo | 2.2s | 16:9 | 夕景・海辺・暖色の逆光 | - | demo/start-129/HAWAII_WARM/pexels-8985046.jpg | missing |
| 2番サビ(chorus-2) | 2 | HERO_WIDE | photo | 2.6s | 16:9 | 二人の代替。余白のある横長Hero(後ろ姿・遠景中心) | - | demo/start-129/HERO_WIDE/pexels-32645048.jpg | missing |
| 2番サビ(chorus-2) | 3 | SEOUL_STREET | photo | 5.0s | 16:9 | 都市の移動・夜景・横方向の流れ | - | demo/start-129/SEOUL_STREET/pexels-36425215.jpg | missing |
| 2番サビ(chorus-2) | 4 | HERO_CLOSE | photo | 7.0s | 4:5 | 表情・手元の寄り(本人と誤認させない) | - | demo/start-129/HERO_CLOSE/pexels-10638719.jpg | missing |
| 2番サビ(chorus-2) | 5 | HERO_WIDE | photo | 13.0s | 16:9 | 二人の代替。余白のある横長Hero(後ろ姿・遠景中心) | - | demo/start-129/HERO_WIDE/pexels-36477380.jpg | missing |
| 間奏: 旅の総集編montage(interlude-montage) | 0 | OKINAWA_WIDE | photo | 2.5s | 16:9 | 海・水平線・風。match cut可能な水平線 | - | demo/start-129/OKINAWA_WIDE/pexels-38116206.jpg | missing |
| 間奏: 旅の総集編montage(interlude-montage) | 1 | HERO_CLOSE | photo | 2.5s | 4:5 | 表情・手元の寄り(本人と誤認させない) | - | demo/start-129/HERO_CLOSE/pexels-27254929.jpg | missing |
| 間奏: 旅の総集編montage(interlude-montage) | 2 | HAWAII_WARM | photo | 2.5s | 16:9 | 夕景・海辺・暖色の逆光 | - | demo/start-129/HAWAII_WARM/pexels-14248915.jpg | missing |
| 間奏: 旅の総集編montage(interlude-montage) | 3 | HERO_WIDE | photo | 2.5s | 16:9 | 二人の代替。余白のある横長Hero(後ろ姿・遠景中心) | - | demo/start-129/HERO_WIDE/pexels-38947209.jpg | missing |
| 間奏: Sの光跡 → route callback(interlude-route) | 0 | ARRIVAL_YOKOHAMA | photo | 4.0s | 16:9 | 港・街・会場到着を連想させるwide | - | demo/start-129/ARRIVAL_YOKOHAMA/pexels-23023916.jpg | missing |
| 間奏: Sの光跡 → route callback(interlude-route) | 1 | ARRIVAL_YOKOHAMA | photo | 4.0s | 16:9 | 港・街・会場到着を連想させるwide | - | demo/start-129/ARRIVAL_YOKOHAMA/pexels-23023917.jpg | missing |
| 間奏: Welcomeメッセージ(interlude-welcome) | 0 | NEGATIVE_SPACE | photo | 6.0s | 16:9 | 歌詞・日付を置ける安全な余白 | - | demo/start-129/NEGATIVE_SPACE/pexels-6010424.jpg | missing |
| 間奏: 新郎新婦名・日付(interlude-names) | 0 | HERO_WIDE | photo | 4.0s | 16:9 | 二人の代替。余白のある横長Hero(後ろ姿・遠景中心) | - | demo/start-129/HERO_WIDE/pexels-4641227.jpg | missing |
| 間奏: StaRt motif callback → End lockup(interlude-end) | 0 | END_BREATH | photo | 3.6s | 16:9 | 3秒静止でも成立する最終写真 | - | demo/start-129/END_BREATH/pexels-26492761.jpg | missing |

## Real Media Authority現状

```text
manifest total entries: 0
  missing:   0
  candidate: 0
  approved:  0
  final:     0
role(s) with usable real media: (none yet)
```

real media追加手順: `src/data/startWeddingEdit/realMedia.ts` の
`START_WEDDING_REAL_MEDIA` 配列へエントリを追加し(実ファイルは
`public/real/start-wedding/<ROLE>/<file>`へ配置、Git管理外)、
statusを`approved`または`final`にする。これにより
`resolveWeddingMediaAsset()`がdemo assetより先にreal assetを解決するように
なる(role/variantIndexの対応関係は変えない)。

## 既知の統合ギャップ

現時点でreal media解決(`WeddingRealOrDemoBackdrop`)は、
`choreographedMoments.tsx`(bespoke全画面takeoverの6 phrase)と
`IntroNarrativeB.tsx`(冒頭)にのみ配線済み。

**上記matrixの大半を占める通常shot(`shotEngine.tsx`の`ShotRenderer`経由、
Start129/Director Recipeとも共有される部品)にはまだreal media解決を
配線していない。** 理由: `shotEngine.tsx`はStart129/Director Recipe
研究表示とも共有されており、無関係な既存機能を壊すリスクがある大きめの
refactorになるため、今回は見送った。

次のステップ候補(実装はTASK8以降、今回は見送り):
`ShotRenderer`/`shotEngine.tsx`内の`StartDemoBackdrop`呼び出し箇所へ、
既定値が既存の`resolveDemoAsset`のままである`assetResolver`引数を追加し、
Wedding Edit側の呼び出し元だけ`resolveWeddingMediaAsset`を渡す、という
後方互換な拡張が安全に見える。
