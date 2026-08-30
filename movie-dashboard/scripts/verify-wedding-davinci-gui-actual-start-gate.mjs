import {readFileSync} from "node:fs";
import {dirname, join} from "node:path";
import {fileURLToPath} from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const data = readFileSync(join(root, "src/data/weddingDavinciGuiActualStartGateAudit.ts"), "utf8");
const card = readFileSync(join(root, "src/components/WeddingDavinciGuiActualStartGateCard.tsx"), "utf8");
const page = readFileSync(join(root, "src/pages/VisualMotionLibrary.tsx"), "utf8");

const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

for (const token of [
  "wedding-davinci-gui-actual-start-gate-audit-dashboard/v3",
  "wedding-davinci-gui-actual-start-gate/v1",
  "DERIVED_MAC_DAVINCI_GUI_ACTUAL_START_GATE",
  "TRANSPORT_NOT_CURRENT",
  "PROJECT_MOTION_BLOCKED",
  "UPSTREAM_BLOCKED",
  "EVIDENCE_INIT_REQUIRED",
  "GUI_ACTUAL_ALLOWED",
  "GUI_ACTUAL_COMPLETE",
  "EVIDENCE_BLOCKED",
  "STALE",
  "projectMotionPreflight",
  "buildWeddingDavinciActualSessionPlan",
  "liveProjectMotionMatch",
  "GUI_START_GATE_PROJECT_MOTION_PREFLIGHT_MISSING",
  "GUI_START_GATE_PROJECT_MOTION_INVALID_NOT_BLOCKED",
  "GUI_START_GATE_PROJECT_MOTION_BLOCK_WITHOUT_INVALID_STATE",
  "GUI_START_GATE_PROJECT_MOTION_RECOVERY_ACTION_INVALID",
  "GUI_START_GATE_PROJECT_MOTION_RECOVERY_COMMAND_MISMATCH",
  "GUI_START_GATE_PROJECT_MOTION_STATE_STALE",
  "GUI_START_GATE_PROJECT_MOTION_APPLICABILITY_STALE",
  "GUI_START_GATE_PROJECT_MOTION_CURRENTNESS_STALE",
  "GUI_START_GATE_PROJECT_MOTION_COMMAND_STALE",
  "GUI_START_GATE_PROJECT_MOTION_ERROR_STALE",
  "REGENERATE_CANONICAL_START_GATE",
  "GUI_START_GATE_ALLOWED_FLAG_STATE_MISMATCH",
  "GUI_START_GATE_HUMAN_ACTION_MUST_NOT_HAVE_COMMAND",
  "NOT_PROMOTED_BY_DASHBOARD_GATE_AUDIT",
  "--strict-gui-start",
]) {
  assert(data.includes(token), `GUI start-gate audit missing token: ${token}`);
}

assert(data.includes('const liveProjectMotion = buildWeddingDavinciActualSessionPlan().projects[movieId].projectMotionPreflight'), "Dashboard audit must resolve current Project Motion preflight");
assert(data.includes('projectMotion.state !== liveProjectMotion.state'), "Dashboard audit must compare Project Motion state");
assert(data.includes('Boolean(projectMotion.applicable) !== liveProjectMotion.applicable'), "Dashboard audit must compare Project Motion applicability");
assert(data.includes('Boolean(projectMotion.current) !== liveProjectMotion.current'), "Dashboard audit must compare Project Motion currentness");
assert(data.includes('(projectMotion.command ?? null) !== liveProjectMotion.command'), "Dashboard audit must compare canonical Project Motion command");
assert(data.includes('(projectMotion.error ?? null) !== liveProjectMotion.error'), "Dashboard audit must compare Project Motion error");
assert(data.includes('liveMismatchCodes.length > 0'), "live Project Motion mismatch must produce a fail-closed state");
assert(data.includes('claimedAllowed !== (gate.state === "GUI_ACTUAL_ALLOWED")'), "GUI allowed flag must be tied exactly to canonical state");
assert(data.includes('projectMotion.state === "INVALID" && gate.state !== "PROJECT_MOTION_BLOCKED"'), "INVALID Project Motion must fail close in Dashboard audit");
assert(data.includes('gate.state === "PROJECT_MOTION_BLOCKED" && gate.nextAction?.command !== projectMotion.command'), "Project Motion recovery command must stay canonical");
assert(data.includes('gate.nextAction?.humanOnly !== true'), "GUI allowed state must require humanOnly action");
assert(data.includes('gate.nextAction?.command != null'), "GUI allowed state must reject automation command");
assert(data.includes('productionReady: false'), "Dashboard start-gate audit must stay productionReady=false");
assert(!data.includes('productionReady: true'), "Dashboard start-gate audit must never synthesize productionReady=true");
assert(!data.includes('macDavinciResolveGuiActual: "PASS"'), "Dashboard start-gate audit must never synthesize DaVinci PASS");

for (const token of [
  "WEDDING_DAVINCI_GUI_ACTUAL_START_GATE_ANCHOR",
  "davinci-gui-actual-start-gate",
  "scroll-mt-6",
  "MAC DAVINCI GUI ACTUAL START GATE",
  "Session Plan CURRENT → Project Motion CURRENT → Evidence init → Human Mac GUI",
  "canonical gate JSONを読み込む",
  "Project Motion canonical verifier",
  "Project Motion blocker:",
  "このcommand表示自体はProject Motion CURRENTを証明しません",
  "audit.project.projectMotionPreflight",
  "GUI_ACTUAL_ALLOWEDは「人間が開始してよい」だけで、実行済み/PASSではありません",
  "HUMAN / MAC GUI",
  "GUI Actual synthetic promotion: FORBIDDEN",
  "今回GUIを実操作していない場合、Actual evidenceはNOT_RUNのままです",
]) {
  assert(card.includes(token), `Motion Zukan GUI start-gate card missing token: ${token}`);
}

assert(card.includes("projectMotion.state"), "UI must expose Project Motion state");
assert(card.includes("projectMotion.applicable"), "UI must expose Project Motion applicability");
assert(card.includes("projectMotion.current"), "UI must expose Project Motion currentness");
assert(card.includes("projectMotion.command"), "UI must expose canonical Project Motion verifier command");
assert(card.includes("projectMotion.error"), "UI must expose Project Motion blocker error");
assert(card.includes("audit.inspectCommand"), "UI must expose canonical inspect command");
assert(card.includes("audit.strictGuiStartCommand"), "UI must expose strict GUI-start command");
assert(card.includes("audit.nextAction.command"), "UI must expose canonical non-human next command when present");
assert(page.includes("WeddingDavinciGuiActualStartGateCard"), "Motion Zukan page must render GUI start-gate card");

console.log("Wedding DaVinci GUI Actual start-gate Dashboard contract: PASS");
console.log("Canonical gate JSON -> Motion Zukan: WIRED");
console.log("Loaded gate Project Motion -> live Dashboard Project Motion: REVALIDATED");
console.log("Stale Project Motion gate export -> GUI START DISPLAY BLOCKED: ENFORCED");
console.log("Project Motion status/error/verifier -> Motion Zukan: VISIBLE");
console.log("Project Motion INVALID -> GUI START BLOCKED: ENFORCED");
console.log("GUI_ACTUAL_ALLOWED != GUI_ACTUAL_EXECUTED: ENFORCED");
console.log("Mac/Studio GUI Actual synthetic promotion: FORBIDDEN");
