# ADD-02 — V4C 11-table family thumbnail QA

Date: 2026-08-29
Scope: non-Rurubu only
Latest main immediately before write: `3e47ddf8607fb2b1757bb0de48e4b648870b7b71`
Current authority: `docs/automation/non-rurubu-figma-quality-current.md` = `ACTIVE / HOURLY / FIGMA_EDIT_ALLOWED / VISUAL_REOPENED`
Status: `FAMILY_THUMBNAIL_QA_COMPLETE / SELLABLE_VISUAL_QA_PASS_WITHHELD / NOT_PRINT_READY`

## Live Figma authority

FileKey: `LAZAZ0u3RGqtN4bYFPZ3pU`

All 11 serious V4C comparison roots were live-read back before family QA:

1. `232:22` — TABLE 01 HAWAII / PACIFIC POSTCARD
2. `229:2` — TABLE 02 ITALY / TERRACOTTA LOGGIA
3. `228:2` — TABLE 03 FRANCE / ARCADE POSTER
4. `210:2` — TABLE 04 SPAIN / CERAMIC COURTYARD
5. `218:2` — TABLE 05 TAIWAN / PAPER LIGHT CANOPY
6. `234:2` — TABLE 06 JAPAN / INDIGO BOOK JACKET
7. `235:2` — TABLE 07 HONG KONG / HARBOUR BROADSHEET
8. `236:2` — TABLE 08 SINGAPORE / TROPICAL MODERNIST BROADSHEET
9. `237:2` — TABLE 09 BALI / SPLIT GATE FOLIO
10. `222:2` — TABLE 10 KOREA / HANJI INK WINDOW
11. `237:58` — TABLE 11 MALDIVES / LAGOON TYPOGRAPHIC CUT

Pages:
- `201:2 / V4B_CLEANROOM_ADD02_EDITORIAL_PRINT_2026_08_28`: Hawaii, Italy, France, Spain, Taiwan, Japan, Hong Kong, Korea
- `197:2 / V4_CLEANROOM_ADD02_COUNTRY_SIGNS_2026_08_28`: Singapore, Bali, Maldives

## Family contact-sheet evidence

A QA-only contact sheet was created from scaled clones of the 11 candidate roots:

- `239:2` — `QA / V4C / ADD-02 / 11 TABLE FAMILY / THUMBNAIL CONTACT SHEET`
- source frames were cloned only for QA; none of the candidate roots or retained V4 production were mutated
- contact sheet was rendered at `1060 × 1040` for one-screen comparison, then hidden after review

## Family-level visual result

Meaningful improvement is clear. Across the 11 signs, the family now shares a warm-paper base, strong country-first typography, table number/date roles, controlled dark rails/fields and destination-specific editorial art direction. Bali and Maldives close the previous gap where the clean-room family had only nine V4C directions.

However, `SELLABLE_VISUAL_QA_PASS` is deliberately **withheld** at family level. The one-screen comparison exposed residual consistency problems that are easier to see as a set than item-by-item:

- France still leaves an unusually large lower field that can read as empty-premium whitespace rather than intentional composition when placeholder copy is short;
- Spain and Taiwan carry substantially more upper-field visual density than France/Japan/Hong Kong, producing a noticeable family rhythm jump;
- title vertical position and hero-art/copy balance still vary enough that the 11 signs do not yet feel like a single intentionally art-directed collection at first glance.

The family therefore advances to `FAMILY_THUMBNAIL_QA_COMPLETE`, not production promotion.

## Print-first family view

Working physical authority remains `100 × 148 mm` for the V4C table-sign candidates (`1000 × 1480 px`, 10 px/mm working geometry).

New Bali/Maldives candidates are all-vector/native-text and contain zero IMAGE fills, so effective raster PPI is `N/A` and there is no `RESOLUTION_WARNING` for those two. Their smallest intentional print rules are about `0.8mm`, avoiding hairline dependence.

Family CMYK risk remains destination-dependent but is concentrated in deep navy/indigo/green/charcoal fields, saturated aqua/cyan, coral/vermillion, saffron/ochre/gold and warm cream. Grayscale hierarchy and vendor-profile conversion must be checked before print promotion.

`DESIGN_COMPLETE != PRINT_READY` remains mandatory. `DEFERRED_FINALIZATION` still includes printer template, confirmed trim/bleed/safe, holder/easel occlusion, final stock/coating, CMYK/profile, black construction, PDF/font embed/transparency, overprint/knockout, preflight and 100% physical proof.

No QR, fold, punch, perforation, signature or handwriting field applies to the current ADD-02 table-sign authority.

## Next safe work

Use the family sheet rather than isolated-item taste as the next authority for refinement. Highest-value sequence:

1. France — close the lower-field hierarchy/empty-whitespace weakness without turning it into a dense card/grid;
2. compare Spain/Taiwan density against the family midpoint and simplify only if first-read is being lost;
3. normalize title/copy optical rhythm across all 11 while preserving destination-specific art direction;
4. rerender the family contact sheet and only then decide `SELLABLE_VISUAL_QA_PASS`.
