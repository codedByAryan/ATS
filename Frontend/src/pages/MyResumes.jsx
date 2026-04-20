import { useState } from "react";
import API from "../services/api";

const MyResumes = () => {
  const [result, setResult] = useState(null);

  const fetchResumes = async () => {
    try {
      const token = localStorage.getItem("token");

      const { data } = await API.get("/resume/my-resumes", {
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

      <div className="max-w-7xl mx-auto relative z-10 fade-up">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
          <div>
            <p className="text-[#38bdf8] font-medium tracking-[0.18em] uppercase text-xs mb-3">
              Resume Library
            </p>
            <h2 className="text-3xl md:text-4xl font-bold glow-text">
              My Resumes
            </h2>
            <p className="text-gray-400 mt-3 max-w-2xl">
              Access your uploaded resumes, review extracted content, and monitor the files you use for ATS analysis.
            </p>
          </div>

          <button onClick={fetchResumes} className="primary-btn">
            Fetch My Resumes
          </button>
        </div>

        {result?.resumes?.length > 0 && (
          <div className="grid gap-8">
            {result.resumes.map((resume) => (
              <div
                key={resume._id}
                className="glass-card soft-ring rounded-[28px] p-6 md:p-8 hover-lift"
              >
                <div className="grid xl:grid-cols-[1fr_1.25fr] gap-8">
                  <div className="space-y-5">
                    <div>
                      <p className="text-gray-400 text-sm">Original Name</p>
                      <h3 className="text-2xl font-semibold mt-1">
                        {resume.originalName}
                      </h3>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="glass-card rounded-2xl p-4">
                        <p className="text-gray-400 text-xs">File Type</p>
                        <p className="mt-2 text-gray-200 break-all">
                          {resume.fileType}
                        </p>
                      </div>

                      <div className="glass-card rounded-2xl p-4">
                        <p className="text-gray-400 text-xs">File Size</p>
                        <p className="mt-2 text-gray-200">
                          {resume.fileSize}
                        </p>
                      </div>

                      <div className="glass-card rounded-2xl p-4 sm:col-span-2">
                        <p className="text-gray-400 text-xs">Uploaded On</p>
                        <p className="mt-2 text-gray-200">
                          {new Date(resume.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <div className="glass-card rounded-2xl p-4">
                      <p className="text-gray-400 text-sm mb-2">Resume Status</p>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 rounded-full bg-sky-400/10 border border-sky-400/20 text-xs text-sky-300">
                          Uploaded
                        </span>
                        <span className="px-3 py-1 rounded-full bg-white/5 border border-gray-800 text-xs text-gray-300">
                          Ready for Analysis
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="glass-card rounded-[24px] p-5">
                    <div className="flex items-center justify-between gap-4 mb-4">
                      <h4 className="text-xl font-semibold">
                        Extracted Text Preview
                      </h4>
                      <span className="text-xs text-gray-400 bg-white/5 border border-gray-800 px-3 py-1 rounded-full">
                        Preview
                      </span>
                    </div>

                    <div className="bg-[#020617] border border-gray-800 rounded-2xl p-4 max-h-[420px] overflow-y-auto">
                      <pre className="whitespace-pre-wrap text-sm text-gray-300 leading-7">
                        {resume.extractedText
                          ? resume.extractedText.slice(0, 1000)
                          : "No text extracted"}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {result?.resumes?.length === 0 && (
          <div className="glass-card soft-ring rounded-2xl p-12 text-center text-gray-400">
            No resumes found yet.
          </div>
        )}

        {result && !result.resumes && (
          <pre className="mt-6 text-red-400 whitespace-pre-wrap glass-card rounded-2xl p-4 border border-red-500/20">
            {JSON.stringify(result, null, 2)}
          </pre>
        )}
      </div>
    </div>
  );
};

export default MyResumes;