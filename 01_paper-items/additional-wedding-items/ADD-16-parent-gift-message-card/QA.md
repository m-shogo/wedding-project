# ADD-16 両親贈呈品メッセージカード — QA

Status: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / CLEANROOM_V3_SELECTED / LONG_COPY_STRESS_PASS / AUTO_HEIGHT_HARDENED / LEGACY_PRESERVED / ROLLBACK_SAFE / NOT_PRINT_READY`
Updated: 2026-08-18
Current authority: `docs/automation/non-rurubu-figma-quality-current.md`

## Current selected authority

The older production `1:2 / 1:13` previously described in this file is retained legacy / rollback history for the reopened clean-room program. The selected current design is clean-room V3 `HOME HORIZON`.

Canonical evidence:

- `FIGMA-CLEANROOM-V3-HOME-HORIZON-QA-2026-08-17.md`
- subsequent guest-copy / placeholder-status cleanup and native-text auto-height hardening records in the ADD-16 item history.

Live authority:

- Figma file: `ylmVBbwNcnjueYrymNpa3c`
- clean-room page: `18:2 / CLEANROOM / ADD-16 / V3 HOME HORIZON / 2026-08-17`
- selected front: `18:3`
- selected back: `18:14`
- hidden long-copy front: `18:26`
- hidden long-copy back: `18:37`
- retained legacy production: front `1:2`, back `1:13` — comparison/history only
- Drive folder: `ADD-16_両親贈呈品メッセージカード / 1BOyETtL1_loGXNjGV9S30sJKEhZNjd6O`

## Current visual direction

`HOME HORIZON` translates the travel theme into a quiet home/origin metaphor rather than ticket/passport decoration:

- warm cream paper field;
- Japanese serif typography with controlled asymmetry;
- one restrained mint horizon line and one rust origin mark;
- recipient → gratitude headline → optional short metaphor → horizon → date/signature on the front;
- native auto-layout message stack on the back;
- no certificate symmetry, side slab, hearts, houses, airplanes, family photos, rounded cards, shadows or script-font decoration;
- all family-specific/final copy stays native semantic text.

Fresh 2026-08-18 whole-item screenshot reconfirmed the selected front hierarchy without a new screenshot-supported visual defect.

## Structure / long-copy QA

### Selected front `18:3`

- working size: `700×1036`
- IMAGE fills: `0`
- visible text outside root: `0`

### Selected back `18:14`

- working size: `700×1036`
- IMAGE fills: `0`
- visible text outside root: `0`
- message body remains native auto-layout so approved Japanese copy can grow without a fixed-height raster/text block.

Hidden stress `18:26 / 18:37` uses long recipient, multi-paragraph gratitude body, longer optional metaphor and long couple-signature strings. Existing stress evidence passes without recipient/title collision, body overflow, route/footer collision or signature escape.

Later structural hardening removed nominal fixed-height native-text boxes while preserving the selected composition and stress result.

## Legacy / family-safety boundary

Legacy `1:2 / 1:13` remains untouched and is not the selected-current editing target.

Do not invent family composition, names, forms of address, episodes, dates/memories, gift type or attachment conditions. Final copy must be checked against the actual family/use case and any read-aloud letter.

## Image / Drive decision

`IMAGE_GENERATION_NOT_REQUIRED_FOR_THIS_ITEM`.

The item is text/emotion-led. Adding generated family/photo imagery would add identity/provenance risk without solving a current visual defect. Drive metadata was live-read on 2026-08-18 and matched `1BOyETtL1_loGXNjGV9S30sJKEhZNjd6O`. Drive writes: `0`.

## BLOCKED_REQUIRED_INPUT / DEFERRED_FINALIZATION

Still unresolved:

- one card per family vs one shared card;
- actual gift/package/attachment method;
- whether names appear on front;
- final body length and relation to a read-aloud letter;
- final copy / signatures / forms of address;
- vertical vs horizontal writing if requirements change;
- paper stock, vendor template/profile, bleed/export settings;
- physical attachment and 100% print proof.

## Result

- clean-room independence: `PASS`
- sellable visual: `PASS`
- native semantic editability: `PASS`
- long-copy stress: `PASS`
- auto-height hardening: `PASS`
- family-safety / no fabricated facts: `PASS`
- legacy preservation: `PASS`
- Drive authority: `PASS`
- final family/use-case facts and physical proof: `BLOCKED_REQUIRED_INPUT / DEFERRED_FINALIZATION`
- print readiness: `NO`
