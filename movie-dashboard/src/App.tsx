import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProductionProvider } from "./store/productionStore";
import { ToastProvider } from "./store/toastStore";
import { ThemeProvider } from "./store/themeStore";
import { Layout } from "./components/Layout";
import { Dashboard } from "./pages/Dashboard";
import { Storyboard } from "./pages/Storyboard";
import { AssetLibrary } from "./pages/AssetLibrary";
import { PromptBank } from "./pages/PromptBank";
import { VideoPromptBuilder } from "./pages/VideoPromptBuilder";
import { VideoGenerationQueue } from "./pages/VideoGenerationQueue";
import { VideoResultReview } from "./pages/VideoResultReview";
import { VideoFailureLab } from "./pages/VideoFailureLab";
import { PalmierHandoff } from "./pages/PalmierHandoff";
import { MissingList } from "./pages/MissingList";
import { CapCutPack } from "./pages/CapCutPack";
import { ProductionMap } from "./pages/ProductionMap";
import { QualityGate } from "./pages/QualityGate";
import { DataManager } from "./pages/DataManager";
import { SceneDetail } from "./pages/SceneDetail";
import { ProfilePlanner } from "./pages/ProfilePlanner";
import { Guide } from "./pages/Guide";
import { AssetPlacementGuide } from "./pages/AssetPlacementGuide";

export default function App() {
  return (
    <ThemeProvider>
    <ProductionProvider>
      <ToastProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="storyboard" element={<Storyboard />} />
              <Route path="assets" element={<AssetLibrary />} />
              <Route path="prompts" element={<PromptBank />} />
              <Route path="video-prompt-builder" element={<VideoPromptBuilder />} />
              <Route path="video-generation-queue" element={<VideoGenerationQueue />} />
              <Route path="video-result-review" element={<VideoResultReview />} />
              <Route path="video-failure-lab" element={<VideoFailureLab />} />
              <Route path="palmier-handoff" element={<PalmierHandoff />} />
              <Route path="missing" element={<MissingList />} />
              <Route path="capcut" element={<CapCutPack />} />
              <Route path="production-map" element={<ProductionMap />} />
              <Route path="quality" element={<QualityGate />} />
              <Route path="profile-planner" element={<ProfilePlanner />} />
              <Route path="data" element={<DataManager />} />
              <Route path="scene/:sceneId" element={<SceneDetail />} />
              <Route path="asset-placement-guide" element={<AssetPlacementGuide />} />
              <Route path="guide" element={<Guide />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </ProductionProvider>
    </ThemeProvider>
  );
}
