import mongoose from 'mongoose';

const ChartDataSchema = new mongoose.Schema({
  createdAt: { type: Date, required: true },
  total_kwh: { type: Number, required: true },
  algo_status: { type: String, enum: ['ON', 'OFF'], required: true },
});

const ChartData = mongoose.model('ChartData', ChartDataSchema);

export default ChartData;