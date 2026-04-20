import Resume from "../models/Resume.js";
import Analysis from "../models/Analysis.js";

export const getDashboardStats = async (req, res) => {
  try {
    const userId = req.user._id;

    const totalResumes = await Resume.countDocuments({ user: userId });
    const totalAnalyses = await Analysis.countDocuments({ user: userId });

    const bestAnalysis = await Analysis.findOne({ user: userId })
      .sort({ atsScore: -1 })
      .select("atsScore matchPercentage");

    const latestAnalysis = await Analysis.findOne({ user: userId })
      .sort({ createdAt: -1 })
      .select("atsScore matchPercentage createdAt");

    const averageScoreData = await Analysis.aggregate([
      { $match: { user: userId } },
      {
        $group: {
          _id: null,
          avgScore: { $avg: "$atsScore" },
        },
      },
    ]);

    const averageScore =
      averageScoreData.length > 0
        ? Math.round(averageScoreData[0].avgScore)
        : 0;

    res.status(200).json({
      totalResumes,
      totalAnalyses,
      bestATSScore: bestAnalysis?.atsScore || 0,
      bestMatchPercentage: bestAnalysis?.matchPercentage || 0,
      latestATSScore: latestAnalysis?.atsScore || 0,
      averageATSScore: averageScore,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch dashboard stats",
      error: error.message,
    });
  }
};

export const getRecentActivity = async (req, res) => {
  try {
    const userId = req.user._id;

    const recentAnalyses = await Analysis.find({ user: userId })
      .populate("resume", "originalName")
      .sort({ createdAt: -1 })
      .limit(5);

    const recentResumes = await Resume.find({ user: userId })
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({
      recentAnalyses,
      recentResumes,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch recent activity",
      error: error.message,
    });
  }
};