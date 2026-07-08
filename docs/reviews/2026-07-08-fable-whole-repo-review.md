# 全体レビュー報告: wedding-project

## レビュー日時

2026-07-08

## 対象commit

レビュー開始時点: `433c9af`（docs: add fable whole repo review prompt）

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
- `02_opening-movie/comfy-desktop-video-prompts-concept-01.md`
- `docs/decisions/2026-07-08-review-prep-cleanup.md`
- `docs/02_style-bible.md`（CLAUDE.md経由で参照確認済み）
- `motion-studio/README.md` / `motion-studio/CLAUDE.md` / `motion-studio/package.json`
- `movie-dashboard/README.md` / `movie-dashboard/package.json`
- `movie-dashboard/src/data/*.json`（assets/movies/prompts/scenes/tasks 全5件）
- `.gitignore`（root / `motion-studio/.gitignore` / `movie-dashboard/.gitignore`）
- `scripts/check_assets.py`
- `scripts/build_opening_movie.py`
- 旧レガシーディレクトリ `opening-movie/`（number接頭辞なし。現行docsから参照されていないことを確認）

## 実行したコマンドと結果

```sh
git checkout main && git pull origin main   # 既に最新
git status --short / git branch --show-current / git log --oneline -8
```

横断検索（`rg`）:

- `op_01|op_11|sample_image|build_opening_movie|check_assets|no people|人物|犬|AI生成|final|approved|candidate|used|ready` → ヒットは多数だが、方針と矛盾する記述は `02_opening-movie/comfy-desktop-video-prompts-concept-01.md` の1件のみ（後述、修正済み）。
- `90_exports|motion-studio/out|movie-dashboard/dist|generated-images|ai-videos` → すべて「Git管理外」の文脈で一貫。誤ってGit管理下にある記述なし。
- `TODO|FIXME|古い|仮|要確認|未整理` → いずれも現行方針と矛盾しない通常のTODO/仮組みメモ。

素材チェック:

```sh
python3 scripts/check_assets.py
```

→ `op_01`/`op_11` は「不採用（人物入り・再生成対象）」で一貫。問題なし。

```sh
python3 scripts/check_assets.py --write
```

→ `02_opening-movie/asset-status.md` を再生成。`--write` 前後で以下を確認:

- `op_01`/`op_11` は不採用のまま（維持）
- 採用候補I2V（op_16/op_02/op_03/op_07）は消えていない（維持）
- I2V不採用理由（op_10 chapel door、op_08 hawaii rain beach）は消えていない（維持)
- `sample_image` ローカル管理の説明は残っている（維持）
- 差分は、ローカルの実ファイル数・生成動画本数の更新（`_dup_*` 重複ファイルが既にローカルで削除済みだったため一覧から消えた等）のみで、人間判断の欠落はなし

legacy build確認:

```sh
python3 scripts/build_opening_movie.py
```

→ 終了コード1で意図した安全停止。メッセージで `op_01`/`op_11` が人物入りのため停止していることを明示。**正常動作**。

movie-dashboard JSON整合性（Python + jsonで検証）:

- `assets.json` に `asset-01`〜`asset-29` はすべて定義済み（ハンドオフメモの「asset-18〜29が未定義かもしれない」という懸念は誤りで、既に解消済みと確認）
- `scenes.json` が参照する `assets` / `promptIds` / `movieId` に未定義参照は0件
- `assets.json` の `relatedSceneIds` が参照する scene にも未定義参照は0件
- `tasks.json` の関連ID参照にも不整合なし
- `asset-01`（空港ロビー）は `status: collecting`、代替候補 `asset-27/28/29` は `status: needed` で、いずれも採用候補・確定扱いになっていないことを確認

motion-studio:

```sh
cd motion-studio
pnpm install   # Already up to date
pnpm check     # check:motion / check:assets / check:parts すべて成功、警告0件
pnpm typecheck # エラーなし
pnpm export    # export:capcut / export:review / export:home すべて成功
cd ..
```

movie-dashboard:

```sh
cd movie-dashboard
pnpm install   # Already up to date
pnpm build     # tsc -b && vite build 成功（chunk size警告のみ、機能影響なし）
cd ..
```

Git管理・大容量素材の確認:

```sh
git ls-files 05_photos 06_videos 07_music 04_ai-video-assets 00_inbox
# → .gitkeep のみ。実素材の混入なし
git ls-files -z | xargs -0 du -h | sort -rh | head
# → 最大でも72KB(pnpm-lock.yaml)。動画・画像・音源の大容量ファイルなし
```

`motion-studio/public/photos/**` はネストした `motion-studio/.gitignore` で既に除外設定済み（`public/photos/*` + `!public/photos/.gitkeep`）であることを確認。root `.gitignore` への追加は不要と判断（一度追加したが重複のため revert 済み）。

## 見つかった問題

1. **`02_opening-movie/comfy-desktop-video-prompts-concept-01.md` が `op_01`/`op_11` を不採用と明記していなかった**
   - このドキュメントはI2V生成用プロンプト集で、01節・11節がそのまま `op_01_narita_boarding_gate_ai.png` / `op_11_narita_airport_lobby_ai.png` を入力画像として指示していた。
   - `asset-status.md` や `check_assets.py` では不採用が明確だが、この生成プロンプト集だけを見て作業すると、不採用画像にそのままI2V生成をかけてしまうリスクがあった。
   - 分類: **P1**（人物入り素材が誤って使われる導線になり得るため）

2. **ハンドオフメモの「movie-dashboard JSON整合性」懸念は既に解消済み**（新規の問題ではなく、確認の結果「問題なし」と判明したもの）
   - `docs/reviews/2026-07-08-pre-fable-handoff.md` は「asset-18〜29が未定義の可能性」を懸念していたが、実際には全て定義済みで、scene⇔asset⇔prompt⇔movieの参照整合も0件不一致だった。

## 修正した内容

- `02_opening-movie/comfy-desktop-video-prompts-concept-01.md`
  - 冒頭に「op_01 / op_11 は不採用」の注意書きを追加し、`asset-status.md` を必ず確認するよう明記。
  - 01節・11節の見出しに「（不採用・要再生成）」を追加し、各節冒頭に不採用理由と、人物なし版再生成後にのみプロンプトを参考流用する旨を追記。
- `02_opening-movie/asset-status.md`
  - `python3 scripts/check_assets.py --write` でローカル環境の最新状態に再生成。人間判断（不採用・採用候補I2V・不採用理由）はすべて維持されていることを確認済み。
- `motion-studio/exports/index.html`
  - `pnpm export` の実行に伴う制作コックピットの自動再生成（1行差分、日時等のみ）。

## 追加した内容

- `docs/reviews/2026-07-08-fable-whole-repo-review.md`（本ファイル）

## P0 / P1 / P2

### P0（すぐ直すべき問題）

**0件**。実写真・動画・音源・大容量素材のGit混入なし。人物/犬のAI生成を促す記述なし。`op_01`/`op_11` の採用候補復活なし。`check_assets.py --write` での判断消失なし。README/AGENTS/CLAUDE間の矛盾なし。`sample_image` の欠落誤認記述なし。

### P1（レビュー前に直すべき問題）

1. **[修正済み]** `02_opening-movie/comfy-desktop-video-prompts-concept-01.md` の01/11節が不採用画像をそのまま入力指示していた。→ 不採用注記を追加済み。

### P2（時間があれば直す）

1. **[未対応・提案のみ]** ルート直下の `opening-movie/`（number接頭辞なしの旧ディレクトリ、`opening-movie/concept-01-memory-flight-1024.md` 等）が現行の `02_opening-movie/` と別に残っている。README/AGENTS/CLAUDE/task-boardのどこからも参照されておらず、初見の人やAIが2つの「opening-movie」ディレクトリに混乱する可能性がある。中身はop_01〜op_20の初期プロンプト構想で、不採用情報は含んでいないが「採用候補」とも書いていないため実害はP0/P1ではない。次回、`99_archive/` へ移動するか、冒頭に「初期構想メモ。最新の採否は02_opening-movie/asset-status.mdを見る」という注記を足すことを推奨。今回は「修正してよいもの」リスト（README/AGENTS/CLAUDE/docs/**/*.md/asset-status.md/scripts/dashboard JSON/.gitignore）に含まれないディレクトリのため、範囲外として見送った。
2. `docs/decisions/2026-06-10-opening-draft-v001-build.md` などv001/v002ビルド時点の決定ログは、当時の`final`/`approved`的な表現を含むが、これは履歴記録として妥当であり修正不要。

## 残っている課題

- 空港ロビー/搭乗ゲート素材（`asset-01`/候補`asset-27〜29`）は依然「生成待ち・採点待ち」。次の本命パスは `asset-01` への新規生成差し替え（`docs/task-board.md` Now節に記載済み）。
- `2-A 飛行機窓・地上の遠景`と`4-A-2 ハワイの海・夕暮れ`は静止画そのものが無い（I2V不可）。
- `op_10`（光の扉）I2Vは不採用のまま。Remotion版`扉-光`との比較が未完了。
- `opening-movie/`（レガシーディレクトリ）の扱い（P2参照）。
- motion-studio/movie-dashboardの実行環境依存ファイル（`~/ComfyUI-Shared/output/video/`、`sample_image/`）はこの実行環境（ローカルMac）に存在したため、GitHub connector環境とは異なる結果になる可能性がある点は運用上の前提として維持。

## Fable/Claude/Codexが次に作業するときの注意

- **絶対に** `op_01`/`op_11` を採用候補・本番候補として扱わない。人物入りが目視確認済み。
- `02_opening-movie/comfy-desktop-video-prompts-concept-01.md` の01/11節は「不採用画像のプロンプト参考」であり、そのまま実行しない。
- `scripts/check_assets.py --write` を実行する前後で、必ず `REJECTED_IMAGES` / `REJECTED_VIDEO_ASSETS` / `CANDIDATE_I2V` に対応する内容が `asset-status.md` に残っているか確認する。
- `scripts/build_opening_movie.py` が停止するのは正常。エラーではない。実行して失敗したら「バグ修正」ではなく「代替素材の差し替え待ち」と判断する。
- `movie-dashboard/src/data/*.json` を編集する場合、`assetId`/`sceneId`/`promptId`/`movieId`の参照整合を崩さないこと（今回は全整合を確認済みなので、次回差分レビュー時はこの整合性を壊していないか再確認する）。
- `motion-studio` の `AssetStatus`（`missing→idea→prompt_ready→generated_preview→candidate→approved→final`）は、AIが勝手に`candidate`以上へ昇格させない。

## 次の推奨作業順

1. 人物なしの空港ロビー/搭乗ゲート静止画を実際に生成し、`asset-01`のpathへ反映（`docs/task-board.md` Now節、`movie-dashboard`のGuide「C0 空港ロビー背景 採点基準」参照）。
2. 採用候補I2V（`op_16`/`op_02`/`op_03`/`op_07`）をCapCutの10秒試作へ組み込む。
3. `op_10`（光の扉）はRemotion版`扉-光`と比較して採否を決定。
4. 静止画が無い`2-A`/`4-A-2`の素材を生成するか、Remotionテンプレ代替の可否を判断。
5. 余力があれば、レガシー`opening-movie/`ディレクトリの整理（P2参照）。

## 最新commit hash

作業前: `433c9af`
本レビューの変更をcommitした後のhashは、コミット実行後にこのセクションを更新する。
→ **`<COMMIT_HASH_PLACEHOLDER>`**（下記「push済みか」参照）

## push済みか

このレビュー報告のコミット後、`git push origin main` を実行する。実行結果はコミット後にこのファイルの下部へ追記する。
