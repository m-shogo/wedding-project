import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const dashboardRoot = __dirname;
const dataDir = path.resolve(dashboardRoot, "src/data");
const motionStudioRoot = path.resolve(dashboardRoot, "../motion-studio");
const openingPhotoDir = path.join(motionStudioRoot, "public/photos/opening");
const syncPhotosScript = path.join(motionStudioRoot, "scripts/sync-photos.mts");
const syncOpeningGateScript = path.join(dashboardRoot, "scripts/sync-opening-production-gate.mjs");

const collections = ["movies", "scenes", "assets", "prompts", "tasks"] as const;
const openingPhotoSlots = new Set([
  "okinawa-01",
  "okinawa-02",
  "okinawa-03",
  "seoul-01",
  "seoul-02",
  "seoul-03",
  "hawaii-01",
  "hawaii-02",
  "hawaii-03",
  "hero-01",
  "hero-02",
]);
const openingPhotoExtensions = ["jpg", "jpeg", "png", "webp"] as const;
const maxOpeningPhotoBytes = 40 * 1024 * 1024;

function sendJson(res: { statusCode: number; setHeader(name: string, value: string): void; end(body?: string): void }, statusCode: number, payload: unknown) {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(JSON.stringify(payload));
}

function sniffImageExtension(buffer: Buffer): "jpg" | "png" | "webp" | null {
  if (buffer.length >= 3 && buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) {
    return "jpg";
  }
  if (
    buffer.length >= 8 &&
    buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4e && buffer[3] === 0x47 &&
    buffer[4] === 0x0d && buffer[5] === 0x0a && buffer[6] === 0x1a && buffer[7] === 0x0a
  ) {
    return "png";
  }
  if (
    buffer.length >= 12 &&
    buffer.toString("ascii", 0, 4) === "RIFF" &&
    buffer.toString("ascii", 8, 12) === "WEBP"
  ) {
    return "webp";
  }
  return null;
}

export default defineConfig({
  plugins: [
    react(),
    {
      name: "local-dashboard-api",
      configureServer(server) {
        server.middlewares.use("/api/opening-photo-upload", (req, res) => {
          if (req.method !== "POST") {
            sendJson(res, 405, { error: "Method not allowed" });
            return;
          }

          const requestUrl = new URL(req.url ?? "/", "http://localhost");
          const slot = requestUrl.searchParams.get("slot") ?? "";
          if (!openingPhotoSlots.has(slot)) {
            sendJson(res, 400, { error: "Unknown Opening V1 photo slot" });
            return;
          }

          const contentLength = Number(req.headers["content-length"] ?? 0);
          if (Number.isFinite(contentLength) && contentLength > maxOpeningPhotoBytes) {
            sendJson(res, 413, { error: "Photo is larger than 40MB" });
            return;
          }

          const chunks: Buffer[] = [];
          let totalBytes = 0;
          let tooLarge = false;

          req.on("data", (chunk: Buffer) => {
            totalBytes += chunk.length;
            if (totalBytes > maxOpeningPhotoBytes) {
              tooLarge = true;
              return;
            }
            chunks.push(chunk);
          });

          req.on("end", () => {
            if (tooLarge) {
              sendJson(res, 413, { error: "Photo is larger than 40MB" });
              return;
            }

            const body = Buffer.concat(chunks);
            if (body.length === 0) {
              sendJson(res, 400, { error: "Empty photo upload" });
              return;
            }

            const extension = sniffImageExtension(body);
            if (!extension) {
              sendJson(res, 415, { error: "JPEG / PNG / WebP only. Convert HEIC or other formats first." });
              return;
            }

            try {
              fs.mkdirSync(openingPhotoDir, { recursive: true });

              // User-controlled filenames are never used. Remove older canonical variants first.
              for (const oldExtension of openingPhotoExtensions) {
                fs.rmSync(path.join(openingPhotoDir, `${slot}.${oldExtension}`), { force: true });
              }

              const outputPath = path.join(openingPhotoDir, `${slot}.${extension}`);
              fs.writeFileSync(outputPath, body);

              // Keep Motion Studio photoLibrary and Dashboard Production Gate in sync immediately.
              execFileSync(process.execPath, ["--no-warnings", syncPhotosScript], {
                cwd: motionStudioRoot,
                stdio: "pipe",
              });
              execFileSync(process.execPath, [syncOpeningGateScript, "--write"], {
                cwd: dashboardRoot,
                stdio: "pipe",
              });

              sendJson(res, 200, {
                ok: true,
                slot,
                path: `opening/${slot}.${extension}`,
                bytes: body.length,
              });
            } catch (error) {
              const message = error instanceof Error ? error.message : "Unknown local upload error";
              sendJson(res, 500, { error: message });
            }
          });
        });

        server.middlewares.use("/api/save-data", (req, res) => {
          if (req.method !== "POST") {
            sendJson(res, 405, { error: "Method not allowed" });
            return;
          }
          let body = "";
          req.on("data", (chunk: Buffer) => { body += chunk.toString(); });
          req.on("end", () => {
            try {
              const data = JSON.parse(body) as Record<string, unknown>;
              for (const key of collections) {
                if (!Array.isArray(data[key])) {
                  sendJson(res, 400, { error: `missing or invalid: ${key}` });
                  return;
                }
              }
              for (const key of collections) {
                const filePath = path.join(dataDir, `${key}.json`);
                fs.writeFileSync(filePath, JSON.stringify(data[key], null, 2) + "\n", "utf-8");
              }
              sendJson(res, 200, { ok: true });
            } catch {
              sendJson(res, 400, { error: "Invalid JSON" });
            }
          });
        });
      },
    },
  ],
});
