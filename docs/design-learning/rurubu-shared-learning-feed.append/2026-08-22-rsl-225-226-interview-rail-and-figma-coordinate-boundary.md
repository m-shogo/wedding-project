# RSL-225 / RSL-226 — Interview rail discipline + Figma coordinate authority

Date: 2026-08-22
Scope: Rurubu WEDDING only

## RSL-225 — interview personality should come from voice, not arbitrary horizontal drift

State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

### Visible problem

V8 Profile/Q&A AK `2238:2` had already removed cards and promoted the actual answers over the prompts. However Q2 alone was shifted substantially to the right while Q1/Q3 shared another rail. The shift had no content reason: the second answer was shorter, but no semantic role justified changing the reader's question origin.

At thumbnail scale this reads as familiar AI/editorial mimicry: `make one block offset so the page feels designed`.

### New professional research

Eye Magazine's analysis of Interview art direction describes interviewee personality being expressed through the construction of language/pull quotes/opening spreads while visual unity can be achieved with restrained typographic variation. The useful principle here is not to copy Interview's look, but to let **the voice carry difference while navigation remains deliberate**.

### Bounded test

Rollback-safe study AW `2278:2` cloned AK and changed only Q2's horizontal rail:

- Q2 label: aligned to Q1/Q3 question-label rail;
- Q2 prompt: aligned to Q1/Q3 prompt rail;
- Q2 answer: aligned to the answer rail;
- Q2 answer size and all vertical rhythm retained;
- all personality copy, answer hierarchy, page title, left profile page, color, folio and typefaces retained.

This deliberately avoids solving uniformity by adding cards, decoration, random color or diagonal choreography.

### Result

AW won the comparison because the right page reads as one interview system while the actual answers still carry hierarchy through wording, size and vertical pacing.

Three-scale / structure result after promotion:
- 500px whole spread: PASS
- 1400px reading scale: PASS
- 1587×1123 actual size: PASS
- native text: `23`
- IMAGE: `0`
- text intersections: `0`
- 18px safe risk: `0`
- parent page: `2052:2`

Promoted:
- current: AW `2278:2`
- rollback: AK `2238:2` hidden

Failure fingerprint:
`F-RSL-225-ARBITRARY-HORIZONTAL-QUESTION-DRIFT-SIMULATES-EDITORIAL-VARIATION-WITHOUT-CONTENT-BASIS`

Corrected method:
- keep recurring navigation furniture on a deliberate rail unless content changes its job;
- put personality into the actual voice, answer hierarchy, pacing or a semantically justified image/caption relationship;
- do not make a block wander merely to prevent the page looking uniform.

Promotion boundary:
This does not mean every interview must use one rigid rail. A broken rail is valid when the content or reading order genuinely owns that break.

---

## RSL-226 — do not assume metadata canvas coordinates equal Plugin API local coordinates

State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

### Figma failure

The first AW promotion attempt used a safety guard based on coordinates previously seen in Figma metadata (`x≈90000 / y≈3300`). The Plugin API reported the actual current AK frame as `x=1800 / y=8500`, so the guard aborted the write before any current/rollback state changed.

No unsafe retry was performed.

### Root cause

Coordinates from different Figma read surfaces were treated as interchangeable. The metadata representation and Plugin API `node.x/node.y` were not in the same coordinate context for this page.

### Corrected method

1. before a coordinate-sensitive write, read the target through the same Plugin API surface that will perform the write;
2. guard against those live Plugin API local coordinates / parent IDs;
3. only then move/hide/promote;
4. read back current and rollback node IDs, visibility, parent and coordinates after mutation.

The second attempt used Plugin API-local authority and promoted AW successfully while AK became hidden rollback.

Failure fingerprint:
`F-RSL-226-METADATA-CANVAS-COORDINATES-ASSUMED-EQUAL-TO-PLUGIN-LOCAL-COORDINATES`

Verified prevention:
The initial guard failed closed, live Plugin coordinates were read explicitly, and the next promotion succeeded without touching another current root.

This is a method/capability lesson only; no visual layout rule should be inferred from it.