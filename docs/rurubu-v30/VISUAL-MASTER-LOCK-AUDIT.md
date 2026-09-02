# Rurubu WEDDING V30 — Visual Master Lock Audit

Status: `CURRENT_V30_PRODUCTION_GUARDRAIL / 2026-09-02`

Purpose: prevent a page from being marked `VISUAL_MASTER_LOCKED` after only one interpretation pass.

This document exists because P02 exposed a concrete failure mode: the main hierarchy and geometry were correctly captured, but some low-saliency accents and one flower object were omitted/misclassified. P01 was then re-audited with the same lesson.

## Mandatory lock sequence

A page may advance from `VISUAL_MASTER_PENDING` to `VISUAL_MASTER_LOCKED` only after both passes are complete.

### PASS A — 24-point production review

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
21. asset decomposition candidates
22. hard rejects
23. reference-delta QA
24. A5 QA

### PASS B — reverse omission / misclassification audit

Do not inspect the manifest first. Look at the Visual Master again and ask what exists in the image that the manifest failed to explain.

Mandatory checks:

- scan top / middle / bottom independently;
- scan left / center / right independently;
- inspect title ecology separately from title lettering;
- inspect micro accents: hearts, sparkles, doodle lines, route dots, tiny flowers/leaves, tapes, stamps, icons;
- distinguish visually similar objects by identity and job (e.g. plumeria vs hibiscus, flower cluster vs destination cluster);
- verify each photo has an explicit photo-mask/frame relationship and no hidden flattening dependency;
- verify intentional asymmetry: do not mirror an object merely because the opposite side has one;
- verify left/right person, color and content roles when the page encodes them;
- verify repeated modules are truly identical before treating them as a reusable component; otherwise record their page-specific differences;
- verify quiet/empty areas are intentional and not missing content;
- verify no decorative object was silently merged into a vague `decoration cluster` if it has a distinct editorial job;
- verify no generated/reference text was promoted to autobiographical FACT;
- verify no page-specific object was omitted just because its saliency is low.

## Lock evidence required in each page manifest

Each reviewed page manifest should include equivalent evidence to:

- `reviewRevision`
- `reviewCompleteness.firstPass = COMPLETE`
- `reviewCompleteness.secondPassOmissionAudit = COMPLETE`
- `reviewCompleteness.secondPassFindingsResolved`
- `partGenerationGate.secondPassOmissionAuditComplete = true`

If the second pass finds an omission or wrong classification, correct the manifest before locking.

## Important distinction

Low saliency does not mean optional.

A micro element may be `FLEXIBLE` in exact position and still be necessary to record because its presence contributes to authored magazine character.

Likewise, repeated-looking modules must not be normalized into identical UI cards unless the Visual Master actually supports that conclusion.

## Page-specific lessons already captured

### P01
- keep rings/sparkles separate from masthead lettering;
- keep top plumeria/foliage separate from the masthead glyphs;
- keep the dotted-heart airplane route distinct around the 2026 badge;
- hero is an open cover image, not a polaroid card;
- Feature 1/2/3 share a family but have different color/icon/photo jobs;
- right destination cluster includes chapel + sea + palms + flowers, not merely flowers;
- bottom story vessel and bottom floral edge cluster are separate objects;
- OUR JOURNEY postmark and PAGE 01 are separate jobs.

### P02
- distinguish portrait/profile seam plumeria from Q1/Q2 seam hibiscus;
- record side hearts and micro accents;
- Q1 inset photo has an independent frame contract;
- left = SHOGO/blue, right = SHIORI/pink;
- Q1 has inset photo, Q2 intentionally does not;
- do not mechanically mirror the two sides.

## State-machine rule

`VISUAL_MASTER_PENDING`
→ PASS A complete
→ PASS B complete
→ omissions/misclassifications corrected
→ `VISUAL_MASTER_LOCKED`
→ only then consider `PART_MAP_APPROVED`.

Technical QA or a complete-looking checklist can never substitute for this visual reverse-audit.
