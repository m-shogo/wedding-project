# WEDDING PASSPORT — Clean-room A2 Departure Window Current QA / 2026-08-25

State: `CURRENT_SELECTED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / CLEANROOM_A2_PROMOTED / LONG_COPY_STRESS_PASS / AUTO_HEIGHT_PASS / LEGACY_PRESERVED / NOT_PRINT_READY`

## Live authority

- start run `main`: `5ca1003c8e1d494b84c505339bd44bc365a75e05`
- latest `main` immediately before Git write: `d11a2cf09a61727726d0d77989df7c861b60c7ed`
- Current authority: `docs/automation/non-rurubu-figma-quality-current.md` = `ACTIVE / HOURLY / FIGMA_EDIT_ALLOWED / VISUAL_REOPENED`
- hybrid authoring: `docs/design-learning/AI-FIGMA-HYBRID-AUTHORING-POLICY.md`
- assembly authority: `FIGMA-CLEANROOM-A2-B2-ASSEMBLY-SPEC-2026-08-25.md`
- Figma file: `UbK8KmuWJcDeGScsN49Uor`
- exact Drive authority: `1LnGb9tq_Vswe-GKO6UxfvKMAZuShEaaw / 01_パスポート風_メニュー・ドリンク・座席表`
- Drive metadata readback: ID and folder title matched; Drive writes `0`.

## Clean-room construction

The new A2/B2 studies were built on a new Figma page from blank `1480×2100` frames. No existing production node, old V2/V3 frame, layout group, crop, ornament, badge, rail, image, or generated asset was duplicated as construction input.

Allowed inherited requirements only:

- canvas `1480×2100` front/back;
- wedding-keepsake/passport-inspired artifact role;
- confirmed `2026.10.24` and `YOKOHAMA`;
- native editable `[新郎新婦名]` role;
- no fake passport/immigration/airline credential data;
- verified font capability (`Noto Sans JP`, `Inter`).

Fixed art came only from the refined 2026-08-25 clean-room SVG studies:

- A2 front: `studies/vnext-2026-08-25/departure-window-v2-fixed-art.svg`
- A2 back: `studies/vnext-2026-08-25/departure-window-v2-return-fixed-art.svg`
- B2 front/back were independently assembled from the matching Island Field Guide v2 SVG pair.

## Hybrid authoring split

- reader-facing/factual/emotional copy: native Figma text;
- fixed atmosphere/booklet support: editable SVG node tree imported with `createNodeFromSvg`;
- raster/image fills: `0`;
- generated raster: `0`;
- replaceable photography: `0`;
- variable text baked into SVG/raster: `0`.

No image generation was invoked because the current bottleneck was composition/art-direction, not missing photography or illustration.

## First 500px review

Created on clean-room study page:

- A2 front `199:3`
- A2 back `199:15`
- B2 front `199:27`
- B2 back `199:36`

Initial assembly exposed real failures in both directions: poster-scale Japanese wrapping, intro/headline collisions, and dates wrapping because the first text measures were too narrow. These were corrected by reducing headline scale, widening factual measures, and preserving open reading lanes rather than adding containers.

After correction:

- A2: strongest artifact specificity + travel anticipation; bound-spine cue, cropped aperture/sun, one coral departure gesture and subordinate lagoon line read as a booklet with motion rather than an airport UI.
- B2: strong editorial/destination atmosphere but retained a slightly higher gallery-poster risk and less explicit booklet specificity.

Decision: mature A2; keep B2 as `HOLD` comparison, not production.

## Reading / actual-size QA

A2 front/back were reviewed at ~1000px reading scale and ~1400px detail scale.

Front detail review found the intro measure entering the blue aperture at higher resolution even though the 500px thumbnail appeared acceptable. The native intro width was tightened `590 → 500px`, after which the sentence remained entirely on the cream reading field.

A2 front hierarchy after correction:

- native `WEDDING PASSPORT` kicker;
- Japanese-first `旅のはじまりを、\nひらく日。`;
- native intro;
- one-line `2026.10.24` + `YOKOHAMA`;
- native `[新郎新婦名]`;
- no plane/stamp/badge/barcode/QR/fake credential.

A2 back hierarchy after correction:

- native `RETURN NOTE` identity;
- Japanese-first `今日の余韻を、\nつれて帰ろう。`;
- native message;
- one factual date/place/couple cluster on the stable dark field;
- no form/card/widget containment.

## Long-copy stress

Dedicated hidden QA duplicates:

- front `202:2 / QA / A2 FRONT / LONG COPY STRESS`
- back `202:20 / QA / A2 BACK / LONG COPY STRESS`

The first stress pass reproduced two useful failures:

1. mechanical Japanese break in the longer front headline (`ひら / く日。`);
2. long back headline/message crossing the stable cream aperture into the dark field.

The stress proof was corrected without changing production copy:

- front headline uses explicit semantic lines: `旅のはじまりを、 / もう一歩先へ / ひらく日。`;
- long couple role breaks between the two semantic names rather than mid-word;
- back stress uses a smaller but still readable headline range and a narrower cream-field message lane;
- no Japanese particle/word-ending isolation remains in the final stress screenshot.

Final stress screenshots: PASS.

## Structure readback

A2 front `199:3`:

- visible native text `6`;
- fixed-height text `0`;
- visible text outside root `0`;
- text-text collisions `0`;
- IMAGE fills `0`.

A2 back `199:15`:

- visible native text `6`;
- fixed-height text `0`;
- visible text outside root `0`;
- text-text collisions `0`;
- IMAGE fills `0`.

Stress front `202:2` / back `202:20`:

- fixed-height text `0`;
- visible text outside root `0`;
- text-text collisions `0`;
- IMAGE fills `0`.

All semantic text uses `textAutoResize=HEIGHT` after width assignment.

## Mature comparison to retained Current

Only after A2 completed 500px, reading/detail, stress and structure QA was retained Current inspected.

Retained previous Current remains preserved:

- page `181:2`
- front `181:52 / FIELD JOURNAL`
- back `181:80 / RETURN NOTE`

FIELD JOURNAL remains structurally strong and physically plausible, but at 500px it is materially quieter and more block-based. A2 adds stronger travel anticipation and celebratory energy while retaining a genuine booklet cue through the bound spine and avoiding fake travel administration.

Decision: **A2 clearly wins the reopened brief and is promoted.**

## New Figma Current

A dedicated Current page was created from the mature clean-room A2 pair; the retained old Current was not overwritten.

- new Current page: `205:2 / CURRENT_SELECTED / PASSPORT / DEPARTURE WINDOW V2 / 2026-08-25`
- new Current front: `205:3 / CURRENT_SELECTED / PASSPORT FRONT / DEPARTURE WINDOW V2`
- new Current back: `205:21 / CURRENT_SELECTED / PASSPORT BACK / RETURN WINDOW V2`
- study page preserved: `199:2 / STUDY / PASSPORT / A2-B2 / 2026-08-25`
- B2 preserved as `HOLD` study: `199:27 / 199:36`
- stress proofs preserved hidden: `202:2 / 202:20`
- previous Current preserved unchanged: `181:52 / 181:80`.

Fresh 500px screenshots of `205:3 / 205:21`: PASS.

## Professional Design Council

- concept clarity / ownability: `14/15`
- emotional excitement / want-to-pick-up: `14/15`
- Japanese typography / editorial craft: `14/15`
- composition / hierarchy / rhythm: `14/15`
- travel / destination warmth without cliché: `9/10`
- item-specific functionality / keepsake-booklet identity: `9/10`
- physical print credibility: `8/10`
- editability / realistic content resilience: `5/5`
- family fit without template sameness: `5/5`

Total: `92/100 / PASS / NO VETO`.

The remaining print deduction is deliberate: exact printer template/profile, physical binding/stock behavior, bleed/safe-area proof and final copy are still unavailable.

## Deferred finalization

`NOT_PRINT_READY` remains until final couple names/copy, exact printer template/profile, stock/finishing, binding behavior and physical proof are authoritative.

## Result

`CURRENT_SELECTED / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / CLEANROOM_A2_PROMOTED / LONG_COPY_STRESS_PASS / AUTO_HEIGHT_PASS / LEGACY_PRESERVED / NOT_PRINT_READY`.

## Next target

Proceed to BOARDING PASS. Re-read its latest Current/Figma/Drive authority first; build the next materially different V2/V3 from a blank frame if the Current would not be selected as a fresh proposal.