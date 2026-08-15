# Rurubu WEDDING V6 — O + AM + AQ QA

Date: 2026-08-16
Scope: Rurubu WEDDING only
State: `AQ_PROMOTED / THREE_SCALE_VISUAL_QA_PASS / STRUCTURE_PASS / ROLLBACK_SAFE / V7_HOLD / NOT_PRINT_READY`

## Authority read before work

This run re-read the project-wide shared learning system, Rurubu shared feed, neutral non-Rurubu feed, V6 current status, latest GitHub main, live Drive V6 root and Timeline v2 master, and live Figma preferred O + AM + AP before mutation.

Neutral non-Rurubu learning was consumed only as method-level input. No non-Rurubu item-specific Figma, Drive, ledger, asset, or GitHub path was inspected or mutated.

## Visible problem

AP had already replaced the old event-card chronology with a continuous text rail and a smaller number of photo anchors, but the inside system still read slightly too clean/minimal compared with the requested Japanese travel-information magazine language. The Story page in particular still had a large quiet lower field and its photos carried little editorial annotation.

## Root-cause hypothesis

The next improvement did not require more Figma boxes, badges, shadows, gradients, or generated background geometry. A stronger hierarchy could come from:

- slightly more aggressive support-photo overlap/scale;
- native Japanese headline emphasis;
- tiny native editorial photo captions placed directly on photography;
- compact travel-note metadata in remaining quiet space;
- chronology micro-labels that make photos read as magazine scenes rather than generic placeholders.

This also follows the project-wide hybrid-authoring rule: keep variable/factual copy native; do not hand-build decorative micro-geometry merely to simulate complexity.

## Bounded comparison

Source preferred before run:

- AP `1384:2 / PREFERRED / V6_INSIDE_AP_DENSER_STORY_AND_CONTINUOUS_CHRONOLOGY_2026_08_16`

Rollback-safe duplicate:

- AQ `1387:2`

AQ changes only the Story/chronology spread. Outer O and Profile/Q&A AM remain unchanged.

### Story changes

- hero remains `650×455`, same image hash;
- support 1 changes from `205×188` to `220×202`, still within registered `240×220` source bounds;
- support 2 changes from `300×255` to `338×278`, still within registered `810×552` source bounds;
- native story anchor typography strengthened and re-fit;
- native photo captions added directly on/near images;
- small native `TRAVEL NOTE / 03 SCENES` metadata added to the lower field;
- no new raster source, card, shadow, gradient, sticker, or Figma decoration geometry was added.

### Chronology changes

The accepted AP chronology model remains:

- events 01–05 use one continuous native text rail;
- three event photo anchors remain;
- top feature photo cluster remains;
- WEDDING remains the single full-width endpoint band.

AQ adds only native editorial typography:

- `01 — 06 / JOURNEY` route marker;
- `TRAVEL NOTE / 旅のはじまり` on the feature photo;
- `SCENE 01 / 03 / 05` micro-captions on event photos;
- slightly stronger native number/date/title hierarchy;
- the previous thin top rule is hidden after the typography proves sufficient binding by itself.

## Visual QA

### Whole spread / thumbnail

AQ was reviewed at 1200px render from native `1587.4×1122.5`.

Result: PASS and preferred over AP for the requested editorial direction.

Observed improvement:

- Story photography carries more information at thumbnail scale;
- lower Story field no longer reads as purely unused template space;
- chronology photos read as editorial scenes rather than detached image placeholders;
- no added card/grid/UI containment.

### Reading scale

1200px spread review: PASS.

- title → hero → support-photo → anchor/body → note reading path remains clear;
- chronology route label does not compete with the main title after collision repair;
- photo captions remain secondary.

### Actual size

Story `1387:3`, native `794×1123`: PASS.

Chronology `1387:14`, native `794×1123`: PASS.

At actual size:

- captions remain readable but subordinate;
- Story anchor remains readable without broken Japanese line wrapping;
- image borders/crops remain intact;
- chronology endpoint remains dominant.

## Structure QA

Final AQ readback:

### Story

- native text: `12` visible;
- replaceable IMAGE roles: `3`;
- same-parent text collisions: `0`;
- 18px text safe-area risks: `0`;
- outside visible text/image nodes: `0`.

### Chronology

- native text: `32` visible;
- replaceable IMAGE roles: `6`;
- same-parent text collisions: `0`;
- 18px text safe-area risks: `0`;
- outside visible text/image nodes: `0`.

An early AQ pass produced two typography collisions. Both were detected by structure QA before promotion. The route marker was moved; the weak vertical side mark was ultimately hidden rather than cosmetically retained. This is part of the evidence, not hidden implementation history.

## Active image roles / hashes

AQ uses only previously verified Rurubu image hashes.

Story:

- `1387:7` `PHOTO / STORY_HERO_REPLACEABLE` — `650×455` — hash `539c259be8036b481d06b4f76db9a39b407d90e8`;
- `1387:8` `PHOTO / STORY_SUPPORT_1_REPLACEABLE` — `220×202` — hash `644f449c3bf2001a94d4b822d2b55e2614c11042`;
- `1387:9` `PHOTO / STORY_SUPPORT_2_REPLACEABLE` — `338×278` — hash `c1ada11205bc3978bf426b304d683f1c1566cac2`.

Chronology:

- `1387:19` event 1 — `325×155` — hash `539c259be8036b481d06b4f76db9a39b407d90e8`;
- `1387:27` event 3 — `235×145` — hash `644f449c3bf2001a94d4b822d2b55e2614c11042`;
- `1387:35` event 5 — `335×150` — hash `d76eb07d83d042f15044c8bc6bf68d73a73cd77d`;
- `1387:44` feature hero — `505×305` — hash `e3738476f760932bb5b09c9d60f174dd6c84049d`;
- `1387:45` feature support 1 — `250×150` — hash `539c259be8036b481d06b4f76db9a39b407d90e8`;
- `1387:46` feature support 2 — `225×150` — hash `439a719d73f28e8dd2889f2026cccb15f345ec63`.

No new image generation, Drive save, or external Figma binary placement occurred in this pass.

## Drive readback

V6 root remains:

- `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`

Timeline generated master remains present:

- `1uRP3ri4MKw1g8_vtNDxBoazuAm4Hq3B8 / RURUBU_V6_TIMELINE_SECTION_ROLE_v2.png`

It was not adopted in AQ. The known Figma submit transport fingerprint has not materially changed, so the same failed upload path was not retried.

## Promotion / rollback

Promoted:

- AQ `1387:2 / PREFERRED / V6_INSIDE_AQ_TYPOGRAPHIC_EDITORIAL_DENSITY_2026_08_16`

Preserved hidden rollback:

- AP `1384:2 / ROLLBACK / V6_INSIDE_AP_DENSER_STORY_AND_CONTINUOUS_CHRONOLOGY_2026_08_16`

Start Here:

- `845:27` → `V5 FU/FX · V6 O + AM/AQ INSIDE STUDIES · V7 HOLD`

## Decision

`AQ_PROMOTED / VERIFIED_LOCAL_DUMMY_DESIGN_STUDY`.

This is meaningful visual progress, but not V6 completion and not print-ready. Final real copy/photo replacement, printer template, bleed/trim/fold, PDF preflight, and physical proof remain open.
