# ADD-02 V14 — destination-photo hero clean-room continuation

Status: `TESTED_LOCAL / FIGMA_STRUCTURE_PASS / LONG_COPY_STRESS_PASS / PHOTO_PLACEMENT_BLOCKED / DRIVE_UPLOAD_NOT_OBSERVED / NO_PROMOTION`

Scope: non-Rurubu `ADD-02` country table sign only.

## Clean-room boundary

This experiment does not use the existing ADD-02 production design, prior V2/V3/V5–V13 layouts, prior vectors, prior crops, or prior generated/composed artwork as an authoring reference. It carries forward only the ADD-02 semantic/physical requirements and the promoted hybrid-authoring rule.

The retained production remains untouched and must not be opened for visual comparison until a fresh photo-led candidate is actually complete with its real hero image, has passed structure/long-copy QA, and has been visually reviewed at three scales.

## Why this method switch exists

The recent ADD-02 clean-room sequence already established that repeated vector landscapes, abstract raster, literal procedural destination illustrations, and generic material/botanical treatments do not clearly beat the retained production. The next materially different test remains a real high-resolution destination-specific photographic hero with native typography kept separate.

## Live authority correction — 2026-08-16

A live readback of the exact Drive authority folder `1KmbIncy5Wl6aEqqjBQmssCsw_KZjM62r` did **not** show the three V14 files that the earlier note described as uploaded.

Observed direct children at this run:

- `1_upRvZXq4PE54UsvmeWz-Hqhb1fXVP8U / V6_COMPARE_FRANCE_folded-publication-depth_2026-08-16.png`
- `1x4N7LUsJiPI93hU__BA8WYnasDw9QNT7 / ADD-02_ARCHIVAL_PRINT_GRAIN_MASTER_v1.png`

Therefore the earlier `DRIVE_ASSET_PREPARED` claim is withdrawn. The truthful state is `DRIVE_UPLOAD_NOT_OBSERVED` until the intended V14 photo files are actually uploaded and read back from the exact folder.

Do not invent Drive IDs or treat local/web retrieval as Drive completion.

## Fresh V14 Figma structure created

Without opening legacy production or prior ADD-02 visual candidates, a new clean-room page was created in Figma file `LAZAZ0u3RGqtN4bYFPZ3pU`:

- page: `78:6 / CLEANROOM / ADD-02 / V14 PHOTO HERO / 2026-08-16`
- section: `78:7 / CLEANROOM_ADD02_V14_HAWAII_PHOTO_LED`
- candidate root: `78:8 / FRAME_TABLE_SIGN_HAWAII_V14`
- replaceable hero role: `78:9 / IMG_COUNTRY_HERO / REPLACEABLE / V14`
- native info stack: `78:15 / TEXT / INFO STACK`
- hidden long-copy stress clone: `78:20 / STRESS_ADD02_V14_HAWAII_LONG_COPY`

The fresh candidate uses the current `1000×1480` primary format and a `1000×900` replaceable hero role. The current hierarchy is authored from the semantic requirements only:

1. large native `HAWAII` over the hero zone;
2. large native table identifier `01`;
3. native Japanese support label `ハワイ`;
4. native country-theme semantic placeholder;
5. native `DESTINATION 01` support line;
6. native `2026.10.24` date.

No final or variable copy is baked into an image or SVG.

## Structural / long-copy QA

The first clean-room draft exposed a real Figma structure defect: the `TEXT / INFO STACK` retained a 10px fixed frame height, which made its children disappear from the screenshot even though the text nodes existed. The fix was structural rather than cosmetic:

- `TEXT / INFO STACK` changed to visible auto-height behavior;
- `clipsContent=false`;
- long-copy children remain native editable text;
- hero/type hierarchy was separated so `HAWAII` and `01` no longer collide.

After repair, the live whole-item screenshot visibly shows the full information stack.

Long-copy stress on hidden clone `78:20` used an intentionally extended Japanese country note. Readback result:

- root: `1000×1480`;
- info stack y: `1035`;
- info stack height under stress: `255`;
- long note height: `144`;
- stress text outside root: `0`.

Result: `FIGMA_STRUCTURE_PASS / LONG_COPY_STRESS_PASS` for the clean-room structure only.

## Photo source investigation

A suitable high-resolution Hawaii source was verified on Wikimedia Commons:

- `Diamond Head from Fort DeRussy Beach.jpg`
- source dimensions: `4032×3024`
- creator: Farragutful
- license: `CC BY-SA 4.0`
- depicts Diamond Head from Fort DeRussy Beach, Waikīkī, Honolulu.

The source is large enough for the intended hero crop and has explicit reusable licensing, but this run could not reliably transport the binary from the web source into the Figma upload endpoint. The runtime also could not produce a truthful Drive file reference for Google Drive upload.

A Figma upload slot was reserved for node `78:9`, but because the source bytes could not be delivered, the real photo was **not** placed. The hero remains a placeholder color field. Do not count the upload reservation as image placement.

## Upload transport root-cause probe — 2026-08-16 later run

A fresh live probe narrowed the placement blocker further without changing production or the V14 candidate:

- Figma MCP `upload_assets` successfully issued a single-use upload endpoint for file `LAZAZ0u3RGqtN4bYFPZ3pU`;
- a fresh local `64×64` PNG transport probe was created solely to test byte delivery, not as a design asset;
- the upload endpoint was `mcp.figma.com/.../submit`, confirming that the Figma-side upload reservation capability now exists;
- the runtime's outbound shell could not resolve `mcp.figma.com` (`curl: Could not resolve host`), so no POST reached Figma and no scratch image was placed;
- the same runtime also could not resolve `upload.wikimedia.org` for direct source download, even though the Commons file and original-image URL were successfully verified through web retrieval;
- therefore no forbidden prior asset, fake photo, or procedural fallback was inserted into `78:9`.

This changes the blocker diagnosis from a vague “no Figma upload route” to:

`UPLOAD_ENDPOINT_AVAILABLE / RUNTIME_BINARY_EGRESS_DNS_BLOCKED / PHOTO_BYTES_NOT_DELIVERED`.

Do not repeat the same shell/DNS upload probe in subsequent runs unless the execution environment or connector capability materially changes. The valid next method is a connector-native binary/file-reference transfer route, or a run where image generation / binary upload can deliver bytes directly without shell network egress.

## Current gate

This is **not** a sellable visual pass and **not** a production promotion.

Current verified state:

`CLEANROOM_V14_FIGMA_STRUCTURE_PASS / LONG_COPY_STRESS_PASS / PHOTO_PLACEMENT_BLOCKED / UPLOAD_ENDPOINT_AVAILABLE / RUNTIME_BINARY_EGRESS_DNS_BLOCKED / DRIVE_UPLOAD_NOT_OBSERVED / LEGACY_NOT_OPENED_FOR_COMPARISON / NO_PROMOTION`

The legacy production remains unchanged and was intentionally not opened for visual comparison because the candidate is not complete without its real photo.

## Next valid step

1. obtain a connector-native or otherwise reachable binary/file-reference route for a high-resolution non-person Hawaii image;
2. upload/read back the adopted master in exact ADD-02 Drive authority;
3. place it only in Figma node `78:9` as a replaceable image role;
4. perform whole / reading / actual-size screenshot QA on `78:8`;
5. repeat long-copy/contrast/crop structural readback after real image placement;
6. only then open retained production for the first visual comparison;
7. promote only if the photo-led clean-room candidate is clearly stronger overall.

Do not fall back to another vector landscape or generic material treatment merely to create activity.