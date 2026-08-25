# WEDDING PASSPORT — Aperture-safe fixed-art fallback / PRE-FIGMA / 2026-08-25

State: `PRE_FIGMA_FALLBACK_CANDIDATE / CURRENT_VISUAL_REOPENED / PRODUCTION_UNCHANGED`
Scope: non-Rurubu only
Current authority: `docs/automation/non-rurubu-figma-quality-current.md`

## Live authority

- run-start latest `main`: `2aff5b0f420e6da0fcfd1cc081ca8358415354bd`
- latest `main` immediately before this evidence write: `7f0ebfb463d263709dfb668ed0cbcba25527eab8`
- latest unrelated concurrent changes observed before this item write: Movie / Rurubu-only; no unrelated rollback performed
- Figma file: `UbK8KmuWJcDeGScsN49Uor`
- Current front: `205:3 / CURRENT_SELECTED / PASSPORT FRONT / DEPARTURE WINDOW V2`
- Current back: `205:21 / CURRENT_SELECTED / PASSPORT BACK / RETURN WINDOW V2`
- exact Drive authority: `1LnGb9tq_Vswe-GKO6UxfvKMAZuShEaaw / 01_パスポート風_メニュー・ドリンク・座席表`
- Drive folder live readback: PASS
- production Figma mutation in this run: `0`
- Drive write: `0`
- image generation: `0`

No Rurubu item-specific Figma, Drive, asset, ledger, QA, or GitHub item path was inspected. Only the neutral shared-learning feed was consumed.

## Fresh visual evidence

Fresh Current renders were re-read at approximately 1000px for the `1480×2100` production roots.

Front `205:3` still shows the semantic Japanese break:

`今日という一日を、ふたりの旅の記`
`録に。`

Back `205:21` still shows two fixed-art/native-copy defects:

1. `RETURN NOTE` loses visibility where the native navy text crosses from the light aperture into the navy page field;
2. the subordinate turquoise sweep crosses the authoritative `2026.10.24` date.

Live metadata remains:

- front intro `205:17`: x `264`, y `690`, w `500`, h `96`;
- back kicker `205:33`: x `176`, y `260`, w `320`, h `34`;
- back date `205:36`: x `760`, y `1660`, w `560`, h `84`;
- place `205:37`: x `764`, y `1758`, w `340`, h `36`;
- couple `205:38`: x `760`, y `1855`, w `520`, h `48`;
- coral lower gesture `205:30`: begins around y `1384.5`;
- turquoise lower gesture `205:31`: spans around y `1540.5 → 1888`.

The Current remains correctly reopened. These are visual/field-ownership defects that structure-only evidence does not close.

## Shared-learning input consumed

Neutral Rurubu shared lesson `RSL-016` was read only as a QA hypothesis: source newlines do not prove rendered Japanese line breaks; actual rendered line structure must be inspected at physical/detail scale after measure changes.

No Rurubu visual treatment, coordinates, typography scale, asset, layout, brand treatment, or composition was transferred.

This supports continuing the Passport repair as rendered-line / field-ownership QA rather than treating source strings or text-node presence as proof of completion.

## New third-method fixed-art candidate

New editable SVG:

`studies/vnext-2026-08-25/departure-window-v2-return-fixed-art-aperture-safe-fallback.svg`

Asset commit:

`7f0ebfb463d263709dfb668ed0cbcba25527eab8`

This candidate is intentionally not a new art direction. It is a rollback-safe repair surface for the promoted clean-room concept if the lower-risk native-copy tests do not close the back defects cleanly.

### Bounded fixed-art changes

Compared with the existing return fixed art:

1. the upper cream aperture is enlarged as one continuous curved paper field so the current native `RETURN NOTE` lane can be fully owned by a light field without adding a rectangular text box;
2. the inner warm-gray aperture is proportionally expanded to preserve depth rather than turning the area into a flat cream panel;
3. the coral page-spanning travel gesture is retained unchanged as the dominant lower movement;
4. the turquoise subordinate gesture is shortened and resolves before the factual lane beginning near x `760`;
5. no authoritative text is baked into the SVG;
6. no badge, fake credential, decorative English, UI field, barcode, plane, stamp, gradient, shadow, or new icon is introduced.

The candidate therefore addresses both fixed-art defects at the fixed-art layer while leaving semantic/factual copy native.

## Why this is a third method, not the first test

The canonical first repair order remains the lower-risk `BOUNDARY-REPAIR-CANDIDATE-SPEC-2026-08-25.md`:

1. front intro: semantic native line break only;
2. back kicker: native text moved into a stable light lane;
3. back facts: date/place/couple moved together into a stable navy lane.

The earlier `date-clear` fallback changes only the turquoise gesture and remains the second fixed-art method if the grouped fact movement loses the desired lower-page rhythm.

This new aperture-safe candidate is the next method only when the back still needs both:

- stronger light-field ownership for the native identity; and
- a factual lane guaranteed clear of the subordinate turquoise gesture.

Do not promote it directly because it was created outside the live Figma comparison surface.

## Hybrid Authoring contract

- front intro / back kicker / date / place / couple: Figma native text;
- aperture / sun / binding / coral / turquoise movement: editable SVG fixed art;
- IMAGE fills intended: `0`;
- generated raster: `0`;
- replaceable photography: `0`;
- variable or authoritative text baked into SVG: `0`.

Image generation is not justified: the material defect is typography/field ownership, not missing hero imagery or texture.

## Required Figma test when authoring guidance is available

Do not rediscover the issue. Start from rollback-safe Current comparisons.

1. duplicate Current front/back as hidden rollback roots;
2. test the front semantic line-break repair alone;
3. test the native back-kicker stable-lane move alone;
4. test the grouped date/place/couple move alone;
5. if step 4 is rejected, test the existing date-clear fixed-art fallback;
6. if the back still fails on identity field ownership or the second-method composition becomes weak, import this aperture-safe candidate into a rollback-safe comparison while keeping semantic/factual text native;
7. inspect whole-item / approximately 500px;
8. inspect reading / approximately 1000px;
9. inspect native `1480×2100`;
10. run fresh realistic long-copy because text lanes/fixed-art relationships changed;
11. read back `textAutoResize`, fixed-height count, outside text, IMAGE fills, and SVG/vector editability;
12. restore `SELLABLE_VISUAL_QA_PASS` only after all three reopened defects are visibly closed.

## Acceptance gate for this candidate

Advance only if:

- `RETURN NOTE` is fully legible and still reads as artifact identity rather than a badge;
- headline/message remain visually owned by the aperture without becoming boxed/UI-like;
- date/place/couple are fully unobstructed;
- coral remains the dominant lower travel gesture;
- the shortened turquoise gesture does not look amputated at thumbnail scale;
- front/back still feel like one booklet family;
- no new dead zone, text collision, or field imbalance appears;
- semantic copy remains native and fixed art remains editable SVG.

Reject if enlarging the aperture makes the back feel like a large generic panel or if the turquoise termination becomes a meaningless stub.

## Learning state

`ROOT_CAUSE_HYPOTHESIS → PRE_FIGMA_THIRD_METHOD_PREPARED`

Item-local fingerprint:

`PROMOTED_CURRENT_FIXED_ART_TEXT_OPTICAL_COLLISION_AND_SEMANTIC_BREAK`

No cross-item rule is promoted. The transferable QA principle remains: actual rendered Japanese line structure and fixed-art/native-copy field ownership must be verified visually; structural presence alone is not completion evidence.
