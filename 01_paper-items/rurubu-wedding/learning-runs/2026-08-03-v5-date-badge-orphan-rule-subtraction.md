# V5 date-badge orphan-rule subtraction

Date: 2026-08-03
Item/version: Rurubu WEDDING V5
Live Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Current outer frame: `77:18`
Target node: `77:285 / AUTH_MICRO_RULE`

## Authorities and evidence reviewed

Before the live change, the current project-wide Figma production authority, generated-asset memory, continuous-learning system, quality-over-legacy decision, current V5 status and ledger, Rurubu editorial knowledge, operating system, postmortem, and V6 clean-room boundaries were reviewed. The live outer-spread screenshot was treated as the visual authority.

## Visible problem

The small blue horizontal rule under the front-cover date badge had become visually orphaned after the adjacent decorative plane icon was removed in the previous verified subtraction pass. It no longer connected two elements, identified a category, or guided reading. At whole-cover scale it read as a leftover fragment beneath an otherwise self-contained date/issue badge.

## Principle or capability tested

Attempt subtraction before adding or restyling decoration. When one member of a decorative cluster is removed, re-evaluate the remaining marks as a group; a formerly supporting line can become meaningless residue.

## Hypothesis

Hiding the orphaned rule should make the date badge read as one coherent issue-information unit, reduce accidental visual noise at the masthead edge, and preserve the travel-magazine energy carried by the masthead, date badge, dominant photograph, cover lines, and circular snap.

## Expected improvement

- cleaner masthead/date-badge relationship
- no detached blue mark competing with the date badge
- stronger intentional quiet space in the upper-right cover area
- less template residue without reducing information

## Possible regression

The upper-right corner could become too empty or the date badge could lose a subtle visual anchor.

## Change

- node `77:285 / AUTH_MICRO_RULE`
- type: `LINE`
- geometry before: `x=665`, `y=159`, `width=55`, `height=0`
- `visible: true → false`
- no deletion; rollback remains immediate through visibility restoration and existing version history
- no native text, semantic photo node, image fill/hash, crop, frame hierarchy, or print guide changed

The first write attempt included `figma.commitUndo()`, which the current `use_figma` runtime does not support. The failed script was atomic and made no change. The corrected bounded call removed the unsupported operation and completed successfully.

## Verification

Post-change outer-spread screenshot review at three scales:

### Thumbnail / whole item

- the date badge remains clearly visible and balanced against the masthead
- the upper-right region is calmer
- the cover retains sufficient visual energy and destination-magazine character
- no new imbalance appeared across the outer spread

### Reading / page scale

- reading order remains masthead → date/issue → main promise → hero and supporting cover lines
- the removed line carried no information or navigation role
- the date badge now reads more cleanly as a single unit

### Detail / actual-size risk review

- no text, thin informative rule, crop, or contrast relationship was damaged
- the hidden node remains structurally present and reversible
- no fold, trim, or safe-area consequence was introduced

## Result

`PROTOTYPED → VERIFIED / ADOPTED_FOR_V5_CURRENT / PROJECT_RULE_NOT_PROMOTED`

The change is adopted for the current V5 cover because the line became orphaned in this specific cluster. This does not establish a blanket rule against micro-rules; informative rules that align, separate, or guide reading remain valid.

## Failure and learning

- Failure: `figma.commitUndo()` is unsupported in the current connector runtime.
- Recovery: the atomic failure was inspected, the unsupported call was removed, and the bounded visibility change was executed once.
- Learning: after subtracting a decorative icon, inspect nearby connector lines and accents for newly orphaned meaning rather than judging each historic element independently.

## Next application

Dominant-photo repair remains the highest-priority V5 task. Further decoration work should occur only when a specific visible defect is identified and must not displace the cover hero, back main, and history image-quality gate.
