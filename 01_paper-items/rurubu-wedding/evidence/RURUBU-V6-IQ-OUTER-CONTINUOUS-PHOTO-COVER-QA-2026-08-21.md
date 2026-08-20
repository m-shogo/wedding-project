# Rurubu WEDDING V6 — IQ Outer Continuous Photo Cover QA

Date: 2026-08-21
Scope: Rurubu WEDDING only
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Authority order used: live Figma → verified Drive → Rurubu GitHub evidence/status

## Source problem

The preferred outer ID `2051:2` was structurally sound but the front cover still read as a cream masthead box above a hero photo and a separate cream lower section. At whole-item scale this split the cover into web-like horizontal bands and made the dominant Yokohama photograph feel contained rather than editorially dominant.

## Root-cause hypothesis

The weakness was not missing imagery. The existing Yokohama waterfront photo was already semantically correct and strong enough. The main problem was background segmentation and a redundant masthead support field. A stronger result should come from allowing the photograph to become the continuous front-cover field, keeping the native masthead/title/callouts editable, and reducing the lower cream section to a compact closing zone.

## Bounded clean-room test

Rollback-safe candidate IQ `2099:2` was cloned from ID and changed only on the front cover. The back cover was preserved.

Changes:

- front hero `539c259be8036b481d06b4f76db9a39b407d90e8` extended from ~690px to 850px height;
- cream masthead support field hidden;
- redundant older logo raster hidden; current masthead lockup `0bdbf47904ea5865c71b1555dc73689b2c7b2126` retained;
- `横浜`, `ふたり旅。`, feature 01 and micro coverline moved directly onto the continuous photographic field;
- lower cream field reduced to ~273px;
- dining support photo `d76eb07d83d042f15044c8bc6bf68d73a73cd77d` resized to ~380×285 and pulled upward so it overlaps the hero-to-lower transition;
- feature 03 moved into the compact lower-left close;
- no new raster, card, shadow, gradient, Drive upload, generated image, or image hash was added;
- native text content remained editable;
- one remaining issue-line/micro-coverline text-box overlap was found by structure QA and corrected by reducing only the short issue-line text box width.

## Expected improvement

- remove the false `masthead box → photo → lower section` page segmentation;
- make Yokohama photography the unmistakable first read;
- create a more authentic Japanese travel-magazine cover rhythm using photo, large native destination type, small issue band, feature number/title, and a support-photo overlap;
- preserve all factual/native copy and replaceable image roles.

## Regression risks checked

- masthead/title contrast over a bright sky;
- support photo feeling detached from the lower close;
- text collision from the tighter top cluster;
- safe-area regression from pushing type closer to the cover edges;
- accidental flattening or loss of replaceable image fills.

## Three-scale evidence

### Whole item / thumbnail

`2099:2` at 500px: PASS. The front reads as one photographic magazine cover rather than three stacked horizontal fields. The back remains unchanged.

### Reading scale

`2099:2` at 1400px: PASS. Destination masthead, issue band, feature 01, hero photograph, feature 03, and support photo remain distinguishable and readable.

### Actual-size/detail

`2099:2` at native 1587×1123 spread: PASS. The front half is effectively ~794×1123 at 1:1 and preserves readable native type, image detail, and fold-safe separation.

## Structure QA

Final effective-visible structure on IQ:

- visible native text nodes: `35`;
- visible IMAGE-fill nodes: `4`;
- front text intersections: `0`;
- front 18px text safe-area risks: `0`;
- whole-page flattening: `NO`;
- native variable text preserved: `YES`;
- replaceable photo fills preserved: `YES`.

Image hashes preserved:

- back dominant: `e3738476f760932bb5b09c9d60f174dd6c84049d`;
- front Yokohama hero: `539c259be8036b481d06b4f76db9a39b407d90e8`;
- front dining support: `d76eb07d83d042f15044c8bc6bf68d73a73cd77d`;
- current masthead lockup: `0bdbf47904ea5865c71b1555dc73689b2c7b2126`.

## Promotion / rollback

- IQ `2099:2` → `PREFERRED / V6_OUTER_IQ_CONTINUOUS_PHOTO_COVER_2026_08_21`, visible at x=`272000`, y=`0`.
- ID `2051:2` → `ROLLBACK_HIDDEN / V6_OUTER_ID_HN_BACK_PHOTOLED_FRONT_2026_08_21`, hidden at x=`277400`.
- no prior rollback/comparison frame was deleted.

Decision: `IQ ADOPTED / VERIFIED_LOCAL_DUMMY_DESIGN_STUDY`.

## Drive / asset lifecycle evidence

Drive V6 root was reverified before the Figma write:

- `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`

This experiment did not require image generation or transport:

- newly generated assets: `0`;
- adopted generated assets: `0`;
- new Drive saves: `0`;
- new external binary placements: `0`;
- new image hashes: `0`.

## Learning

Local lesson: when a print cover already has a semantically correct dominant photograph but still reads as stacked web sections, first test whether removing a nonfunctional masthead support field and extending that existing image behind native type creates a stronger continuous editorial field before generating another asset or adding more decoration.

Cross-item state: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`.

What remains Rurubu-specific: Yokohama photography, masthead/logo treatment, magenta/yellow/cyan palette, exact overlap geometry, coverline wording, destination scale, and Japanese travel-magazine visual grammar.

## Completion boundary

IQ improves V6 dummy-design quality but does not make V6 print-ready. Final photography/copy, printer template, bleed/trim/fold/safe-area specification, PDF preflight and physical proof remain separate gates.
