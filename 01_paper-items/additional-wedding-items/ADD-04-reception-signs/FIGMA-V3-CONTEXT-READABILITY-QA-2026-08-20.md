# ADD-04 受付サイン V3 — Context Readability QA

Date: 2026-08-20
State: `VERIFIED_LOCAL / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / ACTUAL_SIZE_CONTEXT_READABILITY_HARDENED / LONG_COPY_STRESS_PASS / LEGACY_PRESERVED / NOT_PRINT_READY`

## Live authority

- latest `main` immediately before this write: `b4ea8a0ce55836965700b2d68e5ffd493b555c7b`
- Current: `docs/automation/non-rurubu-figma-quality-current.md` = `ACTIVE / HOURLY / FIGMA_EDIT_ALLOWED / VISUAL_REOPENED`
- Figma file: `qWlF9THLR1G76hLcx1zYOx`
- groom selected: `16:2`
- bride selected: `16:17`
- groom long-copy stress: `16:32`
- bride long-copy stress: `16:47`
- exact Drive authority: `1vjSYrbjzfZs_vyCIpQAbml9_en5RcH_r / ADD-04_受付サイン`

Drive metadata was read back live before the Figma write. Drive writes in this run: `0`.

## Visible problem

Fresh native `740×1050` review confirmed that the core reception-band hierarchy remains strong, but the small reader-facing context above the band was materially weaker than the rest of the physical sign:

- date `2026.10.24 SAT`: `13px`;
- location `YOKOHAMA`: `10px`.

These are genuine event context, not decorative metadata. At actual-size the location in particular was too fine compared with the 58px Japanese reception title and 27px optional-name role.

## Bounded repair

Before mutation, hidden rollback copies were created for selected and long-copy roots:

- `ROLLBACK / ADD-04 GROOM V3 / PRE CONTEXT READABILITY / 2026-08-20`
- `ROLLBACK / ADD-04 BRIDE V3 / PRE CONTEXT READABILITY / 2026-08-20`
- `ROLLBACK / ADD-04 GROOM STRESS / PRE CONTEXT READABILITY / 2026-08-20`
- `ROLLBACK / ADD-04 BRIDE STRESS / PRE CONTEXT READABILITY / 2026-08-20`

Adopted native-text-only changes in all four roots:

- date: `13 → 17px`;
- `YOKOHAMA`: `10 → 14px`.

No change to:

- Japanese `新郎側受付 / 新婦側受付` primary hierarchy;
- useful bilingual `GROOM RECEPTION / BRIDE RECEPTION` line;
- optional `[お名前]` auto-layout;
- `[方向]` auto-height role;
- functional horizontal direction rule;
- earlier hidden non-semantic route endpoint/cap;
- color, band geometry, alignment or legacy designs.

## Three-scale / stress QA

Fresh groom/bride screenshots after the repair: PASS at whole/read scale and native `740×1050` actual size.

The enlarged date/location now remain visibly secondary but are no longer microcopy-level event facts.

Both long-copy roots were temporarily revealed for actual-size QA and returned to hidden state afterward.

Structural readback:

- selected groom `16:2`: visible native text `6`, outside `0`, proof-language `0`;
- selected bride `16:17`: visible native text `6`, outside `0`, proof-language `0`;
- groom stress `16:32`: visible native text `6`, outside `0`, proof-language `0`;
- bride stress `16:47`: visible native text `6`, outside `0`, proof-language `0`.

A bounding-box probe still detects the intentionally tight Japanese-title / bilingual-label pairing inside the black band. Fresh actual-size screenshots show no visible glyph collision, so that established optical relationship was not altered merely to satisfy box mathematics.

Long optional names and long direction guidance remain contained; no new collision or clipping was introduced by the context-size change.

## Hybrid / asset state

- all reader/factual copy remains native editable text;
- fixed geometry remains native vector/simple geometry;
- generated imagery added: `0`;
- IMAGE fills added: `0`;
- Drive writes: `0`;
- legacy production and prior rollback/history remain intact.

## Decision

`VERIFIED_LOCAL / ACTUAL_SIZE_CONTEXT_READABILITY_HARDENED`.

The selected blank-built V3 reception-sign family remains the current sellable direction. This run corrected a physical-print readability weakness without changing its art direction or inventing unresolved operational facts.