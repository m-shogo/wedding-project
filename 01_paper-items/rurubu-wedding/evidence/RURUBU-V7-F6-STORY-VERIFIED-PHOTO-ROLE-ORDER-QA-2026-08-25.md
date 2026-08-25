# Rurubu V7 F6 — Story verified-photo role order QA

Date: 2026-08-25
Scope: Rurubu WEDDING only
Figma: `bfM0d4c9dCeBv5pCkJ3TNM`
Authority page: `2052:2`

## Why this test followed F5

F5 fixed the more important source-truth defect first: verified couple imagery was kept on the general Story side and the unverified chronology image was withheld so it could not masquerade as dated-event evidence.

However, same-scale visual comparison showed F5 still assigned the two verified photographs to roles poorly:

- `004` in the 465×520 dominant slot cropped the couple too tightly and exposed the low-resolution derivative more aggressively;
- `036` in the 308×260 secondary slot was compositionally comfortable but under-used its stronger portrait/couple read.

New/deeper picture-edit research reinforced that a photo set must be edited as a sequence and that role assignment is part of the story—not merely a source-validity checkbox.

## Bounded F6 test

F6 `2570:2` cloned F5 with no copy, chronology, palette, title, typography, fixed graphic, page dimensions or source set change.

Only the two verified Story photo roles were exchanged:

- dominant `2570:3` → verified real-couple Hawaii `036.jpg` screen derivative; hash `c80602f1881db70f3a005651f982a0f38b294a9d`; 465×520;
- secondary `2570:9` → verified real-couple Hawaii `004.jpg` screen derivative; hash `b77012f2eb0a832acfe6fecd883775832ba029c6`; 308×260;
- chronology dummy `2570:22` remains hidden / `NO EVENT AUTHORITY`.

Both photos remain explicitly non-event-specific and not final print assets.

## Comparative result

### F5

- truth structure: improved over F4;
- dominant `004` crop: awkward at 500/1400 and visually over-tight;
- secondary `036`: pleasant but the stronger human read was too small.

### F6

- 500px whole-item: PASS and stronger than F5;
- 1400px reading: PASS; `036` gives an immediate couple-first opening while `004` works naturally as the environmental secondary beat;
- native 1587×1123: DESIGN COMPOSITION PASS; current screen derivatives remain visibly soft, so HIRES PHOTO QA is BLOCKED.

Structure QA:

- visible native text `22`;
- text intersections `0`;
- 18px edge risks `0`;
- Japanese→Inter mismatch `0`;
- authority parent `2052:2`;
- current V7/V8 root pairwise overlap `0` after promotion.

## Promotion / rollback

- F6 `2570:2` → current V7 Story at `x=5300 / y=13000`;
- F5 `2568:2` → hidden rollback at `x=302000`;
- F4 `2427:2` remains earlier hidden rollback at `x=300000`.

## Professional critique

- Art director: PASS — stronger first read as `the couple's story`, not merely a photo swap.
- Editorial designer: PASS — dominant/secondary photo jobs are clearer and chronology remains a separate type-led evidence system.
- Book designer: PASS — the left page gets a stronger opening beat without repeating equal photo weight.
- Typographer: PASS — no text geometry changed or regressed.
- Photo editor: PASS for role assignment / BLOCKED for final asset quality — `036` is better suited to dominant portrait framing and `004` to secondary environmental framing.
- Print designer: BLOCKED until verified high-resolution masters are placed and effective resolution/physical proof are checked.

## Learning

This does not require a new failure ID. It independently reinforces existing **RSL-012 — image-role semantics should be reviewed as a set, not one photo at a time**.

New evidence: even with the same two legitimate sources and unchanged layout, assigning the wrong image to the dominant vs secondary role materially weakens crop quality, subject recognition and sequence. Evaluate source truth **and** role compatibility together.

Do NOT transfer V7 photo dimensions, crop geometry, colors, exact couple photographs or Story composition.

## Truth gates

- `004/036` are verified real-couple Hawaii images but Figma currently contains screen derivatives.
- Neither photograph proves a particular chronology milestone.
- Final relationship-history copy remains unresolved/replacement content.
- DESIGN QA ≠ HIRES PHOTO QA ≠ PRINT/PREFLIGHT ≠ PHYSICAL PROOF.
