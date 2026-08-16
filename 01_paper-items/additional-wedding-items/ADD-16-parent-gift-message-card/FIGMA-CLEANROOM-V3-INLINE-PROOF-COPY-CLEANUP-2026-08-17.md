# ADD-16 Parent Gift Message Card — V3 inline proof-copy cleanup

Status: `CLEANROOM_V3_SELECTED_CANDIDATE / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / GUEST_FACING_PLACEHOLDER_CLEANUP_PASS / LEGACY_PRESERVED / NOT_PRINT_READY`
Date: 2026-08-17
Start authority SHA: `57f5104757fd8e0c3197d0850b3e2ae1992ab155`

## Authority

- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- shared method: `NRSL-004` + neutral RSL-065 support
- Figma: `ylmVBbwNcnjueYrymNpa3c`
- selected V3: front `18:3`, back `18:14`
- Drive: `ADD-16_両親贈呈品メッセージカード` / `1BOyETtL1_loGXNjGV9S30sJKEhZNjd6O`
- retained legacy production: front `1:2`, back `1:13` — unchanged

## Visible defect

Fresh actual-size screenshots showed that the selected V3 still carried inline `LAYOUT DUMMY` implementation wording inside otherwise guest-facing semantic placeholders. The unresolved fields were appropriate, but the suffix weakened the emotional stationery hierarchy and made the card read like a proof sheet.

## Bounded change

Hidden rollback copies were created before editing:

- front rollback `22:2`
- back rollback `22:13`

Reader-facing lexical cleanup on selected V3:

- front `18:5`: `[家族への呼びかけ · LAYOUT DUMMY]` → `[家族への呼びかけ]`
- front `18:8`: `[任意の短い旅の比喩 · LAYOUT DUMMY]` → `[旅のひとこと]`
- front `18:12`: `[日付 · LAYOUT DUMMY]` → `[日付]`
- front `18:13`: `[新郎新婦署名 · LAYOUT DUMMY]` → `[ふたりの署名]`
- back `18:17`: `[家族への呼びかけ · LAYOUT DUMMY]` → `[家族への呼びかけ]`
- back `18:18`: `[感謝の主文 · LAYOUT DUMMY]` → `[感謝の言葉]`
- back `18:19`: `[任意の短い旅の比喩 · LAYOUT DUMMY]` → `[旅のひとこと]`
- back `18:22`: `[日付 · LAYOUT DUMMY]` → `[日付]`
- back `18:23`: `[新郎新婦署名 · LAYOUT DUMMY]` → `[ふたりの署名]`

No family composition, names, episodes, final gratitude copy, or gift facts were invented. Brackets continue to mark unresolved semantic content.

## QA

Post-change screenshots:

- front actual-size `700×1036`: PASS; recipient → gratitude headline → optional short line → horizon → date/signature remains intact without proof metadata;
- back actual-size `700×1036`: PASS; recipient/message/optional line/date/signature remain visibly provisional but reader-facing;
- front visible native text: `7`; IMAGE fills: `0`; outside text: `0`;
- back visible native text: `7`; IMAGE fills: `0`; outside text: `0`.

All changed strings became shorter. Existing hidden long-copy stress `18:26 / 18:37` remains retained and the selected layout geometry was not moved.

## Asset / Drive

Image generation: not required. This item remains stronger as native family stationery without synthetic family imagery.
Drive write: `0`; exact authority folder was read back successfully.

## Result

V3 retains `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS`. Legacy production remains untouched. Final copy, family-specific decisions, gift packaging/attachment method, vendor proof and print settings remain deferred; therefore the item stays `NOT_PRINT_READY`.
