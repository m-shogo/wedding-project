# 2026-08-10 — V5 outer clean-room Y / Z / AA editorial comparison

## Scope

Rurubu WEDDING only. WEDDING PASSPORT, BOARDING PASS, 青春ふたりきっぷ, and ADD items were not touched.

Authority read before writes:
- live Figma `01_RURUBU_WEDDING`
- Google Drive Q60 cover master readback
- `01_paper-items/rurubu-wedding/CURRENT-STATUS.md`
- project `AGENTS.md` / `docs/project-memory.md`
- GitHub `main` at `bb264aab0dd0987c6955c66eab73cec1d4b0602b`

## Visible problem

Clean-room X improved the outer spread but the back cover still read as a stacked template: dominant hero image, then a two-up Friends gallery, then a detached timeline. The cover also still had an overly grid-like lower feature index. The highest-value safe defect that did not require new binary transport was therefore editorial rhythm, photo overlap, and subtraction of duplicated support imagery.

## Principle tested

1. Increase magazine authenticity by making the dominant back photo genuinely dominant rather than preserving legacy module heights.
2. Convert the Friends area from a two-up gallery into an asymmetric editorial collage with materially different scale and intentional overlap.
3. Remove duplicated use of the cafe image on the front cover rather than keeping a repeated support-photo module for activity.
4. Test whether a staggered feature index beats the existing two-column rail; reject it if the intervention becomes decorative rather than editorial.

Expected improvement: stronger thumbnail silhouette, clearer photo hierarchy, less dashboard/card-grid feeling, more Japanese travel-magazine rhythm.

Regression risks: Friends captions or timeline collision, fold drift, image-hash changes, hidden Current mutation, or a cover index that looks arbitrarily decorative.

## Y — back-collage subtraction

Created duplicate:
- `685:2 / V5_OUTER_RURUBU_CLEANROOM_Y_BACK_COLLAGE_SUBTRACTION_2026_08_10`

Key visual changes from X:
- back main photo enlarged from `770×500` to `778×575` and squared to the page edge rhythm
- redundant `BACK_VISUAL_MAIN_HEADING` and its accompanying rule hidden; the large native back headline already carried the hierarchy
- Friends heading moved directly against the dominant photo edge
- cafe photo enlarged to `430×274`
- dining photo enlarged/repositioned to `316×208`
- timeline compressed lower while preserving six events
- front-cover duplicate cafe support image hidden; no replacement image/card was added

Fresh screenshot result: the back page reads more strongly as a photo-led travel-magazine page and less as three stacked UI sections. The front cover retains hierarchy without the repeated cafe thumbnail.

## Z — staggered cover index experiment

Created duplicate:
- `686:2 / V5_OUTER_RURUBU_CLEANROOM_Z_STAGGERED_EDITORIAL_INDEX_2026_08_10`

Experiment:
- broke the lower cover feature rail out of the previous two-column arrangement
- staggered `01 / 02 / 03`
- converted the vertical pink divider into a short diagonal editorial rule

Result: structurally valid but visually weaker than Y. The diagonal rule became a decorative gesture without enough semantic benefit, and the lower cover still felt sparse. Z is preserved as rejected comparison evidence, not promoted.

## AA — overlapping Friends collage

Created duplicate:
- `688:2 / V5_OUTER_RURUBU_CLEANROOM_AA_OVERLAP_FRIENDS_COLLAGE_2026_08_10`

Key change from Y:
- dining photo enlarged to `338×214`, moved to overlap the lower-right edge of the `430×274` cafe image, and rotated `2.6°`
- its native `FRIENDS 02` label and caption were repositioned with it
- no new card, badge, shadow, gradient, image, or generated asset was introduced

Whole-item and actual-size back-page screenshots show AA is stronger than Y for the back page: it stops reading as a two-up gallery and starts reading as a deliberate editorial collage while keeping the timeline readable.

## Fresh structure QA

AA `688:2`:
- visible native text: `39`
- visible IMAGE fills: `6`
- same-parent visible text intersections: `0`
- fold guide: `688:161`, `2 × 1122.5`, visible, x=`792.7`
- preserved image hashes:
  - back main `688:6`: `e3738476f760932bb5b09c9d60f174dd6c84049d`
  - Friends cafe `688:18`: `c1ada11205bc3978bf426b304d683f1c1566cac2`
  - Friends dining `688:22`: `d76eb07d83d042f15044c8bc6bf68d73a73cd77d`
  - provisional cover hero `688:130`: `539c259be8036b481d06b4f76db9a39b407d90e8`
  - logo `688:135`: `0bdbf47904ea5865c71b1555dc73689b2c7b2126`
  - date badge `688:136`: `0cbbf09357938365c2550f08928be1db33fa6060`

Current outer protection readback:
- Current hero `77:148` remains hash `e58ddfa30e3b4bb68e44f1789d984b75cf8a7912`
- Current was not overwritten or promoted in this run.

## Q60 asset lifecycle / blocker readback

Google Drive master re-read:
- filename `RURUBU_V5_01_COVER_HERO__FIGMA_1330x1220_Q60.jpg`
- Drive ID `1YL0WAOzYU3O1FGa23ieRuw_Btu4jbmzr`
- MIME `image/jpeg`
- bytes `155,439`
- raw file materialized successfully in the execution environment

A new Figma single-use `upload_assets` endpoint was issued for Y hero node `685:130`. Posting the verified raw JPEG bytes failed before transfer because the execution container still could not resolve `mcp.figma.com` (`curl: (6) Could not resolve host`). No Figma image assignment occurred. This transport method is not counted as progress and should not be repeated again under the same runtime capability.

## Adoption decision

- Y: ADOPTED as stronger intermediate comparison than X
- Z: REJECTED as visually weaker/decorative despite passing structure QA
- AA: ADOPTED as this run's strongest outer comparator
- Current promotion: NOT PERFORMED
- Q60 placement: NOT COMPLETED
- V5 completion: NOT CLAIMED
- V6 production: NOT STARTED

## Learning / next application

- After dominant-photo enlargement, a secondary two-up gallery can remain visibly template-like even when individual images are good. The next effective step is not another card or label; it is to create a real photo hierarchy by varying scale and allowing one controlled overlap.
- Removing a duplicated support image can improve cross-spread image authority more than replacing it with another decorative asset.
- Staggering content is not automatically editorial. If a diagonal rule or offset does not strengthen reading order, reject it even if it looks more energetic.
- Continue three-scale screenshot review plus geometry intersection QA after asymmetric/overlapping experiments.

Status: `PROTOTYPED / Y_ADOPTED_AS_INTERMEDIATE / Z_REJECTED / AA_VERIFIED_BEST_COMPARATOR_THIS_RUN / CURRENT_UNCHANGED / Q60_TRANSPORT_STILL_BLOCKED`
