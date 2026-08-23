# RSL-254 — Plausible personal Profile copy masquerades as verified identity facts

Source scope/item: Rurubu WEDDING
Date: 2026-08-24
State: `VERIFIED_LOCAL_MULTI-SYSTEM → CROSS_ITEM_CANDIDATE`
Fingerprint: `F-RSL-254-PLAUSIBLE-PERSONAL-PROFILE-COPY-MASQUERADES-AS-VERIFIED-IDENTITY-FACTS`

## Visible problem

V7 Profile K and V8 Profile AW3 both contained polished person-specific profile statements and Q&A answers whose factual authority did not exist. Because the layouts were visually mature, placeholder copy read as if it described the actual couple.

## Evidence before change

Project content authority `CONTENT-PREFILL-20260731.md` keeps birthdays/hometowns/person-specific hobbies/favorites unresolved for publication and explicitly says all six person-specific Q&A answers remain TODO. `DUMMY-CONTENT-PACK.md` is layout-only placeholder authority and explicitly not Current real-answer authority.

V7 K `2303:2` nevertheless displayed plausible values such as `神奈川県`, `1991年`, `旅行・写真・映画`, `カフェ・スイーツ`, plus polished Q&A answers.

V8 AW3 `2357:2` displayed person-specific travel-behavior statements and three polished Q&A answers, plus an unverified documentary-style place/year caption beside an object-portrait dummy.

## Root-cause hypothesis

Editorial polish can erase the visible boundary between placeholder and verified identity information. The more convincingly a Profile page is designed, the greater the risk that a plausible dummy biography, answer or quotation will be interpreted as factual.

## Principle tested

For identity-bearing personal content, source-confidence is part of design responsibility. Preserve unresolved roles explicitly rather than using production-like invented detail. Keep the text native/editable so verified content can replace the pending state without rebuilding the page.

## Bounded experiment

### V7

K `2303:2` → K2 `2391:2`:
- six unverified personal profile values → native `回答待ち`;
- displayed unverified Q&A answers → native `回答待ち`;
- apparent quote → non-quoted editorial line;
- no photo/crop/palette/layout change;
- K retained hidden as rollback.

### V8

AW3 `2357:2` → AW4 `2391:50`:
- person-specific declarations → neutral prompt + native `回答待ち`;
- three unverified Q&A answers → native `回答待ち`;
- unverified place/year object-photo caption hidden;
- restrained composition/object portrait preserved;
- AW3 retained hidden as rollback.

## Expected improvement

The publication remains visually useful for design comparison without falsely representing unverified personal details as the couple's biography or voice.

## Regression risk

Explicit pending states reduce visual richness and may make restrained layouts feel sparse. Do not solve that regression by inventing substitute facts; wait for authoritative content or improve hierarchy using non-factual editorial structure.

## Three-scale evidence

V7 K2:
- 500 px PASS
- 1400 px PASS
- 1587×1123 DESIGN QA PASS
- native text `30`, IMAGE `5`, text intersections `0`, 18 px edge risks `0`, Japanese font mismatch `0`

V8 AW4:
- 500 px PASS
- 1400 px PASS
- 1587×1123 DESIGN QA PASS
- native text `20`, IMAGE `1`, text intersections `0`, 18 px edge risks `0`, Japanese font mismatch `0`

Page-level current-root overlap after both promotions: `0`.

## What must remain Rurubu-specific

Do not transfer V7's coral/high-energy hierarchy, V8's monograph grid, exact prompts, exact `回答待ち` wording, image roles, coordinates or typographic scales.

## Cross-item applicability hypothesis

Any wedding artifact displaying a real person's biography, preferences, quote, Q&A, caption or identity-bearing claim should independently verify source authority before polishing it as final-looking content. Where facts remain unresolved, use an explicit pending/placeholder state or clearly editorial non-quote copy until authoritative content arrives.

This is not yet `VERIFIED_CROSS_ITEM`; V7 and V8 are materially different systems but remain within the same Rurubu WEDDING item.

Evidence: `01_paper-items/rurubu-wedding/evidence/RURUBU-V7-V8-PROFILE-PERSONAL-CONTENT-TRUTH-GATE-QA-2026-08-24.md`.
