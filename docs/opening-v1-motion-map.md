# Opening V1 セクション別 動き対応表

「このセクションはこの動き、この素材」を1枚で決める表。
Palmierへ素材をdropするときに迷わないための作業指示。

- セクション定義の正本: `motion-studio/src/data/openingV1.ts`（9セクション / ちょうど60秒）
- 動きの語彙とレシピの正本: `docs/data/recipes.json` / `docs/reference-recipes.md`
- Remotionテンプレートの正本: `motion-studio/src/data/sceneRegistry.ts`
- 切り出し済みクリップの正本: `docs/templates/sample-clips.csv`

新しいテンプレートを集める必要はない。**上記に既にあるものを割り当てるだけ**。

## 対応表

| # | セクション | 秒 | 動き(motion) | レシピ | 使う素材 | 担当 |
|---|---|---:|---|---|---|---|
| 1 | Departure title | 5 | `slow-push-in` | rec-01 出発の予感 | Remotion `搭乗券` ＋ `題字-汎用`(透過) | codex |
| 2 | Air / cloud transition | 4 | `drift` | rec-03 雲海を流す | Remotion `雲海` / 代替: `clips/cloudsea_blue_a`(Pexels) | codex |
| 3 | Okinawa memories | 9 | `slow-push-in` | rec-13 写真に呼吸 | Remotion `写真-沖縄` ＋ 実写真3枚 ＋ `押印-沖縄`(透過) | claude-code |
| 4 | Seoul memories | 9 | `slow-pan-right` | rec-13 写真に呼吸 | Remotion `写真-韓国` ＋ 実写真3枚 ＋ `押印-韓国`(透過) | claude-code |
| 5 | Hawaii memories | 9 | `slow-push-in`(ゆっくり) | rec-09 海のゴールド | Remotion `写真-Hawaii` ＋ 実写真3枚 ＋ `押印-Hawaii-求婚`(透過) | claude-code |
| 6 | Couple hero photo A | 8 | `slow-push-in` | rec-13 写真に呼吸 | Remotion `写真一枚` ＋ 実写真1枚 | claude-code |
| 7 | Couple hero photo B | 8 | `slow-pull-out` | rec-13 写真に呼吸 | Remotion `写真一枚` ＋ 実写真1枚 | claude-code |
| 8 | Arrival / Yokohama route | 3 | `slow-push-in` | rec-04 距離を地図で語る | Remotion `地図-Hawaii-横浜` | codex |
| 9 | Wedding opening title | 5 | `slow-pull-out` + `tilt-down` | rec-12 到着の余韻 | Remotion `題字-汎用` / 余韻を足すなら `扉-光` | codex |

合計 60秒。実写真セクション（3〜7）は43秒＝**全体の72%が写真主役**。

## 動きを変える理由（重要）

3〜7は全部「写真を見せる」セクションだが、**動きを揃えると単調になる**。
rec-13の「避ける」にも「全写真同じ動き」と書いてある。だから:

- 3 沖縄 → 寄る（`slow-push-in`）
- 4 韓国 → 横に流す（`slow-pan-right`）
- 5 ハワイ → 寄る（ただし一番ゆっくり。山場なので溜める）
- 6 hero A → 寄る
- 7 hero B → **引く**（`slow-pull-out`）。締めに向かって開放する

寄る→流す→寄る→寄る→引く。最後だけ引くことで、9の余韻につながる。

## Palmierのトラック構成

```text
V4  テロップ・字幕            題字-汎用(透過WebM) / Palmierのテキスト
V3  スタンプ・ラベル          押印-*.webm（透過。ブレンド「乗算」でインク感）
V2  オーバーレイ              雲-透過.webm（不透明度を下げる）
V1  背景・写真・地図          Remotion書き出し / 実写真 / 切り出しクリップ
A1  BGM
```

透過WebMはV2以上に置く。V1は必ず不透明素材で埋める。

## 進める順番

```text
1. Remotion素材を書き出す      cd motion-studio && pnpm render <ID> final
2. PalmierでOpening V1を開く   ~/Documents/Palmier Pro/Opening V1.palmier
3. V1トラックへ背景・写真を置く
4. V2〜V4へ透過素材を重ねる
5. BGMに合わせてセクション境界を微調整
6. 判断を docs/handoffs/ へ記録
```

## いま止まっているところ

**実写真11枚が未投入（0/11）。** セクション3〜7の43秒が全部プレースホルダー。
ここが埋まらないと60秒は完成しない。テンプレートを増やしても解決しない。

必要な写真:

| セクション | 枚数 | 内容 |
|---|---:|---|
| Okinawa memories | 3 | 沖縄旅行 |
| Seoul memories | 3 | 韓国旅行 |
| Hawaii memories | 3 | ハワイ旅行（プロポーズ含む） |
| Couple hero A | 1 | 2人の写真 |
| Couple hero B | 1 | 2人の写真 |

置き場: `motion-studio/public/photos/opening/`（Git管理外）
反映: `cd motion-studio && pnpm sync:photos`

## 関連

- 引き継ぎ: [handoffs/2026-08-08-opening-v1-production-handoff.md](handoffs/2026-08-08-opening-v1-production-handoff.md)
- 演出レシピ: [reference-recipes.md](reference-recipes.md)
- クリップ素材集: [clip-library-guide.md](clip-library-guide.md)
- 失敗例: [failure-patterns.md](failure-patterns.md)
