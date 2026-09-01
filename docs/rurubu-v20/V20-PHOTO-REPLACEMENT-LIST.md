# V20 写真準備・差し替えリスト

Status: `CURRENT_HANDOFF_LIST / PAGE_ROLES_RESET_2026-09-01`

Highest page-role authority: `V20-CURRENT-PAGE-ARCHITECTURE.md`.

Old Figma slot IDs may remain useful as historical geometry evidence, but they are not current page-role authority after the architecture reset.

Generated TEMP images are composition placeholders only and must never be presented as the couple's real memories.

# 優先度A — 新構成で必須

## P04 — 旅の思い出を集結

Goal: P04だけで複数の旅の記憶が成立する写真プールを作る。

Prepare:
- `REQ-P04-TRAVEL-HERO`: 旅の主役写真 3–5候補;
- `REQ-P04-PLACE`: 沖縄 / 韓国 / ハワイ / その他の実旅行の場所写真 6–10候補;
- `REQ-P04-ACTION`: 歩く・食べる・乗る・遊ぶ等の旅行中の動作 4–8候補;
- `REQ-P04-DETAIL`: 料理・看板・街角・チケット・小物等 4–8候補.

Final page target:
- 1 hero + 4–6 supports = 5–7 photos.

Hawaiiの既存実写は再利用候補だが、P04をHawaiiだけにしない。

## P05 — 家族と友達の思い出

New fixed page role.

Prepare:
- `REQ-P05-FAMILY`: 家族との思い出写真 6–12候補;
- `REQ-P05-FRIENDS`: 友達との思い出写真 8–16候補;
- `REQ-P05-ANCHOR`: 家族/友達ページの代表にできる感情・雰囲気の強い写真 3–5候補.

Final page target:
- 1 anchor + 4–6 supports = 5–7 photos.

Important:
- 集合写真はA5で顔が判別できる解像度を優先;
- 誰が誰か、関係性、エピソードは写真だけから推測しない;
- 人名/関係ラベル/キャプションは本人確認後に追加.

## P06 — 日常 / 好きなもの / BEST SHOTS

Prepare:
- `REQ-P06-LIFE`: ふたりの日常を代表する自然な写真 4–6候補;
- `REQ-P06-FOOD`: ふたりらしい食の写真 3–5候補;
- `REQ-P06-PET`: Cookie / Melonの実写 5–8候補;
- `REQ-P06-FUN`: 趣味・遊び・面白い場面 3–5候補.

Final page target:
- 1 candid hero + 3–5 supports = 4–6 photos.

# 優先度B — P02 / P03の精度向上

## P02 Profile

Prepare if available:
- SHOGOらしさが分かる写真 2–4候補;
- SHIORIらしさが分かる写真 2–4候補;
- ふたりの共有写真 1–3候補.

Final target:
2 main + optional 1 support.

## P03 Our Story

Prepare:
- 出会い/初期を象徴する写真;
- 交際中の代表写真;
- proposal/important milestone photo if real;
- registration / wedding-arrival-related photo if useful.

Final target:
2–4 photos.

Do not force photos that do not actually match the story chapter.

# 優先度C — P07 Closing / P08 Back Cover

## P07 Closing

The previously verified closing source may be reused as a candidate:
- `001.jpg`;
- Drive `1XAVLtR1y-M6yW_N9CB8QQUixXYdbOke6`;
- 4500×3000;
- previous Figma hash `16a2b4e2ce0a2532909a01a7fd61bcbf766fa96a`.

This source was formerly used on old P08. It is now a **candidate source for new P07 closing**, not a reason to keep old P08 geometry.

Prepare 2–4 alternative calm closing photos if available.

Final target:
1 strong photo, optional 1 tiny support.

## P08 Back cover

Final target:
0–1 photo.

A calm background photo may be used, but P08 does not need a photo if a restrained paper/color/art direction works better.

No collage.

# P01 existing strength

P01 already has verified real Hawaii/couple sources and does not currently require a large new photo request.

If a materially better cover hero/support pool exists, it may still be compared because no page is permanently locked.

# Removed old requests

The following old photo requests are no longer current V20 requirements:
- P07 venue/building discovery photo;
- P07 table/floral/food discovery photo;
- any photo required solely for `TODAY'S TRAVEL GUIDE` / `11 DESTINATIONS` / `LOOK AROUND` / `EDITOR'S PICK`.

Do not source these for V20 unless the user explicitly restores that concept.

# まとめて渡す場合の目安

Recommended raw candidate pool:
- P04 travel: 15–30候補;
- P05 family/friends: 17–33候補;
- P06 real life: 15–24候補;
- P02/P03/P07 alternatives: as available.

最終誌面で全部使うわけではない。候補を多めに用意して、A5で最も強い5–7枚等へ絞る。

# ファイル準備ルール

- 元JPEG/HEIC優先;
- 長辺2,000px以上を目安;
- SNS保存画像やスクリーンショットは可能な限り避ける;
- 文字入れ/強いフィルター前の原本を優先;
- 連写だけでなく距離・向き・表情違いを残す.

Example:

```text
REQ-P04-PLACE_korea_01.jpg
REQ-P05-FAMILY_01.jpg
REQ-P05-FRIENDS_03.jpg
REQ-P06-PET_cookie_melon_02.jpg
```

# Figma差し替えルール

Because page roles changed, do not preserve old slot geometry blindly.

New workflow:
1. build/approve the new page proof;
2. derive the new layered page composition;
3. create replaceable photo frames;
4. place verified real sources;
5. adjust crop/scale at A5;
6. record source provenance/hash;
7. remove TEMP/REPLACE REQUIRED status only after verified replacement.

`OLD SLOT != NEW PAGE ROLE.`