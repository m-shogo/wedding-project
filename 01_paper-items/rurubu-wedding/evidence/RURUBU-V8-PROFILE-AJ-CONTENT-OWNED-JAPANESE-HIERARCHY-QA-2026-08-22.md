# Rurubu WEDDING V8 — Profile AJ content-owned Japanese hierarchy QA

Date: 2026-08-22
Status: `VERIFIED_LOCAL / CURRENT_CANDIDATE_PROMOTED / NOT_GLOBAL_WINNER / NOT_PRINT_READY`
Figma: `bfM0d4c9dCeBv5pCkJ3TNM`
Page: `2052:2 / 07_RURUBU_V7_V8_PRO_STUDIES`
Current root after promotion: `2235:2 / V8 CLEANROOM AJ / BOOK EDITION / PROFILE+Q&A / CONTENT-OWNED JAPANESE ROLE HIERARCHY / CURRENT / 2026-08-22`
Rollback: `2215:2 / ROLLBACK / V8 PROFILE Z / ANSWER-OWNED VOICE / HIDDEN / 2026-08-22`

## Fresh professional research used as hypotheses

1. IDEA No.339 — Takeo Nakano is described as treating book design as not only graphic but editorial, designing from the fundamental structure; Yuri Suyama describes the relationship between book designer and reader as part of designing.
   - https://www.idea-mag.com/en/idea_magazine/339/
2. IDEA DOCUMENT Letter and Typography — includes work on Japanese mixed with Latin alphabet, reinforcing that Japanese/Latin mixture is an editorial typesetting decision rather than neutral decoration.
   - https://www.idea-mag.com/en/books/ideadocument_lettersandtypography/
3. IDEA No.381 — includes `Hardcore of Editing = Design`, reinforcing the working hypothesis that editorial hierarchy should originate in editing/content role rather than stylistic display alone.
   - https://www.idea-mag.com/en/idea_magazine/381/

These are research observations/hypotheses, not copied layouts or promoted project rules.

## Observed defect in Profile Z `2215:2`

The right Q&A page had already improved by letting actual answers own more visual weight. The left page still used very large Latin `SHOGO / SHI-CHAN` names as the main visual mass, while the actual reader-relevant contrast — `旅先でまず歩く人 / 旅先でまず食べる人` — remained subordinate.

At thumbnail scale this read closer to a clean type specimen / portfolio profile than an authored Japanese editorial page. The problem was not English itself; it was a hierarchy mismatch between semantic ownership and visual weight.

Normalized failure fingerprint:

`F-RSL-214-LATIN-NAME-DISPLAY-MASS-OUTWEIGHS-THE-ACTUAL-EDITORIAL-PERSONALITY-DIFFERENCE`

## Root-cause hypothesis

A minimalist page can remain AI/template-like even after cards and pseudo-editorial decoration are removed when visually dominant typography is assigned to the easiest available identifier rather than the content carrying the editorial idea.

## Rollback-safe bounded test

Duplicate Z into candidate `2235:2`, preserving the whole right Q&A page and all factual/semantic content. On the left page only:

- demote Latin names into small identity furniture: `SHOGO / 01`, `SHI-CHAN / 02`;
- promote the existing factual personality roles into Japanese display typography:
  - `旅先では、\nまず歩く。`
  - `旅先では、\nまず食べる。`
- retain small `歩く人。 / 食べる人。` support labels;
- tighten the closing copy to the non-redundant existing idea `違うテンポで、\n同じ街を楽しむ。`;
- add no image, card, badge, shadow, gradient, sticker or invented biographical claim.

## Failure found during QA

The first candidate passed visual inspection but structural QA found a 4px text-box overlap between `P_NOTE` and `P_CAP`.

Repair:

- move `P_NOTE` upward from y=830 to y=806;
- rerun structural QA rather than accepting a visually invisible collision.

This is consistent with the existing collision-evidence boundary: screenshot appeal does not override structure QA.

## Three-scale result

- ~500px whole spread: PASS — Japanese personality roles remain legible and clearly differentiated; the page no longer depends on oversized Latin names for editorial energy.
- ~1000px reading scale: PASS — the left-page reading order is `Profile title → SHOGO role → SHI-CHAN role → shared closing`; the right Q&A remains intact.
- 1587×1123 actual-size: PASS — Japanese display line breaks are intentional (`旅先では、 / まず歩く。`, `旅先では、 / まず食べる。`); no one-character accidental tail was observed.

## Structure readback after repair

- visible native text: `23`
- visible IMAGE fills: `0`
- same-parent text intersections: `0`
- 18px safe-area risk: `0`
- parent page: `2052:2`
- whole-page flattening: `0`

## Professional critique

- Art direction: PASS — one clear idea, the couple's contrasting travel behavior, owns the page.
- Editorial design: PASS — identifier and editorial content are no longer confused.
- Book design: PASS locally — the quiet V8 system is preserved while the Profile role becomes more specific.
- Japanese typography: PASS for controlled current copy; semantic wrap check remains required if copy changes.
- Photo editing: N/A for this treatment; no unrelated image was added to simulate richness.
- Print design: structural/safe-area pass only; printer template, effective PPI, PDF preflight and physical proof remain separate gates.

## Comparison decision

AJ is locally stronger than Z for V8 because it transfers visual ownership from generic identifier typography to the actual editorial personality difference without adding decoration or false content.

This does not make V8 the global winner. V6 remains the stronger control for immediate destination/travel desire because of its photographic atmosphere.

## Asset truth

- new image-model generation: `0`
- new Drive master: `0`
- new production image placement: `0`
- V6/V7 image reuse: `0`
- Drive V8 authority remains `1IKYF-YI6EbEe7qQCVQjClztpQA8CoRIo`

## Learning state

`RSL-214 VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

Transfer only the decision method: when display typography dominates, verify that its visual weight belongs to the actual editorial idea rather than merely the easiest identifier. Do not transfer AJ's coordinates, sizes, copy, palette, name treatment or V8 visual system to another item without local testing.
