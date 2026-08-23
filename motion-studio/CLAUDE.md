# CLAUDE.md — motion-studio AI向け引き継ぎ

このファイルはClaude/Codex等のAI向け。結婚式全体方針は `../CLAUDE.md`、人間向け操作は `README.md` / `MANUAL.md`。

## 最優先

**2026-10-24に上映するOpening V1を完成させる。**

基盤・テンプレート・研究を増やすことより、実写真を入れて完成映像へ近づけることを優先する。

## Opening V1 authority

現行source of truth:

- `src/index-opening-v1.ts`
- `src/OpeningV1Root.tsx`
- `src/compositions/opening/OpeningV1.tsx`
- `src/data/openingV1.ts`
- `src/data/openingV1Media.ts`
- `src/data/openingV1Sound.ts`
- `../docs/opening-v1-motion-map.md`

仕様:

- 60秒
- 1920×1080 / 30fps
- 8scene
- 実写真scene 53秒（約88%）
- 必須AI B-roll 0本
- 冒頭は2秒Photo cold open
- RemotionがOpening V1の最終source of truth
- Palmier / CapCutは必要時のfinal polishのみ

**旧 `開幕-全体確認` 82秒、90秒/105秒storyboard、CloudSea構成をOpening正本として扱わない。**

## 現行timeline

```text
00:00–00:02 Photo cold open
00:02–00:13 Okinawa
00:13–00:24 Seoul
00:24–00:35 Hawaii
00:35–00:44 Hero A
00:44–00:53 Hero B
00:53–00:57 Hawaii → Yokohama
00:57–01:00 Documentary end card
```

## Visual QAで不採用になったもの

Opening V1へ機械的に戻さない:

- 5秒中央serif title card
- `CloudSea` 4秒transition
- 大きいWedding風ending title
- 均等3枚Photo Card
- 全写真Ken Burns
- `MEMORY 01` / `WELCOME ABOARD` / `OUR JOURNEY`等の説明kicker

理由: 実renderを目視した結果、AI高級テンプレ / 生成背景に見えたため。

## 写真

Git外:

`public/photos/opening/`

canonical 11枚:

```text
okinawa-01.jpg
okinawa-02.jpg
okinawa-03.jpg
seoul-01.jpg
seoul-02.jpg
seoul-03.jpg
hawaii-01.jpg
hawaii-02.jpg
hawaii-03.jpg
hero-01.jpg
hero-02.jpg
```

`pnpm dev:opening-v1` / preview / finalの前に自動探索される。

- preview: 不足写真があってもplaceholderで続行
- final: 11/11揃うまで失敗
- 実写真をGitへcommitしない

### fit

- full: `cover`
- left/right: `cover`
- wide: `contain`
- cold open / Hero A / Hero B: `contain`

縦写真をblur背景で16:9化しない。
顔が切れるcover slotだけ `objectPosition` を調整する。

## motion

- staticが第一候補
- pushはごく小さく（現行最大約2.4%）
- driftも小さく
- 全写真同じ動きは禁止寄り
- transitionを増やすよりhard cutを優先
- zoom/whip/glow/film burnを常用しない

実写真投入後は、地名順よりvisual/semantic matchが強ければcut順を変えてよい。

評価例:

- horizon → horizon
- gaze → gaze
- hand/detail → hand/detail
- walking direction
- blue → blue / warm → warm

## 音

音源レジストリ: `src/data/assets.ts`

cue: `src/data/openingV1Sound.ts`

- `candidate / approved / final` のaudioだけ再生
- `missing` / 権利未確認音源は再生しない
- 海・街・会場room toneをJ-cutで少し先行
- whooshを全cutへ置かない
- BGM利用条件は会場上映とSNS投稿を分けて確認

## AI B-roll

AI動画を作ること自体をゴールにしない。

まず11枚実写真+BGMで60秒previewを通す。

弱いcutが特定された時だけ:

1. shotの役割を言語化
2. Prompt Builderでatomic prompt化
3. 人物・犬・読める文字なし
4. 実写/Remotion/AI候補を比較
5. AIが明確に良い時だけ採用

有料生成は明示許可があるまで実行しない。

## Openingコマンド

```sh
pnpm dev:opening-v1
pnpm prepare:opening-v1
pnpm render:opening-v1:preview
pnpm render:opening-v1
pnpm typecheck
pnpm check
pnpm check:opening-sound
pnpm qa:opening-stills
pnpm exec remotion compositions src/index-opening-v1.ts
```

## QA

Opening変更後:

1. `pnpm prepare:opening-v1`
2. `pnpm typecheck`
3. `pnpm check`
4. `pnpm check:opening-sound`
5. composition contract
6. `pnpm qa:opening-stills`
7. 60秒 / 1920×1080 / 30fps確認
8. GitHub Actions artifact `opening-v1-qa-stills` を**実際に目視**

CI GREENだけで見た目を承認しない。

現在は10-frame QA:

- cold open
- Okinawa full + label
- Okinawa left
- Seoul right + label
- Hawaii full + label
- Hawaii wide
- Hero A
- Hero B
- Arrival
- Ending

placeholderは写真領域だけ薄いコントラストを出し、レイアウトをQAできるようにする。本番写真が入ればplaceholderは消える。

## AssetStatus

```text
missing
→ idea
→ prompt_ready
→ generated_preview
→ candidate
→ approved
→ final
```

`external` もあり。

- AIが勝手にcandidate以上へ上げない
- `generated_preview`は本番扱いしない
- approved/final素材が無ければcheckエラー
- render成果物はGitへ入れない

## 既存Studio側

`src/Root.tsx` / `sceneRegistry.ts` には過去の短尺テンプレート群が残る。

例:

- boarding pass
- map
- stamp
- countdown
- cloud/window/door
- photo card
- profile parts

これらはOpening V1の正本ではない。
Opening修正時に新テンプレを増やす前に、`OpeningV1.tsx`だけで解決できないか確認する。

## 技術ルール

- 色/フォントは `src/data/theme.ts` / `fonts.ts` を使う
- `Math.random()`禁止。必要ならRemotionのdeterministic `random()`
- `out/` / `public/photos/` / 本番audioはGit外
- `photoLibrary.generated.ts` は生成ファイル。手編集しない
- `src/data/assets.ts` のpath/statusを素材正本にする
- Node直実行 `.mts` とRemotion browser codeの責務を混ぜない
- Root.tsxのdefaultPropsをregistryから自動生成しない（Remotion Studio Save defaults制約）
- alpha素材を触ったらVP9/ProRes alphaを検証

## 現在の次作業

新しい基盤を増やさない。

**実写真11枚 → preview → crop/focus → cut順 → BGM/現地音 → final QA**

の順で進める。
