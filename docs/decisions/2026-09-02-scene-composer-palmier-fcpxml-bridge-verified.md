# Scene Composer → Palmier → FCPXML Bridge — 初めての実機検証

日付: 2026-09-02
状態: Composer→Palmier→FCPXML書き出し→DaVinci Resolve実import(構造)まで実機確認済み。media(placeholder画像)のrelinkは未解決。アプリ内ボタンからの自動実行はまだ無い。
関連: `movie-dashboard/src/components/MaskRevealEditableWorkspace.tsx`, `movie-dashboard/src/data/humanEditableMotionIntent.ts`, `docs/decisions/2026-08-26-palmier-davinci-handoff-fidelity-v1.md`

## 背景

これまでScene Composerの「Palmier Instruction」出力は、人間がコピーしてPalmierへ手で入力する前提のテキストだった。「モーション図鑑で選ぶ→テキスト/画像登録→書き出し→Palmier→DaVinci、を繰り返して動画を作る」というユーザーの意図した制作ループのうち、Composer→Palmierの区間が実際に動くところを一度も実機で通していなかった。

このdecisionは、その区間を初めて実際のPalmier Pro（Claude Code MCP経由）で通し、Scene Composerの構造化データが本当にPalmierの実timelineへ落ちること、そこからDaVinci Resolveが読めるFCPXMLへ実際にexportできることを検証した記録。

## やったこと

1. Scene Composerで、StaRt Extendedの実3 sectionへ実際にSceneを3つ作成した。
   - `START_OPENING_PICKUP` / `type-quiet-caption` / text "WELCOME"
   - `START_CHORUS_1A` / `type-word-punch` + image motion `photo-slow-pull` / text "GO!"
   - `START_END_WINDOW` / `type-mask-reveal` / text "SHOGO & SHIORI"
2. 各Sceneのresolved値(text / positionXPercent=80 / positionYPercent=78 / layerDelaySeconds=0.6 / sceneDurationSeconds=4)をlocalStorageのcomposerStateから直接読み出した。
3. 既存Palmierプロジェクト `Motion Zukan Mask Reveal Handoff 2026-08-27.palmier` 内に新規timeline `MZ_StaRt_Sequence_20260902` を作成し(`create_timeline` — 既存project内なので`new_project`のGPU/Metal初期化クラッシュとは無関係)、3つのSceneを実際に配置した。
   - V1: 既存の`mask-reveal-navy-matte`placeholder画像を4秒(120frame)ずつ3クリップ、[0,120)/[120,240)/[240,360)
   - V2: 3つのtext clip。各SceneのlayerDelaySeconds=0.6s(18frame)をscene開始からのoffsetとして正確に反映: [18,120)/[138,240)/[258,360)、position x=0.8/y=0.78はSceneのpositionXPercent/positionYPercentをそのまま正規化値として使用
4. `inspect_timeline`でframe 30/90/150/210/270/330を合成render確認。WELCOME→GO!→SHOGO & SHIORIの順で正しい位置に表示されることを実際の画像で確認した。
5. `export_project(mode: "fcpxml", fcpxmlTarget: "resolve")`でFCPXMLを実際に書き出した。出力: `/tmp/motion-zukan-start-sequence-20260902.fcpxml`(3567 bytes、`manage_exports`でstatus=completed/progress=100を確認)。
6. FCPXML内容を目視: `<format ... width="1280" height="720" frameDuration="1/30s">`、`<title ... name="WELCOME" offset="3/5s" duration="17/5s">`(0.6秒delay・3.4秒表示、Sceneの数値と一致)を確認。
7. **DaVinci Resolveへ実際にimportした。** 新規project `MotionZukan_PalmierFcpxmlImport_20260902_Claude` を作成し、File → 読み込み → タイムライン で上記`.fcpxml`を指定。
   - Import前のXMLロードダイアログの時点で、Resolveがtimeline名`MZ_StaRt_Sequence_20260902`・解像度1280x720・30fpsを正しく読み取っていることを確認。
   - Import後、実際のtimelineにV1(画像3clip)・V2(テキスト3clip「WELC...」「GO!」「SHOG...」)の2trackが正しい順序・正しいframe位置で再構築されていることを確認(V2はtimeline表示上V1の上にスクロールしないと見えない位置にあった)。
   - **一方、画像clip(matte-6826AF6B.png)はDaVinci上で「メディアオフライン」表示になった。** 切り分けのため、同じファイルをFile → 読み込み → メディアで直接importしたところ問題なくthumbnailが出た(Go-to-folderで同じ絶対pathを指定)。**つまりファイル自体・パス・macOSのfile access権限は問題なく、FCPXML importのrelink処理固有の問題と判明した。**「コンフォームロック有効」を対象clipで解除し、「ビンから再コンフォーム」(ファイル名マッチ・タイト)を実行したが、それでも解消しなかった(同名の2つのbin item — offline版と直接importした正常版 — の間でreconformがどちらへ照合したか、または別の理由かは未確認)。timeline構造・text内容・frame位置は正しく転送されている一方、この特定の再リンク手順では画像を復旧できなかった。

## Scene → Palmierフィールド対応(今回検証した範囲)

| Scene (resolved) | Palmier |
|---|---|
| `text` | `add_texts.entries[].content` |
| `positionXPercent` / `positionYPercent` (0-100) | `add_texts.entries[].transform.x` / `.y` (0.0-1.0に正規化) |
| `layerDelaySeconds` × fps | text clipの`startFrame`(scene開始からのoffset) |
| `sceneDurationSeconds` × fps | 画像clipの`endFrame` / text clipの`endFrame`上限 |
| `mediaLabel` | (未検証: 今回は既存placeholder画像を流用。実写真importの対応は別途検証が必要) |
| `imagePatternId`固有の動き(Small Push/Slow Pullのkeyframe自体) | (未検証: Palmier側でのTransform keyframe再現は別途。今回はDaVinci側で実装済みの動きをそのまま前提とし、Palmier区間はrough placementのみ担当という既存の役割分担通り) |

## まだ出来ていないこと

- **アプリ内ボタンからの自動実行ではない。** movie-dashboardは静的Reactアプリでbackendを持たないため、ブラウザから直接Palmier MCPを呼べない。今回の手順はClaude Code Agentが`mcp__Palmier_Pro__*`ツールを直接呼んで実行した。再現するには、次回以降のAI操作者がこのdocの対応表に従って同じ手順を踏む必要がある。
- 実写真・実動画のimportとPalmier→DaVinci実際のカラー/クロップ復元は未検証(`docs/decisions/2026-08-26-palmier-davinci-handoff-fidelity-v1.md`のTransportClass registryが引き続き正本)。
- StaRt Extended全14 sectionの通し(今回は3 sectionのみ)。
- **FCPXML importでDaVinci側が画像clipを「メディアオフライン」と表示する問題が未解決。** timeline構造・text内容・frame位置は正しく転送されたが、`.palmier`パッケージ内media pathのrelinkがそのままでは通らなかった。原因(パスのURLエンコード、DaVinciのfile access権限、`.palmier`拡張子をフォルダとして扱う際の相性など)を切り分けていない。

## 次にやるなら

1. **最優先**: FCPXML importでのmedia offline問題を解決する。**(b)のfile access権限は今回の追加検証で除外済み**(同一fileの直接importは成功した)。残る原因候補: (a) FCPXML内`file://`パスの`%20`エンコードをDaVinci側のFCPXML parserだけが正しく解釈しない、(c) 「ビンから再コンフォーム」が同名2 bin item(offline版/正常版)のうちoffline版へ照合してしまっている可能性(bin側でoffline版を削除してから正常版のみで再コンフォームを試す等)。この解決なしでは、Palmier区間で置いた素材がDaVinci側で見えないままになる。
2. 実写真がまだ無い今のうちに、Composerの3〜5 Sceneをまとめて一度にPalmierへ流し込む小さなNode script化を検討する(手作業のMCP呼び出し列を、繰り返し可能な手順書またはscriptへ落とす)。
3. StaRt 14 sectionのうち、まだ試していない残り11 sectionでも同じ手順が通ることを確認する。
