# ADD-13 — Actual-size factual date legibility QA

Date: 2026-08-22
State: `VERIFIED_LOCAL / CURRENT_RETAINED / ACTUAL_SIZE_MICROTYPE_REPAIRED / ROLLBACK_SAFE`
Authority: `docs/automation/non-rurubu-figma-quality-current.md`
Start main observed immediately before this evidence write: `f47e2f77160be200803076d33e74424c4535e3ad`

## Live authority

- Figma file: `8ad7bEPAc8I88gs1JxsWhe`
- Current front: `52:72 / CURRENT / FAMILY-DIVERSE / ADD13 / FRONT / RESORT DESK LETTER`
- Current back: `52:91 / CURRENT / FAMILY-DIVERSE / ADD13 / BACK / CHECKOUT NOTE`
- hidden realistic long-copy stress: `52:109 / 52:128`
- hidden pre-change rollback: `53:2 / 53:21`
- Drive authority verified live: `1Md8oCMsw4F9tZjQueNmQQ2dYR1I7JwZl / ADD-13_Message_Card`
- Drive write: `0`
- generated assets: `0`

## Visible / physical problem

The live design remained visually strong and preserved its >=55% handwriting surface, but physical-size conversion exposed the same defect class independently seen in ADD-12: the factual date was too small relative to the real A6 landscape artifact.

The canvas is `1400 px` wide for a verified physical width of `148 mm`.

Before repair:

- front date `52:80`: `20 px` ≈ `2.11 mm / 5.99 pt`;
- back date `52:98`: `19 px` ≈ `2.01 mm / 5.69 pt`.

Those values can look acceptable in a zoomed Figma screenshot but are fragile for a reader-facing factual date after print/output variability.

## Bounded repair

No title, prompt, handwriting rules, paper edges, folded-corner cue, family metaphor, copy, or handwriting geometry changed.

Only the native factual date role changed:

- Current front `52:80`: `20 px → 26 px`;
- Current back `52:98`: `19 px → 26 px`;
- stress front `52:117`: `20 px → 26 px`;
- stress back `52:135`: `19 px → 26 px`.

At the verified A6 width, `26 px` maps to approximately `2.75 mm / 7.79 pt`.

Complete hidden rollback copies were created first:

- `53:2 / ROLLBACK / ADD-13 FRONT / PRE-DATE-LEGIBILITY 2026-08-22`
- `53:21 / ROLLBACK / ADD-13 BACK / PRE-DATE-LEGIBILITY 2026-08-22`

## Screenshot QA

Post-change native screenshots at `1400×993`:

- front: PASS — date becomes clearly factual rather than ornamental microtype and remains subordinate to writing content;
- back: PASS — date remains quiet but materially easier to read;
- existing handwriting area and long-rule structure remain unchanged.

No new visual competition with the name role or writing rules was introduced.

## Structure readback

Final current/stress readback:

- Current front: native text `6`, fixed-height `0`, outside-root text `0`, IMAGE fills `0`;
- Current back: native text `6`, fixed-height `0`, outside-root text `0`, IMAGE fills `0`;
- stress front/back: fixed-height `0`, outside-root text `0`, IMAGE fills `0`;
- all four date roles remain `textAutoResize=HEIGHT`.

The Current root IDs and canonical names were preserved. The pre-change pair remains hidden rollback evidence.

## Decision

`CURRENT_RETAINED / ACTUAL_SIZE_DATE_LEGIBILITY_PASS`.

The `RESORT DESK LETTER / CHECKOUT NOTE` visual direction remains selected; this was a print-legibility hardening pass, not another redesign.

## Learning

This independently reproduces `FACTUAL_MICROTYPE_LOOKS_FINE_ON_SCREEN_BUT_IS_TOO_SMALL_AT_PHYSICAL_SCALE` in a second materially different artifact after ADD-12.

The transferable lesson is **not** a universal 8 pt minimum. Typeface, contrast, print method and semantic importance still matter. The verified process is to convert Figma pixel geometry to the known physical artifact size, identify factual microtype that has drifted into screen-only sizing, make a bounded enlargement, and re-run actual-size + stress structure QA.