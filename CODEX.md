# CODEX.md

Codex でこの動画制作プロジェクトを進めるための入口。

このリポジトリは動画制作がメインだが、結婚式全体のコンセプト、内容、好み、制作判断をGitに残して、次回以降の前提にするためにも使う。

## 優先順位

1. オープニングムービー
2. プロフィールムービー
3. 紹介ムービー、その他動画
4. AI背景素材
5. 関連制作物

## 読む順番

1. `AGENTS.md`
2. `docs/00_start-here.md`
3. `docs/project-memory.md`
4. `docs/01_brief.md`
5. `docs/02_style-bible.md`
6. 作業対象の制作物フォルダ

## Codexで頼むとよいこと

- 素材のフォルダ分け案を作る。
- 写真リストからプロフィールムービーの秒割りを作る。
- オープニングムービーの10秒試作案を作る。
- テロップ、ナレーション、機内アナウンス風コピーを作る。
- AI動画用の短尺プロンプトを作る。
- CapCut向けの編集指示書に変換する。
- AI動画候補を `docs/templates/ai-video-scorecard.csv` で採点する。
- CapCut作業は `docs/capcut-operation.md` の順で組む。
- 参考映像メモを `Style Bible` に反映する。
- `docs/task-board.md` を更新して次の作業を整理する。
- テーマを変える時は `docs/theme-switching.md` に沿って差し替える。
- 素材や情報を集める時は `docs/materials-todo.md` をチェックリストとして使う。
- 重要な判断や好みが出たら、該当ドキュメントや `docs/decisions/` に残す。

## Codex project skills

`.agents/skills/` にプロジェクト専用 skill を置いている。

- `$wedding-style-bible`: 世界観を固定する。
- `$wedding-storyboard`: 章構成と秒割りを作る。
- `$wedding-ai-video-assets`: AI背景素材の候補とプロンプトを作る。
- `$wedding-capcut-plan`: CapCut編集指示書を作る。
- `$wedding-asset-intake`: 受け取った素材を分類し、命名と採否ログを作る。
- `$wedding-rights-check`: 音源、フォント、写真、AI素材の権利・プライバシー確認をする。
- `$wedding-quality-gate`: ラフ版、完成前、上映前のチェックをする。

## Codex custom agents

`.codex/agents/` にプロジェクト専用 custom agent を置いている。

- `style-director`
- `storyboard-planner`
- `ai-asset-producer`
- `capcut-editor`
- `asset-librarian`
- `rights-safety-reviewer`
- `quality-gate-reviewer`

明示的に複数視点で見たいときは、各観点ごとに subagent を使ってレビューする。
