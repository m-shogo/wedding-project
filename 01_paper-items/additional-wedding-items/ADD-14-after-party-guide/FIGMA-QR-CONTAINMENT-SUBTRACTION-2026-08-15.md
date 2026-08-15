# ADD-14 二次会案内 — QR containment subtraction

Date: 2026-08-15
Status: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / QR_BORDER_REMOVAL_PASS / ROLLBACK_SAFE / BLOCKED_REQUIRED_INPUT / NOT_PRINT_READY`

## Live authority before write

- GitHub main: `f021fb19c29fa5f383570d297af8a3d3ba86c41f`
- Current: `docs/automation/non-rurubu-figma-quality-current.md` = `ACTIVE / HOURLY / FIGMA_EDIT_ALLOWED / VISUAL_REOPENED`
- Figma file: `IygEr140Yqk12LsGL3TFrT`
- A6 production: `1:2`
- A5 production: `1:18`
- Drive folder: `ADD-14_二次会案内` / `1Oq2Pz2mYo4oaDnO7LMezMrCUizcxaEjs`

## Visible problem

Fresh A6/A5 review showed the unresolved QR role as a dark 1px rectangular outline around an otherwise deliberately non-scannable placeholder. The actual QR quiet zone is a spacing requirement, not a visible border requirement. At whole-item scale the rectangle read as a small web/form widget and added unnecessary containment to an itinerary already using clear typographic grouping.

The rest of the V2 itinerary remained strong: Japanese-first headline, venue/time hierarchy, compact fee/access/RSVP fields, muted `LAYOUT DUMMY` suffixes, and the navy/rust left rail were not reopened.

## Bounded clean-room test

Consumed neutral hypothesis: RSL-003 (`UI-like containment often hides weak hierarchy`) only as a test method. No Rurubu item-specific Figma, Drive, asset, ledger, layout or palette was inspected or copied.

Rollback-safe comparisons:

- A6: `27:2 / QA_ADD14_A6_QR_QUIET_ZONE_WITHOUT_BORDER_2026_08_15`
- A5: `27:27 / QA_ADD14_A5_QR_QUIET_ZONE_WITHOUT_BORDER_2026_08_15`

Only `AREA_AFTER_PARTY_QR_REPLACEABLE` stroke was removed in each duplicate. Frame dimensions, semantic QR text, position, quiet-zone geometry, headline, venue/time fields, rules and all facts/placeholders were unchanged.

Comparison result: `PASS`. Both sizes became quieter and less form-like while the reserved QR area remained structurally intact and clearly replaceable.

## Rollback-safe production promotion

Full hidden rollback copies were created immediately before production mutation:

- A6 rollback: `27:52 / ROLLBACK_ADD14_A6_PRE_QR_BORDER_REMOVAL_2026_08_15`
- A5 rollback: `27:77 / ROLLBACK_ADD14_A5_PRE_QR_BORDER_REMOVAL_2026_08_15`

Production mutation:

- A6 `5:54 / AREA_AFTER_PARTY_QR_REPLACEABLE`: strokes `1 → 0`
- A5 `5:78 / AREA_AFTER_PARTY_QR_REPLACEABLE`: strokes `1 → 0`

The comparison candidates were returned to hidden state after promotion.

## Screenshot QA

- A6 native `592×420`: PASS
- A5 native `840×592`: PASS
- the Japanese headline and itinerary information still read before proof metadata;
- the QR role no longer reads as a bordered form/widget;
- no information, QR destination, scannable code, decorative asset or generated image was added.

## Structure readback

A6 `1:2`:
- 592×420, `clipsContent=true`
- native text: `18`
- visible native text: `17`
- IMAGE fills: `0`
- outside visible text: `0`
- QR frame: `84×84`, stroke count `0`

A5 `1:18`:
- 840×592, `clipsContent=true`
- native text: `18`
- visible native text: `17`
- IMAGE fills: `0`
- outside visible text: `0`
- QR frame: `119.28×119.28`, stroke count `0`

Rollback/candidate readback:
- `27:52` hidden
- `27:77` hidden
- `27:2` hidden
- `27:27` hidden

No flatten/raster replacement or factual invention was introduced.

## Image / Drive decision

`IMAGE_GENERATION_NOT_REQUIRED`.

The screenshot-supported defect was UI-like containment, not missing photography/illustration. Drive writes: `0`.

## Deferred finalization

The real QR remains blocked on an authoritative destination and device/physical scan proof. Removing the placeholder outline does not remove the required quiet-zone or future replaceable QR role.
