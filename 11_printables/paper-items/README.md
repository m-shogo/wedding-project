# Wedding Paper Items — Current Documentation

更新: 2026-07-29

2026-10-24 結婚式の4種ペーパーアイテムを、旅行テーマで統一しつつ本番印刷まで詰めるためのCurrent入口。

## Current Authority
1. `00_master-brief.md`
2. 各アイテムspec
3. `05_design-rules.md`
4. `06_prefigma-readiness.md`
5. `07_prompt-library.md`
6. `08_figma-quality-playbook.md`
7. `09_research-notes.md`
8. `10_workflow-hacks.md`
9. `11_tool-stack.md`
10. `12_social-catchup-log.md`
11. Drive参考画像・制作素材

## 固定した進め方
- 制作順: `るるぶWEDDING → WEDDING PASSPORT → BOARDING PASS → 青春ふたりきっぷ`
- 全体トーン: **上品 65% + 楽しさ 35%**
- 4つを同時に浅く作らず、**1アイテムずつ深く詰める**。
- 本番Figmaは **1アイテム = 1ファイル = 1 URL**。計4ファイル。
- 現在のFigma検証版は `PROTOTYPE / NOT CURRENT`。本番デザインの土台として無条件に流用しない。
- 本番Figma開始前に `06_prefigma-readiness.md` を通す。

## アイテム
- `01_passport-spec.md`
- `02_rurubu-spec.md`
- `03_boarding-pass-spec.md`
- `04_ticket-spec.md`

## AI / Tool運用
- Plugin / MCP / CLI / 画像生成サービスの利用に原則制限なし。
- ただし実際に工程を改善するものだけ採用する。
- 新しいノウハウは `VERIFIED / OFFICIAL / CANDIDATE / AVOID` で分類する。
- SNSは最新の失敗例・Plugin発見に使い、仕様の正本にはしない。
- 実験で有効だったworkflowはGitへ昇格する。

## Project helpers
- Claude agent: `.claude/agents/print-art-director.md`
- Codex agent: `.codex/agents/print-art-director.toml`
- Codex skill: `.agents/skills/wedding-print-design/SKILL.md`
- chroma-key transparency fallback: `scripts/remove-chroma-background.py`

## 重要
現在の画像生成物・参考ボード・Figma検証版は完成案ではない。
実際の原稿、写真、印刷仕様、実物サイズが確定してから正式データへ落とす。
