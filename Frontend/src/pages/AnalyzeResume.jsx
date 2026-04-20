import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const AnalyzeResume = () => {
  const [resumes, setResumes] = useState([]);
  const [resumeId, setResumeId] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      const token = localStorage.getItem("token");

      const { data } = await API.get("/resume/my-resumes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setResumes(data.resumes || []);
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  const handleAnalyze = async (e) => {
    e.preventDefault();

    if (!resumeId || !jobDescription) {
      setResult({ message: "Please select a resume and enter job description" });
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const { data } = await API.post(
        "/analysis/run",
        {
          resumeId,
          jobDescription,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setResult(data);
    } catch (error) {
      setResult(error.response?.data || { message: "Something went wrong" });
    }
  };

  return (
    <div className="app-bg min-h-screen text-white px-6 py-10">
      <div className="floating-orb top-16 left-10 h-40 w-40 bg-sky-400/20"></div>
      <div className="floating-orb bottom-10 right-10 h-56 w-56 bg-cyan-300/20"></div>

      <div className="max-w-6xl mx-auto relative z-10 fade-up">
        <div className="mb-8">
          <p className="text-[#38bdf8] font-medium tracking-[0.18em] uppercase text-xs mb-3">
            Resume Intelligence
          </p>
          <h2 className="text-3xl md:text-4xl font-bold glow-text">
            Analyze Resume
          </h2>
          <p className="text-gray-400 mt-3 max-w-2xl">
            Select your uploaded resume, paste the target job description, and generate a premium ATS analysis with keyword insights, section scores, and optimization recommendations.
          </p>
        </div>

        <form
          onSubmit={handleAnalyze}
          className="glass-card soft-ring rounded-3xl p-6 md:p-8 space-y-6 hover-lift"
        >
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="text-gray-300 text-sm font-medium">Select Resume</label>
              <select
                value={resumeId}
                onChange={(e) => setResumeId(e.target.value)}
                className="input-premium"
              >
                <option value="">Select resume</option>
                {resumes.map((resume) => (
                  <option key={resume._id} value={resume._id}>
                    {resume.originalName}
                  </option>
                ))}
              </select>
            </div>

            <div className="glass-card rounded-2xl px-5 py-4 border border-gray-800 flex flex-col justify-center">
              <p className="text-gray-400 text-sm">Analysis Includes</p>
              <div className="flex flex-wrap gap-2 mt-3">
                <span className="px-3 py-1 rounded-full bg-white/5 border border-gray-800 text-xs text-gray-300">
                  ATS Score
                </span>
                <span className="px-3 py-1 rounded-full bg-white/5 border border-gray-800 text-xs text-gray-300">
                  Keyword Match
                </span>
                <span className="px-3 py-1 rounded-full bg-white/5 border border-gray-800 text-xs text-gray-300">
                  Section Breakdown
                </span>
                <span className="px-3 py-1 rounded-full bg-white/5 border border-gray-800 text-xs text-gray-300">
                  Suggestions
                </span>
              </div>
            </div>
          </div>

          <div>
            <label className="text-gray-300 text-sm font-medium">Job Description</label>
            <textarea
              rows="10"
              placeholder="Paste job description here"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              className="input-premium resize-none"
            />
          </div>

          <div className="flex flex-wrap gap-4">
            <button type="submit" className="primary-btn">
              Run Analysis
            </button>
            <button
              type="button"
              onClick={() => {
                setResumeId("");
                setJobDescription("");
                setResult(null);
              }}
              className="secondary-btn"
            >
              Reset
            </button>
          </div>
        </form>

        {result?.analysis && (
          <div className="mt-10 space-y-6 fade-up">
            <div className="glass-card soft-ring rounded-3xl p-6 md:p-8">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                <div>
                  <p className="text-gray-400 text-sm">Analysis Result</p>
                  <h3 className="text-2xl md:text-3xl font-semibold mt-2">
                    Resume Performance Overview
                  </h3>
                </div>

                <button
                  onClick={() =>
                    navigate("/suggestions", {
                      state: { analysisId: result.analysis._id },
                    })
                  }
                  className="primary-btn"
                >
                  View AI Suggestions
                </button>
              </div>

              <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5 mt-8">
                <div className="glass-card rounded-2xl p-5 border border-gray-800 hover-lift">
                  <p className="text-gray-400 text-sm">ATS Score</p>
                  <h4 className="text-3xl font-bold text-[#38bdf8] mt-2">
                    {result.analysis.atsScore}
                  </h4>
                </div>

                <div className="glass-card rounded-2xl p-5 border border-gray-800 hover-lift">
                  <p className="text-gray-400 text-sm">Match %</p>
                  <h4 className="text-3xl font-bold mt-2">
                    {result.analysis.matchPercentage}%
                  </h4>
                </div>

                <div className="glass-card rounded-2xl p-5 border border-gray-800 hover-lift">
                  <p className="text-gray-400 text-sm">Keyword Score</p>
                  <h4 className="text-2xl font-semibold mt-2">
                    {result.analysis.keywordScore}
                  </h4>
                </div>

                <div className="glass-card rounded-2xl p-5 border border-gray-800 hover-lift">
                  <p className="text-gray-400 text-sm">Structure Score</p>
                  <h4 className="text-2xl font-semibold mt-2">
                    {result.analysis.structureScore}
                  </h4>
                </div>
              </div>
            </div>

            <div className="grid xl:grid-cols-2 gap-6">
              <div className="glass-card soft-ring rounded-3xl p-6">
                <p className="text-gray-400 text-sm mb-3">Matched Keywords</p>
                <div className="bg-[#020617] border border-gray-800 rounded-2xl p-4 min-h-[120px]">
                  <p className="text-sm text-gray-300 leading-7">
                    {result.analysis.matchedKeywords.length > 0
                      ? result.analysis.matchedKeywords.join(", ")
                      : "No matched keywords found"}
                  </p>
                </div>
              </div>

              <div className="glass-card soft-ring rounded-3xl p-6">
                <p className="text-gray-400 text-sm mb-3">Missing Keywords</p>
                <div className="bg-[#020617] border border-gray-800 rounded-2xl p-4 min-h-[120px]">
                  <p className="text-sm text-red-400 leading-7">
                    {result.analysis.missingKeywords.length > 0
                      ? result.analysis.missingKeywords.join(", ")
                      : "No missing keywords"}
                  </p>
                </div>
              </div>
            </div>

            <div className="glass-card soft-ring rounded-3xl p-6 md:p-8">
              <h3 className="text-xl font-semibold mb-5">Section Breakdown</h3>

              <div className="grid sm:grid-cols-2 xl:grid-cols-5 gap-4">
                {[
                  {
                    name: "Skills",
                    score: result.analysis.sectionAnalysis?.skills?.score,
                    status: result.analysis.sectionAnalysis?.skills?.status,
                  },
                  {
                    name: "Education",
                    score: result.analysis.sectionAnalysis?.education?.score,
                    status: result.analysis.sectionAnalysis?.education?.status,
                  },
                  {
                    name: "Projects",
                    score: result.analysis.sectionAnalysis?.projects?.score,
                    status: result.analysis.sectionAnalysis?.projects?.status,
                  },
                  {
                    name: "Experience",
                    score: result.analysis.sectionAnalysis?.experience?.score,
                    status: result.analysis.sectionAnalysis?.experience?.status,
                  },
                  {
                    name: "Summary",
                    score: result.analysis.sectionAnalysis?.summary?.score,
                    status: result.analysis.sectionAnalysis?.summary?.status,
                  },
                ].map((section) => (
                  <div
                    key={section.name}
                    className="glass-card rounded-2xl p-5 border border-gray-800 hover-lift"
                  >
                    <p className="text-gray-400 text-sm">{section.name}</p>
                    <h4 className="text-2xl font-bold mt-2">{section.score}</h4>
                    <p className="text-xs text-gray-400 mt-2 capitalize">
                      {section.status}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid xl:grid-cols-2 gap-6">
              <div className="glass-card soft-ring rounded-3xl p-6">
                <h3 className="text-xl font-semibold mb-4">Suggested Skills</h3>
                <div className="flex flex-wrap gap-3">
                  {result.analysis.suggestedSkills?.length > 0 ? (
                    result.analysis.suggestedSkills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 rounded-full bg-[#0f172a] border border-gray-800 text-sm text-gray-300"
                      >
                        {skill}
                      </span>
                    ))
                  ) : (
                    <p className="text-sm text-gray-400">No suggested skills</p>
                  )}
                </div>
              </div>

              <div className="glass-card soft-ring rounded-3xl p-6">
                <h3 className="text-xl font-semibold mb-4">Recommendations</h3>
                <ul className="space-y-3 text-sm text-gray-300">
                  {result.analysis.recommendations?.length > 0 ? (
                    result.analysis.recommendations.map((item, index) => (
                      <li
                        key={index}
                        className="bg-white/5 border border-gray-800 rounded-2xl px-4 py-3"
                      >
                        {item}
                      </li>
                    ))
                  ) : (
                    <li className="text-gray-400">No recommendations available</li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        )}

        {result && !result.analysis && (
          <pre className="mt-6 text-red-400 whitespace-pre-wrap glass-card rounded-2xl p-4 border border-red-500/20">
            {JSON.stringify(result, null, 2)}
          </pre>
        )}
      </div>
    </div>
  );
};

export default AnalyzeResume;