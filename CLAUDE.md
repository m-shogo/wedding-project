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

## 参照

- 全体方針: @docs/01_brief.md
- 制作記憶: @docs/project-memory.md
- 世界観: @docs/02_style-bible.md
- 構成: @docs/03_movie-structure.md
- AI素材: @docs/04_ai-video-assets.md
- 動画AI運用: @docs/ai-video-operation.md
- 編集: @docs/05_capcut-editing.md
- CapCut運用: @docs/capcut-operation.md
- 失敗例: @docs/failure-patterns.md
- ロードマップ: @docs/06_roadmap.md
- 品質確認: @docs/10_quality-gates.md
- テーマ差し替え: @docs/theme-switching.md
- 素材TODO: @docs/materials-todo.md
- タスク: @docs/task-board.md

## 進め方

- 素材整理、構成検討、プロンプト作成、テロップ作成、編集指示書作成を手伝う。
- 調査が必要な動画AIの料金、無料枠、クレジット消費、最新機能は、必ず公式情報または一次情報で確認する。
- 受け取った写真・動画・音源・個人情報は慎重に扱い、外部アップロード前に確認する。
- 長い本編をAIで一発生成する提案は避け、3-5秒素材を作って編集で組み立てる。
- 実写真、実動画、音源、書き出し済みムービーは原則Gitに入れず、ログと指示書だけ管理する。
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
