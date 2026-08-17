# Non-Rurubu Figma Quality — Current Authority

Status: `ACTIVE / HOURLY / FIGMA_EDIT_ALLOWED / VISUAL_REOPENED`
Authority: `m-shogo/wedding-project` latest `main`
Scope: non-Rurubu wedding paper / sign design quality only

This document is the Current entry point for the scheduled **non-Rurubu Figma quality-improvement task**. Within this scope it supersedes older automation text that says `FIGMA_PROHIBITED` or permanently excludes the non-Rurubu core paper items from design QA. It does not supersede the separate Rurubu authority.

## Explicit visual rejection override — 2026-08-09

The user explicitly judged the current non-Rurubu visual quality as too low / too ugly and requested stronger image-generation-assisted art direction. Therefore **previous `DESIGN_QA_PASS_WITH_PLACEHOLDERS` states are not sufficient evidence of sellable visual quality by themselves**.

For this quality pass:

- reopen every non-Rurubu target for a second visual-art-direction audit, even if earlier structural QA passed;
- keep prior structure/readability/long-copy/rollback evidence, but do not treat it as proof that the composition is attractive;
- a user-level visual rejection invalidates the visual-completion portion of an earlier PASS without invalidating verified factual or structural evidence;
- do not stop the scheduled task merely because all items once had PASS labels;
- create a materially different clean-room comparison when the current design looks templated, sparse, generic, web-UI-like, or obviously AI-assisted;
- prefer a few large, high-value composition changes over repeated one-pixel or decoration-only polish;
- the completion target is now `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS`, not structural PASS alone.

## Clean-room rebuild mandate — 2026-08-15

The user explicitly changed the production strategy for the non-Rurubu suite: **new V2/V3 work must be rebuilt from zero and must not reuse design items from the previous production. The previous production must remain intact as reference / rollback history.**

This is now a hard authoring rule for the reopened visual pass:

- do **not** duplicate an old frame and merely restyle it as the new V2/V3;
- do **not** copy old layout groups, ornamental vectors, cards, rails, badges, icons, decorative text blocks, image crops, background compositions, or generated assets into the new clean-room version;
- do **not** use the old production as a component library;
- preserve old production, old V2/V3, prior QA boards, rollback copies, and historical evidence in place unless a later explicit cleanup instruction says otherwise;
- use the previous production only as a comparison/reference artifact for facts, content roles, dimensions, constraints, and failure analysis;
- verified factual content and verified structural constraints may be re-entered manually in the new version, but the **visual construction itself must start from a blank clean-room frame**;
- item facts, exact dimensions, printer constraints, semantic roles, maximum 7 guests/table, final-known schedule values, and other verified non-visual requirements are not considered forbidden “design reuse”; they are requirements to be re-authored into the new design;
- each V2 clean-room direction must establish its own composition, typography system, fixed-art treatment, image/SVG strategy, spacing rhythm, and physical-paper logic from scratch;
- if V2 is not clearly better at whole-item / reading / actual-size scales, keep the old production untouched and iterate as V3 rather than mutating the old version;
- promote a clean-room version to production only after it clearly beats the retained previous production and passes the current visual + structural gates.

### Hybrid authoring for clean-room rebuilds

Apply the latest AI + Figma hybrid authoring policy while rebuilding from zero:

- variable copy and facts: native editable Figma text;
- replaceable photography: stable mask / replaceable image role;
- reusable flat graphic roles where editability is valuable: clean editable SVG;
- fixed decorative art, paper fields, collage, background treatments, illustration fragments, and non-variable visual support: generated/composed assets are allowed and encouraged when they improve the result;
- do not rebuild fixed artwork out of dozens of low-value Figma primitives merely to maximize editability;
- do not bake variable names, menu items, times, venue facts, directions, QR destinations, table assignments, or guest information into SVG/raster assets.

Where SVG is appropriate, distinguish:

1. **High Fidelity SVG** — visual-truth reference;
2. **Clean Editable SVG** — working master optimized for sane Figma editing;
3. **Final Candidate** — preserves editability while closing the visual gap to the high-fidelity reference.

Use overlay/diff, small-size review, and Figma editability QA before calling an SVG final.

## Exclusive boundary

Rurubu WEDDING is owned by a separate scheduled task. The non-Rurubu task must not read, edit, regenerate, relink, QA, or write any Figma file/page/node, Drive item, GitHub item-specific document, asset, or path whose name/file key/page name/path contains `RURUBU` or `るるぶ`.

Do not use broad searches likely to sweep the Rurubu area. Use exact non-Rurubu file keys, Drive IDs, and item-specific paths whenever possible.

## Schedule separation

- Rurubu task: hourly at minute `00`.
- Non-Rurubu Figma quality task: hourly at minute `30`.
- Do not change the Rurubu schedule from this task.
- Prefer item-specific GitHub QA/status writes rather than shared Rurubu/global logs to reduce concurrent-write conflicts.

## Included production targets

Audit and improve the live Figma production designs in this order. Because of the explicit visual rejection above, previous PASS labels do **not** skip the second visual pass automatically:

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
- repeated equal boxes/grids that resemble admin dashboards rather than editorial print;
- meaningless badges, planes, stamps, pills, labels, icons, gradients, shadows, glow, or decorative microcopy;
- uniform spacing everywhere without optical adjustment;
- generic hero blocks and stock-template hierarchy;
- fake interface controls or fake transport data;
- excessive English filler used only as decoration;
- dense decoration added to compensate for weak typography;
- blank-looking layouts that mistake emptiness for premium minimalism.

Prefer:

- item-specific art direction and authentic print/editorial references;
- strong Japanese typography, optical alignment, intentional hierarchy and rhythm;
- controlled asymmetry and meaningful negative space;
- actual-size readability and realistic paper/trim/fold/punch/stand constraints;
- restrained, purposeful travel-theme cues rather than literal motif repetition;
- native editable text/vector for variable information;
- non-destructive image crops and replaceable media roles;
- coherent family resemblance across the wedding suite without forcing every item into one layout system;
- clean-room alternatives when the current composition would not be chosen if it did not already exist.

## Image-generation-assisted art direction

Image generation is allowed and encouraged **when it materially improves the print design**, but it is not a quota and must not be used to decorate every item.

Good generation targets include:

- subtle paper / print / archival texture masters;
- non-person travel editorial illustration;
- abstract map / contour / landscape / destination atmosphere;
- botanical, architectural, coastal, night-sky, food-ingredient, or location-inspired non-factual visual motifs when appropriate;
- collage fragments, edge treatments, background fields, engraving-like ornaments, or photographic-style non-person B-roll that support the specific item;
- missing hero/background assets whose absence makes the composition feel generic or unfinished.

Do not generate:

- the bride, groom, family, friends, guests, children, or dog as if they were real;
- fake guest photos or fake documentary wedding moments;
- final names, QR codes, menu text, room names, times, table assignments, transport credentials, or other variable/factual copy baked into pixels;
- generic stock-looking airplane/passport/stamp imagery merely because the wedding theme is travel.

Generated-asset workflow:

1. diagnose a screenshot-supported visual weakness first;
2. write an item-specific asset role brief with aspect ratio, text-safe area, palette, subject and negative constraints;
3. generate multiple enough candidates to make a real editorial choice when the tool permits, not multiple near-identical decorative variants;
4. reject obvious AI artifacts, generic stock feel, fake lettering, fake UI, bad geometry, and identity risk;
5. save only adopted or serious comparison candidates to the exact non-Rurubu Drive authority location;
6. read back Drive metadata/ID;
7. place the asset non-destructively in a replaceable Figma image role;
8. verify screenshot quality at whole / reading / actual-size detail scales;
9. keep native text and semantic overlays separate from raster imagery;
10. record provenance and adoption/rejection in item-specific GitHub evidence.

If an item does not need imagery, improve it through typography, composition, paper logic and native vector structure instead of forcing generated art into it.

## Sellable visual gate

An item may only regain visual completion when the second-pass review confirms all of the following:

- the composition would plausibly be sold as a professional wedding stationery product, not merely accepted as functional;
- no obvious AI-template/admin-dashboard/web-card impression remains at thumbnail scale;
- hierarchy and Japanese typography remain convincing at reading scale;
- actual-size typography, rules, image detail and print density are credible;
- there is a clear item-specific art direction rather than a shared generic template;
- if the existing design was visually rejected, at least one materially different comparison was evaluated before re-adopting a legacy-like structure;
- generated imagery, when used, has passed artifact/provenance/identity review and does not carry variable copy;
- the design still passes native editability, long-copy, safe-area, rollback and authority checks.

Use `SELLABLE_VISUAL_QA_PASS` only when those conditions are actually evidenced.

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
4. judge whether the design would still be chosen if it did not already exist;
5. identify the highest-value visible or structural defect;
6. for the reopened rebuild program, create a **blank-frame clean-room V2 from zero** rather than duplicating or restyling old production;
7. decide per role whether the rebuild should use native text, editable SVG, replaceable image, or generated/composed fixed artwork;
8. preserve old production unchanged as retained comparison/reference;
9. capture screenshot QA for both old retained production and new V2 at whole / reading / actual-size scales;
10. perform structural readback for native text, semantic roles, overflow, crop/editability, safe area, and unintended flatten/rasterization;
11. test long text and long names where applicable;
12. for seating content, use **maximum 7 guests per table** and never expand the QA model to 8;
13. if V2 does not clearly win, keep both and iterate as V3 from a fresh clean-room direction rather than degrading the old production;
14. record only verified results in item-specific GitHub QA/status evidence.

Unknown guest names, menu copy, times, room names, directions, QR destinations, venue instructions, children information, etc. must remain explicit native/editable semantic placeholders such as `[会場名]`, `[方向]`, `[料理名]`, `[国テーマ説明]`, or another item-specific field label. Do not invent realistic names or facts. Keep implementation state in node names, hidden QA/rollback layers, and GitHub evidence; do **not** print internal authoring suffixes such as `LAYOUT DUMMY`, `DUMMY`, `QA`, `PROOF`, `TEMP`, `editable`, or `native text` into guest-facing copy unless the term itself has a genuine reader-facing meaning.

## Progression rule

Do not spend repeated hourly runs on tiny decoration changes once major quality defects are closed. During this reopened visual pass, an earlier structural PASS is not enough. Progress to the next item after the target has both:

- `DESIGN_QA_PASS_WITH_PLACEHOLDERS`, and
- `SELLABLE_VISUAL_QA_PASS` from the reopened art-direction audit.

Retain `NOT_PRINT_READY` until physical/vendor checks are actually complete.

One run may improve multiple items when safe. Do not limit a run to one cosmetic change. If one item is blocked only on formal input, continue to another safe target rather than stopping the whole visual pass.

## Drive and asset policy

Change or add Drive assets only for a concrete screenshot-supported defect, a truly missing required production asset, or an image-generation role explicitly justified by the reopened visual audit. Avoid duplicate candidates and unnecessary regeneration. Read back metadata after a Drive write. Do not bake guest names, QR codes, final menu text, room/direction facts, or other variable content into raster images.

Never AI-generate a bride, groom, family member, friend, guest, child, or dog and present it as the real person/animal.

## Git conflict policy

Immediately before each Git write, re-read latest `main` and the target path. If another task changed the target, reconstruct the intended delta on top of the latest state. Never force push, rewrite history, or roll back unrelated work. Keep commits small and item-specific, and verify commit/readback.

## Deferred work

Physical proof, final names/copy, confirmed QR, official venue directions, printer templates/profiles, installation measurements, real-package attachment tests, and other unavailable final inputs must be recorded item-by-item as `DEFERRED_FINALIZATION` or `BLOCKED_REQUIRED_INPUT`. They do not block progression to the next design.

## Reporting

Report only meaningful verified progress, a new important blocker, or completion-state advancement. Include target, start SHA, visible issue, actual Figma change, generated-asset use/adoption/rejection if any, screenshot QA, structure QA, Drive change, Git commit SHA, newly deferred input, and next target. If there is no meaningful change, report `NO_CHANGE` concisely and do not repeat the same blocker every hour.
