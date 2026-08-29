-- Build the deterministic quiet-caption Actual in the currently open Resolve project.

resolve = Resolve()
if not resolve then error("Resolve scripting connection is unavailable") end

projectManager = resolve:GetProjectManager()
project = projectManager:GetCurrentProject()
if not project or project:GetName() ~= "MotionZukan_QuietCaption_Actual_20260828_Codex" then
  error("Open the dedicated quiet-caption Resolve project before running this script")
end

timeline = project:GetCurrentTimeline()
if not timeline or timeline:GetName() ~= "Quiet Caption Actual 24fps" then
  error("The dedicated 24fps quiet-caption timeline is not active")
end
project:SetCurrentTimeline(timeline)

mediaPool = project:GetMediaPool()
sourcePath = "/Users/m-shogo/Developer/personal/wedding-project/movie-dashboard/public/motion-previews/photo-static-hero/repo-stock-v1.mp4"
if timeline:GetItemListInTrack("video", 1)[1] then
  error("The dedicated timeline is not empty; refusing to create a duplicate Actual")
end
items = mediaPool:ImportMedia({sourcePath})
if not items or not items[1] then error("Failed to import the deterministic stock demo source") end

timelineItems = mediaPool:AppendToTimeline({{
  mediaPoolItem = items[1],
  startFrame = 0,
  -- Resolve rate-converts source frames 0..119 to a 95-frame 24fps timeline clip.
  endFrame = 119,
  mediaType = 1,
}})
if not timelineItems or not timelineItems[1] then error("Failed to append the source clip to the timeline") end

clip = timelineItems[1]
comp = clip:AddFusionComp()
if not comp then error("Failed to add a Fusion composition to the source clip") end

comp:Lock()
mediaIn = comp:FindTool("MediaIn1")
mediaOut = comp:FindTool("MediaOut1")
if not mediaIn or not mediaOut then
  comp:Unlock()
  error("Fusion MediaIn/MediaOut nodes are missing")
end

text = comp:AddTool("TextPlus")
merge = comp:AddTool("Merge")
text:SetAttrs({TOOLS_Name = "QuietCaptionText"})
merge:SetAttrs({TOOLS_Name = "QuietCaptionOpacity"})

text.StyledText = "A QUIET BEGINNING"
text.UseFrameFormatSettings = 0
text.Width = 1280
text.Height = 720
text.Font = "Helvetica Neue"
text.Style = "Regular"
text.Size = 0.055
text.Tracking = 1.08
-- Fusion's Y axis is bottom-origin; 0.22 is a restrained lower-third position.
text.Center = {0.5, 0.22}
text.Red1 = 0.94
text.Green1 = 0.92
text.Blue1 = 0.88

merge.Background = mediaIn.Output
merge.Foreground = text.Output
mediaOut.Input = merge.Output
merge.Blend = comp:BezierSpline()
merge.Blend[0] = 0.0
merge.Blend[11] = 1.0
merge.Blend[94] = 1.0
comp:Unlock()

projectManager:SaveProject()
print("QUIET_CAPTION_ACTUAL_CREATED timeline=Quiet Caption Actual 24fps frames=95 fade=0..11 position=0.50,0.22")
