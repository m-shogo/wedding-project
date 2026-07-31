# るるぶWEDDING — Print Vendor Working Target 2026-07-31

Status: `WORKING_TARGET / OFFICIAL_REVERIFIED_20260731 / NOT_PURCHASED / FINAL_VENDOR_CONFIRMATION_PENDING`
Current authority: GitHub `main`

## Decision

Figma MCP復旧後の寸法・bleed・safe確認を前に進めるため、**ラクスル「折りパンフレット / 二つ折り / A4仕上がり」**をWorking Targetとする。

これは最終発注先の確定ではない。価格・納期・部数を確認して別業者へ変更可能。ただし、現行るるぶWEDDINGの物理構造と公式仕様が一致するため、作業基準として採用する。

## Official fit

ラクスル公式「仕上がりサイズ・折り加工一覧ガイド（折りパンフレット）」:
- 二つ折り A4仕上がり
- 仕上がり: `210 × 297 mm`
- 展開: `297 × 420 mm`
- 中央から二つ折り

Current design basis:
- spread: `420 × 297 mm`
- center fold: `210 mm`

縦横表記順の違いだけで、物理寸法は一致する。

Official references:
- https://raksul.com/guide/products-faq/pamphlet/folding-size/
- https://raksul.com/guide/create-data/item/pamphlet/guide/

## Bleed / trim-safe working values

ラクスル公式作成ガイド:
- 紙端まで印刷する背景・写真・色面: 仕上がり位置から**外側へ3mm塗り足し**
- 切れて困る文字・重要デザイン: 仕上がり位置から**3mm以上内側**

Therefore, for the 420 × 297 mm spread:
- trim spread: `420 × 297 mm`
- bleed canvas: `426 × 303 mm`
- trim origin inside bleed canvas: `(3, 3) mm`
- center fold on trim: `x = 210 mm`
- center fold on bleed canvas: `x = 213 mm`

Important: `3mm inside` is an outer trim safety requirement. It is **not** a vendor-confirmed fold-safe distance.

Official references:
- https://raksul.com/guide/create-data/item/pamphlet/guide/
- https://raksul.com/guide/create-data/knowledge-of-printing/extra-length-from-trim-mask/

## Fold-safe

State: `VENDOR_EXPLICIT_VALUE_NOT_FOUND`

Do not invent a vendor-required fold-safe margin.

Official speed-check guidance explicitly warns that the fold position may shift slightly because of cutting/finishing deviation. Therefore the fold line must be treated as a real production-risk zone even though no numeric fold-safe distance was found.

Working design rule until a template/operator answer is obtained:
- do not place critical small text exactly across the center fold
- do not use the fold line as the edge of a narrow text box
- keep faces, tiny labels and key icons away from the fold when practical
- decorative background / route line may cross the fold if visual QA permits
- inspect the confirmation PDF / finishing preview before final approval

This is a design precaution, not a claimed printer specification.

Official reference:
- https://raksul.com/guide/submit-data/preflight/folding-products/

## Data arrangement

ラクスルの折りパンフレット用スピードチェックは**見開きデータ**に対応し、単ページデータは対象外。

Current Figma spread workflow therefore remains correct:
- outside spread: Back Cover + Front Cover
- inside spread: left inside + right inside
- each as one spread artwork

Reference:
- https://raksul.com/guide/submit-data/preflight/folding-products/

## Minimum print-detail constraints — official re-verification

ラクスル公式折りパンフレット作成ガイドを2026-07-31に再確認。

Working minimums:
- text: **6pt以上**
- line width: **0.3pt / 0.1mm以上**
- image resolution: **原寸100%で350〜400dpi**

These are now part of the working print QA checklist and should be enforced before PRINT_READY.

Reference:
- https://raksul.com/guide/create-data/item/pamphlet/guide/

## Paper working candidate

First working candidate: **マット紙 135kg**

Reasoning:
- るるぶ風の写真・色を使いつつ、文字も多い
- 光沢紙より反射が少なく読みやすい
- 135kgはパンフレット用途向けのしっかりした厚み
- ラクスルの折りパンフレット厚さガイドで135kgが「しっかりした厚み」と案内され、商品パンフレット用途例が示されている

Official notes:
- マット紙: 光の反射が少なく、文字情報が多い印刷物向き
- 135kg: しっかりした厚み / 商品パンフレット等で使用
- マット紙135kg thickness guide: 約0.174mm（印刷前目安）

References:
- https://raksul.com/guide/products-faq/pamphlet/types-of-papers/
- https://raksul.com/guide/products-faq/pamphlet/thickness/

This paper choice is `WORKING_CANDIDATE`, not final purchase authority.

## Figma recovery impact

When Figma MCP access returns, use this working target instead of the former fully-provisional outer geometry:

1. create/reuse trim spread `420 × 297 mm` equivalent
2. add 3mm bleed outside all trim edges
3. keep critical outer-edge text at least 3mm inside trim
4. keep center fold at trim x=210mm
5. keep fold-safe as design precaution only until vendor-specific confirmation
6. enforce text >=6pt and line width >=0.3pt / 0.1mm
7. verify placed raster images are suitable for 350–400dpi at intended print size
8. compare A/B/C using identical print guides
9. inspect Raksul confirmation PDF / finishing preview before final approval if Raksul remains the order target
10. do not move final export to PRINT_READY until final vendor/order specification is rechecked

## Boundary

This document resolves the **working print geometry and minimum-detail rules** enough to continue design. It does not certify final print readiness and does not authorize purchase.
