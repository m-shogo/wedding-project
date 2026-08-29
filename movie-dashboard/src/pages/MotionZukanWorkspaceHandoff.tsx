import { Header } from "../components/Header";
import { MotionZukanWorkspaceHandoffPanel } from "../components/MotionZukanWorkspaceHandoffPanel";

export function MotionZukanWorkspaceHandoff() {
  return (
    <div>
      <Header
        title="Motion Zukan Workspace Handoff"
        description="Opening / ProfileのHuman Master作業状態をJSONで退避・復元する。Production承認やGUI Actualとは分離する。"
      />
      <MotionZukanWorkspaceHandoffPanel />
    </div>
  );
}
