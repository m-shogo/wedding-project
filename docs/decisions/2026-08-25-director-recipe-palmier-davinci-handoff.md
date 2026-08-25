# Director Recipe Catalog Phase F — Palmier handoff export / DaVinci skillマッピング

日付: 2026-08-25
状態: 履歴記録（現在はStaRt Extended本命制作の補助資料。現行入口は `/movie-coach/start-selection`）

## 背景

Director Recipe Catalog（Phase A、97レシピ）とStaRt section⇄recipeマッピング（Phase E、
`startSectionRecipeMap.ts`）はmainへマージ済みだが、これを人間がPalmierへ実際に持ち込む形の
出力（handoffファイル）と、DaVinci Resolveでどう再現するかのカリキュラムはまだ無かった。
Phase Fはこの2点を仕上げる。

Phase A報告で「`buildPalmierRecipeHandoff()` が実装済みでPhase Cのhandoffに使える」と言及されて
いたため、実在を確認した。`movie-dashboard/src/data/directorRecipeCatalog.ts:2500` に存在するが、
**単一レシピ→Markdown文字列を返す関数**であり、97件をsectionタイムライン順に並べたexport一式は
別途必要だった。

## 決めたこと

### 1. Palmier handoff exportスクリプトを新設

`motion-studio/scripts/export-palmier-recipe-handoff.mts`（`pnpm export:palmier-recipe-handoff`）を
新設した。既存の `export-capcut-timeline.mts` と同じパターン（`.mts`をNode直実行、`exports/`配下へ
CSV/MD/JSONを書く、生成物のみGit管理）を踏襲している。

処理内容:

1. `startExtendedSections`（14 section、timing reference）を順に走査。
2. 各sectionを `startSectionRecipeMap` で引き、primary recipe（先頭1件）とalternate recipesを
   `directorRecipeCatalog` から解決する。
3. primary recipeについては既存の `buildPalmierRecipeHandoff()` をそのまま呼び出し、Markdown内に
   1レシピ1ブロックとして埋め込む（車輪の再発明をしない）。
4. section policy（`photoHoldSeconds` / `graphicDensityPolicy` / `typographyLevel` /
   `threeHitPolicy` / `avoidRecipeIds` / `notes`）をブロックへ併記する。
5. 出力: `motion-studio/exports/palmier/director-recipe-section-handoff.{csv,md,json}`。

**これはPalmierプロジェクトファイルではない。** 人間がPalmierへ手で持ち込むための資料であり、
Palmier MCPの書き込みツールでタイムラインへ自動投入するものではない（下記「Palmier MCP」参照）。

セクションがsection mapに存在しない、またはprimary recipeがcatalogに存在しない場合はexportを
`process.exit(1)`で失敗させる（サイレントに空行を出さない）。

### 2. Palmier MCPは読み取り確認のみ実施、書き込みはしない

タスク指示（および `docs/palmier-operation.md` の「まだ本編集しない」方針）に従い、Palmier MCP
(`mcp__Palmier_Pro__*`)は読み取り系ツールだけを実行した。

- `manage_project` (`action: "list"`) — アクティブプロジェクト `Opening V1`
  (`~/Documents/Palmier Pro/Opening V1.palmier`) を確認。
- `get_timeline` — 60秒 / 30fps / 1920×1080 / 1800 framesの既存タイムラインを確認。テキスト
  placeholder（`OKINAWA — PHOTO 1/3` 等）とdummy画像でOpening V1のセクション構成を仮組みしている
  状態だった。
- `get_media` — dummy画像・cloudsea参照動画などの素材一覧を確認。

**書き込み系ツール（`create_timeline` / `add_clips` / `set_clip_properties` 等）は一切呼んでいない。**
既存の `Opening V1.palmier` プロジェクトへ、Director Recipe Catalogの内容を機械的に流し込むことは
今回のスコープ外（タスク指示: 「Palmierへの実際の編集書き込みは行わない」）。

### 3. DaVinci skillマッピングドキュメントを新設

`docs/davinci-skill-recipe-map.md` を新設した。97レシピの `davinciSkills` フィールドを機械集計し、
14種類のタグ（`davinci-*` 8種 + `concept-*` 6種）ごとの逆引き表を作った。

主な発見:

- `davinci-fusion-node` は97件中**1件のみ**（`cam-25d-parallax`）。他96件はEdit page /
  Fairlight page / Color pageの範囲で完結する設計に、Phase Aの時点ですでになっていた。
- `davinci-text` (15件) は標準の Text+ ツールで足り、Fusion Titleは不要。
- `davinci-marker` (12件) はTimeline markerだけで、拍・3-hit・区切りの設計ができる。

この事実を踏まえ、ドキュメントの方針を「Fusionの乱用を避け、Edit pageで作れる演出はEdit page
の手順にする」と明記した。97件全部の手順は重いため、6つの代表レシピ（cam-locked-frame /
cam-restrained-push / typo-word-punch / cut-j-cut / rhythm-three-hit / cam-25d-parallax）だけ、
具体的なページ・パネル・操作レベルの最小再現手順を書いた。

### 4. `.gitignore` は変更不要

`motion-studio/.gitignore` はすでに `exports/**/*.mp4` 等の拡張子指定のみで、CSV/MD/JSONは
ブロックしていなかった。ルート `.gitignore` の `motion-studio/exports/previews/**` とも重複しない
（`exports/palmier/` は別ディレクトリ）。追加設定なしでCSV/MD/JSONがGit追跡対象になることを確認した。

## やらなかったこと（意図的にスコープ外）

- Palmierへの実際のタイムライン書き込み・編集（読み取り確認のみで十分という指示に従った）。
- Claude/Codex A/Bフレームワーク（Phase G）。
- 97件全部のDaVinci最小再現手順（代表6件のみ。残りは逆引き表で辿れる）。
- 歌詞全文、著作権音源、実在人物のAI生成（一切扱っていない）。

## 次のPhaseへの引き継ぎ

- Phase G（Claude/Codex A/Bフレームワーク）は未着手。
- `export-palmier-recipe-handoff.mts` はprimary recipe 1件/sectionのみを主要ブロックとして展開する
  設計。複数レシピを1sectionで併用するタイムライン（例: 3-hit区間でprimary+alternateを両方使う）
  を厚くしたい場合は、`rows`配列にalternate分のブロックを追加する拡張が必要。
- `docs/davinci-skill-recipe-map.md` は代表6レシピのみ手順化した。DaVinci Resolveを実際に導入する
  段階になったら、優先度の高いカテゴリ（Wedding Emotion / Travel等、実写真本数が多いカテゴリ）から
  手順を追加するとよい。
- Palmier MCPの書き込みツール（`create_timeline` / `add_clips` 等）を使ってこのhandoffを実際に
  Opening V1以外の新規Palmierプロジェクトへ流し込む自動化は、人間の明示許可が要る（有料生成と同様、
  Palmier Free範囲を超える操作が発生しうるため）。
