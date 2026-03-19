import { Router } from "express";
import { getHistory, getInsights, postPrediction } from "../controllers/predictionController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/predict", protect, postPrediction);
router.get("/history", protect, getHistory);
router.get("/insights", protect, getInsights);

export default router;
