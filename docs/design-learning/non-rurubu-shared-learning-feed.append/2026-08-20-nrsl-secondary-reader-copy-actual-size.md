# NRSL — Actual-size QA must audit the smallest reader-facing copy

Date: 2026-08-20
Source scope: non-Rurubu
State: `VERIFIED_CROSS_ITEM`

## Visible problem

Two materially different selected print artifacts had already passed strong headline/composition review, but fresh native-size inspection found genuine reader-facing secondary facts/cues rendered much smaller than the rest of the physical artifact:

1. BOARDING PASS V5 — reception/table/final-guide rows, Roman name, location and back date/location were visually fragile at native `1200×550` despite a strong primary ticket hierarchy.
2. ADD-04 reception signs V3 — date/location above the black reception band were materially weaker at native `740×1050`, especially the `10px` location.

A previous ADD-17 children-card pass independently found the same failure family in child-facing secondary instructions. This confirms the problem is not specific to transport graphics or one composition.

## Root-cause hypothesis

Thumbnail and reading-scale review naturally prioritizes title/composition hierarchy. A design can therefore look sellable while its smallest **meaningful reader-facing** copy remains too fine for physical use. Treating all small copy as intentional microcopy is unsafe: some small roles are event facts, instructions, location, identity support, or accessibility cues and deserve an actual-size readability decision.

## Bounded tests

### BOARDING PASS V5

Figma: `P2PtpMyhyZqHYe1ZBBCD13`

Selected roots:
- front `39:22`;
- back `41:2`.

Only secondary native text sizes were raised:
- Roman name `17→18px`;
- location `16→18px`;
- reception/table/final-guide `14→17px`;
- back date/location `13→18px`.

Ticket geometry, corner cuts, guilloche, information rail, main headline and guest-name hierarchy did not change.

Long-copy proof-language drift was corrected at the same time without reducing stress length.

Evidence:
`01_paper-items/boarding-pass/FIGMA-V5-SECONDARY-COPY-READABILITY-QA-2026-08-20.md`

Git: `b4ea8a0ce55836965700b2d68e5ffd493b555c7b`

Drive authority: `1pccCqb47W7z4F9g_224X4U3bS45HA_Ql`.

### ADD-04 reception signs V3

Figma: `qWlF9THLR1G76hLcx1zYOx`

Selected roots:
- groom `16:2`;
- bride `16:17`.

Only top event-context sizes were raised:
- date `13→17px`;
- location `10→14px`.

The Japanese reception title, bilingual band label, optional-name auto-layout, direction role and functional direction rule did not change.

Evidence:
`01_paper-items/additional-wedding-items/ADD-04-reception-signs/FIGMA-V3-CONTEXT-READABILITY-QA-2026-08-20.md`

Git: `8faad404126b7f40b3de07ee40495ffa9407e9a8`

Drive authority: `1vjSYrbjzfZs_vyCIpQAbml9_en5RcH_r`.

## Expected improvement

Keep the deliberate hierarchy intact while ensuring that meaningful secondary copy survives the final physical reading distance instead of passing only because the dominant headline is attractive.

## Regression risk

Blindly enlarging every small label can flatten hierarchy, turn intentional metadata into visual noise, force wrapping, or consume long-copy reserve. The method is **not** “small type is bad.” It is:

1. classify whether the role is genuinely reader-facing and meaningful;
2. judge it at native physical size;
3. make a bounded size change only when it is too fragile;
4. rerun long-copy / collision / safe-area QA after enlargement.

Decorative folios, production labels, provenance notes and intentionally subordinate non-reader metadata should not be promoted merely because they are small; many should instead be removed from guest-facing artwork.

## Three-scale evidence

BOARDING PASS:
- whole/read: hierarchy preserved;
- native `1200×550`: PASS after hardening;
- selected and long-copy roots: outside text `0`, text collisions `0`, proof-language `0`.

ADD-04:
- whole/read: paired reception-sign hierarchy preserved;
- native `740×1050`: date/location visibly improved while remaining secondary;
- selected/stress: outside text `0`, proof-language `0`; established title/bilingual-label bounding-box overlap remains optical-only with no visible glyph collision.

## What must remain item-specific

Do not transfer exact point sizes, ratios, fonts, ticket geometry, black-band composition, palettes, or bilingual treatment. Physical scale, viewing distance, copy meaning and layout reserve differ by item.

## Cross-item applicability

When a selected wedding paper artifact is visually strong at thumbnail/read scale, explicitly inspect the **smallest meaningful reader-facing copy** at native size before declaring visual completion. If that role is enlarged, rerun dynamic-copy/collision/safe-area evidence.

## Next receiving-item experiment

Apply this audit to another materially different non-Rurubu artifact only when a fresh native-size screenshot shows a meaningful secondary role that is visually fragile. Do not manufacture changes on healthy microcopy merely to reproduce the lesson.