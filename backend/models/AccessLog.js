import mongoose from 'mongoose';

const AccessLogSchema = new mongoose.Schema({
  accessTime: { type: String, required: true },
  accessDate: { type: Date, required: true },
  employeeName: { type: String, required: true },
  algoStatus: { type: String, enum: ['ON', 'OFF'], required: true } // Updated to string with enum
});

const AccessLog = mongoose.model('AccessLog', AccessLogSchema);

export default AccessLog;
