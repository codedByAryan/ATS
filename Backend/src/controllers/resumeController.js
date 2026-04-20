import Resume from "../models/Resume.js";
import { extractTextFromResume } from "../services/resumeParserService.js";

export const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    let extractedText = "";
    let parseStatus = "success";

    try {
      extractedText = await extractTextFromResume(
        req.file.path,
        req.file.originalname
      );

      console.log("Extracted Text Length:", extractedText.length);
      console.log("Extracted Text Preview:", extractedText.slice(0, 300));
    } catch (parseError) {
      extractedText = "";
      parseStatus = "failed";
      console.log("Text extraction failed:", parseError.message);
    }

    const resume = await Resume.create({
      user: req.user._id,
      originalName: req.file.originalname,
      fileName: req.file.filename,
      filePath: req.file.path,
      fileType: req.file.mimetype,
      fileSize: req.file.size,
      extractedText,
    });

    res.status(201).json({
      message: "Resume uploaded and parsed successfully",
      parseStatus,
      extractedTextLength: extractedText.length,
      extractedTextPreview: extractedText.slice(0, 500),
      resume,
    });
  } catch (error) {
    res.status(500).json({
      message: "Resume upload failed",
      error: error.message,
    });
  }
};

export const getMyResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({ user: req.user._id }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      message: "Resumes fetched successfully",
      resumes,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch resumes",
      error: error.message,
    });
  }
};

export const getResumeById = async (req, res) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    res.status(200).json({
      message: "Resume fetched successfully",
      extractedTextLength: resume.extractedText
        ? resume.extractedText.length
        : 0,
      extractedTextPreview: resume.extractedText
        ? resume.extractedText.slice(0, 500)
        : "",
      resume,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch resume",
      error: error.message,
    });
  }
};