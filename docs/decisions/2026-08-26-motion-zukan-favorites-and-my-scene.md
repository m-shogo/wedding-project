# モーション図鑑 Favorites / My Scene

Status: ACTIVE / MUTABLE  
Date: 2026-08-26  
Scope: `wedding-project` Movie only

## Decision

`お気に入り` は種類ではなく、既存の再利用可能要素に付ける共通の `★` 状態とする。

対象例:
- Text Motion
- Image Motion
- Transition
- Scene Recipe
- My Scene
- その他、図鑑内で再利用可能な要素

専用の `Motion Favorite` 型を増やすことを目的にしない。

```text
Mask Reveal        ☆
Gentle Push        ★
旅行先タイトルScene ★
```

## My Scene

複数のMotionやScene設定を組み合わせて完成した1セクションは、単なるFavoriteではなく、新しい再利用可能パーツとして保存する。

UI名は `マイScene` / `保存したScene` を候補とし、既存のScene Recipeとのauthority差を維持する。

例:

```text
My Scene: 旅行先タイトル

Image Motion: Gentle Push
Text Motion: Mask Reveal
Text Position: Bottom Right
Text Delay: 0.8 sec
Color: White
Scene Duration: 5 sec
```

### Standard replaceable content

My Sceneを保存するたびに、ユーザーへ細かな「差し替え可能/固定」設定を要求しない。

標準挙動:
- 写真: 差し替え可能
- 動画: 差し替え可能
- テキスト内容: 差し替え可能
- 名前 / 日付 / コメント等のcontent: 差し替え可能
- Motion: 保存されたScene設定を継承
- Position: 保存されたScene設定を継承
- Timing: 保存されたScene設定を継承
- Color / Mask / Crop / Blur等: 保存されたScene設定を継承

必要なら利用後にproperty-local overrideできる。

つまり:

> **マイScene = 完成した1セクションを再利用可能なパーツにする。**

写真・動画・文字は差し替え前提。演出構造は再利用する。

## Navigation / UI

公式SceneとMy Sceneを完全に別製品のように分断しない。

Scene Library内で切り替える。

```text
Scene

[ 公式 ] [ マイScene ] [ ★ お気に入り ]
```

`★ お気に入り` は公式/自作を横断するフィルタとして扱える。

My Scene自体にも★を付けられる。

## UX rule

- Favorite = 探しやすくする
- My Scene = 再利用可能なSceneを作る
- Favoriteを新しいコンテンツ型にしない
- My Scene保存時に毎回大量の設定を聞かない
- 写真/動画/Textは自然に差し替えられる
- 利用後の細部変更はproperty-local override
