# Visual Cockpit quick commands

制作コックピットを使うときの最小コマンドメモ。

## 通常確認

```sh
pnpm export
open exports/index.html
```

## 見た目サムネイルも更新する確認

```sh
pnpm export:stills
pnpm export
open exports/index.html
```

## 個別still確認

```sh
pnpm exec remotion still "文字部品-確認" /tmp/text-parts-preview.png --frame=90
pnpm exec remotion still "写真-Hawaii" /tmp/photo-hawaii.png --frame=120
```

## 注意

- `pnpm export:stills` は重いので通常の `pnpm export` には含めない。
- `exports/previews/*.png` は生成物なのでGit管理しない。
- 最終確認はRemotion Studioで再生する。
