# RSL-094 — Destination semantic authority outranks visual drama

Date: 2026-08-18
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`
Source scope: Rurubu WEDDING V6 / Memory Spots DR→DS

## OBSERVED

Memory Spots DR was visually strong, but SPOT 03 used an old-town photograph inside a page explicitly framed as Yokohama destination information. The image had no legitimate Yokohama semantic authority.

A preserved retired night-view candidate also looked technically reusable by role/history, but direct pixel inspection showed a clearly non-Yokohama European city/river landmark scene. Reusing it would have preserved visual drama while strengthening the false destination implication.

## ROOT_CAUSE_HYPOTHESIS

The production loop had correctly gated dimensions, editability and image provenance, but destination-semantic authority was not being treated as a hard gate equal to those technical checks.

A large, attractive travel photograph can make a spread look more complete while making the editorial claim less truthful.

Failure fingerprint:

`DESTINATION_SEMANTIC_IMAGE_FALSE_AUTHORITY`

## TESTED_LOCAL

Rollback-safe DS `1709:2` was cloned from preferred DR `1689:2`.

Bounded change:

- replace only SPOT 03's destination-wrong photo with an existing verified Yokohama/Minato Mirai skyline image already present in Rurubu V6;
- keep the skyline at an intrinsic-safe small role instead of stretching it into the old dominant vertical geometry;
- reauthor only directly dependent native copy to `みなとみらいの夕景` / `MINATOMIRAI / SUNSET / WALK` and matching guide metadata;
- shorten/remove decoration whose only purpose depended on the old large photo geometry;
- preserve all other photos, native text, masks/replaceability, page role and rollback history.

Expected improvement:

- remove false Yokohama implication;
- preserve real destination-guide credibility;
- keep the spread editable and visually coherent even if SPOT 03 becomes a smaller support beat.

Regression risk:

- reduced photographic drama because the verified truthful skyline source is smaller;
- increased reuse of an already-used Yokohama skyline asset until final legitimate destination photography is supplied.

## VERIFIED_LOCAL

Three-scale evidence:

- whole spread ~500px: PASS;
- reading spread ~1200px: PASS;
- right page actual `794×1123`: PASS.

Structure:

- native text `14`;
- IMAGE roles `2` on the right page;
- text/text collision `0`;
- 18px text safe-area risk `0`;
- SPOT 03 skyline displayed `238×218`, within the existing registered small skyline role;
- photo remains independently replaceable.

Figma evidence:

- adopted DS: `1709:2 / PREFERRED / V6_INSIDE_DS_MEMORY_SPOTS_YOKOHAMA_TRUTH_REPAIR_2026_08_18`;
- rollback DR: `1689:2 / ROLLBACK_HIDDEN / V6_INSIDE_DR_PRE_DS_MEMORY_SPOTS_2026_08_18`;
- DS SPOT 03 image hash: `644f449c3bf2001a94d4b822d2b55e2614c11042`;
- rejected DR SPOT 03 hash for the named Yokohama role: `439a719d73f28e8dd2889f2026cccb15f345ec63`.

GitHub evidence:

- `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-AG-DN-DO-DS-DT-DV-MEMORY-SPOT-03-SEMANTIC-TRUTH-QA-2026-08-18.md`

## CROSS_ITEM_CANDIDATE

Generalizable principle only:

When a design names a real destination, venue, product, person or other factual visual subject, **semantic authority must be a hard adoption gate alongside provenance, resolution, crop and editability**. If the only truthful available image is smaller or less dramatic, prefer honest hierarchy or reauthor the copy rather than letting a visually stronger but false image carry the claim.

Do not transfer:

- Yokohama/Minato Mirai copy;
- the skyline image;
- Rurubu layout, color, numbering, crop or exact typography;
- the assumption that every destination page needs a small support photo.

Next receiving-item experiment:

If another Wedding item contains a named real-place visual, independently verify whether a technically valid asset actually supports the named place before treating this as cross-item verified.
