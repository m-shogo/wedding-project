# タスクボード

今やることを迷わないための制作入口。**2026-08-23時点のOpening正本は60秒Photo-first V1**。

古い90秒 / 105秒 storyboard、CloudSea、AI素材量産、Palmier 10秒試作は履歴・参考であり、現在の制作順を決める正本ではない。

## Now — Opening V1完成を最優先

### 1. 実写真11枚を入れる【最大のボトルネック】

置き場:

`motion-studio/public/photos/opening/`

canonical filename:

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

### 2. 実写真previewで編集判断

```sh
pnpm render:opening-v1:preview
```

確認順:

1. 顔・身体のcrop
2. 写真の縦横比
3. 視線 / 歩く方向 / horizonのつながり
4. 3枚章の順番
5. staticで良い写真に不要なmotionが付いていないか
6. Cold openでHero 01を再利用することが効いているか
7. 必要なslotだけ `objectPosition` を調整

### 3. BGM / 現地音

- BGM候補と会場上映/SNS利用条件を確認。
- 権利未確認素材はAssetStatusを上げない。
- `openingV1Sound.ts` のJ-cutを実素材に合わせて微調整。
- whooshを全cutへ置かない。

### 4. final

`pnpm render:opening-v1` は写真11/11が揃っていないと失敗する。

最終時:

- 60秒 / 1920×1080 / 30fps
- venue spec
- audio codec / level
- safe area
- black frame
- 実スクリーンでの可読性

を確認する。

## 現行60秒タイムライン

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

現行60秒を実写真+BGMで通し、弱いcutが明確になった場合だけ:

1. そのcutの役割を定義
2. Prompt Builderでatomic prompt化
3. 人物・犬・読み取れる文字なし
4. 実写/Remotion/AI候補を比較
5. AIが明確に良い時だけ採用

とする。

現時点で**必須AI B-rollは0本**。

## Palmier / CapCut

RemotionをOpening V1の正本にする。

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

Opening V1が完成した後:

- プロフィールムービー
- 他Wedding Movie
- movie-dashboardへの最終状態同期
- Palmier / CapCut final polish
- venue delivery package

へ進む。

## 並行研究トラック（Opening V1には未反映）

StaRt Extended Opening / Director Recipe Catalog(Phase A〜G)は、motion-studioで並行して
育てている研究トラック。Opening V1の作業順を変えない。詳細は
`motion-studio/README.md`「Director Recipe Renderer」節、Claude/Codex A/B比較は
`docs/handoff/2026-08-25-codex-ab-comparison-handoff.md`。

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
