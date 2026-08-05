# V5 front-cover circular snapshot module subtraction

Date: 2026-08-05
Scope: Rurubu WEDDING V5 only
Live Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Outer candidate: `77:18`
Front cover: `77:145`

## Authorities consulted

- `docs/wedding-figma-production-system.md`
- `docs/wedding-asset-generation-memory.md`
- `docs/wedding-figma-ai-continuous-learning-system.md`
- `docs/wedding-design-learning-feedback-log.md`
- `docs/project-memory.md`
- `docs/decisions/2026-08-02-quality-over-legacy-design.md`
- `01_paper-items/rurubu-wedding/CURRENT-STATUS.md`
- current Rurubu asset evidence and lessons records
- live Figma structure and whole-item/page screenshots

## Visible problem

The front-cover hero carried a circular inset photograph, a separate `旅のひとコマ` label, and a camera icon directly beneath the existing white `注目! ふたりの BEST TRIP` kicker. At whole-item scale the cluster repeated the same travel-feature message, obscured the dominant photograph, and created an unnecessary sticker-on-sticker focal point.

## Tested principle / capability

Attempt subtraction before adding or restyling. Test whether the dominant photograph and existing native headline system can carry the cover without the secondary circular snapshot module.

Expected improvement:

- return more uninterrupted area to the hero photograph;
- reduce competition between the right kicker, circular snapshot, and left headline stack;
- improve editorial hierarchy while preserving the lively travel-magazine identity;
- keep rollback immediate by hiding, not deleting, the bounded module.

Possible regression:

- the cover could lose too much visual playfulness;
- the right kicker might feel isolated without the circular image;
- removal might weaken the travel-photo motif.

Evidence required:

- before/after whole-item screenshot comparison;
- front-cover page screenshot at natural print scale;
- semantic hero, native text count, crop geometry, image hash, and rollback nodes remain intact.

## Experiment

The following bounded nodes were changed from visible to hidden:

- `77:236 / AUTH_COVER_SNAP_01`
- `77:237 / AUTH_COVER_SNAP_LABEL`
- `77:254 / RURUBU/Icon/camera`

No node was deleted. No text, image crop, frame geometry, or image fill was edited.

## Result

`VERIFIED / ADOPTED FOR V5 CURRENT`

Whole-item QA:

- the cover remains recognizably lively and travel-editorial through the masthead, date badge, yellow ribbon, three native headline bands, issue strip, and feature index;
- the dominant photograph gains a cleaner central/right field;
- the former sticker cluster no longer competes with the masthead and hero headlines.

Page/reading QA:

- reading order remains masthead → date → hero ribbon → left headline stack → right kicker → hero caption → feature index;
- the right kicker remains legible and sufficiently anchored by its white field and proximity to the architecture in the photograph;
- no content or navigation information was removed.

Actual-size/detail QA:

- front-cover screenshot at `794 × 1123` shows no exposed masks, blank holes, clipping, or orphaned camera icon;
- native text remains editable;
- hero node `77:148 / IMG_HERO` remains `665 × 610`, visible, with image hash `e58ddfa30e3b4bb68e44f1789d984b75cf8a7912` and unchanged FILL transform;
- the three hidden nodes remain available for immediate rollback.

## Transport blocker encountered

The verified Drive JPEG derivative for `V5-10 / BACK_VISUAL_MAIN_MEMORY_PHOTO` was downloaded and read back successfully (`Drive ID 1yZIwZ5cdLf_qAXe2BI9Yt5RsH5yE8q8V`, 20,063 bytes, SHA-256 `28e14592f3cb08b9c1da85e89ee240117ffae6dea28aed0185e318ae0598fcae`). A fresh Figma single-use upload URL was issued, but the execution container again failed DNS resolution for `mcp.figma.com`. The live node `77:24` was not mutated. The external POST route is not retried further in this run.

## Learning state

- visible issue: `DISCOVERED`
- bounded reversible subtraction: `PROTOTYPED`
- whole-item/page/detail and structure QA: `VERIFIED`
- project-wide rule promotion: `NO`; this is one cover-specific result supporting the existing subtraction-first rule.

## Next application

Return to Batch A dominant-photo placement through a binary-safe path. Do not count this subtraction as a photo-role PASS. V6 remains gated until V5 dummy-photo design QA and evidence closure are complete.
