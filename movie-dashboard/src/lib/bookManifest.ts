import type {
  BookChapterManifest,
  BookManifest,
  LearningSkill,
  ProductionOutcome,
} from "../types/learning";

export const bookSourceOptions: Array<{ value: BookManifest["sourceType"]; label: string }> = [
  { value: "owned_book", label: "購入済み書籍" },
  { value: "official_training", label: "Blackmagic公式Training" },
  { value: "other", label: "その他" },
];

export interface BookCoverage {
  mappedSkillIds: string[];
  requiredSkillIds: string[];
  missingSkillIds: string[];
  totalRequired: number;
  mappedRequired: number;
  percent: number;
  opening: { mapped: number; total: number; percent: number };
  profile: { mapped: number; total: number; percent: number };
}

export interface BookManifestValidation {
  valid: boolean;
  errors: string[];
  manifest: BookManifest | null;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function normalizePage(value: unknown, field: string, errors: string[]): number | null {
  if (value === null || value === "" || value === undefined) return null;
  if (typeof value !== "number" || !Number.isInteger(value) || value < 1) {
    errors.push(`${field} は1以上の整数またはnullにしてください`);
    return null;
  }
  return value;
}

export function validateBookManifest(
  input: unknown,
  validSkillIds: Set<string>,
): BookManifestValidation {
  const errors: string[] = [];
  if (!isRecord(input)) {
    return { valid: false, errors: ["ManifestはJSON objectである必要があります"], manifest: null };
  }

  const title = typeof input.title === "string" ? input.title : "";
  const edition = typeof input.edition === "string" ? input.edition : "";
  const davinciVersion = typeof input.davinciVersion === "string" ? input.davinciVersion : "";
  const allowedSources = new Set<BookManifest["sourceType"]>(["owned_book", "official_training", "other"]);
  const sourceType = allowedSources.has(input.sourceType as BookManifest["sourceType"])
    ? (input.sourceType as BookManifest["sourceType"])
    : "owned_book";
  if (!allowedSources.has(input.sourceType as BookManifest["sourceType"])) {
    errors.push("sourceType は owned_book / official_training / other のいずれかです");
  }

  if (!Array.isArray(input.chapters)) {
    errors.push("chapters は配列である必要があります");
    return { valid: false, errors, manifest: null };
  }

  const chapters: BookChapterManifest[] = [];
  const chapterIds = new Set<string>();

  input.chapters.forEach((rawChapter, index) => {
    const prefix = `chapters[${index}]`;
    if (!isRecord(rawChapter)) {
      errors.push(`${prefix} はobjectである必要があります`);
      return;
    }

    const chapterId = typeof rawChapter.chapterId === "string" && rawChapter.chapterId.trim()
      ? rawChapter.chapterId.trim()
      : `book-import-${index + 1}`;
    if (chapterIds.has(chapterId)) errors.push(`${prefix}.chapterId が重複しています: ${chapterId}`);
    chapterIds.add(chapterId);

    const chapterTitle = typeof rawChapter.title === "string" ? rawChapter.title.trim() : "";
    if (!chapterTitle) errors.push(`${prefix}.title が必要です`);

    const pageStart = normalizePage(rawChapter.pageStart, `${prefix}.pageStart`, errors);
    const pageEnd = normalizePage(rawChapter.pageEnd, `${prefix}.pageEnd`, errors);
    if (pageStart !== null && pageEnd !== null && pageEnd < pageStart) {
      errors.push(`${prefix}: pageEnd は pageStart 以上にしてください`);
    }

    const skillIds = Array.isArray(rawChapter.skillIds)
      ? [...new Set(rawChapter.skillIds.filter((item): item is string => typeof item === "string" && item.trim().length > 0).map((item) => item.trim()))]
      : [];
    if (skillIds.length === 0) errors.push(`${prefix}.skillIds に1つ以上のSkillが必要です`);
    for (const skillId of skillIds) {
      if (!validSkillIds.has(skillId)) errors.push(`${prefix}: 未登録Skill ${skillId}`);
    }

    chapters.push({ chapterId, title: chapterTitle, pageStart, pageEnd, skillIds });
  });

  return {
    valid: errors.length === 0,
    errors,
    manifest: errors.length === 0
      ? { title, edition, davinciVersion, sourceType, chapters }
      : null,
  };
}

function uniqueOutcomeSkills(outcomes: ProductionOutcome[]) {
  return [...new Set(outcomes.flatMap((outcome) => [...outcome.conceptSkillIds, ...outcome.davinciSkillIds]))];
}

function ratio(mapped: Set<string>, required: string[]) {
  const mappedCount = required.filter((skillId) => mapped.has(skillId)).length;
  return {
    mapped: mappedCount,
    total: required.length,
    percent: required.length > 0 ? Math.round((mappedCount / required.length) * 100) : 0,
  };
}

export function getBookCoverage(
  book: BookManifest,
  skills: LearningSkill[],
  outcomes: ProductionOutcome[],
): BookCoverage {
  const validSkills = new Set(skills.map((skill) => skill.skillId));
  const mapped = new Set(
    book.chapters.flatMap((chapter) => chapter.skillIds).filter((skillId) => validSkills.has(skillId)),
  );
  const required = uniqueOutcomeSkills(outcomes).filter((skillId) => validSkills.has(skillId));
  const openingRequired = uniqueOutcomeSkills(outcomes.filter((outcome) => outcome.movieId === "opening"));
  const profileRequired = uniqueOutcomeSkills(outcomes.filter((outcome) => outcome.movieId === "profile"));
  const mappedRequired = required.filter((skillId) => mapped.has(skillId)).length;

  return {
    mappedSkillIds: [...mapped],
    requiredSkillIds: required,
    missingSkillIds: required.filter((skillId) => !mapped.has(skillId)),
    totalRequired: required.length,
    mappedRequired,
    percent: required.length > 0 ? Math.round((mappedRequired / required.length) * 100) : 0,
    opening: ratio(mapped, openingRequired),
    profile: ratio(mapped, profileRequired),
  };
}

export function formatChapterPages(chapter: BookChapterManifest) {
  if (chapter.pageStart === null && chapter.pageEnd === null) return "ページ未登録";
  if (chapter.pageStart !== null && chapter.pageEnd === null) return `P.${chapter.pageStart}`;
  if (chapter.pageStart === null && chapter.pageEnd !== null) return `〜 P.${chapter.pageEnd}`;
  if (chapter.pageStart === chapter.pageEnd) return `P.${chapter.pageStart}`;
  return `P.${chapter.pageStart}–${chapter.pageEnd}`;
}
