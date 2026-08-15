# RURUBU WEDDING V6 — AI / AJ Inside Editorial QA

Date: 2026-08-16
Scope: Rurubu WEDDING only
GitHub main immediately before this evidence write: `497bf140a12e695355954e00c0c231bb75fc93ac`
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`

## Result

V6 inside preferred studies were advanced from AF/AG to:

- `1364:2 / PREFERRED / V6_INSIDE_AJ_EDITORIAL_PROFILE_QA_2026_08_16`
- `1363:125 / PREFERRED / V6_INSIDE_AI_MAGAZINE_CHRONOLOGY_2026_08_16`

Previous preferred frames remain preserved hidden as rollback/comparison:

- `1355:2 / COMPARISON / V6_INSIDE_AF_ASYMMETRIC_PROFILE_QA_2026_08_16`
- `1356:2 / COMPARISON / V6_INSIDE_AG_PHOTO_CLUSTER_CHRONOLOGY_2026_08_16`

Start Here `845:27` now reads:

`V5 FU/FX · V6 M + AJ/AI INSIDE STUDIES · V7 HOLD`

V7 was not advanced or edited.

## Why AF/AG were reopened

Fresh live screenshots showed that AF/AG were structurally clean but still under-expressed the target Japanese travel-information-magazine grammar.

AF profile/Q&A still retained too much calm template whitespace and the Q&A rhythm could be read as six evenly weighted modules. AG had improved chronology substantially, but event groups still felt like separate photo-caption units rather than one strongly edited magazine page, and the final WEDDING endpoint did not dominate enough at thumbnail scale.

The next test therefore used only rollback-safe layout/type/photo-role changes:

- no new generated image was claimed as progress;
- no published Rurubu page/logo/art was copied;
- all changing copy remains native Figma text;
- all photos remain replaceable IMAGE roles using non-destructive `FILL` crops;
- only a few flat editorial rules/rails were added where they carry hierarchy, not decorative micro-geometry.

## AJ — Profile / Q&A

### Profile page `1364:3`

Changes from AF:

- dominant profile/travel hero increased and slightly rotated;
- three support photos form an unequal overlapping lower cluster rather than a tidy strip;
- profile facts are compressed into a narrow right-side editorial data rail;
- native pull quote moved into the final third as a second reading anchor;
- page title scale was increased;
- only three simple functional accent rules were added: data rail, name rule, quote rule.

The result reads in the order:

`headline → dominant photo → profile facts → overlapping memory cluster → pull quote`.

### Q&A page `1364:27`

Changes from AF:

- six Q&A groups remain native text but are staggered and compacted into the upper half;
- one coral editorial rail binds the six questions without boxing them into cards;
- the Memories section becomes one dominant photo field plus one overlapping support crop;
- a cyan Memories rule acts as the section transition;
- no rounded cards, repeated shadows, gradients, or dashboard modules were introduced.

### Three-scale visual QA

- 500 px whole-spread thumbnail: PASS — profile hero and Memories photo remain dominant, question rhythm survives reduction.
- 1400 px whole spread: PASS — left and right pages have distinct but related editorial hierarchy.
- actual-size profile page `1364:3`, `794×1123`: PASS.
- actual-size Q&A page `1364:27`, `794×1123`: PASS.

### Structure QA

Profile `1364:3`:

- visible native text: `18`
- visible replaceable IMAGE roles: `4`
- text/text intersections: `0`
- 18 px text safe-area risks: `0`
- outside-page visible nodes: `0`

Q&A `1364:27`:

- visible native text: `22`
- visible replaceable IMAGE roles: `2`
- text/text intersections: `0`
- 18 px text safe-area risks: `0`
- outside-page visible nodes: `0`

The initial AJ structure pass exposed profile label/value overlaps and question/answer edge intersections. Those were repaired before promotion and the final structure audit returned zero intersections and zero safe-area risks.

## AI — Story / chronology

Story page remains the verified photo-led story page from AG; the right chronology page was rebuilt more aggressively.

### Timeline page `1363:137`

Changes from AG:

- title scale increased to create a stronger editorial entry;
- dominant feature photo enlarged to `650×370` and paired with two intentionally tilted support crops;
- events 01–05 use unequal photo sizes, x/y positions and rotations;
- each event uses a short flat color rule rather than a card or timeline diagram;
- the `WEDDING` event is promoted into a dark native-caption strip above a large `450×208` endpoint photo;
- `06` remains native text placed over the final photo;
- the old functional route rail and milestone dots remain hidden and were not restored.

### Three-scale visual QA

- 500 px whole-spread thumbnail: PASS — the page now reads as one photo-led chronology rather than six equal modules.
- 1400 px whole spread: PASS.
- actual-size timeline page `1363:137`, `794×1123`: PASS.

### Structure QA

Timeline `1363:137`:

- visible native text: `27`
- visible replaceable IMAGE roles: `9`
- text/text intersections: `0`
- 18 px text safe-area risks: `0`
- outside-page visible nodes: `0`

During the bounded test, the WEDDING caption initially collided with event 4 / event 6 text. The event 4 cluster, endpoint strip, endpoint copy, and `06` marker were repositioned and then re-audited to zero native-text collisions before promotion.

## Image-role / provenance continuity

The promoted AJ/AI studies preserve the existing verified dummy image hashes rather than flattening or replacing photo semantics. Each visible photo remains a distinct Figma IMAGE role with `scaleMode=FILL`, so final real-photo replacement remains a crop/focal-position operation instead of a page reconstruction.

No new binary image was generated, adopted, or newly placed in this run.

Current high-resolution generated section masters were re-read from the Rurubu V6 Drive scope and remain available as fixed-decoration candidates, not as proof of Figma adoption:

- Profile v2: `RURUBU_V6_PROFILE_SECTION_ROLE_v2.png` — Drive `1IL1L8MWzaqkwVQv9CkLen4EkTccq-5cm`
- Q&A v2: `RURUBU_V6_QA_SECTION_ROLE_v2.png` — Drive `1_JmXHiTmJnRjR9Oam4gERv456yN4qjQn`
- Timeline v2: `RURUBU_V6_TIMELINE_SECTION_ROLE_v2.png` — Drive `1uRP3ri4MKw1g8_vtNDxBoazuAm4Hq3B8`
- Memories v2: `RURUBU_V6_MEMORIES_SECTION_ROLE_v2.png` — Drive `1Xi8C0KV8JfZrbx1fKttGae0Go6tsFzqG`

Known quality-preserving binary transport remains unresolved in this runtime. The existing `mcp.figma.com` DNS / unsupported runtime-transfer fingerprints were not cosmetically retried. Therefore these Drive masters are `DRIVE_READBACK_VERIFIED`, not `FIGMA_PLACED` or `VISUALLY_ADOPTED` in AJ/AI.

## Decision

`AJ/AI = VERIFIED_LOCAL / PREFERRED V6 INSIDE STUDIES / ROLLBACK_SAFE / NOT_PRINT_READY`.

This is meaningful dummy-design progress, not V6 completion. Final real content, final photography, generated fixed-decoration transport where it genuinely improves the design, exact print template/preflight, and physical proof remain separate gates.
