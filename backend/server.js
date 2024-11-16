import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import chartRoutes from './routes/chartRoutes.js';
import logRoutes from './routes/logRoutes.js';
import cors from 'cors';

dotenv.config();
connectDB(); // Establish the DB connection

const app = express();

// Enable CORS
app.use(cors());

app.use(express.json());

app.use('/api/charts', chartRoutes);
app.use('/api/logs', logRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
