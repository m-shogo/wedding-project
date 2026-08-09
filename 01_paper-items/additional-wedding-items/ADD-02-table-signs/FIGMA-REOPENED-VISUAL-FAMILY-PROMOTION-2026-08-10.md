# ADD-02 — Reopened Visual Family Review and Production Promotion

Date: 2026-08-10
State: `SELLABLE_VISUAL_QA_PASS / DESIGN_QA_PASS_WITH_PLACEHOLDERS / PRODUCTION_PROMOTED / ROLLBACK_SAFE / NOT_PRINT_READY`

## Live authority

- latest observed `main` immediately before the evidence write: `159ee88a6c0dd9ed7aeca35d73f3e5e99fd1f6c9`
- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Figma file key: `LAZAZ0u3RGqtN4bYFPZ3pU`
- production page: `1:3 / 02_TABLE_SIGNS`
- Drive authority folder: `1KmbIncy5Wl6aEqqjBQmssCsw_KZjM62r / ADD-02_11卓の国別テーブルサイン`

## Family review

A dedicated rollback-safe family board was created at `19:2 / QA_ADD_02_FAMILY_REVIEW_2026_08_10` and the eleven clean-room directions were reviewed together at thumbnail scale rather than individually.

The family review confirmed that the collection has a coherent print/editorial family resemblance without returning to one repeated template: each sign keeps the same 1000×1480 format, safe-area logic, dominant country headline, native Japanese destination label, lower information zone and table-number logic, while destination-specific grammar changes materially between coastal, architectural, tile, night-print, Japanese poster, harbor-grid, tropical-modernist, volcanic-carved, hanji-modular and horizon-field treatments.

The main family outlier was Italy. Its previous V2 read as a half-finished poster because `ITALIA` and `TABLE 02` sat in the lower cream field, the table number appeared twice, and the architecture hero carried no dominant country headline.

## Italy repair before promotion

Italy clean-room `9:2` was materially repaired before family promotion:

- moved the main country headline into the architecture field and changed it to the family-facing `ITALY` hierarchy;
- added native `イタリア` as the lower information headline;
- moved `TABLE 02` into the hero and repaired contrast after screenshot review;
- removed the duplicate giant ghost `02`;
- retained only one production table number at lower right;
- added a restrained vertical register and common `WEDDING JOURNEY · TABLE SERIES` folio;
- preserved the architecture/arch/earth-tone grammar rather than copying another destination.

Post-repair screenshot review showed the Italy sign now reads as part of the same series at thumbnail scale while remaining distinct from France and Spain.

## Production promotion

Before changing production, a complete rollback section was created:

- `21:103 / ROLLBACK_ADD_02_PRE_SELLABLE_VISUAL_PROMOTION_2026_08_10`

The eleven production frame IDs were then preserved and their contents replaced by the selected clean-room children:

| Table | Production frame retained | Promoted clean-room source |
| --- | --- | --- |
| 01 Hawaii | `2:2 / FRAME_TABLE_SIGN_HAWAII` | `11:2` |
| 02 Italy | `2:11 / FRAME_TABLE_SIGN_ITALY` | repaired `9:2` |
| 03 France | `2:20 / FRAME_TABLE_SIGN_FRANCE` | `13:2` |
| 04 Spain | `2:29 / FRAME_TABLE_SIGN_SPAIN` | `13:20` |
| 05 Taiwan | `2:38 / FRAME_TABLE_SIGN_TAIWAN` | `14:2` |
| 06 Japan | `2:47 / FRAME_TABLE_SIGN_JAPAN` | `12:2` |
| 07 Hong Kong | `2:56 / FRAME_TABLE_SIGN_HONG_KONG` | `16:2` |
| 08 Singapore | `2:65 / FRAME_TABLE_SIGN_SINGAPORE` | `16:29` |
| 09 Bali | `2:74 / FRAME_TABLE_SIGN_BALI` | `16:49` |
| 10 Korea | `2:83 / FRAME_TABLE_SIGN_KOREA` | `16:72` |
| 11 Maldives | `2:92 / FRAME_TABLE_SIGN_MALDIVES` | `16:93` |

A post-promotion whole-family review board was created at `21:452 / QA_ADD_02_PRODUCTION_FAMILY_AFTER_PROMOTION_2026_08_10` and visually checked after the production write.

## Screenshot visual gate

Whole-family post-promotion screenshot passed the reopened visual gate:

- no repeated three-template color-block system remains;
- no web-card/admin-dashboard pattern is visible at thumbnail scale;
- table numbers remain easy to scan across the set;
- large destination typography carries hierarchy rather than decorative badges;
- country-specific grammar is visible without literal tourism stock imagery or cliché icons;
- Italy no longer reads as an unfinished outlier;
- the set remains varied without appearing as eleven unrelated brands.

## Structure readback after promotion

Live Plugin API readback after production promotion:

| Production | Size | Native text | IMAGE fill nodes | Safe guide | Text outside root |
| --- | --- | ---: | ---: | ---: | ---: |
| Hawaii `2:2` | 1000×1480 | 7 | 0 | 1 | 0 |
| Italy `2:11` | 1000×1480 | 8 | 0 | 1 | 0 |
| France `2:20` | 1000×1480 | 7 | 0 | 1 | 0 |
| Spain `2:29` | 1000×1480 | 7 | 0 | 1 | 0 |
| Taiwan `2:38` | 1000×1480 | 7 | 0 | 1 | 0 |
| Japan `2:47` | 1000×1480 | 7 | 0 | 1 | 0 |
| Hong Kong `2:56` | 1000×1480 | 7 | 0 | 1 | 0 |
| Singapore `2:65` | 1000×1480 | 7 | 0 | 1 | 0 |
| Bali `2:74` | 1000×1480 | 7 | 0 | 1 | 0 |
| Korea `2:83` | 1000×1480 | 7 | 0 | 1 | 0 |
| Maldives `2:92` | 1000×1480 | 7 | 0 | 1 | 0 |

No rasterized text was introduced. All variable/dummy copy remains native editable text. The required hidden safe guide exists in every production frame.

## Image-generation / Drive status

`IMAGE_GEN_UNAVAILABLE_THIS_RUN`.

No generated image is claimed, saved, or placed. The quality bottleneck in this pass was family composition and typographic hierarchy, so the run completed the sellable gate using native graphic/editorial construction instead of forcing generic tourism imagery into the signs.

Drive authority was re-read immediately before promotion. Drive changes: `0`. The authority folder is currently empty; no raster candidate was adopted.

## Decision

`ADD_02_REOPENED_VISUAL_PASS_CLOSED / SELLABLE_VISUAL_QA_PASS / DESIGN_QA_PASS_WITH_PLACEHOLDERS / PRODUCTION_PROMOTED / ROLLBACK_SAFE / NOT_PRINT_READY`

ADD-02 may now progress out of the reopened visual queue. Physical proof, printer/vendor constraints, final explanatory copy and any future adopted imagery remain `DEFERRED_FINALIZATION` and must not invalidate the verified native visual/structure work by themselves.

Next target: `ADD-03 当日タイムテーブルボード`.