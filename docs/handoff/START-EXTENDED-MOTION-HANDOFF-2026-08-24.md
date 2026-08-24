# StaRt Extended Opening / Motion Kit / Palmier / DaVinci — Handoff

Date: 2026-08-24
Repo: `m-shogo/wedding-project`
Purpose: 新チャットでこの1ファイルを正本として読み、他のWedding作業と衝突せずStaRt Extended Openingの研究・演出・実装を継続する。

---

## 0. 最重要方針

この作業の目的は「AI動画基盤を増やすこと」ではない。

**2026-10-24 Wedding Openingを、Mrs. GREEN APPLE『StaRt』候補に合わせて、実写真・実動画を主役にした、ワクワクする旅行×Anime-OP的編集へ完成させる。**

同時に、Wedding実制作を教材としてDaVinci Resolveを学ぶ。

AIは大量の案出し・機械的な適用・比較・再利用部品生成を担当する。最終のStory / Rhythm / Photo choice / Stillness / Typography hierarchyは人間判断を残す。

人物・家族・友人・犬をAI生成しない。

---

## 1. Git authority / collision rules

### Current authority

- default branch: `main`
- #245 `feat(movie-coach): design StaRt short + extended rhythm study` はmerge済み。
- #245 merge commit: `042c7c4ba4bcaf18a0fbf988ce23b67bd5132c8c`
- このhandoff作成開始時点のmain: `f3a66a32d5b4e102226354d0dcc917a49b9ebf14`
- mainはWedding paper-item / Rurubu作業でも並行更新される。**毎回作業開始時に最新mainを再取得する。**

### Open PR

handoff作成時点: **open PR 0**。

### Branches that MUST NOT be stacked together

#### `feat/start-motion-kit-catalog`

State at handoff:
- main比: ahead 1 / behind 1
- unique diff: `movie-dashboard/src/data/startMotionKit.ts` 新規1ファイル
- 旧mainから切られている。

Next action:
- このbranchへ追加実装し続けない。
- 最新mainから新しいclean branchを作る。
- `startMotionKit.ts` の良い差分だけ移植する。
- Motion Kit専用PRにする。

#### `feat/local-opening-media-intake`

State at handoff:
- main比: ahead 2 / behind 3
- unique diff:
  - `motion-studio/.gitignore`
  - `movie-dashboard/vite.config.ts`
- ローカルで実写真をcanonical slotへアップロードする別トラック。

Rule:
- Motion Kit / StaRt演出PRへ混ぜない。
- 特に `vite.config.ts` は競合しやすいため別PRのまま扱う。

### Stale / merged-content branches

- `feat/start-rhythm-lab`
- `feat/start-rhythm-lab-current-main`

#245に内容merge済み。**以後ここへcommitしない。**

Scratch:
- `tmp-ignore`
- `tmp-noop-check`

正本として扱わない。

### Git working rule

毎変更単位:

`latest main → dedicated clean branch → small diff → contract/build CI → green → squash merge → latest main再確認`

- stacked PR禁止
- 同じファイルを並行branchで広範囲編集しない
- 大きなApp/Sidebar全置換を避ける
- Rurubu / passport / paper-item系とMovie系を同PRに混ぜない

---

## 2. Opening構成 — ShortとExtendedを両方残す

### A. Short Candidate

既存Opening V1 60秒。

用途:
- fallback
- venue short option
- DaVinci練習用
- ExtendedとのA/B比較

消さない。

### B. Extended Candidate — 本命方向

最終尺を60秒へ固定しない。

音楽的終了点:

`曲頭 → 1番 → 1番サビ → 間奏 → 2番 → 2番サビ → 直後の間奏 → Bridgeへ入る前にEND`

ユーザー意図:
- 「2番までの歌詞終わりの間奏？終わりまで」
- 今の60秒構成と似た旅行/実写真主体の文法を維持しつつ、追加して伸ばす。

**正確な終了秒はWeb推測で固定しない。**
許諾・正規音源をPalmier / DaVinciへlocal投入した時点で波形とMarkerから確定する。

### Extended narrative draft

1. Wedding greeting / welcome
2. Travel departure
3. 1番: Okinawa / Seoul / Hawaii等の実写真を読ませる
4. 1番サビ: strongest Hero photo
5. 1番後間奏: Anime-OP graphic shift
6. 2番: 写真 / 実動画 / typography / split-screen / route graphicを変化させる
7. 2番サビ: 最大peak
8. 2番サビ後間奏: 情報量を落とす
9. `HAWAII → YOKOHAMA`
10. `2026.10.24 / SHOGO & SHIORI`
11. 入場へ着地

### Opening first copy

冒頭にはWeddingらしい挨拶を置く候補を持つ。

例の役割:
- `WELCOME`
- `THANK YOU FOR COMING`
- `SHOGO & SHIORI`
- `2026.10.24`

最終文言は日本語/英語含め比較して決定する。冒頭から派手にしない。

---

## 3. StaRt Rhythm hypothesis

Current research hypothesis:
- 約190 BPM
- 写真主体main gridはhalf-time 95 BPMを第一候補
- 190 BPMの全拍で写真cutしない
- beatは命令ではなく候補
- section / story / photo-reading-timeを優先

Important candidate:
- Short CandidateではOpening Hero A 35sをsong約0:38のchorus headへ合わせる `+3s` 案をA/B対象として保持。

Do not hard-code final timing until legal/local source is loaded.

### Density grammar

`QUIET → BUILD → HIT → PEAK → RELEASE`

曲が速いほど映像を常時速くしない。

### 3-hit / パンパンパン

写真を3回切るのではなく、同一Heroを保ったままmicro graphicを3hitする案を優先比較。

Examples:
- stamp → line → route dot
- 01 → 02 → 03
- location words ×3
- small panels ×3 → Hero full frame

禁止:
- 3hit全部でfull-screen flash/shake
- 全beat zoom transition

---

## 4. Motion Showcase — Finalより先に作る研究用通し版

ユーザー希望:

**StaRtの最初からExtended終了点まで、歌詞を含めて音楽に合わせ、いろいろな文字animation / 画角 / 写真演出 / graphic演出を通しで見たい。**

これを `StaRt Motion Showcase` として先に作る。

### Showcase purpose

Finalではない。

目的:
- 最初から最後まで密度差を見る
- 30〜40種類以上のmotionを実曲へ当てる
- 同じanimationを繰り返さない
- 良い/悪い/AIっぽい/うるさいを比較する
- Finalへ採用する演出だけを選ぶ

### Lyric handling

研究用local Showcaseでは、権利確認済み・正規テキストを使える状態になったら、歌詞がある範囲を広くanimation試作してよい。

ただしGitにはfull lyricsを保存しない。

Git正本:
- `LYRIC_001`
- start/end
- phrase length
- section
- energy
- motionPresetId
- notes

実歌詞本文:
- local-only
- Git除外
- 利用条件確認後

Wedding Finalはlyric video化しない。
歌詞animationは適度に出して消し、実写真/実動画/Wedding storyを主役に戻す。

---

## 5. Motion Kit architecture

### Separation

本番timelineと演出部品を分離する。

`Extended Timeline → motionPresetId → Motion Kit → Palmier placement → DaVinci finish`

### Motion Kit V1 target

36 reusable presets:

- TYPOGRAPHY: 12
- PHOTO / CAMERA: 8
- TRANSITION: 8
- ANIME-OP GRAPHIC ACCENT: 8

**36個別componentを作らない。**
数個の共通animation engine + parameterized presetsで構成する。

### Preset metadata

Each preset should carry:
- id
- label
- category
- energy: quiet/build/hit/peak/release
- beatBehavior
- duration recommendation
- intensity: S/M/L or parameter range
- safeForStillPhoto
- source requirement
- engine: Remotion / Palmier / DaVinci / mixed
- Palmier handoff text
- DaVinci learning link / skillIds
- avoidWhen
- status: planned/renderable/reviewed/approved

AI must not auto-promote to approved.

### Typography examples

- mask reveal
- word stagger
- character stagger
- word punch
- tracking burst
- outline → fill
- baseline hop
- vertical wipe
- rhythm type-on
- 3-hit typography
- oversized off-frame type
- quiet caption

### Photo / Camera examples

- static hero
- 1.03 / 1.05 small push
- slow pull
- directional pan
- 2.5D parallax
- freeze frame + cutout
- contact sheet
- split panel

### Transition examples

- hard cut
- shape match cut
- directional wipe
- paper edge
- route line
- 1–2 frame impact
- direction-matched whip
- color field

### Anime-OP accents

- speed lines
- impact frame
- halftone
- scribble
- stamp 3-hit
- panel grid
- cel-shadow-like sweep
- brief RGB split

Do not copy the identifiable design of a specific anime OP. Learn editing grammar only.

---

## 6. Palmier / Remotion / DaVinci roles

### Palmier

Best for:
- music-aware timeline assembly
- trim / split / reorder
- trying variants
- placing generated/transparent overlays
- agent-directed rough/medium edit
- NLE XML handoff to DaVinci

Palmier is the **timeline experiment surface**.

### Remotion

Best for:
- deterministic reusable typography animation
- transparent graphic overlays
- parameterized S/M/L variants
- preview catalogue / motion reel
- code-generated reusable animation

Remotion is the **motion component factory**.

It is not a generative video model. Claude/Codex writes the React/TypeScript/Remotion implementation.

### DaVinci Resolve

Must still be learned.

Best for:
- Marker / Show Music Beats
- Trim / Ripple
- Transform / Keyframe / Ease
- Fusion only for genuinely necessary compositing
- Color
- Fairlight
- final Deliver / QA

DaVinci is the **final editorial judgment + finishing + learning environment**.

Do not let AI eliminate the need to understand the adopted technique.

---

## 7. Claude Code vs Codex

Do not choose by opinion alone. Run one controlled A/B.

### A/B experiment

Use the exact same 20–30s StaRt brief and isolated Palmier timelines/projects.

A: Claude Code + Palmier
B: Codex + Palmier

Never let both agents edit the same active Palmier timeline.

Score:
- excitement
- rhythm
- photo readability
- typography quality
- 3-hit handling
- anime-OP energy
- AI-looking artifacts
- over-editing
- instruction following
- timeline cleanliness
- ease of revision

Expected default role until evidence says otherwise:
- Claude Code: creative timeline exploration / direction
- Codex: Remotion implementation / repo / refactor / contracts / CI

But the A/B result may change Palmier primary-agent selection.

---

## 8. DaVinci learning path tied to StaRt

Do not read a book linearly.

Learn only what the current Wedding scene needs.

### Drill order

1. Marker / song sections
2. Show Music Beats vs manual section markers
3. Trim / Ripple using Okinawa 3-photo sequence
4. Hard Cut vs Dissolve
5. Transform / crop / photo framing
6. Hero Static vs 1.03 vs 1.05
7. Keyframe / Ease
8. 3-hit graphic timing
9. Text / Text+
10. Fusion only when Edit is insufficient
11. Audio fade / J-L cut
12. Color match
13. Deliver QA

Evidence state remains:
`not_started → learned → practiced → used_in_wedding → comfortable → automated`

Automation only after each Skill's policy allows it.

---

## 9. Reference / source policy

Existing merged docs from #245:
- `docs/start-rhythm-reference-notes.md`
- `docs/start-rhythm-research-sources.md`
- `docs/start-davinci-practice-map.md`
- `docs/start-extended-opening-architecture.md`
- `docs/start-palmier-motion-kit-spec.md`
- `docs/start-reference-source-policy.md`

Existing UI:
- `/movie-coach/start-rhythm`

Reference policy:
- stream/reference URLs + timecode + observation + transferable principle
- do not mirror copyrighted videos into Git
- download only official resources that are explicitly distributable
- no full copyrighted lyrics in Git

---

## 10. Current production blockers still matter

Do not let Motion Kit work hide actual production needs.

Opening Production Gate exists.

At latest verified state before this handoff:
- final Opening real-photo slots were still unresolved
- final BGM file/right state was still unresolved

Existing production tools:
- Opening Photo Intake
- Opening BGM Intake
- Motion Studio strict photo/sound/preflight/render QA

When real photo/audio assets arrive, switch priority from foundation work to actual Preview immediately.

---

## 11. Next implementation roadmap

### Phase 1 — clean Motion Kit Catalog

Start from latest main.

Do not continue directly on stale `feat/start-motion-kit-catalog`.

Move only the useful `startMotionKit.ts` data into a fresh branch.

Deliver:
- 36 preset Registry
- category/energy/source filters
- status: planned/renderable/reviewed/approved
- Palmier handoff copy button
- DaVinci learning links
- contract: exactly 36, category counts 12/8/8/8, unique IDs, no approved-by-default
- route in Movie Coach LEARN or REVIEW depending UX
- build GREEN
- squash merge

### Phase 2 — Remotion shared renderer

Create common motion engines rather than 36 bespoke components.

Likely engines:
- typography entrance/reveal
- transform/camera
- graphic-hit/accent
- transition/wipe

Deliver:
- transparent-background support where useful
- parameterized intensity
- preview composition
- renderable subset first (do not fake 36 as complete)
- Motion Reel

### Phase 3 — Palmier Handoff

Generate one structured handoff per preset:
- source slot
- phrase slot
- timing
- intensity
- placement
- expected duration
- avoid rules

Build a `StaRt Motion Showcase` rough timeline.

### Phase 4 — Claude vs Codex Palmier A/B

Same source segment, isolated timelines, same rubric.

Select primary creative Palmier agent based on artifact evidence.

### Phase 5 — Extended Showcase

Use legal/local source.

Map exact:
- song sections
- lyric slots
- 2番サビ end
- post-chorus instrumental
- Bridge boundary

Render first full Motion Showcase.

### Phase 6 — Final reduction

Do not use every preset.

Select a coherent grammar:
- recurring 4–8 motion families max
- strategic one-off peak accents
- real photos/videos remain dominant
- remove effects that do not improve story/rhythm/readability

### Phase 7 — DaVinci final

Recreate/understand adopted techniques as needed.
Finalize:
- timing
- crop
- color
- audio
- venue-safe deliver

---

## 12. Anti-patterns / stop conditions

Stop or simplify if:
- every beat creates a cut
- every lyric stays on screen
- every shot moves
- every transition is different only to show variety
- anime-OP styling overwhelms Wedding story
- AI-generated people/dogs appear
- Fusion is used because it seems advanced
- 36 presets become 36 duplicated components
- Motion Showcase is mistaken for Final
- Motion Kit becomes a new app/database instead of reusing Movie Dashboard / motion-studio
- a new PR touches unrelated paper-item/Rurubu work

---

## 13. New-chat execution prompt

Copy/paste the block below into a new chat.

---

@GitHub

あなたは `m-shogo/wedding-project` の **StaRt Extended Opening / Motion Kit / Palmier / Remotion / DaVinci担当AI** です。

まず最新mainを取得し、次の正本を最初に読んでください。

`docs/handoff/START-EXTENDED-MOTION-HANDOFF-2026-08-24.md`

その内容を今回の作業authorityとして扱ってください。

### 最終目的

2026/10/24の結婚式Openingを、Mrs. GREEN APPLE『StaRt』候補に合わせ、実写真・実動画を主役にした **旅行 × Wedding × editorial film × anime-OP的なワクワク感**のある高品質ムービーへ仕上げます。

- 60秒Short版は残す
- 本命は `2番 → 2番サビ → 直後の間奏 → Bridge直前でEND` のExtended候補
- 正確な秒はWeb推測で決めず、正規/local音源の波形とMarkerで確定
- 冒頭は `WELCOME / THANK YOU FOR COMING` 等のWedding greetingを静かに見せる
- 人物・家族・友人・犬をAI生成しない
- 実写真・実動画が主役

### 今回最優先

まず **Motion Kit V1 / 36 preset Catalog** を完成させてください。

ただし stale branch `feat/start-motion-kit-catalog` へそのまま積まないでください。

1. 最新main確認
2. open PR確認
3. stale branchのunique diffを確認
4. 最新mainからclean branchを作成
5. 良い差分だけ移植
6. Motion Kit Catalogを完成
7. contract / TypeScript / Vite build
8. GREENならsquash merge
9. latest main再確認

### Motion Kit V1

36 presets:
- Typography 12
- Photo/Camera 8
- Transition 8
- Anime-OP Graphic Accent 8

36個別componentは禁止。
数個のshared animation engine + parameterized presetにしてください。

Each preset:
- id
- category
- energy: quiet/build/hit/peak/release
- beatBehavior
- duration
- intensity
- safeForStillPhoto
- engine
- Palmier handoff
- DaVinci skill link
- avoidWhen
- status

AIが勝手にapprovedにしない。

Catalogでは:
- category filter
- energy filter
- 写真/動画/歌詞/3-hit等のuse-case filter
- Palmier handoff copy
- DaVinci learning link
- planned/renderable/reviewed/approvedを明確化

### 次の段階

Catalogをmergeしたら、続けて:

1. Remotion shared renderer
2. Preview catalogue / Motion Reel
3. StaRt Motion Showcase用Palmier handoff
4. Claude Code vs Codex Palmier 20–30秒A/B
5. 正規/local音源投入後にExtended exact marker map
6. 最初→2番サビ後の間奏まで歌詞slot付きMotion Showcase
7. Finalでは演出を削って統一
8. DaVinciで採用技法を学びながらColor/Fairlight/Deliver

まで進めてください。

### AI役割

- Claude Code: Palmierでcreative timeline explorationの第一候補
- Codex: Remotion / repo / refactor / contracts / CIの第一候補
- ただしPalmierは同じ20–30秒を同briefでA/Bしてartifactで決める
- 同じPalmier timelineをClaude/Codexで同時編集しない

### Git衝突回避

`feat/local-opening-media-intake` は別トラックです。
`.gitignore` / `movie-dashboard/vite.config.ts` を触るため、Motion Kit PRへ混ぜないでください。

Rurubu / passport / paper-itemsは完全別作業です。同PRに入れないでください。

確認だけで止まらず、安全にできる範囲は自律的に実装→PR→CI→squash mergeまで進めてください。

ただし新しい基盤を延々作らず、Motion Kitが実際のStaRt Motion ShowcaseとWedding Finalに使えることを優先してください。

---

End of handoff.
