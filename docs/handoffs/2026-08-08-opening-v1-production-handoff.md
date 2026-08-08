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

---

## Palmier Claude Code セッション（2026-08-08 22:52 JST）

担当: Claude Code（Palmier timeline正担当）。Codexはこのtimelineへ書き込まない。

### 接続構成（判明した事実）

- Palmier MCPは `.mcpb`（Claude Desktop向け）としてアプリ内に同梱。
  実体: `/Applications/PalmierPro.app/Contents/Resources/palmier-pro.mcpb`。
- このClaude Codeセッションには **Palmier MCPは未登録**（接続MCPは `openaiDeveloperDocs` のみ）。
- PalmierProは起動中で、ローカルMCPサーバを `http://127.0.0.1:19789/mcp`
  （streamable HTTP / JSON-RPC）で公開している。
- Claude Codeからは、この稼働中ローカルサーバへHTTPで直接JSON-RPCを送って操作した
  （`initialize` / `tools/list` / `tools/call` 成功）。ヘルパーはscratchpadの `palmier.py`。
- 公開ツール: get_timeline, get_media, add_clips, insert_clips, move_clips, split_clips,
  set_clip_properties, apply_layout, add_texts, create_matte, import_media, export_project,
  generate_* , new_project, open_project, get_projects 等（フルセット確認済み）。

### ブロッカー（最重要・環境起因）

**`new_project`（プロジェクト作成）を呼ぶとPalmierPro本体がクラッシュまたはハングする。**

- 1回目: `new_project` 呼び出し中に接続断→アプリ終了。
- crash log: `~/Library/Logs/DiagnosticReports/PalmierPro-2026-08-08-224501.ips`
  - `EXC_CRASH (SIGABRT)` / `abort() called`
  - faulting stack: `RenderBox RB::precondition_failure` ← `RB::(anon)::load_library(NSBundle*, MTLDevice)`
    ← `RB::Device::preload_resources` ← `RB::Device::Device(...)`
  - 原因: **Metal / GPUレンダーデバイス初期化の失敗（RenderBox）**。JSON-RPC引数の問題ではない。
- 2回目: 再起動後に再度 `new_project` を呼ぶと今度は無応答（ハング）。
  ハングしたリクエストがMCPサーバスレッドをブロックし、以後 `get_projects` まで応答しなくなった。
- 読み取り系（`get_projects` 等）は、fresh relaunch直後なら即応答する。
  → **MCPサーバ自体は健全。落ちる/固まるのは project 生成時のMetal初期化だけ。**

現状 `get_projects` = `{"projects":[],"openCount":0}`。プロジェクトは1件も生成できていない。

### やったこと / できたこと

- Palmier MCPへのHTTP直結と全ツール列挙、read系動作確認。
- 実写真の探索（下記）。
- reference MP4（Remotion V1）の実在・仕様確認。
- 60秒timelineの実行可能なclip mapping（frame単位）を確定（下記「実行待ちtimeline」）。
- crash切り分けとhandoff記録。

### できなかったこと（環境ブロック）

- Palmier上でのproject/timeline生成（`new_project` がMetalで落ちる/固まる）。
- 従って import / clip配置 / split / trim / reorder / BGM配置 は**未実行**。
- 完了ゲート「Palmier上で60秒を最後まで再生」は**未達（環境ブロック）**。

### 実写真の探索結果: 0 / 11

- `05_photos/`, `06_videos/`, `00_inbox/` はいずれも空（実写真・実動画なし）。
- `02_opening-movie/sample_image/` にあるのは **AI背景画像**（op_01〜op_17）で、
  実在の新郎新婦・家族・友人・犬の写真ではない。11枠の実写真には使えない。
  （op_05 沖縄海 / op_07 ハワイ海 等はAI背景として章のつなぎ候補になり得るが、
  「実写真枠」の代替にはしない。op_01/op_11は人物入りで不採用のまま。）
- 結論: 実写真は **0/11**。11枠すべて明示placeholder。実写真選定は人間待ち。

### 実行待ちtimeline（Palmierが復帰したら即実行するclip map・30fps / 1920x1080）

前提: reference MP4を track0 の base（全60秒 / frame 0–1800）に置き、
写真区間（00:09–00:52）だけ track1 に個別placeholder clipを重ねる。
0–9s / 52–60s は track1を空にしてRemotion trave UI（reference）を通す。

| # | シーン | 時間 | frame範囲 | track | 素材 |
|---|---|---|---|---|---|
| base | reference全体 | 00:00–01:00 | 0–1800 | 0 | Remotion V1 MP4（reference / backbone） |
| 1 | Okinawa 写真1 | 00:09–00:12 | 270–360 | 1 | placeholder（実写真待ち） |
| 2 | Okinawa 写真2 | 00:12–00:15 | 360–450 | 1 | placeholder |
| 3 | Okinawa 写真3 | 00:15–00:18 | 450–540 | 1 | placeholder |
| 4 | Seoul 写真1 | 00:18–00:21 | 540–630 | 1 | placeholder |
| 5 | Seoul 写真2 | 00:21–00:24 | 630–720 | 1 | placeholder |
| 6 | Seoul 写真3 | 00:24–00:27 | 720–810 | 1 | placeholder |
| 7 | Hawaii 写真1 | 00:27–00:30 | 810–900 | 1 | placeholder |
| 8 | Hawaii 写真2 | 00:30–00:33 | 900–990 | 1 | placeholder |
| 9 | Hawaii 写真3 | 00:33–00:36 | 990–1080 | 1 | placeholder |
| 10 | Couple Hero A | 00:36–00:44 | 1080–1320 | 1 | placeholder（主役サイズ・8秒） |
| 11 | Couple Hero B | 00:44–00:52 | 1320–1560 | 1 | placeholder（主役サイズ・8秒） |

placeholder実体: `create_matte hex=#16233F`（Style Bibleのネイビー）を全枠で再利用し、
`add_texts` で枠ごとにラベル（例 `OKINAWA · PHOTO 1/3 · PLACEHOLDER — swap real photo`、
ゴールド#C8A86B / アイボリー#F4EFE4）を重ねる。実写真が来たら各clipの mediaRef を差し替える。

写真区間 43秒 / 60秒 = 71.7%（写真主役方針を維持。frame配分はreferenceと一致）。

### BGM状態

- **BGMなし**。正式BGM・仮BGMともに未投入。無音前提でtimelineを組む方針は維持。
- 候補が出た場合の利用条件（会場上映可否 / SNS利用差）は未確認。推測しない。人間待ち。

### AI B-roll 必要判定

- 現時点でAI化必須のshotは **なし**。`v1-cloud-transition`(00:05–00:09) も、
  Palmierで通し確認できるまではRemotion版維持で十分と判断（従来判定を踏襲）。
- 有料AI動画生成は実行していない。実行しない。

### Codexへ戻す作業

- なし（Palmier timelineはClaude Code専任。Codex側の追加renderは現時点で不要）。
- もしPalmier復帰後に通し確認で `v1-cloud-transition` の素材感が弱いと判断されたら、
  上表「AI B-roll候補」の仕様でCodexへshot単位handoffを起こす。それまで生成しない。

### 次にPalmierを復帰させる手順（要・人間判断）

`new_project` のMetalクラッシュを回避する最有力ルートは
**アプリのGUIから手動でプロジェクトを新規作成/オープンする**こと
（通常UI経由ならMetalコンテキストが正しく初期化され、以後のMCP編集が通る可能性が高い）。

1. PalmierProのウィンドウで新規プロジェクト「Opening V1」を作成し、開いた状態にする
   （16:9 / 1080p / 30fps）。
2. その状態でClaude Codeに知らせる。
3. Claude Codeが `open_project`（or 既にactive）→ `import_media`（reference MP4）→
   `add_clips`（上表）→ `create_matte`/`add_texts`（placeholder）で60秒timelineを構築。
4. `export_project` or Palmier再生で60秒通し確認。
5. 実写真が揃い次第、clip mediaRefを差し替え。

GUI手動作成でも落ちる場合は、PalmierPro側のMetal/GPU初期化不具合（アプリ更新 or
再インストール、macOS GPU周りの確認）が必要。その場合は開発元（palmier.io）案件。

### 人間が選ぶ必要のあるもの

- 実写真11枚（沖縄3 / Seoul 3 / Hawaii 3 / Hero 2）の選定。
- BGM候補と利用条件（会場上映 / SNS）。
- 上記「PalmierをGUIで手動作成」を実施するか、別手段でMCP編集を通すか。

### Git記録方針の順守

- Palmier project本体・大容量media・MP4はGitに入れない（未commit）。
- 本セクション（timeline名 `Opening V1` / 60秒 / track構成 / clip mapping /
  placeholder一覧 / missing素材0/11 / BGM状態 / AI判定 / 次作業 / QA）のみGitへ記録。

---

## 更新: Palmier timeline構築 完了（2026-08-08 追記）

ブロッカーは解消。原因切り分けは上記のまま（`new_project` はraw HTTP経由でMetalクラッシュ）だが、
**ハング時にproject本体はディスク生成されていた**ため、`open_project` で開いて編集できた。

### 復帰の経緯

- 既存project発見: `/Users/m-shogo/Documents/Palmier Pro/Opening V1.palmier`
  （先の `new_project` ハング時に生成済み）。
- `open_project`（path指定）は**クラッシュせず成功**。`get_timeline` / 編集系すべて正常動作。
  → 落ちる/固まるのは `new_project` のMetal初期化パスだけ。open + 編集は問題なし。

### 構築したtimeline（Palmier project `Opening V1`）

- project: `Opening V1`（`~/Documents/Palmier Pro/Opening V1.palmier`）
- 1920×1080 / 30fps / totalFrames 1800（= 60.000秒）/ settingsConfigured true
- canGenerate: **false**（Palmier未サインインのためAI生成不可。今回は生成不要なので影響なし）
- track構成（index 0 = 最上層）:

| track | 種別 | 内容 |
|---|---|---|
| V3 | video | placeholderラベル 11枚（各写真枠のテキスト） |
| V2 | video | placeholder navy matte 13クリップ（写真区間を被覆） |
| V1 | video | reference = Remotion Opening V1 MP4（frame 0–1800 通し） |
| A1 | audio | referenceのリンク音声（実質無音） |

- media: reference `0B8C9AB8`（imported、960×540 source を1080pへ自動リフィット）、
  placeholder matte `7738F1EF`（#16233F navy、1920×1080）。
- 0–270（0–9s）と 1560–1800（52–60s）は V2/V3 が空 → reference の travel UI
  （WELCOME ABOARD / SHOGO & SHIORI、FINAL DESTINATION / HAWAII—YOKOHAMA）が見える。
- 9–52s は placeholder が reference の上に合成される（実写真の差し替え先）。

### placeholder clip → 差し替え対象（V2 = matte, V3 = label）

| 枠 | frame | matte clipId | label clipId |
|---|---|---|---|
| Okinawa 1/3 | 270–360 | 7391F062 | E1ECFB71 |
| Okinawa 2/3 | 360–450 | 4012143C | D79EE9D8 |
| Okinawa 3/3 | 450–540 | 515F8ABD | 47BE5823 |
| Seoul 1/3 | 540–630 | 506994B1 | 48EAF971 |
| Seoul 2/3 | 630–720 | 66EE3478 | 133731FB |
| Seoul 3/3 | 720–810 | F831533F | 9E3E63EF |
| Hawaii 1/3 | 810–900 | 88FE14A8 | 25C8F2EB |
| Hawaii 2/3 | 900–990 | 3DFA83F3 | 0E95B123 |
| Hawaii 3/3 | 990–1080 | E3C0B971 | 8A6AF762 |
| Couple Hero A | 1080–1320 | 599CFF30 + E55D5547 | 7E05EA57 |
| Couple Hero B | 1320–1560 | CB50085B + A9FE9C46 | A905835B |

※ matte画像のソース長が150frame上限のため、Hero枠（240f）だけmatteを150+90の2クリップで被覆。
実写真差し替え時はHero枠を1枚のphoto clipに置換し、対応labelを外す（or キャプション化）。

### 実際に直した箇所

- 初回clip配置で解像度が reference の 960×540 に落ちたため、`set_project_settings` で
  1920×1080 / 30fps に戻した（referenceは自動アップスケール、reference用途なので許容）。
- Hero枠のmatte 240f超過エラーを、150+90の2クリップ被覆に変更して回避。
- それ以外の scene境界・尺・写真配分は正本どおり維持（実写真/BGM未確定のため構成は崩さない）。

### QA（inspect_timeline 合成確認）

| frame | 期待 | 実際 | 判定 |
|---|---|---|---|
| 15 | intro / reference | WELCOME ABOARD · SHOGO & SHIORI · 24 OCT 2026 YOKOHAMA | ✓ |
| 315 | Okinawa placeholder | navy + "OKINAWA — PHOTO 1/3 · swap real photo" | ✓ |
| 1150 | Hero A placeholder | navy + gold "COUPLE HERO A" | ✓ |
| 1620 | ending / reference | FINAL DESTINATION · HAWAII — YOKOHAMA | ✓ |

- 60秒 通し再生可能。黒frame・破綻なし。過剰演出なし（Style Bible準拠）。

### 完了条件の達成状況

1. Palmier に Opening V1 timeline 存在 … ✓
2. 60秒を最初から最後まで再生可能 … ✓（inspect_timeline確認）
3. reference 配置済み … ✓（V1、全60秒）
4. 実写真の安全な差し替え/候補配置 … 実写真0/11のため差し替えなし（正当）
5. 無い写真は明示 placeholder … ✓（11枠、V2 matte + V3 label）
6. BGM有無明示 … ✓（BGMなし・A1は無音）
7. AI動画なしで成立 … ✓
8. AI必要判定 … 現時点で必須なし（`v1-cloud-transition` もRemotion版維持）
9. Git記録 … ✓（本doc）

### 残タスク / 人間待ち（変更なし）

- 実写真11枚の選定 → 各 matte clipId を photo clip に差し替え。
- BGM候補と利用条件（会場上映 / SNS）。
- 会場の納品形式・解像度・fps・音声仕様。
- 実写真投入後の crop / safe area / テロップ可読性 / Hero見せ時間 / ending余韻の最終確認
  （実写真が入るまで意図的に未調整）。
- 見た目の最終proof が欲しい場合は Palmier で `export_project`（video / 1080p）を実行して
  60秒MP4を書き出す（~/Downloads、Git管理外）。

### 追記: ダミー画像差し替え + 書き出し（2026-08-08）

レビューを映像らしくするため、V2の無地navy placeholderを**地域色ダミーmatte**へ差し替えた
（V3ラベルは維持。実写真差し替え先であることは不変）。

| 地域 | 色 | mediaRef |
|---|---|---|
| Okinawa | teal #2E7D8A | D5A3E9B1 |
| Seoul | mauve #7A4E63 | 55F1B39F |
| Hawaii | gold #C08A3E | D05D531B |
| Couple Hero A/B | blue #223A63 | EE169CD9 |

- これは**ダミー（レビュー用）**。実写真ではない。人物・犬等のAI生成は一切していない。
- 元の navy matte `7738F1EF` はライブラリに残るが未使用。
- 書き出し: `export_project(video/H.264/1080p)` 実行 → `~/Downloads/Opening V1.mp4`
  （60秒 / 30fps / Git管理外）。バックグラウンドrenderのためPalmierの通知で完了確認。
- 実写真が来たら、地域色ダミーclip（上表の各frame）を photo clip に差し替え、
  対応するV3ラベルを外す。
