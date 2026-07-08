# Pre-Fable Handoff: レビュー前整備完了メモ

日付: 2026-07-08
目的: Fableに全体レビュー・必要修正・不足追加を依頼する前の地ならし

## 状態

レビュー前整備は完了済み。

直近で整備した主な範囲:

- `README.md`: 現在の入口、制作ハブ、Git管理ルール、素材採用ルールを整理。
- `docs/task-board.md`: Review Prep、Now/Next/Blockedを現状に合わせて更新。
- `02_opening-movie/asset-status.md`: `sample_image` ローカル管理、不採用素材、採用候補I2V、要対応を明確化。
- `scripts/check_assets.py`: `--write` で人物入り不採用や採用候補I2Vの人間判断が消えないよう固定データ化。
- `scripts/build_opening_movie.py`: legacy旧ドラフト用であり、`op_01/op_11` が残っている間の停止は意図した安全停止だと明記。
- `AGENTS.md` / `CLAUDE.md`: レビュー時の入口と禁止事項を更新。
- `docs/decisions/2026-07-08-review-prep-cleanup.md`: 判断ログを更新。

## 絶対に守る前提

- `02_opening-movie/sample_image/**` はGit管理外。GitHub上に画像が無いこと自体は欠落ではない。
- 実写真、実動画、音源、大きなAI生成画像/動画はGitに入れない。
- 新郎新婦・家族・友人・犬・人物のAI生成/AI変形/顔置換はしない。
- `op_01_narita_boarding_gate_ai.png` と `op_11_narita_airport_lobby_ai.png` は人物入り目視確認済みのため不採用。
- `scripts/build_opening_movie.py` はlegacy旧ドラフト用。現在の安全停止は正常動作。
- AIが勝手に `candidate` / `approved` / `final` へ昇格しない。人間確認必須。

## Fableに見てほしい主な残論点

### P1候補: movie-dashboard JSONの整合性

`movie-dashboard/src/data/scenes.json` では `asset-18`〜`asset-29` を参照しているが、`assets.json` 側の定義と整合しているかを全体レビューで確認する。

特に確認すること:

- `asset-18`〜`asset-29` が未定義なら、必要なstubを追加するか、scene側の参照を整理する。
- `op_01/op_11` が採用候補に見える記述になっていないか。
- `asset-status.md` とdashboard JSONの素材ステータスが矛盾していないか。
- `op_02` など、dashboard内の古い命名が `asset-status.md` の素材IDと紛らわしくないか。

### P1候補: ローカル実行検証

GitHub connector上では以下は未実行。
Fable/ローカル環境で実行する。

```sh
python3 scripts/check_assets.py

cd motion-studio
pnpm install
pnpm check
pnpm typecheck
pnpm export
cd ..

cd movie-dashboard
pnpm install
pnpm build
cd ..
```

### P2候補: docs全体の古い記述

`op_01` / `op_11` / `sample_image` / `build_opening_movie` / `candidate` / `approved` / `final` などを横断検索し、古い文脈が現在方針と矛盾していないか確認する。

## Fable用プロンプト

Fableには以下を渡す。

- `docs/prompts/2026-07-08-fable-whole-repo-review.md`

このプロンプトは、レビュー前整備が完了している前提で、全体レビュー・必要修正・不足追加・検証・レビュー報告・commit/pushまで依頼するもの。
