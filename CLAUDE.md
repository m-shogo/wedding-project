# CLAUDE.md

このプロジェクトは、結婚式の動画制作を中心に管理しつつ、結婚式全体のコンセプト、内容、好み、制作判断を覚えるためのリポジトリです。

## 最優先

- 日本語で進める。
- 動画制作をメインにする。優先順位はオープニングムービー、プロフィールムービー、紹介ムービー、関連制作物の順。
- **基盤・テンプレート・研究を増やすことより、実際の上映ムービー完成を優先する。**
- 動画以外の相談も、結婚式全体のコンセプトや動画の世界観に関係するものは扱う。
- 旅行テーマは固定。ただし「旅行っぽい装飾」を足すことを目的にしない。
- Openingの現行方向は **documentary / travel film / editorial film**。実写真・実動画の記録感を主役にする。
- 映画予告編風・冒険アニメOP風・高級Weddingテンプレ風をデフォルトにしない。素材に合う場合だけ限定的に使う。
- AI動画は背景、B-roll、つなぎ、空気感の補助に限定する。**必須AI shotを先に作らない。**
- 新郎新婦、家族、友人、犬は実写真・実動画を中心に扱う。
- 人物・犬のAI生成やAI変形は提案しない。
- `op_01_narita_boarding_gate_ai.png` と `op_11_narita_airport_lobby_ai.png` は人物入り確認済みのため不採用。

## モーション図鑑 — 長期プロジェクト名

Movie系で育てている、動きを見て探し・理解し・人間が編集し・Sceneとして採用し・Palmier / DaVinciへ渡す長期蓄積プロジェクトの正式な日本語名は **「モーション図鑑」**。

正本: `docs/contracts/motion-zukan-identity.md`

- モーション図鑑そのものはWedding専用ではない。Wedding Movie 2026は最初の実践Collection / Project。
- 将来はTravel / Vlog / YouTube / SNS / Commercial / Documentary等にも再利用してよい。
- `Visual Motion Library` は「動きを見て探す」内部機能名、`Scene Composer` は人間がSceneを編集・採用する内部機能名。どちらもモーション図鑑の一部。
- 既存ID / file path / Motion Kit / Director Recipesを名称変更のためだけに一括renameしない。今後触る箇所から小さく適用する。
- ブラッシュアップ案は今後追加するため、このidentity contractも **ACTIVE / MUTABLE** とする。

## Visual Motion Library / Palmier × DaVinci 共通制作ライン

2026-08-25以降のOpening / Profile共通制作基盤の作業authorityは、
`docs/prompts/2026-08-25-visual-motion-library-palmier-davinci-complete.md` を参照する。
このpromptは **ACTIVE / MUTABLE** であり、ユーザーの途中変更に合わせてGitで版管理する。絶対仕様として固定しない。

共通production lineは次を基本とする。

`モーション図鑑 → Visual Motion Library → Scene Composer → Prompt Generator → Palmier Rough → NLE XML + Motion Handoff Manifest → DaVinci Resolve Final`

役割:

- モーション図鑑: 長期的にMotion / Scene / Recipe / implementation / learning / evidenceを蓄積する上位プロジェクト。
- Visual Motion Library: 名前を知らなくても実際の動きを見て選ぶ入口。
- Scene Composer: 人間がText / Media / Timing / Position / Motionを編集し、SceneInstanceとして採用・再編集する場所。
- Palmier: 素材選択、trim/split/order、rough timing、rough typography placement等のRough Edit。
- DaVinci Resolve: Edit / Text / Text+ / Fusion / Color / Fairlight / Deliverを使うFinal Edit。
- Remotion: Preview生成、比較生成、DaVinciに無いoverlay等で価値がある場合のみ補助。共通production authorityにはしない。

重要:

- Concept PreviewをActual DaVinci Previewとして表示しない。
- Preview / Implementation / verified artifact or methodを必ず接続する。
- Reuse Before Buildを徹底し、DaVinci標準 / Fusion標準 / 公式Template / `.drfx` / `.setting` / Reactor / license確認済みasset / repo既存実装を先に調べる。
- 36 Motion Kit / 97 Director Recipesという件数維持を目的にしない。
- まず1 PatternのVertical Sliceを本当に最後まで通す。最初はMask Revealを優先する。
- Movie変更をRurubu / Passport / Paper Item productionへ混ぜない。
- 長い作業は小さなscopeでレビューし、`latest main → clean branch → tests/Visual QA → PR → squash merge → latest main` を繰り返す。

## Human-Readable / Human-Editable Movie Contract

Movie系のすべての新規・現在進行・既存再利用作業は `docs/contracts/human-readable-editable-movie-contract.md` に従う。

最上位原則は、**AIの出力を人間が頑張って修正するのではなく、人間が理解・修正できる構造をAIが埋めること。**

この契約は新しいScene Composerだけでなく、以下へ遡及適用する。

- Visual Motion Library / Motion Kit / Director Recipes
- StaRt Showcase / Selection / Production
- Profile Movie Coach
- Prompt Generator / Movie Review / Before-After
- Palmier Handoff / DaVinci Handoff
- 現在進行のMask Reveal Vertical Slice
- 既存Remotion preview/compositionを今後触る場合
- Opening V1 Short Candidateを明示的に再確認する場合

適用のためだけに過去資産を一括破壊・一括移行しない。**今後触る箇所から小さく適用**する。

人間向けの正本は、Scene Duration / Delay / Motion Duration / Hold / Position / Direction / Distance / Scale / Enter-Hold-Exit / Crop / Text / Media等の意味が分かる値とする。AI専用の不透明なscoreを唯一の正本にしない。

`DEFAULT / AI_SUGGESTED / HUMAN_SELECTED / LOCKED` を必要に応じて区別し、`HUMAN_SELECTED` と `LOCKED` をClaude/Codex/Palmier/自動処理が黙って上書きしない。

UIは原則 `かんたん → 詳細 → DaVinci` の順に開示し、1項目の修正で無関係なScene値を再生成しない。

## Opening authority

Opening全体の単一authorityは `docs/opening-authority.md`。

- StaRt Extended Candidate = 本命方向
- Opening V1 60秒 = Short Candidate / venue fallback / 比較用
- 実装の完成度をproduct authorityと混同しない
- Final timingは権利確認済みlocal音源の波形とMarkerで確定する

## Opening V1 Short Candidate実装正本

- source of truth: `motion-studio/src/data/openingV1.ts` / `motion-studio/src/compositions/opening/OpeningV1.tsx`
- duration: 60秒
- scene: 8
- 実写真scene: 53秒（約88%）
- 必須AI B-roll: 0本
- 冒頭: 2秒Photo cold open
- `CloudSea` / 5秒中央serif title / 大きいWedding endingはVisual QAで不採用となり削除済み
- 正本ドキュメント: `docs/opening-v1-motion-map.md`
- 作業入口: `docs/task-board.md`

**この節のRemotion authorityは既存のOpening V1 Short Candidateに限定する。**
Short Candidateの既存実装を壊すために移行しない。一方、今後のOpening / Profile共通production lineでは上記のPalmier Rough → DaVinci Finalを優先する。

## レビュー前の参照順

1. @docs/opening-authority.md
2. @docs/contracts/motion-zukan-identity.md
3. @docs/prompts/2026-08-25-visual-motion-library-palmier-davinci-complete.md
4. @docs/contracts/human-readable-editable-movie-contract.md
5. @docs/reviews/2026-08-25-visual-motion-library-current-audit.md
6. @README.md
7. @docs/task-board.md
8. @docs/start-director-recipe-system-overview.md
9. @docs/opening-v1-motion-map.md
10. @motion-studio/README.md
11. @02_opening-movie/asset-status.md
12. @movie-dashboard/README.md

## 参照

- 全体方針: @docs/01_brief.md
- 制作記憶: @docs/project-memory.md
- 世界観: @docs/02_style-bible.md
- 構成: @docs/03_movie-structure.md
- AI素材: @docs/04_ai-video-assets.md
- 動画AI運用: @docs/ai-video-operation.md
- ローカル動画AIセットアップ: @docs/local-video-ai-setup.md
- ComfyUI・Codex・ChatGPT連携: @docs/comfy-codex-chatgpt-workflow.md
- 編集: @docs/05_capcut-editing.md（legacy/reference。共通Final authorityはDaVinciへ移行）
- CapCut運用: @docs/capcut-operation.md（legacy/reference）
- Palmier運用: @docs/palmier-operation.md
- モーション図鑑 identity: @docs/contracts/motion-zukan-identity.md
- Visual Motion Library prompt: @docs/prompts/2026-08-25-visual-motion-library-palmier-davinci-complete.md
- Human-Readable / Human-Editable Movie Contract: @docs/contracts/human-readable-editable-movie-contract.md
- Visual Motion Library current audit: @docs/reviews/2026-08-25-visual-motion-library-current-audit.md
- 失敗例: @docs/failure-patterns.md
- ロードマップ: @docs/06_roadmap.md
- 品質確認: @docs/10_quality-gates.md
- テーマ差し替え: @docs/theme-switching.md
- 素材TODO: @docs/materials-todo.md
- Opening authority: @docs/opening-authority.md
- Opening V1編集言語: @docs/opening-v1-motion-map.md（8scene / 60秒 / Photo-firstのShort fallback実装正本）
- クリップ素材集: @docs/clip-library-guide.md（必要性が出た時だけ使う。素材収集自体を目的にしない）
- 演出レシピ: @docs/reference-recipes.md（参考語彙。Openingへ機械的に割り当てない）
- 無料素材の入手先: @docs/free-sample-sources.md
- タスク: @docs/task-board.md
- 素材状態: @02_opening-movie/asset-status.md
- モーション素材スタジオ: @motion-studio/README.md
- ブラウザ制作ダッシュボード: @movie-dashboard/README.md

## 進め方

- 既存資料・既存実装を先に読む。
- 既存の正本を探してから新規ファイルや新規仕組みを作る。
- 実制作を止めるほど基盤を拡張しない。
- 判断やルールはGitへ残すが、同じ内容を複数ファイルへ重複して増やさない。
- 変更はMovie / Paper Item等のscopeを混ぜない。
- 安全な範囲は自律的に進め、PR / CI / Visual QAを確認する。
