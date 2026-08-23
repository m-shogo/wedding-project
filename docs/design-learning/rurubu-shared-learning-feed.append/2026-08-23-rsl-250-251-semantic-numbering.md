# RSL-250 / RSL-251 — semantic numbering in high-energy editorial systems

Date: 2026-08-23
Source: Rurubu WEDDING V7

## RSL-250 — Removing ordinal anchors can destroy useful scan rhythm

State: `REJECTED`

Fingerprint: `F-RSL-250-SEMANTIC-ANCHOR-SUBSTITUTION-REMOVES-USEFUL-SCAN-RHYTHM-IN-HIGH-ENERGY-GUIDE`

### Visible problem / hypothesis

V7 Memory/Guide G2 used large `01–04` plus semantic labels `朝 / 昼 / 夕 / 夜`. Because V8 had previously benefited from ordinal subtraction in a quieter browse guide, a legitimate hypothesis was that G2's numbers might also be redundant.

### Bounded test

G3 `2378:2` hid only the four ordinals and enlarged the existing time labels. Copy, photos, crop, title, palette and root geometry were preserved.

### Three-scale result

- 500 px: readable but noticeably flatter and calmer.
- 1400 px: weaker scan stops and less energetic travel-guide pacing.
- 1587×1123: structurally clean, but the separated content beats no longer had enough visible punctuation.
- structure: text `16`, IMAGE `6`, intersections `0`, 18 px edge risks `0`, Japanese font mismatch `0`.

### Decision

REJECT G3; preserve G2 `2299:2` as current. G3 is hidden rejected evidence.

### Learning

The transferable rule is **not** `remove redundant numbers`. A number may be semantically redundant as order data yet still perform a legitimate reader-facing browse/navigation/pacing job. Test that job at whole-item scale before subtraction.

This failed transfer is useful because it demonstrates that V8's quieter ordinal-removal outcome must not be copied into V7's high-energy system without local evidence.

Do not transfer: V7 colors, number sizes, positions, or Memory/Guide composition.

---

## RSL-251 — Prominent editorial numbers need a real referent

State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

Fingerprint: `F-RSL-251-PROMINENT-EDITORIAL-NUMBER-SIMULATES-STRUCTURE-WITHOUT-A-READER-FACING-REFERENT`

### Visible problem

V7 Outer C5 `2314:2` displayed a large front-cover `01` next to `今すぐ行きたい、ふたりの4つ。`, but the `01` did not map to verified pagination, issue numbering, feature numbering, or a navigation sequence.

### Root-cause hypothesis

The numeral was carrying visual energy but not editorial information. Because the headline already states a verified reader-facing quantity of four, the same graphic role could become truthful without sacrificing the high-energy cover rhythm.

### Bounded test

C7 `2379:2` changed only the large front `01` to `4`, preserving position, size, photography, lockup, service list, date, and the functional back-cover 01–04 browse sequence.

### Three-scale result

- 500 px: PASS; the large number remains an immediate cover anchor.
- 1400 px: PASS; the `4` now directly reinforces the headline proposition.
- 1587×1123: PASS for DESIGN QA.
- structure: text `18`, IMAGE `6`, intersections `0`, 18 px edge risks `0`, Japanese font mismatch `0`.
- current-root overlap after promotion: `0`.

### Decision

Promote C7 `2379:2`; preserve C5 `2314:2` hidden rollback.

### Learning

Before using a large number as editorial furniture, identify its reader-facing job: quantity, sequence, finding/navigation, issue identity, time, price, or another verified relation. If it has no referent, redesign it rather than relying on the visual shorthand of magazine numbering.

The rule is not `replace 01 with 4`; it is `make prominent numerical furniture semantically accountable`.

What remains Rurubu-specific: `4 WAYS`, coral/cyan/yellow number palette, front-cover position, Hawaii art direction and exact scale.

Evidence: `01_paper-items/rurubu-wedding/evidence/RURUBU-V7-C7-SEMANTIC-COVER-QUANTITY-AND-G3-REJECTION-QA-2026-08-23.md`.