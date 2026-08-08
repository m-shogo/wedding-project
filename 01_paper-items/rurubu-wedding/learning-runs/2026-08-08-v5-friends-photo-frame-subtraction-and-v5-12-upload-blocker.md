# Rurubu V5 — Friends photo-frame subtraction + V5-12 upload blocker

Date: 2026-08-08
Status: `DISCOVERED → PROTOTYPED → VERIFIED / V5_CURRENT_ADOPTED / PHOTO_ROLE_NOT_PROMOTED`

## Scope
Rurubu WEDDING V5 only. WEDDING PASSPORT, BOARDING PASS, 青春ふたりきっぷ, ADD items, and V6 production were not modified.

## Authorities
The run re-grounded against the current project production system, asset-generation memory, continuous-learning system, learning feedback log, project memory, quality-over-legacy decision, Current Status, V5 evidence ledger, Rurubu production OS/postmortem, and the existing Friends subtraction evidence. Current truth before this experiment was active photo roles `11`, PHOTO_ROLE_PASS `6`, dominant `2/3`; V5-12 and V5-13 remained open.

## Visible problem
The verified two-up `FRIENDS & FAMILY` composition had already removed the third legacy photo and colored label tabs, but both remaining photographs still used `5px` white borders and `12px` corner radii. At whole-item scale the treatment still read as two web/UI cards rather than travel-magazine photography.

The photos, captions, geometry, and native labels were already useful. Adding decoration was therefore rejected; subtraction was tested first.

## Hypothesis
Reduce only the visible Friends photo framing from `5px / 12px radius` to `2px / 2px radius`, preserving image fills, crops, sizes, captions, semantic nodes, and rollback history.

Expected improvement:
- less web-card vocabulary;
- stronger editorial/photo-first reading;
- better continuity with the previously verified direct-type label subtraction;
- no asset/provenance churn.

Possible regression:
- images could look unfinished or harsh;
- the cafe and dining images could lose enough separation from the warm paper background;
- the two photos could become visually inconsistent if only one were changed.

Evidence required:
- rollback-safe duplicate;
- whole-spread screenshot;
- actual-size screenshot for both visible Friends images;
- Current image hashes unchanged after promotion.

## Safe prototype
Created comparison frame:
- `449:2 / V5_FRIENDS_CAFE_DERIVATIVE_QA_2026_08_08`

The attempted purpose was V5-12 derivative QA, but the new Figma `upload_assets` route returned an upload URL on `mcp.figma.com` and the execution environment again failed DNS resolution (`Could not resolve host: mcp.figma.com`). This repeated known blocker was not retried. Current image data was not changed.

The existing comparison duplicate was then reused for a bounded subtraction test:
- `449:23 / BACK_VISUAL_FRIEND_2_PHOTO`: stroke `5 → 2`, radius `12 → 2`
- `449:27 / BACK_VISUAL_FRIEND_3_PHOTO`: stroke `5 → 2`, radius `12 → 2`

## Three-scale QA
### Whole-item
PASS. With both visible Friends photos using the lighter frame, the module reads more like a printed editorial spread and less like two rounded content cards. The photographs become the primary information rather than their containers.

### Reading/page
PASS. `FRIENDS 01` / `FRIENDS 02` native direct-type labels and captions still provide enough grouping. The 2px white edge retains separation from the warm paper background without dominating the section.

### Actual-size/detail
PASS. Screenshots of `449:23` and `449:27` show intact crops and no clipping caused by the reduced radius. The cafe still retains flowers, cup, dessert and camera; the dining image retains its full scene. No image fill was changed by this design experiment.

## Current promotion
Promoted only the verified frame subtraction to Current:
- `77:39 / BACK_VISUAL_FRIEND_2_PHOTO`: `5px/12px → 2px/2px`
- `77:43 / BACK_VISUAL_FRIEND_3_PHOTO`: `5px/12px → 2px/2px`

Image hashes were verified unchanged:
- `77:39`: `c1ada11205bc3978bf426b304d683f1c1566cac2`
- `77:43`: `3abe9ce228d2252b847860ac895f2c178b6b3ddd`

Current whole-spread screenshot after promotion passed visual QA. Comparison `449:2` is preserved as rollback/evidence.

## V5-12 asset truth
A role-specific cafe derivative already exists in Drive and was visually inspected:
- `RURUBU_V5_12_FRIENDS_CAFE__FIGMA_810x552_Q22.jpg`
- Drive ID `1CN3gXWgHccx6WwcsmJcXDfXWgARMLFrO`
- `810×552`
- `25,901 bytes`

It visibly contains the intended cafe-memory composition (flowers, coffee, dessert, camera) and is exactly `3×` the live `270×184` semantic box. However, transport into the duplicate did not complete because of the repeated DNS blocker. Therefore V5-12 is **not** promoted to PHOTO_ROLE_PASS or ROLE_COMPLETE in this run.

## Result
`FRAME_SUBTRACTION: VERIFIED → V5_CURRENT_ADOPTED`

`V5-12 DERIVATIVE: DRIVE_VERIFIED / VISUALLY_REVIEWED / FIGMA_TRANSPORT_BLOCKED / NOT_ROLE_COMPLETE`

This does not create a general project rule yet. It is evidence that, in this specific Friends module, photo framing can be materially reduced after card/tab subtraction without harming hierarchy.

## Next application
1. Do not retry the same external upload/DNS route for V5-12.
2. Use the previously successful binary-safe Figma reconstruction path for the 25,901-byte cafe derivative, or another genuinely different transport path.
3. After exact duplicate import, verify image hash, whole/read/detail screenshot QA, and structure before Current promotion.
4. Repeat independently for V5-13 dining; do not assume V5-12 evidence proves V5-13 quality.
5. Keep V5-01 cover hero as the highest-priority dominant blocker and keep the V6 production gate closed.