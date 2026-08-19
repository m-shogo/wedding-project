# Rurubu WEDDING V6 — GP Wedding Terminal Typography QA

Date: 2026-08-20
Scope: Rurubu WEDDING only
Figma: `bfM0d4c9dCeBv5pCkJ3TNM`

## Problem

Equal-scale review of the six preferred V6 spreads showed one highest-value defect in GO chronology: events 01→03→05 had clear editorial beats, but the final `06 / WEDDING` remained a small lower-left ending with a visually unused lower-right field. The ending read as incomplete rather than as the final destination of the spread.

## Hypothesis

The page did not need another photo, card, badge, or generated decoration. The existing factual/native terminal copy could carry more visual responsibility if it became one horizontal final-destination beat spanning the page. Because the copy would move closer to the page bottom, dynamic-copy tolerance had to be revalidated with a fresh realistic stress proof.

## Bounded test

Source preferred before test:

- GO `1958:2`;
- chronology page `1958:28`.

Rollback-safe candidate:

- GP `1961:2`;
- chronology page `1961:28`.

Changed only event 06 terminal treatment:

- `TEXT / WEDDING_TERMINAL_KICKER` → x `38`, y `940`;
- `DECOR / WEDDING_TERMINAL_YELLOW` → x `38`, y `966`, width `705`, height `5`;
- `TEXT / EVENT_NUM_6` → x `38`, y `980`, 52px;
- `TEXT / EVENT_DATE_6` → x `135`, y `995`, 11.5px;
- `STACK / EVENT_6_TITLE_COPY_AUTOHEIGHT` → x `270`, y `974`, width `300`;
- `TEXT / EVENT_TITLE_6` → 44px, native auto-height;
- `TEXT / EVENT_COPY_6` → 11.5px, native auto-height;
- event-6 stack primary-axis sizing → AUTO.

Unchanged:

- all photos and image hashes;
- Story page;
- events 01–05;
- event facts/date;
- fold guide;
- reader-facing copy above event 06.

## Visual QA

### Whole-item / thumbnail

500px whole spread: PASS.

GP reads more deliberately than GO because the page ends with a full-width terminal rhythm instead of a small left block plus unused right field.

### Reading scale

1200px whole spread: PASS.

`06 → 2026.10.24 → WEDDING → closing copy` reads as one final editorial beat without reintroducing a UI-like container.

### Actual size

Chronology page `1961:28`, `794×1123`: PASS.

Structure audit:

- visible native text: `32`;
- absolute text collisions: `0`;
- 18px safe-area risks: `0`;
- overflow: `0`.

## Dynamic-copy stress

Neutral method consumed: non-Rurubu shared learning requires a fresh realistic stress after moving dynamic native copy closer to a fixed physical boundary. No non-Rurubu layout, node, asset, palette, or production state was inspected or copied.

Hidden proof:

- root `1962:2`;
- chronology `1962:28`.

Stress copy:

`そして今日ここから、ふたりで選ぶ次の目的地へ向かって、新しい旅をゆっくり始めます。`

Result:

- closing body natural height: `28px`;
- absolute text collisions: `0`;
- 18px safe-area risks: `0`;
- overflow: `0`;
- actual-size `794×1123`: PASS.

Proof is preserved hidden after verification.

## Adoption / rollback

Adopted:

- `1961:2 / PREFERRED / V6_INSIDE_GP_WEDDING_TERMINAL_EDITORIAL_TYPO_2026_08_20`.

Rollback:

- `1958:2 / ROLLBACK / V6_INSIDE_GO_STORY_READER_FACING_MICROCOPY_2026_08_20` hidden.

Stress evidence:

- `1962:2 / QA_HIDDEN / V6_GP_EVENT6_LONG_COPY_STRESS_PASS_2026_08_20` hidden.

Start Here `845:27` updated to:

`V5 FU/FX · V6 GB + GN/GP + GE MEMORY SPOTS + GJ CAFE & TABLE + GD 1DAY PLAN · V7 HOLD`

## Asset lifecycle

- image generation: `0`;
- generated assets adopted: `0`;
- Drive saves: `0`;
- external binary placements: `0`;
- new image hashes: `0`;
- native text preserved: YES;
- replaceable photos preserved: YES;
- Drive V6 root reverified: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK`.

## Result

`VERIFIED_LOCAL / ADOPTED / ROLLBACK_SAFE / DYNAMIC_COPY_STRESS_PASS / V7_UNTOUCHED / NOT_PRINT_READY`
