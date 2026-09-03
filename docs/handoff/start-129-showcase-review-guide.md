# StaRt 129秒 3案ショーケース レビューガイド

対象: 初めてこの3案を見る人(新郎新婦本人を想定)。

## 今の状態を先に理解する

- 写真はPexels(無料ストック)由来のダミー素材が入っている。**新郎新婦本人の写真ではない**。正規実写真・実音源・正規歌詞は引き続き**未投入**(歌詞は「歌詞スロットNN」のplaceholder)。
- 3案は「完成映像」ではなく「編集文法の比較サンプル」。

## 見比べる・記録する(movie-dashboard)

```sh
cd movie-dashboard
pnpm dev
```

`http://localhost:5173/movie-coach/start-129` を開く。14区間タイムラインと使用演出一覧を見ながら、区間・演出ごとに「気に入った/保留/使わない」を記録でき、コメントも残せる。記録は自動でClaude/Codexへの修正依頼文にまとめられ、ボタン一つでコピーできる。

## 実際の映像を見る手順(Remotion Studio)

```sh
cd motion-studio
pnpm dev:start-129
```

Remotion Studioが開いたら、左のCompositions一覧から次を選ぶ。

- `Start129-A-Clean` / `Start129-A-Guide`(旅の記録映画)
- `Start129-B-Clean` / `Start129-B-Guide`(冒険アニメOP)
- `Start129-C-Clean` / `Start129-C-Guide`(リズム・タイポMV)

`-Clean`が完成映像相当(注釈なし)、`-Guide`が解説付き(演出名・目的・素材roleを表示)。

129秒フルの低解像度mp4は`motion-studio/out/start-129-full/`に6本render済み(2026-08-25時点、Git管理外)。

```text
start129_A_clean.mp4 / start129_A_guide.mp4
start129_B_clean.mp4 / start129_B_guide.mp4
start129_C_clean.mp4 / start129_C_guide.mp4
```

再renderする場合:

```sh
pnpm render:start-129:a   # A案 Clean
pnpm render:start-129:b   # B案 Clean
pnpm render:start-129:c   # C案 Clean
# Guide版は Composition名を Start129-<A|B|C>-Guide に変えて
# pnpm exec remotion render src/index-start-129.ts Start129-A-Guide out/start-129-full/start129_A_guide.mp4 --scale=0.5 --crf=28
```

代表15時点のstill(45枚、A/B/C × Guideモード)を一括render:

```sh
pnpm qa:start-129
# → out/qa/start-129/ にPNGが出る
```

ローカル素材の向き(landscape/portrait)を機械検証:

```sh
pnpm check:start-129-media
```

## 選ぶときに見るポイント

各案は同じ14区間(0-7s / 7-17s / … / 126-129s)を共有しているので、同じ時刻で3案を並べて比較すると違いが分かりやすい。

- 38秒(1サビA): A=静止から僅かに寄る、B="StaRt!"の大きな一撃、C=余白に大きい文字
- 88秒(2サビA): A=最大Hero、B="再スタート"(1サビとは違う言葉)、C=大きい文字+背景拡張
- 126-129秒(End): A/C=名前・日付を小さく、B=中央に名前

## 次にすること(実装側)

1. `motion-studio/local/lyrics.local.json` に正規歌詞32句を書き写す(schemaは`src/data/start129/localLyrics.ts`参照)
2. `motion-studio/local/audio/start-129.mp3`(または.wav/.m4a/.aac)に権利確認済み音源を置く
3. `pnpm sync:start-129-local` を実行(歌詞/音源をplaceholderから実データへ切り替える)
4. (任意)ダミー素材をPexelsの別候補へ差し替えたい場合は`python3 scripts/fetch-start-129-demo-assets.py --role <ROLE> --count 3`で候補確認→`--write`で取得→目視確認→`pnpm sync:start-129-demo-assets`。`PEXELS_API_KEY`は`motion-studio/local/.env`に設定済み(Git管理外)
5. 本番写真(新郎新婦本人)に差し替える場合は、Pexelsダミーを`public/demo/start-129/<ROLE>/`から入れ替えるか、別のroleディレクトリ運用へ切り替える
6. 気に入った演出・区間をメモし、次のClaude/Codexセッションへ「この演出をA案の◯◯区間からExtended本番へ移植して」のように具体的に依頼する

## Claude/Codexへ渡す修正依頼の書き方(例)

```text
motion-studio/src/compositions/start129/StartShowcaseB.tsx を見て、
1サビB(48-58秒)のspeed line burstが強すぎるので、intensityを下げて。
docs/decisions/start-129-three-showcase-directions.md と
docs/learning-entries/start-129-production-lessons.md も踏まえて。
```
