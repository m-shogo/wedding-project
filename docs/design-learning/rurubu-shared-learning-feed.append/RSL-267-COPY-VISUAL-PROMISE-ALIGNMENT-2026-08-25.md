# RSL-267 — Editorial copy should not promise missing media interaction

Source scope/item: Rurubu WEDDING / V8 Story+Chronology
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`
Fingerprint: `F-RSL-267-EDITORIAL-COPY-PROMISES-MISSING-MEDIA-INTERACTION`

## Visible problem

V8 Story AL4 `2434:36` contained no visible photography, yet its intro explicitly said `写真をめくりながら、出会った頃から今日までをたどる。` The wording made the page sound like a photo-led reading experience that did not exist in the live composition.

## Root-cause hypothesis

Support copy was being used to simulate a richer editorial medium instead of describing the page's actual reader experience. In restrained book design, this creates a subtle authenticity defect even when the typography itself is strong.

## Professional research observation

Fresh research rotated to Japanese book-design/editorial thinking. IDEA No.387 discusses book design through the boundary and relationship between words, figure and form; IDEA No.381 frames editing itself as a design act. The useful decision principle is not a literal layout treatment: words and visual structure must form one truthful editorial system.

## Bounded test

On rollback-safe AL5 `2500:2`, only the second sentence of `L_INTRO` changed:

- before: `写真をめくりながら、出会った頃から今日までをたどる。`
- after: `出来事をたどりながら、出会った頃から今日までを振り返る。`

No layout geometry, chronology copy, type size, rule, image, crop, color or decoration changed.

## Evidence

- 500px whole-item: PASS
- 1400px reading/page: PASS
- 1587×1123 actual-size/detail: DESIGN QA PASS
- native text `23`
- visible IMAGE fill `0`
- text intersection `0`
- 18px edge risk `0`
- Japanese→Inter mismatch `0`
- page-level current-root overlap `0`

Figma:
- AL5 current `2500:2`
- AL4 hidden rollback `2434:36`
- authority page `2052:2`

Git evidence:
`01_paper-items/rurubu-wedding/evidence/RURUBU-V8-AL5-COPY-VISUAL-PROMISE-ALIGNMENT-QA-2026-08-25.md`

## Transfer boundary

Transferable hypothesis: when reader-facing copy directly describes an interaction with photographs, maps, tables, objects or other media, verify that the relevant media actually exists in the page experience. If not, either provide legitimate media or rewrite the copy to match the real structure.

This is **not** a rule that every mention of photographs requires a photograph on the same page. Historical or narrative references to photography may be legitimate. The failure is a direct reader-action promise that conflicts with the actual design.

Do not transfer: V8 wording, palette, chronology structure, type scale, coordinates or whitespace treatment.

## Next test

If a materially different Rurubu role or another wedding item independently shows the same defect and a bounded correction improves truth without harming hierarchy, consider `VERIFIED_CROSS_ITEM`. Until then keep this as a local verified candidate.
