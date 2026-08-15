# ADD-02 — Post-comparison V4 study rejection

Date: 2026-08-16
State: `REJECTED / POST_COMPARISON_CLEANROOM_CONTAMINATION / LEGACY_PRESERVED / PRODUCTION_UNCHANGED`

## Authority

- latest observed `main` immediately before this write: `627a1eb4abb852b2c75d5b797ff5c773b4dda405`
- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Figma: `LAZAZ0u3RGqtN4bYFPZ3pU`
- Drive authority: `1KmbIncy5Wl6aEqqjBQmssCsw_KZjM62r / ADD-02_11卓の国別テーブルサイン`

## What happened

During this run, older ADD-02 evidence from 2026-08-10 was initially read before the newer 2026-08-13 and 2026-08-15 authorities were reconciled. A bounded QA-family normalization was briefly applied to the retained QA snapshot `28:274`, then fully restored to its pre-run values after the newer authority showed that the repeated folio had already been intentionally de-templated in production.

The temporary Git evidence for that stale interpretation was also removed from current `main`. Production roots were never modified by that bounded mistake.

After the live production family had already been viewed for reconciliation, three new blank-frame V4 studies were authored for Italy / France / Japan. Although the frames were created without copying old nodes or assets, they were created **after the retained production visuals had been inspected in the same run**. Under the current clean-room mandate, they therefore cannot be treated as valid independent clean-room candidates.

## Rejected Figma study

QA section:

- `41:2 / REJECTED / ADD-02 / POST-COMPARISON V4 STUDY / CLEANROOM INVALID / 2026-08-16`
- Italy `41:3 / V4 / ITALY / MATERIAL INDEX CUTS`
- France `41:18 / V4 / FRANCE / TYPOGRAPHIC PAPER BANDS`
- Japan `41:33 / V4 / JAPAN / VERTICAL TYPE FIELD`

The section is retained hidden as failure evidence only. It is not a production candidate and must not be promoted or used as the visual parent of a future clean-room V4/V5.

Structural readback before rejection showed all three at `1000×1480`, native editable text, zero IMAGE fills and no visible text outside the roots. Structural validity does not override the clean-room process violation.

## Production / Drive safety

- production changed: `NO`
- legacy production deleted/overwritten: `NO`
- Drive writes: `0`
- generated/raster assets: `0`

## Failure fingerprint

`POST_COMPARISON_CLEANROOM_CONTAMINATION`

A candidate created after the retained visual has been inspected may be technically zero-reuse yet still fail the user's stronger clean-room requirement because the art direction is no longer independent enough to count as an unbiased alternative.

## Next safe method

For the next ADD-02 clean-room attempt:

1. start from latest Current and item facts/constraints only;
2. do not open retained ADD-02 production, retained family screenshots, V3, or this rejected V4 study before the new candidate is complete;
3. create the new direction from blank frames;
4. complete its own screenshot / structure / long-copy QA first;
5. only then open retained production for completion comparison.

Do not repeat the same post-comparison authoring mistake merely to advance activity.
