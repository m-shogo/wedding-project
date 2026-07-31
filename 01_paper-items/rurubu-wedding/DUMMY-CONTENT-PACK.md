# るるぶWEDDING — Dummy Content Pack

Status: `READY_FOR_FIGMA_PLACEHOLDER_USE / REPLACE_LATER`
Current authority: GitHub `main`

## Purpose

Figma復旧時に実写真・実文章待ちで止まらないための仮入力セット。

ユーザー方針:
- 写真はダミーで先に配置してよい
- 背景写真もダミーでよい
- プロフィール文・Friends captions・Memory Spotsも仮文章で進める
- すべて後から差し替える

**重要:** このパックはレイアウト検証用。実写真・実回答のCurrent authorityではない。

## Dummy image roles

生成対象は14枚。

| Working file | Role | Ratio / use | Replace later with |
|---|---|---|---|
| `cover_hero_dummy.jpg` | Cover hero | portrait 4:5 | 本番カップル写真 |
| `profile_a_dummy.jpg` | Profile A | portrait 4:5 | SHOGO単独写真 |
| `profile_b_dummy.jpg` | Profile B | portrait 4:5 | SHI-CHAN単独写真 |
| `history_memory_dummy.jpg` | History anchor | landscape 3:2 | 二人の思い出写真 |
| `memory_spot_01_dummy.jpg` | Memory spot 01 | landscape | 実スポット写真 |
| `memory_spot_02_dummy.jpg` | Memory spot 02 | square | 実スポット写真 |
| `memory_spot_03_dummy.jpg` | Memory spot 03 | landscape | 実スポット写真 |
| `memory_spot_04_dummy.jpg` | Memory spot 04 | square | 実スポット写真 |
| `back_memory_dummy.jpg` | Back main memory | landscape | 実思い出写真 |
| `friends_01_dummy.jpg` | Friends slot 01 | landscape | 友人/家族写真 |
| `friends_02_dummy.jpg` | Friends slot 02 | landscape | 友人/家族写真 |
| `friends_03_dummy.jpg` | Friends slot 03 | landscape | 友人/家族写真 |
| `background_travel_sky_dummy.jpg` | decorative background | wide | 実背景写真 or final texture |
| `background_paper_texture_dummy.jpg` | paper background | wide | final texture/background |

Dummy images must visibly say `DUMMY / REPLACE LATER` so they cannot be mistaken for production photos.

## Dummy copy payload

### Cover features
1. `ふたりの思い出スポットを旅する SPECIAL GUIDE`
2. `出会いから今日まで OUR TRAVEL HISTORY`
3. `いつもありがとう FRIENDS & FAMILY`
4. `食べて飲んで楽しむ YOKOHAMA WEDDING DAY`
5. `BEST SHOT & FAVORITE MOMENTS`
6. `NEXT DESTINATION: OUR FUTURE`

### Profile A
- name: `SHOGO`
- favorite food: `ラーメン`
- favorite place: `HAWAII`
- hobby: `映画・漫画・旅行`
- detail: `旅先では予定を詰めすぎない派`

### Profile B
- name: `SHI-CHAN`
- favorite food: `SWEETS`
- favorite place: `HAWAII`
- hobby: `旅行・カフェ・写真`
- detail: `きれいな景色を見つけるのが得意`

### Q&A
1. `お互いの第一印象は？`
   - A: `話してみたら想像以上によく笑う人。`
   - B: `話しやすくて、一緒にいると自然に笑えました。`
2. `相手の好きなところは？`
   - A: `何でもない日も楽しい日にしてくれるところ。`
   - B: `困ったときに一緒に考えてくれるところ。`
3. `これから一緒に行きたい場所は？`
   - A: `まだ行ったことのない国を少しずつ。`
   - B: `またハワイへ。次は違う島にも行きたい！`

Travel note:
`予定通りじゃない出来事も、振り返れば旅のハイライト。これからも二人で寄り道しながら進みます。`

## Dummy history

Exactly 6 milestones for stress-equivalent layout:

1. `201x` — `はじめて出会う`
2. `201x` — `一緒に出かけるように`
3. `202x` — `初めてのふたり旅`
4. `202x` — `同棲スタート`
5. `2026.02.11` — `入籍`
6. `2026.10.24` — `WEDDING DAY`

## Dummy memory spots

1. `はじめての旅行先` / `DUMMY CITY 01`
   - `初めて二人で遠くへ出かけた、今でもよく話す思い出の場所。`
2. `何度も歩いた街` / `DUMMY CITY 02`
   - `お気に入りのお店や景色が少しずつ増えていった街。`
3. `忘れられない景色` / `DUMMY VIEW 03`
   - `写真を見るだけで、その日の会話まで思い出せる景色。`
4. `次の目的地` / `NEXT DESTINATION`
   - `これから二人で訪れたい、まだ知らない景色の候補地。`

## Dummy back copy

Main memory caption:
`旅の途中で見つけたお気に入りの一枚。何年後に見ても、この日の空気を思い出せますように。`

Friends captions:
1. `いつもたくさん笑わせてくれてありがとう！`
2. `これからも変わらず一緒に遊んでください！`
3. `またみんなでどこかへ旅に行こう！`

## Replacement contract

When real content arrives, replace by role/name only. Do not redesign the entire page first.

Recommended order:
1. `cover_hero`
2. `profile_a` / `profile_b`
3. actual Profile fields + Q&A
4. 6 actual history milestones
5. Memory Spots
6. Friends / Family photos + captions
7. decorative/background image if needed

After each replacement, rerun crop + overflow QA. The dummy content deliberately uses production-like text volume so replacement should normally require adjustment, not structural redesign.

## Figma working direction

Until real Figma same-condition scoring proves otherwise:
- Cover A = visual-direction favorite
- Inside A = structural favorite
- Back A = structural favorite
- B variants remain comparators
- no winner is Final yet

## Format boundary

- SVG is prohibited.
- Accepted fixed decorations must be Current transparent PNG-only assets from `IMAGE-GENERATION-QUEUE.md`.
- Dummy scenic/background images are raster JPEG working placeholders only.
- no dummy image may be promoted to final production photo.
