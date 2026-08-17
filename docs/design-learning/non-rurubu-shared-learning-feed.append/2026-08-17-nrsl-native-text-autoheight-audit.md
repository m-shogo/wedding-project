# NRSL — Native text height must be audited independently from screenshot appearance

State: `VERIFIED_CROSS_ITEM`
Date: 2026-08-17
Owner: non-Rurubu Figma quality-improvement

## Source evidence

Materially different print items independently reproduced the same structural defect:

1. ADD-13 メッセージカード V6 — screenshot looked correct, but several native text roles were `textAutoResize=NONE` at roughly 10 px fixed height; repaired and re-stressed. Evidence commit: `6c9d9c8716f358d699df9c6e180dedb76017a089`.
2. ADD-14 二次会案内 V3 — A6/A5 looked correct, but multiple native title/time/route roles were fixed-height; repaired and long-copy revalidated. Evidence commit: `9769e0f45ea2eed0ce3e37f12baee38acd23aa13`.
3. ADD-16 両親贈呈品メッセージカード V3 — selected front/back still contained visible native text at `textAutoResize=NONE` / ~10 px; hidden stress also retained proof-suffix dates. Repaired with rollback and zero-collision stress evidence. Evidence commit: `c2e160f9b01f6b1a4f35fd1df1bca57e97a9cc4c`.

## Visible problem

A Figma text node can visually render outside its fixed 10 px box, making screenshots look acceptable while the document remains fragile. Font changes, wording changes, export behavior, or future editing can expose clipping even though the current screenshot appears fine.

## Root cause

Visual QA alone does not prove native text geometry is robust. A legacy/default fixed text box can survive a screenshot because overflow is visible, while its semantic editing contract is still broken.

## Verified method

For selected/production print artifacts that contain variable native text:

1. perform a structural readback in addition to screenshots;
2. flag visible native text with `textAutoResize=NONE` and suspiciously small fixed height;
3. create rollback before mutation;
4. load the existing fonts and convert only the affected native text to height-following behavior (`textAutoResize=HEIGHT` or an appropriate auto-layout/HUG relationship);
5. re-run realistic long-copy/name stress after the sizing change;
6. check both root overflow and text-to-text collisions, not root overflow alone;
7. recheck whole / reading / actual-size screenshots to ensure the repair did not change the intended visual rhythm.

## Expected improvement

Preserve native editability and make the document resilient to final copy/font metrics without changing the chosen composition.

## Regression risk

Auto-height can expand into adjacent absolute-positioned elements. Therefore converting to auto-height is not a blind bulk operation: realistic stress and collision checks are required after the change. Related text roles should use structural auto-layout when expansion affects downstream positions.

## What must remain item-specific

Do not transfer exact node IDs, dimensions, fonts, vertical positions, or layouts from ADD-13/14/16. Only the audit/repair method transfers.

## Cross-item applicability

Apply this QA method to other selected print artifacts when native placeholders, names, venue text, menu copy, messages, captions, dates, or instructions may change. A screenshot PASS does not replace structural text sizing evidence.

## Next receiving-item test

On the next selected non-Rurubu artifact inspected for native editability, audit fixed-height text before making any cosmetic change. If no suspicious fixed-height roles exist, record no change rather than modifying a healthy design.
