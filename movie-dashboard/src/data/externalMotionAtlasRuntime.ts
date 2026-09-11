import {
  externalMotionAtlas as externalMotionAtlasBase,
  type ExternalMotionAtlasItem,
} from "./externalMotionAtlas";
import { externalMotionAtlasAdditions } from "./externalMotionAtlasAdditions";
import { externalMotionAtlasAdditions2 } from "./externalMotionAtlasAdditions2";
import { externalMotionAtlasAdditions3 } from "./externalMotionAtlasAdditions3";
import { externalMotionAtlasAdditions4 } from "./externalMotionAtlasAdditions4";

const combinedSources = [
  externalMotionAtlasBase,
  externalMotionAtlasAdditions,
  externalMotionAtlasAdditions2,
  externalMotionAtlasAdditions3,
  externalMotionAtlasAdditions4,
];

const ids = new Set<string>();
const urls = new Set<string>();
const combined: ExternalMotionAtlasItem[] = [];

for (const source of combinedSources) {
  for (const item of source) {
    const normalizedUrl = item.sourceUrl.trim().replace(/\/$/, "");
    if (ids.has(item.id) || urls.has(normalizedUrl)) continue;
    ids.add(item.id);
    urls.add(normalizedUrl);
    combined.push(item);
  }
}

export const externalMotionAtlas = combined;
