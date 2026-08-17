# 2026-08-17 Rurubu V6 — DC Q&A photo-integrated editorial beat

Scope: Rurubu WEDDING only
Status: `ADOPTED / VERIFIED_LOCAL`

## Visible problem

DA's Q&A page had valid native text and replaceable photos, but Q02/Q03 floated on cream space between the upper and lower photos. At thumbnail scale the center read like two small form fields rather than a magazine feature.

## Hypothesis

Use the already-valid lower memory photo as the visual anchor for Q02/Q03 instead of adding more cards or generated decoration.

## Bounded test

- duplicate DA to DC;
- retain photo source/hash and size `455×370`, move only to `y=492`;
- add one bounded dark contrast strip over photo top;
- move Q02/Q03 native text into two columns on that strip;
- keep Q04/Q05/Q06, Profile, upper memory hero and all other roles unchanged.

## Expected improvement

Photo → secondary Q&A → Q04 → closing questions should read as one continuous editorial sequence.

## Regression risk

The strip could become UI-like or fail with longer copy. It must remain a one-role treatment and pass actual-size/long-copy QA.

## Evidence

Figma:

- adopted DC `1618:2`;
- Q&A actual page `1618:42`;
- hidden long-copy proof `1619:2`;
- hidden rollback DA `1612:2`.

Three scales:

- 500×354 whole: PASS;
- 900×637 reading: PASS;
- 794×1123 Q&A actual size: PASS.

Structure:

- native visible Q&A text: 26;
- text collision: 0;
- 18px safe-area risk: 0;
- Q02/Q03 realistic long answers: natural height 39px each, collision 0, safe risk 0.

Drive:

- V6 root re-read: `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK`;
- no new Drive writes;
- existing generated masters remain unadopted.

## Result

`DC VERIFIED_LOCAL / PREFERRED`.

Start Here is now:

`V5 FU/FX · V6 AC + DC/DB INSIDE STUDIES · V7 HOLD`

The improvement is the semantic photo/text binding, not the literal strip design. Exact layout, colors, photo and Q&A structure remain Rurubu-specific.
