# ADD-02 — semantic note-only QA

Date: 2026-08-20
State: `VERIFIED_LOCAL / SEMANTIC_NOTE_ONLY_PASS / SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS / LEGACY_PRESERVED / NOT_PRINT_READY`
Start authority SHA: `934d08457b81bc2e9541541c8e47a1a80f06bba6`

## Authority

- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Figma file: `LAZAZ0u3RGqtN4bYFPZ3pU`
- affected production roots: Hawaii `2:2`, France `2:20`, Spain `2:29`, Taiwan `2:38`
- Drive authority: `1KmbIncy5Wl6aEqqjBQmssCsw_KZjM62r / ADD-02_11卓の国別テーブルサイン`
- all other country roots unchanged.

## Visible problem

Live text readback found four signs still printing unsupported generic Japanese filler immediately before the unresolved country-note placeholder:

- Hawaii: `海・光・風を感じる卓`
- France: `石畳と光を感じる卓`
- Spain: `陽射しと色彩を感じる卓`
- Taiwan: `夜の光と路地のリズムを感じる卓`

These phrases were not authoritative final country-note copy. The current SPEC requires one native editable `TXT_COUNTRY_NOTE` role and explicitly prohibits invented factual travel history; Current also requires unresolved guest-facing values to remain semantic placeholders rather than internal/proxy text. Because each sign already contained `［国テーマ説明文］`, the extra filler duplicated the unresolved note role and made these four signs inconsistent with the seven signs that already used semantic-only note copy.

## Bounded comparison

Production was not edited during comparison. Rollback-safe QA clones were created:

- Hawaii `111:2`
- France `111:23`
- Spain `111:42`
- Taiwan `111:66`

Only the note characters were changed to `［国テーマ説明文］`; country title, Japanese label, table number, fixed art, print grain and geometry were unchanged.

The semantic-only versions were stronger at whole/read scale: the destination art and country identity carry the atmosphere, while the unresolved editorial note is represented truthfully instead of by generic proxy prose.

## Promotion / rollback

Full pre-change hidden rollbacks were created before selected mutation:

- Hawaii `112:2`
- France `112:23`
- Spain `112:42`
- Taiwan `112:66`

Promoted note nodes:

- Hawaii `21:218`
- France `21:277`
- Spain `21:299`
- Taiwan `21:324`

All now read exactly `［国テーマ説明文］`.

QA comparison roots were hidden after promotion. Retained production artwork and all other country signs remain untouched.

## Three-scale / structure QA

Fresh post-change evidence:

- Hawaii whole / 500×740 equivalent: PASS.
- Spain reading / 676×1000: PASS.
- Spain actual canvas `1000×1480`: rendered and checked.
- all four roots remain `1000×1480`.
- each root retains visible native text `4` and IMAGE fill `1`.
- visible text outside root: `0` for all four.
- visible text collisions: Hawaii `0`, France `0`, Spain `0`.
- Taiwan bounding boxes for note/large number overlap, but fresh `676×1000` screenshot shows no visible glyph collision; no optical geometry change was justified solely by bounds.
- variable/final note copy remains native editable text; no text was baked into raster/SVG.

## Asset decision

Image generation: `0`.
Drive writes: `0`.

The defect was unsupported proxy copy, not missing imagery. Existing country art and tiled print-grain IMAGE roles were preserved.

## Decision

`SEMANTIC_NOTE_ONLY_PASS`.

ADD-02 retains `SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS`. Final country descriptions remain deferred authoritative input and must replace the semantic placeholders later; do not invent them during visual polish.