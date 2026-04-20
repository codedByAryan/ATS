export const compareAnalyses = (oldAnalysis, newAnalysis) => {
  const oldScore = oldAnalysis?.atsScore || 0;
  const newScore = newAnalysis?.atsScore || 0;

  const oldMatch = oldAnalysis?.matchPercentage || 0;
  const newMatch = newAnalysis?.matchPercentage || 0;

  const oldMatchedKeywords = oldAnalysis?.matchedKeywords || [];
  const newMatchedKeywords = newAnalysis?.matchedKeywords || [];

  const oldMissingKeywords = oldAnalysis?.missingKeywords || [];
  const newMissingKeywords = newAnalysis?.missingKeywords || [];

  const scoreDifference = newScore - oldScore;
  const matchDifference = newMatch - oldMatch;

  const addedMatchedKeywords = newMatchedKeywords.filter(
    (keyword) => !oldMatchedKeywords.includes(keyword)
  );

  const removedMissingKeywords = oldMissingKeywords.filter(
    (keyword) => !newMissingKeywords.includes(keyword)
  );

  const stillMissingKeywords = newMissingKeywords;

  let summary = "No major change detected.";

  if (scoreDifference > 0) {
    summary = `ATS score improved by ${scoreDifference} points.`;
  } else if (scoreDifference < 0) {
    summary = `ATS score decreased by ${Math.abs(scoreDifference)} points.`;
  }

  return {
    oldScore,
    newScore,
    scoreDifference,
    oldMatch,
    newMatch,
    matchDifference,
    addedMatchedKeywords,
    removedMissingKeywords,
    stillMissingKeywords,
    summary,
  };
};