# ADD-06 フォトブースサイン — Reopened Visual QA — 2026-08-10

Authority at write: GitHub latest `main` = `30162442dada80e95f8e29824a43ee5026c77bfb`; `docs/automation/non-rurubu-figma-quality-current.md` status `VISUAL_REOPENED`.

## Live authority

- Figma file key: `SVMALDUyhc2chxHa4fvdjx`
- page: `ADD-06_PHOTO_BOOTH_SIGN`
- production: `1:2 / FRAME_ADD06_A3_PORTRAIT`
- Drive folder: `ADD-06_フォトブースサイン` / `1Ehk_oQ8vhAGo3DYBbgyOGfA03u0pu5wb`
- RURUBU/るるぶ area was not read or written.

## Reopened visual diagnosis

The prior production remained structurally valid but failed the reopened sellable visual gate. Its hierarchy was dominated by a large `PHOTO / SPOT` title, one English subtitle, a single note line and a mostly empty ivory field. At thumbnail and reading scale this looked like a sparse generic editorial template rather than a differentiated physical photo-booth sign.

The earlier `DESIGN_QA_PASS_WITH_PLACEHOLDERS` remains useful only for structural facts such as native text, frame size and safe-area behavior; it was not reused as sellable-visual proof.

## Clean-room comparison

Created:

- section: `3:2 / QA_ADD_06_REOPENED_CLEANROOM_2026_08_10`
- candidate: `3:3 / QA_ADD_06_PHOTO_BOOTH_V2_EDITORIAL`

Art direction:

- Japanese-first title `旅の記憶を、ここで一枚。` in native `Noto Serif JP` rather than an oversized generic English-only hero;
- deep-navy physical rail and restrained rust rule to form a strong print-object edge;
- a four-frame contact-sheet / film-strip motif on the right, built from native vector rectangles rather than camera clip-art, fake UI or generated stock imagery;
- asymmetric editorial hierarchy with the copy field offset from the photo strip;
- final location and booth instructions remain explicit native semantic placeholders;
- no airplane, passport stamp, badge, pill, gradient, shadow, fake QR, fake guest photo, or AI-generated person.

The first candidate screenshot exposed real copy collisions caused by title reflow and placeholder/prompt ordering. These were corrected in the same run by reducing/reflowing the Japanese title and separating kicker, prompt, and placeholder into independent vertical bands before approval.

## Image-generation decision

`IMAGE_GEN_UNAVAILABLE_THIS_RUN`.

No generated asset was claimed or saved. The visual bottleneck could be materially improved with native typography and a meaningful photographic print motif, so the run continued instead of blocking on image generation. Drive writes: `0`.

## Visual comparison decision

Compared with legacy production at whole-item/thumbnail scale, reading scale and full `990 × 1400` working size. V2 clearly wins because it no longer relies on empty space or a generic English hero; the photo-specific contact-sheet motif gives the item a real role while the Japanese title and asymmetric print structure create a more sellable stationery/sign composition.

## Rollback-safe promotion

Immediately before promotion, the legacy production was duplicated exactly:

- rollback section: `3:29 / ROLLBACK_ADD_06_PRE_REOPENED_EDITORIAL_2026_08_10`
- rollback frame: `3:30 / ROLLBACK_FRAME_ADD06_A3_PORTRAIT_PRE_V2`

Production frame ID `1:2` was preserved while its contents were replaced by the approved clean-room design.

## Post-promotion screenshot QA

Fresh production screenshot of `1:2` confirms:

- Japanese title is fully legible with no collisions;
- `PHOTO BOOTH` kicker is subordinate rather than decorative hero copy;
- prompt and placeholder are separated and readable;
- four contact-sheet windows have consistent rhythm without becoming web cards;
- navy rail and rust accents remain controlled at thumbnail scale;
- date/location footer remains clear and inside the frame;
- no clipping or unintended overlap is visible.

## Post-promotion structure readback

`1:2 / FRAME_ADD06_A3_PORTRAIT`:

- size: `990 × 1400`
- `clipsContent=true`
- native text count: `11`
- IMAGE fills: `0`
- text outside frame: `0`
- hidden `GUIDE_SAFE`: `3:64`, `910 × 1320`, retained
- variable/location/booth copy remains native editable text
- all visual motif elements remain native vectors/rectangles

Rollback `3:30` remains intact with the prior five native text nodes, zero IMAGE fills, zero text outside frame, and its hidden safe guide.

## Status

- structural: `DESIGN_QA_PASS_WITH_PLACEHOLDERS / ROLLBACK_SAFE / NATIVE_EDITABLE_PASS / ACTUAL_SIZE_QA_PASS`
- reopened visual: `SELLABLE_VISUAL_QA_PASS`
- combined: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / NOT_PRINT_READY`

## Deferred finalization

`DEFERRED_FINALIZATION`:

- final physical board/paper stock and printer profile;
- actual booth installation distance/height and lighting conditions;
- final booth instructions and exact location wording;
- any real-photo insertion decision for the contact-sheet windows;
- 100% physical print proof.

These do not block progression.

## Next

Proceed to ADD-07 エスコートカード案内ボード for reopened visual-art-direction audit.
