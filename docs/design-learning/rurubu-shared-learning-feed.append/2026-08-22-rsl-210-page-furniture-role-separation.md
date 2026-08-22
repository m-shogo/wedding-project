# RSL-210 — page furniture must declare page role, not duplicate adjacent navigation semantics

Date: 2026-08-22
Source scope: Rurubu WEDDING
Source role: V8 Memory/Guide
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Professional observation

Fresh source: 2026 discussion of The New York Times Magazine redesign with creative director Gail Bichler. The redesign treats edit, pacing, typography, image/text relations and page furniture as an integrated publication system; caption specs, rule lines and page furniture are deliberately standardized or repositioned according to how the magazine is read.

Transferable principle: small labels and furniture are not neutral decoration. They tell the reader what kind of page they are on and how to move through the publication.

## Visible problem

Memory R used `01 / WATERFRONT` on the left essay while the adjacent right-page guide already owned functional item `01 朝 / 海辺を歩く`. The duplicate number made the left essay appear to be part of the same indexed list, weakening the intended essay-vs-guide distinction.

## Root-cause hypothesis

Even when layout and hierarchy are visually clean, adjacent pages can repeat the same semantic/navigation job through page furniture alone. This creates a subtle template/system smell and weakens print-specific verso/recto roles.

Failure fingerprint:

`F-RSL-210-PAGE-FURNITURE-DUPLICATES-ADJACENT-NAVIGATION-ROLE`

## Bounded test

Candidate AD `2228:2` from R `2199:2`.

Changed only the left essay micro furniture:

- `01 / WATERFRONT` → `海辺 / 朝の記憶`
- retained `風の強さまで、覚えている。`
- right-page numbered guide remains unchanged and owns `01–04` navigation.

No new image or decorative module was introduced.

## Evidence

- 500px: PASS
- 1000px reading scale: PASS
- 1587×1123 actual size: PASS
- native text: `22`
- IMAGE: `0`
- intersections: `0`
- 18px safe risk: `0`
- accidental one-character explicit Japanese wrap candidates: `0`
- intentional standalone semantic labels `朝 / 昼 / 夕 / 夜` retained

Detailed evidence:
`01_paper-items/rurubu-wedding/evidence/RURUBU-V8-MEMORY-AD-ESSAY-GUIDE-ROLE-SEPARATION-QA-2026-08-22.md`

## Verified result

AD is locally clearer than R: the left page owns reflective memory/essay furniture and the right page owns functional guide numbering. The improvement came from semantic separation, not styling novelty.

## Regression risk

Do not remove numbers merely because they repeat visually. Numbering is valuable when it genuinely binds a sequence, index, route or navigation system. The test is whether two adjacent surfaces are accidentally claiming the same semantic job.

## Cross-item applicability

Candidate principle:

> Audit small labels, section numbers, folios and index markers as semantic/navigation devices. If adjacent pages perform different editorial jobs, their furniture should not falsely imply that they are instances of the same list or module.

This remains `CROSS_ITEM_CANDIDATE`; it is not a project-wide promoted rule.
