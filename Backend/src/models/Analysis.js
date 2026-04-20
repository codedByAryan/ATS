import mongoose from "mongoose";

const sectionScoreSchema = new mongoose.Schema(
  {
    score: { type: Number, default: 0 },
    matchedKeywords: { type: [String], default: [] },
    missingKeywords: { type: [String], default: [] },
    status: { type: String, default: "missing" },
  },
  { _id: false }
);

const analysisSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    resume: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resume",
      required: true,
    },
    jobDescription: {
      type: String,
      required: true,
    },
    matchedKeywords: {
      type: [String],
      default: [],
    },
    missingKeywords: {
      type: [String],
      default: [],
    },
    resumeKeywords: {
      type: [String],
      default: [],
    },
    jdKeywords: {
      type: [String],
      default: [],
    },
    matchPercentage: {
      type: Number,
      default: 0,
    },
    atsScore: {
      type: Number,
      default: 0,
    },
    keywordScore: {
      type: Number,
      default: 0,
    },
    structureScore: {
      type: Number,
      default: 0,
    },
    sectionAnalysis: {
      skills: { type: sectionScoreSchema, default: () => ({}) },
      education: { type: sectionScoreSchema, default: () => ({}) },
      projects: { type: sectionScoreSchema, default: () => ({}) },
      experience: { type: sectionScoreSchema, default: () => ({}) },
      summary: { type: sectionScoreSchema, default: () => ({}) },
    },
    suggestedSkills: {
      type: [String],
      default: [],
    },
    recommendations: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

const Analysis = mongoose.model("Analysis", analysisSchema);

export default Analysis;