# レビュー前整理: README・素材状態・Git管理方針

日付: 2026-07-08
状態: 完了（レビュー前の地ならし）

## 背景

外部レビューや別AIレビューに出す前に、README・タスクボード・素材状態・Git管理方針のズレをなくす必要があった。

特に以下が混乱要因だった。

- `02_opening-movie/sample_image/**` がGit管理外になったため、GitHub上に画像が無いことを欠落と誤解しやすい。
- `op_01_narita_boarding_gate_ai.png` と `op_11_narita_airport_lobby_ai.png` は人物入り確認済みだが、一部の表では動画未生成/採点済みのように見える余地があった。
- root READMEの作業入口が、現在の `motion-studio` / `movie-dashboard` / 制作コックピット運用に追いついていなかった。
- `scripts/check_assets.py --write` が `asset-status.md` を丸ごと再生成するため、人間判断メモが消える可能性があった。

## 決めたこと

### 1. sample_imageはローカル管理

`02_opening-movie/sample_image/**` は大きなAI生成静止画の置き場であり、Git管理外のままにする。

GitHub上に画像が無いこと自体はエラーではない。レビュー時は、ファイル本体ではなく `asset-status.md`、scorecard、生成ログ、判断ログを見る。

### 2. op_01 / op_11は不採用

- `op_01_narita_boarding_gate_ai.png`: カウンター係員と搭乗客の後ろ姿が写っている。
- `op_11_narita_airport_lobby_ai.png`: 複数人物が写っている。

どちらもStyle Bibleの `no people` 違反のため不採用。点数や元プロンプトの良さに関係なく、人物なしで再生成する。

### 3. build_opening_movie.pyは旧ドラフト用として扱う

`build_opening_movie.py` はv002ドラフト用の旧スクリプト。人物入り不採用素材を参照している場合は、実行時に停止する。

これは失敗ではなく、安全のための意図した停止。本番に近い確認は、人物なし素材に差し替えたCapCut試作、または `motion-studio` のRemotionテンプレで行う。

### 4. READMEは作業入口にする

root READMEには以下への導線を追加した。

- `docs/task-board.md`
- `02_opening-movie/asset-status.md`
- `motion-studio/README.md`
- `motion-studio/exports/index.html`
- `movie-dashboard/README.md`

固定TODOはREADMEに置かず、最新のNow/Nextは `docs/task-board.md` に寄せる。

### 5. asset-statusの人間判断はcheck_assets.pyにも入れる

`asset-status.md` は `python3 scripts/check_assets.py --write` で丸ごと再生成される。

そのため、人物入り不採用、採用候補I2V、I2V不採用理由などの人間判断は `scripts/check_assets.py` 側の固定データにも入れる。

新しい人間判断を追加した場合は、`asset-status.md` だけでなく `scripts/check_assets.py` の以下も更新する。

- `REJECTED_IMAGES`
- `REJECTED_VIDEO_ASSETS`
- `CANDIDATE_I2V`

これで、Fable/Claude/Codexが `--write` を実行しても重要判断が消えない。

## 変更したもの

- `README.md`
  - 現在の入口、制作ハブ、Git管理ルール、素材採用ルールを追加。
- `docs/task-board.md`
  - Review Prepを追加し、Now/Next/Blockedを現状に合わせて更新。
- `02_opening-movie/asset-status.md`
  - sample_imageのローカル管理、不採用素材、採用候補I2V、要対応を明確化。
  - `check_assets.py --write` で重要判断を消さない前提を追記。
- `scripts/check_assets.py`
  - 人物入りで不採用の素材を採用候補に戻さないようにした。
  - 採用候補I2Vと不採用I2Vの判断を固定データ化。
  - `--write` しても重要判断セクションを再生成できるようにした。
- `scripts/build_opening_movie.py`
  - 不採用素材を参照している場合に停止するガードを追加。
  - legacy旧ドラフト用であり、現在の停止は意図した安全停止であることを明記。
- `.gitignore`
  - `node_modules/`、dashboard build、motion-studio出力、AI生成画像/動画の大容量素材を除外。

## 次にやること

1. 人物なしの空港ロビー/搭乗ゲート静止画を再生成する。
2. ローカル環境で `python3 scripts/check_assets.py` を実行する。
3. 問題なければ `python3 scripts/check_assets.py --write` で `asset-status.md` を再生成する。
4. `motion-studio` で `pnpm check` と `pnpm export` を実行する。
5. `movie-dashboard` でデータ管理の整合性チェックを実行する。
