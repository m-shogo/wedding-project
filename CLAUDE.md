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

## Visual Motion Library / Palmier × DaVinci 共通制作ライン

2026-08-25以降のOpening / Profile共通制作基盤の作業authorityは、
`docs/prompts/2026-08-25-visual-motion-library-palmier-davinci-complete.md` を参照する。
このpromptは **ACTIVE / MUTABLE** であり、ユーザーの途中変更に合わせてGitで版管理する。絶対仕様として固定しない。

共通production lineは次を基本とする。

`Visual Motion Library → Prompt Generator → Palmier Rough → NLE XML + Motion Handoff Manifest → DaVinci Resolve Final`

役割:

- Visual Motion Library: 名前を知らなくても実際の動きを見て選ぶ入口。
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
2. @docs/prompts/2026-08-25-visual-motion-library-palmier-davinci-complete.md
3. @docs/contracts/human-readable-editable-movie-contract.md
4. @docs/reviews/2026-08-25-visual-motion-library-current-audit.md
5. @README.md
6. @docs/task-board.md
7. @docs/start-director-recipe-system-overview.md
8. @docs/opening-v1-motion-map.md
9. @motion-studio/README.md
10. @02_opening-movie/asset-status.md
11. @movie-dashboard/README.md

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

- 実写真 → preview → crop/focus → cut順 → BGM/現地音 → final QA の順を優先する。
- 素材整理、構成検討、プロンプト作成、テロップ作成、編集指示書作成を手伝う。
- 調査が必要な動画AIの料金、無料枠、クレジット消費、最新機能は、必ず公式情報または一次情報で確認する。
- 受け取った写真・動画・音源・個人情報は慎重に扱い、外部アップロード前に確認する。
- AI B-rollは現行previewで弱いcutが特定された場合だけ、短いatomic shotとして作る。
- 実写真、実動画、音源、書き出し済みムービー、大きなAI生成画像/動画は原則Gitに入れず、ログと指示書だけ管理する。
- `02_opening-movie/sample_image/**` はローカル管理。GitHub上に無いこと自体を欠落扱いしない。
- BGM、フォント、テンプレート、AI生成サービスの利用条件を上映用とSNS投稿用で分けて確認する。
- 重要な好み、判断、変更点は、該当ドキュメントまたは `docs/decisions/` に残す。
- Opening変更PRはCI GREENだけでmergeしない。`opening-v1-qa-stills` artifactを実際に目視する。

## Claude subagents

このリポジトリには `.claude/agents/` に制作向け subagent を置いている。

- `style-director`: 世界観と統一感を見る。
- `storyboard-planner`: 章構成と1秒単位の流れを見る。
- `ai-asset-producer`: AI背景素材とプロンプトを見る。必要性が出たshotだけ担当する。
- `capcut-editor`: legacy/reference。既存CapCut作業の確認用。新しい共通FinalはDaVinciを優先する。
- `asset-librarian`: 素材の分類、命名、採否ログを見る。
- `rights-safety-reviewer`: 写真、音源、フォント、AIサービスの権利・プライバシーを見る。
- `quality-gate-reviewer`: ラフ版、完成前、上映前の品質確認を見る。
