# るるぶWEDDING — Wireframe Stress Test Protocol

Status: READY_TO_RUN_AFTER_FIGMA_WRITE_RECOVERS
Current authority: GitHub `main`
Depends on: `FOUNDATION.md`, `WIREFRAME.md`, `FIGMA-WIREFRAME-BUILD.md`

## Purpose
Select the wireframe winner using repeatable failure-oriented tests, not decoration preference. A/B/C must receive identical payloads and geometry constraints.

## Test matrix

### S1 — Long Japanese feature copy
Replace each of the six front feature lines with 1.8× copy length.
PASS when:
- no text clips or overlaps another module;
- body text stays >= 12px;
- title/date hierarchy remains visually dominant;
- no feature needs manual one-off nudging to survive.

### S2 — Hero photo ratios
Test the hero placeholder at 4:3 portrait crop, 3:2 landscape crop, and 1:1 crop.
PASS when:
- face-safe center zone remains usable;
- PICK UP placeholder never crosses fold;
- feature stack/rail does not move outside FRONT_COVER;
- no variant depends on a single lucky photo ratio.

### S3 — Dense back-cover content
Increase MEMORY SPOTS, FRIENDS, and HISTORY copy to 1.6× and add one extra route anchor.
PASS when:
- all modules remain readable;
- history route remains distinct from prose modules;
- fold guide has no text collision;
- no body text drops below 12px.

### S4 — Missing-photo resilience
Remove one back-cover photo placeholder and remove the hero image content while retaining its frame.
PASS when:
- composition still has an obvious reading order;
- empty state does not look like a broken layout;
- text does not rely on photo edges for alignment.

### S5 — Fold-risk audit
Treat a 24px zone on each side of the provisional fold line as a comparison-only risk band. This is NOT a production fold-safe specification.
PASS when:
- no essential text enters the risk band;
- no face/hero focal point enters the risk band;
- decorative route lines may cross only if meaning is not lost.

### S6 — Grayscale hierarchy
View each variant at 25%, 50%, and 100% zoom in grayscale.
PASS when:
- at 25%: masthead, hero, and primary feature area are distinguishable;
- at 50%: feature grouping and back modules are distinguishable;
- at 100%: copy is comfortably readable without decorative cues.

## Failure severity
- P0: fold collision, clipped essential text, unreadable hierarchy, content outside spread.
- P1: requires font <12px, depends on one photo ratio, ambiguous reading order.
- P2: awkward whitespace, weak alignment, minor density imbalance.

Any P0 eliminates a variant. Two or more P1 failures eliminate a variant unless every variant fails the same test, in which case revise the shared foundation before scoring.

## Scoring after gates
Only variants with zero P0 and fewer than two P1 proceed to the weighted rubric in `WIREFRAME.md`.

Record per variant:
- S1 PASS/FAIL + severity
- S2 PASS/FAIL + severity
- S3 PASS/FAIL + severity
- S4 PASS/FAIL + severity
- S5 PASS/FAIL + severity
- S6 PASS/FAIL + severity
- screenshot node IDs / URLs
- rubric score
- promotion decision

## Promotion rule
Promote exactly one winner to `02_Cover_Back_Visual`. Do not insert frozen decorative SVGs before this decision. If tied, prefer the variant with fewer P1/P2 failures; if still tied, prefer the simpler structure with fewer bespoke exceptions.

## Visual Design entry gate
Before Visual Design starts, the winner must have:
- zero P0 failures;
- fewer than two P1 failures;
- identical content quantity verified against the other variants;
- screenshot evidence at normal and stress payloads;
- winner and rejection reasons recorded in Git `main`.
