import { useEffect, useState } from "react";
import API from "../services/api";

const CompareAnalyses = () => {
  const [analyses, setAnalyses] = useState([]);
  const [oldAnalysisId, setOldAnalysisId] = useState("");
  const [newAnalysisId, setNewAnalysisId] = useState("");
  const [result, setResult] = useState(null);

  useEffect(() => {
    fetchAnalyses();
  }, []);

  const fetchAnalyses = async () => {
    try {
      const token = localStorage.getItem("token");

      const { data } = await API.get("/analysis/my-analyses", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setAnalyses(data.analyses || []);
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  const handleCompare = async (e) => {
    e.preventDefault();

    if (!oldAnalysisId || !newAnalysisId) {
      setResult({ message: "Please select both analyses" });
      return;
    }

    if (oldAnalysisId === newAnalysisId) {
      setResult({ message: "Please select two different analyses" });
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const { data } = await API.post(
        "/analysis/compare",
        {
          oldAnalysisId,
          newAnalysisId,
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
            Performance Tracking
          </p>
          <h2 className="text-3xl md:text-4xl font-bold glow-text">
            Compare Resume Analyses
          </h2>
          <p className="text-gray-400 mt-3 max-w-2xl">
            Track your resume improvement by comparing ATS scores, keyword matches, and optimization progress over time.
          </p>
        </div>

        <form
          onSubmit={handleCompare}
          className="glass-card soft-ring rounded-3xl p-6 md:p-8 space-y-6 hover-lift"
        >
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="text-gray-300 text-sm font-medium">Old Analysis</label>
              <select
                value={oldAnalysisId}
                onChange={(e) => setOldAnalysisId(e.target.value)}
                className="input-premium"
              >
                <option value="">Select old analysis</option>
                {analyses.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.resume?.originalName} - ATS {item.atsScore}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-gray-300 text-sm font-medium">New Analysis</label>
              <select
                value={newAnalysisId}
                onChange={(e) => setNewAnalysisId(e.target.value)}
                className="input-premium"
              >
                <option value="">Select new analysis</option>
                {analyses.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.resume?.originalName} - ATS {item.atsScore}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button type="submit" className="primary-btn">
            Compare Analyses
          </button>
        </form>

        {result?.comparison && (
          <div className="mt-10 space-y-6 fade-up">

            <div className="glass-card soft-ring rounded-3xl p-6 md:p-8">
              <h3 className="text-2xl font-semibold">Comparison Summary</h3>
              <p className="text-gray-300 mt-3 leading-7">
                {result.comparison.summary}
              </p>
            </div>

            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">

              <div className="glass-card p-5 rounded-2xl hover-lift">
                <p className="text-gray-400 text-sm">Old ATS</p>
                <h4 className="text-3xl font-bold mt-2">
                  {result.comparison.oldScore}
                </h4>
              </div>

              <div className="glass-card p-5 rounded-2xl hover-lift">
                <p className="text-gray-400 text-sm">New ATS</p>
                <h4 className="text-3xl font-bold mt-2 text-[#38bdf8]">
                  {result.comparison.newScore}
                </h4>
              </div>

              <div className="glass-card p-5 rounded-2xl hover-lift">
                <p className="text-gray-400 text-sm">Score Change</p>
                <h4
                  className={`text-3xl font-bold mt-2 ${
                    result.comparison.scoreDifference > 0
                      ? "text-green-400"
                      : result.comparison.scoreDifference < 0
                      ? "text-red-400"
                      : "text-white"
                  }`}
                >
                  {result.comparison.scoreDifference > 0 ? "+" : ""}
                  {result.comparison.scoreDifference}
                </h4>
              </div>

              <div className="glass-card p-5 rounded-2xl hover-lift">
                <p className="text-gray-400 text-sm">Old Match</p>
                <h4 className="text-2xl font-bold mt-2">
                  {result.comparison.oldMatch}%
                </h4>
              </div>

              <div className="glass-card p-5 rounded-2xl hover-lift">
                <p className="text-gray-400 text-sm">New Match</p>
                <h4 className="text-2xl font-bold mt-2 text-[#38bdf8]">
                  {result.comparison.newMatch}%
                </h4>
              </div>

              <div className="glass-card p-5 rounded-2xl hover-lift">
                <p className="text-gray-400 text-sm">Match Change</p>
                <h4
                  className={`text-2xl font-bold mt-2 ${
                    result.comparison.matchDifference > 0
                      ? "text-green-400"
                      : result.comparison.matchDifference < 0
                      ? "text-red-400"
                      : "text-white"
                  }`}
                >
                  {result.comparison.matchDifference > 0 ? "+" : ""}
                  {result.comparison.matchDifference}%
                </h4>
              </div>

            </div>

            <div className="grid lg:grid-cols-3 gap-6">

              <div className="glass-card p-6 rounded-2xl">
                <h4 className="font-semibold mb-3">New Keywords Added</h4>
                <p className="text-sm text-gray-300 leading-7">
                  {result.comparison.addedMatchedKeywords.join(", ") || "None"}
                </p>
              </div>

              <div className="glass-card p-6 rounded-2xl">
                <h4 className="font-semibold mb-3">Removed Missing Keywords</h4>
                <p className="text-sm text-gray-300 leading-7">
                  {result.comparison.removedMissingKeywords.join(", ") || "None"}
                </p>
              </div>

              <div className="glass-card p-6 rounded-2xl">
                <h4 className="font-semibold mb-3">Still Missing</h4>
                <p className="text-sm text-red-400 leading-7">
                  {result.comparison.stillMissingKeywords.join(", ") || "None"}
                </p>
              </div>

            </div>

          </div>
        )}

        {result && !result.comparison && (
          <pre className="mt-6 text-red-400 glass-card p-4 rounded-2xl">
            {JSON.stringify(result, null, 2)}
          </pre>
        )}
      </div>
    </div>
  );
};

export default CompareAnalyses;