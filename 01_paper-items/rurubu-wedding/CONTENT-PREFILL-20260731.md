# るるぶWEDDING — Grounded Content Prefill 2026-07-31

Status: `GROUNDED_PREFILL / USER_REVIEW_STILL_REQUIRED_FOR_PERSONAL_COPY`
Current authority: GitHub `main`

## Purpose

既存の結婚式repo・採用済み企画から再利用できる事実/コピーを回収し、`CONTENT-COLLECTION-MINIMUM.md` のTODOを減らす。

区分:
- `FIXED` = 既存Current factsとしてそのまま使える
- `GROUNDED_CANDIDATE` = 採用済み別企画に存在するため再利用候補。ただしプロフィールブック掲載文としては未Freeze
- `TODO` = 安全に推測できない

---

## A. Couple naming

### Person A
- display name: `SHOGO` — `FIXED_FOR_WEDDING_CREATIVE`
- Japanese display candidate: `松崎 翔伍` — `GROUNDED_CANDIDATE`

### Person B
- display name: `SHIORI` — `FIXED_FOR_WEDDING_CREATIVE`
- Japanese full display: `TODO`

Evidence in adopted opening concept:
- `SHOGO & SHIORI`
- flight initials explanation: `SS = Shogo / Shiori`

Do not invent Person B family name/full Japanese name.

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

Profile-book working copy candidate:
> 予定通りにはいかなかった雨の日のプロポーズ。それも含めて、ふたりにとって忘れられない一日。

Still TODO:
- island/city/place if desired
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
   - title/detail: `TODO`

2. 仲良くなった時期 / 交際
   - date/year: `TODO`
   - title/detail: `TODO`

3. 印象的な旅行 / プロポーズ
   - place: `ハワイ` — `GROUNDED_CANDIDATE`
   - event: `雨の日のプロポーズ` — `GROUNDED_CANDIDATE`
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

## F. Small-detail candidates from prior wedding planning

These have appeared in prior wedding planning and may be useful as small profile chips, but are not yet assigned to Person A/B in the Rurubu Current data.

- `ワンピース好き` — `CONTEXT_CANDIDATE / PERSON_ASSIGNMENT_TODO`
- `コーギー2匹` — `COUPLE_LIFE_CANDIDATE / NAMES_TODO`

Do not silently label either person's hobby as One Piece until the user confirms whose profile it belongs to (or whether it is shared).
Do not invent dog names.

---

## G. Still genuinely missing — cannot infer safely

### Profile
For both people:
- favorite food
- favorite trip/place as an individual answer
- hobby/personality items beyond the context candidates above
- birthdays/hometown/job if publishing

### Q&A
All six person-specific answers remain `TODO`:
1. お互いの第一印象は？
2. 相手の好きなところは？
3. これから一緒に行きたい場所は？

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

## H. Editorial effect

With this prefill, the following Rurubu modules can now be visually tested with grounded content rather than generic lorem copy:
- Memory Spots: 4 first-pass candidates
- History: Hawaii proposal + registration + wedding entries
- Travel Note: route-derived working draft
- Couple masthead: SHOGO & SHIORI

The following should remain visibly marked `TODO/MISSING` until the couple supplies facts:
- personal profile data
- paired Q&A answers
- first relationship dates
- groom portrait
- Friends/Family section

## Source boundary

Primary repo evidence:
- `opening-movie/concept-01-memory-flight-1024.md` — adopted concept, route, SHOGO & SHIORI, Okinawa/Korea/Hawaii meanings, rain-day Hawaii proposal, Yokohama destination
- `01_profile-movie/chapter-plan.md` / `docs/03_movie-structure.md` — relationship chapter categories include meeting/dating/cohabitation but no concrete dates
- `CONTENT-COLLECTION-MINIMUM.md` — fixed registration/wedding dates and remaining intake contract

No missing personal fact was invented.
