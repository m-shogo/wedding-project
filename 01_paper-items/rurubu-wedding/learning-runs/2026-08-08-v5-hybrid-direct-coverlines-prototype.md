# V5 outer — Hybrid direct-coverline prototype

Date: 2026-08-08
Status: `PROTOTYPED / PRESERVED_FOR_POST_HERO_COMPARISON / CURRENT_UNCHANGED`
Scope: Rurubu WEDDING V5 only

## Authority refresh

Before the design experiment, the project-wide production system, asset-generation memory, continuous-learning process, project memory, quality-over-legacy decision, Current Status, Production Operating System V2, postmortem/V6 guardrails, and live Current/clean-room Figma evidence were reviewed. The experiment is comparison-only and does not bypass the open cover-hero dominant-photo gate.

## Visible problem

Fresh whole-item comparison showed a useful tension:

- Current `77:18` is cleaner, calmer, more readable, more wedding-specific, and avoids excessive commercial-magazine imitation, but the front cover reads comparatively sparse for a Japanese travel-magazine-inspired editorial object.
- dense clean-room `413:2` creates much stronger travel-magazine cover energy and issue/coverline rhythm, but the large magenta field, stacked kana device, issue circle, and vertical yellow badge are too loud to copy literally and risk trade-dress imitation.

The question tested was whether editorial density can increase without adding new cards, stickers, badges, shadows, or copied commercial silhouettes.

## Hypothesis

Direct native coverlines over the existing hero can provide a stronger Japanese travel-magazine reading rhythm while retaining Current's cleaner original identity.

Expected improvement:
- more obvious coverline hierarchy at thumbnail/whole-cover scale
- clearer bridge between colorful masthead and large hero
- more authentic editorial density without new containers

Possible regression:
- hero loses too much visual authority
- left side becomes text-heavy
- text contrast becomes dependent on the sunset crop
- change becomes micro-polish while the dominant image is still unresolved

Evidence needed:
- safe duplicate only
- front-cover screenshot
- whole-outer screenshot
- structure/native-text audit
- later re-check after the final hero derivative is actually promoted

## Prototype

Created rollback-safe comparison frame:
- `524:2 / V5_OUTER_HYBRID_DIRECT_COVERLINES_QA_2026_08_08`
- Current `77:18` remained untouched
- back cover remained unchanged

Only existing native semantic text was exposed/recolored; no new card/badge/sticker/gradient/asset was added:

- `524:160 / PHOTO_TOP_COPY` — `ふたりの旅をまるごと大特集！`
- `524:183 / SIDE_HEADLINE_2` — `出会いから今日まで / LOVE HISTORY`
- `524:185 / SIDE_HEADLINE_3` — `思い出スポット MAP`

The two secondary coverlines were converted to navy direct type rather than reactivating their old colored background fields. Existing headline 1, hero caption strip, feature modules, masthead/date badge, and semantic hero geometry were preserved for comparison.

## Three-scale result

### Whole item / thumbnail

`PROTOTYPE PASS`.

The front cover reads more immediately as an edited travel-special cover than Current, while remaining substantially calmer and more original than `413:2`. The additional hierarchy comes from native coverlines, not added containers.

### Reading / page

`PROTOTYPE PASS`.

Reading order remains clear:
1. masthead/date
2. short top coverline
3. dominant hero
4. primary pink-rule coverline
5. two secondary direct coverlines
6. hero caption
7. six feature teasers
8. issue strip

The added lines do not obscure the skyline landmark or the hero-caption area in the current crop.

### Detail / actual-size

`PROTOTYPE PASS WITH OPEN DEPENDENCY`.

Native Japanese/Latin text remains readable at the front-cover screenshot scale. However, contrast must be re-checked after the final hero image is promoted because a sharper/different crop could change local luminance behind the direct text.

## Structure check

- comparison frame: `524:2`
- front-cover node: `524:129`
- native text nodes in duplicate: `85`
- image-fill nodes in duplicate: `14`
- no flattening
- Current and rollback frames untouched

## Decision

`PROTOTYPED / KEEP FOR FINAL V5 COMPARISON / DO NOT PROMOTE YET`.

The hybrid is materially useful evidence that Rurubu-like density can be increased through editorial coverline hierarchy rather than a heavy field/sticker system. It is not Current because Operating System V2 still requires the last dominant image blocker to be closed first.

## Reusable lesson state

Candidate lesson only:

> When a clean cover is too sparse but a dense reference-derived concept is too loud, test direct native coverlines before adding commercial-looking fields, stickers, or badges.

Status: `PROTOTYPED`, not `PROJECT_RULE`.

## Next application

After a quality-preserving cover-hero derivative is genuinely placed and hash-verified, compare:
- Current outer `77:18`
- dense clean-room `413:2`
- hybrid direct-coverline `524:2`

at whole-item, front-cover reading, and actual-size detail scales. Promote only the best verified design after the hero-quality dependency is removed.
