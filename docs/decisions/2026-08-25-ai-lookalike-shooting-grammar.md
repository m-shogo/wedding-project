# AIっぽさを消すための撮影文法（Director Recipe Catalog版）

日付: 2026-08-25
状態: Phase A 研究ドキュメント
関連: `docs/02_style-bible.md`, `docs/ai-video-operation.md`, `docs/failure-patterns.md`, `movie-dashboard/src/data/directorRecipeCatalog.ts`

## 位置づけ

既存の `docs/ai-video-operation.md`（AIっぽさを減らす撮影文法）と
`docs/failure-patterns.md`（「AIっぽい」見え方の典型）は、主に**AI動画生成**を対象にしている。

このドキュメントはDirector Recipe Catalog（実写真・実動画の編集レシピ集）向けに、
**生成AIを使っていなくても編集がAI量産動画/テンプレ動画に見えてしまう**パターンを
禁止事項リストとして整理する。既存2文書と矛盾しないよう、用語・判断基準を揃えた。

## 前提原則（Style Bibleより再掲）

以下が2つ以上当てはまったら再設計する（`docs/02_style-bible.md` QAセクションより）。

- どのカップルにも使えそう
- 英字ラベルを消しても意味が変わらない
- 全写真が同じ動き
- 全sceneの余白・枠・カードが同じ
- gold / glowで高級に見せようとしている
- transitionそのものが目に入る
- AI B-rollの方が実写真より印象に残る
- 写真の縦横比を全部同じ箱へ押し込めている
- 「cinematic」という言葉以外で良さを説明できない

## 禁止事項リスト（Director Recipe横断）

### 全shot zoom

すべての写真に同じKen Burns（push/pull/pan）を機械的に適用しない。
`docs/opening-v1-motion-map.md` で既に明示的に削除・禁止済みの方針を、
Director Recipe Catalogでも `cam-restrained-push` の `avoidWhen` に
「全カットに機械的に適用する時」として明記した。

**判定基準**: 1つのシーケンス内でstatic以外のmotionが80%を超える場合は要再設計。

### 毎拍cut

190 BPMの全拍でcutすると忙しすぎる。`rhythm-half-time-grid` が定義する
95 BPM half-timeを主gridとし、190 BPMは画面全体のcutではなくmicro accent
（線・stamp・dot・caption）に限定する。

**判定基準**: 1秒間に3回以上、写真/動画自体が切り替わる区間が3秒以上続く場合は要再設計。

### 過度なglow / fake glow

Style Bibleの「AI動画禁止事項」に準じ、実写編集でも
「fake glow」「常時bloom」「過剰lens flare」「意味のないlight leak連打」を避ける。
`cam-exposure-true` は「AI的な均一グレーディングを避け実写の質感を残す」ことを目的に定義。

**判定基準**: 光源が画面内に存在しない発光効果、または全カットで同じglow強度が続く場合は要再設計。

### テンプレ的均等配置

写真をすべて同じ枠・同じ余白・同じカードに押し込めない。
`photo-asymmetric` / `editorial-magazine-layout` が対抗策として定義されている。

**判定基準**: 3カット以上連続で同じ配置・同じ枠サイズが続く場合は要再設計。

### 説明的英字ラベルの多用

`MEMORY 01` / `OUR JOURNEY` / `WELCOME ABOARD` のような、
意味のない汎用英字ラベルをテロップとして常用しない
（`docs/opening-v1-motion-map.md` で既に削除済みの実例）。
`editorial-copywriter-line` が「説明的な英字ラベルを使わない」ことを明記。

**判定基準**: ラベルを消しても映像の意味が変わらない場合はそのラベルを削る。

### 3-hitの過剰演出化

3連リズムのたびにfull-screen flash/shake/cutを行うと、
StaRtの遊び心が「エフェクトショーリール」に変わってしまう。
`rhythm-three-hit` / `start-triple-hit` / `start-second-triple-hit` はいずれも
「写真を切らずHeroを維持したまま」を必須条件にしている。

**判定基準**: 3-hitのたびに写真/動画自体が切り替わる、または画面全体が明滅する場合は要再設計。

### Anime-OP文法の常用化

Anime-OP的なgraphic accent（speed lines, panel grid, halftone等）は
`ANIME_OP_GRAMMAR` カテゴリで定義したが、いずれも1〜数回限定の使用を前提にしている。
`start-anti-overwhelm-guard` レシピは、anime-OP系レシピの使用直後に
必ずstatic/holdを挟むことを義務付ける安全弁として機能する。

**判定基準**: Anime-OP系レシピの合計使用時間が全体尺の20%を超える場合は要再設計
（Style Bibleの「実写真主体88%」水準からの逆算目安）。

### 特定作品の意匠模倣

「Anime-OP Grammar」はあくまで一般的な編集技法の集合であり、
特定作品のキャラクター・カメラワーク・意匠を直接模倣しない。
`anime-contact-sheet-recap` を含む全ANIME_OP_GRAMMARレシピの
`avoidWhen` に模倣禁止を明記済み。

**判定基準**: 特定作品を見た人が「あの作品のOPっぽい」と直接特定できる場合は不採用。

### glitch / RGB splitの常用

`anime-micro-rgb` は「glitch美学を常時使う時」を明示的にavoidWhenとしている。
1曲で数回までの限定使用に留める。

### 光過敏配慮

`anime-impact-frame` / `cut-soft-impact` は光過敏リスクを明記し、
1〜2フレームの短時間、かつ1曲で1〜2回までの使用を推奨する。
上映環境で光過敏配慮が必要な可能性がある場合は使用を見送る。

## 実写素材だからこそ起きやすい失敗（追加観点）

既存の `docs/failure-patterns.md` はAI生成映像の失敗例が中心だが、
実写真・実動画をベースにしたDirector Recipeの運用でも以下に注意する。

- **人工的な手ブレの追加**: 実動画に後から人工的な揺れを足さない
  （`cam-handheld-restraint` は元の手ブレを尊重する方針を明記）。
- **均一色grade化**: 全カットに同じLUTを機械的に適用すると、
  実写真の個体差（章ごとの自然な色差）が消え、逆にAI量産動画のように均一に見える
  （`cam-exposure-true` 参照）。
- **人物・犬のfreeze/加工**: `photo-freeze-on-motion` は
  「人物や犬をAI的に加工・変形する目的で使う時（禁止）」を明記。
  静止させる演出自体は許可するが、識別困難な加工・変形は絶対禁止のまま。

## 判断フロー

新しいDirector Recipeを追加する、または既存レシピを組み合わせて実装へ進める際は、
以下の順で確認する（Style Bibleの最終判断基準を編集フローに落とし込んだもの）。

1. 二人の実素材を強くするか
2. 旅行の記憶として自然か
3. 数年後に見ても恥ずかしくないか
4. AI / テンプレを感じさせないか
5. 本ドキュメントの禁止事項リストに抵触していないか

4つの基準と禁止事項リストを両方満たさない演出は、技術的に作れても採用しない。
