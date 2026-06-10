import fs from 'node:fs/promises';
import path from 'node:path';

const ROOT = process.cwd();
const PROMPTS_PATH = path.join(ROOT, 'opening-movie/assets/concept-01-image-prompts.json');
const OUT_DIR = path.join(ROOT, 'opening-movie/generated/concept-01/images');
const MANIFEST_PATH = path.join(OUT_DIR, 'manifest.json');

const API_KEY = process.env.OPENAI_API_KEY;
const MODEL = process.env.OPENAI_IMAGE_MODEL || 'gpt-image-1';
const SIZE = process.env.OPENAI_IMAGE_SIZE || '1536x1024';
const QUALITY = process.env.OPENAI_IMAGE_QUALITY || 'high';
const ONLY_PRIORITY = process.env.ONLY_PRIORITY || '';
const DRY_RUN = process.env.DRY_RUN === '1';

if (!API_KEY && !DRY_RUN) {
  console.error('ERROR: OPENAI_API_KEY is required.');
  console.error('Example: OPENAI_API_KEY=sk-... node opening-movie/scripts/generate-concept-01-images.mjs');
  process.exit(1);
}

async function readPrompts() {
  const raw = await fs.readFile(PROMPTS_PATH, 'utf8');
  const prompts = JSON.parse(raw);

  if (!Array.isArray(prompts)) {
    throw new Error('Prompt file must be an array.');
  }

  return prompts.filter((item) => {
    if (!ONLY_PRIORITY) return true;
    return item.priority === ONLY_PRIORITY;
  });
}

async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function generateImage(prompt) {
  const response = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: MODEL,
      prompt,
      size: SIZE,
      quality: QUALITY,
      n: 1,
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`OpenAI Images API error: ${response.status} ${response.statusText}\n${text}`);
  }

  const json = await response.json();
  const b64 = json?.data?.[0]?.b64_json;

  if (!b64) {
    throw new Error(`OpenAI Images API response did not include b64_json: ${JSON.stringify(json).slice(0, 500)}`);
  }

  return Buffer.from(b64, 'base64');
}

async function main() {
  const prompts = await readPrompts();
  await fs.mkdir(OUT_DIR, { recursive: true });

  const manifest = [];

  console.log(`Generating ${prompts.length} image(s)`);
  console.log(`model=${MODEL} size=${SIZE} quality=${QUALITY} dryRun=${DRY_RUN}`);

  for (const [index, item] of prompts.entries()) {
    const outPath = path.join(OUT_DIR, item.filename);
    const exists = await fileExists(outPath);

    if (exists && process.env.OVERWRITE !== '1') {
      console.log(`[skip] ${item.filename} already exists`);
      manifest.push({ ...item, output: outPath, skipped: true });
      continue;
    }

    console.log(`[${index + 1}/${prompts.length}] ${item.filename} - ${item.title}`);

    if (DRY_RUN) {
      manifest.push({ ...item, output: outPath, dryRun: true });
      continue;
    }

    const imageBuffer = await generateImage(item.prompt);
    await fs.writeFile(outPath, imageBuffer);
    manifest.push({
      id: item.id,
      filename: item.filename,
      title: item.title,
      priority: item.priority,
      model: MODEL,
      size: SIZE,
      quality: QUALITY,
      output: path.relative(ROOT, outPath),
      generatedAt: new Date().toISOString(),
    });

    console.log(`  saved: ${path.relative(ROOT, outPath)}`);
  }

  await fs.writeFile(MANIFEST_PATH, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');
  console.log(`manifest: ${path.relative(ROOT, MANIFEST_PATH)}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
