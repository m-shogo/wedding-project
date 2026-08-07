# V5-08 memory 03 night-view — Q30 binary-safe promotion

Date: 2026-08-08
Scope: Rurubu WEDDING V5 only
Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Current inside: `77:290`
Current semantic node: `77:446 / IA_MEMORY_3_PHOTO`
Comparison: `427:2 / V5_08_NIGHT_VIEW_DERIVATIVE_TEST_2026_08_08`
Comparison node: `427:164`

## Authorities re-read before action

Re-read the project-wide Figma production system, asset-generation memory, Figma/AI continuous-learning system, design feedback log, project memory, quality-over-legacy decision, Current Rurubu status, V5 asset ledger, editorial knowledge base, lessons log, V5 operating system, postmortem, V6 current status, V6 reference analysis, V6 research matrix, and V6 asset queue.

## Visible problem

V5-08 remained an active registered role but Current `77:446` still used the same older placeholder hash as several earlier memory roles. The intended Drive master had already been verified, and a role-sized derivative had been saved to Drive, but a previous one-shot inline transfer attempt failed integrity validation before any canvas mutation.

## Source / derivative evidence

Master:
- role: `V5-08 / IA_MEMORY_3_PHOTO`
- file: `08_MEMORY_SPOT_03_NIGHT_VIEW_DUMMY.png`
- Drive ID: `1168rkBzpx84Wvr7IxPCW31WOr30kdqhb`
- master bytes from ledger: `2,160,660`

Accepted dummy-design derivative:
- file: `RURUBU_V5_08_MEMORY_NIGHT_VIEW__FIGMA_352x368_Q30_SINGLECALL.jpg`
- Drive ID: `1rJJDOX_lwkCbA_DiCDptZfAQrMieG5LL`
- dimensions: `352 × 368`
- bytes: `7,762`
- SHA-256: `a87c39773e7374356641266aa709c585c60ff3435169fbeaed33a83d8fc35aae`
- encoded base64 length used for guarded transfer: `10,352`
- target: `88 × 92`, so the derivative is exactly `4×` the semantic box dimensions

## Hypothesis

For this small supporting role, the 4× derivative should be sufficient for V5 dummy-design QA if the intended night-view source is visually distinct at whole-spread/reading scale, survives the natural 88×92 render, and preserves the semantic structure.

Expected improvement:
- remove another duplicated placeholder from the memory-spots sequence
- increase visual/narrative differentiation between old-town memory 02 and memory 03
- move the active role ledger toward source-truth rather than IMAGE-fill presence

Possible regression:
- heavy Q30 compression could make the tiny crop muddy
- night-view contrast could collapse at 88×92
- accidental mutation of Current before comparison would violate rollback safety

Evidence required:
- exact Drive derivative ID and bytes
- guarded byte reconstruction
- duplicate-first Figma placement
- before/after hash mapping
- whole-spread/read-scale screenshot QA
- natural-role plausibility at 88×92
- structure/rollback verification

## Safe prototype

Created duplicate:
- `427:2 / V5_08_NIGHT_VIEW_DERIVATIVE_TEST_2026_08_08`
- duplicate target `427:164 / IA_MEMORY_3_PHOTO`

The transfer was guarded before mutation:
- encoded length = `10,352`
- decoded length = `7,762`
- JPEG SOI/EOI markers verified

Comparison hash changed:
- old inherited hash: `27ad4cfab8fd579b8452540ce954f8b36edc77fb`
- candidate hash: `58d7d6f144a4aff9e3cc31caefad88089981ec6a`

Current remained untouched until the duplicate was reviewed.

## Three-scale QA

### Whole-item / spread

PASS for V5 dummy-design QA. The small memory 03 image reads as a distinct destination/detail without stealing weight from the 678×280 history lead or the 398×214 lead memory photograph.

### Reading/page

PASS. The memory-spots sequence retains a clear lead → small supporting memories rhythm. V5-08 no longer reads as the same placeholder as the adjacent role.

### Actual-size/detail

PASS for the role-specific dummy-design bar. At the natural `88 × 92` role size the image remains sufficiently differentiated for a supporting thumbnail. This does not establish Q30 as a general rule for larger images and is not final-print evidence.

## Promotion

After duplicate QA, Current `77:446` was promoted from:
- previous hash `27ad4cfab8fd579b8452540ce954f8b36edc77fb`

to:
- verified hash `58d7d6f144a4aff9e3cc31caefad88089981ec6a`

Geometry remained exactly `88 × 92` and the semantic node name remained `IA_MEMORY_3_PHOTO`.

## Post-promotion structure QA

Current inside retained:
- native text nodes: `92`
- visible native text nodes: `57`
- IMAGE-fill nodes: `9`
- fold guide `77:288`: preserved and visible
- rollback outer `59:2`: preserved
- rollback inside `59:178`: preserved
- comparison `427:2`: preserved

## Failure / process lesson

The previous long inline attempt failed an encoded-length guard and therefore made no canvas change. This run did not repeat that failed payload. It used the exact Drive-readback derivative bytes from the mounted connector file and verified encoded length, decoded byte count, and JPEG boundary markers before `createImage`.

Adopted lesson for this role:
- small derivatives can use a one-call guarded binary path when the exact bytes are available and the payload remains bounded
- a successful binary transfer is still not enough; role-specific screenshot and structure QA remain mandatory
- do not generalize Q30 or one-call base64 to dominant images

## Result

`DISCOVERED → PROTOTYPED → VERIFIED / V5_CURRENT_ADOPTED / ROLE_COMPLETE`

V6 remains gated. This is a V5 supporting-role gain only.

## Next application

Proceed to `V5-09 / 77:454` using the same role-specific evidence discipline. Do not assume its derivative should use the same compression settings; derive and judge it against its own source, crop and natural-size result. Continue cover-hero repair independently as the final dominant-photo blocker.
