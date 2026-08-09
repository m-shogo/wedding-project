# WEDDING PASSPORT — Seating Clean-Room V2 Editorial QA

Date: 2026-08-09
State: `VISUAL_REOPENED / CLEANROOM_V2_CREATED / STRUCTURE_QA_PASS / LONG_NAME_STRESS_PASS / PRODUCTION_NOT_YET_PROMOTED`

## Live authorities

- Start `main`: `b994d1800b7637f9a0584acc5244dbaef8082a41`
- Visual-reopen Current commit before this record: `cc285c04500efa10dfcb274b3dda17512ddbca2e`
- Current authority: `docs/automation/non-rurubu-figma-quality-current.md`
- Figma file key: `UbK8KmuWJcDeGScsN49Uor`
- Existing production seating frame: `02_INSIDE / 18:131 / FRAME_SEATING`
- Clean-room comparison: `02_INSIDE / 78:2 / QA_SEATING_CLEANROOM_V2_EDITORIAL_2026_08_09`
- Long-name stress proof: `02_INSIDE / 81:2 / QA_SEATING_CLEANROOM_V2_LONG_NAME_STRESS_2026_08_09`
- Drive authority folder: `01_パスポート風_メニュー・ドリンク・座席表`
- Drive folder ID: `1LnGb9tq_Vswe-GKO6UxfvKMAZuShEaaw`
- RURUBU / るるぶ scope: not read or modified by this run.

## User-level visual rejection

The user explicitly judged the non-Rurubu designs as too ugly and requested a higher, sellable-quality pass using image generation where it materially helps. The earlier structural PASS therefore remains valid only for verified structure/readability facts; it is not treated as proof that the seating composition is visually finished.

## Visible defect in existing production

The live production screenshot of `18:131` is dominated by eleven repeated equal bordered boxes in a 3-column grid, plus a boxed head-table banner. At thumbnail scale it reads closer to an admin/dashboard card grid than to premium editorial wedding stationery.

The highest-value issue was therefore composition, not another micro-decoration change.

## Clean-room V2 direction

Created a materially different comparison instead of mutating production immediately:

- `78:2 / QA_SEATING_CLEANROOM_V2_EDITORIAL_2026_08_09`
- 1480 × 2100 px
- warm paper field with a single narrow navy edge
- Japanese-first serif title `席次のご案内`
- small secondary English `SEATING DIRECTORY`
- no repeated bordered cards
- no rounded UI panels
- no fake transport credentials
- no gradients, shadows, badges, planes, stamps, or decorative icons
- tables presented as an editorial directory using large serif numerals, small TABLE labels, native guest lists, and thin hairlines
- head table represented by typography and rules rather than a dark card container

The design intentionally uses typography and spacing instead of adding more decoration.

## Seven-guest structure

V2 preserves the fixed requirement of 11 tables × maximum 7 guests:

- table frames: 11
- native guest text nodes: 11
- semantic placeholder rows: 77
- all tables: 7 rows each
- no 8-person assumption introduced

Initial structural readback detected that the multiline guest nodes visually rendered seven lines but still had `textAutoResize=NONE` and a nominal 20 px height. That was treated as a real editability defect and fixed in the same run.

Post-fix guest nodes:

- `78:15`, `78:20`, `78:25`, `78:30`, `78:35`, `78:40`, `78:45`, `78:50`, `78:55`, `78:60`, `78:65`
- font: Noto Sans JP Regular, 20 px
- line-height: 29 px
- `textAutoResize=HEIGHT`
- measured height: 203 px
- y: 8 px inside 286 px table frame
- bottom edge: 211 px
- remaining vertical clearance: 75 px

Thus the seven-line placeholders now have real native editable geometry rather than only visual overflow.

## Long-name stress QA

A dedicated duplicate proof `81:2` was created without touching existing production.

### Deliberately overlong diagnostic — expected FAIL

The first stress string used `[長い氏名レイアウトダミーNN]`, which intentionally exceeds a realistic single-name measure. With the initial V2 guest width of 238 px, every guest row wrapped and the text block measured 406 px high inside a 286 px table parent. Machine readback returned `allWithinParent=false`.

This failed proof was kept rather than hidden. It established that the initial clean-room geometry had insufficient horizontal tolerance if very long semantic dummy labels were inserted literally.

### Realistic long-name layout dummy — PASS

The proof was then refined without shrinking the 20 px type:

- guest text x: 70 px
- guest width: 280 px
- font: Noto Sans JP Regular, 20 px
- line-height: 29 px
- stress rows: `長文氏名レイアウトNN`
- 7 rows per table
- 11 tables
- total rows: 77

Post-refinement machine readback:

- all seven rows retained: true
- text height: 203 px
- text bottom: 211 px
- table parent height: 286 px
- remaining vertical clearance: 75 px
- all guest blocks within parent: true

The post-refinement screenshot showed all 77 long-name dummies as single lines with no table-to-table collision and no loss of the large editorial table-number hierarchy.

### V2 candidate promotion of proven geometry

After the stress proof passed, the same proven geometry was applied to clean-room candidate `78:2`:

- all 11 guest nodes moved from x=112 to x=70
- all 11 guest widths expanded from 238 to 280 px
- font size retained at 20 px
- `textAutoResize=HEIGHT` retained
- each measured height remains 203 px
- each remains within its 286 px parent

This is a structural refinement of the comparison candidate only. Existing production `18:131` remains untouched and available as the live legacy comparison.

## Screenshot QA

Whole-item screenshot after the structural and long-name refinements shows:

- clear Japanese-first hierarchy;
- substantially less UI/card-grid impression than the existing production;
- no table-box repetition;
- table numbers remain easy to scan;
- 77 placeholders remain visible;
- the wider guest column improves long-name tolerance without reducing the established 20 px type size;
- composition remains restrained without confusing empty space for decoration;
- no image asset was forced into this page because the diagnosed defect was typography/composition rather than missing imagery.

This is a serious comparison candidate, not yet a production promotion.

## Structure readback

Clean-room V2:

- frame: 1480 × 2100
- `clipsContent=true`
- table count: 11
- guest nodes: 11
- placeholder rows: 77
- all seven per table: true
- all guest text blocks within table parent: true
- native text nodes: 41
- IMAGE-fill nodes: 0
- raster/flatten replacement: 0
- guest text x/width after stress-derived refinement: 70 / 280 px

## Drive

Drive authority folder was live-read before writes.

- Drive changes: 0
- generated assets adopted: 0
- reason: seating-chart defect was composition/card-grid quality, so adding a generated image would have been decoration without a concrete role.

The new Current explicitly allows generated background/texture/editorial assets on later items when screenshot evidence shows they will materially improve the design.

## Decision

`CLEANROOM_V2_CREATED / STRUCTURE_QA_PASS / LONG_NAME_STRESS_PASS / VISUAL_COMPARISON_ADVANCE / PRODUCTION_NOT_YET_PROMOTED`

Do not restore the old assumption that the previous structural PASS means the existing seating layout is visually complete.

Before production promotion, continue with:

1. reading-scale and actual-size comparison against `18:131`;
2. optical spacing refinement if the clean-room candidate still feels too sparse;
3. production promotion only if the candidate clearly wins and semantic/rollback references can be migrated safely.

## Next quality direction

Continue the reopened visual pass across WEDDING PASSPORT first, then BOARDING PASS, 青春ふたりきっぷ and ADD-01–17. Use image generation only where a specific asset role is justified; do not create generic travel decoration merely to satisfy an image-generation quota.
