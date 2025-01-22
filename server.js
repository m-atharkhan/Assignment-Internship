import express from 'express';
import dotenv from 'dotenv';
import connectDB from './utils/connectDB.js';
import authRoutes from './routes/auth.route.js';
import resourceRoutes from './routes/resource.route.js';

dotenv.config();

const app = express();

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/resources', resourceRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB();
});
