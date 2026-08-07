# AI Video Prompt Creation — Atomic Scene Linking

AI-video Prompt creation and scene linking are one history boundary in Movie Dashboard.

`addPromptLinkedToScenes(prompt, sceneIds)` creates the Prompt and, in the same `setData` transaction:

- normalizes `Prompt.relatedSceneIds` to existing scenes only
- derives missing `Prompt.relatedMovieIds` from those scenes
- adds the Prompt ID to every linked `Scene.promptIds`

This method is used by:

- Video Prompt Builder
- AI Video Shot Planner
- rejected-result retry draft creation

One Undo removes the new Prompt and all of its scene links together. High-confidence Shot Planner batch creation intentionally remains one history entry per Prompt, so Undo reverses the last planned shot rather than the entire batch at once.

Manual/general Prompt CRUD remains available for non-video workflows. The atomic helper is specifically used where the application creates a Prompt that is already known to belong to one or more scenes.
