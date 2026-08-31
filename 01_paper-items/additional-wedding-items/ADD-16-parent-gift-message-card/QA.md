# ADD-16 両親贈呈品メッセージカード — QA

Status: `CURRENT / V4_CLEANROOM_SELECTED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / STRUCTURE_QA_PASS / LONG_COPY_STRESS_PASS / PRINT_SAFE_TEXT_PASS / WRITING_SURFACE_PASS / LEGACY_PRESERVED / NOT_PRINT_READY`
Updated: 2026-08-31
Current authority: `docs/automation/non-rurubu-figma-quality-current.md`

## Selected V4 authority

The selected production direction is the blank-frame V4 `HOME PORT FOLIO`. Previous production / V2 / V3 / professional-vNext `HOME TEXTILE MAT` remain comparison and rollback history only; they are not V4 construction material or sellable-visual completion evidence.

- Figma file: `ylmVBbwNcnjueYrymNpa3c`
- page: `76:2 / V4 / ADD-16 / HOME PORT FOLIO / CLEANROOM / 2026-08-31`
- front: `76:3 / V4 / ADD16 / FRONT / HOME PORT FOLIO / BLEED 3MM`
- back: `76:17 / V4 / ADD16 / BACK / LETTER FIELD / BLEED 3MM`
- hidden front long-copy stress: `76:33`
- hidden back long-copy stress: `76:49`
- front variable native-text stack: `76:63`
- hidden stress variable native-text stack: `76:64`
- Drive authority: `1BOyETtL1_loGXNjGV9S30sJKEhZNjd6O / ADD-16_両親贈呈品メッセージカード`
- canonical evidence: `V4-CLEANROOM-HOME-PORT-FOLIO-QA-2026-08-31.md`

## V4 visual / structure result

`HOME PORT FOLIO` uses a quiet keepsake / ceremonial-folio direction: warm ivory, deep navy, muted mint, neutral silver-gray, Japanese-first gratitude hierarchy, and a meaningful origin-to-destination rule. It does not imitate passport / airline ticket / rail ticket / Rurubu grammar and does not use generic badge, sticker, web-card, generated-family, or stock-travel imagery.

All variable/factual copy remains Figma native text. Route/origin/writing rules are native vector/shape geometry. Editable SVG=`0`; generated/composed raster=`0`; replaceable image=`0`; IMAGE fills=`0`.

Final normal + stress structural readback:
- front visible text `6/6` auto-height; outside=`0`; overlap=`0`; unsafe text=`0`;
- back visible text `5/5` auto-height; outside=`0`; overlap=`0`; unsafe text=`0`;
- stress front `6/6` auto-height; outside=`0`; overlap=`0`; unsafe text=`0`;
- stress back `5/5` auto-height; outside=`0`; overlap=`0`; unsafe text=`0`.

During V4 QA, fixed-height text behavior, a long-recipient collision, and a date safe-area overrun were found and repaired before selection.

## Print-first authority

SPEC authority:
- trim: `100 × 148 mm portrait`;
- duplex front/back;
- bleed: `3 mm each edge`;
- safe: `8 mm minimum inward from trim`.

V4 geometry at `7 px/mm`:
- bleed canvas `106 × 154 mm = 742 × 1078 px`;
- trim `100 × 148 mm = 700 × 1036 px`, inset `21 px` from bleed edge;
- text-safe boundary begins `77 px` inward from bleed edge (`3 mm bleed + 8 mm safe`).

Approximate actual-size type:
- front hero `62 px ≈ 25.1 pt`;
- front message `28 px ≈ 11.3 pt`;
- recipient `26 px ≈ 10.5 pt`;
- signature/date `24 px ≈ 9.7 pt`;
- optional line `22 px ≈ 8.9 pt`;
- back hero `52 px ≈ 21.1 pt`;
- back body `27 px ≈ 10.9 pt`;
- writing label `20 px ≈ 8.1 pt`.

Three-scale QA: thumbnail / 3-second scan, reading scale, and native `742 × 1078 px` print-detail all PASS. Japanese hero remains first-read; no admin-card/template impression is present; long copy remains within the 8 mm safe boundary.

Raster IMAGE fills=`0`, therefore effective PPI=`N/A` and `RESOLUTION_WARNING=NONE` for this selected V4.

## Physical-use QA

The back retains a functional handwritten/signature surface with two restrained rules. Punch / fold / QR / perforation are not part of the selected primary 100 × 148 mm authority.

Still deferred:
- one card per family vs one shared card;
- actual gift/package dimensions, wrapping and attachment method;
- whether names appear on front;
- final recipient/body copy/signatures/forms of address;
- final paper stock/finish;
- real black-pen/pencil writing proof;
- physical package/ribbon/flower interference test;
- duplex registration proof.

## CMYK / production risk

Before `PRINT_READY`:
- deep navy must be proofed for shadow plugging and black construction;
- mint / silver-gray must be proofed for dulling and contrast loss;
- warm ivory must be checked against actual stock;
- small black/navy text must not use registration black;
- vendor profile/black recipe must not be guessed in Figma;
- PDF export, font embedding, transparency, overprint/knockout, preflight, 100% print proof / physical proof remain required.

`DESIGN_COMPLETE != PRINT_READY`.

## Result

`V4_CLEANROOM_SELECTED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / STRUCTURE_QA_PASS / LONG_COPY_STRESS_PASS / PRINT_SAFE_TEXT_PASS / WRITING_SURFACE_PASS / NOT_PRINT_READY`.
