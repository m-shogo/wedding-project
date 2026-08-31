import {readFileSync} from "node:fs";

const card = readFileSync("movie-dashboard/src/components/SelectedSceneRenderProjectCard.tsx", "utf8");
const selectionStore = readFileSync("movie-dashboard/src/data/typographyProductionSelectionStore.ts", "utf8");
const roleStore = readFileSync("movie-dashboard/src/data/typographyProductionRoleContextStore.ts", "utf8");

function requireText(source, text, label) {
  if (!source.includes(text)) throw new Error(`${label}: missing ${text}`);
}

requireText(card, "TYPOGRAPHY_PRODUCTION_SELECTION_CHANGED_EVENT", "selection change listener");
requireText(card, "TYPOGRAPHY_PRODUCTION_ROLE_CONTEXT_CHANGED_EVENT", "role change listener");
requireText(card, "listTypographyProductionSelections()", "current selection snapshot");
requireText(card, "listTypographyProductionRoleContexts()", "current role snapshot");
requireText(card, "selection.sourceRevision === scene.sourceRevision", "selection revision currentness");
requireText(card, "selection.patternId === scene.patternId", "selection pattern currentness");
requireText(card, "role.productionRole === scene.productionRole", "role currentness");
requireText(card, "role.routeSelectedAt === selection.selectedAt", "role-to-selection binding");
requireText(card, "reelMatchesSelectedManifest", "reel-to-selected-manifest binding");
requireText(card, "manifest is stale against current Human-selected route / Role context", "stale manifest rejection");
requireText(card, "preview reel is stale against current selected Scene manifest / Human routing", "stale reel rejection");
requireText(card, "data-selected-scene-routing-stale", "stale dashboard surface");
requireText(card, "reelPlayer.current?.pause()", "stale playback stop");
requireText(selectionStore, "window.dispatchEvent(new CustomEvent(TYPOGRAPHY_PRODUCTION_SELECTION_CHANGED_EVENT", "selection store event authority");
requireText(roleStore, "window.dispatchEvent(new CustomEvent(TYPOGRAPHY_PRODUCTION_ROLE_CONTEXT_CHANGED_EVENT", "role store event authority");

for (const forbidden of [
  'remotionStudioGuiActual: "PASS"',
  'palmierGuiActual: "PASS"',
  'macDaVinciGuiActual: "PASS"',
  'productionReady: true',
]) {
  if (card.includes(forbidden)) throw new Error(`routing currentness must not promote evidence: ${forbidden}`);
}

console.log("selected Scene Human routing currentness contracts: OK");
