# ADD-01 ウェルカムボード — V4 Clean-room Open Door

State: `V4_CLEANROOM_CREATED / VISUAL_QA_IN_PROGRESS / LONG_COPY_STRESS_PASS / STRUCTURE_QA_PASS / REAL_PHOTO_REQUIRED / NOT_PROMOTED / NOT_PRINT_READY`

Run start latest-main SHA before ADD-01 V4 write: `2f7a02f7c4b0dcea5d1bb85bf94d47e48a55143a`.

## Authority / scope

- Current: `docs/automation/non-rurubu-figma-quality-current.md` = `ACTIVE / HOURLY / FIGMA_EDIT_ALLOWED / VISUAL_REOPENED`
- Figma: `XyyTGuz6BMf8XRhPZZfdoT`
- V4 page: `24:2 / V4_CLEANROOM_ADD01_WELCOME_2026_08_28`
- V4 root: `24:3 / V4 / ADD-01 / OPEN DOOR / CLEANROOM`
- long-copy proof: `26:2 / QA PASS / V4 / ADD-01 / LONG COPY STRESS`, hidden after QA
- exact Drive authority live-confirmed: `1UT-s_z2KOnzNeq9cluqJ_Uxh-xDzO6Kg / ADD-01_ウェルカムボード`
- no Rurubu item-specific content was read or modified

## Clean-room facts / constraints

V4 was started on a new blank Figma page. Retained production `1:3`, V3 `19:3`, its layout, photo crop, arcs, filler English, decoration and prior generated assets were not used as construction reference.

Only semantic/non-visual requirements were carried forward from latest item QA:

- welcome-board poster role;
- provisional `852×1200` working canvas while final A2/A3 physical choice remains unresolved;
- confirmed event date `2026.10.24`;
- location role `YOKOHAMA`;
- couple-name role remains native editable text;
- message/subcopy remains native editable text;
- hero must be the actual couple photograph, never an AI-generated likeness;
- final promotion requires the real photo and completion-only comparison with retained production.

## V4 art direction — OPEN DOOR

The clean-room direction is a Japanese-first asymmetrical poster:

- warm paper base;
- large Japanese `ようこそ。 / 旅の一日へ` first read on the left;
- one tall right-side real-photo window as a stable replaceable role;
- date/location/couple/message create a vertical editorial sequence rather than equal cards;
- lower-left coral physical-field gesture with dark/mineral journey lines leading toward the photo edge;
- no generic wedding gradients, cards, badges, transport icons or decorative fake metadata.

The first screenshot exposed `WELCOME` as non-semantic English filler. It was removed immediately and the Japanese title/date/name/message rhythm was tightened upward. No replacement badge or filler was added.

## Hybrid authoring / FINAL MISSING ASSET LIST

- native editable text: title/subtitle/date/location/couple/message;
- fixed visual: editable composed SVG/native geometry;
- replaceable photo role: `24:9 / PHOTO / COUPLE / REPLACEABLE / REAL_PHOTO_REQUIRED`, `310×930`;
- raster IMAGE fills: `0`;
- generated bride/groom replacement: prohibited.

### Missing asset

`REAL_COUPLE_PHOTO`

- status: `BLOCKED_REQUIRED_INPUT`;
- final current working placement: `310×930px` inside provisional `852×1200` poster;
- stable mask/clip role already exists;
- AI generation allowed: `false`;
- reason: the hero is documentary identity content and must use an authoritative real couple photograph.

No decorative raster-generation role is currently justified. The fixed atmosphere is adequately served by editable vector geometry; generation would not solve the true blocker.

## First visual QA

Fresh `852×1200` screenshot after filler subtraction:

- Japanese title is the clear first read;
- photo role is visually dominant but remains structurally separate from text;
- date/location/name/message remain dark native copy on stable paper;
- the lower fixed-art gesture creates movement without functioning as a generic web-card or decorative sticker layer;
- no real-photo comparison is claimed because the placeholder is not final content.

## Long-copy stress / structure QA

V4-only proof `26:2` was created without opening or cloning retained production.

Stress used:

- `[非常に長い新郎氏名] × [非常に長い新婦氏名]`;
- `YOKOHAMA / [長い会場名プレースホルダー]`;
- a realistic multi-line Japanese thank-you/message block.

Fresh screenshot result: PASS.

- long venue copy wraps naturally below the factual date;
- long couple names wrap to two lines without colliding with the message or photo role;
- long message remains fully inside the stable paper reading field;
- no text crosses into the photo window or lower fixed-art edge.

Live structure readback:

Production `24:3`:

- `852×1200`;
- visible native text `7`;
- fixed-height text `0`;
- outside visible text `0`;
- IMAGE fills `0`.

Stress `26:2`:

- `852×1200`;
- visible native text `7`;
- fixed-height text `0`;
- outside visible text `0`;
- IMAGE fills `0`.

Stress proof was renamed `QA PASS` and hidden after verification.

## Current structure / print state

- production root remains provisional `852×1200`;
- final A2/A3 choice, bleed/safe area and installation method remain unresolved;
- photo window is a proper clipped replaceable frame;
- page flattening: `0`;
- no variable copy is baked into fixed art.

## Decision / next

`NOT_PROMOTED`.

V4 now has `LONG_COPY_STRESS_PASS + STRUCTURE_QA_PASS`, but the hero remains intentionally unresolved because an authoritative real couple photo is required.

Next high-value work:

1. locate/select the authoritative real couple photograph when available;
2. place it non-destructively into `24:9` and verify crop/focal point;
3. run whole / reading / actual-size poster QA with the real photo;
4. only then open retained production for completion comparison and promote V4 only if it clearly wins.

Keep `NOT_PRINT_READY` until final A2/A3 dimensions, printer bleed/safe area, output profile and physical installation proof are known.
