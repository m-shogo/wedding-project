# NRSL — Inline implementation suffixes should not compete with semantic placeholders

Source scope/items: non-Rurubu / ADD-13 message card, ADD-14 after-party guide, ADD-16 parent gift message card

State: `VERIFIED_CROSS_ITEM`

## Visible problem

After standalone proof/status labels had already been removed, three materially different selected clean-room artifacts still showed `LAYOUT DUMMY` inline inside otherwise valid semantic placeholders. The unresolved roles themselves were truthful and necessary, but the implementation suffix remained visible at guest-facing scale and made the design look like a template/proof sheet.

Examples included:

- `[テーマ · LAYOUT DUMMY]`
- `[会場名 · LAYOUT DUMMY]`
- `[家族への呼びかけ · LAYOUT DUMMY]`
- `[感謝の主文 · LAYOUT DUMMY]`

## Root cause

Semantic uncertainty and implementation terminology were encoded in the same visible string.

The production requirement is to keep unresolved content explicit, editable and non-fabricated. That can be satisfied by artifact-native bracketed placeholders or field labels without printing internal authoring terms such as `DUMMY`, `QA`, `PROOF`, `TEMP`, or `native text` into the guest-facing hierarchy.

This is consistent with the previously verified `NRSL-004` lexical-layer principle and independently supported by neutral RSL-065. No Rurubu layout, asset, palette, production node or item-specific current state was copied.

## Bounded cross-item tests

### ADD-13 / selected V6

- Figma: `8ad7bEPAc8I88gs1JxsWhe`
- selected roots: front `27:3`, back `27:4`
- hidden rollbacks: `35:2 / 35:20`
- changed only placeholder wording such as `[任意テーマ · LAYOUT DUMMY] → [テーマ]`, name/date proof suffix removal, and equivalent back-face roles;
- post-change: front native text `5`, back `4`, IMAGE `0`, outside text `0`;
- evidence commit: `b40bc4e778ce57a9e195bc7a202034a76236eafe`.

### ADD-14 / selected V3 A6+A5

- Figma: `IygEr140Yqk12LsGL3TFrT`
- selected roots: `32:3 / 32:29`
- hidden rollbacks: `39:2 / 39:29`
- `[会場名 · LAYOUT DUMMY] → [会場名]`
- `[住所・階数 · LAYOUT DUMMY] → [住所・階数]`
- post-change: A6/A5 native text `16`, IMAGE `0`, outside text `0`;
- evidence commit: `57f5104757fd8e0c3197d0850b3e2ae1992ab155`.

### ADD-16 / selected V3

- Figma: `ylmVBbwNcnjueYrymNpa3c`
- selected roots: front `18:3`, back `18:14`
- hidden rollbacks: `22:2 / 22:13`
- artifact-native lexical cleanup included `[感謝の主文 · LAYOUT DUMMY] → [感謝の言葉]`, `[任意の短い旅の比喩 · LAYOUT DUMMY] → [旅のひとこと]`, and removal of the implementation suffix from recipient/date/signature roles;
- post-change: front/back native text `7`, IMAGE `0`, outside text `0`;
- evidence commit: `90fb8b03ae981c9547ac0fa74eddf8cc5f0f1ceb`.

## Expected improvement

Keep unresolved values visually honest while allowing the stationery/sign itself to read like a real product rather than an authoring interface.

## Regression risk

Do **not** remove the unresolved role itself. A bracketed semantic placeholder such as `[会場名]`, `[テーマ]`, `[日付]`, `[感謝の言葉]`, or another item-specific equivalent must remain when the final value is not authoritative.

Do not simplify two different unresolved roles into the same vague label if editors need to distinguish them. Do not invent natural-looking final values just to remove placeholder appearance.

## Three-scale applicability

Across the three items, prior clean-room whole/reading/actual-size gates remained intact. This bounded change only shortened guest-facing placeholder strings; fresh screenshots and structural readback reconfirmed no overflow and no image/geometry regression.

## Cross-item default

When a selected print candidate contains an unresolved field:

1. keep the field native/editable;
2. keep uncertainty explicit with a concise artifact-native placeholder or field label;
3. keep implementation state in node names, evidence and QA—not in the guest-facing sentence;
4. rollback-safely remove inline `DUMMY / QA / PROOF / TEMP / editable / native text` wording when it has no reader-facing meaning;
5. rerun screenshot and structure QA after the lexical change.

Exact wording, typography, geometry, palette and hierarchy remain item-specific.
