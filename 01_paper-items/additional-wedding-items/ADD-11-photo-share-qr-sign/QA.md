# ADD-11 写真共有 / QR案内サイン — QA

Status: `DESIGN_QA_PASS_WITH_PLACEHOLDERS / ROLLBACK_SAFE / NOT_PRINT_READY`
Date: 2026-08-09

## Current production authority

- Start main SHA for this production run: `7f4aecf272bbff1d83d385ad8d67a4c627a39b20`
- Current authority: `docs/automation/non-rurubu-figma-quality-current.md` = `ACTIVE / HOURLY / FIGMA_EDIT_ALLOWED`
- Figma file: `ADD-11 写真共有・QR案内サイン`
- Figma file key: `PWQ5ygJJt0IlOqj5ri5jng`
- Figma URL: `https://www.figma.com/design/PWQ5ygJJt0IlOqj5ri5jng`
- Drive folder: `ADD-11_写真共有_QR案内サイン`
- Drive folder ID: `1wuxHEqby_0JWS0bYV0RWCTUotM88Mnxb`

## Production frames

- `1:31` — `ADD11_A5_TABLETOP` — 875 × 1240
- `1:45` — `ADD11_A6_MINI` — 620 × 875
- `3:2` — `ADD11_A4_POSTER` — 1240 × 1754 independent poster reflow

A5 is the primary tabletop direction from the original specification. A4 was added as the specified larger reflow candidate and is not a proportional scale-up. A6 is a smaller neutral derivative for near-field placement only; final adoption depends on installation needs.

## Highest-value design decision

The sign must never fabricate a scannable QR code or imply that an unconfirmed sharing destination is authoritative. Production therefore uses a deliberately non-scannable native placeholder named `QR_PLACEHOLDER_FINAL_LINK_REQUIRED`. The real QR remains a finalization boundary.

The visual direction is Japanese-first editorial signage rather than a web/card UI:

- Noto Serif JP headline with Japanese copy as the first hierarchy;
- restrained `PHOTO SHARING` kicker and date as secondary metadata;
- one narrow teal edge and one hairline only;
- controlled asymmetric composition with the QR role separated from the instruction flow;
- no rounded cards, pills, badges, fake transport data, gradients, shadows, QR-like decoration, stock icons, or generated people;
- all variable copy remains native editable text.

## Rollback evidence

Before material refinement the initial A5/A6 production was duplicated to `99_QA`:

- `2:2` — `QA_ADD11_A5_PRE_REFINEMENT_2026_08_09`
- `2:16` — `QA_ADD11_A6_PRE_REFINEMENT_2026_08_09`

The first long-copy QA exposed a real structural weakness in the fixed-position intro/instruction region. The production was then refactored rather than cosmetically nudged.

## Structural refinement

The variable copy sequence `INTRO_JA → HAIRLINE → STEP_LABEL → STEPS_JA` now lives in native vertical auto-layout containers:

- A5: `2:59` — `CONTENT_FLOW_VARIABLE_COPY`
- A6: `2:60` — `CONTENT_FLOW_VARIABLE_COPY`
- A4: `3:12` — `CONTENT_FLOW_VARIABLE_COPY`

This ensures longer final explanatory copy pushes later roles downward instead of overlapping them.

## Screenshot QA

### Whole / reading scale

A5 and A6 post-refinement screenshots confirm:

- Japanese headline remains dominant;
- date and kicker read as quiet metadata;
- QR placeholder is visually obvious without resembling a valid QR;
- footer/date collision from the initial draft was removed by moving the date to the upper-right metadata position;
- privacy/public-scope placeholder and QR instruction remain visually separated;
- negative space is intentional rather than empty web-hero space.

A4 poster reflow screenshot confirms the larger format keeps the same semantic language while using a wider text measure, larger typography, and a different QR/text spatial relationship instead of proportional scaling.

### Actual-size/detail

The A5 QR role was inspected at its native 310 × 310 size. It contains only `QR CODE` plus `[確定リンク待ち · LAYOUT DUMMY]`; no fake finder patterns or scannable modules exist.

## Long-copy stress QA

QA-only stress frames created from the auto-layout production:

- `2:61` — `QA_ADD11_A5_LONG_COPY_STRESS_V2_2026_08_09`
- `2:76` — `QA_ADD11_A6_LONG_COPY_STRESS_V2_2026_08_09`

Stress copy expanded:

- the main photo/video sharing explanation;
- sharing/public-scope operational text;
- QR instruction text.

Structural readback reports `overflowCount=0` for both stress frames. The A6 stress screenshot shows the intro block reflowing vertically without colliding with `HOW TO SHARE` or the three steps.

## Structure QA

### A5
- 875 × 1240, `clipsContent=true`
- 10 native text nodes
- image fills: 0
- `CONTENT_FLOW_VARIABLE_COPY` layout: `VERTICAL`, item spacing 24
- visible overflow: 0

### A6
- 620 × 875, `clipsContent=true`
- 10 native text nodes
- image fills: 0
- `CONTENT_FLOW_VARIABLE_COPY` layout: `VERTICAL`, item spacing 16.8
- visible overflow: 0

### A4
- 1240 × 1754, `clipsContent=true`
- 10 native text nodes
- image fills: 0
- `CONTENT_FLOW_VARIABLE_COPY` layout: `VERTICAL`, item spacing 30
- visible overflow: 0

No flatten/raster replacement was introduced. All variable text remains native and editable.

## Drive QA

- Drive folder live metadata readback: `PASS`
- Drive changes this run: `0`
- Reason: the design needs no new raster asset, and the real QR must not be created until the authoritative destination URL exists.

## BLOCKED_REQUIRED_INPUT

These are required only for final adoption/export and do not block progression to ADD-12:

- authoritative photo-sharing destination URL;
- confirmed sharing service/account ownership;
- final public/private access scope;
- upload/view permission model;
- access expiration or retention period;
- final privacy / guest-consent wording;
- final installation format selection among A5/A4 and whether A6 is needed.

## DEFERRED_FINALIZATION

After the authoritative URL and access policy are fixed:

- generate the real QR from that exact destination;
- verify encoded URL against the authority source;
- confirm QR quiet zone in final artwork;
- scan on iPhone and Android;
- perform 100% physical-size scan proof;
- test low light and oblique angle readability;
- confirm printer bleed/template/profile and safe area;
- confirm stand/frame interference at the venue;
- export final PDF and store final deliverables in the registered Drive folder.

## Result

- Specification QA: `PASS`
- Figma production creation: `PASS`
- Whole / reading / detail visual QA: `PASS_WITH_PLACEHOLDERS`
- Long-copy structural QA: `PASS`
- Native editability: `PASS`
- Rollback evidence: `PASS`
- Drive authority readback: `PASS`
- Physical / device scan proof: `NOT_RUN`
- Print-ready: `NO`
- Completion state: `DESIGN_QA_PASS_WITH_PLACEHOLDERS`

The real QR and final print data remain intentionally deferred until the authoritative URL and access policy are available.