# Wedding Opening Authority

2026-10-24上映用Openingの候補、実装、タイミング正本を混同しないための単一入口。

## Product authority

- **StaRt Extended Candidate = 本命方向**
- **Opening V1 60秒 = Short Candidate / venue fallback / 比較用**
- 最終採用は、権利確認済みlocal音源と実写真・実動画を使った両candidateのartifactを人間が確認して決める。
- 60秒版の実装が先に完成していることを、最終product authorityの根拠にしない。

## Implementation authority

### Extended Candidate

- 構成・制作方針: `docs/handoff/START-EXTENDED-MOTION-HANDOFF-2026-08-24.md`
- 14 section: `movie-dashboard/src/data/startExtendedRhythmMap.ts`
- section ⇄ recipe: `movie-dashboard/src/data/startSectionRecipeMap.ts`
- recipe / preset / renderer: `movie-dashboard/src/data/directorRecipeCatalog.ts`、`movie-dashboard/src/data/startMotionKit.ts`、`motion-studio/src/motion-kit/`
- 正規音源未投入のため `AUDIO_BLOCKED`。Git内の秒数・BPM・keyは研究仮説でありFinal値ではない。
- Director Recipe Previewは実素材未投入のため `MEDIA_BLOCKED`。placeholderを完成映像として扱わない。

### Short Candidate

- Remotion source: `motion-studio/src/data/openingV1.ts` / `motion-studio/src/compositions/opening/OpeningV1.tsx`
- 編集言語・QA: `docs/opening-v1-motion-map.md`
- 60秒 / 8 scene / canonical写真11枚の実装済みfallback。
- Palmier / CapCutは必要なfinal polishに限定し、別timelineを正本として育てない。

## Final timing authority

`cleared local audio → waveform → section markers → beat/onset review`

- Web・YouTube・外部解析の秒数をFinal markerへ直接コピーしない。
- `exactEndMarker`はlocal音源を確認するまで`null`を保つ。
- 歌詞本文はGitへ保存せず、`LYRIC_###` slotだけを使う。

## Current production order

1. 権利確認済みStaRt音源を用意する。
2. 実写真・実動画を選定し、ExtendedとShortで共有できるsource authorityを作る。
3. local音源の波形からExtended 14 sectionのmarkerを確定する。
4. Extendedを4〜8 motion familyへ絞ったroughとしてrenderする。
5. Short 60秒fallbackも同じ素材条件でrenderし、人間が両artifactを比較する。
6. 採用candidateだけを本番QA・会場納品へ進める。

Recipe Catalogを増やすことより、本番artifactを完成させることを優先する。
