# V5 front-cover star-stamp subtraction experiment

Date: 2026-08-03
Item/version: Rurubu WEDDING V5
Live Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Current outer frame: `77:18`
Target node: `77:167 / DECOR_FEATURE_STAMP_STAR`

## Authorities and live evidence

Before the write, the project-wide Figma, asset-generation, continuous-learning, project-memory, quality-over-legacy, Rurubu Current status, asset ledger, editorial knowledge, lessons, operating-system, postmortem, and V6 research/asset authorities were reviewed against the latest GitHub main, live Figma screenshot, and Drive state.

The dominant-photo gate remains blocked: the cover hero is still visibly low quality and no photo-role pass is claimed. This bounded subtraction was performed only as safe non-blocked editorial work after the binary-transfer path had already failed repeatedly and switched methods.

## Visible problem

The upper-right cover area contained a pink star stamp in addition to the date badge, issue/location strip, masthead flourishes, airplane icon, circular travel snap, camera icon, three colored cover lines, and hero-caption strip.

At whole-cover scale, the star supplied no category, navigation, date, page reference, ranking, or factual meaning. It competed with the date badge and increased the cumulative sticker/template feel around the cover perimeter.

## Principle tested

Attempt subtraction before adding decoration, and evaluate small decorative objects cumulatively rather than in isolation.

Anti-anchoring question:

> Would this star stamp be selected today if it were not already present?

Answer before the experiment: no clear editorial reason supported retaining it.

## Hypothesis

Hiding the star stamp should:

- clarify the date badge as the sole upper-right issue marker;
- reduce decorative competition around the masthead and circular snap;
- preserve the lively Rurubu-like identity through photography, masthead, cover lines, date badge, snap, colored bars, and micro-navigation;
- avoid changing semantic content, native text, image crops, frame hierarchy, or rollback state.

## Possible regression

The cover could become too quiet or lose some playful travel-guide energy, especially before the dominant hero photograph is repaired.

## Safe change

- node `77:167 / DECOR_FEATURE_STAMP_STAR`
- `visible: true → false`
- node was not deleted
- rollback remains immediate
- no semantic photo node, native text, image fill, crop, frame geometry, or other decoration was changed

## Three-scale evidence

### Whole-item / thumbnail scale

The post-change outer-spread screenshot retains immediate magazine identity. The masthead, date badge, location strip, three main cover lines, circular snap, hero-caption strip, feature index, folio, and back-cover hierarchy remain visible.

The upper-right perimeter is calmer and the date badge reads more clearly as the intended issue marker.

### Reading / page scale

No reading-order gap was introduced. The eye still travels from masthead and date to the yellow issue promise, hero image, colored cover lines, circular snap, caption strip, and lower feature index.

The removed star did not carry information needed for comprehension.

### Detail / actual-size risk review

No text, stroke, crop, contrast dependency, or fold/trim relationship depended on the star. Its removal creates no new print-risk condition.

## Structure QA

- mutated node ID returned: `77:167`
- semantic node name preserved
- node remains available but hidden
- native text unaffected
- photo nodes unaffected
- V4 rollback frames unaffected
- outer current frame ID remains `77:18`

## Decision

`DISCOVERED → PROTOTYPED → VERIFIED / ADOPTED_FOR_V5_CURRENT / PROJECT_RULE_NOT_PROMOTED`

This is evidence for cumulative-decoration review, not proof that all playful stamps should be removed. A badge or stamp with a clear editorial function may remain.

## Failure and limits

- This does not advance the V5 photo-role count.
- It does not resolve the cover-hero image-transfer blocker.
- It does not make V5 dummy-design QA complete.
- It does not authorize V6 production.

## Next application

1. Continue the alternate, network-independent binary-transfer method for the high-quality cover derivative.
2. Keep dominant-photo correction above further decorative polishing.
3. When reviewing remaining cover icons, retain only those with a distinct editorial or navigation role.
4. Reassess the cover again after the hero photograph is replaced because stronger photography may change the appropriate decoration balance.
