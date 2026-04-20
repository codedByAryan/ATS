const COMMON_TECH_SKILLS = [
  "react",
  "node.js",
  "node",
  "mongodb",
  "express",
  "express.js",
  "javascript",
  "typescript",
  "java",
  "python",
  "sql",
  "mysql",
  "rest",
  "rest api",
  "git",
  "github",
  "html",
  "css",
  "tailwind",
  "bootstrap",
  "jwt",
  "api",
  "redux",
  "docker",
];

export const generateRecommendations = ({
  matchedKeywords = [],
  missingKeywords = [],
  sectionAnalysis = {},
}) => {
  const recommendations = [];

  if (missingKeywords.length > 0) {
    recommendations.push("Add missing job-specific keywords naturally in your skills, projects, or experience sections.");
  }

  if (sectionAnalysis.summary?.status === "missing") {
    recommendations.push("Add a professional summary tailored to the target role.");
  }

  if (sectionAnalysis.projects?.status === "missing") {
    recommendations.push("Add a projects section to showcase practical work relevant to the job description.");
  }

  if (sectionAnalysis.experience?.status === "missing") {
    recommendations.push("If you do not have full-time experience, add internships, training, or project-based experience.");
  }

  if (sectionAnalysis.skills?.status === "weak") {
    recommendations.push("Strengthen the skills section by listing relevant technologies and tools mentioned in the job description.");
  }

  if (sectionAnalysis.projects?.status === "weak") {
    recommendations.push("Improve project descriptions with stronger action verbs and technologies used.");
  }

  if (sectionAnalysis.experience?.status === "weak") {
    recommendations.push("Rewrite experience bullets using action verbs and measurable impact where possible.");
  }

  const suggestedSkills = missingKeywords.filter((keyword) =>
    COMMON_TECH_SKILLS.includes(keyword)
  );

  return {
    recommendations,
    suggestedSkills,
  };
};