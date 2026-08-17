# ADD-06 フォトブースサイン — Clean-room V3 long-copy collision reopen

Status: `CLEANROOM_V3_SELECTED_CANDIDATE / SELLABLE_VISUAL_QA_PASS_RETAINED_FOR_CURRENT_COPY / DESIGN_QA_LONG_COPY_REOPENED / LEGACY_PRESERVED / NOT_PRINT_READY`
Date: 2026-08-17
Start authority SHA: `1e198cc7650f6e1e7d14d411eab83ffb7a661015`

## Authority

- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Figma file: `SVMALDUyhc2chxHa4fvdjx`
- selected V3: `25:3 / CLEANROOM_ADD06_V3_SELECTED_A3_BEST_SHOT_LENS_POSTER`
- long-copy stress: `25:41 / QA_ADD06_V3_LONG_COPY_STRESS_2026_08_15`
- retained legacy: `1:2 / FRAME_ADD06_A3_PORTRAIT` — unchanged
- Drive authority: `1Ehk_oQ8vhAGo3DYBbgyOGfA03u0pu5wb / ADD-06_フォトブースサイン`

## Fresh live audit

The selected V3 current-copy composition remains visually strong at thumbnail and native A3 scales. Fresh metadata confirms `990×1400`, native editable text, editable lens/route vectors, and no production raster requirement.

However, the hidden long-copy stress exposes a structural collision that must not remain covered by an older PASS label:

- stress subtitle `25:54`: `x=68, y=515, w=430, h=210` → bottom `725`;
- stress note `25:55`: `x=68, y=722, w=370, h=150` → top `722`;
- therefore the two variable-copy roles overlap by about `3 px` in the stored stress geometry.

Root-outside checks alone are insufficient here: both text boxes can remain inside the 990×1400 root while colliding with each other.

## Decision

- do not mutate the selected V3 merely to preserve an inaccurate historical PASS;
- do not claim `LONG_COPY_STRESS_PASS` until a rollback-safe fix is implemented and revalidated;
- retain current-copy `SELLABLE_VISUAL_QA_PASS` because this audit found no new current-copy visual defect;
- reopen the structural long-copy portion as `DESIGN_QA_LONG_COPY_REOPENED`;
- legacy production remains untouched;
- Drive write: `0`;
- image generation: not required; the defect is variable-copy flow, not missing imagery.

## Required next bounded fix

On the next safe Figma write, keep the V3 visual grammar and rebuild only the subtitle + note variable-copy region as a native vertical auto-layout / height-following stack with a verified minimum gap. Then rerun realistic long-copy stress, explicit text-to-text collision detection, safe-area checks, and three-scale screenshots before restoring `DESIGN_QA_PASS_WITH_PLACEHOLDERS`.

This is a structural correction, not a reason to copy or reopen the old production design.
