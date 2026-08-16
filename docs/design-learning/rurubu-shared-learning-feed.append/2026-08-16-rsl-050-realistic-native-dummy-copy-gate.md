# RSL-050 — Realistic native dummy copy is part of editorial visual QA

Date: 2026-08-16
Source scope: Rurubu WEDDING / V6 Profile & Q&A
State: `OBSERVED → ROOT_CAUSE_HYPOTHESIS → TESTED_LOCAL → VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Visible problem

BK had an established photo-led Q&A hierarchy, but every visible answer still used the same placeholder wording: `回答をここに。文量に合わせて調整。`. The layout was structurally valid, yet the preferred frame still looked like an input form/wireframe rather than a finished editorial study.

## Root-cause hypothesis

Short repeated placeholder strings hide the real rhythm of Japanese body copy and make repeated content appear mechanically uniform. A layout can therefore pass collision checks while still failing visual realism.

## Bounded test

Rollback-safe BK → BR duplicate:

- preserve all geometry, questions, type sizes, images, masks, hashes and pullquote;
- replace only the six native answer text values with distinct, realistic-length Japanese dummy sentences;
- clearly treat the sentences as layout-evaluation dummy copy, not final personal facts.

Example dummy copy:

- `話しやすくて、笑顔が印象的でした。`
- `何でも一緒に楽しんでくれるところ。`
- `旅行の計画を立てている時間。`
- `まだ行ったことのない場所を、ふたりで巡りたい。`
- `いつも隣で笑ってくれて、ありがとう。`
- `よく笑って、旅の話が尽きない家庭。`

## Expected improvement

- reduce wireframe/form appearance;
- expose actual Japanese line-length rhythm;
- keep the preferred frame closer to what a real printed interview page will feel like;
- preserve later editability because all answers remain native text.

## Regression risk

- longer lines could collide with adjacent photo roles or subsequent questions;
- dummy language could be mistaken for final personal facts if status/evidence does not label it clearly;
- artificially similar dummy sentence lengths could still hide edge cases, so dedicated long-copy stress remains a separate gate.

## Evidence

Figma:

- preferred BR `1482:2`;
- actual-size Q&A page `1482:33 / 794×1123`;
- rollback BK `1462:191` preserved hidden.

Verification:

- 1200px whole spread: PASS;
- 794×1123 actual-size Q&A: PASS;
- native text `25`;
- replaceable IMAGE roles `2`;
- text/text collision `0`;
- 18px text safe-area risk `0`;
- image hashes unchanged from BK.

GitHub evidence:

- `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-V-BR-BQ-INTEGRATED-FLOW-QA-2026-08-16.md`.

## Verified result

**ADOPTED LOCALLY.** The exact same layout reads more like a magazine page when realistic text mass is visible. Structural stress proofs and realistic preferred-state dummy copy serve different QA purposes and should both exist.

## What must remain Rurubu-specific

Do not transfer these literal dummy answers, question wording, typography sizes, image choices, positions, or Rurubu interview composition.

## Cross-item applicability hypothesis

For repeated native copy modules, collision-safe placeholder text is not enough to judge editorial quality. Use realistic representative text mass in the visible design study while keeping separate longer stress cases for overflow resilience.

## Next receiving-item experiment

Test only where repeated placeholder strings make a receiving item look like a wireframe. Use domain-appropriate dummy copy and explicitly label it non-final.