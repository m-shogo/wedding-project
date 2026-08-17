# BOARDING PASS — selected V5 proof-language cleanup

Date: 2026-08-17
State: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / CLEANROOM_V5_SELECTED_FAMILY / PROOF_LANGUAGE_CLEANUP_PASS / LEGACY_PRESERVED / NOT_PRINT_READY`
Start authority SHA: `d5fdca96b1234d703ea45399c8af329be5b87c06`

## Authority

- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Figma: `P2PtpMyhyZqHYe1ZBBCD13`
- selected V5 front: `39:22 / V5 / FRONT / OFFSET TYPOGRAPHIC COUPON`
- selected V5 back: `41:2 / V5 / BACK / THANK-YOU COUPON`
- Drive authority: `03_航空チケット風_エスコートカード` / `1pccCqb47W7z4F9g_224X4U3bS45HA_Ql`
- retained production `8:5 / 8:73`: unchanged

## Visible issue

Fresh selected-V5 review found the internal suffix `LAYOUT DUMMY` still printed beside every unresolved front semantic role and the back thank-you placeholder. At whole-item scale the suffix made the otherwise selected ticket read like a Figma proof rather than a finished wedding paper item.

The unresolved content remains explicitly semantic. This cleanup removes only implementation/status language.

Updated native text:

- `[お名前 · LAYOUT DUMMY]` → `[お名前]`
- `[ROMAN NAME · LAYOUT DUMMY]` → `[ROMAN NAME]`
- `受付  [受付案内 · LAYOUT DUMMY]` → `受付 [受付案内]`
- `卓  [卓番号 · LAYOUT DUMMY]` → `卓 [卓番号]`
- `ご案内  [最終案内 · LAYOUT DUMMY]` → `ご案内 [最終案内]`
- `[お礼のメッセージ · LAYOUT DUMMY]` → `[お礼のメッセージ]`

No guest name, table assignment, reception fact, final instruction, QR, or other unknown information was invented.

## Rollback

Before the edit, hidden rollback copies were created:

- `43:2` — V5 front pre-cleanup
- `43:31` — V5 back pre-cleanup

Both remain hidden. Retained legacy production, V3/V4 experiments and prior long-copy QA remain preserved.

## Figma / screenshot QA

Post-change front/back were reviewed at whole/read scale and rendered at native actual size `1200×550`.

Visual result:

- front hierarchy now reads `ふたりの旅へ、ようこそ。 → [お名前] → date/ceremony → semantic reception/table/final-guide fields` without proof-sheet suffix noise;
- back now reads as the selected thank-you coupon with only `[お礼のメッセージ]` as the unresolved semantic role;
- ticket edge semantics, editable guilloche/rosette/orbit vectors, and native typography were unchanged.

## Structural readback

- front `39:22`: 12 visible native text nodes / IMAGE fills 0 / visible proof-language matches 0 / outside text 0
- back `41:2`: 6 visible native text nodes / IMAGE fills 0 / visible proof-language matches 0 / outside text 0
- changed native text nodes: 6
- raster changes: 0
- vector changes: 0
- Drive writes: 0

Existing V5 long-copy structure and semantic editability remain intact because this bounded change only shortened native placeholder strings.

## Decision

`PROOF_LANGUAGE_CLEANUP_PASS`.

V5 remains the selected clean-room family and keeps `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS`. No image generation was required because the observed defect was guest-facing production-language leakage, not missing fixed visual art.
