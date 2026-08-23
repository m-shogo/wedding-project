# Rurubu V7/V8 Memory — grounded route/content ownership QA

Date: 2026-08-24
Scope: Rurubu WEDDING only
Figma: `bfM0d4c9dCeBv5pCkJ3TNM`, page `2052:2`

## Authority / research input

- `CONTENT-PREFILL-20260731.md` already contains grounded Memory Spot candidates: Okinawa, Korea, Hawaii, Yokohama; Hawaii proposal detail includes rain at Tantalus and beach, then proposal at Wolfgang; wedding date `2026.10.24` is fixed.
- Project-wide Japanese semantic line-break QA is `PROMOTED_PROJECT_RULE`.
- New professional reference direction for this run: current travel-guide editorial practice values knowledgeable local/specific reporting over generic place aesthetics; photobook/editorial practice treats text/captions and sequencing as part of the meaning of the image set, not as decoration added after layout.

## Before

### V7 G2 `2299:2`

Generic semantic system:
- `朝 / 海辺を歩く`
- `昼 / 小さな店に入る`
- `夕 / 街の光を見る`
- `夜 / 食卓で終える`

The scan rhythm worked, but these invented/generic beats displaced available grounded couple-specific material.

### V8 AQ3 `2337:2`

Used the same generic daypart grammar in a restrained book system. The composition had pacing, but the actual couple-specific route/proposal story was not doing the editorial work it could already support.

## Hypothesis

When grounded specific content exists, a mature layout should not retain generic thematic placeholder copy merely because that copy fits the established modules. Re-author the semantic roles around grounded content while preserving the visual philosophy of each system and preserving unknown facts as unknown.

## V7 test — G4 `2395:2`

Current role set:
- memory lead uses grounded route `沖縄、韓国、ハワイ → 今日の横浜`
- guide sequence uses `01 沖縄 / 02 韓国 / 03 ハワイ / 04 横浜`
- Hawaii role uses proposal/rain evidence
- Yokohama uses fixed wedding date `2026.10.24`
- numbered high-energy browse anchors remain because prior G3 testing showed they perform a real scan-rhythm job
- all copy remains native text
- photographs remain structural dummies and are not called verified place photography

### V7 failure/correction during test

First 1400 px reading screenshot exposed Korea copy crossing the Guide-01 photo. Structure repair:
- `2395:22`: changed only wrapping/measure to `よく食べて、 / よく歩いて、 / たくさん笑った。`, `190×82`
- `2395:29`: narrowed Yokohama body to `190×58`
- type size and photography unchanged

This is a successful receiving-item use of the project-wide Japanese semantic-wrap rule: semantic line breaks solved the defect instead of shrinking the type.

### V7 QA

- 500 px whole-item: PASS
- 1400 px reading: PASS after repair
- 1587×1123 actual-size: PASS for DESIGN QA
- visible native text: 20
- visible IMAGE fills: 6
- text-text intersections: 0
- text-image intersections: 0
- bounded 18 px edge risks: 0
- Japanese font mismatch: 0

Previous G2 `2299:2`: hidden rollback at x=`300000`.

## V8 test — AQ4 `2396:2`

Same grounded source material, independently designed:
- Hawaii proposal becomes the primary left-page memory essay
- right page sequences four places as `沖縄 / 韓国 / ハワイ / 横浜`
- no V7 numbering system is copied
- whitespace/grid hierarchy remains V8-specific
- visible photos remain structural dummies; their layer names explicitly state `NOT VERIFIED PLACE IMAGE / NOT FINAL`

### V8 failure/correction during test

Structure QA caught `GB3 / 2396:27` overlapping dining dummy `2396:36` despite acceptable first-glance composition.

Readback:
- GB3 before repair: x=`930`, width=`300`
- photo: x=`1160`, width=`305`

Correction:
- GB3 width reduced to `210`; wording, type size and photo placement unchanged
- final text-image intersections: 0

### V8 QA

- 500 px whole-item: PASS
- 1400 px reading: PASS
- 1587×1123 actual-size: PASS for DESIGN QA
- visible native text: 15
- visible IMAGE fills: 2
- text-text intersections: 0
- text-image intersections: 0
- bounded 18 px edge risks: 0
- Japanese font mismatch: 0

Previous AQ3 `2337:2`: hidden rollback at x=`300000`.

## Board / scope QA

Final current V7+V8 roots checked together:
- current roots: 12
- parent: `2052:2`
- pairwise current-root overlap: 0
- V6 control changed: NO
- non-Rurubu item changed: NO

## Asset truth

- image generation: 0
- Drive write: 0
- new Drive master: 0
- new image hash: 0
- final place-specific photography adopted: 0
- structural dummy photos: still present

Grounded location copy MUST NOT be used to imply that the dummy photos depict those locations. REAL CONTENT / PHOTO TRUTH remains blocked until legitimate role-specific photography is verified.

## Decision

G4 and AQ4 are promoted as the current Memory/Guide comparison candidates for V7 and V8 respectively.

State: `VERIFIED_LOCAL_GROUNDED_CONTENT / REAL-PHOTO-BLOCKED / NOT_PRINT_READY`.

Learning: RSL-255.
