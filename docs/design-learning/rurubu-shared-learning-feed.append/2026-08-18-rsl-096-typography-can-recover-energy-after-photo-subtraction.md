# RSL-096 — Strong native typography can recover editorial energy after truthful photo subtraction

Source scope/item: Rurubu WEDDING / V6 Cafe & Table
Date: 2026-08-18
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Visible problem

DY correctly removed one repeated cafe photograph by converting that role to composed travel texture + native copy. The resulting Cafe page was structurally correct and semantically honest, but actual-size/whole-item review showed that it had become too visually quiet and still read like an under-filled template.

## Root-cause hypothesis

After a repeated photograph is truthfully removed, the lost visual mass does not necessarily need another photograph. If the role is editorial rather than evidentiary, stronger native typography inside the bounded composed field may restore hierarchy while preserving editability and avoiding false/repeated imagery.

## Bounded test

Rollback-safe DZ `1719:2` from DY `1717:2`:

- widened the existing verified composed texture to 720×430 and lowered opacity to 0.20;
- changed only the native Cafe feature hierarchy to a 50px Japanese headline plus 92px ordinal;
- preserved body/meta as native text;
- preserved the remaining Yokohama view photograph as a separate replaceable role;
- on the opposite Table page, strengthened an existing support photograph with scale/rotation rather than adding a new card or image.

No new generated image, Drive save, binary transport or image hash was introduced.

## Expected improvement

Restore travel-magazine energy and a stronger first-read silhouette without undoing the photo-repetition/semantic-truth repair.

## Regression risk

Large type can become poster-like; composed decoration can become a fake panel; rotated imagery can collide with copy or safe area; raster enlargement can expose softness.

## Three-scale evidence

- whole spread 1200px: DZ visually stronger than DY;
- Cafe actual-size `1719:3` 794×1123: PASS;
- left native text 14 / IMAGE 2 / absolute text collisions 0 / 18px safe risks 0;
- right native text 19 / IMAGE 2 / absolute text collisions 0 / 18px safe risks 0.

## Figma / Drive / GitHub evidence

- Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`;
- adopted: DZ `1719:2`;
- rollback: DY `1717:2` hidden;
- Cafe page: `1719:3`;
- composed texture hash: `691a6ceed471a5d8efa144052a10564eed177b4f`;
- replaceable Yokohama view hash: `644f449c3bf2001a94d4b822d2b55e2614c11042`;
- Table support hash: `e3738476f760932bb5b09c9d60f174dd6c84049d`;
- Drive V6 root unchanged: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK`;
- evidence: `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-DZ-CAFE-TYPOGRAPHIC-FIELD-QA-2026-08-18.md`.

## Adopted / rejected / blocked status

`VERIFIED_LOCAL / ADOPTED`.

## What must remain Rurubu-specific

The exact Cafe wording, Japanese type sizes, magenta/cyan/yellow/navy palette, travel texture, photo choices, rotation and travel-magazine composition.

## Cross-item applicability hypothesis

When another print item truthfully removes a repeated/nonessential photo and then becomes visually weak, independently test stronger native type hierarchy inside an existing bounded decorative support before restoring imagery or adding cards. Transfer the method only, never the Rurubu look.

## Next receiving-item experiment

Use only on a materially different print artifact where a non-evidentiary photo has already been removed for semantic/repetition reasons and the resulting page is too quiet. Reject the method if stronger type becomes poster-like or harms dynamic-copy resilience.
