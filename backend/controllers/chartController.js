import ChartData from "../models/ChartData.js";

export const getChartData = async (req, res) => {
  try {
    const chartData = await ChartData.find().sort({ createdAt: 1 });
    res.json(chartData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getChartDataByDateRange = async (req, res) => {
  try {
    let { startDate, endDate } = req.body;
    startDate = new Date(startDate);
    endDate = new Date(endDate);

    const filter = {};
    if (startDate && endDate) {
      filter.createdAt = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }

    const data = await ChartData.find(filter).sort("createdAt");
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};
