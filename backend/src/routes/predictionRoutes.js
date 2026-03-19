import { Router } from "express";
import { getHistory, getInsights, postPrediction } from "../controllers/predictionController.js";

const router = Router();

router.post("/predict", postPrediction);
router.get("/history", getHistory);
router.get("/insights", getInsights);

export default router;
