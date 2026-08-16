# Rurubu WEDDING V6 — Y + CG/CH Story Frame-Subtraction QA

Date: 2026-08-17
Scope: Rurubu WEDDING only
Figma: `bfM0d4c9dCeBv5pCkJ3TNM`

## Live preferred set after this pass

- Outer Y `1542:2` — unchanged.
- Profile / Q&A CG `1545:2` — unchanged.
- Story / chronology CH `1548:2` — promoted from bounded comparison.
- V7 remains HOLD.

## Visible problem

CE Story was already structurally safe and photo-led, but its two support photographs still carried 6px white postcard/polaroid frames. At whole-spread scale those frames made the Story page read slightly more like a scrapbook/template than the adjacent edge-led Q&A and photo-led outer pages.

## Root-cause hypothesis

The support-photo borders had no trim, mask, caption, or physical binding requirement in Story. Removing only those non-functional frames could let the photography carry more of the page without flattening native text or changing image provenance.

A second hypothesis was tested on Profile: the three overlapping snapshot borders might also be removable. That comparison was rejected because those borders *did* visually separate the overlapping photographs and preserve the cluster's reading order.

## Bounded tests

### CH — Story support frame subtraction

Rollback-safe duplicate of CE:

- candidate root `1548:2`;
- Story support 1 `1548:10`: keep `238×216`, remove 6px white stroke, move to `548,424`;
- Story support 2 `1548:11`: keep `515×350`, remove 6px white stroke, move to `-18,680`;
- hero, composed route texture, all native copy, captions, folio, chronology page, image fills/hashes and replaceable-image roles preserved.

Result: adopted.

### CJ — Profile snapshot frame subtraction

Rollback-safe duplicate of CG:

- candidate root `1549:2`;
- removed 6px white strokes from the three overlapping profile snapshots and tightened their overlap slightly;
- no text or image source changes.

Result: rejected and hidden. Without the white separation, the three photographs visually merged and the intended overlap order weakened. The frames therefore proved a binding/separation function in this specific cluster.

## Three-scale evidence

CH:

- whole spread / 500px: PASS; Story reads cleaner and more photo-led than CE without losing structure;
- reading / 1400×990: PASS;
- actual-size Story `1548:3` = `794×1123`: PASS;
- native text: `12`;
- IMAGE fills: `4` (`3` replaceable photos + `1` bounded composed texture);
- text/text collisions: `0`;
- 18px text safe-area risks: `0`.

Chronology is unchanged from CE and retains its prior verified structure and safe-area state.

## Rollback / rejection state

- CE `1535:78` → `ROLLBACK_HIDDEN / V6_INSIDE_CE_PRE_CH_STORY_FRAME_SUBTRACTION_2026_08_17`;
- CH `1548:2` → `PREFERRED / V6_INSIDE_CH_STORY_FRAME_SUBTRACTION_2026_08_17`;
- CJ `1549:2` → `REJECTED_HIDDEN / V6_INSIDE_CJ_PROFILE_FRAME_SUBTRACTION_WEAK_BINDING_2026_08_17`;
- Start Here index synchronized to `V5 FU/FX · V6 Y + CG/CH INSIDE STUDIES · V7 HOLD`.

## Asset lifecycle truth

- newly generated assets: `0`;
- new Drive saves: `0`;
- new external binary placements: `0`;
- new image hashes: `0`;
- existing verified photography recomposed: `YES`;
- native variable text preserved: `YES`;
- replaceable image semantics preserved: `YES`;
- generated section masters adopted: `NO`.

Drive V6 root re-read during the pass: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`.

## Learning status

`VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

Generalizable method: border subtraction is not a style default. Test whether the border performs a real separation/binding function in the specific overlap context. Story support frames were redundant and could be removed; Profile snapshot frames were functional and were retained.

Rurubu-specific and non-transferable: exact Story geometry, photo choices, Japanese headline treatment, palette, rotations, timeline composition, and magazine grammar.

## Completion status

`V6 Y + CG/CH = VERIFIED_LOCAL_DUMMY_DESIGN_STUDIES / ROLLBACK_SAFE / V7_HOLD / NOT_PRINT_READY`

Final photography, final personal copy, printer template, PDF preflight and physical proof remain separate gates.