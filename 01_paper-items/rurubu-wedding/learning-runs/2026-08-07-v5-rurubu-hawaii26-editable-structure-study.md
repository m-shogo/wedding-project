# Rurubu V5 — Hawaii '26 editable cover structure study

Date: 2026-08-07
Status: `DISCOVERED → PROTOTYPED / NOT_CURRENT / CLEAN_ROOM_REFERENCE_STUDY`
Scope: Rurubu WEDDING V5 only

## User direction

The user requested a much stronger Rurubu-like direction: information-dense, lively, intentionally cluttered, but visually unified. They also requested that a real Rurubu cover be studied closely enough that the same structure can be reproduced as a fully editable Figma template with swappable photos and copy.

## Reference researched

Primary reference:
- JTB Publishing official: `るるぶハワイ'26`
- official product page: https://books.jtbpublishing.co.jp/e-book/60001-202506145525-000/
- official small-size page confirming the regular size is 25.7 × 21 cm: https://books.jtbpublishing.co.jp/book/60001-202506147077-000/

Observed cover structure from the published cover image:
- bright full-page pink field
- narrow top bonus strip
- stacked series mark at upper left
- small English destination/theme kicker above a very large central destination title
- bright year burst near the title
- one dominant central hero photograph
- direct feature copy on the pink field, rather than every copy group living inside a card
- a narrow right-side vertical feature ribbon
- overlapping/supporting photo strip near the bottom
- circular supplement/map badge
- dense but strongly role-coded color system

This is used as a structural/editorial study. Published photography and trademark/logo artwork are not copied into production. Production content remains native/editable and wedding-specific.

## Hypothesis

A closer structural study of a real Rurubu cover will outperform generic 'travel magazine' styling because the Rurubu feel comes from specific hierarchy and density relationships, not simply bright colors or decorative stickers.

The template must remain swappable:
- hero photo as a semantic IMAGE slot
- three supporting photos as separate IMAGE slots
- every headline, label, badge, and utility line as native Figma text/vector/shape
- no baked wedding copy inside generated imagery

## Prototype 1

Figma frame:
- `376:2 / V5_RURUBU_HAWAII26_EDITABLE_STRUCTURE_TEMPLATE_2026_08_07`

Replaceable IMAGE slots:
- `376:17 / IMG_SLOT_HERO_REPLACE_ME__560x470`
- `376:24 / IMG_SLOT_BOTTOM_1_REPLACE_ME__205x160`
- `376:25 / IMG_SLOT_BOTTOM_2_REPLACE_ME__205x160`
- `376:26 / IMG_SLOT_BOTTOM_3_REPLACE_ME__205x160`

All typography is native Figma text using Noto Sans JP. Current V5 and rollback frames were untouched.

### Rejected aspect of prototype 1

The large `FEATURE_SIDE_PLATE` became another card/container and drifted away from the real reference, whose left feature copy is much more directly integrated with the page field. It also made the cover feel like a UI tile rather than a dense travel guide.

## Prototype 2

Figma frame:
- `377:40 / V5_RURUBU_HAWAII26_EDITABLE_STRUCTURE_TEMPLATE_V2_2026_08_07`

Changes from V1:
- hide the large feature side plate
- place left feature copy directly on the pink field
- enlarge/reassert the hero image
- tighten the right vertical ribbon
- separate bottom photo strip, caption tags, and supplement badge
- preserve all semantic IMAGE slots and native text

### Current result

V2 is materially closer to the real Rurubu information hierarchy than earlier V5 minimal/editorial experiments. It has stronger visual abundance and a more authentic magazine-cover rhythm while remaining fully editable.

However, it is still a prototype, not Current. Remaining weaknesses:
- the top title cloud is still simplified and too clean
- the left feature copy is not yet typographically lively enough
- the right vertical copy is mechanically stacked rather than elegantly vertical/rotated
- the lower photo strip needs more authentic crop/overlap/caption tension
- the wedding-specific masthead system should be unified without copying the commercial Rurubu logo artwork

## Failure memory

Two atomic Figma failures occurred and did not mutate Current:
1. attempted to set unsupported `description` on a Rectangle node
2. attempted text size mutation before loading `Noto Sans JP Bold`

Process rule reinforced:
- semantic replacement guidance belongs in node naming / external ledger unless the node type supports descriptions
- load every current text font before any text property mutation

## Learning state

`PROTOTYPED / REFERENCE_STRUCTURE_USEFUL / NOT_VERIFIED / NOT_PROJECT_RULE`

Do not promote 'copy a commercial cover exactly' as a permanent project rule. Promote only the verified structural principles after comparison.

## Next application

1. build a second real-reference template from a different Rurubu cover family (e.g. Yokohama/local-city composition)
2. compare Hawaii-reference template, local-city reference template, and existing V5 at whole-cover scale
3. use the winning information architecture to rebuild the full WEDDING cover without inheriting legacy V5 geometry
4. keep all photography and copy replaceable
5. only after 3-scale QA may any clean-room candidate replace Current
