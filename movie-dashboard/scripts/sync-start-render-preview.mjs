import fs from "node:fs/promises";
import path from "node:path";
import {fileURLToPath} from "node:url";

const dashboardRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const repositoryRoot = path.resolve(dashboardRoot, "..");
const renderRoot = path.join(repositoryRoot, "motion-studio", "out", "start-extended");
const outputRoot = path.join(dashboardRoot, "public", "local-start-render");
const supported = new Set([".mp4", ".webm"]);

async function findRenders() {
  try {
    const entries = await fs.readdir(renderRoot, {withFileTypes: true});
    const files = [];
    for (const entry of entries) {
      if (!entry.isFile() || !supported.has(path.extname(entry.name).toLowerCase())) continue;
      const absolutePath = path.join(renderRoot, entry.name);
      const stat = await fs.stat(absolutePath);
      files.push({absolutePath, stat});
    }
    return files.sort((a, b) => b.stat.mtimeMs - a.stat.mtimeMs);
  } catch (error) {
    if (error?.code === "ENOENT") return [];
    throw error;
  }
}

const renders = await findRenders();
await fs.rm(outputRoot, {recursive: true, force: true});
await fs.mkdir(outputRoot, {recursive: true});

if (renders.length === 0) {
  await fs.writeFile(path.join(outputRoot, "manifest.json"), `${JSON.stringify({render: null}, null, 2)}\n`, "utf8");
  console.log("StaRt Rough render not found. Run the Remotion render first.");
  process.exit(0);
}

const latest = renders[0];
const extension = path.extname(latest.absolutePath).toLowerCase();
const previewName = `latest${extension}`;
await fs.symlink(latest.absolutePath, path.join(outputRoot, previewName));
const manifest = {
  render: {
    title: path.basename(latest.absolutePath),
    originalPath: latest.absolutePath,
    previewUrl: `/local-start-render/${previewName}`,
    updatedAt: latest.stat.mtime.toISOString(),
    fileSizeBytes: latest.stat.size,
  },
};
await fs.writeFile(path.join(outputRoot, "manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
console.log(`StaRt Rough preview synced: ${manifest.render.title}`);
console.log(`Preview: ${manifest.render.previewUrl}`);
