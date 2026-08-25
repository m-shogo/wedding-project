# タスクボード

今やることを迷わないための制作入口。単一authorityは `docs/opening-authority.md`。

- **StaRt Extended Candidate = 本命方向**
- **Opening V1 60秒 = Short Candidate / venue fallback / 比較用**
- 実装済みShortをFinal採用済みと扱わない

古い90秒 / 105秒 storyboard、CloudSea、AI素材量産、Palmier 10秒試作は履歴・参考であり、現在の制作順を決める正本ではない。

## Now — Extended本番roughに必要な実素材を揃える

### 1. Extended / Short共通の実素材authorityを作る【最大のボトルネック】

置き場:

`motion-studio/public/photos/opening/`

Shortで既に定義済みの11枚を共通baselineとして入れる:

```text
okinawa-01.jpg
okinawa-02.jpg
okinawa-03.jpg
seoul-01.jpg
seoul-02.jpg
seoul-03.jpg
hawaii-01.jpg
hawaii-02.jpg
hawaii-03.jpg
hero-01.jpg
hero-02.jpg
```

操作:

```sh
cd motion-studio
pnpm dev:opening-v1
```

写真探索は自動。手動 `pnpm sync:photos` は通常不要。

Extendedで追加する実写真・実動画は、先に人物・場所・撮影日・縦横比・使用可否を記録し、placeholderのままFinal判断しない。

### 2. 実素材previewでExtended / Shortを編集判断

```sh
pnpm render:opening-v1:preview
```

Short baseline確認:

1. 顔・身体のcrop
2. 写真の縦横比
3. 視線 / 歩く方向 / horizonのつながり
4. 3枚章の順番
5. staticで良い写真に不要なmotionが付いていないか
6. Cold openでHero 01を再利用することが効いているか
7. 必要なslotだけ `objectPosition` を調整

同じsource authorityをExtended 14 sectionへ割り当て、97 recipeを増やさず4〜8 motion familyへ削る。

### 3. BGM / 現地音

- BGM候補と会場上映/SNS利用条件を確認。
- 権利未確認素材はAssetStatusを上げない。
- `openingV1Sound.ts` のJ-cutを実素材に合わせて微調整。
- whooshを全cutへ置かない。

### 4. Extended rough render gate

- `AUDIO_BLOCKED`を解除し、権利確認済みlocal音源の波形から14 section markerを再確定する。
- `MEDIA_BLOCKED`を解除し、実写真・実動画slotでroughをrenderする。
- `exact` / `representative` / `placeholder`をDashboardで確認し、placeholderを採用判断へ使わない。

### 5. Short fallback render gate

`pnpm render:opening-v1` は写真11/11が揃っていないと失敗する。

最終時:

- 60秒 / 1920×1080 / 30fps
- venue spec
- audio codec / level
- safe area
- black frame
- 実スクリーンでの可読性

を確認する。

## Short Candidate 現行60秒タイムライン

| time | scene | source |
|---|---|---|
| 00:00–00:02 | Photo cold open | Hero実写真 |
| 00:02–00:13 | Okinawa | 実写真3枚 |
| 00:13–00:24 | Seoul | 実写真3枚 |
| 00:24–00:35 | Hawaii | 実写真3枚 |
| 00:35–00:44 | Hero A | 実写真 |
| 00:44–00:53 | Hero B | 実写真 |
| 00:53–00:57 | Hawaii → Yokohama | Remotion route |
| 00:57–01:00 | Documentary end card | native text |

実写真scene 53秒 / 60秒 = 約88%。

詳細正本: `docs/opening-v1-motion-map.md`

## QA — Opening変更時に必須

GitHub PRではMotion Studio CIが自動で:

- photo discovery
- TypeScript
- motion / asset / parts / preset contracts
- sound cue contract
- Opening V1 composition contract
- **代表10frameのVisual QA still render**

を実行する。

Visual QA artifactを**実際に目視してからmerge**する。

placeholderにも薄いコントラストを付け、full / left / right / wideの写真領域を確認できるようにする。

CI GREENだけで見た目を承認しない。

## 削除済み / 現在は戻さない

Visual QAでテンプレ感・生成感が強かったためOpening V1から除外済み:

- 5秒中央serif title card
- `CloudSea` 4秒transition
- 大きいWedding風ending title
- 均等3枚Photo Card
- 全写真Ken Burns
- `MEMORY 01` / `OUR JOURNEY` / `WELCOME ABOARD`系の説明ラベル

復活させる場合は「旅行っぽいから」ではなく、実写真previewで明確に必要性が出た場合だけ。

## AI動画の扱い

AI動画を作ること自体を目標にしない。

Extended / Shortを実写真+BGMで通し、弱いcutが明確になった場合だけ:

1. そのcutの役割を定義
2. Prompt Builderでatomic prompt化
3. 人物・犬・読み取れる文字なし
4. 実写/Remotion/AI候補を比較
5. AIが明確に良い時だけ採用

とする。

現時点で**必須AI B-rollは0本**。

## Palmier / CapCut

RemotionをShort Candidate実装の正本にする。

Palmier / CapCutは必要になった場合のfinal polishだけ:

- BGMの細かいbeat sync
- 実音のtrim
- venue向け最終書き出し微調整

同じtimelineを複数AIが同時編集しない。

## Next

実写真11枚投入後に行う:

- crop/focus metadataをslot別に確定
- visual/semantic matchでcut順を再評価
- BGM拍とscene boundaryを比較
- J-cut/L-cutを耳で調整
- 主要frame + full previewを目視
- 必要なら1〜2cutだけAI B-roll比較

## Later

Extended / Shortを同一素材条件で比較した後:

- プロフィールムービー
- 他Wedding Movie
- movie-dashboardへの最終状態同期
- Palmier / CapCut final polish
- venue delivery package

へ進む。

## Extended制作基盤

StaRt Extended Opening / Director Recipe Catalog(Phase A〜I)は、motion-studioとmovie-dashboardで
本命方向のroughを作るための制作基盤。索引は
`docs/start-director-recipe-system-overview.md`。詳細は`motion-studio/README.md`「Director Recipe
Renderer」節、Claude/Codex A/B比較は `docs/handoff/2026-08-25-codex-ab-comparison-handoff.md`。

Phase Hで基盤としては一区切り。以後は人間の採否判断待ち。

Next（基盤拡張ではなく、本番roughへ進むために人間が判断すること）:

- 97件のレシピから、実際にStaRt用に使う4〜8 motion familyへ絞り込む（`status: planned`のまま。
  AIはapproved/rejectedへ勝手に昇格させない）。
- Claude/Codex A/Bの実行要否を判断する。実行する場合は
  `docs/handoff/2026-08-25-codex-ab-comparison-handoff.md` のhandoffプロンプトをそのまま使える。

Later（正規音源・実写真が来てから）:

- 正規ローカル音源の波形とMarkerで、StaRt sectionのFinal秒数を確定する（現状はYouTube reference
  timingのみのAUDIO_BLOCKED状態）。
- 実写真が来たら、Director Recipe Previewのプレースホルダー（`DemoBackdrop` / `REAL PHOTO / VIDEO
  SLOT`）をsource slotへ差し替える（現状はダミー素材のみのMEDIA_BLOCKED状態）。

## StaRt Wedding Edit（feature/start-129-three-showcases、比較研究ブランチ）

Extended/Shortとは別枠の研究branch。曲頭〜2番サビ後の間奏まで(実測145.6秒)を
実音源・実歌詞・Palmier Pro on-device beat detectionで音楽主導のA/B/C 3案として
実装している。詳細は `docs/decisions/2026-08-25-start-wedding-edit-scope-change.md`。

2026-08-26時点:

- 冒頭は「ようこそ」ではなく実測beatに同期した「S→StaRt」文字組み立てへ再構築済み
- 歌詞30 phraseすべてにselectedAnimation(12種類使用、character-build 20%)を明示付与
- Palmier Proのbeat detection(bpm=187.5実測)で3-hit等の主要点を実測beatへスナップ
- 誰も音声付きで通し視聴による最終確認はしていない（humanReviewRequired=true）
- render: `motion-studio/out/start-wedding-edit-final-v2/`
- 未pushのローカルブランチ。mainへは影響しない

## Legacy / Reference

以下は過去検討として残すが、現在の制作指示には使わない:

- `docs/opening-90s-storyboard.md`
- legacy 82秒 `開幕-全体確認`
- 105秒 storyboard
- CloudSea / 飛行機窓 / 空港ロビー等の旧AI/Remotion比較
- Palmier 10秒 / 30秒試作フロー

## Blocked / Human input

- Opening用の実写真11枚
- BGM候補と上映/SNSの利用条件
- 会場の最終納品仕様

それ以外のコード・QA・差し替え基盤は人間確認待ちにせず進める。
