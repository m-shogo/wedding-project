# Palmier Director Recipe Section Handoff

研究トラック（StaRt Extended Opening, Phase F）。Opening V1の正本ではない。

生成元:
- `movie-dashboard/src/data/directorRecipeCatalog.ts`（Phase A, 97 recipes）
- `movie-dashboard/src/data/startSectionRecipeMap.ts`（Phase E, section⇄recipe mapping）
- `movie-dashboard/src/data/startExtendedRhythmMap.ts`（section timing, researched-reference-not-final）

タイミングは研究用reference。Final timelineはlocal音源の波形とMarkerで確定する。

| # | Section | Marker | Dur(s) | Energy/Density | Primary Recipe | Motion Presets | Source | Duration | Transition | Alternates |
|---|---|---|---:|---|---|---|---|---|---|---|
| 1 | OPENING PICKUP (`opening-pickup`) | 00:00-00:07 | 7 | quiet/low | `cam-locked-frame` Locked Frame Observation | photo-static-hero / type-quiet-caption | both | 1.00s-5.00s | hard cutのみ。dissolveは使わない。 | photo-negative-space / wedding-welcome-greeting / editorial-silence-beat |
| 2 | INTRO (`intro`) | 00:07-00:17 | 10 | build/medium | `start-intro-ticket-lift` StaRt Intro Ticket Lift | wipe-paper-edge / wipe-route-line | both | 2.00s-3.33s | paper edge wipe→hard cut。 | travel-window-seat / typo-mask-reveal / editorial-cm-beat |
| 3 | 1A (`verse-1-a`) | 00:17-00:28 | 11 | build/medium | `start-1a-photo-read` StaRt 1A Photo Read | photo-small-push / photo-static-hero | photo-safe | 3.67s-7.33s | hard cut。 | cam-native-aspect / photo-asymmetric / editorial-crop-hierarchy |
| 4 | 1B (`verse-1-b`) | 00:28-00:38 | 10 | build/high | `start-1b-anticipation-build` StaRt 1B Anticipation Build | type-char-stagger / cut-match-shape | both | 3.00s-6.67s | match cutでサビへ接続。 | anime-scribble-underline / cam-directional-pan / travel-coastal-light |
| 5 | 1 CHORUS A (`chorus-1-a`) | 00:38-00:48 | 10 | hit/high | `start-chorus-hero-lift` StaRt Chorus Hero Lift | photo-static-hero / type-word-punch | photo-safe | 5.00s-10.00s | hard cut。 | cam-25d-parallax / typo-frame-lock / wedding-couple-hero-duo |
| 6 | 1 CHORUS B / THREE-HIT (`chorus-1-b`) | 00:48-00:58 | 10 | peak/peak | `start-triple-hit` StaRt Triple Hit (Stamp / Line / Dot) | accent-stamp-triplet / wipe-route-line / accent-speed-lines | photo-safe | 5.00s-10.00s | 各hitはsingle-hit。写真自体はhold。 | travel-route-dot / anime-micro-rgb / anime-halftone-flash |
| 7 | INTERLUDE 1 (`interlude-1`) | 00:58-01:08 | 10 | release/medium | `start-interlude-breath` StaRt Interlude Breath | wipe-route-line / color-field-release / photo-contact-sheet-snap | both | 6.67s-10.00s | color field releaseで密度を落としてから次章へ。 | cam-slow-pull / cam-exposure-true / cut-color-field |
| 8 | 2A (`verse-2-a`) | 01:08-01:18 | 10 | build/medium | `start-verse2-panel-update` StaRt Verse 2 Panel Update | photo-split-panel / cut-hard-accent | both | 3.67s-7.33s | hard cut中心。 | cam-handheld-restraint / photo-video-insert / editorial-lower-third |
| 9 | 2B (`verse-2-b`) | 01:18-01:28 | 10 | build/high | `start-verse2-playful-crop` StaRt Verse 2 Playful Crop | type-frame-lock / photo-static-hero | photo-safe | 3.00s-6.67s | hard cut。 | anime-panel-grid / photo-split-panel-duo / typo-vertical-wipe |
| 10 | 2 CHORUS A (`chorus-2-a`) | 01:28-01:38 | 10 | peak/high | `start-second-chorus-hero-b` StaRt Second Chorus Hero B | photo-static-hero / type-frame-lock | photo-safe | 5.00s-10.00s | hard cut。 | cam-25d-parallax / typo-frame-lock / wedding-couple-hero-duo |
| 11 | 2 CHORUS B / THREE-HIT (`chorus-2-b`) | 01:38-01:48 | 10 | peak/peak | `start-second-triple-hit` StaRt Second Triple Hit Escalation | accent-stamp-triplet / accent-speed-lines / wipe-route-line | photo-safe | 5.00s-10.00s | 各hitはsingle-hit。 | travel-route-dot / anime-speed-lines / anime-micro-rgb |
| 12 | 2nd INTERLUDE A (`post-chorus-interlude-a`) | 01:48-01:58 | 10 | release/medium | `start-travel-recap` StaRt Travel Recap Contact Sheet | photo-contact-sheet-snap / wipe-route-line / color-field-release | photo-safe | 6.67s-10.00s | route wipe→match cut→color field breath。 | anime-contact-sheet-recap / cut-route-wipe / wedding-quiet-tears |
| 13 | 2nd INTERLUDE B / RISING (`post-chorus-interlude-b`) | 01:58-02:06 | 8 | build/high | `start-rising-toward-yokohama` StaRt Rising Toward Yokohama | photo-directional-pan / cut-match-shape / wipe-route-line | both | 6.00s-8.00s | match-on-direction→route home。 | cam-foreground-pass / editorial-establishing-wide |
| 14 | END WINDOW (`end-before-c-section`) | 02:06-02:09 | 3 | hit/low | `start-final-name-date` StaRt Final Name Date Lock | type-frame-lock / type-tracking-burst | both | 3.00s-3.00s | hold→venue-approved audio tailまたはclean cut。 | photo-negative-space / typo-quiet-caption / wedding-vow-anticipation |

## Section詳細（Primary recipeのbuildPalmierRecipeHandoff() + section policy）

### 1. OPENING PICKUP (`opening-pickup`) — 00:00-00:07

```text
Director recipe: cam-locked-frame / Locked Frame Observation
Category: CINEMATIC_CAMERA / Locked Frame
Purpose: 強い実写真・実動画をエフェクトなしで最大化する。
Camera: 三脚固定、パン・チルトなし。被写体の内部の動きだけで画を成立させる。
Edit: カット尻を切らず、間合いを1拍分残してから次カットへ進む。
Typography: 文字は最小限。あるなら画面端に小さく静止。
Transition: hard cutのみ。dissolveは使わない。
Beat: none / Energy: quiet, peak / Density: low
Duration: 30-150 frames @30fps
Source type: both
Motion Kit presets: photo-static-hero, type-quiet-caption
Recommended StaRt sections: opening-pickup, chorus-1-a, chorus-2-a
Avoid when: 被写体自体に視線を引く要素が無い時。
AI-template risk: 低。動かさない選択はAI量産動画と最も遠い。
Over-editing risk: 低。ただし尺を伸ばしすぎると間延びする。
Keep real bride/groom/family/friends/dog imagery unchanged. Do not generate or transform identity.
This is a planned recipe. Do not auto-approve; record the artifact for human review.
```

- alternate recipes: photo-negative-space / wedding-welcome-greeting / editorial-silence-beat
- avoid in this section: rhythm-three-hit (3-hitはボーカルが入ってからのサビ専用アクセント。歌が始まる前の静かな期待を壊す。) | anime-speed-lines (曲より先に映像を騒がせない、というOPENING PICKUPのmusicalReadに反する高速グラフィック。) | cut-source-whip (avoid欄の『冒頭からflash・glitch・whip・高速montageを重ねる』に直接抵触。)
- photo hold: 写真1枚をhold中心。95BPM half-timeのHero枠(4〜8beat=約2.53〜5.05秒)を上限にし、動かさないことを優先する。
- graphic density (190bpm micro accent): 190BPM micro accent不使用。文字も『quiet caption』1行のみに絞る。
- typography level: minimal
- three-hit policy: (n/a)
- section notes: musicalRead『歌が始まる前の期待。曲より先に映像を騒がせない』を最優先。cam-locked-frameで被写体への信頼を示し、start-curtain-openで開幕の儀式感だけ足す。

### 2. INTRO (`intro`) — 00:07-00:17

```text
Director recipe: start-intro-ticket-lift / StaRt Intro Ticket Lift
Category: START_SPECIFIC / Intro Ticket Lift
Purpose: 曲の明るい幕開けと旅の出発を同時に立ち上げる。
Camera: intro(7-17s)でticket edge revealとroute line wipeを1回ずつ使う。
Edit: 半拍gridで2〜3カット。旅行UIを常設しない。
Typography: 便名風SS1024を1回だけ短く見せる。
Transition: paper edge wipe→hard cut。
Beat: 95bpm / Energy: build / Density: medium
Duration: 60-100 frames @30fps
Source type: both
Motion Kit presets: wipe-paper-edge, wipe-route-line
Recommended StaRt sections: intro
Avoid when: 全拍で写真を替えて忙しくする時。
AI-template risk: 低。
Over-editing risk: 中。
Keep real bride/groom/family/friends/dog imagery unchanged. Do not generate or transform identity.
This is a planned recipe. Do not auto-approve; record the artifact for human review.
```

- alternate recipes: travel-window-seat / typo-mask-reveal / editorial-cm-beat
- avoid in this section: cam-locked-frame (INTROのmusicalReadは『前へ進む推進感』。opening-pickupと同じ静止カメラを続けると区間の切り替わりが伝わらない。) | rhythm-three-hit (3-hitはサビ専用。0:07〜0:17でまだ使うと後半のピークが薄まる。) | photo-contact-sheet (複数写真の総集編はpost-chorus-interlude-a向け。INTROで先に使うとrecap感が重複する。)
- photo hold: 半分速cut基準。2 half-time beat(約1.26秒)を目安にticket edge revealとsmall pushへ配分する。
- graphic density (190bpm micro accent): 190BPM accentはticket edgeの一瞬のみ。旅行UIを常設しない(avoid欄準拠)。
- typography level: kicker
- three-hit policy: (n/a)
- section notes: weddingDirection『空港・搭乗券・旅の始まり』をstart-intro-ticket-lift + travel-ticket-edgeで受ける。avoid欄の『全拍で写真を替える』を避けるためhalf-time-cutに留める。

### 3. 1A (`verse-1-a`) — 00:17-00:28

```text
Director recipe: start-1a-photo-read / StaRt 1A Photo Read
Category: START_SPECIFIC / 1A Photo Read
Purpose: 1番Aメロの言葉遊びと勢いを、写真を読ませる余裕とセットで作る。
Camera: verse-1-a(17-28s)は静止+小さいpushのみ。2〜4 half-time beatsで読ませる。
Edit: 沖縄など最初の旅の写真をeditorial cropと組み合わせる。
Typography: location captionは短く、歌詞は追従表示しない。
Transition: hard cut。
Beat: 95bpm / Energy: build / Density: medium
Duration: 110-220 frames @30fps
Source type: photo-safe
Motion Kit presets: photo-small-push, photo-static-hero
Recommended StaRt sections: verse-1-a
Avoid when: 歌詞全文をカラオケのように追従表示する時。
AI-template risk: 低。
Over-editing risk: 中。
Keep real bride/groom/family/friends/dog imagery unchanged. Do not generate or transform identity.
This is a planned recipe. Do not auto-approve; record the artifact for human review.
```

- alternate recipes: cam-native-aspect / photo-asymmetric / editorial-crop-hierarchy
- avoid in this section: rhythm-three-hit (1Aはまだフレーズ単位の導入部。3-hitを使うとchorus-1-bの初出が弱まる。) | anime-impact-frame (avoid欄の『歌詞全文をカラオケのように追従表示する』と同種の勢い過多。フレーズ単位の静かな読みを優先する区間には強すぎる。) | typo-word-punch (word punchはchorus区間のhit語向け。1Aで先に使うとサビの効果が減る。)
- photo hold: 2〜4 half-time beat(約1.26〜2.53秒)。沖縄など最初の旅の写真をフレーズ単位で読ませる。
- graphic density (190bpm micro accent): 低。location captionのみ、190BPM accentは使わない。
- typography level: short-caption
- three-hit policy: (n/a)
- section notes: musicalRead『言葉遊びと勢いが始まる。歌詞の一語一語ではなくフレーズ単位で進める』をcam-restrained-push主体の静かな寄りで支える。

### 4. 1B (`verse-1-b`) — 00:28-00:38

```text
Director recipe: start-1b-anticipation-build / StaRt 1B Anticipation Build
Category: START_SPECIFIC / 1B Anticipation Build
Purpose: サビ前の溜めをStaRt特有の遊び心と共に作る。
Camera: verse-1-b(28-38s)でchar staggerとmatch cutを使い、35〜38秒は最後の写真を長めに保持して溜める。
Edit: Seoul/Hawaiiへ展開。写真の長短差でリズムの遊びを増やす。
Typography: char stagger typoを1回だけ使用。
Transition: match cutでサビへ接続。
Beat: 95bpm / Energy: build / Density: high
Duration: 90-200 frames @30fps
Source type: both
Motion Kit presets: type-char-stagger, cut-match-shape
Recommended StaRt sections: verse-1-b
Avoid when: サビ前だからzoom・blur・speed linesを全部足す時。
AI-template risk: 低。
Over-editing risk: 高。
Keep real bride/groom/family/friends/dog imagery unchanged. Do not generate or transform identity.
This is a planned recipe. Do not auto-approve; record the artifact for human review.
```

- alternate recipes: anime-scribble-underline / cam-directional-pan / travel-coastal-light
- avoid in this section: cam-locked-frame (musicalRead『遊び心が強まり、サビへ期待を積む区間』に対し静止カメラは推進感を止めてしまう。) | rhythm-density-contrast (density-contrastは間奏(release)専用の緩急設計。サビ直前で使うと逆に勢いを削ぐ。) | wedding-quiet-tears (感情のトーンが早すぎる。静かな涙の演出はpost-chorus-interlude-a向け。)
- photo hold: 2〜3 half-time beat。最後の1枚だけ35〜38秒付近の『溜め』としてやや長めに保持する。
- graphic density (190bpm micro accent): playful graphic accentは1つまで。avoid欄の『zoom・blur・speed linesを全部足す』を避ける。
- typography level: word-accent
- three-hit policy: (n/a)
- section notes: weddingDirection『Seoul/Hawaiiへ展開。写真の長短と文字の遊びを少し増やし、溜める』をtypo-vertical-wipe + anime-scribble-underlineの控えめな1発だけで表現する。

### 5. 1 CHORUS A (`chorus-1-a`) — 00:38-00:48

```text
Director recipe: start-chorus-hero-lift / StaRt Chorus Hero Lift
Category: START_SPECIFIC / Chorus Hero Lift
Purpose: サビ頭のシンプルな上昇メロディを、シンプルな静止Heroで受ける。
Camera: chorus-1-a(38-48s)頭0.5〜1秒は完全static、以後small pushのみ許可。
Edit: 最強Hero写真1枚をfull-bleedで大きく。文字は短く。
Typography: word punchを1語だけ。
Transition: hard cut。
Beat: 95bpm / Energy: hit / Density: high
Duration: 150-300 frames @30fps
Source type: photo-safe
Motion Kit presets: photo-static-hero, type-word-punch
Recommended StaRt sections: chorus-1-a
Avoid when: サビ頭をtransitionの派手さで潰す時。
AI-template risk: 低。
Over-editing risk: 低。
Keep real bride/groom/family/friends/dog imagery unchanged. Do not generate or transform identity.
This is a planned recipe. Do not auto-approve; record the artifact for human review.
```

- alternate recipes: cam-25d-parallax / typo-frame-lock / wedding-couple-hero-duo
- avoid in this section: cut-source-whip (avoid欄『サビ頭をtransitionの派手さで潰す』に直接抵触。) | anime-halftone-flash (halftone flashはchorus-1-bの3-hit専用アクセント。サビ頭で先出しすると本来の3-hitの初出インパクトが減る。) | photo-contact-sheet (サビ頭は最強Hero写真1枚を大きく見せる区間。複数写真並べは主役をぼやけさせる。)
- photo hold: Hero写真を4〜8 half-time beat(約2.53〜5.05秒)保持。最初の0.5〜1秒は完全staticも比較する。
- graphic density (190bpm micro accent): 最小。clean full bleedを優先し、graphicで飾らない。
- typography level: word-accent
- three-hit policy: (n/a)
- section notes: musicalRead『サビ頭。シンプルな上昇メロディの強さを映像でも素直に受ける』をphoto-full-bleed + cam-locked-frameのstatic-firstで受ける。

### 6. 1 CHORUS B / THREE-HIT (`chorus-1-b`) — 00:48-00:58

```text
Director recipe: start-triple-hit / StaRt Triple Hit (Stamp / Line / Dot)
Category: START_SPECIFIC / Triple Hit Stamp Line Dot
Purpose: パンパンパン的な擬音リズムを、写真を主役にしたまま可視化する。
Camera: chorus-1-b(48-58s)、同一Hero写真を維持したままstamp→line→route dotの3-hitのみ動かす。
Edit: 写真を切らずmicro graphicだけで3連リズムを表現する最優先案。
Typography: 01/02/03のような短い記号のみ。
Transition: 各hitはsingle-hit。写真自体はhold。
Beat: 190bpm / Energy: peak / Density: peak
Duration: 150-300 frames @30fps
Source type: photo-safe
Motion Kit presets: accent-stamp-triplet, wipe-route-line, accent-speed-lines
Recommended StaRt sections: chorus-1-b
Avoid when: 3-hitごとにfull-screen flash/shake/cutを行う時。
AI-template risk: 低。
Over-editing risk: 高。
Keep real bride/groom/family/friends/dog imagery unchanged. Do not generate or transform identity.
This is a planned recipe. Do not auto-approve; record the artifact for human review.
```

- alternate recipes: travel-route-dot / anime-micro-rgb / anime-halftone-flash
- avoid in this section: cam-slow-pull (slow pullはinterlude-1のrelease向けカメラ。3-hit区間の擬音的な弾みと噛み合わない。) | photo-contact-sheet (weddingDirection『写真を3回切らず、同一Hero上でstamp→line→route dotの3-hit』と矛盾。複数写真を並べると同一Hero維持の原則が崩れる。) | editorial-establishing-wide (establishing wideはdensity低のセットアップ文法。density=peakのこの区間には合わない。)
- photo hold: Hero写真は同一のまま保持。3-hit中は写真自体を切らない(0カット)。
- graphic density (190bpm micro accent): 190BPM micro accentをstamp/line/route-dotへ3回だけ使う。全画面には使わない。
- typography level: none
- three-hit policy: 同一Hero写真を維持したまま stamp → line → route-dot の3-hitで表現する。3-hitごとにfull-screen flash/shake/cutを行わない(既存avoid方針を踏襲)。
- section notes: musicalRead『擬音とリズムの遊びが最も映像化しやすい区間』をstart-triple-hit + rhythm-three-hitのgraphic hit3連で処理し、写真そのものは動かさない。

### 7. INTERLUDE 1 (`interlude-1`) — 00:58-01:08

```text
Director recipe: start-interlude-breath / StaRt Interlude Breath
Category: START_SPECIFIC / Interlude Breath
Purpose: 1番のピークから2番への呼吸を作る。
Camera: interlude-1(58-68s)は写真文法から一度離れ、route/map/plane-windowを1回だけ挟む。
Edit: 10秒全部を地図アニメにせず、人物写真も部分的に残す。
Typography: 地名程度のみ。
Transition: color field releaseで密度を落としてから次章へ。
Beat: none / Energy: release / Density: medium
Duration: 200-300 frames @30fps
Source type: both
Motion Kit presets: wipe-route-line, color-field-release, photo-contact-sheet-snap
Recommended StaRt sections: interlude-1
Avoid when: 10秒全部を地図アニメにして人物写真を消す時。
AI-template risk: 低。
Over-editing risk: 中。
Keep real bride/groom/family/friends/dog imagery unchanged. Do not generate or transform identity.
This is a planned recipe. Do not auto-approve; record the artifact for human review.
```

- alternate recipes: cam-slow-pull / cam-exposure-true / cut-color-field
- avoid in this section: rhythm-three-hit (この区間はenergy=release。3-hitはpeak専用アクセントで、呼吸を作る目的と逆行する。) | start-chorus-hero-lift (Hero写真の連続提示はサビの文法。interludeはroute/map文法へ切り替える区間(weddingDirection準拠)。) | anime-impact-frame (impact frameはhit/peak向けの強いグラフィック。release区間の呼吸感を壊す。)
- photo hold: 写真主体ではなくroute/map文法。写真を使う場合でも1回だけ、4〜6秒程度に留める。
- graphic density (190bpm micro accent): 190BPM accent不使用。cut-route-wipe / cut-color-fieldのgraphic-transitionのみ。
- typography level: short-caption
- three-hit policy: (n/a)
- section notes: musicalRead『1番のピークから一度呼吸し、2番へ再スタートする』とweddingDirection『Route/map/plane-windowなど、実写真とは違う文法を一度だけ挟む』をそのまま反映。

### 8. 2A (`verse-2-a`) — 01:08-01:18

```text
Director recipe: start-verse2-panel-update / StaRt Verse 2 Panel Update
Category: START_SPECIFIC / Verse2 Panel Update
Purpose: 2番の「1番のコピーではない」感覚を画面文法の更新で作る。
Camera: verse-2-a(68-78s)でsplit panelと動画insertを限定的に使い、画面文法を更新する。
Edit: 1番と全く同じ写真枚数・同じtransitionで繰り返さない。
Typography: lower-third typeを1回。
Transition: hard cut中心。
Beat: 95bpm / Energy: build / Density: medium
Duration: 110-220 frames @30fps
Source type: both
Motion Kit presets: photo-split-panel, cut-hard-accent
Recommended StaRt sections: verse-2-a
Avoid when: 1番と全く同じ構成で繰り返す時。
AI-template risk: 低。
Over-editing risk: 中。
Keep real bride/groom/family/friends/dog imagery unchanged. Do not generate or transform identity.
This is a planned recipe. Do not auto-approve; record the artifact for human review.
```

- alternate recipes: cam-handheld-restraint / photo-video-insert / editorial-lower-third
- avoid in this section: start-1a-photo-read (avoid欄『1番と全く同じ写真枚数・同じtransitionで繰り返す』に抵触。1Aの文法をそのまま2Aへ流用しない。) | cam-restrained-push (1Aのcam-restrained-pushをそのまま繰り返すと『画面文法を更新』というweddingDirectionに反する。) | photo-sequence-trio (1A専用の連写文法。2Aはsplit panelや動画insertで差別化する方針のため使わない。)
- photo hold: 2〜4 half-time beat。split panelは2枚同時evaluate、video insertは1カット分を確保する。
- graphic density (190bpm micro accent): low〜medium。lower-third typeのみ限定使用。
- typography level: short-caption
- three-hit policy: (n/a)
- section notes: musicalRead『1番のコピーではなく、少し違う表情で戻る』を守るため、1Aで使った主要レシピを意図的にavoidへ回し、split panel/video insert/foreground passで画面文法を更新する。

### 9. 2B (`verse-2-b`) — 01:18-01:28

```text
Director recipe: start-verse2-playful-crop / StaRt Verse 2 Playful Crop
Category: START_SPECIFIC / Verse2 Playful Crop
Purpose: StaRtのユーモアを2番の大胆さとして反映する。
Camera: verse-2-b(78-88s)でoversized wordと編集的cropを1つだけ許可する。
Edit: ネタ演出を長く引っ張らず、2人より演出が主役にならないよう時間を制限する。
Typography: oversized off-frame wordを1語。
Transition: hard cut。
Beat: none / Energy: build / Density: high
Duration: 90-200 frames @30fps
Source type: photo-safe
Motion Kit presets: type-frame-lock, photo-static-hero
Recommended StaRt sections: verse-2-b
Avoid when: ネタ演出を長く引っ張り、2人より演出が主役になる時。
AI-template risk: 低。
Over-editing risk: 高。
Keep real bride/groom/family/friends/dog imagery unchanged. Do not generate or transform identity.
This is a planned recipe. Do not auto-approve; record the artifact for human review.
```

- alternate recipes: anime-panel-grid / photo-split-panel-duo / typo-vertical-wipe
- avoid in this section: wedding-quiet-tears (musicalRead『ユーモアが強く、次のサビへ再び跳ねる』とトーンが逆。静かな涙の演出はここでは早すぎる。) | cam-locked-frame (weddingDirection『少し大胆なcrop・panel・一瞬のgraphic jokeを許可』に対し、静止カメラはユーモアの跳ねを止める。) | rhythm-three-hit (3-hitはサビ専用。2番サビ前でまだ使うとchorus-2-bの再登場インパクトが薄まる。)
- photo hold: 2〜3 half-time beat。大胆cropは短く、長く引っ張らない。
- graphic density (190bpm micro accent): 一瞬のgraphic jokeのみ許可。avoid欄『ネタ演出を長く引っ張り、2人より演出が主役になる』を避ける。
- typography level: word-accent
- three-hit policy: (n/a)
- section notes: weddingDirection『少し大胆なcrop・panel・一瞬のgraphic jokeを許可。ただしWeddingの品は維持』を、anime-oversized-word 1発 + editorial-cropで表現する。

### 10. 2 CHORUS A (`chorus-2-a`) — 01:28-01:38

```text
Director recipe: start-second-chorus-hero-b / StaRt Second Chorus Hero B
Category: START_SPECIFIC / Second Chorus Hero B
Purpose: 2番サビでの発展感を作る。
Camera: chorus-2-a(88-98s)は最強Hero写真Bをstatic first、edge typographyのみ追加。
Edit: 1サビより激しいzoomを入れるのではなく、写真選び・サイズ・余白・graphic密度で格上げする。
Typography: edge typographyを1回。
Transition: hard cut。
Beat: 95bpm / Energy: peak / Density: high
Duration: 150-300 frames @30fps
Source type: photo-safe
Motion Kit presets: photo-static-hero, type-frame-lock
Recommended StaRt sections: chorus-2-a
Avoid when: 1サビより激しいzoomを入れるだけで差を作る時。
AI-template risk: 低。
Over-editing risk: 中。
Keep real bride/groom/family/friends/dog imagery unchanged. Do not generate or transform identity.
This is a planned recipe. Do not auto-approve; record the artifact for human review.
```

- alternate recipes: cam-25d-parallax / typo-frame-lock / wedding-couple-hero-duo
- avoid in this section: cut-source-whip (avoid欄『1サビより激しいzoomを入れるだけで差を作る』の具体例。effectで差別化しない方針に反する。) | anime-speed-lines (speed linesはchorus-2-bの3-hit専用に予約。ここで先出しすると2回目3-hitの新鮮さが減る。) | photo-contact-sheet (chorus-1-aと同じ理由。最強Hero写真1枚に絞る方針と矛盾する複数写真並べ。)
- photo hold: 最強Hero写真B。static firstを基本に4〜8 half-time beat保持。
- graphic density (190bpm micro accent): 1サビより増やさない。写真選び・サイズ・余白・graphic密度で格上げする(weddingDirection準拠)。
- typography level: word-accent
- three-hit policy: (n/a)
- section notes: musicalRead『1サビより細部の音が増え、同じメロディでも高揚が一段上がる』を、chorus-1-aと同じ骨格(locked frame + full bleed)のまま写真選定だけ格上げして受ける。

### 11. 2 CHORUS B / THREE-HIT (`chorus-2-b`) — 01:38-01:48

```text
Director recipe: start-second-triple-hit / StaRt Second Triple Hit Escalation
Category: START_SPECIFIC / Second Triple Hit Escalation
Purpose: 2番の3-hitを1番の再演ではなく発展として提示する。
Camera: chorus-2-b(98-108s)、1回目の3-hitより10〜20%だけ強いstamp/line/dot。Heroは保持する。
Edit: 音が増えた分だけcut数を増やさず、写真は読める密度を維持する。
Typography: date tickなど1回目と別のmotifを使い『また来た』感を作る。
Transition: 各hitはsingle-hit。
Beat: 190bpm / Energy: peak / Density: peak
Duration: 150-300 frames @30fps
Source type: photo-safe
Motion Kit presets: accent-stamp-triplet, accent-speed-lines, wipe-route-line
Recommended StaRt sections: chorus-2-b
Avoid when: 音が増えた分だけcut数も増やして写真を読めなくする時。
AI-template risk: 低。
Over-editing risk: 高。
Keep real bride/groom/family/friends/dog imagery unchanged. Do not generate or transform identity.
This is a planned recipe. Do not auto-approve; record the artifact for human review.
```

- alternate recipes: travel-route-dot / anime-speed-lines / anime-micro-rgb
- avoid in this section: cam-slow-pull (chorus-1-bと同じ理由。release向けカメラはpeak/peakのリズムピークに合わない。) | editorial-establishing-wide (density=peak区間にdensity=lowのセットアップ文法を混ぜない。) | photo-contact-sheet (chorus-1-bと同じ理由。Hero写真の単一維持と矛盾する。)
- photo hold: Hero写真を保持。1回目3-hitより10〜20%だけ強度を上げるが、写真自体は切らない。
- graphic density (190bpm micro accent): stamp triplet L / speed-line single / route dot / date tick。音が増えた分をcut数でなくgraphicで拾う(avoid欄準拠)。
- typography level: none
- three-hit policy: 1回目のchorus-1-b 3-hitより10〜20%だけ強いstamp/line/dot。line/dot/stampの順序を変えて『また来た！』という反復と差分を同時に作る。Heroは保持する。
- section notes: musicalRead『2番のリズムピーク。細かい音の増加をmicro graphicで拾う』を、chorus-1-bと同系統だが強度だけ上げたstart-second-triple-hit + start-three-hit-motif-rotationで処理する。

### 12. 2nd INTERLUDE A (`post-chorus-interlude-a`) — 01:48-01:58

```text
Director recipe: start-travel-recap / StaRt Travel Recap Contact Sheet
Category: START_SPECIFIC / Travel Recap Contact Sheet
Purpose: 2番サビ後の間奏で旅全体を一度振り返る。
Camera: post-chorus-interlude-a(108-118s)で沖縄→Seoul→Hawaii→Yokohamaを写真2〜4枚+routeで繋ぐ。
Edit: サビ終了直後からEND CARDを10秒以上固定しない。
Typography: 地名を短く連続表示。
Transition: route wipe→match cut→color field breath。
Beat: none / Energy: release / Density: high
Duration: 200-300 frames @30fps
Source type: photo-safe
Motion Kit presets: photo-contact-sheet-snap, wipe-route-line, color-field-release
Recommended StaRt sections: post-chorus-interlude-a
Avoid when: サビ終了直後からEND CARDを10秒以上固定する時。
AI-template risk: 低。
Over-editing risk: 高。
Keep real bride/groom/family/friends/dog imagery unchanged. Do not generate or transform identity.
This is a planned recipe. Do not auto-approve; record the artifact for human review.
```

- alternate recipes: anime-contact-sheet-recap / cut-route-wipe / wedding-quiet-tears
- avoid in this section: rhythm-three-hit (2番サビ直後の熱を逃がすenergy=release区間。peak専用の3-hitをここで使うと呼吸が作れない。) | start-chorus-hero-lift (単一Hero固定の文法ではなく、複数地点recapが目的の区間。Hero lift文法を持ち込むと総集編の役割とずれる。) | cut-source-whip (release方向へ向かう区間に激しいwhipは不釣り合い。)
- photo hold: 沖縄→Seoul→Hawaii→Yokohamaの写真2〜4枚をrouteで繋ぐ。各1.3〜2秒程度(2 half-time beat前後)。
- graphic density (190bpm micro accent): 190BPM accent最小限。color fieldでbreathを作る。
- typography level: short-caption
- three-hit policy: (n/a)
- section notes: weddingDirection『旅の総集編。沖縄→Seoul→Hawaii→Yokohamaを写真2〜4枚＋routeで繋ぐ』をphoto-contact-sheet + travel-multileg-recapで直接受ける。

### 13. 2nd INTERLUDE B / RISING (`post-chorus-interlude-b`) — 01:58-02:06

```text
Director recipe: start-rising-toward-yokohama / StaRt Rising Toward Yokohama
Category: START_SPECIFIC / Rising Toward Yokohama
Purpose: ベース/和声の上昇と映像の収束を連動させる。
Camera: post-chorus-interlude-b(118-126s)で横浜・会場・2人の後ろ姿へ収束し、1枚ずつスケールを大きくする。
Edit: cutを速くしすぎず、progressive scale hierarchyで上昇感を作る。
Typography: 併用最小限。
Transition: match-on-direction→route home。
Beat: 95bpm / Energy: build / Density: high
Duration: 180-240 frames @30fps
Source type: both
Motion Kit presets: photo-directional-pan, cut-match-shape, wipe-route-line
Recommended StaRt sections: post-chorus-interlude-b
Avoid when: 上昇感をliteralな常時zoomだけで表現する時。
AI-template risk: 低。
Over-editing risk: 中。
Keep real bride/groom/family/friends/dog imagery unchanged. Do not generate or transform identity.
This is a planned recipe. Do not auto-approve; record the artifact for human review.
```

- alternate recipes: cam-foreground-pass / editorial-establishing-wide
- avoid in this section: rhythm-three-hit (3-hitはchorus区間専用のpeakアクセント。上昇構築中のこの区間で使うとpeakを先取りしてしまう。) | photo-contact-sheet (収束段階なのでrecapでなく単一スケール拡大を優先する(weddingDirection準拠)。総集編文法はpost-chorus-interlude-aで既に使用済み。) | anime-scribble-underline (ユーモア系グラフィックはverse-2-b向け。横浜への収束という厳粛なmoodと不一致。)
- photo hold: 1枚ずつスケールを大きくする。cutを速くしすぎず2〜3 half-time beatを目安にする。
- graphic density (190bpm micro accent): 上昇感をliteralな常時zoomだけで表現しない(avoid欄準拠)。route home等の意味あるgraphicのみ。
- typography level: minimal
- three-hit policy: (n/a)
- section notes: musicalRead『ベース/和声が上方向へ進み、次の大きな展開を予感させる』をrhythm-rising-bar + travel-arrival-homeで受け、venue名等の情報はend-before-c-sectionへ温存する。

### 14. END WINDOW (`end-before-c-section`) — 02:06-02:09

```text
Director recipe: start-final-name-date / StaRt Final Name Date Lock
Category: START_SPECIFIC / Final Name Date Lock
Purpose: 曲のC メロ突入直前をWedding Openingの着地点にする。
Camera: end-before-c-section(126-129s)、SHOGO & SHIORI / 2026.10.24を最小情報で確定表示。
Edit: Cメロへ入ってから無理に切らず、最後の音に合わせて静止→入場へ。
Typography: title lock + tracking burst ending。
Transition: hold→venue-approved audio tailまたはclean cut。
Beat: none / Energy: hit / Density: low
Duration: 90-90 frames @30fps
Source type: both
Motion Kit presets: type-frame-lock, type-tracking-burst
Recommended StaRt sections: end-before-c-section
Avoid when: 最後だけ豪華ロゴanimationを追加する時。
AI-template risk: 低。
Over-editing risk: 低。
Keep real bride/groom/family/friends/dog imagery unchanged. Do not generate or transform identity.
This is a planned recipe. Do not auto-approve; record the artifact for human review.
```

- alternate recipes: photo-negative-space / typo-quiet-caption / wedding-vow-anticipation
- avoid in this section: rhythm-three-hit (END WINDOWは単発のhit。3連打のアクセントを持ち込むと『最後だけ豪華ロゴanimationを追加する』というavoid欄の失敗と同種になる。) | anime-speed-lines (avoid欄『最後だけ豪華ロゴanimationを追加する』と同種の過剰演出。静かな着地を壊す。) | cut-source-whip (Cメロへ入る直前は『無理に切る』のではなく静止→入場への着地が必要(weddingDirection準拠)。)
- photo hold: 写真は基本使わないか、既出Hero静止1枚のみ。最小情報表示に絞る。
- graphic density (190bpm micro accent): 190BPM accent不使用。最後の音に合わせて静止する。
- typography level: title-lock
- three-hit policy: (n/a)
- section notes: weddingDirection『SHOGO & SHIORI / 2026.10.24 / LET'S START など最小情報。最後の音に合わせて静止→入場へ』をstart-final-name-date + wedding-date-venue-lockでそのまま実装する。

