import extractKeywords from "../utils/extractKeywords.js";

export const parseJobDescription = (jobDescription = "") => {
  const keywords = extractKeywords(jobDescription);

  return {
    rawText: jobDescription,
    keywords,
  };
};