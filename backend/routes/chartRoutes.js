import express from "express";
import {
  getChartData,
  getChartDataByDateRange
} from "../controllers/chartController.js";

const router = express.Router();

router.get("/", getChartData);
router.post("/date", getChartDataByDateRange);

export default router;
