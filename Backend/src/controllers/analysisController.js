import Resume from "../models/Resume.js";
import Analysis from "../models/Analysis.js";
import { parseJobDescription } from "../services/jdParserService.js";
import { matchResumeWithJD } from "../services/keywordMatcherService.js";
import { calculateATSScore } from "../services/atsScoringService.js";
import { analyzeResumeSections } from "../services/sectionAnalysisService.js";
import { generateRecommendations } from "../services/recommendationService.js";
import { compareAnalyses } from "../services/comparisonService.js";
import { generateAnalysisPDF } from "../services/pdfReportService.js";

export const runAnalysis = async (req, res) => {
  try {
    const { resumeId, jobDescription } = req.body;

    if (!resumeId || !jobDescription) {
      return res.status(400).json({
        message: "resumeId and jobDescription are required",
      });
    }

    const resume = await Resume.findOne({
      _id: resumeId,
      user: req.user._id,
    });

    if (!resume) {
      return res.status(404).json({
        message: "Resume not found",
      });
    }

    if (!resume.extractedText || resume.extractedText.trim().length === 0) {
      return res.status(400).json({
        message: "Resume has no extracted text. Please upload a DOCX or text-based PDF.",
      });
    }

    const jdData = parseJobDescription(jobDescription);

    const matchData = matchResumeWithJD(resume.extractedText, jdData.rawText);

    const scoreData = calculateATSScore({
      matchPercentage: matchData.matchPercentage,
      resumeText: resume.extractedText,
    });

    const sectionAnalysisData = analyzeResumeSections(
      resume.extractedText,
      matchData.jdKeywords
    );

    const recommendationData = generateRecommendations({
      matchedKeywords: matchData.matchedKeywords,
      missingKeywords: matchData.missingKeywords,
      sectionAnalysis: sectionAnalysisData,
    });

    const analysis = await Analysis.create({
      user: req.user._id,
      resume: resume._id,
      jobDescription,
      matchedKeywords: matchData.matchedKeywords,
      missingKeywords: matchData.missingKeywords,
      resumeKeywords: matchData.resumeKeywords,
      jdKeywords: matchData.jdKeywords,
      matchPercentage: matchData.matchPercentage,
      atsScore: scoreData.finalScore,
      keywordScore: scoreData.keywordScore,
      structureScore: scoreData.structureScore,
      sectionAnalysis: {
        skills: sectionAnalysisData.skills,
        education: sectionAnalysisData.education,
        projects: sectionAnalysisData.projects,
        experience: sectionAnalysisData.experience,
        summary: sectionAnalysisData.summary,
      },
      suggestedSkills: recommendationData.suggestedSkills,
      recommendations: recommendationData.recommendations,
    });

    res.status(201).json({
      message: "Analysis completed successfully",
      analysis,
    });
  } catch (error) {
    res.status(500).json({
      message: "Analysis failed",
      error: error.message,
    });
  }
};

export const getMyAnalyses = async (req, res) => {
  try {
    const analyses = await Analysis.find({ user: req.user._id })
      .populate("resume", "originalName fileName createdAt")
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "Analysis history fetched successfully",
      analyses,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch analysis history",
      error: error.message,
    });
  }
};

export const getAnalysisById = async (req, res) => {
  try {
    const analysis = await Analysis.findOne({
      _id: req.params.id,
      user: req.user._id,
    }).populate("resume", "originalName extractedText");

    if (!analysis) {
      return res.status(404).json({
        message: "Analysis not found",
      });
    }

    res.status(200).json({
      message: "Analysis fetched successfully",
      analysis,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch analysis",
      error: error.message,
    });
  }
};

export const compareTwoAnalyses = async (req, res) => {
  try {
    const { oldAnalysisId, newAnalysisId } = req.body;

    if (!oldAnalysisId || !newAnalysisId) {
      return res.status(400).json({
        message: "oldAnalysisId and newAnalysisId are required",
      });
    }

    const oldAnalysis = await Analysis.findOne({
      _id: oldAnalysisId,
      user: req.user._id,
    }).populate("resume", "originalName");

    const newAnalysis = await Analysis.findOne({
      _id: newAnalysisId,
      user: req.user._id,
    }).populate("resume", "originalName");

    if (!oldAnalysis || !newAnalysis) {
      return res.status(404).json({
        message: "One or both analyses not found",
      });
    }

    const comparison = compareAnalyses(oldAnalysis, newAnalysis);

    res.status(200).json({
      message: "Analysis comparison completed successfully",
      oldAnalysis,
      newAnalysis,
      comparison,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to compare analyses",
      error: error.message,
    });
  }
};


export const downloadAnalysisReport = async (req, res) => {
  try {
    const analysis = await Analysis.findOne({
      _id: req.params.id,
      user: req.user._id,
    }).populate("resume", "originalName");

    if (!analysis) {
      return res.status(404).json({
        message: "Analysis not found",
      });
    }

    generateAnalysisPDF(analysis, res);
  } catch (error) {
    res.status(500).json({
      message: "Failed to generate PDF report",
      error: error.message,
    });
  }
};