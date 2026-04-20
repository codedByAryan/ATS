import { useState } from "react";
import API from "../services/api";

const UploadResume = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      setResult({ message: "Please select a file" });
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("resume", file);

      const { data } = await API.post("/resume/upload", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setResult(data);
    } catch (error) {
      setResult(error.response?.data || { message: "Something went wrong" });
    }
  };

  return (
    <div className="app-bg min-h-screen text-white px-6 py-10">
      <div className="floating-orb top-16 left-10 h-44 w-44 bg-sky-400/20"></div>
      <div className="floating-orb bottom-10 right-10 h-60 w-60 bg-cyan-300/20"></div>

      <div className="max-w-5xl mx-auto relative z-10 fade-up">
        <div className="mb-10">
          <p className="text-[#38bdf8] font-medium tracking-[0.18em] uppercase text-xs mb-3">
            Resume Upload
          </p>
          <h2 className="text-3xl md:text-4xl font-bold glow-text">
            Upload Resume
          </h2>
          <p className="text-gray-400 mt-3 max-w-2xl">
            Upload your resume to start ATS analysis and unlock optimization insights with AI-powered evaluation.
          </p>
        </div>

        <div className="glass-card soft-ring rounded-[28px] p-6 md:p-8 hover-lift">
          <form onSubmit={handleUpload} className="space-y-6">

            <div className="border-2 border-dashed border-gray-700 rounded-[24px] p-10 text-center bg-[#020617] hover:border-[#38bdf8] transition">
              
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => setFile(e.target.files[0])}
                className="block w-full text-sm text-gray-300 file:mr-4 file:rounded-lg file:border-0 file:bg-[#38bdf8] file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-[#0ea5e9] file:transition cursor-pointer"
              />

              <p className="text-gray-400 text-sm mt-4">
                Supported formats: PDF, DOC, DOCX
              </p>

              {file && (
                <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-2 text-sm text-gray-200 border border-gray-800">
                  <span className="text-[#38bdf8]">●</span>
                  {file.name}
                </div>
              )}

            </div>

            <button type="submit" className="primary-btn">
              Upload Resume
            </button>

          </form>
        </div>

        {result && (
          <div className="mt-10 space-y-6 fade-up">

            <div className="glass-card soft-ring rounded-[28px] p-6 md:p-8">
              <h3 className="text-2xl font-semibold mb-6">Upload Result</h3>

              {result.resume ? (
                <div className="grid sm:grid-cols-2 gap-5">

                  <div className="glass-card p-5 rounded-2xl">
                    <p className="text-gray-400 text-sm">Original Name</p>
                    <p className="mt-2 text-gray-200">
                      {result.resume.originalName}
                    </p>
                  </div>

                  <div className="glass-card p-5 rounded-2xl">
                    <p className="text-gray-400 text-sm">File Type</p>
                    <p className="mt-2 text-gray-200">
                      {result.resume.fileType}
                    </p>
                  </div>

                  <div className="glass-card p-5 rounded-2xl">
                    <p className="text-gray-400 text-sm">File Size</p>
                    <p className="mt-2 text-gray-200">
                      {result.resume.fileSize}
                    </p>
                  </div>

                  <div className="glass-card p-5 rounded-2xl">
                    <p className="text-gray-400 text-sm">Status</p>
                    <p className="mt-2 text-[#38bdf8] font-medium">
                      {result.message || "Uploaded successfully"}
                    </p>
                  </div>

                </div>
              ) : (
                <pre className="text-red-400 whitespace-pre-wrap glass-card p-4 rounded-2xl border border-red-500/20">
                  {JSON.stringify(result, null, 2)}
                </pre>
              )}
            </div>

            {result.resume?.extractedText && (
              <div className="glass-card soft-ring rounded-[28px] p-6 md:p-8">
                <h3 className="text-2xl font-semibold mb-6">
                  Extracted Text Preview
                </h3>

                <div className="bg-[#020617] border border-gray-800 rounded-2xl p-5 max-h-[500px] overflow-y-auto">
                  <pre className="whitespace-pre-wrap text-sm text-gray-300 leading-7">
                    {result.resume.extractedText.slice(0, 2000)}
                  </pre>
                </div>
              </div>
            )}

          </div>
        )}
      </div>
    </div>
  );
};

export default UploadResume;