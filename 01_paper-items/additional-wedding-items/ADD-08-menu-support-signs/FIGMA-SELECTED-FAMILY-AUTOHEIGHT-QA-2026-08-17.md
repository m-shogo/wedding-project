# ADD-08 メニュー補助サイン — Selected Family Native Text Auto-height QA

Status: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / CLEANROOM_SELECTED_FAMILY / NATIVE_TEXT_AUTOHEIGHT_PASS / LONG_COPY_STRESS_PASS / LEGACY_PRESERVED / NOT_PRINT_READY`
Date: 2026-08-17
Start authority SHA: `1a8fb604301e9c92702b2d58c9dc37c36747d792`

## Authority

- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Figma file: `xvJH23nWjWAApd3yOwr4y3`
- selected Drink V3: `21:3 / CLEANROOM_ADD08_V3_A4_DRINK_LEDGER`
- selected Allergy / Dietary V2: `18:19`
- selected World Trip V3: `21:43 / CLEANROOM_ADD08_V3_A4_WORLD_TRIP_CHAPTERS`
- hidden long-copy stress: Drink `23:34`, World Trip `23:75`
- Drive authority: `12D7UPRTDwUx7vLOm1mtaew-sFGHt9FPG / ADD-08_メニュー補助サイン`
- retained legacy production remains unchanged.

## Visible / structural issue

Fresh structural readback found that the selected Drink and World Trip clean-room roots still contained native text boxes with `textAutoResize=NONE` and a fixed height of only `10 px`, even though screenshots rendered acceptably with the current copy.

Affected roles included:

- Drink: kicker, two-line title, footer/date labels, and six right-side measure numbers;
- World Trip: kicker, two-line title, introduction, date and journey footer;
- the corresponding hidden long-copy stress roots carried the same fixed-height implementation.

This is a latent editability defect: current strings can look correct while a font-metric or copy change can clip native text.

The Allergy / Dietary V2 root had no equivalent fixed-height defect and was not changed.

## Rollback

Before mutation, hidden rollback copies were created in:

- section `25:2 / ROLLBACK / ADD-08 / AUTOHEIGHT REPAIR / 2026-08-17`;
- Drink selected rollback `25:3`;
- World Trip selected rollback `25:44`;
- Drink stress rollback `25:82`;
- World Trip stress rollback `25:123`.

## Bounded Figma repair

Only affected native text boxes were changed from fixed `NONE / 10 px` behavior to `textAutoResize=HEIGHT`.

Representative expansion after repair:

- Drink kicker `21:23`: `10 → 38 px`;
- Drink title `21:24`: `10 → 210 px`;
- Drink measure numbers `21:37–21:42`: `10 → 46 px` each;
- World Trip kicker `21:55`: `10 → 38 px`;
- World Trip title `21:56`: `10 → 194 px`;
- World Trip intro `21:57`: `10 → 76 px`;
- World Trip date `21:72`: `10 → 35 px`.

The same change was applied to the corresponding Drink and World Trip long-copy stress roots.

No copy, layout coordinates, rule/vector geometry, palette, image role or legacy production node was replaced.

## Post-repair visual QA

Fresh selected-family screenshots remained visually stable:

- Drink `21:3`: whole/read-scale PASS. Editorial ledger hierarchy remains intact and no text is clipped.
- World Trip `21:43`: whole/read-scale PASS. 01/02/03 chapter hierarchy and right-side route artwork remain intact.
- Allergy / Dietary `18:19`: unchanged.

No new image, box, badge, shadow, gradient or decorative filler was introduced.

## Post-repair structure QA

Absolute-bounding-box checks after repair:

### Drink selected `21:3`

- size: `1400×1980`;
- visible native text: `17`;
- remaining tiny fixed-height text: `0`;
- visible text outside root: `0`;
- text-to-text collisions: `0`;
- visible proof-language: `0`;
- IMAGE fills: `0`.

### World Trip selected `21:43`

- size: `1400×1980`;
- visible native text: `16`;
- remaining tiny fixed-height text: `0`;
- visible text outside root: `0`;
- text-to-text collisions: `0`;
- visible proof-language: `0`;
- IMAGE fills: `0`.

### Long-copy stress

- Drink `23:34`: remaining tiny fixed-height text `0`, outside text `0`, text collisions `0`;
- World Trip `23:75`: remaining tiny fixed-height text `0`, outside text `0`, text collisions `0`.

The stress strings deliberately retain QA-only long-copy wording because they are hidden evidence, not guest-facing production.

## Drive / image decision

Drive authority was re-read live as `12D7UPRTDwUx7vLOm1mtaew-sFGHt9FPG`. This defect was native text geometry, not missing artwork, so Drive writes and image generation were both `0`.

## Decision

The existing clean-room selected family remains selected and retains:

`SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / CLEANROOM_V3_SELECTED_FOR_DRINK_WORLD / ALLERGY_V2_RETAINED / LONG_COPY_STRESS_PASS / LEGACY_PRESERVED / NOT_PRINT_READY`.

This run adds `NATIVE_TEXT_AUTOHEIGHT_PASS` and aligns the live Figma structure with the already-promoted cross-item rule that native variable text must be structurally resilient even when current screenshots happen to look correct.