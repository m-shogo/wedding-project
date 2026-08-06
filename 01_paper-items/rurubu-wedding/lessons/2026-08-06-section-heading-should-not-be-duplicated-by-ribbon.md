# Section Heading Should Not Be Duplicated by a Ribbon

Date: 2026-08-06
Status: `VERIFIED FOR V5 / NOT YET PROJECT_RULE`

## Source

Live Rurubu V5 back cover, route-module nodes `77:47`, `77:98`, and `77:99`.

## Hypothesis

When a section already has a clear native heading and complete visual structure, a nearby ribbon repeating the same section meaning may add color-field noise and a UI-like badge silhouette without improving navigation.

## Result

Hiding the yellow ribbon and its repeated label preserved `OUR JOURNEY ROUTE`, the six-event route, dates, event labels, footer, native text, image hashes, fold guide, semantic structure, and rollback nodes. Whole-item, reading-scale, and actual-size/structure review found no empty gap, collision, clipping, text reflow, or hierarchy loss.

## Failure / limit

This is not a blanket rejection of section ribbons. A ribbon can remain when it provides unique navigation, required contrast, or a deliberate magazine locator that is not already supplied by the heading and module geometry.

## Adopted use

For Rurubu V5, test subtraction whenever a ribbon and adjacent heading communicate the same section. Preserve the more editorially direct device and verify all three scales.

## Next application

Audit remaining color bars, badges, kickers, and headings for duplicated semantic function. Do not remove unique information or necessary contrast.