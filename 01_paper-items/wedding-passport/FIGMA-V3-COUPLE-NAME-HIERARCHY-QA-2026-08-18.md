# WEDDING PASSPORT — V3 couple-name hierarchy QA

Status: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / CLEANROOM_SELECTED_FAMILY_CANDIDATE / COUPLE_NAME_HIERARCHY_PASS / LEGACY_PRESERVED / NOT_PRINT_READY`
Date: 2026-08-18
Start authority SHA: `bbbfa8e0377f61cbfc544a95e4b4d1787754cbf7`

## Authority

- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Figma file: `UbK8KmuWJcDeGScsN49Uor`
- selected clean-room V3 front: `144:3`
- selected clean-room V3 back: `144:26` unchanged
- selected front long-copy stress: `145:4`
- Drive authority: `01_パスポート風_メニュー・ドリンク・座席表` / `1LnGb9tq_Vswe-GKO6UxfvKMAZuShEaaw`
- retained legacy production remains untouched.

## Visible issue

Fresh 500px and native-scale review found that the selected V3 cover had a strong `旅の手帖` / `10.24` / route-field hierarchy, but the couple-name role at the bottom was too quiet relative to its semantic importance. The cover still read cleanly, but at thumbnail scale the reader could miss who the physical passport belonged to.

This was not a missing-decoration problem. The fixed-art route and Japanese title were already strong. The highest-value change was to strengthen the existing native variable name role while preserving the clean lower field.

## Rollback-safe comparison

A comparison clone was created before selected mutation:

- `159:2 / QA / PASSPORT V3 / NAME HIERARCHY / 2026-08-18`
- comparison-only long-name stress: `159:27 / STRESS / PASSPORT V3 / LONG COUPLE NAMES / 2026-08-18`

Only the native footer hierarchy changed:

- couple-name text: `36px → 48px`, line-height `60px`;
- `YOKOHAMA`: `22px → 24px`, line-height `32px`;
- the existing horizontal footer row remained native auto-layout with `SPACE_BETWEEN` and centered cross-axis alignment;
- no fixed art, route vector, title, date, subtitle, color field, frame size, image role, or factual copy changed.

The comparison improved the 500px read: `[新郎新婦名]` now participates in the cover hierarchy instead of reading as footnote-level metadata, while `YOKOHAMA` remains supporting information.

## Long-name stress

The comparison stress used the explicit semantic long-name test string:

`[非常に長い新郎氏名] × [非常に長い新婦氏名]`

At `48px` the 900px-wide name role expanded to two lines / `120px` high without leaving the `1480×2100` root.

After promotion, the existing hidden long-copy stress `145:4` was updated to the same hierarchy and kept native/editable. Its name role uses a long stress-only placeholder and expands to `120px` without root overflow.

## Promotion / rollback

After comparison QA:

- selected V3 front `144:3` received the verified name/place hierarchy;
- existing front stress `145:4` received the same font hierarchy;
- selected V3 back `144:26` was not changed.

Hidden pre-change rollback copies:

- selected front: `159:52`
- front stress: `159:77`

The comparison and comparison-stress nodes `159:2 / 159:27` were hidden after promotion.

## Three-scale / structural QA

- whole item / 500px: PASS; the couple-name role is more legible without competing with the Japanese title or date;
- reading scale: PASS;
- actual selected canvas remains `1480×2100` and native text/vector only;
- selected front visible native text: `7`;
- selected front outside visible text: `0`;
- long-copy stress outside visible text: `0`;
- stress couple-name height at the adopted size: `120px`;
- IMAGE fills: `0`;
- old production, old clean-room history, and rollback evidence preserved.

## Drive / asset decision

`IMAGE_GENERATION_NOT_REQUIRED`.

The defect was information hierarchy, not missing visual material. The exact Drive authority folder `1LnGb9tq_Vswe-GKO6UxfvKMAZuShEaaw` was live-read successfully before evidence write. Drive writes: `0`.

## Decision

`COUPLE_NAME_HIERARCHY_PASS`.

WEDDING PASSPORT remains the selected clean-room family with `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS`. The change makes the physical passport identify the couple more immediately while preserving the restrained cover art direction and variable-copy resilience.

## Deferred finalization

Still `NOT_PRINT_READY` until final couple names, final issue/content copy, printer/vendor requirements, and physical proof are authoritative.
