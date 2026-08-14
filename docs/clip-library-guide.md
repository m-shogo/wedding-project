# クリップ素材集の使い方（人間 / AI 共通の入口）

「いろんな素材から、使いたいところ・使いたい動きだけ切り出してストックする」ための手順書。
人間もAI（Claude / Codex）も、このページとコマンドだけ見れば同じように操作できる。

## 3つの正本

| 種類 | ファイル | 誰が読む |
|---|---|---|
| 演出レシピ（人間向け） | [reference-recipes.md](reference-recipes.md) | 人間 |
| 演出レシピ（機械可読） | [data/recipes.json](data/recipes.json) | AI・スクリプト |
| クリップ台帳 | [templates/sample-clips.csv](templates/sample-clips.csv) | 人間・AI |

人間向けと機械可読版は **id と motion を必ず一致させる**。
`validate` が食い違い（語彙外のmotion、存在しないレシピid）を検出する。

素材本体は `10_references/media/` 配下でGit管理外。リポジトリには記録だけ残す。

```text
10_references/media/
  pool/    ① 集めた素材（無料素材サイト等から。Git管理外）
  reel/    ② 1本にまとめた確認用リール
  clips/   ③ 切り出したおいしいとこどりクリップ
```

## コマンド一覧

```sh
# 素材を公式API経由で集める（要・無料APIキー。詳細は free-sample-sources.md）
python3 scripts/fetch_stock.py --provider pexels --query "clouds aerial" --count 3
python3 scripts/fetch_stock.py --provider pexels --query "clouds aerial" --count 3 --write
# レシピを見る（章やmotionで絞れる）
python3 scripts/slice_clips.py recipes
python3 scripts/slice_clips.py recipes --chapter 4
python3 scripts/slice_clips.py recipes --motion drift
python3 scripts/slice_clips.py recipes --json          # AI・他ツール向け

# 集めた素材を1本の確認用リールにまとめる
python3 scripts/slice_clips.py reel                    # dry-run
python3 scripts/slice_clips.py reel --write
python3 scripts/slice_clips.py reel --write --keep-temp # 正規化した中間ファイルも残す

# CSVの定義に従って秒単位で切り出す
python3 scripts/slice_clips.py slice                   # dry-run
python3 scripts/slice_clips.py slice --write
python3 scripts/slice_clips.py slice --write --status picked
python3 scripts/slice_clips.py slice --write --copy    # 高速（キーフレーム精度）

# 定義を検証する（ffmpeg・素材なしで動く。CIでも実行）
python3 scripts/slice_clips.py validate

# movie-dashboard の「クリップ素材集」画面へ反映する
python3 scripts/slice_clips.py sync-dashboard          # dry-run
python3 scripts/slice_clips.py sync-dashboard --write
python3 scripts/slice_clips.py sync-dashboard --check  # CSVとのズレ検出（CI用）
```

`--write` を付けるまで実際のファイル操作はしない。まずdry-runで確認する。

## 標準フロー

```text
① 集める   fetch_stock.py（公式API）またはブラウザで pool/ に保存
           → 取得後に必ず目視確認（人物・動物・文字・ロゴ・看板が無いか）
② 型を選ぶ recipes コマンドで「この動き(motion)を使う」と決める
③ まとめる reel --write で1本にして通しで見る
④ 記録する 使いたい区間の in/out と motion を sample-clips.csv に書く
⑤ 切る     slice --write で秒単位に切り出す
⑥ 選ぶ     見て pick と rating を更新。良いものだけ clips/ に残る
```

## CSVの書き方

| 列 | 内容 | 例 |
|---|---|---|
| `clip_id` | 一意なID | `clip-003` |
| `source_file` | リポジトリからの相対パス | `10_references/media/pool/ocean.mp4` |
| `in_tc` / `out_tc` | 開始/終了。秒 or `MM:SS.ms` or `HH:MM:SS.ms` | `12.0` / `00:00:16.5` |
| `chapter` | 使う章 | `4` |
| `role` | 役割 | `背景` |
| `motion` | **recipes.json の motion_vocab から選ぶ** | `drift` |
| `tags` | 検索用。`;` 区切り | `海;夕暮れ` |
| `caption_space` | テロップ余白の有無 | `yes` |
| `rating` | 0-100 | `85` |
| `pick` | `pool` / `candidate` / `picked` / `rejected` | `picked` |
| `out_name` | 出力ファイル名（省略時は clip_id） | `hawaii_ocean_a` |
| `notes` | 出所・ライセンス・レシピid | `Pexels / rec-09` |

`notes` にレシピid（`rec-09` 形式）を書くと、`validate` が実在チェックする。

## ブラウザで探す（movie-dashboard）

`movie-dashboard` の **クリップ素材集**（`/clips`）で、章・動き(motion)・採否・キーワードで絞り込める。
演出レシピも同じフィルタで連動表示される。

```sh
cd movie-dashboard
pnpm dev     # http://localhost:5173/clips
```

- この画面は **読み取り専用**。編集はCSV側で行う。
- CSVを編集したら `sync-dashboard --write` を実行して反映する。
- 生成物 `movie-dashboard/src/data/clips.json` は直接編集しない。
- CIがCSVとclips.jsonのズレを検出する（`sync-dashboard --check`）。

dashboardの他画面（素材ライブラリ等）はlocalStorageで編集できるが、
クリップ素材集だけはCSVを単一情報源にして二重管理を避けている。

## AIに頼む時の例

```text
docs/clip-library-guide.md を読んで、章4（冒険）で使える背景クリップを整理して。
- python3 scripts/slice_clips.py recipes --chapter 4 --json でレシピを確認
- 10_references/media/pool/ にある素材から使えそうな区間を提案
- sample-clips.csv に追記して python3 scripts/slice_clips.py validate まで通す
- 素材本体はGitに入れない。--write は実行前に確認する
```

AI側のルール:

- `motion` は必ず `recipes.json` の `motion_vocab` から選ぶ（勝手に語彙を増やさない）。
- `pick` を `picked` に上げるのは人間確認が前提。AIが勝手に採用確定しない。
- 人物・動物・読める文字・ロゴ・看板が写ったクリップは採用しない（Style Bible）。
- ライセンス未確認の素材を採用扱いにしない。`notes` に出所を必ず書く。

## 関連

- 演出レシピ: [reference-recipes.md](reference-recipes.md)
- 無料素材の入手先: [free-sample-sources.md](free-sample-sources.md)
- 世界観の基準: [02_style-bible.md](02_style-bible.md)
- 失敗パターン: [failure-patterns.md](failure-patterns.md)
- 自作モーション素材: [motion-studio/README.md](../motion-studio/README.md)
