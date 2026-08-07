# AI Video Result Registration — Atomic History Boundary

Movie Dashboard result intake registers one generated AI-video result as a single production-state transaction.

The transaction updates together:

- new `ai_video` Asset
- Asset `relatedSceneIds`
- each related Scene `assets`
- source Prompt `resultAssetIds`
- source Prompt `draft -> testing` transition

All of these changes go through one `setData` call in `ProductionProvider`, so they create one undo/redo history snapshot. One Undo returns to the state before result registration instead of leaving a partially linked Asset or Prompt behind.

The preflight orphan/result-scene checks remain enabled as defense in depth for legacy data, manual edits, imported data, or other nonstandard mutations.

This transaction changes production metadata only. It never creates, deletes, uploads, overwrites, or spends credits on the underlying generated video file.
