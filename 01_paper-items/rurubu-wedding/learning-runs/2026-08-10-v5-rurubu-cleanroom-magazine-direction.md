# Rurubu V5 — clean-room magazine-direction experiments

Date: 2026-08-10
Status: `PROTOTYPED / CURRENT_UNCHANGED / COVER_DIRECTION_GAIN_VERIFIED / HERO_TRANSFER_BLOCKED`
Scope: Rurubu WEDDING only

## Authorities read before action

Project-wide:
- `docs/wedding-figma-production-system.md`
- `docs/wedding-asset-generation-memory.md`
- `docs/wedding-figma-ai-continuous-learning-system.md`
- `docs/wedding-design-learning-feedback-log.md`
- `docs/project-memory.md`
- `docs/decisions/2026-08-02-quality-over-legacy-design.md`

Rurubu-specific:
- `CURRENT-STATUS.md`
- `RURUBU-PRODUCTION-OPERATING-SYSTEM-V2-2026-08-02.md`
- `POSTMORTEM-CONTINUOUS-IMPROVEMENT-AND-V6-GUARDRAILS-2026-08-02.md`
- current live Figma comparison frames and asset/provenance evidence already recorded in Current

## User feedback / visible problem

The current V5 remains visually too timid and too close to a cleaned-up editorial template rather than an unmistakable Japanese travel-information magazine. The dominant problems are:

- cover hierarchy is under-energized
- photo/copy relationships are too polite and separated
- the page lacks the layered collage rhythm of a real travel-guide cover
- existing incremental subtraction/polish is no longer sufficient
- the low-quality cover hero remains a dominant perceptual defect

Anti-anchoring answer: if Current V5 did not already exist, it would not be selected as the starting composition for a stronger Rurubu-like result. Therefore a new clean-room comparison was required instead of another micro-polish of Current.

## Reference principles researched

Recent Rurubu travel-guide covers were reviewed as reference-only material. No published cover artwork was imported into production. Extracted principles:

- large destination title with an irregular/soft white field
- bright pink/yellow/cyan navigation colors
- small stacked brand/category markers at the upper-left
- a dominant destination image occupying most of the cover
- smaller food/experience/photo thumbnails crossing or sitting near the title/hero boundary
- dense, short Japanese sell-lines placed directly over the hero rather than isolated in equal cards
- a bright vertical side callout
- compact bottom feature navigation
- intentionally asymmetric overlap and strong scale contrast

These are genre/editorial-grammar observations only; no proprietary layout, logo, illustration, or published copy was copied verbatim.

## Experiment A — `591:2`

Frame:
- `591:2 / V5_OUTER_RURUBU_CLEANROOM_B_MAGAZINE_2026_08_10`

Tested principle:
- push the previous dense clean-room cover toward a real travel-guide magazine grammar instead of preserving the legacy Current cover

Changes inside the safe duplicate only:
- enlarged the hero area to `735.7 × 720`
- enlarged and tightened the destination-title field
- increased the `横浜` title scale
- tightened the left sell-line block directly over the hero
- converted the hero caption to a slimmer square-corner editorial ribbon
- added a three-image mini gallery from already verified/provenance-safe V5 image fills
- added small native category labels: `グルメ`, `ふたり旅`, `横浜MAP`
- added a compact native `保存版 ふたり旅` badge
- tightened bottom feature navigation

Reused image hashes for comparison only:
- Friends cafe `c1ada11205bc3978bf426b304d683f1c1566cac2`
- Friends dining `d76eb07d83d042f15044c8bc6bf68d73a73cd77d`
- back main `e3738476f760932bb5b09c9d60f174dd6c84049d`

Result:
- whole-item screenshot shows a clear gain in Rurubu/travel-guide recognizability, photo/copy overlap, color energy, and hierarchy compared with Current and earlier `413:2`
- native text and semantic editability remain intact
- fold and Current rollback remain untouched
- **not promoted to Current**, because the dominant cover image still uses the known low-quality legacy hero hash and therefore fails the dominant-photo quality gate

Decision: `PROTOTYPED / DIRECTION_GAIN / NOT_CURRENT`

## Experiment B2 — `593:2`

Frame:
- `593:2 / V5_OUTER_RURUBU_CLEANROOM_B2_VERIFIED_HERO_TEST_2026_08_10`

Hypothesis:
- test whether replacing the low-quality legacy hero inside the comparison with an already verified high-quality V5 travel image would improve the overall cover enough to justify a different asset strategy

Hero test:
- node `593:278 / CR_HERO_REPLACEABLE`
- image hash `539c259be8036b481d06b4f76db9a39b407d90e8`
- source role: verified V5 history lead

Screenshot QA found an initial headline collision after copy adaptation. That collision was corrected in the same isolated candidate by shortening the large headline to `街と海をめぐる` and moving `横浜 WEDDING DAY` to the secondary line.

Result after correction:
- the composition remains substantially closer to Rurubu cover grammar than Current
- the hero source has better provenance/quality than the current cover hash, but the aspect-ratio mismatch and resulting visual softness/crop make it unsuitable as a final cover replacement
- therefore this is evidence that composition direction is improving, not evidence that the history image should become the cover hero

Decision: `PROTOTYPED / COMPOSITION_DIRECTION_ACCEPTED / HERO_ASSET_REJECTED_FOR_COVER_ROLE`

## Experiment C — `594:264`

Frame:
- `594:264 / V5_INSIDE_RURUBU_CLEANROOM_C_MAGAZINE_2026_08_10`

Tested principle:
- increase travel-magazine density and photo-led hierarchy inside while reducing UI-card geometry

Changes in the duplicate only:
- removed several pastel card fills while preserving nodes
- enlarged the profile-A image and the profile-B circular image
- made profile typography more asymmetric and photo-led
- added a strong pink Q&A rule instead of adding more containers
- added compact colored shared-interest labels
- changed right-page heading to `ふたりの旅年表 / OUR HISTORY`
- changed memory heading to `思い出スポット / MEMORY SPOTS`
- added yellow/pink/blue navigation rules

Failure found by screenshot QA:
- the first successful build still had a visible bride-profile text collision.

Correction:
- moved and resized `SHI-CHAN`, metadata, and detail copy in the isolated candidate.

Result after correction:
- the spread has more magazine energy and less card-box dependence
- profile/photo hierarchy is stronger than the original clean-room spread
- however the overall inside spread is still not sufficiently close to the desired highly edited, visually dense Rurubu standard to displace Current

Decision: `PROTOTYPED / PARTIAL_GAIN / NOT_CURRENT`

## Q60 binary-transport progress

The prepared cover derivative was re-read from Google Drive as an actual binary file rather than model-visible base64:

- filename `RURUBU_V5_01_COVER_HERO__FIGMA_1330x1220_Q60.jpg`
- Drive ID `1YL0WAOzYU3O1FGa23ieRuw_Btu4jbmzr`
- MIME `image/jpeg`
- bytes `155,439`
- mounted runtime file successfully materialized from Drive

A new single-use Figma `upload_assets` endpoint was requested for comparison target `593:278`, but the runtime network still failed DNS resolution for `mcp.figma.com` before any bytes reached Figma.

This is not retried again under the same network capability. The failure is transport-only; Current was not mutated and the Q60 Drive source remains healthy.

## Learning state

### Verified for this item

- another round of micro-polish on legacy Current is no longer the highest-value path
- a brighter, denser, photo-overlap cover with short sell-lines and mixed-scale navigation is visibly closer to the requested travel-guide magazine character
- adding collage photos can improve the magazine silhouette only when those images have a real editorial role; the three mini-gallery photos passed that test in the comparison
- a high-quality source from another role does not automatically make a good cover hero; aspect-ratio and composition must match the role

### Rejected

- adopting `591:2` while it still contains the low-quality cover hero
- using the history-lead image as the final cover hero merely because its provenance/quality is better
- treating the inside `594:264` partial gain as Current-quality completion
- retrying the same external DNS upload path again

## Next application

1. Keep `591:2`, `593:2`, and `594:264` as rollback-safe comparison evidence.
2. Preserve Current `77:18` and `77:290` unchanged until a candidate genuinely wins all three scales.
3. Prioritize a role-correct cover hero with the exact cover ratio/text-safe composition. The existing Q60 source remains the immediate transport target if a genuinely different binary-safe bridge becomes available.
4. Continue cover clean-room work from the stronger magazine grammar proven in `591:2`, not from another incremental Current micro-adjustment.
5. For the inside spread, push the next clean-room concept further toward photo-led destination modules and deliberate collage; do not add more equal cards.
6. V5 is not complete and V6 production remains closed.
