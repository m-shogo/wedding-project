# Rurubu V6 V/U — inside resolution + chronology feedback

Date: 2026-08-16
Scope: Rurubu WEDDING only

## Observation

- R profile/Q&A was still visually split between a soft generated profile panel and unrelated live photography.
- R Q&A still read too much like sparse wireframe blocks.
- S chronology improved on older grids but still distributed importance too evenly across six milestones.

## Hypotheses

1. Aligning native photo/text roles to a generated section module can improve coherence, but only if the generated support survives actual-size resolution QA.
2. Q&A can gain magazine rhythm by compacting native text and letting one dominant memory photo carry the lower page instead of adding more cards.
3. A chronology becomes more narrative when the final meaningful event is visibly dominant rather than merely the sixth peer item.

## Tests / decisions

### T `1338:53`

- generated profile support aligned to real replaceable photo roles;
- three replaceable snapshot roles added;
- six Q&A prompts rebuilt as compact 3×2 native text;
- lower Q&A rebuilt around dominant memory photography.

Decision:

- Q&A method: ADOPTED into next candidate;
- enlarged generated profile support: REJECTED for preferred state because actual-size softness was visible.

### V `1339:54`

- soft generated support hidden;
- sharp photo-led profile hierarchy retained;
- all profile facts native/editable;
- three replaceable snapshots retained;
- T's improved Q&A/memory treatment retained.

Decision: `PREFERRED V6 PROFILE/Q&A STUDY`, not print-ready.

### U `1339:2`

- first five chronology milestones given different image sizes/vertical rhythm;
- `2026.10.24 / WEDDING` promoted to a larger destination image;
- native text and replaceable images preserved.

Structural QA initially found three collisions/safe-area defects. They were corrected before promotion.

Final chronology page:

- native text 21;
- images 9;
- safe-area risks 0;
- text/text collisions 0;
- text/image collisions 0.

Decision: `PREFERRED V6 STORY/TIMELINE STUDY`, not print-ready.

## Transport / asset note

A fresh official Figma upload URL was issued for a high-resolution generated section asset, but POST again failed at DNS resolution for `mcp.figma.com`. The same transport family was not retried again. No generated asset was counted as placed/adopted from that failed transport.

## Current Figma entry point

Start Here now reads:

`V5 FU/FX · V6 M + V/U INSIDE STUDIES · V7 HOLD`

Visible preferred studies:

- V `1339:54`
- U `1339:2`

R/S/T remain hidden comparison/rollback evidence.

## Next application

- Keep V7 on hold.
- Continue V6 from V/U.
- Replace V's restrained profile treatment with a section-generated support only after a high-resolution asset can actually enter Figma and pass actual-size sharpness.
- Do not reintroduce equal Q&A cards or equal chronology cards merely for visual decoration.
