# V5 Rurubu Dense Clean-room A — 2026-08-07

## Scope

Rurubu WEDDING V5 only. WEDDING PASSPORT, BOARDING PASS, 青春ふたりきっぷ, and ADD items were not modified.

## Authorities read before work

- `docs/wedding-figma-production-system.md`
- `docs/wedding-asset-generation-memory.md`
- `docs/wedding-figma-ai-continuous-learning-system.md`
- `docs/wedding-design-learning-feedback-log.md`
- `docs/project-memory.md`
- `docs/decisions/2026-08-02-quality-over-legacy-design.md`
- live Figma Current outer frame
- verified Drive V5/V6 folder state

## User feedback carried into the experiment

The visual target is not minimal travel editorial. It is closer to authentic Rurubu: dense, playful, information-rich, visually busy, but still controlled by one editorial system. Existing V5 composition must not anchor the redesign.

## Reference research

Primary current publishing reference: JTB Publishing Rurubu series, including current overseas/urban editions. Current official product descriptions still emphasize the large AB format (25.7 × 21 cm), refreshed covers, and information-dense guidebook structure. The reference was used only to analyze hierarchy, density, image/copy relationships, and recurring editorial devices; no published cover scan, proprietary logo, map, or illustration was copied into production art.

Extracted principles at DISCOVERED level:

- strong destination masthead before secondary details
- dominant hero photo plus multiple smaller photo teasers
- multiple headline scales instead of evenly weighted cards
- side copy and vertical callout to make the cover feel edited rather than UI-grid based
- circular/bright supplementary callouts used as navigation or bonus information
- a tight, controlled palette can support intentionally high information density
- published reference imagery is structure-learning evidence, never project-owned artwork

## Visible problem

The previous V5 Current front cover (`77:145` inside Current outer `77:18`) was clean and readable but too sparse and system-like. Six feature-number modules behaved like repeated UI rows. It did not yet achieve the requested Rurubu-style "edited clutter" or bookstore travel-guide energy.

The previously created single-cover research template (`377:40`) moved toward the reference structure but did not preserve the real V5 outer spread dimensions and therefore was not a strong direct comparison against Current.

## Hypothesis

A clean-room front cover rebuilt inside a duplicate of the real V5 outer spread — while preserving the back cover and fold geometry — can create materially stronger Rurubu authenticity without flattening text or sacrificing replaceability.

Expected improvement:

- stronger bookstore/travel-guide silhouette at thumbnail scale
- more authentic high/medium/micro hierarchy
- visible image teaser rhythm instead of repeated feature cards
- every headline and photo remains replaceable in native Figma

Possible regressions:

- too much information could hurt legibility
- white copy over a bright hero can lose contrast
- decorative tabs/circles can become superficial if not tied to content
- visual similarity to a commercial reference must remain structural, not a copied proprietary cover

Evidence required before adoption:

- whole-spread screenshot
- front-cover reading-scale screenshot
- actual-size text/contrast review
- native-text and image-slot structure audit
- print/fold plausibility
- comparison against Current
- no Current or rollback mutation

## Figma experiment

Current preserved:

- `77:18 / 01_RURUBU_AUTHENTIC_OUTER_V5_CURRENT_CANDIDATE`

New comparison candidate:

- `378:276 / V5_OUTER_RURUBU_DENSE_CLEANROOM_A_2026_08_07`
- front: `378:403`
- back: `378:277`
- fold guide: `378:548`

The duplicate preserves the live back cover and fold relationship. Only the duplicate front cover was rebuilt.

New editable editorial system includes:

- native top bonus strip
- native destination masthead and subtitle
- year badge
- three stacked color tabs
- dominant hero photo
- direct-on-page feature copy
- vertical yellow feature callout
- orange NEWS/TOPICS callout
- three independently replaceable mini-photo teaser slots
- three native mini teaser labels
- circular travel-map callout
- bottom micro-category line and issue label

Replaceable image slots:

- `378:406 / IMG_HERO`
- `378:570 / REPLACEABLE_MINI_PHOTO_1`
- `378:571 / REPLACEABLE_MINI_PHOTO_2`
- `378:572 / REPLACEABLE_MINI_PHOTO_3`

Existing verified/dummy images were reused only as layout placeholders in this V5 experiment. No new asset was generated merely to create activity.

## Failure and method switch

The first duplicate script failed atomically because `IMG_HERO` was incorrectly assumed to be a FRAME. Live structure inspection showed it is a RECTANGLE (`77:148`). No design change occurred in the failed call.

Method change:

- inspected Current child structure explicitly
- targeted actual node types and top-level child order
- reran on a fresh duplicate

This converted the failure into a reusable Figma execution lesson rather than repeating the same call.

## Screenshot QA

### Whole item / thumbnail

Result: **PROTOTYPED — materially stronger direction than Current for Rurubu authenticity.**

The front now immediately reads as a dense travel-guide cover instead of a clean wedding brochure/dashboard. The pink field, very large destination title, dominant hero, edge callouts, and three teaser photos create a stronger magazine silhouette.

The back cover was intentionally left unchanged in this experiment so the front-cover gain can be judged independently.

### Reading scale

Result: **PASS WITH REVISION NEEDED.**

Reading order is clear:

1. bonus strip
2. WEDDING SPECIAL / 横浜
3. subtitle and year
4. dominant hero
5. left feature copy / right vertical feature
6. three photo teasers
7. map bonus / micro information

The left hero feature list partially overlaps the bright sunset portion of the hero. It remains readable in the current screenshot but contrast is weaker than the other text zones. This must be revised or proven at print size before adoption.

### Detail / actual-size

Result: **PASS STRUCTURALLY / VISUAL REVISION NEEDED.**

Native text remains editable and the 4 photo roles remain independent. The current hero itself is still a dummy/quality-gated asset; this experiment does not upgrade its provenance or PHOTO_ROLE_PASS state.

## Structure QA

Candidate audit:

- native text nodes: `105`
- visible text nodes: `61`
- IMAGE-fill nodes: `17`
- replaceable front image slots: `4`
- fold guide preserved and visible: `378:548`
- old cloned front modules hidden, not deleted: `27`
- Current `77:18` remains present and visible
- rollback/history preserved

## Decision

Status: `DISCOVERED → PROTOTYPED`

The new candidate is **not promoted to Current yet**. It is visually more aligned with the latest user direction and beats Current on Rurubu-like density/authenticity, but it still needs a contrast refinement and full three-scale/print comparison before adoption.

No PHOTO_ROLE_PASS, V5 completion gate, or V6 start gate is advanced by this design experiment.

## Reusable lesson

"Subtraction first" remains a useful anti-UI check, but it is not the aesthetic target for Rurubu. For a deliberately dense editorial product, the correct question is whether each additional element creates navigation, hierarchy, anticipation, or useful micro-information. Controlled information density can be more authentic than minimalism when the destination title, hero, palette, and type hierarchy remain dominant.

This lesson remains PROTOTYPED, not PROJECT_RULE, until another page/spread confirms it.

## Next safe step

Refine the clean-room candidate rather than polishing Current:

1. solve left hero-copy contrast without turning it into a rounded UI card
2. create a materially different urban/Yokohama editorial alternative for comparison
3. compare Current vs Clean-room A vs urban alternative at all three scales
4. only adopt the winning front-cover language after print/fold and structure QA
5. continue dominant-photo provenance closure in parallel; do not start V6 until V5 dummy-design QA is genuinely verified
