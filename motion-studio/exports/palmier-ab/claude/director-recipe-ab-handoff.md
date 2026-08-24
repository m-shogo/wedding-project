# StaRt A/B Handoff — Claude Code lane

Palmier / project name for this lane: `START_AB_CLAUDE`

研究トラック（StaRt Extended Opening, Phase G）。Opening V1の正本ではない。

**このファイルは Claude Code 専用レーン。もう一方のレーンの出力ディレクトリは読まない・参照しないこと。**

## 対象区間: 00:38-00:58 (20秒)

StaRt Extended 00:38-00:58 (1 CHORUS A + 1 CHORUS B / THREE-HIT, 20秒)を、startSectionRecipeMap.ts の primary/alternate/avoidと02_opening-movie/asset-status.mdの人物・犬なしルールに従って作る。同一音源・同一20秒・同一brief。Hero写真の提示(chorus-1-a)からHero維持のまま3-hit(chorus-1-b)へ、という構造は崩さない。

生成元:
- `movie-dashboard/src/data/directorRecipeCatalog.ts`（Phase A, 97 recipes）
- `movie-dashboard/src/data/startSectionRecipeMap.ts`（Phase E, section⇄recipe mapping）
- `movie-dashboard/src/data/startExtendedRhythmMap.ts`（section timing, researched-reference-not-final）
- `movie-dashboard/src/data/startClaudeCodexAB.ts`（Phase G, comparison shape + 12 evaluation axes）

タイミングは研究用reference。Final timelineはlocal音源の波形とMarkerで確定する。

| # | Section | Marker | Dur(s) | Energy/Density | Primary Recipe | Motion Presets | Duration | Transition | Alternates |
|---|---|---|---:|---|---|---|---|---|---|
| 1 | 1 CHORUS A (`chorus-1-a`) | 00:38-00:48 | 10 | hit/high | `start-chorus-hero-lift` StaRt Chorus Hero Lift | photo-static-hero / type-word-punch | 5.00s-10.00s | hard cut。 | cam-25d-parallax / typo-frame-lock / wedding-couple-hero-duo |
| 2 | 1 CHORUS B / THREE-HIT (`chorus-1-b`) | 00:48-00:58 | 10 | peak/peak | `start-triple-hit` StaRt Triple Hit (Stamp / Line / Dot) | accent-stamp-triplet / wipe-route-line / accent-speed-lines | 5.00s-10.00s | 各hitはsingle-hit。写真自体はhold。 | travel-route-dot / anime-micro-rgb / anime-halftone-flash |

## Section詳細（Primary recipeのbuildPalmierRecipeHandoff() + section policy）

### 1. 1 CHORUS A (`chorus-1-a`) — 00:38-00:48

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

### 2. 1 CHORUS B / THREE-HIT (`chorus-1-b`) — 00:48-00:58

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

## 評価軸（12項目、docs/handoff/2026-08-25-codex-ab-comparison-handoff.md 参照）

- **Excitement / ワクワク感** (higher-is-better): 見て高揚するか。二人の旅の記憶として気持ちが上がるか。
- **Rhythm / リズム** (higher-is-better): カット割り・モーションが95/190BPMのグリッドと噛み合っているか。
- **Photo readability / 写真の可読性** (higher-is-better): Hero写真・旅行写真の主役(顔・構図・瞬間)が読めるか。
- **Typography / タイポグラフィ** (higher-is-better): 文字の量・タイミング・階層がStyle Bible(必要な情報だけ)に沿っているか。
- **3-hit execution / 3-hit演出** (higher-is-better): chorus-1-b/chorus-2-bの3-hit(stamp→line→route-dot等)がHero写真を維持したまま機能しているか。
- **Chorus lift / サビの持ち上がり** (higher-is-better): chorus-1-a→chorus-1-bで音の高揚と映像の高揚が同期しているか。
- **Anime OP feel / 冒険アニメOP感** (higher-is-better): 必要な範囲でアニメOP的なキレ(グラフィックhit、typo punch等)が効いているか。過剰ではなく効果的か。
- **AI/template risk / AI高級テンプレ感リスク** (lower-is-better): docs/02_style-bible.md の「QA — AI/Template感」チェック(2つ以上該当で再設計)に抵触する度合い。
- **Over-editing risk / 編集過多リスク** (lower-is-better): transition/graphic/motionを盛り込みすぎて、写真そのものより演出が主役になっている度合い。
- **Instruction following / 指示追従度** (higher-is-better): CLAUDE.md / Style Bible / startSectionRecipeMap.ts のprimary/avoidをどれだけ正確に守れているか。
- **Timeline cleanliness / タイムラインの整理度** (higher-is-better): trackの命名・レイヤー整理・不要clipの有無など、他の人が開いても分かる状態か。
- **Editability / 編集のしやすさ** (higher-is-better): 写真差し替え・尺調整・BGM再同期など、後工程での修正が容易な作りか。

## 完成後にやること

1. 実際に render/export した artifact のrepo相対パスを控える（例: `out/palmier-ab/claude/chorus1_ab.mp4`）。
2. `movie-dashboard/src/data/startClaudeCodexAB.ts` の対応する `artifactPath` を、実在するファイルのパスに更新する（AIが自動でwinnerを決めない）。
3. `pnpm check:claude-codex-ab` を実行し、artifactPath整合を確認する。
4. 人間が両方のartifactを実際に見て、12項目のscoreとwinnerを埋める。
