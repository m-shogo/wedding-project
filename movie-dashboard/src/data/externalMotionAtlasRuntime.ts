import { externalMotionAtlas } from "./externalMotionAtlas";
import { externalMotionAtlasAdditions } from "./externalMotionAtlasAdditions";

const existingIds = new Set(externalMotionAtlas.map((item) => item.id));
for (const item of externalMotionAtlasAdditions) {
  if (!existingIds.has(item.id)) {
    externalMotionAtlas.push(item);
    existingIds.add(item.id);
  }
}
