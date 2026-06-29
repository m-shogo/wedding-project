import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProductionProvider } from "./store/productionStore";
import { Layout } from "./components/Layout";
import { Dashboard } from "./pages/Dashboard";
import { Storyboard } from "./pages/Storyboard";
import { AssetLibrary } from "./pages/AssetLibrary";
import { PromptBank } from "./pages/PromptBank";
import { MissingList } from "./pages/MissingList";
import { CapCutPack } from "./pages/CapCutPack";
import { ProductionMap } from "./pages/ProductionMap";
import { DataManager } from "./pages/DataManager";
import { Guide } from "./pages/Guide";

export default function App() {
  return (
    <ProductionProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="storyboard" element={<Storyboard />} />
            <Route path="assets" element={<AssetLibrary />} />
            <Route path="prompts" element={<PromptBank />} />
            <Route path="missing" element={<MissingList />} />
            <Route path="capcut" element={<CapCutPack />} />
            <Route path="production-map" element={<ProductionMap />} />
            <Route path="data" element={<DataManager />} />
            <Route path="guide" element={<Guide />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ProductionProvider>
  );
}
