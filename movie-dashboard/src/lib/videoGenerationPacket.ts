import type { Prompt } from "../types/movie";

export interface VideoGenerationPacketContext {
  scene: string;
}

export interface VideoProviderFields {
  mainPrompt: string;
  separateNegativeField: string;
  negativePolicy: string;
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
  const negativePolicy = promptNegativePolicy(prompt);
  const includeSeparateNegative = negativePolicy === "optional-separate-field";
  if (!includeSeparateNegative) return "";
  return prompt.negativePrompt
    .trim()
    .replace(/^OPTIONAL SEPARATE NEGATIVE FIELD\s*\/\s*QA\.\s*/i, "")
    .replace(/^Avoid:\s*/i, "")
    .trim();
}

export function buildVideoProviderFields(prompt: Prompt): VideoProviderFields {
  return {
    mainPrompt: prompt.prompt.trim(),
    separateNegativeField: providerNegativeField(prompt),
    negativePolicy: promptNegativePolicy(prompt),
  };
}

// This function is used by the queue's provider-safe copy action. Keep it as
// the exact text intended for the provider's MAIN prompt field: no dashboard
// labels, scene IDs, QA notes or negative-field text are mixed into it.
export function buildVideoModelInput(prompt: Prompt, _context: VideoGenerationPacketContext) {
  return buildVideoProviderFields(prompt).mainPrompt;
}

function buildVideoOperatorPacket(prompt: Prompt, context: VideoGenerationPacketContext) {
  const preset = noteValue(prompt.notes, "preset");
  const finishCandidate = noteValue(prompt.notes, "finish-candidate");
  const fields = buildVideoProviderFields(prompt);

  return [
    `[PROMPT ID] ${prompt.promptId}`,
    `[MODEL] ${prompt.tool || "未指定"}`,
    `[SHOT] ${prompt.title}`,
    `[SCENE] ${context.scene}`,
    preset ? `[PRESET] ${preset}` : "",
    finishCandidate ? `[FINISH CANDIDATE] ${finishCandidate}` : "",
    `[NEGATIVE POLICY] ${fields.negativePolicy}`,
    "",
    "[PROVIDER MAIN PROMPT — COPY ONLY THIS BLOCK TO THE MAIN PROMPT FIELD]",
    fields.mainPrompt,
    fields.separateNegativeField ? "[OPTIONAL SEPARATE NEGATIVE FIELD — USE ONLY IN A SEPARATE PROVIDER FIELD]" : "",
    fields.separateNegativeField,
  ].filter(Boolean).join("\n");
}

function qaAvoidLabel(negativePolicy: string, qaAvoid: string) {
  if (!qaAvoid) return "QA avoid list: none";
  if (negativePolicy === "qa-only") {
    return `QA ONLY — DO NOT SEND AS MODEL INPUT\n${qaAvoid}`;
  }
  if (negativePolicy === "optional-separate-field") {
    return `QA / optional separate negative field\n${qaAvoid}`;
  }
  return `QA ONLY UNTIL PROVIDER POLICY IS VERIFIED — DO NOT SEND AS MODEL INPUT\n${qaAvoid}`;
}

export function buildVideoQaPacket(prompt: Prompt, context: VideoGenerationPacketContext) {
  const negativePolicy = promptNegativePolicy(prompt);
  const qaAvoid = prompt.negativePrompt.trim();
  return [
    buildVideoOperatorPacket(prompt, context),
    "",
    "[HUMAN QA / DO NOT PASTE BLINDLY INTO MODEL]",
    qaAvoidLabel(negativePolicy, qaAvoid),
    negativePolicy === "unknown"
      ? "[POLICY CHECK REQUIRED] negative-policy is missing; verify the current provider UI/docs before using any negative field."
      : "",
    prompt.notes ? `\n[NOTES]\n${prompt.notes}` : "",
  ].filter(Boolean).join("\n");
}
