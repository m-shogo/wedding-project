# ADD-07 エスコートカード案内ボード — Figma V4 PICKUP POCKET QA — 2026-08-31

State: `V4_SELECTED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / THREE_SCALE_QA_PASS / LONG_COPY_STRESS_PASS / STRUCTURE_QA_PASS / CLEANROOM_PROVENANCE_PASS / NOT_PRINT_READY`

## Live authority

- run start / pre-write latest main: `d589fd6da1b508e77972102e847b45d4d6799d98`
- Current authority: `docs/automation/non-rurubu-figma-quality-current.md` = `ACTIVE / HOURLY / FIGMA_EDIT_ALLOWED / VISUAL_REOPENED`
- Figma file: `rplj1IWXP4XVKjWDQRg3dU`
- V4 page: `56:27 / V4 / ADD-07 / PICKUP POCKET / 2026-08-31`
- Current V4 A2: `56:28 / CURRENT / V4 / ADD-07 / A2 / PICKUP POCKET / 2026-08-31`
- Current V4 A3: `57:2 / CURRENT / V4 / ADD-07 / A3 / PICKUP POCKET / 2026-08-31`
- previous HANGING CARD RACK A2/A3 `32:2 / 32:16` preserved hidden as rollback/comparison only
- exact Drive authority live readback: `1nPb_yvp1rIlF_L3X0mAnBFSzSuEIllDi / ADD-07_エスコートカード案内ボード`
- Drive write: `0`

## V4 exclusive clean-room provenance

This is a new non-Rurubu Figma V4 direction built from blank frames. No legacy production, V2, V3, HANGING CARD RACK, Rurubu layout grammar, Rurubu color system, generated travel background, old card rack geometry, or prior decorative asset was duplicated into the production V4 direction.

The old promoted HANGING CARD RACK was read only for completion comparison after the new V4 had been constructed. Its three hanging cards, threads/holes, dark-plum field and rack metaphor remain rollback evidence, not V4 visual authority.

## Reference-led visual intent

The item-specific job is physical: a guest must recognize that they should find their named escort card, take it, and continue to the table printed on it. V4 therefore turns the central visual into one oversized **pickup pocket** rather than three decorative hanging cards.

Hierarchy:

1. Japanese serif hero `あなたのカードを、ここから。`
2. short native instruction
3. one oversized physical pickup pocket + protruding card cue
4. three concise action labels
5. date/place and verified closing instruction

Art direction:

- warm ivory paper field;
- deep blue physical edge/pocket;
- one narrow coral register and pocket-bottom accent;
- strong Japanese serif hero rather than airport/ticket UI;
- no generic travel image, fake boarding credential, badge/sticker clutter, uniform rounded-card grid, centered-everything layout, or meaningless English microcopy.

The production fixed graphic is an **editable SVG** (`SVG / EDITABLE PICKUP POCKET`) because it is a reusable planar physical metaphor. All reader-facing variable/factual copy remains native Figma text. Generated/composed raster and replaceable photos are not required for this item.

## Figma authoring / structure QA

Production roots after final repair:

- A2 `56:28`: 1400×1980 px
- A3 `57:2`: 990×1400 px

Readback after promotion:

- visible native text: `10` per format
- fixed-height visible text: `0`
- outside-root visible text: `0`
- raster IMAGE fills: `0`
- editable vector descendants: `5` per format, inside the composed pickup-pocket SVG
- A2 minimum visible-text edge clearance: `95px` ≈ `28.5mm`
- A3 minimum visible-text edge clearance: `67.17px` ≈ `20.2mm`

A3 was independently rebuilt after the first A3 script exposed an atomic/parent-coordinate bug; the broken root was deleted and never promoted.

### Long-copy defect found and repaired

Fresh V4 stress initially exposed a real collision between long title and lead in both A2 and A3. Typography was **not** shrunk to hide the issue. Production title+lead were converted to native vertical Auto Layout:

- A2 `58:42 / AUTO / HEADER REFLOW`
- A3 `58:43 / AUTO / HEADER REFLOW`

The stress was then recreated from V4 only:

- A2 `58:44 / QA / V4 ADD-07 / A2 LONG COPY STRESS`
- A3 `58:65 / QA / V4 ADD-07 / A3 LONG COPY STRESS`

Final stress readback:

- outside text: `0`
- tested key-copy collisions: `0`
- A2 stress header height: `632px`
- A3 stress header height: `448.083px`

Stress proofs were screenshot-checked and hidden after verification.

## Three-scale visual QA

A2 was checked as whole-item thumbnail (~500px long edge), reading scale (~1400px long edge), and native 1400×1980 actual-detail render. A3 was checked as whole-item/read scale and native 990×1400 render. The first read remains the large Japanese hero, then the physical pickup action. The new direction is materially different from the old HANGING CARD RACK and avoids dashboard/card-grid behavior.

`SELLABLE_VISUAL_QA_PASS` is granted for the V4 composition, not inherited from the old V2/V3/previous-production gate.

## Print-first actual-size QA

Confirmed physical formats from existing ADD-07 authority:

- A2 trim scenario/current authority: `420 × 594mm`, canvas `1400 × 1980px`
- A3 trim scenario/current authority: `297 × 420mm`, canvas `990 × 1400px`
- both are approximately `3.333 px/mm`

Approximate actual-size typography:

### A2

- hero title 100px ≈ **85.0pt**
- lead 38px ≈ **32.3pt**
- card label / steps 34px ≈ **28.9pt**
- kicker 30px ≈ **25.5pt**
- date 31px ≈ **26.4pt**
- footer 28px ≈ **23.8pt**
- place 25px ≈ **21.3pt**

### A3

- hero title 70.707px ≈ **60.1pt**
- lead 26.869px ≈ **22.8pt**
- card label / steps 24.04px ≈ **20.4pt**
- kicker 21.212px ≈ **18.0pt**
- date 21.919px ≈ **18.6pt**
- footer 19.798px ≈ **16.8pt**
- place 17.677px ≈ **15.0pt**

No raster source exists in V4, therefore effective PPI is `N/A` and `RESOLUTION_WARNING=NONE`.

## Print risk / deferred finalization

`DESIGN_COMPLETE != PRINT_READY` remains in force.

Do **not** infer a 3mm bleed or production safe area from this Figma geometry. The selected printer/template is still required before production bleed/trim/safe is finalized. Remaining production proof includes:

- final A2 vs A3 installation choice;
- final card-placement operation/wording and actual escort-card display relationship;
- stand/easel lip occlusion and mounting method;
- 2–4m first-read/viewing-distance check in venue lighting/background;
- CMYK/profile proof for deep blue, coral and warm ivory, plus grayscale hierarchy;
- black construction (do not assume rich black / 100K / registration black interchangeability);
- PDF export, font embedding, transparency, overprint/knockout and printer preflight;
- 100% output or physical proof.

QR / fold / punch / perforation / handwriting fields are not part of the current ADD-07 board geometry.

## Decision

`V4_SELECTED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / LONG_COPY_STRESS_PASS / STRUCTURE_QA_PASS / CLEANROOM_PROVENANCE_PASS / NOT_PRINT_READY`.
