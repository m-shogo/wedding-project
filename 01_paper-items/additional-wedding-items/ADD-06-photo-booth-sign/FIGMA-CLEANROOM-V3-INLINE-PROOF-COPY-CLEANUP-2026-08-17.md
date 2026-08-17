# ADD-06 フォトブースサイン — Clean-room V3 inline proof-copy cleanup

Status: `CLEANROOM_V3_SELECTED_CANDIDATE / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / INLINE_IMPLEMENTATION_SUFFIX_REMOVAL_PASS / LEGACY_PRESERVED / NOT_PRINT_READY`
Date: 2026-08-17
Start authority SHA: `328f73728790d193b879ed5dba33f19299c8623f`

## Authority

- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Shared lesson consumed: `docs/design-learning/non-rurubu-shared-learning-feed.append/2026-08-17-nrsl-inline-implementation-suffix-removal.md` (`VERIFIED_CROSS_ITEM`)
- Figma file: `SVMALDUyhc2chxHa4fvdjx`
- selected V3: `25:3 / CLEANROOM_ADD06_V3_SELECTED_A3_BEST_SHOT_LENS_POSTER`
- hidden long-copy stress: `25:41 / QA_ADD06_V3_LONG_COPY_STRESS_2026_08_15`
- retained legacy production: `1:2 / FRAME_ADD06_A3_PORTRAIT` — unchanged
- Drive authority: `1Ehk_oQ8vhAGo3DYBbgyOGfA03u0pu5wb / ADD-06_フォトブースサイン`

## Visible problem

Fresh live readback found that the selected V3 still printed an implementation suffix inside the unresolved installation-location role:

- `[会場内設置場所 · LAYOUT DUMMY]`

The location must remain unresolved/editable until the venue placement is authoritative, but `LAYOUT DUMMY` is authoring/proof terminology and weakened the guest-facing footer.

## Rollback-safe change

Before mutation, the selected root was cloned as hidden rollback:

- `26:2 / ROLLBACK_ADD06_V3_PRE_INLINE_PROOF_SUFFIX_REMOVAL_2026-08-17`

Only the implementation suffix was removed in the selected candidate and its long-copy stress:

- selected `25:19`: `[会場内設置場所 · LAYOUT DUMMY]` → `[会場内設置場所]`
- stress `25:57`: retained its intentionally long Japanese location test copy while removing ` · LAYOUT DUMMY`.

No title, support sentence, date, lens vector, route vector, footer geometry, safe guide, typography, image role or factual value changed.

## Visual QA

Fresh 500px whole-item screenshot after the edit: PASS.

The reading order remains:

`PHOTO SPOT → BEST SHOT → support copy → 写真撮影はこちら → route/lens cue → 2026.10.24 / [会場内設置場所]`.

The footer now reads as a real unresolved venue-location field rather than an implementation annotation. No new card, badge, shadow, gradient, raster or generated imagery was added.

## Structural evidence

Post-edit Figma metadata readback confirmed selected root `25:3` remains:

- `990×1400`;
- 6 native text nodes;
- editable vector lens `25:5` and route sweep `25:10` retained;
- hidden safe guide retained;
- IMAGE fill count remains `0` from the established selected-V3 authority.

A post-edit plugin structure script was transiently blocked by the execution safety gate after the successful mutation, so this evidence does not invent an unobserved second structural result. The successful mutation IDs, fresh screenshot, and metadata readback are the verified post-edit evidence. The prior long-copy structural PASS remains valid because the bounded change only shortens the tested string; no geometry or text width/size changed.

## Hybrid authoring / Drive

- unresolved location remains native editable text;
- existing editable vectors remain unchanged;
- generated/raster asset: not required;
- Drive write: `0`;
- exact Drive folder metadata was live-read before the change.

## Decision

ADD-06 remains:

`CLEANROOM_V3_SELECTED_CANDIDATE / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / INLINE_IMPLEMENTATION_SUFFIX_REMOVAL_PASS / LEGACY_PRESERVED / NOT_PRINT_READY`.

Legacy production remains untouched.
