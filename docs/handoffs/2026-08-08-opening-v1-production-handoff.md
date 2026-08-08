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
