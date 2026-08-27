# Rurubu WEDDING V9 — Live Checkpoint 2026-08-27

Scope: V9 only.

## Live authorities

- Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
- Figma page: `2601:2 / 08_RURUBU_V9_RURUBU_POP_PRODUCTION`
- Drive pool/reference folder: `1xJ3HgV6c9ewP5Y2H2Dngsn-0k0C_oiup`
- GitHub main at run start: `2a3787e4cb6b5517e0c52c404a133e3185ed3ebf`

## 2026-08-27 editorial cleanup

### Cover `2601:3`

Observed issue: the top-right `結婚記念号 2026` marker still read as a rounded UI pill after the rest of the cover had been pushed toward print-editorial hierarchy.

Bounded change:

- kept the editable issue text `2601:14`;
- hid rounded background `2601:13`;
- recolored/right-aligned the issue text on the yellow masthead field;
- added thin editorial issue rule `2761:87`;
- saved hidden rollback `2761:2` before mutation.

Screenshot QA: PASS. The issue line now reads as masthead metadata rather than a button while the Rurubu-like hero badges, title and photo hierarchy remain intact.

### Memory + Gallery `2601:7`

Observed issue: after earlier taxonomy-label subtraction, the three colored rules remained visible with no labels, creating orphan decoration at the bottom of the page.

Bounded change:

- hid orphan mini-rule containers `2609:125`, `2609:127`, `2609:129`;
- moved editable footer `2609:133` to `y=1046`;
- added one restrained full-width editorial footer rule `2757:93` to bind the note and footer;
- saved hidden rollback `2757:2` before mutation.

Screenshot QA: PASS. The page now closes as `gallery → closing copy → note → publication footer` without meaningless color fragments.

## Structural QA

PASS across all six current production frames:

- A4 size: `794×1123` × 6
- visible replaceable photo masks: `4 / 3 / 2 / 2 / 6 / 5` = 22
- corresponding visible frame overlays: `4 / 3 / 2 / 2 / 6 / 5` = 22
- photo/frame geometry mismatches: 0
- visible overflow outside page bounds: 0
- visible text below 10.5 px: 0
- visible rollback nodes: 0
- page flattening introduced: none

Per-page minimum visible font sizes after this pass:

- Cover: 15 px
- Back Cover: 12 px
- Profile + Q&A: 13 px
- Story + Timeline: 14 px
- Memory + Gallery: 13 px
- 1DAY + Cafe/Table: 14 px

## Current design decision

`VERIFIED_LOCAL`: subtraction must be completed semantically. If a label is removed because it duplicates other information, any rule/rail that existed only to support that label must also be re-evaluated; otherwise the page retains orphan decoration without editorial meaning.

Cover metadata can retain useful issue/date information while dropping rounded containment when the surrounding masthead already provides a strong field. This reduces UI grammar without reducing information density.

No new generated assets were added in this pass. Existing Drive assets remain optional; readability, hierarchy, page rhythm and photo structure continue to override asset consumption.

## Next target

1. keep Cover / Memory changes unless whole-publication comparison exposes a regression;
2. inspect remaining dummy-photo repetition/crop only where it materially weakens hierarchy;
3. preserve Back Cover and Story as quieter pages unless a concrete scan-path problem appears;
4. defer missing-asset generation until the assembled six-page set exposes specific gaps;
5. final real-content / print-ready status remains blocked on final real photography/copy and printer bleed/trim/preflight/physical proof.
