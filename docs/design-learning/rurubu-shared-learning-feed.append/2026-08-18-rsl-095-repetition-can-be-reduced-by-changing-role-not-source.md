# RSL-095 — Repetition can be reduced by changing the role, not by forcing a new photo

Date: 2026-08-18
Source scope/item: Rurubu WEDDING / V6 Outer + Cafe & Table
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Visible problem

The V6 preferred set used a small valid photo pool across many editorial roles. After DX, cafe and Yokohama skyline each still appeared seven times. The problem was publication-level repetition, but no truthful unused destination photo was available in the reachable Drive authority.

## Root-cause hypothesis

Photo diversity does not always require replacing a repeated photo with another photo. If a role's real editorial job is title support, practical metadata, issue identity, or atmosphere rather than photographic evidence, the role can be changed from `PHOTO` to `COMPOSED DECOR + NATIVE TEXT` without inventing destination imagery.

## Bounded tests

### DY Cafe & Table

On rollback-safe DT duplicate, removed one repeated cafe hero and replaced only that role with an already-verified composed travel texture plus stronger native Japanese Cafe typography and practical metadata. The smaller truthful Yokohama view photo remained replaceable.

### AH Outer

On rollback-safe AG duplicate, removed the second use of the same Yokohama skyline within the outer spread. The front postcard became a bounded travel-texture issue panel with native editable text; the back skyline photograph remained untouched.

## Expected improvement

- lower exact-photo repetition;
- preserve destination truth;
- avoid generating or selecting semantically false imagery merely to diversify;
- retain magazine density through editable type and purposeful composed decoration.

## Regression risk

Replacing too many photos with texture can make a travel magazine abstract, repetitive in a different way, or reduce evidence of place. Apply only when the role is not required to prove a specific destination/person/object.

## Three-scale evidence

DY:
- whole 500px PASS;
- whole 1200px PASS;
- left actual 794×1123 PASS;
- text collisions 0;
- 18px text safe risks 0.

AH:
- whole 500px PASS;
- whole 1200px PASS;
- front actual 794×1123 PASS;
- initial deck/title collision detected and corrected before promotion;
- final text collisions 0;
- 18px text safe risks 0.

## Figma / Drive / GitHub evidence

Figma:
- DY `1717:2`; rollback DT `1695:2`;
- AH `1717:55`; rollback AG `1676:2`;
- composed texture hash `691a6ceed471a5d8efa144052a10564eed177b4f`;
- removed repeated cafe hash role `c1ada11205bc3978bf426b304d683f1c1566cac2`;
- removed second outer skyline role using `644f449c3bf2001a94d4b822d2b55e2614c11042`.

Drive authority remained `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`; no new Drive asset was created.

GitHub evidence: `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-AH-DY-PHOTO-REPETITION-SUBTRACTION-QA-2026-08-18.md`.

## Result

Preferred-set counts after AH + DY:
- cafe: 6 (was 7);
- Yokohama skyline: 6 (was 7);
- waterfront: 6;
- dining: 6.

Status: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`.

## What must remain Rurubu-specific

Do not transfer the exact cream/cyan/navy treatment, cover issue panel, Cafe typography, texture hash, coordinates, or Japanese travel-magazine composition.

## Cross-item applicability hypothesis

When another print artifact has repeated photography but no truthful alternate source, first classify each repeated role. If one role is actually decorative/supportive rather than evidentiary, independently test changing that role to composed fixed decoration + native editable text before choosing a false or weak replacement photo.
