# WEDDING PASSPORT — Figma V4 clean-room shell QA

Date: 2026-08-28
State: `V4_STRUCTURAL_SHELL_CREATED / REFERENCE_LED / SEATING_PRINT_READABILITY_IMPROVED / THREE_SCALE_QA_PARTIAL_PASS / FIXED_IDENTITY_ASSET_MISSING / NOT_PRINT_READY`
Start/latest main before this write: `b3d085e330fd3e91e2cb2a3938d9b199404c331a`
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
- native/simple vector geometry: rules and the low-detail placeholder meridian/orbit geometry on the front;
- generated/composed raster: none placed yet;
- replaceable photography: none required by this first Passport V4 shell;
- fixed generated identity role: still intentionally missing; the central front role remains a low-information placeholder only.

Fonts used in the V4 shell: `Noto Sans JP Regular`, `Noto Sans JP Medium`, `Inter Bold`.

## Live corrections made during authoring

### Front accidental fill correction

The initial front rendered as a large muted-gold/brown field even though the frame background was deep navy. Readback showed `DECOR / INNER HAIRLINE` had been created as a `1340 × 1960` filled rectangle rather than a hairline. It was corrected to `fills=0`, `strokes=1` with a muted-gold 2 px stroke.

### Front title/date hierarchy correction

The first native title auto-height expanded and collided with the date band. The title was re-authored as `ふたりの旅のしおり / WEDDING PASSPORT` with a 96 px primary size. The dashed box around the fixed-identity placeholder was removed because it read as UI-like containment.

### Front internal-copy print-safety correction — 2026-08-28

Fresh actual render showed guest-facing internal authoring text `このページの文字情報は後から編集できます` still visible at the bottom of the cover. This violates the Current rule against printing internal authoring language. Node `226:14 / TEXT / ISSUE NOTE` was hidden. Fresh screenshot after mutation confirms the sentence no longer appears on the printed face.

### Seating print-readability reallocation — 2026-08-28

Fresh native-size review showed a large decorative central `TABLE INDEX` field consuming horizontal space while 77 guest-name slots were compressed to 22 px / 26 px line height (about 6.2 pt nominal at the provisional `10 px = 1 mm` scale). The decorative role was not carrying enough reader value to justify that loss of print legibility.

The V4 seating root `226:71` was therefore changed without touching old production:

- hid central decorative nodes `226:76`, `226:77`, `226:78`, `226:79`;
- widened both guest columns from `390 px` to `560 px`;
- right column moved from `x=980` to `x=810`;
- retained all 11 tables and exactly seven native guest placeholders per table;
- guest-name text increased from `22 px / 26 px` to `25 px / 30 px`;
- table vertical rhythm re-authored to `startY=360`, `278 px` step;
- final left table 06 guest-list bottom is `2027 < 2100`;
- footer remains in-bounds and the right-side table 11 ends substantially earlier.

At the provisional working scale, 25 px is about 2.5 mm or roughly 7.1 pt nominal. This is a meaningful print-legibility improvement without reducing required guest capacity. Real-name long-copy and physical/100% print proof remain required before promotion.

## Reference-led visual result

### Front

Deep navy is dominant, warm ivory is text/support, muted gold is restrained accent. The native title/date hierarchy reads clearly without card/UI grammar. The central identity role is deliberately incomplete and remains the largest visual gap to the current Passport reference.

### Back

Warm-ivory field with an asymmetric deep-navy closing field. Native thank-you/message copy retains a large text-safe area. Final copy stress and print-color proof remain pending.

### Menu + drink

Native copy is the visual hero. Food and drink have intentionally unequal column weights and do not use rounded cards. No generated texture is currently justified.

### Seating

The previous large center index field has been removed from the active visual hierarchy. The page is now a direct two-column lookup surface with wider name measures and larger native guest text. The result is less decorative but more credible as an A5 print utility page and more aligned with the reader-first purpose of the Passport interior.

## Screenshot QA

Fresh screenshots reviewed during the latest run:

- front `226:2`: reading / actual-size oriented render after hiding internal copy;
- menu `226:26`: reading scale;
- seating `226:71`: actual-size/native geometry before and after the print-readability change.

Latest observed result:

- front: internal editing note is gone; first-read remains title → date/location → fixed-identity area → couple names;
- menu: food/drink hierarchy remains clear and non-equal;
- seating: all 11 tables remain visible and in-bounds; table lookup is faster; guest names have materially more horizontal room and larger type; no center decorative panel competes with the data.

This is still not `SELLABLE_VISUAL_QA_PASS`. Front fixed identity remains under-resolved versus the reference study.

## Generated asset / Drive status

Generated assets this run: `0`
Drive writes this run: `0`
Raster PPI status: `N/A` because no raster asset is placed in the V4 roots yet.

Drive image search found older Passport assets such as `passport_emblem_globe_plane_laurel_v2.png` (`1DRuep9shagE_007KEIHY7NmKcxA4HzRc`) and prior paper-texture masters. They were **not adopted** because the V4 clean-room rule prohibits reusing old production/generated visual assets as the new V4 identity. The search therefore confirms that the missing front identity role still needs a new V4-specific candidate rather than silently reusing legacy art.

The existing `FINAL MISSING ASSET LIST` remains active. Asset A — front fixed identity field — is confirmed high-value and must target >=300 ppi effective at final placement. Asset B — subtle interior paper treatment — remains conditional and should not be generated unless a later reference comparison proves the flat field materially under-resolved.

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

1. Preserve all four V4 roots and old production unchanged.
2. Run long-name stress against the new 560 px / 25 px seating measure; do not solve overflow by shrinking below the current print floor.
3. Produce/select materially different V4-specific candidates for the front fixed identity role when a generation path is available; do not reuse the old emblem, generate fake text, official crests, generic airplanes, or passport credentials.
4. Save only serious/adopted raster masters to the exact Passport Drive authority and read back file IDs/metadata.
5. Place the adopted asset below native title/date, then rerun thumbnail / reading / actual-size / effective-PPI QA.
6. Only after V4 is independently mature, compare it with retained production and decide whether it earns `SELLABLE_VISUAL_QA_PASS`.
