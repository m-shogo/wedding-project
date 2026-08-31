# ADD-12 新郎新婦クイズカード — QA

Status: `CURRENT / V4_OFFSET_ANSWER_RIBBONS_SELECTED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / LONG_COPY_STRESS_PASS / STRUCTURE_QA_PASS / CLEANROOM_PROVENANCE_PASS / LEGACY_AND_PRIOR_VNEXT_PRESERVED / NOT_PRINT_READY`
Updated: 2026-08-31
Current authority: `docs/automation/non-rurubu-figma-quality-current.md`

## Current selected authority

- detailed V4 evidence: `V4-OFFSET-ANSWER-RIBBONS-QA-2026-08-30.md`
- Figma file: `oZ24SbwGkeAfFJcXlbxCoD`
- V4 blank page: `73:2 / V4 / ADD-12 / QUIZ CARD / CLEANROOM / 2026-08-30`
- V4 front: `73:3 / V4 / ADD12 / QUIZ / FRONT / OFFSET ANSWER RIBBONS / CLEANROOM`
- V4 back: `73:30 / V4 / ADD12 / QUIZ / BACK / CORRESPONDENCE FIELD / CLEANROOM`
- native front content flow: `75:2`
- native question flow: `74:2`
- native back answer/name flow: `74:3`
- native back message/handwriting flow: `76:63`
- hidden fresh stress: front `76:67`, back `76:104`
- exact Drive authority: `1LUanrHk9_lhZcSqf95ybgWH29_bmcfvZ / ADD-12_新郎新婦クイズカード`
- Drive readback: folder exists and currently contains no required production asset
- Drive writes for V4: `0`

Previous `ANSWER PUNCH CARD`, professional vNext, V2/V3 and legacy families remain preserved as comparison / rollback history only. They are not construction bases for V4.

## V4 result

The V4 clean-room already existed in Figma and its detailed evidence was present in Git, but `QA.md` still pointed to the older FAMILY_DIVERSITY Current. On 2026-08-31 the exact V4 page/nodes and Drive authority were live re-read before changing Current authority. No Figma geometry was mutated during this authority-correction step.

Front direction: `OFFSET ANSWER RIBBONS`.

- coral top crop plus full-height deep-navy boundary;
- large `Q.01` and Japanese-first question hierarchy;
- A–D choices use offset open rows / compact print markers rather than buttons/cards;
- response method and date sit on the physical lower edge;
- no airline/passport/Rurubu grammar or fake quiz-show UI.

Back direction: `CORRESPONDENCE FIELD`.

- deep-navy top field + coral rule;
- answer/name are native semantic rows;
- large message / handwriting area uses native Auto Layout;
- muted teal closing field creates a paired but non-mirrored reverse side.

Responsibility split:

- variable / placeholder copy: native editable Figma text;
- dynamic copy relationships: native Auto Layout;
- fixed decoration: simple native vector/shape fields;
- reusable SVG: `0`;
- generated raster: `0`;
- replaceable photography: `0`;
- IMAGE fills: `0`.

## Fresh authority / structure verification

Live metadata on `73:2` confirmed the V4 front/back, native flows and hidden final stress roots are still present at the exact IDs recorded by the V4 evidence.

The V4 evidence records defects found and repaired during authoring rather than inheriting old structural claims: fixed 10px text boxes, question/method collision risk, Auto Layout sizing, answer/name clipping, long-question collision, and handwriting-flow collision were all repaired before V4 selection.

Final stress authority remains:

- front `76:67`;
- back `76:104`.

No new structural regression was observed in the live node tree during this Current-authority reconciliation.

## Print-first status

Working physical authority: A6 portrait duplex `105 × 148 mm`, Figma `620 × 875 px`, approximately `5.91 px/mm`.

Approximate actual-size type from the V4 evidence:

Front:

- `Q.01` 72px ≈ **34.5pt**;
- question 30px ≈ **14.4pt**;
- kicker 22px ≈ **10.6pt**;
- answer options 18px ≈ **8.6pt**;
- response method 16px ≈ **7.7pt**;
- date 18px ≈ **8.6pt**.

Back:

- title 42px ≈ **20.1pt**;
- support copy 18px ≈ **8.6pt**;
- answer/name values 20px ≈ **9.6pt**;
- smallest message/footer roles 16px ≈ **7.7pt**.

Raster effective PPI: `N/A`; `RESOLUTION_WARNING=NONE` because V4 contains no raster IMAGE fill.

Printer-authoritative bleed / trim-template / safe geometry is not yet fixed here, so no guessed production bleed is added by this authority update. These remain `DEFERRED_FINALIZATION` together with final paper stock and printer profile.

Physical / production checks still required:

- final question / choices / response method and whether a correct-answer or prize operation exists;
- real guest handwriting test with the intended black pen / pencil at 100% actual size;
- message-field usable area and writing comfort on final stock;
- duplex front/back registration and orientation;
- edge / trim safety according to printer template;
- deep navy, coral, teal and warm-paper CMYK / grayscale proof;
- final black construction according to printer specification;
- PDF export, font embedding, transparency, overprint/knockout, preflight and physical proof.

QR: not currently part of the V4 authority. Punch / perforation / binding are not assumed from the visual fields; any physical finishing must come from final production authority rather than appearance.

`DESIGN_COMPLETE != PRINT_READY` remains in force.