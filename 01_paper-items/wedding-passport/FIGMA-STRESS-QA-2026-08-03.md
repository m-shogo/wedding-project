# WEDDING PASSPORT — Native-text Stress QA 2026-08-03

Status: `LIVE_STRESS_QA_PASS / RESILIENCE_FIX_APPLIED / FINAL_CONTENT_PENDING / NOT_PRINT_READY`
Current authority: live production Figma + GitHub `main`
Production Figma: https://www.figma.com/design/UbK8KmuWJcDeGScsN49Uor
Starting main SHA: `c4ad8f4283bcce876ba70e8b22c98aaef92723e1`

## Live state checked

- GitHub `main` was re-read before the Figma production write and again before this commit.
- Production Figma pages and semantic frame IDs were verified live.
- Google Drive parent folder `1LnGb9tq_Vswe-GKO6UxfvKMAZuShEaaw` was read live. Its existing children include `20_制作素材` (`1G4b7Qhtj6Ng7RRREtN_us4eKnwvCbWA6`) and `10_参考画像・リサーチ` (`1w3o1GeLX1SgOFDxWHvhG9sg2KRxsleoH`).
- No Drive file was changed or regenerated.

## Safe proof method

Production dummy copy was not replaced with invented final content.

Two rollback-safe proof duplicates were created on `99_QA`:

- `27:2` — `QA_STRESS_MENU_LONG_COPY_2026_08_03`
- `27:50` — `QA_STRESS_SEATING_LONG_NAMES_2026_08_03`

The proof frames use deliberately long temporary Japanese/Latin menu lines and guest names. Production frames `18:90` and `18:131` remained unchanged during discovery and comparison.

## Defects reproduced

### Menu/drink

The original DRINK copy geometry (`x=810`, `width=550`, `fontSize=29`) produced an avoidable one-character orphan in a realistic long wine line (`白ワイ` / `ン`).

### Seating

The original guest-name geometry (`x=36`, `width=320`, `fontSize=26`) produced unstable wrapping and isolated characters for long Japanese, mixed-script, and international names.

No clipping or card-to-card collision occurred, but the line breaks reduced print credibility and name readability.

## Proof candidate and evidence

The proof-only candidate changed:

- DRINK copy: `x 810 → 770`, `width 550 → 590`, `fontSize 29 → 28`
- all guest-name nodes: `x 36 → 28`, `width 320 → 336`, `fontSize 26 → 24`

Screenshot comparison verified:

- the wine line no longer leaves a one-character orphan
- long drink labels remain within the right column without crossing the left copy
- representative long guest names remain within their cards
- the worst proof names stabilize to three lines without clipping
- zone labels, table headings, card borders, card spacing, and final two-table centering remain intact

## Production change applied

### Menu/drink production

Node `18:129` (`AREA_DRINK_COPY`):

- `x=770`
- `width=590`
- `fontSize=28`
- `textAutoResize=HEIGHT`
- native text preserved

### Seating production

Nodes `18:171`, `18:175`, `18:179`, `18:183`, `18:187`, `18:191`, `18:195`, `18:199`, `18:203`, `18:207`, `18:211`:

- `x=28`
- `width=336`
- `fontSize=24`
- `textAutoResize=HEIGHT`
- semantic names and native text preserved

No node was deleted, flattened, rasterized, or replaced. The existing dummy characters were preserved in production.

## Post-write screenshot and structure QA

Production screenshots were captured for `18:90` and `18:131` after the change.

Verified:

- no clipping, overlap, or accidental disappearance
- menu and drink hierarchy remain intact
- VISA panel and approval stamp remain unchanged
- all 11 table cards remain visible
- table labels, color markers, zone labels, and final-row centering remain unchanged
- production dummy names remain readable despite the small type-size reduction
- text remains editable native Figma text

## Drive

Change count: `0`

No concrete source-asset defect, rights issue, resolution issue, crop issue, or identity risk was found, so asset regeneration was not justified.

## Remaining blockers

1. Replace dummy menu/drink copy with venue-authoritative content and rerun actual-copy QA.
2. Replace table and guest names with final data and rerun actual-name QA.
3. Confirm actual room geometry and final seating arrangement.
4. Apply the selected printer template, exact page order, bleed, safe area, and fold contract.
5. Review smallest text and navy/gold output at 100% actual size.
6. Export final PDF and complete a physical proof review.

## Next priority

Continue WEDDING PASSPORT. The next highest-value non-fabricated slice is printer-template / bleed / safe-area / fold-contract verification against the selected production vendor. If no printer template is recorded in Current authority, record the exact blocker and continue other safe print-readiness checks without declaring print readiness.
