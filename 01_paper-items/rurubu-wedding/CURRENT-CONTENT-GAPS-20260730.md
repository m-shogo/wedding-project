# るるぶWEDDING — Current Content / Production Gaps 2026-07-30

Status: `CONTENT_COLLECTION_REQUIRED / DECORATION_QUEUE_COMPLETE / FIGMA_VISUAL_PENDING`
Current authority: GitHub `main`

Depends on:
- `CONTENT-INTAKE.md`
- `PHOTO-SHORTLIST-20260730.md`
- `IMAGE-GENERATION-QUEUE.md`
- `PNG-ASSET-INTEGRATION-QA-20260730.md`

## Purpose

Figma MCPが使えない間に、**本当に不足しているものだけ**を固定する。

装飾素材は #1〜#14 まで完了済み。これ以上の固定装飾制作は、実レイアウトで具体的な不足が見つかるまで行わない。

---

## 1. すでに候補があり、追加探索を急がないもの

### Cover hero

Current editorial favorite:
- `007.jpg` — `PRIMARY_CANDIDATE / NOT_FINAL`

Alternatives:
- `004.jpg` — emotional close alternative
- `036.jpg` — smiling editorial alternative

`007.jpg` is sufficient to resume meaningful Cover A/B visual testing when Figma access returns. Final selection still requires same-condition Figma placement and print-scale QA.

### Bride-side profile photo

Current first candidate:
- `024.jpg`

Alternatives:
- `026.jpg`
- `027.jpg`

### History / memory imagery

Existing Hawaii set is sufficient for first production comparison.

Recommended candidates:
- History memory: `014.jpg` or `023.jpg`
- Memory spot / travel scene: `031.jpg` or `035.jpg`
- Back-cover memory: `023.jpg` first, `001.jpg` alternative

These are editorial-role candidates only. Do not invent factual event labels from image appearance.

---

## 2. Highest-priority missing photos

### GAP-PHOTO-01 — groom-side clean profile portrait

State: `MISSING_CLEAN_SINGLE_PORTRAIT`

Need:
- 1 groom-side portrait suitable for a small profile card
- portrait-ish or square-ish preferred
- face safely away from crop edges
- real photo only

Do not silently crop a couple photo into a fake-equivalent single portrait without explicit visual review.

Preferred resolution path:
1. find a real groom-only source photo outside the inspected Hawaii subset
2. only if unavailable, redesign both profile cards as a deliberate paired-couple treatment

### GAP-PHOTO-02 — Friends / Family photos

State: `MISSING_3_SOURCE_CANDIDATES`

Need exactly 3 first-pass candidates:
- `friends_01`
- `friends_02`
- `friends_03`

They may be group photos. Prioritize meaning over equal representation during first layout comparison.

Do not fill these slots with unrelated couple/Hawaii photos merely to make the mock look complete.

### GAP-PHOTO-03 — optional destination diversity

State: `OPTIONAL`

The Hawaii set already covers first layout testing. Additional non-Hawaii photos are useful only if the four Memory Spots should visibly represent multiple destinations.

This is **not a blocker** for the next Figma structural/visual pass.

---

## 3. Missing real text content

The repo currently defines capacity and placeholder structure, but the following real copy is not yet frozen in Current authority.

### GAP-TEXT-01 — basic profile fields for both people

Per person, choose only fields worth publishing:
- display name
- birthday / month-day if desired
- hometown if desired
- job / role if desired
- favorite food
- favorite trip / place
- hobby
- one small personality/detail item

Low-value fields should be omitted rather than shrinking type.

### GAP-TEXT-02 — paired Q&A × 3

Need 3 paired modules.

Capacity target per question:
- question: 12–24 characters
- person A answer: 20–35 Japanese characters
- person B answer: 20–35 Japanese characters
- combined payload: approximately 45–70 characters

Current recommended topics:
1. お互いの第一印象は？
2. 相手の好きなところは？
3. これから一緒に行きたい場所は？

Wording can change; capacity is the constraint.

### GAP-TEXT-03 — travel note

Need:
- 1 short note
- target 35–60 Japanese characters
- magazine side-note tone, not a long letter

### GAP-TEXT-04 — history milestones × 6

Need exactly 6 first-pass milestones.

Per item:
- compact date/year
- short title, ideal 6–14 Japanese characters
- optional supporting detail outside the timeline

Suggested category structure only:
1. 出会い
2. 仲良くなった時期
3. 印象的な旅行
4. 同棲 / 大きな生活イベント
5. 入籍
6. WEDDING DAY

### GAP-TEXT-05 — Memory Spots × 4

Need exactly 4 first-pass spots.

Per spot:
- title
- city/place name
- short explanation approximately 35–60 Japanese characters
- optional year / memorable detail

Photo is optional per spot; 2–4 photo candidates total are enough.

### GAP-TEXT-06 — Friends / Family captions × 3

Need one caption per photo.

Target:
- approximately 20–30 Japanese characters each
- short, warm, editorial rather than letter-length

### GAP-TEXT-07 — Next Destination

State: `OPTIONAL`

Up to 3 items:
- place to visit
- thing to do together
- small future promise/plan

This can remain cover-only if the inside becomes dense.

---

## 4. Missing production print values

State: `PRINT_VENDOR_VALUES_PENDING`

Do **not** invent these values:
- bleed amount
- trim-safe margin
- fold-safe margin
- paper stock
- printer/export PDF profile
- any printer-specific color/export requirement

Current 420 × 297 mm spread / center fold geometry is a structural working basis only. Final print readiness requires actual vendor/venue conditions.

---

## 5. Figma blocker

Production Figma:
- https://www.figma.com/design/bfM0d4c9dCeBv5pCkJ3TNM

Current state:
- Starter-plan MCP monthly limit reached
- do not burn repeated metadata/read calls in the blocked window
- no production winner has been promoted

When access returns, use `FIGMA-WIREFRAME-EXECUTION-RUNBOOK.md` with the PNG-only override now embedded in that file.

---

## 6. Priority order from here

While Figma is blocked:

1. **Find/select groom-side profile portrait**
2. **Collect 3 Friends / Family source photos**
3. **Freeze real profile/Q&A/history/memory-spot/friends text within `CONTENT-INTAKE.md` capacity**
4. **Obtain real printer/venue bleed-safe-export requirements**

Do not spend time on:
- more decorative asset generation
- more SVG work
- speculative extra cover variants
- replacing the existing Hawaii cover/history candidates without a concrete editorial problem

---

## 7. Next Figma-ready minimum package

Already available at candidate level:
- [x] cover hero candidate (`007.jpg` primary)
- [x] one profile-side candidate (`024.jpg` bride side)
- [x] history/memory photo candidates
- [x] back-memory candidate
- [x] PNG-only decoration queue #1–#14

Still needed for real-content Visual QA:
- [ ] groom-side profile photo
- [ ] 3 Friends / Family photos
- [ ] basic profile fields for both people
- [ ] 3 paired Q&A answers
- [ ] 1 travel note
- [ ] 6 history milestones
- [ ] 4 Memory Spots with real copy
- [ ] 3 Friends / Family captions

Still needed for final print readiness:
- [ ] vendor/venue bleed, safe, fold and export values

## Boundary

This file tracks readiness; it does not promote any photo, layout, or copy to Final. Cover A / Inside A / Back A remain provisional favorites until production Figma same-condition screenshot + stress QA.