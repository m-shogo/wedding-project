# ADD-02 France — table-number redundancy QA

Date: 2026-08-24
State: `VERIFIED_LOCAL / CURRENT_POLISH_ADOPTED / ROLLBACK_SAFE / NOT_PRINT_READY`
Authority: `docs/automation/non-rurubu-figma-quality-current.md`
Start/latest main immediately before this evidence write: `86636f42722f728acad23f76872961e506dac32c`
Figma file: `LAZAZ0u3RGqtN4bYFPZ3pU`
Production root: `2:20 / FRAME_TABLE_SIGN_FRANCE`
Drive authority: `1KmbIncy5Wl6aEqqjBQmssCsw_KZjM62r / ADD-02_11卓の国別テーブルサイン`
Image generation: `0`
Drive write: `0`

## Visible issue

Fresh whole-item review of the current Destination V4 family found that France printed the table number twice:

- top-left native label: `TABLE 03`;
- large tilted lower paper field: `03`.

The large `03` already carries the table-number recognition role at whole-item and reading scales. The extra `TABLE 03` behaved as duplicate microcopy rather than a separate functional cue.

This is intentionally not generalized to the other ten signs. Live Plugin API readback showed that most other destinations still use their small `TABLE xx` label as the only table-number cue. Taiwan uses the large `05` directly; France was the current root with a clearly duplicated small and large table-number treatment.

## Authority drift discovered while auditing

The canonical `QA.md` still described an older pre-V4 state in which top `TABLE 01`–`TABLE 11` labels had been removed and one print-grain IMAGE role remained per sign. That statement no longer matches the family promoted on 2026-08-21:

- current Destination V4 roots have `IMAGE fills = 0`;
- current table-number treatment is destination-specific rather than one family-wide rule;
- nine roots retain a small `TABLE xx` cue as their actual table-number role;
- Taiwan uses a large `05` without a small `TABLE 05` label;
- France had both `TABLE 03` and a large `03` before this bounded subtraction.

The 2026-08-21 promotion evidence remains the correct structural reference for the current family. Canonical QA must be reconciled so a future run does not mechanically hide the functional table-number labels on the other signs.

## Bounded Figma change

Before production mutation, the entire France root was cloned as a hidden rollback:

- rollback: `176:2 / ROLLBACK / ADD-02 FRANCE / PRE_TABLE03_REDUNDANCY_SUBTRACTION / 2026-08-24`

Only one production node was changed:

- `173:67 / TEXT / TABLE NUMBER / "TABLE 03"` → `visible=false`.

Retained unchanged:

- `173:73 / DECOR / BIG NUMBER / "03"`;
- FRANCE / フランス destination typography;
- `[国テーマ見出し]` and `[国テーマ説明]` native placeholders;
- date;
- architectural fields, red horizon rule and yellow lower field;
- root geometry `1000×1480`.

## Three-scale screenshot result

- whole / ~500 px: PASS — `03` remains immediately recognizable and the top-left opening becomes cleaner;
- reading / ~1000 px: PASS — destination → Japanese label → theme hierarchy is more direct;
- actual / native `1000×1480`: PASS — the large `03` remains the sole, strong table-number cue with no lost factual role.

No new visual collision was introduced.

## Structure readback after change

France current `2:20`:

- native visible text: `6`;
- fixed-height visible text: `0`;
- IMAGE fill nodes: `0`;
- hidden duplicate `TABLE 03`: `173:67`;
- rollback `176:2`: hidden and intact.

## Decision

`CURRENT_POLISH_ADOPTED`.

This is a local redundancy subtraction, not a rule to remove `TABLE xx` labels across ADD-02. Future edits must preserve a clear table-number cue per sign and may only remove a label when another stronger cue already performs the same factual role.

## Deferred finalization

Remain `NOT_PRINT_READY` until the existing ADD-02 physical/vendor gates are resolved: final country copy, exact stand/holder obstruction, vendor bleed/safe-area, stock/profile, venue-lighting and physical actual-size proof.