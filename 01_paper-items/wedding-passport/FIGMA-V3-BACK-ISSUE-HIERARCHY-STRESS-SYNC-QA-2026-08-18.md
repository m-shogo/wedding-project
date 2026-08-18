# WEDDING PASSPORT — V3 back issue hierarchy / stress evidence sync QA

Status: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / CLEANROOM_SELECTED_FAMILY_CANDIDATE / BACK_ISSUE_HIERARCHY_PASS / STRESS_EVIDENCE_SYNC_PASS / LEGACY_PRESERVED / NOT_PRINT_READY`
Date: 2026-08-18
Start authority SHA: `39acd6250b70072638d262dfa23c83836232e58e`

## Authority

- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Figma file: `UbK8KmuWJcDeGScsN49Uor`
- selected clean-room V3 back: `144:26`
- selected back long-copy stress: `145:29`
- Drive authority: `01_パスポート風_メニュー・ドリンク・座席表` / `1LnGb9tq_Vswe-GKO6UxfvKMAZuShEaaw`
- retained legacy production remains untouched.

## Visible issue

Fresh 500px / reading review found that the selected V3 back already had a strong cream-message field and a restrained dark-green route field, but native `[発行情報]` was isolated at the extreme lower-left as an 18px footnote. The date/place metadata already lived at the top-left of the dark field, so the issue role felt visually detached and contributed to a false-premium empty lower field rather than a coherent factual cluster.

This was not a missing-decoration problem. No new raster, SVG, route, badge, card, or ornament was needed.

## Rollback-safe comparison

Comparison `163:2 / QA / PASSPORT V3 / ISSUE HIERARCHY / 2026-08-18` tested grouping issue information with date/place metadata.

Adopted selected change:

- `TEXT / ISSUE` font size `18px → 22px`;
- line-height `28px → 32px`;
- y-position `1875 → 1435`;
- native `textAutoResize=HEIGHT` retained;
- date/place `2026.10.24 / YOKOHAMA`, route artwork, message area, title, palette and frame size unchanged.

The adopted version reads the dark field as `date/place → issue information → route` instead of `date/place → large empty field → isolated footnote`.

Hidden pre-change rollback copies:

- selected back: `163:19`
- long-copy stress: `163:36`

## Stress-evidence drift discovered and repaired

Temporarily revealing hidden stress `145:29` exposed stale evidence that no longer matched the selected back:

- `CEREMONY → RECEPTION → NEXT JOURNEY` remained visible even though selected production had already removed it;
- `END OF TODAY / BEGINNING OF TOMORROW` remained visible even though selected production had already removed it;
- body contained `[最終メッセージ長文確認用ダミーテキスト · LAYOUT DUMMY]`;
- BRAND / JA TITLE / ROUTE still used fixed-height `textAutoResize=NONE` boxes;
- issue text was still a 10px-high fixed box before this run.

Stress evidence was synchronized rather than counted as an old PASS:

- stale route-sub and folio filler hidden;
- body stress replaced by semantic `[最終メッセージ：長文時の折返し・余白確認]` while retaining long-copy mass;
- BRAND / JA TITLE / ROUTE converted to auto-height;
- issue stress changed to native `[発行情報：正式な発行元・連絡先・最終確認情報]`, 22px / 32px line-height, auto-height at y=1435.

## Three-scale / structure QA

Selected back after promotion:

- whole item / 500px: PASS;
- reading scale: PASS;
- actual canvas: `1480×2100`;
- IMAGE fills: `0`;
- issue metadata is visually grouped without competing with the route.

Long-copy stress after synchronization:

- visible native text count: `5`;
- visible fixed-height text count: `0`;
- proof-language (`LAYOUT DUMMY` / `DUMMY` / `QA` / `PROOF` / `TEMP` / `ダミー`) count: `0`;
- visible text outside root: `0`;
- text-to-text collision count: `0`;
- stress returned to hidden state after screenshot/readback QA.

## Drive / asset decision

Exact Drive authority folder was live-read successfully before the change/evidence write:

- `1LnGb9tq_Vswe-GKO6UxfvKMAZuShEaaw`

`IMAGE_GENERATION_NOT_REQUIRED` / Drive writes `0`.

## Decision

`BACK_ISSUE_HIERARCHY_PASS / STRESS_EVIDENCE_SYNC_PASS`.

WEDDING PASSPORT remains `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS`. The selected composition is preserved while the lower metadata becomes more intentional and the hidden long-copy evidence now matches current production rules instead of carrying stale filler/proof language.

## Deferred finalization

Still `NOT_PRINT_READY` until final issue information, final couple names/copy, printer/vendor requirements and physical proof are authoritative.
