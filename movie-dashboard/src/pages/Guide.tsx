import { Header } from "../components/Header";
import { SectionCard } from "../components/SectionCard";

function Tip({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-2 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3 text-sm text-amber-800 dark:text-amber-300">
      <span className="shrink-0">💡</span>
      <div>{children}</div>
    </div>
  );
}

function Warn({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 text-sm text-red-800 dark:text-red-300">
      <span className="shrink-0">⚠️</span>
      <div>{children}</div>
    </div>
  );
}

function StepList({ items }: { items: string[] }) {
  return (
    <ol className="list-decimal list-inside space-y-1.5 text-sm text-navy-700 dark:text-navy-200">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ol>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="list-disc list-inside space-y-1 text-sm text-navy-700 dark:text-navy-200">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return <h3 className="text-base font-bold text-navy-800 dark:text-sand-100 mt-6 mb-3 border-b border-sand-200 dark:border-navy-600 pb-1">{children}</h3>;
}

export function Guide() {
  return (
    <div>
      <Header title="使い方" description="アプリの使い方、運用ガイド、Tips" />

      {/* ───────── 1. このアプリでできること ───────── */}
      <SectionCard title="このアプリでできること" className="mb-6">
        <p className="text-sm text-navy-600 dark:text-navy-300 mb-4">
          MEMORY FLIGHTは、結婚式ムービーの制作を一元管理するためのツールです。
          オープニングムービー、プロフィールムービーなど複数のムービーを同時に管理できます。
        </p>
        <BulletList items={[
          "ムービーごとに制作状況を管理する",
          "シーン単位で絵コンテ（構成、尺、テロップ、BGMキュー）を管理する",
          "写真、動画、生成画像、生成AI動画、Motion Studio書き出し素材を管理する",
          "生成プロンプトをシーンや素材に紐付ける",
          "不足素材や未確定事項をタスクとして管理する",
          "CapCut編集用の指示をシーン順にまとめて書き出す",
          "Data Managerでデータの整合性チェック、書き出し、読み込みを行う",
        ]} />
        <Tip>
          実ファイル（写真、動画、音源）はGitに入れません。このアプリでは素材のパス、用途、ステータスだけを管理します。
        </Tip>
      </SectionCard>

      {/* ───────── 2. 基本の使い方 ───────── */}
      <SectionCard title="基本の使い方" className="mb-6">
        <p className="text-sm text-navy-600 dark:text-navy-300 mb-4">
          以下の流れで制作を進めると、抜け漏れなく進められます。
        </p>
        <StepList items={[
          "ダッシュボードで全体状況と優先タスクを確認する",
          "絵コンテでシーン構成を作る（シーンの追加、並び替え、尺の設定）",
          "素材ライブラリで素材パスを登録し、シーンに紐付ける",
          "プロンプト管理で生成プロンプトを登録し、シーンに紐付ける",
          "不足・未確定リストで足りない素材や未決定事項を管理する",
          "制作マップでどこが詰まっているか確認する",
          "CapCut編集パックで編集指示を確認し、Markdownで書き出す",
          "データ管理で整合性チェックと書き出しを行う",
        ]} />
        <Tip>
          作業の前後にデータ管理の「検証実行」を使い、エラー0 / 警告0を維持してください。
        </Tip>
      </SectionCard>

      {/* ───────── 3. オープニングムービーのおすすめ運用 ───────── */}
      <SectionCard title="オープニングムービーのおすすめ運用" className="mb-6">
        <p className="text-sm text-navy-600 dark:text-navy-300 mb-4">
          旅行テーマのオープニングムービー制作向けの流れです。
        </p>

        <SubHeading>制作の流れ</SubHeading>
        <StepList items={[
          "まず90秒前後の全体尺を決める",
          "シーンを6〜8個に分ける（出発、搭乗案内、空の旅、到着など）",
          "各シーンに「役割」を決める（雰囲気作り、テロップ表示、カウントダウンなど）",
          "必要素材を素材ライブラリに登録する",
          "AI生成が必要な背景やつなぎ素材はプロンプト管理に登録する",
          "Motion Studioで作る素材は「Motion Studio書き出し」として登録する",
          "CapCut編集パックで編集順に確認する",
          "不足素材が0になるまで不足・未確定リストを潰す",
        ]} />

        <SubHeading>Tips</SubHeading>
        <BulletList items={[
          "長くしすぎない — 60〜90秒が目安。入場前の高揚感を重視する",
          "旅行テーマなら「出発」→「搭乗案内」→「到着」→「カウントダウン」の流れが作りやすい",
          "AI動画は主役ではなく、背景・つなぎ・雰囲気補強に使う",
          "写真や動画より、テロップと音楽で入場前の期待感を高める",
          "CapCut編集前に素材パスとテロップを揃えておくと迷わない",
          "搭乗券、地図、ハンコ、カウントダウンなどのモーション素材はMotion Studioで作れる",
        ]} />
      </SectionCard>

      {/* ───────── 4. プロフィールムービーのおすすめ運用 ───────── */}
      <SectionCard title="プロフィールムービーのおすすめ運用" className="mb-6">
        <p className="text-sm text-navy-600 dark:text-navy-300 mb-4">
          写真中心のプロフィールムービー制作向けの流れです。
        </p>

        <SubHeading>制作の流れ</SubHeading>
        <StepList items={[
          "新郎パート、新婦パート、ふたりパートに分ける",
          "年代・人物・コメント・写真枚数をシーンごとに決める",
          "写真候補を素材ライブラリに登録する",
          "採用、予備、不採用のステータスを使い分ける",
          "コメントやテロップはシーンの「テロップ」欄に入れる",
          "足りない写真やコメントは不足・未確定リストで管理する",
          "CapCut編集パックで写真順とコメントを確認する",
        ]} />

        <SubHeading>Tips</SubHeading>
        <BulletList items={[
          "写真選定が完成度の大半を決める — 良い写真を厳選する",
          "1枚の写真に詰め込みすぎない — 表示4〜6秒、テロップは1〜2行",
          "コメントは短く、読み切れる長さにする",
          "幼少期 → 学生時代 → 社会人 → 出会い → 現在の流れを作る",
          "旅行テーマなら「人生の旅」「ふたりの旅路」としてまとめやすい",
          "写真不足は早めに不足・未確定リストへ登録する",
          "AI動画は章切り替え程度。写真と思い出が主役",
        ]} />
      </SectionCard>

      {/* ───────── 5. ショートカットと便利機能 ───────── */}
      <SectionCard title="ショートカットと便利機能" className="mb-6">

        <SubHeading>キーボードショートカット</SubHeading>
        <BulletList items={[
          "⌘K（Ctrl+K） — グローバル検索を開く。シーン・素材・プロンプト・タスクを横断検索できる",
          "⌘Z（Ctrl+Z） — 直前のデータ変更を元に戻す（Undo）",
          "⌘⇧Z（Ctrl+Shift+Z） — 元に戻した変更をやり直す（Redo）",
          "⌘S（Ctrl+S） — データをsrc/data/に保存する",
          "? — ショートカット一覧を表示する（入力フォーム中は無効）",
        ]} />
        <Tip>
          Undo/Redoは最大30回分の履歴を保持します。ページを閉じると履歴はリセットされます。
        </Tip>

        <SubHeading>ダークモード</SubHeading>
        <BulletList items={[
          "サイドバー下部の🌙/☀️ボタンで切り替える",
          "設定はlocalStorageに保存され、リロード後も維持される",
          "初回はOSのダークモード設定に従う",
        ]} />

        <SubHeading>ドラッグ&ドロップ（絵コンテ）</SubHeading>
        <BulletList items={[
          "特定ムービー選択時に⠿ハンドルをドラッグしてシーンの順番を変えられる",
          "検索中や「すべて」表示時は▲▼ボタンでの並び替えになる",
          "並べ替え結果は自動で保存され、CapCut編集パック・制作マップに反映される",
        ]} />

        <SubHeading>シーンテンプレート（絵コンテ）</SubHeading>
        <BulletList items={[
          "シーンの📌ボタンでそのシーンの設定をテンプレートとして保存する",
          "「📌テンプレート」ボタンからテンプレートを選んでシーンを作成する",
          "テンプレートにはIDは含まれない — 適用時に新しいIDが自動生成される",
          "テンプレートはlocalStorageに保存される（JSONエクスポートには含まれない）",
        ]} />

        <SubHeading>プロンプト比較</SubHeading>
        <BulletList items={[
          "プロンプト展開時の⚖️ボタンで1つ目を選択する",
          "続けて別のプロンプトの⚖️ボタンを押すと、2つを並べて比較できる",
          "ポジティブ/ネガティブプロンプト、ツール、ステータスを比較できる",
          "比較選択中はキャンセルボタンで解除できる",
        ]} />

        <SubHeading>品質ゲート</SubHeading>
        <BulletList items={[
          "Gate 1（10秒試作）→ Gate 2（30秒試作）→ Gate 3（本編ラフ）→ Gate 3.5（1章完成）→ Gate 4（上映前）",
          "ムービーごとにチェック状態を管理する",
          "チェック状態はlocalStorageに保存される",
          "「チェックをリセット」で選択中ムービーのチェックをやり直せる",
        ]} />

        <SubHeading>一括操作</SubHeading>
        <BulletList items={[
          "素材ライブラリ・不足リストでチェックボックスを選択し、一括でステータス変更・削除できる",
          "「すべて選択」で表示中の全件を一度に選択できる",
          "フィルタを変更すると選択はリセットされる",
        ]} />

        <SubHeading>CSVエクスポート</SubHeading>
        <BulletList items={[
          "素材ライブラリ・絵コンテ・CapCut編集パックからCSV出力できる",
          "CSVはBOM付きUTF-8 — Excelで開いても日本語が文字化けしにくい",
          "フィールドはダブルクォートで囲まれ、値内のダブルクォートはエスケープされる",
        ]} />

        <SubHeading>サムネイルプレビュー</SubHeading>
        <BulletList items={[
          "素材ライブラリで画像パス（.jpg/.png/.webp等）を持つ素材にサムネイルが表示される",
          "サムネイルをクリックすると拡大表示できる",
          "画像ファイルが存在しない場合はサムネイルが表示されないだけで、画面は壊れない",
          "サムネイルはブラウザのローカルファイルアクセスに依存する — devサーバーのpublic/から参照する場合のみ表示可能",
        ]} />
      </SectionCard>

      {/* ───────── 6. 各ページの詳細 ───────── */}
      <SectionCard title="各ページの詳細" className="mb-6">

        <SubHeading>✈ ダッシュボード</SubHeading>
        <p className="text-sm text-navy-600 dark:text-navy-300 mb-2">全体状況を一望するページ。</p>
        <BulletList items={[
          "全シーン数、完了数、進捗率、合計尺を確認する",
          "不足素材、未紐付素材、AI動画予定、CapCut準備済の数を見る",
          "優先タスクから今日やることを決める",
          "詰まっているシーンを見つけて対処する",
          "ムービー別の進捗バーで、どのムービーが遅れているか分かる",
        ]} />

        <SubHeading>🎬 絵コンテ</SubHeading>
        <p className="text-sm text-navy-600 dark:text-navy-300 mb-2">シーンの構成・編集・並び替えを行うページ。</p>
        <BulletList items={[
          "シーンを追加・編集・複製・削除する",
          "▲▼ボタンでシーン順を並び替える",
          "各シーンに目的、ビジュアル、テロップ、BGMキュー、メモを書く",
          "素材やプロンプトをシーンに紐付ける（「+ 紐付け」ボタン）",
          "シーン数と合計尺、目標尺をページ上部で確認する",
        ]} />

        <SubHeading>🗂 素材ライブラリ</SubHeading>
        <p className="text-sm text-navy-600 dark:text-navy-300 mb-2">素材のパス、用途、ステータスを管理するページ。</p>
        <BulletList items={[
          "実ファイルではなく素材パスを管理する — ファイル自体はGitに入れない",
          "素材タイプ（自前写真、生成AI動画、Motion Studio書き出しなど）でフィルタする",
          "ステータス（アイデア → 必要 → 収集中 → 準備完了 → 選定済み → 使用中）で進捗を管理する",
          "パスの📋ボタンでパスをコピーできる",
          "シーンへの紐付けは絵コンテ側から行う",
        ]} />

        <SubHeading>✨ プロンプト管理</SubHeading>
        <p className="text-sm text-navy-600 dark:text-navy-300 mb-2">生成プロンプトの管理・コピーを行うページ。</p>
        <BulletList items={[
          "画像生成、動画生成、モーション、テロップ、編集指示、BGMメモの対象別に管理する",
          "ポジティブ/ネガティブプロンプトを「コピー」ボタンでそのまま使える",
          "プロンプトをシーンに紐付けて、どのシーン用か明確にする",
          "生成結果素材ができたら、プロンプト内の生成結果素材IDに紐付ける",
          "成功したプロンプトだけでなく、失敗した理由もメモに残すと再発防止になる",
          "ツール名（ChatGPT Image、Seedance、Kling、Hailuoなど）を明記する",
        ]} />

        <SubHeading>⚠ 不足・未確定リスト</SubHeading>
        <p className="text-sm text-navy-600 dark:text-navy-300 mb-2">不足素材、未確定事項、作業タスクを管理するページ。</p>
        <BulletList items={[
          "カテゴリ（素材不足、未確定事項、写真選定、AI生成、CapCut編集、BGM、確認）で分類する",
          "優先度（高/中/低）を付けて、高から対処する",
          "期限を設定すると、期限超過が赤字で表示される",
          "完了したタスクは✅ボタンで完了にする",
          "完了済みセクションから「戻す」で未完了に戻せる",
        ]} />

        <SubHeading>✂ CapCut編集パック</SubHeading>
        <p className="text-sm text-navy-600 dark:text-navy-300 mb-2">CapCut編集の指示をまとめるページ。</p>
        <BulletList items={[
          "シーン順にタイムライン、使用素材、テロップ、BGM、編集メモを確認する",
          "「CapCut準備完了」バッジが付いたシーンは編集に取りかかれる",
          "CapCutメモをその場で編集できる（✏️ボタン）",
          "「Markdown出力」で編集指示書をダウンロードできる",
          "「JSON出力」でCapCut編集パックデータを書き出せる",
          "不足素材があるシーンは赤で表示される — 編集前に潰す",
        ]} />

        <SubHeading>🗺 制作マップ</SubHeading>
        <p className="text-sm text-navy-600 dark:text-navy-300 mb-2">制作全体の依存関係と進捗を見るページ。</p>
        <BulletList items={[
          "ムービーごとのシーン完了率、不足素材、ブロック中タスクを俯瞰する",
          "シーン別の依存状況テーブルで、素材の過不足を一覧で確認する",
          "要対応タスクセクションで、優先度「高」やブロック中のタスクを見つける",
        ]} />

        <SubHeading>💾 データ管理</SubHeading>
        <p className="text-sm text-navy-600 dark:text-navy-300 mb-2">データの整合性確認、書き出し、読み込み、リセットを行うページ。</p>
        <BulletList items={[
          "「検証実行」でデータの整合性をチェックする — エラー0 / 警告0を維持する",
          "「JSONエクスポート」で全データをバックアップする",
          "「JSONインポート」でエクスポートしたデータを読み込む（現在のデータは上書きされる）",
          "「デフォルトに戻す」でlocalStorageを初期JSONデータに戻す",
        ]} />
      </SectionCard>

      {/* ───────── 7. 実制作Tips ───────── */}
      <SectionCard title="実制作Tips" className="mb-6">

        <SubHeading>素材管理Tips</SubHeading>
        <BulletList items={[
          "大きな画像・動画・音源ファイルはGitに入れない — JSONにはパスだけを書く",
          "素材名は後から見ても分かる名前にする（例: op_02_runway_takeoff.mp4）",
          "採用素材と候補素材をステータスで分ける（準備完了 → 選定済み → 使用中）",
          "CapCutで使ったら「使用中」にステータスを更新する",
          "不採用にした素材も「不採用」として残しておくと、同じ失敗を避けられる",
        ]} />

        <SubHeading>プロンプト管理Tips</SubHeading>
        <BulletList items={[
          "成功プロンプトだけでなく、失敗プロンプトもメモ付きで残す",
          "どのシーン用か必ず紐付ける — 紐付けがないと使い道が分からなくなる",
          "結果素材ができたらプロンプトの生成結果素材に紐付ける",
          "ツール名（ChatGPT Image、Seedance、Kling、Hailuoなど）を明記する",
          "生成AI動画は必要なところだけに使う — 作りすぎると管理が大変になる",
        ]} />

        <SubHeading>CapCut編集Tips</SubHeading>
        <BulletList items={[
          "編集を始める前にCapCut編集パックを見て、素材とテロップを確認する",
          "シーン順に素材を並べて、タイムラインの全体感を掴む",
          "テロップは短くする — 読み切れない長さは避ける",
          "BGMの盛り上がりとカウントダウン、章切り替えのタイミングを合わせる",
          "編集が終わったらシーンステータスを「確認中」または「完了」にする",
        ]} />

        <SubHeading>データ管理Tips</SubHeading>
        <BulletList items={[
          "作業の前後に「検証実行」で整合性チェックする",
          "エラーはすぐ直す、警告もできるだけ残さない",
          "大きな変更の前にJSONエクスポートでバックアップを取る",
          "定期的にエクスポートして、データの喪失を防ぐ",
        ]} />
      </SectionCard>

      {/* ───────── 8. よくあるミス ───────── */}
      <SectionCard title="よくあるミス" className="mb-6">
        <div className="space-y-3">
          <Warn>
            <strong>素材を登録しただけでシーンに紐付けていない</strong>
            <br />素材ライブラリに追加しただけでは、シーンに紐付きません。絵コンテの「+ 紐付け」から紐付けてください。
          </Warn>
          <Warn>
            <strong>シーン削除後に古い参照が残る</strong>
            <br />シーンを削除すると、紐付いていた素材やプロンプトの紐付けは自動で解除されます。ただし、データ管理の「検証実行」で確認すると安心です。
          </Warn>
          <Warn>
            <strong>localStorageのデータを見ていて、src/dataのJSON変更が反映されない</strong>
            <br />画面で一度編集するとlocalStorageに保存されます。src/data/*.jsonを直接編集しても画面に反映されないことがあります。
            詳しくは下の「localStorageとJSONの注意」を参照してください。
          </Warn>
          <Warn>
            <strong>CapCutで使った素材のステータスを更新していない</strong>
            <br />CapCutに配置した素材は、素材ライブラリで「使用中」に変更してください。CapCut準備完了の判定に影響します。
          </Warn>
          <Warn>
            <strong>プロンプトの結果素材を紐付けていない</strong>
            <br />プロンプトから生成した素材ができたら、プロンプト編集画面で結果素材IDを紐付けてください。
          </Warn>
          <Warn>
            <strong>不足素材をアプリに登録せず、口頭やメモだけで管理している</strong>
            <br />足りないものは不足・未確定リストに登録してください。ダッシュボードと制作マップに反映されます。
          </Warn>
          <Warn>
            <strong>Markdown書き出し後に実データを更新し忘れる</strong>
            <br />CapCut編集パックのMarkdown書き出しはスナップショットです。編集後にデータを変えた場合は、再度書き出してください。
          </Warn>
        </div>
      </SectionCard>

      {/* ───────── 9. localStorageとJSONの注意 ───────── */}
      <SectionCard title="localStorageとJSONの注意" className="mb-6">
        <div className="space-y-4 text-sm text-navy-700 dark:text-navy-200">
          <div>
            <SubHeading>データの仕組み</SubHeading>
            <StepList items={[
              "初期データは src/data/*.json（movies.json、scenes.json、assets.json、prompts.json、tasks.json）に入っています",
              "アプリを初めて開くと、これらのJSONデータがブラウザのlocalStorageにコピーされます",
              "画面上で編集した内容は、すべてlocalStorageに自動保存されます",
              "以降はlocalStorageのデータが優先されるため、src/data/*.jsonを直接編集しても画面に反映されないことがあります",
            ]} />
          </div>

          <Tip>
            <strong>src/data/*.jsonを修正したのに画面に出ない場合:</strong>
            <br />
            データ管理の「デフォルトに戻す」を使うと、localStorageの編集データを破棄して初期JSONに戻せます。
            ただし、画面で行った編集はすべて失われるので、先に「JSONエクスポート」でバックアップを取ってください。
          </Tip>

          <div>
            <SubHeading>実制作データを残すには</SubHeading>
            <StepList items={[
              "データ管理から「JSONエクスポート」で全データを書き出す",
              "必要に応じて書き出したJSONの内容を src/data/*.json に反映する",
              "反映したらgit commitする",
              "チームや別PCで同じデータを使いたい場合は、Data Managerの「JSONインポート」で読み込む",
            ]} />
          </div>
        </div>
      </SectionCard>
    </div>
  );
}
