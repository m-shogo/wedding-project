# Rurubu V5 — V5-13 dining Q15 verified promotion (2026-08-08)

Status: `VERIFIED / CURRENT_PROMOTED / ROLE_COMPLETE`

## Scope

Rurubu WEDDING V5 only. WEDDING PASSPORT, BOARDING PASS, 青春ふたりきっぷ, and ADD items were not modified.

## Authorities reread before work

Before mutation work, the project-wide production system, asset-generation memory, AI continuous-learning system, central design-learning log, project memory, quality-over-legacy decision, Rurubu Current Status, V5 asset evidence ledger, editorial knowledge base, Rurubu lessons log, V5 operating system, postmortem, and V6 research/asset files were reread. Live Figma, Drive readback, the asset ledger, and GitHub main remained the evidence authority chain.

## Visible problem

`V5-13 / BACK_VISUAL_FRIEND_3_PHOTO / 77:43` is a visible `244×166` supporting Friends & Family dining role. At run start, Current still used the older low-resolution source/hash `3abe9ce228d2252b847860ac895f2c178b6b3ddd`, while the verified role-sized derivative already existed in Drive.

The editorial goal was not to generate a new image merely for activity. The dining master already supplied a distinct semantic role — food, glasses, table activity and a waterfront setting — with no recognizable guest identity claim. The concrete defect was resolution/transport, not concept.

## Hypothesis / principle tested

For this small supporting role, the exact `3×` role derivative can be accepted if and only if:

1. Drive readback confirms the exact stored bytes;
2. binary reconstruction is guarded before `figma.createImage()`;
3. placement is tested on a rollback-safe duplicate first;
4. whole-spread, page/reading and actual-size screenshots all remain plausible;
5. Current promotion is independently read back from the live Figma hash rather than inferred from the setter call.

Expected improvement: remove the visibly weak Friends dining source while preserving the two-photo editorial rhythm and identity-safe atmosphere.

Possible regression: over-compression could erase table detail, or a technically successful fill assignment could fail to persist while appearing successful to the caller.

## Drive evidence

Accepted derivative:

- file: `RURUBU_V5_13_FRIENDS_DINING__FIGMA_732x498_Q15.jpg`
- Drive ID: `1R0JW7jny0XSOaysUzLMLo8n8nDxVGqdy`
- dimensions: `732×498` — exact `3×` the `244×166` semantic role
- Drive readback bytes: `13,867`
- current Drive-readback SHA-256: `dae183acded3e9be767159b179b32fa456bbfd64a8b4779ac79c9df3de659f08`

An earlier record had SHA-256 `85d994fe0f86290162dbf8df58abb34a3a2d54bd1320631447d586f8445d7bab` for the same Drive ID and byte count. The live Drive-readback bytes are treated as current source truth; the earlier checksum is retained in the ledger as a discrepancy marker rather than silently erased. This discrepancy is evidence to investigate if byte-exact archival guarantees become important later.

## Transport attempt and method switch

The Figma native upload endpoint was obtained, but the external execution environment again could not resolve `mcp.figma.com`. Because this blocker had already occurred before, the route was not repeatedly retried.

The method switched to a bounded shared-plugin-data reconstruction on the QA duplicate. The base64 payload was staged in five separately guarded chunks:

- `4000`
- `4000`
- `4000`
- `4000`
- `2492`

Before image creation, the reconstruction verified:

- total encoded length: `18,492`
- decoded bytes: `13,867`
- JPEG SOI/EOI markers

Only then was `figma.createImage()` called. Temporary shared-plugin-data chunks were cleared after reconstruction.

## Rollback-safe Figma comparison

Created comparison frame:

- frame: `487:2 / V5_13_DINING_Q15_QA_2026_08_08`
- target: `487:27 / BACK_VISUAL_FRIEND_3_PHOTO`
- target geometry: `244×166`
- scale mode: `FILL`
- comparison image hash: `d76eb07d83d042f15044c8bc6bf68d73a73cd77d`

### Three-scale visual QA

**Whole item:** the back-cover Friends section reads as two deliberately different supporting scenes rather than duplicated stock imagery. The dining frame remains subordinate to the back-main memory image and does not distort the outer-spread hierarchy.

**Page / reading:** the cafe still life and waterfront dining scene are distinct in subject, angle and atmosphere. Their captions retain a clear relationship to the photographs. No recognizable generated guest is presented as a real friend or family member.

**Actual-size detail:** glasses, tableware, food, foliage and the coastal background remain readable at the displayed role size. Compression does not create a role-breaking artifact at this scale.

Result: `PASS` for V5 dummy-design QA at this role only. The Q15 value is not generalized to larger roles or to final print assets.

## Important failed promotion and correction

The first Current promotion attempt replaced a paint by JavaScript object identity and returned the intended new hash. A subsequent independent live hash audit showed that Current `77:43` had actually remained on the old hash.

This is a meaningful process failure: **a mutation call returning intended state is not equivalent to live readback evidence.**

The correction changed the method to indexed IMAGE-paint replacement and verified the assigned hash again inside the same atomic Figma call. After that correction, live Current readback confirmed:

- Current node: `77:43`
- previous hash: `3abe9ce228d2252b847860ac895f2c178b6b3ddd`
- final hash: `d76eb07d83d042f15044c8bc6bf68d73a73cd77d`
- geometry: `244×166`
- scale mode: `FILL`

Fresh Current whole-item and actual-size screenshots then matched the verified comparison.

## Structure / rollback QA

Post-promotion audit confirmed:

- semantic Current node `77:43` preserved
- outer Current `77:18` preserved
- inside Current `77:290` preserved
- fold guide `77:288` remains visible
- rollback frames `59:2` and `59:178` remain preserved
- QA comparison `487:2` remains preserved
- native text remains native; no flattening was introduced
- combined outer+inside audit observed `177` native text nodes and `23` IMAGE-fill nodes

These combined counts cover both Current outer and inside and therefore should not be compared directly with earlier inside-only counts.

## Adoption state

`VERIFIED` for V5-13 only.

Not promoted to `PROJECT_RULE`:

- Q15 is not a general compression recommendation.
- five chunks at these sizes are not a permanent global transport threshold.
- the reusable lesson is the evidence sequence: guarded reconstruction → duplicate visual QA → Current mutation → independent live hash readback.

## Result / official progress effect

V5-13 is now `FIGMA_APPLIED_VERIFIED / PASS_DUMMY_DESIGN_DERIVATIVE / ROLE_COMPLETE`.

Asset-ledger counts after the promotion:

- active Current roles: `11`
- retired preserved roles: `2`
- intended source applied: `11/11`
- PHOTO_ROLE_PASS: `10/11`
- ROLE_COMPLETE: `10/11`
- dominant-photo gate: still `2/3`

The only remaining active photo-role blocker is `V5-01 / 77:148 / IMG_HERO` cover hero.

V6 production remains gated until V5 reaches verified dummy-photo/design QA.

## Next application

For the cover hero, retain the same truthfulness rule — never trust intended mutation without live readback — but do not generalize the small-role compression or chunk strategy mechanically. The cover is a dominant `665×610` role and must use a quality-preserving derivative that passes thumbnail, page and actual-size review before Current promotion.