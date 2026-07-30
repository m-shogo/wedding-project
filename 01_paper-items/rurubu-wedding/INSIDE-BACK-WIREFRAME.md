# るるぶWEDDING Inside / Back Wireframe Comparison

Status: SPEC_READY / FIGMA_WRITE_PENDING
Current authority: GitHub `main`
Production Figma: https://www.figma.com/design/bfM0d4c9dCeBv5pCkJ3TNM
Drive design-freeze source: `05_るるぶWEDDING｜参考選別・Design Freeze前判断`

## Purpose

Drive Current Authorityの「中面wireframe 2案 / 裏表紙wireframe 2案」を、Figma Starter MCP quota回復後すぐ比較実装できる状態に固定する。完成装飾ではなく、情報階層・写真比率・長文耐性・旅行誌らしさを比較する。

共通ルール:
- asset sheetは禁止。SVGは後工程で1素材ずつ配置する。
- 実写真が来るまでは `PHOTO` placeholder。
- printer-specific bleed / trim-safe / fold-safe は未確定のため `PROVISIONAL`。
- AI生成人物やAI文字ロゴを本番素材として使わない。
- 既存るるぶ誌面の直接トレースは禁止。
- 表紙の高密度感に対し、中面と裏表紙は一段静かにして同一ブランド内のリズムを作る。

---

## INSIDE A — Travel Editorial Grid

Drive判断の R06 40% + R03 35% + R02 color block 25% を構造へ落とした案。

### Left page

```text
┌──────────────────────────────┐
│ OUR PROFILE / ABOUT US       │
│ ┌──────────┐ ┌─────────────┐ │
│ │ PHOTO A  │ │ NAME / DATA │ │
│ └──────────┘ │ Q&A 01      │ │
│ ┌──────────┐ │ Q&A 02      │ │
│ │ PHOTO B  │ │ Q&A 03      │ │
│ └──────────┘ └─────────────┘ │
│ small travel-note / caption  │
└──────────────────────────────┘
```

### Right page

```text
┌──────────────────────────────┐
│ OUR HISTORY                  │
│ 201x ●─────● 202x ─────●26  │
│      │     │             │   │
│   PHOTO   MEMORY       WEDDING│
│                              │
│ MEMORY SPOTS / MINI MAP      │
│ [01] [02] [03] [04]          │
└──────────────────────────────┘
```

Strengths:
- About us / History / 思い出スポットの読み順が明快。
- 長いQ&Aやプロフィール項目を増やしやすい。
- 写真比率変更に強い。
- 表紙より静かで、R03由来の余白を作りやすい。

Risks:
- グリッドを整えすぎると旅行誌の楽しさが弱くなる。
- historyを細かくしすぎると文字サイズが落ちる。

---

## INSIDE B — Journey Feature Spread

二人の「旅行」を主役にし、記事特集のように流れる案。

### Left page

```text
┌──────────────────────────────┐
│ SPECIAL FEATURE              │
│ ふたりの旅のはじまり         │
│ ┌──────────────────────────┐ │
│ │      LARGE PHOTO         │ │
│ └──────────────────────────┘ │
│ lead paragraph / profile     │
│ [Q&A] [Q&A] [Q&A]            │
└──────────────────────────────┘
```

### Right page

```text
┌──────────────────────────────┐
│ MEMORY MAP / BEST TRIPS      │
│ [01 PHOTO] ─ route ─ [02]    │
│       ╲              ╱       │
│       [03] ───── [04 PHOTO]  │
│                              │
│ HISTORY 201x → 202x → 2026   │
└──────────────────────────────┘
```

Strengths:
- 結婚式テーマ「旅行」が最も強く伝わる。
- 写真とroute系単体SVGを活かしやすい。
- 読む人にも眺める人にも成立しやすい。

Risks:
- 写真不足時に弱い。
- route装飾を増やしすぎるとスクラップブック化する。
- 長いプロフィール文章にはAより弱い。

---

## BACK A — Quiet Editorial Notes

Drive判断の R03 50% + travel scrapbook 30% + micro detail 20%。

```text
┌──────────────────────────────┐
│ OUR TRAVEL NOTES             │
│                              │
│ ┌───────────────┐            │
│ │   PHOTO       │  MEMORY 01 │
│ └───────────────┘  2–4 lines │
│                              │
│ FRIENDS & FAMILY             │
│ [PHOTO] [PHOTO] [PHOTO]      │
│                              │
│ 201x ─ 202x ─ 2026.10.24     │
│ issue no / small micro detail│
└──────────────────────────────┘
```

Strengths:
- 表紙との密度差がきれい。
- 写真と余白を主役にできる。
- 小さなissue/detailで旅行誌感を残せる。

Risks:
- 情報を詰め込みすぎるとコンセプトが崩れる。

---

## BACK B — Travel Scrapbook Index

```text
┌──────────────────────────────┐
│ OUR TRAVEL NOTES             │
│ [taped PHOTO]   [MEMO 01]    │
│       ↘ route ↗              │
│ [MEMO 02]      [PHOTO]       │
│                              │
│ CHECK!  FRIENDS  BEST SHOT   │
│                              │
│ HISTORY ROUTE ──────── ♥     │
│ 2026.10.24 / YOKOHAMA        │
└──────────────────────────────┘
```

Strengths:
- 現在のFreeze候補SVGと親和性が高い。
- 個人制作物としての楽しさが強い。

Risks:
- 表紙Cと組み合わせると装飾過多になりやすい。
- 長文耐性はAより低い。

---

## Same-condition stress payload

Figma比較時は以下を両案へ同量投入する。

1. Profile name: 全角12〜16文字相当を想定した長い表示名 placeholder。
2. Q&A answer: 45〜70字 × 3本。
3. History: 6 milestones。
4. Memory spots: 4件、各タイトル12〜18字 + 2行説明。
5. Friends/Family: 3写真 + caption 20〜30字。
6. Hero/feature写真: portrait 4:5、landscape 3:2、square 1:1を差替え確認。

## Comparison rubric

5点満点。Figma実装後に採点する。

| Criterion | Weight | Inside A | Inside B | Back A | Back B |
|---|---:|---:|---:|---:|---:|
| 旅行誌らしさ | 20 | pending | pending | pending | pending |
| 結婚式らしい個人感 | 15 | pending | pending | pending | pending |
| 情報の読み順 | 20 | pending | pending | pending | pending |
| 長文stress耐性 | 15 | pending | pending | pending | pending |
| 写真比率stress耐性 | 10 | pending | pending | pending | pending |
| 表紙とのブランド一貫性 | 15 | pending | pending | pending | pending |
| SVG asset適合 | 5 | pending | pending | pending | pending |

## Provisional recommendation before canvas comparison

- Inside: `A — Travel Editorial Grid` を安全側第一候補、`B — Journey Feature Spread` を旅行テーマ強化比較対象。
- Back: `A — Quiet Editorial Notes` を第一候補、`B — Travel Scrapbook Index` を個性側比較対象。

これはFreezeではない。Figmaで同条件比較し、rubric + screenshot + stress結果が揃うまでCurrent visualへ昇格しない。

## Figma implementation order when quota recovers

1. existing production file / `01_RURUBU_WEDDING` を再利用。
2. `02_INSIDE_WF_A` を作成。
3. `02_INSIDE_WF_B` を作成。
4. `03_BACK_WF_A` を作成。
5. `03_BACK_WF_B` を作成。
6. 同じplaceholder copy / photo ratios / provisional guidesで揃える。
7. screenshotを取得しrubric採点。
8. winnerだけVisual Designへ複製。loserは比較証跡として残す。

## Exit criteria

- 中面2案と裏表紙2案が同条件比較可能。
- 長いQ&A、6 milestones、4 memory spotsでoverflowしない。
- portrait / landscape / square写真差替え時の破綻箇所が把握できる。
- 表紙より一段静かな密度を保てる。
- winnerを色や装飾の好みだけでなく構造的に説明できる。
