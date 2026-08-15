# Non-Rurubu → Shared Design Learning Feed

Owner: non-Rurubu Figma quality-improvement hourly task
Opened: 2026-08-15

Read `SHARED-DESIGN-LEARNING-SYSTEM.md` before using this feed.

This is an append-oriented neutral feed for generalizable lessons verified by WEDDING PASSPORT, BOARDING PASS, 青春ふたりきっぷ, or ADD-item work. It is not a non-Rurubu production authority and does not grant Rurubu workers permission to inspect non-Rurubu item-specific Figma, Drive, ledgers, or GitHub paths.

## Initial state

No cross-item lesson is pre-promoted merely because this feed exists.

On each hourly run, record only a lesson that changed a real production decision and has evidence. Use the shared state machine:

`OBSERVED → ROOT_CAUSE_HYPOTHESIS → TESTED_LOCAL → VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE → VERIFIED_CROSS_ITEM → PROMOTED_PROJECT_RULE`

For each entry, include the visible problem, root cause, bounded experiment, three-scale evidence, regression risk, what must remain item-specific, and what receiving item should test next.

When consuming Rurubu lessons, never copy Rurubu-like art direction into passport/ticket/ADD items by default. Transfer methods and verified principles only, then independently test them against the target item's own physical/visual role.

## NRSL-001 — Spatial polish must be revalidated against dynamic copy

Source scope/item: non-Rurubu / ADD-08 メニュー補助サイン

State: `VERIFIED_CROSS_ITEM`

### Visible problem

The closing CTA ended too early in a tall A4 composition, leaving the lower paper field visually underused and risking a premium-by-emptiness reading.

### Root-cause hypothesis

A large closing text block can act as a vertical anchor, but moving a `textAutoResize=HEIGHT` node deeper on the page reduces its bottom-edge tolerance. A visually stronger short-copy position can therefore regress long-copy safety even when no type size or width changes.

### Bounded test

- clean-room duplicate: `15:2 / QA_ADD08_DEEPER_CLOSING_RHYTHM_2026_08_15`
- changed only CTA y-position from `1120` to `1390`
- verified at whole-item, reading and actual-size scales
- then created dedicated long-copy stress `16:26`

The initial `y=1390` candidate looked stronger with production copy but expanded to `470 px` under stress, producing CTA bottom `1860` against footer y `1810` and failing.

The test was corrected to `y=1260`, where the same stress ended at `1730`, preserving an `80 px` footer gap. Production adopted `y=1260`.

### Expected improvement

Use more of the physical paper field without treating empty lower space as luxury, while keeping variable-copy tolerance.

### Regression risk

Any vertical repositioning of auto-height copy can silently consume safe-area/footer reserve even when the current production string still fits.

### Three-scale evidence

- whole-item / 500 px: PASS at final `y=1260`
- reading / 1000 px: PASS
- actual-size / 1400×1980: PASS
- long-copy stress: PASS only after correcting `1390 → 1260`

### Figma / Drive / GitHub evidence

- Figma file: `xvJH23nWjWAApd3yOwr4y3`
- production: `1:3`
- CTA: `4:54`
- clean-room comparison: `15:2` hidden after promotion
- rollback: `16:2` hidden
- long-copy stress: `16:26` hidden after verification
- Drive authority: `12D7UPRTDwUx7vLOm1mtaew-sFGHt9FPG`
- item evidence: `docs/add-items/ADD-08-DEEPER-CLOSING-RHYTHM-QA-2026-08-15.md`
- Git commit: `42eacf31a7cd6c95f30518d5e47fa7d93eccf3b7`

### What must remain item-specific

Do not transfer ADD-08's exact y-values, CTA scale, navy marginalia, palette, or culinary layout. They belong only to this item.

### Cross-item applicability hypothesis

When another print item improves hierarchy by moving a variable-height text block closer to a trim/footer edge, rerun a realistic long-copy stress after the spatial change instead of reusing older long-copy PASS evidence.

### Cross-item verification — ADD-10 / 2026-08-15

ADD-10 A4-left/right independently reproduced the method under a different physical role and composition. Its `INFO_BLOCK_AUTO` was moved from `y=555 → 760` to reduce lower-field emptiness. A new stress copy at the adopted position expanded the auto-layout block from `270 → 470 px`; the stress bottom was `1230` against footer `y=1815`, with outside visible text count `0` and a native 1400×1980 screenshot PASS.

This receiving-item verification did **not** reuse ADD-08 coordinates, CTA geometry, palette, or culinary layout. Only the QA method transferred: material spatial movement of dynamic copy requires fresh stress at the new position.

Receiving-item evidence:
- Figma: `mMfoBkoZ7eVbuerSRHePLV`
- production: `2:2 / 2:13`
- hidden stress: `25:2`
- Drive authority: `1ASWOTXO4fosLb9reWxQrHL2_UUC_Y8-3`
- item QA: `01_paper-items/additional-wedding-items/ADD-10-venue-guide-signs/QA.md`
- item Git commit: `9e8b9d9c066c0649d8dcce7a91ec6ef39e46b175`

### Next receiving-item experiment

Continue applying this check when a third materially different print artifact moves an auto-height or auto-layout text role closer to trim, footer, fold, perforation or another fixed physical boundary. Do not promote coordinate heuristics; only the revalidation requirement is transferable.

## NRSL-002 — A retained line/field should prove a binding function at whole-item scale

Source scope/item: non-Rurubu / ADD-10 会場案内サイン

State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

Consumed neutral hypothesis: RSL-008 from the Rurubu shared feed. No Rurubu production node, asset, item-specific path, palette or layout was inspected or copied.

### Visible problem

ADD-10 A4-left/right needed the destination information block moved deeper to use the physical page more intentionally. Moving the text alone left the existing rust `ACCENT_EDGE` visually ending above the information block, making it read more like a disconnected decorative stripe.

### Root-cause hypothesis

Subtraction is not automatically better. A line or narrow field may deserve retention when it visibly binds two information regions into one artifact-level reading path. The correct test is whether the element still performs that role at whole-item scale after a layout change.

### Bounded test

Two rollback-safe A4-left candidates were compared:

1. `24:2 / QA_ADD10_A4_LEFT_DEEPER_INFO_ONLY_2026_08_15`
   - `INFO_BLOCK_AUTO y 555 → 760`
   - seam unchanged at height `520`.
2. `24:15 / QA_ADD10_A4_LEFT_DEEPER_INFO_PLUS_BINDING_SEAM_2026_08_15`
   - same information-block movement;
   - `ACCENT_EDGE height 520 → 640`, ending at the deeper information start.

Candidate 2 was stronger because the rust seam visibly linked the upper `会場案内` kicker to the deeper destination block instead of floating independently. The element was retained for function, not because it existed already.

### Expected improvement

Use the page more fully while keeping a coherent top-to-middle reading path without adding cards, badges, illustration or new imagery.

### Regression risk

Extending a line without a real binding role can become meaningless decoration, over-segment the page, or turn into a template signature repeated across unrelated items.

### Three-scale evidence

- whole-item / 500 px: candidate 2 PASS and clearer than candidate 1;
- reading / 1000 px: PASS;
- actual-size / native 1400×1980: PASS on adopted left/right production;
- A4-right independent mirrored-role read at actual size: PASS without assuming blind geometric mirroring.

### Figma / Drive / GitHub evidence

- Figma file: `mMfoBkoZ7eVbuerSRHePLV`
- adopted production roots: `2:2 / 2:13`
- candidate A: `24:2` hidden
- candidate B: `24:15` hidden
- rollback: `25:15 / 25:28` hidden
- Drive authority: `1ASWOTXO4fosLb9reWxQrHL2_UUC_Y8-3`
- item QA: `01_paper-items/additional-wedding-items/ADD-10-venue-guide-signs/QA.md`
- Git commit: `9e8b9d9c066c0649d8dcce7a91ec6ef39e46b175`

### What must remain item-specific

Do not transfer ADD-10's deep-navy split field, rust seam, arrow geometry, exact seam length, information y-position, A4/A5 reflows, or wayfinding visual language.

### Cross-item applicability hypothesis

Before removing or extending a border/rule/rail during UI-subtraction or spacing polish, another print item can independently compare whether the element performs a real binding function between image/caption, title/body, date/events, or physical artifact regions at thumbnail scale.

### Next receiving-item experiment

Only when a future non-Rurubu item has a visible border/rule/rail whose purpose is ambiguous, test one bounded subtraction/retention comparison. If another materially different item reproduces the benefit without adding template sameness, advance this lesson to `VERIFIED_CROSS_ITEM`.

## NRSL-003 — Preserve functional quiet zones without drawing UI-like boxes around them

Source scope/item: non-Rurubu / ADD-14 二次会案内

State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

Consumed neutral hypothesis: RSL-003 (`UI-like containment often hides weak hierarchy`). No Rurubu item-specific Figma, Drive, asset, ledger, composition or palette was inspected or copied.

### Visible problem

ADD-14 A6/A5 used a 1px dark rectangular stroke around the unresolved QR placeholder. The QR role legitimately needs reserved geometry and future quiet-zone space, but the visible border itself had no printing, scanning or semantic job. At whole-item scale it read as a small web/form widget inside an otherwise typographic itinerary.

### Evidence before change

- A6 production `1:2`: QR role `5:54`, 84×84, one dark stroke.
- A5 production `1:18`: QR role `5:78`, ≈119.28×119.28, one dark stroke.
- Both designs were structurally sound and already had non-scannable native semantic placeholders; the defect was containment appearance, not missing QR authority.

### Root-cause hypothesis

A functional reserved area does not always need a visible container. When the physical requirement is empty space/quiet zone rather than a printed border, drawing the boundary can create unnecessary UI/card semantics.

### Bounded test

Rollback-safe comparisons removed only the QR frame stroke:

- A6 `27:2 / QA_ADD14_A6_QR_QUIET_ZONE_WITHOUT_BORDER_2026_08_15`
- A5 `27:27 / QA_ADD14_A5_QR_QUIET_ZONE_WITHOUT_BORDER_2026_08_15`

No frame size, QR semantic text, position, time/venue fields, rail, color system or facts changed.

### Expected improvement

Reduce the form/widget impression while preserving the future replaceable QR role and exact reserved geometry.

### Regression risk

Blind box removal can weaken grouping or make an unresolved role disappear. This treatment is valid only when spacing/placement already makes the role legible and the border is not required for trim, scan, binding, caption, ticket, or physical artifact semantics.

### Three-scale evidence

- whole-item A6: PASS; the itinerary reads more continuously and less like a form.
- reading/native A6 592×420: PASS.
- reading/native A5 840×592: PASS.
- structure after promotion: A6 QR 84×84 stroke count 0; A5 QR ≈119.28×119.28 stroke count 0; both roots outside visible text 0 and IMAGE fills 0.

### Figma / Drive / GitHub evidence

- Figma file: `IygEr140Yqk12LsGL3TFrT`
- production A6/A5: `1:2 / 1:18`
- hidden comparisons: `27:2 / 27:27`
- hidden rollbacks: `27:52 / 27:77`
- Drive authority: `1Oq2Pz2mYo4oaDnO7LMezMrCUizcxaEjs`
- item evidence: `01_paper-items/additional-wedding-items/ADD-14-after-party-guide/FIGMA-QR-CONTAINMENT-SUBTRACTION-2026-08-15.md`
- item Git commit: `8a0747c657f436e0f573db12b14eabf445789613`

### Adopted / rejected / blocked status

`VERIFIED_LOCAL`: adopted in A6 and A5 production. No generated asset or Drive write was needed.

### What must remain item-specific

Do not transfer ADD-14's after-party itinerary layout, navy/rust rail, QR dimensions, exact placement, time grid, palette or semantic copy.

### Cross-item applicability hypothesis

When another print artifact contains a visible rectangle around a role whose true physical requirement is only reserved space (QR quiet zone, replaceable image crop, handwriting field, stamp area), independently test whether removing the visible border preserves comprehension while reducing card/UI reading.

### Next receiving-item experiment

Use the method only on a materially different non-Rurubu artifact with a screenshot-visible container whose binding/physical function is ambiguous. Compare border retained vs removed at whole-item scale first; if grouping weakens, reject the subtraction rather than forcing consistency.
