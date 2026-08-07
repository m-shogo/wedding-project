# V5-09 memory 04 resort — Q30 binary-safe promotion

Date: 2026-08-08
Scope: Rurubu WEDDING V5 only
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Current inside: `77:290`
Current semantic node: `77:454 / IA_MEMORY_4_PHOTO`
Comparison: `429:2 / V5_09_RESORT_DERIVATIVE_TEST_2026_08_08`
Comparison node: `429:172`

## Authorities re-read before action
The project-wide production system, asset memory, Figma/AI learning system, feedback log, project memory, quality-over-legacy decision, Current Rurubu status, V5 ledger, editorial knowledge base, lessons log, V5 operating system, postmortem, and V6 research/asset authorities were re-read before this change.

## Visible problem
`V5-09 / IA_MEMORY_4_PHOTO` remained on an older generic placeholder even though its intended Drive master was already verified. The semantic role is a tiny `88 × 92` supporting memory thumbnail; regeneration was not justified because the master itself visually fits the resort/sunset concept and has sufficient crop room.

## Source and role brief
Master:
- `09_MEMORY_SPOT_04_RESORT_DUMMY.png`
- Drive ID `1wGhESjFYaX84Vwk7YEw86VZzg6i5Je6z`
- `2,396,242 bytes`
- source dimensions `1122 × 1402`

Role:
- small supporting memory 04
- target `88 × 92`
- desired visual: quiet resort/sunset close distinct from old-town/night-view memories
- no recognizable person / identity risk

## Derivative
The master was inspected before derivation. A crop was selected to retain the sunset, ocean horizon, resort pavilion and lounge chairs while removing excess upper sky. No new generation was performed.

Accepted derivative:
- `RURUBU_V5_09_MEMORY_RESORT__FIGMA_352x368_Q30_SINGLECALL.jpg`
- Drive ID `1QHWfftLU6m6FZYNJy8IxbOAgp1knzzoP`
- dimensions `352 × 368`
- `9,950 bytes`
- SHA-256 `dbd5d0d15506bee04446ed02c62ad23df043c05b96ce43495d722c5d88ef5970`
- exactly `4×` the semantic target dimensions

Drive save and raw readback were completed before Figma placement.

## Hypothesis
A 4× role derivative from the existing accepted master should resolve the duplicated-placeholder problem while keeping the memory-spots hierarchy subordinate to the lead image and history hero.

Expected improvement:
- distinct resort/sunset visual for memory 04
- better semantic truth in Current
- no unnecessary regeneration

Possible regression:
- sunset may collapse into a generic bright patch at thumbnail size
- Q30 compression may muddy pavilion/chair details
- excessive crop could lose the resort cue

Adoption evidence required:
- Drive ID/readback
- encoded/decoded/JPEG guard
- duplicate-first placement
- before/after Figma hash mapping
- whole-spread/read-scale review
- natural-role plausibility at `88 × 92`
- structure/rollback verification

## Safe prototype
Created duplicate:
- `429:2 / V5_09_RESORT_DERIVATIVE_TEST_2026_08_08`
- duplicate target `429:172 / IA_MEMORY_4_PHOTO`

Guarded transfer:
- base64 encoded length `13,268`
- decoded byte length `9,950`
- JPEG SOI/EOI markers verified

Comparison hash:
- inherited old hash `f8357056c1f50bc928066273ce9391f5feba02d2`
- candidate hash `c09aa82e7b2ac75708707345c6f845452bf67663`

Current remained untouched until duplicate QA.

## Three-scale QA
### Whole-item / spread
PASS for V5 dummy-design QA. The resort thumbnail reads as a warm closing destination and remains visually subordinate to the dominant history image and lead memory photograph.

### Reading/page
PASS. The memory-spots supporting sequence gains useful variation: old-town → night-view → resort/sunset. No new card or decorative module was needed.

### Actual-size/detail
PASS for this small role's dummy-design bar. At the natural `88 × 92` role scale, horizon, sun, pavilion and lounge-chair geometry remain distinguishable enough to communicate the resort/sunset role. Q30 is not generalized to larger roles or final print.

## Promotion
Current `77:454` was promoted after comparison QA:
- previous hash `f8357056c1f50bc928066273ce9391f5feba02d2`
- current hash `c09aa82e7b2ac75708707345c6f845452bf67663`
- semantic name and `88 × 92` geometry preserved

## Post-promotion structure QA
Current inside retained:
- native text nodes `92`
- visible native text nodes `57`
- IMAGE-fill nodes `9`
- fold guide `77:288` visible
- rollback outer `59:2` preserved
- rollback inside `59:178` preserved
- comparison `429:2` preserved

## Result
`DISCOVERED → PROTOTYPED → VERIFIED / V5_CURRENT_ADOPTED / ROLE_COMPLETE`

## Failure / lesson
No regeneration was needed: the defect was source application/crop, not master concept quality. The useful process lesson is to inspect a verified master and derive a role-specific crop before generating a replacement. Q30/one-call binary transport remains a bounded small-role technique, not a project-wide rule.

## Next application
With V5-07, V5-08 and V5-09 small-memory roles closed, return priority to the open dominant cover hero and the remaining identity/lead/Friends roles. V6 production remains gated until all active V5 roles and full dummy-design QA are verified.
