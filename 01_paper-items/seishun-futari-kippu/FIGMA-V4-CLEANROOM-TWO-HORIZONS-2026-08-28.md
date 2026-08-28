# 青春ふたりきっぷ — V4 Clean-room Two Horizons

State: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / V4_CURRENT_SELECTED / LONG_ROUTE_STRESS_PASS / PRINT_SIZE_READABILITY_HARDENED / LEGACY_PRESERVED / NOT_PRINT_READY`

Run latest-main before V4 build/promotion: `41eec3a87db43cfc8ff8ee486f45279d8d045782`; print-first re-audit start/read-before-write main: `57f562a0059f5924ee8dd0f7dd19021435bfe3ff`.

## Authority / scope

- Current: `docs/automation/non-rurubu-figma-quality-current.md` = `ACTIVE / HOURLY / FIGMA_EDIT_ALLOWED / VISUAL_REOPENED`
- image-generation-centered rule: `docs/design-learning/IMAGE-GENERATION-CENTERED-VISUAL-DESIGN-POLICY.md`
- Figma: `v7rIRHv8YKQXG0LYD0I5OA`
- promoted V4 page: `81:2 / CURRENT_V4_SEISHUN_FUTARI_2026_08_28`
- promoted root: `81:3 / CURRENT V4 / SEISHUN FUTARI / TWO HORIZONS`
- long-route proof: `81:21 / QA PASS / V4 / SEISHUN FUTARI / LONG ROUTE STRESS`, hidden after QA
- exact Drive authority live-confirmed: `1XpuRqck_yDmWI6NhwZFWkvxpS6mqH29J / 04_青春18きっぷ風_ミンティア用シール`
- no Rurubu item-specific content was read or modified

## Clean-room facts / constraints carried forward

V4 was created on a new blank page without using retained production/V2/V3/V5/vNext layout, palette, vectors, stamps, crop decisions, background treatment, or generated assets as construction reference.

Only non-visual requirements were carried forward:

- front-only MINTIA gift-label role;
- provisional physical mapping `720×250 ≈ 72×25mm`, still requiring real-case measurement;
- title `青春ふたりきっぷ`;
- subtitle `WEDDING JOURNEY TICKET`;
- route role, initially `新郎駅 → 新婦駅 → 未来行き`;
- confirmed date `2026.10.24`;
- no JR/operator logo/name or exact real-ticket reproduction;
- no real fare/validity/transport conditions or usable ticket authority;
- final print lock requires physical MINTIA measurement and 100% application proof.

A later item QA authority was re-read during the V4 build: `FIGMA-CLEANROOM-V5-FAKE-SERIAL-SUBTRACTION-QA-2026-08-20.md`. It establishes that `No.1024` is invented pseudo transport metadata rather than required fact. V4 therefore removed the issue number and its label rather than reviving the stale placement-plan field.

## V4 art direction — TWO HORIZONS

A materially new composition was created from blank:

- warm ivory reading field on the left;
- asymmetric deep marine diagonal field on the right;
- one vermilion journey curve and one restrained mineral support curve meeting at a small physical-looking junction point;
- large Japanese title and route stay on the quiet reading field;
- the real date sits alone in the dark field;
- no train icon, gate stamp, fake barcode, pseudo serial, badge catalogue, or operational railway metadata.

The design intentionally avoids imitating a railway ticket while preserving the emotional idea of two paths meeting and continuing forward.

## Hybrid-authoring split / FINAL MISSING ASSET LIST

- native editable text: subtitle, title, route, date;
- fixed art: newly authored editable composed SVG/vector field and curves;
- replaceable photography: `0`;
- raster IMAGE fills: `0`;
- variable facts baked into fixed art: `0`.

`FINAL MISSING ASSET LIST = 0 raster roles`.

The 72×25mm direction is fully served by editable type + simple composed vector art. A raster generation batch would add no justified hero/illustration/background role and would reduce editability at this tiny physical size.

## Evidence-driven corrections

### 1. Long-route collision

First stress proof used:
`[かなり長い出発地名] → [かなり長い行先名]`.

The first proof exposed two defects:

- low-priority phrase copy collided with the two-line route;
- route characters reached into the dark diagonal field, reducing contrast.

Corrections:

- removed the optional phrase instead of shrinking route copy;
- removed an invented filler note from the dark field;
- widened the cream reading zone by moving the diagonal-field boundary rightward;
- retained a readable route role with native height resize.

Post-fix long route remains two lines, entirely in the quiet field, with no collision.

### 2. Fake pseudo-metadata

Latest item QA says `No.1024` is not a required fact. V4 removed:

- `TXT_ISSUE_LABEL`;
- `TXT_ISSUE_NO`.

The freed dark-field space was left intentionally quiet rather than filled with replacement badge/stamp/pseudo-data.

### 3. Actual-size microtype

The nonessential tiny `DATE` label was removed. The factual date was strengthened from `24px` to `26px`; the decorative subtitle was strengthened from `16px` to `18px` during the initial V4 build.

### 4. Print-first actual-size hardening — 2026-08-29

A fresh print audit re-read the selected V4 live in Figma and treated the current `720×250 ≈ 72×25mm` mapping as a **provisional working scale only** until the real MINTIA application area is measured. At that scale `10 Figma units = 1mm`, so Figma font-size units convert to physical point size by approximately `px × 0.2835`.

The selected V4 was structurally valid but still had three physically weak reader-facing roles:

- subtitle `18px ≈ 5.10pt`;
- route `22px ≈ 6.24pt`;
- date `26px ≈ 7.37pt`.

The subtitle is decorative rather than critical, but at a 25mm-high label its previous size was too fragile for dependable offset/digital print reproduction. The route is primary semantic information and needed more physical confidence without competing with the title. The muted mineral support curve was also only `2 Figma units ≈ 0.2mm`, too close to a print-loss boundary for a low-contrast colored line.

Applied live Figma changes to production `81:3`:

- `81:10 / TXT_SUBTITLE`: `18 → 22px`, line-height `24 → 28px` (`≈6.24pt`);
- `81:12 / TXT_ROUTE`: `22 → 24px`, line-height `30 → 32px` (`≈6.80pt`);
- `81:15 / TXT_DATE`: `26 → 28px`, line-height `33 → 36px` (`≈7.94pt`);
- `82:17 / mineral support curve`: stroke `2 → 3` Figma units (`≈0.3mm`).

The exact same typography and support-curve changes were applied to hidden long-route proof `81:21` (`81:28`, `81:30`, `81:33`, `82:22`) so the stress proof did not become stale by testing easier/smaller typography than production.

Post-write live readback:

- production `81:3`: visible native text `4`, outside visible text `0`, IMAGE fills `0`, `clipsContent=true`;
- long-route proof `81:21`: visible native text `4`, route height `64px` across two lines, outside visible text `0`, IMAGE fills `0`;
- final visible support-curve minimum is now `3 units ≈0.3mm`; vermilion main curve remains `6 units ≈0.6mm`;
- raster assets remain `0`, therefore effective raster PPI is `N/A` and no `RESOLUTION_WARNING` is introduced.

Fresh production screenshot at native `720×250` confirms the stronger subtitle/route/date remain subordinate to the Japanese title and do not disturb the left-to-right reading order.

This is a print-readability hardening pass, **not** a geometry lock. The actual MINTIA case/application area, corner curvature, adhesive stock, cut tolerance, safe inset and real-case 100% proof are still unknown; production trim/bleed/safe geometry must not be guessed from the provisional 72×25mm mapping.

## Three-scale / actual-size QA

Fresh V4 screenshots:

- native `720×250`: PASS after print-size hardening;
- thumbnail `360×125`: existing hierarchy remains PASS;
- long-route structure proof: PASS after typography-equivalent update.

Reading order remains:
`subtitle → title → route → real date → fixed journey curves`.

The fixed art is subordinate to the title/route and does not create equal-card/web-UI grammar.

## Structure QA

Final live readback after print-first hardening:

Production `81:3`:

- size: `720×250`;
- visible native text: `4` (`subtitle/title/route/date`);
- title `40px ≈11.34pt`, route `24px ≈6.80pt`, date `28px ≈7.94pt`, subtitle `22px ≈6.24pt` under provisional 72×25mm scale;
- outside visible text: `0`;
- IMAGE fills: `0`;
- `clipsContent=true`.

Long-route proof `81:21`:

- visible native text: `4`;
- route height: `64px` after print-size correction;
- outside visible text: `0`;
- IMAGE fills: `0`.

## Completion-only legacy comparison

Only after V4 actual-size + long-route + structure QA passed was retained Current `68:2 / VNEXT_SELECTED_CANDIDATE / SEISHUN FUTARI / DATE PUNCH JOURNEY` opened.

Retained Current remains a valid rollback artifact, but it relies on a large `24` punch and broad cyan information band as its primary identity. V4 presents a more coherent small-format editorial object: title and route lead at both thumbnail and actual size, the real date is isolated without pseudo metadata, and the two-horizon path gesture gives the collectible object a specific idea without railway cosplay.

Decision: V4 clearly wins as the new selected direction. Legacy remains untouched.

## Drive / generated asset state

Drive authority was live-read and confirmed as folder `1XpuRqck_yDmWI6NhwZFWkvxpS6mqH29J / 04_青春18きっぷ風_ミンティア用シール` during the print-first re-audit. Existing visual assets were not opened/reused as V4 construction reference.

- image-generation candidates: `0`;
- adopted raster masters: `0`;
- Drive writes: `0`;
- effective raster PPI: `N/A`;
- reason: no missing raster/image role exists in the selected V4 composition.

## Learning

`VERIFIED_LOCAL`:

- stale placement specs can contain pseudo metadata superseded by newer sellable-artifact QA; latest item QA must win before V4 promotion;
- on a tiny label, removing lower-priority copy is better than shrinking the route below comfortable reading size;
- stress QA must check the visual background under wrapped text, not only root bounding boxes;
- leaving freed space quiet is preferable to replacing removed pseudo metadata with another badge/icon;
- small-label print QA must convert canvas typography to provisional physical point size rather than treating a visually clean native screenshot as proof of readability;
- low-contrast colored support rules around `0.2mm` should not be treated as robust final print detail without vendor proof; `0.3mm` is the safer current working minimum for this role;
- hidden stress proofs must be updated with production typography after actual-size hardening, otherwise their PASS is stale.

## Deferred / next

Keep `NOT_PRINT_READY` until the actual MINTIA application area is physically measured, final route wording is confirmed, stock/adhesive/finish and cutter tolerance are selected, exact trim/bleed/safe geometry is set from real measurements/vendor requirements, CMYK/profile and PDF preflight are complete, and a 100% print is applied to the real case.

`DESIGN_COMPLETE != PRINT_READY` remains enforced.

Next target: `ADD-01 ウェルカムボード` print-first re-audit from its current V4 authority; if blocked only by required real photography or final physical installation data, record the blocker and continue to the next safe item.
