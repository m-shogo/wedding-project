import {useEffect, useMemo, useState} from "react";
import {
  loadTypographyProductionSelection,
  TYPOGRAPHY_PRODUCTION_SELECTION_CHANGED_EVENT,
} from "../data/typographyProductionSelectionStore";
import type {MaskRevealSceneInstance} from "../data/visualSceneComposer";
import {TypographyDaVinciProductionReleaseGate} from "./TypographyDaVinciProductionReleaseGate";

export function TypographyDaVinciProductionReleaseGateForScene({scene}: {scene: MaskRevealSceneInstance}) {
  const [revision, setRevision] = useState(0);
  const selection = useMemo(
    () => loadTypographyProductionSelection(scene),
    [scene.sceneId, scene.updatedAt, revision],
  );

  useEffect(() => {
    const refresh = () => setRevision((value) => value + 1);
    window.addEventListener(TYPOGRAPHY_PRODUCTION_SELECTION_CHANGED_EVENT, refresh);
    return () => window.removeEventListener(TYPOGRAPHY_PRODUCTION_SELECTION_CHANGED_EVENT, refresh);
  }, []);

  if (!selection) {
    return (
      <p className="mt-3 border border-rose-200 dark:border-rose-800 p-2 text-[8px] leading-3 text-rose-700 dark:text-rose-300">
        Production Release Gateは未選択です。現在のScene revisionに対してTypography routeをHuman-selectすると有効になります。
      </p>
    );
  }

  return <TypographyDaVinciProductionReleaseGate scene={scene} selection={selection} />;
}
