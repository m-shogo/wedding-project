# StaRt Rhythm Reference Notes

> Status: research candidate. `StaRt` はOpening BGMの有力候補だが、会場上映の権利確認・実音源投入・A/B試写が済むまではFinal決定ではない。

## 研究方針

- 著作権のあるYouTube / Wedding sample動画はrepoへ無断保存・再配布しない。
- 学習資産として `URL + 見る観点 + timecode + Weddingへの転用判断` を残す。
- Blackmagic公式が配布するTraining PDF / lesson filesは公式導線から取得して使う。
- Tutorialの完成見た目をコピーするのではなく、操作を `Marker / Trim / Transform / Keyframe / Ease / Text / Fairlight` に分解して本番素材で再実験する。

## StaRt

### Official artist audio
https://www.youtube.com/watch?v=NUFfRHk1Qcs

見ること:
- Introから歌入りまでの密度変化
- 約0:38のChorus立ち上がり
- 約0:48以降の細かいaccent
- 曲が速いのに、どこに『間』を作れるか

仮説:
- BPM ≈ 190
- Main edit gridはhalf-time 95 BPMで扱う
- Opening V1を原曲+3秒位置から使うCandidate Aでは、Opening 35秒のHero Aが原曲約0:38に合う

## DaVinci official

### Blackmagic Design Training
https://www.blackmagicdesign.com/jp/products/davinciresolve/training

優先:
1. Edit Part 1
2. Edit Part 2
3. Editor’s Guideのmusic video / audio / variable speed周辺
4. 必要になった時だけFusion

### DaVinci Resolve 21 New Features Guide
https://documents.blackmagicdesign.com/SupportNotes/DaVinci_Resolve_21_New_Features_Guide.pdf

確認:
- Show Music Beats
- Edit Page keyframe / curve / easingの現行UI

## Rhythm / Beat

### Edit to the Beat
https://www.youtube.com/watch?v=fCZYmjaEKKE

学ぶ:
- Markerを使ったbeat sync
- Beatにcutする操作と、beatにcutすべきかの編集判断を分離する

Weddingへ:
- 全beat cutは禁止
- 95 BPM gridは写真duration候補
- 190 BPM beatはmicro graphic accent候補

## Motion

### Speed Ramp
https://www.youtube.com/watch?v=XFYgfsENQa4

学ぶ:
- Retime Controls
- Retime Curve
- smooth acceleration

Weddingへ:
- 静止画には使わない
- 実動画で被写体の運動がある時だけ比較候補

### Ease In / Out
https://www.youtube.com/watch?v=bSJhXCGyYJc

Weddingへ:
- Hero AのStatic / 1.03 / 1.05 push比較
- LinearよりEaseが良い、ではなく写真の感情を邪魔しない方を選ぶ

### Edit Page Keyframes
https://www.youtube.com/watch?v=IHV4UVRzz5c

Weddingへ:
- simple TransformはFusionへ逃げずEdit Pageで作る
- Keyframe Tray / Curveを理解する

### Whip / Pan Transition
https://www.youtube.com/watch?v=8b-Z2zI9cBk

Weddingへ:
- camera directionが一致する2つの実動画がある時だけ候補
- 写真同士へ理由なくpresetとして使わない

## Typography / Fusion

### Kinetic Typography
https://www.youtube.com/watch?v=z5wXnCn7u1g

学ぶ:
- character timing
- keyframe
- spline easing
- motion blur

Weddingへ:
- 全文を動かすためではなく、0:48以降の3-hit accentやLocation titleで必要な部分だけ抽出する

### Basic Motion Graphics in Fusion
https://dvresolve.com/tutorial/motion-graphics-animations-fusion/

Weddingへ:
- Mask reveal / Transform / Spline
- Edit Pageで足りるならFusionへ行かない

## Wedding opening references

### PIARY Movement
https://www.piary.jp/movie/opening/mv1112/

観察:
- 約1分21秒 / 写真25枚という高密度例
- スタイリッシュでも写真が読める理由
- 背景・文字を抑えて写真を強くする方法

自分たちのV1との差:
- V1は60秒 / canonical写真11枚
- 写真枚数を増やして速度感を作るのではなく、曲構造とmicro accentで速度感を作る

### WITH PRODUCE / Dynamics, Modern, Roadshow
https://with-produce.co.jp/icu-wedding/opening-movie

観察:
- `Dynamics`: 1分の高速Opening
- `Modern`: CM的
- `Roadshow`: trailer的

Weddingへ:
- 見た目のtemplateをコピーしない
- Scene density / title frequency / cut rhythm / peak位置だけ測る

### Favio Photogenic
https://favio-shop.jp/photogenic/

観察:
- 写真中心の約1分24秒
- 前撮り・準備写真で期待感を作る構成
- 短い実動画を混ぜる位置

### OneLog Works
https://www.onelog-film.com/works

観察:
- WeddingとTravel PVのHard Cut
- 景色→人物の順序
- 動きのあるshotと静かなshotの密度差

## StaRt × Opening V1 Candidate A

| Opening | Timeline | Song candidate | 編集意図 |
|---|---:|---:|---|
| Cold Open | 0–2s | 0:03–0:05 | Hero 01を即見せる |
| Okinawa | 2–13s | 0:05–0:16 | Intro build。3枚を入口→体験→余韻 |
| Seoul | 13–24s | 0:16–0:27 | 0:17歌入り付近で章change |
| Hawaii | 24–35s | 0:27–0:38 | B sectionで密度を上げ、サビへ溜める |
| Hero A | 35–44s | 0:38–0:47 | Chorus head。最強写真、motionは小さく |
| Hero B | 44–53s | 0:47–0:56 | 3-hit micro accent候補 |
| Arrival | 53–57s | 0:56–1:00 | 0:58 interludeへ情報量を落とす |
| End Card | 57–60s | 1:00–1:03 | 静かに着地。音の終端をA/B |

## 最初の5実習

1. StaRtをDaVinci Timelineへ置き、0:17 / 0:28 / 0:38 / 0:48 / 0:58へMarker
2. Show Music BeatsをON/OFFし、section markerとの役割差を理解
3. Okinawa 11秒を3枚へ均等割りせずStory優先でTrim
4. Hero AでStatic / 1.03 / 1.05 pushを比較しEaseを調整
5. Hero Bで写真を切らず3-hit stamp/line/dotを試す

ここまで終えて初めて、追加transitionやFusion演出の必要性を判断する。
