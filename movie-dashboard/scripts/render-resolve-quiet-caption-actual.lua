-- Render the verified quiet-caption Actual from its dedicated Resolve timeline.

resolve = Resolve()
if not resolve then error("Resolve scripting connection is unavailable") end

projectManager = resolve:GetProjectManager()
project = projectManager:GetCurrentProject()
if not project or project:GetName() ~= "MotionZukan_QuietCaption_Actual_20260828_Codex" then
  error("Open the dedicated quiet-caption Resolve project before rendering")
end

timeline = project:GetCurrentTimeline()
if not timeline or timeline:GetName() ~= "Quiet Caption Actual 24fps" then
  error("The dedicated quiet-caption timeline is not active")
end

clips = timeline:GetItemListInTrack("video", 1) or {}
if #clips ~= 1 or clips[1]:GetDuration() ~= 95 or clips[1]:GetFusionCompCount() ~= 1 then
  error("Quiet-caption timeline does not match the verified one-clip, 95-frame Actual")
end

outputDir = "/Users/m-shogo/Developer/personal/wedding-project/movie-dashboard/public/motion-previews/type-quiet-caption"
project:DeleteAllRenderJobs()
if not project:SetCurrentRenderFormatAndCodec("mp4", "H264") then error("Failed to select H.264 MP4") end
if not project:SetRenderSettings({
  TargetDir = outputDir,
  CustomName = "davinci-actual-v1",
  SelectAllFrames = false,
  MarkIn = clips[1]:GetStart(),
  MarkOut = clips[1]:GetEnd() - 1,
  ExportVideo = true,
  ExportAudio = false,
}) then error("Failed to apply quiet-caption render settings") end

jobId = project:AddRenderJob()
if not jobId or not project:StartRendering(jobId) then error("Failed to start quiet-caption render") end
while project:IsRenderingInProgress() do bmd.wait(1) end

status = project:GetRenderJobStatus(jobId) or {}
if status.JobStatus ~= "Complete" and status.JobStatus ~= "完了" then
  error("Quiet-caption render did not complete: " .. tostring(status.JobStatus))
end
print("QUIET_CAPTION_ACTUAL_RENDERED|" .. outputDir .. "/davinci-actual-v1.mp4|frames=95|fps=24")
