# Rurubu V6 AD + DG/DE — Q&A last-two editorial beat QA

Date: 2026-08-17
Status: `DG VERIFIED_LOCAL / PREFERRED`, AD/DE retained, V7 HOLD

## Authority

- Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
- start preferred set: Outer AD `1626:99` + Profile/Q&A DC `1618:2` + Story/chronology DE `1624:18`
- Start Here before: `V5 FU/FX · V6 AD + DC/DE INSIDE STUDIES · V7 HOLD`
- Drive V6 root: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK / RURUBU_V6_HAWAII_2026-08-02`
- latest repository main before this evidence commit included unrelated non-Rurubu commit `18c938a67d18d4d0a6b71fc6628a0e4f271d6854`; it is preserved as the parent.

## Visible problem

DC already integrated Q02/Q03 into the lower replaceable photograph, but the final sequence still ended as Q04 → Q05 → Q06 stacked vertically on the right. Q05/Q06 therefore read like form rows appended after the photo, and the lower cream area did not feel like a deliberate magazine ending.

## Root-cause hypothesis

The defect was repetitive spatial treatment, not missing ornament. Keeping the last repeated questions in the same vertical lane preserved a questionnaire/template rhythm even though the individual type hierarchy was valid.

## Bounded test

Rollback-safe DG `1631:2`, Q&A page `1631:42`:

- upper hero, Q01, Q02/Q03 navy binding strip, Q04 native stack and route texture preserved;
- lower memory photo kept the same replaceable source/hash and changed only from `455×370` to `470×350`;
- Q05 and Q06 moved into a two-column horizontal closing beat under the photograph;
- Q05/Q06 questions and answers stayed native editable text;
- no new card system, rounded panel, shadow, gradient, generated asset, Drive save or raster bytes.

Expected improvement: make the final read `photo → Q05/Q06 closing beat` rather than `photo → three more form rows` while preserving question sequence and future editability.

Regression risk:

- Q05/Q06 sequence could become ambiguous;
- longer answers could collide across columns;
- support photo could overpower Q04;
- lower content could violate page safe area.

## Three-scale evidence

- whole spread `1631:2`, 1400×990: PASS;
- Q&A actual-size `1631:42`, 794×1123: PASS;
- visible native Q&A text: 26;
- text-to-text collisions: 0;
- 18px text safe-area risks: 0;
- page overflow: 0.

Visual result: compared with DC, the lower Q&A no longer reads as a vertically stacked questionnaire. The support photograph and final two questions behave as one closing editorial region.

## Realistic-copy stress

Rollback-safe proof `1632:2`, Q&A page `1632:42` used materially longer native answers:

- Q05: `いつも隣で笑ってくれて、何でも一緒に楽しんでくれてありがとう。これからもいろいろな景色を見に行きたい。`
- Q06: `よく笑って、旅の話をしながら、新しい景色や思い出をふたりで少しずつ増やしていける家庭にしたい。`

Natural-height readback:

- Q05 answer: 39px;
- Q06 answer: 26px;
- text collisions: 0;
- 18px safe-area risks: 0.

Actual-size screenshot: PASS. The proof was hidden after QA, and the same realistic copy was applied to the preferred DG native answer roles.

## Decision

- DG `1631:2` promoted to `PREFERRED / V6_INSIDE_DG_QA_LAST_TWO_HORIZONTAL_2026_08_17`;
- old DC `1618:2` renamed rollback and hidden;
- proof `1632:2` hidden after PASS;
- Start Here updated to `V5 FU/FX · V6 AD + DG/DE INSIDE STUDIES · V7 HOLD`;
- Outer AD and Story/chronology DE remain preferred and unchanged;
- V7 was not edited.

## Asset lifecycle truth

- newly generated assets: 0;
- generated assets adopted: 0;
- new Drive saves: 0;
- external binary placements: 0;
- new raster bytes: 0;
- image hash changes: 0;
- existing replaceable lower Q&A photo geometry changed: YES;
- native text preserved: YES;
- visual verification: PASS;
- rollback preserved: YES.

## Rurubu-specific boundary

Do not transfer the exact photography, Q&A wording, two-column coordinates, yellow/magenta accent rules, palette, or Rurubu magazine composition.

## Cross-item applicability hypothesis

A receiving wedding item may test regrouping the final repeated editable items into a single closing beat tied to an already-valid visual anchor when the sequence remains clear. It must independently preserve native text/editability and rerun realistic long-copy + actual-size QA before adoption.
