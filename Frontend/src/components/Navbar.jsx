import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const navLink = (path, name) => (
    <Link
      to={path}
      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300
      ${
        location.pathname === path
          ? "bg-[#38bdf8] text-white shadow-md"
          : "text-gray-300 hover:text-white hover:bg-white/10"
      }`}
    >
      {name}
    </Link>
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-lg bg-[#020617]/80 border-b border-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        <div className="text-white text-xl font-bold tracking-wide">
          ATS<span className="text-[#38bdf8]">Pro</span>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          {navLink("/", "Home")}
          {navLink("/dashboard", "Dashboard")}
          {navLink("/analyze-resume", "Analyze")}
          {navLink("/my-analyses", "Analyses")}
          {navLink("/compare-analyses", "Compare")}
          {navLink("/upload-resume", "Upload")}
          {navLink("/my-resumes", "Resumes")}
        </div>

        <div className="flex items-center gap-3">

          {!token ? (
            <>
              <Link
                to="/login"
                className="text-gray-300 hover:text-white transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="bg-[#38bdf8] text-white px-4 py-2 rounded-lg hover:bg-[#0ea5e9] transition shadow-md"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <button
                onClick={handleLogout}
                className="text-gray-300 hover:text-red-400 transition"
              >
                Logout
              </button>

              <Link
                to="/profile"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition"
              >
                👤
              </Link>
            </>
          )}

        </div>
      </div>
    </nav>
  );
};

export default Navbar;