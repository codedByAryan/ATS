import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const MyAnalyses = () => {
  const [result, setResult] = useState(null);
  const navigate = useNavigate();

  const fetchAnalyses = async () => {
    try {
      const token = localStorage.getItem("token");

      const { data } = await API.get("/analysis/my-analyses", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setResult(data);
    } catch (error) {
      setResult(error.response?.data || { message: "Something went wrong" });
    }
  };

  const handleDownload = async (analysisId) => {
    try {
      const token = localStorage.getItem("token");

      const response = await API.get(`/analysis/download/${analysisId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: "blob",
      });

      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `analysis-report-${analysisId}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error.response?.data || error.message);
      alert("Failed to download report");
    }
  };

  return (
    <div className="app-bg min-h-screen text-white px-6 py-10">
      <div className="floating-orb top-16 left-10 h-40 w-40 bg-sky-400/20"></div>
      <div className="floating-orb bottom-10 right-10 h-56 w-56 bg-cyan-300/20"></div>

      <div className="max-w-7xl mx-auto relative z-10 fade-up">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
          <div>
            <p className="text-[#38bdf8] font-medium tracking-[0.18em] uppercase text-xs mb-3">
              Analysis History
            </p>
            <h2 className="text-3xl md:text-4xl font-bold glow-text">
              My Analyses
            </h2>
            <p className="text-gray-400 mt-3 max-w-2xl">
              View your ATS reports, track improvements, and explore AI-powered suggestions to optimize your resume.
            </p>
          </div>

          <button onClick={fetchAnalyses} className="primary-btn">
            Fetch My Analyses
          </button>
        </div>

        {result?.analyses?.length > 0 && (
          <div className="grid gap-8">
            {result.analyses.map((item) => (
              <div
                key={item._id}
                className="glass-card soft-ring rounded-[28px] p-6 md:p-8 hover-lift"
              >
                <div className="flex flex-col lg:flex-row gap-8">
                  <div className="flex-1 space-y-6">
                    <div>
                      <p className="text-gray-400 text-sm">Resume</p>
                      <h3 className="text-2xl font-semibold mt-1">
                        {item.resume?.originalName}
                      </h3>
                    </div>

                    <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
                      <div className="glass-card p-4 rounded-xl">
                        <p className="text-gray-400 text-xs">ATS Score</p>
                        <h4 className="text-2xl font-bold text-[#38bdf8] mt-2">
                          {item.atsScore}
                        </h4>
                      </div>

                      <div className="glass-card p-4 rounded-xl">
                        <p className="text-gray-400 text-xs">Match %</p>
                        <h4 className="text-2xl font-bold mt-2">
                          {item.matchPercentage}%
                        </h4>
                      </div>

                      <div className="glass-card p-4 rounded-xl">
                        <p className="text-gray-400 text-xs">Skills</p>
                        <h4 className="text-lg font-semibold mt-2">
                          {item.sectionAnalysis?.skills?.score}
                          <span className="text-gray-400 text-sm ml-1">
                            ({item.sectionAnalysis?.skills?.status})
                          </span>
                        </h4>
                      </div>

                      <div className="glass-card p-4 rounded-xl">
                        <p className="text-gray-400 text-xs">Projects</p>
                        <h4 className="text-lg font-semibold mt-2">
                          {item.sectionAnalysis?.projects?.score}
                          <span className="text-gray-400 text-sm ml-1">
                            ({item.sectionAnalysis?.projects?.status})
                          </span>
                        </h4>
                      </div>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-4">
                      <div className="glass-card p-4 rounded-xl">
                        <p className="text-gray-400 text-sm mb-2">
                          Matched Keywords
                        </p>
                        <p className="text-sm text-gray-300 leading-7">
                          {item.matchedKeywords.join(", ") ||
                            "No matched keywords"}
                        </p>
                      </div>

                      <div className="glass-card p-4 rounded-xl">
                        <p className="text-gray-400 text-sm mb-2">
                          Missing Keywords
                        </p>
                        <p className="text-sm text-red-400 leading-7">
                          {item.missingKeywords.join(", ") ||
                            "No missing keywords"}
                        </p>
                      </div>
                    </div>

                    <div className="glass-card p-4 rounded-xl">
                      <p className="text-gray-400 text-sm mb-2">
                        Suggested Skills
                      </p>
                      <p className="text-sm text-gray-300 leading-7">
                        {item.suggestedSkills?.join(", ") ||
                          "No suggested skills"}
                      </p>
                    </div>

                    <div className="glass-card p-4 rounded-xl">
                      <p className="text-gray-400 text-sm mb-3">
                        Recommendations
                      </p>
                      <ul className="space-y-2">
                        {item.recommendations?.map((rec, index) => (
                          <li
                            key={index}
                            className="text-sm text-gray-300 bg-white/5 border border-gray-800 rounded-xl px-4 py-3"
                          >
                            {rec}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <p className="text-gray-500 text-sm">
                      {new Date(item.createdAt).toLocaleString()}
                    </p>
                  </div>

                  <div className="flex flex-col gap-3 lg:w-[230px]">
                    <button
                      onClick={() => handleDownload(item._id)}
                      className="primary-btn w-full"
                    >
                      Download Report
                    </button>

                    <button
                      onClick={() =>
                        navigate("/suggestions", {
                          state: { analysisId: item._id },
                        })
                      }
                      className="secondary-btn w-full"
                    >
                      AI Suggestions
                    </button>

                    <button
                      onClick={() => navigate("/compare-analyses")}
                      className="secondary-btn w-full"
                    >
                      Compare
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {result?.analyses?.length === 0 && (
          <div className="glass-card soft-ring rounded-2xl p-12 text-center text-gray-400">
            No analyses found yet.
          </div>
        )}

        {result && !result.analyses && (
          <pre className="mt-6 text-red-400 glass-card p-4 rounded-2xl border border-red-500/20">
            {JSON.stringify(result, null, 2)}
          </pre>
        )}
      </div>
    </div>
  );
};

export default MyAnalyses;