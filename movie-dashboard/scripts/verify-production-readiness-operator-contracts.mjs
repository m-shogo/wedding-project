import {readFileSync} from "node:fs";

const operator = readFileSync(new URL("../src/components/WeddingMovieProductionReadinessOperatorCard.tsx", import.meta.url), "utf8");
const intake = readFileSync(new URL("../src/components/WeddingMediaIntakeChecklistCard.tsx", import.meta.url), "utf8");

const required = [
  "wedding-movie-production-readiness-audit/v1",
  "data-production-readiness-operator",
  "data-currentness={currentness.state}",
  "READY_FOR_REAL_MEDIA_PREVIEW",
  "WAITING_HUMAN_INPUT",
  "BLOCKED_BY_STALE_AUTHORITY",
  "REVISION:${scene.sceneId}",
  "PATTERN:${scene.sceneId}",
  "ROLE:${scene.sceneId}",
  "TRANSITION_AUTHORITY_STALE",
  "readyForContinuousRealMediaPreview",
  "remotionStudioGuiActual === \"NOT_RUN\"",
  "palmierGuiActual === \"NOT_RUN\"",
  "macDaVinciGuiActual === \"NOT_RUN\"",
  "productionReady === false",
  "Human/GUI evidenceは自動昇格しません",
];
for (const token of required) {
  if (!operator.includes(token)) throw new Error(`production readiness operator contract missing: ${token}`);
}
if (!intake.includes("<WeddingMovieProductionReadinessOperatorCard projectId={projectId} />")) {
  throw new Error("production readiness operator is not mounted in the real-media intake surface");
}
if (!operator.includes("disabled={!continuousPreviewAllowed}")) {
  throw new Error("continuous real preview command must fail closed when audit transport is stale");
}
console.log("Wedding Movie production readiness operator contracts: PASS");
