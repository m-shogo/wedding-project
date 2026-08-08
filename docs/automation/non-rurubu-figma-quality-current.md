# Non-Rurubu Figma Quality — Current Authority

Status: `ACTIVE / HOURLY / FIGMA_EDIT_ALLOWED`
Authority: `m-shogo/wedding-project` latest `main`
Scope: non-Rurubu wedding paper / sign design quality only

This document is the Current entry point for the scheduled **non-Rurubu Figma quality-improvement task**. Within this scope it supersedes older automation text that says `FIGMA_PROHIBITED` or permanently excludes the non-Rurubu core paper items from design QA. It does not supersede the separate Rurubu authority.

## Exclusive boundary

Rurubu WEDDING is owned by a separate scheduled task. The non-Rurubu task must not read, edit, regenerate, relink, QA, or write any Figma file/page/node, Drive item, GitHub item-specific document, asset, or path whose name/file key/page name/path contains `RURUBU` or `るるぶ`.

Do not use broad searches likely to sweep the Rurubu area. Use exact non-Rurubu file keys, Drive IDs, and item-specific paths whenever possible.

## Schedule separation

- Rurubu task: hourly at minute `00`.
- Non-Rurubu Figma quality task: hourly at minute `30`.
- Do not change the Rurubu schedule from this task.
- Prefer item-specific GitHub QA/status writes rather than shared Rurubu/global logs to reduce concurrent-write conflicts.

## Included production targets

Audit and improve the live Figma production designs in this order, while skipping only items whose live evidence already meets the completion threshold:

1. WEDDING PASSPORT
2. BOARDING PASS
3. 青春ふたりきっぷ
4. ADD-01 ウェルカムボード
5. ADD-02 11卓の国別テーブルサイン
6. ADD-03 当日タイムテーブルボード
7. ADD-04 受付サイン
8. ADD-05 サンキュータグ / プチギフトタグ
9. ADD-06 フォトブースサイン
10. ADD-07 エスコートカード案内ボード
11. ADD-08 メニュー補助サイン
12. ADD-09 Guest Bookサイン
13. ADD-10 会場案内サイン
14. ADD-11 写真共有 / QR案内
15. ADD-12 新郎新婦クイズカード
16. ADD-13 メッセージカード
17. ADD-14 二次会案内
18. ADD-15 料理紹介 / 国テーマ説明カード
19. ADD-16 両親贈呈品メッセージカード
20. ADD-17 子ども向けミニカード / ぬりえ

ADD-17 may be designed as an age-independent neutral editable template, but final adoption remains `BLOCKED_REQUIRED_INPUT` until authoritative attendance/count/age information exists.

## Quality target

The target is **professional, sellable print-product quality with no obvious AI-generated/template feel**. Existing design is not protected merely because it already exists. Preserve verified facts, provenance, semantic structure, native editability, and rollback history, but redesign composition when the live visual quality warrants it.

Remove or avoid common AI/template signals when they do not serve the item:

- mechanically centered or overly symmetric composition;
- repeated equal rounded cards and web-UI-like panels;
- meaningless badges, planes, stamps, pills, labels, icons, gradients, shadows, glow, or decorative microcopy;
- uniform spacing everywhere without optical adjustment;
- generic hero blocks and stock-template hierarchy;
- fake interface controls or fake transport data;
- excessive English filler used only as decoration;
- dense decoration added to compensate for weak typography.

Prefer:

- item-specific art direction and authentic print/editorial references;
- strong Japanese typography, optical alignment, intentional hierarchy and rhythm;
- controlled asymmetry and meaningful negative space;
- actual-size readability and realistic paper/trim/fold/punch/stand constraints;
- restrained, purposeful travel-theme cues rather than literal motif repetition;
- native editable text/vector for variable information;
- non-destructive image crops and replaceable media roles;
- coherent family resemblance across the wedding suite without forcing every item into one layout system.

## Every-run live authority contract

At the start of every run and again immediately before any write:

1. read latest GitHub `main` and this Current document;
2. read the target item's latest item-specific status/QA/ledger only;
3. verify the exact target Figma file key/page/node live;
4. verify the exact target Google Drive folder/file ID live;
5. if authority is ambiguous or live references disagree, investigate but do not edit the wrong file.

Past chat reports are search hints only, never completion evidence.

## Improvement loop

For each target:

1. inspect whole-item/thumbnail scale;
2. inspect reading scale;
3. inspect actual-size/detail scale;
4. identify the highest-value visible or structural defect;
5. preserve a rollback-safe duplicate/proof before material edits;
6. edit the Figma production design with native semantic layers;
7. capture screenshot QA after the edit;
8. perform structural readback for native text, semantic roles, overflow, crop/editability, safe area, and unintended flatten/rasterization;
9. test long text and long names where applicable;
10. for seating content, use **maximum 7 guests per table** and never expand the QA model to 8;
11. record only verified results in item-specific GitHub QA/status evidence.

Unknown guest names, menu copy, times, room names, directions, QR destinations, venue instructions, children information, etc. must use explicit semantic placeholders such as `[... · LAYOUT DUMMY]` as native editable text. Do not invent realistic names or facts.

## Progression rule

Do not spend repeated hourly runs on tiny decoration changes once major quality defects are closed. When an item has:

- no major visible defect at whole/reading/detail scale;
- native editable semantic structure;
- acceptable long-text tolerance;
- rollback evidence;
- Git/Drive/Figma authority consistency;
- only final wording, physical proof, vendor template, attachment, or other formal input pending;

mark it `DESIGN_QA_PASS_WITH_PLACEHOLDERS` and move immediately to the next item, while retaining `NOT_PRINT_READY` until physical/vendor checks are actually complete.

One run may improve multiple items when safe. Do not limit a run to one cosmetic change.

## Drive and asset policy

Change or add Drive assets only for a concrete screenshot-supported defect or a truly missing required production asset. Avoid duplicate candidates and unnecessary regeneration. Read back metadata after a Drive write. Do not bake guest names, QR codes, final menu text, room/direction facts, or other variable content into raster images.

Never AI-generate a bride, groom, family member, friend, guest, or dog and present it as the real person/animal.

## Git conflict policy

Immediately before each Git write, re-read latest `main` and the target path. If another task changed the target, reconstruct the intended delta on top of the latest state. Never force push, rewrite history, or roll back unrelated work. Keep commits small and item-specific, and verify commit/readback.

## Deferred work

Physical proof, final names/copy, confirmed QR, official venue directions, printer templates/profiles, installation measurements, real-package attachment tests, and other unavailable final inputs must be recorded item-by-item as `DEFERRED_FINALIZATION` or `BLOCKED_REQUIRED_INPUT`. They do not block progression to the next design.

## Reporting

Report only meaningful verified progress, a new important blocker, or completion-state advancement. Include target, start SHA, visible issue, actual Figma change, screenshot QA, structure QA, Drive change, Git commit SHA, newly deferred input, and next target. If there is no meaningful change, report `NO_CHANGE` concisely and do not repeat the same blocker every hour.
