# RSL-141 — Typography can close an optional image role without implying an unfinished slot

Source scope/item: Rurubu WEDDING / V6 Profile

State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Visible problem

After a third profile snapshot photo had already been intentionally removed, the surviving `03 / 次の旅へ。` area still used a large separated number, long vertical rule and widely spaced copy. At whole-item and actual-size review it could still look like a third photo slot whose image was missing.

## Evidence before change

- source preferred: GN `1957:2`;
- visible third image role already hidden;
- `03`, metadata, title and body remained native text;
- large composed route texture remained behind the photo cluster;
- no structural/safe-area failure, but the semantic visual read remained ambiguous.

## Root-cause hypothesis

When an image role is intentionally omitted, leaving the associated number/caption geometry in a layout that still resembles a photo placeholder can preserve the *expectation* of a missing image. The correct treatment is not necessarily to add another image; the remaining native text can be regrouped into a self-sufficient editorial closing beat.

## Principle / capability tested

Transfer editorial responsibility from the optional image to a compact native typography group, while keeping any reusable photo roles and variable text editable.

## Exact bounded change

Rollback-safe GR `1971:2` changed only the Profile 03 closing nodes:

- compacted native number, metadata, title and body into one lower-right group;
- removed a long vertical decorative rule;
- retained one short functional horizontal rule;
- no new image, card, shadow, gradient, generated asset or image hash.

The first geometry clipped the title; a second geometry still produced one number/title collision. Neither was promoted. Final geometry passed actual-size visual and structure QA.

## Expected improvement

Make the no-photo role read as intentionally complete editorial typography instead of an unfinished image slot, without increasing photo repetition.

## Regression risk

- over-compaction can clip Japanese copy or create accidental number/title contact;
- narrowing copy can reduce future text tolerance;
- removing a rule is invalid if it still performs a real binding/contrast function.

## Three-scale evidence

- whole-item / 500px: PASS;
- reading / 1200px: PASS;
- actual-size Profile / 794×1123: PASS.

## Figma / Drive / GitHub evidence

- adopted Figma: GR `1971:2` / Profile `1971:3`;
- hidden rollback: GN `1957:2`;
- final visible native text on Profile: `26`;
- final text collisions: `0`;
- final 18px safe-area risks: `0`;
- Drive authority: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK`;
- item evidence: `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-GR-PROFILE-CLOSING-TYPO-QA-2026-08-20.md`.

## Adopted / rejected / blocked status

`VERIFIED_LOCAL / ADOPTED`.

## What must remain Rurubu-specific

Do not transfer the `03` wording, exact coordinates, Japanese headline scale, magenta/yellow accents, snapshot composition, travel texture, or Rurubu-like magazine grammar.

## Cross-item applicability hypothesis

If another print item intentionally omits an optional image but the residual label/caption geometry still visually implies a missing placeholder, independently test whether the remaining semantic copy can be regrouped into a complete native typographic role before adding a filler image or another container.

## Next receiving-item experiment

Use only on a materially different item where the image is genuinely optional and evidence shows the remaining geometry implies incompleteness. Preserve the image role when it carries identity, factual, physical, scan, wayfinding or provenance responsibility.
