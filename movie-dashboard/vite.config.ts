import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "node:fs";
import path from "node:path";

const dataDir = path.resolve(__dirname, "src/data");

const collections = ["movies", "scenes", "assets", "prompts", "tasks"] as const;

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
  ],
});
