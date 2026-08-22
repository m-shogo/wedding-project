# RSL-220 — semantic pairing should precede spatial irregularity

Date: 2026-08-22
Source: Rurubu WEDDING / V8 1DAY
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`
Failure fingerprint: `F-RSL-220-SCATTERED-SHORT-WORDS-SIMULATE-EDITORIAL-RHYTHM-WITHOUT-EXPLICIT-SEMANTIC-PAIRING`

## Visible problem

Four short words with different scale and positions (`海辺 / 長めに / 寄り道 / ゆっくり`) were intended to express experiential pace, but their relationships were implicit enough that the page could read as designerly randomness rather than authored editorial rhythm.

## Root-cause hypothesis

Unequal spacing is not automatically editorial. When short fragments depend on one another, spatial variation should follow a legible semantic relationship; otherwise the design can resemble AI-style fake randomness.

## Fresh professional input

IDEA No.346 describes Heikichi Harata's parataxis-based editorial approach as conscientious connection of separated short statements. The transferable principle tested here is connection-before-scatter, not Harata's literal visual style.

Source: https://www.idea-mag.com/en/idea_magazine/346/

## Bounded test

In rollback-safe V8 1DAY AT, pair the same words into two reader-facing statements:

- `海辺は、長めに。`
- `寄り道は、ゆっくり。`

Keep the right exact-time page unchanged and add no decorative geometry.

First pass failed Japanese wrap QA when the second phrase broke with a tiny final fragment. The box/scale method was changed and reverified.

## Evidence

Figma Current: `2264:2`
Previous AR rollback: `2257:2`
Parent page: `2052:2`
500 / 1000 / 1587×1123: PASS
Native text `19`; IMAGE `0`; intersections `0`; 18px safe risks `0`; accidental explicit one-character lines `0`.

Detailed evidence: `01_paper-items/rurubu-wedding/evidence/RURUBU-V8-AT-1DAY-PAIRED-PACE-QA-2026-08-22.md`

## What must remain item-specific

Do not transfer these exact phrases, coordinates, font sizes, Rurubu palette, or 1DAY composition. Do not turn every short-copy page into paired aphorisms.

## Cross-item applicability hypothesis

When a print spread uses scattered short words to create energy or pace, first ask whether the relationship among those fragments is reader-legible. If not, test a semantic grouping/pairing before adding more rotation, color, stickers, or random displacement.
