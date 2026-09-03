# Git歌詞本文漏洩監査 — 2026-08-27

Status: PARTIALLY RESOLVED(working tree修正済み、commit history未修正・見送り)
Scope: `feature/start-129-three-showcases`ブランチ(`origin/main..HEAD`)
関連方針: 「歌詞本文をGitへ保存しない」(`docs/opening-authority.md`「歌詞本文はGitへ保存せず」、
`motion-studio/README.md`のStaRt Wedding Edit節「歌詞本文をGitへ保存しない既存方針」)

## 経緯

Render Truth監査(offset/timing根本修正)の一環でユーザーから「Git内歌詞漏洩の監査」を
明示的に指示された。TimingMasterの各phraseの実際の歌詞行(`local/`配下、Git管理外)を
基準に、tracked filesとcommit messageの両方を機械的に検索した。

## 監査方法

`local/start-wedding-timing-master.local.json`(Git管理外)の全30 phraseの`text`
フィールド(実歌詞、27種のユニーク行)を抽出し、以下2つを対象に完全一致検索した。

1. `git ls-files`で列挙した現在のtracked files全件
2. `git log origin/main..HEAD`の全コミットメッセージ本文

## 発見(修正前)

### Tracked files: 17件のヒット(7ファイル)

以下のファイルで、歌詞の完全な1行がsource comment・READMEの説明文・data fieldの
`noteJa`(director note)として直接埋め込まれていた。

- `docs/decisions/2026-08-25-start-wedding-edit-scope-change.md`
- `motion-studio/README.md`
- `motion-studio/scripts/check-start-wedding-edit-phrase-qa.mts`(**歌詞完全一致による
  実行時ロジックの分岐条件として使用** — 単なるコメントではなく機能的依存だった)
- `motion-studio/src/data/startWeddingEdit/choreography.ts`(このセッションで新規追加した
  コメントも含む — 自己発見・自己修正)
- `motion-studio/src/data/startWeddingEdit/storyboard.ts`(`noteJa`フィールド、複数箇所)
- `motion-studio/src/motion-kit/startWeddingEdit/choreographedMoments.tsx`(このセッションで
  新規追加したコメントも含む)
- `motion-studio/src/motion-kit/startWeddingEdit/weddingLyricLine.tsx`

### Commit messages: 5コミットでヒット(origin/main..HEADの44コミット中)

`git log --format=%H`で該当コミットのhashのみ記録する(メッセージ本文は再掲しない)。

- `bb6d96976d`(ブランチ最初期に近いコミット。これを書き換えると以降40件以上の
  コミットhashが全て変わる)
- `324187c662`
- `1d54dabcef`
- `fc4955ebf6`
- `cbab95e960`

## 対応(2026-08-27実施)

### Tracked files: 全件修正済み

上記7ファイルすべてを、歌詞本文の引用をやめ、`phraseId`参照・意味の要約(パラフレーズ)・
`noteJa`のdirector note書き換えへ置き換えた。

- 機能的依存があった`check-start-wedding-edit-phrase-qa.mts`は、歌詞完全一致比較を
  `phraseId`ベースの比較(P015とP030のtextが相互に一致するか)へリファクタリングし、
  歌詞本文を一切ハードコードせずに同じ検証意図(サビ着地句が2回、同一内容で出現する)を
  達成した。
- `choreography.ts`のfallback値(`word: w?.word ?? '独りじゃない'`)は、歌詞断片ではなく
  `phrase.phraseId`を返すよう変更した(このfallback自体は実際のrender表示には
  使われていないmetadataのみの値だったが、念のため修正)。
- 修正後、同じ検索を再実行しtracked filesのヒットが0件になったことを確認済み。
- `pnpm typecheck` / `pnpm check` / `check:start-wedding-edit-phrase-qa` /
  `check:choreography-event-timing`すべてgreenであることを確認し、部分renderで
  視覚的な回帰も無いことを確認した。

### Commit messages: 今回は見送り(ユーザー判断)

5コミットのメッセージ修正には、ブランチ全体のhistory rewrite(`git rebase`によるcommit
message書き換え、以降のコミットhash変化、`git push --force-with-lease`によるorigin反映)が
必要になる。この操作の影響範囲(PR #385の履歴表示、40件以上のhash変更)をユーザーへ提示し、
判断を仰いだ結果、**今回は実施を見送り、この監査記録を残すことで対応する**という判断を得た。

理由として妥当と考えられる点:

- 該当ブランチは`origin/main`へ未mergeのDraft PRであり、mainへの影響は無い。
- 該当コミットのメッセージは、歌詞そのものの再配布・二次利用を目的としたものではなく、
  作業内容の説明の一部として言及されたものである(とはいえ方針違反であることに変わりはない)。
- 修正の優先順位として、実際の音ズレ根本修正(Render Truth監査)の方が緊急度が高い。

## 今後の運用

- 今後、新しい歌詞行をコミットメッセージやsource commentへ引用しない
  (このセッション自体もchoreography.ts/choreographedMoments.tsxへ新規で歌詞本文を
  埋め込んでいたため、AI側も油断すると再発する。作業前にこのファイルを参照する)。
- もしユーザーが将来「PRをsquash mergeする」判断をした場合、squash commit 1件分の
  メッセージだけは歌詞本文を含まないよう、squash時に本文を書き直すことを推奨する
  (squash自体は個別コミットの書き換えより低リスク)。
- 次に大きなhistory操作(rebase等)を行う正当な理由が発生した場合は、このタイミングで
  まとめてcommit message修正も行うことを検討する。
