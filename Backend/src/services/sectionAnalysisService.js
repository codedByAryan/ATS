import extractKeywords from "../utils/extractKeywords.js";
import detectResumeSections from "../utils/sectionDetector.js";

const calculateSectionScore = (sectionText = "", jdKeywords = []) => {
  if (!sectionText || !sectionText.trim()) {
    return {
      score: 0,
      matchedKeywords: [],
      missingKeywords: jdKeywords,
      status: "missing",
    };
  }

  const sectionKeywords = extractKeywords(sectionText);
  const sectionSet = new Set(sectionKeywords);

  const matchedKeywords = jdKeywords.filter((keyword) => sectionSet.has(keyword));
  const missingKeywords = jdKeywords.filter((keyword) => !sectionSet.has(keyword));

  let score = 0;

  if (jdKeywords.length > 0) {
    score = Math.round((matchedKeywords.length / jdKeywords.length) * 100);
  }

  let status = "weak";
  if (score >= 70) status = "strong";
  else if (score >= 40) status = "moderate";

  return {
    score,
    matchedKeywords,
    missingKeywords,
    status,
  };
};

export const analyzeResumeSections = (resumeText = "", jdKeywords = []) => {
  const sections = detectResumeSections(resumeText);

  return {
    skills: calculateSectionScore(sections.skills, jdKeywords),
    education: calculateSectionScore(sections.education, jdKeywords),
    projects: calculateSectionScore(sections.projects, jdKeywords),
    experience: calculateSectionScore(sections.experience, jdKeywords),
    summary: calculateSectionScore(sections.summary, jdKeywords),
    extractedSections: sections,
  };
};