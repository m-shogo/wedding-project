# るるぶWEDDING — Grounded Content Prefill 2026-07-31

Status: `GROUNDED_PREFILL / USER_REVIEW_STILL_REQUIRED_FOR_PERSONAL_COPY`
Current authority: GitHub `main`

## Purpose

既存の結婚式repo・採用済み企画・過去の本人発言から再利用できる事実/コピーを回収し、`CONTENT-COLLECTION-MINIMUM.md` のTODOを減らす。

区分:
- `FIXED` = 既存Current factsとしてそのまま使える
- `GROUNDED_CANDIDATE` = 本人発言または採用済み別企画に存在するため再利用候補。ただしプロフィールブック掲載文としては未Freeze
- `TODO` = 安全に推測できない

---

## A. Couple naming

### Person A
- display name: `SHOGO` — `FIXED_FOR_WEDDING_CREATIVE`
- Japanese name evidence:
  - reservation/wedding context: `松﨑翔伍`
  - existing passport draft: `松崎 翔伍`
- status: `KANJI_GLYPH_VARIANT_CONFIRM_BEFORE_PRINT`

Do not silently choose between `崎` and `﨑` for final print without confirming the preferred glyph.

### Person B
- display name: `SHIORI` — `FIXED_FOR_WEDDING_CREATIVE`
- Japanese full name: `岩堀汐梨` — `GROUNDED_CANDIDATE / PERSON_CONTEXT_EVIDENCE`
- nickname: `しおり / しーちゃん` — `GROUNDED_CANDIDATE`

Evidence in adopted opening concept:
- `SHOGO & SHIORI`
- flight initials explanation: `SS = Shogo / Shiori`

---

## B. Fixed event facts

- wedding date: `2026.10.24` — `FIXED`
- wedding location label: `YOKOHAMA` — `FIXED`
- marriage registration date: `2026.02.11` — `FIXED`
- overall theme: `TRAVEL` — `FIXED`

---

## C. Memory Spots — first grounded candidate set

The adopted opening concept already uses the route:

`Narita → Okinawa → Korea → Hawaii → Yokohama Wedding Ceremony`

For the profile book, Narita is an opening/departure device rather than a couple Memory Spot. The four first-pass spot candidates are therefore:

### SPOT 01 — 沖縄
Status: `GROUNDED_CANDIDATE`

Source concept meaning:
- 青い海
- ゆっくり流れる時間
- ふたりで過ごす心地よさを何度も感じた場所

Profile-book working copy candidate:
> 青い海とゆっくり流れる時間。ふたりで過ごす心地よさを、何度も感じた思い出の場所。

Still TODO:
- specific city/island/place name if publication should be more precise
- year/date

### SPOT 02 — 韓国
Status: `GROUNDED_CANDIDATE`

Source concept meaning:
- よく食べて
- よく歩いて
- たくさん笑った旅

Profile-book working copy candidate:
> よく食べて、よく歩いて、たくさん笑った旅。ふたりらしい楽しさが詰まった思い出の場所。

Still TODO:
- specific city/place
- year/date

### SPOT 03 — ハワイ
Status: `GROUNDED_CANDIDATE / HIGH_CONFIDENCE_IMPORTANCE`

Source concept explicitly states:
- ハワイ = プロポーズ / 特別な思い出
- `予定通りにはいかなかった 雨の日のプロポーズ`
- `それでも ふたりにとって 忘れられない一日になりました`

Additional prior-conversation detail:
- タンタラスの丘もビーチも雨
- 最後はウルフギャングでプロポーズ
- proposal date/year itself remains unknown

Profile-book working copy candidate:
> タンタラスの丘もビーチも雨。それでも最後はウルフギャングでプロポーズ。ふたりにとって忘れられない一日。

Still TODO:
- proposal date/year

### SPOT 04 — 横浜
Status: `GROUNDED_CANDIDATE / TODAY_DESTINATION`

Source concept meaning:
- today/final destination = `Yokohama Wedding Ceremony`
- route ends by arriving only at Yokohama

Profile-book working copy candidate:
> 思い出を巡る旅の今日の目的地。2026年10月24日、みんなと迎える新しい旅のスタート地点。

This is a present-day/future-facing spot rather than a past memory. If all four spots must be past memories, replace this with another real place supplied by the couple.

---

## D. History — grounded partial prefill

Current 6-slot structure remains.

1. 出会い
   - date/year: `TODO`
   - exact place/trigger: `TODO`

2. 仲良くなった時期 / 交際前後
   - date/year: `TODO`
   - grounded activity sequence from prior conversation:
     - ボウリング
     - ボードゲームカフェ
     - 焼肉
     - チームラボ
   - grounded relationship note: SHOGO側は、楽しそうでノリが良いしおりに惹かれ、何度か会う中で「ずっと一緒にいたい」と思い告白した流れが過去会話にある
   - exact confession wording/date: `TODO`

Working timeline title candidate:
> 何度も会ううちに

Working supporting copy candidate:
> ボウリング、ボードゲームカフェ、焼肉、チームラボ。何度か会ううちに距離が近づき、交際へ。

3. 印象的な旅行 / プロポーズ
   - place: `ハワイ` — `GROUNDED_CANDIDATE`
   - event: `雨の日のプロポーズ` — `GROUNDED_CANDIDATE`
   - location detail: `タンタラスの丘 / ビーチ / ウルフギャング` — `GROUNDED_CANDIDATE`
   - date/year: `TODO`

4. 同棲 / 大きな生活イベント
   - fact category `同棲` exists in the profile-movie structure
   - actual date/year/detail: `TODO`

5. 入籍
   - date: `2026.02.11` — `FIXED`
   - working title: `入籍`

6. WEDDING DAY
   - date: `2026.10.24` — `FIXED`
   - place label: `YOKOHAMA` — `FIXED`

Do not infer missing dates from photograph metadata.

---

## E. Travel-note candidate

Status: `DRAFT_FROM_GROUNDED_ROUTE / NOT_FINAL`

Source opening concept uses:
- `これから向かうのは ふたりの思い出を巡る旅`
- Okinawa → Korea → Hawaii → Yokohama

Working magazine-side-note candidate:
> 沖縄、韓国、ハワイ。ふたりの思い出を巡りながら、今日の横浜へ。これからも旅は続きます。

This is drafted editorial copy, not a factual quote from the couple.

---

## F. Couple-life / small-detail candidates

### Dogs
Status: `GROUNDED_PERSONAL_FACT`

- コーギー2匹
- names: `くっきー` / `めろん`

Possible profile chip:
> WITH くっきー & めろん 🐾

Do not invent ages, sexes, personalities or ownership history unless separately grounded.

### One Piece
- `ワンピース好き` appeared as a wedding-planning premise
- current status: `UNVERIFIED_FOR_PROFILE_PERSON_ASSIGNMENT`

Do not silently label SHOGO or SHIORI's hobby as One Piece until the user confirms whether it belongs to one person or both.

---

## G. Q&A — what remains genuinely unknown

A targeted prior-conversation search found no reliable person-specific answers for:
1. お互いの第一印象は？
2. 相手の好きなところは？
3. これから一緒に行きたい場所は？

Therefore all six person-specific answers remain `TODO`.

The SHOGO-side courtship note above may help draft a future answer, but it is not automatically the answer to either Q&A question.

---

## H. Still genuinely missing — cannot infer safely

### Profile
For both people:
- favorite food
- favorite trip/place as an individual answer
- hobby/personality items beyond the grounded couple-life candidates above
- birthdays/hometown/job if publishing

### Relationship dates
Still `TODO`:
- meeting date/year
- relationship/start period
- proposal year/date
- cohabitation date/year

### Friends / Family
Still `TODO`:
- three actual groups/relationships
- three actual source photos
- captions

### Groom portrait
Still `MISSING` after Drive-wide search.

---

## I. Editorial effect

With this prefill, the following Rurubu modules can now be visually tested with grounded content rather than generic lorem copy:
- masthead: SHOGO & SHIORI
- Memory Spots: 沖縄 / 韓国 / ハワイ / 横浜
- History: courtship activity sequence + Hawaii proposal + registration + wedding
- Hawaii proposal: rain at Tantalus / beach → Wolfgang proposal
- Travel Note: route-derived working draft
- couple-life chip: くっきー & めろん

The following should remain visibly marked `TODO/MISSING` until the couple supplies facts:
- person-specific profile data
- paired Q&A answers
- exact relationship dates
- groom portrait
- Friends/Family section

## Source boundary

Primary repo evidence:
- `opening-movie/concept-01-memory-flight-1024.md` — adopted concept, route, SHOGO & SHIORI, Okinawa/Korea/Hawaii meanings, rain-day Hawaii proposal, Yokohama destination
- `01_profile-movie/chapter-plan.md` / `docs/03_movie-structure.md` — relationship chapter categories include meeting/dating/cohabitation but no concrete dates
- `CONTENT-COLLECTION-MINIMUM.md` — fixed registration/wedding dates and remaining intake contract

Additional prior-conversation personal facts recovered:
- bride name: 岩堀汐梨 / しおり / しーちゃん
- groom Japanese name evidence includes 松﨑翔伍; a passport draft uses 松崎 翔伍, so glyph must be confirmed before print
- dogs: くっきー / めろん
- Hawaii proposal detail: Tantalus and beach rain, final proposal at Wolfgang
- courtship activities: bowling / board-game cafe / yakiniku / teamLab

No missing personal fact was invented.
