# WEDDING PASSPORT — Current actual-size visual reopen / 2026-08-25

State: `OBSERVED / CURRENT_VISUAL_REOPENED / SELLABLE_VISUAL_QA_REPAIR_PENDING`
Scope: non-Rurubu only
Current authority: `docs/automation/non-rurubu-figma-quality-current.md`

## Live authority

- run start `main`: `b22eb221be9070b588534fc8a1e61652ecbf0d74`
- latest `main` before this evidence write: `46d98452e26e4bb7aac3a0371764d87156aa5f40`
- Figma file: `UbK8KmuWJcDeGScsN49Uor`
- Current page: `205:2 / CURRENT_SELECTED / PASSPORT / DEPARTURE WINDOW V2 / 2026-08-25`
- Current front: `205:3 / CURRENT_SELECTED / PASSPORT FRONT / DEPARTURE WINDOW V2`
- Current back: `205:21 / CURRENT_SELECTED / PASSPORT BACK / RETURN WINDOW V2`
- exact Drive authority: `1LnGb9tq_Vswe-GKO6UxfvKMAZuShEaaw / 01_パスポート風_メニュー・ドリンク・座席表`
- Drive metadata/title live readback: PASS
- Drive write: `0`
- Figma production mutation in this audit: `0`
- image generation: `0`

No Rurubu item-specific Figma, Drive, asset, ledger, layout or GitHub path was inspected or modified.

## Why the visual PASS is reopened

The same-day promotion evidence established clean-room construction, native editability, long-copy stress and a strong 500px comparison. A new live actual-size audit of the **promoted Current nodes themselves** exposed three material visible defects that were not apparent in the earlier completion conclusion.

Structural evidence is retained. The sellable-visual conclusion is reopened until these visible defects are repaired and reverified.

## Defect 1 — Japanese intro breaks inside a semantic word

Current front `205:3` at reading/native scale shows:

`今日という一日を、ふたりの旅の記`
`録に。`

The word `記録` is split across lines by the current measure. This is not overflow; it is a Japanese editorial line-break defect.

Live geometry:

- intro node: `205:17 / TEXT / COVER INTRO`
- x `264`
- y `690`
- width `500`
- height `96`

### Root-cause hypothesis

The final promoted Current preserved the narrowed 500px intro measure that solved aperture intrusion, but that measure now forces a mechanically poor Japanese break at native composition scale.

### Required bounded repair

Keep the intro native text. Test a small set of safe text-only measures / explicit semantic line break options that preserve the cream reading lane and do not re-enter the blue aperture. Do not solve by rasterizing copy or blindly shrinking type.

## Defect 2 — back artifact identity is visibly clipped

Current back `205:21` at 1000px and native `1480×2100` shows the intended `RETURN NOTE` kicker only partially; the visible result reads approximately `RETUR...` at the upper-left cream aperture.

Live geometry:

- kicker: `205:33 / TEXT / BACK KICKER`
- x `176`
- y `260`
- width `320`
- height `34`

### Root-cause hypothesis

The native identity role is structurally inside the root, but the surrounding fixed aperture/sun geometry masks or visually occludes part of the word. This is an optical/field-ownership failure rather than a simple canvas overflow.

### Required bounded repair

Keep the label native. Move only the kicker into an unobstructed stable lane, or adjust the responsible fixed-art geometry in a rollback-safe comparison. Do not replace the identity with generic filler English and do not bake it into SVG.

## Defect 3 — decorative travel gesture crosses the factual date

Current back `205:21` at native `1480×2100` shows the turquoise fixed-art gesture running through the factual date `2026.10.24`. This visibly damages a confirmed factual role even though text-text collision counts are zero.

Live geometry:

- date: `205:36 / TEXT / DATE`
- x `760`
- y `1660`
- width `560`
- height `84`
- fixed-art route/sweep vectors in the same lower zone include `205:30` and `205:31`; `205:31` spans approximately y `1540.5 → 1888` and visually crosses the date.

### Root-cause hypothesis

Earlier QA verified native text bounds and text-text collisions, but the final fixed-art gesture was not revalidated as a non-text optical collision against the factual cluster on the promoted Current page.

### Required bounded repair

The date remains native and authoritative. Reroute/reposition the subordinate turquoise fixed-art gesture or move the factual cluster to a truly stable lane. Prefer changing the decorative gesture before compromising date legibility. Reverify `DATE → PLACE → COUPLE` as one factual group.

## Three-scale evidence in this audit

- front ~1000px reading render: FAIL on `記 / 録` semantic break;
- back ~1000px reading render: FAIL on clipped identity and visible gesture/date interference;
- back native `1480×2100`: FAIL, confirming both defects are real at actual-size/detail and not thumbnail artifacts.

The defects are therefore material enough to reopen the visual completion state.

## Structure evidence retained

The clean-room Current remains correctly separated under Hybrid Authoring:

Front `205:3` metadata:
- fixed art: `205:4 / VECTOR / FIXED ART`;
- semantic text roles: `205:15` through `205:20`;
- intro remains native `205:17`.

Back `205:21` metadata:
- fixed art: `205:22 / VECTOR / FIXED ART`;
- semantic text roles: `205:33` through `205:38`;
- factual date remains native `205:36`.

No raster/IMAGE role is needed to repair these defects. Existing clean-room construction, legacy preservation and prior long-copy evidence remain useful, but the visual gate must be rerun after repair.

## Authoring-path blocker for this run

Figma's write action requires `figma-use` guidance before mutation. The skill resource is currently exposed by name but returns `ResourceNotReadable` when loaded. Under the Figma tool contract, the production repair must not be executed without that guidance.

This is a transient authoring-path blocker for mutation only. Read-only screenshot/metadata and exact Drive/Git authority are available and were reverified.

Do not repeat speculative mutation attempts while the same capability state persists. When the guidance path is readable again, execute the bounded repair directly from the node IDs above.

## Required post-repair gate

After a safe Figma write path is available:

1. preserve current `205:3 / 205:21` as rollback before mutation;
2. repair front semantic intro line break without aperture regression;
3. repair full visibility of `RETURN NOTE` identity;
4. remove fixed-art collision from `2026.10.24` without flattening factual copy;
5. inspect whole-item / ~500px;
6. inspect reading / ~1000px;
7. inspect actual native `1480×2100`;
8. rerun realistic long-copy stress for front/back because text measure / fixed-art lanes changed;
9. structure-readback native text, outside text, fixed-height text, SVG/vector editability and IMAGE fills;
10. only then restore `SELLABLE_VISUAL_QA_PASS`.

## Learning state

`OBSERVED → ROOT_CAUSE_HYPOTHESIS`

Candidate fingerprint: `PROMOTED_CURRENT_FIXED_ART_TEXT_OPTICAL_COLLISION_AND_SEMANTIC_BREAK`.

Do not promote a project-wide rule from this one item. The transferable QA hypothesis is narrower: a clean-room candidate that passed structural/text-text collision checks must still be re-rendered after promotion at native size because fixed art can optically collide with factual/native copy and final text measure can introduce Japanese semantic breaks.

## Current result

`CURRENT_SELECTED / SELLABLE_VISUAL_QA_REOPENED / DESIGN_QA_PASS_WITH_PLACEHOLDERS / ACTUALSIZE_VISUAL_DEFECTS_OBSERVED / REPAIR_PENDING / CLEANROOM_A2_RETAINED / LEGACY_PRESERVED / NOT_PRINT_READY`
