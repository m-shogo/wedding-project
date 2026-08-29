import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const root = path.resolve(process.cwd());
const helper = fs.readFileSync(path.join(root, "src/data/weddingProductionInputCommandBuilder.ts"), "utf8");
const component = fs.readFileSync(path.join(root, "src/components/WeddingProductionInputPlanBuilder.tsx"), "utf8");
const page = fs.readFileSync(path.join(root, "src/pages/MotionZukanWorkspaceHandoff.tsx"), "utf8");
const cli = fs.readFileSync(path.join(root, "../motion-studio/scripts/wedding-production-input-plan.mts"), "utf8");

function requireContract(condition, message) {
  if (!condition) throw new Error(`Wedding Production Input Plan Builder contract failed: ${message}`);
}

requireContract(helper.includes('state: "READY" | "INPUT_REQUIRED"'), "builder must fail closed before a real path is supplied");
requireContract(helper.includes('value.startsWith("/")'), "dashboard preview must require a macOS absolute path");
requireContract(helper.includes("isPlaceholder"), "dashboard preview must reject placeholder paths");
requireContract(helper.includes("shellQuote"), "generated terminal arguments must be shell quoted");
requireContract(helper.includes("scripts/wedding-production-input-plan.mts"), "dashboard must delegate final planning to canonical Motion Studio CLI");
requireContract(!helper.includes("intake-production-media.mts"), "dashboard must not duplicate canonical media intake sequencing");
requireContract(!helper.includes("intake-production-bgm.mts"), "dashboard must not duplicate canonical BGM intake sequencing");

requireContract(component.includes("Motion Zukanはファイルをcopy・実行しません"), "UI must state that it never executes file operations");
requireContract(component.includes("CLIが最終validationとintake順序のauthority"), "UI must identify CLI as final authority");
requireContract(component.includes("Plan execution: <strong>NOT_RUN</strong>"), "plan execution evidence must remain NOT_RUN");
requireContract(component.includes("Remotion Studio GUI Actual: <strong>NOT_RUN</strong>"), "Studio GUI Actual must remain NOT_RUN");
requireContract(component.includes("Mac DaVinci GUI Actual: <strong>NOT_RUN</strong>"), "Mac DaVinci GUI Actual must remain NOT_RUN");
requireContract(page.includes("<WeddingProductionInputPlanBuilder />"), "Motion Zukan workspace route must expose the builder");

requireContract(cli.includes("ABSOLUTE_REAL_PATH_REQUIRED"), "canonical CLI must retain real-path guardrail");
requireContract(cli.includes("PLACEHOLDER_PATH_REJECTED"), "canonical CLI must retain placeholder guardrail");
requireContract(cli.includes("executionState: 'NOT_RUN'"), "canonical CLI must preserve NOT_RUN evidence boundary");

console.log("Wedding Production Input Plan Builder contracts: PASS");
