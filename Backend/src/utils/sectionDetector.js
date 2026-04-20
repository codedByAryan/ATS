const extractSection = (text = "", keywords = []) => {
  const lowerText = text.toLowerCase();
  let startIndex = -1;

  for (const keyword of keywords) {
    const index = lowerText.indexOf(keyword);
    if (index !== -1) {
      startIndex = index;
      break;
    }
  }

  if (startIndex === -1) {
    return "";
  }

  const remainingText = text.slice(startIndex);
  const lines = remainingText.split("\n").slice(0, 20);

  return lines.join("\n").trim();
};

const detectResumeSections = (resumeText = "") => {
  return {
    skills: extractSection(resumeText, ["skills", "technical skills", "skills summary"]),
    education: extractSection(resumeText, ["education", "academic background", "qualification"]),
    projects: extractSection(resumeText, ["projects", "project experience", "academic projects"]),
    experience: extractSection(resumeText, ["experience", "work experience", "internship", "professional experience"]),
    summary: extractSection(resumeText, ["summary", "professional summary", "profile", "objective"]),
  };
};

export default detectResumeSections;