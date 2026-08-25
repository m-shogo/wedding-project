import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProductionProvider } from "./store/productionStore";
import { ToastProvider } from "./store/toastStore";
import { ThemeProvider } from "./store/themeStore";
import { Layout } from "./components/Layout";
import { Dashboard } from "./pages/Dashboard";
import { Storyboard } from "./pages/Storyboard";
import { AssetLibrary } from "./pages/AssetLibrary";
import { ClipLibrary } from "./pages/ClipLibrary";
import { PromptBank } from "./pages/PromptBank";
import { VideoShotPlanner } from "./pages/VideoShotPlanner";
import { VideoPromptBuilder } from "./pages/VideoPromptBuilder";
import { VideoGenerationQueue } from "./pages/VideoGenerationQueue";
import { VideoPreflight } from "./pages/VideoPreflight";
import { VideoResultReview } from "./pages/VideoResultReview";
import { VideoAssetReprobe } from "./pages/VideoAssetReprobe";
import { VideoFailureLab } from "./pages/VideoFailureLab";
import { VideoModelEvidence } from "./pages/VideoModelEvidence";
import { PalmierHandoff } from "./pages/PalmierHandoff";
import { MissingList } from "./pages/MissingList";
import { CapCutPack } from "./pages/CapCutPack";
import { ProductionMap } from "./pages/ProductionMap";
import { QualityGate } from "./pages/QualityGate";
import { DataManager } from "./pages/DataManager";
import { SceneDetail } from "./pages/SceneDetail";
import { ProfilePlanner } from "./pages/ProfilePlanner";
import { OpeningPhotoIntake } from "./pages/OpeningPhotoIntake";
import { OpeningBgmIntake } from "./pages/OpeningBgmIntake";
import { MovieCoach } from "./pages/MovieCoach";
import { MovieCoachDictionary } from "./pages/MovieCoachDictionary";
import { ProfileMovieCoach } from "./pages/ProfileMovieCoach";
import { MovieCoachReview } from "./pages/MovieCoachReview";
import { FusionNodeTranslator } from "./pages/FusionNodeTranslator";
import { ColorLearning } from "./pages/ColorLearning";
import { AudioLearning } from "./pages/AudioLearning";
import { TimelineAnatomy } from "./pages/TimelineAnatomy";
import { ShortcutTraining } from "./pages/ShortcutTraining";
import { ComparisonLab } from "./pages/ComparisonLab";
import { BookManifestManager } from "./pages/BookManifestManager";
import { ReferenceBreakdown } from "./pages/ReferenceBreakdown";
import { AutomationReadiness } from "./pages/AutomationReadiness";
import { StartRhythmLab } from "./pages/StartRhythmLab";
import { StartMotionKitCatalog } from "./pages/StartMotionKitCatalog";
import { StartMotionShowcase } from "./pages/StartMotionShowcase";
import { DirectorRecipeCatalog } from "./pages/DirectorRecipeCatalog";
import { StartSelectionMode } from "./pages/StartSelectionMode";
import { StartProductionWorkspace } from "./pages/StartProductionWorkspace";
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
              <Route path="movie-coach" element={<MovieCoach />} />
              <Route path="movie-coach/dictionary" element={<MovieCoachDictionary />} />
              <Route path="movie-coach/profile" element={<ProfileMovieCoach />} />
              <Route path="movie-coach/auto" element={<AutomationReadiness />} />
              <Route path="movie-coach/review" element={<MovieCoachReview />} />
              <Route path="movie-coach/fusion" element={<FusionNodeTranslator />} />
              <Route path="movie-coach/color" element={<ColorLearning />} />
              <Route path="movie-coach/audio" element={<AudioLearning />} />
              <Route path="movie-coach/timeline" element={<TimelineAnatomy />} />
              <Route path="movie-coach/shortcuts" element={<ShortcutTraining />} />
              <Route path="movie-coach/compare" element={<ComparisonLab />} />
              <Route path="movie-coach/book" element={<BookManifestManager />} />
              <Route path="movie-coach/reference" element={<ReferenceBreakdown />} />
              <Route path="movie-coach/start-rhythm" element={<StartRhythmLab />} />
              <Route path="movie-coach/start-motion-kit" element={<StartMotionKitCatalog />} />
              <Route path="movie-coach/start-showcase" element={<StartMotionShowcase />} />
              <Route path="movie-coach/director-recipes" element={<DirectorRecipeCatalog />} />
              <Route path="movie-coach/start-selection" element={<StartSelectionMode />} />
              <Route path="movie-coach/start-production" element={<StartProductionWorkspace />} />
              <Route path="opening-photo-intake" element={<OpeningPhotoIntake />} />
              <Route path="opening-bgm-intake" element={<OpeningBgmIntake />} />
              <Route path="storyboard" element={<Storyboard />} />
              <Route path="assets" element={<AssetLibrary />} />
              <Route path="clips" element={<ClipLibrary />} />
              <Route path="prompts" element={<PromptBank />} />
              <Route path="video-shot-planner" element={<VideoShotPlanner />} />
              <Route path="video-prompt-builder" element={<VideoPromptBuilder />} />
              <Route path="video-generation-queue" element={<VideoGenerationQueue />} />
              <Route path="video-preflight" element={<VideoPreflight />} />
              <Route path="video-result-review" element={<VideoResultReview />} />
              <Route path="video-asset-reprobe" element={<VideoAssetReprobe />} />
              <Route path="video-failure-lab" element={<VideoFailureLab />} />
              <Route path="video-model-evidence" element={<VideoModelEvidence />} />
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
