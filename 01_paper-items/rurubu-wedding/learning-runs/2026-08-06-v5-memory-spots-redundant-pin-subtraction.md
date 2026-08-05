# V5 MEMORY SPOTS redundant map-pin subtraction

Date: 2026-08-06
Scope: `02_RURUBU_AUTHENTIC_INSIDE_V5_CURRENT_CANDIDATE`
Status: `PROTOTYPED → VERIFIED / V5_CURRENT_ADOPTED / PHOTO_GATE_UNCHANGED`

## Source and authority readback

Before the change, the current project-wide authorities, `CURRENT-STATUS.md`, the V5 evidence ledger, Production Operating System V2, postmortem/V6 guardrails, latest GitHub main, live Drive folder, and live Figma frame were reviewed.

The evidence ledger continues to report `intended_source_applied: 1 / 13` and `photo_role_pass: 0 / 13`. This experiment does not alter either count.

## Visible problem

The MEMORY SPOTS heading area displayed two map-pin graphics within a very small vertical interval:

- raster decoration `77:462 / DECOR_MAP_PIN_MEMORY_SPOTS`, `30 × 52`, IMAGE hash `37e86435fd452f4bba21b22e387952ceda39a4ad`;
- native semantic icon `77:504 / RURUBU/Icon/pin`, `24 × 30`.

At page and whole-spread scale, the pair read as accidental duplication rather than meaningful hierarchy. The lower raster pin also competed with the heading, micro-copy, and the first photo-module boundary.

## Anti-legacy decision

The raster decoration would not be selected if the page were designed clean-room today because the semantic pin already communicates the map/location role. The correct first experiment was subtraction, not another badge, connector, or decorative field.

## Hypothesis

Hiding only the redundant raster decoration while preserving the native semantic icon would:

- reduce duplicated visual language;
- clarify the MEMORY SPOTS heading-to-content transition;
- preserve travel/map semantics;
- avoid changing typography, photo crop, reading order, or asset provenance.

Possible regression: the heading area could become visually under-signposted or leave an obvious empty gap.

Adoption evidence required: whole-spread screenshot, page screenshot, actual-size visual inspection, and structure readback showing that the semantic pin, native text, image hashes, fold guide, and rollback frames remain intact.

## Bounded Figma change

- mutated node: `77:462 / DECOR_MAP_PIN_MEMORY_SPOTS`
- change: `visible: true → false`
- preserved semantic icon: `77:504 / RURUBU/Icon/pin`, still visible
- no node deletion
- no text edit
- no image replacement
- no crop or geometry change

## Three-scale QA

### Thumbnail / whole spread

The inside spread retains its profile/history split and travel-map identity. The right page no longer has a doubled pin cluster, and no obvious blank hole appears.

### Reading / page scale

The reading sequence remains:

`OUR HISTORY → timeline → history lead image → MEMORY SPOTS heading → lead memory → supporting spots`.

The single native pin is sufficient as a location cue. The heading, micro-copy, colored rules, and photo modules retain clear grouping.

### Detail / actual-size inspection

No text reflow, clipping, masking exposure, image-edge defect, or collision was introduced. The remaining native pin is crisp and editable.

## Structure evidence after adoption

- `77:462`: visible `false`; original IMAGE fill/hash retained for rollback
- `77:504`: visible `true`; semantic native frame preserved
- native text nodes in V5 inside frame: `94`
- visible text nodes: `65`
- fold guide `77:540`: visible and preserved
- outer V4 rollback `59:2`: preserved
- inside V4 rollback `59:178`: preserved
- history image `77:422` hash unchanged: `1bfd7f1fa601206bfed1594a140b40554e85d77a`
- lead memory `77:430` hash unchanged: `8344d95d228f3ca6661d2dbd06220353d265a540`
- small memory hashes unchanged; duplicate role `77:446` remains hidden as previously verified

## Result

`VERIFIED / ADOPTED` for current V5.

This is an editorial-density correction, not an asset-lifecycle completion. The V5 photo ledger, `PHOTO_ROLE_PASS`, dominant-photo gate, and V6 start gate remain unchanged.

## Failure / blocker carried forward

The validated Drive derivatives for dominant photos still cannot be placed through the repeated blocked upload route, and the most recent manually transported history JPEG produced a non-rendering hash before rollback. Those unchanged methods must not be retried. The next safe production priority remains a genuinely binary-safe placement route for Batch A or another evidence-backed audit that does not pretend to close the photo gate.

## Next application

When a page contains both a semantic native icon and a raster decoration expressing the same role, compare their actual contribution before preserving both. Prefer the editable semantic element when one cue is sufficient; do not promote this single result into a universal icon rule without further verified cases.
