import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [activity, setActivity] = useState(null);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const token = localStorage.getItem("token");

      const statsRes = await API.get("/dashboard/stats", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const activityRes = await API.get("/dashboard/activity", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setStats(statsRes.data);
      setActivity(activityRes.data);
    } catch (error) {
      console.log(error.response?.data || error.message);
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
              Control Center
            </p>
            <h2 className="text-3xl md:text-4xl font-bold glow-text">
              Dashboard
            </h2>
            <p className="text-gray-400 mt-3 max-w-2xl">
              Monitor your resume activity, ATS performance, and recent optimization progress from one premium workspace.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link to="/upload-resume" className="primary-btn">
              Upload Resume
            </Link>
            <Link to="/analyze-resume" className="secondary-btn">
              Run Analysis
            </Link>
          </div>
        </div>

        {stats && (
          <div className="grid sm:grid-cols-2 xl:grid-cols-5 gap-5 mb-10">
            <div className="glass-card soft-ring rounded-2xl p-6 hover-lift">
              <p className="text-gray-400 text-sm">Total Resumes</p>
              <h3 className="text-3xl font-bold mt-3">{stats.totalResumes}</h3>
            </div>

            <div className="glass-card soft-ring rounded-2xl p-6 hover-lift">
              <p className="text-gray-400 text-sm">Total Analyses</p>
              <h3 className="text-3xl font-bold mt-3">{stats.totalAnalyses}</h3>
            </div>

            <div className="glass-card soft-ring rounded-2xl p-6 hover-lift">
              <p className="text-gray-400 text-sm">Best ATS Score</p>
              <h3 className="text-3xl font-bold mt-3 text-[#38bdf8]">
                {stats.bestATSScore}
              </h3>
            </div>

            <div className="glass-card soft-ring rounded-2xl p-6 hover-lift">
              <p className="text-gray-400 text-sm">Average ATS Score</p>
              <h3 className="text-3xl font-bold mt-3">
                {stats.averageATSScore}
              </h3>
            </div>

            <div className="glass-card soft-ring rounded-2xl p-6 hover-lift">
              <p className="text-gray-400 text-sm">Latest ATS Score</p>
              <h3 className="text-3xl font-bold mt-3">
                {stats.latestATSScore}
              </h3>
            </div>
          </div>
        )}

        {activity && (
          <div className="grid xl:grid-cols-2 gap-8">
            <div className="glass-card soft-ring rounded-3xl p-6 md:p-8">
              <div className="flex items-center justify-between gap-4 mb-6">
                <h3 className="text-xl font-semibold">Recent Analyses</h3>
                <span className="text-xs text-gray-400 px-3 py-1 rounded-full bg-white/5 border border-gray-800">
                  Latest Activity
                </span>
              </div>

              <div className="space-y-4">
                {activity.recentAnalyses?.length > 0 ? (
                  activity.recentAnalyses.map((item) => (
                    <div
                      key={item._id}
                      className="glass-card rounded-2xl px-5 py-4 border border-gray-800 hover-lift flex items-center justify-between gap-4"
                    >
                      <div>
                        <p className="text-white font-medium">
                          {item.resume?.originalName}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          {new Date(item.createdAt).toLocaleString()}
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="text-xs text-gray-400">ATS Score</p>
                        <span className="text-[#38bdf8] text-xl font-bold">
                          {item.atsScore}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="glass-card rounded-2xl p-5 border border-gray-800 text-gray-400 text-sm">
                    No analyses found yet.
                  </div>
                )}
              </div>
            </div>

            <div className="glass-card soft-ring rounded-3xl p-6 md:p-8">
              <div className="flex items-center justify-between gap-4 mb-6">
                <h3 className="text-xl font-semibold">Recent Resumes</h3>
                <span className="text-xs text-gray-400 px-3 py-1 rounded-full bg-white/5 border border-gray-800">
                  Uploaded Files
                </span>
              </div>

              <div className="space-y-4">
                {activity.recentResumes?.length > 0 ? (
                  activity.recentResumes.map((item) => (
                    <div
                      key={item._id}
                      className="glass-card rounded-2xl px-5 py-4 border border-gray-800 hover-lift"
                    >
                      <p className="text-white font-medium">{item.originalName}</p>
                      <p className="text-xs text-gray-400 mt-2">
                        {new Date(item.createdAt).toLocaleString()}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="glass-card rounded-2xl p-5 border border-gray-800 text-gray-400 text-sm">
                    No resumes uploaded yet.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;