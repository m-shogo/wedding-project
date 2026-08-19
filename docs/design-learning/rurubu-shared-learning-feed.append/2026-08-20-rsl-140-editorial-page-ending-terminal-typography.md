# RSL-140 — Editorial page endings can gain closure from native terminal typography before adding another container

Source scope/item: Rurubu WEDDING / V6 Story + chronology

State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Visible problem

The chronology's main beats were already photo-led and intentionally unequal, but the final wedding event remained a small lower-left block while the lower-right physical page field was underused. At thumbnail and actual size the content was semantically complete but the page ending looked unfinished.

## Evidence before change

GO `1958:2 / 1958:28` had verified native copy, source-safe photos, no collisions and no safe-area risks. The problem was visual closure, not missing information or asset quality.

## Root-cause hypothesis

A final event does not automatically need another photograph or a full-width card. When the final event is semantically important and its copy must remain editable, native number/date/title/body typography plus a single purposeful terminal rule can carry enough visual mass to close the physical page.

## Principle / capability tested

1. Promote the final semantic event using native typography rather than adding a new image/container.
2. Use one existing functional rule as a page-ending boundary instead of a filled status/card field.
3. When that dynamic native copy moves closer to trim/footer, rerun realistic long-copy stress instead of reusing an old pass.

The third step consumed only the neutral QA method from the non-Rurubu feed. No non-Rurubu item-specific Figma, Drive, asset, ledger, palette, layout, or production state was inspected or copied.

## Exact bounded change

Rollback-safe GP `1961:2 / 1961:28` changed only event 06:

- page-width yellow terminal rule;
- larger native `06`;
- date separated as compact factual metadata;
- `WEDDING` promoted to 44px native title;
- native closing copy preserved;
- title/copy stack converted to native auto-height.

All photos, hashes, events 01–05, Story page and factual date remained unchanged.

## Expected improvement

Create an intentional final-destination beat, reduce unfinished lower-page whitespace, preserve photo scarcity discipline, and avoid reintroducing UI/card containment.

## Regression risk

- long Japanese copy may grow into folio/footer reserve;
- oversized terminal type may overpower event 05 or compete with the hero;
- a full-width rule can become meaningless decoration if the page already closes without it.

## Three-scale evidence

- whole-item / 500px: PASS; GP stronger than GO;
- reading / 1200px: PASS;
- actual-size chronology / 794×1123: PASS;
- visible native text `32`;
- collisions `0`;
- 18px safe-area risks `0`;
- overflow `0`.

Dynamic-copy proof `1962:2 / 1962:28` used the realistic longer closing sentence `そして今日ここから、ふたりで選ぶ次の目的地へ向かって、新しい旅をゆっくり始めます。` and remained collision `0`, safe risk `0`, overflow `0` at actual size.

## Figma / Drive / GitHub evidence

- Figma preferred: `1961:2`;
- chronology: `1961:28`;
- rollback GO: `1958:2` hidden;
- hidden stress proof: `1962:2 / 1962:28`;
- Start Here: `845:27` → `V6 GB + GN/GP + GE + GJ + GD · V7 HOLD`;
- Drive V6 root: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK` reverified; Drive writes `0`;
- item evidence: `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-GP-WEDDING-TERMINAL-TYPO-QA-2026-08-20.md`.

## Adoption status

ADOPTED / VERIFIED_LOCAL.

## What must remain Rurubu-specific

Do not transfer the yellow line, `06` geometry, `WEDDING` scale, page coordinates, travel-magazine palette, chronology composition, or exact copy.

## Cross-item applicability hypothesis

A different print artifact may independently test this only when its semantic ending is complete but its physical page ending remains visually unresolved. First test native typographic closure before adding another decorative container or redundant image. If dynamic copy is moved closer to a fixed physical boundary, rerun realistic copy stress.
