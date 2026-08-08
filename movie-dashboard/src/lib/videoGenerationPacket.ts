import type { Prompt } from "../types/movie";

export interface VideoGenerationPacketContext {
  scene: string;
}

function noteValue(notes: string, key: string) {
  const matches = Array.from(notes.matchAll(new RegExp(`${key}=([^\\s/]+)`, "g")));
  const latest = matches.length > 0 ? matches[matches.length - 1] : undefined;
  return latest?.[1] ?? "";
}

export function promptNegativePolicy(prompt: Prompt) {
  return noteValue(prompt.notes, "negative-policy") || "unknown";
}

export function providerNegativeField(prompt: Prompt) {
  if (promptNegativePolicy(prompt) !== "optional-separate-field") return "";
  return prompt.negativePrompt
    .trim()
    .replace(/^OPTIONAL SEPARATE NEGATIVE FIELD\s*\/\s*QA\.\s*/i, "")
    .replace(/^Avoid:\s*/i, "")
    .trim();
}

export function buildVideoModelInput(prompt: Prompt, context: VideoGenerationPacketContext) {
  const preset = noteValue(prompt.notes, "preset");
  const finishCandidate = noteValue(prompt.notes, "finish-candidate");
  const separateNegative = providerNegativeField(prompt);

  return [
    `[MODEL] ${prompt.tool || "未指定"}`,
    `[SHOT] ${prompt.title}`,
    `[SCENE] ${context.scene}`,
    preset ? `[PRESET] ${preset}` : "",
    finishCandidate ? `[FINISH CANDIDATE] ${finishCandidate}` : "",
    "",
    "[MODEL INPUT]",
    prompt.prompt,
    separateNegative ? "[OPTIONAL SEPARATE NEGATIVE FIELD]" : "",
    separateNegative,
  ].filter(Boolean).join("\n");
}

export function buildVideoQaPacket(prompt: Prompt, context: VideoGenerationPacketContext) {
  const negativePolicy = promptNegativePolicy(prompt);
  const qaAvoid = prompt.negativePrompt.trim();
  return [
    buildVideoModelInput(prompt, context),
    "",
    "[HUMAN QA / DO NOT PASTE BLINDLY INTO MODEL]",
    qaAvoid
      ? negativePolicy === "qa-only"
        ? `QA ONLY — DO NOT SEND AS MODEL INPUT\n${qaAvoid}`
        : `QA / optional separate negative field\n${qaAvoid}`
      : "QA avoid list: none",
    prompt.notes ? `\n[NOTES]\n${prompt.notes}` : "",
  ].filter(Boolean).join("\n");
}
