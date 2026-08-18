# ADD-16 両親贈呈品メッセージカード — QA

Status: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / CLEANROOM_V3_SELECTED / HOME_PORT_MICROCOPY_SUBTRACTION_PASS / OPEN_HANDWRITTEN_AREA_POLISHED / HANDWRITTEN_HELPER_LABEL_HIDDEN / LONG_COPY_STRESS_PASS / AUTO_HEIGHT_HARDENED / LEGACY_PRESERVED / ROLLBACK_SAFE / NOT_PRINT_READY`
Updated: 2026-08-19
Current authority: `docs/automation/non-rurubu-figma-quality-current.md`

## Current selected authority

The older production `1:2 / 1:13` is retained legacy / rollback history for the reopened clean-room program. The selected current design is clean-room V3 `HOME HORIZON`.

Canonical evidence:

- `FIGMA-CLEANROOM-V3-HOME-HORIZON-QA-2026-08-17.md`
- `OPEN-HANDWRITTEN-SIGNATURE-AREA-QA-2026-08-18.md`
- `HANDWRITTEN-LABEL-VISIBILITY-RECONCILIATION-2026-08-19.md`
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

The optional handwritten-signature role on the back uses an open paper field instead of a complete visible rectangle. The semantic `260×120` writing-area geometry remains in Figma with visible stroke `0`; the internal helper label `自筆署名欄（任意）` is hidden from the guest-facing paper. Editability is preserved without printing a form-like box or production note.

## Decorative English microcopy subtraction — 2026-08-18

Fresh whole-item review of selected front `18:3` found `META / ORIGIN / HOME PORT` printed directly beneath the mint horizon line. The line + rust origin mark already communicates the fixed origin/home metaphor, while the tiny English label added generic travel-template flavor without reader-facing information.

Rollback-safe comparison:

- `30:2 / QA_ADD16_FRONT_NO_HOME_PORT_MICROCOPY_2026_08_18`;
- only visible `HOME PORT` microcopy was hidden;
- horizon line, rust origin mark, recipient, gratitude headline, optional metaphor, date and signature roles were unchanged.

The subtraction was stronger at whole-item scale: the metaphor remains readable through the Japanese copy and fixed graphic, while the page loses an unnecessary decorative English label.

Before selected-family mutation, hidden rollback copies were saved:

- `30:13 / ROLLBACK_ADD16_FRONT_PRE_HOME_PORT_SUBTRACTION_2026_08_18`;
- `30:24 / ROLLBACK_ADD16_FRONT_STRESS_PRE_HOME_PORT_SUBTRACTION_2026_08_18`.

The same fixed microcopy visibility change was applied to hidden front stress `18:26` so QA evidence matches selected production.

Result: `HOME_PORT_MICROCOPY_SUBTRACTION_PASS`.

## Handwritten helper-label reconciliation — 2026-08-19

Fresh live readback found the durable QA text lagging behind the selected Figma state:

- `18:24 / AREA_HANDWRITTEN_SIGNATURE`: visible semantic `260×120` geometry, stroke count `0`;
- `18:25 / META / HANDWRITTEN / 自筆署名欄（任意）`: `visible=false`;
- `18:23 / TXT_COUPLE_SIGNATURE`: visible native `[ふたりの署名]`.

No Figma mutation was required. The guest-facing paper was already correct; this QA file was reconciled so it no longer claims that the internal helper label is visible/retained on the printed surface.

Result: `HANDWRITTEN_HELPER_LABEL_HIDDEN / AUTHORITY_RECONCILED`.

## Structure / long-copy QA

### Selected front `18:3`

- working size: `700×1036`
- IMAGE fills: `0`
- visible text outside root: `0`
- native recipient / gratitude / optional metaphor / date / signature roles retained.

### Selected back `18:14`

- working size: `700×1036`
- IMAGE fills: `0`
- visible text outside root: `0`
- message body remains native auto-layout so approved Japanese copy can grow without a fixed-height raster/text block;
- `AREA_HANDWRITTEN_SIGNATURE`: `260×120`, visible stroke `0`, semantic geometry retained;
- internal helper label `META / HANDWRITTEN / 自筆署名欄（任意）`: hidden;
- guest-facing native signature role `[ふたりの署名]`: visible/editable.

Hidden stress `18:26 / 18:37` uses long recipient, multi-paragraph gratitude body, longer optional metaphor and long couple-signature strings. Existing actual-size evidence remains valid because the 2026-08-18 front change only hides fixed decorative microcopy and does not reduce any variable-copy geometry.

Later structural hardening removed nominal fixed-height native-text boxes while preserving the selected composition and stress result.

## Legacy / family-safety boundary

Legacy `1:2 / 1:13` remains untouched and is not the selected-current editing target.

Do not invent family composition, names, forms of address, episodes, dates/memories, gift type or attachment conditions. Final copy must be checked against the actual family/use case and any read-aloud letter.

## Image / Drive decision

`IMAGE_GENERATION_NOT_REQUIRED_FOR_THIS_ITEM`.

The item is text/emotion-led. Adding generated family/photo imagery would add identity/provenance risk without solving a current visual defect. Live Drive metadata on 2026-08-19 matched `1BOyETtL1_loGXNjGV9S30sJKEhZNjd6O`, parent `0ADXt8irGMFGnUk9PVA`. Drive writes: `0`.

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
- decorative English microcopy subtraction: `PASS`
- native semantic editability: `PASS`
- open handwritten-signature area: `PASS`
- guest-facing handwritten helper label hidden: `PASS`
- long-copy stress: `PASS`
- auto-height hardening: `PASS`
- family-safety / no fabricated facts: `PASS`
- legacy preservation: `PASS`
- Drive authority: `PASS`
- final family/use-case facts and physical proof: `BLOCKED_REQUIRED_INPUT / DEFERRED_FINALIZATION`
- print readiness: `NO`
