# Rurubu V8 AW10 — Profile/Q&A Long-Copy Resilience QA

Date: 2026-08-25
Scope: Rurubu WEDDING only
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Authority page: `2052:2 / 07_RURUBU_V7_V8_PRO_STUDIES`

## Starting point

AW9 `2550:2` had just been promoted as the V8 Profile current after replacing its generic object still-life with verified shared-couple Hawaii `036.jpg` screen evidence. Current unresolved answers remained short native `回答待ち` placeholders.

The next question was not visual polish but whether AW9 was actually ready for realistic future Japanese answer lengths.

## Consumed prior learning

- RSL-266 from V7 Profile: short truth-safe placeholders can conceal variable-copy wrap fragility.
- NRSL-001 from the neutral non-Rurubu feed was consumed only as a QA-method hypothesis: after a meaningful spatial/content change involving variable copy, rerun fresh realistic stress. No non-Rurubu item-specific layout, palette, nodes, Drive paths or production state were inspected or copied.

## Synthetic stress is NOT factual content

A rollback-safe AW9 stress `2553:2` replaced only unanswered fields with clearly synthetic Japanese test strings. These strings were used solely to expose layout behavior and are not couple facts.

The first stress exposed a serious hidden weakness:

- `P_A_ANSWER` and `P_B_ANSWER` were only `220×32`, `textAutoResize=NONE`;
- their current `回答待ち` strings fit, but realistic answers visually overflowed the fixed boxes;
- the SHOGO answer ran behind/into the nearby verified-couple photo even though simple bounding-box collision QA reported no overlap because the text node itself remained only 32px tall;
- Q1/Q2/Q3 answer measures also produced poor Japanese semantic wraps, including split phrase boundaries and a weak final `い。` orphan in Q3.

This proves a production lesson: API geometry can say “no collision” while rendered glyph overflow from a fixed-height text node is visibly broken. Screenshot QA remains mandatory.

The failed stress was preserved as:

- `2553:2 / REJECTED QA STRESS / V8 AW9 / SYNTHETIC LONG COPY / FIXED-SHORT-ANSWER-BOX OVERFLOW / HIDDEN`
- `x=312000 / visible=false`.

## AW10 bounded correction

Created AW10 `2555:2` from AW9 and changed only variable-copy geometry.

Person-answer roles:

- SHOGO answer `2555:27`: `220×32 → 270×90`
- SHI-CHAN answer `2555:30`: `220×32 → 350×90`
- verified-couple photo `2555:35`: y `535 → 585`
- reader-facing closing note `2555:9`: y `806 → 850`

Q&A answer measures:

- Q1 answer `2555:15`: `270 → 295` width
- Q2 answer `2555:19`: `300 → 330` width
- Q3 answer `2555:23`: `560 → 620` width

No factual/current copy, font size, palette, Q&A questions, imageHash or publication identity changed.

The verified shared-couple image remains:

- imageHash `c80602f1881db70f3a005651f982a0f38b294a9d`
- Figma intrinsic `350×233`
- high-resolution placement still blocked.

## AW10 synthetic stress

Stress frame: `2555:36`.

The same synthetic answers were applied after the geometry changes.

The first AW10 stress already fixed the left-page answer/photo collision, but the right-page Q1–Q3 measures still produced weak phrase breaks. A second bounded measure adjustment (`295 / 330 / 620`) was therefore made before final acceptance.

Final stress result:

- whole-item / 500px: PASS;
- reading / 1400px: PASS;
- Japanese semantic line breaks materially improved;
- visible native text `20`;
- text-text intersections `0`;
- 18px edge risks `0`;
- Japanese→Inter mismatch `0`.

The stress is retained hidden as:

- `2555:36 / VERIFIED QA STRESS / V8 AW10 / SYNTHETIC LONG COPY / NOT FACT / HIDDEN`
- `x=310000 / visible=false`.

## AW10 production-copy QA

Current production copy remains `回答待ち` and was independently reviewed after the geometry change:

- whole-item / 500px: PASS;
- reading / 1400px: PASS;
- actual-size / 1587×1123: DESIGN QA PASS;
- visible native text `20`;
- text intersections `0`;
- 18px edge risks `0`;
- Japanese→Inter mismatch `0`;
- parent `2052:2`.

The wider/taller answer reserves do not create obvious empty UI-like boxes because there are no visible containers; they simply provide a more resilient native-text measure.

## Professional critique

- Art director: PASS — AW10 remains the same restrained profile idea; no new decorative module was introduced.
- Editorial designer: PASS — current reading order is unchanged; realistic future copy no longer collides with the human-evidence beat.
- Book designer: PASS — the page remains quiet with more credible future-content capacity.
- Typographer: PASS — Japanese answer measure is materially more robust under stress; no type-size reduction was needed.
- Photo editor: DESIGN PASS / HIRES BLOCKED — photo role is unchanged and truth-safe, but still a screen derivative.
- Print designer: DESIGN STRUCTURE PASS / FINAL BLOCKED — final answers, high-resolution image placement, printer template and physical proof remain outstanding.

## Promotion

AW10 promoted:

- `2555:2 / V8 CLEANROOM AW10 / ... / CURRENT / ... / HIRES-PHOTO-BLOCKED`
- `x=1800 / y=8500 / parent=2052:2 / visible=true`.

AW9 preserved:

- `2550:2 / ROLLBACK / V8 AW9 / PROFILE+Q&A / PRE-VARIABLE-COPY-RESILIENCE / HIDDEN`
- `x=302000 / visible=false`.

AW8 remains the earlier hidden rollback at `x=300000`.

Final page-level readback after promotion:

- V7 current remains `C8 + K8 + F4 + G9 + H11 + C6E`;
- V8 current becomes `AV5 + AW10 + AL5 + AQ7 + AS8 + AT6`;
- all 12 current roots parent `2052:2`;
- all current roots visible;
- pairwise current-root overlap `0`.

## Learning state

RSL-266 reproduced independently in a materially different Rurubu system:

`F-RSL-266-SHORT-PLACEHOLDER-HIDES-VARIABLE-PROFILE-COPY-WRAP-FRAGILITY`

State strengthened to:

`VERIFIED_LOCAL_MULTI-SYSTEM → CROSS_ITEM_CANDIDATE`

The transferable lesson is the QA method and judgment, not AW10's dimensions. Short placeholders are not evidence of future variable-content readiness. Use rollback-safe language-specific synthetic stress, screenshot truth, and bounded measure/space correction before claiming robustness.

## Truth boundary

AW10 does NOT guarantee arbitrary answer lengths. Final actual answers still require fresh REAL CONTENT QA. Synthetic test strings must never leak into production. AW10 remains NOT PRINT READY.
