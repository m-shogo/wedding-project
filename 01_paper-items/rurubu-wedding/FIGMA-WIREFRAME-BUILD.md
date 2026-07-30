# るるぶWEDDING — Figma Wireframe Build Spec

Status: READY_TO_EXECUTE_WHEN_FIGMA_MCP_RECOVERS
Current authority: GitHub `main`
Depends on: `FOUNDATION.md`, `WIREFRAME.md`
Production Figma: https://www.figma.com/design/bfM0d4c9dCeBv5pCkJ3TNM

## Canvas conversion
Figma geometry is expressed in px. For a physical-size-equivalent 96dpi canvas:

- 1mm = 96 / 25.4 = 3.7795275591px
- spread 420mm = 1587.4016px
- height 297mm = 1122.5197px
- fold 210mm = 793.7008px

Use rounded working values only for Figma node dimensions:
- spread: `1587.4 × 1122.5`
- back half: `793.7 × 1122.5`
- front half: `793.7 × 1122.5`
- fold guide x: `793.7`

These values describe physical-size-equivalent geometry only. They do NOT define vendor bleed, trim-safe, fold-safe or export profile.

## Required page structure
Create or reuse a page named `01_RURUBU_WEDDING`.

Top-level frames, left-to-right with generous canvas separation:
1. `01_Cover_Back_WF_A`
2. `01_Cover_Back_WF_B`
3. `01_Cover_Back_WF_C`

Each frame:
- width `1587.4`
- height `1122.5`
- monochrome only
- clipContent = false while comparing wireframes
- children:
  - `BACK_COVER`
  - `FRONT_COVER`
  - `PROVISIONAL_FOLD_GUIDE`
  - `PROVISIONAL_PRINT_GUIDES_NOTE`

## Monochrome tokens
Create local variables only if no equivalent Current variables exist in the production file.

Suggested wireframe-only primitives:
- `wf/bg` = #FFFFFF
- `wf/ink` = #111111
- `wf/muted` = #6B6B6B
- `wf/line` = #B8B8B8
- `wf/photo` = #E5E5E5
- `wf/panel` = #F4F4F4

Do not introduce wedding palette colors until a wireframe winner exists.

## Text styles
Before mutating text, inspect available fonts in the target file/runtime. Do not assume a non-available Japanese font.

Create wireframe roles using an available Japanese-capable family:
- `WF/Display`: 52px / Bold
- `WF/Title`: 28px / Bold
- `WF/Heading`: 18px / Bold
- `WF/Body`: 14px / Regular
- `WF/Meta`: 11px / Regular

These are structural comparison styles, not final brand typography.

## Shared content payload
All 3 variants MUST use identical content quantity so density comparison is fair.

Front:
- title: `るるぶ WEDDING`
- date/location: `YOKOHAMA 2026.10.24`
- hero placeholder label: `COUPLE HERO PHOTO`
- feature 1: `ふたりの思い出スポットを旅する SPECIAL GUIDE`
- feature 2: `出会いから今日まで OUR TRAVEL HISTORY`
- feature 3: `いつもありがとう FRIENDS & FAMILY`
- feature 4: `食べて飲んで楽しむ YOKOHAMA WEDDING DAY`
- feature 5: `BEST SHOT & FAVORITE MOMENTS`
- feature 6: `NEXT DESTINATION: OUR FUTURE`

Back:
- heading: `OUR TRAVEL NOTES`
- memory module: `MEMORY SPOTS / ふたりで歩いた場所`
- friends module: `FRIENDS / 一緒に旅してくれたみんな`
- history module: `HISTORY / 出会いから2026.10.24まで`
- route anchors: `201x`, `202x`, `2026.10.24`

## Variant A implementation
Goal: classic Japanese travel-magazine hierarchy.

FRONT_COVER:
- top title/meta band: y `42`, h `150`
- hero placeholder: x `64`, y `196`, w `665`, h `610`
- PICK UP placeholder chip: overlap hero lower-left region, but keep entirely within FRONT_COVER
- feature stack: x `64`, y `825`, w `665`, h `240`
- feature lines may wrap to 2 lines; never reduce body below 12px in wireframe

BACK_COVER:
- heading: x `52`, y `52`
- top two-column modules: y `140`, h `330`
- second two-column modules: y `495`, h `330`
- history route: y `860`, h `185`

## Variant B implementation
Goal: high legibility and stress resilience.

FRONT_COVER:
- masthead: x `56`, y `52`, w `680`, h `120`
- content split starts y `190`
- hero: left ~64% of usable width
- feature rail: right ~36%
- lead strip below: full width

BACK_COVER:
- heading band
- two equal editorial modules
- full-width history/route strip below

## Variant C implementation
Goal: personal scrapbook energy without evaluating decoration yet.

FRONT_COVER:
- title/date top band
- hero placeholder centered and slightly smaller than A
- route placeholder = a simple stroked line only; no production asset imported yet
- PICK UP and BEST SHOT = labeled gray chips, not actual assets yet
- feature modules = uneven card sizes while retaining a clear reading order

BACK_COVER:
- one taped-photo placeholder shape
- one friends-photo placeholder
- memory note blocks
- simple history line across lower zone

## Figma write sequence
Follow this exact incremental sequence when quota returns:

1. Read-only inspect file pages and existing local variables/styles.
2. Create/reuse page `01_RURUBU_WEDDING`.
3. Create the 3 top-level spread frames only; return all node IDs.
4. Validate geometry and screenshot all 3.
5. Add semantic BACK/FRONT containers + fold guide to each; return IDs.
6. Establish/reuse monochrome variables and text styles.
7. Populate Variant A with shared content; screenshot and validate.
8. Populate Variant B with identical content; screenshot and validate.
9. Populate Variant C with identical content; screenshot and validate.
10. Run long-copy / photo-ratio stress observations.
11. Score `WIREFRAME.md` rubric.
12. Promote only the winner to `02_Cover_Back_Visual`.
13. Only after winner promotion, insert **accepted Current transparent PNG assets** one at a time.

## Asset-format safety
- SVG is prohibited for the Rurubu production path.
- do not import, recreate, trace or promote historical SVG assets.
- old SVG-derived PNGs #8–#14 are non-current and must not be used.
- current #8–#14 must be remade and pass visual QA + alpha QA + Drive verification before placement.

## Mutation safety
- one failed `use_figma` script is treated as atomic/no-change
- on error, inspect cause and change the script before retrying
- all created/mutated node IDs must be returned
- switch current page at most once per invocation
- load all fonts before text mutation
- do not create asset sheets
- do not insert actual decorative candidates before wireframe winner selection

## Wireframe QA checklist
- [ ] A/B/C same spread size
- [ ] identical copy quantity across A/B/C
- [ ] same fold position
- [ ] no production bleed/safe values invented
- [ ] fold guide clearly marked PROVISIONAL
- [ ] feature lines support 2-line wrapping
- [ ] front hierarchy understandable in grayscale
- [ ] back hierarchy understandable in grayscale
- [ ] no SVG present in Current production path
- [ ] no rejected #8–#14 old PNGs used
- [ ] comparison screenshots captured before scoring