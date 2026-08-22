# ADD-03 当日タイムテーブルボード — DAY 01 tab subtraction QA / 2026-08-23

State: `VERIFIED_LOCAL / CURRENT_POLISH_ADOPTED / SELLABLE_VISUAL_QA_PASS_MAINTAINED / NOT_PRINT_READY`

## Live authority

- latest `main` before Git write: `84cf4237db424ae1e5c32ba41fc412d5cf298004`
- Current authority: `docs/automation/non-rurubu-figma-quality-current.md` = `ACTIVE / HOURLY / FIGMA_EDIT_ALLOWED / VISUAL_REOPENED`
- Figma file: `woFUHUqZcvNkih8o42xeH4`
- Current A2: `14:2 / VNEXT_PRO_ADD03_DAY_BROADSHEET_A2_SELECTED`
- Current A3: `15:40 / VNEXT_PRO_ADD03_DAY_BROADSHEET_A3_SELECTED`
- long-copy proofs: `43:26 / 43:47`
- Drive authority: `1uVcXv2Xs0H7juheHk977pt7YxLMJez_j / ADD-03_当日タイムテーブルボード`
- Drive metadata live-readback: PASS; Drive writes `0`.

## Visible problem

The top-right yellow date tab duplicated the already-authoritative `2026.10.24 SAT / YOKOHAMA` line and added the generic English label `DAY 01`. It was not a trim/fold/binding/wayfinding function, and at whole-item scale it behaved like a decorative badge rather than useful timetable information.

This was a reader-facing editorial defect, not a structural failure: the underlying DAY BROADSHEET chronology remained strong.

## Bounded comparison

A rollback-safe A2 comparison was created:

- `47:2 / QA / VERIFIED / ADD-03 A2 / NO DAY-01 TAB / 2026-08-23`

Only `DATE_TAB` and `DATE_TAB_TYPE` were hidden. All confirmed dates/times, Japanese title, spine, rules, event labels, guidance and closing copy were unchanged.

The no-tab version was clearer at whole-item and reading scales: the Japanese headline and authoritative date line became the sole top hierarchy, while the timetable retained its printed-program character.

## Rollback / production change

Before mutation, hidden pre-change rollback copies were created for both sizes and both stress proofs:

- `47:23` — A2 Current rollback;
- `47:44` — A3 Current rollback;
- `47:66` — A2 long-copy rollback;
- `47:87` — A3 long-copy rollback.

Adopted change:

- A2 Current `14:2`: `DATE_TAB` + `DATE_TAB_TYPE` hidden;
- A3 Current `15:40`: same roles hidden;
- A2 stress `43:26`: same roles hidden;
- A3 stress `43:47`: same roles hidden.

The completed comparison was hidden after verification.

## Three-scale QA

- A2 whole/thumbnail: PASS;
- A2 reading / high-resolution: PASS;
- A3 native `990×1400`: PASS;
- A2 realistic long-copy stress: PASS after the same subtraction.

The removal does not affect ceremony/reception scanning, and no information is lost because the confirmed date/place remains native and prominent directly below the headline.

## Structure readback

After subtraction:

- A2 Current: visible native text `13`, fixed-height `0`, outside `0`, visible date-tab roles `0`, IMAGE fills `0`;
- A3 Current: visible native text `13`, fixed-height `0`, outside `0`, text bounding-box collisions `0`, visible date-tab roles `0`, IMAGE fills `0`;
- A2/A3 long-copy proofs: fixed-height `0`, outside `0`, visible date-tab roles `0`.

A2 geometry reports six bounding-box overlaps between each large time numeral and its adjacent event/guide text. Fresh screenshot inspection confirms these are pre-existing intentional side-by-side optical overlaps caused by wide text boxes, not visible glyph collisions and not a regression from the tab subtraction.

## Hybrid / asset decision

- variable/factual copy: native editable Figma text;
- chronology rules/spine: simple native geometry with real editorial function;
- removed tab: fixed decoration with duplicated information and no required physical function;
- generated imagery: `0`;
- SVG: `0`;
- Drive writes: `0`.

Image generation was not appropriate because imagery was not the quality bottleneck.

## Learning state

This run applies existing verified/project-wide principles rather than creating a new global style rule:

- generic/internal-looking English must have a real reader-facing job;
- a field/rule/badge must prove a binding or physical function at whole-item scale;
- subtraction is accepted only when hierarchy improves without losing function.

The exact yellow tab, typography, coordinates and DAY BROADSHEET treatment remain ADD-03-specific.

## Result

ADD-03 remains:

`CURRENT / DAY_BROADSHEET_SELECTED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / FAMILY_DIVERSITY_PASS / LONG_COPY_STRESS_PASS / AUTO_HEIGHT_PASS / ROLLBACK_SAFE / LEGACY_PRESERVED / NOT_PRINT_READY`.
