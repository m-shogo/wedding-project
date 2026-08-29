import { Header } from "../components/Header";
import { MotionZukanWorkspaceHandoffPanel } from "../components/MotionZukanWorkspaceHandoffPanel";
import { WeddingProductionNextGatePanel } from "../components/WeddingProductionNextGatePanel";
import { WeddingProductionInputPlanBuilder } from "../components/WeddingProductionInputPlanBuilder";
import { WeddingRealMediaPreviewReviewPanel } from "../components/WeddingRealMediaPreviewReviewPanel";
import { ProfileAssemblyReviewReadinessPanel } from "../components/ProfileAssemblyReviewReadinessPanel";

export function MotionZukanWorkspaceHandoff() {
  return (
    <div>
      <Header
        title="Motion Zukan Workspace Handoff"
        description="Opening / ProfileのHuman Master作業状態をJSONで退避・復元し、Motion Studio正本から次のProduction工程も確認する。実素材パスからcanonical intake planを作り、素材投入後はreal-media preview → Human QAまで同じ画面で開始できる。Production承認やGUI Actualとは分離する。"
      />
      <WeddingProductionNextGatePanel />
      <WeddingProductionInputPlanBuilder />
      <WeddingRealMediaPreviewReviewPanel />
      <ProfileAssemblyReviewReadinessPanel />
      <MotionZukanWorkspaceHandoffPanel />
    </div>
  );
}
