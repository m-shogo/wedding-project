import { Header } from "../components/Header";
import { MotionZukanWorkspaceHandoffPanel } from "../components/MotionZukanWorkspaceHandoffPanel";
import { WeddingProductionNextGatePanel } from "../components/WeddingProductionNextGatePanel";

export function MotionZukanWorkspaceHandoff() {
  return (
    <div>
      <Header
        title="Motion Zukan Workspace Handoff"
        description="Opening / ProfileのHuman Master作業状態をJSONで退避・復元し、Motion Studio正本から次のProduction工程も確認する。Production承認やGUI Actualとは分離する。"
      />
      <WeddingProductionNextGatePanel />
      <MotionZukanWorkspaceHandoffPanel />
    </div>
  );
}
