# BOARDING PASS V5 — Secondary Copy Readability QA

Date: 2026-08-20
State: `VERIFIED_LOCAL / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / ACTUAL_SIZE_SECONDARY_COPY_HARDENED / LONG_COPY_STRESS_PASS / LEGACY_PRESERVED / NOT_PRINT_READY`

## Live authority

- start/latest `main` immediately before write: `0ad3f649054c3d67fc4e78727ffa2a2e6b4bf5eb`
- Current: `docs/automation/non-rurubu-figma-quality-current.md` = `ACTIVE / HOURLY / FIGMA_EDIT_ALLOWED / VISUAL_REOPENED`
- Figma file: `P2PtpMyhyZqHYe1ZBBCD13`
- selected V5 front: `39:22`
- selected V5 back: `41:2`
- front long-copy stress: `40:2`
- back long-copy stress: `41:19`
- exact Drive authority: `1pccCqb47W7z4F9g_224X4U3bS45HA_Ql / 03_航空チケット風_エスコートカード`

Drive metadata was read back live before the Figma write. Drive writes in this run: `0`.

## Visible problem

Fresh native `1200×550` review showed that the main Japanese headline and identity hierarchy were strong, but several secondary native text roles were materially smaller than the rest of the physical ticket:

- front Roman-name role: `17px`;
- front `YOKOHAMA`: `16px`;
- front reception/table/final-guide rows: `14px`;
- back date/location: `13px`.

These roles are real reader-facing information, not decorative metadata. The back date/location in particular read too faint/small at actual-size compared with the 22px closing line and 44px headline.

A separate authority defect was also observed in the hidden stress roots: long-copy strings still contained internal `LAYOUT DUMMY` suffixes although selected production had already moved to guest-facing semantic placeholders.

## Bounded repair

Before mutation, hidden rollback copies were created for all four affected roots:

- `ROLLBACK / BOARDING PASS V5 FRONT / PRE SECONDARY READABILITY / 2026-08-20`
- `ROLLBACK / BOARDING PASS V5 FRONT STRESS / PRE SECONDARY READABILITY / 2026-08-20`
- `ROLLBACK / BOARDING PASS V5 BACK / PRE SECONDARY READABILITY / 2026-08-20`
- `ROLLBACK / BOARDING PASS V5 BACK STRESS / PRE SECONDARY READABILITY / 2026-08-20`

Adopted native-text-only changes:

### Front selected / stress

- Roman name: `17 → 18px`;
- `YOKOHAMA`: `16 → 18px`;
- reception row: `14 → 17px`;
- table row: `14 → 17px`;
- final-guide row: `14 → 17px`.

No change to ticket geometry, four physical corner-cut roles, print boundary, guilloche, event-ledger rail, headline, guest-name scale, date, ceremony time, or semantic role structure.

### Back selected / stress

- date: `13 → 18px`;
- `YOKOHAMA`: `13 → 18px`.

No change to message field, closing line, memory-orbit vector, corner cuts, print boundary or dark field.

### Stress evidence sync

Internal proof suffixes were removed while preserving materially long semantic test strings:

- guest name and Roman-name stress;
- reception/table/final-guide stress;
- long thank-you message stress.

No final facts were invented.

## Three-scale / structure QA

Fresh selected front/back screenshots after the repair: PASS at whole/read scale and native `1200×550` actual size.

Long-copy roots were temporarily revealed for native-size screenshot QA, then returned to hidden state.

Structural readback after adoption:

- selected front `39:22`: native text `10`, outside text `0`, text collisions `0`, proof-language `0`;
- front stress `40:2`: native text `10`, outside text `0`, text collisions `0`, proof-language `0`;
- selected back `41:2`: native text `5`, outside text `0`, text collisions `0`, proof-language `0`;
- back stress `41:19`: native text `5`, outside text `0`, text collisions `0`, proof-language `0`.

The front realistic stress wraps the longer reception/final-guide roles without leaving the root or colliding with adjacent native text. The back long thank-you message remains contained and does not collide with the enlarged date/location footer.

## Hybrid / asset state

- variable/factual copy remains native editable Figma text;
- fixed ticket graphics remain editable vector roles;
- generated imagery added: `0`;
- IMAGE fills added: `0`;
- Drive writes: `0`;
- legacy production and prior clean-room/rejected studies remain preserved.

## Decision

`VERIFIED_LOCAL / ACTUAL_SIZE_SECONDARY_COPY_HARDENED`.

This is not a new visual grammar and not a new clean-room rebuild. The already-selected blank-built V5 family remains the current sellable direction; this run corrected actual-size reader-facing type hierarchy and synchronized hidden stress evidence without changing the ticket composition.

No new shared-learning entry is justified yet: the general principle (actual-size QA must include secondary copy, not only headline hierarchy) should be tested independently on another materially different print item before promotion.