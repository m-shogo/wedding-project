# るるぶWEDDING Monochrome Wireframe Comparison

Status: WIREFRAME_SPEC_READY / FIGMA_WRITE_PENDING
Current authority: GitHub `main`
Production Figma: https://www.figma.com/design/bfM0d4c9dCeBv5pCkJ3TNM
Foundation: `FOUNDATION.md`

## Purpose
Visual Designへ進む前に、色・装飾・写真の質感に引っ張られず、420×297mm外面spreadの情報階層を3案で比較する。

共通条件:
- left = Back Cover / right = Front Cover
- center fold = x 210mm
- printer-specific bleed / trim-safe / fold-safe は未確定のため `PROVISIONAL` のまま
- hero photoは比率placeholderのみ
- 装飾assetはWireframe段階では原則ボックス/ラベルで置き、装飾の良し悪しではなく構造を比較する
- **SVGは禁止。装飾の採用形式は透過PNGのみ。**
- 4–6 feature linesを最長実データ相当で入れても破綻しないこと
- asset sheetは禁止。後工程で1素材ずつ挿入する

---

## A — Classic Rurubu Cover

### Front Cover
旅行雑誌らしい「大きな写真 + 強い誌名 + 小さな情報の密度」を最優先する。

```text
RIGHT / FRONT COVER
┌──────────────────────────────┐
│ [るるぶ WEDDING]     [DATE] │
│                              │
│ ┌──────────────────────────┐ │
│ │                          │ │
│ │      HERO PHOTO          │ │
│ │      4:5 / 3:4           │ │
│ │                          │ │
│ └──────────────────────────┘ │
│ [PICK UP!]                   │
│ ■ 思い出スポット特集         │
│ ■ わたしたちの旅の歴史       │
│ ■ FRIENDS & FAMILY           │
│ ■ YOKOHAMA WEDDING GUIDE    │
│ [small editorial chips]      │
└──────────────────────────────┘
```

### Back Cover
```text
LEFT / BACK COVER
┌──────────────────────────────┐
│ OUR TRAVEL NOTES             │
│ ┌──────────┐ ┌─────────────┐ │
│ │ PHOTO    │ │ MEMORY 01   │ │
│ └──────────┘ └─────────────┘ │
│ ┌─────────────┐ ┌──────────┐ │
│ │ FRIENDS     │ │ PHOTO    │ │
│ └─────────────┘ └──────────┘ │
│ ─────── HISTORY ROUTE ────── │
│ 201x ─ 202x ─ 2026.10.24    │
└──────────────────────────────┘
```

Strengths:
- 「るるぶ」らしさを最も出しやすい
- hero photoの訴求力が最大
- PICK UP / CHECK / BEST SHOT系PNG assetと相性が良い
- feature copyが多少増えても下部で吸収しやすい

Risks:
- 装飾を増やしすぎると実在旅行誌の模倣感が強くなる
- back coverを詰め込みすぎると小さく読みにくくなる

---

## B — Editorial Split

### Front Cover
写真と情報を左右/上下で明確に分け、少し大人っぽい雑誌編集感を優先する。

```text
RIGHT / FRONT COVER
┌──────────────────────────────┐
│ るるぶ WEDDING               │
│ YOKOHAMA 2026.10.24          │
├──────────────────┬───────────┤
│                  │ FEATURE 1 │
│                  │ FEATURE 2 │
│   HERO PHOTO     │ FEATURE 3 │
│                  │ FEATURE 4 │
│                  │ [PICK UP] │
├──────────────────┴───────────┤
│ short travel-magazine lead   │
└──────────────────────────────┘
```

### Back Cover
```text
LEFT / BACK COVER
┌──────────────────────────────┐
│ OUR TRAVEL NOTES             │
├──────────────┬───────────────┤
│ MEMORY       │ FRIENDS       │
│ PHOTO + TXT  │ PHOTO + TXT   │
├──────────────┴───────────────┤
│ HISTORY / ROUTE              │
│ ───────────────────────────  │
│ destination chips / notes    │
└──────────────────────────────┘
```

Strengths:
- 情報の読み順が明快
- 長文・長いfeature titleへの耐性が高い
- 写真比率が変わっても調整しやすい
- 大人っぽさと旅行誌感のバランスを取りやすい

Risks:
- きれいに整えすぎると「るるぶ」特有のワクワク感が弱い
- 装飾PNGを増やしすぎるとEditorial Splitの強みが消える

---

## C — Scrapbook Journey

### Front Cover
写真・旅のラベル・routeを重ねるスクラップブック寄り。結婚式らしい個人感を優先する。

```text
RIGHT / FRONT COVER
┌──────────────────────────────┐
│ [DATE]        るるぶ WEDDING │
│       ╱ route ╲              │
│  ┌──────────────────────┐    │
│  │      HERO PHOTO      │    │
│  └──────────────────────┘    │
│ [PICK UP] [BEST SHOT]        │
│ ┌────────────┐ ┌───────────┐ │
│ │ FEATURE 1  │ │ FEATURE 2 │ │
│ └────────────┘ └───────────┘ │
│ FEATURE 3 / 4 / 5            │
└──────────────────────────────┘
```

### Back Cover
```text
LEFT / BACK COVER
┌──────────────────────────────┐
│ OUR TRAVEL NOTES             │
│ [taped photo]  ↝ route       │
│      [memory note]           │
│ [friends photo] [small note] │
│                              │
│ ─ 201x ─ 202x ─ 2026 ─ ♥    │
└──────────────────────────────┘
```

Strengths:
- 二人の旅行テーマと相性が強い
- 良質な透過PNG装飾が揃えば個人制作物としての特別感が出る

Risks:
- 長文・写真増加で崩れやすい
- fold/safeが確定前に装飾を寄せすぎると再調整コストが高い
- 「旅行誌」より「アルバム」に寄りすぎる可能性がある
- #8〜#14はPNG再制作中のため、装飾適合をまだ加点根拠にしない

---

## Comparison rubric
5点満点でFigma実装後に採点する。

| Criterion | Weight | A | B | C |
|---|---:|---:|---:|---:|
| るるぶ/旅行誌らしさ | 25 | pending | pending | pending |
| 結婚式らしい特別感 | 20 | pending | pending | pending |
| hero photo訴求 | 15 | pending | pending | pending |
| 長文stress耐性 | 15 | pending | pending | pending |
| 写真比率stress耐性 | 10 | pending | pending | pending |
| fold/trim調整耐性 | 10 | pending | pending | pending |
| accepted PNG decoration適合 | 5 | pending | pending | pending |

## Current recommendation before canvas comparison
`A — Classic Rurubu Cover` を第一候補、`B — Editorial Split` を安全側比較対象、`C — Scrapbook Journey` を個性側比較対象とする。

これは最終採用ではない。Figmaで同条件・モノクロ・同一copy量の3案を横並びにしてから採点し、勝者をVisual Designへ進める。

## Figma implementation order when quota recovers
1. `01_Cover_Back_WF_A`
2. `01_Cover_Back_WF_B`
3. `01_Cover_Back_WF_C`
4. same provisional guides / same text volume / same hero placeholder ratioで揃える
5. Comparison rubricをFigma上またはQA記録で採点
6. winnerのみ複製してVisual Designへ進む
7. loserは比較証跡として残し、Current visualには昇格しない
8. Visual Designでは accepted current transparent PNGのみを1素材ずつ配置する

## Exit criteria
- 3案が同一条件で比較可能
- 4–6 feature linesの長文が入る
- portrait/landscape hero差替え時の破綻箇所が把握できる
- fold line付近に重要文字がない
- winnerがrubricで説明可能
- 色・装飾だけを理由にwinnerを決めない
- SVGをCurrent productionへ入れない