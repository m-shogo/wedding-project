import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "..");

async function source(relativePath) {
  return readFile(resolve(root, relativePath), "utf8");
}

function requireText(text, expected, label) {
  if (!text.includes(expected)) {
    throw new Error(`AI video failure-learning contract failed: ${label}`);
  }
}

function requireMatch(text, pattern, label) {
  if (!pattern.test(text)) {
    throw new Error(`AI video failure-learning contract failed: ${label}`);
  }
}

const taxonomy = await source("src/lib/videoFailureTaxonomy.ts");
requireText(
  taxonomy,
  'return `${prompt.tool || "unknown-model"}::${preset}::${categoryId}`;',
  "recurrence key must stay scoped to model + preset + failure category",
);
requireMatch(
  taxonomy,
  /id:\s*"ai-look"[\s\S]{0,900}?restrained observational film texture[\s\S]{0,900}?documentary\/natural-film/,
  "AI-look recovery must preserve restrained, natural-film guidance",
);
requireText(
  taxonomy,
  "文字はPalmier/CapCutで後載せ",
  "generated text/logo failures must stay routed to editing handoff",
);

const failureLab = await source("src/pages/VideoFailureLab.tsx");
requireText(
  failureLab,
  "retry 3/3では同系統生成を止める",
  "retry cap must remain visible in failure learning UI",
);
requireText(
  failureLab,
  "同じ「モデル + プリセット + 失敗カテゴリ」が2回以上",
  "repeated failures must trigger a change of generation conditions",
);
requireMatch(
  failureLab,
  /recurrence\s*>=\s*2[\s\S]{0,500}?同条件で\{recurrence\}回再発/,
  "repeated failure evidence must remain surfaced per rejected prompt",
);

console.log("AI video failure-learning contracts: PASS");
