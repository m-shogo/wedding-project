# BOARDING PASS — selected V5 decorative folio subtraction QA

Date: 2026-08-18
State: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / CLEANROOM_V5_SELECTED_FAMILY / DECORATIVE_FAKE_FOLIO_REMOVAL_PASS / LEGACY_PRESERVED / NOT_PRINT_READY`
Start authority SHA: `6527da99915b91c696089f48501b2e1ac67b9e70`

## Authority

- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Figma: `P2PtpMyhyZqHYe1ZBBCD13`
- selected V5 front: `39:22 / V5 / FRONT / OFFSET TYPOGRAPHIC COUPON`
- selected V5 back: `41:2 / V5 / BACK / THANK-YOU COUPON`
- Drive authority: `03_航空チケット風_エスコートカード` / `1pccCqb47W7z4F9g_224X4U3bS45HA_Ql`
- retained production: `8:5 / 8:73` unchanged

## Fresh visible issue

Fresh actual-size review of selected V5 front found `39:46 / TEXT / FOLIO / No. 2026–10–24` acting as decorative pseudo-transport metadata.

The date is already authoritative and prominent in the right information block (`2026.10.24`). Repeating it as a fake `No.` serial adds ticket-template signaling without adding guest-facing meaning. Current authority explicitly treats fake transport data and filler metadata as AI/template risk when they do not serve a real information role.

This was not a clean-room rebuild. V5 was already the selected zero-reuse clean-room family; this run performed a bounded rollback-safe subtraction on the selected candidate.

## Rollback-safe comparison

Before touching selected V5, a comparison clone was created:

- `49:2 / QA / V5 FRONT / NO DECORATIVE SERIAL / 2026-08-18`

Only its cloned `TEXT / FOLIO` was hidden. The comparison was checked at native `1200×550` and visually improved the lower-left field by removing redundant fake metadata while keeping the center phrase and right authority block intact.

After adoption, the selected pre-change front was preserved as hidden rollback:

- `49:31 / ROLLBACK / V5 FRONT / PRE FOLIO SUBTRACTION / 2026-08-18`

The QA comparison was then hidden.

## Adopted Figma change

Selected front `39:22`:

- hidden only `39:46 / TEXT / FOLIO / No. 2026–10–24`;
- did not change the Japanese headline, guest-name roles, roman-name role, confirmed ceremony date/time, Yokohama label, reception/table/final-guide semantic placeholders, bottom phrase, ticket border, corner-cut semantics, guilloche/rosette/orbit vectors, spacing, frame size, or typography;
- back `41:2` unchanged.

No guest facts were invented and no variable copy was baked into SVG/raster.

## Three-scale / screenshot QA

Post-change selected front:

- whole / thumbnail: `500×230` render — PASS; title, guest name, date/time and right information hierarchy remain immediate;
- reading / actual-size: native `1200×550` — PASS; lower-left field is quieter and no longer reads as fake credential metadata;
- selected front text outside root: `0`;
- IMAGE fills: `0`;
- old production and clean-room history preserved.

Back `41:2` was rechecked visually and remains healthy; no change was justified.

## Drive / asset decision

`IMAGE_GENERATION_NOT_REQUIRED`.

The defect was redundant decorative copy, not missing fixed artwork. Drive folder metadata was live-read successfully. Drive writes: `0`.

## Decision

`DECORATIVE_FAKE_FOLIO_REMOVAL_PASS`.

BOARDING PASS V5 remains the selected clean-room family with `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS`. This run reduces generic ticket-template signaling without weakening authentic physical-ticket semantics or native editability.

## Deferred finalization

Still not print-ready until final guest/table/reception content, printer/vendor requirements and physical proof are authoritative.
