import extractKeywords from "../utils/extractKeywords.js";

export const matchResumeWithJD = (resumeText = "", jdText = "") => {
  const resumeKeywords = extractKeywords(resumeText);
  const jdKeywords = extractKeywords(jdText);

  const resumeSet = new Set(resumeKeywords);

  const matchedKeywords = jdKeywords.filter((keyword) => resumeSet.has(keyword));
  const missingKeywords = jdKeywords.filter((keyword) => !resumeSet.has(keyword));

  let matchPercentage = 0;

  if (jdKeywords.length > 0) {
    matchPercentage = Math.round((matchedKeywords.length / jdKeywords.length) * 100);
  }

  return {
    resumeKeywords,
    jdKeywords,
    matchedKeywords,
    missingKeywords,
    matchPercentage,
  };
};