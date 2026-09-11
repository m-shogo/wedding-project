import {
  externalMotionAtlas as externalMotionAtlasBase,
  type ExternalMotionAtlasItem,
} from "./externalMotionAtlas";
import { externalMotionAtlasAdditions } from "./externalMotionAtlasAdditions";
import { externalMotionAtlasAdditions2 } from "./externalMotionAtlasAdditions2";
import { externalMotionAtlasAdditions3 } from "./externalMotionAtlasAdditions3";
import { externalMotionAtlasAdditions4 } from "./externalMotionAtlasAdditions4";
import { externalMotionAtlasAdditions5 } from "./externalMotionAtlasAdditions5";
import { externalMotionAtlasAdditions6 } from "./externalMotionAtlasAdditions6";
import { externalMotionAtlasAdditions7 } from "./externalMotionAtlasAdditions7";
import { externalMotionAtlasAdditions8 } from "./externalMotionAtlasAdditions8";
import { externalMotionAtlasAdditions9 } from "./externalMotionAtlasAdditions9";

const combinedSources = [
  externalMotionAtlasBase,
  externalMotionAtlasAdditions,
  externalMotionAtlasAdditions2,
  externalMotionAtlasAdditions3,
  externalMotionAtlasAdditions4,
  externalMotionAtlasAdditions5,
  externalMotionAtlasAdditions6,
  externalMotionAtlasAdditions7,
  externalMotionAtlasAdditions8,
  externalMotionAtlasAdditions9,
];

const ids = new Set<string>();
const sourceKeys = new Set<string>();
const combined: ExternalMotionAtlasItem[] = [];

for (const source of combinedSources) {
  for (const item of source) {
    const normalizedUrl = item.sourceUrl.trim().replace(/\/$/, "");
    const sourceKey = `${normalizedUrl}::${item.titleOriginal.trim().toLowerCase()}`;
    if (ids.has(item.id) || sourceKeys.has(sourceKey)) continue;
    ids.add(item.id);
    sourceKeys.add(sourceKey);
    combined.push(item);
  }
}

export const externalMotionAtlas = combined;
