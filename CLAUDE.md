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

## Opening V1 現行正本

- source of truth: `motion-studio/src/data/openingV1.ts` / `motion-studio/src/compositions/opening/OpeningV1.tsx`
- duration: 60秒
- scene: 8
- 実写真scene: 53秒（約88%）
- 必須AI B-roll: 0本
- 冒頭: 2秒Photo cold open
- `CloudSea` / 5秒中央serif title / 大きいWedding endingはVisual QAで不採用となり削除済み
- 正本ドキュメント: `docs/opening-v1-motion-map.md`
- 作業入口: `docs/task-board.md`

RemotionをOpening V1の正本にする。Palmier / CapCutは必要な場合のfinal polishに限定し、別timelineを正本として育てない。

## レビュー前の参照順

1. @README.md
2. @docs/task-board.md
3. @docs/opening-v1-motion-map.md
4. @motion-studio/README.md
5. @02_opening-movie/asset-status.md
6. @movie-dashboard/README.md

## 参照

- 全体方針: @docs/01_brief.md
- 制作記憶: @docs/project-memory.md
- 世界観: @docs/02_style-bible.md
- 構成: @docs/03_movie-structure.md
- AI素材: @docs/04_ai-video-assets.md
- 動画AI運用: @docs/ai-video-operation.md
- ローカル動画AIセットアップ: @docs/local-video-ai-setup.md
- ComfyUI・Codex・ChatGPT連携: @docs/comfy-codex-chatgpt-workflow.md
- 編集: @docs/05_capcut-editing.md
- CapCut運用: @docs/capcut-operation.md
- 失敗例: @docs/failure-patterns.md
- ロードマップ: @docs/06_roadmap.md
- 品質確認: @docs/10_quality-gates.md
- テーマ差し替え: @docs/theme-switching.md
- 素材TODO: @docs/materials-todo.md
- Opening V1編集言語: @docs/opening-v1-motion-map.md（8scene / 60秒 / Photo-firstの現行正本）
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
- `capcut-editor`: 写真演出、BGM合わせ、テロップ配置を見る。
- `asset-librarian`: 素材の分類、命名、採否ログを見る。
- `rights-safety-reviewer`: 写真、音源、フォント、AIサービスの権利・プライバシーを見る。
- `quality-gate-reviewer`: ラフ版、完成前、上映前の品質確認を見る。
