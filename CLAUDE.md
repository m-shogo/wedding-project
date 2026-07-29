# CLAUDE.md

このプロジェクトは、結婚式の動画制作を中心に管理しつつ、結婚式全体のコンセプト、内容、好み、制作判断を覚えるためのリポジトリです。

## 最優先

- 日本語で進める。
- 動画制作をメインにする。優先順位はオープニングムービー、プロフィールムービー、紹介ムービー、AI背景素材、関連制作物の順。
- 動画以外の相談も、結婚式全体のコンセプトや動画の世界観に関係するものは扱う。
- 旅行テーマ、映画予告編風、冒険アニメOP風を軸にする。
- AI動画は背景、つなぎ、章切り替え、空気感の補助に限定する。
- 新郎新婦、家族、友人、犬は実写真・実動画を中心に扱う。
- 人物・犬のAI生成やAI変形は提案しない。
- `op_01_narita_boarding_gate_ai.png` と `op_11_narita_airport_lobby_ai.png` は人物入り確認済みのため不採用。人物なしで再生成する。

## レビュー前の参照順

1. @README.md
2. @docs/task-board.md
3. @02_opening-movie/asset-status.md
4. @motion-studio/README.md
5. @movie-dashboard/README.md
6. @docs/decisions/2026-07-08-review-prep-cleanup.md

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
- タスク: @docs/task-board.md
- 素材状態: @02_opening-movie/asset-status.md
- モーション素材スタジオ: @motion-studio/README.md（Remotionで搭乗券・地図・ハンコ・カウントダウン・写真カードを生成。文字入り素材はAIでなくここで作る）
- ブラウザ制作ダッシュボード: @movie-dashboard/README.md（絵コンテ・素材・プロンプト・タスクを管理）

## ペーパーアイテム制作

ペーパーアイテム作業を行う場合は、最初に `@11_printables/paper-items/README.md` を読む。
Current Authorityは `@11_printables/paper-items/00_master-brief.md`。

固定ルール:
- 対象は WEDDING PASSPORT / るるぶWEDDING / BOARDING PASS / 青春ふたりきっぷ の4種。
- 制作順は `るるぶWEDDING → WEDDING PASSPORT → BOARDING PASS → 青春ふたりきっぷ`。
- 全体トーンは `上品65% + 楽しさ35%`。
- 本番Figmaは **1アイテム = 1ファイル = 1 URL**。4アイテムを同じ本番ファイルへ詰め込まない。
- 既存の4種入りFigmaは capability test であり `PROTOTYPE / NOT CURRENT`。本番の完成品質として扱わない。
- Figmaへ直行せず、Reference選別 → Foundation → Identity → 固定素材Freeze → Wireframe → Visual → Content Stress Test → QA → 人間の光学調整 → 試し刷りの順で進める。
- 本番Figma開始前に `@11_printables/paper-items/30_prefigma-exit-criteria.md` を確認する。
- 固定素材の制作順は `@11_printables/paper-items/29_asset-production-queue.md` をCurrent queueとして扱う。
- Figma/AI制作ルールは `@11_printables/paper-items/08_figma-quality-playbook.md` を優先する。
- Promptは `@11_printables/paper-items/07_prompt-library.md` を参照し、1 promptで4アイテムを一括生成しない。
- Workflow小技は `@11_printables/paper-items/10_workflow-hacks.md`、Tool/Plugin採用は `@11_printables/paper-items/11_tool-stack.md` を参照する。
- SNS/Forumの最新知見は `@11_printables/paper-items/12_social-catchup-log.md` に日付とsourceを残す。
- Plugin/MCP/CLI/外部ライブラリの利用に制限は設けないが、品質・再利用性・QAを明確に改善するものだけ採用する。
- 新しい手法は `VERIFIED / OFFICIAL / CANDIDATE / AVOID` で分類し、実験で有効ならGitへ昇格する。
- **固定要素と可変要素を切り分ける。変更しないロゴ、エンブレム、スタンプ、背景、装飾は先に完成アセット化し、変更する写真・本文・席次・ゲスト名・余白だけFigma/CSV/Pluginに残す。**
- ロゴを含む固定素材は、生成AIで完成品質が得られるならAIで先に作る。透過・高解像度化・必要時のみベクター化して固定アセットとして扱う。
- 自作Figma Plugin `figma-plugins/wedding-print-toolkit/` は反復作業・Variables・量産・QAを担当し、美的判断を丸投げしない。
- ユーザーの追加アイデアや横槍で一時停止しても、完了可能な作業は止めずに継続する。迷った場合は **調査 → 判断 → 実験 → Gitへ記録** の順で進める。
- 実写真・大きな参考画像・生成画像は原則Drive側。Gitには判断・出典・仕様・prompt・statusを残す。

## 進め方

- 素材整理、構成検討、プロンプト作成、テロップ作成、編集指示書作成を手伝う。
- 調査が必要な動画AIの料金、無料枠、クレジット消費、最新機能は、必ず公式情報または一次情報で確認する。
- 受け取った写真・動画・音源・個人情報は慎重に扱い、外部アップロード前に確認する。
- 長い本編をAIで一発生成する提案は避け、3-5秒素材を作って編集で組み立てる。
- 実写真、実動画、音源、書き出し済みムービー、大きなAI生成画像/動画は原則Gitに入れず、ログと指示書だけ管理する。
- `02_opening-movie/sample_image/**` はローカル管理。GitHub上に無いこと自体を欠落扱いしない。
- BGM、フォント、テンプレート、AI生成サービスの利用条件を上映用とSNS投稿用で分けて確認する。
- CapCut向けに落とす場合は、秒数、拡大率、パン方向、テロップ、トランジション、BGM位置まで具体化する。
- 重要な好み、判断、変更点は、該当ドキュメントまたは `docs/decisions/` に残す。

## Claude subagents

このリポジトリには `.claude/agents/` に制作向け subagent を置いている。

- `style-director`: 世界観と統一感を見る。
- `storyboard-planner`: 章構成と1秒単位の流れを見る。
- `ai-asset-producer`: AI背景素材とプロンプトを見る。
- `capcut-editor`: 写真演出、BGM合わせ、テロップ配置を見る。
- `asset-librarian`: 素材の分類、命名、採否ログを見る。
- `rights-safety-reviewer`: 写真、音源、フォント、AIサービスの権利・プライバシーを見る。
- `quality-gate-reviewer`: ラフ版、完成前、上映前の品質確認を見る。
- `print-art-director`: ペーパーアイテムのFigma前設計、印刷品質、Plugin/MCP、QAを見る。
