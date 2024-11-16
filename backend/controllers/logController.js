import AccessLog from '../models/AccessLog.js';
import ChartData from '../models/ChartData.js';

export const logAccessAndFetchData = async (req, res) => {
  const { accessTime, accessDate, employeeName, algoStatus } = req.body;

  try {
    // Log access data
    const log = await AccessLog.create({ accessTime, accessDate, employeeName, algoStatus });

    // Fetch chart data based on filters
    const chartData = await ChartData.find({algo_status: algoStatus}).sort('createdAt');
    res.status(200).json({ log, chartData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const fetchLogs = async (req, res) => {
  try {
    const logs = await AccessLog.find().sort({ accessTime: -1 });
    res.json(logs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
