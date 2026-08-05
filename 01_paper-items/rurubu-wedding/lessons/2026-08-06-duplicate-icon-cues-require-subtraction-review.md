# Duplicate icon cues require subtraction review

Date: 2026-08-06
Scope: Rurubu V5/V6 and later editorial paper items
Status: `PROTOTYPED / VERIFIED ON ONE BOUNDED ROLE / NOT PROJECT_RULE`

## Source

The V5 MEMORY SPOTS heading area contained both a raster map-pin decoration (`77:462`) and a native semantic pin (`77:504`) in close proximity.

## Hypothesis

When two nearby graphics communicate the same semantic role, retaining both can create accidental duplication and decorative noise. Removing the less editable, less necessary cue should improve hierarchy without weakening meaning.

## Result

The raster decoration was hidden while the native semantic pin was preserved. Whole-spread, page, and actual-size screenshot QA showed a cleaner heading-to-content transition without a blank gap, semantic loss, or structural regression.

## Verified evidence

- hidden raster node: `77:462`
- preserved semantic node: `77:504`
- native text count unchanged: `94`
- fold guide and V4 rollback frames preserved
- photo hashes and crop geometry unchanged

## Reusable principle under test

Before keeping multiple icons, stickers, or illustrations around one heading, identify whether they provide distinct information. When they repeat the same cue, test subtraction first and prefer the native/editable semantic element when it remains visually sufficient.

## Limits

This is one verified case. It does not establish that raster decoration is always inferior or that every repeated icon must be removed. Repetition may be useful for rhythm, navigation, or emphasis when the roles are distinct and verified at all three scales.

## Adoption status

`VERIFIED FOR V5 CURRENT / NOT YET PROJECT_RULE`

Apply forward as a review question, not an automatic deletion rule.
