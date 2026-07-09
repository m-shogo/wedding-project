# 全体レビュー第2弾: 残り全ファイルの整合と不採用素材ガード強化

日付: 2026-07-09
状態: 完了

## 背景

2026-07-08の全体レビュー（`docs/reviews/2026-07-08-fable-whole-repo-review.md`）は、指定された主要ファイルと検証コマンドを中心に実施した。今回はその続きとして、未レビューだった残り全ファイル（02_opening-movie配下の計画文書、prompts/、scripts/、docs/capcut-opening-timeline.md、レガシー `opening-movie/`、agent定義群）を確認し、見つかった問題をすべて修正した。

## 決めたこと

### 1. レガシー `opening-movie/` は削除せず「初期構想アーカイブ」として明示する

番号なしの `opening-movie/` は構成案1「MEMORY FLIGHT 1024」の初期企画書と画像一括生成ツールの置き場。コンセプト自体は採用され現行制作（`02_opening-movie/` + `motion-studio/`）に展開済みで、生成スクリプトは人物なし素材の再生成時にプロンプトを流用できるため、`99_archive/` へは移さない。

代わりに:

- `opening-movie/README.md` を新設し、現行入口ではないこと・最新参照先を明記。
- `concept-01-memory-flight-1024.md` 冒頭に初期構想メモである旨と op_01/op_11 不採用の注記を追加。
- root READMEのフォルダ一覧に `opening-movie/` を追記。

### 2. I2V単発実行ツールにも不採用ガードを入れる

`scripts/comfy_i2v.py` は任意の `--image` を受け付けるため、不採用の op_01/op_11 をそのままI2V入力にできてしまった。`build_opening_movie.py` / `comfy_i2v_batch.py` と同じ思想で `REJECTED_IMAGES` による安全停止を追加した。強制使用オプションは付けない。

### 3. 計画文書には「点数」と「採否」を分けて書く

`ai-prompts.md` の85点/82点はショット案としての評価で、生成静止画の採用を意味しない。点数の近くに不採用注記を置き、採否の正は常に `asset-status.md` とする方針を各計画文書（ai-prompts / storyboard / capcut-edit-plan / comfyプロンプト集）に反映した。

## 修正したもの

- `02_opening-movie/ai-prompts.md`: 冒頭と1-A-1/1-A-2見出しに不採用・再生成対象の注記。
- `02_opening-movie/storyboard.md`: 必要AI素材表に1-A系の再生成待ち注記。
- `02_opening-movie/capcut-edit-plan.md`: Chapter 1-Aに仮組み扱いの注記。
- `02_opening-movie/comfy-desktop-video-prompts-concept-01.md`: 対象画像パスの誤記を修正（`01_profile-movie/sample_image/` → `02_opening-movie/sample_image/`）。
- `docs/capcut-opening-timeline.md`: 廃止済みステータス `ready` への言及を現行のAssetStatusフローに修正。`pnpm check` の説明に check:parts を追加。
- `scripts/comfy_i2v.py`: 不採用画像の安全停止を追加。
- `.gitignore`: `opening-movie/generated/**` を追加（画像一括生成スクリプトの出力先が未除外だった）。
- `opening-movie/README.md`: 新設。
- `opening-movie/concept-01-memory-flight-1024.md`: 冒頭注記を追加。
- `README.md`: フォルダ一覧に `opening-movie/` を追記。

## 確認して問題なしだったもの

- `01_profile-movie/`（brief / roadmap / chapter-plan）: 人物AI化禁止の方針と整合。
- `03_introduction-movie/README.md`: 実写真中心・AI素材は背景限定で整合。
- `prompts/ai-video-prompts.md` / `prompts/caption-prompts.md`: 共通ネガティブ・禁止事項が Style Bible と整合。
- `02_opening-movie/ai-video-services-comparison.md`: 料金情報は「使う直前に公式確認」の注意書きが既にあり整合。
- `02_opening-movie/i2v-generation-log.csv` / `docs/templates/ai-video-scorecard.csv`: op_11 test01 reject、op_08/op_10 reject、採用候補4本の記録が asset-status.md と一致。
- `scripts/comfy_i2v_batch.py`: op_01/op_11 除外済み（コメントで理由明記）。
- `.claude/agents/` / `.agents/skills/` / `.codex/agents/`: 方針と矛盾する記述なし。
- `movie-dashboard/FEATURE-PROMPTS.md`: ビルド用プロンプト集。Git管理ルールと整合。
