import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  runAnalysis,
  getMyAnalyses,
  getAnalysisById,
  compareTwoAnalyses,
  downloadAnalysisReport,
} from "../controllers/analysisController.js";

const router = express.Router();

router.post("/run", protect, runAnalysis);
router.post("/compare", protect, compareTwoAnalyses);
router.get("/my-analyses", protect, getMyAnalyses);
router.get("/download/:id", protect, downloadAnalysisReport);
router.get("/:id", protect, getAnalysisById);

export default router;