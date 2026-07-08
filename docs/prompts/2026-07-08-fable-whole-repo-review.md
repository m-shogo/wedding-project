# Fable Prompt: Wedding Project Whole Repo Review

https://github.com/m-shogo/wedding-project

このrepoの `main` ブランチで、結婚式動画制作プロジェクトの **全体レビュー・必要修正・不足追加** をしてください。

レビュー前整備は完了済みです。まず最新 `main` を取得し、このファイルと以下のハンドオフを読んでから進めてください。

- `docs/reviews/2026-07-08-pre-fable-handoff.md`

## 目的

外部レビュー / 別AIレビュー / 制作再開に耐える状態にする。

やること:

1. repo全体をレビューする。
2. README・docs・scripts・dashboard・motion-studio の矛盾を見つける。
3. 必要な修正をする。
4. 足りないレビュー資料や運用メモを追加する。
5. 検証コマンドを実行する。
6. 結果をレビュー報告ドキュメントに残す。
7. commit / push する。

## 最重要ルール

- 日本語で進める。
- このrepo以外は触らない。
- 大きな新機能追加はしない。
- 実写真、実動画、音源、大きなAI生成画像/動画はGitに入れない。
- `02_opening-movie/sample_image/**` はローカル管理。GitHub上に画像が無いこと自体を欠落扱いしない。
- `90_exports/**`、`motion-studio/out/**`、`movie-dashboard/dist/**`、AI生成画像/動画、音源、写真、動画はGit管理外。
- 新郎新婦・家族・友人・犬・人物のAI生成/AI変形/顔置換は絶対に提案しない。
- AI素材は背景、つなぎ、章切り替え、空気感補助に限定。
- 文字、ロゴ、看板、人物、動物が入ったAI素材は、点数が高くても不採用または再生成対象。
- AIが勝手に `candidate` / `approved` / `final` に昇格しない。人間確認必須。
- `op_01_narita_boarding_gate_ai.png` と `op_11_narita_airport_lobby_ai.png` は人物入り確認済みのため不採用。人物なしで再生成対象。
- `scripts/build_opening_movie.py` は legacy 旧ドラフト用。`op_01/op_11` が残っている間に安全停止するのは正常。壊れている扱いにしない。
- 人物入り素材を強制使用できる `--force` のような抜け道は作らない。
- `sample_image` をGit管理に戻さない。
- 変更したら必ずcommit/pushする。

## 最初に読むファイル

必ず以下を読んでからレビューしてください。

1. `README.md`
2. `AGENTS.md`
3. `CLAUDE.md`
4. `docs/reviews/2026-07-08-pre-fable-handoff.md`
5. `docs/00_start-here.md`
6. `docs/task-board.md`
7. `02_opening-movie/asset-status.md`
8. `docs/decisions/2026-07-08-review-prep-cleanup.md`
9. `docs/02_style-bible.md`
10. `motion-studio/README.md`
11. `motion-studio/package.json`
12. `movie-dashboard/README.md`
13. `movie-dashboard/package.json`
14. `movie-dashboard/src/data/*.json`
15. `.gitignore`
16. `scripts/check_assets.py`
17. `scripts/build_opening_movie.py`

## 全体レビュー観点

### 1. プロジェクト入口の整合性

確認すること:

- READMEが現在の正しい入口になっているか。
- `docs/task-board.md` が最新のNow/Next/Blockedになっているか。
- `motion-studio` と `movie-dashboard` の役割が明確か。
- 「完成編集はCapCut」「motion-studioは素材生成」「movie-dashboardは管理ハブ」という役割がぶれていないか。
- 古いTODO、古い導線、古い前提が残っていないか。
- AGENTS.md / CLAUDE.md と README / task-board の方針が一致しているか。

必要なら修正してください。

### 2. 素材ステータスの整合性

確認すること:

- `op_01` / `op_11` が採用候補・本番候補・ready・used扱いになっていないか。
- `op_01` / `op_11` が不採用・再生成対象として一貫しているか。
- `asset-status.md` と `scripts/check_assets.py` の固定判断が一致しているか。
- `check_assets.py --write` で人間判断が消えない設計になっているか。
- `REJECTED_IMAGES` / `REJECTED_VIDEO_ASSETS` / `CANDIDATE_I2V` が妥当か。
- `op_10` のI2V不採用、Remotion版 `扉-光` 比較方針が明確か。
- `op_08` が誤って採用候補に戻っていないか。
- `sample_image` がGit管理外であることが全体に伝わるか。

必要なら修正してください。

### 3. movie-dashboard JSON整合性

重点確認すること:

- `movie-dashboard/src/data/scenes.json` が参照するasset IDが、`assets.json` に定義されているか。
- 特に `asset-18`〜`asset-29` の参照が未定義になっていないか。
- 未定義なら、必要なstub assetを追加するか、scene側の参照を整理する。
- dashboard内の古い素材名・status・notesが、`02_opening-movie/asset-status.md` と矛盾していないか。
- `op_02` などの名前が、現在の `asset-status.md` と紛らわしくないか。
- `op_01/op_11` が採用候補のように見える記述があれば修正する。

必要ならJSON内のメモ・ステータス・タスクを現在方針に合わせて修正してください。UI大改修はしないでください。

### 4. scriptsの安全性

確認すること:

- `scripts/check_assets.py` がレビュー用に信頼できるか。
- `scripts/check_assets.py --write` が危険な上書きをしないか。
- `scripts/build_opening_movie.py` の安全停止が明確か。
- `build_opening_movie.py` のエラー文が、Fable/Claude/Codexに誤解されにくいか。
- legacy scriptのまま残す理由が分かるか。
- 必要なら `--validate-only` のような安全な検証オプションを追加してもよい。
- ただし人物入り素材を強制使用できるオプションは追加しない。

必要なら修正してください。

### 5. Git管理・大容量素材

確認すること:

- `.gitignore` が現在の運用に合っているか。
- 実写真、実動画、音源、AI生成画像/動画、exports、build成果物が追跡されていないか。
- `node_modules`、`dist`、`out`、`exports/previews` が除外されているか。
- `.gitkeep` が必要な空フォルダ維持に使われているか。
- 大容量素材を誤ってcommitしそうな記述がdocsに残っていないか。

必要なら修正してください。

### 6. motion-studio

確認すること:

- `motion-studio/README.md` と `package.json` のscriptが一致しているか。
- `pnpm check`
- `pnpm typecheck`
- `pnpm export`
- `exports/index.html` が制作コックピットとして説明されているか。
- `out/**` や重い書き出し物がGitに入らない設計になっているか。
- READMEに古いコマンドや実在しないテンプレ名がないか。

必要なら軽微な修正のみしてください。大規模テンプレ追加はしないでください。

### 7. docs全体の古い記述・矛盾

検索して確認してください。

```sh
rg "op_01|op_11|sample_image|build_opening_movie|check_assets|no people|人物|犬|AI生成|final|approved|candidate|used|ready" .
rg "90_exports|motion-studio/out|movie-dashboard/dist|generated-images|ai-videos" .
rg "TODO|FIXME|古い|仮|要確認|未整理" docs 02_opening-movie motion-studio movie-dashboard
```

確認すること:

- 人物入り不採用なのに採用候補扱いになっていないか。
- `sample_image` が無いことを欠落扱いする記述が残っていないか。
- README、AGENTS、CLAUDE、task-board、asset-status、decisionsで方針が一致しているか。
- 古い「次にやること」が現在方針と矛盾していないか。
- レビュー前整理の内容が、他docsにも反映されているか。

必要なら修正してください。

## 実行コマンド

作業前:

```sh
git status --short
git branch --show-current
git log --oneline -8
```

検索:

```sh
rg "op_01|op_11|sample_image|build_opening_movie|check_assets|no people|人物|犬|AI生成|final|approved|candidate|used|ready" .
rg "90_exports|motion-studio/out|movie-dashboard/dist|generated-images|ai-videos" .
rg "TODO|FIXME|古い|仮|要確認|未整理" docs 02_opening-movie motion-studio movie-dashboard
```

素材チェック:

```sh
python3 scripts/check_assets.py
```

必要なら:

```sh
python3 scripts/check_assets.py --write
```

ただし `--write` 後に以下を必ず確認してください。

- `op_01/op_11` が不採用のままか。
- 採用候補I2Vが消えていないか。
- I2V不採用理由が消えていないか。
- `sample_image` ローカル管理の説明が残っているか。

legacy build確認:

```sh
python3 scripts/build_opening_movie.py
```

これは `op_01/op_11` が残っている間は安全停止する想定。安全停止ならOK。通常ビルド成功を期待しないでください。想定外の例外や分かりにくいエラーなら修正してください。

motion-studio:

```sh
cd motion-studio
pnpm install
pnpm check
pnpm typecheck
pnpm export
cd ..
```

movie-dashboard:

```sh
cd movie-dashboard
pnpm install
pnpm build
cd ..
```

最後:

```sh
git status --short
git diff
```

## 追加してほしいレビュー成果物

以下を新規作成してください。

`docs/reviews/2026-07-08-fable-whole-repo-review.md`

内容:

- レビュー日時
- 対象commit
- 読んだ主要ファイル
- 実行したコマンドと結果
- 見つけた問題
- 修正した内容
- 追加した内容
- P0/P1/P2分類
- 残っている課題
- Fable/Claude/Codexが次に作業するときの注意
- 次の推奨作業順
- 最新commit hash
- push済みか

## 修正してよいもの

- `README.md`
- `AGENTS.md`
- `CLAUDE.md`
- `docs/**/*.md`
- `02_opening-movie/asset-status.md`
- `scripts/check_assets.py`
- `scripts/build_opening_movie.py`
- `movie-dashboard/src/data/*.json`
- `.gitignore`
- `docs/reviews/2026-07-08-fable-whole-repo-review.md`

## やりすぎ禁止

- 大きな新機能追加
- 実素材の追加
- AI画像/AI動画の新規生成
- 実写真/実動画/音源のGit追加
- `op_01/op_11` を採用候補に戻す
- 人物入り素材を強制使用できる抜け道追加
- `sample_image` をGit管理に戻す
- `90_exports` をGit管理に入れる
- CapCut本体編集を始める
- 完成動画を書き出す
- motion-studioのテンプレを大量追加する
- dashboardの大規模UI改修

## P0/P1/P2基準

### P0

すぐ直す。

- 実写真・動画・音源・大容量素材がGitに入る
- 人物/犬/家族/友人のAI生成やAI変形を促す記述
- `op_01/op_11` が採用候補や本番候補として復活
- `check_assets.py --write` で不採用判断が消える
- READMEやAGENTSが真逆の指示をしている
- `sample_image` が欠落扱いされ、レビュー不能になる

### P1

レビュー前に直す。

- task-boardとasset-statusの矛盾
- motion-studio / movie-dashboard のREADMEとscript不一致
- legacy buildの安全停止が失敗扱いされやすい
- dashboard JSONとdocsの素材ステータス不一致
- sceneが未定義assetを参照している
- 古いTODOが現在方針と矛盾

### P2

時間があれば直す。

- 表現の分かりにくさ
- リンク整理
- レビュー報告の見やすさ
- コマンド例の補足
- 次作業の優先順位整理

## 成功条件

- P0が0件。
- P1が残る場合は、理由と次対応がレビュー報告に明記されている。
- README、task-board、asset-status、AGENTS、CLAUDE、decision log の方針が一致している。
- `op_01/op_11` は明確に不採用・再生成対象。
- `sample_image` はローカル管理であり、GitHub上に無いことを欠落扱いしない。
- `check_assets.py --write` で重要判断が消えない。
- `build_opening_movie.py` の安全停止が意図として説明されている。
- `motion-studio` と `movie-dashboard` の検証結果が記録されている。
- `docs/reviews/2026-07-08-fable-whole-repo-review.md` が作成されている。
- 変更がcommit/pushされている。

## 最終報告で必ず書くこと

- 実行したコマンドと結果
- 修正ファイル一覧
- 追加ファイル一覧
- P0/P1/P2の結果
- 未解決課題
- 最新commit hash
- push済みか
- 次に人間が見るべきファイル
- 次にFable/Claude/Codexへ渡すなら何をやらせるべきか

作業完了後、必ずcommitしてpushしてください。
