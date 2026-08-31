# ADD-11 写真共有 / QR案内サイン — QA

Status: `CURRENT / V4_MEMORY_WINDOW_SELECTED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / THREE_SCALE_QA_PASS / LONG_COPY_STRESS_PASS / STRUCTURE_QA_PASS / CLEANROOM_PROVENANCE_PASS / LEGACY_AND_PRIOR_VNEXT_PRESERVED / NOT_PRINT_READY`
Updated: 2026-08-31
Current authority: `docs/automation/non-rurubu-figma-quality-current.md`

## Current selected authority

- detailed V4 evidence: `FIGMA-V4-MEMORY-WINDOW-QA-2026-08-31.md`
- Figma file: `PWQ5ygJJt0IlOqj5ri5jng`
- V4 blank page: `72:2 / V4 / ADD-11 / MEMORY WINDOW / 2026-08-31`
- Current A5: `72:3 / CURRENT / V4 / ADD-11 / MEMORY WINDOW / A5` — `875×1240`
- Current A4: `72:9 / CURRENT / V4 / ADD-11 / MEMORY WINDOW / A4` — `1240×1754`
- hidden fresh long-copy stress: `74:19 / 74:36`
- exact Drive authority: `1wuxHEqby_0JWS0bYV0RWCTUotM88Mnxb / ADD-11_写真共有_QR案内サイン`
- Drive writes for V4: `0`

Previous `DARKROOM DEVELOPING TRAY`, `PHOTO LAB ENVELOPE`, `NIGHT ALBUM`, V2/V3 and legacy families remain preserved in Figma and Git history as comparison / rollback only. They are not construction bases for V4.

## V4 visual direction — MEMORY WINDOW

The selected V4 was created from a new blank page. It uses warm cream paper, a deep-cobalt side field, one large coral disc, a thin mint route with muted-gold tick, Japanese serif hero typography, and an independent white QR-paper role crossing the color boundary.

It deliberately avoids the retained darkroom-tray / rotated developing-print grammar and avoids generic card grids, dashboard-like grouping, fake film metadata, fake URLs, fake QR destinations, meaningless English badges and generated wedding photography.

Responsibility split:

- variable/final copy: native editable Figma text;
- sharing / privacy / retention / hashtag roles: native vertical Auto Layout;
- final QR: replaceable semantic white-paper role with native `[QR]` placeholder until final URL exists;
- fixed color fields / route / disc: native editable geometry;
- generated/composed raster: `0`;
- IMAGE fills: `0`;
- SVG dependency: `0`.

## QA result

Fresh screenshot QA:

- A5 thumbnail `353×500`: PASS;
- A5 reading `706×1000`: PASS;
- A5 native actual `875×1240`: PASS;
- A4 thumbnail `354×500`: PASS;
- A4 native actual `1240×1754`: PASS.

The first V4 screenshot exposed 10px-high Auto Layout parents clipping the header and information content. That defect was repaired before promotion. A second pass corrected an unintended Japanese hero wrap. Fresh long-copy stress then exposed weak information-lane wrapping, so the information lane was widened rather than shrinking type.

Final structural readback for A5, A4 and both stress roots:

- native text: `9` each;
- fixed-height text: `0`;
- text outside root: `0`;
- IMAGE fills: `0`.

Stress roots are hidden after verification.

## Print-first status

Working physical roles:

- A5 portrait `148×210 mm`, `875×1240 px`;
- A4 portrait `210×297 mm`, `1240×1754 px`.

No printer-authoritative bleed or safe geometry is currently available, so production `bleed / safe / printer profile` remain `DEFERRED_FINALIZATION`; no guessed 3mm production extension was added.

Approximate actual-size typography:

- A5: hero `22.1pt`, kicker `9.6pt`, lead `11.5pt`, info `10.1pt`, closing `11.5pt`, date `10.5pt`;
- A4: hero `29.8pt`, kicker `13.0pt`, lead/closing `15.4pt`, info `13.4pt`, date `14.4pt`.

QR reserve:

- A5 white QR paper ≈ `39.9mm` square;
- A4 white QR paper ≈ `56.7mm` square.

This reserve is not a scan proof. The final approved URL must be encoded, its true quiet zone preserved, then scanned at 100% physical size on iPhone / Android under likely venue conditions.

Raster effective PPI: `N/A`; `RESOLUTION_WARNING=NONE` because V4 has no raster IMAGE fill.

CMYK / physical risks still open:

- deep cobalt darkening / separation loss;
- coral hue/density shift;
- mint and muted-gold contrast on actual stock;
- warm cream interaction with paper white;
- deep-green text / final black construction;
- grayscale hierarchy;
- final A5/A4 installation choice;
- stand/frame/easel occlusion and glare;
- final sharing URL, privacy/permissions, retention/expiry and hashtag decision;
- PDF export, font embedding, transparency, overprint/knockout, preflight and 100% / physical proof.

Punch / fold / perforation / handwriting / sticker application: not applicable to current ADD-11 sign authority.

`DESIGN_COMPLETE != PRINT_READY` remains in force.