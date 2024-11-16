import connectDB from '../config/db.js';
import ChartData from '../models/ChartData.js';
import data from "../energy_data.json" assert { type: 'json' };
const importData = async () => {
  try {
    await connectDB(); // Establish the DB connection
    // const formattedData = data.map(item => ({
    const formattedData = data.filter(item => item.total_kwh > 0).map(item => ({
      createdAt: new Date(item.createdAt.$date),
      total_kwh: item.total_kwh,
      algo_status: item.algo_status === 1 ? 'ON' : 'OFF',
    }));
    
    await ChartData.insertMany(formattedData);
    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
};

importData();
