# Rurubu WEDDING V7 K4 — Profile variable-copy reserve QA

Date: 2026-08-25
Scope: Rurubu WEDDING only
Figma: `bfM0d4c9dCeBv5pCkJ3TNM`
Authority page: `2052:2 / 07_RURUBU_V7_V8_PRO_STUDIES`

## Why this test exists

K3 correctly truth-gated unresolved profile data as `回答待ち`, but that made the current layout deceptively easy to fit. The replaceable profile-value boxes were still sized around short placeholders rather than verified against plausible Japanese production-length values.

New research input:
- JAGAT treats line length, line spacing and type size as readability conditions rather than purely visual decoration.
- Pentagram's *No Man's Land* describes a cohesive editorial framework as needing enough flexibility to hold materially different content while preserving publication identity.
- Neutral shared-learning input `NRSL-001` already verified outside Rurubu that a spatial decision involving variable copy requires a fresh copy-stress test. This was consumed only as a QA-method hypothesis; no non-Rurubu production layout or coordinates were inspected or copied.

## Baseline stress — K3

Rollback-safe stress root: `2496:2`.

Synthetic stress strings were explicitly marked `SYNTHETIC NOT FACT`; they do not represent the couple. Under K3 field widths, reading-scale QA showed:
- `趣味` wrapped awkwardly near the end of the phrase;
- `好きなもの` left a final single-character fragment on the next line;
- `チャーム` also produced a weak final-line fragment.

This is a variable-copy readiness defect, not a request to invent real answers.

## K4 bounded change

Candidate root: `2497:2`.

Only the six replaceable profile-value text-box widths changed:
- 出身地: `175 → 190`
- 誕生日: `150 → 170`
- 趣味: `340 → 370`
- 休日: `300 → 320`
- 好きなもの: `310 → 390`
- チャーム: `150 → 280`

No copy, font, font size, y-position, photo, crop, palette, Q&A hierarchy, card, badge, shadow or decorative asset changed.

Stress evidence root: `2497:50`.

The first K4 stress pass still produced a weak one-character final line in `チャーム`; the field was then widened `250 → 280` before promotion. This correction was re-tested rather than accepted from the first pass.

## QA

K4 current-copy candidate:
- 500px whole-item: PASS; visually equivalent to K3 because current placeholders are short.
- 1400px reading/page: PASS.
- 1587×1123 actual-size/detail: DESIGN QA PASS.
- visible native text: `26`
- text-text intersections: `0`
- 18px edge risks: `0`
- Japanese text assigned to Inter: `0`
- parent: `2052:2`

K4 synthetic stress:
- 500px: PASS.
- 1400px: PASS after the charm-width correction.
- text-text intersections: `0`
- 18px edge risks: `0`
- Japanese text assigned to Inter: `0`
- stress strings remain synthetic QA evidence only.

## Promotion

- K4 `2497:2` → CURRENT at `x=15900 / y=13000`.
- K3 `2491:2` → hidden rollback at `x=300000`.
- K4 stress `2497:50` → hidden QA evidence at `x=308000`.

State: `VERIFIED_LOCAL / REAL-CONTENT-BLOCKED`.

This does **not** mean arbitrary future copy lengths are guaranteed. When real profile data arrives, rerun actual-content and long-copy QA. Q&A answers are still unresolved and were not fabricated for this test.

## Professional critique

- Art director: PASS — no visible styling was added merely to accommodate uncertainty.
- Editorial designer: PASS — the information architecture is unchanged while replaceable fields gain realistic tolerance.
- Book designer: PASS — no new module or visual tempo was introduced.
- Typographer: PASS — semantic phrases survive the tested Japanese line lengths more cleanly.
- Photo editor: unchanged; all current imagery retains its existing truth state.
- Print designer: DESIGN QA only; printer template and physical proof remain blocked.

## Asset truth

- image generation: `0`
- Drive writes: `0`
- new Drive masters: `0`
- new Figma image hash: `0`
- final photography adoption: `0`
- V6 changes: `0`
- V8 production changes: `0`
