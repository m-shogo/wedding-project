# 2026-07-29 ペーパーアイテム Pre-Figma 制作システム決定

## Decision
4種のペーパーアイテムは、Figmaへ直行せず、調査・固定素材Freeze・可変要素分離・Tooling・QAを先に整える。

## Fixed decisions
- 制作順: るるぶWEDDING → WEDDING PASSPORT → BOARDING PASS → 青春ふたりきっぷ
- Tone: 上品65% + 楽しさ35%
- 本番Figma: 1アイテム = 1ファイル = 1 URL
- 既存4種入りFigma: PROTOTYPE / NOT CURRENT
- 固定素材: 生成AI/画像処理/必要時vector化で先に完成アセット化
- 可変要素: 写真、本文、席次、ゲスト名、余白をFigma/CSV/Pluginに残す
- Tool制限なし。Figma Native / Plugin / MCP / Claude / Codex / CLI / 外部印刷ツールを品質で選ぶ
- 迷ったら停止せず 調査 → 判断 → 実験 → Git記録

## Current Git authority
- `11_printables/paper-items/README.md`
- `11_printables/paper-items/00_master-brief.md`
- `11_printables/paper-items/29_asset-production-queue.md`
- `11_printables/paper-items/30_prefigma-exit-criteria.md`

## Current Figma Plugin prototype
Path: `figma-plugins/wedding-print-toolkit/`

Implemented:
- Typography QA
- Wedding Print Tokens bootstrap
- Long-name Stress Test

Old duplicated scaffold `tools/figma-wedding-toolkit/` was removed from Current branch to avoid ambiguous ownership. History remains in Git.

## Drive authority
`00_Figma本番前_Current Authority・制作ルール`

## Promotion rule
本番Figmaへ進むのは `30_prefigma-exit-criteria.md` の対象GateがPASSしてから。
Proof/PrototypeはCurrent Productionへ自動昇格しない。
