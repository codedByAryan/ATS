import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#020617] border-t border-gray-800 mt-0">
      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* 🔷 Top Section */}
        <div className="flex flex-col md:flex-row justify-between gap-8">

          {/* Logo + Description */}
          <div>
            <h2 className="text-white text-xl font-bold">
              ATS<span className="text-[#38bdf8]">Pro</span>
            </h2>
            <p className="text-gray-400 text-sm mt-3 max-w-sm">
              Smart AI-powered resume analysis tool to help you optimize your resume
              for ATS systems and land better opportunities.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <div className="flex flex-col gap-2 text-gray-400 text-sm">
              <Link to="/" className="hover:text-[#38bdf8] transition">Home</Link>
              <Link to="/dashboard" className="hover:text-[#38bdf8] transition">Dashboard</Link>
              <Link to="/analyze-resume" className="hover:text-[#38bdf8] transition">Analyze Resume</Link>
              <Link to="/my-analyses" className="hover:text-[#38bdf8] transition">My Analyses</Link>
            </div>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <div className="flex flex-col gap-2 text-gray-400 text-sm">
              <Link to="/upload-resume" className="hover:text-[#38bdf8] transition">Upload Resume</Link>
              <Link to="/my-resumes" className="hover:text-[#38bdf8] transition">My Resumes</Link>
              <Link to="/compare-analyses" className="hover:text-[#38bdf8] transition">Compare</Link>
            </div>
          </div>

        </div>

        {/* 🔻 Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} ATSPro. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;