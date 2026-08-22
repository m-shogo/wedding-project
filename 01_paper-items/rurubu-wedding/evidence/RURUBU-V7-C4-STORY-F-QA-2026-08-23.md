# Rurubu WEDDING V7 — C4 fixed inside title + Story/Chronology F QA

Date: 2026-08-23
Scope: Rurubu WEDDING only
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Page: `2052:2 / 07_RURUBU_V7_V8_PRO_STUDIES`
GitHub main observed before writes: `4f52da9cae2fd412783b34e6b5e14586d0c90b3e`
State: `TESTED_LOCAL / STUDY CANDIDATES / NOT PREFERRED / NOT PRINT READY`

## Authority and scope truth

- V6 control remains untouched.
- V8 current remains untouched.
- WEDDING PASSPORT, BOARDING PASS, 青春ふたりきっぷ and ADD items were not inspected or modified.
- V7 Drive authority folder: `1dxEJ5fTLIh03-9or1DXG_mwRajzJXJNR / RURUBU_V7_HAWAII_EDITORIAL_2026-08-21`.
- Direct folder listing during this run returned no child files. No final Hawaii photo master was available there.

## Fresh professional research used

This run deliberately moved away from the recent Tokyo-TDC/JLREQ-heavy research cycle and looked at travel/editorial practice from a different angle.

### POPEYE / Magazine House

The current Magazine House recruiting material describes POPEYE production as a multi-disciplinary page-making process involving writers, photographers, designers and proofreaders, while the editor remains responsible for whether the idea is clear to the reader and whether the information is correct.

An older POPEYE editor note about the West Coast issue explicitly says the issue became exceptionally information-dense because the subject itself produced that much worthwhile material; even the art director reached the limit of how much could fit. The useful principle is **density should be earned by content, not simulated with decorative modules**.

### 38Hours / travel-cover typography

magCulture's 38Hours cover analysis describes travel identity being carried through typography and colour with a sense of local knowledge, rather than generic destination decoration. The useful principle for Rurubu V7 is **fixed travel display type can carry editorial/place identity when its treatment is content-owned and survives thumbnail competition**.

### New York Times Magazine travel issue

magCulture's NYT Magazine travel-issue analysis describes strong photography working inside a clear, strict editorial structure, with variation in scale and detail rather than unnecessary complication. The useful principle for V7 Story is **photo-led energy does not require every page to have identical density; a strict structure can support deliberately uneven visual beats**.

No surface styling from these publications was copied.

---

# Experiment A — V7 Island Picks + 1DAY C4 fixed display title

## Baseline

Source spread:
- `2055:32 / V7 PRO STUDY C / HAWAII POP EDITORIAL / ISLAND PICKS + 1DAY / STRUCTURAL PHOTO DUMMIES / TYPOGRAPHY QA`

The left cobalt field used ordinary native title text:
- `ふたりで叶える、\n4つのごほうび。`

The spread already had strong photo/number hierarchy, but the title behaved as a small ordinary text block relative to the V7 high-energy travel-magazine direction.

## Candidate

- `2286:2 / V7 PRO STUDY C4 / HAWAII POP EDITORIAL / ISLAND PICKS+1DAY / FIXED DISPLAY TITLE / TESTED_LOCAL / 2026-08-23`
- parent: `2052:2`
- visible comparison candidate; baseline remains untouched.

Editable source:
- `2286:36 / SOURCE / V7 ISLAND PICKS FIXED DISPLAY TITLE / EDITABLE`
- hidden after export
- exact Japanese source preserved
- source size: `270×182`

Placed fixed title:
- `2286:41 / FIXED PNG / V7 ISLAND PICKS DISPLAY TITLE / 4X / SOURCE PRESERVED`
- final image hash: `b117664119fd4d87edfc4c76e0b49df4b38a2099`
- placement: `270×182`
- generated inside Figma from the exact editable source at 4×
- page was not flattened.

Reader-facing variable/service text and the deck remain native text.

## Failure and correction sequence

### Japanese punctuation/orphan failure

The first title raster attempted `4つのごほうび。` at 45 px inside a 258 px source box. Thumbnail QA exposed an orphan final punctuation/line break.

Correction:
- switched to a deliberate semantic display break: `4つの\nごほうび。`;
- reflowed the native deck below the fixed role;
- checked again at thumbnail and reading scale.

### Hidden-source export failure

After editing the source, it remained `visible=false` when `exportAsync()` was called. The export returned only `149 bytes`; the placed title became visually empty.

This failure was caught immediately at the next screenshot gate. The same approach was not repeated.

Method switch:
1. keep editable source hidden during normal canvas state;
2. immediately before export set the exact source frame `visible=true`;
3. export at 4×;
4. require a non-trivial byte-length guard before adoption;
5. immediately restore `visible=false`;
6. create the image from the verified bytes and replace the candidate image fill.

Verified corrected export:
- bytes: `31,757`;
- final hash: `b117664119fd4d87edfc4c76e0b49df4b38a2099`.

The unowned coral decorative point was also removed after reading-scale critique. The yellow baseline remains as the only bounded title accent.

## C4 three-scale QA

- whole-item / 500 px: **PASS** — title has materially more ownership without turning the page into a card/banner UI.
- reading / 1400 px: **PASS** — exact Japanese title remains legible; native deck, photo and title maintain separate jobs.
- actual-size / 1587×1123: **PASS** — no visible raster/text break, no title collision.

Structural readback:
- visible native text: `24`;
- unintended text-box intersections: `0`;
- 18 px text safe-area risks: `0`;
- hidden original native title inside candidate preserved for rollback;
- hidden editable source preserved;
- fixed image hash read back successfully.

Decision: `TESTED_LOCAL`. This strengthens RSL-227 with a second inside-spread role but does not make the exact underline, size or palette a reusable recipe.

---

# Experiment B — V7 Story + Chronology F clean-room spread

## Live six-role gap discovered

A Plugin-API inventory of `2052:2` showed that the current V7 study page did **not** contain a full six-role set despite older narrative reports suggesting completion. Before this run the current study page had live V7 evidence for:

- Outer/Cover;
- Profile+Q&A;
- combined Island Picks + 1DAY.

No live V7 Story+Chronology, Memory+Guide or Cafe+Table root existed on this current study page.

Therefore this run did not continue pretending V7 was six-role complete. It created the missing Story+Chronology role from a blank frame.

## Factual-copy boundary

Only factual/editorial copy was inherited from V8 Story current as content truth. V8 composition, crop decisions, grid geometry and visual identity were not copied.

Inherited factual timeline:
- 2019 — 出会う — `まだ旅の名前はなかった。`
- 2021 — 暮らす — `同じ景色を毎日見る。`
- 2024 — 約束 — `これからの予定が増えていく。`
- 2026 — 結婚式 — `今日を、次の旅の起点にする。`

## Candidate

- `2290:4 / V7 PRO STUDY F / HAWAII POP EDITORIAL / STORY+CHRONOLOGY / CLEANROOM / TESTED_LOCAL / STRUCTURAL PHOTO DUMMIES / 2026-08-23`
- parent: `2052:2`
- size: `1587.4×1123`

Composition was authored from a blank frame:
- dominant photo-led left opener;
- cobalt editorial title field;
- cream lower story field with a secondary photo beat;
- right chronology without a UI timeline rail;
- intentionally unequal year weights (`2019` and `2026` major, `2021` and `2024` supporting);
- no cards, pills, badges, generic shadows, arbitrary rotations or decorative English.

## Fixed story-title role

Editable source:
- `2290:35 / SOURCE / V7 STORY FIXED DISPLAY TITLE / EDITABLE`
- exact fixed wording preserved:
  - `旅の途中で、`
  - `ふたりになった。`
- hidden after export.

Placed fixed title:
- `2290:39 / FIXED PNG / V7 STORY DISPLAY TITLE / 4X / SOURCE PRESERVED`
- final image hash: `7169f05eaaed092b588e2608efa7c157a482bced`
- page not flattened.

The first reading-scale render exposed an accidental `た。` orphan in `ふたりになった。`; font size and source geometry were corrected until the complete phrase stayed together. A second Japanese-orphan issue in the pull quote was also caught and corrected before acceptance. These are evidence that rasterized fixed copy still requires normal Japanese semantic line-break QA.

## Photo truth

All three visible photos remain **STRUCTURAL PHOTO DUMMIES / NOT FINAL HAWAII**. Existing V7 image hashes were recomposed only for layout responsibility tests:

- opening dummy: `e3738476f760932bb5b09c9d60f174dd6c84049d`;
- secondary dummy: `439a719d73f28e8dd2889f2026cccb15f345ec63`;
- chronology dummy: `c1ada11205bc3978bf426b304d683f1c1566cac2`.

They are not claimed as Hawaii assets and do not satisfy real-content QA.

## Story F three-scale QA

- whole-item / 500 px: **PASS** — V7 remains visibly photography/colour-led while Story intentionally breathes more than the denser guide spread.
- reading / 1400 px: **PASS** — hierarchy reads as opener → story → uneven chronology, not as dashboard rows.
- actual-size / 1587×1123: **PASS** — Japanese display/body copy remains legible and the fold is not used as a text gutter.

Structural readback:
- visible native text: `24`;
- unintended text-box intersections: `0`;
- 18 px text safe-area risks: `0`;
- unintended one-character line-end candidates: `0`;
- visible image roles: `4` total = three explicit structural photo dummies + one fixed title graphic;
- editable title source preserved hidden.

Decision: `TESTED_LOCAL / STUDY CANDIDATE`. It is not preferred/final because final Hawaii-specific photography does not exist and the complete V7 six-role system is still unfinished.

---

# Current V7 six-role truth after this run

Live current-study coverage on `2052:2`:

1. Outer/Cover — present; C2 `2282:2` is a tested fixed-title comparison candidate, original `2055:2` preserved.
2. Profile+Q&A — present; `2059:50` visible structural-dummy study.
3. Story+Chronology — now present as tested clean-room F `2290:4`.
4. Memory Spots/Guide — **missing as a V7 current-study role**.
5. Cafe+Table/Food — **missing as a V7 current-study role**.
6. 1DAY Plan/Model Course — present inside `2055:32`; C4 `2286:2` is the tested fixed-title comparison candidate.

Therefore V7 is currently **4/6 comparable roles represented in live current-study Figma**, not 6/6. Memory+Guide and Cafe+Table are the next required production roles before any V6/V7/V8 winner selection.

# Asset lifecycle truth for this run

- external/image-model generation: `0`;
- new Drive master: `0`;
- V7 Drive folder child files observed: `0`;
- new Figma-composed fixed display graphics: `2` (C4 title + Story title);
- new clean-room spread: `1` (Story+Chronology F);
- final Hawaii photography adopted: `0`;
- V6/V8 changed: `0`.

No candidate in this file is print-ready. Printer template, final content, effective image resolution, color/preflight and physical proof remain separate truth gates.