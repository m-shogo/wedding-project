import fs from "node:fs/promises";
import path from "node:path";
import {fileURLToPath} from "node:url";

const dashboardRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const repositoryRoot = path.resolve(dashboardRoot, "..");
const outputRoot = path.join(dashboardRoot, "public", "local-start-materials");
const filesRoot = path.join(outputRoot, "files");
const sources = [
  {type: "own_photo", root: path.join(repositoryRoot, "05_photos", "opening"), extensions: new Set([".jpg", ".jpeg", ".png", ".webp", ".gif"])},
  {type: "own_video", root: path.join(repositoryRoot, "06_videos", "opening"), extensions: new Set([".mp4", ".webm", ".mov", ".m4v"])},
];

async function walk(root) {
  const found = [];
  try {
    const entries = await fs.readdir(root, {withFileTypes: true});
    for (const entry of entries) {
      const absolute = path.join(root, entry.name);
      if (entry.isDirectory()) found.push(...await walk(absolute));
      else if (entry.isFile()) found.push(absolute);
    }
  } catch (error) {
    if (error?.code !== "ENOENT") throw error;
  }
  return found;
}

await fs.rm(outputRoot, {recursive: true, force: true});
await fs.mkdir(filesRoot, {recursive: true});

const manifest = [];
for (const source of sources) {
  const candidates = (await walk(source.root)).filter((file) => source.extensions.has(path.extname(file).toLowerCase())).sort();
  for (const [index, absolutePath] of candidates.entries()) {
    const relative = path.relative(source.root, absolutePath);
    const safeName = `${source.type}-${String(index + 1).padStart(4, "0")}${path.extname(absolutePath).toLowerCase()}`;
    await fs.symlink(absolutePath, path.join(filesRoot, safeName));
    manifest.push({
      id: `start-sync-${source.type}-${String(index + 1).padStart(4, "0")}`,
      type: source.type,
      title: path.basename(absolutePath, path.extname(absolutePath)),
      originalPath: absolutePath,
      relativePath: relative,
      previewUrl: `/local-start-materials/files/${safeName}`,
    });
  }
}

await fs.writeFile(path.join(outputRoot, "manifest.json"), `${JSON.stringify({generatedAt: new Date().toISOString(), materials: manifest}, null, 2)}\n`, "utf8");
console.log(`StaRt material previews synced: ${manifest.length} files.`);
console.log(`Manifest: ${path.join(outputRoot, "manifest.json")}`);
