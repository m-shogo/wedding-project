# RSL-060 — Edge-led photo fields can remove residual card/template reading

Date: 2026-08-17
Source scope/item: Rurubu WEDDING / V6 Profile-Q&A
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Visible problem

The preferred V6 Q&A page was already collision-safe and editorially structured, but the two white-stroked photographs still read as separately placed cards on a cream information canvas. At thumbnail scale this preserved a template/form impression.

## Root-cause hypothesis

The defect was not insufficient ornament. Strong verified photography was present but under-weighted. Removing unnecessary frame strokes and letting legitimate photo roles touch the page edge could turn separate image cards into page-binding visual fields, while a narrow native-text interview rail preserved editability and reading order.

## Bounded test

Rollback-safe CG duplicated CF and changed only the Q&A page:

- enlarged the existing hero and support photos within their established semantic roles;
- moved both toward the right page edge;
- removed only their white 6px decorative strokes;
- retained six questions/answers as native text in the left rail;
- retained the existing composed route texture at lower opacity instead of introducing another decorative system;
- kept 01 and 04 as major interview beats and the remaining questions as support beats.

The first version was not accepted because the hero caption collided with the page deck. The caption was moved into the image field. Q4 was then reduced from 26px to 21px because actual-size review showed excessive wrapping. Only the corrected state was promoted.

## Expected improvement

Reduce card/template reading and increase Japanese travel-magazine continuity without rasterizing variable copy or introducing additional cards, shadows, gradients or generated assets.

## Regression risk

- edge-led imagery can reduce copy-safe width;
- removing a photo border is harmful when that border performs a real binding or print function;
- larger photography exposes source softness more aggressively;
- variable copy can overflow the narrower interview rail and must still be stress-tested when final wording arrives.

## Three-scale evidence

- whole spread / 500px: PASS and visually stronger than CF;
- reading / 1200px spread: PASS;
- actual-size Q&A / 794×1123: PASS after the caption and Q4 corrections;
- final absolute text collisions: `0`;
- final 18px text safe-area risks: `0`.

## Figma / Drive / GitHub evidence

- Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`;
- adopted CG: `1545:2`;
- Q&A page: `1545:39`;
- previous CF rollback: `1538:2` hidden;
- hero hash: `e3738476f760932bb5b09c9d60f174dd6c84049d`;
- support hash: `d76eb07d83d042f15044c8bc6bf68d73a73cd77d`;
- composed texture hash: `691a6ceed471a5d8efa144052a10564eed177b4f`;
- Drive root: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK`;
- evidence: `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-Y-CG-CE-EDGE-LED-QA-2026-08-17.md`;
- evidence commit: `664f8ec2729afb3b1fc54197f498b1146dd4f14b`.

## What must remain Rurubu-specific

Do not transfer the exact Q&A layout, question hierarchy, Yokohama/travel imagery, magenta/cyan/yellow palette, photo dimensions, rotations, Japanese headline treatment, or Rurubu-like editorial grammar.

## Cross-item applicability hypothesis

On another print artifact that is structurally correct but still looks like separate image cards on a template, independently test whether a legitimate existing image role can become an edge-led field after proving that its border has no functional binding/print job. Preserve variable text separately and re-run actual-size/safe-area QA.
