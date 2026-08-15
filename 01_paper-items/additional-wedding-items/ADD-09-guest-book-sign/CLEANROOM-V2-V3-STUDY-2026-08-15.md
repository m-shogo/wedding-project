# ADD-09 ゲストブックサイン — Clean-room V2/V3/V4 Study — 2026-08-15

Status: `SELLABLE_VISUAL_QA_PASS / DESIGN_QA_PASS_WITH_PLACEHOLDERS / CLEANROOM_V4_SELECTED / V2_VALID_COMPARISON / V3_REJECTED_FOR_PROCESS_CONVERGENCE / LEGACY_PRESERVED / NOT_PRINT_READY`
Authority: GitHub latest `main` + `docs/automation/non-rurubu-figma-quality-current.md`

## Authority readback

- latest main immediately before V4 evidence write: `9b19234652ae93aff719c8bdb6ae084522979a5d`
- Figma: `PjFWBpDwaQM5LfvgdqSFvU`
- page: `01_PRODUCTION`
- retained production: `1:3 / FRAME_ADD09_GUEST_BOOK_SIGN`
- exact Drive authority: `1D259ugx13El0JYxvn8yyskIjc2c2liF4 / ADD-09_ゲストブックサイン`
- Drive folder live readback: verified 2026-08-15; folder remains empty and no asset write was required
- Drive writes this iteration: `0`

## Allowed rebuild inputs

Only verified non-visual facts/roles were used for clean-room authoring:

- working root: `1000×1419`;
- item role: Guest Book sign;
- verified guest-facing headline: `旅の記録に、一言を。`;
- date: `2026.10.24`;
- native editable instruction role with semantic placeholders;
- final writing method / pen placement / installation wording remain deferred.

No retained-production frame, old V2/V3 frame, old ornament, old image, or old visual treatment was used as a source for V4. The retained production and earlier candidates were not visually inspected during the V4 authoring phase.

## Valid clean-room V2

- section: `13:2 / CLEANROOM_ADD09_V2_2026_08_15`
- candidate: `13:3 / CLEANROOM_ADD09_V2_GUESTBOOK_FIELD`

Direction:

- full-width dark title field with Japanese-first headline;
- new editable open-book line illustration as fixed SVG art;
- native guest instruction auto-layout block;
- no raster IMAGE fills;
- no old vectors, rails, writing-rule groups, crops, generated assets, or legacy frame duplication.

Initial visual QA showed a coherent, role-specific guest-book artifact with stronger fixed-art identity than a generic sign. The long-copy duplicate `13:21 / QA_CLEANROOM_ADD09_V2_LONG_COPY_STRESS_2026_08_15` used materially longer lead/instruction/operation copy.

Programmatic stress readback:

- native editable text: `8`;
- raster IMAGE fills: `0`;
- text outside root: `0`;
- native instruction auto-layout stack height: `262 px`;
- screenshot review: no clipping or destructive overlap.

## V2 post-completion comparison

Only after V2 and its stress QA were complete was retained production `1:3` visually inspected.

Decision at that point: `INCONCLUSIVE / NO PROMOTION`.

- V2 is more explicitly guest-book-specific and has a stronger standalone visual event;
- retained production remains visually restrained and typographically credible;
- V2's literal open-book fixed art did not create a sufficiently clear one-way sellable win to replace the retained production under the strict comparison gate.

V2 is preserved as a serious clean-room comparison.

## V3 process note — rejected for promotion

- section `14:2 / CLEANROOM_ADD09_V3_2026_08_15`
- candidate `14:3 / CLEANROOM_ADD09_V3_MESSAGE_FIELD`

V3 used a rust side field and abstract message-rhythm SVG rather than the V2 open-book art. However, it was authored after the retained production had already been visually compared. On review, its side-field silhouette also converged too closely toward a known retained-production characteristic.

Failure fingerprint:

- `POST_COMPARISON_VISUAL_CONVERGENCE` — a later candidate created after legacy comparison can unintentionally converge toward remembered legacy silhouette even without node reuse.

V3 remains preserved only as rejected/process-learning evidence.

## Clean-room V4 — selected

Method change was applied exactly as required by the V3 failure fingerprint: V4 was authored from authority facts only, before any new visual inspection of retained production, V2, or V3.

Figma evidence:

- section: `16:2 / CLEANROOM_ADD09_V4_2026_08_15`
- selected candidate: `16:3 / CLEANROOM_ADD09_V4_JOURNEY_LINE`
- long-copy QA section: `17:3 / QA_CLEANROOM_ADD09_V4_LONG_COPY_STRESS_2026_08_15`
- long-copy QA candidate: `17:4 / QA_CLEANROOM_ADD09_V4_LONG_COPY_STRESS`

V4 art direction:

- warm paper field rather than a web-card composition;
- large Japanese-first Mincho headline in the upper-left;
- date as a small rust-red factual anchor;
- a newly authored editable SVG `VECTOR / CONTINUOUS JOURNEY LINE` as the central fixed graphic;
- the route line is deliberately abstract and contains no fake transport data, fake text, or authoritative copy;
- guest instructions are native editable text in `LAYOUT / GUEST BOOK INSTRUCTIONS`;
- the first QA showed the auto-layout's default white fill reading like a UI card, so that fill was removed and replaced by a narrow rust index rule plus open print-ledger treatment;
- no raster IMAGE fills and no generated asset dependency.

Hybrid responsibility split:

- headline/date/instruction/footer placeholders: native Figma text;
- central continuous-line art and simple rules: newly authored editable vector/SVG;
- replaceable image role: not applicable for this direction;
- generated/composed raster decoration: not required because no screenshot-supported raster deficiency remained.

## V4 three-scale QA

Whole-item / thumbnail:

- headline remains the first read;
- abstract continuous line creates a distinctive Guest Book identity without literal book iconography;
- no equal-card/admin-dashboard rhythm;
- rust/ink/cream hierarchy survives reduction.

Reading/page scale:

- date is subordinate but legible;
- fixed SVG and native copy read as one visual system;
- after removing the default white auto-layout fill, the instruction area reads as print structure rather than a pasted UI panel.

Actual-size/detail:

- Mincho headline remains crisp;
- native instruction hierarchy and divider remain readable;
- vector linework is clean and editable;
- no raster resolution dependency exists.

## V4 long-copy / structure QA

Stress candidate `17:4` used materially longer guest-facing instruction, operation, and footer placeholder copy.

Programmatic readback:

- native editable text: `5`;
- raster IMAGE-fill nodes: `0`;
- text outside root: `0`;
- stress screenshot: no clipping or destructive overlap;
- semantic instruction stack remains native auto-layout;
- variable/factual copy remains outside SVG/raster assets.

## Final post-completion comparison

Only after V4 and its long-copy/structure QA were complete were the retained production `1:3` and V2 `13:3` visually re-opened for comparison.

Decision: `V4 SELECTED / SELLABLE_VISUAL_QA_PASS`.

Comparison judgment:

- retained production remains credible but reads as a restrained generic sign with a side field and writing rules;
- V2 is role-explicit but the literal open-book illustration is more conventional and less distinctive;
- V4 is materially different from both, establishes a stronger standalone editorial object, preserves Japanese typography and clear instruction hierarchy, and avoids both generic minimal-sign grammar and literal guest-book illustration;
- V4 therefore provides the clearest clean-room one-way improvement while keeping all human-editable information native.

The retained production, V2, rejected V3, and V4 QA evidence all remain preserved. No old production node was overwritten or deleted.

## Hybrid / generation decision

`IMAGE_GENERATION_NOT_REQUIRED_THIS_ITERATION`.

The V4 defect was resolved through typography, abstract editable SVG, and print-ledger structure. Generating raster decoration would add provenance and resolution complexity without a demonstrated visual need.

## Deferred finalization

- final writing method and pen placement;
- final guest-facing operational/installation copy;
- final location/footer wording;
- printer bleed/template/profile;
- 100% physical proof and venue-distance readability.

These remain `DEFERRED_FINALIZATION`. Therefore the item is visually/structurally selected but remains `NOT_PRINT_READY` until physical/vendor/final-copy checks are complete.
