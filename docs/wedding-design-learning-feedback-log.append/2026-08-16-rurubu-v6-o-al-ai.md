# Wedding Design Learning Feedback — Rurubu V6 O / AL / AI

Date: 2026-08-16
Scope: Rurubu WEDDING only
State: `VERIFIED_LOCAL_DUMMY_DESIGN_PROGRESS / V7_HOLD / NOT_PRINT_READY`

This append file continues the long-lived wedding design feedback history without replacing the large shared base log during concurrent work.

## 1. Q&A: remove equal semantic weight, not only card geometry

### Observation

AJ had no rounded card grid, but its six Q&A groups still carried near-equal visual weight and therefore remained partially template-like.

### Hypothesis

Repeated semantic units need explicit editorial roles even after their containers are removed.

### Test

AK preserved the six native questions/answers and replaceable Memories photography but changed the hierarchy:

- 01 and 04 large feature beats;
- 02/03/05 smaller support beats;
- 06 stronger closing beat;
- staggered widths/positions;
- no new card/shadow/gradient/generated decoration.

The first AK render wrapped large 01/04 numerals and was rejected. Text boxes and positions were repaired until structural intersections reached zero.

### Result

- 500 px whole spread: PASS
- 1400 px spread: PASS
- actual Q&A: PASS
- long-copy proof with realistic two-line answers: collision 0 / safe risk 0

Decision: `AK Q&A METHOD ADOPTED`, then inherited into AL.

## 2. Outer: stronger magazine identity from existing authoritative PNG

### Observation

Outer M had strong destination/photo hierarchy but only a small native `旅する WEDDING` masthead, so the front lacked a clear magazine identity at thumbnail scale.

### Authority check

Rurubu-specific production authority prohibits historical SVG and keeps current fixed identity in transparent PNG.

### Test

Existing authoritative logo A was re-read:

- Drive ID `1opK9BSoL8rCeoYxuPWUyKZZsu0-Q165b`
- PNG, 629,061 bytes
- existing verified Figma hash `0bdbf47904ea5865c71b1555dc73689b2c7b2126`

The first direct hash-node construction attempt was blocked before mutation. Instead of repeating it, a previously verified resident Figma PNG node was cloned into rollback-safe Outer O.

### Result

- 500 px whole spread: PASS
- 1400 px spread: PASS
- actual front: PASS
- new generation: 0
- new Drive write: 0
- new binary upload: 0

Decision: `O ADOPTED OVER M`.

## 3. Profile: dominant photo quality must respect the source

### Observation

AK's profile hero displayed a registered `1356×560` source at `520×735`. It looked soft at actual size despite the page hierarchy being visually strong.

### Hypothesis

When the source and intended display aspect are incompatible, redesign the role before generating or enlarging.

### Test

AL was cloned from AK and only the profile page was rebuilt:

- main photo `650×268`, close to the source ratio and inside intrinsic dimensions;
- compact editable facts below;
- unequal three-photo cluster;
- native pull quote as the final anchor.

The first AL state had snapshot/quote overlap and was rejected. The cluster was tightened and the quote separated.

### Result

- 500 px whole spread: PASS
- 1400 px spread: PASS
- actual profile: PASS
- text collision 0 / safe risk 0
- visible sharpness improved materially over AK

Decision: `AL ADOPTED OVER AK`.

## 4. Editable facts: structural collision zero is not enough

### Observation

AL's placeholder `—` values structurally passed, but realistic text had not been rendered.

### Test

Hidden stress used:

- 神奈川県川崎市
- 1991年8月16日
- 写真・旅行・映画
- お寿司とラーメン
- 散歩してカフェ巡り
- よく笑うところ

The first 65 px value fields had collision count zero but rendered ugly multi-line breaks. Screenshot truth rejected them.

Final widths:

- left values 105 px at x165
- right values 130 px at x420

### Result

All realistic values render on one line at actual size with collision 0 and safe risk 0.

Decision: `RENDERED_TEXT_FIT_REQUIRED` reinforced.

## 5. Final intrinsic reconciliation

Before writing the active ledger, every current O/AL/AI image hash was compared with registered source dimensions.

Additional violations found and repaired:

- AL Q&A support `190×255 → 175×205` for a `240×220` source;
- AI Story support `260×235 → 235×210` for the same source;
- AI Event 03 `255×165 → 235×160`;
- AL Q&A Memories hero rejected `352×368 → 705×545` enlargement and reassigned to verified dining source `732×498 → 705×480`.

Fresh 1400 px and actual Q&A reviews passed after repair.

Decision: current registered photo roles in O + AL/AI are reconciled to intrinsic-safe display boxes. This is dummy-design quality only, not final print DPI proof.

## 6. Final live state

Figma:

- Outer O `1370:2`
- Profile/Q&A AL `1373:2`
- Story/chronology AI `1363:125`
- Start Here `845:27`: `V5 FU/FX · V6 O + AL/AI INSIDE STUDIES · V7 HOLD`

Evidence:

- `01_paper-items/rurubu-wedding/RURUBU-V6-O-AL-AI-QA-2026-08-16.md`
- `01_paper-items/rurubu-wedding/RURUBU-V6-O-AL-AI-INTRINSIC-RECONCILIATION-2026-08-16.md`
- `01_paper-items/rurubu-wedding/RURUBU-V6-O-AL-AI-ACTIVE-ASSET-RECONCILIATION-2026-08-16.json`

Reusable learning entries:

- RSL-028 feature/support hierarchy inside semantic repetition
- RSL-029 verified resident binary reuse before reopening blocked transport
- RSL-030 redesign the role before enlarging a weak raster

## Final assessment

The strongest progress was not added decoration. It was:

1. stronger editorial Q&A hierarchy;
2. a real magazine masthead using already verified current PNG authority;
3. removal of several quiet raster-upscale defects;
4. a sharper, more replaceable Profile page;
5. rendered variable-copy proof rather than placeholder-only QA.

No new image generation was justified in this pass because composition/source-role fit was the higher-value defect and already verified assets could solve it without reopening known binary-transport failures.
