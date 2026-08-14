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

State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

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

### Next receiving-item experiment

On the next non-Rurubu item where a text block is repositioned materially, independently test the final position with long copy before calling the visual polish complete. If reproduced without unacceptable regression, advance this lesson toward `VERIFIED_CROSS_ITEM`.