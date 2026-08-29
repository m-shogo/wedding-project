# WEDDING PASSPORT V4 — Menu / Seating print-readability refinement QA

State: `VERIFIED_LOCAL / V4_VISUAL_REFINEMENT_PASS / STRUCTURE_PRESERVED / NOT_PROMOTED / NOT_PRINT_READY`

Start main SHA: `bade148289e0c201eee3093967b396b44dc4289d`

## Authority

- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- V4 clean-room evidence: `FIGMA-V4-CLEANROOM-HARBOR-ATLAS-2026-08-27.md`
- Figma file: `UbK8KmuWJcDeGScsN49Uor`
- V4 page: `212:2 / V4_CLEANROOM_2026_08_27`
- exact Drive authority: `1LnGb9tq_Vswe-GKO6UxfvKMAZuShEaaw / 01_パスポート風_メニュー・ドリンク・座席表`

No retained Current/V2/V3 visual construction was used as design input in this refinement.

## Visible issue 1 — Menu full-height chapter rail

Fresh whole/reading/native review showed that `212:14 / FIELD / OXBLOOD CHAPTER` was a full-height `180×2100` field. It behaved more like a persistent app/sidebar navigation rail than a paper chapter cue and kept the food column unnecessarily far from the left paper edge.

### Bounded V4-only correction

- shortened chapter field from `180×2100` to `180×480`;
- retained `02` as the chapter signal;
- shifted title / title-en / header rule left from `x=250` to `x=210`;
- shifted food indices to `x=210` and food-name/en/rule lanes to `x=300`;
- widened food lane/rules to `660 px`;
- shifted allergy note to `x=210`;
- kept all semantic copy, drink copy, colors and chapter identity unchanged;
- renamed root to `212:13 / V4 / 02 MENU + DRINK / OPEN CHAPTER LEDGER`.

Fresh screenshot result: PASS. The page now reads as a paper chapter opening rather than a web sidebar while preserving clear food > drink hierarchy.

## Visible issue 2 — Seating guest names were still too small for a print-first quality bar

The existing three-column ledger structurally fit all 11 tables × maximum 7 guests, but guest names were `20 px` at a `1480 px = 148 mm` working scale, approximately `2.0 mm` cap/body scale before font-specific metrics. That was structurally valid but visually too timid for the current sellable/actual-size gate.

### Bounded V4-only correction

Guest text nodes `212:65 / 68 / 71 / 74 / 77 / 80 / 83 / 86 / 89 / 92 / 95` were changed from:

- `20 px / 28 px line-height`

to:

- `24 px / 32 px line-height`;
- `textAutoResize=HEIGHT` preserved after loading each node's actual font;
- foot note `212:98` increased from `19 px` to `21 px`;
- root renamed to `212:58 / V4 / 03 SEATING / ATLAS LEDGER / PRINT-READABLE`.

No table count, guest count, placeholder semantics, contour art, rules or column coordinates changed.

### Fresh structure/readback

Each seven-guest block is now `224 px` high against `232 px` available before its separator rule, preserving an `8 px` local reserve. TABLE 11 long-name stress remains visible without collision.

Fresh screenshot result: PASS at whole/reading review; all 11 tables remain visible and the guest lane is materially more readable.

## Asset decision

`FINAL MISSING ASSET LIST`: no new production asset was justified in this bounded refinement. The defects were containment and print typography, so generating another hero/background/decorative image would have treated the wrong root cause. Existing Harbor Atlas fixed art remains unchanged.

- generation candidates this run: `0`;
- Drive writes this run: `0`;
- variable copy baked into graphics: `0`.

## Learning

`VERIFIED_LOCAL`:

1. A full-height chapter color field on a printed editorial page can inherit persistent web/sidebar semantics even when the typography itself is editorial. Test a bounded chapter flag/open-paper alternative before adding decoration.
2. Structural fit is not sufficient for seating text. When a 11×7 ledger technically fits but actual-size guest text remains timid, increase readable type first and verify the real separator reserve before declaring the layout complete.
3. When the visible defect is containment or typography, image-generation-centered production still permits `0` generated assets; generation is not a quota.

## Promotion

V4 remains `NOT_PROMOTED`. This refinement advances the V4-only maturity gate but does not yet authorize comparison/promotion against retained Current. Cover/back, whole-book rhythm, final placeholder stress and print/vendor/physical proof remain separate gates.
