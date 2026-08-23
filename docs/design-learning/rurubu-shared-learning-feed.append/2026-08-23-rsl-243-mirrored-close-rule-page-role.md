# RSL-243 — Mirrored close rules can equalize different editorial page jobs

Source scope/item: Rurubu WEDDING / V7 Story + Chronology
Date: 2026-08-23
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`
Fingerprint: `F-RSL-243-MIRRORED-CLOSE-RULES-EQUALIZE-DIFFERENT-EDITORIAL-PAGE-JOBS`

## Visible problem

V7 Story/Chronology F `2290:4` used analogous 7 px close rules before concluding copy on both the prose Story page and the event-driven Chronology page. The pages had different reader jobs, but identical closing furniture made the spread feel more like a repeated template/module system than one publication using theme + variation.

## Research observation

Fresh research this run focused on Japanese composition/page architecture rather than repeating recent photo or cover references:

- W3C JLREQ describes Japanese page composition around a designed basic page area (`kihon-hanmen`) and explicit rules for text, headings, figures, punctuation and line composition.
- JAGAT / Toshi Kobayashi describes the basic page area as the framework within which text and illustrations are placed.

These sources do not prescribe separator subtraction. Local hypothesis: if the underlying page structure already communicates hierarchy and closure, repeated visual furniture should still prove an editorial job rather than being preserved for symmetry.

## Root-cause hypothesis

The right Chronology rule was not carrying chronology, navigation, physical-production or caption-binding information. Year scale, event labels, spatial progression and final reflection already carried closure. Mirroring the left Story rule therefore added a repeated template signature without adding a new reader job.

## Bounded experiment

Rollback-safe F2 `2351:2`:

- hide only right Chronology close rule `2351:29`;
- move right close copy `2351:30` from `y=978` to `y=946`;
- retain left Story close rule;
- preserve all factual/native copy, photos, crop roles, palette and fixed title.

## Evidence

Three-scale Figma QA:

- 500 px whole-item: PASS
- 1400 px reading: PASS
- `1587×1123` actual-size canvas: PASS for DESIGN QA

Structure:

- native text `24`
- IMAGE fills `4`
- text intersections `0`
- bounded 18 px edge risk `0`
- explicit one-character / kinsoku probe findings `0`
- Japanese font mismatch `0`

Result: F2 promoted to current V7 Story comparison; old F hidden as rollback.

Evidence file: `01_paper-items/rurubu-wedding/evidence/RURUBU-V7-STORY-F2-RIGHT-CLOSE-RULE-SUBTRACTION-QA-2026-08-23.md`

## Transferable principle

When adjacent pages have materially different editorial jobs, repeated separator/close furniture should prove a role on each page. If type, spatial hierarchy and content sequence already close one side, independently test subtraction there rather than preserving symmetry by default.

This is not a blanket rule to remove rules/dividers. Retain elements with real binding, navigation, caption, trim/fold, timeline or other physical/editorial functions.

## Must remain item-specific

Do not transfer V7's 7 px bars, coordinates, palette, Story/Chronology layout, typography scales, Hawaii direction or page-specific copy.

## Next receiving-item experiment

Test only on a materially different print/editorial item where two adjacent sections repeat the same close/separator furniture despite different semantic roles. Compare retained vs subtracted at whole-item scale first, then reading and actual size. Reject subtraction if grouping or physical meaning weakens.
