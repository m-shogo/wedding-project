# 2026-08-16 — Rurubu V6 AC/U experiment feedback

Scope: Rurubu WEDDING only.

## Visible problems

- V profile/Q&A remained too clean and evenly parked in the profile photo area.
- The high-resolution generated profile master still could not enter Figma through the official upload URL because `mcp.figma.com` DNS resolution failed.
- The existing in-Figma timeline-generated hash had not been visually revalidated and was assumed to represent the intended decoration.

## Experiments and decisions

1. **W high-resolution upload** — BLOCKED. One bounded upload attempt reproduced the known DNS fingerprint. No retry.
2. **X small generated-profile support** — REJECTED. Shrinking the existing hash improved nominal resolution but still produced a pasted/soft module and weak native-text fit.
3. **Z generated timeline overlay** — REJECTED. Direct screenshot readback of source node `1300:3` showed an essentially blank cream field rather than the expected tropical timeline artwork.
4. **AB diagonal photo chronology** — REJECTED. The diagonal rail cut through photographs and produced a sparse diagram-like read; U remained stronger.
5. **AC photo-led profile/Q&A** — ADOPTED as preferred local study. The dominant replaceable profile photo was enlarged/rotated slightly; three independent replaceable snapshots were enlarged and overlapped with varied angles; all native text stayed editable. Whole spread and actual-size profile QA passed.

## Evidence

- Figma preferred profile/Q&A: AC `1343:2`, profile `1343:3`.
- Figma preferred chronology remains U `1339:2`.
- AC profile: native text 18 / IMAGE 4 / 18px safe risks 0 / text collisions 0.
- AC Q&A: native text 22 / IMAGE 2 / 18px safe risks 0 / text collisions 0.
- Drive profile generated v2: `1IL1L8MWzaqkwVQv9CkLen4EkTccq-5cm`.
- Drive timeline generated v2: `1uRP3ri4MKw1g8_vtNDxBoazuAm4Hq3B8`.
- QA: `01_paper-items/rurubu-wedding/RURUBU-V6-AC-U-QA-2026-08-16.md`.
- Shared lesson: `docs/design-learning/rurubu-shared-learning-feed.append/2026-08-16-rsl-026-generated-support-must-prove-role-and-readback.md`.

## Next application

Do not spend another run cosmetically retrying the same upload route. Continue V6 visual work with sharp replaceable images/native text, and re-attempt generated-section promotion only after a materially different binary transport capability exists. When it does, verify actual rendered asset + semantic role alignment + actual-size resolution before adoption.
