# ADD-16 両親贈呈品メッセージカード — QA

Status: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / PRODUCT_DESCRIPTOR_REMOVAL_PASS / ROLLBACK_SAFE / NOT_PRINT_READY`
Updated: 2026-08-15
Current authority: `docs/automation/non-rurubu-figma-quality-current.md`
Design evidence: `docs/automation/add-16-parent-gift-message-card-design-qa.md`

## Current visual / Figma state

The former `PREPARED_FOR_FIGMA` header dated 2026-08-02 is superseded for visual/Figma status. Live production has already passed the reopened second visual-art-direction audit and was promoted rollback-safely.

- Figma file key: `ylmVBbwNcnjueYrymNpa3c`
- production front: `1:2`
- production back: `1:13`
- Drive authority folder: `ADD-16_両親贈呈品メッセージカード` / `1BOyETtL1_loGXNjGV9S30sJKEhZNjd6O`
- current image-fill requirement: none; production remains native text/vector
- final family-specific copy, gift attachment method, vendor requirements and physical proof remain unresolved

Do not interpret the unchecked finalization checklist below as a reason to reopen the already-passed sellable visual composition. Reopen visual production only when a fresh screenshot exposes a concrete defect or authoritative input materially changes the layout requirements.

## Fresh product-descriptor removal — 2026-08-15

Observed latest `main` immediately before the bounded production change: `d5c68bd8be1ade7439e2ad0b103c8e26378b85bd`.

Fresh actual-size review of production front `1:2` found `4:20 / TXT_CONTEXT / 贈呈品に添える、小さな手紙。` functioning as a product-description caption rather than family-facing content. The item purpose and hierarchy are already communicated by `両親へ`, `ありがとうを、手渡す日。`, the recipient/message semantic fields and the date, so the extra line weakened the front into a stationery-template/product sheet.

The current SPEC does not require this sentence as fixed copy. It defines recipient, gratitude message, date, signature and only an optional short travel metaphor as content hierarchy, while keeping family-specific facts unresolved.

Before production mutation, a materially different native clean-room comparison was created:

- `15:2 / QA_ADD16_FRONT_WITHOUT_PRODUCT_DESCRIPTOR_2026_08_15`
- only cloned `TXT_CONTEXT` was hidden
- actual-size screenshot comparison preferred the quieter version with stronger title → recipient → message → date rhythm
- the comparison proof is retained hidden after promotion

Rollback-safe proof created immediately before promotion:

- `15:13 / ROLLBACK_ADD16_FRONT_PRE_PRODUCT_DESCRIPTOR_REMOVAL_2026_08_15` (`visible=false`)

Production root remained `1:2`. Only native editable `4:20 / TXT_CONTEXT` was set `visible=false`; no copy, placeholder, geometry, date or semantic role was fabricated or rasterized.

Post-write screenshot QA: PASS.

- front reads more like an intimate gift enclosure and less like a product/template description;
- title, recipient placeholder, gratitude-message placeholder, date, rule and accent remain unchanged;
- back `1:13` remains unchanged;
- no added decoration, image, travel cliché or family-specific invented fact.

Fresh structure readback:

- front: `400.63 × 582.05`, `clipsContent=true`, native text `7`, visible text `5`, raster IMAGE fills `0`
- back: `400.63 × 582.05`, `clipsContent=true`, native text `5`, visible text `5`, raster IMAGE fills `0`
- `4:20 / TXT_CONTEXT` reads back hidden
- rollback `15:13` reads back hidden
- clean-room comparison `15:2` reads back hidden
- page-level visible loose text outside the production roots: `0`

Drive authority was live re-read before the mutation and remains `1BOyETtL1_loGXNjGV9S30sJKEhZNjd6O / ADD-16_両親贈呈品メッセージカード`, parent `0ADXt8irGMFGnUk9PVA`. Drive writes: `0`.

`IMAGE_GENERATION_NOT_REQUIRED`: the screenshot-supported defect was redundant product-descriptor copy in an already-specific native print composition, not missing media.

## Truth and family-safety gate
- [ ] 宛名、呼称、氏名が本人確認済み
- [ ] 家族構成や関係性を推測した文言がない
- [ ] 本文中の出来事・年月・思い出が正本と一致
- [ ] 両家の文量差が意図せず感情差に見えない
- [ ] 朗読手紙とカード本文の役割が整理されている
- [ ] 仮本文、TBD、placeholderがfinal PDFにない

## Editorial gate
- [ ] 本文が主役で、旅行モチーフが意味を補助している
- [ ] 賞状、招待状、航空券、パスポートの模倣になっていない
- [ ] 意味のない花、ハート、飛行機、スタンプを増やしていない
- [ ] 新郎家／新婦家が単なる色違いコピーではない
- [ ] 余白が不足せず、感謝文を急かす密度になっていない
- [ ] 筆記体や装飾書体で日本語本文の可読性を落としていない

These editorial items must be rechecked against the final family-specific copy before print export; the current layout-level visual evidence is recorded in the linked design QA.

## Typography gate
- [ ] 100%実寸で本文を無理なく読める
- [ ] 和文の禁則、句読点、改行位置が自然
- [ ] 宛名と署名が本文に埋もれない
- [ ] 長文時に字間・行間を詰めて解決していない
- [ ] 縦書き採用時に英数字・日付・署名の向きを確認

The reopened Figma QA already contains long-copy placeholder stress evidence; this checklist remains open for the final approved wording.

## Physical-production gate
- [ ] 贈呈品、箱、リボン、封筒とのサイズ比が適切
- [ ] 取付穴、紐、封入位置が文字・装飾と干渉しない
- [ ] 紙厚と折り仕様が用途に適合
- [ ] 塗り足し3 mm、安全域8 mmを満たす
- [ ] 両面印刷の天地と表裏位置が正しい
- [ ] 実際の照明下で紙色と文字コントラストを確認
- [ ] 100%実寸試し刷りを贈呈品へ仮設置して確認

## Final screenshot / handoff QA
- [x] reopened production front screenshot
- [x] reopened production back screenshot
- [x] long-copy placeholder stress evidence
- [x] rollback proof before visual promotion
- [ ] final family-specific front/back readback
- [ ] 贈呈品モックへの最終仮設置
- [ ] 100%実寸の最終本文クロップ

## Completion gate

Current design status may remain `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS`, but do not mark the item `COMPLETED` or print-ready until final family copy, gift/attachment conditions, vendor/export requirements and 100% physical proof are confirmed.
