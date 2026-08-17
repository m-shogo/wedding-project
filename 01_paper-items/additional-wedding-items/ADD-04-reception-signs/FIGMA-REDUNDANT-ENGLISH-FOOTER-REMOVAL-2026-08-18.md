# ADD-04 受付サイン — redundant English footer removal QA

Date: 2026-08-18
State: `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / REDUNDANT_ENGLISH_FOOTER_REMOVED / LONG_COPY_STRESS_PRESERVED / LEGACY_PRESERVED / NOT_PRINT_READY`
Start authority SHA: `2e5c0f9f46cd17bf956b8fe68fbaf9a913560256`

## Authority

- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Figma file: `qWlF9THLR1G76hLcx1zYOx`
- selected groom V3: `16:2`
- selected bride V3: `16:17`
- long-copy proofs: groom `16:32`, bride `16:47`
- Drive authority: `ADD-04_受付サイン` / `1vjSYrbjzfZs_vyCIpQAbml9_en5RcH_r`
- retained legacy production: unchanged

## Visible issue

Fresh whole-item review found a tiny bottom footer, `RECEPTION  /  YOKOHAMA`, on both selected signs. It duplicated two ideas already communicated elsewhere:

- the black band explicitly states `新郎側受付 / GROOM RECEPTION` or `新婦側受付 / BRIDE RECEPTION`;
- the top date/location block already contains `YOKOHAMA`.

The footer therefore added no required direction, identity, name, date or physical-sign information. At 2–4 m intent it behaved as decorative English microcopy and made the otherwise restrained paper sign feel more template-authored.

## Bounded comparison

Rollback-safe comparison copies were created from the already-selected clean-room V3, not from retained legacy production:

- groom comparison `20:2`
- bride comparison `20:17`

Only `TXT_FOOTER / RECEPTION  /  YOKOHAMA` was hidden. The Japanese reception title, paired bilingual side label, date, top location, optional name role, direction role, route line, palette and physical layout were unchanged.

500 px comparison result: removing the footer improves lower-field quiet space without weakening reception-side recognition or wayfinding. The bilingual label immediately under the Japanese title remains because it performs a real reader-facing role; this was not a blanket English-removal pass.

## Promotion / rollback

Before selected/stress mutation, exact hidden rollbacks were created:

- groom selected rollback `20:32`
- bride selected rollback `20:47`
- groom stress rollback `20:62`
- bride stress rollback `20:77`

The redundant footer was then hidden in selected and long-copy roots:

- selected groom `16:16`
- selected bride `16:31`
- groom stress `16:46`
- bride stress `16:61`

Comparison copies and all rollback copies remain hidden. Legacy production remains untouched.

## Post-write QA

Fresh selected screenshots:

- groom 500 px: PASS; lower field reads as intentional space rather than a microcopy footer strip;
- bride 500 px: PASS; the mirrored role keeps the same optical hierarchy.

Structural readback across selected + long-copy proofs:

- outside visible text: `0`;
- IMAGE fills: `0`;
- `TXT_FOOTER`: hidden in all four roots;
- existing direction auto-height and optional-name resilience remain intact.

No required semantic placeholder or authoritative fact was deleted.

## Drive / generated asset decision

Drive authority metadata was re-read before the write. New Drive assets: `0`.

`IMAGE_GENERATION_NOT_REQUIRED`: the concrete defect was duplicated decorative microcopy, not missing visual material.

## Decision

`REDUNDANT_ENGLISH_FOOTER_REMOVED`.

ADD-04 remains `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS`. Keep `NOT_PRINT_READY` until authoritative optional name use, actual direction wording, placement/stand conditions, vendor bleed/template and physical viewing-distance proof are available.