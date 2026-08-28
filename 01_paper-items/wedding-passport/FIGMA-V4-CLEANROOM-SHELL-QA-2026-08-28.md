# WEDDING PASSPORT — Figma V4 clean-room shell QA

Date: 2026-08-28
State: `V4_STRUCTURAL_SHELL_CREATED / REFERENCE_LED / THREE_SCALE_QA_PARTIAL_PASS / FIXED_IDENTITY_ASSET_MISSING / NOT_PRINT_READY`
Start/latest main before write: `9616e2136cb84d21eb48d194cef65082ab54b188`
Current authority: `docs/automation/non-rurubu-figma-quality-current.md`
Figma authority: `UbK8KmuWJcDeGScsN49Uor`
Drive authority: `1LnGb9tq_Vswe-GKO6UxfvKMAZuShEaaw`
Reference study: Drive `1ldCXv5kaHqRpSBdbzyLPvYp0FxPE6MvZTwFJACoe8RM / 01_パスポート風｜参考画像ギャラリー・分析`

## Clean-room provenance

V4 was created from blank Figma frames. No old production/V2/V3 frame, legacy layout group, decorative asset, image crop, generated asset, or historical visual treatment was duplicated into the new V4 shell. Only verified non-visual facts/constraints were re-authored: provisional A5-class working geometry, fixed event date/location, front/back/menu+drink/seating semantic roles, 11 tables with maximum 7 guests/table, and the requirement that variable factual copy remain native editable text.

The V4 visual direction follows the current Passport reference study rather than Rurubu-specific layout/palette/density rules. Working direction remains `NAVY BOOKLET / IVORY INDEX / MUTED GOLD`.

## New Figma roots

- `226:2` — `V4 / PASSPORT / FRONT / CLEANROOM / 2026-08-28`
- `226:15` — `V4 / PASSPORT / BACK / CLEANROOM / 2026-08-28`
- `226:26` — `V4 / PASSPORT / MENU + DRINK / CLEANROOM / 2026-08-28`
- `226:71` — `V4 / PASSPORT / SEATING / CLEANROOM / 2026-08-28`

All four roots use the provisional `1480 × 2100` working canvas. Existing historical/rollback/production frames remain untouched.

## Hybrid authoring split

- native Figma text: titles, date/location, couple placeholders, message copy, menu/drink content, table labels, guest-name placeholders and other factual/variable fields;
- native/simple vector geometry: rules, central index axis, low-detail placeholder meridian/orbit geometry;
- generated/composed raster: none placed yet;
- replaceable photography: none required by this first Passport V4 shell;
- fixed generated identity role: still intentionally missing; the central front role remains a low-information placeholder only.

Fonts used in the V4 shell: `Noto Sans JP Regular`, `Noto Sans JP Medium`, `Inter Bold`.

## Live corrections made during authoring

### Front accidental fill correction

The initial front rendered as a large muted-gold/brown field even though the frame background was deep navy. Readback showed `DECOR / INNER HAIRLINE` had been created as a `1340 × 1960` filled rectangle rather than a hairline. It was corrected to `fills=0`, `strokes=1` with a muted-gold 2 px stroke. The corrected front now renders as the intended deep-navy booklet field.

### Front title/date hierarchy correction

The first native title auto-height expanded to roughly `402 px` and collided with the date band. The title was re-authored as:

`ふたりの旅のしおり / WEDDING PASSPORT`

with a 96 px primary size and final observed title height `230 px`. The gold rule moved to `y=600`, date to `y=655`, and location to `y=735`. The dashed box around the fixed-identity placeholder was removed because it read as UI-like containment; only a quiet meridian/orbit placeholder remains.

### Seating overflow and microtype correction

The first 11-table shell placed table 06 below the page edge. Table groups were compacted to a 250 px vertical rhythm without reducing the required content count. Final readback:

- table 06 rule `y=1908`;
- table 11 rule `y=1658`;
- every guest role still contains seven native placeholders;
- guest text `22 px`, explicit line height `26 px`;
- each 7-name guest list height `182 px`;
- maximum guest-list bottom `1928 < 2100` frame height.

At the provisional `10 px = 1 mm` working scale, 22 px is about 2.2 mm, or approximately 6.2 pt nominal. It is visible in the 100% Figma render but remains near the lower practical range for a dense seating list. Long-real-name stress and physical/100% print proof are still required before promotion.

## Reference-led visual result

### Front

Deep navy is dominant, warm ivory is text/support, muted gold is restrained accent. The native title/date hierarchy now reads clearly without card/UI grammar. The central identity role is deliberately quiet and currently incomplete; it does not yet provide the premium fixed booklet identity required to close the reference gap.

### Back

Warm-ivory field with an asymmetric deep-navy lower/right closing field. Native thank-you/message copy retains a large text-safe area. It reads as a booklet closing face rather than a web panel, but final copy stress and print-color proof remain pending.

### Menu + drink

Native copy is the visual hero. Food and drink have intentionally unequal column weights and do not use rounded cards. The current shell is clean and readable; no generated texture has yet been justified. A fixed paper/material field should only be generated if later reference comparison shows the flat ivory field is materially under-resolved.

### Seating

Eleven table groups are distributed around a central index field; table/name finding remains primary. No literal map, card grid or generated decoration was added. All 11 groups fit after correction. The current structure is readable, but guest-name microtype needs long-name and physical print proof before a sellable/print-ready claim.

## Screenshot QA

Fresh screenshots were reviewed during this run at:

- thumbnail / ~500 px: front, back, menu, seating;
- reading / ~1000 px: menu and seating;
- actual-size / native `1480 × 2100`: front and seating.

Observed result:

- front: clear first read after the title/date correction; no dashed UI container remains; central fixed identity still visibly incomplete;
- back: coherent close, native message readable, no obvious web-card grammar;
- menu: food/drink hierarchy clear and non-equal; no repeated card system;
- seating: all 11 tables visible and in-bounds; seven native guest placeholders remain per table.

This is a structural/reference-led shell pass, not `SELLABLE_VISUAL_QA_PASS`. The reference study still has stronger fixed front identity than the current placeholder shell.

## Generated asset / Drive status

Generated assets: `0`
Drive writes: `0`
Raster PPI status: `N/A` because no raster asset is placed in these new V4 roots yet.

The existing pre-generation brief's `FINAL MISSING ASSET LIST` remains active. After seeing the first clean-room composition, asset A — the front fixed identity field — is now a confirmed high-value missing role. It should be generated/selected only from the existing role brief and must target >=300 ppi effective at its final placement. Asset B — subtle interior paper treatment — is still conditional and should not be generated unless the flat interior materially loses the reference comparison.

## Print-first status

`NOT_PRINT_READY` remains mandatory.

Still deferred:

- exact printer template;
- vendor-confirmed bleed/trim/safe geometry;
- final imposition;
- CMYK/profile conversion and dark-navy/muted-gold proof;
- final menu/drink copy and realistic long-copy stress;
- real guest names / long-name seating stress;
- PDF export/preflight;
- effective-PPI QA after any raster is placed;
- 100% or physical proof.

The historically documented 3 mm bleed and 5 mm safe inset remain provisional layout-prep values only and are not treated as vendor authority.

## Next exact task

1. Preserve these four V4 roots and old production unchanged.
2. Run realistic long-copy/long-name stress on menu and seating without shrinking text below a defensible print threshold.
3. Produce/select materially different candidates for the already-specified front fixed identity role when an approved generation path is available; do not generate fake text, official crests, generic airplanes, or passport credentials.
4. Save only serious/adopted raster masters to the exact Passport Drive authority and read back file IDs/metadata.
5. Place the adopted asset below native title/date, then rerun thumbnail / reading / actual-size / effective-PPI QA.
6. Only after the V4 is independently mature, compare it with retained production and decide whether it earns `SELLABLE_VISUAL_QA_PASS`.
