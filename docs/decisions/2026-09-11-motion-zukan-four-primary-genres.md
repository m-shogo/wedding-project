# Motion Zukan — Four Primary Genres (2026-09-11)

## Status

**CANONICAL / DO NOT REPLACE WITH TECHNICAL TAXONOMY**

This decision records the user-facing top-level taxonomy for Motion Zukan / 映像Pinterest.

## The four primary genres

The first-level genres are fixed to exactly these four user-facing groups:

1. **画像**
2. **テキスト**
3. **エフェクト**
4. **画像＋テキスト**

Do not rename the fourth genre to `画像＋テキスト＋エフェクト` or any other variant. Effects may be present inside a composite example, but that is lower-level metadata, not the primary genre name.

## Meaning

### 画像

Photo/video media itself is the visual subject. Examples:

- Small Push / Pull
- Pan
- Parallax
- Photo Stack / Contact Sheet
- Collage
- Split Screen
- Freeze / Cutout

### テキスト

Typography itself is the visual subject. Examples:

- Mask Reveal
- Typewriter-like reveal
- Character Stagger
- Word Punch
- Tracking / Outline / Wipe typography

### エフェクト

Visual accents or transitions that are not primarily a photo-layout or typography presentation. Examples:

- Flash
- Film / Light Leak style transition
- Whip
- Match Cut
- Scribble
- Stamp
- Graphic hits
- Wipes / transitions

### 画像＋テキスト

Photo/video and typography are intentionally composed as one finished presentation. This category is especially important for the current wedding Opening. Examples:

- Photo + title
- Behind-subject text
- Travel location reveal
- Editorial photo + caption
- Photo + Mask Reveal
- Photo + date/location label
- Callout over photo/video

## Relationship to existing technical categories

The existing categories below remain useful but are **sub-tags only**:

- TYPOGRAPHY
- PHOTO
- CAMERA
- LAYOUT
- TRANSITION
- RHYTHM
- GRAPHIC
- EDITORIAL
- TRAVEL
- EMOTIONAL

They must never replace the four primary genres in the discovery UI.

## Data sources

- Existing **36 Motion Kit** patterns are fundamental motion units and should primarily populate `画像`, `テキスト`, and `エフェクト`.
- Existing **97 Director Recipe** entries are allowed to supplement `画像＋テキスト` when they combine real media with typography and are not a typography-only recipe.
- Do not invent fake preview media to fill gaps.
- If a composite recipe does not have a true combined render available, a constituent real preview may be shown only when explicitly labeled **「構成要素プレビュー（複合完成画ではありません）」**.

## Discovery UI rules

`/movie-coach/motion-pinterest` is the preview-first discovery page.

- phone: 2 columns
- tablet: 3 columns
- desktop: 4 columns
- large desktop: 5–6 columns
- visual preview dominates the card
- top-level genre switch appears before technical filters
- technical categories are hidden under secondary filtering
- desktop: hover-to-preview when real video exists
- mobile: tap card → detail
- detail can reveal search vocabulary / DaVinci implementation later

## Page responsibilities

- `/movie-coach/motion-pinterest` — visual discovery / 「見てこれ」
- `/movie-coach/motion-library` — list and selection workflow
- `/movie-coach/motion-library/advanced` — implementation / verification / production detail

Do not merge these roles without an explicit user instruction.

## Quality gate

Every Motion Zukan UI change must verify:

1. Are the top genres still exactly `画像 / テキスト / エフェクト / 画像＋テキスト`?
2. Is `画像＋テキスト` sufficiently represented rather than left as an empty shell?
3. Are technical categories still subordinate?
4. Can a user understand the motion visually before reading technical details?
5. Are real examples prioritized over generated explanatory diagrams?
6. Does mobile remain usable at two columns and desktop remain useful at four to six columns?
