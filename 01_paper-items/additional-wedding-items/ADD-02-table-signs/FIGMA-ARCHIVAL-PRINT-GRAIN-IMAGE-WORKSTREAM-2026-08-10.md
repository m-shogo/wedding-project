# ADD-02 — Archival Print Grain Image Workstream

Date: 2026-08-10
State: `SELLABLE_VISUAL_QA_PASS / DESIGN_QA_PASS_WITH_PLACEHOLDERS / IMAGE_LAYER_ADDED / NOT_PRINT_READY`

## Live authority

- latest observed `main` immediately before this write: `7ea3cc3f547c6b03b57e83c1954aed60071af266`
- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Figma file key: `LAZAZ0u3RGqtN4bYFPZ3pU`
- production page: `1:3 / 02_TABLE_SIGNS`
- Drive authority folder: `1KmbIncy5Wl6aEqqjBQmssCsw_KZjM62r`

## Visual diagnosis

The eleven promoted signs already pass the reopened sellable gate compositionally, but they still render with a very clean native-vector surface. The highest-value safe image addition in this run was therefore not generic tourism photography, but a shared transparent print-grain layer that gives the family a more tactile paper/editorial finish without flattening the destination-specific constructions.

## Image workstream

`IMAGE_GEN_UNAVAILABLE_THIS_RUN` for generative-AI destination imagery.

A non-person procedural transparent archival print-grain master was generated instead. It contains only low-alpha speck/fiber texture; no text, people, locations, fake UI, symbols, QR data, table data or factual imagery.

Drive master:

- file: `ADD-02_ARCHIVAL_PRINT_GRAIN_MASTER_v1.png`
- Drive ID: `1x4N7LUsJiPI93hU__BA8WYnasDw9QNT7`
- MIME: `image/png`
- size: `387,562 bytes`
- verified parent: `1KmbIncy5Wl6aEqqjBQmssCsw_KZjM62r`

## Figma placement

A separate `IMG_PRINT_GRAIN_REPLACEABLE` IMAGE layer was added behind the native production content of all 11 signs at `1000 × 1480`, opacity `0.18`.

Production roots / image roles:

- Hawaii `2:2` -> `23:2`
- Italy `2:11` -> `23:3`
- France `2:20` -> `23:4`
- Spain `2:29` -> `23:5`
- Taiwan `2:38` -> `23:6`
- Japan `2:47` -> `23:7`
- Hong Kong `2:56` -> `23:8`
- Singapore `2:65` -> `23:9`
- Bali `2:74` -> `23:10`
- Korea `2:83` -> `23:11`
- Maldives `2:92` -> `23:12`

## Screenshot QA

Hawaii was checked at full 1000×1480 render after placement. The new image layer does not create tile seams, fake paper edges, UI-like borders, or contrast loss; the large country title, Japanese destination text and table number remain dominant and readable.

The grain is deliberately subordinate to each sign's own art direction. It is not counted as destination hero imagery and does not replace the future option of adopting strong non-person Hawaii/Italy/Maldives/etc. imagery when the image-generation tool is available.

## Structure readback

All eleven production frames remain `1000 × 1480`.

- Hawaii native text `7`, IMAGE fill nodes `1`
- Italy native text `8`, IMAGE fill nodes `1`
- France / Spain / Taiwan / Japan / Hong Kong / Singapore / Bali / Korea / Maldives native text `7` each, IMAGE fill nodes `1` each
- every IMAGE fill is the independent `IMG_PRINT_GRAIN_REPLACEABLE` role
- existing native text/vector construction remains editable
- no variable text was baked into raster imagery

## Decision

Keep the archival grain as a low-strength shared production texture. The more material next image-generation step remains destination-specific non-person hero/detail candidates, not generic airplane/passport/stamp art.
