# ADD-11 写真共有 / QR案内 — Clean-room V2 QR field simplification

Status: `VERIFIED_LOCAL / CLEANROOM_V2_SELECTED / QR_FIELD_SIMPLIFICATION_PASS / LONG_COPY_STRESS_PASS / LEGACY_PRESERVED`
Date: 2026-08-18
Start authority SHA: `b2244e51c8a05decfe15b4fc18ba61b1444c0d7b`

## Authority

- Current: `docs/automation/non-rurubu-figma-quality-current.md`
- Figma file key: `PWQ5ygJJt0IlOqj5ri5jng`
- selected A5: `18:19`
- selected A4: `19:34`
- hidden long-copy stress: `19:4 / 19:56`
- Drive authority: `ADD-11_写真共有_QR案内サイン` / `1wuxHEqby_0JWS0bYV0RWCTUotM88Mnxb`
- retained legacy: unchanged

## Visible problem

Fresh actual-size screenshots showed that the selected clean-room V2 still surrounded the unresolved QR role with too many visible containment devices at once: a hard square border, dashed quiet-zone reserve, and multiple circular/orbit decorations. The functional QR geometry was valid, but the extra hard frame made the role read more like a web widget than a printed photo-sharing sign. The A4 category also still carried decorative English (`TRAVEL MEMORY`) and the hashtag placeholder used implementation/template-like `[#HASHTAG]` rather than a Japanese semantic placeholder.

## Bounded comparison

Rollback-safe comparison candidates were created before selected mutation:

- A5 comparison: `27:54 / QA_ADD11_A5_SIMPLIFIED_QR_FIELD_V2_2026_08_18`
- A4 comparison: `27:84 / QA_ADD11_A4_SIMPLIFIED_QR_FIELD_V2_2026_08_18`

The test changed only:

1. hide `DECOR_TRAVEL_ROUTE`;
2. remove the visible stroke from `QR_PHOTO_SHARE` while preserving its exact semantic geometry;
3. keep `QR_QUIET_ZONE_RESERVE` and the remaining orbit/spacing role;
4. `[#HASHTAG]` → `[ハッシュタグ]`;
5. A4 `写真共有 / TRAVEL MEMORY` → `写真共有`.

No QR destination, privacy fact, URL, hashtag value, expiry value, step instruction, image, or generated asset was invented.

The simplified candidate was stronger at A5 native `875×1240` and A4 native `1240×1754`: the QR still reads immediately, but the page no longer resembles a boxed interface control. A4 also becomes Japanese-first without losing category clarity.

## Adopted selected change

Before mutation, hidden rollback copies were saved:

- A5 selected rollback: `28:2`
- A4 selected rollback: `28:32`
- A5 stress rollback: `28:54`
- A4 stress rollback: `28:84`

The same bounded treatment was applied to selected A5/A4 and hidden long-copy stress so visual and structural evidence remain aligned. Comparison candidates were hidden after adoption.

## Structure / stress readback

Post-write readback:

- A5 `18:19`: `875×1240`, visible native text `13`, IMAGE fills `0`, outside text `0`, text collision `0`, proof-language `0`, QR frame strokes `0`, QR role `290×290`, quiet-zone role `230×230`.
- A4 `19:34`: `1240×1754`, visible native text `13`, IMAGE fills `0`, outside text `0`, text collision `0`, proof-language `0`, QR frame strokes `0`, QR role `420×420`, quiet-zone role `332×332`.
- hidden A5 stress `19:4`: outside `0`, collision `0`, proof-language `0`, IMAGE `0`.
- hidden A4 stress `19:56`: outside `0`, collision `0`, proof-language `0`, IMAGE `0`.

## Image / Drive decision

`IMAGE_GENERATION_NOT_REQUIRED` and Drive write `0`. The bottleneck was redundant containment and template-like copy, not missing imagery. Exact Drive authority was live-read before mutation.

## Result

`SELLABLE_VISUAL_QA_PASS + DESIGN_QA_PASS_WITH_PLACEHOLDERS` is maintained with a cleaner QR hierarchy. Legacy production and all prior rollback history remain preserved. Real URL/QR generation, scan proof, final privacy wording, printer proof and export remain deferred finalization inputs.
