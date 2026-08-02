# るるぶWEDDING — V5 Brush-up Research and Execution Log

Date: 2026-08-02
Repository: `m-shogo/wedding-project`
Figma: https://www.figma.com/design/bfM0d4c9dCeBv5pCkJ3TNM

## Current verified state

Live page: `01_RURUBU_WEDDING`

Current candidate frames:
- `01_RURUBU_AUTHENTIC_OUTER_V5_CURRENT_CANDIDATE` — node `77:18`
- `02_RURUBU_AUTHENTIC_INSIDE_V5_CURRENT_CANDIDATE` — node `77:290`

Rollback frames remain preserved:
- outer V4 — node `59:2`
- inside V4 — node `59:178`

## Live structural verification

- semantic photo roles: `13 / 13`
- photo roles using IMAGE fill: `13 / 13`
- gradient-only photo roles: `0`
- native text structure retained
- V4 rollback preserved

The previous statement that the live file contained no IMAGE fills was outdated. A direct live fill audit on 2026-08-02 confirmed IMAGE fills in all 13 photo roles. However, whole-spread screenshots showed that several large-role images were low-resolution or heavily pixelated, especially the cover hero, back main memory image, and history image.

## Generated realistic dummy photo pack

A new realistic 13-image dummy pack was generated and stored in Google Drive.

Drive folder:
- title: `RURUBU_V5_DUMMY_PHOTOS_2026-08-02`
- ID: `1tAvBO9TodEKVHVZnABD73rEPUGG8iu0N`

Files:
1. `01_COVER_HERO_YOKOHAMA_DUMMY.png` — `1rS1QpAL-H4Dvg3tzI3NvmPUw-oAiicpv`
2. `02_COVER_SNAP_AIRPLANE_DUMMY.png` — `1fkzkpkhi2nEq-gxYjroqJipsvAoDStwI`
3. `03_PROFILE_GROOM_YOKOHAMA_DUMMY.png` — `1x4zsKXkk4AHnXoUBHuSX0HnCqPGIy_Wd`
4. `04_PROFILE_BRIDE_CAFE_DUMMY.png` — `1xOhG8tOmhUclfUchGzFOlrWP2vb9yPfO`
5. `05_HISTORY_WATERFRONT_DUMMY.png` — `1LO9rwdFuWMD2TZvSa6efn-gjbdyRBYt3`
6. `06_MEMORY_SPOT_01_COAST_DUMMY.png` — `1DgbIjrpAhRunU6fmDVF4y_jcXOB4t3wx`
7. `07_MEMORY_SPOT_02_OLD_TOWN_DUMMY.png` — `1z7pV8BzSaqrvChCbmotTRoEptTaQZMLw`
8. `08_MEMORY_SPOT_03_NIGHT_VIEW_DUMMY.png` — `1168rkBzpx84Wvr7IxPCW31WOr30kdqhb`
9. `09_MEMORY_SPOT_04_RESORT_DUMMY.png` — `1wGhESjFYaX84Vwk7YEw86VZzg6i5Je6z`
10. `10_BACK_MAIN_TRAVEL_FLATLAY_DUMMY.png` — `1bBiAcFfHJ3-Ns1gAKn6Bct-q-w2p-AvD`
11. `11_FRIENDS_FAMILY_01_TOAST_DUMMY.png` — `1zZfvktztbPx59Yb0Gxor8IsbGG1w6Fq8`
12. `12_FRIENDS_FAMILY_02_CAFE_DUMMY.png` — `1D0U-rBuidfk7YttssNyonTW2YAPrpUjv`
13. `13_FRIENDS_FAMILY_03_DINING_DUMMY.png` — `1AcZTgDJY9LGYP_zfgh320OLtUifR53N1`

These are dummy editorial photos only. They are not approved final photographs and must be replaced by real couple, family, and travel photos before final export.

## Figma work performed

The live V5 working frames were promoted to explicit Current candidates.

A screenshot-driven reassignment pass was attempted using image assets already stored inside the Figma file. Mutated semantic nodes:
- `77:148` — cover hero
- `77:24` — back main memory
- `77:422` — history main image
- `77:446` — memory spot 03

This removed a visually empty small memory slot and improved subject relevance in some roles, but it did not resolve the low-resolution problem in large image areas.

## Upload-path blocker

The generated high-resolution images are complete in Drive, but direct transfer to Figma was blocked by the current execution environment:

- Figma `upload_assets` returned valid single-use upload URLs.
- The local execution container could not resolve `mcp.figma.com`, so the required POST could not complete.
- `figma.createImageAsync` is not available in the current `use_figma` API.
- `fetch` is not defined inside the current `use_figma` runtime.
- Large inline base64 image injection was not reliable because the tool payload was truncated.

Therefore the new 13-image Drive pack is not yet fully applied to the live Figma photo nodes. This is a real blocker and must not be recorded as completed.

## Current quality assessment

Strengths:
- strong travel-wedding concept
- clear Rurubu-inspired identity
- strong logo and category color hierarchy
- good overall content architecture
- V4 rollback and semantic editability preserved
- 13/13 photo roles present

Remaining visible weaknesses:
- large hero/history/back images remain visibly pixelated
- some labels and feature modules still feel like Web UI cards
- the cover remains dense and slightly badge-heavy
- typography and Japanese copy require final-content reflow
- print quality cannot be judged before real images and vendor template are applied

Current honest visual score: approximately `6.5 / 10`.

## Next execution order

1. Restore a working binary upload route to Figma.
2. Apply all 13 Drive images to their semantic roles using FILL crop.
3. Verify image hashes and dimensions after each replacement group.
4. Run whole-spread screenshot QA.
5. Fix the three weakest areas only.
6. Remove at least one redundant badge/card element.
7. Re-run screenshots and structural audit.
8. Replace dummy copy and photos with real content.
9. Apply the exact print-vendor template and run final PDF/physical proof QA.

## Current declaration

`RURUBU_V5_CURRENT_CANDIDATE / REALISTIC_DUMMY_PACK_READY_IN_DRIVE / FIGMA_HIGH_RES_PHOTO_IMPORT_BLOCKED / REAL_CONTENT_PENDING / PRINT_TEMPLATE_PENDING / NOT_PRINT_READY`
