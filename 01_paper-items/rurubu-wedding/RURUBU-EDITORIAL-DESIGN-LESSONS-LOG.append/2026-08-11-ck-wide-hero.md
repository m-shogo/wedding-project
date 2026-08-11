# 2026-08-11 CK wide-hero editorial lessons

Scope: Rurubu WEDDING only

## Lesson 1 — image geometry is part of editorial image quality

A verified photograph can look low quality when the layout forces it into a hostile aspect ratio and enlarges one dimension beyond the prepared derivative. Before regenerating or adding decorative compensation, compare an aspect-respecting placement at natural/actual size.

In this run the same verified waterfront hash looked materially sharper when changed from CE's tall `793.7 × 700` FILL treatment to CK's wide `793.7 × 345` editorial panorama.

This lesson does **not** mean a semantic-role mismatch is acceptable for production. The waterfront source is the verified history derivative, so CK proves composition/geometry only and cannot close V5-01 cover provenance.

## Lesson 2 — dense travel-magazine rhythm comes from unequal visual mass, not more modules

The strongest progression was:
- reduce the tall soft hero
- preserve one huge `01`
- enlarge/tilt `02`
- make `03` a near-full-width lower destination photograph
- let the photo blocks overlap the editorial field

This outperformed filling the lower page with another cream/card/callout system. Dense does not mean uniformly filled; it means strong differences in scale with controlled collision.

## Lesson 3 — actual-size QA must be allowed to reject a visually exciting overlap

CJ created the strongest initial overlap but actual-size review exposed readability pressure around the feature-01 descriptor. CK moved the supporting photograph and descriptor, then structure QA found a final 2px text intersection. That was repaired before adoption.

Final CK evidence:
- comparator `813:2`
- front `813:131`
- hero `813:133`, `793.7 × 345`, hash `539c259be8036b481d06b4f76db9a39b407d90e8`
- visible native text `37`
- visible IMAGE nodes `7`
- same-parent text intersections `0`
- fold `813:184`, x `792.7`, `2 × 1122.5`

Status: **CK strongest outer comparator, not Current.** CC `801:2` remains strongest inside comparator.

## Lesson 4 — composition proof and asset-role proof are separate gates

Reusing an already verified image can be appropriate for a rollback-safe clean-room experiment when the purpose is to isolate layout quality. It must not be counted as source adoption for a different semantic asset role.

For Rurubu V5:
- CK composition evidence: accepted comparator
- V5-01 cover-role evidence: still open
- Q60 exact Figma placement: still NO
- `PHOTO_ROLE_PASS`: remains `9/10`
- dominant-photo pass: remains `2/3`
- V6 production: still closed

## Lesson 5 — binary transport must be deterministic, not manually transcribed

Fresh exact Q60 Drive authority remains:
- ID `1YL0WAOzYU3O1FGa23ieRuw_Btu4jbmzr`
- JPEG
- `155,439 bytes`
- SHA-256 `090880c0ebe101f1321ebac05f22a91b2b61f3a8ac31c8d112dc418412f13ab2`

New tests established:
- `figma.createImageAsync()` is unsupported in the active plugin runtime and failed atomically.
- a manually transcribed long base64 segment was caught as truncated by a length guard before mutation.
- the historic `rurubu_v5_binary` namespace contains only partial Q60 chunks, so it cannot yet reconstruct the exact file.

Reusable rule:
> For large verified binary assets, create small deterministic chunks from machine bytes, guard every segment and the final decoded size/file markers, reconstruct on a safe duplicate, then verify the resulting image hash and screenshots before any promotion.

Do not lower image quality merely to make transport easier.
