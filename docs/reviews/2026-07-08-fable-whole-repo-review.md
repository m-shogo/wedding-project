# 全体レビュー報告: wedding-project

## レビュー日時

- 第1弾: 2026-07-08
- 第2弾: 2026-07-09
- ChatGPT再レビュー整理: 2026-07-09

## 対象commit

- Fableレビュー開始時点: `433c9af`（docs: add fable whole repo review prompt）
- 第1弾修正コミット: `7436a19`（docs: add Fable whole-repo review report and fix stale I2V prompt doc）
- 第1弾hash記録更新: `85603b8`
- 第2弾修正コミット: `8d45ffb`（fix: 全体レビュー第2弾の残ファイル整合と不採用素材ガード強化）
- 第2弾hash記録更新: `ec394bc`

## 読んだ主要ファイル

- `README.md`
- `AGENTS.md`
- `CLAUDE.md`
- `CODEX.md`
- `docs/reviews/2026-07-08-pre-fable-handoff.md`
- `docs/prompts/2026-07-08-fable-whole-repo-review.md`
- `docs/00_start-here.md`
- `docs/task-board.md`
- `02_opening-movie/asset-status.md`
- `02_opening-movie/README.md`
- `02_opening-movie/ai-prompts.md`
- `02_opening-movie/comfy-desktop-video-prompts-concept-01.md`
- `02_opening-movie/storyboard.md`
- `02_opening-movie/capcut-edit-plan.md`
- `docs/capcut-opening-timeline.md`
- `docs/decisions/2026-07-08-review-prep-cleanup.md`
- `docs/decisions/2026-07-09-whole-repo-review-followup.md`
- `docs/02_style-bible.md`
- `motion-studio/README.md` / `motion-studio/CLAUDE.md` / `motion-studio/package.json`
- `movie-dashboard/README.md` / `movie-dashboard/package.json`
- `movie-dashboard/src/data/*.json`（assets/movies/prompts/scenes/tasks）
- `.gitignore`（root / `motion-studio/.gitignore` / `movie-dashboard/.gitignore`）
- `scripts/check_assets.py`
- `scripts/build_opening_movie.py`
- `scripts/comfy_i2v.py`
- `scripts/comfy_i2v_batch.py`
- `opening-movie/`（初期構想アーカイブ）
- `.claude/agents/` / `.agents/skills/` / `.codex/agents/`

## 実行したコマンドと結果

```sh
git checkout main && git pull origin main
git status --short
git branch --show-current
git log --oneline -8
```

- `main` 上で作業。
- 実素材や大容量生成物の混入なし。

横断検索:

```sh
rg "op_01|op_11|sample_image|build_opening_movie|check_assets|no people|人物|犬|AI生成|final|approved|candidate|used|ready" .
rg "90_exports|motion-studio/out|movie-dashboard/dist|generated-images|ai-videos" .
rg "TODO|FIXME|古い|仮|要確認|未整理" docs 02_opening-movie motion-studio movie-dashboard
```

- 第1弾で `02_opening-movie/comfy-desktop-video-prompts-concept-01.md` に不採用画像をそのままI2V入力に見せる導線を検出し、修正。
- 第2弾で残り全ファイルを確認し、`ai-prompts.md` / `storyboard.md` / `capcut-edit-plan.md` / legacy `opening-movie/` などの説明を補強。
- `op_01` / `op_11` が採用候補・本番候補として復活している箇所はなし。

素材チェック:

```sh
python3 scripts/check_assets.py
python3 scripts/check_assets.py --write
```

- `op_01` / `op_11` は「不採用（人物入り・再生成対象）」で維持。
- 採用候補I2V（op_16 / op_02 / op_03 / op_07）は維持。
- 不採用I2V理由（op_10 / op_08）は維持。
- `sample_image` ローカル管理の説明は維持。
- `--write` による人間判断の消失なし。

legacy build確認:

```sh
python3 scripts/build_opening_movie.py
```

- 終了コード1で意図した安全停止。
- `op_01` / `op_11` が人物入りのため停止していることが明示されており、正常動作。

I2V単発ガード確認:

```sh
python3 -c "import ast; ast.parse(open('scripts/comfy_i2v.py').read())"
python3 scripts/comfy_i2v.py --image 02_opening-movie/sample_image/op_11_narita_airport_lobby_ai.png --prompt test --prefix test
```

- `comfy_i2v.py` 構文OK。
- `op_11` を渡すとexit 1で安全停止。
- 人物入り素材を強制使用できるオプションは追加していない。

movie-dashboard JSON整合性:

- `assets.json` に `asset-01`〜`asset-29` はすべて定義済み。
- `scenes.json` が参照する `assets` / `promptIds` / `movieId` に未定義参照なし。
- `assets.json` の `relatedSceneIds` が参照するsceneにも未定義参照なし。
- `tasks.json` の関連ID参照にも不整合なし。
- `asset-01` は `collecting`、代替候補 `asset-27/28/29` は `needed` で、採用確定扱いではない。

motion-studio:

```sh
cd motion-studio
pnpm install
pnpm check
pnpm typecheck
pnpm export
cd ..
```

- `pnpm check`: check:motion / check:assets / check:parts すべて成功、警告0件。
- `pnpm typecheck`: エラーなし。
- `pnpm export`: export:capcut / export:review / export:home すべて成功。

movie-dashboard:

```sh
cd movie-dashboard
pnpm install
pnpm build
cd ..
```

- build成功。
- chunk size警告のみ。機能影響なし。

Git管理・大容量素材確認:

```sh
git ls-files 05_photos 06_videos 07_music 04_ai-video-assets 00_inbox
git ls-files -z | xargs -0 du -h | sort -rh | head
```

- 実写真・動画・音源・AI生成動画/画像の混入なし。
- 最大でも小さい管理ファイルのみ。
- `motion-studio/public/photos/**` は `motion-studio/.gitignore` で除外済み。
- `opening-movie/generated/**` をroot `.gitignore` に追加済み。

## 見つけた問題と修正

### P1: `comfy-desktop-video-prompts-concept-01.md` が不採用画像を入力指示していた

`op_01_narita_boarding_gate_ai.png` / `op_11_narita_airport_lobby_ai.png` をそのままI2V入力に見せる導線があった。

修正:

- 冒頭に `op_01` / `op_11` は人物入り不採用と明記。
- 01節・11節に「不採用・要再生成」を追記。
- 人物なし版を再生成した後にのみプロンプトを参考流用する方針に変更。

### P1: `scripts/comfy_i2v.py` に不採用画像ガードがなかった

任意の `--image` を受け付けるため、不採用の `op_01` / `op_11` をそのままI2V入力にできた。

修正:

- `REJECTED_IMAGES` を追加。
- `op_01` / `op_11` を渡した場合は安全停止。
- 強制使用オプションは追加しない。

### P1: `docs/capcut-opening-timeline.md` のステータス説明が古かった

廃止済みの `ready` 案内があり、現行のAssetStatusフローとズレていた。

修正:

- 現行の `missing → idea → prompt_ready → generated_preview → candidate → approved → final` フローに合わせて修正。
- `pnpm check` の説明に `check:parts` を追加。

### P1: `opening-movie/generated/**` が未ignoreだった

初期画像一括生成スクリプトの出力先がGit管理に入り得た。

修正:

- root `.gitignore` に `opening-movie/generated/**` を追加。

### P2: `ai-prompts.md` の1-A系が採用候補に見えた

`1-A-1` / `1-A-2` に85点/82点が残り、生成静止画の採用状態と混同しやすかった。

修正:

- 冒頭に、点数はショット案評価であり採用状態ではないと明記。
- `1-A-1` / `1-A-2` 見出しに人物入り不採用・再生成対象を追記。

### P2: storyboard / capcut-edit-plan の1-A系に再生成待ち注記が弱かった

修正:

- `storyboard.md` の必要AI素材表に、1-A系の再生成待ち注記を追加。
- `capcut-edit-plan.md` のChapter 1-Aに、仮組み扱いの注記を追加。

### P2: legacy `opening-movie/` が現行入口と紛らわしかった

削除や `99_archive/` 移動はせず、初期構想アーカイブとして残す判断。

修正:

- `opening-movie/README.md` を新設。
- `concept-01-memory-flight-1024.md` 冒頭に初期構想メモである旨と `op_01/op_11` 不採用注記を追加。
- root `README.md` のフォルダ一覧に `opening-movie/` を追記。

## 追加した内容

- `docs/reviews/2026-07-08-fable-whole-repo-review.md`
- `docs/decisions/2026-07-09-whole-repo-review-followup.md`
- `opening-movie/README.md`

## P0 / P1 / P2

- P0: 0件
- P1: 0件（検出分はすべて修正済み）
- P2: 0件（検出分はすべて修正済み）

補足:

- v001/v002当時の決定ログにある `final` / `approved` 的な表現は、履歴記録として保持。
- 現在の採否・素材状態の正は `02_opening-movie/asset-status.md`。
- `opening-movie/` は残課題ではなく、初期構想アーカイブとして明示済み。

## 残っている課題（制作タスク）

レビュー整合上のP0/P1/P2ではなく、次に制作として進めるタスク:

1. 人物なしの空港ロビー/搭乗ゲート静止画を生成し、`asset-01` のpathへ反映。
2. `asset-27〜29` の空港ロビー候補を生成・採点し、採用候補を `asset-01` に差し替える。
3. 採用候補I2V（`op_16` / `op_02` / `op_03` / `op_07`）をCapCutの10秒試作へ組み込む。
4. `op_10`（光の扉）はRemotion版 `扉-光` と比較して採否を決定。
5. 静止画が無い `2-A` / `4-A-2` の素材を生成するか、Remotionテンプレ代替の可否を判断。
6. 会場仕様・BGM利用条件・提出形式を確認する。

## Fable / Claude / Codex が次に作業するときの注意

- `op_01` / `op_11` を採用候補・本番候補として扱わない。人物入りが目視確認済み。
- `comfy-desktop-video-prompts-concept-01.md` の01/11節は「不採用画像のプロンプト参考」であり、そのまま実行しない。
- `scripts/check_assets.py --write` 前後で、`REJECTED_IMAGES` / `REJECTED_VIDEO_ASSETS` / `CANDIDATE_I2V` に対応する内容が `asset-status.md` に残っているか確認する。
- `scripts/build_opening_movie.py` が停止するのは正常。エラーではなく、代替素材の差し替え待ち。
- `scripts/comfy_i2v.py` は不採用画像を安全停止する。抜け道を追加しない。
- `movie-dashboard/src/data/*.json` を編集する場合、asset / scene / prompt / movie / task の参照整合を壊さない。
- `motion-studio` の `AssetStatus` はAIが勝手に `candidate` 以上へ昇格させない。
- 実写真・実動画・音源・大きなAI生成画像/動画はGitに入れない。

## 次の推奨作業順

1. C0空港ロビー背景の人物なし静止画を生成する。
2. Guide「C0 空港ロビー背景 採点基準」で比較する。
3. 最有力案を `asset-01` に反映する。
4. `python3 scripts/check_assets.py` を実行する。
5. `movie-dashboard/src/data/assets.json` / `tasks.json` / `scenes.json` を採用状態に合わせて更新する。
6. CapCutで10秒試作を作る。
7. `docs/task-board.md` と `asset-status.md` を更新してcommit/pushする。

## commit / push

- 第1弾修正: `7436a19`
- 第1弾hash記録更新: `85603b8`
- 第2弾修正: `8d45ffb`
- 第2弾hash記録更新: `ec394bc`

すべて `origin/main` へpush済み。
