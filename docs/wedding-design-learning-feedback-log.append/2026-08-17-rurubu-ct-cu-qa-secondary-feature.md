# Rurubu V6 CT → CU — Q04 secondary feature beat

Date: 2026-08-17
Scope: Rurubu WEDDING only
Status: adopted / visually verified / structure verified / not print-ready

## Visible problem

Live CT had already escaped the old six-card Q&A grid, but Q02 / Q03 / Q04 still formed an overly even middle rhythm. Q04 (`これから挑戦したいことは？`) was narratively important but visually equivalent to its neighbors, so the page still carried a mild questionnaire/template feeling.

## Hypothesis

A Japanese travel-magazine-style interview does not need every question to share identical emphasis. Promoting one semantically important midpoint question to a second feature beat should create a stronger editorial rhythm without adding more cards, decorations, or generated assets.

## Bounded experiment

Source/rollback: CT `1576:2`.
Candidate: CU `1580:2`.
Q&A page: `1580:42`.

Changed only Q04:

- enlarged native Q04 number;
- enlarged native Q04 question;
- preserved native editable answer;
- enabled vertical auto-height for the Q04 answer;
- retained all photos, hashes, composed texture, and Q01/Q02/Q03/Q05/Q06 structure.

No new generated image, Drive asset, binary transport, card, shadow, gradient, or decorative geometry was introduced.

## Expected improvement

- break the equal-question rhythm;
- give the page an intentional midpoint anchor;
- increase editorial interview energy at thumbnail/reading scale;
- preserve fully editable native text and replaceable photos.

## Regression risk

- number/question overlap;
- long Q04 answer colliding with lower content;
- 18px safe-area failure;
- Q04 overpowering the full Q&A sequence.

## Evidence

The first candidate was not accepted immediately: structural QA found a real Q04 number/question overlap of about 9px × 52px. Question/answer bounds were corrected and the page was re-read before promotion.

A dedicated long-copy proof `1580:81` / Q&A page `1580:121` used the answer:

`まだ行ったことのない国内外の街を少しずつ巡って、その土地のごはんや景色を一緒に楽しみたい。`

The native answer expanded vertically and still produced:

- text collision: 0;
- 18px safe-area risk: 0;
- page overflow: 0.

Visual review passed at:

- ~500px whole-item thumbnail;
- ~1000px reading spread;
- ~794×1123 actual Q&A page.

Final Q&A structure keeps 25 visible native text nodes and the existing replaceable image roles. Image hashes were not changed.

## Decision

Adopt CU.

- Outer: Z `1576:160` unchanged;
- Profile/Q&A: CU `1580:2` preferred;
- Story/Chronology: CQ `1569:2` unchanged;
- CT `1576:2` hidden as rollback;
- long-copy proof hidden after verification;
- Start Here: `V5 FU/FX · V6 Z + CU/CQ INSIDE STUDIES · V7 HOLD`.

## Asset lifecycle state

- generated: 0;
- new Drive save: 0;
- new external binary placement: 0;
- new raster bytes: 0;
- adopted layout change: yes;
- placed in live preferred Figma: yes;
- visually verified: yes;
- structure verified: yes;
- long-copy stress verified: yes.

Drive authority re-read: `RURUBU_V6_HAWAII_2026-08-02`, ID `1wHxC2E09JpLIQRNDDTY4i29KMwMY2_XK`.

## Learning / next application

Recorded separately as RSL-072. The transferable principle is only that repeated editorial content can benefit from one semantically important secondary feature beat, with realistic-copy re-stress after typography changes. Exact Rurubu question selection, color, sizes, coordinates, and composition remain Rurubu-specific.

Next V6 review should keep Z/CU/CQ together at whole-book scale and choose the next highest-value visible defect rather than advancing V7.
