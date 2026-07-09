# opening-movie/（初期構想アーカイブ）

このディレクトリは、オープニングムービー構成案1「MEMORY FLIGHT 1024」の**初期構想メモと初期生成ツール**の置き場。

**現行の作業入口ではない。** 最新の状態は次を見る。

| 知りたいこと | 見る場所 |
|---|---|
| 現在の作業状態 | `docs/task-board.md` |
| 素材の採否・不足 | `02_opening-movie/asset-status.md` |
| 秒割り・編集指示 | `02_opening-movie/storyboard.md` / `02_opening-movie/capcut-edit-plan.md` |
| シーン構成の単一情報源 | `motion-studio/src/data/openingProject.ts` |
| Remotion素材の作り方 | `motion-studio/README.md` |

## 中身

- `concept-01-memory-flight-1024.md` — 構成案1の企画書・台本・プロンプト集（初版）。コンセプト自体は採用され、現在は `02_opening-movie/` と `motion-studio/` に展開済み。
- `README-image-generation.md` / `scripts/generate-concept-01-images.mjs` / `assets/*.json` — OpenAI Images APIでop_01〜op_20の仮背景を一括生成した初期ツール。人物なし素材の再生成時にプロンプトを流用できる。

## 注意

- `op_01_narita_boarding_gate_ai.png` と `op_11_narita_airport_lobby_ai.png` は、この構想で生成した後の目視確認で**人物入りと判明し不採用**（Style Bible `no people` 違反）。このディレクトリ内の記述は初版のまま残しているため、採否は必ず `02_opening-movie/asset-status.md` を見る。
- 生成画像はGitに入れない（`opening-movie/generated/` はGit管理外）。
