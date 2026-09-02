# Rurubu WEDDING V30 — Visual Master Lock Audit

Status: `CURRENT_V30_PRODUCTION_GUARDRAIL / PRE-BUILD_VISUAL_UNDERSTANDING / 2026-09-02`

Purpose: prevent a page from being marked `VISUAL_MASTER_LOCKED` after only one interpretation pass, and prevent production from starting before display-module/proxy boundaries are understood.

This document proves that the Visual Master has been understood. It does **not** prove that later Figma implementation is visually faithful.

Mandatory companion after build:
`docs/rurubu-v30/FIGMA-EXECUTION-ACCEPTANCE.md`

`VISUAL_MASTER_LOCKED ≠ FIGMA_DESIGN_COMPLETE`.

## Mandatory lock sequence

A page may advance from `VISUAL_MASTER_PENDING` to `VISUAL_MASTER_LOCKED` only after PASS A + PASS B and all required production classifications are complete.

## PASS A — production review

Review the actual user-provided page image and record:

1. 3-second read order
2. background
3. outer frame
4. photo frames/masks
5. article/callout/profile/Q&A vessels
6. title/headings
7. photo count
8. photo size hierarchy
9. major object positions
10. major object sizes
11. normalized geometry
12. Figma 559×794 approximation
13. z-index / layer order
14. overlap
15. mustNotCover
16. quiet zones
17. saliency
18. face safe
19. renderMode
20. factClass
21. identity anchors
22. **bundled fixed display-module candidates**
23. **native/variable-copy responsibilities**
24. **photo slot semantics + clean standalone proxy role**
25. asset decomposition candidates
26. hard rejects
27. reference-delta QA targets
28. A5 QA targets

## PASS B — reverse omission / misclassification audit

Do not inspect the manifest first. Look at the Visual Master again and ask what exists in the image that the manifest failed to explain.

Mandatory checks:

- scan top / middle / bottom independently;
- scan left / center / right independently;
- inspect title ecology separately from title lettering;
- inspect micro accents: hearts, sparkles, doodle lines, route dots, tiny flowers/leaves, tapes, stamps, icons;
- distinguish visually similar objects by identity/job;
- verify each real photo has explicit photo-mask/frame relationship and no hidden flattening dependency;
- verify intentional asymmetry;
- verify left/right person/color/content roles where present;
- verify repeated modules are truly identical before treating them as reusable components;
- verify quiet/empty areas are intentional;
- verify no distinct object was silently merged into a vague decoration cluster;
- verify no reference/generated text was promoted to autobiographical FACT;
- identify identity anchors whose exact visual character must later be checked in current Figma;
- identify **which short fixed text + number + vessel + icon + local accents visually behave as one display module**;
- identify **which text is long/variable/TBD/personal and therefore must stay separate/native until approved**;
- identify every photo slot's clean proxy semantics;
- verify **no plan relies on cropping the page Visual Master into a photo slot**;
- verify a bundled display module does not swallow a replaceable real-photo slot;
- verify independently movable accents remain separate when the Visual Master requires separate overlap/z-order.

## Fixed display-module classification — REQUIRED BEFORE PART GENERATION

For each candidate module record:
- module ID;
- exact approved fixed visible text/numbers, if any;
- background/vessel included;
- icons/accents included;
- independently movable exceptions;
- whether any real photo must remain separate;
- source-of-truth location for fixed FACT text/number.

Visible fixed module text does **not** need to remain editable in Figma when its value is approved and its exact source exists in manifest/metadata.

Do not bake:
- long body copy;
- unapproved Q&A;
- personal/TBD facts;
- frequently changing copy.

## Clean proxy classification — REQUIRED BEFORE PART GENERATION

For every real-photo slot record:
- semantic role;
- subject class/count;
- orientation/crop behavior;
- focal/face-safe needs;
- acceptable clean standalone proxy type.

Hard reject:
- crop from `P01.png` / `P02.png` / any page Visual Master used as photo content;
- page screenshot used as photo fill;
- proxy containing page title/border/sticker/flower/route/ticket/frame/Q vessel/page badge;
- proxy whose baked decoration duplicates a separate page asset.

Visual Master is the **comparison authority**, not photo-slot source material.

## Lock evidence required in each page authority

Each reviewed page should have equivalent evidence to:

- `reviewRevision`
- first pass complete
- second omission/misclassification pass complete
- second-pass findings resolved
- identity-anchor classification
- bundled-display-module classification
- native/variable-copy classification
- clean standalone visual-proxy requirements
- part-generation gate unlocked only after all above are complete.

If any classification is still pending, do not start production part generation.

## Important distinctions

Low saliency does not mean optional.

Likewise:
- fixed display text may be non-editable visible art when approved;
- replaceable photos remain separate from generated display modules;
- clean standalone proxy does not mean semantically arbitrary for visual QA;
- a technically clean file is not a visually accepted page.

## Page-specific lessons already captured

### P01
- rings/sparkles separate from masthead lettering when independently positioned;
- top plumeria/foliage separate when its overlap needs independent control;
- Hero is open cover image, not polaroid card;
- Hero visual QA requires clean standalone two-person people-led proxy if final photo is unavailable;
- **do not use a P01.png crop for Hero/Feature proxies**;
- Feature 1/2/3 share a family but are intentionally different;
- fixed Feature number + heading + icon + vessel may be one complete display module while the replaceable photo remains separate;
- Date ticket fixed text + ticket + postal accents may be one complete display module;
- Bottom Story fixed two-line hook + vessel + local accents may be one complete display module;
- OUR JOURNEY and PAGE 01 may each be complete fixed display modules;
- `るるぶ`, `WEDDING`, `Shogo & Shiori`, and prominent `2026` are identity/display anchors whose visual character outranks generic editability.

### P02
- left=SHOGO/blue, right=SHIORI/pink;
- Q1 has inset photo, Q2 intentionally does not;
- Q1/Q2 are related but non-identical;
- clean standalone portrait/couple proxies only;
- fixed title/name/Q-label/page-badge shells may use bundled display art while unapproved profile/Q&A copy remains separate.

### P03
- title-left / Hero-right / timeline-left / Q&A-right asymmetry is structural;
- Hero pink tape remains independent from Hero photo;
- timeline route remains separate when spanning multiple steps;
- steps 1–4 have photos; step 5 intentionally does not;
- Q3/Q4 related but non-identical;
- clean standalone photo proxies only;
- fixed timeline number/heading shells and Q3/Q4 shells may be bundled while body copy remains separate.

## State-machine rule

`VISUAL_MASTER_PENDING`
→ PASS A complete
→ PASS B complete
→ omissions/misclassifications corrected
→ identity anchors classified
→ bundled fixed display modules classified
→ native/variable copy classified
→ clean photo-proxy roles classified
→ `VISUAL_MASTER_LOCKED`
→ only then `PART_MAP_APPROVED`
→ Codex production ImageGen/Figma
→ mandatory `FIGMA-EXECUTION-ACCEPTANCE.md`.

Technical QA or a complete-looking checklist can never substitute for reverse visual audit, clean proxy planning, module-boundary planning, or later current-Figma comparison.
