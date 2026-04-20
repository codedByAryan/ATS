import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import UploadResume from "./pages/UploadResume";
import MyResumes from "./pages/MyResumes";
import AnalyzeResume from "./pages/AnalyzeResume";
import MyAnalyses from "./pages/MyAnalyses";
import CompareAnalyses from "./pages/CompareAnalyses";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/upload-resume" element={<UploadResume />} />
          <Route path="/my-resumes" element={<MyResumes />} />
          <Route path="/analyze-resume" element={<AnalyzeResume />} />
          <Route path="/my-analyses" element={<MyAnalyses />} />
          <Route path="/compare-analyses" element={<CompareAnalyses />} />
          <Route path="/dashboard" element={<Dashboard />} />
          
        </Routes>
      
      <Footer />
    </>
  );
}

export default App;