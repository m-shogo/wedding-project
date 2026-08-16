# ADD-16 両親贈呈品メッセージカード — Clean-room V2 Origin Letter QA

Status: `CLEANROOM_V2_STRUCTURAL_PASS / LONG_COPY_STRESS_PASS / LEGACY_COMPARISON_MIXED / NO_PROMOTION / LEGACY_PRESERVED`
Date: 2026-08-17
Start authority SHA: `dbb77a03efcce32ca94b73acedaa60f040a3056f`

## Authority

- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Figma file: `ylmVBbwNcnjueYrymNpa3c`
- Drive folder: `ADD-16_両親贈呈品メッセージカード` / `1BOyETtL1_loGXNjGV9S30sJKEhZNjd6O`
- retained production: front `1:2`, back `1:13`
- clean-room page: `17:2 / CLEANROOM / ADD-16 / V2 ORIGIN LETTER / 2026-08-17`
- V2 front: `17:3`
- V2 back: `17:20`
- hidden front stress: `17:33`
- hidden repaired back stress: `17:64`

## Clean-room contract

The V2 front/back were created from blank 100×148mm-proportional frames before visually opening retained production. No retained production node, old layout group, ornament, image, crop, badge, icon, route, or fixed art was duplicated.

Only verified non-visual requirements were carried forward: postcard-class proportions, front/back gift-message roles, 8mm safe-area intent, native editable recipient/message/date/signature roles, optional handwritten-signature role, and the prohibition on inventing family names/relationships/episodes/gift details.

## Hybrid authoring split

- recipient/message/date/signature: native editable text;
- unresolved family-specific copy: semantic native placeholders + small `LAYOUT DUMMY` proof metadata;
- handwritten signature: native replaceable handwriting area;
- fixed decoration: one simple origin field, pause rule and origin mark;
- image fills: `0`;
- generated imagery: not required;
- SVG: not required for this direction.

## Clean-room direction

V2 uses an asymmetric `ORIGIN LETTER` grammar: a narrow dark origin field on the front, open editorial text mass, and a separate back writing surface. It deliberately avoids passport/ticket UI, equal cards, photo simulation, family-photo generation, hearts, planes, decorative badges, or rasterized variable copy.

## Three-scale / structure QA

Front and back were reviewed at whole-item and actual-size screenshot scale. Native structure remains editable and contains no IMAGE fills.

The front long-copy stress uses a long recipient line, long gratitude message, optional metaphor, full date, and long couple signature. Screenshot QA shows no trim escape or visible collision.

The initial back stress exposed a real internal collision: the long couple signature wrapped downward into the optional handwritten-signature area. V2 was not treated as complete. The signature text, proof metadata and handwriting field were then coupled in native vertical auto-layout `GROUP / SIGNATURE STACK`.

Repaired back stress results:

- visible text outside root: `0`;
- signature stack: `y=752`, `h=220`, bottom `972 / 1036`;
- long body copy remains readable;
- long signature pushes the handwriting field structurally rather than overlapping it.

This verifies the repair visually and structurally rather than relying on legacy long-copy evidence.

## Legacy comparison

Only after V2 and both long-copy stresses were complete were retained production front `1:2` and back `1:13` opened.

Result: `LEGACY_COMPARISON_MIXED`.

- V2 provides a materially different front/back grammar and stronger dynamic signature resilience.
- retained production remains very strong in concise Japanese headline hierarchy and artifact-level restraint.
- V2 is not a clear whole-item sellable winner over retained production.
- no promotion is made and retained production remains untouched.

## Drive

Live Drive folder readback:

- `1BOyETtL1_loGXNjGV9S30sJKEhZNjd6O`
- no image/generated asset required;
- Drive write: `0`.

## Decision

Keep V2 as clean-room comparison evidence only. Do not promote over retained production.

If a later clean-room direction is justified, it must start from a new blank frame in a fresh uncontaminated run rather than cosmetically iterating this `ORIGIN LETTER` grammar after legacy comparison.
