---
name: wedding-print-design
description: 結婚式ペーパーアイテムの参考選別、Figma前設計、Plugin/MCP活用、印刷QAを行うときに使う。
---

# Wedding Print Design

## 目的
WEDDING PASSPORT / るるぶWEDDING / BOARDING PASS / 青春ふたりきっぷを、旅行テーマで統一しつつ、Figmaへ入る前に設計判断を詰め、印刷事故とデザインの戻りを減らす。

## 最初に読む
1. `11_printables/paper-items/README.md`
2. `11_printables/paper-items/00_master-brief.md`
3. 対象itemのspec
4. `05_design-rules.md`
5. `06_prefigma-readiness.md`
6. `08_figma-quality-playbook.md`
7. `10_workflow-hacks.md`

## 手順
1. Drive referenceを `STRONG / PARTIAL / REJECT` に選別する。
2. 参考をコピーせず、情報階層 / grid / whitespace / photo ratio / typography / color area / motifへ分解する。
3. Foundationを定義する。
4. Logo/Identityがある場合はレイアウトと分離して詰める。
5. モノクロwireframeを2〜3案作る。
6. 1案を選んでVisualへ進める。
7. 実データまたはstress-test dataで崩れを確認する。
8. Plugin / MCP / scriptでlint・bulk edit・preflightする。
9. 人間のoptical adjustmentを残す。
10. 原寸試し刷り後に入稿する。

## Tool方針
- Plugin/MCP/CLIの利用に制限なし。
- ただし「便利そう」では採用しない。
- `VERIFIED / OFFICIAL / CANDIDATE / AVOID` を付けて判断を残す。
- 背景透過fallbackとして `scripts/remove-chroma-background.py` を利用できる。
- CSV大量差し替えはGoogle Sheets live-syncよりCSV snapshotを優先する。
- Print exportはFigma標準PDFだけを信用せず、CMYK/ICC/bleed/DPIをpreflightする。

## 重要
- 本番Figmaは1アイテム1ファイル。
- 検証FigmaはCurrentにしない。
- AI画像の誤字を最終Logoへ採用しない。
- 実写真の人物・犬をAIで別人化しない。
- 実在ブランド・公的券面の完全コピーを避ける。
