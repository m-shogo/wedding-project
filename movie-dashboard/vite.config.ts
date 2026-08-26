import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "node:fs";
import path from "node:path";
import type { IncomingMessage, ServerResponse } from "node:http";

const dataDir = path.resolve(__dirname, "src/data");

const collections = ["movies", "scenes", "assets", "prompts", "tasks"] as const;

/**
 * 歌詞タイミング調整 (Lyric Timing Studio) local data sources.
 *
 * これらは `motion-studio/local/` にあるGit管理外のローカル正本。
 * beat検出由来の値は「参考」であり、人間の聴取確認が上位。
 * 手動修正は元ファイルを上書きせず、別ファイル
 * `word-accent-map.manual-overrides.local.json` へ層として書き出す。
 */
const localDir = path.resolve(__dirname, "../motion-studio/local");
const timingPaths = {
  lyrics: path.join(localDir, "lyrics-wedding-edit.local.json"),
  wordAccents: path.join(localDir, "word-accent-map.local.json"),
  beats: path.join(localDir, "beat-map.local.json"),
  weddingEdit: path.join(localDir, "start-wedding-edit.local.json"),
  audio: path.join(localDir, "audio/StaRt.m4a"),
  overrides: path.join(localDir, "word-accent-map.manual-overrides.local.json"),
};

function sendJson(res: ServerResponse, status: number, payload: unknown) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(payload));
}

function readLocalJson(filePath: string): unknown | null {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf-8")) as unknown;
  } catch {
    return null;
  }
}

function serveJsonFile(res: ServerResponse, filePath: string, pick?: (raw: any) => unknown) {
  const raw = readLocalJson(filePath);
  if (raw === null) {
    sendJson(res, 404, {
      error: "local file not found or invalid JSON",
      path: filePath,
      hintJa: "motion-studio/local/ にローカル正本を配置してください。",
    });
    return;
  }
  sendJson(res, 200, pick ? pick(raw) : raw);
}

/** HTTP Range対応のaudioストリーム。<audio>のseek/scrubに必須。 */
function serveAudio(req: IncomingMessage, res: ServerResponse) {
  let stat: fs.Stats;
  try {
    stat = fs.statSync(timingPaths.audio);
  } catch {
    sendJson(res, 404, {
      error: "audio not found",
      path: timingPaths.audio,
      hintJa: "motion-studio/local/audio/StaRt.m4a を配置してください。",
    });
    return;
  }

  const size = stat.size;
  res.setHeader("Accept-Ranges", "bytes");
  res.setHeader("Content-Type", "audio/mp4");
  res.setHeader("Cache-Control", "no-store");

  const rangeHeader = req.headers.range;
  const match = typeof rangeHeader === "string" ? /^bytes=(\d*)-(\d*)$/.exec(rangeHeader.trim()) : null;

  if (!match) {
    res.statusCode = 200;
    res.setHeader("Content-Length", String(size));
    if (req.method === "HEAD") {
      res.end();
      return;
    }
    fs.createReadStream(timingPaths.audio).pipe(res);
    return;
  }

  const [, rawStart, rawEnd] = match;
  let start: number;
  let end: number;
  if (rawStart === "") {
    // suffix range: bytes=-N (末尾Nバイト)
    const suffix = Number(rawEnd);
    if (!Number.isFinite(suffix) || suffix <= 0) {
      res.statusCode = 416;
      res.setHeader("Content-Range", `bytes */${size}`);
      res.end();
      return;
    }
    start = Math.max(0, size - suffix);
    end = size - 1;
  } else {
    start = Number(rawStart);
    end = rawEnd === "" ? size - 1 : Number(rawEnd);
  }

  if (!Number.isFinite(start) || !Number.isFinite(end) || start > end || start >= size) {
    res.statusCode = 416;
    res.setHeader("Content-Range", `bytes */${size}`);
    res.end();
    return;
  }
  end = Math.min(end, size - 1);

  res.statusCode = 206;
  res.setHeader("Content-Range", `bytes ${start}-${end}/${size}`);
  res.setHeader("Content-Length", String(end - start + 1));
  if (req.method === "HEAD") {
    res.end();
    return;
  }
  fs.createReadStream(timingPaths.audio, { start, end }).pipe(res);
}

interface TimingOverrideEntry {
  phraseId: string;
  /** null の場合は phrase 全体 (startSec/endSec) のoverride。 */
  word: string | null;
  manualAccentSec: number | null;
  manualOffsetFrames: number | null;
  manualStartSec?: number | null;
  manualEndSec?: number | null;
  verifiedByListening: boolean;
  reviewComment: string;
  updatedAt: string;
}

function overrideKey(entry: { phraseId: unknown; word: unknown }): string {
  return `${String(entry.phraseId)}|${entry.word == null ? "" : String(entry.word)}`;
}

/** 既存overrideへ upsert する (phraseId + word がキー。挿入順は維持)。 */
function mergeOverrides(existing: TimingOverrideEntry[], incoming: TimingOverrideEntry[]): TimingOverrideEntry[] {
  const merged = [...existing];
  const indexByKey = new Map<string, number>();
  merged.forEach((entry, index) => indexByKey.set(overrideKey(entry), index));

  for (const entry of incoming) {
    const key = overrideKey(entry);
    const at = indexByKey.get(key);
    if (at === undefined) {
      indexByKey.set(key, merged.length);
      merged.push(entry);
    } else {
      merged[at] = { ...merged[at], ...entry };
    }
  }
  return merged;
}

function saveOverrides(req: IncomingMessage, res: ServerResponse) {
  if (req.method !== "POST") {
    sendJson(res, 405, { error: "Method not allowed" });
    return;
  }
  let body = "";
  req.on("data", (chunk: Buffer) => {
    body += chunk.toString();
  });
  req.on("end", () => {
    let incoming: TimingOverrideEntry[];
    try {
      const parsed = JSON.parse(body) as unknown;
      const list = Array.isArray(parsed)
        ? parsed
        : Array.isArray((parsed as { overrides?: unknown })?.overrides)
          ? (parsed as { overrides: unknown[] }).overrides
          : null;
      if (!list) {
        sendJson(res, 400, { error: "expected an array of override entries" });
        return;
      }
      incoming = list as TimingOverrideEntry[];
    } catch {
      sendJson(res, 400, { error: "Invalid JSON" });
      return;
    }

    for (const entry of incoming) {
      if (!entry || typeof entry.phraseId !== "string" || entry.phraseId.length === 0) {
        sendJson(res, 400, { error: "each entry requires a phraseId" });
        return;
      }
    }

    const existingRaw = readLocalJson(timingPaths.overrides);
    const existing: TimingOverrideEntry[] = Array.isArray(existingRaw)
      ? (existingRaw as TimingOverrideEntry[])
      : Array.isArray((existingRaw as { overrides?: unknown })?.overrides)
        ? ((existingRaw as { overrides: TimingOverrideEntry[] }).overrides)
        : [];

    const merged = mergeOverrides(existing, incoming);
    try {
      fs.mkdirSync(path.dirname(timingPaths.overrides), { recursive: true });
      fs.writeFileSync(timingPaths.overrides, JSON.stringify(merged, null, 2) + "\n", "utf-8");
    } catch (error) {
      sendJson(res, 500, { error: `write failed: ${String(error)}` });
      return;
    }
    sendJson(res, 200, { ok: true, count: merged.length, path: timingPaths.overrides });
  });
}

export default defineConfig({
  plugins: [
    react(),
    {
      name: "local-save-api",
      configureServer(server) {
        server.middlewares.use("/api/save-data", (req, res) => {
          if (req.method !== "POST") {
            res.statusCode = 405;
            res.end(JSON.stringify({ error: "Method not allowed" }));
            return;
          }
          let body = "";
          req.on("data", (chunk: Buffer) => { body += chunk.toString(); });
          req.on("end", () => {
            try {
              const data = JSON.parse(body) as Record<string, unknown>;
              for (const key of collections) {
                if (!Array.isArray(data[key])) {
                  res.statusCode = 400;
                  res.end(JSON.stringify({ error: `missing or invalid: ${key}` }));
                  return;
                }
              }
              for (const key of collections) {
                const filePath = path.join(dataDir, `${key}.json`);
                fs.writeFileSync(filePath, JSON.stringify(data[key], null, 2) + "\n", "utf-8");
              }
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ ok: true }));
            } catch {
              res.statusCode = 400;
              res.end(JSON.stringify({ error: "Invalid JSON" }));
            }
          });
        });
      },
    },
    {
      name: "lyric-timing-api",
      configureServer(server) {
        // ローカル正本が無くてもdev serverは落とさない。警告だけ出す。
        for (const [label, filePath] of Object.entries(timingPaths)) {
          if (label === "overrides") continue;
          if (!fs.existsSync(filePath)) {
            server.config.logger.warn(
              `[lyric-timing-api] 歌詞タイミング調整のローカル素材が見つかりません (${label}): ${filePath}`,
            );
          }
        }

        server.middlewares.use("/api/timing/lyrics", (_req, res) => {
          serveJsonFile(res, timingPaths.lyrics, (raw) => (Array.isArray(raw) ? raw : raw?.phrases ?? []));
        });

        server.middlewares.use("/api/timing/word-accents", (_req, res) => {
          serveJsonFile(res, timingPaths.wordAccents, (raw) => (Array.isArray(raw) ? raw : raw?.words ?? []));
        });

        server.middlewares.use("/api/timing/beats", (_req, res) => {
          serveJsonFile(res, timingPaths.beats);
        });

        server.middlewares.use("/api/timing/wedding-edit", (_req, res) => {
          serveJsonFile(res, timingPaths.weddingEdit);
        });

        server.middlewares.use("/api/timing/overrides", (_req, res) => {
          const raw = readLocalJson(timingPaths.overrides);
          const list = Array.isArray(raw)
            ? raw
            : Array.isArray((raw as { overrides?: unknown })?.overrides)
              ? (raw as { overrides: unknown[] }).overrides
              : [];
          sendJson(res, 200, list);
        });

        server.middlewares.use("/api/timing/audio", serveAudio);

        server.middlewares.use("/api/timing/save-overrides", saveOverrides);
      },
    },
  ],
});
