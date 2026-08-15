# ADD-09 ゲストブックサイン — Clean-room V2/V3 Study — 2026-08-15

Status: `VISUAL_REOPENED / CLEANROOM_V2_VALID_COMPARISON / V3_REJECTED_FOR_PROCESS_CONVERGENCE / LEGACY_PRESERVED / NOT_PROMOTED`
Authority: GitHub latest `main` + `docs/automation/non-rurubu-figma-quality-current.md`

## Authority readback

- latest main immediately before evidence write: `c20076846b52d3b7b3ad0a7cd8c8e86d5aab99bb`
- Figma: `PjFWBpDwaQM5LfvgdqSFvU`
- page: `01_PRODUCTION`
- retained production: `1:3 / FRAME_ADD09_GUEST_BOOK_SIGN`
- exact Drive authority: `1D259ugx13El0JYxvn8yyskIjc2c2liF4 / ADD-09_ゲストブックサイン`
- Drive writes this iteration: `0`

## Allowed rebuild inputs

Only verified non-visual facts/roles were used for V2:

- working root: `1000×1419`;
- item role: Guest Book sign;
- verified guest-facing headline: `旅の記録に、一言を。`;
- date: `2026.10.24`;
- native editable instruction role with semantic placeholders;
- final writing method / pen placement / installation wording remain deferred.

The retained production was not duplicated and its internal visual structure was not inspected before V2 authoring.

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

## Post-completion comparison

Only after V2 and its stress QA were complete was retained production `1:3` visually inspected.

Decision: `INCONCLUSIVE / NO PROMOTION`.

- V2 is more explicitly guest-book-specific and has a stronger standalone visual event;
- retained production remains visually restrained and typographically credible;
- V2's literal open-book fixed art does not yet create a sufficiently clear one-way sellable win to replace the retained production under the strict comparison gate.

Therefore V2 is preserved as a serious clean-room comparison, but `SELLABLE_VISUAL_QA_PASS` is not re-issued from V2.

## V3 process note — rejected for promotion

A second concept was authored as:

- section `14:2 / CLEANROOM_ADD09_V3_2026_08_15`
- candidate `14:3 / CLEANROOM_ADD09_V3_MESSAGE_FIELD`

It used a rust side field and abstract message-rhythm SVG rather than the V2 open-book art. However, it was authored **after** the retained production had already been visually compared during this run. On review, its side-field silhouette also converged too closely toward a known retained-production characteristic.

Under the strict clean-room rule, this is not acceptable promotion evidence. V3 is therefore retained only as a rejected/process-learning artifact and must not be promoted or used as the source for the next clean-room version.

Failure fingerprint:

- `POST_COMPARISON_VISUAL_CONVERGENCE` — a later candidate created after legacy comparison can unintentionally converge toward remembered legacy silhouette even without node reuse.

Method change required:

- next ADD-09 attempt must begin from authority facts only;
- do not inspect retained production, V2, or V3 visuals during the next authoring phase;
- author a fresh blank V4 direction first, complete long-copy/structure QA, then compare all retained candidates only after V4 is complete.

## Hybrid / generation decision

`IMAGE_GENERATION_NOT_REQUIRED_THIS_ITERATION`.

The unresolved issue is art-direction selection, not a proven shortage of photography or continuous-tone imagery. New editable SVG fixed art plus native typography was sufficient for the experiments; no raster asset was generated merely to increase decoration.

## Deferred finalization

- final writing method and pen placement;
- final guest-facing operational/installation copy;
- final location/footer wording;
- printer bleed/template/profile;
- 100% physical proof and venue-distance readability.

These remain `DEFERRED_FINALIZATION` and are not the cause of the current visual non-promotion.
