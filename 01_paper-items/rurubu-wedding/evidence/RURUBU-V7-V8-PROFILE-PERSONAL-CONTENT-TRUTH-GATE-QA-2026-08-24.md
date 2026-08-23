# Rurubu V7/V8 Profile personal-content truth gate QA — 2026-08-24

## Scope

Rurubu WEDDING only. V6 control frozen. No WEDDING PASSPORT, BOARDING PASS, 青春ふたりきっぷ or ADD production state inspected or mutated.

Figma file: `bfM0d4c9dCeBv5pCkJ3TNM`
Study page: `2052:2 / 07_RURUBU_V7_V8_PRO_STUDIES`

## Authority finding

`CONTENT-PREFILL-20260731.md` states that person-specific profile facts such as birthdays/hometowns/hobbies/favorites are still unresolved for publication and that all six person-specific Q&A answers remain TODO.

`DUMMY-CONTENT-PACK.md` supplies production-volume placeholder copy for layout testing only and explicitly is not Current authority for real answers.

Therefore polished placeholder personal copy must not appear as verified couple identity facts in current comparison candidates.

## V7 before

Current K `2303:2` showed production-like personal values including:

- `神奈川県`
- `1991年`
- `旅行・写真・映画`
- `散歩してカフェ巡り`
- `カフェ・スイーツ`
- `笑顔`
- Q1 answer `話しやすくて、笑顔が印象的でした。`
- Q4 answer `まだ見たことのない景色へ、ふたりで。`
- apparent direct quote `「次は、どこへ行こう？」`

The mature editorial styling made these placeholders read as verified facts/answers.

## V7 bounded correction

New current K2: `2391:2`

- preserve V7 composition, imagery, color, hierarchy and native editability;
- replace six unverified personal profile values with native `回答待ち`;
- replace the two displayed unverified Q&A answers with native `回答待ち`;
- convert apparent direct quotation to editorial line `次は、どこへ行こう。` and rename the node as non-quote editorial copy;
- preserve question prompts and photo roles;
- previous K `2303:2` becomes hidden rollback at `x=300000`.

### V7 QA

- 500 px whole-item: PASS
- 1400 px reading: PASS
- 1587×1123 actual-size: PASS for DESIGN QA
- visible native text: `30`
- IMAGE fills: `5`
- text intersections: `0`
- bounded 18 px edge risks: `0`
- Japanese font mismatches: `0`

## V8 before

Current AW3 `2357:2` showed person-specific statements and answers without real-content authority:

- SHOGO `旅先では、まず歩く。` / `歩く人。`
- SHI-CHAN `旅先では、まず食べる。` / `食べる人。`
- Q1 `海の近く。朝が早い街。`
- Q2 `予定を詰めすぎないこと。`
- Q3 `みんなの声と、食卓の景色。`
- object-portrait caption `旅の断片 / 横浜 2026`

## V8 bounded correction

New current AW4: `2391:50`

- preserve restrained book-editorial composition and the non-person object-portrait dummy;
- replace person-specific declarations with the neutral prompt `旅先で、何をしたい？` plus native `回答待ち` for each person;
- replace all three displayed Q&A answers with native `回答待ち`;
- hide the unverified `旅の断片 / 横浜 2026` caption instead of implying documentary provenance;
- previous AW3 `2357:2` becomes hidden rollback at `x=300000`.

### V8 QA

- 500 px whole-item: PASS
- 1400 px reading: PASS
- 1587×1123 actual-size: PASS for DESIGN QA
- visible native text: `20`
- IMAGE fills: `1`
- text intersections: `0`
- bounded 18 px edge risks: `0`
- Japanese font mismatches: `0`

## Page-level readback

Current comparison roots after promotion:

V7: `2381:2 + 2391:2 + 2387:2 + 2299:2 + 2311:2 + 2383:2`

V8: `2347:2 + 2391:50 + 2388:2 + 2337:2 + 2355:27 + 2342:2`

All current roots remain parented to `2052:2`; pairwise current-root overlap: `0`.

## Professional critique

- Art direction: V7 retains its energetic publication identity; V8 retains its restrained book identity.
- Editorial design: unanswered roles remain readable and explicit rather than disappearing.
- Book design: V8 becomes quieter, but the pause is honest and still contributes to the interview-page rhythm.
- Typography: all changed copy stays native `Noto Sans JP`; no accidental collision or fallback mismatch.
- Photo editing: no image gained false identity authority; V8 object portrait remains non-person and explicitly non-final.
- Print: DESIGN QA only. Real content, final photos, printer template, preflight and physical proof remain separate gates.

## Asset truth

- image generation: `0`
- Drive writes: `0`
- new Drive masters: `0`
- new image hashes: `0`
- final photography adopted: `0`
- V6 changes: `0`

## Learning

`RSL-254 / F-RSL-254-PLAUSIBLE-PERSONAL-PROFILE-COPY-MASQUERADES-AS-VERIFIED-IDENTITY-FACTS`

State: `VERIFIED_LOCAL_MULTI-SYSTEM → CROSS_ITEM_CANDIDATE`.

The transferable principle is not to show `回答待ち` forever. It is to preserve source-confidence boundaries for identity-bearing personal copy: a polished placeholder must not silently become a factual biography, direct quote or personal answer. Replace the explicit pending state when authoritative real content arrives and rerun copy-fit/three-scale QA.
