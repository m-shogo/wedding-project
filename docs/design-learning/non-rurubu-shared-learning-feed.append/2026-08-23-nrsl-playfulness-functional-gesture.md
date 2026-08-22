# NRSL — Playfulness should consolidate into a functional gesture, not scatter into decoration

Date: 2026-08-23
Source scope/item: non-Rurubu / ADD-17 子ども向けミニカード / ぬりえ
State: `VERIFIED_LOCAL → CROSS_ITEM_CANDIDATE`

## Visible problem

A new clean-room attempt to make ADD-17 more playful initially used several independent color bars plus a rounded cobalt footer container.

At full-size and 500 px whole-item review, the extra color did not read as stronger playfulness. The three bars read as generic decoration and the rounded footer returned the page toward pill/card UI grammar. The activity surface also became visually busier without gaining a clearer child-neutral action cue.

## Root-cause hypothesis

When a print artifact needs more fun, movement or anticipation, distributing that intent across multiple independent decorative accents can create `AI template activity` rather than meaningful play.

The stronger treatment is often to concentrate the energy into **one artifact-relevant gesture** whose shape or placement supports the user's action, while keeping the actual activity/content surface quiet enough to work.

## Bounded experiment

ADD-17 clean-room page: `67:2`.

Initial full-size A direction:
- three independent cobalt/pink/yellow bars;
- rounded cobalt footer container;
- open central activity field.

Method switch after screenshot critique:
- removed the three disconnected bars;
- replaced them with one continuous cobalt→pink discovery-route vector gesture;
- reduced and moved the gesture outside the main activity field;
- removed the rounded footer container;
- kept open native footer copy with one short yellow rule;
- retained only small star/wave/spark cues that do not define the layout.

## Expected improvement

- stronger `見つける / 探索する` reading;
- more playful whole-item rhythm without child clip-art;
- less decorative noise;
- larger usable activity surface;
- reduced web-card/pill reading.

## Regression risk

`One strong gesture` is not a universal visual recipe. If reused literally across unrelated wedding items, the route/sweep itself can become a new template signature.

The transferable point is the **concentration test**, not ADD-17's mint/cobalt/coral palette, route shape, stars, exact placement, or child-activity composition.

A strong gesture must still have an item-specific conceptual/function relationship and must not cross variable text, handwriting, image, QR or other active semantic regions.

## Evidence

Selected clean-room:
- Figma front `67:3 / EXPEDITION FIELD SHEET`
- Figma back `67:4 / DISCOVERY POSTLOG`
- realistic stress `69:2 / 69:40`
- three blank-frame thumbnails `70:2 / 70:11 / 70:21`

Three-scale result after method switch:
- whole-item / 500 px: PASS;
- reading scale: PASS;
- actual/native `1110×1540`: PASS;
- realistic long-copy: PASS after prompt/activity/lower-reserve repair.

Structure:
- selected front: native text `7`, fixed-height `0`, outside `0`, text collision `0`, IMAGE `0`;
- selected back: native text `6`, fixed-height `0`, outside `0`, text collision `0`, IMAGE `0`;
- stress front/back: fixed-height `0`, outside `0`, text collision `0`, IMAGE `0`.

Professional Council: `94/100 / PASS / NO VETO`.

Drive authority:
- `1xqxYqJ6_-0nPYSKrWkISHYljiNGIP5mB / ADD-17_子ども向けミニカード_ぬりえ`
- Drive writes `0`.

Item evidence:
- `01_paper-items/additional-wedding-items/ADD-17-children-mini-card/PROFESSIONAL-VNEXT-EXPEDITION-FIELD-PROMOTION-QA-2026-08-23.md`

## Adopted / rejected status

- disconnected multi-bar treatment: `REJECTED`;
- rounded footer containment: `REJECTED`;
- consolidated discovery gesture outside activity field: `VERIFIED_LOCAL / ADOPTED`.

## What must remain item-specific

Do not transfer:
- ADD-17 route geometry;
- star/wave/spark artwork;
- mint/coral/cobalt/yellow palette;
- exact headline/copy;
- activity corner geometry;
- front/back composition.

## Cross-item applicability hypothesis

On another materially different participatory print artifact — for example Quiz, Photo Booth or Escort Guide — if screenshot review shows `more fun` being implemented as multiple disconnected bars, dots, badges, pills or decorative marks, test a rollback-safe alternative that:

1. removes the scattered activity;
2. identifies the artifact's real user action;
3. expresses that action with one stronger functional/conceptual gesture;
4. protects semantic/interactive space;
5. compares whole / reading / actual-size before adoption.

If that independently improves another item without making the suite converge on one literal visual style, this lesson can advance toward `VERIFIED_CROSS_ITEM`.
