# 09 Research Notes — Figma / AI / Plugin

更新: 2026-07-29

## 目的
Figma本番制作の品質を上げるため、公式情報と実利用者の知見から「何をやると品質が上がり、何が失敗しやすいか」を残す。

---

## Figma公式から採用する原則
### 1. Variablesをtokenとして使う
Figma公式はVariablesを、色・数値・文字列・Boolean等の再利用値として扱い、design system管理を効率化する仕組みとして案内している。

今回:
- Color
- spacing
- 一部font property
をFoundation化する。

Source:
https://help.figma.com/hc/en-us/articles/15339657135383-Guide-to-variables-in-Figma

### 2. StylesをSource of Truthにする
Color / Text / Effect / Layout guideをStyleとして管理すると変更を反映しやすい。

Source:
https://help.figma.com/hc/en-us/articles/360039238753-Styles-in-Figma

### 3. Auto Layoutを使う
Figma公式は、コンテンツ変更へ追従する構造としてAuto Layoutを推奨している。

今回:
- MENU block
- profile block
- guest name area
- ticket labels
等で利用。

Source:
https://help.figma.com/hc/en-us/articles/360040451373-Explore-auto-layout-properties

### 4. Semantic naming
Figma MCP公式は、default layer名ではなく意味のある名前、variables、components、Auto Layoutを使うことでAIが意図を理解しやすくなると案内している。

Source:
https://developers.figma.com/docs/figma-mcp-server/structure-figma-file/

### 5. Promptは明確にscopeする
Figma MCP公式はpromptを teammateへのbriefのように具体化することを推奨。

Source:
https://developers.figma.com/docs/figma-mcp-server/write-effective-prompts/

### 6. AIのcontextは多ければよいわけではない
Figma Make公式は、曖昧なfirst promptや不要なcontextがreworkを増やすと説明している。Guidelinesも重要ルールへ絞ることを推奨。

今回:
- Current Authorityを短く保つ
- 1 itemずつ扱う
- 1工程ずつpromptする
- 過去会話を全部再投入しない

Sources:
https://help.figma.com/hc/en-us/articles/40097793879191
https://help.figma.com/hc/en-us/articles/33665861260823-Add-guidelines-to-Figma-Make

---

## Community / 実利用者からの注意
Community知見は一次情報ではないため、方針決定の補助として扱う。

### AI/MCPは大画面一発生成で品質が落ちやすい
2026年のFigma community discussionでは、複雑なpageを一度に扱うとcontextが大きくなり、精度低下・修正ループが起きるという報告が複数ある。

今回の対策:
- 1 item = 1 file
- Foundation → Identity → Wireframe → Visual → QA
- 大frame丸ごとより対象Section/Nodeを限定

### tokenized / Auto Layoutだけで美しくなるわけではない
構造化はAI理解と保守性を改善するが、art directionを代替しない。
Human optical passを残す。

---

# Plugin Research

## Iconify
- 300,000超のvector iconを扱えると公式docsで案内。
- SVGとしてimport可能。
- Open-source icon sets中心。

Source:
https://iconify.design/docs/design/figma/

利用方針:
- 検索用途として有力
- 1アイテム内では1セット中心
- 最終採用時は元icon setのlicenseを確認

## Design Lint
- missing styleやdesign inconsistencyを検出するopen-source Figma plugin。
- MIT licenseの公開repoあり。

Sources:
https://lintyour.design/
https://github.com/destefanis/design-lint

利用方針:
- Visual完成後、Print QA前のlintに候補。
- pluginのdefault ruleを盲信せず、今回のprint rulesを優先する。

## Batch Styler
- 複数Text/Color styleのfont family、weight、line height、letter spacing、color等を一括変更する用途。

Reference:
https://figma.uwarp.design/plugins/shapes-colors/3aa4bb4a-3562-4e2a-80ae-f81e8ee42d7a

利用方針:
- 本番途中でfont候補を比較するときに便利。
- Variablesとのbinding状況は別途確認する。

## Clean Document
- hidden layer削除、single-layer group整理、pixel rounding、smart rename等。

References:
https://www.skypack.dev/view/figma-clean-document
https://figma.uwarp.design/plugins/file-organization/25b2bb9e-f98c-4a26-8301-3f613dddab0c

利用方針:
- 制作中ではなく、Archive整理/最終cleanup時に使う。
- hidden layer削除は復元不能リスクがあるため、ARCHIVEへ移してから実行する。

## Content Reel
Microsoft Design提供。text / avatars / icons / custom image contentをprototypeへ流し込める。

Source:
https://contentreel.design/

利用方針:
- dummy content stress test用途。
- 内蔵画像・iconの最終印刷利用はlicense条件を確認し、原則として最終素材にはしない。

---

## 採用予定tool stack
### 必須
- Figma native Variables
- Text/Color Styles
- Auto Layout
- Layout Guides
- Figma MCP

### 有力plugin
- Iconify
- Design Lint
- Batch Styler
- Clean Document

### 条件付き
- Content Reel
- Typography scale generator
- Color scale generator
- Similar-layer selector
- Vector cleanup/vectorize

## 原則
プラグイン数を増やすことを品質と勘違いしない。
**繰り返し作業、lint、asset search、style migrationのどれかを明確に改善するものだけ採用する。**
