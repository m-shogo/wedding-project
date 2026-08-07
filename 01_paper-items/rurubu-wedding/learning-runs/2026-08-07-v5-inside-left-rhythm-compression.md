# V5 inside-left rhythm compression — 2026-08-07

## Scope

Rurubu WEDDING V5 only. No Passport, Boarding Pass, 青春ふたりきっぷ, ADD item, asset role, crop, or image source was modified.

## Authority read before the change

Reviewed the project-wide production system, asset-generation memory, Figma/AI continuous-learning system, project-wide feedback log, project memory, quality-over-legacy decision, V5 Current Status, V5 asset evidence ledger, production OS V2, postmortem/V6 guardrails, and Rurubu lessons.

## Visible problem

After earlier profile-card/ribbon subtraction, the inside-left page retained a large vertical dead zone between the profile block and `3 QUESTIONS`. At page scale the content was correct, but the long pause made the page feel under-edited and disconnected rather than intentionally quiet. The lower half also finished relatively close to the bottom despite that unused space above.

## Hypothesis

Compressing the lower editorial sequence upward as one bounded rhythm unit should improve continuity without adding cards, badges, shadows, or decoration. The expected gain was a clearer reading path from profiles → questions → common points → travel note, while preserving native text and giving the bottom of the page more breathing room.

Possible regression: the Q&A block could feel crowded against the profiles, or the lower modules could collide/reflow.

Evidence required: preserve a comparison frame, compare current vs experiment at whole-page and spread scales, then verify actual node positions, native text count, image fills/hashes, fold guide, rollback frames, and no clipping/reflow.

## Safe prototype

Created comparison frame:

- `334:2 / V5_INSIDE_LEFT_RHYTHM_TEST_2026_08_07`

Current remained untouched during the prototype.

Moved the bounded lower-half families upward by `52 px` in the duplicate:

- `IA_QA_*`
- `AUTH_QA_*`
- `V5_QA_*`
- `AUTH_COMMON_*`
- `IA_TRAVEL_NOTE*`

41 nodes moved. No text, image, crop, size, fill, semantic name, or visibility state changed.

## Comparison result

The duplicate improved the page-level rhythm: the profile-to-Q&A gap became deliberate rather than excessive, the Q&A/common/travel-note sequence read as one editorial progression, and the page gained calmer bottom breathing room. It did not become denser in a UI/card sense because no container was added.

The materially different comparison frame remains on canvas as rollback/comparison evidence.

## Adopted Current change

Applied the same `-52 px` Y shift to the same bounded lower-half node families in current inside-left `77:291`.

Representative post-change coordinates:

- `77:307 / IA_QA_PANEL`: y `390`
- `77:308 / IA_QA_HEADING`: y `418`
- `77:353 / AUTH_COMMON_TAPE`: y `838`
- `77:330 / IA_TRAVEL_NOTE_BG`: y `924`
- `77:331 / IA_TRAVEL_NOTE_LABEL`: y `943`
- `77:332 / IA_TRAVEL_NOTE`: y `938`

## Three-scale QA

### Whole item / spread

Inside spread `77:290` remains balanced across the fold. The left page now connects its top profile block and lower editorial modules more convincingly; the right-page history/memory composition is unchanged.

### Reading / page

Reading order remains:

`OUR PROFILE / ABOUT US → SHOGO / SHI-CHAN → 3 QUESTIONS → ふたりの共通点 → TRAVEL NOTE`

No content was removed or rewritten. The Q&A starts sooner after the profile content and the bottom note remains clearly subordinate.

### Detail / structure

Post-change audit:

- inside native text nodes: `92`
- visible text nodes: `57`
- inside semantic image roles with IMAGE fill: `7 / 7`
- history image `77:422` hash unchanged: `1bfd7f1fa601206bfed1594a140b40554e85d77a`
- groom image `77:296` hash unchanged: `bef2164a2fc70e882f31f735bf66773299b1a62e`
- bride image `77:302` hash unchanged: `1c6a3d54817e2ca8e25a3d9b700e7ab9cb4ff4fd`
- fold guide `77:540` preserved and visible
- rollback frames `59:2` and `59:178` preserved
- comparison frame `334:2` preserved
- no clipping, text reflow, image loss, crop change, or semantic-node deletion observed

## Decision

`PROTOTYPED → VERIFIED / ADOPTED FOR CURRENT V5`

This is a V5-specific verified gain, not a PROJECT_RULE. It supports the narrower principle that subtraction can create excessive dead zones, and that later passes should re-balance spacing rather than treating all newly created white space as automatically good.

## Remaining blocker

Dominant-photo provenance/quality remains the higher-priority unresolved gate. Live hero `77:148`, back-main `77:24`, and history `77:422` still require exact Drive-source → derivative → Figma hash → screenshot/structure evidence before `PHOTO_ROLE_PASS`. No photo-role or V5 completion count was advanced by this typography/rhythm change.
