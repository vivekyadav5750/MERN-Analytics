import express from 'express';
import { logAccessAndFetchData, fetchLogs } from '../controllers/logController.js';

const router = express.Router();

// Route to log access and fetch chart data
router.post('/', logAccessAndFetchData);

// Route to fetch all logs
router.get('/logs', fetchLogs);

export default router;
