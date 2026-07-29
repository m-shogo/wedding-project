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

ペーパーアイテム作業の場合は、上記に加えて最初に `11_printables/paper-items/README.md` を読み、`00_master-brief.md` をCurrent Authorityとして扱う。

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
- ペーパーアイテムでは、Reference選別、Foundation、Logo/Identity、固定素材Freeze、wireframe、Figma bulk edit、CSV流し込み、lint、print preflightを担当させる。
- 固定素材queueは `11_printables/paper-items/29_asset-production-queue.md`、Figma開始判定は `30_prefigma-exit-criteria.md` を使う。
- 変更しないロゴ/エンブレム/スタンプ/背景/装飾は先に完成アセット化し、変更する写真/本文/席次/ゲスト名/余白だけFigma/CSV/Pluginへ残す。
- ロゴを含む固定素材は、生成AIで完成品質が得られる場合はAIを優先し、透過・高解像度化・必要時のみベクター化する。
- Plugin/MCP/CLIの新しい手法を試した場合は `VERIFIED / OFFICIAL / CANDIDATE / AVOID` で分類し、`11_printables/paper-items/` へ知見を残す。
- 自作Figma Plugin `figma-plugins/wedding-print-toolkit/` は反復作業、Variables、Stress Test、量産、QAへ使い、美的判断を丸投げしない。
- 迷った場合は作業を止めず、**調査 → 判断 → 実験 → Git記録** の順で進める。

## Codex project skills

`.agents/skills/` にプロジェクト専用 skill を置いている。

- `$wedding-style-bible`: 世界観を固定する。
- `$wedding-storyboard`: 章構成と秒割りを作る。
- `$wedding-ai-video-assets`: AI背景素材の候補とプロンプトを作る。
- `$wedding-capcut-plan`: CapCut編集指示書を作る。
- `$wedding-asset-intake`: 受け取った素材を分類し、命名と採否ログを作る。
- `$wedding-rights-check`: 音源、フォント、写真、AI素材の権利・プライバシー確認をする。
- `$wedding-quality-gate`: ラフ版、完成前、上映前のチェックをする。
- `$wedding-print-design`: ペーパーアイテムのFigma前設計、Plugin/MCP活用、印刷QAを行う。

## Codex custom agents

`.codex/agents/` にプロジェクト専用 custom agent を置いている。

- `style-director`
- `storyboard-planner`
- `ai-asset-producer`
- `capcut-editor`
- `asset-librarian`
- `rights-safety-reviewer`
- `quality-gate-reviewer`
- `print-art-director`

明示的に複数視点で見たいときは、各観点ごとに subagent を使ってレビューする。
