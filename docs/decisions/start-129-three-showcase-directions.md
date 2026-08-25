# 決定ログ: StaRt 129秒 3案ショーケースの方向性

日付: 2026-08-25

## 背景

`docs/opening-authority.md`の現行方針は「実写真11枚投入→Short Candidate完成」を最優先とし、`docs/start-director-recipe-system-overview.md`と`motion-studio/CLAUDE.md`は「新しい基盤/Catalogを増やす前に、既存のStartExtendedOpeningRoughV1を実素材で完成させる」と明記している。

今回のタスクはユーザーから「129秒×3案の高品質研究ショーケースを今すぐ最優先で着手する」という明示指示で発注された。着手前にこの優先順位の衝突をユーザーへ提示し、「今すぐ着手する」との回答を得た。**この決定はプロジェクトの標準優先順位からの一時的な逸脱であり、Extended/Short本番の位置づけを変更するものではない。**

## 採用した3案

- A: 旅の記録映画(documentary / travel film / editorial film) — 本番採用に最も近い基準案
- B: 冒険アニメOP(手描きグラフィック × 3-hit) — StaRtの言葉遊び・再スタート感を最大化する実験案
- C: リズム・タイポMV(kinetic typography × negative space) — 歌詞と音楽構造の理解を優先する実験案

3案は共通の14 section / 129秒 / 歌詞32slotデータモデル(`motion-studio/src/data/start129/sections.ts`)を共有し、演出だけを変える設計にした。これにより「色違いテンプレ3本」になることを防ぐと同時に、後日の比較・A/B/C混成判断を容易にする。

## 採用しなかったもの/今回スコープ外

- movie-dashboardの比較UI(`/movie-coach/start-129-showcases`相当)は今回のセッションでは未着手。理由: 129秒×3案の映像実装自体が実render・目視QAまで含めて相当な作業量になり、UIまで含めると検証を伴わない「作っただけ」の成果物が増えるリスクが高いと判断した。次セッションで着手する。
- 無料ダミー素材の実取得(Pexels API経由)は、`PEXELS_API_KEY`が本セッション環境に無いため未実行。スクリプト(`scripts/fetch-start-129-demo-assets.py`)のみ用意した。
- 97 Director Recipeとの統合・置き換えは行っていない。既存Director Recipe資産とStart129資産は現時点で独立している(意図的。統合は本番candidate選定後の判断とする)。

## 本番Openingとの関係

この3案は研究・比較用であり、`docs/opening-authority.md`のProduct authority(StaRt Extended Candidate本命 / Opening V1 Short Candidate fallback)を変更しない。3案から得た演出知見は、採用が決まった場合のみ、Extended/Shortの実装へ個別に反映を検討する。
