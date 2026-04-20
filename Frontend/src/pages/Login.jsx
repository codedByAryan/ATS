import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [result, setResult] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { data } = await API.post("/auth/login", form);
      localStorage.setItem("token", data.token);
      setResult(data);
      navigate("/dashboard");
    } catch (error) {
      setResult(error.response?.data || { message: "Something went wrong" });
    }
  };

  return (
    <div className="app-bg min-h-screen text-white px-6 py-10 flex items-center justify-center overflow-hidden">
      <div className="floating-orb top-16 left-10 h-44 w-44 bg-sky-400/20"></div>
      <div className="floating-orb bottom-10 right-10 h-60 w-60 bg-cyan-300/20"></div>

      <div className="w-full max-w-6xl grid lg:grid-cols-2 rounded-[32px] overflow-hidden border border-gray-800 glass-card soft-ring relative z-10 fade-up">
        <div className="hidden lg:flex flex-col justify-between p-10 xl:p-12 bg-gradient-to-br from-[#0f172a] via-[#020617] to-[#082f49] relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.12),transparent_35%)]"></div>

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-400/20 bg-sky-400/10 px-4 py-2 text-xs font-medium tracking-[0.18em] uppercase text-sky-300">
              Welcome Back
            </div>

            <h1 className="text-4xl xl:text-5xl font-bold mt-6 leading-tight glow-text">
              Continue optimizing your resume with a premium ATS workflow.
            </h1>

            <p className="text-gray-400 mt-6 leading-8 max-w-lg">
              Track your analyses, compare results, and manage your resume journey with a modern platform designed to help you stand out.
            </p>
          </div>

          <div className="relative z-10 grid grid-cols-2 gap-4 mt-10">
            <div className="glass-card rounded-2xl p-5 hover-lift">
              <p className="text-gray-400 text-sm">Smart Analysis</p>
              <h3 className="text-2xl font-bold mt-2 text-[#38bdf8]">ATS</h3>
            </div>

            <div className="glass-card rounded-2xl p-5 hover-lift">
              <p className="text-gray-400 text-sm">Track Progress</p>
              <h3 className="text-2xl font-bold mt-2">Compare</h3>
            </div>
          </div>
        </div>

        <div className="p-8 sm:p-10 lg:p-12 flex items-center">
          <div className="w-full max-w-md mx-auto">
            <div className="mb-8">
              <p className="text-[#38bdf8] font-medium tracking-[0.18em] uppercase text-xs mb-3">
                Sign In
              </p>
              <h2 className="text-3xl md:text-4xl font-bold">Login</h2>
              <p className="text-gray-400 mt-3 leading-7">
                Access your dashboard, saved analyses, and resume optimization tools.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="text-sm text-gray-300 font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={handleChange}
                  className="input-premium"
                />
              </div>

              <div>
                <label className="text-sm text-gray-300 font-medium">Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={handleChange}
                  className="input-premium"
                />
              </div>

              <button type="submit" className="w-full primary-btn">
                Login
              </button>
            </form>

            <p className="text-sm text-gray-400 mt-6 text-center">
              Don&apos;t have an account?{" "}
              <Link
                to="/register"
                className="text-[#38bdf8] hover:text-[#7dd3fc] transition font-medium"
              >
                Register
              </Link>
            </p>

            {result && !result.token && (
              <pre className="mt-6 text-red-400 whitespace-pre-wrap text-sm glass-card rounded-2xl p-4 border border-red-500/20">
                {JSON.stringify(result, null, 2)}
              </pre>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;