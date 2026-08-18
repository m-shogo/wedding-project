# BOARDING PASS V5 — back THANK YOU kicker subtraction QA

Status: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / CLEANROOM_V5_SELECTED_FAMILY / BACK_REDUNDANT_KICKER_SUBTRACTION_PASS / LEGACY_PRESERVED / NOT_PRINT_READY`
Date: 2026-08-18
Start authority SHA: `c887d96fbdd57081e3a550f5896a57f7a6c18a82`

## Authority

- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Figma file: `P2PtpMyhyZqHYe1ZBBCD13`
- selected front: `39:22` (unchanged)
- selected back: `41:2`
- back long-copy stress: `41:19`
- Drive authority: `03_航空チケット風_エスコートカード` / `1pccCqb47W7z4F9g_224X4U3bS45HA_Ql`
- retained legacy `8:5 / 8:73` remains untouched.

## Visible issue

Fresh selected-back thumbnail review found `41:12 / TEXT / KICKER / THANK YOU` redundant with the dominant Japanese headline `きょうを、ありがとう。`.

The English kicker had no factual, navigational, physical-ticket or hierarchy role. At whole-item scale it read as generic template microcopy rather than useful reader-facing content.

## Bounded comparison

A rollback-safe comparison was created:

- `50:2 / QA / BOARDING PASS V5 BACK / THANK-YOU-KICKER SUBTRACTION / 2026-08-18`

Only `TEXT / KICKER / THANK YOU` was hidden. The Japanese headline, semantic thank-you placeholder, date, location, closing copy, memory-orbit vector, print boundary and four corner-cut roles were unchanged.

Comparison result: the back reads more directly as a physical thank-you coupon, with the first meaningful text now the Japanese headline. The subtraction did not weaken the ticket object or closing hierarchy.

## Promotion / rollback

After comparison QA:

- selected back `41:12` hidden;
- matching hidden stress kicker `41:29` hidden;
- comparison `50:2` hidden after promotion.

Hidden rollback:

- selected back pre-change: `50:19`;
- back stress pre-change: `50:36`.

Front `39:22` was intentionally unchanged because its `ESCORT CARD` kicker performs a genuine artifact/category role and is not equivalent to the redundant back microcopy.

## Three-scale / structure QA

- whole-item / 500px selected back: PASS after promotion;
- reading scale: PASS;
- actual native `1200×550` render: PASS after promotion;
- selected visible native text: `5`;
- selected outside visible text: `0`;
- selected proof-language leakage: `0`;
- selected fixed 10–12px text boxes: `0`;
- selected text collisions: `0`;
- selected IMAGE fills: `0`;
- hidden long-copy stress retains outside text `0`, fixed-height `0`, collision `0`; its internal stress/proof wording remains allowed because the layer is hidden QA evidence rather than guest-facing copy.

No image generation or Drive write was required.

## Decision

`BACK_REDUNDANT_KICKER_SUBTRACTION_PASS`.

The selected clean-room V5 family remains current. This is a bounded subtraction of generic duplicate microcopy, not a redesign or a legacy-derived change.
