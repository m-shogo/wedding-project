# ADD-06 フォトブースサイン — English Support Copy Subtraction QA

Status: `VERIFIED_LOCAL / CLEANROOM_V3_SELECTED_CANDIDATE / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / LONG_COPY_STRESS_PASS / LEGACY_PRESERVED`
Date: 2026-08-18
Start authority SHA: `ebab0adcf8ec08fb16c17cbe3a584dc67a3fe7ec`

## Authority

- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Figma file: `SVMALDUyhc2chxHa4fvdjx`
- selected V3: `25:3 / CLEANROOM_ADD06_V3_SELECTED_A3_BEST_SHOT_LENS_POSTER`
- long-copy stress: `25:41 / QA_ADD06_V3_LONG_COPY_STRESS_2026_08_15`
- Drive authority: `1Ehk_oQ8vhAGo3DYBbgyOGfA03u0pu5wb`

## Visible issue

Fresh actual-size review found that `Capture a memory from our special journey.` was functioning as decorative English filler between the large `BEST SHOT` title and the functional Japanese reader cue `写真撮影はこちら`.

The photo/lens role is already communicated by `PHOTO SPOT`, `BEST SHOT`, the editable lens artwork and the Japanese wayfinding line. The extra English sentence added template-like travel copy without adding information needed by a guest.

## Bounded comparison

A rollback-safe comparison was created without touching the selected V3:

- `29:2 / QA_ADD06_V3_NO_ENGLISH_SUPPORT_2026_08_18`
- only cloned `TXT_PHOTO_SPOT_SUBTITLE` was hidden
- title, `PHOTO SPOT`, Japanese wayfinding, lens/route vectors, date, placement placeholder, safe area and footer were unchanged

The 990×1400 comparison improved first-read hierarchy: `BEST SHOT → 写真撮影はこちら → lens cue → date/location`, with less generic travel-template copy.

## Adopted Figma change

The comparison was adopted rollback-safely:

- selected `25:16 / TXT_PHOTO_SPOT_SUBTITLE` hidden
- stress `25:54 / TXT_PHOTO_SPOT_SUBTITLE` hidden
- selected rollback: `30:2 / ROLLBACK_ADD06_V3_PRE_ENGLISH_SUPPORT_REMOVAL_2026_08_18`
- stress rollback: `30:22 / ROLLBACK_ADD06_V3_STRESS_PRE_ENGLISH_SUPPORT_REMOVAL_2026_08_18`
- comparison `29:2` hidden after adoption

## QA result

Fresh selected screenshot at 990×1400 confirms:

- no loss of photo-booth recognition
- `PHOTO SPOT` remains a functional bilingual kicker
- `BEST SHOT` remains the dominant distant-read title
- `写真撮影はこちら` becomes the direct support cue
- lens and route vectors remain editable and unchanged
- date and `[会場内設置場所]` remain native editable text
- selected visible text outside root: `0`
- stress visible text outside root: `0`
- IMAGE fill count remains `0`

Result: `DECORATIVE_ENGLISH_SUPPORT_SUBTRACTION_PASS`.

The item remains `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / CLEANROOM_V3_SELECTED_CANDIDATE / LEGACY_PRESERVED / NOT_PRINT_READY`.

## Drive / assets

Drive write: `0`.
Image generation: `NOT_REQUIRED`.

The quality bottleneck was redundant guest-facing copy, not missing imagery.
