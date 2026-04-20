import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="app-bg text-white overflow-hidden">
      <div className="floating-orb top-16 left-10 h-44 w-44 bg-sky-400/25"></div>
      <div className="floating-orb top-40 right-10 h-60 w-60 bg-cyan-300/20"></div>
      <div className="floating-orb bottom-10 left-1/3 h-52 w-52 bg-blue-400/15"></div>

      <section className="max-w-7xl mx-auto px-6 pt-20 pb-16 md:pt-24 md:pb-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <div className="fade-up">
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/20 bg-sky-400/10 px-4 py-2 text-xs font-medium tracking-[0.18em] uppercase text-sky-300">
              Premium ATS Platform
            </div>

            <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight glow-text">
              AI Resume Analyzer &{" "}
              <span className="text-[#38bdf8]">ATS Optimizer</span>
            </h1>

            <p className="text-gray-400 mt-6 text-lg leading-8 max-w-2xl">
              Transform your resume into a recruiter-ready asset with smart ATS
              insights, premium analytics, and a modern workflow built to help
              you stand out faster.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/analyze-resume" className="primary-btn">
                Analyze Resume
              </Link>

              <Link to="/upload-resume" className="secondary-btn">
                Upload Resume
              </Link>
            </div>

            <div className="mt-10 grid sm:grid-cols-3 gap-4 max-w-2xl">
              <div className="glass-card rounded-2xl p-5 hover-lift">
                <p className="text-gray-400 text-sm">ATS Scoring</p>
                <h3 className="text-2xl font-bold mt-2">Smart</h3>
              </div>

              <div className="glass-card rounded-2xl p-5 hover-lift">
                <p className="text-gray-400 text-sm">Keyword Match</p>
                <h3 className="text-2xl font-bold mt-2">Precise</h3>
              </div>

              <div className="glass-card rounded-2xl p-5 hover-lift">
                <p className="text-gray-400 text-sm">Progress Tracking</p>
                <h3 className="text-2xl font-bold mt-2">Advanced</h3>
              </div>
            </div>
          </div>

          <div className="relative fade-up">
            <div className="absolute -inset-4 bg-sky-400/10 blur-3xl rounded-full"></div>

            <div className="relative glass-card soft-ring rounded-[28px] p-6 md:p-7">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Live ATS Score</p>
                  <h2 className="text-5xl font-bold text-[#38bdf8] mt-2">82%</h2>
                </div>

                <div className="h-14 w-14 rounded-2xl bg-sky-400/10 border border-sky-400/20 flex items-center justify-center text-sky-300 text-xl">
                  ✦
                </div>
              </div>

              <div className="mt-6 h-3 w-full bg-[#0f172a] rounded-full overflow-hidden border border-gray-800">
                <div className="h-full w-[82%] bg-gradient-to-r from-sky-400 to-cyan-300 rounded-full"></div>
              </div>

              <div className="mt-7 grid sm:grid-cols-2 gap-4">
                <div className="rounded-2xl bg-[#020617] border border-gray-800 p-4">
                  <p className="text-gray-400 text-xs uppercase tracking-wide">Keywords Matched</p>
                  <p className="text-sm text-gray-200 mt-3 leading-7">
                    React, Node.js, MongoDB, Express
                  </p>
                </div>

                <div className="rounded-2xl bg-[#020617] border border-gray-800 p-4">
                  <p className="text-gray-400 text-xs uppercase tracking-wide">Missing Skills</p>
                  <p className="text-sm text-red-400 mt-3 leading-7">
                    Docker, AWS, TypeScript
                  </p>
                </div>
              </div>

              <div className="mt-5 rounded-2xl bg-[#020617] border border-gray-800 p-4">
                <p className="text-gray-400 text-xs uppercase tracking-wide">Analysis Snapshot</p>
                <div className="mt-4 space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-300">Structure Score</span>
                    <span className="text-sky-300 font-medium">Good</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-300">Project Relevance</span>
                    <span className="text-sky-300 font-medium">Strong</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-300">Resume Quality</span>
                    <span className="text-sky-300 font-medium">Improving</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        <div className="text-center mb-12 fade-up">
          <p className="text-[#38bdf8] font-medium tracking-[0.18em] uppercase text-xs mb-3">
            Core Advantages
          </p>
          <h2 className="text-2xl md:text-3xl font-semibold">
            Why Use ATSPro?
          </h2>
          <p className="text-gray-400 mt-3 max-w-2xl mx-auto">
            Everything you need to evaluate, optimize, and track your resume in a premium modern workspace.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="glass-card soft-ring p-7 rounded-3xl hover-lift">
            <div className="h-12 w-12 rounded-2xl bg-sky-400/10 border border-sky-400/20 flex items-center justify-center text-sky-300 text-xl">
              ⌁
            </div>
            <h3 className="text-xl font-semibold mt-5 text-[#38bdf8]">
              Smart Analysis
            </h3>
            <p className="text-gray-400 text-sm leading-7 mt-3">
              Get detailed ATS scores and performance insights based on your target role and job description.
            </p>
          </div>

          <div className="glass-card soft-ring p-7 rounded-3xl hover-lift">
            <div className="h-12 w-12 rounded-2xl bg-sky-400/10 border border-sky-400/20 flex items-center justify-center text-sky-300 text-xl">
              ⟡
            </div>
            <h3 className="text-xl font-semibold mt-5 text-[#38bdf8]">
              Keyword Optimization
            </h3>
            <p className="text-gray-400 text-sm leading-7 mt-3">
              Identify missing keywords, improve matching strength, and tailor your resume more effectively.
            </p>
          </div>

          <div className="glass-card soft-ring p-7 rounded-3xl hover-lift">
            <div className="h-12 w-12 rounded-2xl bg-sky-400/10 border border-sky-400/20 flex items-center justify-center text-sky-300 text-xl">
              ◎
            </div>
            <h3 className="text-xl font-semibold mt-5 text-[#38bdf8]">
              Resume Tracking
            </h3>
            <p className="text-gray-400 text-sm leading-7 mt-3">
              Compare versions, monitor ATS improvements, and keep refining your resume with clarity.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-20 relative z-10">
        <div className="glass-card soft-ring rounded-[32px] p-8 md:p-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 hover-lift">
          <div>
            <p className="text-[#38bdf8] font-medium tracking-[0.18em] uppercase text-xs mb-3">
              Start Now
            </p>
            <h2 className="text-2xl md:text-3xl font-semibold">
              Build a stronger, recruiter-ready resume today
            </h2>
            <p className="text-gray-400 mt-3 max-w-2xl leading-7">
              Upload your resume, run ATS analysis, and begin optimizing every section with a clean premium experience.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link to="/upload-resume" className="primary-btn">
              Upload Resume
            </Link>
            <Link to="/dashboard" className="secondary-btn">
              Open Dashboard
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;