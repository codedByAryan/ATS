import { useState } from "react";
import API from "../services/api";

const Profile = () => {
  const [result, setResult] = useState(null);

  const getProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const { data } = await API.get("/auth/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setResult(data);
    } catch (error) {
      setResult(error.response?.data || { message: "Something went wrong" });
    }
  };

  return (
    <div className="app-bg min-h-screen text-white px-6 py-10">
      <div className="floating-orb top-16 left-10 h-40 w-40 bg-sky-400/20"></div>
      <div className="floating-orb bottom-10 right-10 h-56 w-56 bg-cyan-300/20"></div>

      <div className="max-w-4xl mx-auto relative z-10 fade-up">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
          <div>
            <p className="text-[#38bdf8] font-medium tracking-[0.18em] uppercase text-xs mb-3">
              Account Overview
            </p>
            <h2 className="text-3xl md:text-4xl font-bold glow-text">
              Profile
            </h2>
            <p className="text-gray-400 mt-3 max-w-2xl">
              View your account details and access your personal workspace information.
            </p>
          </div>

          <button onClick={getProfile} className="primary-btn">
            Fetch Profile
          </button>
        </div>

        {result?.user && (
          <div className="glass-card soft-ring rounded-[28px] p-6 md:p-8 hover-lift">
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#38bdf8] to-[#0ea5e9] flex items-center justify-center text-3xl font-bold text-white shadow-lg">
                {result.user.name ? result.user.name.charAt(0).toUpperCase() : "U"}
              </div>

              <div className="flex-1">
                <p className="text-gray-400 text-sm">Account Holder</p>
                <h3 className="text-3xl font-semibold mt-2">
                  {result.user.name || "User"}
                </h3>
                <p className="text-gray-400 mt-2 text-base break-all">
                  {result.user.email}
                </p>

                <div className="flex flex-wrap gap-2 mt-4">
                  <span className="px-3 py-1 rounded-full bg-sky-400/10 border border-sky-400/20 text-xs text-sky-300">
                    Active Account
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white/5 border border-gray-800 text-xs text-gray-300">
                    ATS Workspace
                  </span>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-5 mt-8">
              <div className="glass-card rounded-2xl p-5">
                <p className="text-gray-400 text-sm">User ID</p>
                <p className="mt-3 text-gray-200 break-all leading-7">
                  {result.user._id}
                </p>
              </div>

              <div className="glass-card rounded-2xl p-5">
                <p className="text-gray-400 text-sm">Joined</p>
                <p className="mt-3 text-gray-200">
                  {new Date(result.user.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        )}

        {result && !result.user && (
          <pre className="mt-6 text-red-400 whitespace-pre-wrap glass-card rounded-2xl p-4 border border-red-500/20">
            {JSON.stringify(result, null, 2)}
          </pre>
        )}
      </div>
    </div>
  );
};

export default Profile;