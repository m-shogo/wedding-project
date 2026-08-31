import {readFileSync} from "node:fs";

const card = readFileSync(new URL("../src/components/WeddingProjectRealMediaVisualReviewCard.tsx", import.meta.url), "utf8");
const intake = readFileSync(new URL("../src/components/WeddingMediaIntakeChecklistCard.tsx", import.meta.url), "utf8");

const required = [
  "wedding-movie-real-media-preview-qa-stills/v1",
  "wedding-movie-real-media-preview-human-visual-review/v1",
  "HUMAN_REVIEW_ONLY",
  "CROP_SUBJECT_SAFE",
  "TITLE_READABLE",
  "TEXT_MEDIA_CONTRAST",
  "NO_UNINTENDED_EDGE_CLIP",
  "VISUAL_TEMPO_FEELS_INTENTIONAL",
  "TRANSITION_VISUALLY_CLEAN",
  "NO_FLASH_OR_UNINTENDED_BLACK_FRAME",
  "SUBJECT_CONTINUITY_ACCEPTABLE",
  "crypto.subtle.digest",
  "SHA_MISMATCH",
  "data-live-currentness",
  "computedOverall === \"NOT_RUN\"",
  "remotionStudioGuiActual: \"NOT_RUN\"",
  "palmierGuiActual: \"NOT_RUN\"",
  "macDaVinciGuiActual: \"NOT_RUN\"",
  "productionReady: false",
  "human-visual-correction-queue.json",
];
for (const token of required) if (!card.includes(token)) throw new Error(`real-media Human visual review contract missing: ${token}`);
if (!card.includes("disabled={!editable}")) throw new Error("Human verdict controls must fail closed unless manifest/files/live authority are CURRENT");
if (!intake.includes("<WeddingProjectRealMediaVisualReviewCard projectId={projectId} />")) throw new Error("Human visual review surface is not mounted in Wedding media intake");
console.log("Wedding Project real-media Human visual review dashboard contracts: PASS");
