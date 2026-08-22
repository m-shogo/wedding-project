# Rurubu WEDDING V7 — Memory+Guide G2 fixed display-title QA

Date: 2026-08-23
Scope: Rurubu WEDDING only
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Page: `2052:2 / 07_RURUBU_V7_V8_PRO_STUDIES`
GitHub main observed immediately before the Git write: `1cb060c049068cbc7b7253fdb985af8c3912f008`
State: `TESTED_LOCAL / STUDY CANDIDATE / NOT PREFERRED / NOT PRINT READY`

## Authority and scope truth

- V6 control remains `JC + IX + JB + IZ + IT + JA` and was not modified.
- V8 current remains `AV + AW + AL + AQ + AS + AT` and was not modified.
- WEDDING PASSPORT, BOARDING PASS, 青春ふたりきっぷ and ADD items were not touched.
- Live V7 six-role study coverage was re-read before this experiment. Memory+Guide G `2295:2` and Cafe+Table H `2296:2` exist in live Figma.
- PR #170, which records Memory G + Cafe H and the resulting six-role V7 study coverage, was verified mergeable and squash-merged before this evidence branch was created.
- Google Drive live search found `1fHt2rf5jvTWyjkmpGu3KhEgjQEiUNV6x / RURUBU_V7_HAWAII_PRO_CLEANROOM_2026-08-21`; its direct child listing returned no files during this run. No new Drive master was created here.

## Fresh professional knowledge used

Fresh Tokyo TDC 2026 research was used only as a decision input. Current Japanese type/editorial practice supports treating display lettering as an authored visual object whose geometry, restraint, ornament and Japanese letterform behavior can carry publication identity. The useful principle was not a specific underline/palette: **a fixed, short, identity-bearing heading can deserve a dedicated authored role, but only if it wins in its page context and exact editable source remains preserved.**

This was tested on Memory+Guide because its editorial job differs materially from the previously tested Outer, Island Picks/1DAY, Story and Cafe roles.

## Baseline

Live source spread:
- `2295:2 / V7 PRO STUDY G / HAWAII POP EDITORIAL / MEMORY+GUIDE / CLEANROOM / TESTED_LOCAL / STRUCTURAL PHOTO DUMMIES / 2026-08-23`.

Baseline left-page title:
- `2295:4 / TEXT / V7 MEMORY TITLE`;
- exact wording: `場所より先に、\n記憶が戻ってくる。`;
- native Noto Sans JP Bold.

The baseline was already structurally sound. This test was not intended to “fix bad typography”; it tested whether the fixed Memory opener could carry stronger V7 publication identity without turning into decorative noise or flattening the page.

## Candidate

- `2299:2 / V7 PRO STUDY G2 / HAWAII POP EDITORIAL / MEMORY+GUIDE / FIXED DISPLAY TITLE / TESTED_LOCAL / 2026-08-23`;
- parent readback: `2052:2`;
- source G `2295:2` remains untouched.

Inside G2:
- the cloned native title is retained hidden for rollback;
- exact editable title source is preserved separately as `2299:34 / SOURCE / V7 MEMORY FIXED DISPLAY TITLE / EDITABLE`;
- source text remains native Japanese:
  - `場所より先に、`
  - `記憶が戻ってくる。`;
- bounded accents use one coral lead and one yellow tail; these are V7-specific art direction, not a reusable recipe;
- source was exported at 4×;
- exported PNG byte length: `48,055`;
- placed fixed role: `2299:39 / FIXED PNG / V7 MEMORY DISPLAY TITLE / 4X / SOURCE PRESERVED`;
- image hash: `f310f1b1cd9521f6752f2f0b6d1792358c127921`;
- page is not flattened;
- body, sensory copy, guide numbers, labels, captions and folios remain native text.

## Three-scale visual QA

Candidate `2299:2`:
- whole-item / 500 px: **PASS** — the left opener gains a clearer authored entry without overpowering the right-side guide or looking like a sticker/banner.
- reading / 1400 px: **PASS** — exact Japanese wording, two-level title rhythm and bounded accents remain legible; the guide keeps a separate information job.
- actual-size / 1587×1123: **PASS** — no accidental Japanese wrap, raster break, title collision or fold intrusion was visible.

Professional critique:
- art director: PASS — the title now has a deliberate V7 identity role rather than merely being a larger text block;
- editorial designer: PASS — reading order remains `03/記憶 → title → dominant photo → sensory memory`; the right guide remains independent;
- book designer: PASS WITH CAUTION — this increases theme+variation, but identical lockup grammar must not be repeated across every spread;
- typographer: PASS — exact editable Japanese source is preserved and no orphan punctuation/one-character break was introduced;
- photo editor: unchanged / not final — all visible photos remain structural dummies and are not Hawaii truth;
- print designer: comparison PASS only — the fixed role has 4× raster headroom, but printer template, final physical size, color/preflight and proof remain unresolved.

## Structure QA

Readback after visual QA:
- visible native text: `22`;
- visible image-fill roles: `6` = five structural photo dummies + one fixed display title;
- unintended text-box intersections: `0`;
- 18 px text safe-area risks: `0`;
- editable source `2299:34`: hidden and preserved on parent `2052:2`;
- fixed graphic `2299:39`: visible under candidate `2299:2`;
- fixed image hash readback matches `f310f1b1cd9521f6752f2f0b6d1792358c127921`;
- candidate parent readback: `2052:2`.

## Asset truth

- image-model generation: `0`;
- new Drive master: `0`;
- new Figma-authored fixed display graphic: `1`;
- preserved editable source: `1`;
- final Hawaii photography adopted: `0`;
- all five visible photos remain explicitly structural dummies / NOT FINAL HAWAII;
- V6/V8 changes: `0`.

## Decision

`TESTED_LOCAL`.

G2 strengthens RSL-227 on another materially different Rurubu page role. It does **not** promote the visual treatment itself into a rule, does not make G2 preferred/final, and does not prove V7 stronger than V6/V8. V7 now has six-role study coverage, but final Hawaii photography and winner proof remain open truth gates.
