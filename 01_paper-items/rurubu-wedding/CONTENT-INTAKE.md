# るるぶWEDDING — Content Intake Contract

Status: READY_FOR_CONTENT_COLLECTION / VISUAL_NOT_FROZEN
Current authority: GitHub `main`
Depends on:
- `FOUNDATION.md`
- `INSIDE-BACK-WIREFRAME.md`
- `LOCAL-INSIDE-BACK-PREVIEW-20260730.md`

## Purpose

Figma復旧前に、実写真・実文章の受け皿を固定する。

このファイルは「最終文章」ではなく、現在の第一候補構造（Cover A / Inside A / Back A）へ安全に差し替えられる入力契約。

原則:
- 長い文章を後から無理に縮小して入れない。
- 写真は用途別に選ぶ。すべての写真を同じFILLルールへ押し込まない。
- 人物写真は実写真を使用し、AI人物生成で代替しない。
- 装飾文字以外の本文・見出し・名前はFigma native text。
- printer-specific bleed / trim-safe / fold-safe は未確定のため、本文内容だけを先に固定する。

---

## 1. COVER / FRONT

### Required photos

1. `cover_hero`
   - required: 1
   - priority: highest
   - preferred source: portrait 4:5 or moderately vertical crop
   - acceptable: high-resolution landscape if subject-safe crop exists
   - avoid: faces or important details tight against source edges

### Required text

- title: Figma/native + approved masthead asset combination
- date/location: `YOKOHAMA 2026.10.24`
- feature lines: 4–6

Current feature-line budget:
- ideal: 18–34 Japanese/Latin mixed characters per line
- hard target: maximum 2 visual lines each
- do not solve overflow by shrinking body copy below the wireframe minimum

Current working feature themes:
1. 思い出スポット
2. OUR TRAVEL HISTORY
3. FRIENDS & FAMILY
4. YOKOHAMA WEDDING DAY
5. BEST SHOT & FAVORITE MOMENTS
6. NEXT DESTINATION: OUR FUTURE

---

## 2. INSIDE LEFT — OUR PROFILE / ABOUT US

Current structural candidate: `INSIDE A — Travel Editorial Grid`.

### Profile photos

2 photos required:
- `profile_a`
- `profile_b`

Preferred ratio:
- portrait-ish / square-ish
- select photos where faces remain usable after moderate crop

Do not reuse the exact same photo as `cover_hero` unless there is a strong editorial reason.

### Basic profile data

Per person, collect:
- display name
- birthday or birth month/day if desired
- hometown / birthplace if desired
- job / role if desired
- favorite food
- favorite trip / place
- hobby
- one small personality/detail item

Layout contract:
- display name must survive a full-width 12–16 Japanese-character equivalent stress case
- low-value fields may be omitted rather than shrinking type

### Q&A contract

Current layout capacity: 3 Q&A modules.

Recommended paired-answer format:
- Question: 12–24 characters
- Person A answer: 20–35 Japanese characters
- Person B answer: 20–35 Japanese characters
- combined answer payload per question should remain approximately 45–70 characters

Recommended questions:
1. お互いの第一印象は？
2. 相手の好きなところは？
3. これから一緒に行きたい場所は？

The question wording is editable. The capacity is more important than these exact questions.

### Travel note

1 short note:
- ideal: 35–60 Japanese characters
- role: small personal/editorial breath between Profile and History
- tone: short enough to feel like a magazine side note, not a letter

---

## 3. INSIDE RIGHT — OUR HISTORY

### Timeline

Exactly 6 milestones for the first Figma comparison.

Per milestone collect:
- year/date
- short title
- optional supporting detail

Budget:
- date: compact form preferred
- title: ideal 6–14 Japanese characters
- timeline itself should not carry full paragraph descriptions
- longer explanation belongs in adjacent memory text/photo modules

Suggested milestone categories only — not fixed content:
1. 出会い
2. 仲良くなった時期
3. 印象的な旅行
4. 同棲 / 大きな生活イベント
5. 入籍
6. WEDDING DAY

### History photo

- `history_memory_photo`: 1
- preferred: landscape or square-ish
- role: one visual anchor, not six separate timeline thumbnails

---

## 4. MEMORY SPOTS / MINI MAP

Exactly 4 spots for the first production comparison.

Per spot collect:
- title
- city / place name
- short explanation
- optional photo candidate

Budget from current stress contract:
- title: 12–18 Japanese-character equivalent max target
- description: approximately 35–60 Japanese characters
- visual target: 2–4 lines, not a full paragraph

Photo policy:
- all 4 spots do NOT require separate photos
- provide 2–4 candidates total
- the final Figma can assign photos only where they improve hierarchy

Useful metadata if available:
- country/city
- rough year
- why it matters
- one memorable detail

---

## 5. BACK — FRIENDS & FAMILY

Current structural candidate: `BACK A — Quiet Editorial Notes`.

### Main memory photo

- `back_memory_photo`: 1
- preferred: landscape
- caption: 2–4 short lines

### Friends / family photos

First comparison uses exactly 3 photo slots.

Collect:
- `friends_01`
- `friends_02`
- `friends_03`

These may represent groups rather than individual people.

Caption budget per slot:
- approximately 20–30 Japanese characters is ideal
- current stress test also survived longer sample copy, but short is preferred

Selection rule:
- prioritize photos with meaning over equal representation at this stage
- final guest fairness / representation check happens after the candidate pool is known

---

## 6. OPTIONAL NEXT DESTINATION MODULE

Collect up to 3 future items:
- place we want to visit
- thing we want to do together
- small future promise / plan

Each:
- title: 6–16 characters
- one-line description: 20–35 characters

This content is optional and may stay only on the cover feature line if the inside spread becomes dense.

---

## 7. Photo intake naming

Preferred neutral source naming before final placement:

```text
cover_hero_01.jpg
profile_a_01.jpg
profile_b_01.jpg
history_memory_01.jpg
memory_spot_01.jpg
memory_spot_02.jpg
memory_spot_03.jpg
memory_spot_04.jpg
back_memory_01.jpg
friends_01.jpg
friends_02.jpg
friends_03.jpg
```

Do not rename the only original copy destructively. These names are for working copies / selected candidates.

---

## 8. Photo QA before Figma

For each selected candidate record:
- pixel dimensions
- orientation: portrait / landscape / square
- subject location: left / center / right
- crop tolerance: high / medium / low
- faces near edge: yes / no
- important text/logo in photo: yes / no

Acceptance principle:
- choose the slot to fit the photo when possible
- do not force every source ratio through a single `FILL` rule

---

## 9. Minimum content package to unblock final Figma

Figma can move from structural wireframe to meaningful visual QA when the following exist:

- [ ] 1 cover hero candidate
- [ ] 2 profile photos
- [ ] basic profile fields for both people
- [ ] 3 paired Q&A answers
- [ ] 1 travel note
- [ ] 6 history milestones
- [ ] 1 history memory photo
- [ ] 4 memory spots with title + short description
- [ ] at least 2 memory-spot photo candidates
- [ ] 1 back memory photo
- [ ] 3 friends/family photo candidates
- [ ] 3 short friends/family captions

This is the minimum useful package, not the final photo count.

---

## 10. Current design direction boundary

Current local evidence favors:
- Cover A as visual-direction favorite
- Inside A as structural favorite
- Back A as structural favorite

However, none are final production winners until Figma same-condition screenshot + stress QA is completed.

Do not rewrite this intake contract around decorative preference before that gate.
