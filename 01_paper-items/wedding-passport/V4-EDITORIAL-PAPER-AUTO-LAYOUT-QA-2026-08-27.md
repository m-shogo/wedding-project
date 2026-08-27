# WEDDING PASSPORT V4 — Editorial Paper + Auto Layout QA

State: `VERIFIED_LOCAL / V4_VISUAL_REFINEMENT_PASS / LONG_COPY_STRESS_PASS / STRUCTURE_QA_PASS / DRIVE_MASTER_SAVE_BLOCKED / NOT_PROMOTED / NOT_PRINT_READY`

Run start latest-main SHA: `8a187232923bbdb4f6692777b947b5d24c31c387`

## Authority / scope

- Current: `docs/automation/non-rurubu-figma-quality-current.md` = `ACTIVE / HOURLY / FIGMA_EDIT_ALLOWED / VISUAL_REOPENED`
- V4 clean-room evidence: `01_paper-items/wedding-passport/FIGMA-V4-CLEANROOM-HARBOR-ATLAS-2026-08-27.md`
- image-generation-centered policy remains active
- Figma: `UbK8KmuWJcDeGScsN49Uor`
- V4 page: `212:2 / V4_CLEANROOM_2026_08_27`
- exact Drive authority live-confirmed: `1LnGb9tq_Vswe-GKO6UxfvKMAZuShEaaw / 01_パスポート風_メニュー・ドリンク・座席表`
- no Rurubu item-specific Figma / Drive / GitHub content was read or modified

## Visible defect diagnosed

Fresh native-size Cover/Back screenshots showed that the large pale rectangular title/message panels still read as a card placed on top of the Harbor Atlas artwork. This weakened the intended tactile editorial-paper artifact and made Cover and Back too similar in composition.

The repair therefore targeted structure first, not decoration.

## Rollback

Before mutation, hidden rollback copies were created:

- Cover rollback: `217:2 / ROLLBACK / V4 COVER / PRE-EDITORIAL-PAPER-SHAPE / 2026-08-27`
- Back rollback: `217:62 / ROLLBACK / V4 BACK / PRE-EDITORIAL-PAPER-SHAPE / 2026-08-27`

Legacy production / V2 / V3 were not used as construction input.

## Figma refinement

### Cover `212:3`

Current name: `V4 / 01 COVER / HARBOR ATLAS / EDITORIAL PAPER REFINED`

- hid old rectangular `SAFE / TITLE PAPER` as history;
- added composed asymmetric paper plane `217:122 / COMPOSED PAPER / COVER / ANGLED EDITORIAL FIELD`;
- retained Harbor Atlas fixed art `212:109` underneath;
- added one narrow oxblood date-register bar `217:124` with a real reading/hierarchy job;
- kept all reader-facing/date/place/couple copy native editable text.

### Back `212:99`

Current name: `V4 / 04 BACK / RETURN NOTE / QUIET LETTER REFINED`

- hid old rectangular message panel as history;
- added quieter vertical letter field `217:125 / COMPOSED PAPER / BACK / QUIET LETTER COLUMN`;
- added binding rule `217:126`;
- widened the letter lane and reduced headline size slightly only after screenshot QA showed an orphaned third line;
- kept message/date/place/couple copy native text.

This intentionally makes Back calmer and structurally different from Cover instead of reusing the same card treatment twice.

## Long-copy failure → method switch

Two fixed-position long-copy stress attempts failed:

- first QA: `217:127 / 217:190` — title/body collision;
- second QA: `218:2 / 218:65` — repeated collision after coordinate-only adjustment.

Failure fingerprint: `FIXED_Y_COPY_EXPANSION_COLLISION`.

Because the same failure family reproduced twice without a capability change, coordinate nudging was stopped per the project failure rule.

Method switch:

- Cover native variable-copy stack → `218:127 / AUTO / COVER / PRIMARY EDITORIAL STACK`;
- Back native variable-copy stack → `218:131 / AUTO / BACK / LETTER CONTENT STACK`;
- title / message or subtitle / rule / date / place now participate in vertical Auto Layout with explicit semantic spacers;
- no type was reduced below the existing body-copy size to force fit.

## Long-copy stress PASS

Third-pass QA after Auto Layout:

- Cover stress: `219:2 / QA PASS / V4 COVER / LONG COPY STRESS / AUTO LAYOUT PASS3`
  - stack y `238`, height `783`, bottom `1021`;
  - asymmetric paper safe bottom approximately `1112`;
  - screenshot: no title/sub/date collision.
- Back stress: `219:69 / QA PASS / V4 BACK / LONG COPY STRESS / AUTO LAYOUT PASS3`
  - stack y `290`, height `890`, bottom `1180`;
  - quiet-letter field bottom approximately `1414`;
  - screenshot: no title/message/date collision.

Both QA frames were hidden after verification.

## Three-scale visual result

- thumbnail / whole item: Cover now has a clearer asymmetric editorial-paper silhouette; Back is visibly quieter and no longer feels like a copy of Cover;
- reading scale: Japanese headline → supporting copy → date/place hierarchy is clearer;
- actual-size/native `1480×2100`: current Cover/Back and third-pass stress screenshots show no visible glyph collision or overflow.

## Structure readback

Production frames after refinement:

- Cover `212:3`: native visible text `6` / fixed-height text `0` / outside visible text `0` / IMAGE fill nodes `0` / Auto Layout `218:127`;
- Menu `212:13`: native visible text `35` / fixed-height `0` / outside `0` / IMAGE fill nodes `0`;
- Seating `212:58`: native visible text `26` / fixed-height `0` / outside `0` / IMAGE fill nodes `0`;
- Back `212:99`: native visible text `6` / fixed-height `0` / outside visible text `0` / IMAGE fill nodes `0` / Auto Layout `218:131`.

Generated/composed fixed Harbor Atlas art remains separate from variable text. Page-wide flattening remains `0`.

## Image-generation / Drive state

No new generated candidate was justified in this refinement because the screenshot-supported defect was card-like containment and dynamic-copy structure, not a missing hero/background asset. The existing selected Harbor Atlas role remains the fixed-art direction.

Drive master persistence remains `BLOCKED`: the current Drive upload action requires a connector/runtime `file_uri`, and the local generated source cannot be passed as a raw local path or URL. No Drive master ID is claimed.

## Learning

`VERIFIED_LOCAL`:

> When a print editorial composition contains variable-height native copy, repeated fixed-Y collision after one repair is a structural failure. Switch to a semantic Auto Layout stack before shrinking type or continuing coordinate nudges.

Item-specific and not transferable: Harbor Atlas geometry, oxblood register bar, quiet-letter dimensions, exact type sizes, palette, and Wedding Passport composition.

## Promotion / next

V4 remains `NOT_PROMOTED` and `NOT_PRINT_READY`.

Next safe task:

1. persist the adopted fixed-art master to exact Drive when a valid `file_uri` transport exists;
2. run the remaining V4 booklet-family coherence review across Cover / Menu / Seating / Back without consulting old Current as construction input;
3. only after V4 QA is mature, compare the completed V4 against retained Current and promote only if V4 clearly wins.
