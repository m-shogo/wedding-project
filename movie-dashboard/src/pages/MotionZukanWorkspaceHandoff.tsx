import { Header } from "../components/Header";
import { MotionZukanWorkspaceHandoffPanel } from "../components/MotionZukanWorkspaceHandoffPanel";
import { WeddingProductionNextGatePanel } from "../components/WeddingProductionNextGatePanel";
import { WeddingProductionInputPlanBuilder } from "../components/WeddingProductionInputPlanBuilder";

export function MotionZukanWorkspaceHandoff() {
  return (
    <div>
      <Header
        title="Motion Zukan Workspace Handoff"
        description="Opening / ProfileのHuman Master作業状態をJSONで退避・復元し、Motion Studio正本から次のProduction工程も確認する。実素材パスからcanonical intake planを作れるが、Production承認やGUI Actualとは分離する。"
      />
      <WeddingProductionNextGatePanel />
      <WeddingProductionInputPlanBuilder />
      <MotionZukanWorkspaceHandoffPanel />
    </div>
  );
}
