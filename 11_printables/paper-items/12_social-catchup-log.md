# 12 Social Catch-up Log — Figma / AI / Plugins

更新: 2026-07-29

目的: 公式ドキュメントでは拾いにくい「現場で今起きていること」をSNS/Forumから拾い、採用判断へ使う。

注意:
- SNS投稿は一次仕様ではない。
- Plugin作者本人の投稿は宣伝バイアスあり。
- ここでは“発見”として記録し、実地テスト後に `VERIFIED` へ昇格する。

---

## 2026-07-28 Reddit — AI design tools
Source:
https://www.reddit.com/r/FigmaDesign/comments/1v8u7dp/

Finding:
Claude Code + Figma MCPを、完成デザインの自動生成より「面倒な作業を任せるprivate intern」のように使うという肯定的な実利用コメント。

Project implication:
- cleanup
- repetitive edits
- variants
- bulk operations
- data population
へAIを優先配置する。

Status: `ADOPTED AS POLICY`

---

## 2026-07-10 Reddit — AI in daily Figma workflow
Source:
https://www.reddit.com/r/FigmaDesign/comments/1ussn6y/

Finding:
Figma agentはhit-or-miss / slowという声がある。AIが本当に時短になる作業とcleanupを増やす作業を分けるべきという議論。

Project implication:
Art directionの一発生成を主戦略にしない。

Status: `ADOPTED AS POLICY`

---

## 2026-05-25 Reddit — Claude Code / MCP fidelity
Source:
https://www.reddit.com/r/FigmaDesign/comments/1tnmgcf/

Finding:
Auto Layout / components等が整っていないpure visual Figmaで、MCP経由のfidelityやasset scalingが崩れたという報告。

Project implication:
AIに触らせる前にFoundationとsemantic structureを作る。

Status: `ADOPTED AS POLICY`

---

## 2026-04-08 Reddit — Figma Make issues
Source:
https://www.reddit.com/r/FigmaDesign/comments/1sfvaod/

Finding:
生成物にAuto Layout不足、小さすぎるfont、effect/color/component転送の問題があるという利用者報告。

Project implication:
Make/agent生成物をproduction-readyと仮定しない。

Status: `REFERENCE`

---

## 2026-07-07 Figma Forum — Super Paste
Source:
https://forum.figma.com/showcase-your-work-14/super-paste-generate-copy-paste-text-images-plugin-55733

Finding:
CSV / text / imagesのbulk populate、nested layers検出、content list再利用を作者が紹介。

Project implication:
BOARDING PASSの大量ゲスト名差し替え候補。

Status: `TRY`

---

## 2026-06-14 Reddit — Variate
Source:
https://www.reddit.com/r/FigmaDesign/comments/1u5qf4k/

Finding:
大量text replacement engine。作者がwedding invitations / event flyers / personalized assets等を用途例としている。

Project implication:
ゲスト別航空券のtext variations向け候補。

Status: `TRY`

---

## 2025-07 → 2026-02 Reddit — Google Sheets sync failure
Source:
https://www.reddit.com/r/FigmaDesign/comments/1ma3rsd/

Finding:
複数Google Sheets sync pluginでfetch errorが続くという報告。2026-02にCSV Populateへ移行した利用者コメントあり。

Project implication:
Google Sheets live syncをproduction dependencyにしない。
Drive/Sheetはmaster dataとして使っても、Figma投入時はCSV snapshotを作る。

Status: `ADOPTED AS POLICY`

---

## 2026-07-14 Reddit — PrintPlix
Source:
https://www.reddit.com/r/FigmaAddOns/comments/1uwg2k7/

Finding:
新しいprint plugin。作者はCMYK profile、custom mapping、preflight、300DPI/bleed確認等を紹介。

Project implication:
Print for Figmaの比較候補だが、公開直後で実績が少ない。

Status: `WATCH`

---

## 2026-05-05 Reddit — print from Figma
Source:
https://www.reddit.com/r/FigmaDesign/comments/1t4nl2b/

Finding:
CMYKが課題。Print for Figma作者がpluginと無料converterを案内。他利用者はSVG/PDFをIllustrator/Affinityへ渡すfallbackも利用。

Project implication:
Figma標準PDFだけで完結と決め打ちしない。
本番印刷会社仕様を見てplugin/prepress fallbackを選ぶ。

Status: `ADOPTED AS POLICY`

---

## 2026-02-04 Figma official — Vectorize
Source:
https://www.figma.com/blog/introducing-vectorize/

Finding:
Raster → editable vector。手描きletteringをLogoへ、textureをvectorへ変換する例を公式が紹介。

Project implication:
- るるぶWEDDING lettering
- Passport emblem
- stamp
の探索workflowに相性が良い。

Status: `OFFICIAL / PLAN DEPENDENT`

---

## 2026-05 Figma AddOns — Typiq / Scale Forge
Source:
https://www.reddit.com/r/FigmaAddOns/comments/1tg2kpf/

Finding:
Typography / color foundationsをVariables付きで自動生成する新plugin。

Project implication:
今回の4 print itemsは大規模UI systemほど多段tokenを必要としないため、必要時のみ試す。

Status: `WATCH`

---

## 2026-07 typography feedback trend
Source:
https://www.reddit.com/r/FigmaDesign/comments/1uopdud/

Finding:
Community critiqueで、余白の一貫性、不要なjustifyを避ける、font sizeを増やしすぎない、2〜3階層程度に絞るという基本が強く指摘されている。

Project implication:
「雑誌風=文字サイズを大量に増やす」にはしない。
るるぶもDisplay/Heading/Body/Caption程度へ整理する。

Status: `ADOPTED AS POLICY`

---

# 次回Catch-up検索テーマ
- Figma Agentのprint/design用途実例
- 最新Logo/lettering vector workflow
- Japanese typography in Figma
- CMYK pluginの実印刷レビュー
- CSV population pluginの安定性比較
- Figma Drawを使ったprint ornament作成
- mockup pluginのprint paper/booklet品質
- wedding stationery designersのFigma workflow
- AI生成assetをproduction vectorへclean upする実例

月日が進んだら、古いplugin評価をCurrentとして使わず再検索する。
