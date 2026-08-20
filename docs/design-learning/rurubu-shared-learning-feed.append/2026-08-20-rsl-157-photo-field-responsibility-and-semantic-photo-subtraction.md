# RSL-157 — Give legitimate photo fields more responsibility before adding containers; remove semantically weak repeated support photos before inventing alternates

Source scope/item: Rurubu WEDDING / V6

State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Source problem

Two different preferred-spread defects shared the same upstream pattern:

1. Profile GZ had a valid high-resolution photo but still opened as `cream title field → photo`, leaving the page quieter and more template-like than the newer photo-led spreads.
2. Outer HD used a repeated cafe support photo for Feature 03 even though that photo carried no unique factual/place evidence and a larger dining image already supplied photographic mass.

## Evidence before change

- GZ `2004:2`, Profile `2004:3`: hero hash `e3738476f760932bb5b09c9d60f174dd6c84049d`, source `944×608`, displayed only `793.7×328` below a cream title region.
- HD `2014:2`, front `2014:52`: cafe hash `c1ada11205bc3978bf426b304d683f1c1566cac2` used as a small support photo while the same hash appeared repeatedly across preferred V6 spreads.
- Before HN adoption, current preferred image audit had `29` visible IMAGE roles and cafe hash repetition `5`.

## Root-cause hypothesis

Editorial density was being carried partly by **separate header/support modules** instead of asking whether already-valid photography or native typography could carry more responsibility.

- If a legitimate existing photo has enough intrinsic headroom and a usable text-safe area, extending it into the title field may create a stronger magazine opening without a new container or asset.
- If a repeated support photo does not uniquely prove or explain its content role, replacing it with an unrelated alternate image would improve diversity only numerically. Native typography may be the more truthful editorial role.

## Principle / capability tested

1. **Photo-field responsibility test** — before adding a header/container/new asset, test whether an existing semantically valid source-safe image can become the title field while native text remains editable.
2. **Semantic photo-subtraction test** — before replacing a repeated support photo, ask whether the role actually requires photographic evidence. If not, test transferring responsibility to native typography instead of inserting a false alternate image.

## Exact bounded tests

### HK Profile

Rollback-safe duplicate HK `2027:2` from GZ:

- existing hero expanded to `793.7×480`, y `0`, source remains `944×608`;
- native title/deck/quote integrated into photo-led opening;
- lower profile data, route texture and replaceable snapshot roles preserved;
- Q&A not redesigned.

### HN Outer

Rollback-safe duplicate HN `2029:2` from HD:

- only repeated cafe support photo hidden;
- large dining support retained;
- native Feature 03 ordinal/title enlarged on cream;
- one narrow yellow binding rail retained;
- no substitute photo or new decoration introduced.

## Expected improvement

- stronger travel-magazine first read at thumbnail scale;
- less `header → image` / photo-card module rhythm;
- lower repeated-photo count without sacrificing semantic truth;
- native text editability and replaceable photography preserved.

## Regression risk

- photo-overlay title contrast can fail if the text-safe region is overestimated;
- moving a small deck may silently breach print safe-area even when the screenshot looks acceptable;
- text moved out of a photo may inherit an inappropriate white fill;
- over-subtracting photography can make a page too quiet if the removed image had real binding/evidence responsibility.

## Three-scale evidence

### HK

- whole / 500px: PASS, stronger than GZ;
- reading / 1200px: PASS;
- actual Profile / `794×1123`: PASS;
- Profile text collision `0`, 18px safe risk `0`;
- Q&A text collision `0`, 18px safe risk `0`;
- visible Profile image intrinsic violations `0`.

### HN

- whole / 1200px: PASS, stronger than HD;
- actual front / `794×1123`: PASS;
- front/back text collision `0`, 18px safe risk `0`;
- image intrinsic violations `0`.

## Figma / Drive / GitHub evidence

Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`

- HK `2027:2`; Profile `2027:3`; GZ rollback `2004:2`.
- HN `2029:2`; front `2029:63`; HD rollback `2014:2`.
- Start Here `845:27`: `V5 FU/FX · V6 HN + HK/HJ + GY MEMORY SPOTS + HC CAFE & TABLE + HS 1DAY PLAN · V7 HOLD`.

Drive authority:

- root `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02` reverified;
- generated Profile/Q&A/Timeline/Memories masters remain saved but unadopted;
- no Drive write or new image hash in this test.

GitHub item evidence:

- `01_paper-items/rurubu-wedding/evidence/RURUBU-V6-HN-HK-PHOTO-LED-AND-REPEAT-SUBTRACTION-QA-2026-08-20.md`

## Failure fingerprints

### `PHOTO_LED_TITLE_TEXT_SAFE_AREA_DRIFT`

Symptom: photo-led title integration looked acceptable visually, but the native deck breached the 18px right safe area.

Replacement method: actual-bounds safe-area audit + move text to a verified photo-safe zone before adoption.

### `TEXT_ROLE_CONTEXT_COLOR_DRIFT`

Symptom: after HN removed a photo support role, its former white overlay title became weak on cream.

Replacement method: re-evaluate text contrast whenever a semantic role changes background context; use an existing established palette color rather than adding a new label/container.

### `READ_ONLY_QA_SCRIPT_SCOPE_TYPO`

Symptom: a structure-only Figma audit referenced an undefined local variable and failed atomically.

Replacement method: correct the script once after confirming no mutation; do not treat the failed read as evidence.

## Adopted / rejected / blocked status

- HK: `ADOPTED / VERIFIED_LOCAL`.
- HN: `ADOPTED / VERIFIED_LOCAL`.
- initial unsafe deck / white-on-cream states: `REJECTED` before promotion.

## What must remain Rurubu-specific

Do NOT transfer:

- exact Yokohama / camera / waterfront / dining imagery;
- giant Japanese headline placement;
- magenta / yellow / cyan / navy palette;
- cover ordinal layout;
- exact photo sizes, overlap geometry or Rurubu-like editorial grammar.

## Cross-item applicability hypothesis

Another wedding print item may independently test the **method** when either condition exists:

1. a valid image is artificially separated from a title/header even though it has enough source quality and text-safe area; or
2. a repeated support image carries no unique evidence and appears to exist only because a template expects another picture.

The receiving item must compare at whole/read/actual size and may reject either treatment if photo contrast, physical semantics, source fidelity, grouping or copy tolerance regresses.
