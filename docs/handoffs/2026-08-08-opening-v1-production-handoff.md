# Opening V1 production handoff — 2026-08-08

## 目的

2026-10-24の結婚式で実上映するオープニングムービーを完成させる。
動画生成基盤の追加を続けるのではなく、まずplaceholder込みで60秒を最後までrenderし、
その後に実写真・BGM・必要最小限のAI B-rollを差し替える。

## 現在の正本

- branch: `feat/opening-v1-60s-photo-first`
- entry point: `motion-studio/src/index-opening-v1.ts`
- root: `motion-studio/src/OpeningV1Root.tsx`
- composition: `motion-studio/src/compositions/opening/OpeningV1.tsx`
- timeline data: `motion-studio/src/data/openingV1.ts`
- render command: `pnpm render:opening-v1:preview` / `pnpm render:opening-v1`

legacyの `開幕-全体確認` 82秒版は順番・尺確認用途として残すが、現行Opening V1の正本ではない。

## 60秒timeline

| 時間 | 尺 | シーン | 素材 |
|---|---:|---|---|
| 00:00-00:05 | 5s | Departure title | Remotion travel UI |
| 00:05-00:09 | 4s | Air / cloud transition | Remotion placeholder。必要なら後でAI B-roll |
| 00:09-00:18 | 9s | Okinawa memories | 実写真3枚 |
| 00:18-00:27 | 9s | Seoul memories | 実写真3枚 |
| 00:27-00:36 | 9s | Hawaii memories | 実写真3枚 |
| 00:36-00:44 | 8s | Couple hero A | 実写真1枚 |
| 00:44-00:52 | 8s | Couple hero B | 実写真1枚 |
| 00:52-00:55 | 3s | Arrival / Yokohama route | Remotion travel UI |
| 00:55-01:00 | 5s | Wedding opening title | Remotion title |

実写真枠は43秒 / 60秒 = 71.7%。
V1では全写真枠を安全なplaceholderでrender可能にし、人物のAI代替は一切行わない。

## 次のCodex作業

1. 最新mainとこのbranchを取得し、`motion-studio` だけを対象にする
2. `pnpm install` が必要なら実行
3. `pnpm typecheck && pnpm check`
4. `pnpm exec remotion compositions src/index-opening-v1.ts`
5. `pnpm render:opening-v1:preview`
6. 00:00付近 / 写真区間 / 00:55以降を目視
7. TypeScript/Remotion runtime/render不良があればこのbranch内で修正
8. MP4はGitへ入れない
9. render結果のpath、duration、resolution、目視結果だけdocsへ記録
10. V1を見て、AI動画が本当に必要なshotだけ列挙。まだ有料生成はしない

## 次のClaude Code作業

Codexのpreview MP4がローカルに存在してから開始。
Palmier MCPのtimeline正担当はClaude Codeだけ。

1. Palmier Free project/timelineを確認
2. 60秒V1 MP4をreferenceとしてimport
3. BGMが無ければ無音/仮BGM前提でもtimelineの尺だけ先に作る
4. 00:09-00:52の写真区間を個別clipへ分解する準備
5. 実写真/実動画が見つかる範囲だけplaceholderと差し替え
6. trim/split/reorder/timingを進める
7. AI B-roll未生成でも止めない
8. 有料生成が必要なshotはpendingにしてtimelineを最後まで通す

## 禁止

- 人物、家族、友人、犬をAI生成しない
- 読ませる文字をAI画像/動画へ焼き込まない
- MP4等の大容量mediaをGitへcommitしない
- 有料provider生成を許可なく実行しない
- CodexとClaude Codeが同じPalmier timelineへ同時に書き込まない
- V1 render前に新しいDashboard基盤を増やさない

## 完了ゲート

このbranchの最初のゲートは設計書ではなく、
`out/opening/opening_v1_placeholder.mp4` またはpreview版が**60秒最後までrender成功**すること。
その後Palmierへ渡し、実写真差し替えとBGM同期へ進む。

## Codex render・目視QA結果（2026-08-08）

- render: 成功（1800 / 1800 frames）
- local path: `motion-studio/out/preview/opening_v1_placeholder.mp4`（Git管理外）
- Composition: 60.000秒、1920x1080、30fps
- preview MP4実測: video 1800 frames / 30fps、960x540、container duration 60.053秒
- 確認時点: 00:00.50、00:05.10、00:09.30、00:18.30、00:27.30、00:36.30、
  00:44.30、00:52.20、00:55.30、00:59.00
- boundary追加確認: 00:43.967 / 00:44.000、00:54.967 / 00:55.000、00:59.967
- 写真章中盤追加確認: 00:12.00、00:21.00、00:30.00
- black-frame検出: 修正後0件（全1800 framesをffmpeg `blackdetect` で走査）

### 見つけた問題と修正

- 修正前は44.000秒と55.000秒で新sceneの内容が完全透明になり、濃紺一色の1 frameが発生した。
  scene冒頭を完全透明にするfade-inを外し、前scene側の短いfade-outだけ残して解消した。
- `EditorialBase` のdefault分岐がchildren必須型に違反し、`pnpm typecheck` が失敗していたため修正した。
- Remotion 4.0.475が要求するZod 4.3.6に対してZod 3系が解決されていたため、4.3.6へ固定した。
- cloud placeholderに表示されていた制作メモ `AI B-ROLL OPTIONAL · V1 PLACEHOLDER` を映像から削除した。
- Opening V1内のsans-serif指定を既存theme tokenへ統一した。

### 目視結果

- 過剰glow / flare / particleなし。ネイビー、アイボリー、ゴールドのeditorial / travel film寄り。
- 写真3枚章は中盤で3枠すべてが大きく表示され、Hero A/Bは中央の主役サイズを確保。
- 小さいUIの大量配置なし。主要文字はsafe area内で判読可能。
- 43秒の写真枠と60秒のscene配分は変更なし。
- 修正後はscene boundaryの黒frameなし。endingは濃紺タイトルから緩やかに暗くなり、披露宴開始へ接続可能。
- 実写真とBGMが未投入のため、最終的なcrop、人物位置、BGM同期、体感テンポはPalmierで再確認する。

## AI B-roll候補（まだ生成しない）

| shot ID | start / end | 必要秒数 | first frame | last frame | camera motion | AIにする理由 | AIなし代替 |
|---|---|---:|---|---|---|---|---|
| `v1-cloud-transition` | 00:05-00:09 | 4秒 | 不要 | 不要 | 雲海上をゆっくり横移動し、わずかに前進 | 現行の抽象cloud placeholderは全尺で最も素材感が弱く、実写調の空気遠近が入ると出発から思い出写真への移行が明確に良くなる | 現行Remotion版を維持し、楕円cloudの形・重なり・速度だけ調整する |

現時点でAI化を必須とするshotはない。特に人物・家族・友人・犬は生成しない。

## 人間待ち

- 00:09-00:52へ入れる2人の実写真11枚（沖縄3、Seoul 3、Hawaii 3、Hero 2）の選定
- BGM候補、会場上映/SNS利用条件、終端同期
- 会場の推奨納品形式、解像度、fps、音声仕様
- 実写真差し替え後のcrop・safe area・テロップ可読性の最終確認
