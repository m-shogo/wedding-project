# ADD-10 Venue Guide Signs — Proof Suffix Removal QA

Status: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / PROOF_LANGUAGE_REMOVAL_PASS / ROLLBACK_SAFE / NOT_PRINT_READY`
Date: 2026-08-17
Start main SHA: `9fdff1a0ef830470e935c0a6cb554c4a57eb141c`

## Authority

- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Figma file: `mMfoBkoZ7eVbuerSRHePLV`
- Drive authority: `1ASWOTXO4fosLb9reWxQrHL2_UUC_Y8-3 / ADD-10_会場案内サイン`
- production roots: `2:2 / 2:13 / 2:24 / 2:35 / 2:46 / 2:57`

## Visible issue

Fresh live screenshot review of A4-left showed the already-approved wayfinding family still printed small internal proof suffixes beside every unresolved semantic field. All six A4/A5 templates contained the same pattern:

- `［行先 · LAYOUT DUMMY］`
- `[DESTINATION · LAYOUT DUMMY]`
- `［階・部屋 · LAYOUT DUMMY］`
- `［方向案内 · LAYOUT DUMMY］`

The unresolved content must remain explicit and editable, but `LAYOUT DUMMY` is authoring metadata rather than guest-facing wording.

## Rollback-safe change

Before mutation, six complete hidden rollbacks were created:

- `35:2` — A4 left
- `35:15` — A4 right
- `35:28` — A4 forward
- `35:41` — A5 left
- `35:54` — A5 right
- `35:67` — A5 forward

Only native editable placeholder strings were changed across the six templates:

- `［行先 · LAYOUT DUMMY］` → `［行先］`
- `[DESTINATION · LAYOUT DUMMY]` → `[DESTINATION]`
- `［階・部屋 · LAYOUT DUMMY］` → `［階・部屋］`
- `［方向案内 · LAYOUT DUMMY］` → `［方向案内］`

24 native text nodes were updated. Functional arrows, direction-specific geometry, accent seams, deeper A4 information rhythm, safe areas, footer, old stress evidence, and retained design history were not changed.

## Three-scale visual QA

Representative A4-left `2:2` was reviewed after the write at:

- whole / thumbnail: 500 px max dimension — PASS;
- reading scale: 1000 px max dimension — PASS;
- actual size: native `1400×1980` — PASS.

The sign now reads as a functional print wayfinding artifact rather than a Figma proof sheet. Japanese destination remains primary, the arrow remains dominant, and unresolved content is still clearly bracketed.

## Structure QA

Live post-write readback across all six production roots:

- A4 left/right/forward: `1400×1980`, 6 visible native text nodes each;
- A5 left/right/forward: `1400×990`, 6 visible native text nodes each;
- visible proof-language matches (`LAYOUT DUMMY / PROOF / QA / TEMP / DUMMY`): `0` on all six;
- IMAGE fills: `0` on all six;
- visible text outside root: `0` on all six;
- all six new rollback roots read back hidden.

Existing long-copy structure and previous deeper-information stress evidence remain valid because no geometry, font sizing, auto-layout relationship, or text-mass contract was expanded; the production strings were shortened only by removing the proof suffix.

## Drive / image decision

- exact Drive authority readback: PASS;
- Drive writes: `0`;
- image generation: `NOT_REQUIRED`.

Wayfinding quality still depends on native type, arrow recognition and physical hierarchy rather than decorative imagery.

## Result

`SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / PROOF_LANGUAGE_REMOVAL_PASS / ROLLBACK_SAFE / NOT_PRINT_READY`

Final venue route facts, exact installation points, official room/floor naming, printer profile/bleed and physical route walk-through remain deferred. No old design or rollback history was deleted.