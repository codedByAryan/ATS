export const calculateATSScore = ({
  matchPercentage = 0,
  resumeText = "",
}) => {
  let sectionScore = 0;

  const lowerText = resumeText.toLowerCase();

  if (lowerText.includes("skills")) sectionScore += 10;
  if (lowerText.includes("education")) sectionScore += 10;
  if (lowerText.includes("project") || lowerText.includes("projects")) sectionScore += 10;
  if (lowerText.includes("experience")) sectionScore += 10;

  const keywordScore = Math.round(matchPercentage * 0.6);
  const structureScore = sectionScore;

  let finalScore = keywordScore + structureScore;

  if (finalScore > 100) {
    finalScore = 100;
  }

  return {
    keywordScore,
    structureScore,
    finalScore,
  };
};