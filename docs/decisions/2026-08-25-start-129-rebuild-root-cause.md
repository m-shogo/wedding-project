# Root Cause / 再構築: StaRt 129秒 3案が「背景付きの技術確認」に見えた件

日付: 2026-08-25
関連: `docs/decisions/2026-08-25-start-129-production-rescue-root-cause.md`(前回のバグ修正記録)

## 何が起きたか

前回セッションまでで「129秒フルrenderができた」「歌詞32枠バグを直した」「素材の向き混入を直した」と報告した。しかしユーザーがそれを実際に見た結果、**不合格**と判断された。

指摘:

- 実際の歌詞が入っていない
- 楽曲が入っておらず実質無音
- 「歌詞スロット01〜32」を薄く表示しただけ
- 写真を背景へ置いただけの場面が多い
- 画面変化や演出が少ない
- 3案の違いが弱い
- 129秒の完成映像ではなく、背景付きの技術確認に見える
- renderできたことを品質完成と取り違えている

これはすべて事実だった。

## 失敗の原因

### 1. 「バグが無い」を「良い映像だ」と取り違えた

前回のセッションは「歌詞32枠が出ない」「chorusが黒背景」「縦素材混入」という**バグ修正**に集中し、その結果すべてのcheckが通った。だが、バグが無いことは映像が良いことを何も意味しない。修正後の映像は「1区間=写真1枚+歌詞1個」のままで、129秒のうち大半が静止した写真に文字が乗っているだけだった。

### 2. 演出を「設計」せず「機能」として実装した

各区間に対して「どの写真を、何秒、どう動かし、どう切り替え、なぜそうするのか」を決めていなかった。`sectionRoleMap` という role→1素材の対応表しか無く、これは演出表ではなく配線表だった。

### 3. 契約checkが演出密度を測っていなかった

`check-start-129.mts` は「14区間ある」「歌詞32枠が順番通り」など宣言データの整合性しか見ていない。実際に画面が何回変化したかを測っていなかったため、「静止画に文字が乗るだけの129秒」でも満点になった。

### 4. stillだけでQAし、動きを見ていなかった

境界時刻のstill 45枚を目視して「確認した」と報告した。しかしstillには「動きの少なさ」も「変化の乏しさ」も写らない。動画としての密度は、動画かdense filmstripでしか判断できない。

### 5. 共通componentを使いすぎて3案の差が消えた

A/B/Cが同じ `StartDemoBackdrop` + 同じ `sectionRoleMap` 構造を共有し、違いは色・文字サイズ・effect量だけになっていた。映像文法(shot数・切り替え方・画面構成・リズム)は3案ともほぼ同じだった。

### 6. 「歌詞32枠を切り替えられる」を「歌詞が入った」と表現した

これが最も避けるべき混同。placeholderを薄く表示していたため、一見「歌詞入り」に見えるが中身は無い。しかも薄くすることで「あるように見せる」効果すらあった。

### 7. 無音なのに音楽同期映像として扱った

音声trackは存在するが -91dB(実質無音)。それでも「音楽同期」を前提とした設計・報告をしていた。

## 修正方針(今回やったこと)

### 演出を先にデータとして設計した

`motion-studio/src/data/start129/storyboard.ts` を新設。A/B/C × 14区間について、shot単位で以下を明示的に定義した。

- 使う素材role と variantIndex(同じ写真の連続使用を禁止)
- shot長(秒)
- motion: static / push-in / pull-out / pan / tilt / parallax / drift
- entry: cut / fade / dissolve / blur-in / wipe / iris / whip / color-block / scale-pop / slat
- layout: full / split-2 / strip-3 / panel-4 / grid-editorial / inset
- effects: dust / sparks / light-leak / prism / glint / halftone / speed-lines / grain / vignette / flash
- 物語上の意味(narrativeJa)、感情強度(1-5)、なぜこの画なのか(noteJa)

結果: A案43 shot / B案49 shot / C案43 shot。以前は各案14 shot(1区間1枚)だった。

### 3案を別の映像文法にした

| | A案 CINEMATIC | B案 ANIME OP | C案 EDITORIAL |
|---|---|---|---|
| 主なentry | dissolve / blur-in / fade | whip / color-block / scale-pop | slat / wipe |
| 主なlayout | full中心 | panel-4 / strip-3 / split | grid-editorial / split比率可変 |
| 恒常signature | 無し(full-bleed) | コマ枠vignette | マージン罫線 + 区間index |
| 歌詞 | 余白へfade、位置ローテーション | 1文字stagger + shape帯 | 漢字/かなweight差 + baseline走査 |
| scene変化(実測) | 66回 | 96回 | 70回 |

グレースケールにしても構図で区別できることを `ABC_compare_gray.jpg` で確認した。

### 演出密度を機械検証するgateを作った

`scripts/check-start-129-storyboard.mts`:

- shot総数 24以上
- ユニーク素材 24件以上(同じ写真の水増し禁止)
- 変化のないshotが長時間続かない(A案4秒 / B・C案2.5秒上限)
- **layoutは「変化」に数えない**(構図を変えても時間方向には静止するため)
- 同一素材の連続shot禁止
- 全shotに noteJa(なぜこの画か)必須
- サビの感情強度が間奏以下でないこと
- A/B/Cのshot設計が同一でないこと

`scripts/check-start-129-render-qa.mts`(実ファイル検査):

- duration / 解像度 / fps / aspect
- 音量(FINALで実質無音なら失敗)
- 黒frame(0.4秒以上で失敗)
- 3秒以上の完全静止で失敗
- **scene変化数が20回未満で失敗**(「背景を置いただけ」の検出)

このgateは実際にバグを見つけた: C案のstatic + panel-4 のshotが3秒完全静止していることを ffmpeg freezedetect が検出し、6箇所へ微細なpush/driftを追加した。

### 正規歌詞・音源の扱いを構造的に分離した

`scripts/check-start-129-final-gate.mts` を新設。正規歌詞32枠・正規音源・権利メモ・本人素材申告がすべて揃わない限り `WEDDING_FINAL_BLOCKED` を返し、`pnpm render:start-129:final` を実行できない。

Clean版には常時 `DEMO / 正規歌詞・音源 未投入` バッジを表示する。これがある限り、この動画は歌詞入りではない。Dashboard最上部にも `WEDDING_FINAL_BLOCKED` バナーを出す。

### Dashboardを実際の選定画面にした

`/movie-coach/start-129` に実動画player を実装。A/B/C切替(同じtimecodeを維持)、Clean/Guide切替、3本並べて比較、14区間timelineクリックでseek、現在区間・物語・歌詞範囲の表示、**時刻に紐づくコメント**、修正prompt生成。

renderが無い場合は壊れたplayerではなく、実行すべきcommandを日本語で表示する。

## 再発防止

1. **「checkが通った」を「良い」と言わない。** 演出品質は、演出密度gate + 実動画のdense filmstrip目視でしか判断しない。
2. **stillだけでQAを完了扱いしない。** 動きの評価には最低でも1〜2秒間隔のfilmstripか実動画が要る。
3. **「Nスロット切り替えられる」と「Nスロット埋まっている」を区別して書く。** placeholderは薄くして誤魔化さず、バッジで明示する。
4. **共通componentは engine 層に留め、映像文法(shot設計)は案ごとに分ける。** 今回は shotEngine を共有しつつ storyboard を案別に完全分離した。
5. **layoutは時間変化ではない。** 構図の複雑さと動きの有無を混同しない。

## 今回やっていないこと(未完了)

- **正規歌詞・正規音源・本人写真の投入**(ユーザー側の作業。gate が必要ファイルを表示する)
- **音楽同期**(marker設計・beat合わせ)。音源が無いため設計自体できていない。現在の shot 秒数は音楽ではなく物語のリズムで決めた仮の値。
- **1920x1080 FINAL render**(現在は 960x540 の DEMO。FINAL gate が通っていないため)
- **Technique Catalogの単一情報源化**(motion-studio と movie-dashboard の手動複製が残る)
- **contrast比の自動測定**(目標値をコードコメントに書いただけ)
- **A/B/Cのperceptual similarity自動判定**(グレースケール目視で代用)
