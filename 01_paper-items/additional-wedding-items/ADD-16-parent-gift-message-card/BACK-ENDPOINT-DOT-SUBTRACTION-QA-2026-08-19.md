# ADD-16 両親贈呈品メッセージカード — Back Endpoint-dot Subtraction QA

Status: `VERIFIED_LOCAL / ADOPTED / SELLABLE_VISUAL_QA_PASS_MAINTAINED`
Date: 2026-08-19
Start authority SHA: `45d4eb0c17945a5be197be1769536ad394141e17`

## Authority

- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Figma file: `ylmVBbwNcnjueYrymNpa3c`
- selected back: `18:14`
- hidden long-copy back: `18:37`
- Drive folder: `ADD-16_両親贈呈品メッセージカード`
- Drive ID: `1BOyETtL1_loGXNjGV9S30sJKEhZNjd6O`

The exact Drive authority was live-read before the Figma mutation. Drive writes: `0`.

## Visible problem

Front and back use the same quiet mint horizon device, but only the back still retained a rust `DECOR_ORIGIN_MARK` circle at the right endpoint of the line. The front endpoint dot had already been removed after independent QA because the remaining circle read like a slider/progress control once the decorative `HOME PORT` label was gone.

Fresh actual-size review of back `18:14` showed the same failure family: the line itself was sufficient to bind the long message body to the date/signature closure, while the isolated rust endpoint had no destination, trim, attachment, or handwriting role.

## Bounded test

A rollback-safe duplicate was created:

- `37:2 / QA / ADD16 / BACK / NO_ENDPOINT_DOT / 2026-08-19`

Only `DECOR_ORIGIN_MARK` was hidden. The horizon line, gratitude/message stack, optional travel line, date, signature and semantic handwritten area were unchanged.

The no-dot version was stronger at whole and actual-size scales: it kept the horizon as a quiet editorial binder without adding an interface-like terminal control.

## Adopted change / rollback

Before mutation:

- selected back rollback: `37:14 / ROLLBACK / ADD16 / BACK / PRE_ENDPOINT_DOT_SUBTRACTION / 2026-08-19`
- stress back rollback: `37:26 / ROLLBACK / ADD16 / BACK STRESS / PRE_ENDPOINT_DOT_SUBTRACTION / 2026-08-19`

Adopted:

- selected back `18:21 / DECOR_ORIGIN_MARK`: hidden;
- stress back `18:44 / DECOR_ORIGIN_MARK`: hidden;
- comparison `37:2`: hidden after adoption.

The mint `DECOR_HOME_PORT_ROUTE` remains visible.

## Three-scale / long-copy QA

- whole-item review: PASS;
- reading scale: PASS;
- selected actual-size `700×1036`: PASS;
- long-copy stress `18:37` actual-size `700×1036`: PASS after temporary reveal and re-hide.

Structure readback after adoption:

- selected visible native text: `6`;
- stress visible native text: `7`;
- IMAGE fills: `0 / 0`;
- outside visible text: `0 / 0`;
- text-to-text collisions: `0 / 0`;
- back endpoint dot visible: `false / false`.

No family facts, names, gift conditions or other unresolved content were invented.

## Result

`BACK_ENDPOINT_DOT_UI_SUBTRACTION_PASS / LONG_COPY_STRESS_PASS / ROLLBACK_SAFE / LEGACY_PRESERVED`

This is another item-local application of the already-promoted endpoint/checkpoint UI-subtraction rule; no new shared-learning entry is required.
