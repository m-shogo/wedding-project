# movie-dashboard 全機能制作プロンプト集

全18機能のビルド用プロンプト。各プロンプトは自己完結しており、Claude Code にそのまま渡せる。

## 共通制約（全プロンプト共通）

```
■ 絶対に守る制約
- motion-studio/ は絶対に触らない
- movie-dashboard/node_modules/ と movie-dashboard/dist/ は絶対にコミットしない
- 大きな画像・動画・音源ファイルはGit管理しない
- buildが通る状態を維持する（pnpm build で確認）
- 内部データ構造を壊さない
- movieId、sceneId、assetId、promptId、taskId などのIDは変更しない
- JSON内のステータス値や型値は原則そのまま
- TypeScriptの型定義で使っている英語のunion valueは変更しない
- validators.ts の検証を緩めるのではなく、データ側またはCRUD側を正しく直す
- import type を使う（verbatimModuleSyntax: true）
- noUnusedLocals: true、noUnusedParameters: true

■ 技術スタック
- Vite 6 + React 19 + TypeScript 5.8 + Tailwind CSS 3
- pnpm（lockfile: pnpm-lock.yaml）
- react-router-dom 7
- 追加ライブラリは最小限（Tailwind CSS のみでやれるならやる）
- カスタムカラー: navy-*, gold-*, sand-*（tailwind.config.js で定義済み）
- フォント: Noto Serif JP / Noto Sans JP
- localStorage キー: "wedding-movie-dashboard"
- generateId(prefix) で ID 生成（src/lib/ids.ts）

■ コンポーネントパターン
- Modal: open, onClose, title, children, wide?
- ConfirmDialog: open, title, message, onConfirm, onCancel, danger?
- SectionCard: title, children, className?
- Badge: label, colorClass
- StatCard: label, value, icon, accent?
- Header: title, description?, showMovieSelector?
- form-label / form-input は CSS クラスとして定義済み

■ ファイル配置ルール
- ページ: src/pages/
- コンポーネント: src/components/
- フォーム: src/components/forms/
- ロジック: src/lib/
- ストア: src/store/
- 型: src/types/
- 静的データ: src/data/
- ラベル定義: src/lib/labels.ts（Record<UnionType, string> 形式）
```

---

## 優先度・高（1〜6）

---

### 1. ムービー追加/編集/削除 UI

```
movie-dashboard にムービーの追加・編集・削除UIを追加してください。

■ 現状
- src/store/productionStore.tsx に addMovie / updateMovie / deleteMovie は実装済み
- src/types/movie.ts に MovieProject 型あり:
  { movieId, title, type: MovieType, theme, targetDurationSec, status: MovieStatus, description }
- MovieType = "opening" | "profile" | "introduction" | "other"
- MovieStatus = "planning" | "in_progress" | "review" | "done"
- src/lib/labels.ts に movieTypeLabel / movieStatusLabel / movieTypeColor / movieStatusColor が定義済み
- src/components/MovieSelector.tsx はムービー選択のセレクトボックスのみ
- UIからムービーを追加/編集/削除する手段がない

■ やること
1. src/components/forms/MovieForm.tsx を新規作成
   - 既存の SceneForm.tsx / AssetForm.tsx と同じパターン
   - フィールド: title（必須）, type（select）, theme, targetDurationSec（number）, status（select）, description（textarea）
   - 新規時は generateId("movie") で movieId 生成
   - props: { movie?: MovieProject; onSave: (m: MovieProject) => void; onCancel: () => void }

2. src/pages/Dashboard.tsx の「ムービー別進捗」セクションを改修
   - 各ムービーのバーの右端に ✏️（編集）と 🗑（削除）ボタンを追加
   - 「ムービー別進捗」SectionCard のタイトル横に「+ ムービー追加」ボタンを追加
   - 編集は Modal 内に MovieForm
   - 削除は ConfirmDialog（danger: true）
   - 削除メッセージ: 「このムービーに紐付くシーン、タスクも削除されます」

3. ルーティングやサイドバーの変更は不要（Dashboard 内で完結）

■ 動作確認
- ムービーを追加して MovieSelector に表示される
- ムービーを編集して title が変わる
- ムービーを削除して関連シーン・タスクも消える
- pnpm build が通る
```

---

### 2. トースト通知システム

```
movie-dashboard に統一的なトースト通知を追加してください。

■ 現状
- DataManager.tsx: importSuccess / saveStatus を useState + setTimeout + inline テキストで表示
- 各ページで削除・複製後のフィードバックがない
- 統一的な通知手段がない

■ やること

1. src/store/toastStore.tsx を新規作成
   - React Context + useReducer パターン（productionStore.tsx と同じ流れ）
   - ToastItem 型: { id: string; message: string; type: "success" | "error" | "info" }
   - actions: addToast(message, type) → 3秒後に自動削除、removeToast(id)
   - addToast は id を返す
   - export function useToast(): { addToast, removeToast }
   - export function ToastProvider({ children }): トースト表示を含むプロバイダ

2. src/components/Toast.tsx を新規作成
   - 画面右下に固定表示（fixed bottom-4 right-4 z-50）
   - 複数トーストを縦に並べる（space-y-2）
   - 各トースト: 左にアイコン（✓ / ✕ / ℹ）、テキスト、右に×ボタン
   - success: bg-emerald-600 text-white
   - error: bg-red-600 text-white
   - info: bg-navy-700 text-white
   - 角丸、影、px-4 py-3
   - アニメーション: translate-x から slide-in（Tailwind animate で実現、@keyframes を index.css に追加）

3. src/main.tsx で ToastProvider を ProductionProvider の中に追加

4. 既存ページでトーストを使う
   - DataManager.tsx:
     - ローカル保存成功 → addToast("src/data/ に保存しました", "success")
     - ローカル保存失敗 → addToast(エラーメッセージ, "error")
     - インポート成功 → addToast("インポートが完了しました", "success")
     - インポート失敗 → addToast(エラーメッセージ, "error")
     - リセット実行 → addToast("デフォルトデータに戻しました", "info")
     - 既存の importSuccess / importError の useState を削除
     - saveStatus の success/error 時の inline テキストも削除
   - Storyboard.tsx: シーン削除後 → addToast("シーンを削除しました", "info")
   - AssetLibrary.tsx: 素材削除後 → addToast("素材を削除しました", "info")
   - PromptBank.tsx: プロンプト削除後 → addToast("プロンプトを削除しました", "info")
   - MissingList.tsx: タスク完了 → addToast("タスクを完了にしました", "success")

■ 動作確認
- ローカル保存 → 右下に緑トースト → 3秒で消える
- インポートエラー → 右下に赤トースト
- 削除実行 → 右下にネイビートースト
- pnpm build が通る
```

---

### 3. テキスト検索（各ページ + グローバル）

```
movie-dashboard に検索機能を追加してください。段階1（各ページ検索）と段階2（グローバル検索）を両方実装します。

■ 段階1: 各ページにインライン検索を追加

対象ページと検索対象フィールド:
- AssetLibrary.tsx: title, path, notes, source, usage
- PromptBank.tsx: title, prompt, negativePrompt, notes
- MissingList.tsx: title, notes
- Storyboard.tsx: title, purpose, visual, caption, notes

各ページの修正内容:
- const [searchQuery, setSearchQuery] = useState("") を追加
- フィルタボタン行の左端に search input を配置
  <input type="search" placeholder="検索…" value={searchQuery} onChange={...}
   className="form-input w-48 text-sm" />
- 既存の filterType / filterStatus と AND 条件で filtered に適用
  .filter(item => !searchQuery || [フィールド群].some(f => f.toLowerCase().includes(searchQuery.toLowerCase())))
- 検索結果0件時の表示はそのまま（既存の「該当する〇〇がありません」メッセージ）

■ 段階2: グローバル検索（Cmd+K コマンドパレット）

1. src/components/SearchPalette.tsx を新規作成
   - fixed inset-0 z-50 bg-black/40 のオーバーレイ
   - 上部中央に白い検索パネル（max-w-lg、角丸、影）
   - 上部に input[type="search"]（autofocus、placeholder: "シーン、素材、プロンプト、タスクを検索…"）
   - 入力に応じて全エンティティを横断検索:
     - scenes: title, purpose, visual, caption → アイコン 🎬
     - assets: title, path, notes → アイコン 🗂
     - prompts: title, prompt → アイコン ✨
     - tasks: title, notes → アイコン ⚠
   - 各結果行: アイコン + エンティティ種別ラベル + タイトル + ID（font-mono text-xs）
   - クリックで該当ページへ navigate（useNavigate）:
     - scene → /storyboard
     - asset → /assets
     - prompt → /prompts
     - task → /missing
   - 遷移後にパレットを閉じる
   - ESC で閉じる
   - 最大20件表示
   - 入力なしの時は「Cmd+K で検索を開始」と表示

2. src/components/Layout.tsx を修正
   - SearchPalette を追加
   - const [showSearch, setShowSearch] = useState(false)
   - useEffect で keydown イベントを登録: Cmd+K / Ctrl+K でトグル

■ 動作確認
- 素材ライブラリで「ハワイ」と入力 → ハワイ関連素材だけ表示
- Cmd+K → パレット開く → 「海」と入力 → シーン・素材・プロンプトが混ざって表示
- 結果をクリック → 該当ページへ遷移
- ESC でパレット閉じる
- pnpm build が通る
```

---

### 4. Undo / Redo

```
movie-dashboard に Undo / Redo 機能を追加してください。

■ 現状
- productionStore.tsx の setData で状態を更新している
- 誤って削除しても戻す手段がない

■ やること

1. src/store/productionStore.tsx を修正
   - state を { data, history, historyIndex } に拡張
   - history: AllData[]（最大30件）
   - 初期値: history = [initialData], historyIndex = 0
   - setData を呼ぶたびに:
     - history を historyIndex+1 で切り詰めてから新 data を push
     - 30件超えたら先頭を捨てる
     - historyIndex を history.length - 1 に
   - undo(): historyIndex > 0 なら historyIndex-1 の data を適用（history には追加しない）
   - redo(): historyIndex < history.length-1 なら historyIndex+1 の data を適用
   - canUndo: historyIndex > 0
   - canRedo: historyIndex < history.length - 1
   - resetToDefaults / importAllData 時は history をクリアして [新data] にリセット
   - ProductionContextValue に undo, redo, canUndo, canRedo を追加

2. src/components/Header.tsx を修正
   - undo / redo ボタンを title の右（MovieSelector の左）に配置
   - ↩ Undo / ↪ Redo（テキスト、アイコンはシンプルに）
   - disabled 時は opacity-30
   - className: text-xs text-navy-500 hover:text-navy-700 disabled:opacity-30

3. src/components/Layout.tsx で Cmd+Z / Cmd+Shift+Z のキーバインド登録
   - useEffect で keydown を listen
   - Cmd+Z → undo()
   - Cmd+Shift+Z → redo()
   - e.preventDefault() でブラウザのデフォルト undo を抑止
   - productionStore から undo / redo / canUndo / canRedo を取得

■ 注意
- localStorage への保存は data が変わるたびに走る（既存の useEffect）
  → history から復元した data も localStorage に保存される（意図通り）
- history 自体は localStorage に保存しない（セッション内のみ）

■ 動作確認
- シーンを削除 → Cmd+Z → シーンが復活
- 素材のステータスを変更 → Undo → 元に戻る → Redo → また変わる
- リセット後は Undo 不可
- pnpm build が通る
```

---

### 5. 品質ゲートチェック UI

```
movie-dashboard に品質ゲートチェックページを追加してください。

■ 背景
- docs/10_quality-gates.md に Gate 1〜4 が定義されている
- Gate 1: 10秒試作（旅行テーマ、質感、テロップ、BGM、AI素材のバランス）
- Gate 2: 30秒試作（飽きない、緩急、表示秒数、章切り替え、BGM合わせ）
- Gate 3: 本編ラフ（二人らしさ、家族友人犬、AI作品に見えない、テロップ、入場への余韻）
- Gate 3.5: 1章完成（完成品質、基準決定、他章展開、AI素材量、再現しやすさ）
- Gate 4: 上映前（会場仕様、読める、音量、音源確認、SNS分離、バックアップ）

■ やること

1. src/data/quality-gates.json を新規作成（以下の構造）
[
  {
    "gateId": "gate-1",
    "title": "Gate 1: 10秒試作",
    "movieTypes": ["opening", "profile"],
    "items": [
      "旅行テーマが伝わる",
      "写真とAI背景の質感が喧嘩していない",
      "テロップが読める",
      "BGMの入口が気持ちいい",
      "AI素材が目立ちすぎない",
      "色が Style Bible に合っている",
      "フォントが読みやすい",
      "テロップ位置が適切",
      "写真の動きが自然",
      "AI素材の方向性が合っている"
    ]
  },
  {
    "gateId": "gate-2",
    "title": "Gate 2: 30秒試作",
    "movieTypes": ["opening", "profile"],
    "items": [
      "冒頭で飽きない",
      "感動・笑い・テンポの緩急がある",
      "写真の表示秒数が短すぎない",
      "章切り替えが分かる",
      "BGMの盛り上がりに映像が合っている",
      "写真順が自然",
      "AI素材の採否が適切"
    ]
  },
  {
    "gateId": "gate-3",
    "title": "Gate 3: 本編ラフ",
    "movieTypes": ["opening", "profile"],
    "items": [
      "二人らしさが主役になっている",
      "家族・友人・犬が自然に見える",
      "AI動画作品に見えない",
      "テロップが内輪すぎない",
      "最後が入場につながる",
      "不要な演出がない",
      "音量と余韻が適切"
    ]
  },
  {
    "gateId": "gate-3-5",
    "title": "Gate 3.5: 1章完成",
    "movieTypes": ["opening", "profile"],
    "items": [
      "1章だけなら完成品として見られる",
      "色・フォント・テロップ・写真演出の基準が決まっている",
      "他の章へ同じ品質で展開できる",
      "AI素材の量が適切",
      "CapCut上で再現しやすい"
    ]
  },
  {
    "gateId": "gate-4",
    "title": "Gate 4: 上映前",
    "movieTypes": ["opening", "profile", "introduction"],
    "items": [
      "会場仕様に合っている",
      "会場スクリーンで読める",
      "音量が大きすぎない",
      "音源の利用条件を確認済み",
      "SNS投稿版と上映版を分けている",
      "最終ファイル名が分かる",
      "バックアップを書き出している"
    ]
  }
]

2. src/pages/QualityGate.tsx を新規作成
   - Header: title="品質ゲート", description="ラフ版・完成前・上映前のチェック項目を管理します", showMovieSelector
   - ゲートを quality-gates.json から読み込み、movieTypes に selectedMovieId の type が含まれるものだけ表示
   - selectedMovieId が "all" の場合は全ゲート表示
   - 各ゲートを SectionCard で表示
   - チェック項目は checkbox + ラベル
   - チェック状態は localStorage に保存（キー: "wedding-movie-dashboard-gates"、構造: Record<movieId, Record<gateId, boolean[]>>）
   - ゲートごとに進捗バー（チェック済み / 全数）
   - 全チェック済みのゲートは ✅ アイコン
   - 「チェックをリセット」ボタン（ConfirmDialog）

3. src/App.tsx にルート追加: <Route path="quality" element={<QualityGate />} />
4. src/components/Sidebar.tsx にリンク追加: { to: "/quality", label: "品質ゲート", icon: "🏁" }
   - 「制作マップ」と「データ管理」の間に配置

■ 動作確認
- ページを開くとゲート一覧が表示される
- チェックを入れる → リロードしても保持されている
- ムービーを切り替えるとチェック状態がムービー別に管理される
- pnpm build が通る
```

---

### 6. プロンプト→生成結果の素材紐付け UI

```
movie-dashboard のプロンプト管理に「生成結果の素材紐付け」UIを追加してください。

■ 現状
- Prompt 型に resultAssetIds: string[] がある
- PromptBank.tsx の展開ビューで resultAssetIds.join(", ") を表示しているが、追加・解除ボタンがない
- store に updatePrompt があるので resultAssetIds を更新すればよい

■ やること

1. src/pages/PromptBank.tsx の展開ビュー（isExpanded 内）を修正

   「生成結果素材」セクションを追加（「メモ」の下）:
   - ヘッダ: "生成結果素材" + 「+ 紐付け」ボタン
   - 紐付いた素材のリスト:
     - 各素材: Badge(assetStatusLabel) + タイトル + 「解除」ボタン
     - 解除: updatePrompt({ ...p, resultAssetIds: p.resultAssetIds.filter(id => id !== assetId) })
   - 素材がない場合: "—"

   「+ 紐付け」ボタンで Modal を開く:
   - data.assets から、まだ resultAssetIds に含まれていないものを表示
   - 各行: Badge(assetStatusLabel) + タイトル + assetId（font-mono text-xs）
   - クリックで紐付け:
     updatePrompt({ ...p, resultAssetIds: [...p.resultAssetIds, assetId] })
   - モーダルを閉じる

2. state 追加:
   - const [linkResultSceneId, setLinkResultSceneId] = useState<string | null>(null)
   → 命名修正: const [linkResultPromptId, setLinkResultPromptId] = useState<string | null>(null)

■ 動作確認
- プロンプトを展開 → 「+ 紐付け」→ 素材を選択 → 紐付け完了
- 紐付いた素材に「解除」→ 解除される
- pnpm build が通る
```

---

## 優先度・中（7〜13）

---

### 7. 自動保存インジケーター

```
movie-dashboard に自動保存インジケーターを追加してください。

■ やること

1. src/store/productionStore.tsx を修正
   - saveData 呼び出し時にタイムスタンプを更新する仕組みを追加
   - ProductionContextValue に lastSavedAt: Date | null を追加
   - saveData の useEffect 内で setLastSavedAt(new Date()) を呼ぶ

2. src/components/Sidebar.tsx を修正
   - 下部の「2026.10.24 Yokohama」の上に保存状態を表示
   - useProduction() から lastSavedAt を取得
   - 表示: "✓ HH:MM 保存済み"（text-xs text-navy-300）
   - lastSavedAt が null の場合は非表示

■ 動作確認
- データを編集 → Sidebar 下部に「✓ 12:34 保存済み」と表示
- pnpm build が通る
```

---

### 8. 一括ステータス変更

```
movie-dashboard の素材ライブラリとタスクリストに一括操作機能を追加してください。

■ やること

【AssetLibrary.tsx】
1. const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set()) を追加
2. テーブルヘッダに全選択チェックボックスを追加
3. 各行の先頭にチェックボックスを追加
4. selectedIds.size > 0 の時、フィルタバーの下に操作バーを表示:
   - 「{n}件選択中」
   - ステータス変更: select で AssetStatus を選択 → 「適用」ボタン → 選択中の全素材の status を更新
   - 一括削除: 「削除」ボタン → ConfirmDialog → deleteAsset を複数回呼ぶ
   - 「選択解除」ボタン
5. フィルタ変更時に selectedIds をクリア

【MissingList.tsx】
1. 同様の仕組み
2. ステータス変更: TaskStatus を select で選択 → 適用
3. 一括削除

■ 動作確認
- 3つ素材を選択 → 「使用中」に一括変更 → 3つとも更新される
- 全選択 → 選択解除 → 選択がクリアされる
- フィルタを変えると選択がリセットされる
- pnpm build が通る
```

---

### 9. CSV書き出し

```
movie-dashboard に CSV エクスポート機能を追加してください。

■ やること

1. src/lib/exporters.ts に以下を追加:

   function toCsvRow(fields: string[]): string
   - 各フィールドを "" で囲み、内部の " は "" にエスケープ、カンマ区切り

   export function exportStoryboardCsv(scenes: Scene[], assets: Asset[]): string
   - BOM付きUTF-8: "﻿" を先頭に
   - ヘッダ: シーンID,タイトル,秒数,目的,ビジュアル,テロップ,BGM,ステータス,素材数,メモ
   - 各シーンを1行

   export function exportCapcutPlanCsv(scenes: Scene[], assets: Asset[]): string
   - BOM付きUTF-8
   - ヘッダ: 開始,終了,シーンID,タイトル,秒数,テロップ,BGM,素材パス,CapCutメモ
   - タイムコードは 0:00 形式
   - 素材パスは紐付いた素材のパスを ";" 区切りで結合

   export function exportAssetListCsv(assets: Asset[]): string
   - BOM付きUTF-8
   - ヘッダ: 素材ID,タイプ,タイトル,パス,ステータス,用途,シーンID,メモ
   - シーンIDは relatedSceneIds を ";" 区切り

2. CapCutPack.tsx のエクスポートボタン群に「CSV出力」ボタンを追加
   - downloadText(exportCapcutPlanCsv(movieScenes, movieAssets), `${movieId}_capcut_plan.csv`)

3. Storyboard.tsx にエクスポートボタンエリアを追加
   - シーン数表示の右に「CSV出力」ボタン
   - downloadText(exportStoryboardCsv(movieScenes, data.assets), `${movieId}_storyboard.csv`)

4. AssetLibrary.tsx にも「CSV出力」ボタンを追加
   - フィルタ後の素材を出力
   - downloadText(exportAssetListCsv(filtered), "assets.csv")

■ 動作確認
- CSV出力 → ダウンロード → Excel で開ける（文字化けしない）
- pnpm build が通る
```

---

### 10. シーン詳細ページ

```
movie-dashboard にシーン詳細ページを追加してください。

■ やること

1. src/pages/SceneDetail.tsx を新規作成
   - ルート: /scene/:sceneId
   - useParams() で sceneId を取得
   - data.scenes.find(s => s.sceneId === sceneId) でシーン取得
   - 見つからない場合は「シーンが見つかりません」+ 絵コンテへのリンク

   レイアウト:
   - Header: title=scene.title, description=scene.sceneId
   - 「← 絵コンテに戻る」リンク（Link to="/storyboard"）

   左カラム（2/3幅）:
   - SectionCard "基本情報": 各フィールドを表示（inline 編集ではなく、✏️ で SceneForm Modal）
   - SectionCard "CapCutメモ": textarea で直接編集、保存ボタン

   右カラム（1/3幅）:
   - SectionCard "素材": 紐付いた素材リスト + 「+ 紐付け」+ 「解除」（Storyboard と同じパターン）
   - SectionCard "プロンプト": 紐付いたプロンプトリスト + 「+ 紐付け」+ 「解除」
   - SectionCard "関連タスク": このシーンに紐付くタスク一覧（Badge でステータス表示）

2. src/App.tsx にルート追加:
   <Route path="scene/:sceneId" element={<SceneDetail />} />

3. src/pages/Storyboard.tsx を修正:
   - シーンタイトルを Link にする: <Link to={`/scene/${scene.sceneId}`}>{scene.title}</Link>
   - 既存の表示は変えない（クリックで詳細に飛ぶだけ）

■ 動作確認
- 絵コンテでシーンタイトルクリック → 詳細ページ
- 素材紐付け/解除が動く
- 「← 絵コンテに戻る」で戻れる
- pnpm build が通る
```

---

### 11. サムネイルプレビュー

```
movie-dashboard の素材ライブラリに画像サムネイルプレビューを追加してください。

■ やること

1. src/lib/media.ts を新規作成
   - export function isImagePath(path: string): boolean
     → .jpg, .jpeg, .png, .webp, .gif, .svg で終わる（大文字小文字無視）
   - export function isVideoPath(path: string): boolean
     → .mp4, .webm, .mov で終わる

2. AssetLibrary.tsx のテーブルを修正
   - 「タイプ」列の前に「プレビュー」列を追加（幅 w-16）
   - isImagePath(asset.path) の場合: <img src={asset.path} className="w-12 h-12 object-cover rounded" />
     → onerror で非表示にする（プレースホルダアイコン表示）
   - isVideoPath の場合: 🎬 アイコン
   - それ以外: 📄 アイコン
   - 画像クリックで Modal に拡大表示

3. 拡大表示用:
   - const [previewPath, setPreviewPath] = useState<string | null>(null)
   - Modal open={!!previewPath}: <img src={previewPath} className="max-w-full max-h-[70vh]" />

■ 注意
- Vite dev server はプロジェクトルートからの相対パスを serve する
- 素材パスが絶対パスの場合は表示できない（プレースホルダでよい）
- 画像読み込みエラー時はアイコンにフォールバック

■ 動作確認
- パスに画像がある素材 → サムネイル表示
- サムネイルクリック → 拡大表示
- 画像がない/パス未設定 → アイコン表示
- pnpm build が通る
```

---

### 12. タイムライン可視化の強化

```
movie-dashboard の CapCut編集パック のタイムラインバーをインタラクティブに強化してください。

■ 現状
- CapCutPack.tsx に SectionCard "タイムライン全体" がある
- flex gap-1 h-8 のバーでシーンを色分け表示
- ホバーで title 表示（native title属性）
- バーの下に 0:00 と合計時間のみ

■ やること

1. バーの各セグメントを改善:
   - title 属性 → カスタムツールチップに変更
   - ホバー時に上部にポップアップ: シーン名 + 秒数 + ステータス
   - ツールチップは absolute positioning で表示
   - セグメント幅が十分（>60px）ならシーン番号を表示

2. クリック動作:
   - セグメントクリック → 下のシーンカードまでスクロール
   - 各シーンカードに id={`scene-${scene.sceneId}`} を付与
   - document.getElementById(...).scrollIntoView({ behavior: "smooth" })

3. タイムコード目盛り:
   - バーの下に目盛りを追加
   - 合計30秒以下: 5秒ごと
   - 合計30秒超: 10秒ごと
   - 各目盛り: text-[10px] text-navy-400

4. 現在のシーンハイライト:
   - バーセグメントと対応するカードの両方をハイライト
   - スクロール位置に基づく必要はない（クリックベースでOK）
   - const [activeSceneId, setActiveSceneId] = useState<string | null>(null)
   - activeSceneId のセグメントに ring-2 ring-gold-400

■ 動作確認
- セグメントホバー → ツールチップ表示
- セグメントクリック → 該当カードにスクロール
- 目盛りが表示される
- pnpm build が通る
```

---

### 13. 一括ステータス変更（タスク側は #8 に含む、ここではスキップ）

→ #8 に統合済み

---

## 優先度・低（14〜18）

---

### 14. ドラッグ&ドロップ並び替え

```
絵コンテのシーン並び替えをドラッグ&ドロップで行えるようにしてください。

■ やること

1. @dnd-kit/core と @dnd-kit/sortable をインストール
   pnpm add @dnd-kit/core @dnd-kit/sortable

2. src/pages/Storyboard.tsx を修正
   - DndContext + SortableContext で movieScenes をラップ
   - 各シーンカードを useSortable でドラッグ可能にする
   - ドラッグハンドル: 左端に ⠿ アイコン（cursor-grab）
   - onDragEnd で moveScene の代わりに直接 scenes 配列を並び替え
     → productionStore に reorderScenes(movieId, orderedSceneIds: string[]) を追加

3. src/store/productionStore.tsx に追加:
   - reorderScenes(movieId: string, orderedIds: string[]): void
     → 対象ムービーのシーンを orderedIds 順に並び替え
     → 他ムービーのシーンはそのまま

4. 既存の ▲▼ ボタンも残す（アクセシビリティ）

■ 動作確認
- シーンをドラッグして並び替え → 順序が保存される
- ▲▼ ボタンも引き続き動く
- pnpm build が通る
```

---

### 15. ダークモード

```
movie-dashboard にダークモード切替を追加してください。

■ やること

1. tailwind.config.js を修正:
   - darkMode: "class" を追加

2. src/index.css に dark: 用の CSS 変数を追加:
   - 既存の form-input, form-label, sidebar-link 等の dark variant

3. src/store/themeStore.tsx を新規作成:
   - useTheme(): { isDark, toggle }
   - localStorage キー: "wedding-movie-dashboard-theme"
   - toggle 時に document.documentElement に dark クラスを add/remove

4. src/components/Sidebar.tsx を修正:
   - 下部に 🌙/☀ トグルボタン

5. 主要コンポーネントに dark: variant を追加:
   - bg-white → dark:bg-navy-900
   - text-navy-800 → dark:text-sand-100
   - border-sand-200 → dark:border-navy-700
   - bg-sand-50 → dark:bg-navy-800
   - etc.

■ 注意
- 全画面を一気に対応する必要はない
- まず Layout, Sidebar, SectionCard, Header, Badge, Modal, StatCard を対応
- 各ページは既存コンポーネントの dark 対応で大部分カバーされる

■ 動作確認
- トグルで切り替わる
- リロードしても維持される
- テキストが読める
- pnpm build が通る
```

---

### 16. キーボードショートカット

```
movie-dashboard にキーボードショートカットを追加してください。

■ やること

1. src/lib/shortcuts.ts を新規作成:
   - registerShortcuts(handlers: Record<string, () => void>): () => void
   - キー文字列の形式: "cmd+k", "cmd+z", "cmd+shift+z", "cmd+s", "?"
   - 返り値は cleanup 関数

2. src/components/Layout.tsx で統合:
   - Cmd+K: グローバル検索（#3 で追加済みなら連携）
   - Cmd+Z: undo（#4 で追加済みなら連携）
   - Cmd+Shift+Z: redo
   - Cmd+S: ローカル保存（saveToLocal を呼ぶ）
   - ?: ショートカット一覧モーダルを表示

3. src/components/ShortcutHelp.tsx を新規作成:
   - Modal で表示
   - テーブル形式: キー | 操作
   - 表示するショートカット一覧

■ 動作確認
- ? キーでヘルプ表示
- Cmd+S でローカル保存（トースト表示）
- pnpm build が通る
```

---

### 17. シーンテンプレート

```
movie-dashboard にシーンテンプレート機能を追加してください。

■ やること

1. src/lib/storage.ts に追加:
   - TEMPLATE_KEY = "wedding-movie-dashboard-templates"
   - loadTemplates(): SceneTemplate[]
   - saveTemplates(templates: SceneTemplate[]): void
   - SceneTemplate = Omit<Scene, "sceneId" | "movieId" | "assets" | "promptIds"> & { templateId: string; templateName: string }

2. Storyboard.tsx のシーンカード操作ボタンに「テンプレとして保存」を追加
   - クリック → templateName を入力する小さいモーダル → 保存

3. シーン追加モーダル（SceneForm）を改修:
   - フォーム上部に「テンプレートから作成」セレクトボックス
   - テンプレート選択 → フォームの各フィールドに値をセット
   - 「テンプレートなし（空白から作成）」がデフォルト

4. テンプレート管理:
   - データ管理ページに「テンプレート」セクション追加
   - テンプレート一覧表示 + 削除ボタン

■ 動作確認
- シーンからテンプレート保存 → 新規シーンでテンプレート選択 → 値がセットされる
- pnpm build が通る
```

---

### 18. プロンプト比較ビュー

```
movie-dashboard のプロンプト管理にプロンプト比較ビューを追加してください。

■ やること

1. src/pages/PromptBank.tsx に比較モードを追加
   - const [compareMode, setCompareMode] = useState(false)
   - const [compareIds, setCompareIds] = useState<string[]>([])
   - フィルタバーの右に「比較」トグルボタン
   - 比較モード時: 各プロンプトカードにチェックボックス表示
   - 2〜3個選択 → 下部に「比較する」ボタン表示

2. 比較ビュー:
   - Modal wide で表示
   - 選択したプロンプトを横並び（grid grid-cols-2 or grid-cols-3）
   - 各列: タイトル、ツール、ステータス、ポジティブプロンプト、ネガティブプロンプト
   - プロンプト本文は pre + whitespace-pre-wrap
   - diff ハイライトは不要（単純横並び）

■ 動作確認
- 「比較」トグル ON → チェックボックス表示 → 2個選択 → 「比較する」→ 横並びモーダル
- pnpm build が通る
```

---

## 実装順序の推奨

依存関係を考慮した順序:

1. **#2 トースト通知** ← 他の全機能で使う
2. **#1 ムービー管理UI** ← 基本機能の穴
3. **#4 Undo/Redo** ← 編集作業の安全網
4. **#3 テキスト検索** ← データが増えてからでも遅くない
5. **#6 プロンプト→素材紐付け** ← 生成ワークフローの穴
6. **#5 品質ゲート** ← 制作進行の判断基準
7. **#7 自動保存インジケーター**
8. **#9 CSV書き出し**
9. **#8 一括ステータス変更**
10. **#10 シーン詳細ページ**
11. **#12 タイムライン強化**
12. **#11 サムネイルプレビュー**
13. **#16 キーボードショートカット**
14. **#14 ドラッグ&ドロップ**
15. **#17 シーンテンプレート**
16. **#18 プロンプト比較**
17. **#15 ダークモード**
