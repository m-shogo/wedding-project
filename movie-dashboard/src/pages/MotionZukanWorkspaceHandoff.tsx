import { Header } from "../components/Header";
import { MotionZukanWorkspaceHandoffPanel } from "../components/MotionZukanWorkspaceHandoffPanel";
import { WeddingProductionNextGatePanel } from "../components/WeddingProductionNextGatePanel";
import { WeddingProductionInputPlanBuilder } from "../components/WeddingProductionInputPlanBuilder";
import { WeddingRealMediaPreviewReviewPanel } from "../components/WeddingRealMediaPreviewReviewPanel";
import { WeddingProductionReviewMatrixPanel } from "../components/WeddingProductionReviewMatrixPanel";
import { WeddingProductionActionLauncherPanel } from "../components/WeddingProductionActionLauncherPanel";
import { WeddingProductionMotionUsagePanel } from "../components/WeddingProductionMotionUsagePanel";
import { OpeningProductionReviewReadinessPanel } from "../components/OpeningProductionReviewReadinessPanel";
import { OpeningReviewNextActionPanel } from "../components/OpeningReviewNextActionPanel";
import { ProfileAssemblyReviewReadinessPanel } from "../components/ProfileAssemblyReviewReadinessPanel";
import { ProfileReviewNextActionPanel } from "../components/ProfileReviewNextActionPanel";

export function MotionZukanWorkspaceHandoff() {
  return (
    <div>
      <Header
        title="Motion Zukan Workspace Handoff"
        description="Opening / ProfileのHuman Master作業状態をJSONで退避・復元し、Motion Studio正本から次のProduction工程も確認する。実素材パスからcanonical intake planを作り、素材投入後はreal-media preview → Human QA → canonical action copyまで同じ画面で進める。図鑑のROUGH/FINAL実使用Motionもproduction workspaceへ接続するが、project assignmentやGUI Actualは推測しない。"
      />
      <WeddingProductionNextGatePanel />
      <WeddingProductionInputPlanBuilder />
      <WeddingRealMediaPreviewReviewPanel />
      <WeddingProductionReviewMatrixPanel />
      <WeddingProductionActionLauncherPanel />
      <WeddingProductionMotionUsagePanel />
      <OpeningProductionReviewReadinessPanel />
      <OpeningReviewNextActionPanel />
      <ProfileAssemblyReviewReadinessPanel />
      <ProfileReviewNextActionPanel />
      <MotionZukanWorkspaceHandoffPanel />
    </div>
  );
}