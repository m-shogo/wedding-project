# Rurubu V8 AV Outer — content-owned destination deck QA

Date: 2026-08-22
Scope: Rurubu WEDDING only
Figma: `bfM0d4c9dCeBv5pCkJ3TNM`
Page: `2052:2 / 07_RURUBU_V7_V8_PRO_STUDIES`

## Fresh research input

New references in this run focused on cover art direction rather than repeating prior typography-only rules. PRINT's interviews/case studies on The New York Times Magazine and Metropoli emphasize that cover decisions should be driven by the specific story/theme and its essential language, not a generic magazine treatment. PRINT's Consumer Reports redesign case also distinguishes section-specific editorial jobs while retaining one shared publication vocabulary.

Local hypothesis: V8 Outer already has a strong `横浜` hierarchy, but the deck `写真、年表、好きな店、寄り道。読むたびに、その日の空気へ戻れる本。` remains generic enough to fit many travel/wedding books. The cover can gain destination specificity without decorative additions by letting actual content roles name the place experience.

## Bounded experiment

Control: Outer AP `2251:2`.
Candidate/current: Outer AV `2273:24`.

Only `FRONT_DECK` changed:

Before:
`写真、年表、好きな店、寄り道。 / 読むたびに、その日の空気へ戻れる本。`

After:
`海辺、街歩き、好きな店、夜の食卓。 / 横浜の一日を、ページに残す。`

The terms are already supported by current Rurubu content roles (waterfront/memory, city walk, cafe/table, 1DAY); no new factual date/person claim was invented. Existing ocean-light supporting master, masthead, `横浜` hierarchy, contents index, folio, colors and geometry were preserved.

## QA

- whole-item thumbnail 500px: PASS
- reading 1400px: PASS
- actual size 1587×1123: PASS
- visible native text: 12
- visible IMAGE: 1
- text intersections: 0
- 18px safe risk: 0
- parent page: `2052:2`
- AP preserved as hidden rollback

Professional critique:
- art direction: stronger cover idea because destination experience is named rather than implied generically;
- editorial: deck now complements the large `横浜` rather than restating a generic keep-book premise;
- book: no pacing/system change to the rest of V8;
- typography: two-line native Japanese remains stable at actual size;
- photo: no false claim that the abstract ocean-light master is Yokohama photography;
- print: geometry, safe area and existing physical assumptions unchanged.

## Failure learning

A first write attempt failed atomically because `TEXT.width` is read-only in this Plugin API path. No candidate survived that failed operation. The corrected method kept the existing text box geometry and shortened the copy to fit rather than mutating `width` directly.

Fingerprint: `F-RSL-222-FIGMA-TEXT-WIDTH-DIRECT-ASSIGNMENT-READONLY-IN-PLUGIN-PATH`.

Design learning: `RSL-223 CONTENT-OWNED-COVER-LANGUAGE-SHOULD-OUTRANK-GENERIC-PUBLICATION-PROMISE` — state `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`.

## Asset truth

No new Drive master and no new production Figma image placement were adopted by this experiment. The current ocean-light master remains supporting abstract imagery, not destination photography.
