import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  getDashboardStats,
  getRecentActivity,
} from "../controllers/dashboardController.js";

const router = express.Router();

router.get("/stats", protect, getDashboardStats);
router.get("/activity", protect, getRecentActivity);

export default router;