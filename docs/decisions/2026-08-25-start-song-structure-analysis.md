# StaRt 曲構造分析（歌詞本文なし）

日付: 2026-08-25
状態: Phase A 研究ドキュメント
関連: `movie-dashboard/src/data/startExtendedRhythmMap.ts`, `movie-dashboard/src/data/startMotionKit.ts`, `movie-dashboard/src/data/directorRecipeCatalog.ts`

## 前提と制約

- このドキュメントは Mrs. GREEN APPLE「StaRt」の**歌詞本文を一切含まない**。
- 参照するのは既存の `LYRIC_001`〜`LYRIC_032` のID、`referenceSec`、`section`、`role` のみ。
- タイミングは `startExtendedAuthority.timingState = "researched-reference-not-final"`。
  正規/ローカル音源の波形とMarkerを確定させるまで、ここでの秒数は**参考値**として扱う。
- 著作権音源そのものはGitへコミットしない。

## 音楽的特徴（既存データからの要約）

`startExtendedResearchHypotheses`（`startExtendedRhythmMap.ts`）より。以下は音源照合前の仮説:

- BPM 190 / 拍子 4/4 / キー B major
- 編集の主gridは half-time 95 BPM（1拍 約0.632秒）
- 190 BPMは micro accent専用（線・stamp・dot・caption emphasis）
- 通常写真ホールド: half-time 2〜4拍（約1.26〜2.53秒）
- Hero写真ホールド: half-time 4〜8拍（約2.53〜5.05秒）

## 14セクション構成（reference timing）

| セクション | 秒（reference） | energy | density | cutPolicy |
|---|---|---|---|---|
| OPENING PICKUP | 0–7 | quiet | low | hold |
| INTRO | 7–17 | build | medium | half-time-cut |
| 1A | 17–28 | build | medium | half-time-cut |
| 1B | 28–38 | build | high | section-cut |
| 1 CHORUS A | 38–48 | hit | high | hold |
| 1 CHORUS B / THREE-HIT | 48–58 | peak | peak | micro-accent-only |
| INTERLUDE 1 | 58–68 | release | medium | graphic-transition |
| 2A | 68–78 | build | medium | half-time-cut |
| 2B | 78–88 | build | high | section-cut |
| 2 CHORUS A | 88–98 | peak | high | hold |
| 2 CHORUS B / THREE-HIT | 98–108 | peak | peak | micro-accent-only |
| 2nd INTERLUDE A | 108–118 | release | medium | graphic-transition |
| 2nd INTERLUDE B / RISING | 118–126 | build | high | section-cut |
| END WINDOW | 126–129 | hit | low | hold |

出典・詳細は `startExtendedRhythmMap.ts` の `startExtendedSections` を正本とする。本表はその要約。

## 楽曲の性格（分析メモ）

- OPENING PICKUPは「歌が始まる前の期待」。映像も曲より先に騒がない。
- INTROは明るい幕開けと同時に少しの不安定さが混ざり、前進感を作る。
- 1A/2Aは言葉遊びと勢いのフレーズ単位進行。歌詞の一語一語を映像で追従しない。
- 1B/2Bはサビへの期待を積む区間で、サビ直前は溜めを作る（35〜38秒付近など）。
- CHORUS Aはシンプルな上昇メロディの強さ。映像もシンプルな静止Heroで素直に受ける。
- CHORUS B / THREE-HITは擬音・リズムの遊びが最も映像化しやすい区間。パンパンパン的な3連アクセントの主戦場。
- INTERLUDEは一度ピークから呼吸し、次の展開へ再スタートする。
- 2番は1番の反復ではなく「少し違う表情」（画面文法の更新、split panel、動画insert等）で戻る。
- POST CHORUS INTERLUDE Aは総集編、Bは上昇（RISING）で次の大きな展開を予感させる。
- END WINDOWは次の転調/Cメロへ入る直前の短い助走。Wedding Openingの着地点候補。

## Lyric Timing Slotsの扱い

`startLyricTimingSlots`（32件）は歌詞本文を含まず、以下のみを保持する。

- `id`: `LYRIC_001`〜`LYRIC_032`
- `section`: 所属セクション
- `referenceSec`: 参考タイミング
- `localOrder`: セクション内の出現順
- `role`: `phrase-head` / `continuation` / `hit` / `three-hit-zone`
- `visualSuggestion`: 演出方向（歌詞の意味の要約ではなく、映像側の反応方針）

Director Recipe Catalogはこれらの `role` を直接参照せず、代わりに `recommendedStaRtSections`（セクション単位）で紐付ける。フレーズ単位の細かい割り付けはPhase C（Palmier Handoff）以降で行う。

## Energy Grammarとの対応

`QUIET → BUILD → HIT → PEAK → RELEASE` を全編で使い、常時PEAKにしない。

対応関係（reference）:

```text
QUIET   : OPENING PICKUP
BUILD   : INTRO, 1A, 1B, 2A, 2B, 2nd INTERLUDE B(RISING)
HIT     : 1 CHORUS A, END WINDOW
PEAK    : 1 CHORUS B, 2 CHORUS A, 2 CHORUS B
RELEASE : INTERLUDE 1, 2nd INTERLUDE A
```

この対応は `directorRecipeCatalog.ts` の各レシピの `energy` フィールドと整合させてある。

## 未確定事項（Phase E以降で確定）

- Final ENDの正確な秒数（reference 129秒、外部解析には127秒付近の例もある）
- 正規/ローカル音源投入後のMarker確定
- Bridge（Cメロ）区間の扱い（今回のExtended候補には含めない）

これらは `startExtendedAuthority` の `finalTimingAuthority: "cleared-local-audio-waveform-and-markers"` に従い、権利確認済み音源をPalmier/DaVinciへ投入した時点で確定する。
